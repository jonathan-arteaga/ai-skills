import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const routing = JSON.parse(fs.readFileSync('docs/evaluations/flagship-skills/routing.json'));
const canonical = name => ['draft-in-authentic-voice', 'edit-in-authentic-voice'].includes(name) ? 'write-in-authentic-voice' : name;

test('trial summarizer preserves legacy routing and rejects retired names in the current catalog', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'voice-trial-'));
  try {
    for (const mode of ['legacy', 'current', 'invalid-current']) {
      const dir = path.join(root, mode), cwd = path.join(dir, 'workspace');
      fs.mkdirSync(cwd, {recursive:true});
      const names = [...new Set(routing.map(x => mode === 'legacy' ? x.skill : canonical(x.skill)))];
      fs.writeFileSync(path.join(cwd, 'catalog.json'), JSON.stringify(names.map(name => ({name}))));
      fs.writeFileSync(path.join(cwd, 'requests.json'), JSON.stringify(routing.map((x,i) => ({id:`q${i+1}`,request:x.prompt}))));
      const answers = routing.map((x,i) => ({id:`q${i+1}`,skill:x.polarity === 'positive' ? (mode === 'current' ? canonical(x.skill) : x.skill) : null}));
      fs.writeFileSync(path.join(dir,'result.json'), JSON.stringify({id:mode,case:'routing',exitCode:0,timedOut:false,libraryHashes:{},changedFiles:[],final:JSON.stringify(answers)}));
      fs.writeFileSync(path.join(dir,'stdout.jsonl'),'');
      fs.writeFileSync(path.join(dir,'prompt.txt'),'Synthetic routing compatibility check');
    }
    const out = path.join(root,'summary.json');
    execFileSync(process.execPath,['tools/summarize-skill-trials.mjs','--input',root,'--output',out]);
    const data = JSON.parse(fs.readFileSync(out));
    const results = data.results;
    assert.equal(results.find(x=>x.id==='legacy').checks.routing.failures.length,0);
    assert.equal(results.find(x=>x.id==='current').checks.routing.failures.length,0);
    assert.ok(results.find(x=>x.id==='invalid-current').checks.routing.failures.length>0);
  } finally {fs.rmSync(root,{recursive:true,force:true});}
});
