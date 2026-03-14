const fs = require('fs');
const path = require('path');

describe('Welcome Component Requirements', () => {
  const root = path.join(__dirname, '..', '..', '..', '..');

  it('should keep templates and styles separated from component code', () => {
    const component = {
      ts: path.join(root, 'src', 'app', 'components', 'welcome', 'welcome.component.ts'),
      html: path.join(root, 'src', 'app', 'components', 'welcome', 'welcome.component.html'),
      css: path.join(root, 'src', 'app', 'components', 'welcome', 'welcome.component.css')
    };

    expect(fs.existsSync(component.html)).toBe(true);
    expect(fs.existsSync(component.css)).toBe(true);

    const tsCode = fs.readFileSync(component.ts, 'utf8');
    expect(tsCode).toContain('templateUrl:');
    expect(tsCode).toContain('styleUrls:');
    expect(tsCode).not.toContain('template: `');
    expect(tsCode).not.toContain('styles: [`');
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

    expect(template).toContain('[routerLink]="[\'/exercices\', exercise.id]"');
    expect(template).toContain('@for (exercise of exercises; track exercise)');
  });

  it('should source welcome exercise links from ExerciseConfigService', () => {
    const welcomeComponentPath = path.join(
      root,
      'src',
      'app',
      'components',
      'welcome',
      'welcome.component.ts'
    );
    const welcomeComponentCode = fs.readFileSync(welcomeComponentPath, 'utf8');

    expect(welcomeComponentCode).toContain('ExerciseConfigService');
    expect(welcomeComponentCode).toContain('this.exerciseConfigService.listExercises()');
  });
});
