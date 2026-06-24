# Typing Learning Application

A keyboard typing learning application built with Angular.

## Features

- Welcome page with navigation to exercise pages
- Exercise routes following `/exercices/<exercice-id>`
- Home button navigation from exercise pages
- Wildcard route redirect to root via Angular Router
- Responsive design that works on desktop and mobile
- Comprehensive test suite with Jest

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v10 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd typing-learning-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

## Running the Application

### Start Application
```bash
npm start
```
This runs Angular dev server on `http://localhost:3000`.

### Development Server
For development, you can run the Angular development server with hot-reload:
```bash
npm run dev:angular
```
This serves the Angular app on `http://localhost:4200` with automatic rebuild on file changes.

### Production Build
```bash
npm run build:angular
```
Build output is generated in `public/dist`.

### Automated Release Pipeline (`build-deploy`)
```bash
npm run build-deploy -- --host <sftp-host> --username <sftp-user> --remote-dir <remote-path>
```

Optional flags:
- `--port <port>` (default: `22`)
- `--backup-dir <remote-backup-path>` (default: `<remote-dir>-backup`)
- `--local-dir <local-build-path>` (default: `public/dist`)
- `--dry-run` (validate and print actions only; no remote mutations)

Pipeline steps are fixed and fail-fast:
1. Empty `public/`
2. Run tests (`npm test`)
3. Run production guard (`debugGrid` cannot be hardcoded to `true`) and build artifacts
4. Generate deployment script and deploy over SFTP

Security behavior:
- The deployment script asks for the SFTP password interactively at runtime.
- No FTP fallback is attempted when SFTP fails.
- Passwords are not read from repository-tracked files.

Remote deployment behavior:
- Existing remote files are moved into a timestamped folder under backup path.
- New artifacts are uploaded to the active remote directory only after backup rotation succeeds.

Rollback:
1. Stop the broken deployment attempt.
2. Move files from the latest timestamped folder under backup path back into the active remote directory.
3. Re-run `npm run build-deploy -- --dry-run ...` to validate paths and connectivity before next live deploy.

### Running Tests
```bash
npm test
```
Runs the test suite with code coverage report.

### Linting
```bash
npm run lint
```
Checks code quality using ESLint.

### Dependency Policy Check
```bash
npm run check:deps
```
Validates that all direct dependencies are on latest compatible versions (or explicitly documented as temporary exceptions).

## Project Structure

```
typing-learning-app/
├── src/
│   ├── app/                   # Angular components and routes
│   ├── index.html             # Angular host page
│   └── main.ts                # Angular bootstrap
├── tests/
│   ├── app/                   # App requirements tests (mirrors src/app)
│   │   ├── components/
│   │   ├── routing/
│   │   └── services/
│   └── project/               # Project-level requirements tests
├── package.json               # Project dependencies and scripts
├── eslint.config.js           # ESLint flat configuration
├── angular.json               # Angular workspace configuration
└── README.md                  # This file
```

## Configuration

### Environment Variables

No custom runtime environment variables are required for local Angular development.

## Development

### Dependency Version Governance

- Angular is the compatibility pace-maker for dependency updates.
- Upgrade Angular with Angular CLI (`ng update`) before other dependency waves.
- Keep direct dependencies/devDependencies at latest compatible versions.
- Record temporary compatibility exceptions in `docs/dependency-version-exceptions.json`.
- Full workflow details are documented in `docs/dependency-version-governance.md`.

### Code Style

The project uses ESLint flat config in `eslint.config.js`.

Rules enforce:
- Single quotes for strings
- Semicolons required
- No unused variables (warning level)
- console.log allowed (for logging)

### Testing

Tests are written with Jest. Run tests with:
```bash
npm test
```

Test files are split by concern for readability and maintainability:
- `tests/app/**` mirrors `src/app/**` (components, routing, services)
- `tests/project/**` contains project-level checks (for example, npm scripts)

When adding a new test, place it in the matching folder path and use `*.test.js` naming so Jest discovers it automatically.

## Future Enhancements

The skeleton provides a foundation for:
- Exercise delivery system
- User progress tracking
- Database integration
- Authentication
- Advanced typing challenges

## License

MIT

## Contributing

Contributions are welcome. Please follow the existing code style and add tests for new features.
