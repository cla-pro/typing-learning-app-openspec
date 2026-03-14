const fs = require('fs');
const path = require('path');

describe('Home Button Component Requirements', () => {
  const root = path.join(__dirname, '..', '..', '..', '..');

  it('should keep templates and styles separated from component code', () => {
    const component = {
      ts: path.join(root, 'src', 'app', 'components', 'home-button', 'home-button.component.ts'),
      html: path.join(root, 'src', 'app', 'components', 'home-button', 'home-button.component.html'),
      css: path.join(root, 'src', 'app', 'components', 'home-button', 'home-button.component.css')
    };

    expect(fs.existsSync(component.html)).toBe(true);
    expect(fs.existsSync(component.css)).toBe(true);

    const tsCode = fs.readFileSync(component.ts, 'utf8');
    expect(tsCode).toContain('templateUrl:');
    expect(tsCode).toContain('styleUrls:');
    expect(tsCode).not.toContain('template: `');
    expect(tsCode).not.toContain('styles: [`');
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
    expect(homeButtonTemplate).toContain('[routerLink]="[\'/\']"');
  });
});
