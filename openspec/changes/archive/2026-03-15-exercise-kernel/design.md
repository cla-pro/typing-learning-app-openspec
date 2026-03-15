## Context

The exercise page already has a runtime state machine (`opened`, `running`, `pending`, `completed`) and keydown handling, but it does not implement expected-character progression during running state. Exercise configurations currently expose a `letters` field, which is too narrow for target values that may include non-letter characters.

This change introduces the kernel interaction loop: one active expected character at a time, progression only on correct key presses, and automatic completion when the sequence is fully typed. Scope is intentionally limited to behavior and active-character visibility while keeping existing exercise-page structure and labels.

## Goals / Non-Goals

**Goals:**
- Rename exercise configuration field from `letters` to `expectedChars` across model, service data, and consuming code.
- Implement sequential expected-character progression in `ExerciseComponent` during `running` state.
- Keep the active character visibly identifiable while still showing the full expected character sequence.
- Transition exercise runtime state to `completed` after the final expected character is typed correctly.
- Preserve existing runtime controls, labels, and page sections in this iteration.

**Non-Goals:**
- Full UI redesign for active-character rendering.
- Scoring, timing, accuracy metrics, or attempt counters.
- Advanced keyboard normalization beyond direct `KeyboardEvent.key` comparisons.
- Changing route structure, exercise loading flow, or not-found behavior introduced previously.

## Decisions

1. Rename `ExerciseConfig.letters` to `ExerciseConfig.expectedChars` as the canonical field.
- Decision: Update the model and all in-repo configuration data/consumers to use `expectedChars` only.
- Rationale: Makes the contract semantically accurate for symbols, spaces, numbers, and punctuation.
- Alternative considered: Keep `letters` while documenting broader usage. Rejected because it preserves misleading naming and future confusion.

2. Track active progression with an index-based cursor in exercise component state.
- Decision: Add state such as `activeExpectedCharIndex` initialized to `0` for valid exercises and reset on exercise load/state resets.
- Rationale: Minimal, deterministic representation for sequential progression and active-char display.
- Alternative considered: Mutating/shifting the expected character array. Rejected because it complicates rendering the full sequence and is less test-friendly.

3. Progression occurs only when runtime state is `running` and key matches active expected character.
- Decision: In keydown handler, compare `event.key` with the active expected character; on match advance index; on mismatch do nothing.
- Rationale: Matches requested "keep trying until right key" behavior while preserving current running-state guardrails.
- Alternative considered: Advancing on any key and flagging correctness separately. Rejected because it violates required behavior.

4. Completion transition after last expected character match.
- Decision: When a correct key is received for the final expected character, set runtime state to `completed` and keep cursor at terminal position.
- Rationale: Provides deterministic end-of-exercise condition tied to expected sequence completion.
- Alternative considered: Separate explicit completion action after sequence completion. Rejected because requirement says completion happens when last character is typed correctly.

5. Minimal active-character visibility without removing existing content.
- Decision: Keep current exercise-page sections and labels; add a focused visual/readable indicator for active character within expected sequence rendering.
- Rationale: Delivers behavior-first milestone while deferring UI polish.
- Alternative considered: Introduce a dedicated new panel and remove existing placeholders. Rejected for this phase due to scope constraints.

6. Requirements-test-first coverage for kernel behavior.
- Decision: Update service/component requirements tests for field rename and add component tests covering active-char progression, mismatch no-op, and completion transition.
- Rationale: Behavior is stateful and regression-prone; tests make progression contract explicit.
- Alternative considered: Rely primarily on manual verification in this phase. Rejected due to fragility.

7. Matching is explicitly case-sensitive.
- Decision: Expected-character matching uses exact `KeyboardEvent.key` equality, so `A` and `a` are treated as different values.
- Rationale: Aligns with product requirement and keeps kernel behavior deterministic.
- Alternative considered: Case-insensitive normalization. Rejected for this change.

8. `expectedChars` must be non-empty for valid exercise configs.
- Decision: Exercise configuration validation requires at least one expected character; empty arrays are invalid configuration.
- Rationale: An exercise with nothing to type has no meaningful runtime progression.
- Alternative considered: Immediate completion for empty arrays. Rejected by product requirement.

## Risks / Trade-offs

- [Risk] `KeyboardEvent.key` value mismatches expected data representation (case/special chars) may block progression unexpectedly.
  - Mitigation: Define expected character values to match browser key values used in current tests; add focused test cases for representative symbols/case.

- [Risk] Rename from `letters` to `expectedChars` may miss a consumer and cause runtime/test failures.
  - Mitigation: Update model, config source, component rendering, and tests in one change set; run full test and build verification.

- [Trade-off] Minimal active-character UI may be visually basic.
  - Mitigation: Accept temporary UX simplicity to deliver kernel behavior first; polish in follow-up change.

- [Trade-off] Index-based state adds additional component state management.
  - Mitigation: Centralize reset behavior and include progression-reset tests.

## Migration Plan

1. Rename exercise config contract from `letters` to `expectedChars` in model and service configuration payloads.
2. Update component data-binding to read/render `expectedChars` instead of `letters`.
3. Add active-character index state and initialization/reset logic.
4. Update keydown handling for match-gated progression and terminal completion transition.
5. Add minimal active-character visibility in the template while keeping existing labels/components.
6. Update/add requirements tests for field rename, progression behavior, mismatch no-op, and completion transition.
7. Run test suite and Angular build.

Rollback strategy:
- Revert component progression logic and template additions while restoring previous passive key-capture behavior.
- Revert `expectedChars` rename consistently across model/service/tests if compatibility issues arise.

## Open Questions

None.
