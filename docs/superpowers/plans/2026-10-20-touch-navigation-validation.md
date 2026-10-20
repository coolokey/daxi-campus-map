# Touch and navigation repair validation

## Implementation

- Recover joystick and legacy direction input after releases outside controls, pointer capture loss, cancelled touches, blur, page changes and orientation changes. Preserve ownership during independent multi-touch releases and when a second finger touches the same stick.
- Apply compact controls and tool drawers to coarse-pointer tablets, including wide iPad viewports. Keep the anniversary launcher above the right control. Close tools for an explicitly prepared route, including reselecting the same destination; do not close tools on walking progress.
- Connect the current supported position to reachable graph anchors, cache goal-rooted shortest graph paths, and simplify only collision-safe level segments using the actual movement motor. Preserve stair transitions and blocked reporting. Add planning clearance around walls and repair the disconnected narrow south stair approach in multi-building.
- Reuse a fresh route instead of planning twice. Auto-walk speed changes from 14 to 7 model units per second before the existing user speed multiplier; ease corner turns and avoid unchanged floor-label DOM writes.

## Verified before publication

- Eight focused suites, 94 tests passed, covering input lifecycle, multi-touch, same-destination selection, route motor execution, stair starts, geometry, collisions, administrative links and fireworks preservation.
- Build succeeded; canonical and embedded explorer sources synchronize through the existing build scripts.
- Navigation audit: 586 routes from 479 sampled origins, including room centers, all stair-flight intermediate samples, landings, galleries and outdoor points. All segments execute through the actual static collision motor; no failures. Gate routes cover 107 non-alias destinations.
- Gate comparison against 94c04e9: 103 routes shorter, four within 10 cm, none longer by more than 10 cm. Mean distance 190.51 to 158.36 model units; mean waypoint count 293.16 to 12.45. This is a comparison of sampled routes, not a proof of globally shortest paths from every possible position.
- Spatial verification: 114 room records / 94 physical rooms, 17,197 graph nodes; no unreachable destinations, blocked graph edges, stair or door failures, or motor-route failures.
- Independent source review found no remaining P1/P2 issues after regression fixes.
- Local browser matrix passed both entries at 1024x768, 390x844, 820x1180, 1366x1024 and 844x390: 10 cases, no console/page/HTTP errors. Each entry completed a full collision-motor arrival from the south stair; all cases passed native multi-touch, release/stop, route start and pause/resume checks.

Browser evidence is produced by `scripts/verify-touch-navigation.cjs` in `qa/touch-navigation-20261020/`. It checks real control hit targets, native CDP multi-touch, stopped movement after release, and actual UI start/pause/resume. Full fixed-step collision-motor arrival runs once per entry; other viewport cases check real animation progress and stopping. This is Edge viewport/touch emulation, not physical iPad hardware or a device frame-rate benchmark.

Five frozen fireworks module hashes remain unchanged, including defaults, cues and audio. The repair changes launcher placement only.

## Publication acceptance

Publish the existing GitHub Pages route, require successful Actions for the exact commit, compare live canonical/embedded source content, and repeat the browser checks against both published entries. Do not report the release as verified if the browser report has errors or the process exits nonzero.

Initial live 1366x1024 progress sampling failed because no animation frame occurred within the fixed 350 ms test window. A diagnostic recorded zero RAF callbacks, visible document, no person blocking and no people wait; movement then resumed (0.657 model units) while navigation remained walking. Browser verification now waits for observable movement with a bounded 10-second deadline. It still asserts actual movement and walking state, and does not force input or skip collision checks. This adjusts the software-WebGL test timing; no runtime change was needed.
