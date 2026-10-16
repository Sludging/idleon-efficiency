/**
 * The Button bonus calculation tests.
 *
 * Each category effect is compared with its saved-press extraction after the
 * dynamic multiplier. All nine categories are tested because the rotation is small.
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Button } from '../../../data/domain/world-7/button';

const saveName = 'latest';
const extractionResultsName = 'button-bonus-data.json';

const bonusCases = [
 { index: 0, extractionKey: 'button_bonus_0', description: 'Research XP' },
 { index: 1, extractionKey: 'button_bonus_1', description: 'Minehead Currency' },
 { index: 2, extractionKey: 'button_bonus_2', description: 'Sushi Bucks' },
 { index: 3, extractionKey: 'button_bonus_3', description: 'Artifact Odds' },
 { index: 4, extractionKey: 'button_bonus_4', description: 'Xtra Masterclass Drops' },
 { index: 5, extractionKey: 'button_bonus_5', description: 'Spelunk POW' },
 { index: 6, extractionKey: 'button_bonus_6', description: 'Cooking SPD' },
 { index: 7, extractionKey: 'button_bonus_7', description: 'Crop Evo' },
 { index: 8, extractionKey: 'button_bonus_8', description: 'Class EXP' },
];

describe('The Button - Bonus Calculations', () => {
 let extractionResults: ExtractionResults;
 let button: Button;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  button = loadGameDataFromSave(saveName).get('button') as Button;
 });
 it('validates the dynamic Button bonus multiplier', () => {
  const liveValue = getExtractedValue(extractionResults, 'button_bonus_multi');
  const domainValue = button.getBonusMultiplier();

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'The Button dynamic bonus multiplier',
  });
 });
 it('matches the next bonus category selected from completed presses', () => {
  const liveValue = getExtractedValue(extractionResults, 'button_next_bonus_index');

  expect(button.getNextBonusIndex()).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'The next Button bonus category',
  });
 });



 bonusCases.forEach(({ index, extractionKey, description }) => {
  it(`validates accumulated ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = button.getBonusForIndex(index);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `The Button accumulated ${description}`,
   });
  });
 });

});
