# 適量校園生態裝飾

依使用者要求，於全校適當地點增添花草、蝴蝶與蜻蜓，保留大片草地、清楚道路、入口、球場與停車區。

## 配置與密度

- 16 個資料配置區：校門樹列、南側樹列、活動中心旁、回收室旁、司令台東側、教學區空地、科技館／綜合大樓旁、七年級北側、池畔與椰林大道兩側。
- 最多 94 叢候選花草，經場地條件篩選；只在合適草地保留。原先連續草地上的細小花草紋理仍保留。
- 蝴蝶最多 12 個分散活動位置，附著花叢附近；4 隻蜻蜓配置於訓平池上方。桌機畫面最多同時可見 4 蝶／3 蜓，手機最多 2／2，非所有昆蟲一起顯示。
- 蝴蝶與蜻蜓緩慢移動及振翅；啟用 prefers-reduced-motion 時位置、翅膀及旋轉皆固定。

花草與昆蟲為遊戲景觀裝飾，並非校園物種調查結果。位置由 JSON 與固定種子決定，篩除碰撞物件、建築入口、道路、步道、停車區、球場、跑道及司令台，保留探索視野。未新增碰撞、角色或任務，也未修改原模型、樓層、原始素材及網址。

## 實作與效能

配置依 MapConfig 快取，比例切換時隨新地圖重新生成；靜態花草最多快取 12 張 128×96 小圖。畫面外物件略過，昆蟲依 CSS 螢幕寬度分配上限（<=640px 使用手機設定）。沿用既有繪製迴圈與腳點深度排序，沒有新增計時器、外部圖片、音效或下載負擔。

## 驗收

- 完整 Vitest：52 個測試檔、172 項通過。TypeScript 與正式 Vite build 通過。
- 1／1.5／2 倍驗證：數量適中、位置通過保護區檢查，配置不修改碰撞或入口，快取穩定。
- 昆蟲活動範圍：蝴蝶留在花叢附近、蜻蜓保持池面範圍，減少動態設定完全停止位移／翅幅變化。
- 手機上限：390／480／640 CSS 像素皆為 2 蝶／2 蜓；1024 CSS 像素為桌機上限。
- 桌機實際查看校門、樹列與訓平池／球場區，花草保持小群落，道路與球場清楚；既有導航可正常到達球場。
- 瀏覽器 390×844、480×844 尺寸檢查：人物、花草、操作鍵與小地圖可見；無 error／warn。未使用實體手機或量測實機 FPS。
- 唯讀審查發現手機斷點使用邏輯寬度的問題，已改實際 CSS 寬度並補測；複查未發現剩餘阻擋問題。
- 公開部署與檔案比對紀錄位於 output/ecology-qa/published-verification.json，截圖同資料夾。

## 修改清單與備份

新增 public/data/campus-ecology-v1.json、src/presentation/campus-ecology.ts、ecology-renderer.ts、campus-ecology.test.ts、scripts/stage-ecology-release.py、本報告與 docs/superpowers/plans/2026-11-01-campus-ecology.md。修改 src/presentation/model-renderer.ts。

正式產物仍位於 public/proposal/rpg，更新來源 ZIP，新增 submission-source/rpg2-campus-data/ecology 驗收紀錄。

備份 backups/rpg-before-ecology-20261101.zip；Git 分支 backup/rpg-before-ecology-20261101，原提交 85e744782a8dfc2e97bb78df1e19d3b44af5e03d。
