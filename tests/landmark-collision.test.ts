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
   [-38.4,27.6],[-33.6,29.4],[-42,24],[15,28],[-126,7.6],[-52,9],[-49.5,9],[-47,9],[-29,-38],[-15,-38],[20.4,22],[-43,44],[-30.4,23.5],[-30.4,36]
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
