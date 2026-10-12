# 校園世界與 NPC 升級發布

發布位置維持 https://coolokey.github.io/daxi-campus-map/proposal/rpg/ ，雙介面入口仍為 https://coolokey.github.io/daxi-campus-map/proposal/#rpg 。

本次更新 `public/proposal/rpg` 與 `rpg-source.zip`，不修改根目錄校園導覽或另一個 daxi-80th-campus-rpg 儲存庫。發布前基準 commit：7c35b9f。需還原可 revert 本輪發布提交，由既有 Pages 流程重新發布。

加入 1／1.5／2 倍世界配置、小地圖、研究室地圖切換、全圖導航目標，以及資料驅動的學生／巡邏機器人。公開展示延續虛構研究員設定，不含教師肖像。共 4 位校園 NPC，未呈現為真實在線人數；多人後端尚未實作。

來源快照含 React／Phaser 與輕量 Canvas 兩入口，新增共用縮放、巡邏與小地圖模組。重建方式沿用本目錄 README，使用 `vite build --base ./`，將 presentation.html 作為公開 index.html，排除教師圖檔。既有舊版雜湊資源保留，避免已開啟頁面的動態載入中斷。

驗收：來源 21 個測試檔／37 項測試、TypeScript／Vite 建置與啟動大小預算通過。兩入口共 17 組瀏覽器情境通過。公開包另於相同 `/proposal/rpg/` 子目錄測試比例、NPC、導航、對話、原數學任務、390px 手機操作，無 JavaScript 錯誤或失敗請求。實體 iPad／Safari 尚未測試。

`scripts/verify-published-rpg.cjs` 位於來源快照，可用環境變數 CAMPUS_QA_URL 指定正式或測試網址，需 Playwright 與 Edge。詳細本機驗收報告包含在來源快照 docs 中。
