import {it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import {runInContext} from 'node:vm';
import * as THREE from 'three';

function fixture(){
 const dom=new JSDOM('<body/>',{runScripts:'outside-only'}),w=dom.window as any;
 w.THREE=THREE;w.FH=3.6;
 const run=(s:string)=>runInContext(s,dom.getInternalVMContext());
 for(const f of ['campus-data.js','spatial-plan-data.js','spatial-plan.js','walk-world-math.js'])run(readFileSync('public/campus-explorer/'+f,'utf8'));
 const layouts=run('BUILDINGS_CONFIG.map(CampusWalkMath.layout)');layouts.push(...run('CampusSpatialPlan.galleries(BUILDINGS_CONFIG.map(CampusWalkMath.layout))'));
 const scene=new THREE.Scene(),floorMeshes:THREE.Object3D[]=[],legacy:THREE.Object3D[]=[],ceilings:THREE.Object3D[]=[];
 for(const l of layouts){
  const parent=new THREE.Group();parent.userData={buildingId:l.id,floorNum:l.b.floors};scene.add(parent);floorMeshes.push(parent);
  const roof=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial());roof.userData.roof=true;parent.add(roof);legacy.push(roof);
  const ceiling=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial());ceiling.userData.campusCeiling=true;parent.add(ceiling);ceilings.push(ceiling);
 }
 w.campusExplorer={scene};w.campusWalkWorld={layouts,graph:{unchanged:['a','b']}};w.floorMeshes=floorMeshes;w.WALL_COLLIDERS=[{x0:1,x1:2}];
 const before=JSON.stringify({layouts,graph:w.campusWalkWorld.graph,colliders:w.WALL_COLLIDERS});
 if(existsSync('public/campus-explorer/photo-roofs.js'))run(readFileSync('public/campus-explorer/photo-roofs.js','utf8'));
 return{dom,w,scene,floorMeshes,layouts,legacy,ceilings,before};
}
const ids=['admin-front','grade8-front','grade8-mid','grade9-back','art-building','tech-building'];
it('represents the aerial art building as a compact four-storey block beside the technology wing',()=>{
 const s=fixture(),art=s.layouts.find((l:any)=>l.id==='art-building'),tech=s.layouts.find((l:any)=>l.id==='tech-building');
 expect(art.b.floors).toBe(4);expect(art.b.depth/art.b.width).toBeLessThan(1.5);
 expect(art.bounds.z0-tech.bounds.z1).toBeGreaterThanOrEqual(1);expect(art.bounds.z0-tech.bounds.z1).toBeLessThanOrEqual(4);s.dom.window.close();
});
it('replaces inherited roof markers but preserves every ceiling and unrelated roof',()=>{
 const s=fixture();expect(s.scene.getObjectByName('photo-roof-admin-front')).toBeTruthy();
 for(const [i,l] of s.layouts.entries()){expect(s.legacy[i].parent!==null).toBe(!ids.includes(l.id));expect(s.ceilings[i].parent).not.toBeNull()}
 expect(s.scene.getObjectByName('photo-roof-admin-back')).toBeUndefined();s.dom.window.close();
});
it('tags new roofs for existing floor and cutaway filters with correct four/two-storey heights',()=>{
 const s=fixture();for(const id of ids){const g=s.scene.getObjectByName('photo-roof-'+id)!;expect(g).toBeTruthy();const l=s.layouts.find((l:any)=>l.id===id);expect(g.userData).toMatchObject({buildingId:id,floorNum:l.b.floors,roof:true});expect(s.floorMeshes).toContain(g);expect(new THREE.Box3().setFromObject(g).min.y).toBeGreaterThanOrEqual(l.b.floors*3.6-.01);g.visible=!g.userData.roof;expect(g.visible).toBe(false)}
 expect(s.scene.getObjectByName('photo-roof-art-building')!.userData.floorNum).toBe(4);expect(s.scene.getObjectByName('photo-roof-tech-building')!.userData.floorNum).toBe(2);s.dom.window.close();
});
it('keeps every technology roof vertex inside the existing top-floor footprints including the courtyard opening',()=>{
 const s=fixture(),l=s.layouts.find((l:any)=>l.id==='tech-building'),g=s.scene.getObjectByName('photo-roof-tech-building')!;expect(g).toBeTruthy();g.updateMatrixWorld(true);
 g.traverse((o:any)=>{if(!o.isMesh)return;const p=o.geometry.attributes.position;for(let i=0;i<p.count;i++){const q=new THREE.Vector3().fromBufferAttribute(p,i).applyMatrix4(o.matrixWorld);const n=l.facadeFeatures.roundedNose,local=l.local(q.x,q.z);expect(l.footprints.some((f:any)=>f.floor===2&&q.x>=f.rect.x0-1e-5&&q.x<=f.rect.x1+1e-5&&q.z>=f.rect.z0-1e-5&&q.z<=f.rect.z1+1e-5)||Math.hypot(local.u-n.u,local.v-n.v)<=n.radius+1e-5).toBe(true)}});s.dom.window.close();
});
it('preserves room geometry navigation and collision data and uses matte roofs',()=>{
 const s=fixture();expect(s.scene.getObjectByName('photo-roof-art-building')).toBeTruthy();expect(JSON.stringify({layouts:s.layouts,graph:s.w.campusWalkWorld.graph,colliders:s.w.WALL_COLLIDERS})).toBe(s.before);
 for(const id of ids)s.scene.getObjectByName('photo-roof-'+id)!.traverse((o:any)=>{if(o.isMesh)expect(o.material.roughness).toBeGreaterThanOrEqual(.94)});s.dom.window.close();
});
