import {it,expect} from 'vitest'
import {existsSync,readFileSync} from 'node:fs'
import vm from 'node:vm'
import {JSDOM} from 'jsdom'
const ctx=vm.createContext({window:{}}),file='public/campus-explorer/mouse-controls-model.js'
if(existsSync(file))vm.runInContext(readFileSync(file,'utf8'),ctx)
const M=ctx.window.CampusMouseModel
it('turns only at edges, scales sensitivity and leaves the middle quiet',()=>{
 expect(M?.edge).toBeTypeOf('function');expect(M.edge(500,1000,1)).toBe(0)
 expect(M.edge(0,1000,1)).toBeCloseTo(-2.4);expect(M.edge(1000,1000,1)).toBeCloseTo(2.4)
 expect(M.edge(30,1000,1)).toBeCloseTo(-.6)
})
function fixture(prefs?:any){
 const dom=new JSDOM('<canvas></canvas><select id="mode"><option value="left"></option><option value="right"></option><option value="move"></option></select><input id="sens" type="range" min="20" max="300" value="100"><input id="speed" type="range" min="50" max="200" value="100"><input id="inv" type="checkbox"><button id="rt"></button><button id="rs"></button>',{url:'https://example.test',runScripts:'outside-only'})
 const w=dom.window as any,canvas=w.document.querySelector('canvas'),rotations:any[]=[],captures=new Set();
 canvas.getBoundingClientRect=()=>({left:0,width:1000});canvas.setPointerCapture=(id:any)=>captures.add(id);canvas.hasPointerCapture=(id:any)=>captures.has(id);canvas.releasePointerCapture=(id:any)=>captures.delete(id);
 Object.assign(w,{renderer:{domElement:canvas},currentMode:'avatar',mouseTurnMode:'left',turnSensitivityMultiplier:1,avatarSpeedMultiplier:1,isInvertY:false,isAutoWalking:false,motionBlocked:()=>false,manualTakeover:()=>w.isAutoWalking=false,applyManualCameraRotation:(dx:any,dy:any)=>rotations.push([dx,dy]),selectMouseTurn:w.document.getElementById('mode'),sliderTurn:w.document.getElementById('sens'),sliderSpeed:w.document.getElementById('speed'),checkInvertY:w.document.getElementById('inv'),btnResetTurn:w.document.getElementById('rt'),btnResetSpeed:w.document.getElementById('rs')});
 w.selectMouseTurn.addEventListener('change',()=>w.mouseTurnMode=w.selectMouseTurn.value);w.sliderTurn.addEventListener('input',()=>w.turnSensitivityMultiplier=Number(w.sliderTurn.value)/100)
 if(prefs)w.localStorage.setItem('daxi-mouse-settings-v1',JSON.stringify(prefs))
 for(const name of ['mouse-controls-model.js','mouse-controls.js'])vm.runInContext(readFileSync(`public/campus-explorer/${name}`,'utf8'),dom.getInternalVMContext())
 const pointer=(type:string,x=500,button=0,pointerType='mouse')=>{const e=new w.Event(type,{bubbles:true});Object.assign(e,{pointerType,pointerId:1,button,clientX:x,clientY:300});canvas.dispatchEvent(e)}
 return{dom,w,canvas,rotations,captures,pointer}
}
it('captures mouse drag, takes over navigation and clears on release/cancel without handling touch',()=>{
 const f=fixture();f.w.isAutoWalking=true;f.pointer('pointerdown');expect(f.captures.has(1)).toBe(true);f.pointer('pointermove',510);f.w.campusMouse.update(.016);expect(f.rotations.length).toBe(1);expect(f.w.isAutoWalking).toBe(false)
 f.pointer('pointerup',510);expect(f.captures.size).toBe(0);const n=f.rotations.length;f.pointer('pointermove',540);f.w.campusMouse.update(.1);expect(f.rotations.length).toBe(n)
 f.pointer('pointerdown');f.pointer('pointermove',550);f.pointer('pointercancel');f.w.campusMouse.update(.1);expect(f.rotations.length).toBe(n)
 f.pointer('pointerdown',500,0,'touch');f.pointer('pointermove',600,0,'touch');f.w.campusMouse.update(.1);expect(f.rotations.length).toBe(n);f.dom.window.close()
})
it('hover clicks and Escape pause look; leaving the canvas stops continuous edge turning',()=>{
 const f=fixture();f.w.mouseTurnMode='move';f.pointer('pointermove',990);f.w.campusMouse.update(.1);expect(f.rotations.length).toBe(1)
 f.pointer('pointerdown',990);expect(f.w.campusMouse.paused).toBe(true);f.w.campusMouse.update(.1);expect(f.rotations.length).toBe(1)
 f.pointer('pointerdown',990);f.pointer('pointermove',980);f.pointer('pointerleave');f.w.campusMouse.update(.1);expect(f.rotations.length).toBe(1)
 f.w.document.dispatchEvent(new f.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));expect(f.w.campusMouse.paused).toBe(true);f.dom.window.close()
})
it('preserves bird wheel handling, ignores first-person zoom and blocks overlays',()=>{
 const f=fixture();const wheel=()=>f.canvas.dispatchEvent(new f.w.WheelEvent('wheel',{deltaY:100,cancelable:true}));f.w.currentMode='bird';expect(wheel()).toBe(true);expect(f.w.campusMouse.distance).toBe(6.5)
 f.w.currentMode='avatar';wheel();expect(f.w.campusMouse.distance).toBeGreaterThan(6.5);const distance=f.w.campusMouse.distance;f.w.currentMode='firstperson';wheel();expect(f.w.campusMouse.distance).toBe(distance)
 f.w.currentMode='avatar';f.w.motionBlocked=()=>true;f.pointer('pointerdown');f.pointer('pointermove',550);wheel();f.w.campusMouse.update(.1);expect(f.rotations).toEqual([]);expect(f.w.campusMouse.distance).toBe(distance);f.dom.window.close()
})
it('restores validated preferences and gracefully falls back when pointer lock is unavailable',()=>{
 const f=fixture({mode:'lock',sens:9,speed:1.5,invert:true});expect(f.w.selectMouseTurn.value).toBe('lock');expect(f.w.sliderTurn.value).toBe('300');expect(f.w.sliderSpeed.value).toBe('150');expect(f.w.checkInvertY.checked).toBe(true)
 f.pointer('pointerdown');expect(f.w.document.getElementById('mouse-look-hint').textContent).toContain('鎖定不可用');f.pointer('pointermove',510);f.w.campusMouse.update(.1);expect(f.rotations.length).toBe(1)
 f.w.dispatchEvent(new f.w.Event('blur'));const n=f.rotations.length;f.w.campusMouse.update(.1);expect(f.rotations.length).toBe(n);f.dom.window.close()
})
it('normalizes wheel units and bounds third-person zoom',()=>{
 expect(M?.zoom).toBeTypeOf('function');expect(M.zoom(6.5,10000,0)).toBe(9);expect(M.zoom(6.5,-10000,0)).toBe(1.8)
 expect(M.zoom(6.5,1,1)).toBeCloseTo(M.zoom(6.5,16,0))
})
it('ignores pointer-lock startup jumps and releases lock on Escape',()=>{
 const f=fixture();let locked:any=null,now=0;f.w.performance.now=()=>now
 Object.defineProperty(f.w.document,'pointerLockElement',{get:()=>locked})
 f.canvas.requestPointerLock=()=>{locked=f.canvas;f.w.document.dispatchEvent(new f.w.Event('pointerlockchange'));return Promise.resolve()}
 f.w.document.exitPointerLock=()=>{locked=null;f.w.document.dispatchEvent(new f.w.Event('pointerlockchange'))}
 f.w.selectMouseTurn.value='lock';f.w.selectMouseTurn.dispatchEvent(new f.w.Event('change'));f.pointer('pointerdown')
 const move=(dx:number)=>{const e=new f.w.Event('pointermove');Object.assign(e,{pointerType:'mouse',movementX:dx,movementY:0});f.canvas.dispatchEvent(e);f.w.campusMouse.update(.016)}
 move(100);expect(f.rotations.length).toBe(0);now=150;move(4000);expect(f.rotations.length).toBe(0);move(12);expect(f.rotations.length).toBe(1)
 f.w.document.dispatchEvent(new f.w.KeyboardEvent('keydown',{key:'Escape'}));expect(locked).toBe(null);const n=f.rotations.length;f.w.campusMouse.update(.1);expect(f.rotations.length).toBe(n);f.dom.window.close()
})
it('smooths with frame-time independent exponential damping',()=>{
 expect(M?.damp).toBeTypeOf('function');expect(1-M.damp(.02)).toBeCloseTo((1-M.damp(.01))**2)
})
it('retracts the camera before entering elevated stair ground',()=>{
 const eye={x:-62,y:1.55,z:4.3},desired={x:-62,y:.35,z:7.1379}
 const ground=(p:any)=>p.z<5?0:(p.z-5)*.48
 const t=M.cameraClear(eye,desired,ground,()=>false)
 expect(t).toBeLessThan(1)
 const p={x:eye.x,y:eye.y+(desired.y-eye.y)*t,z:eye.z+(desired.z-eye.z)*t}
 expect(p.y).toBeGreaterThan(ground(p)+.18)
 expect(M.cameraClear(eye,{x:-62,y:3,z:7},()=>0,()=>false)).toBe(1)
})
it('adds follow distance without changing first-person eye or position',()=>{
 vm.runInContext(readFileSync('public/campus-explorer/walk-world-math.js','utf8'),ctx)
 const p={x:10,y:3.6,z:20},math=vm.runInContext('CampusWalkMath',ctx)
 expect(math.cameraPose(p,0,0,false,3).position.z).toBe(17)
 expect(math.cameraPose(p,0,0,true,9).position.z).toBe(20)
 expect(math.cameraPose(p,0,1.25,false,9).position.y).toBeGreaterThan(p.y)
})
