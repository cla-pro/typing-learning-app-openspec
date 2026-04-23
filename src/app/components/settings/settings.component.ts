import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HomeButtonComponent } from '../home-button/home-button.component';
import { LanguageService } from '../../services/language.service';
import { SettingsService, UiLanguageId } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  imports: [HomeButtonComponent, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  private readonly languageService = inject(LanguageService);
  private readonly settingsService = inject(SettingsService);

  supportedLayouts: string[];
  supportedLanguages: UiLanguageId[];
  selectedLayout: string;
  selectedLanguage: UiLanguageId;
  streamSizeValue: number;

  constructor() {
    this.supportedLayouts = this.settingsService.getSupportedLayouts();
    this.supportedLanguages = this.languageService.getSupportedLanguages();
    this.selectedLayout = this.settingsService.getChosenLayout();
    this.selectedLanguage = this.languageService.getChosenLanguage();
    this.streamSizeValue = this.settingsService.getStreamSizeValue();
  }

  get streamSizeMin(): number {
    return this.settingsService.getStreamSizeMin();
  }

  get streamSizeMax(): number {
    return this.settingsService.getStreamSizeMax();
  }

  onLayoutChange(event: Event): void {
    const nextLayout = (event.target as HTMLSelectElement | null)?.value;

    if (!nextLayout) {
      return;
    }

    this.settingsService.setChosenLayout(nextLayout);
    this.selectedLayout = this.settingsService.getChosenLayout();
  }

  onLanguageChange(event: Event): void {
    const nextLanguage = (event.target as HTMLSelectElement | null)?.value as UiLanguageId | undefined;

    if (!nextLanguage) {
      return;
    }

    this.selectedLanguage = nextLanguage;
    void this.languageService.setChosenLanguage(nextLanguage);
  }

  onStreamSizeInput(event: Event): void {
    const nextValue = Number((event.target as HTMLInputElement | null)?.value);

    this.settingsService.setStreamSizeValue(nextValue);
    this.streamSizeValue = this.settingsService.getStreamSizeValue();
  }
}
