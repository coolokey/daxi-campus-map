# 晴日草甸校園：參考風格升級與驗收

## 參考圖轉譯

保留既有 Canvas 2.5D 等角投影與校園配置，將使用者提供的 11 張圖片轉譯為柔和草甸風格。這不是 WebGL 真 3D 引擎移植，沒有自由旋轉鏡頭或立體高低地形。參考截圖未裁切或當作遊戲素材。

| 參考特色 | 本次實作 |
| --- | --- |
| 連續自然草地 | 無六角格線的多層草色，快取草葉與小花紋理 |
| 柔和低多邊形樹木 | 12 種快取分枝樹冠、陰影、玩家在樹後時淡化 |
| 自然步道與水景 | 原有道路覆以暖砂石紋理；訓平池增加水色、漣漪、蓮葉與岸石 |
| 溫暖簡潔介面 | 奶油白與森林綠，保留三心三階段、操作、導航與小地圖 |
| 校園辨識度 | 保留校門、圍牆、椰林大道、跑道、三面籃球場與各棟顏色 |

## 資料與功能邊界

原有 13 棵闊葉樹加上導覽來源的 9 個既有樹位，共 22 棵；另保留 20 棵棕櫚。新樹位經建築占地過濾，繪製與樹幹碰撞共用清單。導覽建模仍為示意資料，不能視為測量成果。未修改原始校園模型 JSON、正式平面圖、校園導覽網站或公開網址。

修復水域原本只有岸邊分段碰撞、水面中心仍可通行的問題。現在以互相重疊的淺帶填滿水域碰撞，並在首次尋路前註冊，保留舊岸邊屏障。修復新屋頂背側填色缺口與池名被水面覆蓋的繪製順序。

人物、老師服裝與半身像沿用既有素材；未新增回合制戰鬥或假多人。已檢視全域安裝的 rpg-quiz-battle-game 技能：適用後續答題戰鬥，這次僅參考角色分層與素材重用原則，不啟用不相關的戰鬥流程。

## 驗證

- TypeScript 與正式 Vite build 通過。
- Vitest：49 個測試檔案、162 項通過；包含 1／1.5／2 倍樹位碰撞、所有室外入口可達、遮擋判定、屋頂填色與水域阻擋。水域修正前已重現失敗。
- 桌機實際操作：校園 → 科技館 1F → 生科教室一 → 線索對話 → 內心題目與圖形成功載入，返回探索正常。
- 桌機實際導航至籃球場，池名、水面及球場正常，瀏覽器未記錄 error／warn。
- 390×844 手機、844×390 橫向與 1024×768 平板視窗：階段提示、玩家、操作區及小地圖可見，觸控區不重疊。這是瀏覽器尺寸模擬，並非實體 iPad／手機測試。
- 樓梯與其他樓層由既有回歸測試涵蓋，本輪未逐棟人工重玩；未修改樓層資料。
- 圖片位於 output/meadow-reference-qa。GitHub 部署與公開檔案比對另存 published-verification.json。

## 修改清單

新增：public/data/meadow-theme-v1.json、src/presentation/meadow-renderer.ts、src/presentation/pond-collision.ts、src/presentation/meadow-renderer.test.ts、scripts/stage-meadow-reference-release.py、本報告與實作計畫。

調整：src/presentation/model-world.ts、model-renderer.ts、cartoon-renderer.ts、realistic-campus.ts、main.ts、character-world.ts、fullscreen.css、entrance-renderer.ts、basketball-renderer.ts，以及 src/components/three-centers.css。

公開產物：原路徑 public/proposal/rpg 下的 index.html、雜湊 JS／CSS、主題 JSON、manifest；更新 submission-source/rpg-source.zip，新增 submission-source/rpg2-campus-data/meadow-reference 驗收紀錄。

## 恢復方式

修改前備份 backups/rpg-before-meadow-reference-20261031.zip；Git 備份分支 backup/rpg-before-meadow-reference-20261031，對應原版本 dc48b25d7403248c0520f0bcf02ee7ee7a7b790d。所有發布檔案限制於 RPG 路徑與來源封存。
