## Why

The project depends on multiple libraries that can drift behind current releases, increasing security risk, maintenance cost, and integration friction. We need a clear, repeatable policy to keep dependencies current while using Angular compatibility as the controlling constraint.

## What Changes

- Upgrade Angular framework packages and Angular CLI/tooling to the latest stable version using Angular CLI (`ng update`) before other dependency upgrades.
- Upgrade all direct runtime and development dependencies to their most recent available versions that are compatible with the current Angular baseline.
- Define Angular as the pace-maker for compatibility decisions when a library's latest version is not compatible with the current Angular version.
- Add a general design constraint requiring dependency versions to remain at the most recent compatible release in normal development flow.
- Establish validation and update workflow expectations so future dependency additions and updates follow the same latest-compatible policy.

## Capabilities

### New Capabilities
- `dependency-version-governance`: Defines and enforces a project-wide policy that all used libraries stay on the most recent Angular-compatible versions.

### Modified Capabilities
- `webapp-core`: Extend project tooling and dependency management requirements to include Angular-led compatibility checks and latest-compatible version constraints.

## Impact

- Affected code: dependency manifests and related build/test tooling configuration.
- Affected dependencies: all direct `dependencies` and `devDependencies` in package management.
- Affected systems: CI/developer workflows for install, build, and test validation after upgrades.
- Risk/compatibility: potential breaking changes from major upgrades, mitigated by Angular compatibility gating.
