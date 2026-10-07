# Data-driven Campus Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the exterior birdseye campus from full, map-aligned building data while keeping the current React and Three.js application original.

**Architecture:** Introduce a typed campus model dataset with dimensions, positions, roofs, entrances and photo evidence. Build modular Three.js structures from this data, then bind the same IDs to search, HUD, minimap and birdseye focus.

**Tech Stack:** React, TypeScript, Three.js, Vitest, Vite, GitHub Pages.

---

### Task 1: Import and validate complete exterior campus data

**Files:**
- Create: `src/data/campus-model.ts`
- Create: `src/data/campus-model.test.ts`
- Modify: `src/data/campus.ts`
- Modify: `MAP_ISSUES.md`

- [ ] Define typed records for administration front/back, activity center, grade 8 front/mid, grade 9, technology, comprehensive, arts and grade 7 buildings using the map-aligned positions and dimensions from the reference dataset.
- [ ] Add tests asserting every model has unique id, positive dimensions and an entrance point.
- [ ] Build a lookup mapping existing public place IDs to complete exterior model IDs; retain unresolved mappings in `MAP_ISSUES.md`.
- [ ] Run `npm test; npm run build` and commit `feat: add complete exterior campus data`.

### Task 2: Replace sparse scene placement with modular buildings

**Files:**
- Modify: `src/scene/buildCampus.ts`
- Modify: `src/scene/scene-theme.ts`
- Create: `src/scene/building-modules.ts`
- Create: `src/scene/building-modules.test.ts`

- [ ] Write tests for roof and facade module selection from each building data record.
- [ ] Implement original facade, window-grid, canopy, roof, stair-core and corridor modules; use the typed data to place the complete building group.
- [ ] Rebuild track, stand, courts, entrance boulevard, trees and hills at positions consistent with the plan.
- [ ] Run `npm test; npm run build`, visually inspect the birdseye view, and commit `feat: build complete data driven exterior`.

### Task 3: Bind full campus IDs to HUD and camera focus

**Files:**
- Modify: `src/data/viewer-destinations.ts`
- Modify: `src/scene/camera-focus.ts`
- Modify: `src/components/ViewerHud.tsx`
- Modify: `src/components/CampusScene3D.tsx`

- [ ] Expand quick destinations using confirmed model IDs.
- [ ] Add tests for camera focus target conversion from building model position.
- [ ] Ensure every quick destination dispatches an original, typed building focus event and resolves a birdseye focus point.
- [ ] Run `npm test; npm run build` and commit `feat: focus complete campus destinations`.

### Task 4: Map-linked minimap, photo cards and release verification

**Files:**
- Create: `src/components/CampusMinimap.tsx`
- Modify: `src/components/ViewerHud.tsx`
- Modify: `src/components/PlaceCard.tsx`
- Modify: `MEASUREMENTS.md`

- [ ] Render model positions and selected building on a plan-derived minimap.
- [ ] Use confirmed exterior photographs only in matching building cards; label inferred exterior models honestly.
- [ ] Update scale assumptions and photo mapping issues.
- [ ] Run full tests, build, GitHub Pages deployment and visual verification; commit `feat: complete map linked campus navigator`.
