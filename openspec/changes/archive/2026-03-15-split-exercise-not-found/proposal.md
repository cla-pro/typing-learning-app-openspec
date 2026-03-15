## Why

The exercise component currently mixes two different concerns: exercise runtime behavior and invalid-exercise error rendering. Splitting these concerns now improves maintainability and ensures invalid exercise requests are handled through explicit page navigation instead of inline conditional rendering.

## What Changes

- Move the whole "exercise not found" UI out of the exercise component into a dedicated routed error page component.
- Update exercise-page behavior so it only handles valid exercise rendering and runtime interactions.
- When the requested exercise id is missing or unknown, redirect the user from the exercise page route to the dedicated not-found page route.
- Update existing tests that currently assert inline not-found state in the exercise component.
- Add a new exercise component test that verifies redirection is triggered when exercise lookup fails.

## Capabilities

### New Capabilities
- `exercise-not-found-page`: Dedicated routed page for invalid or missing exercise requests, including recovery navigation back to home.

### Modified Capabilities
- `exercise-page`: Change invalid/missing exercise handling from inline error rendering to router redirection.
- `page-navigation`: Add and validate navigation route behavior for dedicated exercise-not-found page.

## Impact

- Affected code: exercise component logic/template, routing configuration, new error page component files.
- Affected tests: exercise component requirements tests and navigation-related requirements tests.
- Dependencies/APIs: no expected external dependency changes; Angular Router usage is expanded for redirect flow.
