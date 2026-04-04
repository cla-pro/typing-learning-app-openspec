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

  get keymap(): KeyboardLayoutKeymap | null {
    return this.keyboardLayoutService.getKeymap(this.selectedLayout);
  }

  isKeyEnabled(key: KeyboardKey): boolean {
    return this.impactedKeys.includes(key.value);
  }
}
