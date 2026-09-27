import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('owned catalog is shared by every host', () => {
  const catalog = JSON.parse(fs.readFileSync('skill-catalog.json'));
  const owned = catalog.skills.filter((x) => x.sourceType === 'Owned');
  assert.equal(new Set(catalog.skills.map((x) => x.id)).size, catalog.skills.length);
  for (const e of owned) {
    assert.ok(fs.existsSync(e.path + '/SKILL.md'), e.name);
    assert.ok(e.category, e.name);
    assert.ok(e.tags.length >= 2, e.name);
    assert.ok(!('notionPageId' in e), e.name + ' still has notionPageId');
  }
  assert.ok(!('profiles' in catalog), 'Hosts share one skill set; no per-host profiles');
  for (const e of owned) assert.ok(!('intendedTools' in e), e.name + ' installs on every host');
  for (const e of catalog.skills.filter((x) => x.sourceType !== 'Owned')) {
    assert.ok(!e.path, 'No private/provider content path in public catalog');
  }
});
