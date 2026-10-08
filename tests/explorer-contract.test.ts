import {describe,expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const root=new URL('../public/campus-explorer/',import.meta.url);
const data=readFileSync(new URL('campus-data.js',root),'utf8');
const script=readFileSync(new URL('explorer.js',root),'utf8');
const nav=script.match(/const NAV_NODES = ([\s\S]*?\n};)/)![0];
type Room={id:string;floor:number;node:string};
type Building={id:string;x:number;z:number;width:number;depth:number;rooms:Room[]};
const buildings:Building[]=runInNewContext(data+'; BUILDINGS_CONFIG');
const nodes:Record<string,{x:number;y:number;z:number;neighbors:string[]}>=runInNewContext(nav+'; NAV_NODES');
describe('平面圖與導航一致性',()=>{
 it('行政前後棟前後排列，雙縱棟保留中庭',()=>{
  const b=(id:string)=>buildings.find(b=>b.id===id)!;
  expect(b('admin-front').x).toBe(b('admin-back').x);
  expect(b('admin-front').z).toBeGreaterThan(b('admin-back').z);
  expect(b('grade9-back').depth).toBeGreaterThan(b('grade9-back').width);
  expect(b('grade8-mid').depth).toBeGreaterThan(b('grade8-mid').width);
  expect(b('art-building').z).toBeGreaterThan(b('tech-building').z);
  expect(b('tech-building').z).toBeGreaterThan(b('multi-building').z);
 });
 it('九年級班級樓層符合 115 平面圖',()=>{
  const rooms=buildings.find(b=>b.id==='grade9-back')!.rooms;
  for(const [id,floor] of Object.entries({'908':1,'905':1,'903':1,'907':2,'904':2,'902':2,'906':3,'901':3}))expect(rooms.find(r=>r.id===id)?.floor,id).toBe(floor);
 });
 it('每一個教室都有可由正門到達的導航節點',()=>{
  const seen=new Set<string>(),queue=['gate'];
  while(queue.length){const id=queue.shift()!;if(seen.has(id))continue;seen.add(id);for(const neighbor of nodes[id]?.neighbors??[])queue.push(neighbor);for(const [key,n] of Object.entries(nodes))if(n.neighbors.includes(id))queue.push(key)}
  for(const b of buildings)for(const room of b.rooms){expect(nodes[room.node],room.id).toBeDefined();expect(seen.has(room.node),room.id).toBe(true)}
 });
 it('藝術館導航高度與樓板一致',()=>{
  for(const room of buildings.find(b=>b.id==='art-building')!.rooms)expect(nodes[room.node].y,room.id).toBeCloseTo((room.floor-1)*3.6);
 });
});
