import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import * as THREE from 'three';
function sceneFixture(width=1440,instancing=true){
 let seed=24635;const random=Object.create(Math);random.random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const w:any={innerWidth:width,innerHeight:900},context={window:w,THREE,Float32Array,Math:random,console};
 for(const file of ['firework-text-targets.js','anniversary-model.js','firework-scene.js'])runInNewContext(readFileSync('public/campus-explorer/'+file,'utf8'),context);
 const q=w.CampusAnniversary.qualityFor({width,cores:8,memory:8}),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera();camera.position.set(0,50,230);
 const fx=w.CampusFireworkScene.create({scene,camera,renderer:{capabilities:{isWebGL2:instancing},extensions:{has:()=>instancing},getPixelRatio:()=>1}},q);return{w,q,scene,fx};
}
it('produces the same curved flight at 60 fps and 10 fps instead of shrinking slow frames',()=>{
 const positions=[];
 for(const steps of [66,11,4]){const s=sceneFixture();s.fx.launch({kind:'chrysanthemum',x:0,height:145,duration:.1});for(let i=0;i<steps;i++)s.fx.update(1.1/steps,11000+i*1100/steps);
  const heads=s.fx.group.getObjectByName('anniversary-spark-heads');expect(heads).toBeDefined();positions.push(Array.from(heads.geometry.getAttribute('position').array.slice(0,30)));s.fx.dispose();}
 for(const other of positions.slice(1))for(let i=0;i<30;i++)expect(positions[0][i]).toBeCloseTo(other[i],4);
});
it('uses depth-tested instanced streaks inside the unchanged budget and has a non-instanced fallback',()=>{
 for(const width of [390,1440])for(const supported of [true,false]){const s=sceneFixture(width,supported);for(let i=0;i<8;i++)s.fx.launch({kind:'willow',x:(i-4)*20,height:140,duration:.1});for(let i=0;i<80;i++)s.fx.update(1/60,11000+i*1000/60);
  const stats=s.fx.stats();expect(stats.trailMode).toBe(supported?'ribbon':'points');expect(stats.trailPoints).toBeGreaterThan(0);expect(stats.drawPoints).toBeLessThanOrEqual(s.q.maxParticles);
  if(supported){const streak=s.fx.group.getObjectByName('anniversary-continuous-trails');expect(streak.geometry.instanceCount).toBe(stats.trailPoints);expect(streak.material.depthTest).toBe(true);expect(streak.material.depthWrite).toBe(false);}
  const low=s.w.CampusAnniversary.qualityFor({low:true});s.fx.setQuality(low);s.fx.update(.1,12500);expect(s.fx.stats().drawPoints).toBeLessThanOrEqual(low.maxParticles);expect(s.fx.stats().smoke).toBeLessThanOrEqual(low.smoke);
  const geometries=new Set<any>();s.fx.group.traverse((o:any)=>{if(o.geometry)geometries.add(o.geometry)});let released=0;for(const g of geometries)g.addEventListener('dispose',()=>released++);s.fx.dispose();expect(released).toBe(geometries.size);
 }
});
it('cools incandescent sparks from a hot core toward colored embers without adding particles',()=>{
 const s=sceneFixture();s.fx.launch({kind:'chrysanthemum',x:0,height:145,duration:.1});for(let i=0;i<13;i++)s.fx.update(1/60,11000+i*1000/60);const heads=s.fx.group.getObjectByName('anniversary-spark-heads');expect(heads).toBeDefined();const early=heads.geometry.getAttribute('color').array[2];for(let i=0;i<60;i++)s.fx.update(1/60,11200+i*1000/60);expect(heads.geometry.getAttribute('color').array[2]).toBeLessThan(early);s.fx.dispose();
});
it('煙火共用校園深度測試、具有真實 80 點位，停止會移除全部場景資源',()=>{
 const w:any={innerWidth:390,innerHeight:844};runInNewContext(readFileSync('public/campus-explorer/firework-text-targets.js','utf8'),{window:w});runInNewContext(readFileSync('public/campus-explorer/anniversary-model.js','utf8'),{window:w});
 runInNewContext(readFileSync('public/campus-explorer/firework-scene.js','utf8'),{window:w,THREE,Float32Array,console});
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera();camera.position.set(0,50,230);
 const fx=w.CampusFireworkScene.create({scene,camera},w.CampusAnniversary.qualityFor({width:390}));
 expect(scene.children).toContain(fx.group);
 const points:any[]=[];fx.group.traverse((o:any)=>{if(o.isPoints)points.push(o)});
 expect(points.length).toBeGreaterThanOrEqual(3);
 expect(points.filter((o:any)=>o.name!=='anniversary-text-particles').every((o:any)=>o.material.depthTest&&!o.material.depthWrite)).toBe(true);
 fx.launch({kind:'willow',x:0,height:100});fx.update(.1,16000);fx.update(2,18000);
 expect(fx.stats().bursts).toBeGreaterThan(0);
 fx.update(.1,24500);expect(fx.stats().textPoints).toBeGreaterThan(2000);expect(fx.stats().textLines).toEqual(['80週年','大溪國中 生日快樂']);expect(fx.stats().formedLines).toBe(2);fx.update(.1,28500);expect(fx.stats().textDrift).toBeGreaterThan(0);
 fx.dispose();expect(scene.children).not.toContain(fx.group);expect(fx.stats().active).toBe(0);
});
it('uses persistent curved trails and a short burst glow within each device quality budget',()=>{
 for(const width of [390,1440]){
  const w:any={innerWidth:width,innerHeight:844};for(const file of ['firework-text-targets.js','anniversary-model.js','firework-scene.js'])runInNewContext(readFileSync('public/campus-explorer/'+file,'utf8'),{window:w,THREE,Float32Array,console});
  const q=w.CampusAnniversary.qualityFor({width,cores:8,memory:8}),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera();camera.position.set(0,50,230);
  const fx=w.CampusFireworkScene.create({scene,camera},q);fx.launch({kind:'willow',x:0,height:120,duration:.1});fx.update(.1,11000);expect(fx.stats().flashPoints).toBeGreaterThan(0);
  for(let i=0;i<35;i++)fx.update(1/60,11000+i*1000/60);
  expect(fx.stats().trailPoints).toBeGreaterThan(fx.stats().active);expect(fx.stats().drawPoints).toBeLessThanOrEqual(q.maxParticles);fx.dispose();
 }
});
it('keeps decorative side bursts inside the closer portrait viewing frame',()=>{
 const w:any={innerWidth:390,innerHeight:844};for(const file of ['firework-text-targets.js','anniversary-model.js','firework-scene.js'])runInNewContext(readFileSync('public/campus-explorer/'+file,'utf8'),{window:w,THREE,Float32Array,console});
 const positions:any[]=[],fx=w.CampusFireworkScene.create({scene:new THREE.Scene(),camera:new THREE.PerspectiveCamera()},w.CampusAnniversary.qualityFor({width:390}),{burst:(p:any)=>positions.push(p)});
 fx.launch({kind:'ring',x:220,height:110,duration:.1,decorative:true});fx.update(.1,24000);expect(positions[0].x).toBeLessThanOrEqual(140);fx.dispose();
});
