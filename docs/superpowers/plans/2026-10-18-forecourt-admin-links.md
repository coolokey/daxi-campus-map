# 前庭、行政主屋頂及三層連通 Implementation Plan

> **For agentic workers:** Use subagent-driven-development for independent roof and forecourt work; root owns connected geometry/navigation. Follow existing worktree and user-authorized release.

**Goal:** 實作已確認改善圖，保留學生活動中心與行政二樓用途，原網址發布。

**Architecture:** 前庭由獨立場景模組建立，地面標線不設碰撞、樹幹有實體碰撞；行政主屋頂由 photo-facade 單一產生，photo-roofs 不重複建立分棟屋頂；spatial-plan 的三層連接資料同時驅動樓板、護欄與導航。九年級走廊改在行政樓側，教室順序與樓層保留。

**Tech Stack:** JavaScript、Three.js、Vitest、既有 Pages pipeline。

## Tasks
- [x] 前庭：新增 campus-forecourt.js 與 index script；gate 軸向 -Z 對前庭停車區，6 個簡略標線；警衛 (6,86) 與行政 (z15.5..43.5) 間 z54..70 種樹，留通行線。新增用途名稱，不覆蓋綜合大樓 parking-lot。先測試契約失敗再實作。
- [x] 屋頂：單一行政 mainRoof envelope u[-13,13] v[-15.5,5]，排除外接連通廊。這個 2.5 公尺間隙是既有內部通廊，與外接空地分開處理。保持 façade、室內與活動中心模型完全不變；測試只有一個行政主屋頂、包覆已確認行政主體。
- [x] 三層連接：先新增上下對位與同層行走失敗測試；保留 906/907/908 等順序，grade9 走廊朝西／行政側。橋廊從行政中央通廊出口沿棟間空隙接到 907/904/902 門前走廊。junction 提供 path，不穿房間。三層均有地板，2/3F 邊界有護欄。所有橋廊節點同樓高。
- [x] 實體與導航：逐段以玩家碰撞走完整橋廊，避免路徑只在 graph 可達；驗證同層目的地不下樓、三層跨棟 ID 正確；保留二樓門向與一到三樓連續梯井。
- [ ] 整合：覆核；完整測試、build/sync；正式／提案桌面手機本機與線上真實動畫帶路。記錄 activities center 配置/幾何不變。
- [ ] 發布：僅提交本次來源及同步副本，push main，等對應完整 SHA Actions success，再執行公開網址 QA。

Ruling: 不能將外接橋廊直接穿過 907 後牆，因此九年級走廊朝行政側，橋廊沿棟間空隙接同層教室門前。外接橋廊不併入行政主屋頂；尺寸仍是示意。

驗證：完整 60 檔 350 項測試通過、build 通過；本機正式／提案入口合計 14 條真實自動帶路通過，含手機與同層橋廊；無瀏覽器錯誤。活動中心模型經唯讀覆核與基準完全一致，僅新增通用空 externalLinks 欄位。發布後驗收另記於 qa。
