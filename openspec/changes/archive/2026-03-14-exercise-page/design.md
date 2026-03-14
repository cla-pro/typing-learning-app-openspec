## Context

The change introduces a generic exercise page behavior driven by exercise id and shared configuration data.
Today, exercise navigation and exercise page data contracts are not consistently sourced from a single service.
This design aligns routing, the exercise page, and welcome-page navigation around `ExerciseConfigService` as the source of truth.

Constraints:
- Keep implementation within the current Angular app structure and existing route pattern for exercise pages.
- Support an initial static/hard-coded data source in the service for bootstrap and testing.
- Ensure requirements remain compatible with `page-navigation` and `welcome-page` capabilities.

## Goals / Non-Goals

**Goals:**
- Define a single configuration contract for exercise metadata (`id`, `name`, `letters`, `impactedKeys`).
- Ensure the exercise page reads route exercise id and resolves configuration via `ExerciseConfigService`.
- Ensure missing/invalid exercise ids render a dedicated error page explaining no exercise was found for the requested id.
- Ensure the error page includes a home button that routes back to the welcome page.
- Ensure welcome-page navigation links are generated from the same service data used by exercise pages.
- Keep behavior deterministic and test-friendly with a static in-memory initial data source.
- Ensure all introduced changes are covered by automated tests (`ExerciseConfigService`, error page behavior, and service integration in existing pages).

**Non-Goals:**
- Introducing server-backed persistence or remote API calls for exercise configuration.
- Defining advanced exercise runtime mechanics (timing/scoring/typing engine behavior).
- Redesigning overall routing structure beyond exercise-id-driven initialization.

## Decisions

1. Use `ExerciseConfigService` as the single source of truth for exercise definitions.
- Why: Avoids duplicated hard-coded data in components and keeps navigation + page rendering consistent.
- Alternative considered: Keep separate local lists in components.
  - Rejected due to drift risk and duplicated maintenance.

2. Define a minimal shared exercise configuration model.
- Model fields: `id`, `name`, `letters` (array or string representation), `impactedKeys` (list).
- Why: Matches immediate requirements while leaving room to extend later.
- Alternative considered: A broader schema with scoring/level metadata now.
  - Rejected to keep MVP scope tight and reduce premature complexity.

3. Resolve exercise data on page initialization using route param.
- Behavior: Exercise page reads route `id`, calls service lookup, and renders exercise name at top with letters/impacted keys details.
- Why: Ensures URL-driven state and reusable page behavior for any configured exercise.
- Alternative considered: Preloading all data in route resolver.
  - Deferred to keep implementation simple; can be added if async data source is introduced.

4. Build welcome-page links from service list rather than local constants.
- Why: Guarantees link set reflects available exercises and prevents mismatch with exercise page config.
- Alternative considered: Maintain local navigation constants.
  - Rejected due to duplicate source-of-truth problem.

5. Render a dedicated invalid-exercise error page when lookup fails.
- Behavior: If route id is missing or service lookup returns no exercise, render an error page with a message that no exercise is found for that id and include a home button to navigate to the welcome page.
- Why: Provides explicit user feedback and a clear recovery action instead of a silent empty state.
- Alternative considered: Inline warning in the exercise component only.
  - Rejected because a dedicated error state is clearer and easier to test as a stable UX contract.

6. Require automated tests for service + integration + error-state flow.
- Scope: Add/extend tests for `ExerciseConfigService` contract, welcome-page link generation from service data, exercise-page data loading via route id, and invalid-id error-page rendering/home-button navigation.
- Why: Protects the new shared data flow and error handling from regressions as routes/components evolve.
- Alternative considered: Rely on manual verification.
  - Rejected due to high regression risk across multiple integrated components.

## Risks / Trade-offs

- [Missing exercise id or invalid route id] → Mitigation: Render a dedicated error page with explicit message and a home-button recovery path; cover with route-level tests.
- [Data shape drift between service and components] → Mitigation: Centralize TypeScript interface/type in shared location and consume it from both components.
- [Static data source delays async readiness] → Mitigation: Keep service contract abstraction so backing store can switch to API later without component contract changes.
- [letters as array or string creates rendering ambiguity] → Mitigation: Normalize representation in service or component adapter before template rendering.
- [Cross-component integration regressions] → Mitigation: Add/maintain automated tests for service unit behavior and page integration scenarios.
