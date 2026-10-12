/** Direct inputs to Minehead shop costs and purchase eligibility. */
import { Minehead } from '../../../data/domain/world-7/minehead';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const getUpgrade = (gameData: Map<string, any>, index: number) => {
  const minehead = gameData.get('minehead') as Minehead;
  const upgrade = minehead.upgrades.find(upgrade => upgrade.index === index);
  if (!upgrade) {
    throw new Error(`Minehead upgrade ${index} is not present in the initialized domain`);
  }
  return upgrade;
};

const parameterSpecs: ParameterTestSpec[] = [
  ...[1, 16].map(index => ({
    description: index === 1
      ? 'Eggroll Sushi bonus discounting all Minehead upgrade costs'
      : 'Tobiko Cluster Sushi bonus increasing the Minehead upgrade discount to 50%',
    extractionKey: `minehead_sushi_${index}`,
    domainExtractor: (gameData: Map<string, any>) => (gameData.get('sushi') as SushiStation).getBonusFromIndex(index),
  })),
  {
    description: "El' Cheapo Upgrado reduction to next-level Minehead shop costs",
    extractionKey: 'minehead_upgrade_quantity_26',
    domainExtractor: gameData => (gameData.get('minehead') as Minehead).getUpgradeBonus(26),
  },
  ...[0, 1, 29].map(index => ({
    description: `Minehead upgrade ${index === 0 ? 'Base Damage I' : index === 1 ? 'Numbahs' : "Rift Guy's Upgrade"} calculated shop price`,
    extractionKey: `minehead_upgrade_cost_${index}`,
    domainExtractor: (gameData: Map<string, any>) => getUpgrade(gameData, index).nextLevelCost(),
  })),
  ...[20, 21].map(index => ({
    description: `Research level requirement for Minehead ${index === 20 ? 'Classic Flags' : 'Mega Damage II'} account-wide shop unlock`,
    extractionKey: `minehead_upgrade_requirement_${index}`,
    domainExtractor: (gameData: Map<string, any>) => getUpgrade(gameData, index).getRequiredLevel(),
  })),
];


describe('Minehead upgrades - direct parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('minehead-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  parameterSpecs.forEach(spec => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      expect(spec.domainExtractor(gameData)).toMatchLiveGame(liveValue, 0);
    });
  });
});
