const content = document.querySelector('#content');
let pendingTimer;

function renderRoute() {
  clearTimeout(pendingTimer);
  const [mode, query = ''] = location.hash.slice(1).split('?');
  document.querySelectorAll('nav a').forEach(link => {
    if (link.hash === `#${mode}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const exploring = mode === 'rpg' || mode === 'campus';
  document.body.classList.toggle('exploring', exploring);
  if (!exploring) {
    content.replaceChildren(document.querySelector('#home-template').content.cloneNode(true));
    document.title = '大溪智慧學園｜校園探索與學習任務';
    if (mode === 'progress' || mode === 'demo-guide') requestAnimationFrame(() => document.getElementById(mode)?.scrollIntoView());
    else window.scrollTo(0, 0);
    return;
  }
  const rpg = mode === 'rpg';
  document.title = `${rpg ? 'RPG 學習任務' : '立體校園導覽'}｜大溪智慧學園`;
  const source = new URL(rpg ? './rpg/' : './campus/', location.href);
  if (rpg) source.searchParams.set('presentation', '1');
  else {
    const destination = new URLSearchParams(query).get('to');
    if (destination) source.searchParams.set('to', destination);
  }
  content.innerHTML = `<section class="experience-shell"><div class="experience-heading"><div><p class="eyebrow">${rpg ? '01 · LEARNING ADVENTURE' : '02 · CAMPUS EXPLORER'}</p><h1>${rpg ? 'RPG 校園探索與數學任務' : '校園探索導覽'}</h1></div><div class="experience-actions"><a class="button button-outline" href="#home">返回展示首頁</a><a class="standalone" target="_blank" rel="noopener">獨立開啟 ↗</a></div></div><p class="mode-note">${rpg ? '可自由探索，或點選「快速體驗數學任務」。本次為虛構研究員與規則式教學回饋。' : '搜尋處室或教室，查看樓層與路線。模型與導航為示意，尚未逐一校核現地動線。'}</p><div class="frame-wrap"><p class="frame-status" role="status">正在載入${rpg ? '學習世界' : '立體校園'}…</p></div></section>`;
  const frame = document.createElement('iframe');
  frame.title = rpg ? 'RPG 校園探索與數學任務' : '大溪國中立體校園導覽';
  frame.allow = 'fullscreen';
  frame.src = source.href;
  content.querySelector('.standalone').href = source.href;
  const status = content.querySelector('.frame-status');
  frame.addEventListener('load', () => { clearTimeout(pendingTimer); status.hidden = true; });
  content.querySelector('.frame-wrap').append(frame);
  pendingTimer = setTimeout(() => { status.textContent = '載入時間較長，可使用上方「獨立開啟」，或重新整理再試。'; }, 20000);
  window.scrollTo(0, 0);
  content.focus({ preventScroll: true });
}
window.addEventListener('hashchange', renderRoute);
renderRoute();
