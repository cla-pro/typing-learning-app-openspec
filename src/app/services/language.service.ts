import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { SettingsService, UiLanguageId } from './settings.service';

const FALLBACK_LANGUAGE: UiLanguageId = 'en-us';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly settingsService = inject(SettingsService);
  private readonly translateService = inject(TranslateService);

  constructor() {
    this.translateService.addLangs(this.settingsService.getSupportedLanguages());
  }

  async init(): Promise<void> {
    await firstValueFrom(this.translateService.setFallbackLang(FALLBACK_LANGUAGE));
    await this.useLanguage(this.settingsService.getChosenLanguage(), false);
  }

  getSupportedLanguages(): UiLanguageId[] {
    return this.settingsService.getSupportedLanguages();
  }

  getChosenLanguage(): UiLanguageId {
    return this.settingsService.getChosenLanguage();
  }

  async setChosenLanguage(language: string): Promise<void> {
    await this.useLanguage(language, true);
  }

  private async useLanguage(language: string, persistSelection: boolean): Promise<void> {
    const currentLanguage = this.resolveLanguage(language);

    if (persistSelection) {
      this.settingsService.setChosenLanguage(currentLanguage);
    }

    await firstValueFrom(this.translateService.use(currentLanguage));
  }

  private resolveLanguage(language: string): UiLanguageId {
    const supportedLanguages = this.settingsService.getSupportedLanguages();

    if (supportedLanguages.includes(language as UiLanguageId)) {
      return language as UiLanguageId;
    }

    return this.settingsService.getChosenLanguage();
  }
}