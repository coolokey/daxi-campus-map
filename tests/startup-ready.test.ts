import {describe,expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const script=readFileSync(new URL('../public/campus-explorer/startup-metrics.js',import.meta.url),'utf8');

describe('校園場景載入完成訊號',()=>{
 it.each(['','?profile=1'])('一般與診斷網址都會通知首頁：%s',(search)=>{
  const messages:unknown[]=[],logs:string[]=[];
  const context={
   URLSearchParams,
   location:{search,origin:'https://school.example'},
   performance:{now:()=>123,getEntriesByType:()=>[]},
   requestAnimationFrame:(callback:()=>void)=>callback(),
   parent:{postMessage:(message:unknown,origin:string)=>messages.push({message,origin})},
   window:{},console:{info:(message:string)=>logs.push(message)},
   renderer:{info:{render:{calls:1,triangles:3}}},scene:{children:[]}
  };
  runInNewContext(script,context);
  expect(messages).toEqual([{message:{type:'campus-ready',readyMs:123},origin:'*'}]);
  expect(logs.length).toBe(search?1:0);
 });
});
