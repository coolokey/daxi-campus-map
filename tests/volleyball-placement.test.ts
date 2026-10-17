import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const context=vm.createContext({});
vm.runInContext(readFileSync('public/campus-explorer/outdoor-plan.js','utf8'),context);
const plan=vm.runInContext('CampusOutdoorPlan',context);
it('keeps both red courts inside the basketball-side inner bend with their long edges along the track',()=>{
 expect(plan.courts).toHaveLength(2);
 const t=plan.track;
 for(const r of plan.courts){
  expect(r.x1-r.x0).toBeCloseTo(18);expect(r.z1-r.z0).toBeCloseTo(9);
  expect((r.x0+r.x1)/2).toBeGreaterThan(t.x+t.halfStraight-2);
  for(const x of [r.x0,r.x1])for(const z of [r.z0,r.z1]){
   expect(Math.hypot(Math.max(0,Math.abs(x-t.x)-t.halfStraight),z-t.z)).toBeLessThan(t.innerRadius-.5);
  }
 }
});
it('places two perpendicular green courts between the track and basketball complex with clearance',()=>{
 expect(plan.outerCourts).toHaveLength(2);
 for(const r of plan.outerCourts){
  expect(r.z1-r.z0).toBeCloseTo(18);expect(r.x1-r.x0).toBeCloseTo(9);
  expect(r.x0).toBeGreaterThan(plan.track.x+plan.track.halfStraight+plan.track.outerRadius+2);
  expect(r.x1).toBeLessThan(-7);
  expect(r.z0).toBeGreaterThan(-61);expect(r.z1).toBeLessThan(-15);
 }
 expect(plan.outerCourts[1].z0-plan.outerCourts[0].z1).toBeGreaterThan(2);
});
