import { Farming } from '../../../data/domain/world-6/farming';
import { Sneaking } from '../../../data/domain/world-6/sneaking';
import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ParameterTestSpec } from '../../utils/parameter-test-config';

const saveName = 'latest';
const extractionResultsName = 'farming-beans-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
  marketUpgrade6: {
    description: 'Basket market upgrade 6 bonus percentage',
    extractionKey: 'farming_market_upgrade_6_bonus',
    domainExtractor: gameData => (gameData.get('farming') as Farming).getMarketUpgradeBonusValue(6),
  },
  emporiumUpgrade15: {
    description: 'Sneaking Emporium upgrade 15 ownership',
    extractionKey: 'farming_ninja_emporium_15_bonus',
    domainExtractor: gameData => Number((gameData.get('sneaking') as Sneaking).jadeUpgrades.find(upgrade => upgrade.index === 15)?.purchased ?? false),
  },
  exoticBonus16: {
    description: 'Legumioso I bean bonus percentage',
    extractionKey: 'farming_exotic_bonus_16',
    domainExtractor: gameData => (gameData.get('farming') as Farming).getExoticMarketBonusValue(16),
  },
  exoticBonus17: {
    description: 'Legumioso II bean bonus percentage',
    extractionKey: 'farming_exotic_bonus_17',
    domainExtractor: gameData => (gameData.get('farming') as Farming).getExoticMarketBonusValue(17),
  },
  exoticBonus18: {
    description: 'Legumioso III bean bonus percentage',
    extractionKey: 'farming_exotic_bonus_18',
    domainExtractor: gameData => (gameData.get('farming') as Farming).getExoticMarketBonusValue(18),
  },
  exoticBonus19: {
    description: 'Largumes I bean multiplier bonus percentage',
    extractionKey: 'farming_exotic_bonus_19',
    domainExtractor: gameData => (gameData.get('farming') as Farming).getExoticMarketBonusValue(19),
  },
  exoticBonus20: {
    description: 'Largumes II bean multiplier bonus percentage',
    extractionKey: 'farming_exotic_bonus_20',
    domainExtractor: gameData => (gameData.get('farming') as Farming).getExoticMarketBonusValue(20),
  },
  vaultUpgrade85: {
    description: 'Vault upgrade 85 bean bonus percentage',
    extractionKey: 'farming_vault_upgrade_85_bonus',
    domainExtractor: gameData => (gameData.get('upgradeVault') as UpgradeVault).getBonusForId(85),
  },
};

describe('Farming bean multiplier parameters', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.values(parameterSpecs).forEach(spec => {
    it(`matches ${spec.description}`, () => {
      const expected = getExtractedValue(extractionResults, spec.extractionKey);
      const actual = spec.domainExtractor(gameData);

      expect(actual).toMatchLiveGame(expected, 0);
    });
  });
});
