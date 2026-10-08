import {describe,expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const math=runInNewContext(readFileSync(new URL('../public/campus-explorer/minimap-math.js',import.meta.url),'utf8')+'; CampusMinimapMath');
describe('人物定位小地圖',()=>{
 it('人物位置固定於小地圖中央偏下',()=>{
  for(const heading of [0,Math.PI/2,Math.PI])expect(math.worldToMini(52,86,{x:52,z:86,heading},344,5)).toEqual({x:172,y:206.4});
 });
 it('朝向東側時，東側地標顯示在前方',()=>{
  const point=math.worldToMini(10,0,{x:0,z:0,heading:Math.PI/2},344,5);
  expect(point.x).toBeCloseTo(172);expect(point.y).toBeCloseTo(156.4);
 });
 it('人物走動時，相同地標在小地圖上移動',()=>{
  const before=math.worldToMini(10,0,{x:0,z:0,heading:0},344,5);
  const after=math.worldToMini(10,0,{x:5,z:0,heading:0},344,5);
  expect(before.x-after.x).toBe(25);
 });
 it('樓層依人物高度，不受觀覽樓層按鈕影響',()=>{
  const building={id:'admin-front',name:'行政大樓前棟',x:-12,z:44,width:26,depth:10,floors:3};
  expect(math.locate({x:-12,y:0,z:44},[building]).floor).toBe(1);
  expect(math.locate({x:-12,y:3.6,z:44},[building])).toMatchObject({floor:2,label:'行政大樓前棟',buildingId:'admin-front'});
  expect(math.locate({x:-12,y:7.2,z:44},[building]).floor).toBe(3);
 });
 it('校門附近顯示正門廣場',()=>expect(math.locate({x:0,y:0,z:96},[]).label).toBe('正門廣場'));
});
