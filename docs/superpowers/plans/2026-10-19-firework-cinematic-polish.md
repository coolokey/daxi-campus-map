# Firework visual polish with frozen defaults

Goal: improve the existing real-time fireworks toward a more cinematic presentation while preserving every current default. Visual acceptance is based on rendered comparisons, not particle count alone.

Frozen boundary: anniversary-model.js (timeline, cues, burst geometry, quality tiers/budgets), anniversary-fireworks.js (countdown, settings, volume, sound, camera, adaptive quality, lifecycle), firework-audio.js, anniversary-fireworks.css and sound manifest. Record hashes before edits and assert exact equality after changes. Preserve particle lettering and reduced-motion behavior.

Rendering architecture: keep the campus renderer, depth testing and audio callbacks. Replace disconnected trail dots with budgeted, instanced camera-facing streaks where supported, with a point fallback. Improve hot spark cores, colored shoulders, fading embers, and lightweight procedural smoke lit by each burst. Use analytic drag/gravity trajectories and age-sampled trails to make motion coherent across frame rates without changing cue timing or quality defaults. Reuse buffers and avoid per-point allocations.

Phases:
1. Capture seeded, same-camera baseline snapshots and rendering statistics; freeze configuration hashes.
2. Add meaningful failing regressions for frame-rate independence, continuous trails, budget/fallback and resource cleanup.
3. Implement the visual renderer changes only; compare shell styles and mobile images to baseline and refine visible shortcomings.
4. Run existing firework/anniversary tests and actual default show on desktop, portrait/landscape mobile, both entries, reduced motion, stop/replay and audio loading.
5. Independent review, build/sync, publish existing route and live QA. Deliver bounded assessment of remaining visual limitations rather than asserting an unmeasured commercial certification.
