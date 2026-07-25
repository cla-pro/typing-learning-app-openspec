## 1. Reward-games locked-progress view model

- [x] 1.1 Extend reward-games card view model to include locked progress text derived from current total stars and each setup's `TotalNbStarsRequired`
- [x] 1.2 Ensure derivation reuses existing progress/unlock data sources without changing unlock-evaluation behavior

## 2. Reward-games locked card rendering

- [x] 2.1 Replace generic locked status text on locked cards with `<current won stars>/<required stars>`
- [x] 2.2 Keep lock icon, non-interactive behavior, and launchable/unlocked rendering unchanged

## 3. Automated tests

- [x] 3.1 Update reward-games requirements tests to assert locked-card progress text formatting and value sourcing
- [x] 3.2 Keep or update tests that verify locked cards remain non-interactive and unlocked cards remain launchable

## 4. Verification

- [x] 4.1 Run reward-games related unit/requirements tests and ensure they pass
- [x] 4.2 Run Angular build validation and resolve regressions if any
