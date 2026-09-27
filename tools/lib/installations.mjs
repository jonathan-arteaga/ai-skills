import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const digest = b => crypto.createHash('sha256').update(b).digest('hex');
const exists = p => fs.existsSync(p) || (()=>{try{fs.lstatSync(p);return true;}catch{return false;}})();
export function fingerprint(root) {
  const result={};
  function walk(p){for(const e of fs.readdirSync(p,{withFileTypes:true})){
    const f=path.join(p,e.name);
    if(e.isSymbolicLink())throw new Error(`Source contains a symlink: ${f}`);
    if(e.isDirectory())walk(f);else if(e.isFile())result[path.relative(root,f)]={sha256:digest(fs.readFileSync(f)),executable:Boolean(fs.statSync(f).mode&0o111)};
  }}
  walk(root);return result;
}
export function snapshot(p){
  if(!exists(p))return null;
  if(fs.lstatSync(p).isSymbolicLink())return {link:fs.readlinkSync(p)};
  if(!fs.statSync(p).isDirectory())throw new Error(`Destination is not a skill directory: ${p}`);
  return {files:fingerprint(p)};
}
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export function plan({sourceRoot,homeDir,catalog,profile,state={},adoptExisting=false}) {
  if(!['codex','cursor','claude-code'].includes(profile))throw new Error('Unsupported local profile');
  // Every host receives the same owned skills; the profile only selects the destination.
  const owned=catalog.skills.filter(s=>s.sourceType==='Owned');
  const names=new Set(owned.map(s=>s.name));
  const chosen=owned.map(s=>s.name);
  const root=path.join(homeDir,profile==='codex'?'.agents':profile==='cursor'?'.cursor':'.claude','skills');
  const ops=[],expected=[];
  for(const name of chosen){
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)||!names.has(name))throw new Error(`Unknown profile skill: ${name}`);
    const source=path.join(sourceRoot,'.agents/skills',name);
    if(!fs.existsSync(path.join(source,'SKILL.md')))throw new Error(`Missing source: ${name}`);
    const record=owned.find(s=>s.name===name);
    for(const dep of record.dependencies??[])if(!chosen.includes(dep))throw new Error(`Missing dependency: ${name} -> ${dep}`);
    const files=fingerprint(source);const destination=path.join(root,name);const before=snapshot(destination);
    expected.push({name,source,destination,files});
    if(before?.link && path.resolve(path.dirname(destination),before.link)===source)continue;
    if(before && !adoptExisting && !equal(before,state.entries?.[destination]))throw new Error(`Unmanaged or modified destination: ${destination}; review and use --adopt-existing to preserve it in backup`);
    ops.push({action:'link',name,source,destination,before});
  }
  // Retire only identities in the managed catalog, never arbitrary user skills.
  const managed=new Set([...names,...catalog.skills.filter(s=>s.sourceType==='External').map(s=>s.name)]);
  const roots=profile==='codex'?[root,path.join(homeDir,'.codex/skills')]:[root];
  for(const dir of roots){if(!fs.existsSync(dir))continue;for(const name of fs.readdirSync(dir)){
    if(!managed.has(name)||chosen.includes(name)&&dir===root)continue;
    const destination=path.join(dir,name),before=snapshot(destination);
    if(before&&!adoptExisting&&!equal(before,state.entries?.[destination]))throw new Error(`Unmanaged or modified destination: ${destination}; review before retirement`);
    ops.push({action:'retire',name,destination,before});
  }}
  return {profile,sourceRoot,expected,ops};
}
export function apply(preview,{statePath,backupRoot,sourceRevision}) {
  // Preflight all destinations before writing any of them.
  for(const op of preview.ops)if(!equal(snapshot(op.destination),op.before))throw new Error(`Destination changed after preview: ${op.destination}`);
  const oldState=fs.existsSync(statePath)?fs.readFileSync(statePath,'utf8'):null;
  const state=oldState?JSON.parse(oldState):{version:1,entries:{},profiles:{}};
  const backup=path.join(backupRoot,`${Date.now()}-${crypto.randomBytes(4).toString('hex')}`);fs.mkdirSync(backup,{recursive:true,mode:0o700});
  const journal={profile:preview.profile,oldState,ops:[]};
  fs.writeFileSync(path.join(backup,'journal.json'),JSON.stringify(journal,null,2));
  try{
    for(const [i,op] of preview.ops.entries()){
      const saved=path.join(backup,String(i));
      if(op.before)fs.renameSync(op.destination,saved);
      journal.ops.push({...op,saved:op.before?saved:null});
      fs.writeFileSync(path.join(backup,'journal.json'),JSON.stringify(journal,null,2));
      if(op.action==='link'){fs.mkdirSync(path.dirname(op.destination),{recursive:true});fs.symlinkSync(op.source,op.destination,'dir');state.entries[op.destination]={link:op.source};}
      else delete state.entries[op.destination];
    }
    for(const e of preview.expected)state.entries[e.destination]={link:e.source};
    state.profiles[preview.profile]={sourceRevision,sourceRoot:preview.sourceRoot,verifiedAt:new Date().toISOString(),skills:preview.expected.map(({name,files})=>({name,files}))};
    fs.mkdirSync(path.dirname(statePath),{recursive:true,mode:0o700});fs.writeFileSync(statePath,JSON.stringify(state,null,2)+'\n',{mode:0o600});
    journal.stateAfter=digest(fs.readFileSync(statePath));fs.writeFileSync(path.join(backup,'journal.json'),JSON.stringify(journal,null,2));
    return {backup,changed:preview.ops.length};
  }catch(error){
    for(const op of [...journal.ops].reverse()){
      if(exists(op.destination)&&fs.lstatSync(op.destination).isSymbolicLink()&&fs.readlinkSync(op.destination)===op.source)fs.unlinkSync(op.destination);
      if(op.saved&&exists(op.saved))fs.renameSync(op.saved,op.destination);
    }
    if(oldState!==null)fs.writeFileSync(statePath,oldState);else if(fs.existsSync(statePath))fs.unlinkSync(statePath);
    throw error;
  }
}
export function verify(preview){
  const problems=[];
  for(const e of preview.expected){
    if(!fs.existsSync(path.join(e.destination,'SKILL.md'))){problems.push(`Missing: ${e.name}`);continue;}
    if(fs.realpathSync(e.destination)!==fs.realpathSync(e.source)||!equal(fingerprint(e.destination),e.files))problems.push(`Drift: ${e.name}`);
  }
  for(const op of preview.ops)if(op.action==='retire'&&exists(op.destination))problems.push(`Unexpected active entry: ${op.name}`);
  return problems;
}
export function rollback(backup,statePath){
  const journal=JSON.parse(fs.readFileSync(path.join(backup,'journal.json')));
  if(journal.stateAfter&&(!fs.existsSync(statePath)||digest(fs.readFileSync(statePath))!==journal.stateAfter))throw new Error('Rollback newer installations first; state changed after this migration');
  for(const op of journal.ops){
    const expected=op.action==='link'?{link:op.source}:null;
    if(!equal(snapshot(op.destination),expected))throw new Error(`Rollback would overwrite newer work: ${op.destination}`);
  }
  for(const op of [...journal.ops].reverse()){
    if(op.action==='link')fs.unlinkSync(op.destination);
    if(op.saved)fs.renameSync(op.saved,op.destination);
  }
  if(journal.oldState!==null)fs.writeFileSync(statePath,journal.oldState);else if(fs.existsSync(statePath))fs.unlinkSync(statePath);
}
