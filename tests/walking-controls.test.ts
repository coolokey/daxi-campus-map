import { beforeAll, afterAll, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { JSDOM } from 'jsdom';

let dom:JSDOM,context:vm.Context;
const root='public/campus-explorer/';
const run=(s:string)=>vm.runInContext(s,context,{timeout:180000});
beforeAll(()=>{
 dom=new JSDOM(readFileSync(root+'index.html','utf8'),{url:'https://example.test',runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window as any;context=dom.getInternalVMContext();
 w.requestAnimationFrame=()=>1;w.alert=()=>{};w.matchMedia=()=>({matches:false});
 w.HTMLCanvasElement.prototype.getContext=function(){return new Proxy({canvas:this,measureText:(t:string)=>({width:t.length*15}),createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>k in o?o[k]:()=>{}})};
 const file=(f:string)=>run(readFileSync(root+f,'utf8'));
 file('vendor/three.min.js');
 w.THREE.WebGLRenderer=class{domElement:any;shadowMap={};capabilities={getMaxAnisotropy:()=>1};constructor({canvas}:any){this.domElement=canvas}setSize(){}setPixelRatio(){}render(){}};
 file('vendor/OrbitControls.js');
 for(const f of ['campus-data.js','spatial-plan-data.js','spatial-plan.js','collision-grid.js','grid-search.js','outdoor-plan.js','outdoor-world.js','floor-exhibit-model.js','mouse-controls-model.js','entrance-avenue.js','explorer.js','walk-world-math.js','room-layout-model.js','spatial-world.js'])file(f);
},180000);
afterAll(()=>dom.window.close());
it('navigation marker stays near its target rather than accumulating a vertical offset',()=>{
 run(`setControlMode('bird');renderNavigationPath([new THREE.Vector3(-10,.6,90),new THREE.Vector3(-10,.6,96)]);clock.getElapsedTime=()=>Math.PI/8;for(let i=0;i<120;i++)animate();`);
 expect(run('navTargetPoint.position.y')).toBeCloseTo(3.2,0);
 run('clearNavigation()');
});
it('free look rotates the camera without moving or turning the standing avatar in either perspective',()=>{
 for(const mode of ['avatar','firstperson']){
  run(`stopAutoWalk();resetManualInput();setControlMode('${mode}');clock.getDelta=()=>.1;avatarAngle=0;avatarGroup.rotation.y=0;walkPitch=0;avatarGroup.position.set(-10,0,96);applyManualCameraRotation(Math.PI/.0035,0);animate();`);
  expect(run('avatarGroup.rotation.y')).toBe(0);
  expect(run('avatarGroup.position.x')).toBe(-10);expect(run('avatarGroup.position.z')).toBe(96);
  expect(run('avatarAngle')).toBeCloseTo(-Math.PI);
  if(mode==='avatar')expect(run('camera.position.z')).toBeGreaterThan(96);
  else expect(run('camera.position.z')).toBe(96);
 }
});
it('walking after free look faces and moves along the viewed direction',()=>{
 run(`stopAutoWalk();resetManualInput();setControlMode('avatar');avatarGroup.position.set(-10,0,96);avatarAngle=0;avatarGroup.rotation.y=0;walkPitch=0;applyManualCameraRotation(Math.PI/.0035,0);moveInput.forward=true;clock.getDelta=()=>.1;animate();`);
 expect(run('avatarGroup.position.z')).toBeLessThan(96);
 expect(run('avatarGroup.rotation.y')).toBeCloseTo(-Math.PI);
 run('resetManualInput()');
});
it('movement immediately takes over auto walking but typing in search does not',()=>{
 expect(run(`navigateToRoom('academic');startAutoWalk();document.getElementById('search-input').dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));isAutoWalking`)).toBe(true);
 expect(run(`document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));isAutoWalking`)).toBe(false);
 expect(run(`document.getElementById('nav-hud').classList.contains('visible')`)).toBe(true);
 expect(run(`moveInput.forward`)).toBe(true);
 run(`document.body.dispatchEvent(new KeyboardEvent('keyup',{key:'w',bubbles:true}));`);
});
it('resumes from the current position and preserves first person',()=>{
 run(`stopAutoWalk();avatarGroup.position.set(-10,0,96);setControlMode('firstperson');startAutoWalk();`);
 expect(run(`currentMode`)).toBe('firstperson');
 expect(run(`currentNavPoints[0].x`)).toBe(-10);
 expect(run(`currentNavPoints[0].z`)).toBe(96);
});
it('a new destination stops old walking until the user starts it',()=>{
 run(`navigateToRoom('901');`);
 expect(run(`isAutoWalking`)).toBe(false);
 expect(run(`document.getElementById('hud-target-name').textContent`)).toContain('901');
});
it('blur and mode switching stop walking and clear held inputs',()=>{
 run(`startAutoWalk();moveInput.forward=true;window.dispatchEvent(new Event('blur'));`);
 expect(run(`isAutoWalking||moveInput.forward`)).toBe(false);
 run(`startAutoWalk();moveInput.right=true;setControlMode('bird');`);
 expect(run(`isAutoWalking||moveInput.right`)).toBe(false);
});
it('direction buttons preserve first person and take over walking',()=>{
 run(`setControlMode('firstperson');startAutoWalk();document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mousedown',{bubbles:true}));`);
 expect(run(`isAutoWalking`)).toBe(false);
 expect(run(`currentMode`)).toBe('firstperson');
 run(`document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));`);
});
it('existing settings overlays stop automatic and keyboard movement',async()=>{
 run(`setControlMode('avatar');startAutoWalk();document.getElementById('modal-speed-ctrl').classList.add('open');`);
 await Promise.resolve();
 expect(run(`isAutoWalking`)).toBe(false);
 run(`document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));`);
 expect(run(`moveInput.forward`)).toBe(false);
 run(`document.getElementById('modal-speed-ctrl').classList.remove('open');`);
});
it('analog movement keeps partial speed, caps diagonal speed and uses collision',()=>{
 run(`stopAutoWalk();setControlMode('avatar');window.campusMobileControls={move:{x:0,y:0},look:{x:0,y:0},reset(){this.move.x=this.move.y=this.look.x=this.look.y=0}};clock.getDelta=()=>.1;avatarGroup.position.set(-10,0,96);avatarAngle=Math.PI;campusMobileControls.move.y=.5;animate();`);
 expect(run(`96-avatarGroup.position.z`)).toBeCloseTo(.9);
 run(`avatarGroup.position.set(-10,0,96);campusMobileControls.move.x=1;campusMobileControls.move.y=1;animate();`);
 expect(run(`Math.hypot(avatarGroup.position.x+10,avatarGroup.position.z-96)`)).toBeCloseTo(1.8);
 run(`avatarGroup.position.set(78,10.8,46);avatarAngle=Math.PI/2;campusMobileControls.move.x=0;campusMobileControls.move.y=1;for(let i=0;i<10;i++)animate();`);
 const stoppedX=run(`avatarGroup.position.x`);
 run(`for(let i=0;i<10;i++)animate();`);
 expect(run(`avatarGroup.position.x`)).toBe(stoppedX);
 expect(stoppedX).toBeLessThan(81);
});
it('releasing a direction button does not release a held keyboard direction',()=>{
 run(`setControlMode('avatar');resetManualInput();document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mousedown'));document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mouseup'));`);
 expect(run(`moveInput.forward`)).toBe(true);
 run(`document.body.dispatchEvent(new KeyboardEvent('keyup',{key:'w',bubbles:true}));document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mousedown'));document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));document.body.dispatchEvent(new KeyboardEvent('keyup',{key:'w',bubbles:true}));`);
 expect(run(`moveInput.forward`)).toBe(true);
 run(`document.getElementById('dpad-up').dispatchEvent(new MouseEvent('mouseup'));`);
});
it('starting first-person walking cancels a previously scheduled bird-view tween',()=>{
 run(`document.getElementById('modal-speed-ctrl').classList.remove('open');window.qaFrames=[];requestAnimationFrame=fn=>(qaFrames.push(fn),1);setControlMode('bird');navigateToRoom('academic');setControlMode('firstperson');startAutoWalk();const oldFrames=qaFrames.slice();oldFrames.forEach(fn=>fn(performance.now()+2000));`);
 expect(run(`camera.position.distanceTo(avatarGroup.position.clone().add(new THREE.Vector3(0,1.55,0)))`)).toBeLessThan(.3);
 run(`requestAnimationFrame=()=>1;`);
});
it('repeated pause calls do not cause feedback mutations in a blocked overlay',async()=>{
 run(`stopAutoWalk();window.qaMutationCount=0;window.qaObserver=new MutationObserver(records=>qaMutationCount+=records.length);qaObserver.observe(document.getElementById('btn-auto-walk'),{subtree:true,attributes:true,childList:true});stopAutoWalk();stopAutoWalk();stopAutoWalk();`);
 await Promise.resolve();
 expect(run(`qaMutationCount`)).toBe(0);
 run(`qaObserver.disconnect();`);
});
