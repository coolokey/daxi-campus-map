# 正式平面圖對照、科技館示範與逐棟擴充驗收

日期：2026-10-14

## 交付範圍
- 原彩色校園、八方向 Q 版角色、名冊、對話半身像、原版數學任務與正式網址保留。
- 新增年度對照資料 campus-plan-115.json，對照 12 個建築資料項、92 個空間紀錄、正式圖裁切範圍與待確認項目。行政前／後棟是同一建築的兩個資料分區。
- 開放 11 個建築分區、27 個獨立樓層、76 個來源空間。科技館保留原 2 層並補齊教室巡檢目標；新增 25 個樓層場景。
- 科技館理化實驗室新增陳小鈴老師遊戲 NPC，沿用原 5 題任務及半身像；電腦教室二原機器人任務保留。NPC 配置為遊戲位置，不是老師真實辦公位置。
- 新增校園建築／樓層／教室目錄、正式平面圖預覽、避障金色路線及跨樓層下一入口提示。玩家沿線手動移動，沒有自動行走。
- 小地圖切換至目前樓層，顯示空間輪廓、玩家、NPC、入口與避障路線。自訂目標覆蓋舊目錄目標；縮放後重新計算路線。
- 樓梯雙向傳送、出口返回原室外位置；行政前／後棟以同樓層連通廊連接，原始分區資料保持不變。

## 限制與暫緩項目
- 七年級新大樓與特教園地：704、708 等教室樓層與導覽來源衝突，暫不開放，不自行推測移動教室。
- 活動中心：只開放正式圖可確認的 1F；導覽中的 2F／3F 不開放。
- 其餘待確認空間名稱保留。科技館 TC-NE-2 依正式圖改為「科技創作教室」；較模糊文字不猜測定名。
- 樓層外形、門位、梯段與尺寸仍為導覽示意；彩色圖入口是可走的遊戲錨點，不等同實測校園入口。此次沒有重畫室外建築，不能宣稱全校已完成忠於實景的 2.5D 分層地圖。
- 室外樹冠／屋頂完整遮擋及真正多人連線不在本次交付範圍。

## 測試結果
- TypeScript：tsc -b 通過。
- Vitest：32 個測試檔、99 項測試通過。涵蓋原任務、地圖、角色與新增功能。
- Node 資產與造型檢查：4 項通過。
- 新增幾何檢查：1／1.5／2 倍下，25 個新增樓層所有登錄空間中心、樓梯及出生點可達；科技館 10 個空間可達；室外 11 個入口可由起點抵達；傳送目的地存在。
- 真實鍵盤科技館回歸：室外 → 1F → 2F 電腦教室二 → 原機器人任務 → 5 題與錯誤提示 → 同位置返回 → 下樓 → 室外，通過。
- 真實鍵盤新增流程：科技館 2F 理化實驗室 → 陳小鈴老師對話及半身像 → 5 題 → 同位置返回；再離開科技館到藝術館 1F／2F／3F／4F 美術教室；再下樓經室外與行政連通廊到前棟 3F，通過。
- 桌面、iPad 尺寸、390 px 手機、320 px 小手機與手機橫向目錄／觸控檢查通過。這是瀏覽器尺寸模擬，非所有實體裝置測試。
- 上述瀏覽器流程中，角色腳底未進入碰撞區，頁面程式錯誤與 HTTP 資源失敗均為 0。
- 程式唯讀複查確認導航縮放與目標覆蓋問題修正；未發現新增阻斷問題。

## 恢復與保護
來源備份：F:\1151005---創意教學\backups\rpg-before-plan-expansion-20261014.zip

備份 SHA-256：C40793D2858801C8FC41F31C31FB30D3E7A0A7E2F076EAE895C22FFFCE453A66

Git 恢復分支：backup/rpg-before-plan-expansion-20261014，起點 3090e430afd6ec6005d0ebdd4b681e5e231a40fd。

原始平面圖保持唯讀，公開預覽為逐位元相同副本。原導覽與原始 RPG 專案未編輯。發布僅限 public/proposal/rpg 與 submission-source 來源／驗收封存。

## 可重跑命令
```powershell
python scripts/build-plan-crosswalk.py
npx tsc -b
npx vitest run --maxWorkers=1
node --test scripts/verify-rpg-characters.node-check.cjs scripts/deterministic-style.node-check.cjs
node node_modules/vite/bin/vite.js build --base ./
python scripts/stage-technology-release.py
$env:CAMPUS_QA_URL='http://127.0.0.1:8773/proposal/rpg/'
node scripts/verify-technology-pilot.cjs
node scripts/verify-plan-expansion.cjs
```

詳列資料見 115-plan-crosswalk.md。正式站實測紀錄另保存 live JSON，發布成功與否以該紀錄及 GitHub Actions 結果為準。
