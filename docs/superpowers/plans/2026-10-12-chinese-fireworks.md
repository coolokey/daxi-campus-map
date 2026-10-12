# 雙行繁體中文煙火實作計畫

> **For agentic workers:** Use executing-plans to implement this approved plan in this session.

**Goal:** 在既有校園導覽完成雙行粒子編隊，測試後部署相同網址。

**Architecture:** 保留 Three.js 共用場景、深度測試煙火與既有音效生命週期。使用合法 Noto Sans TC 在建置時採樣完整字形，輸出靜態點位，避免瀏覽器缺字與字體載入競態。只有文字粒子使用鏡頭對齊天空平面，避開既有介面。

**Tech Stack:** Three.js r128、JavaScript、Pillow、Vitest、Playwright、GitHub Pages。

## 1．時間軸與煙火
- [x] 修改 `tests/anniversary-fireworks.test.ts`：檢查 3／10／18／23／27／30 秒邊界、環狀向量及兩波文字發射。
- [x] 執行 `npx vitest run tests/anniversary-fireworks.test.ts --maxWorkers=1`，確認新規格失敗。
- [x] 修改 `anniversary-model.js`：新階段、六種煙火、文字波次與三種品質。

## 2．繁體字形與場景
- [x] 加入 Noto Sans TC 官方 OFL 授權與可重建採樣腳本，輸出兩行實際字形點位。
- [x] 修改 `tests/firework-scene.test.ts`：兩行粒子、不同成形時間、穩定展示、自然消散與釋放。
- [x] 修改 `firework-scene.js`：分波升空、散開後收束、鏡頭安全排版、環狀煙火。

## 3．控制與同步
- [x] 在生命週期測試加入畫質、低動畫及 dispose 檢查。
- [x] 修改控制器與 CSS：三種畫質、低動畫、夜幕倒數同步、移除 HTML 祝福替代文字。
- [x] 保留真實錄音、18 聲部限制、距離／方位音效及停止競態保護。
- [x] 同步嵌入式導覽的點位模組與授權資料。

## 4．驗收與部署
- [x] 更新瀏覽器驗收：實際兩行點位與安全邊界、錄音解碼、音量峰值、行走、縮放、回復。
- [x] 執行完整 Vitest 與建置，檢視桌面／平板／手機截圖，修正發現問題。
- [x] 記錄音效來源、自訂方式與實機 Safari 尚待驗證限制。
- [x] 僅提交本次變更，推送 main，等待 Pages 成功，重新驗證公開網址。
