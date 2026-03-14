## Why

The current exercise route provides navigation by exercise id, but it does not define a reusable exercise page behavior driven by configuration data. We need a generic exercise page contract that loads exercise-specific configuration from a service and renders core exercise metadata consistently.

## What Changes

- Introduce a generic exercise page behavior that receives an exercise id as route argument.
- Define that, on page load, the exercise page retrieves exercise configuration from `ExerciseConfigService` using the exercise id.
- Define an initial implementation where `ExerciseConfigService` provides a static hard-coded exercise list for testing/bootstrap purposes.
- Define required configuration fields: exercise name, letters to display (array or string), and impacted keyboard keys list.
- Require the exercise name to be displayed at the top of the exercise page.
- Require that when an exercise id is missing or invalid, the exercise route shows an error page stating no exercise was found for that id.
- Require the error page to include a home button that navigates back to the welcome page.
- Require the welcome page to build and display exercise navigation links from the `ExerciseConfigService` exercise list.
- Require automated tests for all introduced changes: `ExerciseConfigService`, invalid-id error page behavior, and service integration into welcome/exercise pages.

## Capabilities

### New Capabilities
- `exercise-page`: Defines the generic exercise page contract, including route id input, configuration retrieval from `ExerciseConfigService`, required display behavior for name/letters/impacted keys, invalid-id error-page behavior with home navigation, and initial static test data source in the service.

### Modified Capabilities
- `welcome-page`: Update welcome page behavior so exercise navigation entries are sourced from `ExerciseConfigService` data instead of local hard-coded component data.
- `page-navigation`: Update navigation-link requirements so the exercise link list is generated from the shared exercise configuration source.

## Impact

- Affected code: Angular exercise page component logic/template and configuration service contract.
- Affected APIs: `ExerciseConfigService` interface/behavior for listing exercises and fetching configuration by exercise id.
- Affected systems: Client-side routing integration for exercise id-driven page initialization.
