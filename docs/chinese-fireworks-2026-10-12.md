# 大溪國中 80 週年雙行煙火

## 操作與完成內容

原網址 https://coolokey.github.io/daxi-campus-map/ ，導覽封面與右側都有「80 週年煙火秀」。點擊開始即啟用真實錄音，預設音量 100%；可靜音、調整音量、停止、再次觀看、切換觀賞視角。畫質可選自動／高畫質／標準／省電；降低動畫與系統 reduced-motion 另外控制動態。

0–3 秒倒數並入夜，3–10 秒零星煙火，10–18 秒密集表演，18–23 秒兩波金色煙火形成上排 `80週年`、下排 `大溪國中 生日快樂`，23–27 秒完整展示，27–30 秒飄落淡出並還原校園。六種煙火：菊花、彩球、垂柳、扇形、連發、環狀。

兩行均為 Three.js Points，共 7,970 個粒子，不以 HTML、圖片或貼圖替代。使用 Noto Sans TC OFL 字體在建置工具內載入、檢查完整字元並採樣。普通煙火保留建築深度遮擋；文字使用鏡頭對齊平面，避開面板，保持閱讀清晰。低動畫模式不發射／閃光／漂移，提前靜態展示粒子並淡出。

## 主要檔案

- `public/campus-explorer/anniversary-model.js`：階段、發射編排、環狀速度、品質與文字安全區。
- `public/campus-explorer/firework-scene.js`：共用 Three.js 場景、煙霧、光線、兩波編隊、餘燼、資源釋放。
- `public/campus-explorer/firework-text-targets.js`：兩行完整字形點位。
- `public/campus-explorer/anniversary-fireworks.js`、CSS、index.html：入口、控制、環境還原與生命週期。
- `public/campus-explorer/firework-audio.js`：真實錄音的大小煙火差異，保留混音限制與空間聲。
- `public/campus-explorer/assets/fonts/`、`scripts/prepare-firework-text.py`：OFL 授權、字體子集、採樣來源與重建工具。
- `scripts/sync-anniversary.cjs`：同步嵌入式導覽；`public/proposal/campus/campus-explorer/` 使用同一套模組。
- `tests/anniversary-*.test.ts`、`tests/firework-*.test.ts`、`scripts/verify-immersive-fireworks.cjs`：單元與實際瀏覽器驗收。

## 音效及授權

保留已實際下載的 18 個樣本、6 層各 3 個：升空、近距爆炸、遠距爆炸、碎裂、尾音、戶外群眾。大型與小型爆炸使用既有真實錄音，依煙火規模調整音量、音高及播放長度，並非新增的獨立實錄素材。聲速延遲、距離衰減、低通濾波、左右定位、回響與 18 聲部限制持續使用。

來源及完整授權在 `public/campus-explorer/assets/sounds/LICENSES.md`：Freesound 的 Rudmer_Rotteveel、Kinoton、LukaCafuka、kyles、cognito perceptu（CC0，官方 HQ 預覽）；OpenGameArt rubberduck（CC0）；Wikimedia Stephan（公有領域）。音檔與來源雜湊記錄於 manifest.json／sources。無需額外提供音檔即可播放；若希望群眾聲就是大溪校慶現場，可另外提供有公開使用授權的錄音替換 crowd 樣本。

## 自訂

文字：修改 `scripts/prepare-firework-text.py` 的 labels，以官方 TTF 執行採樣後重新建置。腳本需 Pillow 與 fontTools。字體來源與 OFL 全文在 assets/fonts，目標資料含原始 TTF SHA-256。

顏色：修改 firework-scene.js 的 palettes、文字 add(text…) 的金／紅色值。時間：同步調整 anniversary-model.js 的 phaseAt／createCues、場景文字起始時間與淡出區間、控制器夜景／音量區間，再執行測試。

## 驗證紀錄

完整 39 組／146 項測試通過；最後的音效淡出與橫向介面修正另經 4 組／22 項煙火相關測試通過，正式建置成功。原有行走、碰撞、導航、樓層、場景等測試持續通過。本機驗收受 8 GB 記憶體與軟體 WebGL 渲染影響，採依序測試；第一次併行檢查曾發生時間限制及 Node 原生退出，釋放測試瀏覽器後重新通過，未將失敗視為完成。

瀏覽器驗收 JSON 與桌面／平板／手機／橫向截圖位於 `qa/chinese-fireworks/`。檢查錄音實際解碼及聲源排程、18 檔 HTTP 與 SHA-256、混音波形、操作／回復、兩行字形與安全區。真實 iPad／iPhone Safari、Android 裝置、實體耳機主觀音質仍需實機驗收，瀏覽器尺寸與觸控模擬不能代替。
