import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from 'vitest';

import { KeyboardDisplayComponent } from '../../../../src/app/components/keyboard-display/keyboard-display.component';
import { KeyboardLayoutService } from '../../../../src/app/services/keyboard-layout.service';

describe('KeyboardDisplayComponent Requirements', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [KeyboardLayoutService]
    }).compileComponents();
  });

  test('resolves selected layout keymap with expected legends', () => {
    const component = TestBed.runInInjectionContext(() => new KeyboardDisplayComponent());

    component.selectedLayout = 'de-ch';
    component.impactedKeys = ['A', 'Ö', ' '];
    const labels = component.keymap?.rows.flatMap(row => row.keys.map(key => key.label)) ?? [];

    expect(labels).toContain('Ö');
    expect(labels).toContain('Tab');
    expect(labels).toContain('Space');
  });

  test('marks only impacted keys as enabled', () => {
    const component = TestBed.runInInjectionContext(() => new KeyboardDisplayComponent());

    component.selectedLayout = 'fr-ch';
    component.impactedKeys = ['A'];

    const activeA = { value: 'A', label: 'A' };
    const inactiveQ = { value: 'Q', label: 'Q' };

    expect(component.isKeyEnabled(activeA)).toBe(true);
    expect(component.isKeyEnabled(inactiveQ)).toBe(false);
  });

  test('isKeyPressed returns true for matching key value and false for non-matching', () => {
    const component = TestBed.runInInjectionContext(() => new KeyboardDisplayComponent());

    component.lastPressedKey = 'a';

    expect(component.isKeyPressed({ value: 'a', label: 'A' })).toBe(true);
    expect(component.isKeyPressed({ value: 'b', label: 'B' })).toBe(false);
  });

  test('isKeyPressed matches case-insensitively to handle Shift and Caps Lock modifiers', () => {
    const component = TestBed.runInInjectionContext(() => new KeyboardDisplayComponent());

    component.lastPressedKey = 'A';
    expect(component.isKeyPressed({ value: 'a', label: 'A' })).toBe(true);

    component.lastPressedKey = 'a';
    expect(component.isKeyPressed({ value: 'A', label: 'A' })).toBe(true);
  });

  test('isKeyPressed returns false when no key has been pressed', () => {
    const component = TestBed.runInInjectionContext(() => new KeyboardDisplayComponent());

    expect(component.isKeyPressed({ value: 'a', label: 'A' })).toBe(false);
  });

  test('getDisplayLabel returns shiftLabel when isShiftActive and key has shiftLabel', () => {
    const component = TestBed.runInInjectionContext(() => new KeyboardDisplayComponent());
    component.isShiftActive = true;

    expect(component.getDisplayLabel({ value: '1', label: '1', shiftValue: '+', shiftLabel: '+' })).toBe('+');
  });

  test('getDisplayLabel returns altGrLabel when isAltGrActive and key has altGrLabel', () => {
    const component = TestBed.runInInjectionContext(() => new KeyboardDisplayComponent());
    component.isAltGrActive = true;

    expect(component.getDisplayLabel({ value: '2', label: '2', altGrValue: '@', altGrLabel: '@' })).toBe('@');
  });

  test('getDisplayLabel falls back to primary label when modifier is active but key has no layer label', () => {
    const component = TestBed.runInInjectionContext(() => new KeyboardDisplayComponent());
    component.isShiftActive = true;

    expect(component.getDisplayLabel({ value: 'A', label: 'A' })).toBe('A');
  });

  test('isKeyPressed matches lastPressedKey against shiftValue', () => {
    const component = TestBed.runInInjectionContext(() => new KeyboardDisplayComponent());
    component.lastPressedKey = '+';

    expect(component.isKeyPressed({ value: '1', label: '1', shiftValue: '+', shiftLabel: '+' })).toBe(true);
    expect(component.isKeyPressed({ value: '2', label: '2', shiftValue: '"', shiftLabel: '"' })).toBe(false);
  });

  test('isKeyPressed matches lastPressedKey against altGrValue', () => {
    const component = TestBed.runInInjectionContext(() => new KeyboardDisplayComponent());
    component.lastPressedKey = '@';

    expect(component.isKeyPressed({ value: '2', label: '2', altGrValue: '@', altGrLabel: '@' })).toBe(true);
    expect(component.isKeyPressed({ value: '1', label: '1', altGrValue: '¦', altGrLabel: '¦' })).toBe(false);
  });
});
