# Walking Controls Implementation Plan

> **For agentic workers:** Use subagent-driven-development for isolated mobile controls and final review. Continue through all authorized tasks.

**Goal:** 手動操作可接管自動導航，手機雙搖桿依人物方向移動與轉頭。

**Architecture:** 新 mobile-controls.js 持有兩座搖桿各自的 pointer 與軸值；mobile-control-math.js 提供限速與 deadzone。explorer.js 只接取軸值並呼叫既有移動／碰撞與視角函式。manualTakeover() 暫停帶路並保留目的地，startAutoWalk() 重算目前路線。

**Tech Stack:** 原生 JavaScript、Pointer Events、Three.js、Vitest／jsdom。

- [x] Task 1：建立 mobile-control-math.js、mobile-controls.js／css 與 tests/mobile-controls.test.ts。API window.campusMobileControls={move:{x,y},look:{x,y},reset()}；y 正值表示前進，x 正值表示向右側移；look x 正值表示右轉、y 正值表示抬頭。最大軸向量長度 1，deadzone .12，半徑 40 CSS px。由 campusExplorer.manualTakeover() 接管；不寫 explorer.js。
- [x] Task 2：explorer.js 新增 manualTakeover／resetManualInput；keydown／dpad／mouse look 接管；mode reset 與 firstperson 保持；導航保存 ID 並 startAutoWalk 用 campusWalkWorld.route(avatarGroup.position,ROOMS_DB[id]) 重算。失敗則停止且提示。房名／導航 ID 不修改。
- [x] Task 3：動畫 frame 讀 move／look；前進 (sin(angle),cos(angle))、右側移 (-cos(angle),sin(angle))，合成向量長度上限 1，沿既有 moveAvatarWithCollision 移動；look 呼叫 applyManualCameraRotation 按 delta 轉頭。同步模式 body.dataset.controlMode 及行走狀態。
- [x] Task 4：真實 scene 的 jsdom 測試 take over／重新起點／第一人稱／cancel／blur／模式與對話框清除；瀏覽器桌機及 390×844／844×390 拖曳操作，記錄新 QA 名稱。
- [ ] Task 5：獨立審查、全部 npm test／npm run build 與原空間驗證，只提交此次檔案並發布原 main；確認部署成功與公開畫面。

Ruling：使用者「依照你的建議進行」及兩次「請繼續」沿用已討論的後續操作範圍；不重複請求設計／發布許可。既有 QA 修改不覆寫或納入此次提交。單一現有 checkout 以指定檔案分工。
