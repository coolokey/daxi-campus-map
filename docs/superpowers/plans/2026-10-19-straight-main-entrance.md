# Straight main entrance, palm avenue and statue

User reference: screenshot 2026-10-19 082519. Main gate is straight, with palm avenue and statue on the same axis.

Architecture: outdoor-plan owns entrance frame; explorer renders gate, guard and statue; entrance-avenue owns palms/road/colliders; minimap owns cached road image; spatial-world rebuilds navigation from room destinations.

1. Regression: require zero gate yaw, gate/avenue/statue same X, continuous unobstructed centerline.
2. Retain statue courtyard at (-36,28.5), move gate center to (-36,86), and translate outside avenue by -26 X. Translate guard and nearby fence returns, preserving all building geometry and the original south driveway/tree row.
3. Gate, six parking stalls, guard targets, labels, NPC guard and minimap all consume shared entrance coordinates. Keep current person detour fixes.
4. Run regression tests/build, inspect actual top view and gate/avenue eye-level views, run real auto-navigation on desktop/mobile in both entrypoints. Publish using existing Pages route and check the deployed revision.
