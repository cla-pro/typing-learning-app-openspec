## Context

The current exercise page includes metadata and generic panels that do not prioritize the typing flow. The existing kernel behavior already tracks active expected-character progression and completion, but the visual representation is basic and does not provide a dedicated focus area around the active character.

This change is a UX-focused refinement over existing behavior. It introduces a stream layout with a centered zoom window while preserving the underlying progression model and keeping last-key feedback visible beneath the stream.

## Goals / Non-Goals

**Goals:**
- Remove display of exercise id, exercise name, and impacted keys from the exercise page UI.
- Present expected characters as a continuous left-to-right stream with hidden overflow.
- Introduce a central zoom window showing two previous characters, active character, and two following characters in larger typography.
- Keep the active character visually emphasized in the center slot while active.
- Shift stream content left on each correct key press so side and zoom areas remain consistent.
- After final correct key, shift the final character out of active slot and render a no-active-character state.
- Keep last pressed key visible below the stream/zoom visualization.

**Non-Goals:**
- Changing core progression rules (matching logic and case sensitivity) beyond visual-state integration.
- Introducing score, WPM, timing metrics, or broader exercise analytics.
- Reworking routing, not-found flows, or service contracts.
- Final visual polish/theme system beyond functional UX behavior.

## Decisions

1. Stream layout is derived from active index and expectedChars sequence.
- Decision: Compute a view model split into previous segment, zoom window segment, and following segment from the current active index.
- Rationale: Deterministic mapping from progression state to UI zones keeps shifting behavior stable and testable.
- Alternative considered: Manual DOM transforms for shifting animation. Rejected for this iteration due to complexity and lower testability.

2. Fixed zoom window of five slots centered on active character.
- Decision: Render five zoom positions representing `[active-2, active-1, active, active+1, active+2]` when available.
- Rationale: Matches product requirement exactly and provides predictable reading context.
- Alternative considered: Adaptive zoom size based on viewport. Rejected because requirement calls for explicit two-before/two-after behavior.

3. Overflow clipping at both side segments.
- Decision: Left and right non-zoomed segments are rendered within bounded containers with hidden overflow and margins from component border.
- Rationale: Ensures long sequences remain visually constrained and centered focus remains readable.
- Alternative considered: Wrapping text or multi-line overflow. Rejected because it breaks linear typing-flow representation.

4. Shift behavior tied to correct progression events only.
- Decision: UI shift occurs as a consequence of active index advancement on correct keypress, not on every keypress.
- Rationale: Keeps visual movement aligned with semantic progression and avoids jitter from incorrect inputs.
- Alternative considered: Temporary visual movement on wrong keys. Rejected as distracting and outside requirement.

5. Explicit no-active-character rendering after terminal shift.
- Decision: After final correct key, the final character shifts into previous area and center active slot is empty/non-emphasized.
- Rationale: Satisfies requirement that no character remains to be recognized after completion.
- Alternative considered: Keep final character highlighted after completion. Rejected by requirement.

6. Preserve last-pressed-key panel beneath stream visualization.
- Decision: Keep the existing "last pressed key" information visible below the new stream+zoom block.
- Rationale: Maintains useful feedback and continuity with current behavior.
- Alternative considered: Remove or move to top panel. Rejected because requirement specifies under the whole stream UI.

7. Behavior-focused tests with observable render states.
- Decision: Extend component requirements tests to verify hidden metadata removal, zoom-window composition, shift outcomes, and post-final no-active state via component state/rendered output assumptions.
- Rationale: UX change is stateful and must be regression-proof without implementation-text assertions.
- Alternative considered: Snapshot-only UI tests. Rejected due to brittleness and weak behavior guarantees.

8. No placeholder in center slot after completion.
- Decision: When there is no active character (after terminal shift), the center slot remains visually empty.
- Rationale: Matches product requirement that no active character remains to be recognized.
- Alternative considered: Render a placeholder symbol in center slot. Rejected by product requirement.

9. Side segments use reduced emphasis styling.
- Decision: Non-zoomed side segments use reduced font size and reduced opacity relative to zoomed characters.
- Rationale: Preserves context while directing attention to the zoom window and active center slot.
- Alternative considered: Equal styling across all segments. Rejected because it weakens focus hierarchy.

## Risks / Trade-offs

- [Risk] Character-segment computations may produce off-by-one errors near sequence boundaries.
  - Mitigation: Add targeted tests for start, middle, and end positions including final-character completion.

- [Risk] Hidden overflow may clip too aggressively on smaller screens.
  - Mitigation: Define clear container widths/margins with responsive breakpoints and verify with representative lengths.

- [Trade-off] Functional stream shifting without animation may feel abrupt.
  - Mitigation: Prioritize correctness now; motion refinement can be introduced in a later UX polish change.

- [Trade-off] Removing name/id/impacted keys reduces contextual metadata.
  - Mitigation: Accept focus-first UX for exercise mode; metadata can be surfaced elsewhere if needed.

## Migration Plan

1. Refactor exercise template to remove id/name/impacted-keys display blocks.
2. Introduce stream layout containers (left, zoom, right) and move expected-character rendering into them.
3. Add component-level derived segment state/getters for previous, zoomed, and following characters.
4. Wire segment updates to active-index progression so each correct key shifts stream left.
5. Ensure final correct-key completion produces no-active-character center state.
6. Keep and reposition last-pressed-key display below the stream visualization.
7. Update requirements tests for new UX behavior and regression coverage.
8. Run full test suite and Angular build.

Rollback strategy:
- Restore previous simple expected-character rendering block while keeping kernel progression logic unchanged.
- Revert UX-specific tests in same commit if rollback is required.

## Open Questions

None.
