import { ExerciseCategory } from '../../models/exercise-config.model';

import { DE_CH_EXERCISE_CATEGORIES } from './de-ch.exercise-categories';
import { EN_US_EXERCISE_CATEGORIES } from './en-us.exercise-categories';
import { FR_CH_EXERCISE_CATEGORIES } from './fr-ch.exercise-categories';

export const EXERCISE_CATEGORIES_BY_LAYOUT: Record<string, ExerciseCategory[]> = {
  'fr-ch': FR_CH_EXERCISE_CATEGORIES,
  'de-ch': DE_CH_EXERCISE_CATEGORIES,
  'en-us': EN_US_EXERCISE_CATEGORIES
};

export const EXERCISE_CATEGORIES: ExerciseCategory[] = Object.values(EXERCISE_CATEGORIES_BY_LAYOUT).flat();
