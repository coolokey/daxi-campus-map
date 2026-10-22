import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {runInContext} from 'node:vm';
import {afterAll,describe,expect,it} from 'vitest';

// Run the real scene geometry, collision index, ground model and navigation.
// Only drawing/WebGL are stubbed by the established spatial verifier.
const script=fileURLToPath(new URL('../scripts/verify-spatial-world.cjs',import.meta.url));
const prefix=readFileSync(script,'utf8').split('const report=vm.runInContext')[0];
const require=createRequire(script);
const {context,dom}=new Function('require','__dirname',`${prefix};return {context,dom};`)(require,fileURLToPath(new URL('../scripts',import.meta.url)));
const evaluate=(code:string)=>runInContext(code,context,{timeout:180000});
afterAll(()=>dom.window.close());

describe('景觀實體碰撞與通行',{timeout:60000},()=>{
 it('校門到學務處的實際導航與人物行走均避開行政大樓花圃',()=>{
  const result=evaluate(`(()=>{
   scene.updateMatrixWorld(true);const beds=['admin-left-flowerbed','admin-right-flowerbed'].map(name=>({name,bounds:new THREE.Box3().setFromObject(scene.getObjectByName(name))}));
   const start={x:NAV_NODES.gate.x,y:0,z:NAV_NODES.gate.z},path=campusWalkWorld.route(start,ROOMS_DB['student-affairs']);
   if(!path)return {path:null,crossings:[],blocked:false};const p={...start},crossings=[];let blocked=false;
   for(let j=1;j<path.length;j++){const a=path[j-1],b=path[j],n=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.1));
    for(let i=1;i<=n;i++){const t=i/n,q={x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t};
     for(const bed of beds)if(q.y<.3&&q.x+.42>bed.bounds.min.x&&q.x-.42<bed.bounds.max.x&&q.z+.42>bed.bounds.min.z&&q.z-.42<bed.bounds.max.z&&!crossings.includes(bed.name))crossings.push(bed.name);
     blocked=moveAvatarWithCollision(p,q.x-p.x,q.z-p.z,q.y-p.y,true)||blocked;
    }
   }return {path,crossings,blocked,end:p,target:path.at(-1)};
  })()`);
  expect(result.path).not.toBeNull();expect(result.crossings).toEqual([]);expect(result.blocked).toBe(false);
  expect(result.end.x).toBeCloseTo(result.target.x);expect(result.end.z).toBeCloseTo(result.target.z);
 });
 it('低矮花圃與前庭種植帶會阻擋地面人物，而入口鋪面保留通行',()=>{
  const result=evaluate(`(()=>{scene.updateMatrixWorld(true);return ['admin-left-flowerbed','admin-right-flowerbed','forecourt-tree-bed-soil','south-wing-tree-strip-soil'].map(name=>{
   const b=new THREE.Box3().setFromObject(scene.getObjectByName(name)),x=(b.min.x+b.max.x)/2,z=b.min.z+.55,p={x,y:0,z:b.min.z-1};
   const blocked=moveAvatarWithCollision(p,0,1.8,0,true);return {name,hit:checkWallCollision(x,0,z),blocked,p,minZ:b.min.z};
  })})()`);
  for(const r of result){expect(r.hit,r.name).toBe(true);expect(r.blocked,r.name).toBe(true);expect(r.p.z,r.name).toBeLessThanOrEqual(r.minZ-.42+1e-6);}
 });
 it('石柱四向、斜向及高速移動不可穿越，跳躍也不可穿入石柱',()=>{
  const results=evaluate(`(()=>{return [
   [-36,0,32,0,-7],[-36,0,25,0,7],[-40,0,28.5,8,0],[-32,0,28.5,-8,0],[-40,0,32,8,-7],[-36,1,32,0,-7]
  ].map(([x,y,z,dx,dz])=>{const p={x,y,z};isJumping=y>0;const blocked=moveAvatarWithCollision(p,dx,dz);isJumping=false;return {p,blocked,hit:checkWallCollision(p.x,p.y,p.z)}})})()`);
  for(const r of results){expect(r.blocked).toBe(true);expect(r.hit).toBe(false);}
  expect(results[0].p.z).toBeGreaterThan(29.6);
  expect(results[1].p.z).toBeLessThan(27.4);
  expect(results[2].p.x).toBeLessThan(-37.5);
  expect(results[3].p.x).toBeGreaterThan(-34.5);
 });
 it('灌木、樹幹、旗桿、球網柱、長椅與花台具有實體碰撞',()=>{
  const results=evaluate(`[
   [-38.4,27.6],[-33.6,29.4],[-42,24],[15,28],[-126,7.6],[-52,9],[-49.5,9],[-47,9],[-25,-48],[-14,-48],[-25,-26],[-14,-26],[20.4,22],[-43,44],[-30.4,23.5],[-30.4,36]
  ].map(([x,z])=>({x,z,hit:checkWallCollision(x,0,z)}))`);
  for(const r of results)expect(r.hit,JSON.stringify(r)).toBe(true);
 });
 it('保留銅像觀賞點，導航能由銅像後方繞行至前方',()=>{
  const result=evaluate(`(()=>{const p={x:-36,y:0,z:24},target={x:-36,y:0,z:32};
   const path=campusWalkWorld.gridPath(p,target);
   if(!path)return {path:null};let blocked=false;
   for(const q of path)blocked=moveAvatarWithCollision(p,q.x-p.x,q.z-p.z)||blocked;
   return {path,blocked,p,targetHit:checkWallCollision(-36,0,32)};
  })()`);
  expect(result.path).not.toBeNull();expect(result.blocked).toBe(false);expect(result.targetHit).toBe(false);
  expect(result.p.x).toBeCloseTo(-36);expect(result.p.z).toBeCloseTo(32);
 });
 it('樹冠下方與地面標線仍可通行',()=>{
  expect(evaluate('checkWallCollision(-40.5,0,24)')).toBe(false);
  expect(evaluate('checkWallCollision(52.5,0,14)')).toBe(false);
 });
});
