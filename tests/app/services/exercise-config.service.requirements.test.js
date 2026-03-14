const fs = require('fs');
const path = require('path');

describe('ExerciseConfigService Requirements', () => {
  const root = path.join(__dirname, '..', '..', '..');

  it('should define exercise configuration service model and methods', () => {
    const exerciseModelPath = path.join(
      root,
      'src',
      'app',
      'models',
      'exercise-config.model.ts'
    );
    const exerciseServicePath = path.join(
      root,
      'src',
      'app',
      'services',
      'exercise-config.service.ts'
    );

    const modelCode = fs.readFileSync(exerciseModelPath, 'utf8');
    const serviceCode = fs.readFileSync(exerciseServicePath, 'utf8');

    expect(modelCode).toContain('export interface ExerciseConfig');
    expect(modelCode).toContain('id: string');
    expect(modelCode).toContain('name: string');
    expect(modelCode).toContain('letters: string[] | string');
    expect(modelCode).toContain('impactedKeys: string[]');

    expect(serviceCode).toContain('providedIn: \'root\'');
    expect(serviceCode).toContain('listExercises(): ExerciseConfig[]');
    expect(serviceCode).toContain('getExerciseById(exerciseId: string): ExerciseConfig | undefined');
    expect(serviceCode).toContain('id: \'basic-typing\'');
    expect(serviceCode).toContain('id: \'speed-test\'');
    expect(serviceCode).toContain('id: \'accuracy-training\'');
  });
});
