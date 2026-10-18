import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const load=()=>runInNewContext(['campus-data.js','spatial-plan-data.js','spatial-plan.js'].map(f=>readFileSync('public/campus-explorer/'+f,'utf8')).join('\n')+';CampusSpatialPlan.layout(BUILDINGS_CONFIG.find(b=>b.id==="admin-front"))');
const overlaps=(a:any,b:any)=>a.u0<b.u1-1e-6&&a.u1>b.u0+1e-6&&a.v0<b.v1-1e-6&&a.v1>b.v0+1e-6;
it('uses one continuous 1F–3F stair beside general affairs and opposite oil printing',()=>{
 const l=load();expect(l.stairs).toHaveLength(1);const s=l.stairs[0],general=l.rooms.find((r:any)=>r.id==='general'),oil=l.rooms.find((r:any)=>r.id==='reception');
 expect(s.fromFloor).toBe(1);expect(s.toFloor).toBe(3);expect(s.u0).toBe(general.u1);expect(oil.u0).toBeGreaterThan(s.u1);expect(oil.doorSide).toBe('u0');
 expect(l.ramps.filter((r:any)=>r.floor===1)).toHaveLength(2);expect(l.ramps.filter((r:any)=>r.floor===2)).toHaveLength(2);expect(new Set(l.ramps.map((r:any)=>r.stairId)).size).toBe(1);
});
it('shares one external office entrance, with general left, accounting near-right and personnel far-right',()=>{
 const l=load(),room=(id:string)=>l.rooms.find((r:any)=>r.id===id),general=room('general'),accounting=room('accounting'),personnel=room('personnel-accounting');
 expect(accounting?.name).toBe('會計室 (2F)');expect(personnel.name).toBe('人事室 (2F)');
 const entry=general.sharedEntrance;expect(entry).toBeTruthy();expect(accounting.sharedEntrance.id).toBe(entry.id);expect(personnel.sharedEntrance.id).toBe(entry.id);
 expect(l.cells.filter((c:any)=>c.kind==='office-suite'&&c.floor===2&&c.doorSide)).toHaveLength(1);
 const front=l.local(entry.door.x,entry.door.z);expect(general.v).toBeGreaterThan(front.v);expect(accounting.v).toBeLessThan(front.v);expect(personnel.v).toBeLessThan(front.v);expect(accounting.u).toBeGreaterThan(personnel.u);
 const downstairs=room('student-affairs');expect(general.u0).toBe(downstairs.u0);expect(general.u1).toBe(downstairs.u1);
 const meeting=room('admin-reception-1f'),coach=room('coach-room');expect(personnel.v0).toBe(meeting.v0);expect(accounting.v0).toBe(coach.v0);
});
it('matches photo corridor: oil printing and academic on one side, principal opposite academic, one external WC',()=>{
 const l=load(),room=(id:string)=>l.rooms.find((r:any)=>r.id===id),oil=room('reception'),academic=room('academic'),principal=room('principal');
 expect(oil.u0).toBe(academic.u0);expect(oil.v1).toBe(academic.v0);expect(principal.u1).toBeLessThan(oil.u0);expect(principal.v).toBe(academic.v);
 expect(l.cells.filter((c:any)=>c.floor===2&&c.kind==='wc')).toHaveLength(1);
});
it('keeps office zones, circulation and the continuous stair opening disjoint on every floor',()=>{
 const l=load();for(const floor of [1,2,3]){const rooms=l.cells.filter((c:any)=>c.floor===floor&&['room','wc'].includes(c.kind));
 for(const r of rooms){for(const q of rooms)if(q!==r)expect(overlaps(r,q),r.id+' '+q.id).toBe(false);for(const c of l.corridors.filter((c:any)=>c.floor===floor))expect(overlaps(r,c),r.id+' corridor').toBe(false);for(const h of l.holes.filter((h:any)=>floor>=(h.fromFloor||1)&&floor<=(h.toFloor||Infinity)))expect(overlaps(r,h),r.id+' stair hole').toBe(false);}}
});
