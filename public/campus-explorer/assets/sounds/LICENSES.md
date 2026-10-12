# 煙火錄音來源與替換說明

查核日期：2026-10-12。此目錄的 18 個 MP3 為真實錄音裁切與處理版本，不是電子合成煙火。六層各有三個可隨機選用的樣本；部分層來自同一段現場錄音的不同時間，並非 18 場獨立錄音。

| 原作者／來源 | 授權 | 使用方式 |
| --- | --- | --- |
| [rubberduck：25 CC0 bang / firework SFX](https://opengameart.org/node/92774) | CC0 1.0 | 錄自煙火；採用 fw_01–06。近爆為原錄音編修，遠爆以低通模擬距離，尾音取原爆聲衰減段。來源套件另有經 pitch 處理的素材，本次未採用。 |
| [Stephan：Fireworks.ogg](https://commons.wikimedia.org/wiki/File:Fireworks.ogg) | Public domain，PD-author／PDSounds | 實際 rockets、screamers、crackers 現場。擷取不同呼嘯及碎裂片段，濾波後仍可能保有背景雜音。 |
| [eXpl0it3r：Applause in a large hall or church](https://opengameart.org/content/applause-in-a-large-hall-or-church) | CC0 1.0 | 教堂音樂會室內掌聲，取三段作為慶祝背景；並非大溪國中師生或戶外校慶的現場錄音。 |

保留原始檔於主站此目錄的 `sources/`。`manifest.json` 記錄作者、來源頁、來源 SHA-256、各片段開始時間／長度／FFmpeg 濾鏡與成品 SHA-256。展示站僅複製運行所需的 MP3、manifest 與本授權文件。開源授權允許再散布；列出作者是保留出處，非表示作者替本校背書。

處理腳本：`scripts/prepare-firework-audio.py`。需本機 Python、FFmpeg、FFprobe；執行後重新 build，同步展示站。成品為 stereo MP3、44.1 kHz、112 kbps，合計約 610 KiB；正規化目標 I=-24 LUFS、TP=-7 dB，並做短淡入淡出。運行時少量隨機播放速率變化、距離濾波與簡單卷積回響另外處理。

## 更換素材

六層檔名為 `launch-01..03.mp3`、`near-01..03.mp3`、`far-01..03.mp3`、`crackle-01..03.mp3`、`tail-01..03.mp3`、`crowd-01..03.mp3`。可直接換成同名檔案，並更新 manifest 的來源、授權、時間與雜湊；若改檔名，需同步 manifest.layers。每層保留至少三段。音檔路徑以頁面目錄解析，可在 GitHub Pages 子目錄運行。

目前無需另外提供音檔。若希望進一步提升臨場感，可提供已獲公開散布許可的乾淨火箭呼嘯、不同口徑爆聲、戶外群眾錄音與授權證明，建議 WAV／48 kHz／24-bit。錄音需避免可辨識的私人談話。若缺檔、下載或解碼失敗，介面會顯示成功數與缺少數，該樣本保持無聲，不會用合成聲假冒載入成功。
