/**
 * Tome Bonus directly uses the Tome score, Grimoire upgrade 17 bonus, Troll
 * equipment set bonus, ownership of the Golden Tome and Singed Tome Event Shop
 * items, and player 0's final Alchemy bubble bonuses for +{% STR, +{% AGI,
 * and +{% WIS. The Alchemy bubble bonuses are validated here as direct
 * cross-domain parameters.
 */
import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import type { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import type { EventShop } from '../../../data/domain/eventShop';
import type { Grimoire } from '../../../data/domain/grimoire';
import type { Tome } from '../../../data/domain/world-4/tome';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Player } from '../../../data/domain/player';

const saveName = 'latest';
const extractionResultsName = 'tome-bonus-data.json';
// Game extraction reads cached total score while the domain recomputes current Tome lines; keep this bound narrow to retain failure detection.
const DIRECT_TOME_SCORE_TOLERANCE = 0.001;

const parameterSpecs: Record<string, ParameterTestSpec> = {
 tome_bonus_score: {
  description: 'Tome score that scales Damage and unlocks Skill Efficiency and Drop Rate bonuses',
  extractionKey: 'tome_bonus_score',
  domainExtractor: (gameData) => (gameData.get('tome') as Tome).getHighestScore(),
 },
 tome_bonus_grimoire_17: {
  description: 'Grimoire upgrade 17 contribution to Tome score bonuses',
  extractionKey: 'tome_bonus_grimoire_17',
  domainExtractor: (gameData) => {
   const grimoire = gameData.get('grimoire') as Grimoire;
   return grimoire.getUpgradeBonus(17);
  },
 },
 tome_bonus_troll_set: {
  description: 'Troll equipment set contribution to Tome score bonuses',
  extractionKey: 'tome_bonus_troll_set',
  domainExtractor: (gameData) => {
   const equipmentSets = gameData.get('equipmentSets') as EquipmentSets;
   return equipmentSets.getSetBonus('TROLL_SET', undefined, true);
  },
 },
 tome_bonus_alchemy_str: {
  description: 'Player 0 final Alchemy Strength stat bonus used by Tome STR',
  extractionKey: 'tome_bonus_alchemy_str',
  domainExtractor: (gameData) => {
   const alchemy = gameData.get('alchemy') as Alchemy;
   const players = gameData.get('players') as Player[];
   return alchemy.getBubbleBonusForKey('W8', players[0]);
  },
 },
 tome_bonus_alchemy_agi: {
  description: 'Player 0 final Alchemy Agility stat bonus used by Tome AGI',
  extractionKey: 'tome_bonus_alchemy_agi',
  domainExtractor: (gameData) => {
   const alchemy = gameData.get('alchemy') as Alchemy;
   const players = gameData.get('players') as Player[];
   return alchemy.getBubbleBonusForKey('A9', players[0]);
  },
 },
 tome_bonus_alchemy_wis: {
  description: 'Player 0 final Alchemy Wisdom stat bonus used by Tome WIS',
  extractionKey: 'tome_bonus_alchemy_wis',
  domainExtractor: (gameData) => {
   const alchemy = gameData.get('alchemy') as Alchemy;
   const players = gameData.get('players') as Player[];
   return alchemy.getBubbleBonusForKey('M9', players[0]);
  },
 },
 tome_bonus_event_shop_0: {
  description: 'Golden Tome ownership gates the Golden Tome Damage Multi bonus',
  extractionKey: 'tome_bonus_event_shop_0',
  domainExtractor: (gameData) => {
   const eventShop = gameData.get('eventShop') as EventShop;
   return eventShop.isBonusOwned(0) ? 1 : 0;
  },
 },
 tome_bonus_event_shop_27: {
  description: 'Singed Tome ownership gates the Singed Tome Drop Rate Multi bonus',
  extractionKey: 'tome_bonus_event_shop_27',
  domainExtractor: (gameData) => {
   const eventShop = gameData.get('eventShop') as EventShop;
   return eventShop.isBonusOwned(27) ? 1 : 0;
  },
 },
};

describe('Tome Domain - Bonuses - Parameters', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
 });

 Object.entries(parameterSpecs).forEach(([_, spec]) => {
  it(`matches ${spec.description}`, () => {
   const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
   const domainValue = spec.domainExtractor(gameData);
   expect(domainValue).toMatchLiveGame(liveValue, spec.extractionKey === 'tome_bonus_score' ? DIRECT_TOME_SCORE_TOLERANCE : 0);

  });
 });
});
