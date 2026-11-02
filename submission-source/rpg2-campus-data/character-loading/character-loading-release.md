# 人物載入改善

2026-11-02，原 RPG 網址不變。

## 原因與修正
- 原本要等角色程式、73 KB 名冊讀取後才開始下載主角圖集。現在 HTML 提前預載選定主角、警衛及執行期名冊。
- 執行期名冊由 72,966 bytes 縮為 31,702 bytes（減少約 56.6%），保留 109 位角色、名稱、職稱、搜尋目的地、圖集、立繪、八方向與腳底錨點。原始完整名冊與原圖不修改。
- 角色圖片維持既有 WebP 品質；不下載全部 109 位人物圖集。背景輪替仍只預備下一小批。
- 圖片未就緒時，輪替保留目前人物；錯過該次輪替會等待後續輪替，不顯示新的載入方塊。載入失敗仍能使用原重試功能。
- 啟動時不再建立隱藏的 109 位名冊卡片，開啟名冊才建立。圖片設為非同步解碼。

## 測試
3 個測試檔、20 項通過，包含慢圖片輪替回歸、完整名冊欄位一致、活動人物、角色搜尋與重試。TypeScript 與 Vite 正式建置通過。瀏覽器名冊顯示 109 位角色、91 位教師，搜尋校長可得到正確結果，未記錄錯誤或預載警告。

未對不同網路環境做冷快取秒數基準，因此不宣稱固定秒數提升；改善的是請求啟動順序、名冊傳輸量、啟動 DOM 工作量與輪替等待行為。

## 檔案
`presentation.html`、`src/presentation/character-world.ts`、`src/presentation/character-runtime.test.ts`、`src/presentation/character-manifest.test.ts`、`public/data/rpg-characters-runtime-v1.json`、`scripts/optimize-character-loading.py`、`scripts/stage-character-loading-release.py`。

備份：`backups/character-loading-before-20261102.zip`（來源為上一個正式版本 53881dd 的來源封存）；Git 備份分支：`backup/rpg-before-character-loading-20261102`。
