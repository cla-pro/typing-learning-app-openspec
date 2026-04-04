export interface KeyboardKey {
  value: string;
  label: string;
  width?: 'normal' | 'wide' | 'extra-wide';
}

export interface KeyboardRow {
  keys: KeyboardKey[];
}

export interface KeyboardLayoutKeymap {
  id: string;
  rows: KeyboardRow[];
}
