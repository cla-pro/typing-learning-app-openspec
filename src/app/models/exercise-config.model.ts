export interface ExerciseConfig {
  id: string;
  name: string;
  expectedChars: string[];
  impactedKeys: string[];
}

export interface ExerciseCategory {
  name: string;
  keyboardLayouts: string[];
  exercises: ExerciseConfig[];
}
