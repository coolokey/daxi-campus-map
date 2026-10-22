# 校門口手機找處室 Implementation Plan

> **For agentic workers:** Use subagent-driven-development for the independent data/model task and requesting-code-review for final review. Track steps below.

**Goal:** 發布從正門出發的手機處室指引，文字先行、按需載入 3D。

**Architecture:** 新增 campus-explorer/gate.html，直接讀取現有 campus-data.js、spatial-plan-data.js、room-layout-model.js。gate-guide-model.js 提供純資料處理與步驟狀態，gate-guide.js 負責 DOM 與按需建立 iframe。首頁以一般連結進入，不等待 3D 初始化。

**Tech Stack:** 原生 HTML/CSS/JavaScript、Vitest／JSDOM、既有 Vite 打包及 GitHub Pages。

## Task 1：資料與路線模型

- [ ] 新增 tests/gate-guide-model.test.ts，測試 canonical 輔導室位置、保留自訂名稱、別名安全、未知 ID、下一步界限、完成確認與無導航事件自動推進。
- [ ] 執行 `node node_modules/vitest/vitest.mjs run tests/gate-guide-model.test.ts --maxWorkers=1`，先觀察缺功能失敗。
- [ ] 新增 public/campus-explorer/gate-guide-model.js，以 `window.CampusGateGuide` 暴露 `catalog(buildings, savedNames)`、`search(rooms, query)`、`guide(room)`、`advance(state, action, total)`。
- [ ] 路線內容只使用平面圖已確認的建築／樓層與 entryHint。行政大樓可提供地標核對階段，其他建築缺完整路線時不虛構轉彎與樓梯。全程標為平面圖參考，未現場實測。
- [ ] 跑同一測試，檢查保存名稱不寫 localStorage，辦事關鍵字不猜承辦單位。

## Task 2：手機頁面與入口

- [ ] 新增 gate.html、gate-guide.css、gate-guide.js，建立選處室／確認／分段卡／確認門牌／完成流程。以米白、深綠與大字級延續現有手冊風格。
- [ ] 新增 tests/gate-guide.test.ts，先驗證資料缺失、手動進度、未知目的地、預覽按需載入及 iframe 事件不推進。
- [ ] 加入首頁一般連結、導覽內常駐入口、預覽專用簡化樣式；保留既有首頁與導航。
- [ ] gate.html 的 `?to=` 支援固定 ID 與已存在的舊 ID alias；重新載入回到起點確認。
- [ ] scripts/sync-anniversary.cjs 同步新 HTML／JS／CSS，正式與嵌入入口均可用。腳本僅將連到實際存在的來源檔案。

## Task 3：驗證與發布

- [ ] 執行模型、UI 及既有 field-guide、entry、routing、room-name 測試；`npm run build` 成功。
- [ ] 預覽 build 的正式路徑，操作 320／390／430 寬度、手機橫向、鍵盤與無結果；確認路線卡可在封鎖 3D 請求時使用。
- [ ] 正式與 proposal 各驗證入口、目的地、iframe 預覽與資產 404／console errors，保存結果至 qa/gate-office-guide-2026-10-22。
- [ ] 最終程式碼審查並修正發現；檢查遠端是否更新，僅以 fast-forward push 發布 main，等待對應 SHA 的 Actions 成功。
- [ ] 公開站重跑關鍵流程並回報實際發布網址與驗證限制。

## Rulings

- 現場完整路線尚無逐點勘查證據。使用已核對圖面提供「地標／入口確認」卡，不標示現場已驗證；缺乏入口與樓梯細節時明示向警衛室確認，不補造方向。
- 使用者已明確要求修改後發布，直接完成實作、驗證與發布，不重複詢問執行方式。
- Codex 管理工具因目前聊天根目錄不是 Git 儲存庫而失敗，已用 git worktree 從 origin/main 建立獨立分支，原工作目錄不變更。
