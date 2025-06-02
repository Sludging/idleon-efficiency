import { loadTestGameData } from '../utils/test-data-loader';
import { expectCalculationToMatch } from '../utils/calculation-helpers';
import { AtomCollider, HydrogenAtom, CarbonAtom, FluorideAtom } from '../../data/domain/atomCollider';
import { nFormatter } from '../../data/utility';

describe('Atom Collider Domain Calculations', () => {
  const testCases = [
    { saveName: 'sludger-20250601', description: 'Sludger save calculations' }
  ];

  testCases.forEach(({ saveName, description }) => {
    describe(`${description} (${saveName})`, () => {
      let gameData: Map<string, any>;
      let collider: AtomCollider;
      let expectedResults: any;
      
      beforeAll(() => {
        gameData = loadTestGameData(saveName);
        collider = gameData.get('collider') as AtomCollider;
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

      describe('Special case - FluorideAtom display matching', () => {
        it('validates FluorideAtom display formatting matches calculation', () => {
          const fluorideAtom = collider.atoms[8] as FluorideAtom;
          
          if (fluorideAtom.level > 0) {
            const bonusText = fluorideAtom.getBonusText();
            
            // Test that the display text contains the expected bonus
            expect(bonusText).toContain(expectedResults.fluorideAtomBonus.bonus);
          } else {
            console.warn('FluorideAtom is not leveled - skipping display consistency test');
          }
        });
      });
    });
  });
}); 