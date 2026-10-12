# 煙火錄音來源與替換說明

查核日期：2026-10-12。版本 cc0-outdoor-20261012。此目錄的 18 個 MP3 為真實錄音裁切與處理版本，不是電子合成煙火。六層各三個樣本；升空與群眾層各採三份不同錄音，其餘部分層是同一現場的不同片段，並非 18 場獨立錄音。

| 原作者／來源 | 授權 | 使用方式 |
| --- | --- | --- |
| [rubberduck：25 CC0 bang / firework SFX](https://opengameart.org/node/92774) | CC0 1.0 | 錄自煙火；採用 fw_01–06。近爆為原錄音編修，遠爆以低通模擬距離，尾音取原爆聲衰減段。來源套件另有經 pitch 處理的素材，本次未採用。 |
| [Stephan：Fireworks.ogg](https://commons.wikimedia.org/wiki/File:Fireworks.ogg) | Public domain，PD-author／PDSounds | 實際 crackers 現場，現用於碎裂層；可能保有現場背景雜音。 |
| [Rudmer_Rotteveel：Whistle and Explosion Single_Firework](https://freesound.org/people/Rudmer_Rotteveel/sounds/336008/) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | Tascam DR-05 實錄火箭，擷取爆聲前呼嘯作 launch-01。 |
| [Kinoton：Firework Single Rocket #1](https://freesound.org/people/Kinoton/sounds/347163/) | CC0 1.0 | 中距離火箭，DR-60D MkII／AKG C 1000S 錄製，作 launch-02。 |
| [LukaCafuka：Firework Launch (2)](https://freesound.org/people/LukaCafuka/sounds/750685/) | CC0 1.0 | 作者記載為 2019 跨年前實錄升空聲，作 launch-03。 |
| [kyles：Outdoor festival performance](https://freesound.org/people/kyles/sounds/629852/) | CC0 1.0 | 戶外節慶表演掌聲與歡呼，作 crowd-01，擷取 2–14 秒。 |
| [kyles：Outdoor show enthusiastic whistling](https://freesound.org/people/kyles/sounds/455659/) | CC0 1.0 | 戶外表演歡呼、口哨與掌聲，作 crowd-02，擷取 3–15 秒。 |
| [cognito perceptu：applause.wav](https://freesound.org/people/cognito%20perceptu/sounds/57587/) | CC0 1.0 | 戶外足球場群眾掌聲，作 crowd-03，擷取 0.1–5.5 秒。 |

保留下載的來源檔於主站此目錄的 `sources/`。新增 Freesound 檔案為官方公開 HQ MP3 預覽版本，不冒稱原始 WAV／FLAC，無需登入、網站運行也不外連 Freesound。`freesound-cc0-provenance.json` 與各 license-record.json 記錄作者、CC0 連結、查核日、實際下載網址及雜湊。`manifest.json` 記錄各裁切時間、處理與來源／成品 SHA-256。可用 `scripts/download-licensed-fireworks.ps1` 重新取得；下載程式先核對作者頁 CC0 連結，缺少授權即停止。

群眾聲是公開素材的戶外節慶／表演／球場錄音，用於營造校慶氣氛，並非大溪國中師生或本校校慶現場。舊版室內掌聲 `sources/applause.wav` 只保留歷史來源，已不再載入，原授權為 eXpl0it3r 的 [CC0](https://opengameart.org/content/applause-in-a-large-hall-or-church)。展示站僅複製運行所需的 MP3、manifest 與本文件。列出作者不表示作者替本校背書。

處理腳本：`scripts/prepare-firework-audio.py`。需本機 Python、FFmpeg、FFprobe；執行後重新 build，同步展示站。成品為 stereo MP3、44.1 kHz、112 kbps，合計約 717 KiB；正規化目標 I=-24 LUFS、TP=-7 dB，並做短淡入淡出。運行時另處理少量播放速率變化、距離濾波與卷積回響。manifest 會重新驗證快取，MP3 以 SHA-256 版本參數載入，避免新版本沿用舊室內掌聲快取。

## 更換素材

六層檔名為 `launch-01..03.mp3`、`near-01..03.mp3`、`far-01..03.mp3`、`crackle-01..03.mp3`、`tail-01..03.mp3`、`crowd-01..03.mp3`。可直接換成同名檔案，並更新 manifest 的來源、授權、時間與雜湊；若改檔名，需同步 manifest.layers。每層保留至少三段。音檔路徑以頁面目錄解析，可在 GitHub Pages 子目錄運行。

目前無需另外提供音檔。若希望進一步提升臨場感，可提供已獲公開散布許可的乾淨火箭呼嘯、不同口徑爆聲、戶外群眾錄音與授權證明，建議 WAV／48 kHz／24-bit。錄音需避免可辨識的私人談話。若缺檔、下載或解碼失敗，介面會顯示成功數與缺少數，該樣本保持無聲，不會用合成聲假冒載入成功。
