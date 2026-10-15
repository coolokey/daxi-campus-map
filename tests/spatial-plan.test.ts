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

it('every switchback has usable turning and floor landings without squeezing the walking corridor',()=>{
 const {buildings,math}=load();
 for(const b of buildings)for(const stair of math.layout(b).stairs){
  expect(stair.u1-stair.u0,b.id+' shaft').toBeGreaterThanOrEqual(8-1e-6);
  expect(stair.farU-(stair.u0+.2),b.id+' turning depth').toBeGreaterThanOrEqual(1.7);
  expect(stair.u1-stair.nearU,b.id+' exit landing').toBeGreaterThanOrEqual(1.7);
  expect(stair.innerU-stair.nearU,b.id+' exit clearance').toBeGreaterThanOrEqual(.8);
  expect(stair.turnU, b.id+' turn stays inside landing').toBeGreaterThan(stair.u0+.6);
  expect(stair.turnU).toBeLessThan(stair.farU-.6);
 }
});
it('grade seven stair openings stay inside the stair bay instead of cutting the main corridor',()=>{
 const {buildings,math}=load(),l=math.layout(buildings.find((b:any)=>b.id==='new-grade7'));
 for(const h of l.holes)for(const c of l.corridors)expect(h.u0<c.u1&&h.u1>c.u0&&h.v0<c.v1&&h.v1>c.v0).toBe(false);
});

it('no stair opening removes any part of a main corridor in any building',()=>{
 const {buildings,math}=load();const cuts:any[]=[];
 for(const b of buildings){const l=math.layout(b);for(const h of l.holes)for(const c of l.corridors)if(h.u0<c.u1-1e-6&&h.u1>c.u0+1e-6&&h.v0<c.v1-1e-6&&h.v1>c.v0+1e-6)cuts.push({building:b.id,h,c});}
 expect(cuts).toEqual([]);
});


describe('activity center photo-confirmed one-storey hall and second-floor balcony',()=>{
 it('keeps destination IDs but corrects their floors and labels',()=>{
  const {buildings}=load(),b=buildings.find((b:any)=>b.id==='gym-bld');
  expect(b.floors).toBe(2);expect(b.rooms.find((r:any)=>r.id==='gym').floor).toBe(1);
  expect(b.rooms.find((r:any)=>r.id==='gym-balcony').floor).toBe(2);
  expect(b.rooms.find((r:any)=>r.id==='weight-room')).toMatchObject({floor:1});
  expect(b.rooms.find((r:any)=>r.id==='weight-room').name).toContain('桌球');
 });
 it('leaves the center of the hall open above 1F while supporting the upper side walks',()=>{
  const {buildings,math,plan}=load(),l=math.layout(buildings.find((b:any)=>b.id==='gym-bld'));
  const hall=l.world(0,-5,3.6),side=l.world(16,-5,3.6),balcony=l.rooms.find((r:any)=>r.id==='gym-balcony').center;
  expect(plan.groundAt(l,hall.x,hall.z,hall.y)).toBe(0);
  expect(plan.groundAt(l,side.x,side.z,side.y)).toBe(3.6);
  expect(plan.groundAt(l,balcony.x,balcony.z,balcony.y)).toBe(3.6);
  expect(l.footprints.some((p:any)=>p.floor>2)).toBe(false);
 });
 it('supports stage steps and bleacher tiers with the same ground data used for walking',()=>{
  const {buildings,math,plan}=load(),l=math.layout(buildings.find((b:any)=>b.id==='gym-bld'));
  for(const [u,v,y] of [[0,-15,.6],[4,11.5,3.75],[4,12.5,3.9],[4,13.5,4.05]]){
   const p=l.world(u,v,y);expect(plan.groundAt(l,p.x,p.z,p.y)).toBeCloseTo(y);
  }
  const aisle=l.world(0,12.5,3.6);expect(plan.groundAt(l,aisle.x,aisle.z,aisle.y)).toBe(3.6);
 });
});
it('photo correction keeps the administrative bridge central and joins teaching floors',()=>{
 const {buildings,math,plan}=load(),ls=buildings.map((b:any)=>math.layout(b)),front=ls.find((l:any)=>l.id==='admin-front'),mid=ls.find((l:any)=>l.id==='grade8-mid'),south=ls.find((l:any)=>l.id==='grade8-front'),nine=ls.find((l:any)=>l.id==='grade9-back'),g=plan.galleries(ls)[0];
 expect(g.paths.map((p:any)=>p.floor)).toEqual([2,3]);
 for(const p of g.paths){const end=p.points.at(-1),q=front.local(end.x,end.z);expect(front.cells.some((c:any)=>c.floor===p.floor&&c.kind==='passage'&&q.u>=c.u0&&q.u<=c.u1)).toBe(true);}
 expect(g.bounds.x0).toBeGreaterThan(front.bounds.x0+5);
 expect(mid.bounds.z1).toBeCloseTo(south.bounds.z0);
 expect(nine.b.depth).toBeLessThan(mid.b.depth*.7);
 expect(plan.junctions(ls)).toHaveLength(3);
});
