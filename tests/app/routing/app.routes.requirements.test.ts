import { routes } from '../../../src/app/routing/app.routes';
import { ExerciseNotFoundComponent } from '../../../src/app/components/exercise-not-found/exercise-not-found.component';
import { RewardGamesComponent } from '../../../src/app/components/reward-games/reward-games.component';
import { SettingsComponent } from '../../../src/app/components/settings/settings.component';

import { expect, describe, test } from 'vitest'

describe('Routing Requirements', () => {
  test('exposes root, settings, reward-games, exercise, exercise-not-found, and wildcard route behavior through route config', () => {
    const rootRoute = routes.find(route => route.path === '');
    const settingsRoute = routes.find(route => route.path === 'settings');
    const rewardGamesRoute = routes.find(route => route.path === 'reward-games');
    const exerciseNotFoundRoute = routes.find(route => route.path === 'exercices/not-found');
    const exerciseRoute = routes.find(route => route.path === 'exercices/:id');
    const wildcardRoute = routes.find(route => route.path === '**');

    expect(rootRoute).toBeDefined();
    expect(rootRoute?.component).toBeDefined();

    expect(settingsRoute).toBeDefined();
    expect(settingsRoute?.component).toBe(SettingsComponent);

    expect(rewardGamesRoute).toBeDefined();
    expect(rewardGamesRoute?.component).toBe(RewardGamesComponent);

    expect(exerciseNotFoundRoute).toBeDefined();
    expect(exerciseNotFoundRoute?.component).toBe(ExerciseNotFoundComponent);

    expect(exerciseRoute).toBeDefined();
    expect(exerciseRoute?.component).toBeDefined();

    expect(wildcardRoute).toBeDefined();
    expect(wildcardRoute?.redirectTo).toBe('/');
  });

  test('models fallback behavior for unknown paths via wildcard redirect', () => {
    const wildcardRoute = routes.find(route => route.path === '**');
    expect(wildcardRoute?.redirectTo).toBe('/');
  });

  test('keeps dedicated exercise-not-found route as a static route', () => {
    const exerciseNotFoundRoute = routes.find(route => route.path === 'exercices/not-found');

    expect(exerciseNotFoundRoute?.component).toBe(ExerciseNotFoundComponent);
  });
});
