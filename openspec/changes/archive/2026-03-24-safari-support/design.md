## Context

The stream-size setting uses an `input[type="range"]` element styled with `accent-color` and no explicit appearance reset. Safari on iOS (WebKit) does not render the slider thumb with this approach — the control appears as an empty track with no draggable element.

Current CSS:
```css
input[type='range'].setting-control {
  padding: 0;
  border: none;
  accent-color: #2c3e50;
}
```

Safari requires `-webkit-appearance: none` to opt out of the native renderer, after which the thumb and track must be explicitly styled via vendor-prefixed pseudo-elements.

## Goals / Non-Goals

**Goals:**
- Range input thumb is visible and draggable on Safari/iOS (iPad).
- Visual appearance is consistent with the existing styling on other browsers.
- Declare Safari/iOS (iPad) as a supported browser in `webapp-core` spec.

**Non-Goals:**
- No changes to component TypeScript or HTML.
- No new npm dependencies or build-tool changes.
- No full cross-browser CSS audit beyond the known Safari range-input failure.
- No visual redesign of the slider.

## Decisions

**Use CSS pseudo-elements rather than a JS polyfill or a custom component.**

Rationale: The failure is purely a CSS rendering gap. A native `input[type="range"]` with `::-webkit-slider-thumb` / `::-webkit-slider-runnable-track` rules is the idiomatic, zero-dependency fix. Replacing the element with a custom Angular component would add code complexity and test surface for a problem that CSS solves in ~10 lines.

Alternatives considered:
- *JS range-slider library*: Adds a dependency and runtime overhead; disproportionate for a styling issue.
- *Custom Angular component*: More testable but overkill; the native element is fully functional, only its appearance is broken.

**Match existing accent color (`#2c3e50`) for the thumb and track.**

The thumb background and track active color are set to `#2c3e50` to stay visually consistent with the current `accent-color` value used on non-WebKit browsers.

**Apply `-webkit-appearance: none` only on the `input[type='range']` selector, not globally.**

Scoping the reset prevents unintended side effects on other form elements.

## Risks / Trade-offs

- **Thumbnail styling duplication**: The same color (`#2c3e50`) is now specified in `accent-color` (for non-Safari) and in `::-webkit-slider-thumb` (for Safari). If the brand color changes, both places must be updated. → Mitigation: comment in CSS noting the two are intentionally in sync.
- **Track styling reset**: `-webkit-appearance: none` removes the native track, requiring explicit track re-styling. The `::-webkit-slider-runnable-track` rule reintroduces a minimal track. → No user-facing risk; tested pattern.
