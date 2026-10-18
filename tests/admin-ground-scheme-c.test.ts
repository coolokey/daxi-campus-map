import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const load=()=>runInNewContext(['campus-data.js','spatial-plan-data.js','spatial-plan.js'].map(f=>readFileSync('public/campus-explorer/'+f,'utf8')).join('\n')+';(()=>{const layouts=BUILDINGS_CONFIG.map(CampusSpatialPlan.layout);return {l:layouts.find(l=>l.id==="admin-front"),layouts,junctions:CampusSpatialPlan.junctions(layouts)}})()');
it('matches the approved rotated offices and gives the entire lower-left area to student affairs',()=>{
 const {l}=load(),room=(id:string)=>l.rooms.find((r:any)=>r.id===id),staff=room('admin-g89-staff'),east=room('admin-g89-staff-east'),affairs=room('student-affairs'),meeting=room('admin-reception-1f'),coach=room('coach-room');
 expect(staff.u0).toBeGreaterThan(0);expect(east.u0).toBeGreaterThan(0);expect(east.v1).toBeLessThan(staff.v0);
 expect(meeting.u1).toBeLessThanOrEqual(coach.u0);expect(coach.u1).toBeLessThan(0);
 expect(affairs.u0).toBe(-13);expect(affairs.v1).toBeGreaterThan(2);expect(affairs.v0).toBeLessThan(-4);
 expect(l.cells.some((c:any)=>c.floor===1&&c.kind==='wc'&&c.u0<affairs.u1&&c.u1>affairs.u0&&c.v0<affairs.v1&&c.v1>affairs.v0)).toBe(false);
});
it('places the rear WC next to the coach and identifies the front WC as accessible',()=>{
 const {l}=load(),wcs=l.cells.filter((c:any)=>c.floor===1&&c.kind==='wc'),coach=l.rooms.find((r:any)=>r.id==='coach-room');
 expect(wcs).toHaveLength(2);const accessible=wcs.find((c:any)=>c.accessible),rear=wcs.find((c:any)=>!c.accessible);
 expect(accessible?.label).toBe('無障礙廁所');expect(rear.label).toBe('男女廁所');expect(rear.u0).toBe(coach.u1);expect(rear.v0).toBe(coach.v0);
});
it('keeps existing entrances and an unobstructed central hall to the rear connector',()=>{
 const {l,junctions}=load();
 const expected={main:[-24.6,28.5],side:[-19.8,40.4],'east-breezeway':[-14.25,42.5]};
 for(const [kind,[x,z]] of Object.entries(expected)){const e=l.entrances.find((e:any)=>e.kind===kind);expect(e.inside.x).toBeCloseTo(x);expect(e.inside.z).toBeCloseTo(z);}
 for(let v=-15.4;v<=5;v+=.5){expect(l.corridors.some((c:any)=>c.floor===1&&c.u0<=0&&c.u1>=0&&c.v0<=v&&c.v1>=v)).toBe(true);expect(l.cells.some((c:any)=>c.floor===1&&['room','wc','stair'].includes(c.kind)&&c.u0<0&&c.u1>0&&c.v0<v&&c.v1>v)).toBe(false);}
 expect(junctions.some((j:any)=>j.a==='admin-front'&&j.b==='grade9-back'&&j.floor===1)).toBe(true);
});
it('uses the new ground stair beside the hall without leaving the obsolete ramp across it',()=>{
 const {l}=load(),ground=l.stairs.find((s:any)=>s.fromFloor===1);
 expect(ground).toBeTruthy();expect(ground.u1).toBeLessThan(0);expect(ground.toFloor).toBe(3);expect(l.stairs).toHaveLength(1);
 expect(l.ramps.filter((r:any)=>r.floor===1).every((r:any)=>Math.max(l.local(r.start.x,r.start.z).u,l.local(r.end.x,r.end.z).u)<0)).toBe(true);
 expect(l.rooms.find((r:any)=>r.id==='academic').floor).toBe(2);
});
