# Dependency Version Governance

## Policy

- Angular is the compatibility pace-maker for dependency upgrades.
- Angular framework and CLI upgrades MUST be executed with Angular CLI (`ng update`).
- Direct dependencies and direct devDependencies MUST stay on the most recent version compatible with the current Angular baseline.

## Current Baseline

- Angular baseline: `@angular/core@21.2.0`
- Angular CLI baseline: `@angular/cli@21.2.0`

## Direct Dependency Inventory

### Angular framework/runtime

- `@angular/animations`
- `@angular/common`
- `@angular/compiler`
- `@angular/core`
- `@angular/platform-browser`
- `@angular/platform-browser-dynamic`
- `@angular/router`
- `rxjs`
- `zone.js`
- `tslib`

### Tooling and test stack

- `@angular/build`
- `@angular/cli`
- `@angular/compiler-cli`
- `typescript`
- `jest`
- `eslint`
- `@eslint/js`
- `typescript-eslint`
- `globals`
- `@types/node`

## Upgrade Workflow

1. Upgrade Angular framework + CLI/tooling first using Angular CLI:
   - `npx ng update @angular/core@<major> @angular/cli@<major> --allow-dirty`
   - Perform major-by-major updates when required.
2. Upgrade Angular-adjacent libraries and verify compatibility with the upgraded Angular baseline.
3. Upgrade remaining direct dependencies/devDependencies to latest compatible versions.
4. Run validation gates:
   - `npm run lint`
   - `npm test`
   - `npm run build:angular`
5. Run policy check:
   - `npm run check:deps`

## Temporary Exceptions

- Current temporary exceptions: none.
- If a direct dependency cannot be upgraded to its latest version, add it to `docs/dependency-version-exceptions.json` with:
  - reason,
  - owner,
  - review trigger (typically next Angular upgrade window).
