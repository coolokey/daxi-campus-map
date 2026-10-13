# 第一階段共用校園資料

本資料夾是離線匯出工具及版本固定快照，尚未接入兩站 UI 或遊戲。沒有修改公開 URL、原導覽資料、照片、教師資訊或題目內容。

## 執行

需 Node.js 22 或更新版本；無額外套件。

上述「無額外套件」限離線 export-campus 工具。最終導航擷取另需 Playwright 與 Edge，使用隔離工作樹的本機 HTTP 伺服器；擷取前後都會比對伺服器回傳的來源檔與工作樹 SHA-256，防止把不同版本的 runtime 與來源混用。

```powershell
node submission-source/rpg2-campus-data/export-campus.cjs --root . --out submission-source/rpg2-campus-data/campus.shared.json
node --test submission-source/rpg2-campus-data/export-campus.node-check.cjs
```

導航與發布資料重建：

```powershell
# 另一終端在此工作樹 public 啟動：python -m http.server 8770 --bind 127.0.0.1
node submission-source/rpg2-campus-data/capture-runtime.cjs http://127.0.0.1:8770/campus-explorer/
node submission-source/rpg2-campus-data/validate-runtime.cjs
node --test submission-source/rpg2-campus-data/export-campus.node-check.cjs submission-source/rpg2-campus-data/validate-runtime.node-check.cjs
node submission-source/rpg2-campus-data/package-data.cjs
```

公開資料入口為既有 RPG 子目錄內的 `data/manifest.json`；它指向三份有內容雜湊的 JSON。全校資料約 184 KB、導航／碰撞約 6.9 MB、科技館示範資料約 89 KB。既有頁面尚未讀取這些資料，因此初始載入不增加 6.9 MB。全圖供匯入與驗證，示範區按需使用較小資料包。

runtime 共 17313 個節點、17411 條邊、1237 個碰撞體；BFS 重新驗證 92 房可從校門連通，科技館電腦二路徑 440 點，依原人物半徑每 0.12 guide-unit 檢查無阻塞。這不是實際操控角色完成任務，亦不是現地通行保證。中途樓梯節點 level=null，不誤標為已抵達某樓層。

`--root` 指向包含 `public/campus-explorer/` 的來源儲存庫；`--out` 為輸出 JSON。輸出不包含時間戳記及本機絕對路徑，相同來源會得到完全相同位元組。dataVersion 來自四個輸入 SHA-256。

## 模組契約

```js
const { exportCampus, validateCampus } = require('./export-campus.cjs');
const data = exportCampus(sourceRepoRoot); // 同步回傳純 JSON 物件；來源或驗證失敗時拋錯
const { valid, errors } = validateCampus(data); // boolean, string[]
```

VM 僅依序執行 `campus-data.js`、`spatial-plan-data.js`、`spatial-plan.js`、`walk-world-math.js`；採白名單選取幾何欄位，不序列化整個 VM、函式或 WebGL 全域。

資料以 buildings、floors、rooms、challenges 正規化表及 ID 參照表達 Building → Floor → Room → Challenge。另含 doors、stairs、entrances、portals、aliases、npcPlacements。固定 room ID 是 `buildingId:spaceCode`；sourceAliases 保留既有目的地 ID 及被替換的 aliases，legacyCode 原值另存。

已驗證 12 棟、92 房，1F／2F／3F／4F 分別 35／34／22／1，13 組 stairs、30 個候選 entrances。21 個未知名稱保留「待確認」文字及 unverified 標籤。confidence 分別標示名稱、樓層、空間碼與示意幾何；plan-checked 表示來源自稱圖面核對，仍須校方覆核。

座標固定為 x／z／height；單位 guide-unit，measured=false。rect 是校園全域平面矩形；holes 由編譯器 local 轉回全域，僅列於 2F 以上。樓梯 ramps 有 start/end、heightStart/heightEnd；platforms 有 rect/height。每組樓梯的跨層候驗 portal 使用實際梯段首點與末點。入口及樓梯 portal 都成雙向對，arrivalStatus=candidate，需互動觸發並離開區域才重新啟用。

科技館電腦教室二（tech-building:TC-SE-2）綁定一個 energy-core-01 遊戲任務配置，指向原 `future-campus-rpg/src/data/questions.ts:firstQuestQuestions` 五個題目 ID，不複製答案。完成事件保留 `campus:quest-complete` 與 questId=energy-core。NPC 是虛構任務站，placementStatus=game-only，不表示真實教師辦公室或位置；尚未接入遊戲。

## 待後續驗證

- navigation 保留 `{status:'pending',nodes:[],edges:[]}`；roads 空白，沒有猜測校門直線道路。
- 四個純模組未提供牆碰撞及門洞寬，因此 floors.blockedStatus、doors.widthStatus 為 pending-runtime-export，width=null。不能把空 blocked 當成無牆證據。
- 空間編譯器的 entrances 只是候選；實際 spatial-world.js 可能依碰撞排除。portal pairs 也是候驗，尚未證明可到達。
- 入口、樓梯孔與尺寸為來源示意，並非現地實測。
- 瀏覽器 localStorage 的年度房名覆寫未匯入；不攜帶照片、人名表或個資。
- validateCampus 驗證基礎表 ID／參照、房間與門反向歸屬、portal 配對、有限幾何及未知標籤；runtime-derived navigation graph 的驗收由補充工具另行負責。

測試先觀察缺少匯出工具時 3 項斷言失敗，再實作通過；新增幾何缺失測試後觀察失敗，再補驗證器，最終 4／4 通過。測試同時比對前後來源 SHA-256 並驗證兩次輸出完全一致。
