## 1. Dependency Baseline and Compatibility Mapping

- [x] 1.1 Inventory all direct `dependencies` and `devDependencies` from `package.json`
- [x] 1.2 Identify the current Angular baseline version and define compatibility boundaries for upgrades
- [x] 1.3 Create a dependency upgrade plan grouped by Angular-adjacent packages, tooling/test packages, and general utilities

## 2. Execute Version Upgrades

- [x] 2.1 Upgrade Angular framework packages (`@angular/*`) and Angular CLI/tooling to the latest stable version using the Angular CLI (`ng update`)
- [x] 2.2 Upgrade Angular-adjacent libraries to the latest versions compatible with the upgraded Angular baseline
- [x] 2.3 Upgrade remaining direct dependencies/devDependencies to their latest Angular-compatible releases
- [x] 2.4 Record temporary exceptions where absolute latest versions are incompatible, including reason and Angular-upgrade review trigger

## 3. Validate and Stabilize

- [x] 3.1 Run install and lockfile update to ensure dependency graph resolves cleanly
- [x] 3.2 Run build and test workflows to verify compatibility after upgrades
- [x] 3.3 Resolve upgrade regressions by adjusting to the highest Angular-compatible versions where needed

## 4. Enforce Ongoing Version Governance

- [x] 4.1 Add/update project documentation to state the global rule: direct libraries must remain at latest Angular-compatible versions
- [x] 4.2 Add/update contributor workflow guidance for dependency updates and exception recording
- [x] 4.3 Add/update CI or review checks to flag direct dependencies that are not on the latest Angular-compatible release
