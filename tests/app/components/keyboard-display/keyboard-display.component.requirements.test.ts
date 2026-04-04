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
});
