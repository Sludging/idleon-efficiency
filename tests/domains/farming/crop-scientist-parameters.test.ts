import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Farming } from '../../../data/domain/world-6/farming';
import { Grimoire } from '../../../data/domain/grimoire';
import { Lab } from '../../../data/domain/world-4/lab';
import { UpgradeVault } from '../../../data/domain/upgradeVault';

const saveName = 'latest';
const extractionResultsName = 'farming-crop-scientist-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
  mainframe17Bonus: {
    description: 'Mainframe bonus 17',
    extractionKey: 'crop_sc_mainframe_17_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.bonuses.find(bonus => bonus.index == 17)?.getBonus() ?? 0;
    },
  },
  grimoire22Bonus: {
    description: 'Grimoire upgrade 22 bonus',
    extractionKey: 'crop_sc_grimoire_22_bonus',
    domainExtractor: (gameData) => {
      const grimoire = gameData.get('grimoire') as Grimoire;
      return grimoire.getUpgradeBonus(22);
    },
  },
  exoticMarket40Bonus: {
    description: 'Exotic Market bonus 40',
    extractionKey: 'crop_sc_exotic_40_bonus',
    domainExtractor: (gameData) => {
      const farming = gameData.get('farming') as Farming;
      return farming.getExoticMarketBonusValue(40);
    },
  },
  vault79Bonus: {
    description: 'Upgrade Vault bonus 79',
    extractionKey: 'crop_sc_vault_79_bonus',
    domainExtractor: (gameData) => {
      const upgradeVault = gameData.get('upgradeVault') as UpgradeVault;
      return upgradeVault.getBonusForId(79);
    },
  },
};

describe('Farming Domain - Crop Scientist parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.values(parameterSpecs).forEach(spec => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);

      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
