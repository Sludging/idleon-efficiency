/**
 * Validates the cross-domain inputs used by The Button bonus multiplier.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Companion, getCompanionBonus } from '../../../data/domain/companions';
import { ResearchGrid } from '../../../data/domain/world-7/research';

const saveName = 'latest';
const extractionResultsName = 'button-bonus-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
 companion_bonus_147: {
  description: 'Companion 147 bonus that increases The Button multiplier',
  extractionKey: 'companion_bonus_147',
  domainExtractor: (gameData) => {
   return getCompanionBonus(gameData.get('companions') as Companion[], 147);
  }
 },
 grid_bonus_125: {
  description: 'Research Grid Better Button bonus at index 125',
  extractionKey: 'grid_bonus_125',
  domainExtractor: (gameData) => {
   return (gameData.get('research') as ResearchGrid).getBonusForId(125);
  }
 }
};

describe('The Button - Bonus Parameters', () => {
 let extractionResults: any;
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
