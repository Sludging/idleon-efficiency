import { Food } from '../../../data/domain/items';
import type { Player } from '../../../data/domain/player';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Poppy } from '../../../data/domain/world-2/poppy';
import type { Bubba } from '../../../data/domain/world-3/bubba';
import type { Summoning } from '../../../data/domain/world-6/summoning';
import type { Farming } from '../../../data/domain/world-6/farming';
import type { Orion } from '../../../data/domain/world-1/orion';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import type { Bribe } from '../../../data/domain/world-1/bribes';
import { getStampBonusForKey, type Stamp } from '../../../data/domain/world-1/stamps';
import type { UpgradeVault } from '../../../data/domain/upgradeVault';
import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Persistent player damage component direct parameters', () => {
  let player: Player;
  let data: Map<string, any>;
  let native: ExtractionResults;

  beforeAll(() => {
    native = loadExtractionResults('player-damage-components-parameters-data.json');
    validateExtractionHealth(native);
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
  });

  const expectNative = (domainValue: number, key: string, context: string) => {
    expect(domainValue).toMatchLiveGameWithDetails(getExtractedValue(native, key), {
      tolerance: 0,
      context,
    });
  };

  it.each([
    ['bdmgHP', 'damage_bubble_bdmg_hp'],
    ['bdmgSPD', 'damage_bubble_bdmg_spd'],
    ['bdmgMP', 'damage_bubble_bdmg_mp'],
    ['W6', 'damage_bubble_w6'],
    ['A6', 'damage_bubble_a6'],
    ['M6', 'damage_bubble_m6'],
    ['W12', 'damage_bubble_w12'],
    ['A12', 'damage_bubble_a12'],
    ['M12', 'damage_bubble_m12'],
  ] as const)('matches native Alchemy bubble %s used by B or C', (key, extractionKey) => {
    const alchemy = data.get('alchemy') as Alchemy;
    expectNative(alchemy.getBubbleBonusForKey(key, player), extractionKey, `Alchemy ${key}`);
  });

  it('matches normal-character maximum HP used by B and C', () => {
    expectNative(player.health.getMaxHP(), 'damage_maximum_hp', `Player ${player.playerID} maximum HP`);
  });

  it('matches normal-character maximum MP used by C', () => {
    expectNative(player.health.getMaxMP(), 'damage_maximum_mp', `Player ${player.playerID} maximum MP`);
  });

  it('matches movement speed used by B and C', () => {
    expectNative(player.stats.movementSpeed, 'damage_movement_speed', `Player ${player.playerID} movement speed`);
  });

  it.each([
    [97, 'damage_talent_97', 'weapon-power talent input'],
    [5, 'damage_talent_5', 'flat base-damage talent input'],
    [113, 'damage_talent_113', 'additive damage talent input'],
    [284, 'damage_talent_284', 'Smithing-level-scaled damage talent input'],
  ] as const)('matches native %s as a representative direct talent input', (index, key, effect) => {
    expectNative(player.getTalentBonusAtInputs(index, player.finalTalentInputs), key, effect);
  });

  it('matches native Arcade bonus 0 used by B', () => {
    const arcade = data.get('arcade') as Arcade;
    expectNative(arcade.bonuses[0].getBonus(), 'damage_arcade_bonus_0', 'Arcade base-damage bonus 0');
  });

  it.each([0, 20, 27, 15, 10, 80] as const)('matches native Upgrade Vault bonus %s used by B or C', index => {
    const vault = data.get('upgradeVault') as UpgradeVault;
    expectNative(vault.getBonusForId(index), `damage_vault_bonus_${index}`, `Upgrade Vault bonus ${index}`);
  });

  it.each([
    [1, 'damage_orion_bonus_1', 'Orion base damage'],
    [2, 'damage_orion_bonus_2', 'Orion total damage'],
  ] as const)('matches native Orion bonus %s', (index, key, effect) => {
    const orion = data.get('orion') as Orion;
    expectNative(orion.getGlobalBonus(index), key, effect);
  });

  it('matches native Poppy total-damage bonus 4', () => {
    const poppy = data.get('poppy') as Poppy;
    expectNative(poppy.getGlobalBonus(4), 'damage_poppy_bonus_4', 'Poppy total-damage bonus 4');
  });

  it('matches native Bubba total-damage bonus 4', () => {
    const bubba = data.get('bubba') as Bubba;
    expectNative(bubba.getGlobalBonus(4), 'damage_bubba_bonus_4', 'Bubba total-damage bonus 4');
  });

  it('matches native Spelunking Shop 64 source bonus used by C', () => {
    const spelunking = data.get('spelunking') as Spelunking;
    expectNative(spelunking.getUpgradeBonus(64), 'damage_spelunk_shop_64', 'Spelunking Shop upgrade 64 raw bonus');
  });

  it('matches native Farming Land Rank 14 bonus used by C', () => {
    const farming = data.get('farming') as Farming;
    expectNative(farming.landrankDatabase.getUpgradeBonusByIndex(14), 'damage_land_rank_14', 'Farming Land Rank upgrade 14');
  });

  it.each([
    [0, 'damage_statue_0', 'B base damage'],
    [22, 'damage_statue_22', 'C total damage'],
  ] as const)('matches native Statue %s contribution', (index, key, effect) => {
    const statues = data.get('statues') as PlayerStatues[];
    expectNative(statues[player.playerID].statues.find(statue => statue.index === index)!.getBonus(player), `damage_statue_${index}`, `Statue ${index} ${effect}`);
  });

  it.each([
    ['BaseDmg', 'damage_stamp_base', 'B base damage'],
    ['PctDmg', 'damage_stamp_percent', 'C total damage'],
    ['BFood', 'damage_stamp_boost_food', 'boost-food effectiveness'],
  ] as const)('matches native %s stamp contribution', (stampKey, extractionKey, effect) => {
    const stamps = data.get('stamps') as Stamp[][];
    expectNative(getStampBonusForKey(stamps, stampKey), extractionKey, `${stampKey} stamp ${effect}`);
  });

  it('matches native Summoning winner bonus 0 used by C', () => {
    const summoning = data.get('summoning') as Summoning;
    expectNative(summoning.getSummoningWinnerBonusFromIndex(0), 'damage_summoning_winner_0', 'Summoning winner bonus 0');
  });

  it.each([20, 30] as const)('matches native Bribe %s contribution used by C', index => {
    const bribes = data.get('bribes') as Bribe[];
    expectNative(bribes.find(bribe => bribe.bribeIndex === index)?.getBonus() ?? 0, `damage_bribe_${index}`, `Bribe ${index}`);
  });

  it('matches native prepared additive base damage from boost food', () => {
    const stamps = data.get('stamps') as Stamp[][];
    const statues = data.get('statues') as PlayerStatues[];
    const foodInputs = {
      boostFoodStamp: getStampBonusForKey(stamps, 'BFood'),
      foodStatue: statues[player.playerID].statues.find(statue => statue.index === 3)!.getBonus(player),
    };
    expectNative(
      Food.getBaseDamageContribution(player, foodInputs, player.finalTalentInputs),
      'damage_boost_food_contribution',
      `Player ${player.playerID} prepared BaseDmgBoosts food contribution`,
    );
  });
  it('matches native boost-food effectiveness used by B', () => {
    const stamps = data.get('stamps') as Stamp[][];
    const statues = data.get('statues') as PlayerStatues[];
    const foodInputs = {
      boostFoodStamp: getStampBonusForKey(stamps, 'BFood'),
      foodStatue: statues[player.playerID].statues.find(statue => statue.index === 3)!.getBonus(player),
    };
    expectNative(
      Food.getBoostFoodEffectiveness(player, foodInputs, player.finalTalentInputs),
      'damage_boost_food_effectiveness',
      `Player ${player.playerID} BaseDmgBoosts effectiveness`,
    );
  });
});
