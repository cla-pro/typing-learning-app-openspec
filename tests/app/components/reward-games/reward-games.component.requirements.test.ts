import { Component, importProvidersFrom, ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService, TranslationObject } from '@ngx-translate/core';
import { Observable, firstValueFrom, of } from 'rxjs';
import { beforeEach, describe, expect, test } from 'vitest';
import { readFile } from 'node:fs/promises';

import { RewardGamesComponent } from '../../../../src/app/components/reward-games/reward-games.component';
import { TORTOISE_GAME_CONFIGS } from '../../../../src/app/data/tortoise-game-configs';

const TORTOISE_GAME_ID = TORTOISE_GAME_CONFIGS[0].gameId;

const translations = {
  'fr-ch': {
    homeButton: {
      label: 'Accueil',
      title: "Retour à l'accueil"
    },
    rewardGames: {
      title: 'Jeux bonus',
      lockedIntro: "Gagnez plus d'étoiles pour débloquer ces jeux bonus.",
      lockedStatus: 'Verrouillé',
      games: {
        tortoiseForestPath: 'Sentier de la tortue',
        meteorDash: 'Course de météores',
        bubbleSorter: 'Trieur de bulles',
        keyGarden: 'Jardin des touches'
      }
    }
  }
};

class TestTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return of(translations[lang as keyof typeof translations] ?? {});
  }
}

const resourceMap: Record<string, string> = {
  './reward-games.component.html': 'src/app/components/reward-games/reward-games.component.html',
  './reward-games.component.css': 'src/app/components/reward-games/reward-games.component.css',
  './home-button.component.html': 'src/app/components/home-button/home-button.component.html',
  './home-button.component.css': 'src/app/components/home-button/home-button.component.css'
};

@Component({ template: '' })
class DummyHomeComponent {}

@Component({ template: '' })
class DummyTortoiseGameHostComponent {}

describe('Reward Games Component Requirements', () => {
  let fixture: ComponentFixture<RewardGamesComponent>;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await resolveComponentResources(async (url: string) => readFile(resourceMap[url] ?? url, 'utf8'));

    await TestBed.configureTestingModule({
      imports: [RewardGamesComponent],
      providers: [
        importProvidersFrom(
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useClass: TestTranslateLoader
            },
            fallbackLang: 'en-us'
          })
        ),
        provideRouter([
          { path: '', component: DummyHomeComponent },
          { path: 'reward-games', component: RewardGamesComponent },
          { path: `reward-games/tortoise/${TORTOISE_GAME_ID}`, component: DummyTortoiseGameHostComponent }
        ])
      ]
    }).compileComponents();

    await firstValueFrom(TestBed.inject(TranslateService).use('fr-ch'));
    fixture = TestBed.createComponent(RewardGamesComponent);
    fixture.detectChanges();
  });

  test('renders localized heading, intro text, and all configured reward game entries', () => {
    const element = fixture.nativeElement as HTMLElement;
    const cards = Array.from(element.querySelectorAll('.reward-games-card'));

    expect(element.querySelector('h1')?.textContent?.trim()).toBe('Jeux bonus');
    expect(element.querySelector('.reward-games-intro')?.textContent?.trim()).toBe("Gagnez plus d'étoiles pour débloquer ces jeux bonus.");
    expect(cards).toHaveLength(4);
  });

  test('shows locked reward game entries as non-interactive cards with a visible lock overlay', () => {
    const element = fixture.nativeElement as HTMLElement;
    const lockedCards = Array.from(element.querySelectorAll('.reward-games-card--locked'));

    expect(lockedCards).toHaveLength(3);
    expect(lockedCards.every(card => card.querySelector('.reward-games-lock')?.textContent?.trim() === '🔒')).toBe(true);
    expect(lockedCards.every(card => card.querySelector('a, button') === null)).toBe(true);
    expect(lockedCards.map(card => card.querySelector('.reward-games-status')?.textContent?.trim())).toEqual([
      'Verrouillé',
      'Verrouillé',
      'Verrouillé'
    ]);
  });

  test('renders the tortoise game entry as a launchable card without a lock overlay', () => {
    const element = fixture.nativeElement as HTMLElement;
    const cards = Array.from(element.querySelectorAll('.reward-games-card'));
    const tortoiseCard = cards.find(card => !card.classList.contains('reward-games-card--locked'));

    expect(tortoiseCard).toBeDefined();
    expect(tortoiseCard?.querySelector('.reward-games-lock')).toBeNull();
    expect(tortoiseCard?.querySelector('a')).not.toBeNull();
  });

  test('activating the tortoise game entry navigates to the corresponding game route', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const router = TestBed.inject(Router);
    const tortoiseLink = element.querySelector('.reward-games-card-link') as HTMLAnchorElement | null;

    tortoiseLink?.click();
    await fixture.whenStable();

    expect(router.url).toBe(`/reward-games/tortoise/${TORTOISE_GAME_ID}`);
  });

  test('renders the shared home button wired to the root route', async () => {
    const homeButton = fixture.nativeElement.querySelector('.home-button') as HTMLButtonElement | null;
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/reward-games');
    homeButton?.click();
    await fixture.whenStable();

    expect(homeButton?.textContent?.trim()).toBe('🏠 Accueil');
    expect(router.url).toBe('/');
  });
});
