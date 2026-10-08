import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pluginFiles, checkPlugin, writePlugin } from '../tools/lib/plugin-package.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-skills-package-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, '.agents/skills/sample/references'), { recursive: true });
  fs.mkdirSync(path.join(root, 'origins'));
  fs.writeFileSync(path.join(root, '.agents/skills/sample/SKILL.md'), '---\nname: sample\ndescription: Review a synthetic example.\nlicense: MIT\n---\n\nRead [the reference](references/example.md).\n');
  fs.writeFileSync(path.join(root, '.agents/skills/sample/references/example.md'), 'Reference with exact UTF-8 text: café.\n');
  fs.writeFileSync(path.join(root, '.agents/skills/sample/LICENSE'), 'Fork copyright notice\n');
  fs.writeFileSync(path.join(root, 'origins/sample.md'), 'Original attribution\n');
  fs.writeFileSync(path.join(root, 'LICENSE'), 'Repository license\n');
  fs.writeFileSync(path.join(root, 'plugin-release.json'), JSON.stringify({ name: 'sample-library', version: '1.0.0', description: 'Synthetic skills' }));
  fs.writeFileSync(path.join(root, 'skill-catalog.json'), JSON.stringify({ skills: [
    { id: 'sample', name: 'sample', sourceType: 'Owned', path: '.agents/skills/sample' },
    { id: 'private-example', name: 'private-example', sourceType: 'Private', path: '/private/source' },
    { id: 'external-example', name: 'external-example', sourceType: 'External', path: 'https://example.org' },
  ] }));
  return root;
}

test('build includes complete owned packages and attribution, excluding private and external content', t => {
  const root = fixture(t);
  const expected = pluginFiles(root);
  assert.equal(expected.skillCount, 1);
  assert.equal(expected.files.get('skills/sample/references/example.md').toString(), 'Reference with exact UTF-8 text: café.\n');
  assert.equal(expected.files.get('skills/sample/LICENSE').toString(), 'Fork copyright notice\n');
  assert.equal(expected.files.get('origins/sample.md').toString(), 'Original attribution\n');
  assert.equal([...expected.files.keys()].some(name => /private-example|external-example/.test(name)), false);
  const output = path.join(root, 'output');
  writePlugin(output, expected);
  assert.deepEqual(checkPlugin(output, expected), []);
});

test('verification detects a changed reference and an unexpected extra file', t => {
  const root = fixture(t);
  const expected = pluginFiles(root);
  const output = path.join(root, 'output');
  writePlugin(output, expected);
  fs.writeFileSync(path.join(output, 'skills/sample/references/example.md'), 'stale');
  fs.writeFileSync(path.join(output, 'unapproved.txt'), 'unapproved');
  assert.deepEqual(checkPlugin(output, expected), ['Stale package file: skills/sample/references/example.md', 'Unexpected package file: unapproved.txt']);
});

test('a missing owned catalog entry cannot silently become a distributed skill', t => {
  const root = fixture(t);
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'skill-catalog.json')));
  catalog.skills = catalog.skills.filter(skill => skill.sourceType !== 'Owned');
  fs.writeFileSync(path.join(root, 'skill-catalog.json'), JSON.stringify(catalog));
  assert.throws(() => pluginFiles(root), /catalog and distributable skill folders must match/);
});

test('source symlinks and unmanaged output are rejected before copying or replacement', t => {
  const root = fixture(t);
  fs.symlinkSync(path.join(root, 'LICENSE'), path.join(root, '.agents/skills/sample/references/link'));
  assert.throws(() => pluginFiles(root), /symlink|validation errors/);
  fs.unlinkSync(path.join(root, '.agents/skills/sample/references/link'));
  const expected = pluginFiles(root);
  const output = path.join(root, 'unmanaged');
  fs.mkdirSync(output);
  fs.writeFileSync(path.join(output, 'keep.txt'), 'keep');
  assert.throws(() => writePlugin(output, expected), /unmanaged plugin directory/);
  assert.equal(fs.readFileSync(path.join(output, 'keep.txt'), 'utf8'), 'keep');
});
