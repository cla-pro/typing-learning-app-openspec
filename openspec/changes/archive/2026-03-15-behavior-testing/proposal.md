## Why

Current requirement tests validate implementation details by reading source files and asserting specific code fragments, which makes tests brittle and weakly aligned with user-visible behavior. We need behavior-focused tests and a spec-level constraint that enforces public-API/behavior validation instead of source inspection.

## What Changes

- Replace implementation-detail assertions in requirements tests with behavior-oriented tests that execute components/services and validate observable outcomes.
- Add exercise-page behavior tests for runtime flow, including state transitions and start/pause label changes after user actions.
- Add behavior tests for keyboard interaction by validating captured key output during `running` state.
- Define a normative testing constraint that tests MUST NOT load source files directly to assert code text.
- Define a normative testing constraint that tests MUST target behavior and public API contracts of classes/components.
- Align existing test suites and documentation to the new behavior-testing policy.

## Capabilities

### New Capabilities
- `behavior-testing`: Defines project-level behavior-testing policy and constraints for requirement tests, including prohibition of direct source-file inspection and requirement to test behavior/public APIs.

### Modified Capabilities
- `exercise-page`: Update test-coverage requirements to explicitly validate runtime transitions, button-label toggling, and key-capture behavior through observable interactions rather than source scanning.
- `webapp-core`: Add/adjust project tooling/testing requirements to enforce behavior-based test strategy and ban source-text assertions in requirement tests.

## Impact

- Affected code: test suites under `tests/**`, especially requirement tests that currently use `fs.readFileSync(...)` to inspect source text.
- Affected specs: new `behavior-testing` capability and delta updates for `exercise-page` and `webapp-core`.
- Affected CI quality: tests become less coupled to refactoring and more representative of expected runtime behavior/public contracts.
