import { describe, expect, test } from 'vitest';

import { KeyboardLayoutService } from '../../../src/app/services/keyboard-layout.service';

describe('KeyboardLayoutService Requirements', () => {
  test('returns fr-ch and de-ch as supported layouts', () => {
    const service = new KeyboardLayoutService();

    expect(service.getSupportedLayouts()).toEqual(['fr-ch', 'de-ch']);
  });

  test('returns raw row-and-key keymap data for a supported layout', () => {
    const service = new KeyboardLayoutService();

    const keymap = service.getKeymap('fr-ch');

    expect(keymap).not.toBeNull();
    expect(keymap?.id).toBe('fr-ch');
    expect(Array.isArray(keymap?.rows)).toBe(true);
    expect(keymap?.rows.length).toBeGreaterThan(0);
    expect(keymap?.rows[0]?.keys.length).toBeGreaterThan(0);
  });

  test('returns null for unsupported layout keymap request', () => {
    const service = new KeyboardLayoutService();

    expect(service.getKeymap('unsupported-layout')).toBeNull();
  });

  test('raw keymap includes visible non-typing keys', () => {
    const service = new KeyboardLayoutService();
    const keymap = service.getKeymap('de-ch');
    const values = keymap?.rows.flatMap(row => row.keys.map(key => key.value)) ?? [];

    expect(values).toContain('TAB');
    expect(values).toContain('SHIFT');
    expect(values).toContain('ENTER');
    expect(values).toContain(' ');
  });
});
