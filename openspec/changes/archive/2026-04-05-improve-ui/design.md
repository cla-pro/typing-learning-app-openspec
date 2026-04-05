## Context

There are two independent visual improvements to the exercise page UI:

1. **Enabled key color** — `KeyboardDisplayComponent` currently renders enabled keys with a near-white/grey fill (`#ecf0f3`) that is only subtly different from the disabled grey (`#d6dde3`). Adding a blue tint to enabled keys makes the contrast immediately obvious.

2. **Control panel layout** — `ExerciseComponent` currently stacks the error counter above the start/pause button in the `.exercise-focus-stack` column. The counter is conceptually related to the exercise session, not to the keyboard highlight, so it belongs beside the button. Grouping them into a horizontal row creates a clear "control panel" unit without introducing a new component.

## Goals / Non-Goals

**Goals:**
- Enabled keyboard keys render with a distinct blue color
- Error counter and start/pause button appear side by side in a horizontal row
- No new Angular component is introduced

**Non-Goals:**
- Redesigning the overall exercise page layout
- Changing the keyboard highlight colors (green/red) introduced in `key-press-feedback`
- Moving the size slider or keyboard display position

## Decisions

### Decision 1: Blue color value for enabled keys

**Choice:** `background-color: #1565a5`, `color: #ffffff`, `border-color: #0d47a1`

**Rationale:** A solid dark blue fill with white text makes enabled keys immediately stand out from the grey disabled keys (`#d6dde3`/`#7f8d98`) and the keyboard panel background (`#f8fafc`). The white text ensures legibility against the dark fill. It avoids clashing with the green/red highlight classes that are layered on top via source-order priority.

### Decision 2: Control panel markup structure

**Choice:** Wrap `<button>` and `<span class="error-counter">` in a new `<div class="control-panel">` inside `.exercise-focus-stack`. No new Angular component.

The `.control-panel` div is a `display: flex; align-items: center; gap: 1.5rem` row. Button is left, error counter is right.

**Order in `.exercise-focus-stack` column:** control-panel first (top), then `<app-keyboard-display>` below — the size slider remains between the stream and the focus-stack since it lives in the stream-shell section, unchanged.

**Rationale:** A single wrapper `<div>` is the minimal markup change. The existing `.error-counter` and `.runtime-button` CSS rules stay intact — only the layout relationship between them changes.

**Alternative considered:** CSS `flex-direction: row` on the focus stack itself — rejected because the keyboard below must stay in a column arrangement and mixing the two layouts in one element would require overrides.

### Decision 3: Spec update scope

The existing spec scenario "Error counter is shown to the right of pressed-key feedback" is invalidated — the counter is no longer next to the pressed-key feedback. The delta spec for `exercise-page` will:
- REMOVE that scenario from the error-counter requirement
- ADD a new scenario: "Error counter is displayed in the control panel row beside the start/pause button"
- MODIFY the requirement description to drop the "same feedback row as pressed-key feedback" wording

## Risks / Trade-offs

- [Highlight color layering] The blue enabled-key color must remain lower priority than `.keyboard-key-pressed-correct` / `.keyboard-key-pressed-wrong`. Since highlight classes are already defined after `.keyboard-key` in source order, adding a blue fill to `.keyboard-key` does not disturb this — the priority is already correct.
- [Test update] The existing counter-placement test asserts the counter is next to pressed-key feedback; it must be updated to assert it is in the control panel row with the button. This is a straightforward DOM query update, not a logic change.
