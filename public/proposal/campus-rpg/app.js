// 桃園市立大溪國中 真實版 RPG - 應用程式啟動入口 (Application Bootstrapper)

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('world');
  if (!canvas || !window.CampusRpgData) {
    console.error('Canvas or CampusRpgData not found!');
    return;
  }

  // Initialize RPG Engine
  const engine = new window.RpgEngine(canvas);
  engine.init(window.CampusRpgData);

  // Initialize RPG UI Manager
  const ui = new window.RpgUiManager(engine, window.CampusRpgData);

  // Expose to window for debugging & scripting
  window.rpgEngine = engine;
  window.rpgUi = ui;
  window.campusRpg = {
    engine,
    ui,
    audio: window.rpgAudio,
    data: window.CampusRpgData
  };

  // Welcome Toast Notification
  const welcomeToast = document.createElement('div');
  welcomeToast.className = 'welcome-toast';
  welcomeToast.innerHTML = `
    <strong>👋 歡迎來到大溪國中 115 學年度真實校園 RPG！</strong>
    <p>使用鍵盤方向鍵／WASD 移動角色，接近師長或建築按 <b>E</b> 進行互動。</p>
  `;
  document.body.appendChild(welcomeToast);
  setTimeout(() => {
    welcomeToast.classList.add('fade-out');
    setTimeout(() => welcomeToast.remove(), 600);
  }, 4500);

  console.log('大溪國中真實版 RPG 校園導覽系統已成功啟動！');
});
