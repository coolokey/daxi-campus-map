# 校園視覺改善 Implementation Plan

> For agentic workers: use subagent-driven-development for focused implementation and requesting-code-review for review; execute the user's requested sequence without another confirmation.

**Goal:** 精簡探索 UI、改善材質與校外環境，再依四張照片修正校門／警衛室並發布。

**Architecture:** 沿用 field-guide 與 Three.js 的共用場景及碰撞索引；獨立小型材質／環境模組，或於既有入口 renderer 精修。正式與 proposal 共用同步建置。

**Tech Stack:** 原生 JavaScript/CSS、Three.js、Vitest/JSDOM、Vite、GitHub Pages。

## 工作與檢查點

- [ ] Task 1：field-guide.js/css、mobile-layout.css、tests/field-guide.test.ts。先測手冊預設收起與一般桌面工具可開關，再實作細長主要工具列、次要工具收合；保留手機與 ready/walking/arrived 回歸。執行 node node_modules/vitest/vitest.mjs run tests/field-guide.test.ts --maxWorkers=1。
- [ ] Task 2：檢查 photo-facade.js、landscape-world.js、entrance-avenue.js、art-direction.js 與 script 順序。材質使用 CanvasTexture／共用材質，不增大圖片下載；優先行政入口與已存在鋪面，以視覺檢查確認紋理尺度。
- [ ] Task 3：在入口椰林／邊界既有幾何上補路緣、道路材質、低細節背景；檢查不產生重疊地面閃爍、不堵 gate 到 plaza 通行。
- [ ] Task 4：explorer.js 的 createGatePylonTexture、createCampusEntrance／門塔／警衛室段（必要時抽獨立 renderer 模組），tests/gate-axis.test.ts 與入口幾何回歸。四張參考照均先 view_image。改紅雙坡屋頂、米白藍牆、窗門、塔身裝飾，保留既有 entrance.world 與通行軸；先測幾何／motor 開口再改。
- [ ] Task 5：審查範圍內變更與測試，npm run build、git diff --check、相關 UI／floor／entry／gate／collision 測試、scripts/audit-navigation.cjs。以 cua_repl 實際測試矩陣，保存 qa/campus-visual-polish-2026-10-23。
- [ ] Task 6：精確 stage 本輪檔案，提交與 fast-forward push origin HEAD:main；等待 SHA 對應 Pages 成功，公開正式及 proposal 各測入口、桌面／手機與帶路、console 與資產 HTTP。交付實際網址及截圖。

## 執行紀錄

初始檢查：origin/main 與工作分支均為 fbb6f59；沒有既有 tracked 變更。四張照片已逐張檢視。只以照片可見形制修正，尺寸仍為示意。
