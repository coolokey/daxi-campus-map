# 公開授權煙火與戶外校慶氣氛音效更新

使用者授權搜尋合法素材並直接發布。這次替換三段火箭升空聲與全部三段室內掌聲，其餘十二段近爆、遠爆、碎裂及尾音維持已查核的真實錄音。共六層、十八個運行樣本，約 717 KiB。

## 查核來源

新增六份素材均在原作者 Freesound 頁明確標示 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)，可複製、修改及公開散布。未採用授權限制不符的候選素材，也未使用第三方音效站未核實的授權描述。

| 層與檔案 | 作者與來源 | 剪輯 |
| --- | --- | --- |
| launch-01.mp3 | [Rudmer_Rotteveel，336008](https://freesound.org/people/Rudmer_Rotteveel/sounds/336008/) | 火箭呼嘯，0.06–1.08 秒，避開後面的爆聲 |
| launch-02.mp3 | [Kinoton，347163](https://freesound.org/people/Kinoton/sounds/347163/) | 中距離火箭，0–1.25 秒 |
| launch-03.mp3 | [LukaCafuka，750685](https://freesound.org/people/LukaCafuka/sounds/750685/) | 實錄發射聲，0–1.4 秒 |
| crowd-01.mp3 | [kyles，629852](https://freesound.org/people/kyles/sounds/629852/) | 戶外節慶掌聲與歡呼，2–14 秒 |
| crowd-02.mp3 | [kyles，455659](https://freesound.org/people/kyles/sounds/455659/) | 戶外表演歡呼、口哨及掌聲，3–15 秒 |
| crowd-03.mp3 | [cognito perceptu，57587](https://freesound.org/people/cognito%20perceptu/sounds/57587/) | 戶外足球場掌聲，0.1–5.5 秒 |

這些聲音用來營造戶外校慶氣氛，並非大溪國中或其他學校校慶的實際現場錄音。檔案採官方公開 HQ MP3 預覽，不冒稱原始 WAV／FLAC；全數自網站本機提供，播放時不依賴 Freesound 外連。

保存來源音檔、作者、授權網址、查核日期、實際 CDN 網址、來源與成品雜湊、剪輯參數及精簡 license-record.json。來源頁的整份 HTML 未再散布，避免連同網站介面與留言一起發布。詳見 `public/campus-explorer/assets/sounds/LICENSES.md` 與 `manifest.json`。

## 實作及操作

`scripts/download-licensed-fireworks.ps1` 可重新下載與核對 CC0；`scripts/prepare-firework-audio.py` 產生裁切、濾波、正規化與淡入淡出版本。`npm run build` 同步主站和展示站。音效模組重新驗證 manifest，並用各音檔 SHA-256 版本參數防止舊音檔快取。

操作不變：點「80 週年煙火秀」，再點「開啟音效」；可調整音量、靜音、停止及重播。近／遠爆聲與視覺、混音上限及場景操作沿用原系統。

## 驗證紀錄

測試包含來源／成品雜湊、六份新素材 CC0 紀錄、舊快取避免、瀏覽器實際解碼十八檔、每檔 HTTP 與 SHA-256、混音峰值、行走、停止清理、手機觸控及任務獎勵。

本機已通過 39 組、142 項單元測試與正式建置。桌面瀏覽器確認 18 個 HTTP 音檔與 SHA-256 均符合新版，成功解碼並播放聲源；無資源 404、腳本／shader 錯誤，行走、重播、低動畫、停止清理及五題任務獎勵均通過。離線 18 聲源、音量 100% 混音峰值 0.5791、RMS 0.0579，未數位削波。第一次測試在建置尚未結束時啟動而逾時；待建置完成後重新測試已通過。

本機與公開站證據分別保存於 `qa/outdoor-sound-upgrade/local/` 和 `qa/outdoor-sound-upgrade/published/`。瀏覽器使用桌面與手機尺寸模擬；數位混音檢測不代表已實際聆聽每種實體揚聲器。
