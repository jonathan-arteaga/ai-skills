#!/usr/bin/env node
import fs from 'node:fs';
import { validateCatalogScope } from './lib/catalog.mjs';

try {
  const catalog = JSON.parse(fs.readFileSync(new URL('../skill-catalog.json', import.meta.url), 'utf8'));
  validateCatalogScope(catalog);
  console.log(`Validated catalog scope for ${catalog.skills.length} entries.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
