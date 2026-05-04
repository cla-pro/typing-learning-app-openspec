import { Component, importProvidersFrom, ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService, TranslationObject } from '@ngx-translate/core';
import { Observable, firstValueFrom, of } from 'rxjs';
import { readFile } from 'node:fs/promises';
import { beforeEach, expect, describe, test } from 'vitest';

import { HomeButtonComponent } from '../../../../src/app/components/home-button/home-button.component';

describe('Home Button Component Requirements', () => {
  test('can be instantiated as a reusable navigation component', () => {
    const component = new HomeButtonComponent();

    expect(component).toBeInstanceOf(HomeButtonComponent);
  });
});

class TestTranslateLoader implements TranslateLoader {
  getTranslation(_lang: string): Observable<TranslationObject> {
    return of({ homeButton: { label: 'Home', title: 'Go home' } });
  }
}

const resourceMap: Record<string, string> = {
  './home-button.component.html': 'src/app/components/home-button/home-button.component.html',
  './home-button.component.css': 'src/app/components/home-button/home-button.component.css'
};

@Component({ template: '' })
class DummyRootComponent {}

@Component({ template: '' })
class DummyRewardGamesComponent {}

describe('Home Button Component — configurable destination', () => {
  let fixture: ComponentFixture<HomeButtonComponent>;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await resolveComponentResources(async (url: string) => readFile(resourceMap[url] ?? url, 'utf8'));

    await TestBed.configureTestingModule({
      imports: [HomeButtonComponent],
      providers: [
        importProvidersFrom(
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TestTranslateLoader }
          })
        ),
        provideRouter([
          { path: '', component: DummyRootComponent },
          { path: 'reward-games', component: DummyRewardGamesComponent }
        ])
      ]
    }).compileComponents();

    await firstValueFrom(TestBed.inject(TranslateService).use('en'));
    fixture = TestBed.createComponent(HomeButtonComponent);
  });

  test('navigates to root by default when no destination is configured', async () => {
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/reward-games');

    const button = fixture.nativeElement.querySelector('.home-button') as HTMLButtonElement;
    button.click();
    await fixture.whenStable();

    expect(router.url).toBe('/');
  });

  test('navigates to custom destination when destination input is set', async () => {
    fixture.componentRef.setInput('destination', '/reward-games');
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');

    const button = fixture.nativeElement.querySelector('.home-button') as HTMLButtonElement;
    button.click();
    await fixture.whenStable();

    expect(router.url).toBe('/reward-games');
  });
});
