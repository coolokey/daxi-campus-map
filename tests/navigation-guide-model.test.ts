import { expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import vm from 'node:vm';

const context=vm.createContext({window:{}});
const file='public/campus-explorer/navigation-guide-model.js';
if(existsSync(file))vm.runInContext(readFileSync(file,'utf8'),context);
const model=(context.window as any).CampusNavigationGuide;
const room={name:'教務處',buildingName:'行政大樓',floor:2};
it('由實際路徑分辨上樓與最後走廊，不將暫停當作抵達',()=>{
 expect(model).toBeDefined();
 const points=[{x:0,y:.6,z:0},{x:3,y:.6,z:0},{x:3,y:2.4,z:1},{x:3,y:4.2,z:2},{x:6,y:4.2,z:2}];
 const plan=model.steps(points,room);
 expect(plan.map((s:any)=>s.kind)).toEqual(['approach','up','destination','arrival']);
 expect(model.active(plan,1,'walking')).toBe(1);
 expect(model.active(plan,3,'paused')).toBe(2);
 expect(model.active(plan,3,'arrived')).toBe(3);
});
it('跨棟先下樓再上樓保留順序，平地路徑不虛構樓梯',()=>{
 expect(model).toBeDefined();
 const points=[{y:4.2},{y:2.4},{y:.6},{y:.6},{y:2.4},{y:4.2},{y:4.2}];
 expect(model.steps(points,room).filter((s:any)=>['up','down'].includes(s.kind)).map((s:any)=>s.kind)).toEqual(['down','up']);
 expect(model.steps([{y:.6},{y:.6}],{name:'司令台',code:'OUT-STAND'}).some((s:any)=>['up','down'].includes(s.kind))).toBe(false);
});

it('does not describe a shallow entrance threshold as going down a storey',()=>{
 const plan=model.steps([{y:0},{y:.04},{y:.08},{y:.12},{y:.12},{y:0},{y:0},{y:1.8},{y:3.6},{y:3.6}],{name:'活動中心階梯看台',floor:2});
 expect(plan.filter((s:any)=>['up','down'].includes(s.kind)).map((s:any)=>s.kind)).toEqual(['up']);
});
