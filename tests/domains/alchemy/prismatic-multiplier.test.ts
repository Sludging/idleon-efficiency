/**
 * Alchemy Prismatic Multiplier Calculation Validation
 *
 * Tests our alchemy prismatic bubble multiplier final calculation against live game data.
 *
 * The prismatic multiplier is applied to all prismatic bubbles to boost their bonus values.
 * Formula: Math.min(3, 2 + (various bonuses) / 100)
 *
 * This test verifies that prismatic bubbles have the correct multiplier value set.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';

const saveName = 'latest';
const extractionResultsName = 'alchemy-prismatic-multiplier-data.json';

describe('Alchemy Domain - Prismatic Multiplier Calculation', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let alchemy: Alchemy;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    alchemy = gameData.get("alchemy") as Alchemy;
  });

  describe('Prismatic Multiplier Value', () => {
    it('validates prismatic multiplier calculation', () => {
      const liveMultiplier = getExtractedValue(extractionResults, 'prismatic_multiplier');

      // Find any prismatic bubble to check its multiplier
      const prismaticBubble = alchemy.cauldrons
        .flatMap(cauldron => cauldron.bubbles)
        .find(bubble => bubble.prismatic);

      if (!prismaticBubble) {
        throw new Error('No prismatic bubbles found in test data - cannot validate multiplier');
      }

      const domainMultiplier = prismaticBubble.prismaticMultiplier;

      expect(domainMultiplier).toMatchLiveGame(liveMultiplier, 0);
    });

    it('validates multiplier is capped at 3', () => {
      const prismaticBubble = alchemy.cauldrons
        .flatMap(cauldron => cauldron.bubbles)
        .find(bubble => bubble.prismatic);

      if (prismaticBubble) {
        expect(prismaticBubble.prismaticMultiplier).toBeLessThanOrEqual(3);
      }
    });

    it('validates multiplier is at least 2 (base value)', () => {
      const prismaticBubble = alchemy.cauldrons
        .flatMap(cauldron => cauldron.bubbles)
        .find(bubble => bubble.prismatic);

      if (prismaticBubble) {
        expect(prismaticBubble.prismaticMultiplier).toBeGreaterThanOrEqual(2);
      }
    });
  });

  describe('Prismatic Bubble Application', () => {
    it('validates all prismatic bubbles have the same multiplier', () => {
      const prismaticBubbles = alchemy.cauldrons
        .flatMap(cauldron => cauldron.bubbles)
        .filter(bubble => bubble.prismatic);

      if (prismaticBubbles.length > 1) {
        const firstMultiplier = prismaticBubbles[0].prismaticMultiplier;

        prismaticBubbles.forEach(bubble => {
          expect(bubble.prismaticMultiplier).toBe(firstMultiplier);
        });
      }
    });

    it('validates non-prismatic bubbles use default multiplier of 2', () => {
      const nonPrismaticBubble = alchemy.cauldrons
        .flatMap(cauldron => cauldron.bubbles)
        .find(bubble => !bubble.prismatic);

      if (nonPrismaticBubble) {
        expect(nonPrismaticBubble.prismaticMultiplier).toBe(2);
      }
    });
  });
});
