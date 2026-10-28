# 校園分棟配色與三心階段提示

## 實作範圍
- 11 棟建物以穩定建築 ID 配置獨立牆面、陰影側面與屋頂配色，同棟各翼一致。
- 保持藍天白雲、綠草地，加入交錯草地紋、零星花色、入口步道、建築周邊鋪磚與配色收邊。皆為平面裝飾，不新增可穿越的立體障礙物。
- 常駐三心階段卡：內心 → 重心 → 外心；標示進行中、未解鎖、完成。導覽到站後改為調查，再改為挑戰，完成後提示下一站；三站全通可回顧。
- 工具列換行時階段卡跟隨下緣；手機直向保留比例選單與狀態區，橫向避開左右操作區。
- 校園原始素材、樓層、教室、碰撞、尋路與既有角色及能源任務均沿用。導覽網站不修改，RPG 網址不變。

## 驗證與驗收
- TypeScript 編譯、Vite 正式建置通過；全套 42 檔案、136 測試通過。
- 新增 4 項測試：階段與動作切換、完成狀態、11 棟配色完整性、實際站點導航與調查 UI 整合。
- 實際瀏覽器完成校園導航、進科技館、找內心站、調查、兩題正答與保存；回到探索顯示第 2 階段及內心完成。
- 檢查 390 × 600、390 × 844、1024 × 768 與 844 × 390 的操作布局；發現橫向工具列遮擋後修正並重測。
- 地圖縮放與原有碰撞的回歸檢查沿用全套測試；本次未宣稱重新實機走訪全部教室。
- 原版 Phaser 延遲載入包仍有既有大檔警告，正式建置成功；本次未新增人物圖像下載。

## 修改檔案
- src/presentation/campus-materials.ts：分棟材料。
- src/presentation/model-renderer.ts：建築配色、地面裝飾。
- src/presentation/center-stage.ts：階段狀態推導。
- src/presentation/center-stage.test.ts：狀態與 UI 整合測試。
- src/presentation/three-centers-guide.ts：進度卡與導航、調查、挑戰動作。
- src/presentation/fullscreen.css：階段卡與響應式排版。
- scripts/stage-color-stages-release.py：相同發布路徑、資訊清單與來源封存。
- docs/color-stages-release.md：本報告。
- output/color-stages-qa/：測試紀錄與畫面。

## 恢復方式
來源備份 backups/rpg-before-color-stages-20261028-082845.zip；發布 Git 備份分支 backup/rpg-before-color-stages-20261028。發布前版本 ba369bd，可用 Git 恢復，不改網址。
