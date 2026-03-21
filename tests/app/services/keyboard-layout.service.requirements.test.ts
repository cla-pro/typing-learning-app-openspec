import { beforeEach, describe, expect, test } from 'vitest';

import { KeyboardLayoutService } from '../../../src/app/services/keyboard-layout.service';

describe('KeyboardLayoutService Requirements', () => {
  let service: KeyboardLayoutService;

  beforeEach(() => {
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
});
