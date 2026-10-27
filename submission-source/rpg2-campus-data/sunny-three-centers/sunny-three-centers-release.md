# 晴日校園與三心探索發布報告

日期：2026-10-28。公開路徑維持 `https://coolokey.github.io/daxi-campus-map/proposal/rpg/`。

## 使用者確認方向

藍天白雲、青青草原、自然明亮校舍。專業美術與闖關設計兩位子代理分工提供設計及實作，另由獨立審查代理檢查數學與程式。

## 配色與場景

使用米白校舍、陶土色屋頂、分段玻璃窗、自然樹冠、青草及中性道路。繪製固定遠景晴空、白雲與草坡，取代深色底座與大面積霓虹青色。既有模型尺寸、座標、碰撞、角色大小、深度排序與遮擋保留。原始校園圖和導覽網站不修改。

## 三心闖關

1. 內心：科技館 1F 生科教室一，內角平分線交會與到三邊的垂直距離。
2. 重心：科技館 2F 理化實驗室，中線交會與頂點端 2：1。
3. 外心：科技館 2F 科技創作教室，到三頂點等距、直角三角形半徑、鈍角外心位置。

站點以最新版模型的真實 room id 解析，不另造建築。房間內的任務標記須靠近且沒有牆遮擋才可調查。順序解鎖挑戰但不鎖門，仍可自由探索。每站兩題、兩層提示、準確 SVG 圖，答對後需閱讀詳解並按下一題。全部完成取得三心觀測員徽章，可重新探索或複習。

工具列「三心闖關」提供各站導航；每次轉場後可按「沿導航路線行走」，入口和樓梯仍需按 E／互動。小地圖以橙、藍、紫與中文字標示任務點，完成後顯示勾號。

## 進度與既有功能

三心進度僅存本機獨立 key，沒有姓名，也不上傳。損壞資料回復空進度；儲存無法寫入時採本頁記憶體，避免從舊值倒退。重玩只清除此任務，不清除角色或其他資料。原版五題能源修復及成就事件仍保留，可從三心總覽開啟。新舊 React 任務使用不同容器，不覆寫彼此的 root。

## 驗收

實際操作已完成：校門→科技館入口→1F 內心→現有樓梯→2F 重心→同層外心→全部六題→徽章與概念摘要。另驗證兩層提示、答錯重試、答對詳解、逐站解鎖、原版任務入口。

桌面 1280×720、手機 390×844、iPad 1024×768 已用瀏覽器尺寸模擬查看，未以實體裝置宣稱驗收。最新測試與發布 SHA／Actions 結果見 `output/sunny-three-centers-qa/results.json` 及 `published-verification.json`。

修改前備份：`backups/rpg-before-sunny-three-centers-20261027-234410.zip`；Git 備份分支：`backup/rpg-before-sunny-three-centers-20261027`。

## 修改檔案

- `docs/superpowers/plans/2026-10-27-sunny-three-centers.md`
- `scripts/stage-sunny-release.py`
- `src/components/ThreeCentersDiagram.tsx`
- `src/components/ThreeCentersQuest.test.tsx`
- `src/components/ThreeCentersQuest.tsx`
- `src/components/three-centers.css`
- `src/data/three-centers-storage.test.ts`
- `src/data/three-centers.ts`
- `src/game/data/types.ts`
- `src/game/world-hud.ts`
- `src/presentation/campus-directory.ts`
- `src/presentation/fullscreen.css`
- `src/presentation/main.ts`
- `src/presentation/model-renderer.ts`
- `src/presentation/sunny-scenery.ts`
- `src/presentation/three-centers-guide.ts`
- `src/presentation/three-centers-quest.tsx`
- `src/presentation/three-centers.test.ts`
- `presentation.html`
- `docs/sunny-three-centers-release.md`
