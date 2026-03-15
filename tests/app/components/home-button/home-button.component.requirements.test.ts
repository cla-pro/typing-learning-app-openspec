import { HomeButtonComponent } from '../../../../src/app/components/home-button/home-button.component';

describe('Home Button Component Requirements', () => {
  it('can be instantiated as a reusable navigation component', () => {
    const component = new HomeButtonComponent();

    expect(component).toBeInstanceOf(HomeButtonComponent);
  });
});
