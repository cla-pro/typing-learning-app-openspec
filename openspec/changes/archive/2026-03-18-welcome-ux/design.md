## Context

The welcome page already renders grouped exercise categories and links, but the current visual hierarchy is oversized and single-column oriented:
- title text is currently `Welcome to Typing Learning`
- container and card paddings leave large side margins
- exercise links render as full-width row items

The requested update is a compact UX pass focused on readability density and faster scanning:
- shorten title to `Typing Learning`
- reduce horizontal spacing so content sits closer to viewport edges
- shrink exercise links into mostly square tiles
- allow multiple tiles per row within each category, with wrapping when row width is exhausted

## Goals / Non-Goals

**Goals:**
- Make the welcome page denser without changing data loading behavior.
- Render category exercises as responsive tile grids (multi-column, wrap as needed).
- Keep grouped category order and exercise order unchanged.

**Non-Goals:**
- Changing `ExerciseConfigService` contracts or category structures.
- Introducing new navigation behavior, filtering, sorting, or pagination.
- Redesigning color theme or typography beyond sizing/spacing updates needed for the compact layout.

## Decisions

### Decision: Keep data flow unchanged and implement UX through template text + CSS layout

`WelcomeComponent` already consumes grouped category data from `listExerciseCategories()`. The UX change should only adjust title text and presentation classes in template/CSS. This minimizes risk and keeps behavior changes isolated to rendering.

**Alternative considered — reshape category/exercise data for layout metadata:** rejected as unnecessary for the requested visual-only changes.

### Decision: Use flex-wrap tile layout per category

Each category’s exercise list will switch from a vertical column to a wrapping row layout. A container style like `display: flex; flex-wrap: wrap;` with controlled tile basis/width ensures multiple tiles appear on one line and naturally wrap when no space remains.

**Alternative considered — CSS grid:** viable, but flex-wrap is sufficient for the required “fill line then wrap” behavior and is consistent with existing CSS style.

### Decision: Define compact tile dimensions with responsive constraints

Exercise links should be smaller and mostly square using fixed/min dimensions (for example with comparable width and height) while preserving legibility. On narrow screens, tile sizing should gracefully reduce columns while avoiding overflow.

**Alternative considered — strict fixed squares:** rejected because strict fixed size can create clipping or poor responsiveness on small viewports.

### Decision: Reduce outer horizontal spacing at both container and content levels

To bring content closer to window borders, reduce horizontal padding in `.welcome-container` and `.welcome-content`, while keeping enough spacing for readability and touch interaction.

**Alternative considered — remove container framing entirely:** rejected because the framed card remains useful for visual focus and consistency with current page style.

## Risks / Trade-offs

- [Tile text overflow] Smaller, squarer tiles may truncate long exercise names. → Mitigation: keep reasonable min width and allow text wrapping within tiles.
- [Responsive density variance] Different viewport widths may show different column counts. → Mitigation: explicitly define wrap behavior and mobile-friendly tile sizing.
- [Perceived hierarchy loss] Smaller title and tighter spacing could reduce visual emphasis. → Mitigation: preserve strong heading weight/color while reducing only size and margins.

## Migration Plan

1. Update welcome template heading text to `Typing Learning`.
2. Adjust welcome-page CSS spacing (container/content/title margins) for compact side spacing.
3. Convert category exercise list to wrapping tile layout and apply square-ish tile dimensions.
4. Verify responsiveness on small viewports and run requirements tests.

## Open Questions

None.
