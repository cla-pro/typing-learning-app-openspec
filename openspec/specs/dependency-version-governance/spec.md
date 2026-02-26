## Purpose

Defines governance rules for keeping direct dependencies current while preserving Angular compatibility.

## Requirements

### Requirement: Angular upgrade path uses Angular CLI
The system MUST upgrade Angular framework packages and Angular CLI/tooling using Angular CLI commands (`ng update`) before broader library upgrade waves.

#### Scenario: Angular baseline upgrade is initiated
- **WHEN** maintainers start a version modernization cycle
- **THEN** they execute Angular upgrade using Angular CLI (`ng update`) and establish the upgraded Angular baseline before upgrading other direct dependencies

### Requirement: Latest Angular-compatible dependency versions
The system MUST keep every direct runtime and development dependency at the most recent available version that is compatible with the current Angular baseline.

#### Scenario: Upgrade planning for direct dependencies
- **WHEN** maintainers review project dependencies for update
- **THEN** each direct dependency is selected at the newest release that remains compatible with the current Angular version

### Requirement: Angular as compatibility pace-maker
The system MUST treat Angular compatibility as the primary gating constraint for dependency version selection.

#### Scenario: Latest release is not Angular-compatible
- **WHEN** the latest release of a dependency is incompatible with the current Angular baseline
- **THEN** maintainers select the highest compatible release and do not force an incompatible upgrade

### Requirement: Documented temporary exceptions
The system MUST record temporary exceptions when a dependency cannot use its latest release because of Angular compatibility constraints.

#### Scenario: Exception is created
- **WHEN** a dependency is pinned below its absolute latest release due to Angular compatibility
- **THEN** the project records the exception reason and a review trigger tied to the next Angular upgrade window
