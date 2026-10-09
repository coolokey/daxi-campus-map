# Shared Campus Spatial Plan Implementation Plan

> **For agentic workers:** Use subagent-driven-development for the independent UI integration and requesting-code-review for final verification. Track completed steps here.

**Goal:** 校正各棟教室樓層，並使場景、碰撞、導航、編輯格子與小地圖共用空間矩形。

**Architecture:** spatial-plan-data.js 保存可讀的平面圖配置與相容 ID；spatial-plan.js 將配置轉成世界座標、門口、走廊與樓梯。spatial-world.js 依模型產生牆／地板／導航，room-layout.js 與 minimap.js 共用模型而非另算位置。

**Tech Stack:** 原生 JavaScript、Three.js r128、React/Vite 外框、Vitest。

## 任務 1：資料與模型

- [x] 閱讀實際平面圖及照片，記錄可確認與示意尺度。
- [x] tests/spatial-plan.test.ts 先驗證 906=1F、907=1F、901=3F、804=2F、809=3F、704=2F、708=3F、computer-lab-1=1F；先執行 npm test -- tests/spatial-plan.test.ts 確認目前失敗。
- [x] 新增 public/campus-explorer/spatial-plan-data.js 與 spatial-plan.js；保留舊 ID，提供 cells、corridors、footprints、stairs、ramps、platforms、rooms、bounds、world、rect。
- [x] 改 walk-world-math.js 使真實建築使用共用模型，保留獨立測試輸入的示意 fallback。

## 任務 2：場景與導航

- [x] 改 spatial-world.js：由共用 cell 矩形生成房間、門縫、走廊護欄、樓梯開口與梯段；同一矩形生成碰撞。
- [x] 以可通行走廊連接各房門及各座樓梯，保留原目的地 ID 與樓層切換。
- [x] 以節點路線取代切角的平滑顯示；檢查所有導航路段與上下梯段。

## 任務 3：介面與小地圖

- [x] room-layout.js／css 依 cells 長度及順序繪製固定寬度比例、樓梯、廁所、穿堂、空缺；不再尾端統一補一座樓梯。
- [x] minimap.js 依 rooms.rect、corridors.rect、stairs.rect 繪製當層，配色更新時 invalidate。
- [x] 維持原 localStorage 年度鍵值、名稱安全顯示與鍵盤焦點管理。

## 任務 4：驗證與發布

- [x] npm test、npm run build。
- [x] 檢查頁面錯誤、所有目的地路徑、每條邊碰撞及所有樓梯上下；取新檔名截圖，保留既有 QA 修改。
- [x] 獨立審查修正後，只提交此次檔案，push 原 coolokey/daxi-campus-map main。
- [ ] 確認 Actions 成功及公開 JS／UI 已更新。

Ruling: 沿用原 checkout，使用者已授權更新原專案；不重設其現有 QA 修改。資料中的絕對長寬非測量，不宣稱測量還原。

驗證結果與尺度限制：見 docs/spatial-verification-2026-10-09.md。
