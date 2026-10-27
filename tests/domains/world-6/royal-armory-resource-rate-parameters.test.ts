/**
 * Direct calculations consumed by the Royal Armory hourly collection rate.
 * Each selected parameter is compared with the game's result for the same save.
 * Account talent maxima use the selected recipient's talent modifiers,
 * not each talent owner's settled bonus.
 */

import {
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Arcade } from '../../../data/domain/world-2/arcade';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { Player } from '../../../data/domain/player';
import { OutpostRank } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory, getRoyalGuardianContribution } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { RoyalUnitRole } from '../../../data/domain/world-6/royalArmory/units';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { ZenithMarket } from '../../../data/domain/world-7/zenithShop';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { getTargetPlayer } from '../../utils/target-player';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-resource-rate-data.json';

type ParameterComparison = {
 description: string;
 extractionKey: string;
 domainValue: (gameData: Map<string, any>) => number | undefined;
};

const parameterComparisons: ParameterComparison[] = [
 {
  description: 'Companion 141 bonus used by the Royal Armory rate',
  extractionKey: 'royal_armory_rate_companion_141',
  domainValue: gameData => {
   const companions = gameData.get('companions') as Companion[];
   return getCompanionActiveBonus(companions, 141);
  },
 },
 {
  description: 'Outpost purification bonus used by the Royal Armory rate',
  extractionKey: 'royal_armory_rate_outpost_purify_bonus',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.resourceCollectionBonuses.purificationBonus;
  },
 },
 {
  description: 'Total supports contributing to Royal Armory row 1',
  extractionKey: 'royal_armory_rate_total_supports_row_1',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.getTotalSupports(1);
  },
 },
 {
  description: 'Support Collection bonus used by the Royal Armory rate',
  extractionKey: 'royal_armory_rate_support_collection',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.resourceCollectionBonuses.supportCollectionBonus;
  },
 },
 {
  description: 'Sushi quantity bonus 60 used by the Royal Armory rate',
  extractionKey: 'royal_armory_rate_sushi_60',
  domainValue: gameData => {
   const sushi = gameData.get('sushi') as SushiStation;
   return sushi.getBonusFromIndex(60);
  },
 },
 {
  description: 'Arcade bonus 70 used by the Royal Armory rate',
  extractionKey: 'royal_armory_rate_arcade_70',
  domainValue: gameData => {
   const arcade = gameData.get('arcade') as Arcade;
   return arcade.bonuses.find(bonus => bonus.index === 70)?.getBonus();
  },
 },
 {
  description: 'Royal Armory upgrade 18 used with row stat 0',
  extractionKey: 'royal_armory_rate_armory_upgrade_18',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.getUpgradeBonus(18);
  },
 },
 {
  description: 'Royal Armory upgrade 50 used with row stat 1',
  extractionKey: 'royal_armory_rate_armory_upgrade_50',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.getUpgradeBonus(50);
  },
 },
 {
  description: 'Royal Armory upgrade 51 used with row stat 2',
  extractionKey: 'royal_armory_rate_armory_upgrade_51',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.getUpgradeBonus(51);
  },
 },
 {
  description: 'Royal Armory upgrade 52 used with the explicit character-level factor',
  extractionKey: 'royal_armory_rate_armory_upgrade_52',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.getUpgradeBonus(52);
  },
 },
 {
  description: 'Royal Armory upgrade 53 used with row stat 3',
  extractionKey: 'royal_armory_rate_armory_upgrade_53',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.getUpgradeBonus(53);
  },
 },
 {
  description: 'Royal Armory upgrade 70 used by the shared percentage multiplier',
  extractionKey: 'royal_armory_rate_armory_upgrade_70',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.getUpgradeBonus(70);
  },
 },
 {
  description: 'Royal Armory upgrade 73 used with row experience rank 2',
  extractionKey: 'royal_armory_rate_armory_upgrade_73',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.getUpgradeBonus(73);
  },
 },
 {
  description: 'Recipient-specific account talent 225 bonus used by the Royal Armory rate',
  extractionKey: 'royal_armory_rate_talent_225_best',
  domainValue: gameData => {
   const players = gameData.get('players') as Player[];
   const alchemy = gameData.get('alchemy') as Alchemy;
   return getRoyalGuardianContribution(getTargetPlayer(players), alchemy, players).collectionTalentBonus;
  },
 },
 {
  description: 'Recipient-specific account talent 226 bonus used by the Royal Armory rate',
  extractionKey: 'royal_armory_rate_talent_226_best',
  domainValue: gameData => {
   const players = gameData.get('players') as Player[];
   const alchemy = gameData.get('alchemy') as Alchemy;
   return getRoyalGuardianContribution(getTargetPlayer(players), alchemy, players).guardianTalentBonus;
  },
 },
 {
  description: 'Recipient-specific account talent 230 multiplier used by the Royal Armory rate',
  extractionKey: 'royal_armory_rate_talent_230_best',
  domainValue: gameData => {
   const players = gameData.get('players') as Player[];
   const alchemy = gameData.get('alchemy') as Alchemy;
   return getRoyalGuardianContribution(getTargetPlayer(players), alchemy, players).collectionTalentMultiplier;
  },
 },
 {
  description: 'Zenith market bonus 10 applied to the Royal Armory rate',
  extractionKey: 'royal_armory_rate_zenith_market_10',
  domainValue: gameData => {
   const zenithMarket = gameData.get('zenithMarket') as ZenithMarket;
   return zenithMarket.getBonusForId(10);
  },
 },
 {
  description: 'Outpost experience rank 2 for Royal Armory row 1',
  extractionKey: 'royal_armory_rate_outpost_exp_rank_row_1_rank_2',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.mapStates.get(1)!.getRankProgress(OutpostRank.Command).level;
  },
 },
 {
  description: 'Orblet market bonus 1 used by the Royal Armory rate',
  extractionKey: 'royal_armory_rate_orblet_market_1',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.getOrbletMarketBonus(1);
  },
 },
 {
  description: 'Total unit count for Royal Armory row 1, unit type 0',
  extractionKey: 'royal_armory_rate_total_units_row_1_0',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.mapStates.get(1)!.units.getTotalCount(RoyalUnitRole.Worker);
  },
 },
 {
  description: 'Unit specialization percentage used by the Royal Armory rate',
  extractionKey: 'royal_armory_rate_unit_spec_effect_0',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   return royalArmory.units.getRole(RoyalUnitRole.Worker).effect;
  },
 },
 {
  description: 'Map purification state for Royal Armory row 1',
  extractionKey: 'royal_armory_rate_is_map_purified_row_1',
  domainValue: gameData => {
   const royalArmory = gameData.get('royalArmory') as RoyalArmory;
   const map = royalArmory.mapStates.get(1)!;
   return Number(map.isOutpost() && map.purified);
  },
 },
 {
  description: 'Royal Armory resource grades that scale Outpost collection',
  extractionKey: 'royal_armory_rate_total_statz_0',
  domainValue: gameData => (gameData.get('royalArmory') as RoyalArmory).totalResourceGrade,
 },
 {
  description: 'Royal Guardian outpost upgrade levels that scale collection',
  extractionKey: 'royal_armory_rate_total_statz_1',
  domainValue: gameData => (gameData.get('royalArmory') as RoyalArmory).totalOutpostUpgradeLevels,
 },
 {
  description: 'purified outposts that increase the account collection bonus',
  extractionKey: 'royal_armory_rate_total_statz_2',
  domainValue: gameData => (gameData.get('royalArmory') as RoyalArmory).purifiedOutpostCount,
 },
 {
  description: 'log-scaled owned Top of List resources that scale collection',
  extractionKey: 'royal_armory_rate_total_statz_3',
  domainValue: gameData => (gameData.get('royalArmory') as RoyalArmory).resourceQuantityLogTotal,
 },
 {
  description: 'W14 alchemy bubble bonus for the player used by the Outpost rate, before its cap',
  extractionKey: 'royal_armory_rate_alchemy_w14_raw',
  domainValue: gameData => {
   const alchemy = gameData.get('alchemy') as Alchemy;
   const players = gameData.get("players") as Player[];
   return alchemy.getBubbleBonusForKey('W14', getTargetPlayer(players));
  },
 }
];


describe('Royal Armory resource-rate direct parameters', () => {
 let gameData: Map<string, any>;

 beforeAll(() => {
  gameData = loadGameDataFromSave(saveName);
 });

 parameterComparisons.forEach(({ description, extractionKey, domainValue }) => {
  it(`matches ${description}`, () => {
   const extractionResults = loadExtractionResults(extractionResultsName);
   validateExtractionHealth(extractionResults);
   const liveValue = getExtractedValue(extractionResults, extractionKey);

   expect(domainValue(gameData)).toMatchLiveGame(liveValue, 0);
  });
 });


});
