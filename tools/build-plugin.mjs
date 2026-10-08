#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pluginFiles, checkPlugin, writePlugin } from './lib/plugin-package.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.some(arg => !['--check', '--help'].includes(arg))) throw new Error('Use --check to verify, or no arguments to build.');
if (args.includes('--help')) {
  console.log('Build the complete owned-skill plugin from .agents/skills. Use --check to verify the committed package.');
} else {
  const expected = pluginFiles(repoRoot);
  const target = path.join(repoRoot, 'plugins', expected.name);
  if (args.includes('--check')) {
    const errors = checkPlugin(target, expected);
    if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
    else console.log(`Plugin package verified: ${expected.skillCount} owned skills, ${expected.files.size} files.`);
  } else {
    writePlugin(target, expected);
    console.log(`Plugin package built: ${expected.skillCount} owned skills, ${expected.files.size} files.`);
  }
}
