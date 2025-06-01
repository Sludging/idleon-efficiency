import { loadTestGameData } from '../utils/test-data-loader';
import { expectCalculationToMatch } from '../utils/calculation-helpers';
import { Cooking, Meal, Kitchen } from '../../data/domain/cooking';
import { Player } from '../../data/domain/player';
import { Achievement } from '../../data/domain/achievements';

describe('Cooking Domain Calculations', () => {
  const testCases = [
    { saveName: 'sludger-20250601', description: 'Sludger save calculations' }
  ];

  testCases.forEach(({ saveName, description }) => {
    describe(`${description} (${saveName})`, () => {
      let gameData: Map<string, any>;
      let cooking: Cooking;
      let players: Player[];
      let achievements: Achievement[];
      let expectedResults: any;
      
      beforeAll(() => {
        gameData = loadTestGameData(saveName);
        cooking = gameData.get('cooking') as Cooking;
        players = gameData.get('players') as Player[];
        achievements = gameData.get('achievements') as Achievement[];
        expectedResults = require(`../fixtures/expected-results/cooking/${saveName}.json`);
      });

      it('loads cooking data correctly', () => {
        expect(cooking).toBeDefined();
        expect(expectedResults).toBeDefined();
        expect(cooking.meals.length).toBeGreaterThan(0);
        expect(cooking.kitchens.length).toBe(10);
      });

      describe('Meal Bonus Calculations', () => {
        it('calculates meal bonuses correctly', () => {
          if (!expectedResults.mealBonuses || expectedResults.mealBonuses.length === 0) {
            throw new Error('No valid meal bonus test data found - run snapshot script to generate data');
          }

          expectedResults.mealBonuses.forEach((expected: any) => {
            const meal = cooking.meals[expected.index];
            
            // Calculate bonus at the expected level
            const actualBonus = meal.getBonus(false, meal.mainframeBonus, expected.level);
            
            expectCalculationToMatch(
              actualBonus,
              expected.bonus,
              0.05,
              `${meal.name} bonus at level ${expected.level}`
            );
          });
        });

        it('calculates aggregate meal bonuses by key', () => {
          if (!expectedResults.aggregateMealBonuses || expectedResults.aggregateMealBonuses.length === 0) {
            console.warn('No aggregate meal bonus test data found - skipping aggregate meal bonus tests');
            return;
          }

          expectedResults.aggregateMealBonuses.forEach((expected: any) => {
            const actualBonus = cooking.getMealBonusForKey(expected.key);
            
            expectCalculationToMatch(
              actualBonus,
              expected.bonus,
              0.05,
              `Aggregate meal bonus for ${expected.key}`
            );
          });
        });
      });

      describe('Meal Level Cost Calculations', () => {
        it('calculates meal level costs correctly', () => {
          if (!expectedResults.mealLevelCosts || expectedResults.mealLevelCosts.length === 0) {
            console.warn('No meal level cost test data found - skipping meal level cost tests');
            return;
          }

          expectedResults.mealLevelCosts.forEach((expected: any) => {
            const meal = cooking.meals[expected.index];
            
            // Set the meal to the expected level for cost calculation
            const originalLevel = meal.level;
            meal.level = expected.fromLevel;
            
            const actualCost = meal.getMealLevelCost();
            
            // Restore original level
            meal.level = originalLevel;
            
            expectCalculationToMatch(
              actualCost,
              expected.cost,
              0.05,
              `${meal.name} level ${expected.fromLevel} → ${expected.toLevel} cost`
            );
          });
        });

        it('calculates milestone costs correctly', () => {
          if (!expectedResults.milestoneCosts || expectedResults.milestoneCosts.length === 0) {
            console.warn('No milestone cost test data found - skipping milestone cost tests');
            return;
          }

          expectedResults.milestoneCosts.forEach((expected: any) => {
            const meal = cooking.meals[expected.index];
            
            // Set the meal to the expected level for milestone calculations
            const originalLevel = meal.level;
            meal.level = expected.currentLevel;
            
            // Test available milestone costs
            if (expected.diamondCost > 0) {
              const actualDiamondCost = meal.getCostsTillDiamond();
              expectCalculationToMatch(
                actualDiamondCost,
                expected.diamondCost,
                0.05,
                `${meal.name} cost to Diamond milestone`
              );
            }

            if (expected.purpleCost > 0) {
              const actualPurpleCost = meal.getCostsTillPurple();
              expectCalculationToMatch(
                actualPurpleCost,
                expected.purpleCost,
                0.05,
                `${meal.name} cost to Purple milestone`
              );
            }

            if (expected.voidCost > 0) {
              const actualVoidCost = meal.getCostsTillVoid();
              expectCalculationToMatch(
                actualVoidCost,
                expected.voidCost,
                0.05,
                `${meal.name} cost to Void milestone`
              );
            }

            if (expected.thirtyCost > 0) {
              const actualThirtyCost = meal.getCostsTillThirty();
              expectCalculationToMatch(
                actualThirtyCost,
                expected.thirtyCost,
                0.05,
                `${meal.name} cost to level 30`
              );
            }
            
            // Restore original level
            meal.level = originalLevel;
          });
        });
      });

      describe('Kitchen Calculations', () => {
        it('calculates kitchen upgrade costs correctly', () => {
          if (!expectedResults.kitchenUpgradeCosts || expectedResults.kitchenUpgradeCosts.length === 0) {
            console.warn('No kitchen upgrade cost test data found - skipping kitchen upgrade cost tests');
            return;
          }

          expectedResults.kitchenUpgradeCosts.forEach((expected: any) => {
            const kitchen = cooking.kitchens[expected.kitchenIndex];
            
            let actualCost: number;
            switch (expected.upgradeType) {
              case 'speed':
                actualCost = kitchen.speedUpgradeCost;
                break;
              case 'fire':
                actualCost = kitchen.fireUpgradeCost;
                break;
              case 'luck':
                actualCost = kitchen.luckUpgradecost;
                break;
              default:
                throw new Error(`Unknown upgrade type: ${expected.upgradeType}`);
            }
            
            expectCalculationToMatch(
              actualCost,
              expected.cost,
              0.05,
              `Kitchen ${expected.kitchenIndex} ${expected.upgradeType} upgrade cost`
            );
          });
        });

        it('calculates kitchen speeds correctly', () => {
          if (!expectedResults.kitchenSpeeds || expectedResults.kitchenSpeeds.length === 0) {
            console.warn('No kitchen speed test data found - skipping kitchen speed tests');
            return;
          }

          expectedResults.kitchenSpeeds.forEach((expected: any) => {
            const kitchen = cooking.kitchens[expected.kitchenIndex];
            
            const actualMealSpeed = kitchen.getUpdatedMealSpeed(true, false);
            const actualMealSpeedWithSilkrode = kitchen.getUpdatedMealSpeed(true, true);
            const actualMealSpeedWithoutStarSign = kitchen.getUpdatedMealSpeed(false, false);
            
            expectCalculationToMatch(
              actualMealSpeed,
              expected.mealSpeed,
              0.05,
              `Kitchen ${expected.kitchenIndex} meal speed (with star sign)`
            );

            expectCalculationToMatch(
              actualMealSpeedWithSilkrode,
              expected.mealSpeedWithSilkrode,
              0.05,
              `Kitchen ${expected.kitchenIndex} meal speed (with star sign + silkrode)`
            );

            expectCalculationToMatch(
              actualMealSpeedWithoutStarSign,
              expected.mealSpeedWithoutStarSign,
              0.05,
              `Kitchen ${expected.kitchenIndex} meal speed (without star sign)`
            );
          });
        });
      });

      describe('Total Cooking Speed Calculations', () => {
        it('calculates total cooking speeds correctly', () => {
          if (!expectedResults.cookingSpeeds) {
            console.warn('No cooking speed test data found - skipping cooking speed tests');
            return;
          }

          const actualTotalSpeed = cooking.getTotalCookingSpeed(true, false);
          const actualTotalSpeedWithSilkrode = cooking.getTotalCookingSpeed(true, true);
          const actualTotalSpeedWithoutStarSign = cooking.getTotalCookingSpeed(false, false);

          expectCalculationToMatch(
            actualTotalSpeed,
            expectedResults.cookingSpeeds.total,
            0.05,
            'Total cooking speed (with star sign)'
          );

          expectCalculationToMatch(
            actualTotalSpeedWithSilkrode,
            expectedResults.cookingSpeeds.totalWithSilkrode,
            0.05,
            'Total cooking speed (with star sign + silkrode)'
          );

          expectCalculationToMatch(
            actualTotalSpeedWithoutStarSign,
            expectedResults.cookingSpeeds.totalWithoutStarSign,
            0.05,
            'Total cooking speed (without star sign)'
          );
        });
      });

      describe('Summary Validation', () => {
        it('validates cooking summary data', () => {
          expect(cooking.meals.length).toBe(expectedResults.summary.mealsCount);
          expect(cooking.kitchens.length).toBe(expectedResults.summary.kitchensCount);
          
          const actualActiveMeals = cooking.meals.filter(m => m.level > 0).length;
          const actualActiveKitchens = cooking.kitchens.filter(k => k.status > 0).length;
          
          expect(actualActiveMeals).toBe(expectedResults.summary.activeMealsCount);
          expect(actualActiveKitchens).toBe(expectedResults.summary.activeKitchensCount);
          expect(cooking.mealsDiscovered).toBe(expectedResults.summary.mealsDiscovered);
          
          expectCalculationToMatch(
            cooking.totalCookingSpeed,
            expectedResults.summary.totalCookingSpeed,
            0.05,
            'Total cooking speed summary'
          );
        });

        it('reports test coverage warnings', () => {
          const warnings: string[] = [];
          
          if (!expectedResults.mealLevelCosts || expectedResults.mealLevelCosts.length === 0) {
            warnings.push('No meal level costs in test data - all meals may be at max level (potential domain bug?)');
          }
          
          if (!expectedResults.milestoneCosts || expectedResults.milestoneCosts.length === 0) {
            warnings.push('No milestone costs in test data - all meals may be at max level (potential domain bug?)');
          }
          
          if (!expectedResults.aggregateMealBonuses || expectedResults.aggregateMealBonuses.length === 0) {
            warnings.push('No aggregate meal bonuses in test data - potential implementation issue');
          }
          
          if (!expectedResults.kitchenUpgradeCosts || expectedResults.kitchenUpgradeCosts.length === 0) {
            warnings.push('No kitchen upgrade costs in test data - kitchens may be maxed or not active');
          }
          
          if (warnings.length > 0) {
            console.warn('\n🚨 Test Coverage Warnings:');
            warnings.forEach(warning => console.warn(`   ⚠️  ${warning}`));
            console.warn('   These warnings may indicate domain bugs or missing test coverage.\n');
          }
          
          // This test always passes, it's just for reporting warnings
          expect(true).toBe(true);
        });
      });
    });
  });
}); 