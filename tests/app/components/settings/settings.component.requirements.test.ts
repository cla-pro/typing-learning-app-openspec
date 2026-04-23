import { importProvidersFrom, ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService, TranslationObject } from '@ngx-translate/core';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Observable, firstValueFrom, of } from 'rxjs';
import { readFile } from 'node:fs/promises';

import { SettingsComponent } from '../../../../src/app/components/settings/settings.component';
import { LanguageService } from '../../../../src/app/services/language.service';
import { SettingsService } from '../../../../src/app/services/settings.service';

const translations = {
  'fr-ch': {
    settings: {
      title: 'Paramètres',
      layoutLabel: 'Disposition du clavier',
      languageLabel: 'Langue',
      streamSizeLabel: 'Taille du flux',
      streamSizeAria: 'Ajuster la taille du flux de caractères attendu',
      languages: {
        'de-ch': 'Allemand (Suisse)',
        'en-us': 'Anglais (États-Unis)',
        'fr-ch': 'Français (Suisse)'
      }
    },
    homeButton: {
      label: 'Accueil',
      title: "Retour à l'accueil"
    }
  }
};

class TestTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return of(translations[lang as keyof typeof translations] ?? {});
  }
}

const resourceMap: Record<string, string> = {
  './settings.component.html': 'src/app/components/settings/settings.component.html',
  './settings.component.css': 'src/app/components/settings/settings.component.css',
  './home-button.component.html': 'src/app/components/home-button/home-button.component.html',
  './home-button.component.css': 'src/app/components/home-button/home-button.component.css'
};

describe('Settings Component Requirements', () => {
  let fixture: ComponentFixture<SettingsComponent>;

  const settingsStub = {
    getSupportedLayouts: vi.fn(() => ['fr-ch', 'de-ch']),
    getChosenLayout: vi.fn(() => 'fr-ch'),
    setChosenLayout: vi.fn(),
    getStreamSizeValue: vi.fn(() => 0.4),
    getStreamSizeMin: vi.fn(() => 0),
    getStreamSizeMax: vi.fn(() => 1.5)
  };

  const languageStub = {
    getSupportedLanguages: vi.fn(() => ['en-us', 'fr-ch', 'de-ch']),
    getChosenLanguage: vi.fn(() => 'fr-ch'),
    setChosenLanguage: vi.fn(() => Promise.resolve())
  };

  beforeEach(async () => {
    settingsStub.getSupportedLayouts.mockClear();
    settingsStub.getChosenLayout.mockClear();
    settingsStub.setChosenLayout.mockClear();
    settingsStub.getStreamSizeValue.mockClear();
    settingsStub.getStreamSizeMin.mockClear();
    settingsStub.getStreamSizeMax.mockClear();
    languageStub.getSupportedLanguages.mockClear();
    languageStub.getChosenLanguage.mockClear();
    languageStub.setChosenLanguage.mockClear();

    TestBed.resetTestingModule();
    await resolveComponentResources(async (url: string) => readFile(resourceMap[url] ?? url, 'utf8'));

    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
      providers: [
        provideRouter([]),
        importProvidersFrom(
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useClass: TestTranslateLoader
            },
            fallbackLang: 'en-us'
          })
        ),
        {
          provide: SettingsService,
          useValue: settingsStub
        },
        {
          provide: LanguageService,
          useValue: languageStub
        }
      ]
    }).compileComponents();

    await firstValueFrom(TestBed.inject(TranslateService).use('fr-ch'));
    fixture = TestBed.createComponent(SettingsComponent);
    fixture.detectChanges();
  });

  test('renders localized settings labels and the language selector', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent?.trim()).toBe('Paramètres');
    expect(element.querySelector('label[for="settings-layout"]')?.textContent?.trim()).toBe('Disposition du clavier');
    expect(element.querySelector('label[for="settings-language"]')?.textContent?.trim()).toBe('Langue');
    expect(element.querySelector('label[for="settings-stream-size"]')?.textContent?.trim()).toBe('Taille du flux');

    const languageSelect = element.querySelector('#settings-language') as HTMLSelectElement | null;
    expect(languageSelect).not.toBeNull();
    expect(Array.from(languageSelect?.options ?? []).map(option => option.textContent?.trim())).toEqual([
      'Anglais (États-Unis)',
      'Français (Suisse)',
      'Allemand (Suisse)'
    ]);
  });

  test('applies language changes through LanguageService when selector changes', async () => {
    const languageSelect = fixture.nativeElement.querySelector('#settings-language') as HTMLSelectElement;

    languageSelect.value = 'en-us';
    languageSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    await Promise.resolve();

    expect(languageStub.setChosenLanguage).toHaveBeenCalledWith('en-us');
  });
});