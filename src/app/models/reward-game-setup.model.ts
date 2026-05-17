export interface RewardGameUnlockCriteria {
  TotalNbStarsRequired: number;
  NbStarsByCategoryRequired?: Map<string, number>;
}

export interface RewardGameSetup {
  id: string;
  nameKey: string;
  icon: string;
  gameType: string;
  unlockCriteria: RewardGameUnlockCriteria;
}