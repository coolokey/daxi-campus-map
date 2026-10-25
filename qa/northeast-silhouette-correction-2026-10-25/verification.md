# Aerial silhouette correction

Reference: user model screenshot 2026-10-25 113437 and aerials 095623,
095707, 095718, 095728, 095811, 095822; existing ground photo contact sheets.
The previous release's circulation checks did not establish photo accuracy.

## Changes

- Keep the new7 court-side left edge at world x=57; reduce the main bar length
  from 46 to 38 schematic units. Its perpendicular return remains 22 units long.
- Remove the unsupported 8-unit westward hall enlargement. The hall is 8 by 14
  units, aligned with the court-side end of the main block. Its long window wall
  and cream columns face the internal courtyard, beside the glass stair tower.
- Replace the dark single flat roof with a pale stepped terrace, raised rear
  landing, eight shallow intermediate levels and a green court-end strip.
- Resize courtyard steps/ramp and structural post positions to preserve clearance.
- Keep the library U opening and red tower centres; its low roof now follows the
  six scalloped courtyard bays rather than cutting them off with a straight edge.
- Model the grey ancillary block behind the connection with a taller body and
  lower side extension, retaining the existing confirmed ground room only. No
  upper room identity, stair or destination has been invented. Synchronize its
  room-panel row range with the relocated footprint.
- Pull back the new7 exterior view to show the complete building silhouette.

All dimensions are photo-proportioned, not surveyed measurements. Other campus
building footprints, room identities, floors and original credits are preserved.

## Verification

- 100 regression tests in 5 files passed (new7-photo-plan, outdoor-world,
  spatial-plan, walk-world, collision-grid). The first CPU-contended run timed
  out on two geometry checks; the isolated rerun passed without relaxing limits.
- Physical movement audit: 108 gate-to-destination cases, 34 new7 circulation
  origins, 49 multi-building circulation origins; 191 total, zero failures.
- Independent review caught the stale ancillary room-panel range; corrected.
- Desktop rendered full exterior and 2F/3F cutaways inspected using the UI.
- Local browser console errors: none. Canonical/proposal files synchronized.
- Production build succeeded; existing Pages release route retained.

Published artifact and mobile verification are recorded separately after deploy.
