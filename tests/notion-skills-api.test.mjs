import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { create } from 'tar';
import { zipSync, strToU8 } from 'fflate';
import { parseFrontmatter } from '../tools/lib/skills.mjs';
import { extractNotionArchive, downloadNotionPlugin, planNotionImport, applyNotionImport, instructionFingerprint } from '../tools/lib/notion-skills.mjs';

const source = '---\nname: sample\ndescription: Review a synthetic example.\nlicense: MIT\nmetadata:\n  owner: sample-owner\n---\n\nRead [the reference](references/example.md).\n';
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'notion-skills-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, '.agents/skills/sample/references'), { recursive: true });
  fs.writeFileSync(path.join(root, '.agents/skills/sample/SKILL.md'), source);
  fs.writeFileSync(path.join(root, '.agents/skills/sample/references/example.md'), 'Reference\n');
  fs.writeFileSync(path.join(root, '.agents/skills/sample/LICENSE'), 'Required copyright\n');
  fs.writeFileSync(path.join(root, 'skill-catalog.json'), JSON.stringify({ skills: [{ id: 'sample', name: 'sample', sourceType: 'Owned', path: '.agents/skills/sample' }] }));
  fs.writeFileSync(path.join(root, 'plugin-release.json'), JSON.stringify({ name: 'sample-library', version: '1.1.0' }));
  for (const host of ['codex', 'claude', 'cursor']) {
    fs.mkdirSync(path.join(root, `.${host}-plugin`));
    fs.writeFileSync(path.join(root, `.${host}-plugin/plugin.json`), JSON.stringify({ name: 'sample-library', version: '1.1.0', skills: './.agents/skills/' }));
  }
  const files = new Map([
    ['skills/sample/SKILL.md', Buffer.from(source)],
    ['skills/sample/references/example.md', Buffer.from('Reference\n')],
    ['skills/sample/LICENSE', Buffer.from('Required copyright\n')],
  ]);
  return { root, files };
}

async function archive(t, entries) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'notion-archive-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const [name, bytes] of entries) {
    const destination = path.join(root, name);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, bytes);
  }
  const stream = create({ gzip: true, cwd: root }, [...entries.keys()]);
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

test('complete native export is a no-op and export-only metadata stays private', t => {
  const { root, files } = fixture(t);
  files.set('skills/sample/SKILL.md', Buffer.from(source.replace('license: MIT\nmetadata:\n  owner: sample-owner\n', 'notion_page_id: private-page-id\n')));
  files.set('skills/sample/provenance/github.json', Buffer.from('{"private":"not-published"}'));
  const plan = planNotionImport(root, files);
  assert.deepEqual(plan.checked, ['sample']);
  assert.deepEqual(plan.changes, []);
});

test('Notion edits preserve licensing, supporting files and metadata and bump the release', t => {
  const { root, files } = fixture(t);
  files.set('skills/sample/SKILL.md', Buffer.from(source.replace('description: Review a synthetic example.', 'description: Review a changed synthetic example.').replace('license: MIT\nmetadata:\n  owner: sample-owner\n', 'notion_page_id: private-page-id\n')));
  files.set('skills/sample/references/example.md', Buffer.from('Changed reference\n'));
  const plan = planNotionImport(root, files);
  applyNotionImport(root, plan);
  const restored = parseFrontmatter(fs.readFileSync(path.join(root, '.agents/skills/sample/SKILL.md'), 'utf8')).data;
  assert.equal(restored.license, 'MIT');
  assert.deepEqual(restored.metadata, { owner: 'sample-owner' });
  assert.equal(restored.notion_page_id, undefined);
  assert.equal(fs.readFileSync(path.join(root, '.agents/skills/sample/references/example.md'), 'utf8'), 'Changed reference\n');
  assert.equal(fs.readFileSync(path.join(root, '.agents/skills/sample/LICENSE'), 'utf8'), 'Required copyright\n');
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'plugin-release.json'))).version, '1.1.1');
});

test('incomplete, extra or renamed skills and unapproved attachment paths stop all changes', t => {
  const { root, files } = fixture(t);
  const missing = new Map(files); missing.delete('skills/sample/LICENSE');
  assert.throws(() => planNotionImport(root, missing), /required file is missing/);
  const extra = new Map(files); extra.set('skills/private-skill/SKILL.md', Buffer.from(source));
  assert.throws(() => planNotionImport(root, extra), /approved owned skill catalog/);
  const attachment = new Map(files); attachment.set('skills/sample/customer.txt', Buffer.from('private'));
  assert.throws(() => planNotionImport(root, attachment), /unapproved supporting files/);
  const renamed = new Map(files); renamed.set('skills/sample/SKILL.md', Buffer.from(source.replace('name: sample', 'name: other')));
  assert.throws(() => planNotionImport(root, renamed), /renamed/);
  assert.equal(fs.readFileSync(path.join(root, '.agents/skills/sample/SKILL.md'), 'utf8'), source);
});

test('a concurrent source change blocks the complete planned write', t => {
  const { root, files } = fixture(t);
  files.set('skills/sample/SKILL.md', Buffer.from(source.replace('synthetic example.', 'different example.')));
  const plan = planNotionImport(root, files);
  fs.writeFileSync(path.join(root, '.agents/skills/sample/SKILL.md'), source + '\nNew local edit\n');
  assert.throws(() => applyNotionImport(root, plan), /Repository changed/);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'plugin-release.json'))).version, '1.1.0');
});

test('formatting wrappers are ignored while fenced code changes remain significant', () => {
  assert.equal(instructionFingerprint('Read DESIGN.md.\n```text\nline\n```'), instructionFingerprint('<p>Read `DESIGN.md`.</p>\n```txt\nline\n```'));
  assert.notEqual(instructionFingerprint('```js\nconst x = 1;\n```'), instructionFingerprint('```js\n const x = 1;\n```'));
});

test('the complete archive preserves nested files and expands a supporting ZIP without replacing instructions', async t => {
  const payload = zipSync({ 'sample/references/example.md': strToU8('Nested reference'), 'sample/SKILL.md': strToU8('Do not replace the page') });
  const bytes = await archive(t, new Map([
    ['group/plugin.json', Buffer.from('{"name":"group"}')],
    ['group/skills/sample/SKILL.md', Buffer.from(source)],
    ['group/skills/sample/files.zip', Buffer.from(payload)],
  ]));
  const files = await extractNotionArchive(bytes);
  assert.equal(files.get('skills/sample/SKILL.md').toString(), source);
  assert.equal(files.get('skills/sample/references/example.md').toString(), 'Nested reference');
});

test('paginated API selects only the approved group and never sends credentials to the archive host', async t => {
  const bytes = await archive(t, new Map([['group/skills/sample/SKILL.md', Buffer.from(source)]]));
  const requests = [];
  const fetchImpl = async (url, options) => {
    requests.push({ url, options });
    if (url.includes('start_cursor=')) return Response.json({ results: [{ id: 'approved-id', name: 'ai-skills', version_id: 'version' }], has_more: false });
    if (url.endsWith('/approved-id')) return Response.json({ id: 'approved-id', version_id: 'version', url: 'https://archive.example/group.tar.gz' });
    if (url.startsWith('https://archive.example/')) return new Response(bytes);
    return Response.json({ results: [{ id: 'private-id', name: 'private-group', version_id: 'private-version' }], has_more: true, next_cursor: 'cursor' });
  };
  const files = await downloadNotionPlugin({ token: 'synthetic-token', pluginName: 'ai-skills', fetchImpl });
  assert.equal(files.get('skills/sample/SKILL.md').toString(), source);
  assert.equal(requests.length, 4);
  assert.equal(requests.filter(request => request.url.includes('/private-id')).length, 0);
  assert.equal(requests[0].options.headers['Notion-Version'], '2026-03-11');
  assert.equal(requests.at(-1).options.headers, undefined);
});

test('failed or incomplete API reads do not proceed to an archive download', async () => {
  let calls = 0;
  await assert.rejects(() => downloadNotionPlugin({ token: 'synthetic-token', pluginName: 'ai-skills', fetchImpl: async () => { calls++; return new Response('denied', { status: 401 }); } }), /401/);
  assert.equal(calls, 1);
  await assert.rejects(() => downloadNotionPlugin({ token: 'synthetic-token', pluginName: 'ai-skills', fetchImpl: async () => Response.json({ results: [], has_more: true, next_cursor: null }) }), /incomplete/);
});

test('ambiguous groups and changed versions cannot publish a mixed export', async () => {
  await assert.rejects(() => downloadNotionPlugin({ token: 'synthetic-token', pluginName: 'ai-skills', fetchImpl: async () => Response.json({ results: [{ id: 'a', name: 'ai-skills' }, { id: 'b', name: 'ai-skills' }], has_more: false }) }), /ambiguous/);
  await assert.rejects(() => downloadNotionPlugin({ token: 'synthetic-token', pluginName: 'ai-skills', fetchImpl: async url => url.endsWith('/a') ? Response.json({ id: 'a', version_id: 'new', url: 'https://archive.example/a' }) : Response.json({ results: [{ id: 'a', name: 'ai-skills', version_id: 'old' }], has_more: false }) }), /changed during export/);
});
