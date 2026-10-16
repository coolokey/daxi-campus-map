import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

function model(){
 const context:any={window:{}};
 runInNewContext(readFileSync(new URL('../public/campus-explorer/anniversary-model.js',import.meta.url),'utf8'),context);
 return context.window.CampusAnniversary;
}
it('橫向文字避開右側面板，平板文字保持在面板上方',()=>{
 const m=model(),lines=[{width:390,height:112},{width:600,height:72}];
 const wide=m.textLayout(1024,500,lines,{left:708,top:100,right:1006,bottom:488});
 expect(wide.right).toBeLessThan(708);expect(wide.bottom).toBeLessThan(500);
 const ipad=m.textLayout(1024,768,lines,{left:695,top:260,right:1006,bottom:588});
 expect(ipad.bottom).toBeLessThan(260);expect(ipad.left).toBeGreaterThan(0);
});
describe('校慶煙火體驗',()=>{
 it('原地轉頭 180 度後，聲音左右方位反轉，距離保持不變',()=>{
  const m=model(),position={x:100,y:0,z:-100},listener={x:0,y:0,z:0};
  const front=m.spatialAudio(position,{position:listener,quaternion:{x:0,y:0,z:0,w:1}});
  const back=m.spatialAudio(position,{position:listener,quaternion:{x:0,y:1,z:0,w:0}});
  expect(front.pan).toBeGreaterThan(0);expect(back.pan).toBeCloseTo(-front.pan);
  expect(back.distance).toBe(front.distance);
 });
 it('低幀率仍按實際時間推進節目，只限制粒子模擬步長',()=>{
  const step=model().frameStep(1800,1000);
  expect(step.elapsedMs).toBe(800);
  expect(step.simulationSeconds).toBe(.06);
  expect(model().frameStep(9000,0).elapsedMs).toBe(0);
 });
 it('30 秒內完成倒數、入夜、零星、密集、80、祝福與漸弱',()=>{
  const m=model();
  expect([0,2999,3000,9999,10000,18000,23000,27000,30000].map(m.phaseAt)).toEqual(['countdown','countdown','sparse','sparse','dense','formation','blessing','fade','finished']);
 });
 it.each(['round','heart','star'])('%s 煙火提供有限且有空間分布的點位',shape=>{
  const points=model().shapePoints(shape,80);
  expect(points).toHaveLength(80);
  expect(points.every((p:any)=>Number.isFinite(p.x)&&Number.isFinite(p.y))).toBe(true);
  expect(Math.max(...points.map((p:any)=>p.x))-Math.min(...points.map((p:any)=>p.x))).toBeGreaterThan(1);
  expect(Math.max(...points.map((p:any)=>p.y))-Math.min(...points.map((p:any)=>p.y))).toBeGreaterThan(1);
 });
 it('五種煙火的 3D 速度、壽命與品質配額有效',()=>{
  const m=model();
  for(const kind of ['chrysanthemum','sphere','willow','fan','comet','ring']){
   const stars=m.burstVectors(kind,120,()=>.4);
   expect(stars).toHaveLength(120);
   expect(stars.every((s:any)=>Number.isFinite(s.x+s.y+s.z)&&s.life>1)).toBe(true);
  }
  expect(m.qualityFor({width:390,cores:4,memory:4,reduced:false}).maxParticles).toBeLessThan(m.qualityFor({width:1440,cores:8,memory:8,reduced:false}).maxParticles);
  expect(m.qualityFor({width:1440,cores:8,memory:8,reduced:true}).maxParticles).toBeLessThan(1500);
 });
 it('80 是實際文字點位，編排包含五種煙火且最後不再發射',()=>{
  const m=model(),points=m.eightyTargets();
  expect(points.length).toBeGreaterThan(150);
  expect(points.some((p:any)=>p.x<0)).toBe(true);
  expect(points.some((p:any)=>p.x>0)).toBe(true);
  const cues=m.createCues(()=>.5);
  expect(new Set(cues.map((c:any)=>c.kind)).size).toBe(6);
  expect(cues.every((c:any)=>c.at>=3000&&c.at<27000)).toBe(true);
 });
});

it('環狀煙火維持圓環平面，文字兩波在 18 秒與 20 秒發射',()=>{
 const m=model(),ring=m.burstVectors('ring',120,()=>.5);
 expect(Math.max(...ring.map((p:any)=>Math.abs(p.z)))).toBeLessThan(2);
 expect(Math.min(...ring.map((p:any)=>Math.hypot(p.x,p.y)))).toBeGreaterThan(15);
 const cues=m.createCues(()=>.5);
 expect(cues.filter((c:any)=>c.textLine===0)).toHaveLength(4);
 expect(cues.filter((c:any)=>c.textLine===1)).toHaveLength(5);
 expect(cues.find((c:any)=>c.textLine===0).at).toBe(18000);
 expect(cues.find((c:any)=>c.textLine===1).at).toBe(20000);
 expect(m.qualityFor({preset:'battery'}).maxParticles).toBeLessThan(m.qualityFor({preset:'standard'}).maxParticles);
});
it('layers a synchronized attack, body and shape-specific crackle rather than a muffled distant sample only',()=>{
 const m=model();expect(m.burstSoundLayers).toBeTypeOf('function');
 for(const kind of ['sphere','willow','comet']){const layers=m.burstSoundLayers(kind,1);expect(layers[0]).toMatchObject({kind:'near',delay:0});expect(layers.some((l:any)=>l.kind==='far')).toBe(true);expect(layers.every((l:any)=>l.gain>0&&l.gain<=1&&l.delay<1)).toBe(true);}
 expect(m.burstSoundLayers('willow',1).find((l:any)=>l.kind==='crackle').delay).toBeGreaterThan(m.burstSoundLayers('sphere',1).find((l:any)=>l.kind==='crackle').delay);
 const comet=m.burstVectors('comet',80,()=>.5);expect(comet.every((p:any)=>p.y>0)).toBe(true);
});
