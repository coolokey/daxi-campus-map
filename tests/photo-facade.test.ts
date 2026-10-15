import {it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import {runInContext} from 'node:vm';
import * as THREE from 'three';

function build(teaching=false){
 const dom=new JSDOM('<body/>',{runScripts:'outside-only'}),w=dom.window as any;
 w.THREE=THREE;
 w.HTMLCanvasElement.prototype.getContext=function(){return new Proxy({canvas:this,measureText:()=>({width:40})},{get:(o,k)=>k in o?(o as any)[k]:()=>{},set:(o,k,v)=>((o as any)[k]=v,true)})};
 const run=(code:string)=>runInContext(code,dom.getInternalVMContext());
 for(const file of ['campus-data.js','spatial-plan-data.js','spatial-plan.js','walk-world-math.js'])run(readFileSync('public/campus-explorer/'+file,'utf8'));
 const scene=new THREE.Scene(),floorMeshes:any[]=[],solids:any[]=[];
 w.floorMeshes=floorMeshes;w.WALL_COLLIDERS=solids;w.AVATAR_COLLISION_RADIUS=.42;w.AVATAR_HEIGHT=1.8;
 w.registerWallCollider=(x0:number,x1:number,z0:number,z1:number,y0:number,y1:number)=>solids.push({x0,x1,z0,z1,y0,y1});w.CampusCollisionGrid={create:()=>({})};
 w.campusWalkWorld={layouts:run('BUILDINGS_CONFIG.map(CampusWalkMath.layout)')};
 w.campusExplorer={scene,walkWorld:w.campusWalkWorld};
 run(readFileSync('public/campus-explorer/photo-facade.js','utf8'));
 if(teaching){expect(existsSync('public/campus-explorer/photo-teaching.js')).toBe(true);run(readFileSync('public/campus-explorer/photo-teaching.js','utf8'));}
 return {dom,w,scene,floorMeshes,solids};
}
it('uses tall stone square columns and a recessed glazed entrance instead of low circular porch walls',()=>{
 const s=build(),entrance=s.scene.getObjectByName('photo-admin-entrance')!;
 const columns=entrance.children.filter(o=>o.name==='admin-porch-column');expect(columns).toHaveLength(2);
 for(const column of columns){const b=new THREE.Box3().setFromObject(column);expect(b.max.y).toBeGreaterThan(6.7);expect(b.max.x-b.min.x).toBeGreaterThan(.45);}
 const canopy=s.scene.getObjectByName('admin-porch-canopy')!;expect(new THREE.Box3().setFromObject(canopy).min.y).toBeGreaterThan(6.6);
 expect(s.scene.getObjectByName('admin-entrance-transom')).toBeTruthy();expect(s.scene.getObjectByName('admin-trophy-cabinet')).toBeTruthy();s.dom.window.close();
});
it('keeps the main entrance and both existing end entrances free of new collision volumes',()=>{
 const s=build(),l=s.w.campusWalkWorld.layouts.find((l:any)=>l.id==='admin-front');
 for(const e of l.entrances)for(let i=0;i<=30;i++){
  const t=i/30,p={x:e.inside.x+(e.outside.x-e.inside.x)*t,z:e.inside.z+(e.outside.z-e.inside.z)*t};
  expect(s.solids.some(c=>p.x>c.x0-.42&&p.x<c.x1+.42&&p.z>c.z0-.42&&p.z<c.z1+.42&&c.y0<1.8&&c.y1>.25),JSON.stringify(p)).toBe(false);
 }
 s.dom.window.close();
});
it('makes the cube four tiles across on all six faces with an opaque dark core and no floating corner',()=>{
 const s=build(),cube=s.scene.getObjectByName('photo-admin-rubiks-cube')!;expect(cube).toBeTruthy();
 expect(cube.children.filter(o=>o.name==='cube-tile')).toHaveLength(96);
 expect(cube.children.find(o=>o.name==='cube-core')).toBeTruthy();
 expect(new THREE.Box3().setFromObject(cube).min.y).toBeGreaterThanOrEqual(.05);expect(new THREE.Box3().setFromObject(cube).min.y).toBeLessThan(.2);s.dom.window.close();
});
it('assigns all facade and entrance objects to the existing building and floor visibility groups',()=>{
 const s=build();for(const g of s.scene.children){expect(g.userData.buildingId).toBe('admin-front');expect([1,2,3]).toContain(g.userData.floorNum);expect(s.floorMeshes).toContain(g)}s.dom.window.close();
});
it('encloses upper administrative floors with stone bands, square piers and glazed window bays',()=>{
 const s=build(),l=s.w.campusWalkWorld.layouts.find((l:any)=>l.id==='admin-front'),b=l.b,front=b.z+b.depth/2;
 s.scene.updateMatrixWorld(true);
 for(const f of [2,3]){
  const g=s.scene.getObjectByName(`photo-admin-facade-${f}`)!;
  const piers=g.children.filter(o=>o.name==='admin-window-stone-pier');expect(piers.length).toBeGreaterThan(8);
  for(const p of piers)expect(new THREE.Box3().setFromObject(p).getSize(new THREE.Vector3()).x).toBeGreaterThan(.25);
  for(let x=b.x-b.width/2+.5;x<b.x+b.width/2-.5;x+=.2)for(const height of [.5,1.8,3.3]){
   const ray=new THREE.Raycaster(new THREE.Vector3(x,(f-1)*3.6+height,front+1),new THREE.Vector3(0,0,-1),0,1.25);
   expect(ray.intersectObject(g,true).length,`${f}F front opening at ${x}, ${height}`).toBeGreaterThan(0);
  }
  expect(s.solids.some(c=>c.y0<=(f-1)*3.6&&c.y1>=f*3.6&&c.x0<=b.x&&c.x1>=b.x&&c.z0<=front&&c.z1>=front)).toBe(true);
 }
 // The lower central passage remains physically and visually open.
 const ray=new THREE.Raycaster(new THREE.Vector3(b.x,1.5,front+1),new THREE.Vector3(0,0,-1),0,1.3);
 expect(ray.intersectObjects(s.scene.children.filter(g=>g.name.includes('facade')||g.name.includes('entrance')),true)).toHaveLength(0);
 s.dom.window.close();
});
it('uses a compact four-hip roof with a red front slope and cream rear and end slopes',()=>{
 const s=build(),l=s.w.campusWalkWorld.layouts.find((l:any)=>l.id==='admin-front'),b=l.b;
 const roof=s.scene.getObjectByName('photo-admin-roof')!,panels=roof.children.filter(o=>o.name==='admin-hip-roof') as THREE.Mesh[];
 expect(panels).toHaveLength(1);const panel=panels[0],geo=panel.geometry;
 expect(geo.groups).toHaveLength(4);
 const normals=geo.getAttribute('normal'),directions=new Set<string>();
 for(let i=0;i<normals.count;i++){
  const x=normals.getX(i),z=normals.getZ(i);expect(normals.getY(i)).toBeGreaterThan(0);
  directions.add(Math.abs(x)>Math.abs(z)?(x>0?'east':'west'):(z>0?'front':'rear'));
 }
 expect([...directions].sort()).toEqual(['east','front','rear','west']);
 const bounds=new THREE.Box3().setFromObject(roof);expect(bounds.max.x-b.x).toBeLessThanOrEqual(b.width/2+.6);expect(bounds.max.z-b.z).toBeLessThanOrEqual(b.depth/2+.6);
 const palette=panel.material as THREE.MeshStandardMaterial[];
 expect(palette[0].color.getHex()).toBe(0xb76f62);expect(palette[1].color.getHex()).toBe(0xb9b28b);
 expect(roof.userData.roof).toBe(true);s.dom.window.close();
});
it('adds photo-matched classroom grilles and blue courtyard accents without closing any door',()=>{
 const s=build(true),groups=s.scene.children.filter(g=>g.name.startsWith('photo-teaching-'));expect(groups).toHaveLength(9);
 for(const g of groups){expect(['grade8-front','grade8-mid','grade9-back']).toContain(g.userData.buildingId);expect(s.floorMeshes).toContain(g);expect(g.children.some(c=>c.name==='teaching-window-grilles')).toBe(true)}
 const accents=s.scene.getObjectByName('teaching-blue-courtyard-lines');expect(accents).toBeTruthy();
 // New grilles decorate only exterior windows, never classroom door openings.
 s.scene.updateMatrixWorld(true);const ray=new THREE.Raycaster();
 for(const l of s.w.campusWalkWorld.layouts.filter((l:any)=>['grade8-front','grade8-mid','grade9-back'].includes(l.id)))for(const r of l.rooms){
  const dir=new THREE.Vector3(r.door.x-r.corridor.x,0,r.door.z-r.corridor.z).normalize();ray.set(new THREE.Vector3(r.corridor.x,r.door.y+1.5,r.corridor.z),dir);ray.far=1.8;
  expect(ray.intersectObjects(groups,true).length,r.id).toBe(0);
 }
 s.dom.window.close();
});
it('provides shallow curved balcony cladding while retaining the original upper-floor footprint and safety edge',()=>{
 const s=build(true),l=s.w.campusWalkWorld.layouts.find((l:any)=>l.id==='grade8-front');
 const curves=s.scene.children.flatMap(g=>g.children).filter(c=>c.name==='teaching-curved-balcony-cladding');expect(curves).toHaveLength(2);
 for(const g of curves){const b=new THREE.Box3().setFromObject(g);expect(b.max.z).toBeLessThanOrEqual(l.b.z+l.outerV+.01);expect(b.min.z).toBeGreaterThan(l.b.z+l.outerV-.65)}
 expect(l.footprints).toHaveLength(3);s.dom.window.close();
});
