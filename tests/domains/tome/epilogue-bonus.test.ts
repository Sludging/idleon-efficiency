/**
 * Tome epilogue bonus calculation tests.
 *
 * @testCovers Tome.getEpilogueBonus
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Tome } from '../../../data/domain/world-4/tome';

const saveName = 'latest';
const extractionResultsName = 'tome-epilogue-bonus-data.json';
const epilogueBonusIndices = Array.from({ length: 11 }, (_, index) => index);

describe('Tome Domain - Epilogue Bonus', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;
 let tome: Tome;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  tome = gameData.get('tome') as Tome;

  if (!tome) {
   throw new Error('Tome domain not found in save data');
  }
 });

 epilogueBonusIndices.forEach(index => {
  it(`matches the game LoreEpiBon calculation for epilogue index ${index}`, () => {
   const liveBonus = getExtractedValue(extractionResults, `lore_epic_bonus_${index}`);

   expect(tome.getEpilogueBonus(index)).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: 0,
    context: `Tome epilogue index-${index} bonus`,
   });
  });
 });
});
