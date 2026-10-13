'use strict';
// Offline, allowlisted classic-script compiler. No DOM, WebGL, staff or photo globals.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {createHash} = require('node:crypto');
const SOURCE_FILES = ['campus-data.js','spatial-plan-data.js','spatial-plan.js','walk-world-math.js'];
const point = p => ({x:p.x,z:p.z,height:p.y ?? p.height ?? 0});
const rectangle = r => ({x0:r.x0,x1:r.x1,z0:r.z0,z1:r.z1});
const floorId = (b,f) => `${b}:floor-${f}`;
const sceneId = (b,f) => `${b}/floor-${f}`;
const confidence = unknown => ({name:unknown?'unverified':'plan-checked',floor:'plan-checked',spaceCode:'source-derived',geometry:'schematic'});

function exportCampus(root) {
 const context = vm.createContext(Object.create(null),{codeGeneration:{strings:false,wasm:false}});
 const source = SOURCE_FILES.map(file => {
  const relative = `public/campus-explorer/${file}`;
  const content = fs.readFileSync(path.join(root,relative));
  new vm.Script(content.toString('utf8'),{filename:relative}).runInContext(context,{timeout:5000});
  return {file:relative,sha256:createHash('sha256').update(content).digest('hex'),role:'read-only campus compiler input'};
 });
 const compiled = new vm.Script('({buildings:BUILDINGS_CONFIG, aliases:CampusSpatialData.aliases, layouts:BUILDINGS_CONFIG.map(b=>CampusWalkMath.layout(b))})').runInContext(context,{timeout:5000});
 const d = {schemaVersion:'1.0.0',dataVersion:`115-${createHash('sha256').update(source.map(s=>s.sha256).join(':')).digest('hex').slice(0,16)}`,schoolYear:115,source,
  coordinateSystem:{axes:['x','z','height'],groundPlane:['x','z'],verticalAxis:'height',unit:'guide-unit',measured:false},
  buildings:[],floors:[],rooms:[],doors:[],stairs:[],entrances:[],roads:[],navigation:{status:'pending',nodes:[],edges:[]},portals:[],challenges:[],npcPlacements:[],aliases:{},
  notes:['Dimensions and stair geometry are schematic, not surveyed.','Source-derived entrances and portal arrivals require collision and connectivity verification.','Annual browser-local room name overrides are excluded.','Question content and answers remain in the original RPG question module.','NPC placement is fictional game configuration, not real teacher location.']};
 const addPair = (id,fromScene,toScene,start,end,owner) => {
  const common={...owner,arrivalStatus:'candidate',interactionRequired:true,rearm:'after-leaving-trigger',confidence:'source-derived'};
  d.portals.push({id:`${id}:forward`,fromSceneId:fromScene,toSceneId:toScene,anchor:point(start),arrival:point(end),returnPortalId:`${id}:return`,...common},
   {id:`${id}:return`,fromSceneId:toScene,toSceneId:fromScene,anchor:point(end),arrival:point(start),returnPortalId:`${id}:forward`,...common});
 };
 for(let i=0;i<compiled.buildings.length;i++) {
  const b=compiled.buildings[i],l=compiled.layouts[i];
  if(!l) throw new Error(`Missing spatial profile: ${b.id}`);
  d.buildings.push({id:b.id,name:b.name,center:{x:b.x,z:b.z,height:0},bounds:rectangle(l.bounds),floorIds:Array.from({length:b.floors},(_,n)=>floorId(b.id,n+1)),entranceIds:l.entrances.map((_,n)=>`${b.id}:entrance-${n}`),confidence:{name:'source-derived',geometry:'schematic'},sourceRefs:source.map(s=>s.file)});
  for(let f=1;f<=b.floors;f++) {
   const fid=floorId(b.id,f),elevation=(f-1)*3.6;
   d.floors.push({id:fid,buildingId:b.id,level:f,elevation,sceneId:sceneId(b.id,f),localOrigin:{x:b.x,z:b.z,height:elevation},
    footprints:l.footprints.filter(p=>p.floor===f).map(p=>rectangle(p.rect)),corridors:l.corridors.filter(p=>p.floor===f).map(p=>rectangle(p.rect)),
    holes:f===1?[]:l.holes.map(h=>rectangle(l.rect(h.u0,h.u1,h.v0,h.v1))),
    roomIds:l.rooms.filter(r=>r.floor===f).map(r=>`${b.id}:${r.spaceCode}`),stairIds:l.stairs.map(s=>s.id),blocked:[],blockedStatus:'pending-runtime-export',confidence:{floor:'plan-checked',geometry:'schematic'}});
  }
  for(const r of l.rooms) {
   const id=`${b.id}:${r.spaceCode}`,fid=floorId(b.id,r.floor),unknown=r.name.includes('待確認');
   const aliases=[r.id,...Object.keys(compiled.aliases).filter(k=>compiled.aliases[k]===r.id)];
   d.rooms.push({id,buildingId:b.id,floorId:fid,spaceCode:r.spaceCode,codeSource:r.codeSource,legacyCode:r.legacyCode??null,sourceAliases:aliases,name:r.name,nameStatus:unknown?'unverified':'plan-checked',rect:rectangle(r.rect),center:point(r.center),door:point(r.door),corridor:point(r.corridor),doorIds:[`${id}:door`],challengeIds:[],confidence:confidence(unknown)});
   d.doors.push({id:`${id}:door`,roomId:id,floorId:fid,side:r.doorSide,position:point(r.door),corridorPosition:point(r.corridor),width:null,widthStatus:'pending-runtime-export',navigationNodeIds:[],confidence:'source-derived'});
   for(const alias of aliases) { if(d.aliases[alias] && d.aliases[alias]!==id) throw new Error(`Ambiguous alias: ${alias}`); d.aliases[alias]=id; }
  }
  for(const s of l.stairs) {
   const ramps=l.ramps.filter(r=>r.stairId===s.id),platforms=l.platforms.filter(p=>p.stairId===s.id);
   const stair={id:s.id,buildingId:b.id,name:s.name,floorIds:Array.from({length:b.floors},(_,n)=>floorId(b.id,n+1)),rect:rectangle(s.rect),hole:rectangle(l.rect(s.hole.u0,s.hole.u1,s.hole.v0,s.hole.v1)),
    ramps:ramps.map(r=>({floorId:floorId(b.id,r.floor),bounds:rectangle(r),start:point(r.start),end:point(r.end),heightStart:r.h0,heightEnd:r.h1,axis:r.axis})),
    platforms:platforms.map(p=>({floorId:floorId(b.id,p.floor),rect:rectangle(p),height:p.y})),portalIds:[],confidence:{geometry:'schematic',sourceNote:s.confidence}};
   for(let f=1;f<b.floors;f++) { const flight=ramps.filter(r=>r.floor===f); if(flight.length!==2)throw new Error(`Unexpected stair flight: ${s.id}:${f}`); const id=`${s.id}:floor-${f}-${f+1}`;
    addPair(id,sceneId(b.id,f),sceneId(b.id,f+1),flight[0].start,flight[1].end,{stairId:s.id}); stair.portalIds.push(`${id}:forward`,`${id}:return`);
   }
   d.stairs.push(stair);
  }
  l.entrances.forEach((e,n)=>{ const id=`${b.id}:entrance-${n}`;
   d.entrances.push({id,buildingId:b.id,floorId:floorId(b.id,e.floor),inside:point(e.inside),outside:point(e.outside),portalIds:[`${id}:forward`,`${id}:return`],status:'candidate',confidence:'source-derived'});
   addPair(id,'campus-outdoor',sceneId(b.id,e.floor),e.outside,e.inside,{entranceId:id});
  });
 }
 const room=d.rooms.find(r=>r.id==='tech-building:TC-SE-2');
 if(!room || !room.name.includes('電腦教室二'))throw new Error('Task room source mismatch');
 room.challengeIds.push('energy-core-01');
 d.challenges.push({id:'energy-core-01',title:'能源核心修復',roomIds:[room.id],questionBankRef:'future-campus-rpg/src/data/questions.ts:firstQuestQuestions',questionIds:['g7-int-01','g7-int-02','g7-exp-01','g7-exp-02','g7-factor-01'],grade:7,legacyAliases:['energy-core'],completeEvent:{type:'campus:quest-complete',questId:'energy-core'},rewardRef:'數字研究員徽章',placementStatus:'game-only',bindingStatus:'configuration-only; not integrated into current UI'});
 d.npcPlacements.push({id:'technology-task-guide',sourceNpcId:'math-researcher',displayName:'任務導師（遊戲 NPC）',roomId:room.id,challengeIds:['energy-core-01'],position:room.center,placementStatus:'game-only'});
 // Convert realm-owned arrays to plain host JSON; only explicitly selected fields leave the VM.
 const plain=JSON.parse(JSON.stringify(d));
 const result=validateCampus(plain); if(!result.valid)throw new Error(result.errors.join('\n'));
 return plain;
}

function validateCampus(d) {
 const errors=[]; const tables=['buildings','floors','rooms','doors','stairs','entrances','portals','challenges','npcPlacements'];
 if(!d || typeof d!=='object')return {valid:false,errors:['Dataset must be an object']};
 const sets={}; const all=new Set();
 for(const table of tables) { sets[table]=new Map(); if(!Array.isArray(d[table])){errors.push(`${table}: missing table`);continue;}
  for(const row of d[table]) { if(!row || typeof row.id!=='string' || !row.id){errors.push(`${table}: missing ID`);continue;} if(all.has(row.id))errors.push(`Duplicate ID: ${row.id}`);all.add(row.id);sets[table].set(row.id,row); }
 }
 const ref=(table,id,where)=>{if(!sets[table].has(id))errors.push(`${where}: missing ${table} reference ${id}`);};
 const refs=(table,ids,where)=>{if(!Array.isArray(ids)){errors.push(`${where}: reference array missing`);return;}for(const id of ids)ref(table,id,where);};
 const walk=(v,p)=>{ if(typeof v==='number'&&!Number.isFinite(v))errors.push(`${p}: nonfinite number`); if(v&&typeof v==='object')for(const [k,x]of Object.entries(v))walk(x,`${p}.${k}`);};walk(d,'campus');
 for(const b of d.buildings||[]){refs('floors',b.floorIds,b.id);refs('entrances',b.entranceIds,b.id);}
 for(const f of d.floors||[]){ref('buildings',f.buildingId,f.id);refs('rooms',f.roomIds,f.id);refs('stairs',f.stairIds,f.id);}
 for(const r of d.rooms||[]){ref('buildings',r.buildingId,r.id);ref('floors',r.floorId,r.id);refs('doors',r.doorIds,r.id);refs('challenges',r.challengeIds,r.id);
  if(r.id!==`${r.buildingId}:${r.spaceCode}`)errors.push(`${r.id}: unstable room key`);
  if((r.nameStatus==='unverified')!==!!r.name?.includes('待確認'))errors.push(`${r.id}: unknown-name label mismatch`);
  if(sets.floors.get(r.floorId)?.buildingId!==r.buildingId)errors.push(`${r.id}: room building/floor mismatch`);
 }
 for(const door of d.doors||[]){ref('rooms',door.roomId,door.id);ref('floors',door.floorId,door.id);}
 for(const s of d.stairs||[]){ref('buildings',s.buildingId,s.id);refs('floors',s.floorIds,s.id);refs('portals',s.portalIds,s.id);for(const x of [...s.ramps,...s.platforms])ref('floors',x.floorId,s.id);}
 for(const e of d.entrances||[]){ref('buildings',e.buildingId,e.id);ref('floors',e.floorId,e.id);refs('portals',e.portalIds,e.id);}
 const requirePoint=(p,where)=>{if(!p||!['x','z','height'].every(k=>typeof p[k]==='number'&&Number.isFinite(p[k]))||'y' in p)errors.push(`${where}: missing canonical point`);};
 const requireRect=(r,where)=>{if(!r||!['x0','x1','z0','z1'].every(k=>typeof r[k]==='number'&&Number.isFinite(r[k]))||r.x0>r.x1||r.z0>r.z1)errors.push(`${where}: invalid rectangle`);};
 for(const r of d.rooms||[]) {
  for(const k of ['center','door','corridor'])requirePoint(r[k],`${r.id}.${k}`);requireRect(r.rect,r.id);
  if(!sets.floors.get(r.floorId)?.roomIds.includes(r.id))errors.push(`${r.id}: absent from floor membership`);
  for(const id of r.doorIds||[])if(sets.doors.get(id)?.roomId!==r.id)errors.push(`${r.id}: door reverse membership mismatch`);
 }
 for(const f of d.floors||[])for(const k of ['footprints','corridors','holes']){if(!Array.isArray(f[k]))errors.push(`${f.id}: missing ${k}`);else for(const r of f[k])requireRect(r,`${f.id}.${k}`);}
 for(const e of d.entrances||[]){requirePoint(e.inside,e.id);requirePoint(e.outside,e.id);}
 for(const s of d.stairs||[]){requireRect(s.rect,s.id);requireRect(s.hole,s.id);for(const r of s.ramps||[]){requirePoint(r.start,s.id);requirePoint(r.end,s.id);requireRect(r.bounds,s.id);}}
 for(const p of d.portals||[]){requirePoint(p.anchor,p.id);requirePoint(p.arrival,p.id);}
 const scenes=new Set(['campus-outdoor',...(d.floors||[]).map(f=>f.sceneId)]);
 for(const p of d.portals||[]){ref('portals',p.returnPortalId,p.id);const back=sets.portals.get(p.returnPortalId);if(back && (back.returnPortalId!==p.id||back.fromSceneId!==p.toSceneId||back.toSceneId!==p.fromSceneId))errors.push(`${p.id}: portal pair mismatch`);if(!scenes.has(p.fromSceneId)||!scenes.has(p.toSceneId))errors.push(`${p.id}: unknown scene`);if(p.stairId)ref('stairs',p.stairId,p.id);if(p.entranceId)ref('entrances',p.entranceId,p.id);}
 for(const c of d.challenges||[])refs('rooms',c.roomIds,c.id);
 for(const n of d.npcPlacements||[]){ref('rooms',n.roomId,n.id);refs('challenges',n.challengeIds,n.id);if(n.placementStatus!=='game-only')errors.push(`${n.id}: NPC must remain game-only`);}
 for(const [alias,id]of Object.entries(d.aliases||{}))ref('rooms',id,`alias ${alias}`);
 if(d.coordinateSystem?.unit!=='guide-unit'||d.coordinateSystem?.measured!==false)errors.push('Coordinate units must remain unmeasured guide-unit');
 return {valid:errors.length===0,errors};
}
module.exports={exportCampus,validateCampus};
if(require.main===module){
 try { const args=process.argv.slice(2);let root,out;for(let i=0;i<args.length;i++){if(args[i]==='--root')root=args[++i];else if(args[i]==='--out')out=args[++i];else throw new Error(`Unknown option ${args[i]}`);}
  if(!root||!out)throw new Error('Usage: node export-campus.cjs --root <source-repo> --out <output.json>');
  const data=exportCampus(path.resolve(root));fs.mkdirSync(path.dirname(path.resolve(out)),{recursive:true});fs.writeFileSync(path.resolve(out),JSON.stringify(data,null,2)+'\n');console.log(`Exported ${data.buildings.length} buildings, ${data.rooms.length} rooms to ${out}`);
 }catch(error){console.error(error.message);process.exitCode=1;}
}

