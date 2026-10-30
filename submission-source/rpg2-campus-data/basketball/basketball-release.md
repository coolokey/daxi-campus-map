# 補回籃球場群

原因：RPG 的 campus-model-v2 courts／outerCourts 是四面排球場，未包含導覽 explorer.js 的獨立 createBasketballComplex。因此不是顏色不明顯，而是三面籃球場確實漏匯入。

本次保留校園導覽、原平面圖及既有建築與室內資料，從導覽唯讀核對並新增三面 28×12.6 的藍色球場（中心12,-52／12,-38／12,-24）、紅色禁區與中圈、白色標線，及六座銀色支柱、藍色護墊、籃板、籃框與球網。此處尺寸沿用導覽示意，非測繪紀錄。

碰撞僅涵蓋低處支柱防護墊；地面與高處籃板下仍可自由行走。六座籃架採共同深度排序與遮擋淡出，地面繪製早於導航金線。目錄「校園地標、球場與椰林大道」新增球場導航，小地圖顯示三塊藍色球場與地標。

## 修改檔案

- public/data/basketball-courts-v1.json：有來源雜湊的尺寸與座標。
- src/presentation/basketball-courts.ts、basketball-renderer.ts：球場／籃架資料及繪圖。
- src/presentation/model-world.ts、model-renderer.ts：碰撞、地面順序與深度物件整合。
- src/presentation/campus-directory.ts：球場導航。
- src/game/data/types.ts、src/game/world-hud.ts：小地圖球場。
- src/presentation/basketball-courts.test.ts：三場六架、三種比例、可達、支柱阻擋及籃板下通行。
- scripts/stage-basketball-release.py：同網址發布與原始碼封存。

驗收：1／1.5／2 倍場地可達與碰撞、完整既有回歸、桌機／手機實走、部署後核對原網址。結果見 results.json。備份 backups/rpg-before-basketball-20261030.zip 與 backup/rpg-before-basketball-20261030 分支。
