import { routes } from '../../../src/app/routing/app.routes';

import { expect, describe, test } from 'vitest'

describe('Routing Requirements', () => {
  test('exposes root, exercise, and wildcard route behavior through route config', () => {
    const rootRoute = routes.find(route => route.path === '');
    const exerciseRoute = routes.find(route => route.path === 'exercices/:id');
    const wildcardRoute = routes.find(route => route.path === '**');

    expect(rootRoute).toBeDefined();
    expect(rootRoute?.component).toBeDefined();

    expect(exerciseRoute).toBeDefined();
    expect(exerciseRoute?.component).toBeDefined();

    expect(wildcardRoute).toBeDefined();
    expect(wildcardRoute?.redirectTo).toBe('/');
  });

  test('models fallback behavior for unknown paths via wildcard redirect', () => {
    const wildcardRoute = routes.find(route => route.path === '**');
    expect(wildcardRoute?.redirectTo).toBe('/');
  });
});
