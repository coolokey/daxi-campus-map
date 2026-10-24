import {it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {JSDOM} from 'jsdom';
import {runInContext} from 'node:vm';
import * as THREE from 'three';
function fixture(){
 const dom=new JSDOM('<body/>',{runScripts:'outside-only'}),w=dom.window as any,run=(s:string)=>runInContext(s,dom.getInternalVMContext());w.THREE=THREE;w.FH=3.6;
 for(const file of ['campus-data.js','spatial-plan-data.js','spatial-plan.js','walk-world-math.js'])run(readFileSync('public/campus-explorer/'+file,'utf8'));
 const layouts=run('BUILDINGS_CONFIG.map(CampusWalkMath.layout)'),scene=new THREE.Scene(),floors:THREE.Object3D[]=[];w.campusExplorer={scene};w.campusWalkWorld={layouts,graph:{keep:['route']}};w.floorMeshes=floors;w.WALL_COLLIDERS=[];
 const before=JSON.stringify({layouts,graph:w.campusWalkWorld.graph,walls:w.WALL_COLLIDERS});
 if(existsSync('public/campus-explorer/photo-special-buildings.js'))run(readFileSync('public/campus-explorer/photo-special-buildings.js','utf8'));
 return {dom,w,scene,floors,layouts,before};
}
it('adds a continuous green curved shade over the technology wing without closing the walkway',()=>{
 const s=fixture(),l=s.layouts.find((l:any)=>l.id==='tech-building'),g=s.scene.getObjectByName('photo-tech-green-awning');expect(g).toBeTruthy();s.scene.updateMatrixWorld(true);
 const bounds=new THREE.Box3().setFromObject(g!);expect(bounds.min.y).toBeGreaterThan(6);expect(bounds.max.z-bounds.min.z).toBeGreaterThan(12);expect(bounds.min.x).toBeGreaterThan(l.bounds.x1);expect(g!.userData).toMatchObject({buildingId:'tech-building',floorNum:2});s.dom.window.close();
});
it('adds photo-backed floor details to art and the shared health/cooperative block with correct cutaway ownership',()=>{
 const s=fixture();for(const id of ['art-building','health-bld']){const l=s.layouts.find((q:any)=>q.id===id);for(let f=1;f<=l.b.floors;f++){const g=s.scene.getObjectByName(`photo-special-${id}-${f}`);expect(g).toBeTruthy();expect(g!.userData).toMatchObject({buildingId:id,floorNum:f});expect(s.floors).toContain(g);}}
 expect(s.scene.getObjectByName('health-upper-corridor-fascia')).toBeTruthy();expect(s.scene.getObjectByName('art-recessed-stair-windows')).toBeTruthy();expect(JSON.stringify({layouts:s.layouts,graph:s.w.campusWalkWorld.graph,walls:s.w.WALL_COLLIDERS})).toBe(s.before);s.dom.window.close();
});
