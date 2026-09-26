import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('owned catalog and host profiles agree', () => {
  const catalog = JSON.parse(fs.readFileSync('skill-catalog.json'));
  const owned = catalog.skills.filter((x) => x.sourceType === 'Owned');
  assert.equal(new Set(catalog.skills.map((x) => x.id)).size, catalog.skills.length);
  for (const e of owned) {
    assert.ok(fs.existsSync(e.path + '/SKILL.md'), e.name);
    assert.ok(e.category, e.name);
    assert.ok(e.tags.length >= 2, e.name);
    assert.ok(!('notionPageId' in e), e.name + ' still has notionPageId');
  }
  for (const [profile, names] of Object.entries(catalog.profiles)) {
    assert.equal(new Set(names).size, names.length, profile);
    for (const n of names) {
      const skill = owned.find((x) => x.name === n);
      assert.ok(skill, n + ' missing from owned catalog');
      assert.ok(skill.intendedTools.includes(profile), n + ' missing ' + profile);
    }
  }
  for (const e of catalog.skills.filter((x) => x.sourceType !== 'Owned')) {
    assert.ok(!e.path, 'No private/provider content path in public catalog');
  }
});
