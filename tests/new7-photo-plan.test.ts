import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import * as THREE from 'three';
const read=(name:string)=>readFileSync(new URL('../public/campus-explorer/'+name,import.meta.url),'utf8');
function load(){
 let plan=read('spatial-plan.js');
 // Temporary integration fixture; by default every assertion uses the real shared plan.
 if(process.env.NEW7_PLAN_SNIPPET==='1'){
  const snippet=readFileSync(new URL('../qa/northeast-photo-review-2026-10-25/new7-plan-snippet.txt',import.meta.url),'utf8');
  plan=plan.replace(/   if\(p.shape==='new7'\)\{[\s\S]*?(?=   if\(p.shape==='multi'\))/,snippet+'\n');
 }
 return runInNewContext([read('campus-data.js'),read('spatial-plan-data.js'),plan,';({plan:CampusSpatialPlan,b:BUILDINGS_CONFIG.find(b=>b.id==="new-grade7")})'].join('\n'));
}
it('keeps every confirmed destination and floor while opening the three-storey court',()=>{
 const {plan,b}=load(),l=plan.layout(b);
 expect(l.rooms.map((r:any)=>[r.id,r.floor,r.name])).toEqual(b.rooms.map((r:any)=>[r.id,r.floor,r.name]));
 for(const floor of [1,2,3]){
  expect(l.footprints.some((p:any)=>p.floor===floor&&plan.contains(p,0,6))).toBe(false);
  expect(l.footprints.some((p:any)=>p.floor===floor&&plan.contains(p,20,12))).toBe(true);
 }
 expect(l.footprints.filter((p:any)=>p.kind==='photo-hall').map((p:any)=>p.floor)).toEqual([1]);
 expect(l.footprints.find((p:any)=>p.kind==='photo-hall')).toMatchObject({u0:-31,u1:-15,v0:1,v1:15});
 expect(l.stairs[0]).toMatchObject({u0:-15,u1:-7,v0:-7,v1:-1.8});
 for(const floor of [1,2,3]){
  const extension=l.footprints.find((p:any)=>p.floor===floor&&p.part==='glass-tower-extension');
  expect(extension).toMatchObject({u0:-15,v0:1,v1:2});
  expect(extension.u1).toBeCloseTo(l.stairs[0].nearU-.14);
 }
 expect(l.rooms.some((r:any)=>r.row==='photo-hall')).toBe(false);
 expect(Math.max(...l.footprints.map((p:any)=>p.rect.z1))).toBeLessThanOrEqual(-43);
});
it('keeps the west switchback clear of rooms and the corridor, and enters through the court',()=>{
 const {plan,b}=load(),l=plan.layout(b),s=l.stairs[0];
 expect(s.u1-s.u0).toBeGreaterThanOrEqual(8);expect(s.v1-s.v0).toBeCloseTo(5.2);
 const overlaps=(a:any,b:any)=>a.u0<b.u1-1e-6&&a.u1>b.u0+1e-6&&a.v0<b.v1-1e-6&&a.v1>b.v0+1e-6;
 for(const r of l.rooms)expect(overlaps(s,r),r.id).toBe(false);
 for(const c of l.corridors)expect(overlaps(s.hole,c)).toBe(false);
 const main=l.entrances.find((e:any)=>e.kind==='main');
 expect(l.local(main.inside.x,main.inside.z).u).toBeCloseTo(0);
 expect(l.local(main.inside.x,main.inside.z).v).toBeCloseTo(-.4);
 expect(l.local(main.outside.x,main.outside.z).v).toBeCloseTo(16.2);
});
it('supports each visible exterior tread and the east ramp while leaving the central route level',()=>{
 const {plan,b}=load(),l=plan.layout(b);
 expect(l.footprints.some((p:any)=>p.floor===1&&plan.contains(p,12.8,4.2))).toBe(true);
 for(const [u,v,h] of [[5,1.4,.18],[5,2.2,.12],[5,3,.06],[12.8,4.2,.09],[0,2,0]]){
  const p=l.world(u,v,h);expect(plan.groundAt(l,p.x,p.z,h)).toBeCloseTo(h);
 }
});
it('builds the low hall, stair glazing, columns and tree trunks before indexing, with roof cutaway metadata',()=>{
 const {plan,b}=load(),l=plan.layout(b),scene=new THREE.Scene(),floorMeshes:any[]=[],solids:any[]=[];
 const build=runInNewContext(read('new7-world.js')+';CampusNew7World.build',{THREE,document:{createElement:()=>({width:0,height:0,getContext:()=>null})}});
 const box=(g:any,l:any,u0:number,u1:number,v0:number,v1:number,y0:number,y1:number,mat:any,solid=false)=>{
  const p=l.world((u0+u1)/2,(v0+v1)/2,(y0+y1)/2),m=new THREE.Mesh(new THREE.BoxGeometry(u1-u0,y1-y0,v1-v0),mat);m.position.set(p.x,p.y,p.z);g.add(m);
  if(solid)solids.push({group:g.name,u0,u1,v0,v1,y0,y1});return m;
 };
 const stone=new THREE.MeshStandardMaterial(),glass=new THREE.MeshStandardMaterial();
 const core=new THREE.Group();core.name='floor-1';core.userData={buildingId:b.id,floorNum:1};scene.add(core);floorMeshes.push(core);
 const s=l.stairs[0],coreFront=box(core,l,s.u0,s.nearU-.14,s.v1-.09,s.v1+.09,0,3.6,stone);
 build({l,scene,floorMeshes,box,surfaceMaterials:()=>({exterior:stone,glass})});
 expect(solids.some(p=>p.group==='new7-low-high-window-hall'&&p.y1===5.5)).toBe(true);
 expect(solids.some(p=>p.group==='new7-low-high-window-hall'&&p.y0===.6&&p.y1===4.7)).toBe(true);
 expect(solids.filter(p=>p.group==='new7-photo-courtyard'&&p.y1===2.5)).toHaveLength(4);
 expect(floorMeshes.filter(g=>g.name.includes('roof')||g.name.includes('cap')).every(g=>g.userData.campusCeiling===true)).toBe(true);
 expect(floorMeshes.find(g=>g.name==='new7-low-hall-terrace-roof').userData.floorNum).toBe(1);
 expect(floorMeshes.every(g=>g.userData.buildingId===b.id)).toBe(true);
 expect(coreFront.name).toBe('new7-actual-stair-glazing');
 expect((coreFront.material as THREE.MeshStandardMaterial).transparent).toBe(true);
 const towerSolids=solids.filter(p=>p.group.startsWith('new7-glass-stair-tower'));
 expect(towerSolids).toHaveLength(9);
 expect(towerSolids.every(p=>p.v0>=1)).toBe(true);
 expect(towerSolids.some(p=>p.v0===1.96&&p.v1===2.04)).toBe(true);
 expect(solids.filter(p=>p.group==='new7-low-high-window-hall').every(p=>p.u1<=-15)).toBe(true);
 // The main court axis must have no new blocking walls/trunks or ramp rails.
 expect(solids.some(p=>p.u0<.4&&p.u1>-.4&&p.v0<15&&p.v1>1&&p.y1>.35)).toBe(false);
});
