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
 expect(r.found).toBe(true);expect(r.center.x).toBeCloseTo(-36);expect(r.center.z).toBeCloseTo(86);expect(r.alignment).toBeCloseTo(1,8);expect(r.statue).toMatchObject({x:-36,z:28.5});
});
it('keeps the low post and retracted gate solid while leaving the driveway and tower opening walkable',()=>{
 const r=evaluate(`(()=>{const g=scene.getObjectByName('main-entrance-plaza');if(!g)return {found:false};scene.updateMatrixWorld(true);const hit=(x,z)=>{const p=g.localToWorld(new THREE.Vector3(x,0,z));return checkWallCollision(p.x,0,p.z)};const start=g.localToWorld(new THREE.Vector3(0,0,14)),end=g.localToWorld(new THREE.Vector3(0,0,-2)),p={x:start.x,y:0,z:start.z};let blocked=false;for(let i=1;i<=160;i++){const x=start.x+(end.x-start.x)*i/160,z=start.z+(end.z-start.z)*i/160;blocked=moveAvatarWithCollision(p,x-p.x,z-p.z)||blocked;}return {found:true,pylons:[hit(-11,10),hit(11,10)],sliding:hit(-7.5,10),blocked,distance:Math.hypot(p.x-end.x,p.z-end.z)};})()`);
 expect(r.found).toBe(true);expect(r.pylons).toEqual([true,false]);expect(r.sliding).toBe(true);expect(r.blocked).toBe(false);expect(r.distance).toBeLessThan(.01);
});

it('matches the photographed single tower and permits a real motor crossing below its lintel',()=>{
 const r=evaluate(`(()=>{scene.updateMatrixWorld(true);const g=scene.getObjectByName('main-entrance-plaza'),tower=scene.getObjectByName('main-entrance-photo-tower'),guard=scene.getObjectByName('main-entrance-guard'),balls=[];g.traverse(o=>{if(o.geometry?.type==='SphereGeometry')balls.push(o)});if(!tower)return {found:false};const start=g.localToWorld(new THREE.Vector3(11,0,13)),end=g.localToWorld(new THREE.Vector3(11,0,7)),p={x:start.x,y:0,z:start.z};let blocked=false;for(let i=1;i<=60;i++){const x=start.x+(end.x-start.x)*i/60,z=start.z+(end.z-start.z)*i/60;blocked=moveAvatarWithCollision(p,x-p.x,z-p.z)||blocked;}const hit=x=>{const q=g.localToWorld(new THREE.Vector3(x,0,10));return checkWallCollision(q.x,0,q.z)};const wall=guard.getObjectByName('guard-upper-wall'),base=guard.getObjectByName('guard-blue-base');return {found:true,balls:balls.length,blocked,distance:Math.hypot(p.x-end.x,p.z-end.z),legs:[hit(10.025),hit(11.975)],wall:wall?.material.color.clone().convertLinearToSRGB().getHex(),base:base?.material.color.clone().convertLinearToSRGB().getHex(),windows:guard.children.filter(o=>o.name.startsWith('guard-window')).length,led:!!guard.getObjectByName('guard-led'),door:!!guard.getObjectByName('guard-door')};})()`);
 expect(r.found).toBe(true);expect(r.balls).toBe(1);expect(r.blocked).toBe(false);expect(r.distance).toBeLessThan(.01);expect(r.legs).toEqual([true,true]);expect(r.wall).toBe(0xe7e5d9);expect(r.base).toBe(0x94c3ce);expect(r.windows).toBeGreaterThanOrEqual(3);expect(r.led).toBe(true);expect(r.door).toBe(true);
});
it('starts the avatar and gate navigation node on the shared entrance axis facing the statue',()=>{
 const r=evaluate(`(()=>{const a=CampusOutdoorPlan.entrance;if(!a)return {found:false};return {found:true,spawn:a.spawn,position:avatarGroup.position,node:NAV_NODES.gate,alignment:Math.sin(avatarAngle)*a.axis.x+Math.cos(avatarAngle)*a.axis.z};})()`);
 expect(r.found).toBe(true);expect(r.position.x).toBeCloseTo(r.spawn.x);expect(r.position.z).toBeCloseTo(r.spawn.z);expect(r.node.x).toBeCloseTo(r.spawn.x);expect(r.node.z).toBeCloseTo(r.spawn.z);expect(r.alignment).toBeCloseTo(1,8);
});
it('joins the perimeter to the straight gate while keeping the outside avenue clear',()=>{
 const r=evaluate(`(()=>{const a=CampusOutdoorPlan.entrance,p=CampusOutdoorPlan.perimeter;return {first:p.outline[0],last:p.outline.at(-1),left:a.world(-12.2,0),right:a.world(12.2,0),leftReturn:p.outline[1],rightReturn:p.outline.at(-2)};})()`);
 expect(r.first[0]).toBeCloseTo(r.left.x);expect(r.first[1]).toBeCloseTo(r.left.z);expect(r.last[0]).toBeCloseTo(r.right.x);expect(r.last[1]).toBeCloseTo(r.right.z);expect(r.leftReturn).toEqual([-48.2,100]);expect(r.rightReturn).toEqual([-23.8,100]);
});

it('keeps the gate square to the driveway and the palm avenue straight toward the statue',()=>{
 const r=evaluate(`(()=>{scene.updateMatrixWorld(true);const e=CampusOutdoorPlan.entrance,g=scene.getObjectByName('main-entrance-plaza'),avenue=CampusEntranceAvenue.plan;return {yaw:g.rotation.y,gate:e.gate,statue:e.target,avenueX:avenue.x,node:NAV_NODES['palm-avenue-end'],centerBlocked:Array.from({length:90},(_,i)=>checkWallCollision(e.gate.x,0,85+i)).some(Boolean)};})()`);
 expect(r.yaw).toBe(0);expect(r.gate.x).toBe(r.statue.x);expect(r.avenueX).toBe(r.gate.x);expect(r.node.x).toBe(r.gate.x);expect(r.centerBlocked).toBe(false);
});
