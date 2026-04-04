import { Injectable } from '@angular/core';

import { KEYMAPS_BY_LAYOUT, SUPPORTED_KEYBOARD_LAYOUT_IDS } from '../data/keyboard-layouts';
import { KeyboardLayoutKeymap } from '../models/keyboard-layout.model';

@Injectable({ providedIn: 'root' })
export class KeyboardLayoutService {
  getSupportedLayouts(): string[] {
    return [...SUPPORTED_KEYBOARD_LAYOUT_IDS];
  }

  getKeymap(layout: string): KeyboardLayoutKeymap | null {
    return KEYMAPS_BY_LAYOUT[layout] ?? null;
  }
}
