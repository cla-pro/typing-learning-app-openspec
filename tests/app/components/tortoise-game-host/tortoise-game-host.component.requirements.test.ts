import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { importProvidersFrom, ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService, TranslationObject } from '@ngx-translate/core';
import { Observable, firstValueFrom, of } from 'rxjs';
import { readFile } from 'node:fs/promises';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { TortoiseGameHostComponent } from '../../../../src/app/components/tortoise-game-host/tortoise-game-host.component';
import { HomeButtonComponent } from '../../../../src/app/components/home-button/home-button.component';
import { RewardGamesConfigService } from '../../../../src/app/services/reward-games-config.service';
import { TortoiseVisualizationComponent } from '../../../../src/app/components/tortoise-visualization/tortoise-visualization.component';
import { TortoiseGameConfig } from '../../../../src/app/models/tortoise-game-config.model';
import { SettingsService } from '../../../../src/app/services/settings.service';

const KNOWN_GAME_ID = 'tortoise-test-game';

const DEFAULT_CONFIG: TortoiseGameConfig = {
  gameId: KNOWN_GAME_ID,
  start: { col: 0, row: 4 },
  end: { col: 3, row: 4 },
  waypoints: [
    { col: 0, row: 4 },
    { col: 3, row: 4 }
  ],
  obstacles: [
    {
      position: { col: 2, row: 4 },
      clearCharactersByLayout: {
        'fr-ch': ['a'],
        'de-ch': ['a']
      }
    }
  ]
};

const BLOCKED_CONFIG: TortoiseGameConfig = {
  gameId: 'tortoise-blocked-game',
  start: { col: 0, row: 0 },
  end: { col: 2, row: 0 },
  waypoints: [
    { col: 0, row: 0 },
    { col: 2, row: 0 }
  ],
  obstacles: [
    {
      position: { col: 1, row: 0 },
      clearCharactersByLayout: {
        'fr-ch': ['a', 'b'],
        'de-ch': ['a', 'b']
      }
    }
  ]
};

const CLEAR_CONFIG: TortoiseGameConfig = {
  gameId: 'tortoise-clear-game',
  start: { col: 0, row: 0 },
  end: { col: 2, row: 0 },
  waypoints: [
    { col: 0, row: 0 },
    { col: 2, row: 0 }
  ],
  obstacles: []
};

class TestTranslateLoader implements TranslateLoader {
  getTranslation(_lang: string): Observable<TranslationObject> {
    return of({ homeButton: { label: 'Home', title: 'Go home' } });
  }
}

const resourceMap: Record<string, string> = {
  './tortoise-game-host.component.html': 'src/app/components/tortoise-game-host/tortoise-game-host.component.html',
  './tortoise-game-host.component.css': 'src/app/components/tortoise-game-host/tortoise-game-host.component.css',
  './home-button.component.html': 'src/app/components/home-button/home-button.component.html',
  './home-button.component.css': 'src/app/components/home-button/home-button.component.css',
  './tortoise-visualization.component.html': 'src/app/components/tortoise-visualization/tortoise-visualization.component.html',
  './tortoise-visualization.component.css': 'src/app/components/tortoise-visualization/tortoise-visualization.component.css'
};

describe('Tortoise Game Host Component Requirements', () => {
  let fixture: ComponentFixture<TortoiseGameHostComponent>;
  let paramMap$: ReplaySubject<ReturnType<typeof convertToParamMap>>;
  let routerStub: { navigateByUrl: ReturnType<typeof vi.fn> };
  let rewardGamesConfigServiceStub: { getTortoiseConfig: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    paramMap$ = new ReplaySubject(1);
    routerStub = { navigateByUrl: vi.fn() };
    rewardGamesConfigServiceStub = { getTortoiseConfig: vi.fn(() => DEFAULT_CONFIG) };

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
        { provide: RewardGamesConfigService, useValue: rewardGamesConfigServiceStub },
        {
          provide: SettingsService,
          useValue: {
            getStreamSizeValue: () => 0,
            getChosenLayout: () => 'fr-ch'
          }
        }
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
    rewardGamesConfigServiceStub.getTortoiseConfig.mockReturnValueOnce(undefined);
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

    const homeButtonEl = fixture.debugElement.query(By.directive(HomeButtonComponent));

    expect(homeButtonEl?.componentInstance?.destination).toBe('/reward-games');
  });

  test('passes loaded configuration to the tortoise visualization component', async () => {
    paramMap$.next(convertToParamMap({ gameId: KNOWN_GAME_ID }));
    fixture.detectChanges();
    await fixture.whenStable();

    const vizEl = fixture.nativeElement.querySelector('app-tortoise-visualization');
    expect(vizEl).not.toBeNull();
  });

  test('renders the start button under the game field and keeps it enabled while idle', async () => {
    paramMap$.next(convertToParamMap({ gameId: KNOWN_GAME_ID }));
    fixture.detectChanges();
    await fixture.whenStable();

    const renderArea = fixture.nativeElement.querySelector('.tortoise-game-host-render-area') as HTMLElement;
    const controls = fixture.nativeElement.querySelector('.tortoise-game-host-controls') as HTMLElement;
    const startButton = fixture.nativeElement.querySelector('.runtime-button') as HTMLButtonElement;

    expect(renderArea).not.toBeNull();
    expect(controls).not.toBeNull();
    expect(startButton).not.toBeNull();
    expect(startButton.disabled).toBe(false);
    expect(renderArea.compareDocumentPosition(controls) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
  });

  test('shows obstacle characters only while running and never shows status words', async () => {
    rewardGamesConfigServiceStub.getTortoiseConfig.mockReturnValueOnce(BLOCKED_CONFIG);
    paramMap$.next(convertToParamMap({ gameId: BLOCKED_CONFIG.gameId }));
    fixture.detectChanges();
    await fixture.whenStable();

    const obstacleBoxIdle = fixture.nativeElement.querySelector('.tortoise-game-host-obstacle-box') as HTMLElement;
    expect(obstacleBoxIdle).not.toBeNull();

    fixture.componentInstance.startGame();
    fixture.detectChanges();
    await fixture.whenStable();

    const obstacleBox = fixture.nativeElement.querySelector('.tortoise-game-host-obstacle-box') as HTMLElement;
    expect(obstacleBox).not.toBeNull();
    expect(obstacleBox.textContent?.replace(/\s+/g, '')).toBe('ab');
    expect((obstacleBox.textContent ?? '').toLowerCase()).not.toContain('blocked');
    expect((obstacleBox.textContent ?? '').toLowerCase()).not.toContain('running');
  });

  test('typing clears a blocking obstacle without using virtual keyboard UI', async () => {
    rewardGamesConfigServiceStub.getTortoiseConfig.mockReturnValueOnce(BLOCKED_CONFIG);
    paramMap$.next(convertToParamMap({ gameId: BLOCKED_CONFIG.gameId }));
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance.startGame();
    fixture.detectChanges();

    expect(fixture.componentInstance.movementState).toBe('blocked');
    expect(fixture.nativeElement.querySelector('.keyboard-display')).toBeNull();

    const gameContent = fixture.nativeElement.querySelector('.tortoise-game-host-content') as HTMLElement;
    gameContent.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.typedObstacleChars).toEqual(['a']);

    gameContent.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.movementState).toBe('moving');
    expect(fixture.componentInstance.clearedObstacleKeys).toContain('1,0');
  });

  test('reaching the end leaves the host in completed state without extra navigation', async () => {
    rewardGamesConfigServiceStub.getTortoiseConfig.mockReturnValueOnce(CLEAR_CONFIG);
    paramMap$.next(convertToParamMap({ gameId: CLEAR_CONFIG.gameId }));
    fixture.detectChanges();
    await fixture.whenStable();

    const visualization = fixture.debugElement.query(By.directive(TortoiseVisualizationComponent))
      .componentInstance as TortoiseVisualizationComponent;

    fixture.componentInstance.startGame();
    await fixture.whenStable();
    visualization.onTortoiseTransitionEnd();
    await fixture.whenStable();
    visualization.onTortoiseTransitionEnd();
    await fixture.whenStable();

    expect(fixture.componentInstance.gameState).toBe('completed');
    expect(fixture.componentInstance.movementState).toBe('idle');
    expect(fixture.nativeElement.querySelector('.tortoise-game-host-obstacle-box')).not.toBeNull();
    expect(routerStub.navigateByUrl).not.toHaveBeenCalledWith('/reward-games');
  });
});
