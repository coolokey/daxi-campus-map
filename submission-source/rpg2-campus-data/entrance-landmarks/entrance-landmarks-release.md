# 校門地標與椰林大道補齊

## 來源對照

參考最新已發布的校園導覽實際原始碼，根目錄與 proposal 內嵌副本的入口相關檔案雜湊一致。未用截圖推測位置、未修改導覽網站或原始平面圖。

| RPG 追加項目 | 導覽來源 | 保留資料 |
|---|---|---|
| 椰林大道 | entrance-avenue.js | x=-36、z=89～171、路寬 9、20 棵樹的座標與高度 |
| 街口溪生態步道入口 | entrance-avenue.js | 牌位 x=-61／z=84、牌面方向、入口與步道路徑 |
| 蔣公銅像庭園 | explorer.js | 入口軸線 target x=-36／z=28.5、4.2×3.4 基座與銅像輪廓 |
| 司令台及旗桿 | outdoor-world.js、campus-model-v2.json | x=-62 主體、正面階梯、後側牆與兩側柱、三支旗桿 |
| 校門高塔與金球 | campus-boundary-v1.json | 原模型組件；恢復較明顯高度並修正金球被門柱覆蓋的排序 |

RPG 採卡通美術轉換，導覽尺寸本身為示意，非實地測繪。司令台採平面移動與開放正面，兩側及後側牆有碰撞；未新增高低差物理引擎。

## 實作

校園世界南界由 z=112 延伸至 z=182，足以完整走訪大道。玩家尺寸、原建築位置與 74% 室外占地、樓層教室及三心題目不變。新增碰撞只涵蓋椰樹樹幹、標牌細柱、銅像基座、司令台牆柱與旗桿；樹冠下仍可走。地標採可視範圍裁切、依玩家腳點深度排序與遮擋淡出。

「校園建築 → 校門地標與椰林大道」可設定四個地標導航（在室外使用）。小地圖同步顯示大道範圍與地標。導航金線繪製於所有新地面上方。

## 修改檔案清單

- public/data/entrance-landmarks-v1.json：含來源雜湊、道路、樹列及地標資料。
- public/data/cartoon-campus-v1.json：校門圍牆顯示高度。
- scripts/export-entrance-landmarks.cjs：唯讀匯出導覽資料。
- src/presentation/entrance-landmarks.ts、entrance-renderer.ts：碰撞定義與卡通繪圖。
- src/presentation/model-world.ts、model-renderer.ts：世界範圍、碰撞與繪圖順序。
- src/presentation/boundary-renderer.ts：金球排序。
- src/presentation/campus-directory.ts：地標導航選項。
- src/game/data/types.ts、src/game/world-hud.ts：地標與大道的小地圖資料。
- src/presentation/entrance-landmarks.test.ts：來源、三種比例、可達與碰撞測試。
- src/presentation/realistic-campus.test.ts：對照模式標題測試與目前木藝模式名稱一致。
- scripts/stage-entrance-release.py：同網址發布及原始碼封存。

## 驗收

自動測試檢查 1／1.5／2 倍的大道中線通暢、全地標與建築入口可達、樹幹及基座碰撞一致。瀏覽器實走校門至大道末段、導航回校園、檢查地標、手機及平板小地圖；詳細結果見 results.json。備份：backups/rpg-before-entrance-landmarks-20261028.zip、Git 分支 backup/rpg-before-entrance-landmarks-20261028。
