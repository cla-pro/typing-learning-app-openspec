## ADDED Requirements

### Requirement: Build-deploy executes release pipeline in fixed order
The system SHALL provide a `build-deploy` release workflow that executes the following steps in strict sequence: clear `public/`, run all tests, build production artifacts, then deploy artifacts. The workflow MUST stop immediately if any step fails, and subsequent steps MUST NOT run.

#### Scenario: Successful end-to-end release run
- **WHEN** an operator runs the `build-deploy` workflow and all steps succeed
- **THEN** the workflow completes all four steps in order and reports success

#### Scenario: Tests fail during release
- **WHEN** an operator runs the `build-deploy` workflow and the test step fails
- **THEN** the workflow exits with failure and does not start build or deploy

### Requirement: Release build enforces production-safe configuration
The system SHALL build release artifacts using production configuration only. The release build MUST enforce production-safe feature flags, including disabling debug-only features such as `debugGrid`.

#### Scenario: Production build uses production configuration
- **WHEN** the release workflow reaches the build step
- **THEN** artifact generation runs with production configuration and succeeds only if production settings are applied

#### Scenario: Debug feature remains enabled in release config
- **WHEN** the release workflow detects that a debug-only setting such as `debugGrid` is enabled
- **THEN** the workflow fails the build step and aborts deployment

### Requirement: Deployment uses SFTP and aborts on SFTP failure
The deployment step SHALL connect to the remote host using SFTP. If SFTP connectivity, authentication, or session initialization fails, deployment MUST abort and MUST NOT attempt fallback FTP transport.

#### Scenario: SFTP handshake fails
- **WHEN** the deployment script cannot establish an SFTP session with the remote server
- **THEN** deployment exits with failure and no upload operation is attempted

#### Scenario: SFTP authentication fails
- **WHEN** the deployment script receives invalid credentials for SFTP
- **THEN** deployment exits with failure and does not modify remote files

### Requirement: Deployment script prompts for password at runtime
The generated deployment script SHALL request the remote password interactively at runtime. The script MUST NOT require storing the password in source-controlled files.

#### Scenario: Interactive password prompt
- **WHEN** an operator starts deployment without an active authenticated SFTP session
- **THEN** the script prompts for password input before authentication and proceeds only after valid input

### Requirement: Deployment rotates remote files into backup before publish
Before placing new release artifacts, the deployment step SHALL move currently deployed files to a remote backup folder. After backup rotation succeeds, the new artifacts SHALL be uploaded to the active deployment location.

#### Scenario: Backup rotation and publish succeed
- **WHEN** deployment starts with an existing active remote site
- **THEN** current files are moved to backup and new files are uploaded to the active location

#### Scenario: Backup rotation fails
- **WHEN** the deployment script cannot move current files into the backup folder
- **THEN** deployment exits with failure and does not upload new artifacts

### Requirement: Deployment supports dry-run validation mode
The deployment script SHALL support a dry-run mode that validates connection and planned operations without modifying remote files.

#### Scenario: Dry-run validates plan only
- **WHEN** an operator runs the deployment script in dry-run mode
- **THEN** the script reports connectivity and planned backup/upload actions and performs no remote file mutations
