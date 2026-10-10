import {describe,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const file=new URL('../public/campus-explorer/collision-grid.js',import.meta.url);
describe('共用牆面空間索引',()=>{
 it('鏡頭點位查詢與完整牆面掃描一致，包括跨格邊界',()=>{
  const m=runInNewContext(readFileSync(file,'utf8')+';CampusCollisionGrid');
  const walls=[{minX:3.98,maxX:4.02,minZ:-8,maxZ:8,minY:1,maxY:4},{minX:-8,maxX:8,minZ:7.98,maxZ:8.02,minY:4,maxY:7}];
  const index=m.create(walls);
  for(let i=0;i<600;i++){const x=(i*7%201)/10-10,y=(i*13%81)/10,z=(i*17%201)/10-10;
   expect(index.pointHit(x,y,z)).toBe(walls.some(c=>x>c.minX-.08&&x<c.maxX+.08&&z>c.minZ-.08&&z<c.maxZ+.08&&y>c.minY&&y<c.maxY));
  }
 });
 it('相鄰格與身高邊界的結果和原人物碰撞規則相同',()=>{
  expect(existsSync(file)).toBe(true);const m=runInNewContext(readFileSync(file,'utf8')+';CampusCollisionGrid');
  const walls=[{minX:3.8,maxX:4.2,minZ:-6,maxZ:6,minY:0,maxY:3.6},{minX:-7,maxX:7,minZ:7.8,maxZ:8.2,minY:3.6,maxY:7.2}];
  const index=m.create(walls),brute=(x:number,y:number,z:number)=>walls.some(c=>y+1.6>=c.minY&&y+.2<=c.maxY&&x+.42>c.minX&&x-.42<c.maxX&&z+.42>c.minZ&&z-.42<c.maxZ);
  for(let i=0;i<500;i++){const x=(i*37%211)/10-10,y=(i*7%91)/10,z=(i*29%211)/10-10;expect(index.hit(x,y,z)).toBe(brute(x,y,z));}
 });
});
