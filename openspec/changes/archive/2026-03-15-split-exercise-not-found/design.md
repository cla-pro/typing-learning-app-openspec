## Context

The current exercise page combines two responsibilities in a single component: rendering the interactive exercise runtime for valid exercise ids and rendering an inline error experience when an exercise id is missing or unknown. This coupling increases template branching, makes runtime logic harder to reason about, and ties invalid-route handling to a component that should only represent a valid exercise session.

The proposal introduces a dedicated not-found page for invalid exercise requests and requires a redirect from the exercise page when lookup fails. Existing requirements tests currently validate inline not-found behavior and must be updated to reflect route-based recovery.

## Goals / Non-Goals

**Goals:**
- Separate valid exercise runtime behavior from invalid-exercise presentation by introducing a dedicated page component.
- Redirect users to a dedicated invalid-exercise route when `ExerciseConfigService` cannot resolve the requested id.
- Keep existing valid exercise runtime behavior unchanged (state machine, key capture, labels).
- Update tests to verify redirect behavior and preserve coverage for valid exercise lifecycle behavior.

**Non-Goals:**
- Redesigning runtime interactions or exercise completion semantics.
- Changing exercise configuration contracts or service APIs.
- Introducing server-side routing changes or backend error handling.
- Implementing analytics/telemetry for not-found navigation.

## Decisions

1. Add a dedicated routed page component for invalid exercise requests.
- Decision: Create a new component (for example `ExerciseNotFoundComponent`) with focused template content and home recovery action.
- Rationale: Keeps error-page responsibility self-contained and reusable while removing conditional error markup from exercise runtime component.
- Alternative considered: Keep inline conditional rendering in exercise component. Rejected because it preserves mixed concerns and makes runtime template harder to maintain.

2. Introduce an explicit route for the invalid exercise page.
- Decision: Add a named route (for example `/exercices/not-found`) in the router configuration and map it to the dedicated component.
- Rationale: Makes navigation intent explicit, enables route-level testing, and supports direct navigation to the error page when needed.
- Alternative considered: Reuse wildcard redirect to root for invalid exercise ids. Rejected because it hides the error reason and bypasses required dedicated page behavior.

3. Redirect from exercise component when lookup fails.
- Decision: In exercise page initialization, if route id is missing/blank or `getExerciseById` returns undefined, navigate with Angular Router to the dedicated not-found route instead of setting local `isExerciseFound` false state.
- Rationale: Aligns behavior with requirement that invalid requests trigger page redirection and removes invalid-state branching from the component template.
- Alternative considered: Route guard for pre-validation. Deferred to keep scope small and avoid introducing additional guard lifecycle complexity for this change.

4. Keep exercise component focused on valid runtime state.
- Decision: Remove inline not-found branch and related state flags that only support inline error rendering; preserve runtime state machine and key capture behavior for valid configs.
- Rationale: Component becomes easier to understand and test because it only represents a valid exercise session.
- Alternative considered: Keep `isExerciseFound` and never render false branch. Rejected as dead-state retention with no user-facing value.

5. Update and add requirements tests around redirect behavior.
- Decision: Update existing exercise requirements tests to stop asserting inline error rendering/reset paths and add a dedicated test that verifies router navigation is invoked on invalid/missing id.
- Rationale: Ensures behavior is validated through observable navigation effects rather than removed template branches.
- Alternative considered: Assert redirect indirectly via template output. Rejected because redirect behavior is best validated through router interaction in component tests.

6. Keep not-found messaging generic and shared.
- Decision: The dedicated not-found page must not display the unresolved exercise id and must use the same message for both missing-id and invalid-id cases.
- Rationale: Provides a simple and consistent user-facing error experience without exposing route parameter details.
- Alternative considered: Show route id or differentiate messages by failure mode. Rejected by product requirement.

7. Keep validation in exercise component initialization.
- Decision: Exercise existence validation remains in `ExerciseComponent` initialization flow; no route guard is introduced in this change.
- Rationale: Preserves existing lifecycle model and keeps scope focused on concern-splitting plus redirect behavior.
- Alternative considered: Add a route guard to pre-validate ids. Rejected by product requirement for this change.

## Risks / Trade-offs

- [Risk] Redirect target route name/path mismatch between component and router config could create navigation loops or failed navigation.
  - Mitigation: Centralize route path constants or assert route path in navigation tests.

- [Risk] Component tests may become brittle if they depend on concrete Router implementation details.
  - Mitigation: Use Angular testing doubles/spies on `Router.navigate` and assert only expected arguments.

- [Risk] Removing inline not-found branch could accidentally remove recovery affordance.
  - Mitigation: Ensure dedicated not-found component includes home navigation and add/update navigation requirement tests.

- [Trade-off] Route-based error page adds one additional route/component file.
  - Mitigation: Accept small structure growth for clearer separation of concerns and simpler exercise component.

## Migration Plan

1. Add dedicated exercise-not-found component and template with home-button integration.
2. Extend router configuration with explicit invalid-exercise route.
3. Refactor exercise component init flow to redirect on missing/invalid ids and remove inline not-found rendering path.
4. Update exercise component requirements tests to align with redirect behavior.
5. Add new exercise component test that verifies redirect invocation on lookup failure.
6. Update routing requirements tests for new route and recovery behavior if needed.
7. Run test suite and angular build to verify no regressions.

Rollback strategy:
- Revert component and route changes to restore inline not-found branch in exercise component if redirect flow causes production regression.
- Keep test updates in the same change set so rollback remains coherent.

## Open Questions

None.
