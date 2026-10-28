# 石磚拼接地坪與三心闖關辨識

## 視覺調整
- 使用內建 imagegen 生成石磚材質，原始 PNG 保存在 src/assets/environment/stone-paving-v1.png；供遊戲載入的是相同圖像編碼成 WebP 的 stone-paving-v1.webp（約 174 KiB）。
- 石磚依世界座標貼於等角投影平面，鏡頭跟隨、縮放時不會在螢幕上滑動或變成平面背景。
- 室外校園地坪由錯縫拼接石磚構成，保留來源模型的操場草坪、球場、道路、池塘與植栽區；建築入口配色收邊及正門幾何嵌飾均為平面裝飾。
- 石磚圖只下載一次、重複使用 CanvasPattern；等待載入時保留淺色地坪底色，不新增角色載入負擔。
- 三心卡改為 01 內心、02 重心、03 外心的編號徽章、目前關卡、未解鎖及完成勾號；增加「找線索 → 完成兩題 → 下一站」流程，場景與小地圖標記也使用關卡編號。

## 保留範圍
建物位置、碰撞、可行走區、入口、樓層、人物、原能源任務及三心進度邏輯均沿用；原始校園素材及導覽網站不修改，RPG 使用相同發布網址。

## 驗證
TypeScript 與正式建置通過，全套 42 檔案、136 項測試通過。桌面、iPad 1024 × 768、手機 390 × 844、390 × 600 及 844 × 390 畫面檢查通過；短畫面採精簡階段卡避免遮住玩家。詳見同階段 results.json 與 output/stone-paving-qa。測試分成 TypeScript、正式建置、階段 UI 回歸、模型與導航回歸，以及正式路徑的桌面／iPad／手機直橫向檢查。圖像是否完全無接縫依實際重複鋪設畫面檢查，不以生成指令本身視為保證。

## 修改檔案
- src/assets/environment/stone-paving-v1.png、stone-paving-v1.webp。
- src/presentation/stone-paving.ts：快取的世界座標石磚材質。
- src/presentation/model-renderer.ts：地坪材質及入口嵌飾。
- src/presentation/three-centers-guide.ts：編號徽章、流程與任務標記。
- src/presentation/fullscreen.css：醒目階段卡與響應式樣式。
- src/presentation/center-stage.test.ts：階段徽章與流程回歸檢查。
- scripts/stage-stone-paving-release.py：發布整理。
- docs/stone-paving-release.md：本報告。

## Imagegen 紀錄
工具：內建 image_gen；用途：遊戲地面材質；非 CLI。
最終提示：製作晴朗 2.5D 校園 RPG 使用的正俯視可重複石磚貼圖，淺灰、象牙白與米色矩形石磚錯縫拼接，細灰勾縫，手繪遊戲風格，均勻光線；不含透視、文字、物件、草地、邊框或暗角。完整英文提示保存在 output/stone-paving-qa/imagegen-prompt.txt。

## 恢復
Git 備份分支 backup/rpg-before-stone-paving-20261028；來源備份 backups/rpg-before-stone-paving-20261028-084152.zip；前一發布 e863ec6。
