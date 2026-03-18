## Context

`ExerciseConfigService` currently stores exercises as a single ordered array and exposes two public methods:
- `listExercises()` for the welcome page
- `getExerciseById()` for the exercise page

`WelcomeComponent` renders a flat list of links from `listExercises()`, while `ExerciseComponent` resolves a single exercise config by id. The requested change introduces a one-to-many category-to-exercise relationship for welcome-page presentation, with two important constraints:
- every category has a name and an ordered list of exercises
- every exercise belongs to exactly one category

The order of categories and the order of exercises within each category must be preserved exactly as defined in `ExerciseConfigService`.

## Goals / Non-Goals

**Goals:**
- Add category-aware exercise data for welcome-page navigation.
- Preserve direct config lookup by exercise id for the exercise page.
- Guarantee stable ordering for categories and exercises from the service through rendering.
- Keep the public API behavior testable through service and component tests.

**Non-Goals:**
- Changing exercise runtime behavior or exercise-page routing.
- Supporting exercises in multiple categories.
- Adding category filtering, collapsing, or other advanced browsing behavior.

## Decisions

### Decision: Introduce an explicit grouped-list API alongside `getExerciseById()`

The service should expose a new public API for the welcome page that returns ordered categories, each with its exercises. `getExerciseById()` remains unchanged and continues to resolve individual exercise configs for the exercise page.

This keeps responsibilities separate:
- grouped retrieval for navigation/presentation
- direct retrieval for runtime loading

**Alternative considered — derive categories inside `WelcomeComponent` from a flat list:** rejected because it would move source-of-truth grouping logic out of the service, duplicate ordering rules in the UI, and make it easier for the flat list and grouped presentation to drift apart.

### Decision: Model categories explicitly in service data

Instead of storing only a flat `ExerciseConfig[]`, the service should own a category structure such as `ExerciseCategory[]`, where each category contains its ordered exercises. This makes the requested ordering explicit and ensures the service is the single source of truth for category membership.

A small model type for category data should be introduced so both the service and welcome component use a stable contract.

**Alternative considered — keep only a flat array and add a `categoryName` property on each exercise:** rejected because category ordering would then need a second source of truth or additional grouping logic at read time.

### Decision: Preserve exercise-page lookup through a flattened lookup path

`getExerciseById()` should continue to work by searching across the category-owned exercise collections and returning the matching valid config. This preserves all existing exercise-page call sites and behavior contracts.

The grouping change should not require route or exercise-page changes.

**Alternative considered — maintain two separate duplicated collections (grouped and flat):** rejected because duplication raises the risk of inconsistencies between grouped navigation and id-based lookup.

### Decision: WelcomeComponent should render grouped sections directly from service output

`WelcomeComponent` should consume the grouped service API and render categories in outer order with exercises in inner order. The template should express the grouping directly rather than flattening and regrouping in component code.

This keeps visual output aligned with the service-defined order and keeps the component simple.

## Risks / Trade-offs

- [Public API churn] Changing the welcome-page-facing service method may require coordinated test and component updates. → Mitigation: keep `getExerciseById()` stable and limit the API change to the grouped listing path.
- [Ordering regressions] Refactors could accidentally reorder categories or exercises. → Mitigation: add requirements tests that assert both category order and within-category exercise order.
- [Data duplication pressure] Future contributors may be tempted to reintroduce a flat list for convenience. → Mitigation: keep the grouped structure as the service source of truth and derive id lookup from it.

## Migration Plan

1. Introduce a category model and update `ExerciseConfigService` to store exercises under ordered categories.
2. Replace the welcome-page flat listing call with the grouped listing API.
3. Update welcome-page rendering and requirements tests to validate grouped output and order preservation.
4. Keep `getExerciseById()` behavior intact and verify it still resolves existing exercise ids.

## Open Questions

None.
