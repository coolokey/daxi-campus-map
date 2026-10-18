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
 const result=evaluate(`(()=>{const f=campusForecourt;return {plan:f.plan,stalls:f.stalls.map(s=>({x:s.x,z:s.z,width:s.width,depth:s.depth})),blocked:Array.from({length:31},(_,i)=>checkWallCollision(-10,0,55+i)),paint:f.group.children.filter(m=>m.name.startsWith('forecourt-stall-')).length}})()`);
 expect(result.stalls).toHaveLength(6);expect(result.paint).toBeGreaterThanOrEqual(18);
 expect(result.plan.parking.z0).toBeGreaterThan(43.5);expect(result.plan.parking.z1).toBeLessThan(86);
 for(const s of result.stalls){expect(s.x+s.width/2).toBeLessThan(-11.5);expect(s.z).toBeGreaterThan(55);expect(s.z).toBeLessThan(74)}
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

it('restores the main tree ground at the former painted bays and separates parking from it',()=>{
 const r=evaluate(`(()=>{const f=campusForecourt;return {plan:f.plan,main:f.trees.filter(t=>t.zone==='main'),node:NAV_NODES['forecourt-parking'],stalls:f.stalls};})()`);
 expect(r.plan.planting).toEqual({x0:-23,x1:-13,z0:55,z1:75});expect(r.main).toHaveLength(6);
 for(let i=0;i<6;i++){const x=-19.5,z=56.75+i*3;expect(x).toBeGreaterThan(r.plan.planting.x0);expect(x).toBeLessThan(r.plan.planting.x1);expect(z).toBeGreaterThan(r.plan.planting.z0);expect(z).toBeLessThan(r.plan.planting.z1);}
 for(const s of r.stalls)expect(s.x+s.width/2).toBeLessThan(r.plan.planting.x0);
 expect(r.node.x).toBeGreaterThan(r.plan.parking.x0);expect(r.node.x).toBeLessThan(r.plan.parking.x1);
});
it('retains a single line of trees along the south teaching wing and the existing driveway',()=>{
 const r=evaluate(`(()=>{const f=campusForecourt;return {row:f.trees.filter(t=>t.zone==='south-row').map(t=>({x:t.x,z:t.z})),road:!!f.drivewayMesh,geometry:f.drivewayMesh?.geometry.parameters,position:f.drivewayMesh?.position,blocked:Array.from({length:36},(_,i)=>checkWallCollision(17+i,0,86))};})()`);
 expect(r.row).toHaveLength(7);expect(new Set(r.row.map((p:any)=>p.z)).size).toBe(1);expect(r.row[0].x).toBe(0);expect(r.row.at(-1).x).toBe(36);
 expect(r.road).toBe(true);expect(r.geometry).toMatchObject({width:158,height:9});expect(r.position.z).toBe(86);expect(r.blocked.some(Boolean)).toBe(false);
});
