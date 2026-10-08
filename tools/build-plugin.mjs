#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { pluginFiles, checkPlugin, writePlugin } from './lib/plugin-package.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.some(arg => !['--check', '--help'].includes(arg))) throw new Error('Use --check to verify, or no arguments to build.');
if (args.includes('--help')) {
  console.log('Build the complete owned-skill plugin from .agents/skills. Use --check to verify the committed package.');
} else {
  const expected = pluginFiles(repoRoot);
  const target = path.join(repoRoot, '.dist', expected.name);
  if (args.includes('--check')) {
    const release = JSON.parse(fs.readFileSync(path.join(repoRoot, 'plugin-release.json'), 'utf8'));
    const errors = [];
    for (const host of ['codex', 'claude', 'cursor']) {
      const manifest = JSON.parse(fs.readFileSync(path.join(repoRoot, `.${host}-plugin`, 'plugin.json'), 'utf8'));
      if (manifest.name !== release.name || manifest.version !== release.version || manifest.skills !== './.agents/skills/') {
        errors.push(`The ${host} manifest must use the current release and canonical skill directory.`);
      }
    }
    const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-skills-release-'));
    try {
      const output = path.join(temporary, 'package');
      writePlugin(output, expected);
      errors.push(...checkPlugin(output, expected));
    } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
    if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
    else console.log(`Plugin package verified: ${expected.skillCount} owned skills, ${expected.files.size} files.`);
  } else {
    writePlugin(target, expected);
    console.log(`Plugin package built in .dist: ${expected.skillCount} owned skills, ${expected.files.size} files.`);
  }
}
