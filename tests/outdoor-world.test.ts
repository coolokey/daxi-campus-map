import {beforeAll,afterAll,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
let dom:JSDOM,context:vm.Context;
const root='public/campus-explorer/',run=(s:string)=>vm.runInContext(s,context,{timeout:180000});
beforeAll(()=>{
 dom=new JSDOM(readFileSync(root+'index.html','utf8'),{url:'https://example.test',runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window as any;context=dom.getInternalVMContext();w.requestAnimationFrame=()=>1;w.alert=()=>{};w.matchMedia=()=>({matches:false});
 w.HTMLCanvasElement.prototype.getContext=function(){return new Proxy({canvas:this,measureText:(t:string)=>({width:String(t).length*15}),createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>k in o?o[k]:()=>{}})};
 const file=(f:string)=>{if(existsSync(root+f))run(readFileSync(root+f,'utf8'))};file('vendor/three.min.js');
 w.THREE.WebGLRenderer=class{domElement:any;shadowMap={};capabilities={getMaxAnisotropy:()=>1};constructor({canvas}:any){this.domElement=canvas}setSize(){}setPixelRatio(){}render(){}};
 file('vendor/OrbitControls.js');
 for(const f of ['campus-data.js','spatial-plan-data.js','spatial-plan.js','collision-grid.js','grid-search.js','outdoor-plan.js','outdoor-world.js','floor-exhibit-model.js','mouse-controls-model.js','entrance-avenue.js','explorer.js','walk-world-math.js','room-layout-model.js','spatial-world.js','photo-facade.js','art-direction.js','photo-reference.js'])file(f);
},180000);
afterAll(()=>dom.window.close());
it('places one legible two-sided projecting sign outside every real room and offsets the existing wall plaque',()=>{
 const bad=run(`(()=>{scene.updateMatrixWorld(true);const bad=[];for(const l of campusWalkWorld.layouts)for(const r of l.rooms){const objects=[];scene.traverse(o=>{if(o.userData.roomId===r.id)objects.push(o)});const faces=objects.filter(o=>o.userData.nameplateStyle==='projecting');if(faces.length!==2){bad.push(r.id+' missing two faces');continue;}const a=faces[0],b=faces[1],na=new THREE.Vector3(0,0,1).transformDirection(a.matrixWorld),nb=new THREE.Vector3(0,0,1).transformDirection(b.matrixWorld);if(na.dot(nb)>-.999)bad.push(r.id+' mirrored faces');const q=l.local(a.position.x,a.position.z),axis=r.doorSide[0],out=r.doorSide.endsWith('0')?-1:1,wall=r[r.doorSide];if((q[axis]-wall)*out<.2)bad.push(r.id+' buried projecting sign');if(a.position.y-(r.floor-1)*FH<2.4)bad.push(r.id+' low sign');const flat=objects.find(o=>o.userData.nameplateStyle==='wall');if(!flat)bad.push(r.id+' missing wall plaque');else{const p=l.local(flat.position.x,flat.position.z);if((p[axis]-wall)*out<.11)bad.push(r.id+' buried wall plaque');}}return bad})()`);
 expect(bad).toEqual([]);
});
it('renders first-floor interior paving above the outdoor lawn instead of on the same plane',()=>{
 const result=run(`(()=>{scene.updateMatrixWorld(true);const l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),r=l.rooms.find(r=>r.floor===1),ray=new THREE.Raycaster(new THREE.Vector3(r.center.x,.2,r.center.z),new THREE.Vector3(0,-1,0),0,.3),hit=ray.intersectObjects(scene.children,true)[0];return {height:hit.point.y,surface:hit.object.material.userData.campusSurface}})()`);
 expect(result.surface).toBe('floor');expect(result.height).toBeGreaterThan(.01);
});
it('leaves standing headroom underneath stacked stair flights',()=>{
 const failures=run(`(()=>{scene.updateMatrixWorld(true);const meshes=scene.children.filter(g=>g.name.startsWith('floor-stairs-')).flatMap(g=>g.children.filter(m=>m.isMesh)),ray=new THREE.Raycaster(),bad=[];for(const l of campusWalkWorld.layouts)for(const r of l.ramps)for(let i=1;i<20;i++){const p=CampusWalkMath.rampPoint(r,i/20);ray.set(new THREE.Vector3(p.x,p.y+.22,p.z),new THREE.Vector3(0,1,0));ray.far=1.68;const hit=ray.intersectObjects(meshes,false)[0];if(hit)bad.push({stair:r.stairId,floor:r.floor,t:i/20,clearance:hit.distance+.22});}return bad})()`);
 expect(failures).toEqual([]);
});
it('rebuilt school floors retain distinct photo-based wall and stair materials instead of a shared white surface',()=>{
 const surfaces=run(`(()=>{const result={};scene.traverse(o=>{for(const m of Array.isArray(o.material)?o.material:[o.material])if(m?.userData.campusSurface){const id=m.userData.campusBuildingId;result[id]??={};result[id][m.userData.campusSurface]={luminance:m.color.r*.2126+m.color.g*.7152+m.color.b*.0722,hex:m.color.getHex(),roughness:m.roughness}}});return result})()`);
 expect(surfaces['admin-front']).toBeDefined();expect(surfaces['gym-bld']).toBeDefined();
 expect(surfaces['admin-back'].stair.hex).not.toBe(surfaces['gym-bld'].stair.hex);
 expect(surfaces['admin-front'].floor.luminance).toBeLessThan(surfaces['admin-front'].wall.luminance);
 expect(surfaces['gym-bld'].floor.luminance).toBeLessThan(surfaces['gym-bld'].wall.luminance);
 for(const building of Object.values(surfaces) as any[])for(const kind of ['wall','floor','stair'])if(building[kind]){expect(building[kind].luminance).toBeLessThan(.65);expect(building[kind].roughness).toBeGreaterThanOrEqual(.9)}
});
it('does not fetch hidden reference photos before opening their panel',()=>{
 run(`document.querySelector('#photo-image').removeAttribute('src')`);
 expect(run(`document.querySelector('#photo-image').getAttribute('src')`)).toBe(null);
 run(`document.querySelector('#scene-toolbar button:last-child').click()`);
 expect(run(`document.querySelector('#photo-image').getAttribute('src')`)).toContain('photos/');
});
it('matches the plan orientation for the running track and basketball courts',()=>{
 expect(run(`CampusOutdoorPlan.palette.track`)).toBe(0xc93434);
 const courts=run(`(()=>{const g=scene.children.find(g=>g.name==='basketball-court-complex');return {positions:g?.children.filter(m=>m.userData?.mapCourt).map(m=>({x:m.position.x,z:m.position.z,w:m.geometry.parameters.width,d:m.geometry.parameters.height}))}})()`);
 expect(courts.positions).toEqual([
  {x:0,z:-14,w:28,d:12.6},
  {x:0,z:0,w:28,d:12.6},
  {x:0,z:14,w:28,d:12.6}
 ]);
});
it('keeps the adjusted grade-nine label and gate spawn aligned with the map',()=>{
 const explorer=readFileSync(root+'explorer.js','utf8'),spatial=readFileSync(root+'spatial-world.js','utf8');
 expect(explorer).toContain('{ name: "九年級棟 (縱向)", x: 7.5, y: 6.0, z: 28 }');
 expect(explorer).toContain('avatarGroup.position.set(-10, 0, 90)');
 expect(spatial).toContain("const gate=node('gate',{x:-10,y:0,z:90})");
});
it('walks up the stage stairs and down using the actual ground motor',()=>{
 const p=run(`(()=>{const p={x:-62,y:0,z:4.3};for(let i=0;i<80;i++)moveAvatarWithCollision(p,0,.08);return p})()`);
 expect(p.y).toBeCloseTo(1.4);expect(p.z).toBeCloseTo(10.7);
 const down=run(`(()=>{const p={x:-62,y:1.4,z:10.7};for(let i=0;i<80;i++)moveAvatarWithCollision(p,0,-.08);return p})()`);
 expect(down.y).toBeCloseTo(0);expect(down.z).toBeCloseTo(4.3);
});
it('blocks approaching the raised stage from its side and leaving through its back wall',()=>{
 expect(run(`(()=>{const p={x:-73,y:0,z:12};moveAvatarWithCollision(p,7,0);return p.x})()`)).toBeLessThan(-70);
 expect(run(`(()=>{const p={x:-62,y:1.4,z:12};moveAvatarWithCollision(p,0,8);return p.z})()`)).toBeLessThan(15.8);
});
it('cannot step sideways onto the high end of the stairs from ground level',()=>{
 for(const sign of [-1,1]){
  const p=run(`(()=>{const p={x:-62+${sign}*10,y:0,z:7.5};moveAvatarWithCollision(p,${-sign}*12,0);return p})()`);
  expect(p.y).toBeCloseTo(0);expect(Math.abs(p.x+62)).toBeGreaterThan(run(`CampusOutdoorPlan.stairWidth({z:7.5})/2`));
  const leaving=run(`(()=>{const p={x:-62,y:CampusOutdoorPlan.ground({x:-62,z:7.5}),z:7.5};moveAvatarWithCollision(p,${sign}*10,0);return p})()`);
  expect(leaving.y).toBeGreaterThan(1);expect(Math.abs(leaving.x+62)).toBeLessThanOrEqual(run(`CampusOutdoorPlan.stairWidth({z:7.5})/2`));
 }
});
it('routes to the actual stage height and resumes from the stage without snapping',()=>{
 expect(run(`NAV_NODES[ROOMS_DB.grandstand.node].y`)).toBeCloseTo(1.4);
 const result=run(`(()=>{const route=campusWalkWorld.route({x:-62,y:1.4,z:11},ROOMS_DB.academic);return {start:route?.[0],end:route?.at(-1)}})()`);
 expect(result.start).toEqual({x:-62,y:1.4,z:11});expect(result.end.y).toBeCloseTo(3.6);
});
it('all route edges to the stage follow real ground and remain collision free',()=>{
 const failures=run(`(()=>{const ids=findShortestPath('gate',ROOMS_DB.grandstand.node),p={...NAV_NODES.gate},errors=[];for(const id of ids.slice(1)){const b=NAV_NODES[id],a={...p},n=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.08);for(let i=1;i<=n;i++){const t=i/n,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t,y=a.y+(b.y-a.y)*t;if(moveAvatarWithCollision(p,x-p.x,z-p.z)||Math.abs(p.y-y)>.12){errors.push({id,p:{...p},y});break}}}return errors})()`);
 expect(failures).toEqual([]);
});
it('resuming near a stage column takes a collision-free path around it',()=>{
 for(const x of [-68.5,-56]){
  const failures=run(`(()=>{const p={x:${x},y:1.4,z:8.5},route=campusWalkWorld.route(p,ROOMS_DB.academic),errors=[];if(!route)return ['missing'];for(const q of route.slice(1)){if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z,q.y-p.y)){errors.push({...p});break}}return errors})()`);
  expect(failures).toEqual([]);
 }
});
it('photo reference exposes source dates and stops movement when opened',async()=>{
 run(`setControlMode('avatar');moveInput.forward=true;[...document.querySelectorAll('#scene-toolbar button')].find(b=>b.textContent==='實景對照').click();`);
 await Promise.resolve();
 expect(run(`document.querySelector('#reference-panel').textContent`)).toContain('2019');
 expect(run(`moveInput.forward`)).toBe(false);
});
it('photo reference navigation returns focus on close and can switch source groups',()=>{
 expect(run(`(()=>{const b=document.querySelector('[data-photo-group="admin"]');b?.click();return document.querySelector('#reference-panel').textContent})()`)).toContain('拍攝日期未提供');
 run(`document.querySelector('#photo-close')?.click()`);
 expect(run(`document.getElementById('reference-panel').classList.contains('open')`)).toBe(false);
 expect(run(`document.activeElement.textContent`)).toBe('實景對照');
});

it('places feathered palms outside the gate and connects the avenue to walking navigation',()=>{
 const info=run(`({palms:CampusEntranceAvenue.palms,triangles:CampusEntranceAvenue.crownGeometry().attributes.position.count/3,route:campusWalkWorld.route({x:-10,y:0,z:90},ROOMS_DB['palm-avenue']),centerBlocked:checkWallCollision(-10,0,130),trunkBlocked:checkWallCollision(-16.5,0,96)})`);
 expect(info.palms).toHaveLength(20);
 expect(info.palms.every((p:any)=>p.z>90&&p.height>13&&Math.abs(p.x+10)>4.5)).toBe(true);
 expect(info.triangles).toBeLessThan(1800);
 expect(info.route).toBeTruthy();
 expect(info.centerBlocked).toBe(false);expect(info.trunkBlocked).toBe(true);
});

it('shows the original sports mosaic above the rear windows without stretching its proportions',()=>{
 const mural=run(`(()=>{const m=scene.getObjectByName('stage-rear-sports-mural');return {x:m.position.x,y:m.position.y,z:m.position.z,w:m.geometry.parameters.width,h:m.geometry.parameters.height,uv:Array.from(m.geometry.attributes.uv.array)}})()`);
 expect(mural.x).toBe(-62);expect(mural.z).toBeGreaterThan(16);
 expect(mural.w/mural.h).toBeCloseTo(2.0625);
 expect(mural.y-mural.h/2).toBeGreaterThan(2);
 expect(mural.uv.every((n:number)=>n>0&&n<1)).toBe(true);
});

it('stair flights retain closed risers at walking height without filling the space below',()=>{
 const hits=run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='admin-back'),r=l.ramps[0],p=CampusWalkMath.rampPoint(r,.5),g=scene.children.find(g=>g.name==='floor-stairs-2'&&g.userData.buildingId===l.id),meshes=g.children.filter(m=>m.isMesh&&m.material.userData.campusSurface==='stair');g.updateMatrixWorld(true);const origin=new THREE.Vector3(p.x,p.y-.08,p.z),direction=l.horizontal?new THREE.Vector3(0,0,1):new THREE.Vector3(1,0,0);origin.addScaledVector(direction,-1.2);return new THREE.Raycaster(origin,direction,0,2.4).intersectObjects(meshes).length})()`);
 expect(hits).toBeGreaterThan(0);
});
it('corridor ceilings remain above walking height and hide for floor cutaway viewing',()=>{
 expect(run(`!!scene.getObjectByName('corridor-ceiling-admin-front-2')`)).toBe(true);
 const result=run(`(()=>{setControlMode('avatar');setFloorFilter('2');const g=scene.getObjectByName('corridor-ceiling-admin-front-2'),walking=g.visible;const bounds=new THREE.Box3().setFromObject(g);setControlMode('bird');const bird=g.visible;setControlMode('firstperson');const firstperson=g.visible;setFloorFilter('all');return {walking,bird,firstperson,bottom:bounds.min.y}})()`);
 expect(result.walking).toBe(true);expect(result.bird).toBe(false);expect(result.firstperson).toBe(true);expect(result.bottom).toBeGreaterThan(3.6+2.6);
});

it('corridor ceilings, beams and lamps do not bridge any stair opening',()=>{
 const blocked=run(`(()=>{const errors=[];scene.updateMatrixWorld(true);for(const l of campusWalkWorld.layouts.filter(l=>l.holes?.length))for(const h of l.holes){const p=l.world((h.u0+h.u1)/2,(h.v0+h.v1)/2),g=scene.getObjectByName('corridor-ceiling-'+l.id+'-1');if(!g)continue;const ray=new THREE.Raycaster(new THREE.Vector3(p.x,.1,p.z),new THREE.Vector3(0,1,0),0,3.5);if(ray.intersectObjects(g.children,true).length)errors.push(l.id)}return errors})()`);
 expect(blocked).toEqual([]);
});

it('all switchback and exit landings support a whole character footprint and leave clearance from walls',()=>{
 const failures=run(`(()=>{const failures=[],radius=AVATAR_COLLISION_RADIUS;for(const l of campusWalkWorld.layouts)for(const s of l.stairs)for(let f=1;f<l.b.floors;f++)for(const [kind,u,v,y] of [['turn',s.turnU,s.centerV,(f-.5)*FH],['lower',s.innerU,s.centerV+s.sign*1.25,(f-1)*FH],['upper',s.innerU,s.centerV-s.sign*1.25,f*FH]]){const center=l.world(u,v,y);if(checkWallCollision(center.x,center.y,center.z))failures.push({building:l.id,stair:s.id,f,kind,reason:'wall'});for(let i=0;i<16;i++){const a=i*Math.PI/8,x=center.x+Math.cos(a)*radius,z=center.z+Math.sin(a)*radius;if(Math.abs(campusWalkWorld.ground({x,y,z})-y)>.025)failures.push({building:l.id,stair:s.id,f,kind,reason:'unsupported footprint',x,z})}}return failures})()`);
 expect(failures).toEqual([]);
});
it('switchback navigation traverses the interior of each landing rather than pivoting on the tread edge',()=>{
 const invalid=run(`(()=>{const invalid=[];for(const l of campusWalkWorld.layouts)for(const s of l.stairs)for(let f=1;f<l.b.floors;f++){const a=campusWalkWorld.graph[s.id+'-turn-in-'+f],b=campusWalkWorld.graph[s.id+'-turn-'+f];if(!a||!b||!a.neighbors.includes(b.id))invalid.push(s.id);else if(Math.abs(l.local(a.x,a.z).u-s.turnU)>.001||Math.abs(l.local(b.x,b.z).u-s.turnU)>.001)invalid.push(s.id)}return invalid})()`);
 expect(invalid).toEqual([]);
});

it('upper stair openings have real guard barriers while both flight entrances remain unobstructed',()=>{
 const failures=run(`(()=>{const failures=[];for(const l of campusWalkWorld.layouts)for(const s of l.stairs){const y=FH,guard=l.world(s.nearU+.04,s.centerV,y),lower=l.world(s.nearU,s.centerV+s.sign*1.25,y),upper=l.world(s.nearU,s.centerV-s.sign*1.25,y);if(!checkWallCollision(guard.x,guard.y,guard.z))failures.push(s.id+' missing guard');if(checkWallCollision(lower.x,lower.y,lower.z)||checkWallCollision(upper.x,upper.y,upper.z))failures.push(s.id+' blocked flight')}return failures})()`);
 expect(failures).toEqual([]);
});

it('retained curved tower facades stay outside the building instead of passing through the actual stairs',()=>{
 const violations=run(`(()=>{const bad=[];scene.updateMatrixWorld(true);for(const id of ['gym-bld','grade8-front']){const cfg=BUILDINGS_CONFIG.find(b=>b.id===id),g=scene.children.find(g=>g.userData.buildingId===id&&!g.name.startsWith('floor-')),front=cfg.x+cfg.width/2,west=cfg.x-cfg.width/2;for(const m of g.children.filter(m=>m.isMesh&&m.geometry.type==='CylinderGeometry'&&m.geometry.parameters.radiusTop>=4.6)){const box=new THREE.Box3().setFromObject(m);if(id==='gym-bld'?box.min.x<front-.01:box.max.x>west+.01)bad.push({id,min:box.min.x,max:box.max.x})}}return bad})()`);
 expect(violations).toEqual([]);
});

it('keeps both camera modes outside slabs and stair solids throughout ascending and descending',()=>{
 const bad=run(`(()=>{const bad=[];for(const mode of ['avatar','firstperson']){setControlMode(mode);for(const l of campusWalkWorld.layouts)for(const r of l.ramps)for(const direction of [-1,1])for(let i=1;i<20;i++){const p=CampusWalkMath.rampPoint(r,i/20);avatarGroup.position.set(p.x,p.y,p.z);avatarAngle=Math.atan2((r.end.x-r.start.x)*direction,(r.end.z-r.start.z)*direction);walkPitch=-.16;campusWalkWorld.updateCamera();if(campusWalkWorld.cameraBlocked(camera.position))bad.push({mode,stair:r.stairId,t:i/20,direction,camera:camera.position.toArray()});}}setControlMode('bird');return bad})()`);
 expect(bad).toEqual([]);
});
it('renders furniture for every real room and leaves every doorway-to-center path clear',()=>{
 const bad=run(`(()=>{const bad=[];for(const l of campusWalkWorld.layouts)for(const r of l.rooms){const p=CampusRoomLayout.furnishings(r);if(!p.parts.length)bad.push(r.id+' empty');const pos={...r.corridor};for(const q of [r.door,r.center])if(moveAvatarWithCollision(pos,q.x-pos.x,q.z-pos.z))bad.push(r.id+' blocked');}return bad})()`);
 expect(bad).toEqual([]);
});
