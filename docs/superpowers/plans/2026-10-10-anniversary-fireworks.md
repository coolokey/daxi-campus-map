# Anniversary Fireworks Implementation Plan

**Goal:** 在立體校園加入已確認的八十週年煙火彩蛋與可選音效。

**Architecture:** 獨立時間與粒子形狀模型、Canvas 視覺／dialog 互動、Web Audio 合成音效。沿用既有傳統 script 打包流程。

**Tech Stack:** 原生 JavaScript、Canvas 2D、Three.js 既有場景、Web Audio、Vitest、Playwright。

- [x] 建立 `tests/anniversary-fireworks.test.ts`，驗證入夜、煙火、80、自由發射的時間邊界、形狀點位與重播時間。先執行測試確認缺少模型失敗。
- [x] 建立 `public/campus-explorer/anniversary-model.js`，公開純函式 `phaseAt(ms)` 與 `shapePoints(shape,count)`，執行模型測試。
- [x] 建立 `anniversary-fireworks.js` 與 `.css`，整合 dialog、蛋糕入口、煙火尾跡、光點 80、夜景恢復、聲音、焦點控制、減少動態及分頁暫停；在 HTML 末尾依序引入。
- [x] 執行 `npm test` 與 `npm run build`。
- [x] 新增並執行 `scripts/verify-anniversary.cjs`，使用正式預覽驗證互動、恢復與手機排版，截圖存於 `qa/anniversary/`。
- [x] 更新 README 操作方式，確認變更範圍與交付結果。
