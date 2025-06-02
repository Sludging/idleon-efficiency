import { loadTestGameData } from '../utils/test-data-loader';
import { expectCalculationToMatch } from '../utils/calculation-helpers';
import { Compass, DustType } from '../../data/domain/compass';
import * as fs from 'fs';
import * as path from 'path';

describe('Compass Domain Calculations', () => {
  const testCases = [
    { saveName: 'sludger-20250601', description: 'Sludger save calculations' }
  ];

  testCases.forEach(({ saveName, description }) => {
    describe(`${description} (${saveName})`, () => {
      let gameData: Map<string, any>;
      let compass: Compass;
      let expectedResults: any;

      beforeAll(() => {
        gameData = loadTestGameData(saveName);
        compass = gameData.get('compass') as Compass;
        expectedResults = require(`../fixtures/expected-results/compass/${saveName}.json`);

        if (!compass) {
          throw new Error(`❌ Compass domain not found in save: ${saveName}`);
        }
      });

      it('loads compass data correctly', () => {
        expect(compass).toBeDefined();
        expect(expectedResults).toBeDefined();
        expect(compass.upgrades.length).toBeGreaterThan(0);
      });

      describe('Compass Upgrade Bonuses', () => {
        it('calculates compass upgrade bonuses correctly', () => {
          if (!expectedResults.compassUpgradeBonuses || expectedResults.compassUpgradeBonuses.length === 0) {
            throw new Error('No valid compass upgrade bonus test data found - run snapshot script to generate data');
          }

          expectedResults.compassUpgradeBonuses.forEach((expected: any) => {
            const upgrade = compass.upgrades.find(u => u.id === expected.id);
            
            if (!upgrade) {
              throw new Error(`Compass upgrade with ID ${expected.id} not found`);
            }
            
            expectCalculationToMatch(
              upgrade.bonus,
              expected.bonus,
              0.05,
              expected.description
            );
          });
        });
      });

      describe('Compass Upgrade Costs', () => {
        it('calculates compass upgrade costs correctly', () => {
          if (!expectedResults.compassUpgradeCosts || expectedResults.compassUpgradeCosts.length === 0) {
            throw new Error('No valid compass upgrade cost test data found - run snapshot script to generate data');
          }

          expectedResults.compassUpgradeCosts.forEach((expected: any) => {
            const upgrade = compass.upgrades.find(u => u.id === expected.id);
            
            if (!upgrade) {
              throw new Error(`Compass upgrade with ID ${expected.id} not found`);
            }
            
            expectCalculationToMatch(
              upgrade.cost,
              expected.cost,
              0.05,
              `${upgrade.data.name} - Level ${upgrade.level} -> ${upgrade.level + 1}`
            );
          });
        });
      });

      describe('Tempest Damage Calculation', () => {
        it('calculates tempest damage correctly', () => {
          if (typeof expectedResults.tempestDamage !== 'number') {
            throw new Error('No valid tempest damage test data found - run snapshot script to generate data');
          }

          const actualTempestDamage = compass.calculateTempestDamage();
          
          expectCalculationToMatch(
            actualTempestDamage,
            expectedResults.tempestDamage,
            0.05,
            'Tempest damage calculation'
          );
        });
      });

      describe('Dust Multiplier Calculation', () => {
        it('calculates dust multiplier correctly', () => {
          if (typeof expectedResults.dustMultiplier !== 'number') {
            throw new Error('No valid dust multiplier test data found - run snapshot script to generate data');
          }

          const actualDustMultiplier = compass.calculateDustMultiplier();
          
          expectCalculationToMatch(
            actualDustMultiplier,
            expectedResults.dustMultiplier,
            0.05,
            'Dust multiplier calculation'
          );
        });
      });

      describe('Compass State Validation', () => {
        it('validates compass state correctly', () => {
          if (!expectedResults.compassState) {
            throw new Error('No valid compass state test data found - run snapshot script to generate data');
          }

          const state = expectedResults.compassState;
          
          expect(compass.totalCompassLevel).toBe(state.totalCompassLevel);
          expect(compass.totalDustsCollected).toBe(state.totalDustsCollected);
          expect(compass.completedMasteries).toBe(state.completedMasteries);
          expect(compass.medallionsCollected?.length || 0).toBe(state.medallionCount);
          expect(compass.titansKilled?.length || 0).toBe(state.titanCount);
          expect(compass.portalsCompleted?.length || 0).toBe(state.portalCount);
          expect(!!compass.bestWindWalker).toBe(state.hasWindWalker);
        });
      });
    });
  });
}); 