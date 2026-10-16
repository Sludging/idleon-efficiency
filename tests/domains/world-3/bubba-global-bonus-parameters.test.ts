import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { Bubba } from '../../../data/domain/world-3/bubba';

const saveName = 'latest';
const extractionResultsName = 'bubba-global-bonus-data.json';

const parameterSpecs = {
  companion_51_bonus: {
    description: 'Owned Companion 51 clicker effect for Bubba bonuses at its saved active level',
    extractionKey: 'companion_51_bonus',
    domainExtractor: (gameData: Map<string, any>) =>
      getCompanionActiveBonus(gameData.get("companions") as Companion[], 51),
  },
  megaflesh_owned_1: {
    description: 'Megaflesh ownership at upgrade threshold 1',
    extractionKey: 'megaflesh_owned_1',
    domainExtractor: (gameData: Map<string, any>) =>
      (gameData.get("bubba") as Bubba).getMegafleshQuantity(1),
  },
  megaflesh_owned_3: {
    description: 'Megaflesh ownership at upgrade threshold 3',
    extractionKey: 'megaflesh_owned_3',
    domainExtractor: (gameData: Map<string, any>) =>
      (gameData.get("bubba") as Bubba).getMegafleshQuantity(3),
  },
  megaflesh_owned_6: {
    description: 'Megaflesh ownership at upgrade threshold 6',
    extractionKey: 'megaflesh_owned_6',
    domainExtractor: (gameData: Map<string, any>) =>
      (gameData.get("bubba") as Bubba).getMegafleshQuantity(6),
  },
  megaflesh_owned_9: {
    description: 'Megaflesh ownership at upgrade threshold 9',
    extractionKey: 'megaflesh_owned_9',
    domainExtractor: (gameData: Map<string, any>) =>
      (gameData.get("bubba") as Bubba).getMegafleshQuantity(9),
  },
  megaflesh_owned_11: {
    description: 'Megaflesh ownership at upgrade threshold 11',
    extractionKey: 'megaflesh_owned_11',
    domainExtractor: (gameData: Map<string, any>) =>
      (gameData.get("bubba") as Bubba).getMegafleshQuantity(11),
  },
  global_bonus_multi: {
    description: 'Bubba global bonus multiplier from Megaflesh',
    extractionKey: 'global_bonus_multi',
    domainExtractor: (gameData: Map<string, any>) =>
      (gameData.get("bubba") as Bubba).getGlobalBonusMulti(),
  },
  bonus_upgrade_3: {
    description: 'Bubba upgrade 3 bonus used by global bonuses',
    extractionKey: 'bonus_upgrade_3',
    domainExtractor: (gameData: Map<string, any>) =>
      (gameData.get("bubba") as Bubba).getUpgradeBonus(3),
  },
};
describe('Bubba Domain - Global Bonus - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(parameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});

