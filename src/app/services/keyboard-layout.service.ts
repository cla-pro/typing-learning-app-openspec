import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KeyboardLayoutService {
  getSupportedLayouts(): string[] {
    return ['fr-ch', 'de-ch'];
  }

  getChosenLayout(): string {
    return 'fr-ch';
  }
}
