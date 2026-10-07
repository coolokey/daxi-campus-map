# Cinematic Birdseye Campus Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-screen birdseye 3D campus navigator with polished exterior scenery, search, quick destinations, minimap, floor state and opt-in third-person walking.

**Architecture:** Campus data remains the single source for UI destinations, minimap coordinates and camera targets. The React interface becomes an overlay over a dedicated Three.js canvas; pure helpers handle destinations, floors and camera focus so they can be tested independently.

**Tech Stack:** React, TypeScript, Three.js, Vite, Vitest, GitHub Pages.

---

### Task 1: Viewer data and camera focus

**Files:**
- Create: `src/data/viewer-destinations.ts`
- Create: `src/data/viewer-destinations.test.ts`
- Create: `src/scene/camera-focus.ts`
- Create: `src/scene/camera-focus.test.ts`

- [ ] Write failing Vitest checks asserting that `quickDestinations` contains `admin`, `resolveFloorState('3F')` returns `{floor:'3F',available:false,label:'室內導覽規劃中'}`, and `birdseyeFocusFor({world:[0,-23]}).target` equals `[0,0,-23]` with an elevated camera Y coordinate.
- [ ] Run `npm test -- src/data/viewer-destinations.test.ts src/scene/camera-focus.test.ts` and confirm failure before implementing the helpers.
- [ ] Implement `quickDestinations`, `resolveFloorState`, and `birdseyeFocusFor` as pure exported functions. Use only existing campus place ids and do not expose unconfirmed interior destinations.
- [ ] Run `npm test` and commit with `feat: add viewer destinations and camera focus`.

### Task 2: Full-screen HUD shell

**Files:**
- Create: `src/components/ViewerHud.tsx`
- Create: `src/components/ViewerHud.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] Write a failing render test for `ViewerHud` that requires accessible 人物漫遊、總平面圖、搜尋地點 and 全 buttons.
- [ ] Run `npm test -- src/components/ViewerHud.test.tsx` and confirm failure.
- [ ] Implement a canvas-overlay HUD: top school/search/control bar; quick-destination bar; right-hand full-campus and 1F–4F controls; reserved minimap and mobile movement regions. Mark unavailable interior floors using the helper state rather than pretending that interior models exist.
- [ ] Replace the scrolling home layout in `App.tsx` with a full-window canvas first, HUD second, and the existing opening layer last.
- [ ] Run `npm test; npm run build` and commit with `feat: add fullscreen campus viewer hud`.

### Task 3: Birdseye and third-person state integration

**Files:**
- Modify: `src/components/CampusScene3D.tsx`
- Modify: `src/scene/walk-controls.ts`
- Modify: `src/App.tsx`

- [ ] Add a failing test for the selected-place callback contract: choosing a quick destination returns its matching campus place id to the scene state.
- [ ] Run the focused test and confirm failure.
- [ ] Add `mode: 'birdseye'|'walk'` and `selectedPlace` props to the 3D scene. In birdseye mode, interpolate to `birdseyeFocusFor`; only lock pointer and show the Avatar when the visitor activates 人物漫遊. Escape returns to birdseye.
- [ ] Verify manually that 教務處、操場 and 體育館 buttons move the camera to different locations, then run `npm test; npm run build`.
- [ ] Commit with `feat: add birdseye focus and guided walk mode`.

### Task 4: Refined exterior and map-driven minimap

**Files:**
- Create: `src/components/CampusMinimap.tsx`
- Create: `src/components/CampusMinimap.test.tsx`
- Modify: `src/scene/buildCampus.ts`
- Modify: `src/components/ViewerHud.tsx`
- Modify: `src/styles.css`

- [ ] Write a failing minimap test that renders a selected `admin` marker with accessible label 行政大樓位置.
- [ ] Run `npm test -- src/components/CampusMinimap.test.tsx` and confirm failure.
- [ ] Build `CampusMinimap` as SVG from the existing `Place.map` coordinates, with a visibly different selected marker.
- [ ] Refine only plan/photo-supported geometry in `buildCampus.ts`: red-roof administration blocks, teaching blocks, window grids, canopies, track, courts, roads, tree lines, soft shadows, filmic tone mapping, fog and background hills. Never invent unverified rooms or buildings.
- [ ] Run `npm test; npm run build`, verify desktop/mobile overlay readability, and commit with `feat: add refined exterior and campus minimap`.

### Task 5: Photo-card actions, records and publication

**Files:**
- Modify: `src/components/PlaceCard.tsx`
- Modify: `src/App.tsx`
- Modify: `MAP_ISSUES.md`
- Modify: `MEASUREMENTS.md`

- [ ] Write a failing card test for accessible 鳥瞰定位 and 開始導覽 actions on the administration building.
- [ ] Run the focused test and confirm failure.
- [ ] Connect 鳥瞰定位 to selected-place birdseye state and 開始導覽 to walk mode. Continue to use only the confirmed exterior photos in `photo-manifest.json`; describe unavailable interiors as exterior-only.
- [ ] Record any unresolved building/photo mappings in `MAP_ISSUES.md` and only genuine scale assumptions in `MEASUREMENTS.md`.
- [ ] Run `npm test; npm run build`, inspect the published page, push `main`, wait for the Pages workflow, and commit with `feat: connect photo cards to campus navigation`.
