# 彩色原校園 RPG 與全角色移植計畫

> For agentic workers: Use subagent-driven-development to implement tasks with independent review.

Goal：依使用者選項 1，保留原彩色底圖及既有 URL，直接升級原遊戲；導覽所有角色資料匯入 RPG，保留外觀差異並轉為 Q 版八方向行走圖集。

Architecture：沿用 Canvas 主入口、碰撞、縮放、原任務。室外保持 campus 原圖；從既有入口進入來源科技館樓層，退出返回原室外，不再提供另一張室外示範地圖。91 位教職員完整名冊、12 個示意學生、警衛、玩家四種性別／服裝選擇移植；使用導覽 createCharacter 轉製離線透明 sprites，runtime 不載入 Three.js。完整名冊可搜尋，活動 NPC 分批輪替，坐標為遊戲安排。

Tech Stack：TypeScript、Canvas 2D、React 任務、導覽 Three.js 模型離線轉製、Playwright／Edge、Vitest。

已確認設計：使用者明確選擇保留原圖並要求所有人物移植。採大頭 Q 版、八方向、站立及左右步伐；保留來源 appearance／服裝規則，不讀取照片猜測缺失外貌。無 appearance 者標示示意造型。保留全部名冊，不把全部人物每幀放到畫面。來源網站不改。

備份：Git tag rpg-before-character-import-20261013 指向 5a33f15；既有 rpg-source.zip 可恢復來源。開發副本 future-campus-rpg-2-experiment，發布隔離工作樹 rpg2-release。

- [ ] 角色資料與圖集：比對來源 staff-data.js 的 91 個 ID，匯出 manifest、sprites、來源 SHA、角色覆蓋與方向／動畫 metadata；先測試完整性與非法引用。
- [ ] 原圖遊戲整合：撤下室外模式切換按鈕，原 campus 入口接科技館 1F／2F，樓層出口返回原 campus；保留快速任務及獎勵橋。
- [ ] 角色呈現：新角色渲染器，玩家外觀選擇、八方向行走、腳底深度排序；名冊搜尋與分批 NPC 活動；小地圖使用原彩圖作背景並標示角色。
- [ ] 檢查：source identity、完整名冊、圖集透明度／格數、有效 NPC 路線、三比例人物尺寸獨立、入口往返、原 5 題任務、桌面／平板／手機觸控、原圖 SHA 不變、啟動預算不放寬。
- [ ] 獨立程式複查、同路徑本機驗收、GitHub Pages 發布、正式站驗收；提交修改清單與限制。

Ruling：直接復用導覽的程式模型轉製 sprite，而非人工或 AI 重畫 91 位人物。這保留現有可核對 appearance，避免引入不明肖像；無來源特徵者維持一般示意。
