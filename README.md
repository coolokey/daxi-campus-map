# 大溪國中校園導覽

依 115 學年度校園平面圖與實景照片改善的互動場景。2026-10-08 沿用使用者提供之複製資料夾 `daxi-3d-campus`，加入樓層校對、屋頂修正、實景材質、植栽與導覽視角。

## 功能

- 全校鳥瞰、校門廣場、中庭與運動園區視角。
- 滑鼠旋轉縮放、人物漫遊、手機方向鍵、速度與轉頭設定。
- 處室／班級搜尋、自動帶路、樓層剖切與日光／暖陽切換。
- 左下角人物定位小地圖：跟隨位置及視線朝向，顯示目前區域與人物所在樓層。
- 115 校園平面圖與實景照片對照；手繪美術圖另列為概念參考。
- `?to=academic`、`?to=701`、`?to=art-4f` 等目的地連結。
- 舊版對照：`?viewer=legacy`；既有目的地由入口轉換。

## 本機執行

```bash
npm install
npm run dev
```

測試與建置：

```bash
npm test
npm run build
```

## 正式預覽

```powershell
node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 5179
```

開啟 http://127.0.0.1:5179/，或使用專案上層的「預覽改善版校園.cmd」。

## 程式與來源

目前入口 `src/App.tsx` 載入 `public/campus-explorer/index.html`；`campus-data.js` 為單一建築與房間配置，`explorer.js` 管理渲染與導航，`art-direction.js`／`.css` 管理美術與介面。場景保留原版全域 JavaScript 結構，降低移植功能回歸風險。

移植前入口保留於 `src/LegacyCampusApp.tsx`，原始移植程式保留於 `docs/scene-rebuild/source-original.html`。`scripts/import-explorer.py` 可重新產生基本場景，會覆寫場景資料、程式、基本樣式與 HTML，不覆寫美術層與圖檔。

Three.js r128 與 OrbitControls 已本地化，授權見 `public/campus-explorer/vendor/NOTICE.md`。字型使用 Google Fonts，離線時使用本機替代字型。

## 驗證與限制

`npm test` 包含建築關係、班級樓層、導航可達性及連結相容測試。`scripts/verify-explorer.cjs` 使用 Playwright 驗證實際頁面、屋頂中心、搜尋、自動帶路啟動、樓層、平面圖與手機畫面，證據保存在 `qa/`。其他環境可設定 `CAMPUS_PLAYWRIGHT_PATH` 與 `CAMPUS_QA_URL`。

平面圖用於建築關係與樓層，照片用於配色。模型尺寸與導航距離為示意，並非現地測量；尚未逐扇門勘查室內動線。教師與 RPG 題庫未變更。

## 公開網址

https://coolokey.github.io/daxi-campus-map/

推送本儲存庫的 `main` 分支後，由既有 GitHub Actions 部署到同一個 GitHub Pages 網址。人物定位小地圖可使用 `scripts/verify-minimap.cjs` 驗證，設定 `CAMPUS_QA_URL` 即可測試公開頁面。
