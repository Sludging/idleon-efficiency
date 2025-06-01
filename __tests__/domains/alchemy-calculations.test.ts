import { loadTestGameData } from '../utils/test-data-loader';
import { expectCalculationToMatch } from '../utils/calculation-helpers';
import { Alchemy, Bubble, Vial } from '../../data/domain/alchemy';
import { Achievement, AchievementConst } from '../../data/domain/achievements';
import { AtomCollider } from '../../data/domain/atomCollider';

describe('Alchemy Domain Calculations', () => {
  const testCases = [
    { saveName: 'sludger-20250601', description: 'Sludger save calculations' }
  ];

  testCases.forEach(({ saveName, description }) => {
    describe(`${description} (${saveName})`, () => {
      let gameData: Map<string, any>;
      let alchemy: Alchemy;
      let achievements: Achievement[];
      let collider: AtomCollider;
      let expectedResults: any;
      
      beforeAll(() => {
        gameData = loadTestGameData(saveName);
        alchemy = gameData.get('alchemy') as Alchemy;
        achievements = gameData.get('achievements') as Achievement[];
        collider = gameData.get('collider') as AtomCollider;
        expectedResults = require(`../fixtures/expected-results/alchemy/${saveName}.json`);
      });

      it('loads alchemy data correctly', () => {
        expect(alchemy).toBeDefined();
        expect(expectedResults).toBeDefined();
        expect(alchemy.cauldrons.length).toBe(4);
      });

      describe('Bubble Bonus Calculations', () => {
        it('calculates sample bubble bonuses correctly', () => {
          if (!expectedResults.bubbleBonuses || expectedResults.bubbleBonuses.length === 0) {
            throw new Error('No valid bubble bonus test data found - please provide at least one expected bubble bonus value.');
          }

          expectedResults.bubbleBonuses.forEach((expected: any) => {
            const bubble = alchemy.cauldrons[expected.cauldron].bubbles[expected.index];
            const actualBonus = bubble.getBonus();
            
            expectCalculationToMatch(
              actualBonus,
              expected.bonus,
              0.05,
              `Cauldron ${expected.cauldron} Bubble ${expected.index} (${bubble.name})`
            );
          });
        });

        it('calculates special bubble bonuses correctly', () => {
          if (!expectedResults.specialBubbles || expectedResults.specialBubbles.length === 0) {
            console.warn('No special bubble test data found - skipping special bubble tests');
            return;
          }

          expectedResults.specialBubbles.forEach((expected: any) => {
            const bubble = alchemy.cauldrons[expected.cauldron].bubbles[expected.index];
            const actualBonus = bubble.getBonus();
            
            expectCalculationToMatch(
              actualBonus,
              expected.bonus,
              0.05,
              `Special bubble: ${bubble.name}`
            );
          });
        });
      });

      describe('Material Cost Calculations', () => {
        it('calculates bubble material costs correctly', () => {
          if (!expectedResults.materialCosts || expectedResults.materialCosts.length === 0) {
            console.warn('No material cost test data found - skipping material cost tests');
            return;
          }

          // Get the same parameters the UI uses
          const undevelopedCostsBubbleLevel = alchemy.getUndevelopedCostsBubbleLevel();
          const barleyBrewVialLevel = alchemy.getBarleyBrewVialLevel();
          const vialMultiplier = alchemy.vials[0]?.bonusMulitplier ?? 1;
          const hasAlchemyAchievement = achievements[AchievementConst.SmartBoiIndex]?.completed ?? false;

          expectedResults.materialCosts.forEach((expected: any) => {
            const bubble = alchemy.cauldrons[expected.cauldron].bubbles[expected.index];
            const materialCostMap = bubble.getMaterialCost(
              0, // cauldronCostLevel - from cauldron boosts
              undevelopedCostsBubbleLevel,
              barleyBrewVialLevel,
              0, // bargainBubbleLevel - shop discount
              0, // classMultiBubbleLevel - class multiplier bonus
              0, // discountLevel - UI default
              hasAlchemyAchievement,
              0, // newMultiBubbleLevel
              vialMultiplier
            );
            
            const totalCost = Array.from(materialCostMap.values()).reduce((sum, cost) => sum + cost, 0);
            expectCalculationToMatch(
              totalCost,
              expected.totalCost,
              0.05,
              `Material cost for ${bubble.name}`
            );
          });
        });
      });

      describe('Atom Cost Calculations', () => {
        it('calculates bubble atom costs correctly', () => {
          if (!expectedResults.atomCosts || expectedResults.atomCosts.length === 0) {
            console.warn('No atom cost test data found - skipping atom cost tests');
            return;
          }

          expectedResults.atomCosts.forEach((expected: any) => {
            const bubble = alchemy.cauldrons[expected.cauldron].bubbles[expected.index];
            const atomCost = bubble.getAtomCost(expected.materialCost);
            
            expectCalculationToMatch(
              atomCost,
              expected.atomCost,
              0.05,
              `Atom cost for ${bubble.name}`
            );
          });
        });
      });

      describe('Vial Calculations', () => {
        it('calculates vial bonuses correctly', () => {
          if (!expectedResults.vialBonuses || expectedResults.vialBonuses.length === 0) {
            throw new Error('No valid vial bonus test data found - please provide at least one expected vial bonus value.');
          }

          expectedResults.vialBonuses.forEach((expected: any) => {
            const vial = alchemy.vials[expected.index];
            const actualBonus = vial.getBonus();
            
            expectCalculationToMatch(
              actualBonus,
              expected.bonus,
              0.05,
              `Vial ${expected.index} (${vial.name})`
            );
          });
        });
      });

      describe('Aggregate Bubble Bonuses', () => {
        it('calculates aggregate bubble bonuses by key', () => {
          if (!expectedResults.aggregateBubbleBonuses || expectedResults.aggregateBubbleBonuses.length === 0) {
            throw new Error('No valid aggregate bubble bonus test data found - please provide at least one expected aggregate bubble bonus value.');
          }

          expectedResults.aggregateBubbleBonuses.forEach((expected: any) => {
            const actualBonus = alchemy.getBubbleBonusForKey(expected.key);
            
            expectCalculationToMatch(
              actualBonus,
              expected.bonus,
              0.05,
              `Aggregate bubble bonus for ${expected.key}`
            );
          });
        });
      });

      describe('Aggregate Vial Bonuses', () => {
        it('calculates aggregate vial bonuses by key', () => {
          if (!expectedResults.aggregateVialBonuses || expectedResults.aggregateVialBonuses.length === 0) {
            throw new Error('No valid aggregate vial bonus test data found - please provide at least one expected aggregate vial bonus value.');
          }

          expectedResults.aggregateVialBonuses.forEach((expected: any) => {
            const actualBonus = alchemy.getVialBonusForKey(expected.key);
            
            expectCalculationToMatch(
              actualBonus,
              expected.bonus,
              0.05,
              `Aggregate vial bonus for ${expected.key}`
            );
          });
        });
      });
    });
  });
}); 