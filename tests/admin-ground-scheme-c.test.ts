import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const load=()=>runInNewContext(['campus-data.js','spatial-plan-data.js','spatial-plan.js'].map(f=>readFileSync('public/campus-explorer/'+f,'utf8')).join('\n')+';(()=>{const b=BUILDINGS_CONFIG.find(b=>b.id==="admin-front");return {b,l:CampusSpatialPlan.layout(b),aliases:CampusSpatialData.aliases}})()');
it('splits the front staff office around the central through-hall and retains two separate WCs',()=>{
 const {l,b}=load(),west=l.rooms.find((r:any)=>r.id==='admin-g89-staff'),east=l.rooms.find((r:any)=>r.id==='admin-g89-staff-east');
 expect(east).toBeTruthy();expect(west.u1).toBeLessThan(0);expect(east.u0).toBeGreaterThan(0);
 expect(l.cells.filter((c:any)=>c.floor===1&&c.kind==='wc')).toHaveLength(2);
 expect(b.rooms.find((r:any)=>r.id==='admin-reception-1f')).toMatchObject({floor:1,cat:'admin'});expect(b.rooms.find((r:any)=>r.id==='admin-g89-staff-east').cat).toBe('admin');
 for(const v of [-6,0,4])expect(l.corridors.some((c:any)=>c.floor===1&&c.u0<=0&&c.u1>=0&&c.v0<=v&&c.v1>=v)).toBe(true);
});
it('enters the meeting and coach rooms independently from the right corridor, matching B',()=>{
 const {l}=load(),meeting=l.rooms.find((r:any)=>r.id==='admin-reception-1f'),coach=l.rooms.find((r:any)=>r.id==='coach-room');
 expect(meeting).toBeTruthy();
 for(const r of [meeting,coach]){expect(r.doorSide).toBe('u1');const q=l.local(r.corridor.x,r.corridor.z);expect(q.u).toBeGreaterThan(r.u1);expect(l.corridors.some((c:any)=>c.floor===1&&c.u0<=q.u&&c.u1>=q.u&&c.v0<=q.v&&c.v1>=q.v)).toBe(true)}
 expect(meeting.v1).toBeLessThanOrEqual(coach.v0);
});
it('gives the shared stair a ground entrance on its left and a level landing, matching E',()=>{
 const {l}=load(),s=l.stairs[0];expect(s.groundEntry?.doorSide).toBe('u0');
 const a=l.local(s.groundEntry.outside.x,s.groundEntry.outside.z),b=l.local(s.groundEntry.inside.x,s.groundEntry.inside.z);
 expect(a.u).toBeLessThan(s.u0);expect(b.u).toBeGreaterThan(s.u0);expect(a.v).toBeCloseTo(b.v);
 expect(l.entrances.some((e:any)=>e.kind==='east-breezeway')).toBe(true);
});
