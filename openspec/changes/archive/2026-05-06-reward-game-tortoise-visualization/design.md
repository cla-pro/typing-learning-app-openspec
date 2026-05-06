## Context

The tortoise reward game (`tortoise-game-host`) currently loads a `TortoiseGameConfig` (with `start`, `end`, `waypoints`, `obstacles`, all typed as `GridPosition { col, row }`) and renders only a placeholder text. There is no visual representation of the game world yet.

This change introduces a `TortoiseVisualizationComponent` that takes a `TortoiseGameConfig` input and renders the game world. The host component replaces the placeholder with this component.

## Goals / Non-Goals

**Goals:**
- Render the game world on three independent visual layers: path, objects (tortoise + obstacles), debug grid
- Map every grid position `(col, row)` to a pixel coordinate that centers the object inside its grid cell
- Animate tortoise movement smoothly between grid cells (pixel interpolation, not cell-snapping)
- Provide a toggleable debug grid overlay that draws cell boundaries and `(col,row)` labels

**Non-Goals:**
- Keyboard input handling, obstacle clearing, or any game kernel logic
- Persisting or restoring tortoise position
- Responsive/adaptive cell sizing (cell size is a fixed internal constant for now)
- Accessibility enhancements (screen reader support for the canvas area)

## Decisions

### D1 — Layered HTML/SVG rendering, not `<canvas>`

**Decision:** Use stacked HTML elements with `position: absolute` for the layer stack. The grid and path layers are SVG elements; the object layer is an HTML `<div>` containing absolutely-positioned child elements.

**Alternatives considered:**
- *Multiple `<canvas>` elements*: Natural for game rendering but requires imperative draw calls, breaks Angular change detection, and is harder to unit-test.
- *Single `<canvas>`*: Same drawbacks plus loses independent layer toggling.

**Rationale:** SVG + positioned HTML stays within Angular's rendering model (template-driven, `@if` for debug toggle), integrates cleanly with CSS transitions for animation, and is testable with standard `TestBed` DOM queries. The game board is small enough (< 20×20 grid) that SVG performance is not a concern.

---

### D2 — Fixed cell size constant

**Decision:** Define `CELL_SIZE_PX = 64` as an internal constant of the visualization component. The board pixel dimensions are derived as `cols * CELL_SIZE_PX` and `rows * CELL_SIZE_PX` where `cols` and `rows` are computed from the bounding box of all `GridPosition` values in the config (max col + 1, max row + 1).

**Alternatives considered:**
- *`@Input() cellSize`*: More flexible but premature; no consumer needs a variable cell size yet.
- *Viewport-fit scaling*: Adds complexity and is out of scope for this visualization phase.

---

### D3 — Pixel position formula and cell-centered placement

**Decision:** The pixel origin (top-left) of a grid cell `(col, row)` is `(col × CELL_SIZE_PX, row × CELL_SIZE_PX)`. The **center** of that cell is:

```
px = col × CELL_SIZE_PX + CELL_SIZE_PX / 2
py = row × CELL_SIZE_PX + CELL_SIZE_PX / 2
```

All objects (path waypoints, tortoise, obstacles) are placed at their center pixel using `transform: translate(px, py) translate(-50%, -50%)` so the element's own center aligns with the cell center.

---

### D4 — CSS transition for tortoise animation; pixel position tracked in component state

**Decision:** The tortoise element is positioned via a `(pxX, pxY)` state tracked in the component (not recomputed from grid position on every frame). When the kernel (future change) instructs a move, the component updates `(pxX, pxY)` to the **target cell center** and a CSS `transition: transform Xms linear` interpolates the pixel movement smoothly.

During the transition the displayed position is continuously between the old and new cell centers — it does not snap to any discrete grid coordinate. The grid coordinate state in the kernel remains at the *source* cell until the animation completes (kernel signals completion via a callback or observable).

**Alternatives considered:**
- *`requestAnimationFrame` loop*: More control over easing but requires imperative code and doesn't integrate with Angular signals/inputs.
- *Angular Animations (`@angular/animations`)*: More idiomatic but introduces a dependency on `BrowserAnimationsModule` and adds boilerplate for a simple translate animation.

**Rationale:** CSS transitions are the lightest-weight option and sufficient for linear movement. The duration (`MOVE_DURATION_MS`) will be a constant that the kernel phase can tune.

---

### D5 — Debug grid as SVG overlay, toggled via `@Input() debugGrid`

**Decision:** The debug grid layer is an SVG element absolutely positioned over the board. It draws:
1. Vertical and horizontal lines at every cell boundary
2. A `(col,row)` text label centered in each cell

It is rendered only when the `debugGrid` input is `true`. The host component passes `debugGrid="false"` (default) but can set it to `true` for development.

---

### D6 — Path layer as SVG polyline through waypoints

**Decision:** The path layer renders an SVG `<polyline>` connecting the cell centers of all waypoints in order. Start and end positions are the first and last waypoints. No special markers are drawn for start, end, or intermediate waypoints at this phase.

---

### D7 — Initial tortoise and obstacle visuals

**Decision:** The tortoise is rendered as an emoji-centered HTML element, while each obstacle is rendered as a simple circular disk centered on its grid cell and visually aligned with the path.

**Alternatives considered:**
- *Custom SVG or image assets for both*: More polished but premature for the first visualization milestone.
- *Emoji for obstacles too*: Fast, but visually noisier and less readable than a simple geometric marker.

**Rationale:** This keeps the first implementation lightweight while making obstacles distinct from the tortoise and easy to position consistently.


---

### D8 — Component location and selector

**Decision:** New component `TortoiseVisualizationComponent` at `src/app/components/tortoise-visualization/`. Selector: `app-tortoise-visualization`. Imported directly into `TortoiseGameHostComponent`.

## Risks / Trade-offs

- **CSS transition timing vs. kernel state**: The kernel phase must not issue a second move command before the animation from the first completes, or the tortoise will jump. Mitigation: the animation completion event (CSS `transitionend`) must gate the next move; this is a contract the kernel phase must respect.
- **SVG coordinate system vs. HTML coordinate system**: Both SVG and positioned HTML use the same origin (top-left corner of the board container), so coordinates are consistent across layers. Mitigation: board container has `position: relative; overflow: hidden` and explicit `width`/`height` matching the SVG `viewBox`.

## Open Questions

- No open questions currently.
