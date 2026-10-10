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
 for(const f of ['campus-data.js','spatial-plan-data.js','spatial-plan.js','collision-grid.js','grid-search.js','outdoor-plan.js','outdoor-world.js','floor-exhibit-model.js','mouse-controls-model.js','entrance-avenue.js','explorer.js','walk-world-math.js','spatial-world.js','photo-facade.js','art-direction.js','photo-reference.js'])file(f);
},180000);
afterAll(()=>dom.window.close());
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
