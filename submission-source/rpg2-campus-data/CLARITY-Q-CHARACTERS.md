# 原彩色校園 RPG 修正驗收

保留網址：https://coolokey.github.io/daxi-campus-map/proposal/rpg/ 。修改前備份：`rpg-before-clarity-field-20261013`。原導覽網站、校園圖與既有角色來源資料不變。

## 本次修正

- 主場景使用原始無損 PNG，Canvas 依實際螢幕尺寸與 DPR 繪製（上限 2），攝影機縮放 0.75；人物固定畫面尺寸，室內外共用攝影機座標。
- 原圖只有 1525 × 1031，並非真正 4K。改善繪製清晰度不會產生原圖沒有的細節。
- 91 位教師採用可重現的不同服裝、配色與配件。所有造型均為 RPG 創意改編，不代表實際穿著。
- 109 位角色採大頭短身 Q 版世界圖集；八方向、站立與兩張行走影格。對話載入同角色 512 × 640 半身像，並共用半徑內最近 NPC 選擇。
- 教師姓名 10 CSS 像素；學生不畫頭頂名稱，名冊去除「示意學生」字樣。
- 小地圖玩家加入深色外框、白色光暈、大箭頭與「你在這裡」，維持即時座標與面向。
- 移除覆蓋整個操場的碰撞框，保留建築與場內明確設施碰撞。三種世界比例都能走進跑道與草地。

## 測試與驗收方式

單元測試：`npx vitest run --maxWorkers=1`。素材測試：`node --test scripts/deterministic-style.node-check.cjs scripts/verify-rpg-characters.node-check.cjs`。

正式路徑建置：`npx vite build --base ./`；`node scripts/verify-startup.mjs`。首次 JavaScript 19998 bytes，全部 JavaScript 897766 bytes，維持原預算。

瀏覽器驗收以 Edge 無頭模式進行：桌面、820 × 1180 平板尺寸、390 × 844 與 320 × 568 手機、844 × 390 橫向。此為尺寸與觸控事件驗證，未聲稱實體 iPad Safari 測試。

- `verify-clarity-field.cjs`：DPR 1／2／3（繪製上限 2）、原 PNG 使用、小地圖座標誤差低於 1 像素、真實鍵盤操場路徑於 1／1.5／2 倍均通過。
- `verify-dialogue-style.cjs`：老師標籤大小、學生無標籤、最近 NPC 相符半身像、四種尺寸關閉對話。
- `verify-original-characters.cjs`：109 名冊、91 教師搜尋與邀請、玩家外觀保存、八方向三影格、NPC 自主移動、控制介面不重疊。
- `verify-character-recovery.cjs`：模擬角色 JSON 503，移動仍可操作，重試恢復全名冊。
- `verify-technology-pilot.cjs`：原校園行走至科技館、1F／2F 樓梯、教師對話、五道數學題、提示、獎勵與回到原位置及出口。
- `verify-published-rpg.cjs`：原數學任務、地圖比例、地圖關閉後操作與觸控地圖。

完整修改檔案清單在同資料夾 `pilot-changed-files.json`。主要程式：`src/presentation/{main,viewport,character-world,character-runtime,dialogue-portrait,interaction-target,pilot-renderer}.ts`、`character-world.css`、`src/game/world-hud.ts`、`src/game/data/maps/campus.ts`、角色匯出／樣式與驗收 scripts。完整原始碼保存在 `submission-source/rpg-source.zip`，不包含私人教師照片。

活動角色使用版本化 `rpg-characters-v3.json` 與 `style-v3` 圖集／半身像，避免既有網址的舊快取。既有發佈資源保留以支援舊快取。沒有新增真人在線人數或多人連線功能。

本次單元驗收：29 個測試檔、81 項測試全部通過；另有 4 項 Node 素材檢查全部通過。獨立程式審查發現的最近 NPC 選擇問題已修正並新增測試。
