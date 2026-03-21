import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KeyboardLayoutService {
  private static readonly STORAGE_KEY = 'layout.selected';

  private readonly supportedLayouts = ['fr-ch', 'de-ch'];
  private chosenLayout = this.readInitialLayout();

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

  private readInitialLayout(): string {
    const storedLayout = this.readStoredLayout();

    if (storedLayout && this.supportedLayouts.includes(storedLayout)) {
      return storedLayout;
    }

    return 'fr-ch';
  }

  private readStoredLayout(): string | null {
    try {
      return globalThis.localStorage?.getItem(KeyboardLayoutService.STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }

  private writeStoredLayout(layout: string): void {
    try {
      globalThis.localStorage?.setItem(KeyboardLayoutService.STORAGE_KEY, layout);
    } catch {
      // Ignore storage failures and keep the in-memory selection.
    }
  }
}
