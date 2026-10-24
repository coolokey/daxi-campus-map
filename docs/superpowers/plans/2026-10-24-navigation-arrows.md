# 自動帶路地面箭頭

目標：依使用者指定加入沿路閃動的方向箭頭，改用青綠與靛藍配色。

架構：目前發布版本為 daxi-gate-office-guide，既有 explorer.js 負責 currentNavPoints、路線重算與行走狀態。新增獨立 navigation-arrows.js，使用實際折線分段取樣，兩層 InstancedMesh 顯示有底邊的箭頭；沿用既有導航資料，不改碰撞、路線或人物移動。

設計取捨：採用青綠箭頭與靛藍底邊，比單色箭頭更容易辨識；保留低亮度靛藍路線。只有 walking 狀態依序柔和明暗變化，ready、paused、blocked 靜態顯示，抵達與取消移除；prefers-reduced-motion 使用靜態。平地箭頭貼近地面，樓梯箭頭沿斜率並額外抬高 0.16 公尺，避開高於連續行走斜面的踏階與前緣；轉角不跨越捷徑，經過身後的箭頭隱藏。

- [x] 建立真實 Three.js 幾何測試，驗證方向、樓梯表面、節點密集與資源釋放；先執行確認缺少模組而失敗。
- [x] 新增箭頭模組，接入 renderNavigationPath、publishNavigation、animate 與 clearNavigation，HTML 在 explorer 前載入。
- [x] 執行 focused Vitest、完整測試、npm run build、git diff --check，確認正式與內嵌副本同步。
- [x] 桌機與手機操作帶路，驗證靜態、脈衝、暫停、繼續、抵達、取消、樓梯及減少動態效果；保存截圖與紀錄。

驗收：實際路徑的箭頭指向目的地方向，兩色均非黃色或白色；不增加每個箭頭的 draw call；取消和重新導航釋放資源；桌機及手機沒有新增頁面錯誤。
