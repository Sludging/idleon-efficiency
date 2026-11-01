import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

interface BubbleProgressionProjection {
  cauldronIndex: number;
  bubbleIndex: number;
  name: string;
  func: string;
  level: number;
  x1: number;
  x2: number;
  prismatic: boolean;
  maximumBonus: number | null;
  bonusProgress: number | null;
  nextGrowthMilestone: { percentage: number; level: number } | null;
  milestoneBoundaries: {
    percentage: number;
    level: number;
    progress: number;
    predecessorProgress: number;
    comparatorLevel: number;
  }[];
  proposedLevels: { level: number; progress: number | null }[];
}

// These identities select distinct growth rules, not particular owned levels.
// Expectations are saved-state competitor projections, not native game outputs.
const representatives = [
  { cauldronIndex: 0, bubbleIndex: 0, description: 'Roid Ragin additive growth toward its finite maximum' },
  { cauldronIndex: 0, bubbleIndex: 1, description: 'prismatic Warriors Rule multiplier growth toward its finite maximum' },
  { cauldronIndex: 0, bubbleIndex: 2, description: 'Hearty Diggy decaying growth toward its finite maximum' },
  { cauldronIndex: 0, bubbleIndex: 3, description: 'Wyoming Blood growth without a finite maximum' },
  { cauldronIndex: 3, bubbleIndex: 9, description: 'prismatic Laaarrrryyyy with finite growth already above 99%' },
  { cauldronIndex: 1, bubbleIndex: 12, description: 'non-Prisma Cuz I Catch Em All multiplier growth toward 90%' },
  { cauldronIndex: 0, bubbleIndex: 5, description: 'Big Meaty Claws additive growth toward 50%' },
  { cauldronIndex: 0, bubbleIndex: 4, description: 'Reely Smart decaying growth toward 95%' },
];

describe('Alchemy bubble progression', () => {
  let alchemy: Alchemy;
  let projections: BubbleProgressionProjection[];

  beforeAll(() => {
    const results = loadExtractionResults('alchemy-bubble-progression-data.json');
    validateExtractionHealth(results);
    projections = results.extractions.bubble_progression.result;
    alchemy = loadGameDataFromSave('latest').get('alchemy') as Alchemy;
  });

  function getComparison(cauldronIndex: number, bubbleIndex: number) {
    const expected = projections.find((projection) => (
      projection.cauldronIndex === cauldronIndex && projection.bubbleIndex === bubbleIndex
    ));
    if (!expected) {
      throw new Error(`Missing competitor bubble projection for cauldron ${cauldronIndex}, bubble ${bubbleIndex}.`);
    }
    const bubble = alchemy.cauldrons[cauldronIndex].bubbles[bubbleIndex];
    return { bubble, expected };
  }

  describe.each(representatives)('$description', ({ cauldronIndex, bubbleIndex }) => {
    it('matches the Prisma-scaled maximum growth bonus, or reports no finite maximum', () => {
      const { bubble, expected } = getComparison(cauldronIndex, bubbleIndex);
      const maximum = bubble.getMaximumBonus();
      if (expected.maximumBonus === null) {
        expect(maximum).toBeUndefined();
        return;
      }
      expect(maximum).toMatchLiveGameWithDetails(expected.maximumBonus, {
        tolerance: 0,
        context: `${expected.name} maximum growth bonus; competitor projection, not native output; Prisma=${bubble.prismatic}`,
      });
    });

    it('matches progress as a percentage from 0 to 100, or reports no finite maximum', () => {
      const { bubble, expected } = getComparison(cauldronIndex, bubbleIndex);
      const progress = bubble.getBonusProgress();
      if (expected.bonusProgress === null) {
        expect(progress).toBeUndefined();
        return;
      }
      expect(progress).toMatchLiveGameWithDetails(expected.bonusProgress, {
        tolerance: 0,
        context: `${expected.name} progress (%); competitor projection, not native output; curve=${expected.func}; level=${bubble.level}; Prisma=${bubble.prismatic}`,
      });
      expect(progress).toBeGreaterThanOrEqual(0);
      expect(progress).toBeLessThanOrEqual(100);
    });

    it('finds the exact first integer level for the next strictly higher growth milestone', () => {
      const { bubble, expected } = getComparison(cauldronIndex, bubbleIndex);
      const savedLevel = bubble.level;
      const milestone = bubble.getNextGrowthMilestone();

      expect(milestone).toEqual(expected.nextGrowthMilestone ?? undefined);
      expect(bubble.level).toBe(savedLevel);
      if (expected.nextGrowthMilestone !== null) {
        expect(expected.nextGrowthMilestone.percentage).toBeGreaterThan(expected.bonusProgress!);
        expect(bubble.getBonusProgress(expected.nextGrowthMilestone.level))
          .toBeGreaterThanOrEqual(expected.nextGrowthMilestone.percentage);
        expect(bubble.getBonusProgress(expected.nextGrowthMilestone.level - 1))
          .toBeLessThan(expected.nextGrowthMilestone.percentage);
      }
    });

    it('preserves saved state while evaluating growth boundaries and independently projected milestone levels', () => {
      const { bubble, expected } = getComparison(cauldronIndex, bubbleIndex);
      const savedLevel = bubble.level;
      expect({ x1: bubble.x1, x2: bubble.x2, level: bubble.level, prismatic: bubble.prismatic })
        .toEqual({ x1: expected.x1, x2: expected.x2, level: expected.level, prismatic: expected.prismatic });

      for (const proposed of expected.proposedLevels) {
        const progress = bubble.getBonusProgress(proposed.level);
        if (proposed.progress === null) {
          expect(progress).toBeUndefined();
        } else {
          expect(progress).toMatchLiveGameWithDetails(proposed.progress, {
            tolerance: 0,
            context: `${expected.name} proposed level ${proposed.level}; independent competitor policy projection, not native output`,
          });
        }
      }

      for (const boundary of expected.milestoneBoundaries) {
        const progress = bubble.getBonusProgress(boundary.level);
        const predecessorProgress = bubble.getBonusProgress(boundary.level - 1);
        expect(progress).toMatchLiveGameWithDetails(boundary.progress, {
          tolerance: 0,
          context: `${expected.name} ${boundary.percentage}% milestone at level ${boundary.level}; independent competitor projection`,
        });
        expect(predecessorProgress).toMatchLiveGameWithDetails(boundary.predecessorProgress, {
          tolerance: 0,
          context: `${expected.name} ${boundary.percentage}% milestone predecessor; independent competitor projection`,
        });
        expect(progress).toBeGreaterThanOrEqual(boundary.percentage);
        expect(predecessorProgress).toBeLessThan(boundary.percentage);
      }
      expect(bubble.level).toBe(savedLevel);
    });
  });
});
