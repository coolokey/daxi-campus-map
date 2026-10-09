# 照片逐項改善實作計畫

**Goal:** 依已核准照片報告完善戶外設施、入口及實景資料，保持人物動線與公開網址。
**Architecture:** outdoor-plan.js 提供幾何／高度與 footprint；outdoor-world.js 渲染及登録碰撞；spatial-world.js 編譯戶外路線；photo-reference.js 管理圖集。
**Tech Stack:** Three.js r128、JS、Vitest、jsdom、Vite。

## Task 1：戶外高差及導航
- [x] 在 tests/outdoor-world.test.ts 寫司令台由地面上台、下台、側壁防穿及導航實際到達的失敗測試。
- [x] 執行 `npm test -- tests/outdoor-world.test.ts` 確認缺少高差的失敗。
- [x] 新增 outdoor-plan.js 與 outdoor-world.js，替換 createTrackAndPlatform；spatial-world.js ground、grid、route 共用其高度資料。
- [x] 原測試載入新模組；驗證全部圖邊與真實人物上下。

## Task 2：美術與入口
- [x] 依照片補司令台前額、階梯、旗台、六道字與雙球場。
- [x] art-direction.js 加步道、樹穴、分段斜牆；行政入口附件独立於被移除樓層群組，保持門口暢通。
- [x] minimap.js 從 outdoor-plan 取設施矩形、顏色及位置，沿用共享樓層資料。

## Task 3：照片來源介面
- [x] 以原始照片縮出專案圖集，保留原檔；photo-reference.js 提供分區、日期、來源限制及導覽連結。
- [x] 實際 DOM 驗證頁籤、移動停止、關閉焦點及可讀日期。
- [x] 修正歷史分析文件的已被取代資訊提示，保留歷史內容。

## Task 4：驗收與發布
- [x] 執行 `npm test`、`npm run build`、`node scripts/verify-spatial-world.cjs`。
- [x] 瀏覽器驗證司令台上下及碰撞，桌機／手機圖集與畫面；整合 GPT-6 Astra 美術審查。
- [x] 只提交本次修改與證據，保留原有 QA 修改；push 原 main，確認原 repo 的 Actions 成功。
