import { KeyboardLayoutKeymap } from '../models/keyboard-layout.model';

const FR_CH_KEYMAP: KeyboardLayoutKeymap = {
  id: 'fr-ch',
  rows: [
    {
      keys: [
        { value: '^', label: '^' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '0', label: '0' },
        { value: "'", label: "'" },
        { value: '¨', label: '¨' },
        { value: 'BACKSPACE', label: 'Backspace', width: 'wide' }
      ]
    },
    {
      keys: [
        { value: 'TAB', label: 'Tab', width: 'wide' },
        { value: 'Q', label: 'Q' },
        { value: 'W', label: 'W' },
        { value: 'E', label: 'E' },
        { value: 'R', label: 'R' },
        { value: 'T', label: 'T' },
        { value: 'Z', label: 'Z' },
        { value: 'U', label: 'U' },
        { value: 'I', label: 'I' },
        { value: 'O', label: 'O' },
        { value: 'P', label: 'P' },
        { value: 'È', label: 'È' },
        { value: '+', label: '+' },
        { value: 'ENTER', label: 'Enter', width: 'wide' }
      ]
    },
    {
      keys: [
        { value: 'CAPS', label: 'Caps', width: 'wide' },
        { value: 'A', label: 'A' },
        { value: 'S', label: 'S' },
        { value: 'D', label: 'D' },
        { value: 'F', label: 'F' },
        { value: 'G', label: 'G' },
        { value: 'H', label: 'H' },
        { value: 'J', label: 'J' },
        { value: 'K', label: 'K' },
        { value: 'L', label: 'L' },
        { value: 'É', label: 'É' },
        { value: 'À', label: 'À' },
        { value: '$', label: '$' }
      ]
    },
    {
      keys: [
        { value: 'SHIFT', label: 'Shift', width: 'extra-wide' },
        { value: '<', label: '<' },
        { value: 'Y', label: 'Y' },
        { value: 'X', label: 'X' },
        { value: 'C', label: 'C' },
        { value: 'V', label: 'V' },
        { value: 'B', label: 'B' },
        { value: 'N', label: 'N' },
        { value: 'M', label: 'M' },
        { value: ',', label: ',' },
        { value: '.', label: '.' },
        { value: '-', label: '-' },
        { value: 'SHIFT', label: 'Shift', width: 'extra-wide' }
      ]
    },
    {
      keys: [
        { value: 'CTRL', label: 'Ctrl', width: 'wide' },
        { value: 'ALT', label: 'Alt', width: 'wide' },
        { value: ' ', label: 'Space', width: 'extra-wide' },
        { value: 'ALTGR', label: 'AltGr', width: 'wide' },
        { value: 'CTRL', label: 'Ctrl', width: 'wide' }
      ]
    }
  ]
};

const DE_CH_KEYMAP: KeyboardLayoutKeymap = {
  id: 'de-ch',
  rows: [
    {
      keys: [
        { value: '^', label: '^' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '0', label: '0' },
        { value: "'", label: "'" },
        { value: '`', label: '`' },
        { value: 'BACKSPACE', label: 'Backspace', width: 'wide' }
      ]
    },
    {
      keys: [
        { value: 'TAB', label: 'Tab', width: 'wide' },
        { value: 'Q', label: 'Q' },
        { value: 'W', label: 'W' },
        { value: 'E', label: 'E' },
        { value: 'R', label: 'R' },
        { value: 'T', label: 'T' },
        { value: 'Z', label: 'Z' },
        { value: 'U', label: 'U' },
        { value: 'I', label: 'I' },
        { value: 'O', label: 'O' },
        { value: 'P', label: 'P' },
        { value: 'Ü', label: 'Ü' },
        { value: '+', label: '+' },
        { value: 'ENTER', label: 'Enter', width: 'wide' }
      ]
    },
    {
      keys: [
        { value: 'CAPS', label: 'Caps', width: 'wide' },
        { value: 'A', label: 'A' },
        { value: 'S', label: 'S' },
        { value: 'D', label: 'D' },
        { value: 'F', label: 'F' },
        { value: 'G', label: 'G' },
        { value: 'H', label: 'H' },
        { value: 'J', label: 'J' },
        { value: 'K', label: 'K' },
        { value: 'L', label: 'L' },
        { value: 'Ö', label: 'Ö' },
        { value: 'Ä', label: 'Ä' },
        { value: '$', label: '$' }
      ]
    },
    {
      keys: [
        { value: 'SHIFT', label: 'Shift', width: 'extra-wide' },
        { value: '<', label: '<' },
        { value: 'Y', label: 'Y' },
        { value: 'X', label: 'X' },
        { value: 'C', label: 'C' },
        { value: 'V', label: 'V' },
        { value: 'B', label: 'B' },
        { value: 'N', label: 'N' },
        { value: 'M', label: 'M' },
        { value: ',', label: ',' },
        { value: '.', label: '.' },
        { value: '-', label: '-' },
        { value: 'SHIFT', label: 'Shift', width: 'extra-wide' }
      ]
    },
    {
      keys: [
        { value: 'CTRL', label: 'Ctrl', width: 'wide' },
        { value: 'ALT', label: 'Alt', width: 'wide' },
        { value: ' ', label: 'Space', width: 'extra-wide' },
        { value: 'ALTGR', label: 'AltGr', width: 'wide' },
        { value: 'CTRL', label: 'Ctrl', width: 'wide' }
      ]
    }
  ]
};

export const KEYMAPS_BY_LAYOUT: Record<string, KeyboardLayoutKeymap> = {
  'fr-ch': FR_CH_KEYMAP,
  'de-ch': DE_CH_KEYMAP
};

export const SUPPORTED_KEYBOARD_LAYOUT_IDS: string[] = Object.keys(KEYMAPS_BY_LAYOUT);
