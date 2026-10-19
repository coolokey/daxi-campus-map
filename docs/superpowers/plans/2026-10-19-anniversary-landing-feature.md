# 80th anniversary landing feature

Audience: Daxi Junior High alumni visiting during the 80th anniversary.

Design: promote the existing fireworks experience to the landing hero. Warm paper, school green and celebratory gold; existing aerial photo with an illustrated 80 and restrained fireworks lines. Main copy invites alumni home. Primary CTA starts the existing show directly; secondary CTA and three guide chapters retain campus entry/search/story behavior. Mobile places the primary CTA above the photo within the first viewport; small screens remain scrollable without horizontal overflow. Reduced-motion visitors receive a static decoration.

Architecture: static landing markup in public/campus-explorer/index.html prevents startup flash. Presentation stays in field-guide.css. anniversary-fireworks.js binds the existing static hero entry rather than appending a duplicate footer button, and retains a fallback for embedded/test contexts without the static cover. field-guide.js does not enable the fireworks CTA before its controller binds it. No audio engine or particle scene changes.

Plan:
1. Add a failing entry contract for a static hero fireworks CTA and its reuse by the controller.
2. Update static hero and responsive visual styles, preserve handbook/chapter IDs and deep-link bypass.
3. Bind the original start handler to the hero CTA; preserve user-gesture audio and 100% default volume.
4. Run focused landing/lifecycle tests; build and synchronize the proposal copy.
5. Browser-check both entrypoints on desktop, portrait mobile and short landscape. Confirm CTA visible without scrolling, one CTA, no overflow, working handbook, actual countdown, 18 sound files, volume100, finish/stop/replay and no errors.
6. Review, publish the existing route, wait for Pages, repeat live entry checks and deliver screenshots.
