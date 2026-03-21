## Context

The current exercise category loading flow assumes one implicit keyboard layout, so users with other layouts can see categories that do not match their keyboard. The change introduces layout-aware category filtering and a dedicated service for supported and selected layout retrieval.

Constraints and existing behavior:
- The app is Angular/TypeScript and already loads welcome-page category navigation from ExerciseConfigService.
- Category order and exercise order must remain stable relative to the service result.
- Initial layout support is fixed to `fr-ch` and `de-ch`, with `fr-ch` as the default selected layout.

## Goals / Non-Goals

**Goals:**
- Add `keyboardLayouts: string[]` metadata to exercise categories so compatibility is explicit.
- Make ExerciseConfigService category retrieval require a keyboard layout input and return only matching categories.
- Add KeyboardLayoutService exposing two methods: supported layouts and chosen layout.
- Update welcome-page integration to read chosen layout from KeyboardLayoutService and pass it to ExerciseConfigService.
- Preserve existing grouping and ordering behavior for returned categories and exercises.

**Non-Goals:**
- Adding a UI selector to change layout at runtime.
- Persisting chosen layout to storage or user profile.
- Reworking exercise-content internals beyond category filtering.
- Introducing locale management or i18n behavior.

## Decisions

1. Introduce a dedicated KeyboardLayoutService with in-memory defaults.
- Decision: Create a service that returns supported layouts `['fr-ch', 'de-ch']` and chosen layout `fr-ch` initially.
- Rationale: Centralizes layout policy and avoids duplicating constants across components/services.
- Alternative considered: Hard-code layout directly in welcome component.
- Why not: Couples page logic to policy and makes future extension harder.

2. Extend category model with required `keyboardLayouts`.
- Decision: Add `keyboardLayouts: string[]` to category definitions used by ExerciseConfigService.
- Rationale: Makes compatibility explicit at the data-model level and testable through public behavior.
- Alternative considered: Infer compatibility from exercise IDs/names.
- Why not: Brittle convention-based logic with poor discoverability.

3. Change ExerciseConfigService contract to require layout parameter.
- Decision: Update category retrieval method signature to require a layout argument and filter categories by membership in `keyboardLayouts`.
- Rationale: Forces callers to provide layout context and prevents accidental unfiltered usage.
- Alternative considered: Keep optional parameter with fallback.
- Why not: Silent fallback can mask integration gaps and preserve incorrect behavior.

4. Keep welcome-page as the orchestrator for layout-aware loading.
- Decision: Welcome page obtains chosen layout from KeyboardLayoutService and passes it to ExerciseConfigService when loading category navigation.
- Rationale: Matches existing responsibility where welcome page coordinates category display data.
- Alternative considered: Make ExerciseConfigService query KeyboardLayoutService internally.
- Why not: Introduces hidden dependency and makes service behavior less explicit to consumers/tests.

5. Validate with behavior-oriented tests at service and integration boundaries.
- Decision: Add/update tests to verify filtering outcomes and that welcome-page requests categories using chosen layout.
- Rationale: Protects user-visible behavior and aligns with behavior-testing policy.
- Alternative considered: Source-inspection assertions for method internals.
- Why not: Violates project testing policy and is less resilient.

## Risks / Trade-offs

- [Risk] Existing callers of ExerciseConfigService may break due to required layout parameter.
  -> Mitigation: Update all call sites in the same change and add compiler/test checks.

- [Risk] Category configuration omissions (missing `keyboardLayouts`) may cause runtime or compile issues.
  -> Mitigation: Make field required in type definitions and update seed/mock category data.

- [Risk] Default layout `fr-ch` may not match future user preference expectations.
  -> Mitigation: Keep default centralized in KeyboardLayoutService so a later preference feature can replace it.

- [Trade-off] Initial implementation supports only two layouts (`fr-ch`, `de-ch`).
  -> Mitigation: Design service and data model to allow adding layouts without contract redesign.
