import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

function setup(width = 390, query = '') {
 const dom = new JSDOM(`<body><div id="welcome-card"></div><div class="search-box"><input id="search-input"></div><div class="top-actions"><div id="campus-main-controls"><button id="btn-walk"></button></div></div><div id="floor-selector"></div><div id="scene-toolbar"></div><div id="nav-hud"><div id="hud-target-name"></div><button id="btn-auto-walk">自動帶路</button><button id="btn-cancel-nav">取消</button></div></body>`, { runScripts: 'outside-only', url: `https://campus.example/${query}` });
 const w = dom.window as any;
 w.innerWidth = width;
 w.HTMLDialogElement.prototype.showModal = function() { this.setAttribute('open', ''); };
 w.HTMLDialogElement.prototype.close = function() { this.removeAttribute('open'); };
 w.HTMLElement.prototype.scrollIntoView = function() {};
 let walks = 0;
 const hud = w.document.getElementById('nav-hud');
 w.document.getElementById('btn-walk').onclick = () => walks++;
 w.document.getElementById('btn-cancel-nav').onclick = () => hud.classList.remove('visible');
 w.campusExplorer = { manualTakeover() {}, rooms: {
  library: { id: 'library', name: '圖書室', buildingId: 'multi-building', buildingName: '綜合大樓', floor: 1, code: 'LIB-1' },
  grandstand: { id: 'grandstand', name: '司令台', floor: 1, code: 'OUT-STAND' },
 }, navigateToRoom(id: string) { hud.dataset.destination = id; hud.classList.add('visible'); } };
 w.eval(readFileSync('public/campus-explorer/field-guide.js', 'utf8'));
 return { dom, w, hud, walks: () => walks, tick: () => new Promise(resolve => w.setTimeout(resolve, 0)) };
}

describe('探索手冊導覽卡', () => {
 it('手機選取目的地後收合手冊，但帶路按鈕保留在獨立卡片', async () => {
  const s = setup();
  s.w.document.getElementById('guide-start').click();
  expect(s.walks()).toBe(1);
  s.w.document.getElementById('guide-toggle').click();
  s.w.campusExplorer.navigateToRoom('library');
  await s.tick();
  expect(s.w.document.body.classList.contains('guide-collapsed')).toBe(true);
  const dock = s.w.document.getElementById('guide-route');
  expect(dock.hidden).toBe(false);
  expect(dock.closest('#guide-panel')).toBeNull();
  expect(dock.contains(s.w.document.getElementById('btn-auto-walk'))).toBe(true);
  expect(dock.textContent).toContain('綜合大樓');
  expect(dock.textContent).toContain('LIB-1');
  s.dom.window.close();
 }, 20000);
 it('切換目的地更新照片年代，取消導覽隱藏卡片', async () => {
  const s = setup(1280);
  s.w.campusExplorer.navigateToRoom('grandstand');
  await s.tick();
  expect(s.w.document.getElementById('guide-place-photo').getAttribute('src')).toBe('photos/stage-2019.jpg');
  expect(s.w.document.getElementById('guide-place-caption').textContent).toContain('2019');
  expect(s.w.document.getElementById('guide-place-meta').textContent).toContain('戶外景點');
  s.w.campusExplorer.navigateToRoom('library');
  await s.tick();
  expect(s.w.document.getElementById('guide-place-figure').hidden).toBe(true);
  s.w.document.getElementById('btn-cancel-nav').click();
  await s.tick();
  expect(s.w.document.getElementById('guide-route').hidden).toBe(true);
  s.dom.window.close();
 });
 it('目的地深層連結保留直接進場，且不強制切換步行', () => {
  const s = setup(390, '?to=library');
  expect(s.w.document.getElementById('guide-landing').open).toBe(false);
  expect(s.walks()).toBe(0);
  s.dom.window.close();
 });
});
