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
 for(const f of ['campus-data.js','spatial-plan-data.js','spatial-plan.js','collision-grid.js','grid-search.js','outdoor-plan.js','outdoor-world.js','floor-exhibit-model.js','mouse-controls-model.js','entrance-avenue.js','navigation-arrows.js','explorer.js','walk-world-math.js','room-layout-model.js','gym-world.js','photo-facade.js','campus-forecourt.js','landscape-world.js','spatial-world.js','photo-teaching.js','photo-roofs.js','photo-special-buildings.js','art-direction.js','photo-reference.js'])file(f);
},180000);
afterAll(()=>dom.window.close());
it('walks through the statue-facing main door and gate-side small door using the physical scene',()=>{
 const result=run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),bad=[];for(const kind of ['main','side']){
  const e=l.entrances.find(e=>e.kind===kind);if(!e){bad.push(kind+' missing');continue;}
  const p={...e.outside};for(const end of [e.inside,...(kind==='side'?[l.world(l.L/2-1.1,l.cV)]:[])]){
   const start={...p},n=Math.ceil(Math.hypot(end.x-p.x,end.z-p.z)/.1);
   for(let i=1;i<=n;i++){const q={x:start.x+(end.x-start.x)*i/n,z:start.z+(end.z-start.z)*i/n};if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z)){bad.push(kind+' blocked');break}}
  }
 }return bad})()`);expect(result).toEqual([]);
});
it('opens the administrative side passage into the confirmed Scheme C circulation',()=>{
 const result=run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),p=l.world(l.L/2-1.1,-l.D/2-1),q=l.world(l.L/2-1.1,-l.D/2+1);return moveAvatarWithCollision(p,q.x-p.x,q.z-p.z)})()`);
 expect(result).toBe(false);
});
it('keeps the photo-positioned cube clear of obsolete courtyard tree trunks',()=>{
 const hits=run(`(()=>{scene.updateMatrixWorld(true);const cube=scene.getObjectByName('cube-core'),bounds=new THREE.Box3().setFromObject(cube),hits=[];scene.traverse(o=>{if(o.isMesh&&o.geometry.type==='CylinderGeometry'&&o.geometry.parameters.height>1&&bounds.intersectsBox(new THREE.Box3().setFromObject(o)))hits.push(o.getWorldPosition(new THREE.Vector3()).toArray())});return hits})()`);
 expect(hits).toEqual([]);
});
it('has a continuous visible perimeter that blocks players, jumping students, teachers and cameras',()=>{
 const result=run(`(()=>{const p=CampusOutdoorPlan.perimeter,g=scene.getObjectByName('campus-perimeter'),bad=[];if(!p||!g)return {missing:true};scene.updateMatrixWorld(true);for(const [i,s] of p.segments.entries()){const dx=s.bx-s.ax,dz=s.bz-s.az,d=Math.hypot(dx,dz),nx=-dz/d,nz=dx/d;for(const t of [0,.1,.5,.9,1]){const x=s.ax+dx*t,z=s.az+dz*t;for(const y of [0,1.3])if(!checkWallCollision(x,y,z)||!campusPeopleCollisionIndex.hit(x,y,z))bad.push(i+' collision');if(!campusWalkWorld.cameraBlocked({x,y:1,z}))bad.push(i+' camera');const ray=new THREE.Raycaster(new THREE.Vector3(x+nx*2,1,z+nz*2),new THREE.Vector3(-nx,0,-nz),0,4);if(!ray.intersectObjects(g.children,true).length)bad.push(i+' visual');}}return {missing:false,bad}})()`);
 expect(result).toEqual({missing:false,bad:[]});
});
it('stops high-speed and jumping movement through perimeter faces without sealing the gate approach',()=>{
 const result=run(`(()=>{const perimeter=CampusOutdoorPlan.perimeter;if(!perimeter)return {missing:true};const failures=[];for(const [i,s] of perimeter.segments.entries()){const dx=s.bx-s.ax,dz=s.bz-s.az,d=Math.hypot(dx,dz),nx=-dz/d,nz=dx/d,mx=(s.ax+s.bx)/2,mz=(s.az+s.bz)/2;for(const side of [-1,1]){const p={x:mx+nx*2*side,y:0,z:mz+nz*2*side};const blocked=moveAvatarWithCollision(p,-nx*4*side,-nz*4*side);if(!blocked||((p.x-mx)*nx+(p.z-mz)*nz)*side<0)failures.push(i+' fast crossing');}if(!checkWallCollision(mx,1.3,mz))failures.push(i+' jumping');}const p={x:CampusOutdoorPlan.entrance.gate.x,y:0,z:80};moveAvatarWithCollision(p,0,50);return {missing:false,failures,gate:p}})()`);
 expect(result.missing).toBe(false);expect(result.failures).toEqual([]);expect(result.gate.z).toBeCloseTo(130);expect(result.gate.y).toBe(0);
});
it('keeps every real room inside the plan perimeter while excluding the surrounding off-campus land',()=>{
 const result=run(`(()=>{const p=CampusOutdoorPlan.perimeter;if(!p)return {missing:true};return {missing:false,outside:campusWalkWorld.layouts.flatMap(l=>l.rooms.filter(r=>!p.contains(r.center.x,r.center.z)).map(r=>r.id)),west:p.contains(-180,0),north:p.contains(0,-100),east:p.contains(130,0),river:p.contains(40,115)}})()`);
 expect(result).toEqual({missing:false,outside:[],west:false,north:false,east:false,river:false});
});
it('keeps driveway ends and parking canopies inside the perimeter or the open vehicle approach',()=>{
 const bad=run(`(()=>{const p=CampusOutdoorPlan.perimeter,bad=[],road=scene.children.find(m=>m.isMesh&&m.geometry.type==='PlaneGeometry'&&m.position.z===86&&m.position.y===.02),canopies=scene.children.filter(m=>m.isMesh&&m.geometry.type==='BoxGeometry'&&m.position.y===3&&m.position.z===90);for(const m of [road,...canopies]){const width=m.geometry.parameters.width,depth=m.geometry.parameters.depth||m.geometry.parameters.height;for(const dx of [-width/2,width/2])for(const dz of [-depth/2,depth/2]){const x=m.position.x+dx,z=m.position.z+dz,e=CampusOutdoorPlan.entrance,vehicleApproach=m===road&&x>=e.gate.x-9.6&&x<=e.gate.x+9.6&&z>=e.gate.z&&z<=e.gate.z+5;if(!p.contains(x,z)&&!vehicleApproach)bad.push({x,z})}}return bad})()`);
 expect(bad).toEqual([]);
});
it('uses a larger, taller collision envelope for the rendered staff and student models',()=>{
 expect(run(`!!window.campusPeopleCollisionIndex`)).toBe(true);
 expect(run(`WALL_COLLIDERS.filter(c=>c.maxY-c.minY>.25).every(c=>campusPeopleCollisionIndex.hit((c.minX+c.maxX)/2,c.minY,(c.minZ+c.maxZ)/2))`)).toBe(true);
 expect(run(`WALL_COLLIDERS.some(c=>{const p={x:c.minX-.53,y:c.minY,z:(c.minZ+c.maxZ)/2};return !campusCollisionIndex.hit(p.x,p.y,p.z)&&campusPeopleCollisionIndex.hit(p.x,p.y,p.z)})`)).toBe(true);
});
it('keeps physical walls and ceilings visible while walking after selecting a lower floor',()=>{
 const result=run(`(()=>{const floor=()=>scene.children.find(g=>g.name==='floor-3'&&g.userData.buildingId==='admin-front'),ceiling=()=>scene.getObjectByName('corridor-ceiling-admin-front-3');setControlMode('bird');setFloorFilter('1');const cutaway=floor().visible;setControlMode('avatar');const walking=floor().visible;setFloorFilter('2');const descending=floor().visible&&ceiling().visible;setControlMode('firstperson');const firstperson=floor().visible;setControlMode('bird');const restored=floor().visible;setFloorFilter('all');return {cutaway,walking,descending,firstperson,restored}})()`);
 expect(result).toEqual({cutaway:false,walking:true,descending:true,firstperson:true,restored:false});
});
it('shows a solid lower surface for every hidden wall and stair-guard collision proxy',()=>{
 const bad=run(`(()=>{setControlMode('firstperson');setFloorFilter('all');scene.updateMatrixWorld(true);const floors=scene.children.filter(g=>g.name.startsWith('floor-')),visible=new Map([...new Set(floors.map(g=>g.userData.buildingId))].map(id=>[id,floors.filter(g=>g.userData.buildingId===id).flatMap(g=>g.children.filter(m=>m.isMesh&&m.visible&&m.material.opacity>.85))])),bad=[];for(const g of floors)for(const m of g.children.filter(m=>m.isMesh&&!m.visible&&!m.userData.roof)){const b=new THREE.Box3().setFromObject(m),alongX=b.max.x-b.min.x>b.max.z-b.min.z;for(const t of [.31,.69]){const x=alongX?b.min.x+(b.max.x-b.min.x)*t:(b.min.x+b.max.x)/2,z=alongX?(b.min.z+b.max.z)/2:b.min.z+(b.max.z-b.min.z)*t,origin=new THREE.Vector3(alongX?x:b.min.x-.15,b.min.y+(g.userData.buildingId==='gym-bld'?.06:.3),alongX?b.min.z-.15:z),direction=new THREE.Vector3(alongX?0:1,0,alongX?1:0),ray=new THREE.Raycaster(origin,direction,0,.5);if(!ray.intersectObjects(visible.get(g.userData.buildingId),false).length){bad.push(g.name);break;}}}setControlMode('bird');return bad})()`);
 expect(bad).toEqual([]);
});
it('closes exposed upper corridor ends with visible parapets and preserves gallery connections',()=>{
 const bad=run(`(()=>{scene.updateMatrixWorld(true);const meshes=scene.children.filter(g=>g.name.startsWith('floor-')).flatMap(g=>g.children.filter(m=>m.isMesh&&m.visible&&m.material.opacity>.85)),bad=[];for(const l of campusWalkWorld.layouts.filter(l=>!l.b.spatialProfile?.shape&&!l.paths))for(let f=2;f<=l.b.floors;f++)for(const side of [-1,1]){const corridor=l.corridors.find(c=>c.floor===f),p=l.world(side*l.L/2,(corridor.v0+corridor.v1)/2,(f-1)*FH+.5),n=l.world(side,0),o=l.world(0,0),direction=new THREE.Vector3(n.x-o.x,0,n.z-o.z),connected=campusWalkWorld.galleries.some(g=>g.footprints.some(q=>q.floor===f&&CampusWalkMath.inside(q.rect,p.x,p.z)));const teachingConnected=campusWalkWorld.layouts.some(other=>other!==l&&['grade8-front','grade8-mid'].includes(l.id)&&['grade8-front','grade8-mid'].includes(other.id)&&other.corridors.some(c=>c.floor===f&&CampusWalkMath.inside(c.rect,p.x,p.z)));if(connected||teachingConnected)continue;const origin=new THREE.Vector3(p.x,p.y,p.z).addScaledVector(direction,-.3),ray=new THREE.Raycaster(origin,direction,0,.6);if(!ray.intersectObjects(meshes,false).length)bad.push(l.id+' '+f+' '+side);}return bad})()`);
 expect(bad).toEqual([]);
});
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
 expect(surfaces['admin-front'].stair.hex).not.toBe(surfaces['gym-bld'].stair.hex);
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
 expect(explorer).toContain('CampusOutdoorPlan.entrance.spawn');
 expect(spatial).toContain("CampusOutdoorPlan.entrance.spawn");
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
 const info=run(`({palms:CampusEntranceAvenue.palms,triangles:CampusEntranceAvenue.crownGeometry().attributes.position.count/3,axisX:CampusEntranceAvenue.plan.x,route:campusWalkWorld.route({...CampusOutdoorPlan.entrance.spawn},ROOMS_DB['palm-avenue']),centerBlocked:checkWallCollision(CampusEntranceAvenue.plan.x,0,130),trunkBlocked:checkWallCollision(CampusEntranceAvenue.plan.x-6.5,0,96)})`);
 expect(info.palms).toHaveLength(20);
 expect(info.palms.every((p:any)=>p.z>90&&p.height>13&&Math.abs(p.x-info.axisX)>4.5)).toBe(true);
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
 const hits=run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),r=l.ramps.find(r=>r.floor===1),p=CampusWalkMath.rampPoint(r,.5),g=scene.children.find(g=>g.name==='floor-stairs-2'&&g.userData.buildingId===l.id),meshes=g.children.filter(m=>m.isMesh&&m.material.userData.campusSurface==='stair');g.updateMatrixWorld(true);const origin=new THREE.Vector3(p.x,p.y-.08,p.z),direction=l.horizontal?new THREE.Vector3(0,0,1):new THREE.Vector3(1,0,0);origin.addScaledVector(direction,-1.2);return new THREE.Raycaster(origin,direction,0,2.4).intersectObjects(meshes).length})()`);
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
 const failures=run(`(()=>{const failures=[],radius=AVATAR_COLLISION_RADIUS;for(const l of campusWalkWorld.layouts)for(const s of l.stairs)for(let f=s.fromFloor||1;f<Math.min(l.b.floors,s.toFloor||l.b.floors);f++)for(const [kind,u,v,y] of [['turn',s.turnU,s.centerV,(f-.5)*FH],['lower',s.innerU,s.centerV+s.sign*1.25,(f-1)*FH],['upper',s.innerU,s.centerV-s.sign*1.25,f*FH]]){const center=l.world(u,v,y);if(checkWallCollision(center.x,center.y,center.z))failures.push({building:l.id,stair:s.id,f,kind,reason:'wall'});for(let i=0;i<16;i++){const a=i*Math.PI/8,x=center.x+Math.cos(a)*radius,z=center.z+Math.sin(a)*radius;if(Math.abs(campusWalkWorld.ground({x,y,z})-y)>.025)failures.push({building:l.id,stair:s.id,f,kind,reason:'unsupported footprint',x,z})}}return failures})()`);
 expect(failures).toEqual([]);
});
it('switchback navigation traverses the interior of each landing rather than pivoting on the tread edge',()=>{
 const invalid=run(`(()=>{const invalid=[];for(const l of campusWalkWorld.layouts)for(const s of l.stairs)for(let f=s.fromFloor||1;f<Math.min(l.b.floors,s.toFloor||l.b.floors);f++){const a=campusWalkWorld.graph[s.id+'-turn-in-'+f],b=campusWalkWorld.graph[s.id+'-turn-'+f];if(!a||!b||!a.neighbors.includes(b.id))invalid.push(s.id);else if(Math.abs(l.local(a.x,a.z).u-s.turnU)>.001||Math.abs(l.local(b.x,b.z).u-s.turnU)>.001)invalid.push(s.id)}return invalid})()`);
 expect(invalid).toEqual([]);
});

it('upper stair openings have real guard barriers while both flight entrances remain unobstructed',()=>{
 const failures=run(`(()=>{const failures=[];for(const l of campusWalkWorld.layouts)for(const s of l.stairs){const y=(s.hole.fromFloor||2)*FH-FH,guard=l.world(s.nearU+.04,s.centerV,y),lower=l.world(s.nearU,s.centerV+s.sign*1.25,y),upper=l.world(s.nearU,s.centerV-s.sign*1.25,y);if(!checkWallCollision(guard.x,guard.y,guard.z))failures.push(s.id+' missing guard');if(checkWallCollision(lower.x,lower.y,lower.z)||checkWallCollision(upper.x,upper.y,upper.z))failures.push(s.id+' blocked flight')}return failures})()`);
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

it('activity hall keeps real vertical clearance and a safe second-floor viewing edge',()=>{
 const result=run(`(()=>{setControlMode('firstperson');scene.updateMatrixWorld(true);const l=campusWalkWorld.layouts.find(l=>l.id==='gym-bld'),p=l.world(0,-5,.2),ray=new THREE.Raycaster(new THREE.Vector3(p.x,p.y,p.z),new THREE.Vector3(0,1,0),0,12),hit=ray.intersectObjects(scene.children,true).find(h=>{let n=h.object;while(n){if(!n.visible)return false;n=n.parent}return h.object.material.transparent!==true}),edge=l.world(0,7,3.6),aisle=l.world(0,10.6,3.6);return {clearance:hit?.distance||0,edgeBlocked:checkWallCollision(edge.x,edge.y,edge.z),aisleClear:!checkWallCollision(aisle.x,aisle.y,aisle.z)}})()`);
 expect(result.clearance).toBeGreaterThan(8);expect(result.edgeBlocked).toBe(true);expect(result.aisleClear).toBe(true);
});

it('can restart navigation from every new raised activity-center surface',()=>{
 const failures=run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='gym-bld'),bad=[];for(const [label,u,v,y] of [['stage',4,-15,.6],['tier1',4,11.5,3.75],['tier2',4,12.5,3.9],['tier3',4,13.5,4.05],['porch',0,17.8,.12],['access',-8,21.3,.06],['access-low',-8,23.8,.01],['stage-low',0,-11.5,.15],['window',-16.65,18.5,1.8]]){const start=l.world(u,v,y),route=campusWalkWorld.route(start,ROOMS_DB.academic);if(!route?.length)bad.push(label);else{const p=route.find(p=>Math.abs(campusWalkWorld.ground(p)-p.y)>.14||checkWallCollision(p.x,p.y,p.z));if(p)bad.push({label,p,ground:campusWalkWorld.ground(p),blocked:checkWallCollision(p.x,p.y,p.z)});}}return bad})()`);
 expect(failures).toEqual([]);
});

it('keeps the curved-window midlanding free of low overhead concrete',()=>{
 const result=run(`(()=>{setControlMode('firstperson');const l=campusWalkWorld.layouts.find(l=>l.id==='gym-bld'),p=l.world(l.stairs[0].turnU,18.4,2),ray=new THREE.Raycaster(new THREE.Vector3(p.x,p.y,p.z),new THREE.Vector3(0,1,0),0,12);scene.updateMatrixWorld(true);const h=ray.intersectObjects(scene.children,true).find(h=>{let o=h.object;while(o){if(!o.visible)return false;o=o.parent}return h.object.material.transparent!==true});return {clearance:h?.distance||0,ground:campusWalkWorld.ground({...p,y:1.8})}})()`);
 expect(result.clearance).toBeGreaterThan(6.5);expect(result.ground).toBe(1.8);
});

it('walks across each teaching L junction at its own floor without a guard, wall or support drop',()=>{
 const failures=run(`(()=>{const bad=[];for(const j of CampusSpatialPlan.junctions(campusWalkWorld.layouts)){const p={...j.start};for(const q of j.path?.slice(1)||[j.end]){const a={...p},steps=Math.ceil(Math.hypot(q.x-a.x,q.z-a.z)/.1);for(let i=1;i<=steps;i++){const x=a.x+(q.x-a.x)*i/steps,z=a.z+(q.z-a.z)*i/steps;if(moveAvatarWithCollision(p,x-p.x,z-p.z)||Math.abs(p.y-j.start.y)>.1){bad.push({floor:j.floor,p:{...p}});break;}}}}return bad})()`);expect(failures).toEqual([]);
});

it('keeps the technology rounded extension solid and all room doors clear after the two-part rebuild',()=>{
 expect(run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='tech-building'),n=l.facadeFeatures.roundedNose,p=l.world(n.u,n.v+n.radius*.5,0);return checkWallCollision(p.x,0,p.z)})()`)).toBe(true);
 expect(run(`(()=>{scene.updateMatrixWorld(true);const l=campusWalkWorld.layouts.find(l=>l.id==='tech-building'),n=l.facadeFeatures.roundedNose,p=l.world(n.u,n.v+n.radius+.3,1.5),ray=new THREE.Raycaster(new THREE.Vector3(p.x,p.y,p.z),new THREE.Vector3(-1,0,0),0,.5);return ray.intersectObjects(scene.children.filter(g=>g.name==='floor-tech-facade-1'),true).length>0})()`)).toBe(true);
 const failures=run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='tech-building');return l.rooms.filter(r=>{const p={...r.corridor};return moveAvatarWithCollision(p,r.center.x-p.x,r.center.z-p.z)}).map(r=>r.id)})()`);expect(failures).toEqual([]);
});

it('walks across the continuous administrative body on both upper floors',()=>{
 const failures=run(`(()=>{const errors=[];for(const [from,to] of [['academic','general'],['spec-staff-3','teacher-study']]){
  const ids=findShortestPath(ROOMS_DB[from].node,ROOMS_DB[to].node),p={...campusWalkWorld.graph[ROOMS_DB[from].node]};if(!ids){errors.push(from+' missing');continue;}
  for(const id of ids.slice(1)){const q=campusWalkWorld.graph[id],origin={...p},n=Math.max(1,Math.ceil(Math.hypot(q.x-p.x,q.z-p.z)/.1));for(let i=1;i<=n;i++){const target={x:origin.x+(q.x-origin.x)*i/n,z:origin.z+(q.z-origin.z)*i/n};if(moveAvatarWithCollision(p,target.x-p.x,target.z-p.z)||Math.abs(p.y-q.y)>.15){errors.push(from+' '+id);break}}if(errors.length)break;}
 }return errors})()`);expect(failures).toEqual([]);
});

it('renders both aerial-matched pairs at the shared coordinates and routes between the green courts',()=>{
 const r=run(`(()=>{scene.updateMatrixWorld(true);const groups=['inner','outer'].map(id=>{const g=scene.getObjectByName('volleyball-'+id+'-courts');return g.children.filter(m=>m.userData.volleyballCourt).map(m=>({...m.userData.volleyballCourt,x:m.position.x,z:m.position.z}))});const node=NAV_NODES['vb-outer'];return {groups,node:{x:node.x,z:node.z},blocked:checkWallCollision(node.x,0,node.z)}})()`);
 expect(r.groups.map((g:any[])=>g.length)).toEqual([2,2]);
 expect(r.groups[0].map((m:any)=>m.x)).toEqual([-58,-58]);expect(r.groups[1].map((m:any)=>m.z)).toEqual([-48,-26]);
 expect(r.node).toEqual({x:-19.5,z:-37});expect(r.blocked).toBe(false);
});

it('walks the approved rooms, new stair, straight main hall and direct rear-building connector',()=>{
 const result=run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),s=l.stairs.find(s=>s.fromFloor===1),bad=[];
  const walk=(start,end,label,interior=l)=>{const path=campusWalkWorld.gridPath(start,end,start.y,interior);if(!path){bad.push(label+' no path');return;}const p={...start};for(const q of path)if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z)){bad.push(label+' blocked');break;}};
  const main=l.entrances.find(e=>e.kind==='main').inside;
  walk(main,l.world(s.innerU,s.centerV+s.sign*1.25),'new stair lower landing');
  for(const r of l.cells.filter(r=>r.floor===1&&['room','wc'].includes(r.kind))){walk(main,r.corridor,r.id+' approach');const p={...r.corridor};for(const q of [r.door,r.center])if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z))bad.push(r.id+' door');}
  const p={...main};for(let v=3.6;v>=-20;v-=.1){const q=l.world(0,v);if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z)){bad.push('straight central hall at '+v);break;}}
  const j=CampusSpatialPlan.junctions(campusWalkWorld.layouts).find(j=>j.id==='admin-rear');walk(main,j.start,'rear connector');
  const crossing={...j.start};for(const q of j.path?.slice(1)||[j.end])if(moveAvatarWithCollision(crossing,q.x-crossing.x,q.z-crossing.z))bad.push('rear junction');
  const nine=campusWalkWorld.layouts.find(l=>l.id==='grade9-back');walk(j.end,nine.rooms.find(r=>r.id==='907').corridor,'907 corridor',nine);
  return bad;})()`);expect(result).toEqual([]);
});
it('shows separate accessible and general toilet signs in the administrative ground floor',()=>{
 expect(run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),ids=l.cells.filter(c=>c.floor===1&&c.kind==='wc').map(c=>c.id);const signs=[];scene.traverse(o=>{if(o.userData.nameplateStyle==='wall')signs.push(o.userData.roomId)});return ids.every(id=>signs.includes(id))})()`)).toBe(true);
});
it('walks from the second-floor stair arrival into each approved office and the relocated WC',()=>{
 const result=run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),s=l.stairs[0],start=l.world(s.innerU,s.centerV-s.sign*1.25,3.6),bad=[];
 for(const r of l.cells.filter(c=>c.floor===2&&['room','wc'].includes(c.kind))){const path=campusWalkWorld.gridPath(start,r.corridor,3.6,l);if(!path){bad.push(r.id+' approach');continue;}const p={...start};for(const q of [...path.slice(1),r.door,r.center]){if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z)){bad.push(r.id+' movement');break;}}if(r.kind==='room'&&!findShortestPath('gate',ROOMS_DB[r.id].node))bad.push(r.id+' gate route');}
 return bad;})()`);expect(result).toEqual([]);
});
it('labels the relocated second-floor WC with readable wall and projecting signs',()=>{
 expect(run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),wc=l.cells.find(c=>c.floor===2&&c.kind==='wc'),styles=[];scene.traverse(o=>{if(o.userData.roomId===wc.id&&o.userData.nameplateStyle)styles.push(o.userData.nameplateStyle)});return {wall:styles.includes('wall'),projecting:styles.filter(s=>s==='projecting').length}})()`)).toEqual({wall:true,projecting:2});
});
it('walks entire administrative auto-navigation paths across both flights and the one shared office entrance',()=>{
 const result=run(`(()=>{const l=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),bad=[],rows=[];
 const walk=(start,room)=>{const path=campusWalkWorld.route(start,ROOMS_DB[room]);if(!path){bad.push(room+' missing');return;}const p={...start};for(const q of path.slice(1)){const a={...p},n=Math.max(1,Math.ceil(Math.hypot(q.x-a.x,q.y-a.y,q.z-a.z)/.1));for(let i=1;i<=n;i++){const t=i/n,target={x:a.x+(q.x-a.x)*t,y:a.y+(q.y-a.y)*t,z:a.z+(q.z-a.z)*t};if(moveAvatarWithCollision(p,target.x-p.x,target.z-p.z,target.y-p.y)){bad.push({room,p:{...p},target});return;}}}rows.push({room,end:p});};
 for(const room of l.rooms.filter(r=>r.floor>=2))walk({...NAV_NODES.gate},room.id);
 for(const r of l.rooms.filter(r=>r.floor===2&&r.sharedEntrance)){const ids=findShortestPath('gate',ROOMS_DB[r.id].node);if(!ids?.includes(r.sharedEntrance.id+'-door'))bad.push(r.id+' skipped shared entrance');walk(r.center,'admin-reception-1f');}
 walk(l.rooms.find(r=>r.id==='teacher-study').center,'reception');return {bad,rows};})()`);expect(result.bad).toEqual([]);expect(result.rows.length).toBeGreaterThan(10);
});
it('replans a local detour around a person without crossing walls or changing floors',()=>{
 const result=run(`(()=>{if(typeof campusWalkWorld.bypassPeople!=='function')return {missing:true};const previous=window.campusPeople,person={x:-14,y:0,z:79},start={x:-14,y:0,z:81};
 window.campusPeople={blocksPlayer:(a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,d=dx*dx+dz*dz,t=d?Math.max(0,Math.min(1,((person.x-a.x)*dx+(person.z-a.z)*dz)/d)):0;return Math.abs(a.y-person.y)<1.8&&Math.hypot(a.x+t*dx-person.x,a.z+t*dz-person.z)<1.36;}};
 try{const path=campusWalkWorld.bypassPeople(start,[{x:-14,y:0,z:78},{x:-14,y:0,z:76}]);if(!path)return {missing:false,route:false};const p={...start},bad=[];for(const q of path)if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z,q.y-p.y))bad.push(q);const vertical=campusWalkWorld.bypassPeople(start,[{x:-14,y:3.6,z:76}]);return {missing:false,route:true,bad,end:p,vertical};}finally{window.campusPeople=previous;}})()`);
 expect(result).toMatchObject({missing:false,route:true,bad:[],vertical:null});expect(result.end.x).toBeCloseTo(-14);expect(result.end.y).toBe(0);expect(result.end.z).toBeCloseTo(76);
});
it('continues the actual auto-walk loop past a stationary person and arrives at the shared office',()=>{
 const result=run(`(()=>{const previous=window.campusPeople,delta=clock.getDelta,person={x:-14,y:0,z:79};let blocked=0;
 window.campusPeople={update(){},blocksPlayer:(a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,d=dx*dx+dz*dz,t=d?Math.max(0,Math.min(1,((person.x-a.x)*dx+(person.z-a.z)*dz)/d)):0;const hit=Math.abs(a.y-person.y)<1.8&&Math.hypot(a.x+t*dx-person.x,a.z+t*dz-person.z)<1.36;if(hit)blocked++;return hit;}};
 try{document.getElementById('guide-landing')?.remove();document.getElementById('welcome-card')?.classList.add('hidden');clock.getDelta=()=>.1;stopAutoWalk();avatarGroup.position.set(-14,0,81);setControlMode('avatar');navigateToRoom('general',false);document.getElementById('btn-auto-walk').click();let frames=0;while(getNavigationState().status==='walking'&&frames++<600)animate();return {status:getNavigationState().status,room:campusWalkWorld.roomAt(avatarGroup.position)?.id,blocked,frames};}finally{clock.getDelta=delta;window.campusPeople=previous;stopAutoWalk();setControlMode('bird');cancelCameraTween();}})()`);
 expect(result.status).toBe('arrived');expect(result.room).toBe('general');expect(result.blocked).toBeGreaterThan(0);
},20000);

it('rejoins long simplified segments after a nearby corner without cutting through a wall',()=>{
 const result=run(`(()=>{const previous=window.campusPeople,start={x:-34,y:0,z:16},target={x:0,y:0,z:14};window.campusPeople={blocksPlayer:()=>false};try{const path=campusWalkWorld.bypassPeople(start,[{x:-34,y:0,z:14},target]);if(!path)return {missing:true};const p={...start},bad=[];for(const q of path)if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z,q.y-p.y))bad.push(q);return {bad,end:p};}finally{window.campusPeople=previous}})()`);
 expect(result.missing).not.toBe(true);expect(result.bad).toEqual([]);expect(result.end.x).toBeCloseTo(0);expect(result.end.z).toBeCloseTo(14);
});

it('walks directly across all three administrative bridges into the matching ninth-grade room without changing floors',()=>{
 const bad=run(`(()=>{const a=campusWalkWorld.layouts.find(l=>l.id==='admin-front'),bad=[];for(const [i,id] of ['907','904','902'].entries()){
  const f=i+1,link=a.externalLinks?.find(j=>j.floor===f);if(!link){bad.push(id+' missing bridge');continue;}
  const start=a.rooms.find(r=>r.id===(f===1?'admin-g89-staff':f===2?'reception':'teacher-study')).center;
  const path=campusWalkWorld.route(start,ROOMS_DB[id]);if(!path){bad.push(id+' route missing');continue;}const pos={...start};
  for(const q of path.slice(1)){if(Math.abs(q.y-i*3.6)>.01){bad.push(id+' changed floor');break;}if(moveAvatarWithCollision(pos,q.x-pos.x,q.z-pos.z)){bad.push({id,blocked:{...pos},target:q});break;}}
  if(campusWalkWorld.roomAt(pos)?.id!==id)bad.push(id+' not arrived');
 }return bad})()`);expect(bad).toEqual([]);
});

it('detours past a person when the nearest rounded start cell overlaps their clearance',()=>{
 const r=run(`(()=>{const previous=window.campusPeople,person={x:-22.2,y:0,z:71},start={x:-21,y:0,z:71+2/3};
 window.campusPeople={blocksPlayer:(a,b)=>{const dx=b.x-a.x,dz=b.z-a.z,d=dx*dx+dz*dz,t=d?Math.max(0,Math.min(1,((person.x-a.x)*dx+(person.z-a.z)*dz)/d)):0;return Math.abs(a.y-person.y)<1.8&&Math.hypot(a.x+t*dx-person.x,a.z+t*dz-person.z)<1.36;}};
 // End before the existing forecourt planting bed (z <= 68.42), so this
 // fixture isolates rounded-start NPC clearance rather than crossing soil.
 try{const points=Array.from({length:3},(_,i)=>({x:-21,y:0,z:71-i})),path=campusWalkWorld.bypassPeople(start,points);if(!path)return {route:false};const p={...start},bad=[];for(const q of path)if(moveAvatarWithCollision(p,q.x-p.x,q.z-p.z,q.y-p.y))bad.push(q);return {route:true,bad,end:p};}finally{window.campusPeople=previous;}})()`);
 expect(r).toMatchObject({route:true,bad:[]});expect(r.end.x).toBeCloseTo(-21);expect(r.end.y).toBe(0);expect(r.end.z).toBeCloseTo(69);
});

it('blocks sideways stair movement before the avatar body overlaps either rail or safety mesh',()=>{
 const failures=run(`(()=>{const bad=[],l=campusWalkWorld.layouts.find(l=>l.id==='admin-front');for(const r of l.ramps)for(const t of [.25,.5,.75])for(const side of [-1,1]){const start=CampusWalkMath.rampPoint(r,t),p={...start},axis=r.axis==='x'?'z':'x',blocked=moveAvatarWithCollision(p,axis==='x'?side*.9:0,axis==='z'?side*.9:0),offset=Math.abs(p[axis]-start[axis]);if(!blocked||offset>.78-.04-AVATAR_COLLISION_RADIUS+.02)bad.push({stair:r.stairId,floor:r.floor,t,side,offset,blocked});}return bad})()`);
 expect(failures).toEqual([]);
});
it('registers the actual inclined rail boundary as solid at its own flight height',()=>{
 const bad=run(`(()=>{const bad=[];for(const l of campusWalkWorld.layouts)for(const r of l.ramps.filter(r=>l.stairs.some(s=>s.id===r.stairId)))for(const t of [.2,.5,.8])for(const side of [-1,1]){const p=CampusWalkMath.rampPoint(r,t);p[r.axis==='x'?'z':'x']+=side*.78;if(!checkWallCollision(p.x,p.y,p.z))bad.push({stair:r.stairId,t,side});}return bad})()`);
 expect(bad).toEqual([]);
});
it('keeps all rendered overhead slabs clear of the full body on every stair flight and turn landing',()=>{
 const result=run(`(()=>{scene.updateMatrixWorld(true);const meshes=[],bad=[];let samples=0;scene.traverse(o=>{if(o.isMesh&&!o.material.transparent)meshes.push(o)});
 for(const l of campusWalkWorld.layouts)for(const r of l.ramps.filter(r=>l.stairs.some(s=>s.id===r.stairId))){
  const points=[];for(let i=4;i<=36;i++)for(const offset of [-.2,0,.2]){const p=CampusWalkMath.rampPoint(r,i/40);p[r.axis==='x'?'z':'x']+=offset;points.push(p)}
  const s=l.stairs.find(s=>s.id===r.stairId),p=l.platforms.find(p=>p.stairId===s.id&&p.floor===r.floor);for(const v of [s.centerV-1.25,s.centerV,s.centerV+1.25])points.push(l.world(s.turnU,v,p.y));
  for(const p of points){if(checkWallCollision(p.x,p.y,p.z))continue;samples++;const ray=new THREE.Raycaster(new THREE.Vector3(p.x,p.y+.3,p.z),new THREE.Vector3(0,1,0),0,AVATAR_HEIGHT-.3);const hit=ray.intersectObjects(meshes,false).find(h=>Math.abs(h.face.normal.clone().transformDirection(h.object.matrixWorld).y)>.9);if(hit)bad.push({building:l.id,stair:r.stairId,floor:r.floor,p,hit:hit.point.toArray()});}
 }return {samples,bad}})()`);expect(result.samples).toBeGreaterThan(4000);expect(result.bad).toEqual([]);
},30000);
it('keeps legacy canopy support columns outside every stair enclosure',()=>{
 expect(run(`(()=>{scene.updateMatrixWorld(true);const rects=campusWalkWorld.layouts.flatMap(l=>l.ramps.length?l.stairs.map(s=>l.rect(s.u0,s.u1,s.v0,s.v1)):[]),bad=[];scene.traverse(o=>{if(!o.userData.legacyBreezewaySupport)return;const b=new THREE.Box3().setFromObject(o);if(rects.some(r=>r.x0<b.max.x&&r.x1>b.min.x&&r.z0<b.max.z&&r.z1>b.min.z))bad.push(o.getWorldPosition(new THREE.Vector3()).toArray())});return bad})()`)).toEqual([]);
});
it('keeps actual overhead geometry clear along every upper-floor corridor, including the 802-facing passage',()=>{
 const result=run(`(()=>{scene.updateMatrixWorld(true);const meshes=[],bad=[];let samples=0;scene.traverse(o=>{if(o.isMesh&&!o.material.transparent)meshes.push(o)});
 for(const l of campusWalkWorld.layouts)for(const c of l.corridors.filter(c=>c.floor>1)){const rect=l.rect(c.u0,c.u1,c.v0,c.v1),y=(c.floor-1)*FH;
  for(let x=rect.x0+.3;x<rect.x1;x+=1)for(let z=rect.z0+.3;z<rect.z1;z+=1){if(checkWallCollision(x,y,z)||Math.abs(CampusWalkMath.groundAt(l,x,z,y)-y)>.1)continue;samples++;const ray=new THREE.Raycaster(new THREE.Vector3(x,y+.18,z),new THREE.Vector3(0,1,0),0,AVATAR_HEIGHT-.18),hit=ray.intersectObjects(meshes,false).find(h=>Math.abs(h.face.normal.clone().transformDirection(h.object.matrixWorld).y)>.9);if(hit)bad.push({building:l.id,floor:c.floor,x,z,hit:hit.point.toArray()});}
 }return {samples,bad}})()`);expect(result.samples).toBeGreaterThan(500);expect(result.bad).toEqual([]);
},30000);
it('walks around the administrative exterior corner with accumulated route rounding error',()=>{
 expect(run(`(()=>{const p={x:-26.499999999999996,y:0,z:15.000000000000004},blocked=moveAvatarWithCollision(p,.5,0);return {blocked,x:p.x,y:p.y}})()`)).toMatchObject({blocked:false,y:0});
});
