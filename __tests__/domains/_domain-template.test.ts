import { loadTestGameData } from '../utils/test-data-loader';
import { expectCalculationToMatch } from '../utils/calculation-helpers';

/**
 * TEMPLATE for domain-specific snapshot calculation testing
 * 
 * TO USE THIS TEMPLATE FOR EXISTING DOMAINS (with save data):
 * 1. Copy to new file: __tests__/domains/[domain-name]-calculations.test.ts
 * 2. Replace DOMAIN_NAME, DOMAIN_KEY, and import the domain class
 * 3. Create snapshot script: scripts/generate-[domain-name]-snapshot.ts 
 * 4. Run script to generate expected results
 * 5. Verify generated values match the game
 * 6. Customize tests based on domain's key calculation methods
 * 
 * FOR NEW DOMAINS (test-driven development):
 * 1. Start with basic structure tests (data loading, method existence)
 * 2. Add calculation tests with known expected values
 * 3. Build the domain implementation to pass the tests
 */

// REPLACE THESE:
const DOMAIN_NAME = 'REPLACE_ME';
const DOMAIN_KEY = 'replace_me'; // key used in gameData.get()
// import { DomainClass } from '../../data/domain/domain-file';

describe(`${DOMAIN_NAME} Domain Calculations`, () => {
  const testCases = [
    { saveName: 'your-save-name', description: 'Your save calculations' }
  ];

  testCases.forEach(({ saveName, description }) => {
    describe(`${description} (${saveName})`, () => {
      let gameData: Map<string, any>;
      let domain: any; // REPLACE with proper type
      let expectedResults: any;
      
      beforeAll(() => {
        gameData = loadTestGameData(saveName);
        domain = gameData.get(DOMAIN_KEY) as any; // REPLACE with proper type
        expectedResults = require(`../fixtures/expected-results/${DOMAIN_KEY}/${saveName}.json`);
      });

      it('loads domain data correctly', () => {
        expect(domain).toBeDefined();
        expect(expectedResults).toBeDefined();
        // Add domain-specific structure validations
      });

      // CUSTOMIZE THESE BASED ON DOMAIN'S KEY METHODS:

      it('calculates sample bonuses correctly', () => {
        if (!expectedResults.bonuses || expectedResults.bonuses.length === 0) {
          throw new Error('No valid bonus test data found - run snapshot script to generate data');
        }

        expectedResults.bonuses.forEach((expected: any) => {
          // REPLACE with actual domain method calls:
          const actual = domain.getBonus(expected.inputParams);
          
          expectCalculationToMatch(
            actual,
            expected.result,
            0.05,
            `Bonus calculation: ${expected.description}`
          );
        });
      });

      it('calculates costs correctly', () => {
        if (!expectedResults.costs || expectedResults.costs.length === 0) {
          console.warn('No cost test data found - skipping cost tests');
          return;
        }

        expectedResults.costs.forEach((expected: any) => {
          // REPLACE with actual domain method calls:
          const actual = domain.getCost(expected.inputParams);
          
          expectCalculationToMatch(
            actual,
            expected.result,
            0.05,
            `Cost calculation: ${expected.description}`
          );
        });
      });

      // ADD MORE TESTS BASED ON DOMAIN'S SPECIFIC METHODS:
      // - Aggregate calculations (if applicable)
      // - Special cases or conditional logic
      // - Cross-domain interactions
    });
  });
});

/**
 * SNAPSHOT SCRIPT TEMPLATE (create as scripts/generate-[domain]-snapshot.ts):
 * 
 * #!/usr/bin/env ts-node
 * 
 * // Mock browser APIs
 * global.localStorage = { getItem: () => null, setItem: () => {}, ... } as Storage;
 * 
 * import { loadTestGameData } from '../__tests__/utils/test-data-loader';
 * import { DomainClass } from '../data/domain/your-domain';
 * 
 * const saveName = process.argv[2] || 'demo-save';
 * const gameData = loadTestGameData(saveName);
 * const domain = gameData.get('domain-key') as DomainClass;
 * 
 * // Capture key calculations and save to JSON
 * const snapshotData = {
 *   bonuses: [ { description: "...", inputParams: {...}, result: domain.getBonus(...) } ],
 *   costs: [ { description: "...", inputParams: {...}, result: domain.getCost(...) } ]
 * };
 * 
 * fs.writeFileSync(outputPath, JSON.stringify(snapshotData, null, 2));
 */ 