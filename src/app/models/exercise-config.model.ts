export interface ExerciseConfig {
  id: string;
  name: string;
  expectedChars: string[];
  impactedKeys: string[];
  shufflable?: boolean;
}

export interface ExerciseCategory {
  name: string;
  keyboardLayouts: string[];
  exercises: ExerciseConfig[];
}
