export type StarCount = 0 | 1 | 2 | 3;

const DEFAULT_STAR_COUNT: StarCount = 0;

export const COMPLETION_ANIMATION_ASSETS: Record<StarCount, string[]> = {
  0: ['assets/animation-completion/0/celebration-1.gif'],
  1: ['assets/animation-completion/1/celebration-1.gif'],
  2: ['assets/animation-completion/2/celebration-1.gif'],
  3: ['assets/animation-completion/3/celebration-1.gif']
};

export function normalizeStarCount(stars: number): StarCount {
  if (stars <= 0) {
    return 0;
  }

  if (stars >= 3) {
    return 3;
  }

  return stars as StarCount;
}

export function getCompletionAnimationCandidates(stars: number): string[] {
  return COMPLETION_ANIMATION_ASSETS[normalizeStarCount(stars)];
}

export function pickRandomCompletionAnimation(
  stars: number,
  randomValueProvider: () => number = Math.random
): string {
  const candidates = getCompletionAnimationCandidates(stars);

  if (candidates.length === 0) {
    return COMPLETION_ANIMATION_ASSETS[DEFAULT_STAR_COUNT][0];
  }

  const randomValue = randomValueProvider();
  const bounded = Number.isFinite(randomValue) ? Math.min(Math.max(randomValue, 0), 0.999999) : 0;
  const index = Math.floor(bounded * candidates.length);

  return candidates[index];
}

export function getStarsCelebrationAnimationPath(stars: number): string {
  const normalized = normalizeStarCount(stars);
  return `assets/star-gifs/${normalized}-stars.gif`;
}
