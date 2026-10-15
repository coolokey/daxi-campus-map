# 新照片校舍改善 Implementation Plan

> **For agentic workers:** Use subagent-driven-development for independent landmark implementation and review; preserve the existing checkout and explicitly stage only this task's files.

**Goal:** 依新照片校正行政樓、教學樓、走廊與入口景觀，檢查後發布至原網址。
**Architecture:** 既有配置與導航不重寫；行政樓既有模組修改，教學外觀與銅像獨立模組；共用配色沿既有 surfaceMaterials 管理。同步嵌入版。
**Tech Stack:** Three.js、Vite、Vitest、jsdom。

- [x] 核對 17 張圖，備份來源，使用者確認範圍不含藝術館與科技館。
- [ ] 行政樓：先建立入口淨空與高柱回歸測試，更新門廊、窗格、獎盃櫃、植栽與 4 格方塊。
- [ ] 教學樓／走廊：校正灰石／綠牆配色，增添窗格、藍色線條、圓弧外牆裝飾；避免門牌與樓梯口。
- [ ] 獨立任務：照片銅像與門柱細節，新增測試；不改 ID 或阻斷既有路線。
- [ ] 全面檢查：相關測試、完整導航碰撞報告、電腦／手機畫面；程式碼審查。
- [ ] 同步嵌入版、build、明確檔案 commit/push，等待部署成功並確認正式版。

Ruling: 沿用使用者既有 checkout 並備份，避免與既有未提交 QA 檔案混入；只提交本次來源、測試與文件。
Ruling: 藝術館、科技館不更動，依使用者已回覆範圍。

Ruling: 使用者追加 1151015空拍圖，11張已完成視覺核對；更新範圍包含藝術館與科技館可辨識的外觀與屋頂。新增 photo-roofs.js，原導航空間保持不變。
- [x] 獨立景觀任務完成（2 項測試通過）。
- [x] 行政入口／教學外觀 6 項測試通過；屋頂 4 項測試通過。
- [x] 完整導航圖與 11 條移動路線驗證通過。

Ruling: 視覺 QA 發現藝術館 depth=32 造成長條比例，與空拍短方塔不符；依比例改 depth=18、z=34，保留 width=14／4層與房間 ID。科技南側與藝術北側間距約 2 示意單位；非實測。重新跑空間、樓梯、藝術館移動路線及屋頂測試。

- [x] 電腦抵達藝術館美術教室 4F，手機從 4F 下樓並抵達科技館電腦教室一 1F，console errors=[]。
- [x] 程式碼審查及藝術館縮短量體複查：無重要問題。
- [x] 正式 build 與嵌入版同步通過。
- [x] 完整 suite 255 passed / 1 timeout；手機逾時測試單獨重跑通過；藝術館調整後屋頂／空間／walk／mobile 共30項通過。
Ruling: 遠端main有一筆封面載入優化d8a13bf，先整合保留該修正，再測封面與建立正式版本，避免覆蓋其他已發布工作。
