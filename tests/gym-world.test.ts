import {it,expect} from 'vitest';
import {existsSync,readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import * as THREE from 'three';

function build(){
 const path='public/campus-explorer/gym-world.js';
 expect(existsSync(path),'activity center has a dedicated photo-based geometry module').toBe(true);
 const api=runInNewContext(readFileSync(path,'utf8')+';CampusGymWorld',{THREE,document:{createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){},measureText:()=>({width:100}),strokeRect(){}})})}});
 const scene=new THREE.Scene(),floorMeshes:any[]=[],solids:any[]=[],volumes:any[]=[];
 const l:any={id:'gym-bld',b:{x:-80,z:58},world:(u:number,v:number,y=0)=>({x:-80+v,z:58+u,y}),rect:(u0:number,u1:number,v0:number,v1:number)=>({x0:-80+v0,x1:-80+v1,z0:58+u0,z1:58+u1}),cells:[]};
 const box=(g:any,l:any,u0:number,u1:number,v0:number,v1:number,y0:number,y1:number,mat:any,solid=false)=>{const r=l.rect(u0,u1,v0,v1),mesh=new THREE.Mesh(new THREE.BoxGeometry(v1-v0,y1-y0,u1-u0),mat);mesh.position.set((r.x0+r.x1)/2,(y0+y1)/2,(r.z0+r.z1)/2);g.add(mesh);if(solid)solids.push({u0,u1,v0,v1,y0,y1});return mesh};
 const materials=Object.fromEntries(['wall','exterior','floor','stair','handrail','skirt','steel','wood','glass'].map(k=>[k,new THREE.MeshStandardMaterial()]));
 api.build({l,scene,floorMeshes,box,slab(){},surfaceMaterials:()=>materials,cameraVolume:(...v:any[])=>volumes.push(v),details(){}});
 return {scene,floorMeshes,solids,volumes};
}
it('provides the stage, multiple badminton courts, entrance facilities and unseated tiered gallery',()=>{
 const {scene}=build();for(const name of ['gym-stage','gym-badminton-courts','gym-court-nets','gym-entrance-table-tennis','gym-entrance-washroom','gym-drinking-fountain','gym-gallery-tiers','gym-gallery-guards','gym-roof-trusses','gym-solar-array','gym-sign-chinese','gym-sign-english'])expect(scene.getObjectByName(name),name).toBeTruthy();
 expect(scene.getObjectByName('gym-badminton-courts')!.children.length).toBeGreaterThan(30);
});
it('keeps the hall open above the court and assigns visibility to every independent group',()=>{
 const {scene,floorMeshes,volumes}=build();expect(floorMeshes.length).toBeGreaterThan(3);
 for(const g of scene.children){expect(g.userData.buildingId).toBe('gym-bld');expect([1,2]).toContain(g.userData.floorNum);expect(floorMeshes).toContain(g)}
 const ceiling=scene.getObjectByName('gym-roof-trusses')!;expect(ceiling.userData.campusCeiling).toBe(true);
 expect(new THREE.Box3().setFromObject(ceiling).min.y).toBeGreaterThan(7.7);
 scene.updateMatrixWorld(true);const head=new THREE.Raycaster(new THREE.Vector3(-85,1.8,58),new THREE.Vector3(0,1,0));
 expect(head.intersectObjects(scene.children,true).filter(h=>h.object.visible)[0].point.y).toBeGreaterThan(8);
 expect(volumes.length).toBeGreaterThan(0);
});
it('protects the gallery edge while preserving the entrance, central viewing path and both stair bays',()=>{
 const {solids}=build();const hit=(u:number,v:number,y:number)=>solids.some(s=>u>s.u0-.32&&u<s.u1+.32&&v>s.v0-.32&&v<s.v1+.32&&y+.25<s.y1&&y+1.65>s.y0);
 for(const v of [17,15.6,14.2,10.6,8.5,7,0,-5])expect(hit(0,v,0),`ground central route ${v}`).toBe(false);
 for(const v of [15.6,14,12,10.6,8.5])expect(hit(0,v,3.6),`gallery central route ${v}`).toBe(false);
 for(const u of [-14,14])for(const v of [10,12,14])expect(hit(u,v,1.8),`stair bay ${u},${v}`).toBe(false);
 expect(hit(-15,-5,3.6)).toBe(true);expect(hit(15,-5,3.6)).toBe(true);
 const guard=build().scene.getObjectByName('gym-gallery-guards')!;
 expect(guard.children.filter(m=>m.visible).length).toBeGreaterThan(100);
});
it('gives the entrance a separate suspended ceiling without lowering the main hall',()=>{
 const {scene}=build(),g=scene.getObjectByName('gym-entrance-ceiling');expect(g).toBeTruthy();
 expect(g!.userData).toMatchObject({floorNum:1,campusCeiling:true});
 const bounds=new THREE.Box3().setFromObject(g!);expect(bounds.min.y).toBeGreaterThan(3.1);expect(bounds.max.y).toBeLessThan(3.43);expect(bounds.min.x).toBeGreaterThan(-73);
});
it('blocks walking through badminton nets while retaining the central hall route',()=>{
 const {solids}=build();for(const u of [-7.2,7.2])for(const v of [-7,2])expect(solids.some(s=>u>=s.u0&&u<=s.u1&&v>=s.v0&&v<=s.v1&&s.y0<.25&&s.y1>1.45)).toBe(true);
});
it('provides shallow front steps and a guarded ramp with open top and bottom mouths',()=>{
 const {scene,solids}=build();for(const name of ['gym-front-plinth','gym-front-steps','gym-access-ramp','gym-front-handrails'])expect(scene.getObjectByName(name)).toBeTruthy();
 const ramp=new THREE.Box3().setFromObject(scene.getObjectByName('gym-access-ramp')!);expect(ramp.max.y).toBeCloseTo(.126);expect(ramp.min.x).toBeCloseTo(-61.7);expect(ramp.max.x).toBeCloseTo(-55.7);
 const blocks=(u:number,v:number)=>solids.some(s=>u>s.u0-.32&&u<s.u1+.32&&v>s.v0-.32&&v<s.v1+.32&&s.y1>.3&&s.y0<1.7);
 for(const v of [17,18.3,19,20.5,22])expect(blocks(0,v)).toBe(false);
 for(const v of [18.3,21,24.3])expect(blocks(-8,v)).toBe(false);
 expect(blocks(-10,21)).toBe(true);expect(blocks(-6,21)).toBe(true);
});
it('keeps the gold English facade lettering large and its background transparent',()=>{
 const {scene}=build(),label=scene.getObjectByName('gym-sign-english')!.children[0] as THREE.Mesh;
 expect((label.geometry as THREE.PlaneGeometry).parameters.height).toBeGreaterThanOrEqual(.9);expect((label.material as THREE.MeshBasicMaterial).transparent).toBe(true);
});
it('extends the midlandings to the curved windows with open approaches and guarded sides',()=>{
 const {scene,solids}=build(),platform=scene.getObjectByName('gym-curved-window-landings');expect(platform).toBeTruthy();
 for(const [a,b] of [[-17.2,-15.42],[10.8,12.58]]){
  const center=(a+b)/2,blocks=(u:number,v:number,y:number)=>solids.some(s=>u>s.u0-.32&&u<s.u1+.32&&v>s.v0-.32&&v<s.v1+.32&&y+.25<s.y1&&y+1.65>s.y0);
  expect(blocks(center,13.9,1.8)).toBe(false);expect(blocks(center,16.8,1.8)).toBe(false);expect(blocks(center,18,0)).toBe(true);
  expect(blocks(a,17,1.8)).toBe(true);expect(blocks(center,19.3,1.8)).toBe(true);
 }
});
it('closes the outer stair-window envelope without reducing the stair-bay width',()=>{
 const {solids}=build();for(const side of [-1,1])for(const v of [10,13,16]){
  expect(solids.some(s=>side*18>s.u0&&side*18<s.u1&&v>s.v0&&v<s.v1&&s.y0===0&&s.y1>7)).toBe(true);
  expect(solids.some(s=>side*17.7>s.u0&&side*17.7<s.u1&&v>s.v0&&v<s.v1&&s.y0===0&&s.y1>7)).toBe(false);
 }
});
it('places the main curved glass below midlanding eye height',()=>{
 const {scene}=build(),glass=scene.getObjectByName('gym-tower-main-window');expect(glass).toBeTruthy();
 const bounds=new THREE.Box3().setFromObject(glass!);expect(bounds.min.y).toBeCloseTo(2.7);expect(bounds.max.y).toBeGreaterThan(6);
});
it('caps both rounded towers at their independent roof height with cutaway-aware visibility',()=>{
 const {scene,volumes}=build(),caps=scene.getObjectByName('gym-tower-caps');expect(caps).toBeTruthy();
 expect(caps!.userData).toMatchObject({floorNum:2,campusCeiling:true});expect(caps!.children).toHaveLength(2);
 const b=new THREE.Box3().setFromObject(caps!);expect(b.min.y).toBeCloseTo(10.1);expect(b.max.y).toBeCloseTo(10.1);expect(b.min.x).toBeCloseTo(-62.9);expect(b.max.x).toBeCloseTo(-58.9);
 expect(volumes.some(v=>v[1]>=10&&v[2]>=10.1)).toBe(true);
});
