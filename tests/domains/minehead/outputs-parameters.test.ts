import { getCompanionActiveBonus, isCompanionLevelTwo } from '../../../data/domain/companions';
import { Minehead } from '../../../data/domain/world-7/minehead';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, normalizeExtractedValue, validateExtractionHealth } from '../../utils/live-game-data-loader';
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
  ...[1, 14, 24, 26, 28].map(index => ({
    description: `Minehead upgrade ${index} native description value`,
    extractionKey: descriptionValueExtractionKeys[index],
    domainExtractor: (data: TestData) => getUpgradeDescriptionValue(data, index),
  })),
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
  [0, 4, 5, 6, 7, 12, 21, 22, 25, 27, 28].forEach(index => {
    it(`matches Minehead upgrade ${index} effect`, () => {
      const nativeValue = normalizeExtractedValue(
        extractionResults.extractions.minehead_upgrade_quantities.result[index],
      );
      const domainValue = (gameData.get('minehead') as Minehead).getUpgradeBonus(index);
      expect(domainValue).toMatchLiveGame(nativeValue, 0);
    });
  });
  it('matches Minehead opponent reward 6 used by currency gain', () => {
    const nativeValue = normalizeExtractedValue(
      extractionResults.extractions.minehead_opponent_bonuses.result[6],
    );
    const domainValue = (gameData.get('minehead') as Minehead).getBonusFromIndex(6);
    expect(domainValue).toMatchLiveGame(nativeValue, 0);
  });
});
