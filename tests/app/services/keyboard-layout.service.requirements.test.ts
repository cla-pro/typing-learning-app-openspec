import { beforeEach, describe, expect, test } from 'vitest';

import { KeyboardLayoutService } from '../../../src/app/services/keyboard-layout.service';

describe('KeyboardLayoutService Requirements', () => {
  let service: KeyboardLayoutService;

  beforeEach(() => {
    localStorage.clear();
    service = new KeyboardLayoutService();
  });

  test('returns fr-ch and de-ch as the initial supported layouts', () => {
    const layouts = service.getSupportedLayouts();

    expect(layouts).toEqual(['fr-ch', 'de-ch']);
  });

  test('returns fr-ch as the initial chosen layout', () => {
    const chosen = service.getChosenLayout();

    expect(chosen).toBe('fr-ch');
  });

  test('chosen layout is one of the supported layouts', () => {
    const supported = service.getSupportedLayouts();
    const chosen = service.getChosenLayout();

    expect(supported).toContain(chosen);
  });

  test('restores a persisted supported chosen layout', () => {
    localStorage.setItem('layout.selected', 'de-ch');

    const restoredService = new KeyboardLayoutService();

    expect(restoredService.getChosenLayout()).toBe('de-ch');
  });

  test('falls back to fr-ch for an unsupported persisted layout', () => {
    localStorage.setItem('layout.selected', 'invalid-layout');

    const restoredService = new KeyboardLayoutService();

    expect(restoredService.getChosenLayout()).toBe('fr-ch');
  });

  test('updates and persists the chosen layout for supported values', () => {
    service.setChosenLayout('de-ch');

    expect(service.getChosenLayout()).toBe('de-ch');
    expect(localStorage.getItem('layout.selected')).toBe('de-ch');
  });

  test('ignores unsupported chosen layout updates', () => {
    service.setChosenLayout('de-ch');
    service.setChosenLayout('unsupported-layout');

    expect(service.getChosenLayout()).toBe('de-ch');
    expect(localStorage.getItem('layout.selected')).toBe('de-ch');
  });
});
