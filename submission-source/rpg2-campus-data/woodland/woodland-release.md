# 大溪木藝學園主題改造

## 已確認的方向
以木博館溫暖木藝風為主，老街元素點綴重要入口。這是以地方文化為靈感的 RPG 美術詮釋，不是木博館建築復原，也不代表真實校舍改建。
參考：https://travel.tycg.gov.tw/zh-tw/Travel/Attraction/994 、https://travel.tycg.gov.tw/zh-tw/Travel/Attraction/414 。

## 實作內容
- 米白灰泥牆、深淺木構框架、木格窗、灰瓦寄棟斜屋頂、深簷與樓層橫飾。重要既有建物立面加入磚色山牆裝飾。
- 11 棟識別色由整面粉彩牆改為入口飾帶與材料點綴。原版校舍模式保留舊立面與配色作對照。
- 藍天白雲與綠地保留；石磚集中於既有建物周邊與正門步道，降低滿鋪重複感。增加建物陰影、樹影及依植栽區定位的木椅。
- 木椅只在既有碰撞及入口附近檢查通過後放置，其可見占地同時加入碰撞，不作無碰撞立體擺設。
- 校門保留單塔、金球、行人小門及警衛室原幾何；改暖色木質飾帶、灰瓦與老街拱飾。圍牆使用低彩度石材、磚色柱與木色欄杆。
- 室內教室使用木地板細縫，三心木牌與集章式徽章延續原順序、題目、站點及本機保存。
- 斜屋頂與簷口屬高處美術，未擴張地面建築占地。畫面剔除與人物遮擋共用新屋頂的實際投影範圍，修正原平頂範圍漏判深簷的問題。

## 保留與改變邊界
原 Building → Floor → Room → Challenge、樓層教室位置、主要入口、角色圖像、原能源任務、既有校門及周界碰撞保留。新增遊戲木椅的占地具碰撞。原始校園平面圖、導覽網站與公開 RPG 網址不變。
未新增網路字型或人物圖像下載；重用既有約 174 KiB 石磚 WebP 與 Canvas 原生繪圖。

## 驗證
完整回歸 44 個測試檔、144 項測試通過。審查發現深簷遮擋後加入回歸測試，再通過木藝與三心 8 項測試；合計 145 項不同測試。TypeScript 與正式建置通過。
屋頂縮放、11 棟識別、原版對照、木椅碰撞、三種比例下的入口可達性及深簷遮擋均有驗證。裝置與實際導航結果另見 output/woodland-qa/results.json 與畫面紀錄。
既有延遲載入 Phaser 包仍有大檔警告；本次未將其引入初始展示入口。

## 修改檔案
- public/data/woodland-theme-v1.json：主題材料、識別色與木椅配置。
- src/presentation/campus-materials.ts：木藝／原版校舍材料。
- src/presentation/wood-architecture.ts：斜屋頂、木構立面、木椅、投影遮擋與剔除。
- src/presentation/woodland-furniture.ts：裝飾占地與入口檢查。
- src/presentation/woodland.test.ts：縮放、碰撞、入口、材料與遮擋測試。
- src/presentation/center-stage.test.ts：依新識別色規則更新驗證。
- src/presentation/model-world.ts：同步木椅碰撞。
- src/presentation/model-renderer.ts：建物、地面、樹影及室內地板。
- src/presentation/boundary-renderer.ts：門口及圍牆材料。
- src/presentation/realistic-campus.ts、main.ts：模式名稱與提示。
- src/presentation/fullscreen.css、src/components/three-centers.css：木牌與任務介面。
- scripts/stage-woodland-release.py：發布整理。
- docs/superpowers/plans/2026-10-28-woodland-campus.md：實作計畫。
- docs/woodland-release.md：本報告。

## 恢復
前一發布 c7a563e；Git 備份 backup/rpg-before-woodland-20261028；來源 ZIP 為 backups/rpg-before-woodland-20261028-154202.zip。
