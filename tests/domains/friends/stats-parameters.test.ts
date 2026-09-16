/**
 * Friend Bonus parameter checks.
 *
 * These comparisons cover the companion and Event Shop values used to derive
 * available slots and the multiplier applied to each assigned Friend Bonus.
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import {
 Companion,
 getCompanionActiveBonus,
 isCompanionLevelTwo,
} from '../../../data/domain/companions';
import { EventShop } from '../../../data/domain/eventShop';

const saveName = 'latest';
const extractionResultsName = 'friend-bonus-stats-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
 friend_bonus_companion_44: {
  description: 'Spearfish active bonus adds one Friend Bonus slot',
  extractionKey: 'friend_bonus_companion_44',
  domainExtractor: (gameData) => getCompanionActiveBonus(gameData.get('companions') as Companion[], 44),
 },
 friend_bonus_companion_30: {
  description: 'Mr Pig active bonus contributes 1.5 slots and 150% to the Friend Bonus multiplier',
  extractionKey: 'friend_bonus_companion_30',
  domainExtractor: (gameData) => getCompanionActiveBonus(gameData.get('companions') as Companion[], 30),
 },
 friend_bonus_companion_lv2_44: {
  description: 'Spearfish level-two state adds 25% to the Friend Bonus multiplier',
  extractionKey: 'friend_bonus_companion_lv2_44',
  domainExtractor: (gameData) => isCompanionLevelTwo(gameData.get('companions') as Companion[], 44),
 },
 friend_bonus_event_shop_22: {
  description: 'Friendly Slot ownership adds one Friend Bonus slot',
  extractionKey: 'friend_bonus_event_shop_22',
  domainExtractor: (gameData) => {
   const eventShop = gameData.get('eventShop') as EventShop;
   return eventShop.isBonusOwned(22) ? 1 : 0;
  },
 },
};

describe('Friends Domain - Stats - Parameters', () => {
 let extractionResults: ExtractionResults;
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
