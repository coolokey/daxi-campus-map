import {describe,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {JSDOM} from 'jsdom';

function setup(query='',omit:string[]=[]){
 const path='public/campus-explorer/';
 const dom=new JSDOM(existsSync(path+'gate.html')?readFileSync(path+'gate.html','utf8'):'<body></body>',{url:'https://school.example/campus-explorer/gate.html'+query,runScripts:'outside-only'});
 const w=dom.window as any;
 w.HTMLElement.prototype.scrollIntoView=function(){};
 if(existsSync(path+'gate-guide.js'))w.eval(['campus-data.js','spatial-plan-data.js','room-layout-model.js','gate-guide-model.js','gate-guide.js'].filter(f=>!omit.includes(f)).map(f=>readFileSync(path+f,'utf8')).join('\n;\n'));
 return {w,d:w.document,dom};
}

describe('校門口手機路線卡',()=>{
 it.each([['campus-data.js','spatial-plan-data.js'],['spatial-plan-data.js'],['room-layout-model.js'],['gate-guide-model.js']])('stops rather than showing stale locations if dependencies fail: %s',(...omitted)=>{
  const {d,dom}=setup('?to=counseling',omitted);
  expect(d.getElementById('gate-feedback').textContent).toContain('未能載入');
  expect(d.getElementById('gate-feedback').textContent).toContain('警衛室');
  expect(d.getElementById('gate-results').children).toHaveLength(0);
  expect(d.getElementById('gate-search').disabled).toBe(true);
  dom.window.close();
 });
 it('does not create a 3D frame until requested and selecting an office requires a start action',()=>{
  const {d,dom}=setup();
  expect(d.querySelector('[data-room="academic"]')).not.toBeNull();
  expect(d.querySelector('iframe')).toBeNull();
  d.querySelector('[data-room="academic"]').click();
  expect(d.getElementById('gate-confirm').hidden).toBe(false);
  expect(d.getElementById('gate-route').hidden).toBe(true);
  expect(d.getElementById('gate-place').textContent).toContain('行政大樓');
  expect(d.getElementById('gate-place').textContent).toContain('2F');
  dom.window.close();
 });
 it('keeps real-world steps manual, requires final confirmation, and reselects without a stale preview',()=>{
  const {d,w,dom}=setup('?to=academic');
  d.getElementById('gate-start').click();
  expect(d.getElementById('gate-route').hidden).toBe(false);
  const before=d.getElementById('gate-step-title').textContent;
  w.dispatchEvent(new w.MessageEvent('message',{data:{type:'arrived'}}));
  w.dispatchEvent(new w.CustomEvent('campus:navigation',{detail:{status:'arrived'}}));
  expect(d.getElementById('gate-step-title').textContent).toBe(before);
  d.getElementById('gate-preview').open=true;
  d.getElementById('gate-preview').dispatchEvent(new w.Event('toggle'));
  expect(d.querySelector('iframe').getAttribute('src')).toContain('to=academic');
  expect(d.querySelector('iframe').getAttribute('src')).toContain('gatePreview=1');
  d.getElementById('gate-preview').open=false;
  d.getElementById('gate-preview').dispatchEvent(new w.Event('toggle'));
  expect(d.querySelector('iframe')).toBeNull();
  expect(d.getElementById('gate-step-title').textContent).toBe(before);
  let guard=0;
  // Advance while the next action is available; completion must remain separate.
  while(!d.getElementById('gate-next').hidden&&guard++<20)d.getElementById('gate-next').click();
  expect(d.getElementById('gate-done').hidden).toBe(true);
  expect(d.getElementById('gate-finish').hidden).toBe(false);
  d.getElementById('gate-finish').click();
  expect(d.getElementById('gate-done').hidden).toBe(false);
  d.getElementById('gate-reset').click();
  expect(d.querySelector('iframe')).toBeNull();
  expect(d.getElementById('gate-select').hidden).toBe(false);
  dom.window.close();
 });
 it('shows truthful recovery for unknown destinations and unverified business terms',()=>{
  const {d,w,dom}=setup('?to=__proto__');
  expect(d.getElementById('gate-feedback').textContent).toContain('找不到');
  const q=d.getElementById('gate-search');q.value='註冊';q.dispatchEvent(new w.Event('input'));
  expect(d.getElementById('gate-results').textContent).toContain('警衛室');
  expect(d.querySelector('#gate-results [data-room]')).toBeNull();
  dom.window.close();
 });
 it('resolves old counseling links to the canonical building, without advancing on refresh',()=>{
  const {d,dom}=setup('?to=counseling');
  expect(d.getElementById('gate-place').textContent).toContain('綜合大樓');
  expect(d.getElementById('gate-place').textContent).toContain('2F');
  expect(d.getElementById('gate-route').hidden).toBe(true);
  d.getElementById('gate-start').click();
  expect(d.getElementById('gate-step-body').textContent).toContain('詳細步行指引尚未確認');
  expect(d.getElementById('gate-finish').hidden).toBe(true);
  dom.window.close();
 });
});
