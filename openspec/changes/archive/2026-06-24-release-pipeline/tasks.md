## 1. Release Pipeline Command Setup

- [x] 1.1 Add a repository-level `build-deploy` script entry that orchestrates release execution from project root.
- [x] 1.2 Implement fail-fast orchestration so each phase exits immediately on error and later phases are skipped.
- [x] 1.3 Add explicit `public/` cleanup as the first release phase and verify it runs before test/build/deploy.

## 2. Test And Production Build Enforcement

- [x] 2.1 Wire the full test suite execution into the pipeline as a mandatory pre-build gate.
- [x] 2.2 Wire production artifact build into the pipeline using explicit production configuration.
- [x] 2.3 Add a production safety guard that fails release if debug-only settings (for example `debugGrid`) are enabled.

## 3. Generate SFTP Deployment Script

- [x] 3.1 Create a deployment script file generated/maintained for release usage and callable from `build-deploy`.
- [x] 3.2 Implement runtime interactive password prompt in the script and ensure no password is read from committed files.
- [x] 3.3 Implement SFTP connection/authentication flow and abort deployment on any SFTP handshake/auth/session failure.
- [x] 3.4 Ensure no FTP fallback path exists when SFTP fails.

## 4. Remote Backup Rotation And Publish

- [x] 4.1 Implement remote pre-deploy backup rotation that moves current live files into a backup folder.
- [x] 4.2 Implement upload/sync of new production artifacts into the active remote deployment path after successful backup.
- [x] 4.3 Add failure handling that stops publish if backup rotation fails and leaves active files unchanged.

## 5. Dry-Run Mode And Operator Feedback

- [x] 5.1 Add a dry-run flag to the deployment script that performs connectivity/path validation only.
- [x] 5.2 Ensure dry-run prints planned backup/upload actions and performs zero remote file mutations.
- [x] 5.3 Add clear console output and exit codes for success/failure paths (tests failed, build failed, SFTP failed, backup failed).

## 6. Verification And Documentation

- [x] 6.1 Add or update behavior tests covering pipeline order, fail-fast semantics, and production guard behavior.
- [x] 6.2 Add or update behavior tests covering SFTP failure abort, password prompting, backup rotation sequencing, and dry-run non-mutating behavior.
- [x] 6.3 Document local release usage, required inputs, and rollback using remote backup restore in project docs.
