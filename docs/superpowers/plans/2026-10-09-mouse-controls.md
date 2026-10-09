# Mouse Controls Implementation Plan

**Goal:** 套用大勇滑鼠手勢與回復機制。
**Architecture:** mouse-controls-model 純數學；mouse-controls DOM／pointer 生命週期；原 animate 與 cameraPose 接線。
**Tech Stack:** Three.js r128、原生 Pointer Events、Vitest／JSDOM。

- [x] 先測試邊緣轉向、指數平滑、滾輪界限及 cameraPose 參數。
- [x] 建立獨立 mouse-controls module，移除舊匿名滑鼠事件，固定鳥瞰手勢。
- [x] 驗證模式、取消／失焦、偏好及設定阻擋，確認觸控不退化。
- [x] 桌機瀏覽器檢查與獨立審查、全測試、建置與空間驗證。
- [x] 精確提交發布既有專案，查核公開頁與截圖。
