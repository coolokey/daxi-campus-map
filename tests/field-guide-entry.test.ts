import {describe,expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';

const html=readFileSync('public/campus-explorer/index.html','utf8');
describe('手冊首頁在導覽程式載入前顯示',()=>{
 it('校慶煙火入口在首屏主視覺內，載入控制器前不提前開放',()=>{
  const dom=new JSDOM(html),cover=dom.window.document.querySelector('#guide-landing'),entry=cover?.querySelector<HTMLButtonElement>('.guide-hero #guide-anniversary');
  expect(entry).not.toBeNull();expect(entry?.disabled).toBe(true);expect(entry?.textContent).toContain('80 週年煙火秀');
  expect(cover?.querySelectorAll('.anniversary-cover-entry').length).toBe(1);expect(cover?.querySelector('#guide-start')).not.toBeNull();dom.window.close();
 });
 it('不執行 JavaScript 也有開啟的手冊首頁，且入口暫停操作直到就緒',()=>{
  const dom=new JSDOM(html);
  const cover=dom.window.document.querySelector<HTMLDialogElement>('#guide-landing');
  expect(cover).not.toBeNull();
  expect(cover?.open).toBe(true);
  expect(cover?.textContent).toContain('都有大溪的故事。');
  expect(cover?.querySelector<HTMLButtonElement>('#guide-start')?.disabled).toBe(true);
  dom.window.close();
 });
 it.each(['','?to=library','?view=bird'])('早期入口依連結參數決定是否顯示首頁：%s',query=>{
  const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://campus.example/'+query});
  expect(dom.window.document.querySelector<HTMLDialogElement>('#guide-landing')?.open).toBe(query==='');
  dom.window.close();
 });
});
