## Context

The exercise page currently renders exercise metadata and invalid-id fallback, but it does not define a runtime lifecycle for an active exercise session. The new change introduces explicit page states (`opened`, `running`, `pending`, `completed`) and state-driven controls (`start`/`pause` plus a temporary completion trigger).

The page also needs keyboard event handling during active execution so pressed keys are captured and reflected in the UI. This must fit the current Angular standalone component structure (`ExerciseComponent`) and remain testable with existing Jest requirements tests.

Constraints:
- Keep implementation within the existing Angular app and exercise route flow.
- Use a temporary completion control strictly for simulation and testability.
- Avoid introducing backend dependencies or persistent state.

## Goals / Non-Goals

**Goals:**
- Model exercise lifecycle explicitly with deterministic transitions.
- Ensure initial state is `opened` and exercise does not start automatically.
- Implement a single primary control that toggles between `start` and `pause` according to state.
- Add a temporary control to force transition to `completed` for simulation.
- Capture keyboard input during `running` and display the last pressed character in the page.
- Keep behavior easy to verify with automated tests.

**Non-Goals:**
- Building final scoring, timing, or progress tracking logic.
- Designing final UX copy/layout for completion flows.
- Persisting exercise-state or key history across navigation/reload.
- Supporting complex key-combination semantics (modifiers, shortcuts) in this iteration.

## Decisions

1. Use a finite state model in `ExerciseComponent`.
- Decision: Represent lifecycle as a string union (or enum) with values `opened | running | pending | completed`.
- Why: Makes allowed states explicit and simplifies conditional rendering/button logic.
- Alternative considered: Multiple booleans (`isRunning`, `isPaused`, `isCompleted`).
  - Rejected because booleans can drift into invalid combinations.

2. Centralize transitions in component methods.
- Decision: Add methods such as `toggleRunPause()` and `completeTemporarily()` to enforce transition rules.
- Why: Keeps state transitions predictable and testable, avoiding scattered template logic.
- Alternative considered: Inline transition expressions in template bindings.
  - Rejected due to reduced readability and harder test targeting.

3. Drive primary button label from current state.
- Decision: Compute button label as `pause` only in `running`; otherwise `start` for resumable states (`opened`, `pending`).
- Why: Directly matches requirement and keeps UI synchronized with state.
- Alternative considered: Separate Start and Pause buttons.
  - Rejected because requirement calls for switching one button.

4. Limit keyboard handling to active running state.
- Decision: Handle key events only when state is `running`; ignore in `opened`, `pending`, and `completed`.
- Why: Aligns user interaction with active exercise phase and avoids misleading updates.
- Alternative considered: Capture keys in all states and conditionally display later.
  - Rejected due to unnecessary event processing and behavioral ambiguity.

5. Capture key input via Angular keyboard event binding on the page container.
- Decision: Use Angular event binding (for example `(keydown)`) on a focusable container or document-level listener managed by Angular lifecycle, and persist the last pressed character in component state.
- Why: Keeps implementation framework-native and testable without extra dependencies.
- Alternative considered: Direct `window.addEventListener` without lifecycle management.
  - Rejected because it can leak listeners and complicate teardown/testing.

6. Expose temporary completion control with explicit temporary semantics.
- Decision: Add a secondary button dedicated to forcing `completed` state, clearly marked temporary in copy/code naming.
- Why: Enables deterministic test and demo of completion behavior before final completion detection exists.
- Alternative considered: Simulate completion through hidden debug code path.
  - Rejected because visible control is easier to verify and less brittle.

## Risks / Trade-offs

- [Keyboard events are not captured because element focus is missing] -> Mitigation: Use a focusable host/container with clear focus behavior, and include tests that simulate key events against the event target.
- [Temporary completion button remains in production longer than intended] -> Mitigation: Name and label it as temporary, track removal in follow-up tasks, and isolate in one template block.
- [State transitions regress over time] -> Mitigation: Add explicit transition tests for `opened -> running -> pending -> running -> completed`.
- [Ambiguity for primary button label in `completed`] -> Mitigation: Define `completed` as non-running and disable/hide primary toggle there in specs/tasks.
- [Last-key display may include non-character keys] -> Mitigation: Define a normalization rule (display `event.key` string as-is for now) and refine later if needed.
