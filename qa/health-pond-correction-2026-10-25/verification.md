# Clinic/cooperative entrance and Xunping pond correction

References: user photos DSC05961.JPG and DSC05966.JPG. Both ground entrances
face the basketball courts, sharing the long shaded gallery above.

Changes:
- Shared health-bld facade sign changed to -1; both room doors, entrance nodes,
  corridor, staircase connections, nameplates and upper gallery now follow the
  court-facing side. Existing IDs, names, floors and building footprint preserved.
- Rendered clinic/cooperative corridor windows in place of blank walls, retaining
  the same solid window bounds and usable door openings. Court-side camera added.
- Pond rendering and collision share x=-2, z=-66, radius=8.5. One persistent
  circular water collider is registered before player, NPC and navigation indices.
  Walking/jumping cannot cross it; dry corners outside the circle remain clear.
  A thin stone bank marks the water edge, without an invented tall fence.
- Fallback collision scanning uses the same circle test as the spatial index.

Verification:
- New entrance/pond/window tests first failed on the old implementation.
- 99 regression tests in 4 files passed, including high-speed movement, jumping,
  adult collision, dry corners, pond detour, all room doors, stairs and headroom.
- 109 physical gate-to-destination routes and 13 health-building circulation
  origins passed: 122 cases, zero failures.
- Independent code review found no blocking issue.
- Desktop court-facing facade inspected. Build/source-embedded sync and whitespace
  checks passed. Live artifact/mobile verification recorded after deployment.
