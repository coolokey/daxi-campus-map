# RPG 第一次載入改善

## 根因與修正

原本 HTML → React → 動態下載完整 Phaser → 載入地圖，是串行啟動。完整 Phaser 包含本遊戲未使用的 WebGL、音效與其他模組。

- 以已安裝 Phaser 3.90 官方 core 建置，補上此遊戲使用的 Arcade Physics、Container、Rectangle、Arc/Circle 工廠及 Rectangle.Contains，保留原有遊戲場景。
- 建置時使用 Phaser 官方設定中的 feature switches，只啟用 Canvas renderer。開發模式仍使用完整官方套件；production 使用精簡入口。
- Phaser 從 1,196,912 bytes 降至 604,497 bytes，約減少 49.5%。gzip 約由 318.7 KB 降至 162.2 KB。
- 全部 JavaScript 從 1,442,560 bytes 降至 851,160 bytes，約減少 41%。
- HTML modulepreload 提早下載場景與引擎，image preload 與原生 image loader 讓地圖也同步下載；消除等待 React effect 後才開始請求的順序。
- 真正完成首幀繪製後才移除載入提示；必要圖檔失敗會顯示可重新整理的錯誤訊息。
- 保留 Phaser MIT 授權於 RPG 的 Phaser-LICENSE.md。

## 驗證

- RPG 19 個測試檔、27 項通過，含新增的載入完成／錯誤訊息測試。
- TypeScript 與 Vite 建置成功。
- scripts/verify-startup.mjs：JavaScript 上限 900,000 bytes、引擎及地圖須由 HTML 預載入。修正前因 1,442,560 bytes 失敗，修正後通過。
- 本機 profile：HTML 開啟後約 70ms 同時開始下載 React、引擎、場景與地圖，首幀約 524ms。這是該次 localhost 測量，非公開網路冷快取保證。
- 實際 production Canvas 場景顯示、快速數學任務、首幀提示消失、研究室 Rectangle 與搖桿 Circle、人物從 x=260 向右移動至牆邊均已驗證。
- 本機測試頁 engine-smoke 僅保存於 qa，重新封裝時排除，不納入公開成品。
