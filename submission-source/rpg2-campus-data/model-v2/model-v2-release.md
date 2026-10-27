# 最新校園模型 2.5D RPG 整合驗收

日期：2026-10-27。既有公開路徑：`https://coolokey.github.io/daxi-campus-map/proposal/rpg/`。

## 架構與資料

保留 Canvas 2D presentation 遊戲主入口、React 數學題目、角色圖集與半身像系統。沒有重製導覽網站或使用 iframe 嵌入。讀取最新版導覽的純資料編譯器，輸出獨立 JSON；座標保留 x/z，RPG 物理座標與等角畫面座標有可逆轉換。

來源提交：`9a58247185be9738270010afecd19d28309d9f83`；六份模型來源檔案的 SHA-256 記錄於 `public/data/campus-model-v2.json`。11 棟建築、28 個樓層、95 個空間；行政大樓已整合，科技館西向入口與延伸輪廓取用最新版資料。原有校園圖與正式平面圖均保留。

世界比例 1、1.5、2；角色圖集繪製尺寸維持獨立。戶外及室內共用等角投影、足部碰撞與導航資料。室外顯示樓體、窗帶、屋頂科技面板、運動場、球場、校界、訓平池及前庭樹列。室內採低牆剖面，門、樓梯、出口來自模型；多個獨立外門不擅自打通室內。

導航使用連通區快取及避障路線；可手動或按「沿導航路線行走」，切換場景仍需按 E／互動。每次啟動會由現位置重新尋路。小地圖維持俯視比例，室內自動切換樓層。建物遮住玩家時淡化，角色按地面深度排序，人物動畫依畫面八方向取樣。

## 回復

修改前備份：`F:/1151005---創意教學/backups/rpg-before-model-25d-20261027-224431.zip`；Git 備份分支：`backup/rpg-before-model-25d-20261027`。舊圖、舊樓層模組保留，不刪除素材。

## 驗收範圍

- 最新模型三比例：出生點可站立、所有 95 空間可經真實入口／樓梯／連通廊抵達；每個教室的實際尋路各段均用相同足部碰撞驗證。
- 每個獨立外門進出落點一致，避免多棟出口覆寫。
- 薄牆隔離、真實開口及連通快取一致性。
- TypeScript 編譯、Vite 相對路徑正式打包。
- 既有 36 份測試 117 項，其中一項舊樓層遍歷首次超過預設 5 秒，另外單獨延長時限重驗；結果另記錄於 release-verification.json。
- 瀏覽器實測：以工具列選擇科技館二樓理化實驗室、步行至戶外入口、進一樓、走廊到樓梯、上二樓、老師對話與數學題；另查小地圖、配色、比例與觸控排版。完成結果記錄於 release-verification.json。

## 已修改與新增

- scripts/compile-model-v2.cjs：唯讀編譯最新導覽資料與來源雜湊。
- public/data/campus-model-v2.json、src/presentation/model-catalog.json：共用模型快照與目錄。
- src/presentation/model-world.ts：世界、樓層、門、樓梯、樹木碰撞與出生點。
- src/presentation/model-renderer.ts：等角投影場景、立體樓體、剖面與遮擋。
- src/presentation/model-controls.ts：樓層互動及原版任務接合。
- src/presentation/main.ts：切換新模型主迴圈、鏡頭、避障互動與自動行走。
- src/presentation/campus-directory.ts：最新目錄及跨場景／獨立入口導航。
- src/presentation/navigation.ts：模型足部尺度、碰撞空間索引及連通快取。
- src/presentation/character-world.ts：新路網與等角八方向動畫。
- src/game/world-hud.ts：小地圖改用模型碰撞輪廓，停用舊圖疊底。
- src/presentation/fullscreen.css、presentation.html：手機工具列、不重疊切換按鈕、移除不必要的舊圖預載。
- src/presentation/model-world.test.ts、navigation.test.ts：模型連通、進出及薄牆回歸驗證。

## 限制與後續

這是依既有導覽模型轉成的第一版幾何 2.5D 科技美術，尺寸與門位仍為導覽示意，非建築測量成果。尚未加入新怪物養成、領地攻防或真正多人後端；NPC 不代表在線玩家。後續可在同一資料層增加室內課桌、校園任務美術及同伴系統，每個新增實體需同步碰撞驗證。
