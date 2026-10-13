# 科技館可玩示範與發布驗收

> 本文件記錄先前獨立示範版本。使用者後續確認須保留原彩色校園，最新實作已撤下室外示範切換，請以 ORIGINAL-CAMPUS-CHARACTERS.md 為準。

日期：2026-10-13。保留既有 GitHub Pages 網址；本階段僅更新 `/proposal/rpg/` 的 RPG 成品與可重建來源快照。校園導覽程式與原始平面圖素材不修改。可恢復基準標籤：`rpg-before-integration-20261013`。

## 已完成

- 預設仍進入原校園；點「科技館 2.0 示範」按需載入共用資料與示範幾何，可返回原模式。
- 沿用 Canvas 的移動、碰撞、鏡頭、對話及 React 五題數學任務；沒有重寫網站。獨立副本為 `future-campus-rpg-2-experiment`。
- 校門 → 來源科技館入口 → 1 樓走廊 → 南翼樓梯 → 2 樓電腦教室二 → 虛構任務導師 → 原版任務 → 返回原地 → 下樓出館。
- 來源 x／z／height 轉換為遊戲 x／y；比例 1、1.5、2 倍同步調整建築、碰撞、出生點、傳送區、任務 NPC、巡檢路線與導航目標。角色固定尺寸。
- 小地圖即時切換室外／1 樓／2 樓，標示玩家朝向、入口與 NPC；保留點選全圖導航。現有左下觸控按鍵與右下小地圖互不重疊。
- 碰撞使用來源高度範圍，樓梯由對稱傳送點連接；縮小比例時重新尋找有效腳底位置，並保留傳送鎖定，避免卡牆與原地來回切層。
- 12 棟建築、92 個空間、13 組樓梯採導覽最終資料；21 個未確認名稱仍標記待確認。

## 驗證

| 項目 | 結果與範圍 |
| --- | --- |
| `pnpm exec vitest run --maxWorkers=1` | 22 個檔案、42 項通過，包含原任務與新增轉接器 |
| `pnpm exec tsc -b` | 通過 |
| `pnpm exec vite build --base ./` | 通過；使用正式子路徑可用的相對資源網址 |
| `node scripts/verify-startup.mjs` | 初始 JavaScript 19,953 bytes，小於原 20,000 上限；題目與示範地圖延後載入 |
| 共用資料檢查 | 11 項通過；92 個房間可達，示範 440 個節點碰撞掃描無阻擋 |
| 瀏覽器完整流程 | Microsoft Edge／Chromium 真實鍵盤行走、上下樓、互動、答錯提示、5 題完成、單次完成事件、原地返回、反向下樓出館通過 |
| 原模式回歸 | NPC 自主移動、三比例、小地圖導航後鍵盤恢復、NPC 對話、既有數學任務通過 |
| 響應式 | 1440×900、820×1180、390×844、320×568、844×390；無橫向溢位，小地圖不蓋移動按鍵，觸控開關全圖通過 |

瀏覽器報告：`pilot-local-browser-check.json`、`original-mode-local-check.json`；正式站報告於發布後附加。測試使用桌面瀏覽器模擬尺寸及觸控，未宣稱已實測實體 iPad／Safari。長路段依距離設定等待時間；全圖關閉等待 close 事件完成後才送出鍵盤，避免測試提前判定。

## 檔案與重建

- 完整來源修改清單：`pilot-changed-files.json`。主要入口為 `src/presentation/main.ts`，新增 `pilot-adapter.ts`、`pilot-controls.ts`、`pilot-renderer.ts`，保留既有資料與任務模組。
- 原始碼快照：`../rpg-source.zip`，排除教師肖像照片；包含測試、共用資料與重建腳本。
- 解壓後執行 `pnpm install`、`pnpm exec vitest run --maxWorkers=1`、`pnpm exec tsc -b`、`pnpm exec vite build --base ./`。
- `compile-technology-demo.mjs` 由完整來源 runtime 產生精簡版；`stage-technology-release.py` 再將成品加到隔離工作樹並標記可玩 manifest。單獨執行 `package-data.cjs` 只會重建第一階段資料 manifest，發布示範需再跑 staging。
- 公開入口 `index.html` 保留 `anniversary-reward.js`；舊雜湊資源不刪除，以免已開啟頁面失效。未公開新的教師照片。

## 本階段界線與後續

這是由導覽座標轉換的 2.5D 平面示意，不是實測實景。角色仍是固定矩形，有 8 向移動、4 朝向狀態，尚未完成 8 方向 Q 版動畫。示範接在目前公開的 Canvas 入口，尚未移植另一個 Phaser 場景入口。NPC 明確標示遊戲身分，不代表真人教師辦公位置，也不計入線上人數。

下一階段先依同一資料契約擴充其他樓層／建築，補上經確認的門寬、通行區與教室名稱，再處理角色美術、深度遮擋及安全 NPC 活動路線。真正多人連線、登入、伺服器、題庫匯入與 80 週年隱藏任務仍是後續工作，未在本次宣稱完成。
