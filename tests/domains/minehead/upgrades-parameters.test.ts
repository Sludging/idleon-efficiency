/** Direct inputs to Minehead shop costs and purchase eligibility. */
import { Minehead } from '../../../data/domain/world-7/minehead';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

type UpgradeParameter = {
  index: number;
  nextLevelCost?: () => number;
  getRequiredLevel?: () => number;
};

type SelectedMinehead = Minehead & {
  getUpgradeBonus?: (index: number) => number;
  upgrades?: UpgradeParameter[];
};

const getUpgrade = (gameData: Map<string, any>, index: number, gameMethod: 'UpgCost' | 'UpgLvREQ'): UpgradeParameter => {
  const minehead = gameData.get('minehead') as SelectedMinehead;
  const upgrade = minehead?.upgrades?.find(upgrade => upgrade.index === index);
  if (!upgrade) {
    throw new Error(`MISSING SELECTED CALCULATION - Minehead("${gameMethod}", ${index}, 0), a same-case shop input`);
  }
  return upgrade;
};

const parameterSpecs: ParameterTestSpec[] = [
  ...[1, 16].map(index => ({
    description: `external Sushi unlock bonus ${index} used by the Minehead cost discount`,
    extractionKey: `minehead_sushi_${index}`,
    domainExtractor: (gameData: Map<string, any>) => (gameData.get('sushi') as SushiStation).getBonusFromIndex(index),
  })),
  {
    description: 'same-case El Cheapo Upgrado quantity used by every next-level cost',
    extractionKey: 'minehead_upgrade_quantity_26',
    domainExtractor: gameData => {
      const minehead = gameData.get('minehead') as SelectedMinehead;
      if (typeof minehead?.getUpgradeBonus !== 'function') {
        throw new Error('MISSING SELECTED CALCULATION - Minehead("UpgradeQTY", 26, 0), a same-case input to upgrade costs');
      }
      return minehead.getUpgradeBonus(26);
    },
  },
  ...[0, 1, 29].map(index => ({
    description: `same-case next-level cost ${index} used by purchase affordability`,
    extractionKey: `minehead_upgrade_cost_${index}`,
    domainExtractor: (gameData: Map<string, any>) => {
      const upgrade = getUpgrade(gameData, index, 'UpgCost');
      if (typeof upgrade.nextLevelCost !== 'function') {
        throw new Error(`MISSING SELECTED CALCULATION - Minehead("UpgCost", ${index}, 0), a same-case input to affordability`);
      }
      return upgrade.nextLevelCost();
    },
  })),
  ...[20, 21].map(index => ({
    description: `same-case Research requirement ${index} used by account upgrade unlock`,
    extractionKey: `minehead_upgrade_requirement_${index}`,
    domainExtractor: (gameData: Map<string, any>) => {
      const upgrade = getUpgrade(gameData, index, 'UpgLvREQ');
      if (typeof upgrade.getRequiredLevel !== 'function') {
        throw new Error(`MISSING SELECTED CALCULATION - Minehead("UpgLvREQ", ${index}, 0), a same-case input to unlock`);
      }
      return upgrade.getRequiredLevel();
    },
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
