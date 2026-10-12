import {expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';

it('opens current choices, applies independent options and restores focus on close',()=>{
 const dom=new JSDOM('<body><div id="avatar-bottom-controls"></div><div id="guide-tools"></div></body>',{runScripts:'outside-only',url:'https://example.test'});
 const w=dom.window as any;let appearance={gender:'male',outfit:'uniform'},takeovers=0;
 w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};
 w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new w.Event('close'))};
 w.campusExplorer={getAvatarAppearance:()=>({...appearance}),setAvatarAppearance:(value:any)=>appearance=value,manualTakeover:()=>takeovers++};
 w.eval(readFileSync('public/campus-explorer/avatar-appearance-ui.js','utf8'));
 const d=w.document;d.getElementById('btn-avatar-appearance').click();
 expect(takeovers).toBe(1);expect(d.getElementById('avatar-appearance-dialog').open).toBe(true);
 d.querySelector('[name="avatar-gender"][value="female"]').checked=true;
 d.querySelector('[name="avatar-outfit"][value="casual"]').checked=true;
 d.getElementById('avatar-appearance-apply').click();
 expect(appearance).toEqual({gender:'female',outfit:'casual'});
 expect(d.getElementById('avatar-appearance-dialog').open).toBe(false);
 expect(d.activeElement.id).toBe('btn-avatar-appearance');
 d.getElementById('btn-avatar-appearance').click();
 expect(d.querySelector('[name="avatar-gender"][value="female"]').checked).toBe(true);
 d.querySelector('[name="avatar-outfit"][value="uniform"]').checked=true;
 d.getElementById('avatar-appearance-cancel').click();
 expect(appearance.outfit).toBe('casual');dom.window.close();
});
