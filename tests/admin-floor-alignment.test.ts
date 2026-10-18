import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const load=()=>runInNewContext(['campus-data.js','spatial-plan-data.js','spatial-plan.js'].map(f=>readFileSync('public/campus-explorer/'+f,'utf8')).join('\n')+';CampusSpatialPlan.layout(BUILDINGS_CONFIG.find(b=>b.id==="admin-front"))');
const bounds=(r:any)=>[r.u0,r.u1,r.v0,r.v1];
it('places adjoining principal and printing rooms exactly over the west staff room',()=>{
 const l=load(),room=(id:string)=>l.rooms.find((r:any)=>r.id===id),west=room('admin-g89-staff'),oil=room('reception'),principal=room('principal');
 expect(west.name).toContain('西側');for(const r of [oil,principal])expect([r.v0,r.v1]).toEqual([west.v0,west.v1]);
 expect(oil.u0).toBe(west.u0);expect(oil.u1).toBe(principal.u0);expect(principal.u1).toBe(west.u1);
});
it('places academic affairs exactly over the east staff room',()=>{
 const l=load(),room=(id:string)=>l.rooms.find((r:any)=>r.id===id),east=room('admin-g89-staff-east');expect(east.name).toContain('東側');expect(bounds(room('academic'))).toEqual(bounds(east));
});
it('stacks the second-floor general WC directly above the first-floor general WC',()=>{
 const l=load(),lower=l.cells.find((c:any)=>c.floor===1&&c.kind==='wc'&&!c.accessible),upper=l.cells.find((c:any)=>c.floor===2&&c.kind==='wc');expect(bounds(upper)).toEqual(bounds(lower));
});

it('faces the printing door toward the stairwell and principal toward academic across the hall',()=>{
 const l=load(),room=(id:string)=>l.rooms.find((r:any)=>r.id===id),oil=room('reception'),principal=room('principal'),academic=room('academic'),s=l.stairs[0];
 expect(oil.doorSide).toBe('u0');expect(l.local(oil.door.x,oil.door.z).v).toBeCloseTo(s.centerV);
 expect(principal.doorSide).toBe('v0');expect(academic.doorSide).toBe('v1');
 const p=l.local(principal.door.x,principal.door.z),a=l.local(academic.door.x,academic.door.z);
 expect(p.u).toBe(a.u);expect(p.v).toBeGreaterThan(a.v);
});
