# Stair rail body collision correction

User screenshot shows the avatar standing at the stair side and intersecting the handrail/safety mesh.

Root cause: smooth ramp support extends to +/-0.8 from center; rendered rail lies at +/-0.78 but the flight side rails/safety mesh never register player collision. Current support checks stop a multi-floor fall only after the avatar center reaches the tread edge, leaving the body over the rail.

1. RED: actual motor side-drift regression at both sides, all admin flights; collision probe at each actual rail.
2. Add short slope-following guard volumes from flight support to guard top. Register both player/people collision and camera volumes, preserving real headroom under stacked flights and open flight mouths.
3. Verify manual motion, all admin automatic stair routes, landings, stacked-flight headroom and both camera modes. Keep floor geometry, office locations, forecourt, gate and tree positions unchanged.
4. Build synchronized main/proposal copies, check actual browser stair behavior on desktop/mobile, publish existing route and check live revision.

Regression fixture correction: walking-controls originally connected the two far flight endpoints directly across the new side guards. Use the existing real turnU platform path for that switchback test; all physical movement assertions remain in place.
