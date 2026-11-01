# 椰影迎賓道與溪畔森境

依使用者要求，於既有 RPG 椰林大道兩側及校園圍牆外新增自然景觀，保留原網址、校舍、圍牆、20 棵椰樹、操場、農場及蘭亭。新增三層景觀：

- 大道花境：蕨葉、觀賞草、淡粉／奶黃／紫色花叢、6 組立體花灌木、自然石、座椅與花園解說牌。新增低植栽共 68 組，中央道路保留原寬度。
- 溪岸意象：曲線水道、寬窄微變的石岸、蘆葦、細水紋、可通行的觀察木橋與低木欄。原街口溪步道入口保持原位，觀察木橋與椰影蝶舞花園加入目錄及小地圖導航。
- 牆外森林：共 98 組闊葉樹／竹叢（包含大道外側的小樹蔭），沿非校門側牆外分層配置，搭配 7 處遠景山丘和少量鳥影。全部樹木腳點在既有校園圍牆外，不搬動校內建物。

## 參考與創作範圍

2026-11-01 實際查閱 Google Maps 大溪國中衛星圖、校園 360 度空拍及校門全景。360 度圖片標示拍攝於 2021 年 7 月；衛星影像的拍攝年月未另核實，不能當作最新實測圖。影像可見周邊連續林地及校門側綠帶。

- Google Maps：https://www.google.com/maps/search/?api=1&query=桃園市立大溪國民中學
- 水利署「街口溪生態水岸步道計畫」：https://www.wra.gov.tw/flwe/cp.aspx?n=17249

官方資料確認砌石護岸、親水步道及生態營造。RPG 溪流線形、花園、觀察木橋和植栽配置屬美術延伸，不宣稱現實中有同位置設施或特定樹種，也不是測量圖。沒有把 Google 圖片下載成遊戲貼圖。

## 幾何、效能與操作

溪流的 Catmull-Rom 曲線與河岸寬度同時提供水面繪製、碰撞與小地圖資料，木橋範圍自水碰撞區扣除。樹幹、花灌木核心、座椅、標牌、岩石與橋柱於首次建立碰撞／尋路索引前加入。木欄依短段腳點排序，避免人物在橋端的遮擋順序失準。

草地與溪流的視覺背景延伸過可玩世界邊界，避免方形地面截斷及溪流斷頭；map.width／height、玩家活動範圍與座標比例不變。人物不能走進溪水，木橋與大道則可正常通行。

原生 Canvas 植物快取最多 24 張小圖，闊葉樹重用既有 12 種樹圖快取；不新增外部圖片請求。植物、樹木、鳥影與蝴蝶均有離屏裁剪，蝴蝶同畫面上限桌面 3、手機 2，鳥影最多 2。水紋及生態動態使用既有重繪迴圈，支援減少動態偏好，不新增動畫計時器或 NPC 名額。

## 測試與驗收

- 完整回歸：57 個測試檔、187 項通過；最後曲線與背景調整後，相關 3 個檔案、11 項再次通過。
- TypeScript 與正式 Vite build 通過。
- 1／1.5／2 倍：大道三條代表通行線、木橋橫跨路線、全部原地標／新地標及室外建築入口可達；水面與新增實體物件阻擋一致。
- 唯讀審查未發現重要問題；橋欄分段排序已修正並複查。
- 桌面、手機 390×844、平板 1024×768 預覽與正式站證據另存於 output/surroundings-qa。尺寸模擬不代表實機效能量測。

## 檔案與恢復

新增 public/data/campus-surroundings-v1.json、src/presentation/campus-surroundings.ts、surroundings-renderer.ts、campus-surroundings.test.ts、scripts/stage-surroundings-release.py、本報告與計畫。

調整 src/presentation/model-world.ts、model-renderer.ts、meadow-renderer.ts、campus-directory.ts、src/game/data/types.ts、src/game/world-hud.ts。部署仍在 public/proposal/rpg，來源 ZIP 及 surroundings 驗收資料同步保存。

備份 backups/rpg-before-surroundings-20261101.zip；Git 分支 backup/rpg-before-surroundings-20261101，基準 774018f9873d3d1a977d3762d8c257b31058b57f。
