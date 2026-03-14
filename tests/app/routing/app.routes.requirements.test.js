const fs = require('fs');
const path = require('path');

describe('Routing Requirements', () => {
  const root = path.join(__dirname, '..', '..', '..');

  it('should define required Angular routes', () => {
    const routesPath = path.join(root, 'src', 'app', 'routing', 'app.routes.ts');
    const routesCode = fs.readFileSync(routesPath, 'utf8');

    expect(routesCode).toContain('path: \'\'');
    expect(routesCode).toContain('path: \'exercices/:id\'');
    expect(routesCode).toContain('path: \'**\'');
    expect(routesCode).toContain('redirectTo: \'/\'');
  });
});
