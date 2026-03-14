## 1. Exercise Configuration Service

- [x] 1.1 Define shared exercise configuration model (`id`, `name`, `letters`, `impactedKeys`) in a reusable Angular location
- [x] 1.2 Implement `ExerciseConfigService` static in-memory exercise list for bootstrap/testing
- [x] 1.3 Implement service methods for listing available exercises and fetching exercise config by id with not-found outcome

## 2. Exercise Page Integration

- [x] 2.1 Update exercise-page initialization to read exercise id from route params and resolve data via `ExerciseConfigService`
- [x] 2.2 Render exercise name at top and display configured letters/impacted keys for valid ids
- [x] 2.3 Add invalid/missing-id handling path that renders dedicated error page state

## 3. Invalid-ID Error Page and Recovery Navigation

- [x] 3.1 Implement error-page content stating no exercise is found with the requested id
- [x] 3.2 Integrate reusable home button on the invalid-id error page
- [x] 3.3 Ensure home button navigates back to the welcome page via Angular routing

## 4. Welcome Page and Navigation Integration

- [x] 4.1 Replace local hard-coded welcome-page exercise links with links generated from `ExerciseConfigService`
- [x] 4.2 Ensure navigation links route to exercise pages using configured exercise ids
- [x] 4.3 Align page-navigation behavior documentation/tests with service-driven links and error-state home recovery

## 5. Automated Test Coverage

- [x] 5.1 Add unit tests for `ExerciseConfigService` list/get behavior, including invalid id outcomes
- [x] 5.2 Add/extend exercise-page tests for valid-id rendering and invalid/missing-id error-page rendering
- [x] 5.3 Add/extend tests for home-button navigation from invalid-id error page to welcome page
- [x] 5.4 Add/extend welcome-page/page-navigation integration tests to verify links are sourced from `ExerciseConfigService`

## 6. Verification and Cleanup

- [x] 6.1 Run test suite and confirm all new/updated tests pass
- [x] 6.2 Run Angular build and confirm no regressions
- [x] 6.3 Update related docs/spec references if implementation details changed during coding
