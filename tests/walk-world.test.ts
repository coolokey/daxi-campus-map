import {describe,expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const math=()=>runInNewContext(readFileSync(new URL('../public/campus-explorer/walk-world-math.js',import.meta.url),'utf8')+'; CampusWalkMath');
describe('行進視角與實際梯面',()=>{
 it('鏡頭位於人物後方、觀看行進前方',()=>{
  for(const angle of [0,Math.PI/2,Math.PI,-Math.PI/2]){
   const p={x:5,y:3.6,z:9},view=math().cameraPose(p,angle,.1,false);
   const dot=(view.target.x-view.position.x)*Math.sin(angle)+(view.target.z-view.position.z)*Math.cos(angle);
   expect(dot).toBeGreaterThan(0);
   expect((view.position.x-p.x)*Math.sin(angle)+(view.position.z-p.z)*Math.cos(angle)).toBeLessThan(0);
  }
 });
 it('每個梯段可連續上樓及原路下樓',()=>{
  const m=math(),layout=m.layout({id:'admin-front',x:-12,z:44,width:26,depth:10,floors:3,rooms:[]});
  for(const ramp of layout.ramps){
   let y=ramp.h0;
   for(let i=0;i<=40;i++){const p=m.rampPoint(ramp,i/40);y=m.groundAt(layout,p.x,p.z,y);expect(y).toBeCloseTo(p.y);}
   for(let i=40;i>=0;i--){const p=m.rampPoint(ramp,i/40);y=m.groundAt(layout,p.x,p.z,y);expect(y).toBeCloseTo(p.y);}
  }
 });
 it('梯面附近不會被整片樓板擋住，門口與房間資料一致',()=>{
  const l=math().layout({id:'grade9-back',x:2,z:28,width:12,depth:38,floors:3,rooms:[{id:'901',floor:3,name:'901'}]});
  expect(l.rooms[0].floor).toBe(3);expect(l.rooms[0].door.y).toBe(7.2);
  expect(l.ramps).toHaveLength(4);expect(l.floorHole).toBeDefined();
 });
 it('上樓途中跳躍下降會落在腳下梯面',()=>{
  const source=readFileSync(new URL('../public/campus-explorer/explorer.js',import.meta.url),'utf8');
  const start=source.indexOf('      if (avatarGroup && isJumping) {',source.indexOf('// Space-bar Jump Hop'));
  const end=source.indexOf('// 3. AVATAR WALKING',start);
  const m=math(),layout=m.layout({id:'test',x:0,z:0,width:26,depth:10,floors:3,rooms:[]});
  const point=m.rampPoint(layout.ramps[0],.6);
  const context={avatarGroup:{position:{...point,y:point.y+.05}},isJumping:true,jumpBaseY:0,jumpVelocity:-3,delta:.05,
   window:{campusWalkWorld:{ground:(p:any)=>m.groundAt(layout,p.x,p.z,p.y)}}};
  runInNewContext(source.slice(start,end),context);
  expect(context.isJumping).toBe(false);expect(context.avatarGroup.position.y).toBeCloseTo(point.y);
  expect(context.jumpBaseY).toBeCloseTo(point.y);
 });
});
