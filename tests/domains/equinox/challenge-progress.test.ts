import { safeJsonParse } from '../../../data/domain/cloudsave';
import { initDreamChallengeRepo } from '../../../data/domain/data/DreamChallengeRepo';
import { Equinox } from '../../../data/domain/world-3/equinox';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';

describe('Equinox active challenge progress', () => {
  let equinox: Equinox;
  let savedWeeklyBoss: Record<string, number>;
  let savedDream: number[];
  let expectedActiveIndices: number[];

  beforeAll(() => {
    const save = loadTestSave('latest');
    savedWeeklyBoss = safeJsonParse<Record<string, number>>(save, 'WeeklyBoss', {});
    savedDream = safeJsonParse<number[]>(save, 'Dream', []);
    equinox = loadGameDataFromSave('latest').get('equinox') as Equinox;
    expectedActiveIndices = initDreamChallengeRepo()
      .map(challenge => challenge.index)
      .filter(index => savedWeeklyBoss[`d_${index}`] !== -1)
      .slice(0, Math.round(Math.min(5, savedDream[2])));
  });

  it('matches active challenge identities to the genuine saved state', () => {
    expect(expectedActiveIndices.length).toBeGreaterThan(0);
    expect(equinox.activeChallenges.map(challenge => challenge.index)).toEqual(expectedActiveIndices);
  });

  it('matches numerical progress for every active challenge to the genuine saved counter', () => {
    expect(expectedActiveIndices.length).toBeGreaterThan(0);
    // Completion getValue() remains binary; progress uses the saved counter and must not clamp to req.
    for (const challenge of equinox.activeChallenges) {
      expect(challenge.progress).toMatchLiveGameWithDetails(savedWeeklyBoss[`d_${challenge.index}`] ?? 0, {
        tolerance: 0,
        context: `Saved numerical progress for Equinox challenge ${challenge.index}`,
      });
    }
  });

  it('preserves binary completion and clears progress for completed challenges', () => {
    for (const challenge of equinox.challenges) {
      const savedComplete = savedWeeklyBoss[`d_${challenge.index}`] === -1;
      expect(challenge.complete).toBe(savedComplete);
      expect(challenge.getValue()).toBe(savedComplete ? 1 : 0);

      if (savedComplete) {
        expect(challenge.progress).toMatchLiveGameWithDetails(0, {
          tolerance: 0,
          context: `Completed Equinox challenge ${challenge.index} has no active progress`,
        });
      }
    }
  });
});
