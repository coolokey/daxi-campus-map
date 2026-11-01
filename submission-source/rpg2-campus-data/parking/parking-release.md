# A／B 停車區參考圖移植

使用者提供 A「警衛室旁自行車／機車棚」、B「藝術館旁汽車停車區」圖片，要求依圖調整現有 RPG。採用導覽 landscape-world.js 與原 campus-model-v2.json outdoor.parking 既有示意座標，原導覽與校園素材不變。

| 區域 | 本次實作 |
| --- | --- |
| A | 學生自行車與教職員機車雙排藍色棚頂，中間連續通道，棚柱設在車列背側 |
| B | 西東雙排車格、北側藍色無障礙車位及斜線、中央雙向箭頭、西側／北側行人步道 |
| B 南側 | 保留參考圖中的既有藍色車棚與平行停車列，位於原道路南側，不占主車道 |
| 導航／小地圖 | 三個可到達目標，停車區底色與車輛／棚柱障礙標示；車道與通道保持可走 |

原生 Canvas 2.5D 風格延續草甸校園。遊戲示意物件為 22 輛自行車、16 輛機車、15 輛汽車、22 根棚柱，不代表實際車位或使用人數。53 個車體與 22 根柱的碰撞共用同一配置來源。屋頂不設碰撞，遮擋玩家時淡化；招牌維持清楚。藍色無障礙位保持淨空，未放置車輛。

位置與尺寸沿用既有導覽的示意配置，不宣稱是實測成果。原模型 JSON、建築位置、教室、樓層、傳送點、原始平面圖與公開網址未更動。新增碰撞在室外首次 walkable／尋路索引之前註冊；原有入口與所有道路仍可到達。

## 驗收

- 修正前新增測試重現車體無阻擋、停車目標未顯示；修正後通過。
- 1／1.5／2 倍：兩輪車及汽車／棚柱阻擋、兩輪車中間通道與汽車中央車道及行人步道連續可走、無障礙位淨空、三地標可達。
- 完整回歸 51 個測試檔、168 項通過。TypeScript 與正式 Vite build 通過。
- 本機桌機已實際導航進入 A 中間通道及 B 中央車道。390×844 瀏覽器尺寸顯示玩家、車位、操作鍵與小地圖正常；非實體手機測試。
- 瀏覽器未記錄 error／warn；地面先於金色路線繪製，車體／柱／棚頂加入同一深度排序。
- 唯讀審查未發現 P1／P2；另修正小地圖停車底色蓋住障礙標示的順序問題。
- 正式部署與檔案比對另存 output/parking-qa/published-verification.json，截圖位於同資料夾。

## 修改清單與備份

新增 public/data/parking-layout-v1.json、src/presentation/parking-layout.ts、parking-renderer.ts、parking-layout.test.ts、scripts/stage-parking-release.py、本報告與 docs/superpowers/plans/2026-11-01-parking.md。

調整 src/presentation/model-world.ts、model-renderer.ts、campus-directory.ts、src/game/data/types.ts、src/game/world-hud.ts。正式更新原 public/proposal/rpg 路徑、submission-source/rpg-source.zip，新增 submission-source/rpg2-campus-data/parking 驗收紀錄。

備份 backups/rpg-before-parking-20261101.zip；Git 分支 backup/rpg-before-parking-20261101，原提交 b6aaecef757708c1a2bbe29c01de5750eed2df2e。
