import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from '../../../src/app/services/language.service';
import { SettingsService } from '../../../src/app/services/settings.service';

describe('LanguageService Requirements', () => {
  const settingsStub = {
    getSupportedLanguages: vi.fn(() => ['en-us', 'fr-ch', 'de-ch']),
    getChosenLanguage: vi.fn(() => 'fr-ch'),
    setChosenLanguage: vi.fn()
  };

  const translateStub = {
    addLangs: vi.fn(),
    setFallbackLang: vi.fn(() => of({})),
    use: vi.fn(() => of({}))
  };

  let service: LanguageService;

  beforeEach(() => {
    settingsStub.getSupportedLanguages.mockReturnValue(['en-us', 'fr-ch', 'de-ch']);
    settingsStub.getChosenLanguage.mockReturnValue('fr-ch');
    settingsStub.setChosenLanguage.mockClear();
    translateStub.addLangs.mockClear();
    translateStub.setFallbackLang.mockClear();
    translateStub.use.mockClear();

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        {
          provide: SettingsService,
          useValue: settingsStub
        },
        {
          provide: TranslateService,
          useValue: translateStub
        }
      ]
    });

    service = TestBed.inject(LanguageService);
  });

  test('registers supported languages when constructed', () => {
    expect(translateStub.addLangs).toHaveBeenCalledWith(['en-us', 'fr-ch', 'de-ch']);
  });

  test('restores the persisted language during startup initialization', async () => {
    settingsStub.getChosenLanguage.mockReturnValue('de-ch');

    await service.init();

    expect(translateStub.setFallbackLang).toHaveBeenCalledWith('en-us');
    expect(translateStub.use).toHaveBeenCalledWith('de-ch');
  });

  test('persists and applies language changes at runtime', async () => {
    await service.setChosenLanguage('en-us');

    expect(settingsStub.setChosenLanguage).toHaveBeenCalledWith('en-us');
    expect(translateStub.use).toHaveBeenCalledWith('en-us');
  });
});