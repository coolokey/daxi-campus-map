# Court-facing clinic/cooperative and pond collision correction

User photographs DSC05961 and DSC05966 confirm the long entrance/gallery facade
faces the basketball courts. Existing health-bld sign=+1 put both doors on the
opposite side; change the shared profile to -1, synchronize the upper gallery
skin and court-side camera. Preserve room IDs, names, floors and building bounds.

The pond was rendered without a collider. Use one shared circular water footprint
for rendering and collision; register it before all player/adult/navigation
indices, retain dry corners outside the circle and the pavilion approach, and
block ordinary walking/jumping across the water. A thin visible bank marks the
boundary without adding an invented tall fence.

Verification: failing-then-passing entrance and pond regression tests; broad
movement/door/stair/headroom checks; physical gate routes and health circulation;
independent code review; desktop facade inspection and mobile live navigation.
Build/synchronize both routes, publish through existing GitHub Pages and compare
published artifact content with the local build.
