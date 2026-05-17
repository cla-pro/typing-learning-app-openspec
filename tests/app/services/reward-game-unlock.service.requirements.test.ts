import { beforeEach, describe, expect, test, vi } from 'vitest';

import { RewardGameUnlockService } from '../../../src/app/services/reward-game-unlock.service';
import { RewardGameSetup } from '../../../src/app/models/reward-game-setup.model';
import { ExerciseProgressService } from '../../../src/app/services/exercise-progress.service';
import { TestBed } from '@angular/core/testing';

describe('RewardGameUnlockService Requirements', () => {
  let service: RewardGameUnlockService;
  let progressStub: {
    getTotalStars: ReturnType<typeof vi.fn>;
    getStarsForCategory: ReturnType<typeof vi.fn>;
  };

  const setup: RewardGameSetup = {
    id: 'reward-1',
    nameKey: 'rewardGames.games.reward1',
    icon: '⭐',
    gameType: 'tortoise',
    unlockCriteria: {
      TotalNbStarsRequired: 5,
      NbStarsByCategoryRequired: new Map([
        ['middle-line', 2],
        ['upper-line', 1]
      ])
    }
  };

  beforeEach(() => {
    progressStub = {
      getTotalStars: vi.fn(() => 0),
      getStarsForCategory: vi.fn(() => 0)
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ExerciseProgressService,
          useValue: progressStub
        }
      ]
    });

    service = TestBed.inject(RewardGameUnlockService);
  });

  test('returns true when total and category requirements are all satisfied', () => {
    progressStub.getTotalStars.mockReturnValue(6);
    progressStub.getStarsForCategory.mockImplementation((categoryId: string) => {
      if (categoryId === 'middle-line') {
        return 3;
      }
      if (categoryId === 'upper-line') {
        return 1;
      }
      return 0;
    });

    expect(service.isUnlocked(setup)).toBe(true);
  });

  test('returns false when total-star requirement is not satisfied', () => {
    progressStub.getTotalStars.mockReturnValue(4);
    progressStub.getStarsForCategory.mockReturnValue(99);

    expect(service.isUnlocked(setup)).toBe(false);
  });

  test('returns false when any category requirement is not satisfied', () => {
    progressStub.getTotalStars.mockReturnValue(6);
    progressStub.getStarsForCategory.mockImplementation((categoryId: string) => {
      if (categoryId === 'middle-line') {
        return 1;
      }
      if (categoryId === 'upper-line') {
        return 1;
      }
      return 0;
    });

    expect(service.isUnlocked(setup)).toBe(false);
  });

  test('treats missing category requirements as unconstrained', () => {
    const onlyTotalSetup: RewardGameSetup = {
      ...setup,
      unlockCriteria: {
        TotalNbStarsRequired: 2
      }
    };

    progressStub.getTotalStars.mockReturnValue(2);

    expect(service.isUnlocked(onlyTotalSetup)).toBe(true);
    expect(progressStub.getStarsForCategory).not.toHaveBeenCalled();
  });
});