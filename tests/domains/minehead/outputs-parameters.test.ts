import { getCompanionActiveBonus, isCompanionLevelTwo } from '../../../data/domain/companions';
import { Minehead } from '../../../data/domain/world-7/minehead';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const saveName = 'latest';
const extractionResultsName = 'minehead-data.json';
type TestData = Parameters<ParameterTestSpec['domainExtractor']>[0];

const getUpgradeDescriptionValue = (data: TestData, index: number) => {
  const minehead = data.get('minehead') as Minehead;
  const upgrade = minehead.upgrades.find(candidate => candidate.index === index);
  if (!upgrade) {
    throw new Error(`Minehead upgrade ${index} is not present in the initialized domain`);
  }
  return upgrade.getDescriptionValue(minehead);
};
const descriptionValueExtractionKeys: Record<number, string> = {
  1: 'minehead_description_max_tile_number',
  14: 'minehead_description_bluecrown_multiplier',
  24: 'minehead_description_jackpot_tiles',
  26: 'minehead_description_cost_reduction_percent',
  28: 'minehead_description_currency_log_bonus',
};

const parameters: ParameterTestSpec[] = [
  ...[0, 4, 5, 6, 7, 12, 21, 22, 25, 27, 28].map(index => ({
    description: `Minehead upgrade ${index} effect`,
    extractionKey: `minehead_upgrade_quantity_${index}`,
    domainExtractor: (data: TestData) => (data.get('minehead') as Minehead).getUpgradeBonus(index),
  })),
  ...[1, 14, 24, 26, 28].map(index => ({
    description: `Minehead upgrade ${index} native description value`,
    extractionKey: descriptionValueExtractionKeys[index],
    domainExtractor: (data: TestData) => getUpgradeDescriptionValue(data, index),
  })),
  {
    description: 'Minehead opponent reward 6 used by currency gain',
    extractionKey: 'minehead_bonus_6',
    domainExtractor: (data: TestData) => (data.get('minehead') as Minehead).getBonusFromIndex(6),
  },
  {
    description: 'Research Grid 167 base damage bonus',
    extractionKey: 'minehead_research_167',
    domainExtractor: (data: TestData) => data.get('research').getBonusForId(167),
  },
  {
    description: 'Research Grid 129 currency base rate',
    extractionKey: 'minehead_research_129',
    domainExtractor: (data: TestData) => data.get('research').getBonusForId(129),
  },
  ...[147, 148, 166].map(index => ({
    description: `Research Grid ${index} currency bonus`,
    extractionKey: `minehead_research_${index}`,
    domainExtractor: (data: TestData) => data.get('research').getBonusForId(index),
  })),
  {
    description: 'Research Grid 147 daily-tries input in mode 1',
    extractionKey: 'minehead_research_147_mode_1',
    domainExtractor: (data: TestData) => data.get('research').getBonusForId(147, 1),
  },
  {
    description: 'Minehead Research[7][6] currency log input',
    extractionKey: 'minehead_currency_log_scaling',
    domainExtractor: (data: TestData) => (data.get('minehead') as Minehead).mineCurrencyLogScaling,
  },
  {
    description: 'Minehead currency log scaling factor',
    extractionKey: 'minehead_currency_log_factor',
    domainExtractor: (data: TestData) => (data.get('minehead') as Minehead).getCurrencyLogScalingFactor(),
  },
  {
    description: 'Dancing Coral 5 currency and base damage bonus',
    extractionKey: 'minehead_dancing_coral_5',
    domainExtractor: (data: TestData) => data.get('dancingCoral').getBonusFromIndex(5),
  },
  {
    description: 'Legend Talent 40 currency and base damage bonus',
    extractionKey: 'minehead_legend_talent_40',
    domainExtractor: (data: TestData) => data.get('legendTalents').getBonusFromIndex(40),
  },
  {
    description: 'Jelly Operator obstruction 9 base damage bonus',
    extractionKey: 'minehead_jelly_obstruction_9',
    domainExtractor: (data: TestData) => data.get('jellyOperator').getObstructionBonus(9),
  },
  {
    description: 'Jelly Operator obstruction 8 currency bonus',
    extractionKey: 'minehead_jelly_obstruction_8',
    domainExtractor: (data: TestData) => data.get('jellyOperator').getObstructionBonus(8),
  },
  {
    description: 'Equinox challenge 41 Minehead Depth Charges reduction',
    extractionKey: 'minehead_equinox_challenge_41',
    domainExtractor: (data: TestData) => data.get('equinox').getChallengeBonus(41),
  },
  {
    description: 'Sushi reward 12 currency bonus',
    extractionKey: 'minehead_sushi_12',
    domainExtractor: (data: TestData) => data.get('sushi').getBonusFromIndex(12),
  },
  {
    description: 'Royal Armory Minehead currency multiplier',
    extractionKey: 'minehead_armory_outpost_multiplier',
    domainExtractor: (data: TestData) => data.get('royalArmory').getMineheadCurrencyOutpostMultiplier(),
  },
  {
    description: 'The Button 1 currency bonus',
    extractionKey: 'minehead_button_1',
    domainExtractor: (data: TestData) => data.get('button').getBonusForIndex(1),
  },
  {
    description: 'Arcade bonus 62 currency bonus',
    extractionKey: 'minehead_arcade_62',
    domainExtractor: (data: TestData) => data.get('arcade').bonuses.find((bonus: { index: number; getBonus(): number }) => bonus.index === 62)?.getBonus() ?? 0,
  },
  {
    description: 'Atom Collider atom 13 currency bonus',
    extractionKey: 'minehead_collider_atom_13',
    domainExtractor: (data: TestData) => data.get('collider').atoms.find((atom: { index: number; getBonus(): number }) => atom.index === 13)?.getBonus() ?? 0,
  },
  {
    description: 'Cooking Mine Currency meal bonus',
    extractionKey: 'minehead_cooking_mine_currency',
    domainExtractor: (data: TestData) => data.get('cooking').getMealBonusForKey('MineCurr'),
  },
  {
    description: 'Companion 143 active currency bonus',
    extractionKey: 'minehead_companion_143_active_bonus',
    domainExtractor: (data: TestData) => getCompanionActiveBonus(data.get('companions'), 143),
  },
  {
    description: 'Companion 143 level-two currency effect',
    extractionKey: 'minehead_companion_143_level_two',
    domainExtractor: (data: TestData) => Number(isCompanionLevelTwo(data.get('companions'), 143)),
  },
  {
    description: 'Sailing damage input used by Minehead base damage',
    extractionKey: 'minehead_sailing_damage_level',
    domainExtractor: (data: TestData) => data.get('sailing').getMineheadDamageSailingLevel(),
  },
  {
    description: 'Gaming Superbit 66 used by Minehead Depth Charges',
    extractionKey: 'minehead_gaming_superbit_66',
    domainExtractor: (data: TestData) => Number(data.get('gaming').isSuperbitPurchased(66)),
  },
  {
    description: 'Sneaking jade upgrade 45 used by Minehead Depth Charges',
    extractionKey: 'minehead_sneaking_jade_45',
    domainExtractor: (data: TestData) => Number(data.get('sneaking').jadeUpgrades.find(upgrade => upgrade.index === 45)?.purchased ?? false),
  },
  {
    description: 'Spelunking depth-charge cell input',
    extractionKey: 'minehead_spelunking_depth_charge_cell',
    domainExtractor: (data: TestData) => data.get('spelunking').getMineheadDepthChargeCellLevel(),
  },
  {
    description: 'Event Shop bonus 44 used by Minehead currency gain',
    extractionKey: 'minehead_event_shop_44',
    domainExtractor: (data: TestData) => Number(data.get('eventShop').isBonusOwned(44)),
  },
  {
    description: 'Task Board merit 52 used by Minehead currency gain',
    extractionKey: 'minehead_task_board_merit_52',
    domainExtractor: (data: TestData) => data.get('taskboard').merits.find(merit => merit.index === 52)!.level,
  },
  {
    description: 'saved remaining Minehead daily attempts',
    extractionKey: 'remaining_daily_attempts',
    domainExtractor: (data: TestData) => (data.get('minehead') as Minehead).remainingDailyAttempts,
  },
];

describe('Minehead direct calculated input parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: TestData;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  parameters.forEach(spec => {
    it(`matches ${spec.description}`, () => {
      expect(spec.domainExtractor(gameData)).toMatchLiveGame(getExtractedValue(extractionResults, spec.extractionKey), 0);
    });
  });
});
