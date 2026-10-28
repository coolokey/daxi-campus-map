# 校門與圍牆立體化

## 來源與設計
依現有導覽的 outdoor-plan.js、outdoor-world.js、explorer.js 原始碼對照，而非僅由截圖猜測。校門各部件記於 public/data/campus-boundary-v1.json，保留來源 SHA-256；圍牆折線仍讀原 campus-model-v2.json。尺寸屬導覽示意，並非測量值。導覽網站與原始平面圖不修改。

## 完成內容
- 單座金球主塔、白色低門柱、藍黃裝飾與校名；不捏造雙塔或跨道路牌樓。
- 收起的伸縮車行大門、向警衛室側折起的行人小門；主要小門維持開啟。
- 米白牆、淺藍牆腳、紅色雙坡瓦頂警衛室，沿用原屋身及值勤翼位置。
- 前側低牆加金屬欄杆；其餘周界為帶菱形磚紋的牆面與紅磚門柱、壓頂。
- 短牆段參與角色深度排序，遮擋玩家時淡化；材質由一張快取 Canvas 磚紋重用，畫面外的圍牆不加入繪製佇列，避免逐磚物件與整校重繪。
- 原有稀疏圍牆碰撞塊改為連續短段，修正地圖放大而人物不變大時可能出現的空隙。門柱、警衛室、收起的門與檯面有碰撞；主塔高處與屋頂不以整塊地面碰撞封住下方通道。
- 校園建物座標、樓層、課室、石磚、角色及三心任務沿用，發布網址維持原路徑。

## 驗證方式與驗收
TypeScript、正式建置與全套 43 檔案／140 項測試通過；加入畫面範圍剔除後再以 5 項邊界測試複驗，合計 141 項不同測試。瀏覽器實際從校外起點經行人小門走到校內目標，導航顯示抵達。新增測試涵蓋 1、1.5、2 倍的小門直線通行、塔腳開口、警衛室與門片阻擋、全周界折點與舊碰撞間隙。既有全模型測試驗證全部入口、樓梯與房間仍可到達。另以實際瀏覽器檢查正門造型、步行穿過小門與手機版面；圍牆阻擋以全部來源牆段及縮放測試驗證；結果見 results.json 及 output/boundary-qa。

## 修改清單
- public/data/campus-boundary-v1.json：校門部件、材料與來源紀錄。
- src/presentation/campus-boundary.ts：共用構造及連續碰撞。
- src/presentation/campus-boundary.test.ts：門口、圍牆與縮放測試。
- src/presentation/boundary-renderer.ts：立體牆段、欄杆、門塔與警衛室。
- src/presentation/model-world.ts：接上碰撞資料。
- src/presentation/model-renderer.ts：接上角色深度排序。
- scripts/stage-boundary-release.py：發布整理。
- docs/boundary-release.md：本報告。

## 恢復
前一版本 b741ec9；Git 備份 backup/rpg-before-boundary-20261028；來源備份 backups/rpg-before-boundary-20261028-090319.zip。
