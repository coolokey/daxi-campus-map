# 晴日繪本校園美術更新

日期：2026-11-02。既有 RPG 路徑保持 `/daxi-campus-map/proposal/rpg/`，獨立校園導覽與原始平面圖、照片不變。

## 本次完成
- 全校草地改為較柔和的自然綠，減少高頻紋理；既有樹木、生態花境、農場、蘭亭與活動人物保留。
- 11 組樓館色彩統一為柔和色系，保留各棟辨識色。建築增加窗框、窗內暗部、簷下陰影、立面角柱、基座與屋頂細縫，所有細節維持在舊模型範圍內。
- 主要鋪面與校門／椰林大道改用快取細石磚；自然小徑保留土色與草石邊緣。大道三處及校內原有入口廣場增加低對比迎賓地面圖案。
- 建築、椰樹增加一致方向的落地陰影；操場內場增加淡色草坪修剪帶，不更動跑道及正規線條。
- 每棟建築只保留一份近距離名稱，移除每個屋頂翼段重複的樓層徽章；完整樓層資料與入口仍由原有校園建築目錄提供。
- 三心階段使用各站既有橙／藍／紫色，保留編號、目前／未解鎖／完成狀態。正常高度顯示「找線索 → 完成兩題 → 下一站」，短螢幕隱藏次要流程列。

## 驗證
- `npm run build`：TypeScript 與正式建置通過。
- 既有完整回歸：57 個測試檔、187 項測試通過。之後僅調淡磚色、短畫面流程列、刪除重複屋頂文字，重新建置通過。
- 程式審查：未發現重要問題；已修正短螢幕流程列覆蓋原有隱藏規則的風險。
- 實際瀏覽器：導航抵達科技館入口，互動進入 1F，室內導航能繼續。
- 原有碰撞、道路位置、1／1.5／2 世界縮放、任務資料、角色尺寸與人數未修改。未增加外部素材、角色圖片、定時器或網路需求。
- 手機、平板、正式發布的最後驗證詳見 `output/storybook-qa/results.json` 與 `published-verification.json`。

## 修改檔案
`src/presentation/storybook-materials.ts`、`storybook.css`、`model-renderer.ts`、`meadow-renderer.ts`、`cartoon-renderer.ts`、`entrance-renderer.ts`、`three-centers-guide.ts`、`main.ts`；`public/data/meadow-theme-v1.json`、`cartoon-campus-v1.json`；`scripts/prepare-storybook.py`、`apply-storybook.py`、`stage-storybook-release.py`；本報告與實作計畫。

備份：`backups/rpg-before-storybook-20261102.zip`；發布備份分支：`backup/rpg-before-storybook-20261102`。這是風格化美術提升，沒有宣稱新增完整人物動畫／生態模擬或實測校園建模；既有功能繼續沿用。
