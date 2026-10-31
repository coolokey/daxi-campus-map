# 正式平面圖道路對照與補齊

## 對照結果

平面圖顯示校門內南側橫向道路接上教學區東側南北車道，形成 L 形；教學區另有橫向通廊。前版 RPG 只有橫向道路與局部入口鋪面，缺少南北車道和通廊地面。

| 平面圖辨識 | 既有導覽座標來源 | 本次 RPG 處理 |
| --- | --- | --- |
| 校門內南側橫向車道 | campus-model-v2.json forecourt.driveway | 保留並納入共用道路資料供小地圖顯示 |
| 籃球場東側、科技館西側南北車道 | explorer.js centralRoad，中心 x=52、z=12，寬 9、長 154 | 新增南北道路，南端延長 1.5 示意單位與既有橫路接合 |
| 教學區北端橫向通廊 | createBreezeway(15,8,26,4) | 補地面鋪面 |
| 教學區南端橫向通廊 | createBreezeway(15,52,26,4) | 補地面鋪面 |
| 健康中心銜接通廊 | createBreezeway(12,2,4,8) | 補地面，北端由原校舍遮蓋 |
| 科技館、藝術館、綜合大樓、七年級大樓入口 | 既有 1F portal | 與主路之間加入避障短徑，不新增教室門或傳送點 |

正式 JPG 與導覽 explorer.js 的 SHA-256 記於 public/data/campus-roads-v1.json。平面圖提供位置關係，導覽提供既有示意座標。此資料不是測量圖；本次也沒有完成所有戶外通路的逐段實測。原 JPG、原模型 JSON、校園導覽網站與既有網址均未更動。

## 實作

新增 campus-roads-v1.json 與 campus-roads.ts。主畫面與全圖／小地圖共用 outdoorPaving（6 塊：原椰林大道、南側橫路、新增 4 塊）與 outdoorPaths（4 條既有建築入口短徑）。仍使用自然土色與碎石草緣。通廊此次只補地面，不新增屋頂或跨樓層傳送。

四條短徑在原碰撞與入口都建立後，使用同一個 findPath 算法生成一次；不在每幀尋路，也不新增障礙。既有建築、房間、樓層、碰撞、樹位與人物系統不變。草地仍可自由探索，金色導航採避障路線，不保證全程沿道路走。

## 驗收

- 修正前新增兩項回歸測試均失敗：南北主路未出現在道路資料中、入口短徑不存在。
- 修正後兩項通過；在 1／1.5／2 倍比例確認主路覆蓋、道路中心可通行、四條短徑每段通過碰撞檢查且終點對上既有入口。
- 完整 Vitest：50 個測試檔、164 項通過。TypeScript 與正式 Vite build 通過。
- 桌機實際操作：導航到科技館，主車道與入口短徑可見，互動進入 1F；全圖可見 L 形道路，與小地圖一致。
- 390×844 瀏覽器手機尺寸：路面、玩家、操作鍵、小地圖與三心提示可見；比例切換至 2 倍正常。非實體手機／iPad 測試。
- 唯讀審查未發現 P1／P2；確認碰撞／尋路快取建立時序與繪製先後順序。
- 公開發布驗證存於 output/plan-roads-qa/published-verification.json；截圖同資料夾。

## 修改清單與恢復

新增：public/data/campus-roads-v1.json、src/presentation/campus-roads.ts、src/presentation/plan-roads.test.ts、scripts/stage-plan-roads-release.py、本報告、實作計畫。

修改：src/presentation/model-world.ts、model-renderer.ts、src/game/data/types.ts、src/game/world-hud.ts。正式產物更新原 public/proposal/rpg 路徑、submission-source/rpg-source.zip，新增 submission-source/rpg2-campus-data/plan-roads 驗收紀錄。

備份：backups/rpg-before-plan-roads-20261031.zip；Git 分支 backup/rpg-before-plan-roads-20261031，原提交 4735e8625ced127df081288f0441f24ebe86abe8。
