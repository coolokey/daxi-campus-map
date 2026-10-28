# 六角冒險校園與建築間距調整

本次依使用者要求，保留原有 RPG 與網址，採原創六角草地、低矮卡通校舍及清晰三心階段卡；不是 PaGamO 的素材或領土對戰系統。

## 真正可行走的間距

室外每棟依原始 bounds 中心等比例收整至 74%，所有同棟翼樓採相同中心，維持相對位置與形狀。碰撞、structures、小地圖、導航及入口同步轉換。人物尺寸不變。建築低矮屋頂不外伸，減少視覺擠壓。科技館與藝術館原約 3 單位的間隔增加至約 8 單位以上。室內 Building → Floor → Room → Challenge 原資料完全保留，室外縮尺為遊戲探索表現，不是現況測繪尺寸。

保留木藝對照按鈕。兩種外觀沿用相同新通道與入口。校園導覽網站、原始校園圖、模型 JSON 不變。

## 修改檔案

- public/data/cartoon-campus-v1.json：外觀、縮尺及獨立建築色彩。
- src/presentation/cartoon-layout.ts：共用室外座標轉換。
- src/presentation/cartoon-renderer.ts：六角地景、低矮校舍、可視範圍裁切及遮擋。
- src/presentation/model-world.ts：建築、碰撞、入口同步。
- src/presentation/model-renderer.ts、boundary-renderer.ts：繪圖整合與圍牆顯示高度。
- src/presentation/woodland-furniture.ts：依新入口避讓座椅。
- src/presentation/main.ts、realistic-campus.ts、fullscreen.css、src/components/three-centers.css：外觀切換與提示。
- src/presentation/portal-target.ts：重疊互動範圍依距離選最近可見入口。
- src/presentation/cartoon-campus.test.ts：三種比例、入口可達、碰撞、深度遮擋回歸。
- scripts/stage-hex-campus-release.py：同網址發布包與可恢復原始碼封存。

## 驗收

自動驗證：1／1.5／2 倍的每棟中心、占地與碰撞一致、全部室外入口可導航、低屋頂遮擋；既有樓梯教室三心題目回歸。瀏覽器：桌機、平板、手機短長螢幕、橫向、進入科技館、三心提示與對照切換。結果另見 results.json。
