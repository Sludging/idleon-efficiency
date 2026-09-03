/**
 * Statue Bonus Parameters - Validates all inputs to updateStatueBonuses()
 *
 * The statue bonus calculation applies:
 *   level * statueData.bonus * talentBonus
 *     * (type >= Onyx ? onyxStatueBonus : 1)           // 2 + artifact_30_bonus/100
 *     * (type >= Zenith ? zenithStatueBonus : 1)        // max(1, 1 + (50 + zenithMarket_0_bonus) / 100)
 *     * otherBonuses                                    // (1 + eventShop19/100) * (1 + voodoo/100) * (1 + meritocraty26/100)
 *     * upgradeVaultBonus (indices [0,1,2,6] only)      // 1 + upgradeVault_25_bonus/100
 *     * dragonStatueBonus (all statues except index 29) // 1 + dragonStatue.getBonus()/100
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { ZenithMarket } from '../../../data/domain/world-7/zenithShop';
import { EventShop } from '../../../data/domain/eventShop';
import { Meritocraty } from '../../../data/domain/world-7/meritocraty';
import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { Player } from '../../../data/domain/player';

const saveName = 'latest';
const extractionResultsName = 'statue-bonuses-data.json';

const player0TalentBonus = (gameData: Map<string, unknown>, skillIndex: number): number => {
 const players = gameData.get("players") as Player[];
 const player0 = players.find(player => player.playerID === 0);
 return player0?.talents.find(talent => talent.skillIndex === skillIndex)?.getBonus() ?? 0;
};

const statueParameterSpecs: Record<string, ParameterTestSpec> = {
 // ===== ONYX/ZENITH MULTIPLIER INPUTS =====
 artifact_30_bonus: {
  description: 'Sailing artifact 30 (Onyx Lantern) bonus - added to base onyxStatueBonus of 2',
  extractionKey: 'artifact_30_bonus',
  domainExtractor: (gameData) => {
   const sailing = gameData.get("sailing") as Sailing;
   return Math.max(0, sailing.artifacts[30].getBonus());
  }
 },
 zenith_market_0_bonus: {
  description: 'ZenithMarket bonus 0 (True Zen) - added to base 50 in zenithStatueBonus',
  extractionKey: 'zenith_market_0_bonus',
  domainExtractor: (gameData) => {
   const zenithMarket = gameData.get("zenithMarket") as ZenithMarket;
   return zenithMarket.getBonusForId(0);
  }
 },

 // ===== STATUE TALENT INPUTS =====
 talent_37_bonus: {
  description: 'Talent 37 bonus (Feasty, Kachow, and Ehexpee statues)',
  extractionKey: 'talent_37_bonus',
  domainExtractor: (gameData) => player0TalentBonus(gameData, 37)
 },
 talent_112_bonus: {
  description: 'Talent 112 bonus (Power, Mining, and Oceanman statues)',
  extractionKey: 'talent_112_bonus',
  domainExtractor: (gameData) => player0TalentBonus(gameData, 112)
 },
 talent_127_bonus: {
  description: 'Talent 127 bonus (Power, Mining, and Thicc Skin statues)',
  extractionKey: 'talent_127_bonus',
  domainExtractor: (gameData) => player0TalentBonus(gameData, 127)
 },
 talent_292_bonus: {
  description: 'Talent 292 bonus (Speed, Anvil, and Ol Reliable statues)',
  extractionKey: 'talent_292_bonus',
  domainExtractor: (gameData) => player0TalentBonus(gameData, 292)
 },
 talent_307_bonus: {
  description: 'Talent 307 bonus (Speed, Anvil, and Bullseye statues)',
  extractionKey: 'talent_307_bonus',
  domainExtractor: (gameData) => player0TalentBonus(gameData, 307)
 },
 talent_472_bonus: {
  description: 'Talent 472 bonus (Exp, Lumberbob, and Beholder statues)',
  extractionKey: 'talent_472_bonus',
  domainExtractor: (gameData) => player0TalentBonus(gameData, 472)
 },
 talent_487_bonus: {
  description: 'Talent 487 bonus (Exp, Lumberbob, and Cauldron statues)',
  extractionKey: 'talent_487_bonus',
  domainExtractor: (gameData) => player0TalentBonus(gameData, 487)
 },

 // ===== OTHER BONUSES MULTIPLIER INPUTS =====
 event_shop_19_owned: {
  description: 'Event shop bonus 19 (statue bonus) - returns 30 if owned, 0 otherwise',
  extractionKey: 'event_shop_19_owned',
  domainExtractor: (gameData) => {
   const eventShop = gameData.get("eventShop") as EventShop;
   return eventShop.isBonusOwned(19) ? 30 : 0;
  }
 },
 meritocracy_26_bonus: {
  description: 'Meritocracy bonus 26 (statue bonus) - 0 if not the currently selected bonus',
  extractionKey: 'meritocracy_26_bonus',
  domainExtractor: (gameData) => {
   const meritocraty = gameData.get("meritocraty") as Meritocraty;
   return meritocraty.getCurrentBonus(26);
  }
 },
 upgrade_vault_25_bonus: {
  description: 'UpgradeVault upgrade 25 computed bonus (%) - applied to statues at indices [0,1,2,6]',
  extractionKey: 'upgrade_vault_25_bonus',
  domainExtractor: (gameData) => {
   const upgradeVault = gameData.get("upgradeVault") as UpgradeVault;
   return upgradeVault.getBonusForId(25);
  }
 },
 voodoo_statufication_bonus: {
  description: 'Voodoo Statufication talent bonus (skillIndex 56) from best player (-1 = all players)',
  extractionKey: 'voodoo_statufication_bonus',
  domainExtractor: (gameData) => {
   const playerData = gameData.get("players") as Player[];
   const bestVoidMan = playerData.reduce((final, player) =>
    final = (player.talents.find(talent => talent.skillIndex == 56)?.level ?? 0) > 0
     && player.playerID > final.playerID ? player : final, playerData[0]);
   return bestVoidMan?.talents.find(talent => talent.skillIndex == 56)?.getBonus() ?? 0;
  }
 },
};

describe('Statue Bonuses - Parameters', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, unknown>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
 });

 Object.entries(statueParameterSpecs).forEach(([_, spec]) => {
  it(`validates ${spec.description}`, () => {
   const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
   const domainValue = spec.domainExtractor(gameData);
   expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
 });
});
