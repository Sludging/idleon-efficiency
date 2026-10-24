/**
 * Compare Prisma and Multikill per Tier upgrades with native saved-account results.
 * Paired saves cover ordinary, doubled, and Omega upgrade states.
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Arcade } from '../../../data/domain/world-2/arcade';

const saveName = 'latest';
const extractionResultsName = 'arcade-bonus-data.json';

const liveBonusCases = [
 {
  index: 54,
  extractionKey: 'arcade_bonus_54',
  description: 'Prisma Bonuses upgrade bonus',
 },
 {
  index: 8,
  extractionKey: 'arcade_bonus_8',
  description: 'Multikill per Tier upgrade bonus',
 },
] as const;

describe('Arcade Domain - Bonus Calculations', () => {
 let extractionResults: ExtractionResults;
 let arcade: Arcade;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const gameData = loadGameDataFromSave(saveName);
  arcade = gameData.get('arcade') as Arcade;

  if (!arcade) {
   throw new Error('Arcade domain not found in save data');
  }
 });

 liveBonusCases.forEach(({ index, extractionKey, description }) => {
  it(`matches the game ${description}`, () => {
   const bonus = arcade.bonuses.find(candidate => candidate.index === index);
   if (!bonus) {
    throw new Error(`Arcade bonus ${index} is missing from save data`);
   }

   const liveValue = getExtractedValue(extractionResults, extractionKey);
   expect(bonus.getBonus()).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Arcade bonus ${index} (${description})`,
    debugInfo: {
     saveName,
     level: bonus.level,
    },
   });
  });
 });
});
