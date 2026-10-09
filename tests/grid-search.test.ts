import {it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const context=vm.createContext({window:{}}),file='public/campus-explorer/grid-search.js';
if(existsSync(file))vm.runInContext(readFileSync(file,'utf8'),context);
const model=context.window as any;
it('reuses a search frontier across destinations without repeating visited collision checks',()=>{
 const M=model.CampusGridSearch;expect(M).toBeDefined();const state=M.create({x:0,z:0});let checks=0;
 const free=(x:number,z:number)=>{checks++;return x>=0&&x<=8&&z>=0&&z<=8&&!(x===2&&z<5)};
 const path=M.path(state,{x:7,z:0},free);expect(path[0]).toEqual({x:0,z:0});expect(path.at(-1)).toEqual({x:7,z:0});
 for(let i=1;i<path.length;i++)expect(Math.abs(path[i].x-path[i-1].x)+Math.abs(path[i].z-path[i-1].z)).toBe(1);
 const count=checks;expect(M.path(state,{x:1,z:0},free)).toEqual([{x:0,z:0},{x:1,z:0}]);expect(checks).toBe(count);
 expect(M.path(state,{x:8,z:8},free).at(-1)).toEqual({x:8,z:8});
});
it('returns null for unreachable targets and keeps isolated searches independent',()=>{
 const M=model.CampusGridSearch;expect(M).toBeDefined();expect(M.path(M.create({x:0,z:0}),{x:1,z:1},()=>false)).toBe(null);
 const state=M.create({x:0,z:0});expect(M.path(state,{x:2,z:0},(x:number,z:number)=>x>=0&&x<=2&&z===0)).toHaveLength(3);
});
