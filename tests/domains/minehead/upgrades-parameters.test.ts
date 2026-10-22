/** Direct inputs to Minehead shop costs and purchase eligibility. */
import { Minehead } from '../../../data/domain/world-7/minehead';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, normalizeExtractedValue, validateExtractionHealth } from '../../utils/live-game-data-loader';
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
  it("validates El' Cheapo Upgrado reduction to next-level Minehead shop costs", () => {
    const nativeValue = normalizeExtractedValue(
      extractionResults.extractions.minehead_upgrade_quantities.result[26],
    );
    const domainValue = (gameData.get('minehead') as Minehead).getUpgradeBonus(26);
    expect(domainValue).toMatchLiveGame(nativeValue, 0);
  });
  [0, 1, 29].forEach(index => {
    it(`validates Minehead upgrade ${index} calculated shop price`, () => {
      const nativeValue = normalizeExtractedValue(
        extractionResults.extractions.minehead_upgrade_current_prices.result[index],
      );
      expect(getUpgrade(gameData, index).nextLevelCost()).toMatchLiveGame(nativeValue, 0);
    });
  });

  [20, 21].forEach(index => {
    it(`validates Minehead upgrade ${index} Research level requirement`, () => {
      const nativeValue = normalizeExtractedValue(
        extractionResults.extractions.minehead_upgrade_requirements.result[index],
      );
      expect(getUpgrade(gameData, index).getRequiredLevel()).toMatchLiveGame(nativeValue, 0);
    });
  });
});
