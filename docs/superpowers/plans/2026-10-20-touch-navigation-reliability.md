# Touch and arbitrary-position navigation reliability

User-authorized repair of existing controls and navigation; preserve campus geometry, rooms, fireworks defaults and public URLs. Use the existing Three.js motor, collision grid and spatial graph. Do not teleport through walls or skip stairs to manufacture successful navigation.

- [x] Reproduce stale input through release outside controls, lost capture, cancelled touches, focus/page lifecycle, and two-finger ownership. Add failing regression tests before repair.
- [x] Reproduce iPad touch layouts and compare launcher/control bounding boxes. Extend responsive placement, preserving sound/countdown/quality defaults.
- [x] Sample all building stairs, intermediate landings, upper galleries, room interiors and outdoors. Reproduce route planning failure and execute planned paths using the actual collision motor.
- [x] Repair exact-position attachment to the existing graph using connected, supported surfaces and collision-safe edges. Keep unreachable/blocked reporting honest. Reset stale input before automatic walking, and verify interruption/resumption from the current location.
- [x] Run focused regressions and broad spatial/route motor audits. Independently review the diff. Build/synchronize canonical and embedded entries; pass both entries at five touch viewport sizes (10 browser cases, no errors).
- [ ] Push the existing Pages route and verify release SHA and live tablet/mobile interactions.

Files: mobile-controls.js owns joystick pointers; explorer.js owns legacy direction buttons/manual input/auto-walk; spatial-world.js owns graph attachment and supported surfaces; mobile-layout.css owns safe responsive placement. Add small shared helpers only if they reduce duplicated input lifecycle handling. Tests and browser QA must verify observable movement and hit targets, not only source strings.
