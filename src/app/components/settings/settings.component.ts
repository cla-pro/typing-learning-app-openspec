import { Component, inject } from '@angular/core';

import { HomeButtonComponent } from '../home-button/home-button.component';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  imports: [HomeButtonComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  private readonly settingsService = inject(SettingsService);

  supportedLayouts: string[];
  selectedLayout: string;
  streamSizeValue: number;

  constructor() {
    this.supportedLayouts = this.settingsService.getSupportedLayouts();
    this.selectedLayout = this.settingsService.getChosenLayout();
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

  onStreamSizeInput(event: Event): void {
    const nextValue = Number((event.target as HTMLInputElement | null)?.value);

    this.settingsService.setStreamSizeValue(nextValue);
    this.streamSizeValue = this.settingsService.getStreamSizeValue();
  }
}
