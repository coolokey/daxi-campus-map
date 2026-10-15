import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import {runInContext} from 'node:vm';

function fixture(){
 const dom=new JSDOM('<body/>',{runScripts:'outside-only'}),run=(s:string)=>runInContext(s,dom.getInternalVMContext());
 for(const f of ['campus-data.js','spatial-plan-data.js','spatial-plan.js'])run(readFileSync('public/campus-explorer/'+f,'utf8'));
 return{dom,buildings:run('BUILDINGS_CONFIG'),layout:run('CampusSpatialPlan.layout'),contains:run('CampusSpatialPlan.contains')};
}
it('compiles every administrative office in one building rather than two separate blocks',()=>{
 const s=fixture(),b=s.buildings.find((b:any)=>b.id==='admin-front');
 expect(s.buildings.some((b:any)=>b.id==='admin-back')).toBe(false);
 expect(b.rooms.map((r:any)=>r.id)).toEqual(expect.arrayContaining(['academic','principal','student-affairs','general','teacher-study','admin-g89-staff']));
 expect(b.rooms.find((r:any)=>r.id==='general').name).toContain('總務處');
 expect(b.rooms.find((r:any)=>r.id==='student-affairs').name).toContain('學務處');
 const l=s.layout(b);expect(l.stairs.length).toBeGreaterThan(0);
 for(const f of [2,3]){
  const connector=l.footprints.find((p:any)=>p.floor===f&&p.part==='connector');expect(connector).toBeDefined();
  const u=(connector.u0+connector.u1)/2;
  for(let v=connector.v0;v<=connector.v1;v+=.1)expect(l.footprints.some((p:any)=>p.floor===f&&s.contains(p,u,v))).toBe(true);
  for(const edge of [connector.v0,connector.v1])expect(l.footprints.some((p:any)=>p.floor===f&&p.part!=='connector'&&s.contains(p,u,edge))).toBe(true);
 }
 s.dom.window.close();
});
it('has a genuinely elongated technology wing that reaches toward the art tower',()=>{
 const s=fixture(),l=s.layout(s.buildings.find((b:any)=>b.id==='tech-building')),parts=l.footprints.filter((p:any)=>p.floor===1),main=parts[0],wing=parts[1];
 expect((wing.u1-wing.u0)/(wing.v1-wing.v0)).toBeGreaterThan(2);
 expect(wing.u1-wing.u0).toBeGreaterThanOrEqual((main.u1-main.u0)*.85);
 expect(l.rooms).toHaveLength(10);expect(main.u1).toBe(wing.u0);
 const art=s.layout(s.buildings.find((b:any)=>b.id==='art-building'));expect(art.bounds.z0-l.bounds.z1).toBeGreaterThan(1);expect(art.bounds.z0-l.bounds.z1).toBeLessThan(4);
 const multi=s.layout(s.buildings.find((b:any)=>b.id==='multi-building'));expect(l.bounds.z0-multi.bounds.z1).toBeGreaterThanOrEqual(7);
 s.dom.window.close();
});
