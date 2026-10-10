import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
function model(){const c:any={window:{}};runInNewContext(readFileSync(new URL('../public/campus-explorer/firework-audio.js',import.meta.url),'utf8'),c);return c.window.CampusFireworkAudio;}
function random(){let state=92;return ()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};}
describe('立體煙火音效',()=>{
 it.each(['burst','launch'])('%s 波形具有雙聲道、有限振幅與平滑結尾',kind=>{
  const [l,r]=model().synthesize(kind,12000,random());
  expect(l.length).toBe(kind==='burst'?39000:10320);expect(r.length).toBe(l.length);
  expect(l.every((n:number)=>Number.isFinite(n)&&Math.abs(n)<=.850001)).toBe(true);
  expect(Math.abs(l.at(-1))).toBeLessThan(.001);
  expect(l.some((n:number,i:number)=>Math.abs(n-r[i])>.01)).toBe(true);
 },30000);
 it('爆炸具有明顯瞬態及長尾，不只是短白雜訊',()=>{
  const [l]=model().synthesize('burst',12000,random());
  const rms=(a:number,b:number)=>Math.sqrt(l.slice(a*12000,b*12000).reduce((sum:number,n:number)=>sum+n*n,0)/((b-a)*12000));
  expect(rms(0,.08)).toBeGreaterThan(rms(1,1.5)*3);
  expect(rms(1,1.5)).toBeGreaterThan(.005);
  expect(rms(2,2.5)).toBeGreaterThan(.0005);
 },30000);
});
