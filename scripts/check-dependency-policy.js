const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const packageJsonPath = path.join(root, 'package.json');
const exceptionsPath = path.join(root, 'docs', 'dependency-version-exceptions.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const directDependencies = {
  ...(packageJson.dependencies || {}),
  ...(packageJson.devDependencies || {}),
};

let exceptions = {};
if (fs.existsSync(exceptionsPath)) {
  const parsed = JSON.parse(fs.readFileSync(exceptionsPath, 'utf8'));
  exceptions = parsed.exceptions || {};
}

let outdated = {};
try {
  const output = execSync('npm outdated --json', {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  outdated = output.trim() ? JSON.parse(output) : {};
} catch (error) {
  const stdout = error.stdout ? String(error.stdout).trim() : '';
  outdated = stdout ? JSON.parse(stdout) : {};
}

const violations = Object.entries(outdated)
  .filter(([name]) => Object.prototype.hasOwnProperty.call(directDependencies, name))
  .filter(([name]) => !Object.prototype.hasOwnProperty.call(exceptions, name))
  .map(([name, data]) => ({ name, current: data.current, wanted: data.wanted, latest: data.latest }));

if (violations.length > 0) {
  console.error('Dependency policy check failed. The following direct dependencies are not at the latest compatible version:');
  for (const violation of violations) {
    console.error(`- ${violation.name}: current=${violation.current}, wanted=${violation.wanted}, latest=${violation.latest}`);
  }
  console.error('If a package cannot be upgraded yet, add a documented exception in docs/dependency-version-exceptions.json.');
  process.exit(1);
}

console.log('Dependency policy check passed. All direct dependencies are latest-compatible or documented as exceptions.');
