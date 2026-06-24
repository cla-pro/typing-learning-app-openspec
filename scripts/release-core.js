const fs = require('node:fs/promises');
const path = require('node:path');

const DEBUG_GRID_PATTERNS = [
  /\[debugGrid\]\s*=\s*["']true["']/,
  /\bdebugGrid\s*=\s*true\b/
];

async function walkFiles(dirPath, collected = []) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await walkFiles(absolutePath, collected);
      continue;
    }

    if (entry.name.endsWith('.html') || entry.name.endsWith('.ts')) {
      collected.push(absolutePath);
    }
  }

  return collected;
}

function hasDebugGridViolation(fileContent) {
  return DEBUG_GRID_PATTERNS.some(pattern => pattern.test(fileContent));
}

async function findDebugGridViolations(rootDir) {
  const sourceRoot = path.join(rootDir, 'src', 'app');
  const candidateFiles = await walkFiles(sourceRoot);
  const violations = [];

  for (const filePath of candidateFiles) {
    const fileContent = await fs.readFile(filePath, 'utf8');
    if (!hasDebugGridViolation(fileContent)) {
      continue;
    }

    violations.push(path.relative(rootDir, filePath).replace(/\\/g, '/'));
  }

  return violations;
}

async function assertProductionSafety(rootDir) {
  const violations = await findDebugGridViolations(rootDir);
  if (violations.length > 0) {
    const message = [
      'Production safety guard failed: debugGrid must not be hardcoded to true.',
      ...violations.map(file => `- ${file}`)
    ].join('\n');
    throw new Error(message);
  }
}

module.exports = {
  assertProductionSafety,
  findDebugGridViolations
};
