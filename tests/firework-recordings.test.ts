import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
function setup(fail:boolean|string=false){
 const log:any[]=[],envelopes:any[]=[],param=()=>({value:0,setTargetAtTime(v:number){this.value=v},setValueAtTime(v:number){this.value=v},linearRampToValueAtTime(v:number,t:number){envelopes.push({v,t})}});
 const node=()=>({gain:param(),pan:param(),frequency:param(),threshold:param(),knee:param(),ratio:param(),attack:param(),release:param(),connect(){},disconnect(){},buffer:null,playbackRate:{value:1},start(...args:any[]){log.push(args)},stop(){}});
 const context:any={currentTime:10,sampleRate:12000,createGain:node,createStereoPanner:node,createBiquadFilter:node,createDynamicsCompressor:node,createWaveShaper:node,createConvolver:node,createBufferSource:node,createBuffer:(_:number,n:number)=>({getChannelData:()=>new Float32Array(n)}),decodeAudioData:async()=>({duration:2})};
 const manifest={layers:Object.fromEntries(['launch','near','far','crackle','tail','crowd'].map(k=>[k,[1,2,3].map(i=>({file:k+'-'+i+'.mp3',sha256:'a'.repeat(64)}))]))};
 const requested:any[]=[];let failure=fail;
 const fetcher=async(...args:any[])=>{requested.push(args);const bad=typeof failure==='string'?String(args[0]).includes(failure):failure;return {ok:!bad,status:bad?404:200,json:async()=>manifest,arrayBuffer:async()=>new ArrayBuffer(8)}};
 const w:any={};runInNewContext(readFileSync('public/campus-explorer/anniversary-model.js','utf8'),{window:w});
 runInNewContext(readFileSync('public/campus-explorer/firework-audio.js','utf8'),{window:w,URL,AbortController,fetch:fetcher,Float32Array,console});
 return{engine:w.CampusFireworkAudio.create(context,node(),{manifestURL:'https://school.test/sub/campus/assets/sounds/manifest.json',fetch:fetcher}),log,requested,envelopes,setFailure:(value:boolean|string)=>{failure=value}};
}
describe('真實煙火錄音',()=>{
 it('截短的小煙火在樣本停止前淡出，避免直接切斷波形',async()=>{
  const {engine,envelopes}=setup();await engine.load();engine.play('near',{size:.45});
  const played=engine.stats().played[0];expect(envelopes).toHaveLength(1);
  expect(envelopes[0].v).toBe(0);expect(envelopes[0].t).toBeCloseTo(played.scheduledAt+played.duration/played.rate);
 });
 it('小型爆炸使用真實錄音並縮短尾段、提高音高及降低音量',async()=>{
  const {engine}=setup();await engine.load();
  engine.play('near',{size:1});engine.play('near',{size:.45});
  const [large,small]=engine.stats().played;
  expect(small.gain).toBeLessThan(large.gain);
  expect(small.rate).toBeGreaterThan(large.rate);
  expect(small.duration).toBeLessThan(large.duration);
 });
 it('重新驗證 manifest，並以音檔雜湊版本避免沿用舊掌聲快取',async()=>{
  const {engine,requested}=setup();await engine.load();
  expect(requested[0][1].cache).toBe('no-cache');
  expect(requested.slice(1)).toHaveLength(18);
  expect(requested.slice(1).every(([url])=>url.startsWith('https://school.test/sub/campus/assets/sounds/')&&new URL(url).searchParams.get('v')==='aaaaaaaaaaaaaaaa')).toBe(true);
 });
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
 it('遠方爆裂與畫面同步，不再額外延後聲音，聲源上限及停止清理',async()=>{
  const {engine,log}=setup();await engine.load();
  engine.play('far',{position:{x:343,y:0,z:0},camera:{x:0,y:0,z:0}});
  expect(log[0][0]).toBe(10);
  for(let i=0;i<40;i++)engine.play('near');
  expect(engine.stats().active).toBeLessThanOrEqual(18);
  engine.dispose();expect(engine.stats().active).toBe(0);
 });
});

it('斷網恢復後重新載入，成功結果沿用快取',async()=>{
 const s=setup(true);expect((await s.engine.load()).loaded).toBe(0);s.setFailure(false);
 const result=await s.engine.load();expect(result.loaded).toBe(18);expect(result.failed).toEqual([]);expect(s.requested).toHaveLength(20);
 await s.engine.load();expect(s.requested).toHaveLength(20);
});
it('部分下載失敗只重試缺失樣本，不重複加入成功錄音',async()=>{
 const s=setup('near-1.mp3');expect((await s.engine.load()).loaded).toBe(17);s.setFailure(false);
 const result=await s.engine.load();expect(result.loaded).toBe(18);expect(result.failed).toEqual([]);expect(s.requested).toHaveLength(21);expect(s.engine.stats().loaded).toBe(18);
});
it('keeps the mobile viewing camera audible above the ambience without losing stereo direction',async()=>{
 const s=setup();await s.engine.load();const position={x:60,y:125,z:-155};
 s.engine.play('far',{position,camera:{x:-125,y:59,z:245}});s.engine.play('far',{position,camera:{x:0,y:69,z:800}});s.engine.play('crowd');
 const [desktop,mobile,crowd]=s.engine.stats().played;
 expect(mobile.gain).toBeGreaterThan(.25);expect(mobile.gain).toBeGreaterThan(crowd.gain*3);expect(mobile.gain/desktop.gain).toBeGreaterThan(.6);expect(mobile.pan).toBeGreaterThan(0);
});
it('prioritizes an explosion over tails when the bounded voice pool is full and clears retired sources on stop',async()=>{
 const s=setup();await s.engine.load();for(let i=0;i<18;i++)s.engine.play('tail');
 expect(s.engine.play('near')).not.toBeNull();expect(s.engine.stats().played.at(-1).kind).toBe('near');expect(s.engine.stats().active).toBeLessThanOrEqual(18);
 s.engine.stop();expect(s.engine.stats().active).toBe(0);expect(s.engine.stats().retiring).toBe(0);
});
it('never loses a fresh main attack even when the pool is entirely occupied by explosions',async()=>{
 const s=setup();await s.engine.load();for(let i=0;i<18;i++)s.engine.play('far');expect(s.engine.play('near')).not.toBeNull();
 s.engine.stop();for(let i=0;i<18;i++)s.engine.play('near');expect(s.engine.play('near')).not.toBeNull();s.engine.dispose();
});
