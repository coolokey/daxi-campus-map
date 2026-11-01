# 西牆花境與田徑體驗景觀

依使用者截圖，於原 RPG 西側圍牆內增添 12 組立體開花灌木與 72 組花叢／觀賞草，共 84 組。粉紫、奶黃與杏色花朵搭配深淺綠葉、投影和高低層次。位置全部位於跑道外，保留牆內通道，不移動圍牆、農場或校舍。

沿用原模型跑道中心（−84，−25）、直線半長 25、內外半徑 18／27；改成六條等寬跑道、七條邊界線，補分道數字、起終點、外道錯位起跑線、接力區彩色短線與方向箭頭。所有數量與位置採模型座標；跑向、短跑起點與終點一致，分道起跑按外道周長差補償。這是遊戲視覺示意，非實測標準跑道或競賽認證。

內場配置跳高墊及橫桿、跳遠助跑區與沙坑、三組跨欄、器材收納、計時棚與兩串低彩度賽事旗幟。保留既有兩座球場與內場中央通行空間。新增「田徑體驗區」地標及目錄導航，小地圖沿用共用地標資料。

12 組灌木核心、7 組器材和 4 根旗桿共 23 個碰撞區，於首次建立碰撞索引前註冊；低矮花草不阻擋行走。植物最多使用 12 張 160×144 Canvas 快取，不新增外部圖片下載或動畫計時器。作物及其他既有生態保留；新增直立物件進入角色腳點深度排序，畫面外略過。

## 驗證

- 完整回歸：54 個檔案、178 項通過；其後新增起跑方向回歸測試，相關 4 檔案共 15 項再次通過。
- TypeScript 與 Vite 正式 build 通過。
- 1／1.5／2 倍：三條代表性分道沿整圈取樣可走、中央通道暢通、器材與灌木碰撞、體驗區地標可達、菜畦與農場通道回歸。
- 唯讀程式審查發現起終點方向矛盾，已修正並複查。
- 桌面及手機尺寸、正式站資源比對與畫面結果，記錄於 output/athletics-qa；手機為瀏覽器尺寸模擬，非實機效能量測。

## 修改檔案

新增：public/data/athletics-garden-v1.json、src/presentation/athletics-garden.ts、athletics-renderer.ts、athletics-garden.test.ts、scripts/stage-athletics-release.py、本報告與 docs/superpowers/plans/2026-11-01-athletics-garden.md。

修改：src/presentation/model-world.ts、model-renderer.ts、campus-directory.ts。正式產物維持 public/proposal/rpg，更新 submission-source/rpg-source.zip，新增 athletics-garden 驗收目錄。原始平面圖與導覽模型不變。

備份：backups/rpg-before-athletics-20261101.zip；Git 備份分支 backup/rpg-before-athletics-20261101，基準 708b359eeed5a20bb2857a795043afed24b1d7e6。
