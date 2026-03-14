const fs = require('fs');
const path = require('path');

describe('Project Script Requirements', () => {
  const root = path.join(__dirname, '..', '..');

  it('should not rely on server.js in npm scripts', () => {
    const packageJsonPath = path.join(root, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    expect(packageJson.scripts.start).not.toContain('server.js');
    expect(packageJson.scripts.dev).not.toContain('server.js');
    expect(packageJson.scripts.start).toContain('ng serve');
  });
});
