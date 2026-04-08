import { Component, Input, inject } from '@angular/core';

import { KeyboardLayoutService } from '../../services/keyboard-layout.service';
import { KeyboardKey, KeyboardLayoutKeymap } from '../../models/keyboard-layout.model';

@Component({
    selector: 'app-keyboard-display',
    templateUrl: './keyboard-display.component.html',
    styleUrls: ['./keyboard-display.component.css']
})
export class KeyboardDisplayComponent {
  private readonly keyboardLayoutService = inject(KeyboardLayoutService);

  @Input() selectedLayout: string = 'fr-ch';
  @Input() impactedKeys: string[] = [];
  @Input() lastPressedKey: string = '';
  @Input() isLastKeyWrong: boolean = false;
  @Input() isShiftActive: boolean = false;
  @Input() isAltGrActive: boolean = false;

  get keymap(): KeyboardLayoutKeymap | null {
    return this.keyboardLayoutService.getKeymap(this.selectedLayout);
  }

  isKeyEnabled(key: KeyboardKey): boolean {
    return this.impactedKeys.includes(key.value);
  }

  getDisplayLabel(key: KeyboardKey): string {
    if (this.isShiftActive && key.shiftLabel) return key.shiftLabel;
    if (this.isAltGrActive && key.altGrLabel) return key.altGrLabel;
    return key.label;
  }

  isKeyPressed(key: KeyboardKey): boolean {
    if (!this.lastPressedKey) return false;
    const lp = this.lastPressedKey;
    return key.value.toLowerCase() === lp.toLowerCase()
      || (!!key.shiftValue && key.shiftValue === lp)
      || (!!key.altGrValue && key.altGrValue === lp);
  }
}
