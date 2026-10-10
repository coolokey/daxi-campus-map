# 報名 RPG 輕量啟動修正

前版雖精簡 Phaser，首次探索仍需約 851 KB JavaScript。本次報名版採用原生 Canvas，沿用校園與研究室地點、碰撞、入口及虛構 NPC 資料；數學題目保留原 React 元件，開始任務時才下載。原 Phaser 開發版與授權仍保留。

初始 JavaScript 依 HTML 入口與遞迴靜態 import 計算為 11,149 bytes，約減少 98.7%，不含地圖 458,220 bytes 與 CSS。`scripts/verify-startup.mjs` 要求初始程式低於 20 KB，且不可包含 Phaser 或 DemoQuest。

本機以實際頁面 profile 測得 126 ms 首次繪製，僅代表本機測量，不代表外網、冷快取或所有裝置的速度。公開版發布後另以瀏覽器確認。

驗證：TypeScript 與 Vite 建置通過、RPG 30 項測試、入口 2 項測試；實際按鍵移動進科技館、助教觸發任務、正確作答進入第 2 題、返回研究室後離開至校園。手機 390 × 844 檢查探索控制與答題版面。回到探索後再次開始任務保留本次題目進度；重新整理則重新開始。

入口網址維持 `https://coolokey.github.io/daxi-campus-map/proposal/`，RPG 位於 `#rpg`。報名版使用建置後 presentation.html 作為 rpg/index.html。
