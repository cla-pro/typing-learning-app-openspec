## Why

Releasing the application is currently a manual process that is repetitive and error-prone. Automating release preparation and deployment now reduces operational risk and ensures every release follows the same verified production path.

## What Changes

- Introduce a reusable release skill named `build-deploy` that orchestrates the full release pipeline.
- Enforce a deterministic release sequence: clear the public output folder, run all tests, build production artifacts, then deploy artifacts to the remote server.
- Ensure production build settings are always applied during release builds (for example, disable debug-only UI elements such as `debugGrid`).
- Add a generated deployment script invoked by the skill to upload built artifacts to a remote server over FTP/SFTP.
- Require the deployment script to request the remote password interactively at runtime instead of storing it in repository files.

## Capabilities

### New Capabilities
- `release-pipeline`: Automate test, production build, and remote artifact deployment through a single release workflow (`build-deploy`) with interactive credential prompting.

### Modified Capabilities
- None.

## Impact

- Affected code: build/release scripts, deployment automation scripts, and related package script entries.
- Affected behavior: release operations move from manual, multi-step execution to one standardized automation path.
- Affected configuration: production build must explicitly enforce production-safe flags and disable debug-only features.
- External systems: remote hosting server reachable via FTP/SFTP for artifact upload.
- Security posture: password entry happens at deploy time via prompt and is not committed to source control.
