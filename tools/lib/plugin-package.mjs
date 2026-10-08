import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { validateCatalogScope } from './catalog.mjs';
import { validateSkills } from './skills.mjs';

const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const json = value => Buffer.from(`${JSON.stringify(value, null, 2)}\n`);

function filesUnder(directory, prefix = '') {
  const files = new Map();
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Package source must not contain symlinks: ${relative}`);
    if (entry.isDirectory()) {
      for (const [name, bytes] of filesUnder(absolute, relative)) files.set(name, bytes);
    } else if (entry.isFile()) files.set(relative, fs.readFileSync(absolute));
    else throw new Error(`Unsupported package source: ${relative}`);
  }
  return files;
}

export function pluginFiles(repoRoot) {
  const catalog = JSON.parse(fs.readFileSync(path.join(repoRoot, 'skill-catalog.json'), 'utf8'));
  validateCatalogScope(catalog);
  const release = JSON.parse(fs.readFileSync(path.join(repoRoot, 'plugin-release.json'), 'utf8'));
  const owned = catalog.skills.filter(skill => skill.sourceType === 'Owned');
  const sourceRoot = path.join(repoRoot, '.agents', 'skills');
  const problems = validateSkills(sourceRoot).filter(issue => issue.severity === 'error');
  if (problems.length) throw new Error('Fix skill validation errors before building plugins.');
  const folders = fs.readdirSync(sourceRoot, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
  const names = owned.map(skill => skill.name).sort();
  if (JSON.stringify(folders) !== JSON.stringify(names)) throw new Error('Owned catalog and distributable skill folders must match.');

  const result = new Map();
  const fingerprints = [];
  for (const skill of owned) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.name) || skill.path !== `.agents/skills/${skill.name}`) {
      throw new Error(`Unsafe owned skill path: ${skill.name}`);
    }
    for (const [relative, bytes] of filesUnder(path.join(sourceRoot, skill.name))) {
      result.set(`skills/${skill.name}/${relative}`, bytes);
      fingerprints.push({ path: `${skill.path}/${relative}`, sha256: digest(bytes) });
    }
    const origin = path.join(repoRoot, 'origins', `${skill.name}.md`);
    if (fs.existsSync(origin)) result.set(`origins/${skill.name}.md`, fs.readFileSync(origin));
  }
  fingerprints.sort((a, b) => a.path.localeCompare(b.path));
  result.set('LICENSE', fs.readFileSync(path.join(repoRoot, 'LICENSE')));
  result.set('plugin.json', json({
    $schema: 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json',
    ...release,
    license: 'MIT',
    repository: 'https://github.com/jonathan-arteaga/ai-skills',
    extensions: { 'com.openai': { interface: {
      displayName: 'Arteaga AI Skills',
      shortDescription: 'The complete reviewed skill library',
      developerName: 'Jonathan Arteaga',
      category: 'Productivity',
    } } },
  }));
  const compatibility = { ...release, license: 'MIT', repository: 'https://github.com/jonathan-arteaga/ai-skills', skills: './skills/' };
  result.set('.codex-plugin/plugin.json', json(compatibility));
  result.set('.claude-plugin/plugin.json', json(compatibility));
  result.set('source-manifest.json', json({ generatedBy: 'ai-skills/tools/build-plugin.mjs', source: '.agents/skills/', skillCount: owned.length, files: fingerprints }));
  return { name: release.name, version: release.version, files: result, skillCount: owned.length };
}

export function checkPlugin(directory, expected) {
  if (!fs.existsSync(directory)) return ['Plugin package is missing; run pnpm plugins:build.'];
  const actual = filesUnder(directory);
  const errors = [];
  for (const [name, bytes] of expected.files) {
    if (!actual.has(name)) errors.push(`Missing package file: ${name}`);
    else if (!bytes.equals(actual.get(name))) errors.push(`Stale package file: ${name}`);
  }
  for (const name of actual.keys()) if (!expected.files.has(name)) errors.push(`Unexpected package file: ${name}`);
  return errors;
}

export function writePlugin(directory, expected) {
  if (fs.existsSync(directory)) {
    const marker = path.join(directory, 'source-manifest.json');
    if (!fs.existsSync(marker) || JSON.parse(fs.readFileSync(marker, 'utf8')).generatedBy !== 'ai-skills/tools/build-plugin.mjs') {
      throw new Error('Refusing to replace an unmanaged plugin directory.');
    }
    // Only the generated package is replaced; canonical skill sources are untouched.
    fs.rmSync(directory, { recursive: true });
  }
  for (const [name, bytes] of expected.files) {
    const target = path.join(directory, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, bytes);
  }
}
