## 1. Testing Policy and Tooling Foundation

- [x] 1.1 Define and document a shared behavior-testing rule for requirements tests (behavior/public API assertions only)
- [x] 1.2 Implement a policy check script that fails when requirements tests use forbidden source-inspection patterns (including `fs.readFileSync` as source-text oracle)
- [x] 1.3 Wire the policy check into project verification workflow (npm script and CI-compatible command)
- [x] 1.4 Add clear violation output messaging to help developers migrate failing tests quickly

## 2. Routing Requirements Test Migration

- [x] 2.1 Refactor `tests/app/routing/app.routes.requirements.test.js` to validate route behavior through router outcomes instead of source text
- [x] 2.2 Add behavior assertions for expected navigation and fallback redirect outcomes under routed scenarios
- [x] 2.3 Ensure routing test setup uses TestBed only where DI-based router wiring is required

## 3. Service Requirements Test Migration

- [x] 3.1 Refactor `tests/app/services/exercise-config.service.requirements.test.js` to test `ExerciseConfigService` via public methods
- [x] 3.2 Add behavior assertions for list and get-by-id contracts, including not-found outcomes
- [x] 3.3 Ensure service tests avoid source-file reads and rely on runtime/public API results

## 4. Component Requirements Test Migration (App Scope)

- [x] 4.1 Refactor `tests/app/components/exercise/exercise.component.requirements.test.js` to interaction/output behavior assertions only
- [x] 4.2 Refactor `tests/app/components/welcome/welcome.component.requirements.test.js` to behavior/public API assertions only
- [x] 4.3 Refactor `tests/app/components/home-button/home-button.component.requirements.test.js` to behavior/public API assertions only
- [x] 4.4 Apply selective TestBed usage in component tests where DI behavior is part of the contract

## 5. Policy Compliance Sweep

- [x] 5.1 Sweep all in-scope requirements tests under `tests/app/**` for remaining source-inspection patterns
- [x] 5.2 Remove or rewrite any residual implementation-text assertions to behavior/public API assertions
- [x] 5.3 Confirm out-of-scope project script testing remains excluded from this change

## 6. Verification and Quality Gate

- [x] 6.1 Run the new policy check and confirm it passes for migrated tests
- [x] 6.2 Run full test suite and confirm no regressions after behavior-test migration
- [x] 6.3 Run Angular build and confirm no regressions in application build pipeline
