import { HomeButtonComponent } from '../../../../src/app/components/home-button/home-button.component';

import { expect, describe, test } from 'vitest'

describe('Home Button Component Requirements', () => {
  test('can be instantiated as a reusable navigation component', () => {
    const component = new HomeButtonComponent();

    expect(component).toBeInstanceOf(HomeButtonComponent);
  });
});
