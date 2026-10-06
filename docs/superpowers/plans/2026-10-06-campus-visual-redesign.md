# 大溪國中寫實化 3D 校園導覽重製 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 以實際平面圖、空拍影片與校園照片，重製具辨識度、可探索且適合公開訪客使用的寫實化 3D 校園導覽。

**Architecture:** 場景資料、建築外觀模組、實景照片卡片、場景組裝與控制器分離。建築與環境由資料驅動，3D Mesh 不承擔場所識別；照片只從專案內複製的公開資產載入。

**Tech Stack:** React、TypeScript、Three.js、Vitest、Vite、GitHub Pages。

---

### Task 1: 圖資清冊與衝突追蹤

**Files:**
- Create: `assets/photo-manifest.json`
- Create: `MAP_ISSUES.md`
- Create: `MEASUREMENTS.md`
- Create: `src/data/visual-evidence.ts`
- Test: `src/data/visual-evidence.test.ts`

- [ ] 建立照片清冊，每筆含 `id`、原始相對路徑、可見建築、拍攝方向與用途。
- [ ] 先列入已檢視的「白灰三層校舍、紅屋頂、入口柱列、操場跑道、山坡林相」。
- [ ] 在 `MAP_ISSUES.md` 以表格保留空拍、平面圖或照片位置衝突；沒有衝突時保留「目前無待確認項目」。
- [ ] 撰寫失敗測試，驗證每棟已展示建築都有照片或空拍證據。

```ts
expect(getEvidenceForBuilding('admin').length).toBeGreaterThan(0)
```

- [ ] 完成 `getEvidenceForBuilding()` 後執行 `npm test -- src/data/visual-evidence.test.ts`。
- [ ] 提交：`git commit -m "docs: inventory campus visual references"`。

### Task 2: 擴充資料模型與實景資產

**Files:**
- Modify: `src/data/campus-data.json`
- Modify: `src/data/campus.ts`
- Create: `src/data/building-style.ts`
- Test: `src/data/building-style.test.ts`
- Create: `public/campus-photos/`

- [ ] 將主要建築資料擴充為 `floors`、`dimensions`、`roofStyle`、`facadeStyle`、`photoIds` 與 `entry`。
- [ ] 建立白灰立面、窗格、紅屋頂、深色屋頂、入口柱列等可重用建築樣式。
- [ ] 只複製已選用照片到 `public/campus-photos/`，保留原始檔不變。
- [ ] 撰寫失敗測試，驗證每個主要建築有正數尺寸、至少一張照片與已知樣式。

```ts
expect(validateBuildingStyle(getBuilding('admin'))).toEqual([])
```

- [ ] 完成驗證器後執行測試並提交。

### Task 3: 建立寫實化校舍與環境模組

**Files:**
- Create: `src/scene/modules/facade.ts`
- Create: `src/scene/modules/roof.ts`
- Create: `src/scene/modules/vegetation.ts`
- Create: `src/scene/modules/sports-field.ts`
- Modify: `src/scene/buildCampus.ts`
- Test: `src/scene/modules/facade.test.ts`

- [ ] 先寫失敗測試，驗證白灰立面模組依樓層與窗格數產生正確名稱與尺寸。
- [ ] 實作可重用窗格、牆板、入口柱列與紅／深色屋頂模組。
- [ ] 實作跑道、草地、球場、道路、圍牆與山坡林相群組。
- [ ] 植栽使用 `InstancedMesh` 或共用幾何以減少 draw calls。
- [ ] 重建 `buildCampus()`，由建築資料配置各模組，移除現有彩色方塊建築。
- [ ] 執行模組測試與 `npm run build`，再提交。

### Task 4: 重製開場、HUD 與實景資訊卡

**Files:**
- Create: `src/components/OpeningTour.tsx`
- Create: `src/components/BuildingPhotoCard.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/PlaceCard.tsx`
- Modify: `src/styles.css`
- Test: `src/components/OpeningTour.test.tsx`

- [ ] 先寫失敗測試，確認開場有「開始導覽」、「跳過開場」和至少三個校園導覽停靠點。
- [ ] 以實景照片建立沉浸式開場，而非把平面圖當成背景。
- [ ] 在 3D 場景建立校門、操場、主要校舍三段鏡頭路徑；每段可跳過。
- [ ] 資訊卡顯示對應實景照片、建築名稱、類別、樓數與「前往入口」。
- [ ] 將 HUD 改為低遮擋半透明深色面板與金色定位焦點。
- [ ] 執行元件測試、建置和桌面截圖檢查，提交。

### Task 5: 第三人稱導覽 Avatar 與相機模式

**Files:**
- Modify: `src/scene/avatar.ts`
- Modify: `src/components/CampusScene3D.tsx`
- Create: `src/scene/camera-mode.ts`
- Test: `src/scene/camera-mode.test.ts`

- [ ] 先寫失敗測試，驗證第三人稱相機保持角色後上方偏移，第一人稱相機位於角色眼高。

```ts
expect(getCameraPose('firstPerson', {x:0,y:0,z:0}, 0).y).toBeCloseTo(1.6)
```

- [ ] 將 Avatar 拆為可切換的 idle、walk、run、jump 視覺狀態；先以低面數動畫擺動實作。
- [ ] 加入 `V` 切換第三／第一人稱，`Space` 跳躍與重力地面檢查。
- [ ] 將校園邊界、建築外牆、操場階梯與主要欄杆加入碰撞代理。
- [ ] 執行測試、建置並在瀏覽器驗證移動與視角切換，提交。

### Task 6: 效能、跨裝置與公開驗證

**Files:**
- Modify: `src/components/CampusScene3D.tsx`
- Modify: `src/styles.css`
- Modify: `README.md`
- Create: `tests/visual-checklist.md`

- [ ] 新增視距分層：遠距只顯示校舍量體，近距顯示窗格、入口與植栽。
- [ ] 手機版加入觸控視角區、虛擬方向控制與地圖按鈕。
- [ ] 在桌面與手機視窗各檢查開場、鳥瞰、第三人稱、第一人稱、搜尋與照片卡。
- [ ] 以清單記錄實景對照、可用操作與未完成的室內導覽範圍。
- [ ] 執行 `npm test`、`npm run build`、GitHub Pages 部署驗證，提交與推送。
