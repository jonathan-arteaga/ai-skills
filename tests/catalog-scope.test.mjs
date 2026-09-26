import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateCatalogScope } from '../tools/lib/catalog.mjs';

test('maintained skills and selected references remain eligible', () => {
  const catalog = JSON.parse(fs.readFileSync('skill-catalog.json', 'utf8'));
  assert.doesNotThrow(() => validateCatalogScope(catalog));
  assert.deepEqual(
    catalog.skills.filter((s) => s.sourceType !== 'Owned').map((s) => s.id).sort(),
    ['external:appllama-usage', 'external:design-taste-frontend', 'private:write-as-me'],
  );
});

test('native records are rejected even when they contain no distributed path', () => {
  for (const sourceType of ['Provider', 'System', 'Unknown']) {
    assert.throws(
      () => validateCatalogScope({ skills: [{ id: 'vendor:sample', name: 'sample', sourceType }] }),
      /Excluded catalog source type/,
    );
  }
});

test('retired household identities cannot return with a different source classification', () => {
  for (const name of ['arteaga-household-core', 'arteaga-household-finance']) {
    for (const sourceType of ['Owned', 'Private', 'External']) {
      for (const skill of [
        { id: `arteaga-hq:${name}`, name: 'alias', sourceType },
        { id: 'alias', name, sourceType },
      ]) {
        assert.throws(() => validateCatalogScope({ skills: [skill] }), /Retired household skill/);
      }
    }
  }
});

test('Notion identifiers are rejected', () => {
  assert.throws(
    () => validateCatalogScope({ skills: [{ id: 'sample', name: 'sample', sourceType: 'Owned', notionPageId: 'abc' }] }),
    /Notion identifier/,
  );
});
