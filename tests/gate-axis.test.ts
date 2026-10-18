import {beforeAll,afterAll,expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {runInContext} from 'node:vm';

let evaluate:(code:string)=>any,dom:any;
beforeAll(()=>{
 const script=fileURLToPath(new URL('../scripts/verify-spatial-world.cjs',import.meta.url));
 const prefix=readFileSync(script,'utf8').split('const report=vm.runInContext')[0];
 const built=new Function('require','__dirname',`${prefix};return {context,dom};`)(createRequire(script),fileURLToPath(new URL('../scripts',import.meta.url)));
 dom=built.dom;evaluate=code=>runInContext(code,built.context,{timeout:180000});
},180000);
afterAll(()=>dom?.window.close());

it('points the actual gate opening inward at the unchanged Chiang statue',()=>{
 const r=evaluate(`(()=>{scene.updateMatrixWorld(true);const g=(scene.getObjectByName('main-entrance-plaza')||scene.children.find(o=>o.children.some(m=>m.geometry?.parameters.width===2.4&&m.geometry?.parameters.height===6.2))),s=scene.getObjectByName('photo-statue-courtyard');if(!g)return {found:false};const center=g.localToWorld(new THREE.Vector3(0,0,10)),forward=new THREE.Vector3(0,0,-1).transformDirection(g.matrixWorld),target=s.position.clone().sub(center);target.y=0;target.normalize();return {found:true,center,alignment:forward.dot(target),statue:s.position};})()`);
 expect(r.found).toBe(true);expect(r.center.x).toBeCloseTo(-10);expect(r.center.z).toBeCloseTo(86);expect(r.alignment).toBeCloseTo(1,8);expect(r.statue).toMatchObject({x:-36,z:28.5});
});
it('makes the rotated pylons and retracted sliding gate solid while leaving the opening walkable',()=>{
 const r=evaluate(`(()=>{const g=scene.getObjectByName('main-entrance-plaza');if(!g)return {found:false};scene.updateMatrixWorld(true);const hit=(x,z)=>{const p=g.localToWorld(new THREE.Vector3(x,0,z));return checkWallCollision(p.x,0,p.z)};const start=g.localToWorld(new THREE.Vector3(0,0,14)),end=g.localToWorld(new THREE.Vector3(0,0,-2)),p={x:start.x,y:0,z:start.z};let blocked=false;for(let i=1;i<=160;i++){const x=start.x+(end.x-start.x)*i/160,z=start.z+(end.z-start.z)*i/160;blocked=moveAvatarWithCollision(p,x-p.x,z-p.z)||blocked;}return {found:true,pylons:[hit(-11,10),hit(11,10)],sliding:hit(-7.5,10),blocked,distance:Math.hypot(p.x-end.x,p.z-end.z)};})()`);
 expect(r.found).toBe(true);expect(r.pylons).toEqual([true,true]);expect(r.sliding).toBe(true);expect(r.blocked).toBe(false);expect(r.distance).toBeLessThan(.01);
});
it('starts the avatar and gate navigation node on the shared entrance axis facing the statue',()=>{
 const r=evaluate(`(()=>{const a=CampusOutdoorPlan.entrance;if(!a)return {found:false};return {found:true,spawn:a.spawn,position:avatarGroup.position,node:NAV_NODES.gate,alignment:Math.sin(avatarAngle)*a.axis.x+Math.cos(avatarAngle)*a.axis.z};})()`);
 expect(r.found).toBe(true);expect(r.position.x).toBeCloseTo(r.spawn.x);expect(r.position.z).toBeCloseTo(r.spawn.z);expect(r.node.x).toBeCloseTo(r.spawn.x);expect(r.node.z).toBeCloseTo(r.spawn.z);expect(r.alignment).toBeCloseTo(1,8);
});
it('joins the perimeter to the rotated outer gate edges while preserving the rest of the boundary',()=>{
 const r=evaluate(`(()=>{const a=CampusOutdoorPlan.entrance,p=CampusOutdoorPlan.perimeter;return {first:p.outline[0],last:p.outline.at(-1),left:a.world(-12.2,0),right:a.world(12.2,0),unchanged:p.outline[1]};})()`);
 expect(r.first[0]).toBeCloseTo(r.left.x);expect(r.first[1]).toBeCloseTo(r.left.z);expect(r.last[0]).toBeCloseTo(r.right.x);expect(r.last[1]).toBeCloseTo(r.right.z);expect(r.unchanged).toEqual([-22.2,100]);
});
