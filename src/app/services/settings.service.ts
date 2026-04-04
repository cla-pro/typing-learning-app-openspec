import { Injectable } from '@angular/core';

import { SUPPORTED_KEYBOARD_LAYOUT_IDS } from '../data/keyboard-layouts';

const STREAM_SIZE_MIN: number = 0;
const STREAM_SIZE_MAX: number = 1;

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private static readonly LAYOUT_STORAGE_KEY = 'layout.selected';
  private static readonly STREAM_SIZE_STORAGE_KEY = 'exercise.streamSizeValue';

  private readonly supportedLayouts = SUPPORTED_KEYBOARD_LAYOUT_IDS;
  private chosenLayout = this.readInitialLayout();
  private streamSizeValue = this.readInitialStreamSize();

  getSupportedLayouts(): string[] {
    return [...this.supportedLayouts];
  }

  getChosenLayout(): string {
    return this.chosenLayout;
  }

  setChosenLayout(layout: string): void {
    if (!this.supportedLayouts.includes(layout)) {
      return;
    }

    this.chosenLayout = layout;
    this.writeStoredLayout(layout);
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
