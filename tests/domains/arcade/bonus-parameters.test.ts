/**
 * Validates the active companion input consumed by Arcade bonus calculations.
 *
 * Companion 27's active numeric value is a parameter, not an ownership
 * boolean: the game doubles an Arcade bonus only when that value is exactly 1.
 *
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
 Companion,
 getCompanionActiveBonus,
} from '../../../data/domain/companions';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const saveName = 'latest';
const extractionResultsName = 'arcade-bonus-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
 companion_27_active_bonus: {
  description: 'Companion 27 active bonus used by the Arcade multiplier gate',
  extractionKey: 'companion_27_active_bonus',
  domainExtractor: (gameData) => {
   return getCompanionActiveBonus(gameData.get('companions') as Companion[], 27);
  },
 },
};
describe('Arcade Domain - Bonus Parameters', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
 });

 Object.entries(parameterSpecs).forEach(([_, spec]) => {
  it(`validates ${spec.description}`, () => {
   const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
   const domainValue = spec.domainExtractor(gameData);
   expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
 });
});
