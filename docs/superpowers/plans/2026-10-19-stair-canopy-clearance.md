# Stair canopy clearance correction, 2026-10-19

User evidence: 789.jpg, ninth-grade stair side, avatar obscured by a pale slab.

Architecture: spatial-plan owns stair bounds, ramps, support heights and navigation. spatial-world rebuilds floors, while explorer still creates three independent legacy outdoor canopies. The south canopy at (15,52), underside 3.825, intersects both grade9-back and grade8-mid south stairs. A retained south canopy support also enters the grade8-mid enclosure.

Implementation: tag legacy canopy roofs/supports; subtract shared stair rectangles from their visible geometry. Preserve nonintersecting canopy pieces/supports. Do not change room positions, floor heights, stair routes, administrative bridges, roof alignment or the activities center.

Validation: regression first failed on 43 overhead samples in grade9-back and grade8-mid. Audit every real stair flight at center and lateral offsets and the turn landings against actual scene geometry; retain rail/body protection checks. Run real motor ascent/descent, desktop/mobile automatic routes and both public entrypoints. Build, review, push existing main route, wait for Pages and repeat the same browser audit against the published revision.
