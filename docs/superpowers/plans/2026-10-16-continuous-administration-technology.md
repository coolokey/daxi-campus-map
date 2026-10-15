# 連續行政樓與科技館比例修正

**Goal:** 依 Word 標示與五角度空拍，把行政大樓編譯成一整棟相連建築，修正科技館長翼，發布原網址。

**Architecture:** 保留行政入口部分的基準座標，profile 明確定義入口橫體、內側橫體及中央連接區。同一 layout 的 union 同時供場景、物理、房間與導航使用；前部屋頂仍只覆蓋前部。尺度為照片比例示意。

**Tech Stack:** 現有 Three.js、共用 spatial-plan、Vitest、GitHub Pages。

- [x] 先測試 BUILDINGS_CONFIG 只有一個行政樓，原處室 ID 均歸該樓；上層三區在同一 layout 連續。
- [x] 合併 campus-data／spatial-plan-data，spatial-plan 以明確區域合成，保留原房間 ID 與樓層。
- [x] spatial-world 封合連接區窗牆、補穿堂柱，photo-roofs 連續覆蓋內側橫體與連接區；photo-facade 只處理入口橫體。
- [x] 科技館主體與長翼各約半數全長，翼寬約主體寬的三分之一，交接處保留半圓突出；藝術館位於翼端。
- [x] 執行 npm test -- tests/spatial-plan.test.ts tests/photo-roofs.test.ts tests/photo-facade.test.ts tests/outdoor-world.test.ts --maxWorkers=1，及 node scripts/verify-spatial-world.cjs qa/continuous-buildings-2026-10-16/spatial-verification.json。
- [ ] 獨立程式審查，桌面／手機瀏覽器檢查，npm run build，同步嵌入版，commit／push，確認同 SHA 部署成功與原網址畫面。

## 參考核對

Word 原檔各棟大樓名稱說明.docx 的箭頭與五張新空拍已交叉查看。行政樓是工形相連量體，上次兩 config＋獨立橋與不同名稱不符合使用者要求；科技館的 8×8 凸翼過短。新模型的前部、後部尺寸與間距按照片相對調整；一樓中央底部照片受樹木遮擋，維持有柱穿堂，不新增未確認的密閉處室。
