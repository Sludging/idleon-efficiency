/**
 * Sushi Station Unlock Bonus Calculation Tests
 *
 * Validates the reusable SushiStuff("RoG_BonusQTY", index, 0) calculation for
 * every current delivered-game caller index.
 *
 * @testCovers Sushi.getBonus
 * @testCovers SushiStation.getBonusFromIndex
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { SushiStation } from '../../../data/domain/world-7/sushi';

const saveName = 'latest';
const extractionResultsName = 'sushi-station-unlock-bonuses-data.json';
const sushiIndices = [23, 26, 41, 44, 50, 51];

describe('Sushi Station - Unlock Bonuses', () => {
 let extractionResults: any;
 let sushi: SushiStation;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const gameData = loadGameDataFromSave(saveName);
  sushi = gameData.get('sushi') as SushiStation;
 });

 sushiIndices.forEach(index => {
  it(`validates unlock bonus calculation for index ${index}`, () => {
   const extractedBonus = getExtractedValue(extractionResults, `sushi_rog_bonus_qty_${index}`);
   const calculatedBonus = sushi.getBonusFromIndex(index);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: `Sushi unlock bonus at internal index ${index}`,
   });
  });
 });
});
