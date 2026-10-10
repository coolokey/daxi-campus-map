import {it,expect} from 'vitest';
import {JSDOM} from 'jsdom';
import {readFileSync} from 'node:fs';
function setup(){
 const dom=new JSDOM('<iframe src="https://campus.test/campus-explorer/index.html"></iframe><div id="loading"></div>',{url:'https://campus.test/',runScripts:'outside-only'}),w=dom.window as any;
 let slow=()=>{};w.setTimeout=(callback:()=>void)=>{slow=callback;return 1;};w.clearTimeout=()=>{};
 w.eval(readFileSync('src/loading-state.js','utf8').replace('export function','function'));
 const frame=w.document.querySelector('iframe'),loading=w.document.getElementById('loading');w.attachCampusLoading(frame,loading);
 const message=(type:string,source=frame.contentWindow,origin='https://campus.test')=>w.dispatchEvent(new w.MessageEvent('message',{data:{type},source,origin}));
 return{dom,w,frame,loading,message,slow:()=>slow()};
}
it('slow loading exposes working retry and plan actions while keeping the loading state',()=>{
 const s=setup();expect(s.loading.querySelector('.campus-loading-actions').hidden).toBe(true);s.slow();
 expect(s.loading.querySelector('.campus-loading-actions').hidden).toBe(false);
 expect(s.loading.querySelector('a').href).toBe('https://campus.test/campus-explorer/campus_plan_115.jpg');
 expect(s.loading.classList.contains('is-ready')).toBe(false);s.dom.window.close();
});
it('startup failure is visible; only the expected iframe and origin can dismiss the cover',()=>{
 const s=setup();s.message('campus-ready',s.w);s.message('campus-ready',s.frame.contentWindow,'https://other.test');
 expect(s.loading.classList.contains('is-ready')).toBe(false);
 s.message('campus-startup-error');expect(s.loading.textContent).toContain('暫時無法啟動立體場景');
 expect(s.loading.classList.contains('has-error')).toBe(true);
 s.message('campus-ready');expect(s.loading.classList.contains('is-ready')).toBe(true);s.dom.window.close();
});
it('a WebGL creation failure also provides recovery when opening the viewer directly',()=>{
 const dom=new JSDOM('<canvas id="webgl-canvas"></canvas>',{url:'https://campus.test/campus-explorer/index.html',runScripts:'outside-only'}),w=dom.window as any;
 w.THREE={WebGLRenderer:class{constructor(){throw new Error('WebGL unavailable');}}};
 const source=readFileSync('public/campus-explorer/explorer.js','utf8');
 expect(()=>w.eval(source.slice(source.indexOf('    const canvas ='),source.indexOf('    const scene =')))).toThrow('WebGL unavailable');
 const fallback=w.document.getElementById('campus-webgl-fallback');expect(fallback.getAttribute('role')).toBe('alert');
 expect(fallback.querySelector('button').textContent).toBe('重新載入');
 expect(fallback.querySelector('a').href).toBe('https://campus.test/campus-explorer/campus_plan_115.jpg');dom.window.close();
});
