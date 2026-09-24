/**
 * Account-wide Shimmer bonuses after The Shim Lantern's capped boost.
 *
 * The seven comparisons cover the stat-to-account-slot mappings, not seven
 * multiplier branches. The live account's artifact rarity determines which
 * clamp behavior is exercised; zero base amounts cannot verify the boost.
 *
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { IslandExpeditions } from '../../../data/domain/world-2/islandExpedition';

const saveName = 'latest';
const extractionResultsName = 'island-expeditions-shimmer-bonuses-data.json';

const shimmerBonuses = [
 { index: 0, label: 'shimmer_bonus_0', description: 'Base STR' },
 { index: 1, label: 'shimmer_bonus_1', description: 'Base AGI' },
 { index: 2, label: 'shimmer_bonus_2', description: 'Base WIS' },
 { index: 3, label: 'shimmer_bonus_3', description: 'Base LUK' },
 { index: 4, label: 'shimmer_bonus_4', description: 'Total Damage percentage points' },
 { index: 5, label: 'shimmer_bonus_5', description: 'Class EXP percentage points' },
 { index: 6, label: 'shimmer_bonus_6', description: 'Skill Efficiency percentage points' },
] as const;

describe('Island Expeditions Domain - Shimmer Bonuses', () => {
 let extractionResults: ExtractionResults;
 let expeditions: IslandExpeditions & { getShimmerBonus?: (index: number) => number };

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const gameData = loadGameDataFromSave(saveName);
  expeditions = gameData.get('islandExpeditions');
 });

 shimmerBonuses.forEach(({ index, label, description }) => {
  it(`matches the complete Shimmer bonus for ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, label);
   if (typeof expeditions?.getShimmerBonus !== 'function') {
    throw new Error(`MISSING OWNER API - IslandExpeditions.getShimmerBonus(${index}) must expose OptionsListAccount[${174 + index}] * Dreamstuff("AllShimmerBonuses", 0)`);
   }
   const domainValue = expeditions.getShimmerBonus(index);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Shimmer ${description}`,
    debugInfo: {
     saveName,
     accountOptionIndex: 174 + index,
     shimLanternBonus: getExtractedValue(extractionResults, 'shimmer_artifact_31'),
    },
   });
  });
 });
});
