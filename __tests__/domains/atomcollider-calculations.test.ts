import { loadTestGameData } from '../utils/test-data-loader';
import { expectCalculationToMatch } from '../utils/calculation-helpers';
import { AtomCollider, Atom, HydrogenAtom, CarbonAtom, FluorideAtom, OxygenAtom } from '../../data/domain/atomCollider';
import { Alchemy } from '../../data/domain/alchemy';
import { Construction } from '../../data/domain/construction';
import { Cooking } from '../../data/domain/cooking';
import { TaskBoard } from '../../data/domain/tasks';

describe('Atom Collider Domain Calculations', () => {
  const testCases = [
    { saveName: 'sludger-20250601', description: 'Sludger save calculations' }
  ];

  testCases.forEach(({ saveName, description }) => {
    describe(`${description} (${saveName})`, () => {
      let gameData: Map<string, any>;
      let collider: AtomCollider;
      let alchemy: Alchemy;
      let construction: Construction;
      let cooking: Cooking;
      let taskboard: TaskBoard;
      let expectedResults: any;
      
      beforeAll(() => {
        gameData = loadTestGameData(saveName);
        collider = gameData.get('collider') as AtomCollider;
        alchemy = gameData.get('alchemy') as Alchemy;
        construction = gameData.get('construction') as Construction;
        cooking = gameData.get('cooking') as Cooking;
        taskboard = gameData.get('taskboard') as TaskBoard;
        expectedResults = require(`../fixtures/expected-results/atomcollider/${saveName}.json`);
      });

      it('loads atom collider data correctly', () => {
        expect(collider).toBeDefined();
        expect(expectedResults).toBeDefined();
        expect(collider.atoms.length).toBeGreaterThan(0);
      });

      describe('Atom Bonus Calculations', () => {
        it('calculates atom bonuses correctly', () => {
          if (!expectedResults.atomBonuses || expectedResults.atomBonuses.length === 0) {
            throw new Error('No valid atom bonus test data found - run snapshot script to generate data');
          }

          expectedResults.atomBonuses.forEach((expected: any) => {
            const atom = collider.atoms[expected.index];
            const actualBonus = atom.getBonus();
            
            expectCalculationToMatch(
              actualBonus,
              expected.bonus,
              0.05,
              `Atom ${expected.index} (${atom.data.name}) bonus`
            );

            // Verify bonus text matches
            const actualBonusText = atom.getBonusText();
            expect(actualBonusText).toBe(expected.bonusText);
          });
        });

        it('calculates special atom bonuses correctly', () => {
          if (!expectedResults.specialAtomBonuses || expectedResults.specialAtomBonuses.length === 0) {
            console.warn('No special atom bonus test data found - skipping special atom tests');
            return;
          }

          expectedResults.specialAtomBonuses.forEach((expected: any) => {
            const atom = collider.atoms[expected.index];
            const actualBonus = atom.getBonus();
            
            expectCalculationToMatch(
              actualBonus,
              expected.bonus,
              0.05,
              `Special atom: ${atom.data.name} (${expected.atomType})`
            );

            // Verify atom type matches
            expect(atom.constructor.name).toBe(expected.atomType);

            // Test special properties for CarbonAtom
            if (atom instanceof CarbonAtom && expected.extraLevels !== undefined) {
              const actualExtraLevels = atom.getExtraLevels();
              expect(actualExtraLevels).toBe(expected.extraLevels);
            }
          });
        });
      });

      describe('Atom Cost Calculations', () => {
        it('calculates atom upgrade costs correctly', () => {
          if (!expectedResults.atomCosts || expectedResults.atomCosts.length === 0) {
            console.warn('No atom cost test data found - skipping atom cost tests');
            return;
          }

          expectedResults.atomCosts.forEach((expected: any) => {
            const atom = collider.atoms[expected.index];
            const actualCost = atom.getCost(expected.level);
            
            expectCalculationToMatch(
              actualCost,
              expected.cost,
              0.05,
              `Atom ${expected.index} (${atom.data.name}) upgrade cost from level ${expected.level}`
            );
          });
        });

        it('calculates atom unlock costs correctly', () => {
          if (!expectedResults.atomUnlockCosts || expectedResults.atomUnlockCosts.length === 0) {
            console.warn('No atom unlock cost test data found - skipping atom unlock cost tests');
            return;
          }

          expectedResults.atomUnlockCosts.forEach((expected: any) => {
            const atom = collider.atoms[expected.index];
            const actualUnlockCost = atom.getCostToUnlock();
            
            expectCalculationToMatch(
              actualUnlockCost,
              expected.unlockCost,
              0.05,
              `Atom ${expected.index} (${atom.data.name}) unlock cost`
            );
          });
        });

        it('calculates atom cost to max level correctly', () => {
          if (!expectedResults.atomMaxLevelCosts || expectedResults.atomMaxLevelCosts.length === 0) {
            console.warn('No atom max level cost test data found - skipping atom max level cost tests');
            return;
          }

          expectedResults.atomMaxLevelCosts.forEach((expected: any) => {
            const atom = collider.atoms[expected.index];
            const actualMaxLevelCost = atom.getCostToMaxLevel();
            
            expectCalculationToMatch(
              actualMaxLevelCost,
              expected.costToMaxLevel,
              0.05,
              `Atom ${expected.index} (${atom.data.name}) cost to max level`
            );
          });
        });
      });

      describe('Atom Max Level Calculations', () => {
        it('calculates atom max levels correctly', () => {
          if (!expectedResults.atomMaxLevels || expectedResults.atomMaxLevels.length === 0) {
            console.warn('No atom max level test data found - skipping atom max level tests');
            return;
          }

          expectedResults.atomMaxLevels.forEach((expected: any) => {
            const atom = collider.atoms[expected.index];
            const actualMaxLevel = atom.getMaxLevel();
            
            expect(actualMaxLevel).toBe(expected.maxLevel);
          });
        });
      });

      describe('Particles', () => {
        it('has correct particle count', () => {
          const actualParticles = collider.particles;
          
          expectCalculationToMatch(
            actualParticles,
            expectedResults.particles,
            0.001, // Particles should be exact
            'Particle count'
          );
        });
      });

      describe('Special Atom Mechanics', () => {
        it('validates HydrogenAtom days-based bonus calculation', () => {
          const hydrogenAtom = collider.atoms[0] as HydrogenAtom;
          
          // Only test if hydrogen atom is leveled
          if (hydrogenAtom.level > 0) {
            const bonus = hydrogenAtom.getBonus();
            const expectedBonus = Math.min(90, hydrogenAtom.level * hydrogenAtom.data.bonusPerLv * hydrogenAtom.daysSinceUpgrade);
            
            expectCalculationToMatch(
              bonus,
              expectedBonus,
              0.05,
              'HydrogenAtom days-based bonus calculation'
            );
          }
        });

        it('validates CarbonAtom wizard tower bonus calculation', () => {
          const carbonAtom = collider.atoms[5] as CarbonAtom;
          
          // Only test if carbon atom is leveled
          if (carbonAtom.level > 0) {
            const bonus = carbonAtom.getBonus();
            const expectedBonus = 2 * carbonAtom.wizardTowersOver50;
            
            expectCalculationToMatch(
              bonus,
              expectedBonus,
              0.05,
              'CarbonAtom wizard tower bonus calculation'
            );

            const extraLevels = carbonAtom.getExtraLevels();
            const expectedExtraLevels = 2 * carbonAtom.level;
            
            expect(extraLevels).toBe(expectedExtraLevels);
          }
        });

        it('validates FluorideAtom void meals bonus calculation', () => {
          const fluorideAtom = collider.atoms[8] as FluorideAtom;
          
          // Only test if fluoride atom is leveled
          if (fluorideAtom.level > 0) {
            const bonus = fluorideAtom.getBonus();
            const expectedBonus = Math.pow(1 + (fluorideAtom.level * fluorideAtom.data.bonusPerLv) / 100, fluorideAtom.voidMeals);
            
            expectCalculationToMatch(
              bonus,
              expectedBonus,
              0.05,
              'FluorideAtom void meals bonus calculation'
            );
          }
        });
      });
    });
  });
}); 