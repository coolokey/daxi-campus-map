# Full upper-floor canopy clearance, 2026-10-19

Problem: the previous stair-only cut left legacy one-storey canopy roofs crossing adjoining second-floor corridors. The user screenshot faces room 802 from grade8-mid. A real-scene audit reproduced 12 horizontal geometry intersections at supported corridor points across health-bld, grade9-back and grade8-mid, all at canopy underside y=3.825 above floor y=3.6.

Correction: use upper-floor occupied body volumes and complete stair volumes as canopy exclusion areas, expanded by the avatar collision radius at side edges. Retain only nonintersecting legacy canopy roof pieces and supports. Navigation, floor support heights, rooms and the activities center remain unchanged.

Verification: add a regression that fails on actual rendered geometry throughout every upper-floor corridor, retain full stair and navigation tests, perform a real keyboard walk at the 802-facing location, and visually inspect the corrected scene. Check both desktop/mobile and both public entrances, then push the existing main publication route and repeat browser checks against that exact live revision.

Additional regression found by browser QA: cross-building route 802 -> pe-storage stopped at the administrative exterior wall when interpolation produced z=15.000000000000004 rather than 15. With wall minZ=15.42 and body radius=.42, the microscopic tangent error became a false collision. collision-grid overlap checks now ignore 1e-8 numerical noise on AABB and rotated-wall axes. Unit tests reject real 1e-5 penetration; an actual movement regression reproduces the accumulated route coordinates. No wall or avatar dimensions changed.
