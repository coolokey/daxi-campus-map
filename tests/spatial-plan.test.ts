import {describe,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
function source(){return ['campus-data.js','spatial-plan-data.js','spatial-plan.js','walk-world-math.js'].filter(f=>existsSync(new URL('../public/campus-explorer/'+f,import.meta.url))).map(f=>readFileSync(new URL('../public/campus-explorer/'+f,import.meta.url),'utf8')).join('\n')}
const load=()=>runInNewContext(source()+';({buildings:BUILDINGS_CONFIG,math:CampusWalkMath,plan:typeof CampusSpatialPlan===\'undefined\'?null:CampusSpatialPlan})');
describe('115 平面圖共用配置',()=>{
 it('直欄代表樓層，九年級及七年級右翼不再橫列錯置',()=>{
  const {buildings}=load(),room=(id:string)=>buildings.flatMap((b:any)=>b.rooms).find((r:any)=>r.id===id);
  for(const [id,floor] of [['906',1],['907',1],['908',1],['904',2],['905',2],['901',3],['902',3],['903',3],['804',2],['809',3],['909',1],['704',2],['708',3],['computer-lab-1',1]])expect(room(id)?.floor,id as string).toBe(floor);
 });
 it('每間房唯一出現，樓梯、廁所、穿堂與門口使用同一模型',()=>{
  const {buildings,math,plan}=load();expect(plan).not.toBeNull();
  for(const b of buildings){const l=math.layout(b);const ids=l.rooms.map((r:any)=>r.id);expect(new Set(ids).size).toBe(b.rooms.length);
   expect(l.cells.some((c:any)=>c.kind==='room')).toBe(true);for(const r of l.rooms){expect(r.rect).toBeDefined();expect(r.door.y).toBe((r.floor-1)*3.6);expect(r.spaceCode).toBeTruthy();}
  }
  const south=math.layout(buildings.find((b:any)=>b.id==='grade8-front'));
  expect(south.stairs.length).toBe(2);expect(south.cells.filter((c:any)=>c.floor===2&&c.kind==='room').map((c:any)=>c.id)).toEqual(['807','801','802','803']);
 });
 it('固定圖面代碼與年度班名獨立，且保留目的地 ID',()=>{
  const {buildings}=load(),r=buildings.flatMap((b:any)=>b.rooms).find((r:any)=>r.id==='801');expect(r.spaceCode).toBe('422');expect(r.id).toBe('801');
  const c=buildings.flatMap((b:any)=>b.rooms).find((r:any)=>r.id==='906');expect(c.spaceCode).toBe('213');
 });
 it('綜合大樓停車場保留空地，科技館翼廊與藝術館西側梯不是平均切格',()=>{
  const {buildings,math,plan}=load(),multi=math.layout(buildings.find((b:any)=>b.id==='multi-building'));
  const parking=multi.cells.find((c:any)=>c.label==='停車場・留空'),u=(parking.u0+parking.u1)/2,v=(parking.v0+parking.v1)/2;
  expect(multi.footprints.some((p:any)=>p.floor===2&&plan.contains(p,u,v))).toBe(false);
  const tech=math.layout(buildings.find((b:any)=>b.id==='tech-building'));expect(tech.displayRows).toHaveLength(3);expect(tech.rooms.find((r:any)=>r.id==='life-tech-2').center.x).toBeGreaterThan(tech.rooms.find((r:any)=>r.id==='audiovisual-1f').center.x);
  const art=math.layout(buildings.find((b:any)=>b.id==='art-building'));expect(art.stairs[0].rect.x1).toBeLessThan(art.rooms[0].rect.x0);
 });
 it('導航顯示每段直線貼地，不平滑切過牆角',()=>{
  const {plan}=load();expect(plan.ribbon).toBeTypeOf('function');
  const points=[{x:0,y:.6,z:0},{x:5,y:.6,z:0},{x:5,y:.6,z:5}],vertices=plan.ribbon(points,.25);
  expect(vertices).toHaveLength(36);for(let i=0;i<vertices.length;i+=3){expect(vertices[i+1]).toBeCloseTo(.05);expect(vertices[i]<=5.25&&vertices[i+2]>=-.25).toBe(true)}
 });
});
