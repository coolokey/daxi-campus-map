# 蘭亭與校園活動人物

依使用者 013.JPG 及最新版導覽 explorer.js、outdoor-world.js，新增訓平池西側中心（−18，−66）的蘭亭。照片風格包括六角石基、紅柱、米白梁架及格柵、紅褐色攢尖瓦屋頂、翹簷、瓦脊、頂飾與蘭亭匾額；位置與主要尺寸沿用導覽示意，並非測量建模。未改動原始照片、平面圖或導覽網站。

六柱及五段座椅共 11 個碰撞區，在首次尋路索引前加入；南側保留通往亭內的入口。石基與淺階是地面示意。屋頂進入共用深度佇列，當玩家在亭內／後方且被遮擋時淡化；亭外前方維持不透明。目錄及小地圖新增「蘭亭與訓平池」地標。

新增三個學生 NPC 活動名額，取代原本室外一般學生漫遊：

- 籃球場：運球移動、舉手投籃、球沿拋物線進入現有右側籃框並落下。
- 開心農場：在中央田間步道提水壺澆灌幼苗，短距離移動後繼續照護。
- 操場：沿原模型第二分道慢跑一圈循環，沿線腳步及八方向圖集隨移動切換。

全部重用原有學生圖集，沒有新增圖片下載來源。桌面維持 3 師＋1 警衛＋3 活動學生，共 7 位 NPC；手機為 1 師＋1 警衛＋3 活動學生，共 5 位，比上一版手機多 1 位以涵蓋三場域，並保留離屏裁剪與圖片快取。學生不顯示頭頂姓名，教師／警衛原規則保留。人物造型依既有名冊離屏輪替；切換桌面／手機版面會保留活動進度及位置，避免原地瞬移。

活動接入既有更新迴圈，沒有新增動畫計時器。每次位移經 clearSegment 檢查；接近玩家會停下，可使用原對話介面；對話、地圖、角色選單及題目開啟時活動暫停。減少動態偏好會固定籃球與水滴道具狀態。活動均為 NPC 遊戲示意，沒有真人在線人數、球賽計分、實際耕作與收成機制。

整合時發現原農場步道接近點（−22，−66）落在新增亭柱的碰撞範圍，已改為西側（−29，−66）；農場、菜畦、入口和蘭亭不移位，農場中央橫向與縱向通道回歸通過。

## 驗證與恢復

完整回歸 55 檔案、183 項通過；後續人物整合與活動／角色專項共 22 項通過，含桌面／手機名額、無重複建立、縮放版面保留進度與角色選單暫停。TypeScript 與 Vite 正式 build 通過。三種世界比例皆驗證蘭亭入口及地標可達、柱／座椅阻擋、池水不可進入、農場可達，以及 100 秒活動位置與連續線段均可通行。唯讀審查另補跑 21 項活動與角色測試通過。

瀏覽器驗收與正式站資源比對見 output/pavilion-activity-qa。手機／平板為瀏覽器尺寸模擬，未做實機效能測量。

新增：public/data/pavilion-activities-v1.json；src/presentation/lan-pavilion.ts、pavilion-renderer.ts、campus-activities.ts、activity-renderer.ts、pavilion-activities.test.ts、character-activities.test.ts；scripts/stage-pavilion-activities-release.py、本報告與計畫。

修改：model-world.ts、model-renderer.ts、character-world.ts、campus-directory.ts、src/game/data/types.ts、public/data/campus-farm-v1.json、campus-farm.test.ts。正式產物維持 public/proposal/rpg 原網址；來源 ZIP 及 pavilion-activities 驗收紀錄同步保存。

備份：backups/rpg-before-pavilion-activities-20261101.zip；backup/rpg-before-pavilion-activities-20261101 基準 e9de820820b30c0e763a9273074853add6839d3f。
