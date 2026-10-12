import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';

it('exposes gender and outfit directly without a dialog or interrupting navigation',()=>{
 const dom=new JSDOM('<body><div id="guide-quick-floors"></div><div id="avatar-bottom-controls"><button id="btn-speed-ctrl">速度</button><button id="btn-turn-ctrl">轉頭</button></div><div id="guide-tools"></div></body>',{runScripts:'outside-only',url:'https://example.test'});
 const w=dom.window as any;let appearance={gender:'female',outfit:'uniform'},takeovers=0;
 w.campusExplorer={getAvatarAppearance:()=>({...appearance}),setAvatarAppearance:(value:any)=>appearance={...appearance,...value},manualTakeover:()=>takeovers++};
 w.eval(readFileSync('public/campus-explorer/avatar-appearance-ui.js','utf8'));
 const d=w.document,choices=d.getElementById('avatar-quick-choices');
 expect(choices.closest('dialog')).toBeNull();expect(choices.closest('#guide-panel')).toBeNull();
 expect(d.querySelector('[name="avatar-gender"][value="female"]').checked).toBe(true);
 d.querySelector('[name="avatar-outfit"][value="casual"]').click();
 expect(appearance).toEqual({gender:'female',outfit:'casual'});
 d.querySelector('[name="avatar-gender"][value="male"]').click();
 expect(appearance).toEqual({gender:'male',outfit:'casual'});expect(takeovers).toBe(0);
 expect(d.getElementById('btn-speed-ctrl').closest('#guide-tools')).not.toBeNull();
 expect(d.getElementById('avatar-appearance-dialog')).toBeNull();dom.window.close();
});
