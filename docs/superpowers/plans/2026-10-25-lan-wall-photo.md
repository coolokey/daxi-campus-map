# Photo-based Lan pavilion and perimeter update

Goal: apply the user's two photos, retaining the existing gate-side metal fence and published URLs.

Architecture: keep plan coordinates and collider extents. Update renderPerimeter in outdoor-world.js; mark front runs (both endpoints z >= 78) as gate metal, and use gray blockwork, red brick piers/caps and diamond motifs elsewhere. Rebuild the existing six-sided pavilion at (-18,-66) with curved tiled roof, cream beams/lattice, red posts, gray low plinth/steps, seats and plaque. Register physical posts/seats before spatial indices; retain a clear front opening and pond barrier.

- [x] Add failing checks for masonry vs retained gate runs, pavilion details, post collisions and usable routes.
- [x] Implement photo details with reusable procedural textures and modest geometry.
- [x] Run outdoor, bank, collision, spatial and walk tests, gate navigation audit, build/sync and independent review.
- [ ] Inspect local and production desktop/mobile, push existing main route, wait for Actions and compare live bundles.

Roof, dimensions and brick repetition are illustrative, based on the provided photographs rather than surveyed measurements.
