## Context

The current requirements tests rely heavily on source-file text inspection (`fs.readFileSync` plus string matching) instead of verifying runtime behavior through public APIs. This pattern appears across multiple test areas (`tests/app/components/**`, `tests/app/routing/**`, `tests/app/services/**`, and `tests/project/**`) and creates brittle coupling to implementation details.

This change introduces a testing-policy capability and migration plan to behavior-driven requirements tests. It must explicitly include app-routes tests, exercise-config-service tests, and all requirement tests in scope.

Constraints:
- Keep existing feature behavior unchanged; this is primarily a test-strategy/spec-policy change.
- Use Angular/Jest-compatible behavior tests that exercise observable outcomes.
- Avoid direct source-file loading in requirement tests.

## Goals / Non-Goals

**Goals:**
- Replace source-text assertions with behavior/public-API assertions across all requirement tests.
- Cover `app.routes` via routing behavior checks instead of route-file string inspection.
- Cover `ExerciseConfigService` via service API behavior checks (`listExercises`, `getExerciseById`) rather than source inspection.
- Add a normative spec constraint that requirement tests MUST NOT read source files directly and MUST test behavior/public APIs.
- Establish repeatable testing patterns for components, routing, services, and project-level checks.

**Non-Goals:**
- Refactoring application runtime architecture beyond what is needed for testability.
- Introducing a new test framework (Jest remains in use).
- Replacing all unit/integration tests outside the requirements-test scope.

## Decisions

1. Introduce a dedicated spec capability for testing policy.
- Decision: Add new `behavior-testing` capability to define global test constraints.
- Why: Cross-cutting policy should not be embedded in a single feature spec.
- Alternative considered: Add policy text only to `webapp-core`.
  - Rejected because policy spans multiple capabilities and needs explicit discoverability.

2. Apply policy deltas to feature specs with test requirements.
- Decision: Modify `exercise-page` and `webapp-core` specs to align requirement-level test scenarios with behavior/public API checks.
- Why: Keeps capability-local expectations aligned with global policy.
- Alternative considered: Only add global policy and leave feature specs unchanged.
  - Rejected because mismatch can reintroduce implementation-detail assertions.

3. Migrate tests by category with behavior-first strategy.
- Decision: Implement migration in groups:
  - Routing tests (`app.routes.requirements.test.js`) -> assert navigation outcomes through router behavior.
  - Service tests (`exercise-config.service.requirements.test.js`) -> instantiate/invoke service API and assert returned values.
  - Component tests (`exercise`, `welcome`, `home-button`) -> assert rendered output and interaction effects.
  - Project tests -> assert script-level behavior via package metadata contracts without source scanning.
- Why: Structured migration reduces risk and allows incremental validation.
- Alternative considered: Full rewrite in one pass.
  - Rejected due to higher regression/debugging cost.

4. Enforce source-inspection ban in requirements tests.
- Decision: Add explicit requirement language: tests MUST NOT use direct source-file reads as primary verification.
- Why: Prevents regression to brittle testing style.
- Alternative considered: Team convention without spec language.
  - Rejected because conventions are harder to audit and enforce.

5. Prefer public API and user-observable outcomes.
- Decision: Define standard acceptance basis:
  - Public class/service methods
  - Router navigation effects
  - Component UI state changes on interactions
- Why: Aligns tests with system contracts rather than implementation internals.
- Alternative considered: Allow mixed behavior + source checks.
  - Rejected to avoid policy ambiguity.

6. Use Angular TestBed selectively for DI-heavy tests.
- Decision: Introduce TestBed in tests where dependency injection is part of the behavior under test (for example routed components/services with injected collaborators), and avoid TestBed where lightweight harnesses are sufficient.
- Why: Balances confidence and speed by using framework tooling only where it provides clear value.
- Alternative considered: Use TestBed for all requirements tests.
  - Rejected due to unnecessary complexity and slower test execution for simple behavior checks.

7. Add an enforceable lint/check for forbidden source-file inspection.
- Decision: Add a lint/check step that fails if requirements tests use `fs.readFileSync` to inspect source files directly.
- Why: Makes the policy objective and CI-enforceable instead of convention-only.
- Alternative considered: Manual review only.
  - Rejected because violations are easy to miss over time.

8. Exclude npm script behavior validation from this change scope.
- Decision: Treat npm script behavior checks as out of scope for this behavior-testing migration.
- Why: Keeps migration focused on application behavior/public API tests where source-inspection anti-pattern is most harmful.
- Alternative considered: Include project script tests in migration.
  - Rejected to limit scope and avoid unrelated policy expansion.

## Risks / Trade-offs

- [Behavior tests are harder to bootstrap than string checks] -> Mitigation: Provide shared test setup utilities and migration examples for routes/services/components.
- [Some current tests may lack direct behavioral hooks] -> Mitigation: Add minimal testability seams via public APIs instead of exposing internals.
- [Migration breadth across all requirement tests may cause temporary churn] -> Mitigation: Execute in categorized batches with green CI after each batch.
- [Policy could be interpreted inconsistently] -> Mitigation: Add explicit MUST/MUST NOT language in new and modified specs with concrete scenarios.

## Migration Plan

1. Add `behavior-testing` spec defining policy constraints and acceptance scenarios.
2. Sync/extend `exercise-page` and `webapp-core` test-related requirements to reference behavior/public API validation.
3. Migrate routing requirements tests first (`tests/app/routing/app.routes.requirements.test.js`).
4. Migrate service requirements tests next (`tests/app/services/exercise-config.service.requirements.test.js`).
5. Migrate all remaining in-scope requirements tests under `tests/app/**` to remove direct source-file reads.
6. Add and wire lint/check enforcement for forbidden `fs.readFileSync` source inspection patterns in requirements tests.
7. Run full test suite and Angular build after migration; fix regressions.
8. Review for remaining direct source inspection patterns and remove any residual violations.

## Open Questions

- None at this stage.
