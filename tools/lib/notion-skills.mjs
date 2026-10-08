import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { Parser } from 'tar';
import { unzipSync } from 'fflate';
import { stringify } from 'yaml';
import { parseFrontmatter, validateSkillContent, validateSkillLinks } from './skills.mjs';
import { validateCatalogScope } from './catalog.mjs';

const MAX_ARCHIVE = 32 * 1024 * 1024;
const MAX_EXPANDED = 128 * 1024 * 1024;
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const safePath = name => name && !name.includes('\0') && !name.startsWith('/') && !/^[a-z]:/i.test(name) && !name.split('/').includes('..');

export async function extractNotionArchive(bytes) {
  if (bytes.length > MAX_ARCHIVE) throw new Error('Notion archive exceeds the size limit.');
  const raw = new Map();
  let expanded = 0;
  let entries = 0;
  await new Promise((resolve, reject) => {
    const parser = new Parser({ strict: true });
    parser.on('error', reject);
    parser.on('end', resolve);
    parser.on('entry', entry => {
      const name = entry.path.replaceAll('\\', '/').replace(/^(\.\/)+/, '');
      if (entry.type === 'Directory') { entry.resume(); return; }
      if (!safePath(name) || !['File', 'OldFile'].includes(entry.type) || raw.has(name)) {
        parser.destroy(new Error('Notion archive contains an unsafe or duplicate entry.')); return;
      }
      entries++;
      if (entry.size + expanded > MAX_EXPANDED || entries > 5000) {
        parser.destroy(new Error('Notion archive exceeds the expanded size limit.')); return;
      }
      const chunks = [];
      entry.on('data', chunk => {
        expanded += chunk.length;
        if (expanded > MAX_EXPANDED) { parser.destroy(new Error('Notion archive exceeds the expanded size limit.')); return; }
        chunks.push(chunk);
      });
      entry.on('end', () => raw.set(name, Buffer.concat(chunks)));
    });
    parser.end(bytes);
  });
  const keys = [...raw.keys()];
  const root = keys[0]?.split('/')[0];
  const wrapped = root && root !== 'skills' && keys.every(name => name.startsWith(`${root}/`));
  const files = new Map();
  for (const [name, value] of raw) files.set(wrapped ? name.slice(root.length + 1) : name, value);
  const names = new Set([...files.keys()].filter(name => name.startsWith('skills/')).map(name => name.split('/')[1]));
  for (const name of names) {
    const prefix = `skills/${name}/`;
    const zips = [...files.keys()].filter(key => key.startsWith(prefix) && !key.slice(prefix.length).includes('/') && /\.zip$/i.test(key));
    if (zips.length !== 1) continue;
    let zipSize = expanded;
    const inner = unzipSync(files.get(zips[0]), { filter: file => {
      zipSize += file.originalSize;
      if (zipSize > MAX_EXPANDED) throw new Error('Notion ZIP attachment exceeds the size limit.');
      if (!safePath(file.name.replaceAll('\\', '/'))) throw new Error('Notion ZIP attachment contains an unsafe entry.');
      return true;
    } });
    const entries = Object.entries(inner).filter(([key]) => !key.endsWith('/') && !/(^|\/)(__MACOSX|\.DS_Store)(\/|$)/.test(key));
    const wrapper = entries[0]?.[0].split('/')[0];
    const unwrap = wrapper && entries.every(([key]) => key.startsWith(`${wrapper}/`)) && (wrapper === name || entries.some(([key]) => key === `${wrapper}/SKILL.md`));
    for (const [key, value] of entries) {
      const relative = (unwrap ? key.slice(wrapper.length + 1) : key).replaceAll('\\', '/');
      if (!safePath(relative)) throw new Error('Notion ZIP attachment contains an unsafe entry.');
      expanded += value.length;
      if (expanded > MAX_EXPANDED) throw new Error('Notion ZIP attachment exceeds the size limit.');
      if (relative === 'SKILL.md') continue; // The page-rendered instructions remain authoritative.
      const target = prefix + relative;
      if (files.has(target)) throw new Error('Notion ZIP attachment duplicates a supporting file.');
      files.set(target, Buffer.from(value));
    }
    files.delete(zips[0]);
  }
  return files;
}

export async function downloadNotionPlugin({ token, pluginName, fetchImpl = fetch }) {
  if (!token?.trim() || !pluginName?.trim()) throw new Error('Set NOTION_API_TOKEN and NOTION_PLUGIN_NAME before connecting.');
  const request = async endpoint => {
    const response = await fetchImpl(`https://api.notion.com/v1/ai/plugins${endpoint}`, {
      headers: { Authorization: `Bearer ${token}`, 'Notion-Version': '2026-03-11' }, redirect: 'error',
      signal: AbortSignal.timeout(60000),
    });
    if (!response.ok) throw new Error(`Notion Skills API request failed (${response.status}); verify Read content access and Skills API availability.`);
    return response.json();
  };
  const plugins = [];
  const cursors = new Set();
  let cursor;
  do {
    const page = await request(`?page_size=100${cursor ? `&start_cursor=${encodeURIComponent(cursor)}` : ''}`);
    if (!Array.isArray(page.results) || typeof page.has_more !== 'boolean') throw new Error('Notion returned an incomplete plugin listing.');
    plugins.push(...page.results);
    cursor = page.has_more ? page.next_cursor : undefined;
    if (page.has_more && (!cursor || cursors.has(cursor))) throw new Error('Notion returned incomplete or repeated pagination.');
    if (cursor) cursors.add(cursor);
  } while (cursor);
  const matches = plugins.filter(plugin => plugin.name === pluginName);
  if (matches.length !== 1) throw new Error('The approved Notion plugin group is missing or ambiguous.');
  const selected = matches[0];
  if (typeof selected.id !== 'string' || !selected.id || typeof selected.version_id !== 'string' || !selected.version_id) throw new Error('Notion returned an incomplete plugin identity.');
  const ref = await request(`/${encodeURIComponent(selected.id)}`);
  if (ref.id !== selected.id || ref.version_id !== selected.version_id) throw new Error('Notion changed during export; retry without publishing.');
  if (new URL(ref.url).protocol !== 'https:') throw new Error('Notion returned an unsupported archive URL.');
  const response = await fetchImpl(ref.url, { signal: AbortSignal.timeout(60000) }); // Never send the API token to the archive host.
  if (!response.ok) throw new Error('Notion archive download failed.');
  const length = Number(response.headers?.get('content-length') || 0);
  if (length > MAX_ARCHIVE) throw new Error('Notion archive exceeds the size limit.');
  const bytes = Buffer.from(await response.arrayBuffer());
  return extractNotionArchive(bytes);
}

function sourceFiles(directory, prefix = '') {
  const files = new Map();
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error('Canonical skill sources must not contain symlinks.');
    if (entry.isDirectory()) for (const [key, bytes] of sourceFiles(absolute, relative)) files.set(key, bytes);
    else if (entry.isFile()) files.set(relative, fs.readFileSync(absolute));
  }
  return files;
}

// Notion adds paragraph wrappers, emphasis, filename links and code-fence labels.
// Ignore those export-only changes, but retain the exact contents of fenced code.
export function instructionFingerprint(body) {
  const prose = [], code = [];
  let fence, block = [];
  for (const line of body.split(/\r?\n/)) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker && !fence) { fence = marker[1]; block = []; continue; }
    if (marker && fence[0] === marker[1][0] && marker[1].length >= fence.length) { code.push(block.join('\n')); fence = undefined; continue; }
    if (fence) block.push(line);
    else prose.push(line);
  }
  if (fence) code.push(block.join('\n'));
  const words = prose.join('\n')
    .replace(/<\/?(?:p|b)>/g, ' ').replace(/<br\s*\/?>/g, ' ')
    .replace(/\[([^\]]+)\]\(http:\/\/\1\)/g, '$1')
    .replace(/\|[\s:|\-]+\|/g, ' ')
    .replace(/[`*\\]/g, '').replace(/\s+/g, ' ').trim();
  return JSON.stringify({ words, code });
}

export function planNotionImport(repoRoot, exported) {
  const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'skill-catalog.json'), 'utf8'));
  validateCatalogScope(catalog);
  const owned = catalog.skills.filter(skill => skill.sourceType === 'Owned');
  const expectedNames = owned.map(skill => skill.name).sort();
  const actualNames = [...new Set([...exported.keys()].filter(key => key.startsWith('skills/')).map(key => key.split('/')[1]))].sort();
  if (JSON.stringify(expectedNames) !== JSON.stringify(actualNames)) throw new Error('Notion export does not exactly cover the approved owned skill catalog; no changes applied.');
  const changes = [], checked = [];
  for (const skill of owned) {
    if (skill.path !== `.agents/skills/${skill.name}`) throw new Error('Unsafe canonical skill path.');
    const root = path.join(repoRoot, skill.path);
    const source = sourceFiles(root);
    const prefix = `skills/${skill.name}/`;
    const bucket = new Map([...exported].filter(([key]) => key.startsWith(prefix)).map(([key, value]) => [key.slice(prefix.length), value]));
    for (const key of source.keys()) if (!bucket.has(key)) throw new Error(`A required file is missing from the Notion export for ${skill.name}; no changes applied.`);
    for (const key of bucket.keys()) {
      if (!source.has(key) && !['LICENSE', 'provenance/ORIGIN.md', 'provenance/REPOSITORY-LICENSE', 'provenance/github.json'].includes(key)) {
        throw new Error('Notion export contains unapproved supporting files; approve new paths in the repository first.');
      }
    }
    const old = parseFrontmatter(source.get('SKILL.md').toString());
    const current = parseFrontmatter(bucket.get('SKILL.md').toString());
    if (old.error || current.error || current.data.name !== skill.name || typeof current.data.description !== 'string') throw new Error('Invalid or renamed exported skill.');
    const data = { ...old.data, name: current.data.name, description: current.data.description };
    const body = instructionFingerprint(old.body) === instructionFingerprint(current.body) ? old.body : current.body;
    const normalized = body === old.body && data.description === old.data.description
      ? source.get('SKILL.md') : Buffer.from(`---\n${stringify(data)}---\n${body}`);
    const errors = validateSkillContent(normalized.toString(), skill.name);
    if (errors.length) throw new Error(`Exported instructions fail validation for ${skill.name}; no changes applied.`);
    const linkErrors = validateSkillLinks(normalized.toString(), root, root);
    if (linkErrors.length) throw new Error(`Exported instructions reference unavailable files for ${skill.name}; no changes applied.`);
    bucket.set('SKILL.md', normalized);
    for (const [key, bytes] of source) {
      const next = bucket.get(key);
      if (!Buffer.from(next).equals(bytes)) changes.push({ path: `${skill.path}/${key}`, before: hash(bytes), content: Buffer.from(next) });
    }
    checked.push(skill.name);
  }
  if (changes.length) {
    const releasePath = path.join(repoRoot, 'plugin-release.json');
    const old = fs.readFileSync(releasePath);
    const release = JSON.parse(old);
    const version = release.version.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!version) throw new Error('Set a stable semantic plugin version before importing changes.');
    release.version = `${version[1]}.${version[2]}.${Number(version[3]) + 1}`;
    changes.push({ path: 'plugin-release.json', before: hash(old), content: Buffer.from(`${JSON.stringify(release, null, 2)}\n`) });
    for (const host of ['codex', 'claude', 'cursor']) {
      const relative = `.${host}-plugin/plugin.json`;
      const bytes = fs.readFileSync(path.join(repoRoot, relative));
      const manifest = JSON.parse(bytes); manifest.version = release.version;
      changes.push({ path: relative, before: hash(bytes), content: Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`) });
    }
  }
  return { checked, changes };
}

export function applyNotionImport(repoRoot, plan) {
  // Validate the entire lease before any write, so concurrent edits cannot be overwritten.
  for (const change of plan.changes) {
    if (fs.lstatSync(path.join(repoRoot, change.path)).isSymbolicLink()) throw new Error('Repository destination became a symlink; no changes applied.');
    if (hash(fs.readFileSync(path.join(repoRoot, change.path))) !== change.before) throw new Error('Repository changed after the import was planned; no changes applied.');
  }
  for (const change of plan.changes) fs.writeFileSync(path.join(repoRoot, change.path), change.content);
}
