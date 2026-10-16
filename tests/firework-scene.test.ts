import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import * as THREE from 'three';
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
