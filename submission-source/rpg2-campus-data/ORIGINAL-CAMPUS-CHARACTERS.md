# 原彩色校園 RPG 與全角色移植

2026-10-13。依使用者選項 1 修正前次示範方向：保留原彩色地圖與遊戲入口，直接升級同一遊戲；導覽網站程式與原素材不更動。網址仍為 https://coolokey.github.io/daxi-campus-map/proposal/rpg/ 。

## 行為

室外始終為原校園，不再有「科技館 2.0 示範」模式按鈕。沿原校園走到既有科技館入口，按 E 進入導覽來源的 1F，沿樓梯前往 2F 導師、原版 5 題任務，再從 1F 出口回到原校園入門前的位置。保留快速任務、獎勵橋、三種比例、跟隨鏡頭、對話及觸控控制。

新增「校園角色」：可搜尋全部教職員、邀請指定教師 NPC 入場，以及選擇男女／制服／便服四種玩家外觀。玩家選擇只保存在本機；邀請不傳送玩家，不向真人送出訊息。NPC 位置與路線屬遊戲示意，不表示實際教師即時位置。

## 角色來源

來源是導覽 staff-data.js、campus-people.js、explorer.js 的角色設定與 createCharacter 模型。完整 91 位教職員原 ID／姓名／職稱、12 位一般示意學生、警衛、4 種玩家外觀，加上原 RPG 巡邏機器人，共 109 個角色圖集。55 位教師沿用已有 appearance，36 位缺外觀資料者使用一般示意造型，沒有依不明照片猜測。

沿用導覽的圓潤模型與服裝，頭部增至 1.18 倍，轉製透明 PNG。每個角色八方向 × 站立／左步／右步，共 24 格；109 個角色合計 2,616 格。保留眼鏡、髮型及配色。統一正交相機與腳底錨點，遊戲繪製固定 48×66，不隨世界比例放大。

遊戲 runtime 只讀 2D 圖集，不為此下載 Three.js。圖集總壓縮檔大小約 9.2 MB，分角色載入；室外教師桌面 6 位／手機 3 位，學生桌面 6 位／手機 4 位，保留原研究員與機器人。教師定期輪替；名冊保留所有角色。背景頁與對話暫停時停止角色更新。

## 檢查與重建

- `pnpm exec vitest run --maxWorkers=1`：原功能、入口轉接、角色名冊、路線、比例與重試測試。
- `node --test scripts/verify-rpg-characters.node-check.cjs`：91 個教師 ID／姓名與 appearance 對照來源 SHA、109 張 PNG、八方向、三步態、透明邊界、非空格與無裁切；不匯出照片或 portrait 路徑。
- `pnpm exec tsc -b`、`pnpm exec vite build --base ./`、`node scripts/verify-startup.mjs`：保留原啟動預算，不放寬上限。
- `verify-original-characters.cjs`：攔實際 drawImage，驗證八方向與三步態、固定大小、91 位搜尋與邀請、換裝持久化、NPC 自主活動、各尺寸觸控及小地圖不重疊。
- `verify-technology-pilot.cjs`：真實鍵盤從原圖行走到原入口、上下樓、錯題提示、完成 5 題、回原地與反向出館。
- `verify-character-recovery.cjs`：故意注入名冊 HTTP 503，確認人物備援仍可見、可以移動、錯誤提示持續，再按重試恢復 109 個角色。

測試結果 JSON 隨本次提交附在此資料夾；正式站結果另外保存於工作目錄 docs/rpg2-integration-20261013。實際以桌面 Edge／Chromium 模擬平板與手機尺寸、觸控；未宣稱實測實體 iPad／Safari。

## 檔案與恢復

完整來源快照為 submission-source/rpg-source.zip，含新角色圖集、匯出工具及測試，排除未使用的教師照片。修改清單 pilot-changed-files.json；來源模組主要為 main.ts、character-world.ts、character-runtime.ts、pilot-controls.ts、pilot-renderer.ts、world-hud.ts、types.ts。

備份標籤 rpg-before-character-import-20261013 指向 5a33f15，可恢復上一版；更早的 rpg-before-integration-20261013 仍保留。原地圖 SHA-256 應維持 6b4f14101f262fa7942209f89c84e25726b88e184f8c22769ed6586a7a44d26d。

本階段只接目前公開的 Canvas 入口；另一個 Phaser 入口仍保留原程式。室內為來源樓層平面示意，尚未重新製作與室外同等細節的室內美術。沒有新增多人後端、真實在線人數或學生個人資料。
