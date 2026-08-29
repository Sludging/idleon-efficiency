/**
 * The Button bonus calculation tests.
 *
 * The game accumulates each static per-press value in a repeating
 * nine-category schedule, then applies Button_BonusMULTI.
 *
 * @testCovers Button.getBonusForIndex
 * @testCovers ButtonBonus.getBonus
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Button } from '../../../data/domain/world-7/button';

const saveName = 'latest';
const extractionResultsName = 'button-bonus-data.json';

const bonusCases = [
 { index: 0, extractionKey: 'button_bonus_0', description: 'first category' },
 { index: 7, extractionKey: 'button_bonus_7', description: 'downstream cooking category' },
 { index: 8, extractionKey: 'button_bonus_8', description: 'final category' },
];

describe('The Button - Bonus Calculations', () => {
 let extractionResults: ExtractionResults;
 let button: Button;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  button = loadGameDataFromSave(saveName).get('button') as Button;
 });

 bonusCases.forEach(({ index, extractionKey, description }) => {
  it(`validates ${description} bonus at index ${index}`, () => {
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = button.getBonusForIndex(index);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `The Button ${description} bonus at index ${index}`,
   });
  });
 });

 it('returns zero for unknown bonus indexes', () => {
  expect(button.getBonusForIndex(-1)).toBe(0);
  expect(button.getBonusForIndex(999)).toBe(0);
 });
});
