import {describe,expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const source=readFileSync(new URL('../public/campus-explorer/explorer.js',import.meta.url),'utf8');
const engine=source.slice(source.indexOf('const WALL_COLLIDERS'),source.indexOf('    function checkStairElevation'));
const movement=source.slice(source.indexOf('          // 1. Sliding Collision'),source.indexOf('          // 2. Staircase Ascend'));
function setup(walls:number[][]){
 return runInNewContext(engine+`; for(const wall of walls)registerWallCollider(...wall);
 ({hit:checkWallCollision,move(x,y,z,dx,dz){const curPos={x,y,z};${movement};return curPos;}})`,{walls});
}
describe('校園人物牆壁碰撞',()=>{
 it('高速移動與卡頓時不能跨過薄牆',()=>{
  const result=setup([[-5,5,-.15,.15,0,3.6]]).move(0,0,3,0,-8);
  expect(result.z).toBeGreaterThanOrEqual(.57-1e-6);
  expect(result.z).toBeLessThan(1);
 });
 it('斜向撞牆仍可沿牆移動',()=>{
  const result=setup([[-10,10,-.15,.15,0,3.6]]).move(0,0,1,4,-3);
  expect(result.x).toBeCloseTo(4);expect(result.z).toBeGreaterThanOrEqual(.57-1e-6);
 });
 it('保留門口通道，也阻擋門旁的牆',()=>{
  const world=setup([[-5,-1,-.15,.15,0,3.6],[1,5,-.15,.15,0,3.6]]);
  expect(world.move(0,0,2,0,-4).z).toBeCloseTo(-2);
  expect(world.move(2,0,2,0,-4).z).toBeGreaterThan(0);
 });
 it('依人物高度阻擋樓上牆面，跳躍也不能穿牆',()=>{
  const world=setup([[-5,5,-.15,.15,0,7.2]]);
  for(const y of [0,1,3.6,4.6])expect(world.move(0,y,2,0,-4).z).toBeGreaterThan(0);
  expect(world.move(0,8,2,0,-4).z).toBeCloseTo(-2);
 });
});
