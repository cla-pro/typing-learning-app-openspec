## Why

The current welcome page layout gives too much visual space to the title and navigation tiles, which reduces information density and makes scanning categories slower. A more compact layout will improve readability and fit more exercise options within the initial viewport.

## What Changes

- Update the welcome page title text from `Welcome to Typing Learning` to `Typing Learning`.
- Reduce horizontal padding/margins of the main welcome section so content sits closer to the window borders.
- Resize exercise link tiles to smaller, mostly square cards.
- Update category tile layout to place multiple exercise tiles on the same row and wrap to a new row only when available width is exhausted.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `welcome-page`: update welcome-page heading text and grouped exercise tile layout to a denser, multi-column card presentation with responsive wrapping.

## Impact

- `src/app/components/welcome/welcome.component.html` for title text and tile container structure.
- `src/app/components/welcome/welcome.component.css` for spacing, tile sizing, and multi-column wrapping behavior.
- `tests/app/components/welcome/welcome.component.requirements.test.ts` may need updates if assertions include title text or layout-related behavior contracts.
