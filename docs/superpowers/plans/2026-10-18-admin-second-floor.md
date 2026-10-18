# 行政大樓二樓配置修正

**Goal:** 依第二版核定草案，將油印室配置於校長室前方，入口面向上樓動線；男女廁位於人事室／會計室前方。維持網站網址及一、三樓配置。

**Architecture:** 沿用 CampusSpatialData 目的地及 CampusSpatialPlan 共用幾何，僅覆寫行政樓二樓。保留已發布的一樓旋轉座標與實際樓梯井；二樓保留樓梯安全淨空，以走廊銜接辦公室。正式及 proposal 副本由同步腳本產生。

**Tech Stack:** classic JavaScript、Three.js、Vitest、Vite、GitHub Pages。

- [ ] 新增配置測試，確認油印室／校長室前後、單一廁所／人事會計前後、門口通行及樓梯不重疊，先驗證失敗。
- [ ] 更新 spatial-plan-data.js，保留 reception、general 等既有 ID，新增人事會計目的地，遷移舊預設名稱。
- [ ] 更新 spatial-plan.js 的二樓幾何與顯示列；一、三樓與既有樓梯保持相容。
- [ ] 執行配置及場景測試、建置，檢查真實門口碰撞與導航。
- [ ] 審查變更並同步副本，提交至 main，確認對應 SHA 的 Pages 發布成功。
- [ ] 正式與 proposal 入口桌面／手機驗收，確認二樓、切換樓層、入口導航、資源載入無錯誤，保存證據。
