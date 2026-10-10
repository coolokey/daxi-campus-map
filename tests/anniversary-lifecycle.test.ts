import {it,expect} from 'vitest';
import {JSDOM} from 'jsdom';
import {readFileSync} from 'node:fs';
import * as THREE from 'three';
function setup(){
 const dom=new JSDOM('<body></body>',{url:'https://campus.test',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window as any;
 const pending:Array<()=>void>=[],instances:any[]=[];
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
 w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
 w.HTMLCanvasElement.prototype.getContext=()=>new Proxy({getImageData:()=>({data:[]})},{get:(o,k)=>k in o?o[k]:()=>{}});
 const node=()=>({gain:{value:0,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},frequency:{value:0,setValueAtTime(){}},connect(){},disconnect(){},start(){},stop(){}});
 w.AudioContext=class{state='suspended';currentTime=0;destination={};constructor(){instances.push(this)}createGain=node;createOscillator=node;resume(){return new Promise<void>(resolve=>pending.push(()=>{this.state='running';resolve()}));}suspend(){this.state='suspended';return Promise.resolve()}};
 const scene=new THREE.Scene();scene.background=new THREE.Color(0xffffff);
 Object.assign(w,{THREE,currentMode:'bird',cancelCameraTween(){},matchMedia:()=>({matches:true,addEventListener(){}}),requestAnimationFrame:()=>1,cancelAnimationFrame(){},CampusFireworkAudio:{create:()=>({play(){},stop(){}})},campusExplorer:{scene,camera:new THREE.PerspectiveCamera(),controls:{target:new THREE.Vector3(),enabled:true,enableDamping:true,autoRotate:false,update(){}},manualTakeover(){},resetManualInput(){},setControlMode(){}}});
 for(const file of ['anniversary-model.js','anniversary-fireworks.js'])w.eval(readFileSync('public/campus-explorer/'+file,'utf8'));
 const click=(id:string)=>w.document.getElementById('anniversary-'+id).click(),flush=async()=>{for(const resolve of pending.splice(0))resolve();await Promise.resolve();await Promise.resolve();};
 return {dom,w,click,flush,instances};
}
it('closing and reopening cannot let an old audio resume enable sound without consent',async()=>{
 const s=setup();s.click('launch');s.click('sound');s.click('close');s.click('launch');await s.flush();
 expect(s.w.document.getElementById('anniversary-sound').getAttribute('aria-pressed')).toBe('false');
 expect(s.instances[0].state).toBe('suspended');s.dom.window.close();
});
it('a second click cancels a pending audio enable',async()=>{
 const s=setup();s.click('launch');s.click('sound');s.click('sound');await s.flush();
 expect(s.w.document.getElementById('anniversary-sound').getAttribute('aria-pressed')).toBe('false');
 expect(s.instances[0].state).toBe('suspended');s.dom.window.close();
});
