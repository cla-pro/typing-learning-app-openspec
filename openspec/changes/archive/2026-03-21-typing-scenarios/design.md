## Context

`ExerciseConfigService` currently embeds a large static list of exercise categories and exercises directly in service code. This mixes data and behavior, reducing readability and making targeted unit tests harder because data setup and filtering logic are tightly coupled in one class.

This change externalizes typing-scenario data into a dedicated module while preserving all existing behavior contracts:
- category ordering
- exercise ordering within categories
- layout-based category filtering
- `getExerciseById` lookup behavior
- invalid `expectedChars` filtering behavior

## Goals / Non-Goals

**Goals:**
- Move hardcoded category/exercise definitions out of `ExerciseConfigService` into an external config module.
- Keep `ExerciseConfigService` public behavior unchanged except for depending on imported config data.
- Improve testability by allowing tests to validate service behavior separately from data declaration concerns.
- Keep externalized config as the single source of truth for typing scenarios.

**Non-Goals:**
- Changing exercise content, ordering, ids, or labels.
- Introducing runtime persistence or remote loading for scenarios.
- Changing layout policy defaults or welcome-page behavior.
- Reworking model contracts beyond what extraction requires.

## Decisions

1. Introduce a dedicated typing-scenarios config module in app source.
- Decision: Create modules under `src/app/data/` that export exercise-category scenario data typed as `ExerciseCategory[]`.
- Rationale: Makes scenario data easy to locate, review, and evolve independently of service logic.
- Alternative considered: Keep data in service and split into private constants in same file.
- Why not: Improves readability less and still binds data to service implementation.

2. Keep `ExerciseConfigService` focused on behavior over data declaration.
- Decision: Service imports the externalized scenario list and applies existing filtering/lookup logic against it.
- Rationale: Clearer separation of concerns while preserving API behavior.
- Alternative considered: Introduce a new repository/provider abstraction first.
- Why not: Adds unnecessary indirection for current scope.

3. Preserve deterministic ordering by treating config order as canonical.
- Decision: The externalized config array order remains the exact source for category/exercise rendering order.
- Rationale: Prevents behavioral regressions in welcome-page ordering expectations.
- Alternative considered: Sort dynamically in service.
- Why not: Could change existing behavior and make authoring less explicit.

4. Keep configuration static and compile-time loaded.
- Decision: Export plain TypeScript constants; no async loading.
- Rationale: Maintains existing synchronous service API and avoids runtime complexity.
- Alternative considered: JSON file fetch at runtime.
- Why not: Requires async API changes and hosting concerns not required for this change.

5. Expand behavior tests around extraction-sensitive paths.
- Decision: Ensure requirements tests cover ordering, layout filtering, and lookup after extraction.
- Rationale: Extraction refactors are regression-prone despite unchanged intent.
- Alternative considered: Snapshot/source-inspection tests.
- Why not: Violates behavior-first testing policy and is brittle.

6. Split scenario/category data per keyboard layout.
- Decision: Organize typing scenarios into per-layout data modules and compose category availability from layout-specific sources.
- Rationale: Keeps data ownership explicit by layout and simplifies future layout expansion without overloading one monolithic dataset.
- Alternative considered: Keep one combined list with `keyboardLayouts` metadata only.
- Why not: Becomes harder to maintain as layout-specific scenario differences grow.

## Risks / Trade-offs

- [Risk] Data extraction may accidentally alter category or exercise order.
  -> Mitigation: Keep config order unchanged and verify with existing ordering tests.

- [Risk] Typing mistakes in external module may weaken model guarantees.
  -> Mitigation: Type exported data as `ExerciseCategory[]` and run TypeScript/tests.

- [Risk] Service behavior might change subtly if references/copies are handled differently.
  -> Mitigation: Keep existing map/filter behavior and avoid introducing mutations.

- [Trade-off] New file adds one more module to maintain.
  -> Mitigation: Gains in readability and focused ownership outweigh minimal file-count increase.

## Migration Plan

1. Create `src/app/data/` typing-scenarios modules and split scenario/category data by keyboard layout.
2. Update `ExerciseConfigService` to import and use externalized data.
3. Run and adjust requirements tests for service and welcome-page behavior if needed.
4. Verify no change to observable ordering/filtering/lookup outputs.
5. Merge as an internal refactor with no consumer API changes.

## Open Questions

- None currently.
