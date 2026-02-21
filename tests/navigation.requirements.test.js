const fs = require('fs');
const path = require('path');

describe('Navigation Requirements Regression Tests', () => {
  const root = path.join(__dirname, '..');

  it('should define required Angular routes', () => {
    const routesPath = path.join(root, 'src', 'app', 'routing', 'app.routes.ts');
    const routesCode = fs.readFileSync(routesPath, 'utf8');

    expect(routesCode).toContain("path: ''");
    expect(routesCode).toContain("path: 'exercices/:id'");
    expect(routesCode).toContain("path: '**'");
    expect(routesCode).toContain("redirectTo: '/'");
  });

  it('should keep templates and styles separated from component code', () => {
    const components = [
      {
        ts: path.join(root, 'src', 'app', 'components', 'welcome', 'welcome.component.ts'),
        html: path.join(root, 'src', 'app', 'components', 'welcome', 'welcome.component.html'),
        css: path.join(root, 'src', 'app', 'components', 'welcome', 'welcome.component.css')
      },
      {
        ts: path.join(root, 'src', 'app', 'components', 'exercise', 'exercise.component.ts'),
        html: path.join(root, 'src', 'app', 'components', 'exercise', 'exercise.component.html'),
        css: path.join(root, 'src', 'app', 'components', 'exercise', 'exercise.component.css')
      },
      {
        ts: path.join(root, 'src', 'app', 'components', 'home-button', 'home-button.component.ts'),
        html: path.join(root, 'src', 'app', 'components', 'home-button', 'home-button.component.html'),
        css: path.join(root, 'src', 'app', 'components', 'home-button', 'home-button.component.css')
      }
    ];

    for (const component of components) {
      expect(fs.existsSync(component.html)).toBe(true);
      expect(fs.existsSync(component.css)).toBe(true);

      const tsCode = fs.readFileSync(component.ts, 'utf8');
      expect(tsCode).toContain('templateUrl:');
      expect(tsCode).toContain('styleUrls:');
      expect(tsCode).not.toContain('template: `');
      expect(tsCode).not.toContain('styles: [`');
    }
  });

  it('should provide exercise navigation links from welcome page', () => {
    const welcomeTemplatePath = path.join(
      root,
      'src',
      'app',
      'components',
      'welcome',
      'welcome.component.html'
    );
    const template = fs.readFileSync(welcomeTemplatePath, 'utf8');

    expect(template).toContain("[routerLink]=\"['/exercices', exercise.id]\"");
    expect(template).toContain('*ngFor="let exercise of exercises"');
  });

  it('should keep expected exercise IDs available for navigation', () => {
    const welcomeComponentPath = path.join(
      root,
      'src',
      'app',
      'components',
      'welcome',
      'welcome.component.ts'
    );
    const welcomeComponentCode = fs.readFileSync(welcomeComponentPath, 'utf8');

    expect(welcomeComponentCode).toContain("id: 'basic-typing'");
    expect(welcomeComponentCode).toContain("id: 'speed-test'");
    expect(welcomeComponentCode).toContain("id: 'accuracy-training'");
  });

  it('should provide home navigation from exercise pages', () => {
    const exerciseTemplatePath = path.join(
      root,
      'src',
      'app',
      'components',
      'exercise',
      'exercise.component.html'
    );
    const homeButtonTemplatePath = path.join(
      root,
      'src',
      'app',
      'components',
      'home-button',
      'home-button.component.html'
    );

    const exerciseTemplate = fs.readFileSync(exerciseTemplatePath, 'utf8');
    const homeButtonTemplate = fs.readFileSync(homeButtonTemplatePath, 'utf8');

    expect(exerciseTemplate).toContain('<app-home-button></app-home-button>');
    expect(homeButtonTemplate).toContain("[routerLink]=\"['/']\"");
  });

  it('should extract exercise id from ActivatedRoute params', () => {
    const exerciseComponentPath = path.join(
      root,
      'src',
      'app',
      'components',
      'exercise',
      'exercise.component.ts'
    );
    const exerciseComponentCode = fs.readFileSync(exerciseComponentPath, 'utf8');

    expect(exerciseComponentCode).toContain('ActivatedRoute');
    expect(exerciseComponentCode).toContain("this.route.params.subscribe");
    expect(exerciseComponentCode).toContain("this.exerciseId = params['id']");
  });

  it('should not rely on server.js in npm scripts', () => {
    const packageJsonPath = path.join(root, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    expect(packageJson.scripts.start).not.toContain('server.js');
    expect(packageJson.scripts.dev).not.toContain('server.js');
    expect(packageJson.scripts.start).toContain('ng serve');
  });
});
