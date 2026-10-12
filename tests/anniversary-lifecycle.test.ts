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
 Object.assign(w,{THREE,currentMode:'bird',cancelCameraTween(){},matchMedia:()=>({matches:true,addEventListener(){}}),requestAnimationFrame:()=>1,cancelAnimationFrame(){},CampusFireworkAudio:{create:()=>({load:async()=>({loaded:18,failed:[]}),play(){},stop(){},setVolume(){},stats:()=>({active:0,loaded:18})})},CampusFireworkScene:{create:()=>({launch(){},update(){},setQuality(){},dispose(){},stats:()=>({active:0})})},campusExplorer:{scene,camera:new THREE.PerspectiveCamera(),controls:{target:new THREE.Vector3(),enabled:true,enableDamping:true,autoRotate:false,update(){}},manualTakeover(){},resetManualInput(){},setControlMode(){}}});
 for(const file of ['anniversary-model.js','anniversary-fireworks.js'])w.eval(readFileSync('public/campus-explorer/'+file,'utf8'));
 const click=(id:string)=>w.document.getElementById('anniversary-'+id).click(),flush=async()=>{for(const resolve of pending.splice(0))resolve();for(let i=0;i<8;i++)await Promise.resolve();};
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
it('does not create a modal dialog or an effect canvas that blocks the campus',()=>{
 const s=setup();s.click('launch');
 expect(s.w.document.querySelectorAll('dialog[open],canvas').length).toBe(0);
 expect(s.w.campusExplorer.motionBlocked?.()||false).toBe(false);
 s.click('close');expect(s.w.campusAnniversary.stats().running).toBe(false);s.dom.window.close();
});
it('optional task gate opens only for the configured explicit completion event',()=>{
 const s=setup();s.w.campusAnniversary.configure({requireQuest:true,questId:'energy-core'});
 expect(s.w.campusAnniversary.start()).toBe(false);
 s.w.dispatchEvent(new s.w.CustomEvent('campus:quest-complete',{detail:{questId:'other'}}));
 expect(s.w.campusAnniversary.start()).toBe(false);
 s.w.dispatchEvent(new s.w.CustomEvent('campus:quest-complete',{detail:{questId:'energy-core'}}));
 expect(s.w.campusAnniversary.start()).toBe(true);
 s.w.campusAnniversary.stop();s.dom.window.close();
});

it('品質與低動畫可獨立調整，銷毀後移除介面及監聽',()=>{
 const s=setup(),select=s.w.document.getElementById('anniversary-preset');
 expect(select).not.toBeNull();select.value='battery';select.dispatchEvent(new s.w.Event('change'));
 s.click('launch');expect(s.w.campusAnniversary.stats().quality).toBe('low');
 s.w.campusAnniversary.dispose();expect(s.w.document.getElementById('anniversary-launch')).toBeNull();
 s.w.dispatchEvent(new s.w.CustomEvent('campus:quest-complete',{detail:{questId:'energy-core'}}));
 expect(s.w.campusAnniversary.stats().unlocked).toBe(false);s.dom.window.close();
});
