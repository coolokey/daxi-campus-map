# 大溪智慧學園：雙介面報名雛型

公開展示：https://coolokey.github.io/daxi-campus-map/proposal/

- RPG：https://coolokey.github.io/daxi-campus-map/proposal/#rpg
- 校園導覽：https://coolokey.github.io/daxi-campus-map/proposal/#campus
- 教務處目的地：https://coolokey.github.io/daxi-campus-map/proposal/#campus?to=academic

## 檔案位置

`public/proposal` 是已建置的靜態展示檔，隨既有 GitHub Pages 工作流程發布。根目錄既有校園導覽保持原用途。

`submission-source/portal` 保存入口 HTML、CSS、JavaScript、封裝與查核腳本。

`submission-source/rpg-source.zip` 保存本次 RPG 的 React、TypeScript、Phaser 原始碼、題庫、測試及校園地圖。使用來源壓縮包可避免報名專案的測試被校園導覽專案重複執行。原始教師肖像未納入本儲存庫的報名版本。

校園導覽完整來源位於本儲存庫原有的 `src`、`public/campus-explorer` 與 `scripts`。

## 重建 RPG

先將 `submission-source/rpg-source.zip` 解壓縮到獨立資料夾，在解壓縮後的 `github-rpg-source` 內執行：

```text
pnpm install --frozen-lockfile
pnpm test
pnpm exec tsc -b
pnpm exec vite build --base ./
node scripts/verify-startup.mjs
```

報名版使用 `presentation.html` 的原生 Canvas 探索程式，僅使用虛構研究員；發布時將建置後的 `presentation.html` 複製為 `public/proposal/rpg/index.html`。React 數學任務按需載入，原 Phaser 開發版仍由原始 `index.html` 建置保留。原 Phaser 開發預覽須使用 `?presentation=1`，因為來源快照不含教師肖像。複製產物時不納入教師圖檔。

`portal/build.mjs` 保存原工作區的封裝方式，路徑以工作區的 `future-campus-rpg`、`daxi-campus-map` 為基準。此儲存庫的來源快照若重建，請將 RPG 產物放入 `public/proposal/rpg`，入口三個檔案放入 `public/proposal`，既有校園成品放入 `public/proposal/campus`，並複製 `portal/assets` 至 `public/proposal/assets`，保留展示說明。複製校園產物時排除既有的 proposal 子資料夾。更新發布檔後由既有 Pages 流程部署。

2026-10-10 效能改善：首頁與 RPG 地圖改用 WebP；雙介面只在首次進入時建立，背景場景暫停更新，校園直接載入 explorer，目的地改以同來源訊息切換。圖片最佳化腳本為 `portal/optimize-assets.py`（Python + Pillow），原始圖片保留。詳細大小與驗證紀錄見 `performance-2026-10-10.md`。Portal 回歸測試為 `node portal.test.cjs`，需在原工作區保有 future-campus-rpg 的 jsdom 依賴。

## 功能與界線

已完成：雙介面入口、可走動 RPG 場景、五題數學任務、答錯提示、徽章與匿名概念摘要；校園場所搜尋、樓層與示意帶路。

生成式 AI 尚未介接；目前回饋是本機規則。各科教材、完整戰鬥、歷史校園故事與活動管理為後續擴充。現地導航仍須由校方校核。

RPG 再次改善：production 使用 Phaser 官方 core 加上必要 2D 元件、Arcade Physics 與 Canvas renderer，引擎大小約減半；HTML 提早並行下載引擎、場景程式與地圖，首幀完成前顯示載入提示。詳見 `rpg-startup-2026-10-10.md`。原始碼快照已含 `phaser-lite.cjs`、更新的 Vite 設定及 startup budget 查核腳本；Phaser MIT 授權隨公開成品保留。

本機驗證：RPG 27 項、校園導覽 134 項、入口 2 項測試通過，兩專案建置成功，已檢查桌機與手機畫面及主要操作。本次發布不等同正式提案送出。

第三次載入改善：報名版初始 JavaScript 為 11,149 bytes，相較前版約 851 KB 減少約 98.7%。此數字不含地圖與 CSS，也不是時間保證。RPG 本次 30 項、入口 2 項測試通過；已操作驗證科技館進出、助教開啟任務、答題及手機版。詳見 `rpg-native-startup-2026-10-10.md`。
