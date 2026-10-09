# Floor Exhibit Implementation Plan

**Goal:** 依 115 平面圖提供截圖指定的鳥瞰樓層展示。

**Architecture:** 獨立 floor-exhibit-model 處理選層／剖切／投影避讓，floor-exhibit 處理 DOM 標籤與卡片，沿用共享房間矩形與既有導航。原 animate 呼叫展示更新。

**Tech Stack:** Three.js r128、原生 DOM、Vitest／JSDOM。

- [x] 在 tests/floor-exhibit.test.ts 測試剖切、別名排除、年級色、投影避讓，先確認失敗。
- [x] 新增 public/campus-explorer/floor-exhibit-model.js；整合 explorer.js、spatial-world.js 的屋頂剖切與更新。
- [x] 新增 floor-exhibit.js／css，右側選層、房間碼、建物樓層、清單、選房卡片與名稱同步。
- [x] 桌機／手機瀏覽器驗證，測試、build、verify-spatial-world。
- [x] 精確提交本次檔案，發布同一 GitHub 專案並查核公開版本。
