#!/usr/bin/env node
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import {fileURLToPath} from 'node:url';import {execFileSync} from 'node:child_process';
import {plan,apply,verify,rollback} from './lib/installations.mjs';
const args=process.argv.slice(2),option=n=>{const i=args.indexOf(n);return i<0?undefined:args[i+1]};
const sourceRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const storage=path.join(os.homedir(),'.local/share/arteaga-skills'),statePath=path.join(storage,'installations.json');
try{
 if(args.includes('--help')){console.log('Usage: node tools/manage-installations.mjs --profile codex|cursor|claude-code [--dry-run|--apply|--verify] [--adopt-existing]\nRollback: --rollback <backup-directory>\nOwned skills only; private/provider-managed skills are tracked separately.');process.exit(0)}
 if(option('--rollback')){rollback(path.resolve(option('--rollback')),statePath);console.log('Restored backed-up entries.');process.exit(0)}
 const allowed=new Set(['--profile','--dry-run','--apply','--verify','--adopt-existing']);
 for(let i=0;i<args.length;i++){if(!allowed.has(args[i]))throw new Error('Unknown argument: '+args[i]);if(args[i]==='--profile')i++;}
 if(args.filter(a=>['--dry-run','--apply','--verify'].includes(a)).length>1)throw new Error('Choose one operation');
 const catalog=JSON.parse(fs.readFileSync(path.join(sourceRoot,'skill-catalog.json')));
 const state=fs.existsSync(statePath)?JSON.parse(fs.readFileSync(statePath)):{};
 const preview=plan({sourceRoot,homeDir:os.homedir(),catalog,profile:option('--profile'),state,adoptExisting:args.includes('--adopt-existing')});
 if(args.includes('--verify')){const problems=verify(preview);console.log(JSON.stringify({profile:preview.profile,checked:preview.expected.length,problems},null,2));process.exitCode=problems.length?1:0}
 else if(args.includes('--apply')){
   const dirty=execFileSync('git',['status','--porcelain','--untracked-files=no'],{cwd:sourceRoot,encoding:'utf8'}).trim();if(dirty)throw new Error('Commit and review tracked source changes before installation');
   const revision=execFileSync('git',['rev-parse','HEAD'],{cwd:sourceRoot,encoding:'utf8'}).trim();
   console.log(JSON.stringify(apply(preview,{statePath,backupRoot:path.join(storage,'backups'),sourceRevision:revision}),null,2));
   const problems=verify(preview);if(problems.length)throw new Error(problems.join('\n'));
 }else console.log(JSON.stringify({profile:preview.profile,selected:preview.expected.map(e=>e.name),operations:preview.ops.map(({action,name,destination,before})=>({action,name,destination,backupRequired:!!before}))},null,2));
}catch(e){console.error(e.message);process.exitCode=1}
