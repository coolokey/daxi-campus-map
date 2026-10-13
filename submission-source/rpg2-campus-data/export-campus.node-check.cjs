const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const file = path.join(__dirname, 'export-campus.cjs');
const api = () => { assert.ok(fs.existsSync(file), 'campus exporter must exist'); return require(file); };
const digest = () => ['campus-data.js','spatial-plan-data.js','spatial-plan.js','walk-world-math.js'].map(f => crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'public/campus-explorer',f))).digest('hex'));
test('exports source order, complete inventory, canonical geometry and unresolved names without modifying sources', () => {
  const before = digest(); const {exportCampus,validateCampus} = api(); const d = exportCampus(root);
  assert.equal(d.buildings.length,12); assert.equal(d.rooms.length,92); assert.equal(d.stairs.length,13); assert.equal(d.entrances.length,30);
  assert.deepEqual([1,2,3,4].map(n=>d.rooms.filter(r=>d.floors.find(f=>f.id===r.floorId).level===n).length),[35,34,22,1]);
  assert.equal(d.rooms.filter(r=>r.nameStatus==='unverified').length,21);
  assert.equal(d.coordinateSystem.unit,'guide-unit'); assert.equal(d.coordinateSystem.measured,false);
  for(const r of d.rooms) { assert.equal(r.id,`${r.buildingId}:${r.spaceCode}`); assert.ok(r.rect && r.center && r.door && r.corridor); assert.equal(r.center.y,undefined); }
  assert.deepEqual(d.navigation,{status:'pending',nodes:[],edges:[]}); assert.deepEqual(d.roads,[]);
  assert.deepEqual(d.source.map(s=>s.sha256),before); assert.deepEqual(digest(),before);
  assert.deepEqual(validateCampus(d),{valid:true,errors:[]}); assert.equal(JSON.stringify(d),JSON.stringify(exportCampus(root)));
});
test('preserves source aliases and binds game-only quest with existing completion bridge and five questions',()=>{
 const d=api().exportCampus(root); const c=d.challenges[0];
 assert.equal(d.aliases['computer-lab-2'],'tech-building:TC-SE-2'); assert.equal(d.aliases['counseling-act'],d.aliases['mid-315']);
 assert.equal(c.id,'energy-core-01'); assert.equal(c.placementStatus,'game-only'); assert.equal(c.questionIds.length,5);
 assert.deepEqual(c.completeEvent,{type:'campus:quest-complete',questId:'energy-core'});
 assert.deepEqual(c.roomIds,['tech-building:TC-SE-2']); assert.equal(d.npcPlacements[0].placementStatus,'game-only');
 for(const p of d.portals) { const q=d.portals.find(x=>x.id===p.returnPortalId); assert.ok(q); assert.equal(q.returnPortalId,p.id); assert.equal(p.arrivalStatus,'candidate'); }
});
test('rejects broken references, duplicate IDs, nonfinite geometry and erased unknown labels',()=>{
 const {exportCampus,validateCampus}=api();
 for(const mutate of [d=>d.rooms[0].floorId='missing',d=>d.rooms[1].id=d.rooms[0].id,d=>d.rooms[0].center.x=Infinity,d=>d.rooms.find(r=>r.nameStatus==='unverified').name='已確認',d=>d.portals[0].returnPortalId='missing',d=>d.aliases.bad='missing',d=>d.rooms[0].challengeIds=['missing'],d=>d.challenges[0].roomIds=['missing']]) {
  const d=exportCampus(root); mutate(d); assert.equal(validateCampus(d).valid,false);
 }
});
test('rejects missing canonical geometry and inconsistent reverse memberships',()=>{
 const {exportCampus,validateCampus}=api();
 for(const mutate of [d=>delete d.rooms[0].center,d=>delete d.entrances[0].inside.x,d=>d.floors.find(f=>f.id===d.rooms[0].floorId).roomIds=[],d=>d.doors[0].roomId=d.rooms[1].id,d=>d.portals[0].arrival.height=NaN]) {
  const d=exportCampus(root); mutate(d); assert.equal(validateCampus(d).valid,false);
 }
});
