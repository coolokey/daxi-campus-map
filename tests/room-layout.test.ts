import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const model=()=>runInNewContext(readFileSync(new URL('../public/campus-explorer/room-layout-model.js',import.meta.url),'utf8')+';CampusRoomLayout');
describe('教室年度配置',()=>{
 it('places classroom teaching equipment and desks while preserving an entrance-to-center aisle',()=>{
  const m=model(),r={id:'901',name:'901 教室',cat:'grade9',u0:0,u1:8,v0:0,v1:8,u:4,v:4,doorSide:'v0'},p=m.furnishings(r);
  for(const role of ['blackboard','platform','teacher-desk','student-desk','student-chair'])expect(p.parts.some((b:any)=>b.role===role)).toBe(true);
  expect(p.parts.filter((b:any)=>b.role==='student-desk').length).toBeGreaterThanOrEqual(12);
  for(const b of p.parts.filter((b:any)=>b.solid))expect(b.u1<=3.35||b.u0>=4.65||b.v0>4.5).toBe(true);
 });
 it('recognizes staff offices and specialist rooms before broad administrative categories',()=>{
  const m=model();expect(m.roomKind({name:'八、九年級導師室',cat:'admin'})).toBe('office');expect(m.roomKind({name:'數學領域研究室',cat:'special'})).toBe('office');expect(m.roomKind({name:'特教教室二',cat:'admin'})).toBe('classroom');expect(m.roomKind({name:'第一電腦教室'})).toBe('computer');expect(m.roomKind({name:'706 質數研究室',cat:'grade7'})).toBe('classroom');expect(m.roomKind({name:'非營利幼兒園',cat:'admin'})).toBe('classroom');expect(m.roomKind({name:'空間 521（名稱待確認）'})).toBe('unconfirmed');
  const shallow=m.furnishings({name:'視聽教室',u0:0,u1:8,v0:0,v1:3.2,u:4,v:1.6,doorSide:'v0'});expect(shallow.parts.some((b:any)=>b.role==='student-desk')).toBe(true);
  const p=m.furnishings({name:'專任辦公室',u0:0,u1:8,v0:0,v1:8,u:4,v:4,doorSide:'u1'});
  for(const role of ['office-desk','office-chair','monitor','file-cabinet','printer'])expect(p.parts.some((b:any)=>b.role===role)).toBe(true);
 });
 it('國中三碼班級自動配色，處室與專科依類別',()=>{const m=model();expect(m.category('701','academic')).toBe('grade7');expect(m.category('801 教室','academic')).toBe('grade8');expect(m.category('901','academic')).toBe('grade9');expect(m.category('教務處','admin')).toBe('admin');expect(m.category('自然教室','special')).toBe('special');});
 it('儲存僅保留已知房間的非空名稱，不可改固定編號與樓層',()=>{const m=model(),rooms=[{id:'r1',name:'701',floor:1,code:'A11'}];const result=m.normalize({r1:'  802  ',unknown:'999'},rooms);expect(result.r1).toBe('802');expect(result.unknown).toBeUndefined();expect(rooms[0].code).toBe('A11');expect(m.normalize({r1:''},rooms).r1).toBe('701');});
 it('年度隔離且損壞資料可回復，特殊文字只作純文字',()=>{const m=model(),rooms=[{id:'r1',name:'701'}];expect(m.key(115)).not.toBe(m.key(116));expect(m.parse('{broken',rooms)).toEqual({r1:'701'});expect(m.parse('{"r1":"<img onerror=alert(1)>"}',rooms).r1).toBe('<img onerror=alert(1)>');});
 it('舊目的地名稱遷移至實體房間，保留舊鍵且現有實體名稱優先',()=>{
  const m=model(),rooms=[{id:'canonical',name:'預設房間'}],aliases={legacy:'canonical'};
  const migrated=m.parse('{"legacy":"舊年度名稱"}',rooms,aliases);
  expect(migrated).toEqual({canonical:'舊年度名稱',legacy:'舊年度名稱'});
  expect(m.normalize({...migrated,canonical:'新年度名稱'},rooms,aliases)).toEqual({canonical:'新年度名稱',legacy:'舊年度名稱'});
  expect(m.parse('{"legacy":"舊名稱","canonical":"既有實體名稱"}',rooms,aliases)).toEqual({canonical:'既有實體名稱',legacy:'舊名稱'});
 });
});
