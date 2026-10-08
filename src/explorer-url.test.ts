import {describe,expect,it} from 'vitest';
import {explorerUrl} from './explorer-url';

describe('既有導覽網址相容',()=>{
 it('保留教室目的地與子目錄',()=>expect(explorerUrl('/demo/','?to=701')).toBe('/demo/campus-explorer/index.html?to=701'));
 it('轉換舊版目的地',()=>expect(explorerUrl('./','?to=admin')).toBe('./campus-explorer/index.html?to=academic'));
 it('保留場景原目的地',()=>expect(explorerUrl('./','?to=art-4f')).toBe('./campus-explorer/index.html?to=art-4f'));
 it('不轉送舊版檢視模式與任意參數',()=>expect(explorerUrl('./','?viewer=legacy&other=x')).toBe('./campus-explorer/index.html'));
});
