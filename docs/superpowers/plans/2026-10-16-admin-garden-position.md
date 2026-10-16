# 行政入口花圃造景位置修正 Implementation Plan

**Goal:** 依 S__66011287.jpg 將孔雀與魔術方塊移到行政入口左右花圃外端，保留中央及無障礙通道，發布原網址。
**Architecture:** 沿用 photo-facade.js 的 admin-front 與 photo-admin-garden。以建築半寬定位兩個物件，花圃邊界支援定位，不修改房間、碰撞或導航結構。
**Tech Stack:** Three.js、Vitest、Vite、GitHub Pages。

- [ ] 在 tests/photo-facade.test.ts 增加真實場景幾何測試：兩個物件位於建築外側 43% 寬度之外、落於各自花圃內，中央通道保持空白；先確認舊版失敗。
- [ ] 修改 public/campus-explorer/photo-facade.js：孔雀 x=b.x-b.width*.46，魔術方塊 x=b.x+b.width*.46；延伸左右花圃並使其前緣對齊，孔雀 z=frontZ+4.8、魔術方塊 z=frontZ+4.1（避開鄰棟），地面支撐不懸空。比例為示意，非實測。
- [ ] 執行 npx vitest run tests/photo-facade.test.ts --maxWorkers=2，並執行 node scripts/verify-spatial-world.cjs。
- [ ] 執行 npm run build，同步嵌入版並驗證桌面、手機、正面與斜向視圖，檢查 console。
- [ ] 只提交本次檔案；fetch 後整合 origin/main 新變更，正常 push HEAD:main；等待該 SHA 的 GitHub Actions 成功並正式頁驗證。

使用者已確認方案並授權修改與發布，依本計畫直接執行，不再增加確認關卡。

