import { expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';

const file='public/campus-explorer/navigation-arrows.js';
const context=vm.createContext({window:{},THREE});
if(existsSync(file))vm.runInContext(readFileSync(file,'utf8'),context);
const create=()=>{expect((context.window as any).CampusNavigationArrows).toBeDefined();return (context.window as any).CampusNavigationArrows.create(THREE);};
const p=(x:number,y:number,z:number)=>new THREE.Vector3(x,y+.6,z);
const pose=(mesh:THREE.InstancedMesh,index:number)=>{const m=new THREE.Matrix4();mesh.getMatrixAt(index,m);return {position:new THREE.Vector3().setFromMatrixPosition(m),forward:new THREE.Vector3(0,0,1).transformDirection(m),up:new THREE.Vector3(0,1,0).transformDirection(m)};};

it('places forward arrows on both legs without cutting a right-angle corner',()=>{
 const arrows=create();arrows.setPath([p(0,0,0),p(0,0,9),p(9,0,9)]);
 const mesh=arrows.group.children[1];expect(mesh.count).toBeGreaterThan(3);
 expect(mesh.material.depthWrite).toBe(true);
 for(let i=0;i<mesh.count;i++){const {position,forward}=pose(mesh,i);expect(Math.min(Math.abs(position.x),Math.abs(position.z-9))).toBeLessThan(.001);expect(position.y).toBeCloseTo(.075);expect(position.z<8.5?forward.z:forward.x).toBeCloseTo(1);}
});
it('handles dense navigation nodes and aligns each arrow with the stair slope',()=>{
 const arrows=create();arrows.setPath(Array.from({length:61},(_,i)=>p(0,i*.06,i*.1)));
 const mesh=arrows.group.children[1];expect(mesh.count).toBeGreaterThan(1);
 for(let i=0;i<mesh.count;i++){
  const {position,forward}=pose(mesh,i);expect(position.y).toBeCloseTo(position.z*.6+.235);expect(forward.y/forward.z).toBeCloseTo(.6);
  // Each real stair tread uses the next step's height, above the smooth walk ramp.
  const vertices=mesh.geometry.getAttribute('position'),matrix=new THREE.Matrix4();mesh.getMatrixAt(i,matrix);
  for(let v=0;v<vertices.count;v++){const vertex=new THREE.Vector3().fromBufferAttribute(vertices,v).applyMatrix4(matrix);expect(vertex.y).toBeGreaterThan(Math.ceil(vertex.z*.6/.15)*.15+.018);}
 }
});
it('animates only while walking and removes arrows after arrival or cancellation',()=>{
 const arrows=create();arrows.setPath([p(0,0,0),p(0,0,20)]);
 const mesh=arrows.group.children[1],a=new THREE.Color(),b=new THREE.Color();
 arrows.update(0,{status:'walking',index:0},false);mesh.getColorAt(0,a);
 arrows.update(.4,{status:'walking',index:0},false);mesh.getColorAt(0,b);expect(a.equals(b)).toBe(false);
 arrows.update(0,{status:'paused',index:0},false);mesh.getColorAt(0,a);arrows.update(.4,{status:'paused',index:0},false);mesh.getColorAt(0,b);expect(a.equals(b)).toBe(true);
 arrows.update(0,{status:'walking',index:0},true);mesh.getColorAt(0,a);arrows.update(.4,{status:'walking',index:0},true);mesh.getColorAt(0,b);expect(a.equals(b)).toBe(true);
 arrows.update(0,{status:'arrived',index:0},false);expect(arrows.group.visible).toBe(false);
 arrows.update(0,{status:'cancelled',index:0},false);expect(arrows.group.visible).toBe(false);
});
it('clears old route resources and tolerates empty or duplicate-only paths',()=>{
 const arrows=create();arrows.setPath([p(0,0,0),p(0,0,10)]);const mesh=arrows.group.children[0];let disposed=0;mesh.addEventListener('dispose',()=>disposed++);
 arrows.setPath([]);expect(disposed).toBe(1);expect(arrows.group.children).toHaveLength(0);
 arrows.setPath([p(0,0,0),p(0,0,0)]);expect(arrows.group.children).toHaveLength(0);
});

it('leaves clearance around a turn even when graph nodes are only a tenth of a unit apart',()=>{
 const arrows=create();arrows.setPath([...Array.from({length:91},(_,i)=>p(0,0,i*.1)),...Array.from({length:90},(_,i)=>p((i+1)*.1,0,9))]);
 const mesh=arrows.group.children[1];
 for(let i=0;i<mesh.count;i++){const {position}=pose(mesh,i);expect(Math.hypot(position.x,position.z-9)).toBeGreaterThanOrEqual(.79);}
});
it('hides passed arrows and reapplies progress after replacing a route',()=>{
 const arrows=create(),points=[p(0,0,0),p(0,0,5),p(0,0,10)];
 for(let n=0;n<2;n++){
  arrows.setPath(points);arrows.update(0,{status:'walking',index:1},false);
  const matrix=new THREE.Matrix4();arrows.group.children[1].getMatrixAt(0,matrix);
  expect(new THREE.Vector3().setFromMatrixScale(matrix).length()).toBe(0);
 }
});
