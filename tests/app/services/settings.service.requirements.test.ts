import { beforeEach, describe, expect, test } from 'vitest';

import { SettingsService } from '../../../src/app/services/settings.service';

describe('SettingsService Requirements', () => {
  let service: SettingsService;

  beforeEach(() => {
    localStorage.clear();
    service = new SettingsService();
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

    const restoredService = new SettingsService();

    expect(restoredService.getChosenLayout()).toBe('de-ch');
  });

  test('falls back to fr-ch for an unsupported persisted layout', () => {
    localStorage.setItem('layout.selected', 'invalid-layout');

    const restoredService = new SettingsService();

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

  test('returns baseline stream size by default', () => {
    expect(service.getStreamSizeValue()).toBe(0);
  });

  test('restores persisted stream size and keeps existing key name', () => {
    localStorage.setItem('exercise.streamSizeValue', '0.4');

    const restoredService = new SettingsService();

    expect(restoredService.getStreamSizeValue()).toBe(0.4);
  });

  test('falls back to baseline for invalid persisted stream size', () => {
    localStorage.setItem('exercise.streamSizeValue', 'invalid');

    const restoredService = new SettingsService();

    expect(restoredService.getStreamSizeValue()).toBe(0);
  });

  test('updates and persists stream size for valid values', () => {
    service.setStreamSizeValue(0.5);

    expect(service.getStreamSizeValue()).toBe(0.5);
    expect(localStorage.getItem('exercise.streamSizeValue')).toBe('0.5');
  });

  test('clamps stream size updates to supported range', () => {
    service.setStreamSizeValue(-1);
    expect(service.getStreamSizeValue()).toBe(0);

    service.setStreamSizeValue(2);
    expect(service.getStreamSizeValue()).toBe(1.5);
  });
});
