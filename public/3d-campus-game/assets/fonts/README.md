# 煙火字形來源

字體：Noto Sans TC，Google Fonts 官方版本，SIL Open Font License 1.1。
來源：https://github.com/google/fonts/tree/main/ofl/notosanstc
原始檔：https://raw.githubusercontent.com/google/fonts/main/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf
授權全文：同目錄 OFL.txt。

`anniversary-tc.ttf` 僅保留兩行所需字元；PNG 為採樣遮罩，JavaScript 為真正粒子座標。網站不使用 PNG 取代粒子，也不依賴裝置字體。採樣在建置工具完整載入字體並確認所有字元存在後完成，避免執行時缺字或字體載入競態。

重建：下載官方 TTF，再執行 `python scripts/prepare-firework-text.py <TTF 路徑>`。修改腳本的 labels、字級與採樣間距後重新產生點位並建置。
