/**
 * Minehead opponent bonuses compared with their account-wide game rewards.
 *
 * The saved state exercises earned rewards through the strict defeated-count
 * boundary and two later locked rewards, plus the preview values shown before
 * those opponents are defeated. The selected later previews verify that
 * locked rewards remain visible in the opponent preview without being earned.
 */

import { Minehead } from '../../../data/domain/world-7/minehead';
import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'minehead-data.json';

const normalBonusCases = [
 {
  index: 0,
  extractionKey: 'minehead_bonus_0',
  description: 'Bronzehead Total Damage and Drop Rate reward earned after its defeat',
 },
 {
  index: 12,
  extractionKey: 'minehead_bonus_12',
  description: 'Maizehead Research Magnifier reward earned before the strict defeat boundary',
 },
 {
  index: 13,
  extractionKey: 'minehead_bonus_13',
  description: 'Ironhead Grind Time bubble-level reward remains locked at the defeat boundary',
 },
 {
  index: 21,
  extractionKey: 'minehead_bonus_21',
  description: 'Brainhead Hat Rack bonus-multiplier reward remains locked before defeat',
 },
 {
  index: 31,
  extractionKey: 'minehead_bonus_31',
  description: 'Boghead has no earned reward before its late progression defeat',
 },
] as const;

const previewBonusCases = [
 {
  index: 21,
  extractionKey: 'minehead_preview_21',
  description: 'Brainhead preview shows the Hat Rack bonus-multiplier reward before defeat',
 },
 {
  index: 31,
  extractionKey: 'minehead_preview_31',
  description: 'Boghead preview shows its current opponent reward before defeat',
 },
] as const;

describe('Minehead Domain - Opponent Bonuses', () => {
 let extractionResults: ExtractionResults;
 let minehead: Minehead;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);

  const gameData = loadGameDataFromSave(saveName);
  minehead = gameData.get('minehead') as Minehead;
 });

 normalBonusCases.forEach(({ index, extractionKey, description }) => {
  it(`matches the game ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = minehead.getBonusFromIndex(index);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Minehead opponent reward ${index}: ${description}`,
   });
  });
 });

 previewBonusCases.forEach(({ index, extractionKey, description }) => {
  it(`matches the game ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const opponent = minehead.opponents.find(candidate => candidate.index === index);
   if (!opponent) {
    throw new Error(`Minehead opponent ${index} is not present in the initialized domain`);
   }
   const domainValue = opponent.getBaseBonus();

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Minehead opponent preview ${index}: ${description}`,
   });
  });
 });
});

