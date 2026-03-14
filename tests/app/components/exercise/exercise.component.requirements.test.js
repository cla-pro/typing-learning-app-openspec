const fs = require('fs');
const path = require('path');

describe('Exercise Component Requirements', () => {
  const root = path.join(__dirname, '..', '..', '..', '..');

  it('should keep templates and styles separated from component code', () => {
    const component = {
      ts: path.join(root, 'src', 'app', 'components', 'exercise', 'exercise.component.ts'),
      html: path.join(root, 'src', 'app', 'components', 'exercise', 'exercise.component.html'),
      css: path.join(root, 'src', 'app', 'components', 'exercise', 'exercise.component.css')
    };

    expect(fs.existsSync(component.html)).toBe(true);
    expect(fs.existsSync(component.css)).toBe(true);

    const tsCode = fs.readFileSync(component.ts, 'utf8');
    expect(tsCode).toContain('templateUrl:');
    expect(tsCode).toContain('styleUrls:');
    expect(tsCode).not.toContain('template: `');
    expect(tsCode).not.toContain('styles: [`');
  });

  it('should resolve exercise data from route id using ExerciseConfigService', () => {
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
    expect(exerciseComponentCode).toContain('ExerciseConfigService');
    expect(exerciseComponentCode).toContain('this.route.paramMap.subscribe');
    expect(exerciseComponentCode).toContain('this.exerciseConfigService.getExerciseById(this.exerciseId)');
    expect(exerciseComponentCode).toContain('isExerciseFound');
  });

  it('should define exercise runtime states and transition handlers', () => {
    const exerciseComponentPath = path.join(
      root,
      'src',
      'app',
      'components',
      'exercise',
      'exercise.component.ts'
    );
    const exerciseComponentCode = fs.readFileSync(exerciseComponentPath, 'utf8');

    expect(exerciseComponentCode).toContain("type ExerciseRuntimeState = 'opened' | 'running' | 'pending' | 'completed'");
    expect(exerciseComponentCode).toContain("exerciseRuntimeState: ExerciseRuntimeState = 'opened'");
    expect(exerciseComponentCode).toContain('toggleRuntimeState(): void');
    expect(exerciseComponentCode).toContain('completeExerciseTemporarily(): void');
    expect(exerciseComponentCode).toContain("this.exerciseRuntimeState === 'completed'");
  });

  it('should implement running-only keyboard capture and preserve value otherwise', () => {
    const exerciseComponentPath = path.join(
      root,
      'src',
      'app',
      'components',
      'exercise',
      'exercise.component.ts'
    );
    const exerciseComponentCode = fs.readFileSync(exerciseComponentPath, 'utf8');

    expect(exerciseComponentCode).toContain('handleExerciseKeydown(event: KeyboardEvent): void');
    expect(exerciseComponentCode).toContain('if (!this.isExerciseRunning)');
    expect(exerciseComponentCode).toContain('this.lastPressedKey = event.key');
  });

  it('should render invalid-id error page content and recovery guidance', () => {
    const exerciseTemplatePath = path.join(
      root,
      'src',
      'app',
      'components',
      'exercise',
      'exercise.component.html'
    );
    const exerciseTemplate = fs.readFileSync(exerciseTemplatePath, 'utf8');

    expect(exerciseTemplate).toContain('@if (isExerciseFound)');
    expect(exerciseTemplate).toContain('Exercise Not Found');
    expect(exerciseTemplate).toContain('No exercise is found with this id:');
    expect(exerciseTemplate).toContain('Use the home button to go back to the welcome page.');
  });

  it('should render runtime controls and key display bindings on valid exercise page', () => {
    const exerciseTemplatePath = path.join(
      root,
      'src',
      'app',
      'components',
      'exercise',
      'exercise.component.html'
    );
    const exerciseTemplate = fs.readFileSync(exerciseTemplatePath, 'utf8');

    expect(exerciseTemplate).toContain('Current state: <strong>{{ exerciseRuntimeState }}</strong>');
    expect(exerciseTemplate).toContain('(click)="toggleRuntimeState()"');
    expect(exerciseTemplate).toContain('{{ runtimeActionLabel }}');
    expect(exerciseTemplate).toContain("@if (exerciseRuntimeState !== 'completed')");
    expect(exerciseTemplate).toContain('complete (temporary)');
    expect(exerciseTemplate).toContain('[disabled]="exerciseRuntimeState === \'completed\'"');
    expect(exerciseTemplate).toContain('(keydown)="handleExerciseKeydown($event)"');
    expect(exerciseTemplate).toContain("{{ lastPressedKey || '(none)' }}");
  });
});
