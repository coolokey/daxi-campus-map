import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

function model(){
 const context:any={window:{}};
 runInNewContext(readFileSync(new URL('../public/campus-explorer/anniversary-model.js',import.meta.url),'utf8'),context);
 return context.window.CampusAnniversary;
}
describe('校慶煙火體驗',()=>{
 it('低幀率仍按實際時間推進節目，只限制粒子模擬步長',()=>{
  const step=model().frameStep(1800,1000);
  expect(step.elapsedMs).toBe(800);
  expect(step.simulationSeconds).toBe(.06);
  expect(model().frameStep(9000,0).elapsedMs).toBe(0);
 });
 it('入夜後放煙火，終場點亮 80，再開放自由發射，重播從入夜開始',()=>{
  const m=model();
  expect([0,1799,1800,13999,14000,19999,20000].map(m.phaseAt)).toEqual(['night','night','show','show','finale','finale','free']);
  expect(m.phaseAt(0)).toBe('night');
 });
 it.each(['round','heart','star'])('%s 煙火提供有限且有空間分布的點位',shape=>{
  const points=model().shapePoints(shape,80);
  expect(points).toHaveLength(80);
  expect(points.every((p:any)=>Number.isFinite(p.x)&&Number.isFinite(p.y))).toBe(true);
  expect(Math.max(...points.map((p:any)=>p.x))-Math.min(...points.map((p:any)=>p.x))).toBeGreaterThan(1);
  expect(Math.max(...points.map((p:any)=>p.y))-Math.min(...points.map((p:any)=>p.y))).toBeGreaterThan(1);
 });
});
