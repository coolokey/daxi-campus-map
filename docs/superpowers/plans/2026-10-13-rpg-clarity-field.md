# RPG 清晰度、造型、定位與操場修正

User approved four fixes: blurry original map, teacher outfit variety with creative freedom, clearer minimap player, accessible sports field. Existing URL and original art layout stay unchanged.

Evidence: original PNG/WebP are both 1525×1031. Canvas currently renders below CSS display size and ignores devicePixelRatio. Default 1.5× world plus viewport stretch magnifies source pixels about 3×. A single collider (70,160,1040,720) blocks the entire sports field. Teacher clothing uses character-code sum modulo 4, causing repeated colors/styles. Player minimap marker is a tiny blue triangle over a colorful map.

- [x] Native/DPR-aware backing buffers capped at 2×, logical viewport separate from pixels; original lossless PNG; wider default camera view (zoom .75), fixed on-screen character sizes; all scene/culling/camera math shared. Preserve source assets. Source detail remains limited; no claim of genuine 4K artwork.
- [x] Deterministic per-ID RPG art variations: varied adult silhouettes, palette, trousers, glasses and accessories; preserve teacher IDs/names and source hair features; declare invented styling as game art. Re-render eight-direction/three-pose atlases with common foot anchor. Keep original data source unchanged.
- [x] High-contrast minimap halo, larger arrow and '你在這裡' label; visible in small/mobile map and full map, with correct coordinates/facing.
- [x] Remove field-wide blocker; retain narrow solid fixtures such as internal pole/long-jump hardware. Verify walk from south entrance onto track and central turf, and fixture collision at scales 1/1.5/2.
- [x] Red-first relevant tests, old task/floor regression, DPR 1/2 screenshots, real keyboard sports-field traversal, 91 unique art variants, source SHA preservation, strict startup budget, independent code review, existing-path local QA and Pages deployment/live QA.

Backup tag: rpg-before-clarity-field-20261013. Development copy future-campus-rpg-2-experiment; release worktree rpg2-release. Existing deployment authorization remains active. No tour-source edits.


Additional approved scope: big-head small-body Q sprites, matching 512x640 half-body dialogue portraits, teacher labels 10 CSS px, no student overhead labels. Shared nearestInRange fixes overlapping interaction radii. 109 active v3 atlases and portraits, source appearances retained; original assets unchanged.
