import { Injectable } from '@angular/core';

import { SUPPORTED_KEYBOARD_LAYOUT_IDS } from '../data/keyboard-layouts';

const STREAM_SIZE_MIN: number = 0;
const STREAM_SIZE_MAX: number = 1.5;
const DEFAULT_LANGUAGE = 'fr-ch';

export const SUPPORTED_UI_LANGUAGE_IDS = ['en-us', 'fr-ch', 'de-ch'] as const;
export type UiLanguageId = (typeof SUPPORTED_UI_LANGUAGE_IDS)[number];

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private static readonly LAYOUT_STORAGE_KEY = 'layout.selected';
  private static readonly STREAM_SIZE_STORAGE_KEY = 'exercise.streamSizeValue';
  private static readonly LANGUAGE_STORAGE_KEY = 'language.selected';

  private readonly supportedLayouts = SUPPORTED_KEYBOARD_LAYOUT_IDS;
  private readonly supportedLanguages = SUPPORTED_UI_LANGUAGE_IDS;
  private chosenLayout = this.readInitialLayout();
  private chosenLanguage = this.readInitialLanguage();
  private streamSizeValue = this.readInitialStreamSize();

  getSupportedLayouts(): string[] {
    return [...this.supportedLayouts];
  }

  getChosenLayout(): string {
    return this.chosenLayout;
  }

  getSupportedLanguages(): UiLanguageId[] {
    return [...this.supportedLanguages];
  }

  getChosenLanguage(): UiLanguageId {
    return this.chosenLanguage;
  }

  setChosenLayout(layout: string): void {
    if (!this.supportedLayouts.includes(layout)) {
      return;
    }

    this.chosenLayout = layout;
    this.writeStoredLayout(layout);
  }

  setChosenLanguage(language: string): void {
    if (!this.supportedLanguages.includes(language as UiLanguageId)) {
      return;
    }

    this.chosenLanguage = language as UiLanguageId;
    this.writeStoredLanguage(this.chosenLanguage);
  }

  getStreamSizeMin(): number {
    return STREAM_SIZE_MIN;
  }

  getStreamSizeMax(): number {
    return STREAM_SIZE_MAX;
  }

  getStreamSizeValue(): number {
    return this.streamSizeValue;
  }

  setStreamSizeValue(value: number): void {
    this.streamSizeValue = this.coerceStreamSizeValue(value);
    this.writeStoredStreamSize(this.streamSizeValue);
  }

  private readInitialLayout(): string {
    const storedLayout = this.readStoredLayout();

    if (storedLayout && this.supportedLayouts.includes(storedLayout)) {
      return storedLayout;
    }

    return 'fr-ch';
  }

  private readInitialStreamSize(): number {
    const storedValue = this.readStoredStreamSize();
    return this.coerceStreamSizeValue(Number(storedValue));
  }

  private readInitialLanguage(): UiLanguageId {
    const storedLanguage = this.readStoredLanguage();

    if (storedLanguage && this.supportedLanguages.includes(storedLanguage as UiLanguageId)) {
      return storedLanguage as UiLanguageId;
    }

    return DEFAULT_LANGUAGE;
  }

  private coerceStreamSizeValue(value: number): number {
    if (!Number.isFinite(value)) {
      return STREAM_SIZE_MIN;
    }

    return Math.min(STREAM_SIZE_MAX, Math.max(STREAM_SIZE_MIN, value));
  }

  private readStoredLayout(): string | null {
    try {
      return globalThis.localStorage?.getItem(SettingsService.LAYOUT_STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }

  private writeStoredLayout(layout: string): void {
    try {
      globalThis.localStorage?.setItem(SettingsService.LAYOUT_STORAGE_KEY, layout);
    } catch {
      // Ignore storage failures and keep the in-memory selection.
    }
  }

  private readStoredLanguage(): string | null {
    try {
      return globalThis.localStorage?.getItem(SettingsService.LANGUAGE_STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }

  private writeStoredLanguage(language: UiLanguageId): void {
    try {
      globalThis.localStorage?.setItem(SettingsService.LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage failures and keep the in-memory selection.
    }
  }

  private readStoredStreamSize(): string | null {
    try {
      return globalThis.localStorage?.getItem(SettingsService.STREAM_SIZE_STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }

  private writeStoredStreamSize(value: number): void {
    try {
      globalThis.localStorage?.setItem(SettingsService.STREAM_SIZE_STORAGE_KEY, value.toString());
    } catch {
      // Ignore storage failures and keep the in-memory selection.
    }
  }
}
