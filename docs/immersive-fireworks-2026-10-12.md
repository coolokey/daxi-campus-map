# 大溪國中 80 週年沉浸式煙火系統

## 分析與整合

主站是 Vite／React 入口，實際校園使用本地 Three.js r128 與 OrbitControls；`explorer.js` 管理單一渲染迴圈、鳥瞰／人物切換、碰撞與移動。展示站以保留 iframe 的 hash 路由切換校園與 RPG；RPG 的能源核心任務由 React QuestionRunner 判定完成。原煙火使用模態 Canvas 2D，會擋住人物操作，聲音為合成。

新版本選擇共用既有 WebGL 場景中的 Points ShaderMaterial。Canvas 2D／Fireworks.js 疊圖較難符合建築遮蔽與環境照明；此方案可直接深度測試，讓校舍遮住位於後方的煙火。沒有第二張煙火 Canvas，也沒有第二個 requestAnimationFrame。人物、碰撞、任務題目與校園資料保持原系統。

## 操作

首頁或校園中的「80 週年煙火秀」開始，預設約 30 秒：倒數 3 秒、2 秒入夜、零星煙火、密集煙火、粒子聚合成 80、祝福、淡出。支持金色菊花、彩球、垂柳、扇形及連續升空；包含升空尾焰、明亮核心、拖尾、重力、閃爍、煙霧與照亮校舍的短暫環境光。

控制面板提供停止、再次觀看、開啟音效／靜音、音量、降低特效及觀賞視角；Esc 停止。開始時若在人物模式，保留人物與視角；可繼續走動。首頁入口會使用天空觀賞視角。按「觀賞視角」可重新對準煙火。80 是場景內 738 個發光點位，不是以普通煙火取代；祝福文字另以無指標攔截的 DOM 顯示。

音效預設關閉，使用者點擊才 resume AudioContext、下載並解碼 18 個錄音。六層各三樣本，避免連續重複，含呼嘯、近爆、遠爆、碎裂、尾音、掌聲；掌聲來源是室內音樂會。爆炸與視覺共用同一事件，較遠爆聲另加聲傳播延遲。立體聲方位使用相機右向量，原地轉頭亦會更新升空聲源；距離衰減、低通、卷積回響、18 聲源上限、壓縮器與有界軟限制器避免疊加過載。原音檔、切片資訊與授權見 sounds/LICENSES.md、manifest.json。

背景分頁／展示路由隱藏會暫停節目並清除音效，不補播積欠爆聲。停止移除場景節點、dispose 幾何與材質、停止及斷開暫時聲源，恢復原光線。瀏覽器音效解碼快取保留以利重播；完整 dispose 另中止下載並清除快取。依螢幕、記憶體、核心數選品質，持續慢幀會逐級降低；「降低特效」手動限額。prefers-reduced-motion 使用靜態 80、不發射煙火。手機觸控搖桿仍由原操作系統接收。

## 任務解鎖

預設公開入口可直接觀看。完成展示站 RPG 五題能源核心任務後，顯式 `campus:quest-complete` 事件經同源、指定 iframe 的 postMessage 傳給校園，顯示獎勵入口並記錄本次頁面解鎖。不是用 DOM 文字猜測是否完成，重新載入不保留學生成績。

需要鎖定的部署可在校園載入完成後呼叫：

```js
campusAnniversary.configure({ requireQuest: true, questId: 'energy-core' });
// 已存在的任務系統完成時：
window.dispatchEvent(new CustomEvent('campus:quest-complete', {
  detail: { questId: 'energy-core' }
}));
```

## 修改檔案與交付

| 檔案 | 用途 |
| --- | --- |
| public/campus-explorer/anniversary-model.js | 時間軸、五種 3D 發射向量、80 點位、品質及聲學位置 |
| public/campus-explorer/firework-scene.js | 共用場景中的粒子、煙霧、拖尾、閃光、80 聚合與清理 |
| public/campus-explorer/firework-audio.js | 實際錄音解碼、隨機分層、定位、延遲、混音與清理 |
| public/campus-explorer/anniversary-fireworks.js／.css | 非模態控制、夜景、音效手勢、背景暫停與解鎖 |
| public/campus-explorer/explorer.js／index.html | 既有 frame hook、API 與載入順序 |
| public/campus-explorer/assets/sounds/ | 18 MP3、manifest、授權與原檔 |
| public/proposal/app.js、campus 的 proposal-bridge.js、rpg/anniversary-reward.js | 同源任務完成與獎勵路由 |
| public/proposal/rpg/index.html／assets | 已重建的 RPG 完成通知；原題庫與操作沿用 |
| scripts/sync-anniversary.cjs、package-explorer.cjs、package.json | build 前同步、主站／展示站各自打包，正確相對資源路徑 |
| scripts/prepare-firework-audio.py、verify-immersive-fireworks.cjs | 可重現音檔處理與瀏覽器實測 |
| tests/anniversary-*、firework-*、vitest.config.ts | 時間軸、實際解碼、失敗、競態、清理、相機方位及測試收集 |

來源 RPG 的 `../future-campus-rpg/src/components/DemoQuest.tsx` 加入完成事件；部署的對應 compiled 模組隨本儲存庫保存。

## 驗證

已通過 `npm test` 的 38 組、140 項測試與 `npm run build`。Vitest 收集維護中的 tests／src 測試，submission-source 的 node:test 封存快照另行執行。

啟動 preview 於 5187，再執行 `node scripts/verify-immersive-fireworks.cjs`；`CAMPUS_QA_URL` 可指定同一套公開站。`FIREWORK_QA_PROFILE` 可選 desktop、ipad、mobile。結果與密集煙火、80、低動畫截圖位於 `qa/immersive-fireworks/`。

自動驗證涵蓋錄音 18 檔解碼、source.start 記錄、背景暫停、桌面鍵盤／觸控搖桿行走、30 秒流程、80、按鈕可達、重播、停止、低動畫、資源 HTTP 錯誤與腳本／shader 錯誤。桌面另用真實解碼音檔渲染離線 18 聲源混音，測量非零 RMS 與峰值低於削波門檻；檢查真正答完五題後的獎勵路由。

本機 desktop（1440×960）、ipad（1024×768）、mobile（390×844）全部通過上述流程；本機無資源 404 與腳本／shader 錯誤，桌面任務獎勵也通過。離線 18 聲源、音量 100% 混音峰值為 0.5913，RMS 為 0.0614，未數位削波。聲源亂數每次數值略有不同，原始報告保留於 QA 目錄。

桌面／iPad／手機為 Edge 瀏覽器尺寸與觸控模擬，不代表已在實體 iPad Safari 測試。數位混音量測驗證有訊號且未削波，無法取代使用者實際揚聲器或耳機的主觀聆聽；錄音本身可能有現場雜音。校園距離仍為原示意模型的單位，聲速延遲是臨場模擬，非實地聲學校正。
