/**
 * Validates the dynamic multiplier used by The Button bonus accumulation.
 *
 * @testCovers Button.getBonusMultiplier
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Button } from '../../../data/domain/world-7/button';

const saveName = 'latest';
const extractionResultsName = 'button-bonus-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
 button_bonus_multi: {
  description: 'The Button dynamic bonus multiplier',
  extractionKey: 'button_bonus_multi',
  domainExtractor: (gameData) => {
   return (gameData.get('button') as Button).getBonusMultiplier();
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
