## Why

The welcome page currently treats exercises as a flat list, which makes navigation harder as the exercise library grows. Grouping exercises into ordered categories keeps the catalog readable while preserving direct exercise lookup by id for the exercise page.

## What Changes

- Add category-aware exercise data in `ExerciseConfigService`, where each category has a name and an ordered list of exercises.
- Update welcome-page data loading so it receives categories with their exercises instead of a flat exercise list.
- Render the welcome page with exercises grouped by category, preserving category order and exercise order as defined in `ExerciseConfigService`.
- Keep exercise-page lookup by exercise id unchanged so existing exercise routes continue to resolve individual configs directly.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `welcome-page`: change welcome-page navigation from a flat exercise list to an ordered category/group presentation sourced from `ExerciseConfigService`.

## Impact

- `src/app/services/exercise-config.service.ts` and related models may need category-aware data structures and a grouped listing API.
- `src/app/components/welcome/` will need to render grouped exercise navigation.
- Welcome-page and service requirements tests will need updates for grouped data behavior and ordering guarantees.
