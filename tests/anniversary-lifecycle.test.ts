import {it,expect} from 'vitest';
import {JSDOM} from 'jsdom';
import {readFileSync} from 'node:fs';
import * as THREE from 'three';
it('手機直向與橫向開始時收合設定，重播仍預設有聲，結束後可再次觀看',async()=>{
 for(const [width,height] of [[390,844],[844,390]]){
  const s=setup();Object.defineProperty(s.w,'innerWidth',{value:width,configurable:true});Object.defineProperty(s.w,'innerHeight',{value:height,configurable:true});
  s.click('launch');await s.flush();const settings=s.w.document.getElementById('anniversary-settings'),toggle=s.w.document.getElementById('anniversary-settings-toggle');
  expect(settings?.hidden).toBe(true);expect(toggle?.getAttribute('aria-expanded')).toBe('false');
  expect(s.w.campusAnniversary.stats().soundEnabled).toBe(true);
  s.click('settings-toggle');expect(settings.hidden).toBe(false);expect(toggle.getAttribute('aria-expanded')).toBe('true');
  s.click('replay');await s.flush();expect(settings.hidden).toBe(true);expect(s.w.document.getElementById('anniversary-volume').value).toBe('100');
  s.w.campusAnniversary.stop(true);expect(settings.hidden).toBe(false);
  s.click('replay');expect(settings.hidden).toBe(true);s.click('close');s.dom.window.close();
 }
});
function setup(options:{slowLoad?:boolean,emptyLoad?:boolean}={}){
 const dom=new JSDOM('<body></body>',{url:'https://campus.test',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window as any;
 const pending:Array<()=>void>=[],instances:any[]=[];let finishLoad:()=>void=()=>{},expire:()=>void=()=>{},engineVolume=1;
 w.setTimeout=(callback:()=>void)=>{expire=callback;return 1;};w.clearTimeout=()=>{};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
 w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
 w.HTMLCanvasElement.prototype.getContext=()=>new Proxy({getImageData:()=>({data:[]})},{get:(o,k)=>k in o?o[k]:()=>{}});
 const node=()=>({gain:{value:0,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},frequency:{value:0,setValueAtTime(){}},connect(){},disconnect(){},start(){},stop(){}});
 w.AudioContext=class{state='suspended';currentTime=0;destination={};constructor(){instances.push(this)}createGain=node;createOscillator=node;resume(){return new Promise<void>(resolve=>pending.push(()=>{this.state='running';resolve()}));}suspend(){this.state='suspended';return Promise.resolve()}};
 const scene=new THREE.Scene();scene.background=new THREE.Color(0xffffff);
 Object.assign(w,{THREE,currentMode:'bird',cancelCameraTween(){},matchMedia:()=>({matches:true,addEventListener(){}}),requestAnimationFrame:()=>1,cancelAnimationFrame(){},CampusFireworkAudio:{create:()=>({load:async()=>({loaded:options.emptyLoad?0:18,failed:options.emptyLoad?['manifest: offline']:[]}),play(){},stop(){},dispose(){},setVolume(value:number){engineVolume=value},stats:()=>({active:0,loaded:18,volume:engineVolume})})},CampusFireworkScene:{create:()=>({launch(){},update(){},setQuality(){},dispose(){},stats:()=>({active:0})})},campusExplorer:{scene,camera:new THREE.PerspectiveCamera(),controls:{target:new THREE.Vector3(),enabled:true,enableDamping:true,autoRotate:false,update(){}},manualTakeover(){},resetManualInput(){},setControlMode(){}}});
 for(const file of ['anniversary-model.js','anniversary-fireworks.js'])w.eval(readFileSync('public/campus-explorer/'+file,'utf8'));
 if(options.slowLoad)w.CampusFireworkAudio.create=()=>({load:()=>new Promise(resolve=>{finishLoad=()=>resolve({loaded:18,failed:[]})}),play(){},stop(){},dispose(){},setVolume(){},stats:()=>({active:0,loaded:0})});
 const click=(id:string)=>w.document.getElementById('anniversary-'+id).click(),flush=async()=>{for(const resolve of pending.splice(0))resolve();for(let i=0;i<8;i++)await Promise.resolve();};
 return {dom,w,click,flush,instances,finishLoad:()=>finishLoad(),expire:()=>expire()};
}
it('桌面轉手機會收合設定，旋轉手機保留選擇，收合後焦點可繼續操作',()=>{
 const s=setup();s.w.matchMedia=()=>({matches:false});
 const resize=(width:number,height:number)=>{Object.defineProperty(s.w,'innerWidth',{value:width,configurable:true});Object.defineProperty(s.w,'innerHeight',{value:height,configurable:true});s.w.dispatchEvent(new s.w.Event('resize'));};
 resize(1440,900);s.click('launch');const settings=s.w.document.getElementById('anniversary-settings');expect(settings.hidden).toBe(false);
 expect(s.w.document.getElementById('anniversary-sound').parentElement.className).toBe('anniversary-controls');
 resize(390,844);expect(settings.hidden).toBe(true);s.click('settings-toggle');resize(844,390);expect(settings.hidden).toBe(false);
 s.w.document.getElementById('anniversary-view').focus();s.click('settings-toggle');expect(s.w.document.activeElement.id).toBe('anniversary-settings-toggle');
 resize(1440,900);expect(settings.hidden).toBe(false);expect(s.w.document.getElementById('anniversary-sound').parentElement.className).toBe('anniversary-controls');s.click('close');s.dom.window.close();
});
it('慢速載入音效時不先播放煙火，準備好後才從完整倒數開始',async()=>{
 const s=setup({slowLoad:true});s.click('launch');await s.flush();
 s.w.campusAnniversary.update(1000);s.w.campusAnniversary.update(9000);
 expect(s.w.campusAnniversary.stats().elapsed).toBe(0);
 expect(s.w.campusAnniversary.stats().phase).toBe('loading');
 s.finishLoad();await s.flush();s.w.campusAnniversary.update(10000);s.w.campusAnniversary.update(11000);
 expect(s.w.campusAnniversary.stats().elapsed).toBe(1000);expect(s.w.campusAnniversary.stats().soundEnabled).toBe(true);
 s.click('close');s.dom.window.close();
});
it('音效載入中停止或靜音，不留下等待狀態或延遲重啟聲音',async()=>{
 const s=setup({slowLoad:true});s.click('launch');s.click('sound');await s.flush();
 s.w.campusAnniversary.update(1000);s.w.campusAnniversary.update(2000);expect(s.w.campusAnniversary.stats().elapsed).toBe(1000);
 s.click('close');s.finishLoad();await s.flush();expect(s.w.campusAnniversary.stats().running).toBe(false);expect(s.w.campusAnniversary.stats().soundEnabled).toBe(false);s.dom.window.close();
});
it('音效下載逾時仍可看煙火，遲到的下載不會中途突然開始播放',async()=>{
 const s=setup({slowLoad:true});s.click('launch');await s.flush();s.expire();await s.flush();
 expect(s.w.campusAnniversary.stats().soundEnabled).toBe(false);
 s.w.campusAnniversary.update(1000);s.w.campusAnniversary.update(2000);expect(s.w.campusAnniversary.stats().elapsed).toBe(1000);
 s.finishLoad();await s.flush();expect(s.w.campusAnniversary.stats().soundEnabled).toBe(false);
 expect(s.w.document.getElementById('anniversary-audio-status').textContent).toContain('逾時');s.click('close');s.dom.window.close();
});
it('點選開始即啟用音效，預設音量 100%，停止後仍可再啟用',async()=>{
 const s=setup();expect(s.instances).toHaveLength(0);s.click('launch');await s.flush();
 expect(s.w.campusAnniversary.stats().soundEnabled).toBe(true);
 expect(s.w.document.getElementById('anniversary-volume').value).toBe('100');
 expect(s.w.document.getElementById('anniversary-volume-value').textContent).toBe('100%');
 expect(s.w.document.getElementById('anniversary-sound').textContent).toBe('音效：開啟');
 expect(s.w.document.getElementById('anniversary-sound').getAttribute('aria-label')).toBe('關閉音效');
 s.click('close');s.click('launch');await s.flush();expect(s.w.campusAnniversary.stats().soundEnabled).toBe(true);s.dom.window.close();
});
it('靜音會取消尚未完成的啟用，重新開啟恢復有聲與百分之百音量',async()=>{
 const s=setup();s.click('launch');s.click('sound');await s.flush();
 expect(s.w.campusAnniversary.stats().soundEnabled).toBe(false);expect(s.instances[0].state).toBe('suspended');
 const volume=s.w.document.getElementById('anniversary-volume');volume.value='25';volume.dispatchEvent(new s.w.Event('input'));
 s.click('close');s.click('launch');await s.flush();expect(s.w.campusAnniversary.stats().soundEnabled).toBe(true);
 expect(volume.value).toBe('100');expect(s.w.document.getElementById('anniversary-volume-value').textContent).toBe('100%');s.dom.window.close();
});
it('前次載入逾時後，再次開啟會重新嘗試有聲播放',async()=>{
 const s=setup({slowLoad:true});s.click('launch');await s.flush();s.expire();await s.flush();
 expect(s.w.campusAnniversary.stats().soundEnabled).toBe(false);s.finishLoad();await s.flush();
 s.click('close');s.click('launch');s.finishLoad();await s.flush();
 expect(s.w.campusAnniversary.stats().soundWanted).toBe(true);expect(s.w.campusAnniversary.stats().soundEnabled).toBe(true);s.click('close');s.dom.window.close();
});
it('同場可以靜音或調低音量，按再次觀看則恢復有聲與實際音量一',async()=>{
 const s=setup();s.click('launch');await s.flush();const volume=s.w.document.getElementById('anniversary-volume');volume.value='0';volume.dispatchEvent(new s.w.Event('input'));
 expect(s.w.campusAnniversary.stats().audio.volume).toBe(0);s.click('sound');expect(s.w.campusAnniversary.stats().soundWanted).toBe(false);
 expect(s.w.document.getElementById('anniversary-sound').textContent).toBe('音效：關閉');
 s.click('replay');await s.flush();expect(s.w.campusAnniversary.stats().soundEnabled).toBe(true);expect(s.w.campusAnniversary.stats().audio.volume).toBe(1);expect(volume.value).toBe('100');
 s.click('close');s.dom.window.close();
});
it('停止後，尚未完成的音效載入不會重啟聲音',async()=>{
 const s=setup();s.click('launch');s.click('close');await s.flush();
 expect(s.w.campusAnniversary.stats().soundEnabled).toBe(false);expect(s.instances[0].state).toBe('suspended');s.dom.window.close();
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

it('沒有錄音可用時顯示失敗與重試提示，不假裝音效已開啟',async()=>{
 const s=setup({emptyLoad:true});s.click('launch');await s.flush();expect(s.w.campusAnniversary.stats().soundEnabled).toBe(false);
 expect(s.w.document.getElementById('anniversary-audio-status').textContent).toContain('音效無法啟用');expect(s.w.document.getElementById('anniversary-sound').getAttribute('aria-label')).toBe('開啟音效');
 s.click('close');s.dom.window.close();
});
it('右側啟動與再次觀看皆自動套用觀賞鏡頭，停止後還原原視角',async()=>{
 for(const width of [390,1440]){
  const s=setup(),w=s.w;Object.defineProperty(w,'innerWidth',{value:width,configurable:true});w.currentMode='avatar';w.campusExplorer.setControlMode=(mode:string)=>w.currentMode=mode;
  w.campusExplorer.camera.position.set(8,5,22);const originalFov=w.campusExplorer.camera.fov;w.campusExplorer.controls.maxDistance=420;w.campusExplorer.controls.target.set(7,5,18);
  s.click('launch');await s.flush();expect(w.currentMode).toBe('bird');expect(w.campusExplorer.camera.position.z).toBe(width<600?600:245);expect(w.campusExplorer.controls.target.y).toBeGreaterThan(60);expect(w.campusExplorer.controls.maxDistance).toBeGreaterThanOrEqual(w.campusExplorer.camera.position.distanceTo(w.campusExplorer.controls.target));
  s.click('replay');await s.flush();expect(w.currentMode).toBe('bird');s.click('close');expect(w.currentMode).toBe('avatar');expect(w.campusExplorer.camera.fov).toBe(originalFov);expect(w.campusExplorer.controls.maxDistance).toBe(420);expect(w.campusExplorer.camera.position.toArray()).toEqual([8,5,22]);expect(w.campusExplorer.controls.target.toArray()).toEqual([7,5,18]);s.dom.window.close();
 }
});
