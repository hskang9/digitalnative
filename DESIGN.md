# Digital Native — a living studio

The site introduces an independent AI software engineer, demonstrates shipped products, and invites a project conversation. Preserve English/Korean content, product destinations, subscription terms, and contact routes.

## Direction

The latest direction supersedes the concrete/Ando courtyard. The user's BenjaminUIX reference (https://x.com/BenjaminUIX/status/2098040954100064462) shows an illustrated ochre tower, terracotta roofs, deep teal forest, cream editorial serif type, and gentle cinematic movement. Its poster and 5.18-second video were inspected through X's public syndication media. Exact fonts, tokens, and implementation are not available from the video; the local interpretation is original, genuinely navigable Three.js geometry with cel shading and restrained edge lines, not a copy of the reference video.

The complete inferred profile and implementation adaptations are recorded in `design-dna.json`. Preserve solarpunk planting and rooftop solar details as an aesthetic metaphor, not a sustainability claim.

## Tokens

- Parchment `#f6efda`: readable room walls.
- Teal `#092f35`: deep forest atmosphere.
- Ink `#193e3d`: text and subscription panel.
- Ochre `#e6b55a`: tower plaster.
- Terracotta `#b9663d`: roofs and trim.
- Cream `#f3ddb1`: calls to action and sunlit details.
- Manrope / Noto Sans KR: body, navigation, Korean headings.
- Cormorant Garamond: English editorial display and room headings.
- IBM Plex Mono: scene captions and technical metadata.

## Composition and behavior

The opening view immediately establishes the complete planted tower. The desktop composition places architecture left and editorial copy right; mobile puts the tower above readable foreground copy. No entrance click, initial camera flight, or scroll is required to see the garden. Four main storeys and two garden wings represent the product gallery, workshop, partnership pavilion, material library, Press room, and conversation court. Each room's full HTML content appears in a viewport-anchored reading panel beside the building (below it on mobile), retaining native selection, links, video controls, and scrolling. Panel layouts respond to their own width. A transparent header and persistent space navigation reach every section directly.

Each architectural room has its own bilingual summary, followed by its full content. Products introduces shipped products; Practice shows “Clarity. From the ground up.” and summarizes web, mobile, backend, and AI development; Work together shows “Built to work. Room to grow.” and explains the monthly partnership. Stack, Press, and Contact each have distinct summaries too. There is exactly one camera pose per room: summary, content reveal, and reading all use that same pose. Changing UI must never zoom into a wall or pull back to an exterior. Only changing rooms moves the camera, on a direct path without a depth excursion. Never collect summaries into a separate garden intro or replace them with only section headings.

Choosing a room starts camera travel immediately, even while the outgoing UI fades. Duration scales smoothly with distance (520–1200ms bounds), with quintic easing and no overshoot. Active camera movement follows the display refresh rate; quiet ambient rendering is limited to 20 fps. Its CTA changes only the UI to full content. A separate, saved **Scroll tour** toggle is off by default. When enabled, one native document scrollbar drives Garden → Products → Practice → Work together → Stack → Press → Contact, including the footer. After the 0.4-viewport garden opening, every room follows travel → summary (0.9 viewport) → UI-only reveal (0.28 viewport) → stationary reading. Reading distance follows actual content overflow at native 1:1 scale, plus short arrival and departure pauses. The stage stays sticky. Navigation seeks to the selected room's summary; its CTA seeks to that room's details without camera movement. Reverse scrolling restores summaries and reading positions at the same camera stop. There is no wheel cancellation, snapping, or nested-scroll trap. Resizing and switching languages preserve the current segment and relative position. Turning the tour off retains the current destination and restores independent panel scrolling. Hash URLs and browser Back/Forward restore rooms. Motion off and OS reduced motion remove animation, not summaries. Daylight can switch to golden hour.

A local tower illustration remains until the first successful WebGL frame. If WebGL is unavailable, all content appears in normal document flow. A small garden pool has subtle ripples; expensive real-time reflection and sky-environment passes were removed for the illustrated direction. Plants are instanced, resolution is capped, rendering pauses offscreen and in hidden tabs, inactive HTML panels are hidden/inert, and GPU resources are released on unmount. The SVG favicon matches the teal/ochre architectural monogram.

Click-driven handoffs use a 220ms close and 400ms open; detail panels rise 8px without blur. Summary entrances begin during the final 24% of camera deceleration: eyebrow, headline, description, and CTA rise 10px with 40ms staggering and 500ms easing, keeping text crisp. Their exit is a simultaneous 200ms fade in place. The outgoing UI closes before its replacement opens, independently of camera state. In the scroll tour, the outgoing detail panel fades over the first 22% of room travel; the destination summary appears over the final 28%. Its line stagger is scrubbed by scroll progress, never a timer. The stationary UI reveal fades the summary over its first 45%, then reveals the panel over its final 45%. Summary and detail never overlap. Every summary and reading segment stays fully visible during continuous scrolling, without camera-settling thresholds or timers. Reverse travel uses the same frame mapping. Hidden UI is inert; summary CTAs are focusable only while stationary. OS reduced motion and Motion off remove transitions.

## Framework

Next.js is pinned to stable 16.3.4, verified against the npm registry on 2026-09-11. The compatible baseline-browser-mapping transitive update clears the remaining audit finding. Static export is preserved. `AGENTS.md` and `CLAUDE.md` are automatically generated by the upgraded Next.js dev server; its bundled framework guides were consulted.

## Local preview

Use `http://127.0.0.1:3000` for this app. Another existing project binds IPv6 port 3000, so `localhost:3000` can resolve to that other app. Do not terminate its server.

Run `npm test` for tour boundaries, complete reading ranges, mobile content sizing, and reversible camera continuity; run `npm run build` for the production export. Verify desktop and narrow mobile layouts, both languages, full-route scrolling to the final footer, scene controls, reduced motion, no-WebGL fallback, section links, and retained contact destinations. Keep content readable without JavaScript.
