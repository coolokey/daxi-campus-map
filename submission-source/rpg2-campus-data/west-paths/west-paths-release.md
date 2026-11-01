# 司令台、學生活動中心、資源回收室步道

依使用者提供的 115 學年度平面圖，補齊西側三處既有目標的戶外步道。沿用自然土色、碎石與草緣，不更動原 JPG、導覽網站、建築位置、碰撞或入口。

| 步道 | 銜接方式 |
| --- | --- |
| 司令台 | 銅像庭園南側步道起點，經旗桿東側，抵達原司令台前方地標 |
| 學生活動中心 | 共用向西步道，沿活動中心東側轉至原有 1F 東門入口 |
| 資源回收室 | 共用向西步道，繞活動中心北側，轉向原有回收室北側入口；不穿越活動中心 |

平面圖提供三處相對位置與開放空間，原模型提供既有入口／地標終點。轉折與寬度屬 RPG 示意配置，不宣稱是實測步道。使用既有避障尋路逐段生成，三個比例的每段皆通過碰撞檢查。草地仍可自由探索；金色導航採避障路徑，不保證全程沿步道。

資料位於 public/data/campus-roads-v1.json 的 westPaths。三路共用起點，在初始化時生成一次，加入原 outdoorPaths，主畫面、小地圖與全圖共用。既有東側四條入口路徑保留，共七條路徑。

## 驗收

- 新增西側連通／終點／逐段避障測試；修改前測試失敗，修正後通過。
- 1／1.5／2 倍：三路共用起點、終點對上既有地標或入口，每一段 clearSegment 通過。
- 完整 Vitest：50 個測試檔、165 項通過。TypeScript、正式 Vite build 通過。
- 本機桌機操作已到達學生活動中心入口及司令台，截圖存 output/west-paths-qa；回收室入口亦實際抵達。390×844 瀏覽器手機尺寸檢查可見步道、人物、操作與小地圖，非實體手機測試；瀏覽器未記錄 error／warn。
- 唯讀程式審查未發現 P1／P2，逐段路線銜接及碰撞快取時序正確。
- 線上部署與檔案比對紀錄存 output/west-paths-qa/published-verification.json。

## 修改檔案與備份

修改 public/data/campus-roads-v1.json、src/presentation/campus-roads.ts、src/presentation/plan-roads.test.ts、src/game/data/types.ts。新增本報告、docs/superpowers/plans/2026-11-01-west-paths.md、scripts/stage-west-paths-release.py；公開更新原 RPG 路徑、來源 ZIP 與 west-paths 驗收紀錄。

備份 backups/rpg-before-west-paths-20261101.zip；Git 分支 backup/rpg-before-west-paths-20261101，原提交 914d9b6ec8b28aca3c71869c7fa965df15be1071。網址不變。
