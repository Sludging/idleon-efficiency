/**
 * Orblet Market rows improve statue progression, Outpost collection and
 * clearing, kingdom ranks, Regal Intervention, Masterclass costs, connection
 * range, and Parchment drops. Glorification is omitted because its gameplay
 * effect is unavailable in the extracted descriptions and no direct caller was found.
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-orblet-market-bonus-data.json';
const marketRows = [
 { index: 0, name: 'Emulsion', effect: 'chance to gain statue experience when a Zenith Cluster forms' },
 { index: 1, name: 'Hydration', effect: 'resource collection for all Outposts' },
 { index: 2, name: 'Talented', effect: 'Talent Points granted to Royal Guardians' },
 { index: 3, name: 'Full Clear', effect: 'extra kills credited toward clearing mobs to build Outposts' },
 { index: 5, name: 'Intervene', effect: 'chance for Regal Intervention to trigger' },
 { index: 6, name: 'Stronk Rank', effect: 'kingdom units generate rank experience faster' },
 { index: 7, name: 'Bargain', effect: 'Masterclass upgrades cost less' },
 { index: 8, name: 'Long Range', effect: 'connection range for all Outposts' },
 { index: 9, name: 'Parchmore', effect: 'Parchment of Enchantment drop rate from Verminous Rats' },
] as const;

describe('Royal Armory Orblet Market bonuses', () => {
 let extractionResults: ExtractionResults;
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
 });

 marketRows.forEach(({ index, name, effect }) => {
  it(`matches ${effect} from the ${name} Market row`, () => {
   const liveValue = getExtractedValue(extractionResults, `orblet_market_bonus_${index}`);
   const domainValue = royalArmory.getOrbletMarketBonus(index);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory ${name} Market bonus: ${effect}`,
   });
  });
 });
});
