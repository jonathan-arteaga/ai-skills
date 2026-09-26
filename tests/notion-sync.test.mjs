import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('retired Notion sync artifacts stay removed', () => {
  assert.equal(fs.existsSync('tools/notion-sync.mjs'), false);
  assert.equal(fs.existsSync('.github/workflows/notion-sync.yml'), false);
  assert.equal(fs.existsSync('notion-skills.json'), false);
  assert.equal(fs.existsSync('docs/notion-sync.md'), false);
});
