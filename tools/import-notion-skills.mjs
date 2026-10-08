#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { downloadNotionPlugin, extractNotionArchive, planNotionImport, applyNotionImport } from './lib/notion-skills.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const apply = args.includes('--apply');
let archive;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--archive') archive = args[++i];
  else if (!['--apply', '--dry-run'].includes(args[i])) throw new Error('Use --dry-run or --apply, optionally with --archive <tar.gz>.');
}
try {
  if (apply && execFileSync('git', ['status', '--porcelain'], { cwd: repoRoot, encoding: 'utf8' }).trim()) throw new Error('Apply requires a clean isolated repository checkout.');
  const exported = archive ? await extractNotionArchive(fs.readFileSync(archive)) : await downloadNotionPlugin({
    token: process.env.NOTION_API_TOKEN,
    pluginName: process.env.NOTION_PLUGIN_NAME,
  });
  const plan = planNotionImport(repoRoot, exported);
  if (apply) applyNotionImport(repoRoot, plan);
  console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', skillsChecked: plan.checked.length, changedFiles: plan.changes.map(change => change.path) }, null, 2));
} catch (error) { console.error(error.message); process.exitCode = 1; }
