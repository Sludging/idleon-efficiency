/**
 * Friend Bonuses / Stats direct-parameter validation.
 *
 * FriendBonusStatz rebuilds its saved assignments through FriendBonusSlots
 * and FriendBonusQTY, then applies FriendBonusXtraMulti. The same-dispatcher
 * helpers are internal to the selected Friends calculation, so this file
 * checks the cross-domain seams they use directly: Companion bonuses 44 and
 * 30, Companion level-two state 44, and Event Shop Friendly Slot 22.
 *
 * OptionsListAccount[476] remains raw save plumbing. FriendBonusQTY receives
 * the saved sender account level and is not a separate domain dependency.
 */

import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Companion, getCompanionBonus } from '../../../data/domain/companions';
import { EventShop } from '../../../data/domain/eventShop';

const saveName = 'latest';
const extractionResultsName = 'friend-bonus-stats-data.json';

const missingOwnerApi = (signature: string): never => {
  throw new Error(`MISSING OWNER API - ${signature} is not exposed by its owning domain`);
};

const parameterSpecs: Record<string, ParameterTestSpec> = {
  friend_bonus_companion_44: {
    description: 'Companion 44 bonus that adds one Friend Bonus slot',
    extractionKey: 'friend_bonus_companion_44',
    domainExtractor: (gameData) => getCompanionBonus(gameData.get('companions') as Companion[], 44),
  },
  friend_bonus_companion_30: {
    description: 'Companion 30 base effect used for the 2x Friend Bonuses multiplier and two extra slots',
    extractionKey: 'friend_bonus_companion_30',
    domainExtractor: (gameData) => getCompanionBonus(gameData.get('companions') as Companion[], 30),
  },
  friend_bonus_companion_lv2_44: {
    description: 'Companion 44 level-two state used for the extra 25% Friend Bonuses multiplier',
    extractionKey: 'friend_bonus_companion_lv2_44',
    domainExtractor: () => missingOwnerApi('CompLV2(44)'),
  },
  friend_bonus_event_shop_22: {
    description: 'Friendly Slot Event Shop ownership that adds one Friend Bonus slot',
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
