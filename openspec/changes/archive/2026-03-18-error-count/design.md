## Context

The exercise runtime currently tracks progression and state (`opened`, `running`, `pending`, `completed`) but does not track mistakes. The page shows a pressed-key feedback section and a primary runtime control, yet there is no explicit error metric and no visual distinction between correct and incorrect key presses.

The requested behavior adds two related concerns during running state:
- deterministic error counting for wrong key presses,
- immediate visual feedback for wrong key input that clears on the next correct key press.

Constraints and compatibility requirements:
- Error counting must only happen in `running` state.
- Pause/resume must preserve the current counter value.
- Opening an exercise (including navigating to a different exercise) must initialize the counter to `0`.
- Counter presentation must be placed next to the pressed-key feedback section on the right and styled red.

## Goals / Non-Goals

**Goals:**
- Count wrong key presses while running and expose the count on the exercise page.
- Render the counter to the right of the pressed-key feedback section with red text styling.
- Apply red styling to the pressed-key feedback section when the latest key press is wrong.
- Restore normal pressed-key feedback styling after a correct key press.
- Preserve counter value across pause/resume in the same exercise session.
- Reset counter to zero on each exercise open/initialization.

**Non-Goals:**
- Persisting error count across page reloads or browser sessions.
- Cross-exercise aggregate error tracking.
- Changing progression semantics (correct key still advances; wrong key still does not advance).
- Adding analytics, scoring percentages, or timing-based metrics.

## Decisions

### Decision: Keep error state local to `ExerciseComponent`

Add component-level runtime properties for error behavior (for example `errorCount` and a boolean indicating wrong feedback state), reset during exercise initialization, and update from `handleExerciseKeydown`.

Rationale:
- Error counting is runtime UI/session state, not static exercise configuration.
- Keeps scope minimal and avoids changing service contracts.

Alternative considered:
- Store error state in a shared service. Rejected because no cross-component consumer currently needs this state.

### Decision: Increment counter only on mismatch while running

In `handleExerciseKeydown`, after capturing `lastPressedKey`, compare against `activeExpectedChar`:
- mismatch: increment counter, set wrong-feedback style flag to true, do not advance progression.
- match: clear wrong-feedback style flag and execute existing progression logic.

Rationale:
- Aligns directly with existing kernel behavior (wrong input does not advance).
- Guarantees pause/resume continuity since pause does not reset runtime properties.

Alternative considered:
- Derive errors from progression diffs rather than explicit counter increments. Rejected as less clear and harder to maintain.

### Decision: Render counter to the right of pressed-key feedback in the feedback row

Place a dedicated error-counter block in the same feedback row as the pressed-key section, aligned on the right in `exercise.component.html`, and style it with a red text class in `exercise.component.css`.

Rationale:
- Matches explicit placement requirement.
- Keeps layout intent clear and testable.

Alternative considered:
- Place counter below the primary runtime control. Rejected due to the updated placement requirement next to pressed-key feedback.

### Decision: Apply wrong-feedback styling via class binding

Bind a conditional class on the key-pressed feedback section based on the wrong-feedback state flag.

Rationale:
- Produces deterministic UI transitions: wrong -> red, next correct -> normal.
- Avoids direct DOM mutation and remains idiomatic Angular.

Alternative considered:
- Inline style toggling from TypeScript. Rejected to keep presentation concerns in CSS.

## Risks / Trade-offs

- [Rapid key input can toggle feedback state frequently] -> Mitigation: keep a single boolean representing latest correctness outcome.
- [Template/CSS structure changes may affect selector assumptions in tests] -> Mitigation: prefer semantic class names and update requirements tests to assert observable behavior.
- [Counter reset timing bugs on route change] -> Mitigation: perform reset in the same initialization path that sets `expectedCharsToDisplay` and runtime state.

## Migration Plan

1. Add runtime error properties in `ExerciseComponent` and initialize/reset them when exercise config is loaded or reset.
2. Update keydown handling logic to increment on mismatch and clear wrong state on correct key.
3. Update exercise template to render the error counter in the pressed-key feedback row on the right.
4. Add CSS classes for red counter text and wrong pressed-key feedback state.
5. Extend requirements tests to cover:
- wrong-key increment behavior,
- no increment outside running state,
- pause/resume counter persistence,
- reset-to-zero on exercise open,
- feedback style transitions wrong->normal.
6. Run full test suite (`npm test`) and verify behavior.

## Open Questions

None.
