import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Notion publish tool is not imported by CI', () => {
  assert.doesNotMatch(
    fs.readFileSync('package.json', 'utf8'),
    /notion-publish/,
  );
});
