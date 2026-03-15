import { beforeEach, describe, expect, test, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { WelcomeComponent } from '../../../../src/app/components/welcome/welcome.component';
import { ExerciseConfig } from '../../../../src/app/models/exercise-config.model';
import { ExerciseConfigService } from '../../../../src/app/services/exercise-config.service';

const exercises: ExerciseConfig[] = [
  { id: 'a', name: 'A', letters: ['a'], impactedKeys: ['A'] },
  { id: 'b', name: 'B', letters: ['b'], impactedKeys: ['B'] }
];

const serviceStub = {
  listExercises: vi.fn(() => exercises)
};

describe('Welcome Component Requirements', () => {
  let component: WelcomeComponent;

  beforeEach(async () => {
    serviceStub.listExercises.mockClear();

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ExerciseConfigService,
          useValue: serviceStub
        }
      ]
    }).compileComponents();

    component = TestBed.runInInjectionContext(() => new WelcomeComponent());
  });

  test('loads exercise links from ExerciseConfigService public API', () => {
    expect(serviceStub.listExercises).toHaveBeenCalledTimes(1);
    expect(component.exercises).toEqual(exercises);
  });
});
