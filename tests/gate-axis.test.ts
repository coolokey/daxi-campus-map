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
 const r=evaluate(`(()=>{scene.updateMatrixWorld(true);const g=scene.getObjectByName('main-entrance-plaza'),tower=scene.getObjectByName('main-entrance-photo-tower'),guard=scene.getObjectByName('main-entrance-guard'),balls=[];g.traverse(o=>{if(o.geometry?.type==='SphereGeometry')balls.push(o)});if(!tower)return {found:false};const start=g.localToWorld(new THREE.Vector3(8,0,10)),end=g.localToWorld(new THREE.Vector3(13.5,0,10)),p={x:start.x,y:0,z:start.z};let blocked=false;for(let i=1;i<=60;i++){const x=start.x+(end.x-start.x)*i/60,z=start.z+(end.z-start.z)*i/60;blocked=moveAvatarWithCollision(p,x-p.x,z-p.z)||blocked;}const hit=z=>{const q=g.localToWorld(new THREE.Vector3(11,0,z));return checkWallCollision(q.x,0,q.z)};const wall=guard.getObjectByName('guard-upper-wall'),base=guard.getObjectByName('guard-blue-base');return {found:true,balls:balls.length,blocked,distance:Math.hypot(p.x-end.x,p.z-end.z),legs:[hit(9.025),hit(10.975)],wall:wall?.material.color.clone().convertLinearToSRGB().getHex(),base:base?.material.color.clone().convertLinearToSRGB().getHex(),windows:guard.children.filter(o=>o.name.startsWith('guard-window')).length,led:!!guard.getObjectByName('guard-led'),door:!!guard.getObjectByName('guard-door')};})()`);
 expect(r.found).toBe(true);expect(r.balls).toBe(1);expect(r.blocked).toBe(false);expect(r.distance).toBeLessThan(.01);expect(r.legs).toEqual([true,true]);expect(r.wall).toBe(0xe7e5d9);expect(r.base).toBe(0x94c3ce);expect(r.windows).toBeGreaterThanOrEqual(3);expect(r.led).toBe(true);expect(r.door).toBe(true);
});
it('starts the avatar and gate navigation node on the shared entrance axis facing the statue',()=>{
 const r=evaluate(`(()=>{const a=CampusOutdoorPlan.entrance;if(!a)return {found:false};return {found:true,spawn:a.spawn,position:avatarGroup.position,node:NAV_NODES.gate,alignment:Math.sin(avatarAngle)*a.axis.x+Math.cos(avatarAngle)*a.axis.z};})()`);
 expect(r.found).toBe(true);expect(r.position.x).toBeCloseTo(r.spawn.x);expect(r.position.z).toBeCloseTo(r.spawn.z);expect(r.node.x).toBeCloseTo(r.spawn.x);expect(r.node.z).toBeCloseTo(r.spawn.z);expect(r.alignment).toBeCloseTo(1,8);
});
it('joins the perimeter to the straight gate while keeping the outside avenue clear',()=>{
 const r=evaluate(`(()=>{const a=CampusOutdoorPlan.entrance,p=CampusOutdoorPlan.perimeter;return {first:p.outline[0],last:p.outline.at(-1),left:a.world(-12.2,0),right:a.world(20.25,-2),leftReturn:p.outline[1],rightReturn:p.outline.at(-2)};})()`);
 expect(r.first[0]).toBeCloseTo(r.left.x);expect(r.first[1]).toBeCloseTo(r.left.z);expect(r.last[0]).toBeCloseTo(r.right.x);expect(r.last[1]).toBeCloseTo(r.right.z);expect(r.leftReturn).toEqual([-51.5,80]);expect(r.rightReturn).toEqual([-15.75,100]);
});

it('keeps the gate square to the driveway and the palm avenue straight toward the statue',()=>{
 const r=evaluate(`(()=>{scene.updateMatrixWorld(true);const e=CampusOutdoorPlan.entrance,g=scene.getObjectByName('main-entrance-plaza'),avenue=CampusEntranceAvenue.plan;return {yaw:g.rotation.y,gate:e.gate,statue:e.target,avenueX:avenue.x,node:NAV_NODES['palm-avenue-end'],centerBlocked:Array.from({length:90},(_,i)=>checkWallCollision(e.gate.x,0,85+i)).some(Boolean)};})()`);
 expect(r.yaw).toBe(0);expect(r.gate.x).toBe(r.statue.x);expect(r.avenueX).toBe(r.gate.x);expect(r.node.x).toBe(r.gate.x);expect(r.centerBlocked).toBe(false);
});

it('places the door on the campus face and a raised small window on the street face',()=>{
 const r=evaluate(`(()=>{const g=scene.getObjectByName('main-entrance-guard'),door=g.getObjectByName('guard-door'),window=g.getObjectByName('guard-street-small-window'),roof=g.getObjectByName('guard-gable-roof');return {center:g.position,door:door.position,window:window?.position,roofYaw:roof.rotation.y,node:NAV_NODES['gate-guard']};})()`);
 expect(r.center.z).toBeCloseTo(84.4);expect(r.door.z).toBeLessThan(-2.8);expect(r.window?.z).toBeGreaterThan(2.8);expect(r.window?.y).toBeGreaterThan(1.2);expect(r.roofYaw).toBeCloseTo(Math.PI/2);expect(r.node.z).toBeCloseTo(80.2);expect(r.node.x).toBeCloseTo(r.center.x+r.door.x);
});

it('routes a visitor from the gate to the corrected campus-side guard door',()=>{
 const r=evaluate(`(()=>{const p={...campusWalkWorld.graph.gate},points=campusWalkWorld.route(p,ROOMS_DB.guard);let blocked=false;for(const q of points.slice(1))blocked=moveAvatarWithCollision(p,q.x-p.x,q.z-p.z,q.y-p.y,true)||blocked;return {blocked,end:p,node:NAV_NODES['gate-guard'],points:points.length};})()`);
 expect(r.points).toBeGreaterThan(1);expect(r.blocked).toBe(false);expect(Math.hypot(r.end.x-r.node.x,r.end.z-r.node.z)).toBeLessThan(.03);
});

it('straddles the entrance with an outside booth wing and a campus-side door',()=>{
 const r=evaluate(`(()=>{scene.updateMatrixWorld(true);const e=CampusOutdoorPlan.entrance,g=scene.getObjectByName('main-entrance-guard'),wing=g.getObjectByName('guard-street-wing'),door=g.getObjectByName('guard-door'),roof=g.getObjectByName('guard-gable-roof'),outside=e.world(11,-1.2).z;const bounds=new THREE.Box3().setFromObject(wing),roofBounds=new THREE.Box3().setFromObject(roof),d=door.getWorldPosition(new THREE.Vector3());return {outside,wing:bounds,roof:roofBounds,door:d,perimeterEnd:CampusOutdoorPlan.perimeter.outline.at(-1)};})()`);
 expect(r.wing.max.z).toBeGreaterThan(r.outside+.5);expect(r.roof.max.z).toBeGreaterThan(r.outside+1);expect(r.door.z).toBeLessThan(86);expect(r.perimeterEnd[0]).toBeGreaterThan(r.wing.max.x);
});

it('uses the separate pedestrian gate beside the booth as the walking start',()=>{
 const r=evaluate(`(()=>{const e=CampusOutdoorPlan.entrance,g=scene.getObjectByName('main-entrance-pedestrian-gate');return {found:!!g,pedestrian:e.pedestrian,spawn:e.spawn,gate:NAV_NODES.gate};})()`);
 expect(r.found).toBe(true);expect(r.spawn.x).toBeCloseTo(-22.8);expect(r.spawn.z).toBeCloseTo(90);expect(r.pedestrian.inside.z).toBeCloseTo(80.2);expect(r.gate.x).toBeCloseTo(r.spawn.x);
});
it('walks through the small gate and keeps every administrative route on this entrance',()=>{
 const r=evaluate(`(()=>{const e=CampusOutdoorPlan.entrance,start=e.world(13.2,-4),end=e.world(13.2,5.8),p={...start};let blocked=false;for(let i=1;i<=100;i++){const z=start.z+(end.z-start.z)*i/100;blocked=moveAvatarWithCollision(p,0,z-p.z,0,true)||blocked;}const rows=['academic','student-affairs','guard'].map(id=>{const path=campusWalkWorld.route(start,ROOMS_DB[id]);let crossing=null;for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i];if(a.z>=86.9&&b.z<=86.9){const t=(86.9-a.z)/(b.z-a.z);crossing=a.x+(b.x-a.x)*t;break;}}return {id,crossing}});return {blocked,distance:Math.hypot(p.x-end.x,p.z-end.z),rows};})()`);
 expect(r.blocked).toBe(false);expect(r.distance).toBeLessThan(.01);for(const row of r.rows)expect(row.crossing).toBeCloseTo(-22.8,1);
});

it('returns to the outside walking gate without first detouring into campus',()=>{
 const r=evaluate(`(()=>{const e=CampusOutdoorPlan.entrance,start=e.world(13.2,-2),points=campusWalkWorld.route(start,ROOMS_DB.gate);return {points,minZ:Math.min(...points.map(p=>p.z)),last:points.at(-1)};})()`);
 expect(r.minZ).toBeGreaterThanOrEqual(88);expect(r.last.z).toBeCloseTo(90);
});

it('places the confirmed Jiekou Creek sign outside the left gate boundary',()=>{
 const r=evaluate(`(()=>{const t=CampusEntranceAvenue.trail,g=scene.getObjectByName('jiekou-trail-entrance'),sign=scene.getObjectByName('jiekou-trail-sign');if(!t||!g||!sign)return {found:false};scene.updateMatrixWorld(true);return {found:true,name:sign.userData.text,position:sign.getWorldPosition(new THREE.Vector3()),inside:CampusOutdoorPlan.perimeter.contains(t.sign.x,t.sign.z),room:ROOMS_DB['jiekou-trail'],gym:campusWalkWorld.layouts.find(l=>l.id==='gym-bld').bounds};})()`);
 expect(r.found).toBe(true);expect(r.name).toBe('街口溪生態步道');expect(r.position.x).toBeLessThan(-48.2);expect(r.inside).toBe(false);expect(r.room.node).toBe('jiekou-trail-entry');expect(r.position.z-r.gym.z1).toBeGreaterThan(2);expect(r.position.z-r.gym.z1).toBeLessThan(10);expect(Math.abs(r.position.x-r.gym.x1)).toBeLessThan(10);
});
it('walks between the student gate, trail entrance and campus without crossing planters',()=>{
 const r=evaluate(`(()=>{const room=ROOMS_DB['jiekou-trail'];if(!room)return {found:false};const starts=[{...CampusOutdoorPlan.entrance.spawn},{...CampusEntranceAvenue.trail.entry}],destinations=[room,ROOMS_DB.academic],rows=[];for(let i=0;i<starts.length;i++){const p={...starts[i]},points=campusWalkWorld.route(p,destinations[i]);let blocked=false;for(const q of points?.slice(1)||[])blocked=moveAvatarWithCollision(p,q.x-p.x,q.z-p.z,q.y-p.y,true)||blocked;rows.push({blocked,points:points?.length||0,distance:points?Math.hypot(p.x-NAV_NODES[destinations[i].node].x,p.z-NAV_NODES[destinations[i].node].z):999});}return {found:true,rows};})()`);
 expect(r.found).toBe(true);for(const row of r.rows){expect(row.points).toBeGreaterThan(1);expect(row.blocked).toBe(false);expect(row.distance).toBeLessThan(.03);}
});

it('keeps the sign and stone planter solid and the trail entry open',()=>{
 const r=evaluate(`(()=>{const t=CampusEntranceAvenue.trail;return {sign:checkWallCollision(t.sign.x,0,t.sign.z),curb:checkWallCollision(t.sign.x+.75,0,t.sign.z),entry:checkWallCollision(t.entry.x,0,t.entry.z),path:checkWallCollision(t.sign.x-13,0,t.sign.z+4.9),wall:checkWallCollision(t.sign.x-18,0,t.sign.z+7.9)};})()`);
 expect(r).toEqual({sign:true,curb:true,entry:false,path:false,wall:true});
});

it('keeps the relocated trail outside campus without classifying the gym approach as a trail return',()=>{
 const r=evaluate(`(()=>{const t=CampusEntranceAvenue.trail,p=CampusOutdoorPlan.perimeter,bad=[];for(let i=1;i<t.path.length;i++)for(let j=0;j<=20;j++){const a=t.path[i-1],b=t.path[i],x=a.x+(b.x-a.x)*j/20,z=a.z+(b.z-a.z)*j/20;if(p.contains(x,z)||!CampusEntranceAvenue.trailContains(x,z)||checkWallCollision(x,0,z))bad.push({x,z});}const l=campusWalkWorld.layouts.find(l=>l.id==='gym-bld'),gymApproach={x:l.bounds.x1+1.5,z:l.bounds.z1+1};return {bad,gymInside:p.contains(gymApproach.x,gymApproach.z),gymIsTrail:CampusEntranceAvenue.trailContains(gymApproach.x,gymApproach.z)};})()`);
 expect(r).toEqual({bad:[],gymInside:true,gymIsTrail:false});
});

it('faces the sign lettering toward the guardhouse across the gate forecourt',()=>{
 const r=evaluate(`(()=>{scene.updateMatrixWorld(true);const sign=scene.getObjectByName('jiekou-trail-sign'),letters=sign.children.find(m=>m.geometry?.type==='PlaneGeometry'),guard=scene.getObjectByName('main-entrance-guard'),normal=new THREE.Vector3(0,0,1).applyQuaternion(letters.getWorldQuaternion(new THREE.Quaternion())),toward=guard.getWorldPosition(new THREE.Vector3()).sub(sign.getWorldPosition(new THREE.Vector3()));toward.y=0;toward.normalize();const bounds=new THREE.Box3().setFromObject(sign),p=CampusOutdoorPlan.perimeter;const face=letters.getWorldPosition(new THREE.Vector3());return {letterSurfaceSolid:WALL_COLLIDERS.some(c=>c.segment&&CampusCollisionGrid.overlaps(c,face.x,face.z,0)),alignment:normal.dot(toward),streetFacing:normal.z,endsOutside:[bounds.min.z,bounds.max.z].every(z=>!p.contains(sign.position.x,z)),endsClear:[bounds.min.z,bounds.max.z].every(z=>p.segments.every(s=>{const dx=s.bx-s.ax,dz=s.bz-s.az,t=Math.max(0,Math.min(1,((sign.position.x-s.ax)*dx+(z-s.az)*dz)/(dx*dx+dz*dz)));return Math.hypot(sign.position.x-s.ax-t*dx,z-s.az-t*dz)>p.thickness/2+.15}))};})()`);
 expect(r.letterSurfaceSolid).toBe(true);expect(r.alignment).toBeGreaterThan(.99);expect(Math.abs(r.streetFacing)).toBeLessThan(.05);expect(r.endsOutside).toBe(true);expect(r.endsClear).toBe(true);
});
