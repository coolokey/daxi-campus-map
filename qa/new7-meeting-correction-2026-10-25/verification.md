# New building meeting room correction

User-confirmed use: new building meeting room. References: DSC06092, DSC06093,
DSC06123, aerial 2026-10-25 095707 and rejected model screenshot 121720.

## Root cause and corrected geometry

The previous model treated the room as an extra perpendicular wing and retained
a complete three-storey classroom block behind it. This folded the continuous
meeting-room/tower facade through 90 degrees and misrepresented its silhouette.

The meeting room now replaces the main bar's left section: local u=-23..-9,
v=-7..1, high single-storey shell. Its courtyard-facing glazing, four columns and
projecting eave run along u and join the glass/louvre stair front. Upper-floor
footprints, walls, corridors, trims and main roof no longer cover this volume.
The stair occupies u=-9..-1; existing main room identities/floors remain in order
on its other side. The return ends at v=10, clear of the existing grey ancillary
block. These are photo-proportioned dimensions, not surveyed measurements.

The roof is a continuous terrace with shallow bands, set-back masonry, rail and
green court-end strip. The unverified eight descending roof steps were removed.
The court-side short end has a doorway consistent with the ground photographs.

## Room and UI integration

- New searchable/navigable destination: new7-meeting, 新大樓會議室, 1F.
- MEET-1 is an assigned model identifier, not a transcribed plan code.
- Its custom high shell replaces generic classroom walls; generic furniture and
  nameplate remain. Door, corridor, porch and collision geometry share coordinates.
- The meeting display row is limited to 1F; confirmed room IDs/names/floors and
  browser-local naming behavior are preserved.
- Added a 新大樓會議室 exterior view for the courtyard-facing comparison.
- Canonical and embedded proposal modules synchronized by the existing build.

## Verification before release

- 100 core regression tests in 5 files passed.
- 10 focused photo-plan/UI tests passed after the review correction.
- Physical movement: all 109 gate-to-destination routes, 37 new-building
  circulation origins, and one meeting-room-to-campus route passed (147 cases).
- Independent photo review confirmed the long facade direction and removal of
  the incorrect high background. Code review found a display-row floor filter;
  corrected before release.
- Rendered complete aerial silhouette, courtyard-facing front and 3F cutaway
  inspected. Browser console errors: none.
- Production build and git diff whitespace checks passed.

Live release and mobile results are recorded after deployment separately.
