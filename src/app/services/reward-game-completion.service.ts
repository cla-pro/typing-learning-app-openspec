import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RewardGameCompletionService {
  private static readonly COMPLETION_VALUE = 'true';

  markCompleted(gameId: string): void {
    try {
      globalThis.localStorage?.setItem(this.completionKey(gameId), RewardGameCompletionService.COMPLETION_VALUE);
    } catch {
      // Ignore storage failures.
    }
  }

  isCompleted(gameId: string): boolean {
    try {
      return (
        globalThis.localStorage?.getItem(this.completionKey(gameId)) === RewardGameCompletionService.COMPLETION_VALUE
      );
    } catch {
      return false;
    }
  }

  private completionKey(gameId: string): string {
    return `reward-game-${gameId}-completion`;
  }
}
