import { KeyboardLayoutKeymap } from '../models/keyboard-layout.model';

const FR_CH_KEYMAP: KeyboardLayoutKeymap = {
  id: 'fr-ch',
  rows: [
    {
      keys: [
        { value: '^', label: '^' },
        { value: '1', label: '1', shiftValue: '+', shiftLabel: '+', altGrValue: '¦', altGrLabel: '¦' },
        { value: '2', label: '2', shiftValue: '"', shiftLabel: '"', altGrValue: '@', altGrLabel: '@' },
        { value: '3', label: '3', shiftValue: '*', shiftLabel: '*', altGrValue: '#', altGrLabel: '#' },
        { value: '4', label: '4', shiftValue: 'ç', shiftLabel: 'ç', altGrValue: '°', altGrLabel: '°' },
        { value: '5', label: '5', shiftValue: '%', shiftLabel: '%', altGrValue: '§', altGrLabel: '§' },
        { value: '6', label: '6', shiftValue: '&', shiftLabel: '&', altGrValue: '¬', altGrLabel: '¬' },
        { value: '7', label: '7', shiftValue: '/', shiftLabel: '/', altGrValue: '|', altGrLabel: '|' },
        { value: '8', label: '8', shiftValue: '(', shiftLabel: '(', altGrValue: '¢', altGrLabel: '¢' },
        { value: '9', label: '9', shiftValue: ')', shiftLabel: ')' },
        { value: '0', label: '0', shiftValue: '=', shiftLabel: '=' },
        { value: "'", label: "'", shiftValue: '?', shiftLabel: '?', altGrValue: '´', altGrLabel: '´' },
        { value: '^', label: '^', shiftValue: '`', shiftLabel: '`', altGrValue: '~', altGrLabel: '~' },
        { value: 'BACKSPACE', label: 'Backspace', width: 'wide' }
      ]
    },
    {
      keys: [
        { value: 'TAB', label: 'Tab', width: 'wide' },
        { value: 'Q', label: 'Q' },
        { value: 'W', label: 'W' },
        { value: 'E', label: 'E', altGrValue: '€', altGrLabel: '€' },
        { value: 'R', label: 'R' },
        { value: 'T', label: 'T' },
        { value: 'Z', label: 'Z' },
        { value: 'U', label: 'U' },
        { value: 'I', label: 'I' },
        { value: 'O', label: 'O' },
        { value: 'P', label: 'P' },
        { value: 'È', label: 'È', shiftValue: 'Ü', shiftLabel: 'Ü', altGrValue: '[', altGrLabel: '[' },
        { value: '"', label: '"', shiftValue: '!', shiftLabel: '!', altGrValue: ']', altGrLabel: ']' },
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
        { value: 'É', label: 'É', shiftValue: 'Ö', shiftLabel: 'Ö' },
        { value: 'À', label: 'À', shiftValue: 'Ä', shiftLabel: 'Ä', altGrValue: '{', altGrLabel: '{' },
        { value: '$', label: '$', shiftValue: '£', shiftLabel: '£', altGrValue: '}', altGrLabel: '}' }
      ]
    },
    {
      keys: [
        { value: 'SHIFT', label: 'Shift', width: 'extra-wide' },
        { value: '<', label: '<', shiftValue: '>', shiftLabel: '>', altGrValue: '\\', altGrLabel: '\\' },
        { value: 'Y', label: 'Y' },
        { value: 'X', label: 'X' },
        { value: 'C', label: 'C' },
        { value: 'V', label: 'V' },
        { value: 'B', label: 'B' },
        { value: 'N', label: 'N' },
        { value: 'M', label: 'M' },
        { value: ',', label: ',', shiftValue: ';', shiftLabel: ';' },
        { value: '.', label: '.', shiftValue: ':', shiftLabel: ':' },
        { value: '-', label: '-', shiftValue: '_', shiftLabel: '_' },
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
        { value: '1', label: '1', shiftValue: '+', shiftLabel: '+', altGrValue: '¦', altGrLabel: '¦' },
        { value: '2', label: '2', shiftValue: '"', shiftLabel: '"', altGrValue: '@', altGrLabel: '@' },
        { value: '3', label: '3', shiftValue: '*', shiftLabel: '*', altGrValue: '#', altGrLabel: '#' },
        { value: '4', label: '4', shiftValue: 'ç', shiftLabel: 'ç', altGrValue: '°', altGrLabel: '°' },
        { value: '5', label: '5', shiftValue: '%', shiftLabel: '%', altGrValue: '§', altGrLabel: '§' },
        { value: '6', label: '6', shiftValue: '&', shiftLabel: '&', altGrValue: '¬', altGrLabel: '¬' },
        { value: '7', label: '7', shiftValue: '/', shiftLabel: '/', altGrValue: '|', altGrLabel: '|' },
        { value: '8', label: '8', shiftValue: '(', shiftLabel: '(', altGrValue: '¢', altGrLabel: '¢' },
        { value: '9', label: '9', shiftValue: ')', shiftLabel: ')' },
        { value: '0', label: '0', shiftValue: '=', shiftLabel: '=' },
        { value: "'", label: "'", shiftValue: '?', shiftLabel: '?', altGrValue: '´', altGrLabel: '´' },
        { value: '^', label: '^', shiftValue: '`', shiftLabel: '`', altGrValue: '~', altGrLabel: '~' },
        { value: 'BACKSPACE', label: 'Backspace', width: 'wide' }
      ]
    },
    {
      keys: [
        { value: 'TAB', label: 'Tab', width: 'wide' },
        { value: 'Q', label: 'Q' },
        { value: 'W', label: 'W' },
        { value: 'E', label: 'E', altGrValue: '€', altGrLabel: '€' },
        { value: 'R', label: 'R' },
        { value: 'T', label: 'T' },
        { value: 'Z', label: 'Z' },
        { value: 'U', label: 'U' },
        { value: 'I', label: 'I' },
        { value: 'O', label: 'O' },
        { value: 'P', label: 'P' },
        { value: 'Ü', label: 'Ü', shiftValue: 'È', shiftLabel: 'È', altGrValue: '[', altGrLabel: '[' },
        { value: '¨', label: '¨', shiftValue: '!', shiftLabel: '!', altGrValue: ']', altGrLabel: ']' },
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
        { value: 'Ö', label: 'Ö', shiftValue: 'É', shiftLabel: 'É' },
        { value: 'Ä', label: 'Ä', shiftValue: 'À', shiftLabel: 'À', altGrValue: '{', altGrLabel: '{' },
        { value: '$', label: '$', shiftValue: '£', shiftLabel: '£', altGrValue: '}', altGrLabel: '}' }
      ]
    },
    {
      keys: [
        { value: 'SHIFT', label: 'Shift', width: 'extra-wide' },
        { value: '<', label: '<', shiftValue: '>', shiftLabel: '>', altGrValue: '\\', altGrLabel: '\\' },
        { value: 'Y', label: 'Y' },
        { value: 'X', label: 'X' },
        { value: 'C', label: 'C' },
        { value: 'V', label: 'V' },
        { value: 'B', label: 'B' },
        { value: 'N', label: 'N' },
        { value: 'M', label: 'M' },
        { value: ',', label: ',', shiftValue: ';', shiftLabel: ';' },
        { value: '.', label: '.', shiftValue: ':', shiftLabel: ':' },
        { value: '-', label: '-', shiftValue: '_', shiftLabel: '_' },
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
