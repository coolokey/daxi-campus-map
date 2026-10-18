import {beforeAll, afterAll, expect, it} from 'vitest';
import {existsSync, readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {runInContext} from 'node:vm';

let evaluate: (code:string)=>any, dom:any;
beforeAll(()=>{
 expect(existsSync('public/campus-explorer/campus-forecourt.js'),'approved forecourt scene exists').toBe(true);
 const script=fileURLToPath(new URL('../scripts/verify-spatial-world.cjs',import.meta.url));
 const prefix=readFileSync(script,'utf8').split('const report=vm.runInContext')[0];
 const built=new Function('require','__dirname',`${prefix};return {context,dom};`)(createRequire(script),fileURLToPath(new URL('../scripts',import.meta.url)));
 dom=built.dom;evaluate=code=>runInContext(code,built.context,{timeout:180000});
},180000);
afterAll(()=>dom?.window.close());
it('keeps six painted stalls outside the tree ground with an unobstructed gate approach',()=>{
 const result=evaluate(`(()=>{const f=campusForecourt;return {plan:f.plan,stalls:f.stalls.map(s=>({x:s.x,z:s.z,width:s.width,depth:s.depth})),blocked:Array.from({length:39},(_,i)=>{const p=CampusOutdoorPlan.entrance.world(0,i);return checkWallCollision(p.x,0,p.z)}),paint:f.group.getObjectByName('forecourt-parking-aligned').children.filter(m=>m.name.startsWith('forecourt-stall-')).length}})()`);
 expect(result.stalls).toHaveLength(6);expect(result.paint).toBeGreaterThanOrEqual(18);
 expect(result.plan.parking.z0).toBeGreaterThan(43.5);expect(result.plan.parking.z1).toBeLessThan(86);
 for(const s of result.stalls){expect(s.x).toBeGreaterThan(result.plan.parking.x0);expect(s.x).toBeLessThan(result.plan.parking.x1);expect(s.z).toBeGreaterThan(result.plan.parking.z0);expect(s.z).toBeLessThan(result.plan.parking.z1)}
 expect(result.blocked.every((v:boolean)=>!v)).toBe(true);
});
it('keeps visible planted soil and trees between the administration and guard without intersecting buildings',()=>{
 const result=evaluate(`(()=>{const f=campusForecourt;return {bed:!!scene.getObjectByName('forecourt-tree-bed-soil'),grass:!!scene.getObjectByName('forecourt-tree-bed-grass'),trees:f.trees.map(t=>({x:t.x,z:t.z,inBuilding:campusWalkWorld.layouts.some(l=>l.footprints.some(p=>p.floor===1&&CampusSpatialPlan.contains(p,l.local(t.x,t.z).u,l.local(t.x,t.z).v)))}))}})()`);
 expect(result.bed).toBe(true);expect(result.grass).toBe(true);expect(result.trees.length).toBeGreaterThanOrEqual(4);
 for(const t of result.trees){expect(t.z).toBeGreaterThan(43.5);expect(t.z).toBeLessThan(82);expect(Number.isFinite(t.x)).toBe(true);expect(t.inBuilding).toBe(false)}
});
it('registers each tree trunk physically while keeping canopy and ground walkable',()=>{
 const result=evaluate(`(()=>{const f=campusForecourt;return {hits:f.trees.map(t=>checkWallCollision(t.x,0,t.z)),solids:f.group.children.filter(m=>m.userData.campusSolid).map(m=>m.name),canopySolid:f.group.children.filter(m=>m.name.includes('canopy')).some(m=>m.userData.campusSolid),clear:checkWallCollision(8,0,73)}})()`);
 expect(result.hits.every(Boolean)).toBe(true);expect(result.solids).toHaveLength(13);expect(result.solids.every((s:string)=>s.includes('trunk'))).toBe(true);expect(result.canopySolid).toBe(false);expect(result.clear).toBe(false);
});
it('adds a reachable independent parking destination and retains the original parking and activity center',()=>{
 const r=evaluate(`(()=>({room:ROOMS_DB['forecourt-parking'],old:ROOMS_DB['parking-lot'],route:findShortestPath('gate','forecourt-parking'),gym:BUILDINGS_CONFIG.find(b=>b.id==='gym-bld'),gymScene:!!scene.getObjectByName('gym-badminton-courts')}))()`);
 expect(r.room.name).toBe('前庭停車區');expect(r.old.name).toBe('綜合大樓平面停車場');expect(r.route?.length).toBeGreaterThan(1);expect(r.gym).toMatchObject({x:-80,z:58});expect(r.gymScene).toBe(true);
});
it('loads the new scene before landscape collision registration and navigation indexing',()=>{
 const html=readFileSync('public/campus-explorer/index.html','utf8');expect(html.indexOf('campus-forecourt.js')).toBeGreaterThan(html.indexOf('explorer.js'));expect(html.indexOf('campus-forecourt.js')).toBeLessThan(html.indexOf('landscape-world.js'));
});

it('keeps main planting beside the aligned parking and clear of its central aisle',()=>{
 const r=evaluate(`(()=>{const f=campusForecourt;return {plan:f.plan,main:f.trees.filter(t=>t.zone==='main'),node:NAV_NODES['forecourt-parking'],stalls:f.stalls};})()`);
 expect(r.plan.planting).toEqual({x0:-11,x1:-7,z0:66,z1:78});expect(r.main).toHaveLength(6);
 for(const t of r.main){expect(t.x).toBeGreaterThan(r.plan.planting.x0);expect(t.x).toBeLessThan(r.plan.planting.x1);expect(t.z).toBeGreaterThan(r.plan.planting.z0);expect(t.z).toBeLessThan(r.plan.planting.z1);}
 expect(r.plan.parking.x1).toBeLessThan(r.plan.planting.x0);
 expect(r.node.x).toBeGreaterThan(r.plan.parking.x0);expect(r.node.x).toBeLessThan(r.plan.parking.x1);
});
it('retains a single line of trees along the south teaching wing and the existing driveway',()=>{
 const r=evaluate(`(()=>{const f=campusForecourt;return {row:f.trees.filter(t=>t.zone==='south-row').map(t=>({x:t.x,z:t.z})),road:!!f.drivewayMesh,geometry:f.drivewayMesh?.geometry.parameters,position:f.drivewayMesh?.position,blocked:Array.from({length:36},(_,i)=>checkWallCollision(17+i,0,86))};})()`);
 expect(r.row).toHaveLength(7);expect(new Set(r.row.map((p:any)=>p.z)).size).toBe(1);expect(r.row[0].x).toBe(0);expect(r.row.at(-1).x).toBe(36);
 expect(r.road).toBe(true);expect(r.geometry).toMatchObject({width:158,height:9});expect(r.position.z).toBe(86);expect(r.blocked.some(Boolean)).toBe(false);
});

it('puts the parking destination on the gate-to-statue sightline with trees outside that line',()=>{
 const r=evaluate(`(()=>{const p=NAV_NODES['forecourt-parking'],g={x:-10,z:86},target={x:-36,z:28.5},dx=target.x-g.x,dz=target.z-g.z,len=Math.hypot(dx,dz);return {cross:((p.x-g.x)*dz-(p.z-g.z)*dx)/len,forward:((p.x-g.x)*dx+(p.z-g.z)*dz)/len,length:len};})()`);
 expect(Math.abs(r.cross)).toBeLessThan(.01);expect(r.forward).toBeGreaterThan(10);expect(r.forward).toBeLessThan(r.length-10);
});
it('keeps a direct eye-height view from the gate to the actual statue head',()=>{
 const hits=evaluate(`(()=>{scene.updateMatrixWorld(true);const statue=scene.getObjectByName('photo-statue-courtyard'),head=statue.getObjectByName('bust-head'),target=new THREE.Box3().setFromObject(head).getCenter(new THREE.Vector3()),eye=new THREE.Vector3(-10,1.6,86),ray=new THREE.Raycaster(eye,target.clone().sub(eye).normalize(),.05,eye.distanceTo(target)-.7);return ray.intersectObjects(scene.children,true).filter(h=>{let p=h.object;while(p){if(p===statue||!p.visible)return false;p=p.parent;}return h.object.isMesh&&(Array.isArray(h.object.material)?h.object.material:[h.object.material]).some(m=>!m.transparent&&m.opacity>.85)}).map(h=>h.object.name);})()`);
 expect(hits).toEqual([]);
});
