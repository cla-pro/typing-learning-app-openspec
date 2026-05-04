import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { Component, importProvidersFrom, ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService, TranslationObject } from '@ngx-translate/core';
import { Observable, firstValueFrom, of } from 'rxjs';
import { readFile } from 'node:fs/promises';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { TortoiseGameHostComponent } from '../../../../src/app/components/tortoise-game-host/tortoise-game-host.component';
import { RewardGamesConfigService } from '../../../../src/app/services/reward-games-config.service';
import { TORTOISE_GAME_CONFIGS } from '../../../../src/app/data/tortoise-game-configs';

const KNOWN_GAME_ID = TORTOISE_GAME_CONFIGS[0].gameId;

class TestTranslateLoader implements TranslateLoader {
  getTranslation(_lang: string): Observable<TranslationObject> {
    return of({ homeButton: { label: 'Home', title: 'Go home' } });
  }
}

const resourceMap: Record<string, string> = {
  './tortoise-game-host.component.html': 'src/app/components/tortoise-game-host/tortoise-game-host.component.html',
  './tortoise-game-host.component.css': 'src/app/components/tortoise-game-host/tortoise-game-host.component.css',
  './home-button.component.html': 'src/app/components/home-button/home-button.component.html',
  './home-button.component.css': 'src/app/components/home-button/home-button.component.css'
};

describe('Tortoise Game Host Component Requirements', () => {
  let fixture: ComponentFixture<TortoiseGameHostComponent>;
  let paramMap$: ReplaySubject<ReturnType<typeof convertToParamMap>>;
  let routerStub: { navigateByUrl: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    paramMap$ = new ReplaySubject(1);
    routerStub = { navigateByUrl: vi.fn() };

    TestBed.resetTestingModule();
    await resolveComponentResources(async (url: string) => readFile(resourceMap[url] ?? url, 'utf8'));

    await TestBed.configureTestingModule({
      imports: [TortoiseGameHostComponent],
      providers: [
        importProvidersFrom(
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TestTranslateLoader }
          })
        ),
        { provide: ActivatedRoute, useValue: { paramMap: paramMap$.asObservable() } },
        { provide: Router, useValue: routerStub },
        RewardGamesConfigService
      ]
    }).compileComponents();

    await firstValueFrom(TestBed.inject(TranslateService).use('en'));
    fixture = TestBed.createComponent(TortoiseGameHostComponent);
  });

  test('loads configuration for a known gameId', () => {
    paramMap$.next(convertToParamMap({ gameId: KNOWN_GAME_ID }));
    fixture.detectChanges();

    expect(fixture.componentInstance.config).toBeDefined();
    expect(fixture.componentInstance.config?.gameId).toBe(KNOWN_GAME_ID);
  });

  test('redirects to exercise-not-found for an unknown gameId', () => {
    paramMap$.next(convertToParamMap({ gameId: 'unknown-game-id' }));
    fixture.detectChanges();

    expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/exercices/not-found');
  });

  test('renders the back navigation control derived from the shared home-button component', async () => {
    paramMap$.next(convertToParamMap({ gameId: KNOWN_GAME_ID }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.home-button')).not.toBeNull();
  });

  test('back navigation control has destination set to the reward-games page', () => {
    paramMap$.next(convertToParamMap({ gameId: KNOWN_GAME_ID }));
    fixture.detectChanges();

    const homeButtonEl = fixture.debugElement.children[0];
    expect(homeButtonEl?.componentInstance?.destination).toBe('/reward-games');
  });
});
