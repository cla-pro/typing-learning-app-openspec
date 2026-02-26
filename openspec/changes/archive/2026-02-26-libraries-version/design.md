## Context

The project uses Angular with TypeScript and Node.js tooling. Dependency versions can drift over time, causing preventable security exposure, maintenance overhead, and compatibility surprises. This change introduces a dependency governance model where Angular is the pace-maker for compatibility: all project libraries must target the most recent available release that remains compatible with the current Angular baseline.

This affects package management (`dependencies` and `devDependencies`), build/test validation, and contributor workflow. It also requires a repeatable process for upgrades so the “latest-compatible” rule is maintained continuously, not only as a one-time cleanup.

## Goals / Non-Goals

**Goals:**
- Upgrade Angular itself (framework + CLI/tooling) to latest stable using Angular CLI (`ng update`) as the first upgrade step.
- Upgrade all direct runtime and development libraries to their latest Angular-compatible versions.
- Define and document a global design constraint: used libraries must be on the most recent compatible version.
- Standardize a deterministic compatibility check flow anchored on the current Angular major/minor baseline.
- Ensure post-upgrade build and test verification gates are part of the process.

**Non-Goals:**
- Automatic daily dependency updates without human review.
- Forcing incompatible major upgrades of Angular solely to satisfy another library.
- Managing transitive dependency versions directly unless required to unblock compatibility.

## Decisions

### 1) Angular as compatibility source of truth
Use the installed Angular version and official ecosystem compatibility expectations as the primary constraint when selecting library versions.

**Rationale:** Angular governs compatibility for framework-adjacent packages and build tooling; anchoring to Angular avoids unstable combinations.

**Alternatives considered:**
- **Upgrade everything to absolute latest regardless of Angular:** rejected due to high break risk.
- **Pin to conservative LTS-only package set:** rejected because it conflicts with the latest-compatible policy.

### 2) Latest-compatible policy as a general design constraint
Adopt a project-wide rule: every used library version MUST be the newest release that is compatible with the current Angular baseline.

**Rationale:** This enforces predictable modernization and reduces security/maintenance lag while preserving framework compatibility.

**Alternatives considered:**
- **Allow version lag by fixed window (e.g., one major behind):** rejected because policy becomes ambiguous and drifts.
- **Case-by-case version decisions without global rule:** rejected due to inconsistency and review overhead.

### 3) Controlled upgrade and validation workflow
Perform upgrades in dependency groups, starting with Angular itself via Angular CLI (`ng update`), then Angular-adjacent packages, then tooling/test stack and utilities; run install, build, and tests after each group and at the end.

**Rationale:** Incremental verification limits debugging scope when incompatibilities appear.

**Alternatives considered:**
- **Single bulk upgrade of all dependencies:** rejected due to hard-to-isolate failures.

### 4) Exception handling for unavailable compatibility
If no latest release is Angular-compatible, select the highest compatible version and document it as a temporary exception with review trigger on Angular upgrade.

**Rationale:** Preserves delivery while keeping policy intent and traceability.

**Alternatives considered:**
- **Block all changes until Angular is upgraded:** rejected because it can halt unrelated progress.

## Risks / Trade-offs

- **[Major-version breakage during upgrades]** → Mitigation: group-based updates with build/test checks after each group.
- **[Tooling mismatch (builder/test runner/plugins)]** → Mitigation: treat Angular ecosystem packages as a coordinated set and align versions together.
- **[Policy drift over time]** → Mitigation: add explicit governance requirement in specs/tasks and use periodic dependency review cadence.
- **[Temporary compatibility exceptions become permanent]** → Mitigation: record exception owner, reason, and review condition (next Angular upgrade window).

## Migration Plan

1. Inventory current direct dependencies and devDependencies.
2. Determine current Angular baseline (major/minor) and compatibility boundaries.
3. Upgrade Angular framework packages and Angular CLI/tooling to the latest stable version using Angular CLI (`ng update`).
4. Upgrade Angular-adjacent packages to latest compatible versions for the upgraded Angular baseline.
5. Upgrade remaining tooling and utility libraries to latest compatible versions.
6. Run full install, build, and test validation.
7. Document any temporary exceptions and their resolution trigger.

**Rollback strategy:**
- If build/test regressions are unresolved in a dependency group, revert that group to last known-good versions and continue with compatible subsets.
- Preserve lockfile snapshots for quick restore.

## Open Questions

- Should the policy apply only to direct dependencies, or also enforce constraints for selected critical transitive dependencies?
- What review cadence should be mandated (e.g., per sprint vs. monthly) for checking new latest-compatible releases?
- Should CI include an automated policy check to flag direct dependencies that are not on latest compatible versions?
