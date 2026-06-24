## Context

The project currently relies on a manual release process: run tests, build production assets, and upload output to a remote server. This flow is operationally risky because step order and production settings are enforced by convention rather than automation.

The change introduces a `build-deploy` skill that executes the release pipeline end-to-end with a fixed sequence and fail-fast behavior:
1. Empty `public/`
2. Run all tests
3. Build production artifacts with production-safe configuration (including disabling debug-only features such as `debugGrid`)
4. Deploy built artifacts to a remote server over SFTP via a generated script

Constraints:
- Credentials must not be committed to source control.
- Deploy password must be entered interactively at runtime.
- Deployment defaults to SFTP and must abort if SFTP connectivity/handshake fails.
- Remote deployment must rotate existing files into a backup folder before placing new files.
- A dry-run mode must be available to validate deployment actions without modifying remote files.

## Goals / Non-Goals

**Goals:**
- Provide one repeatable command/skill (`build-deploy`) for release.
- Enforce release gate ordering: clean -> test -> build -> deploy.
- Guarantee production build flags are applied consistently.
- Generate a deployment script that prompts for password and deploys over SFTP.
- Fail fast and stop deployment if tests or build fail.
- Fail fast and abort deployment if SFTP is unavailable.
- Support dry-run validation mode for deployment planning and checks.

**Non-Goals:**
- Replacing hosting infrastructure or changing remote server topology.
- Introducing CI/CD platform integration in this change.
- Managing long-lived secrets in repository files or environment defaults.

## Decisions

1. Orchestration entrypoint will be a repository script/command aligned with the skill name `build-deploy`.
- Rationale: keeps release behavior versioned and executable locally the same way every time.
- Alternatives considered:
  - Manual checklist: rejected because it does not enforce order or consistency.
  - Multiple independent commands without orchestrator: rejected because it increases operator error.

2. `public/` cleanup will be explicit and executed before any validation/build step.
- Rationale: prevents stale artifacts from prior releases from being deployed.
- Alternatives considered:
  - Rely only on build overwrite behavior: rejected because partial leftovers are possible.

3. Production build will use explicit production configuration and a hard assertion for debug-only flags.
- Rationale: avoids accidental non-production settings (for example `debugGrid` enabled).
- Alternatives considered:
  - Convention-based "remember to use prod config": rejected as too error-prone.

4. Deployment will be implemented as a generated script with SFTP as the default and required transport.
- Rationale: SFTP satisfies transport security expectations and keeps deployment behavior deterministic.
- Alternatives considered:
  - GUI client upload: rejected as non-repeatable.
  - FTP fallback when SFTP fails: rejected per requirement to abort deployment if SFTP does not work.
  - Embedding password in files: rejected for security reasons.

5. Script will collect password interactively at runtime and keep non-secret connection metadata outside source-controlled secrets.
- Rationale: satisfies requirement to ask for password while preventing credential leakage in VCS.
- Alternatives considered:
  - Reading password from `.env`: rejected by security requirement.

6. Pipeline behavior is fail-fast with explicit exit codes.
- Rationale: deployment must not proceed after failing tests/build.
- Alternatives considered:
  - Continue-on-error with warnings: rejected because it risks releasing broken builds.

7. Remote deployment layout will use backup rotation before activating new files.
- Rationale: preserves recoverability and provides a straightforward rollback point on the remote host.
- Required sequence:
  - Move current deployed files to a remote backup directory (for example, `backup/` or timestamped subfolder).
  - Upload/sync new production artifacts into the active deployment location.
- Alternatives considered:
  - In-place overwrite without backup: rejected because it weakens rollback safety.

8. Deployment script will support a dry-run mode.
- Rationale: operators need to validate connection, remote paths, and planned file operations before making changes.
- Dry-run behavior:
  - Perform connectivity/authentication and remote path checks.
  - Print planned backup and upload operations.
  - Do not create, move, delete, or upload remote files.
- Alternatives considered:
  - No dry-run mode: rejected because it increases deployment risk.

## Risks / Trade-offs

- [Risk] Local environment differences (missing tools, shell differences) can break release runs.
  -> Mitigation: keep commands cross-platform where possible and document prerequisites in script usage/help output.

- [Risk] SFTP connectivity issues (host key mismatch, firewall, protocol config) can block deployment.
  -> Mitigation: fail fast with clear error output, and provide dry-run checks before live deploy.

- [Risk] Password prompt in non-interactive environments blocks execution.
  -> Mitigation: define local/manual execution as primary scope for this change; CI integration is out of scope.

- [Risk] Production guard (e.g., debug flag assertion) may drift if config naming changes.
  -> Mitigation: centralize the guard check in the orchestrator and cover with behavior tests.

## Migration Plan

1. Add the `build-deploy` orchestration command and generated deploy script.
2. Add/update project scripts so release command can be run from repository root.
3. Validate behavior locally: clean folder, tests, production build settings, password prompt, and dry-run output.
4. Validate remote deploy strategy in a controlled environment: backup rotation then artifact publish.
5. Rollout by replacing manual release steps with the new command.
6. Rollback strategy: on deployment failure after backup rotation, restore from remote backup folder; if automation fails pre-deploy, use prior manual process.

## Open Questions

- None at this stage.
