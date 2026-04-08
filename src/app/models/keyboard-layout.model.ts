export interface KeyboardKey {
  value: string;
  label: string;
  width?: 'normal' | 'wide' | 'extra-wide';
  shiftValue?: string;
  shiftLabel?: string;
  altGrValue?: string;
  altGrLabel?: string;
}

export interface KeyboardRow {
  keys: KeyboardKey[];
}

export interface KeyboardLayoutKeymap {
  id: string;
  rows: KeyboardRow[];
}
