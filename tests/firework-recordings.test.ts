import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
function setup(fail=false){
 const log:any[]=[],param=()=>({value:0,setTargetAtTime(v:number){this.value=v},setValueAtTime(v:number){this.value=v}});
 const node=()=>({gain:param(),pan:param(),frequency:param(),threshold:param(),knee:param(),ratio:param(),attack:param(),release:param(),connect(){},disconnect(){},buffer:null,playbackRate:{value:1},start(...args:any[]){log.push(args)},stop(){}});
 const context:any={currentTime:10,sampleRate:12000,createGain:node,createStereoPanner:node,createBiquadFilter:node,createDynamicsCompressor:node,createWaveShaper:node,createConvolver:node,createBufferSource:node,createBuffer:(_:number,n:number)=>({getChannelData:()=>new Float32Array(n)}),decodeAudioData:async()=>({duration:2})};
 const manifest={layers:Object.fromEntries(['launch','near','far','crackle','tail','crowd'].map(k=>[k,[{file:k+'-1.mp3'},{file:k+'-2.mp3'},{file:k+'-3.mp3'}]]))};
 const fetcher=async()=>({ok:!fail,status:fail?404:200,json:async()=>manifest,arrayBuffer:async()=>new ArrayBuffer(8)});
 const w:any={};runInNewContext(readFileSync('public/campus-explorer/anniversary-model.js','utf8'),{window:w});
 runInNewContext(readFileSync('public/campus-explorer/firework-audio.js','utf8'),{window:w,URL,AbortController,fetch:fetcher,Float32Array,console});
 return{engine:w.CampusFireworkAudio.create(context,node(),{manifestURL:'https://school.test/sub/campus/assets/sounds/manifest.json',fetch:fetcher}),log};
}
describe('真實煙火錄音',()=>{
 it('真的載入 18 個樣本後才播放，隨機樣本不連續重複，停止清掉聲源',async()=>{
  const {engine,log}=setup();expect(engine.play('near')).toBeNull();
  const loaded=await engine.load();expect(loaded.loaded).toBe(18);expect(loaded.failed).toEqual([]);
  engine.play('near');engine.play('near');
  expect(log.length).toBe(2);expect(engine.stats().played[0].file).not.toBe(engine.stats().played[1].file);
  engine.stop();expect(engine.stats().active).toBe(0);
 });
 it('404 不會假裝載入成功或播放合成替代聲',async()=>{
  const {engine,log}=setup(true);const result=await engine.load();
  expect(result.loaded).toBe(0);expect(result.failed.length).toBeGreaterThan(0);expect(engine.play('near')).toBeNull();expect(log).toEqual([]);
 });
 it('遠方爆裂有聲速延遲、聲源上限及停止清理',async()=>{
  const {engine,log}=setup();await engine.load();
  engine.play('far',{position:{x:343,y:0,z:0},camera:{x:0,y:0,z:0}});
  expect(log[0][0]).toBeGreaterThan(10.5);
  for(let i=0;i<40;i++)engine.play('near');
  expect(engine.stats().active).toBeLessThanOrEqual(18);
  engine.dispose();expect(engine.stats().active).toBe(0);
 });
});
