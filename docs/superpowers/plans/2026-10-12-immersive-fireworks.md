# Immersive Anniversary Fireworks Implementation Plan

**Goal:** 完整升級校慶煙火，同時保留校園／任務／觸控，使用有授權紀錄的真實音檔。
**Architecture:** 既有 WebGL 場景中的粒子系統與非模態 HUD；獨立聲音層；透過單一 frame hook 與同源任務事件整合。
**Tech Stack:** Three.js r128、Web Audio、Vite、Vitest、Playwright、FFmpeg。

- [x] 先加入時間軸、物理、文字與品質測試，確認缺少新行為時失敗，再改 anniversary-model.js。
- [x] 下載來源，保留原檔與授權；裁切並標準化 MP3，相同類別至少三段；產生 manifest、授權紀錄與波形峰值報告。
- [x] 先加入音檔載入／失敗／停止／競態測試，再實作以錄音為基礎的 Web Audio 模組。
- [x] 先加入場景粒子遮蔽／清理測試，再實作 Points、物理尾跡、煙霧、環境閃光與 80 聚合。
- [x] 改為非模態 HUD 與 frame hook；整合桌面／手機控制、顯式任務解鎖及背景暫停。
- [x] 同步展示站校園內容，加入能源核心任務完成通知與使用者主動領取獎勵入口。
- [x] 執行完整測試／建置、桌面／iPad／手機瀏覽器與 Web Audio OfflineAudioContext 混音驗證。
- [x] 程式審查並處理問題，更新操作與素材文件，沿既有 GitHub Pages 發布及線上驗證。
