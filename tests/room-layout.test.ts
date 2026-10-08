import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const model=()=>runInNewContext(readFileSync(new URL('../public/campus-explorer/room-layout-model.js',import.meta.url),'utf8')+';CampusRoomLayout');
describe('教室年度配置',()=>{
 it('國中三碼班級自動配色，處室與專科依類別',()=>{const m=model();expect(m.category('701','academic')).toBe('grade7');expect(m.category('801 教室','academic')).toBe('grade8');expect(m.category('901','academic')).toBe('grade9');expect(m.category('教務處','admin')).toBe('admin');expect(m.category('自然教室','special')).toBe('special');});
 it('儲存僅保留已知房間的非空名稱，不可改固定編號與樓層',()=>{const m=model(),rooms=[{id:'r1',name:'701',floor:1,code:'A11'}];const result=m.normalize({r1:'  802  ',unknown:'999'},rooms);expect(result.r1).toBe('802');expect(result.unknown).toBeUndefined();expect(rooms[0].code).toBe('A11');expect(m.normalize({r1:''},rooms).r1).toBe('701');});
 it('年度隔離且損壞資料可回復，特殊文字只作純文字',()=>{const m=model(),rooms=[{id:'r1',name:'701'}];expect(m.key(115)).not.toBe(m.key(116));expect(m.parse('{broken',rooms)).toEqual({r1:'701'});expect(m.parse('{"r1":"<img onerror=alert(1)>"}',rooms).r1).toBe('<img onerror=alert(1)>');});
});
