# 行政大樓已確認穿廊配置實作計畫

> 依使用者確認圖執行，採 executing-plans 在既有隔離工作目錄逐項完成。

**Goal:** 正門入口固定；一樓依確認圖配置，無障礙廁所、教練室旁男女廁、完整學務處及通往 907 所在棟的穿廊均可實際行走。

**Architecture:** 維持 spatial-plan-data.js → spatial-plan.js → spatial-world.js 共用模型。新增梯段與洞口適用樓層，一至二樓新梯段接入既有二樓通廊，二至三樓梯段及上層房間用途保留。

**Tech Stack:** JavaScript、Three.js、Vitest、jsdom、GitHub Pages。

- [x] 更新 tests/admin-ground-scheme-c.test.ts，驗證確認圖房位、廁所用途、原入口座標、中軸貫通、新一樓樓梯及後棟接點，執行並確認失敗。
- [x] 更新 spatial-plan-data.js 與 spatial-plan.js 的一樓房間、走廊、後棟連接及樓層限定梯段，保留房間 ID。
- [x] 更新 spatial-world.js 的樓層限定樓板洞口、樓梯及連接導航，調整 photo-facade.js 分支。
- [x] 更新實體通行測試：正門至後棟、各辦公室及上樓；執行 Vitest、verify-spatial-world.cjs、npm run build，同步嵌入版。
- [x] 檢視本機桌機／手機一樓圖，程式複核後提交並推送 main。
- [ ] 等待對應 SHA 的 Pages Actions；正式站桌機、手機、嵌入版及主控台驗證，保存證據。

尺度為示意。行政大樓內正門中軸直通，後方短連廊銜接九年級棟既有穿堂，不穿過教室或廁所。二樓新梯段落點附近的小空間僅調整門與樓板範圍以保留安全銜接，不更改用途。
