import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Lab } from '../../../data/domain/world-4/lab';

const saveName = 'latest';
const extractionResultsName = 'lab-jewel-bonus-data.json';

const jewelBonusParameterSpecs: Record<string, ParameterTestSpec> = {
  jewel0Active: {
    description: 'Amethyst Rhinestone Jewel 0 active flag',
    extractionKey: 'jewel_0_active',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[0].active ? 1 : 0;
    },
  },

  jewel0BonusMultiplier: {
    description: 'Amethyst Rhinestone Jewel 0 multiplier',
    extractionKey: 'jewel_0_bonus_multiplier',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[0].bonusMultiplier;
    },
  },

  jewel1Bonus: {
    description: 'Purple Navette Jewel 1 bonus',
    extractionKey: 'jewel_1_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[1].getBonus();
    },
  },

  jewel2Bonus: {
    description: 'Purple Rhombol Jewel 2 bonus',
    extractionKey: 'jewel_2_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[2].getBonus();
    },
  },
  jewel3Active: {
    description: 'Sapphire Rhinestone Jewel 3 active flag',
    extractionKey: 'jewel_3_active',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[3].active ? 1 : 0;
    },
  },

  jewel4Bonus: {
    description: 'Sapphire Navette Jewel 4 bonus',
    extractionKey: 'jewel_4_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[4].getBonus();
    },
  },

  jewel5Bonus: {
    description: 'Sapphire Rhombol Jewel 5 bonus',
    extractionKey: 'jewel_5_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[5].getBonus();
    },
  },

  jewel6Bonus: {
    description: 'Sapphire Pyramite Jewel 6 bonus',
    extractionKey: 'jewel_6_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[6].getBonus();
    },
  },

  jewel10Active: {
    description: 'Pyrite Pyramite Jewel 10 active flag',
    extractionKey: 'jewel_10_active',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[10].active ? 1 : 0;
    },
  },

  jewel7Bonus: {
    description: 'Pyrite Rhinestone Jewel 7 bonus',
    extractionKey: 'jewel_7_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[7].getBonus();
    },
  },

  jewel8Bonus: {
    description: 'Pyrite Navette Jewel 8 bonus',
    extractionKey: 'jewel_8_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[8].getBonus();
    },
  },

  jewel9Bonus: {
    description: 'Pyrite Rhombol Jewel 9 bonus',
    extractionKey: 'jewel_9_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[9].getBonus();
    },
  },

  jewel12Active: {
    description: 'Emerald Navette Jewel 12 active flag',
    extractionKey: 'jewel_12_active',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[12].active ? 1 : 0;
    },
  },

  jewel11Bonus: {
    description: 'Emerald Rhinestone Jewel 11 bonus',
    extractionKey: 'jewel_11_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[11].getBonus();
    },
  },

  jewel13Bonus: {
    description: 'Emerald Rhombol Jewel 13 bonus',
    extractionKey: 'jewel_13_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[13].getBonus();
    },
  },

  jewel14Bonus: {
    description: 'Emerald Pyramite Jewel 14 bonus',
    extractionKey: 'jewel_14_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[14].getBonus();
    },
  },

  jewel15Bonus: {
    description: 'Emerald Ulthurite Jewel 15 bonus',
    extractionKey: 'jewel_15_bonus',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[15].getBonus();
    },
  },

  jewel19Active: {
    description: 'Pure Opal Navette Jewel 19 active flag',
    extractionKey: 'jewel_19_active',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[19].active ? 1 : 0;
    },
  },

  jewel20Active: {
    description: 'Pure Opal Rhombol Jewel 20 active flag',
    extractionKey: 'jewel_20_active',
    domainExtractor: (gameData) => {
      const lab = gameData.get('lab') as Lab;
      return lab.jewels[20].active ? 1 : 0;
    },
  },
};

describe('Lab Domain - Jewel Bonus Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(jewelBonusParameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);

      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});