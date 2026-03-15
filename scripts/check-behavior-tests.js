const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const testsRoot = path.join(root, 'tests', 'app');

const forbiddenPatterns = [
  {
    name: 'fs.readFileSync',
    regex: /\bfs\.readFileSync\s*\(/g,
    message: 'Use behavior/public-API assertions instead of reading source files directly.'
  }
];

function listFilesRecursively(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesRecursively(fullPath));
      continue;
    }

    if (/\.requirements\.test\.(js|ts)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function main() {
  const targetFiles = listFilesRecursively(testsRoot);
  const violations = [];

  for (const filePath of targetFiles) {
    const text = fs.readFileSync(filePath, 'utf8');

    for (const pattern of forbiddenPatterns) {
      pattern.regex.lastIndex = 0;
      if (pattern.regex.test(text)) {
        violations.push({
          filePath: path.relative(root, filePath),
          pattern: pattern.name,
          message: pattern.message
        });
      }
    }
  }

  if (violations.length === 0) {
    console.log('Behavior-testing policy check passed.');
    process.exit(0);
  }

  console.error('Behavior-testing policy violations found:');
  for (const violation of violations) {
    console.error(`- ${violation.filePath}: forbidden pattern \`${violation.pattern}\``);
    console.error(`  ${violation.message}`);
  }

  process.exit(1);
}

main();
