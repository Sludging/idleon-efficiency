import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { CropScientistBonusText, Farming } from '../../../data/domain/world-6/farming';

const saveName = 'latest';
const extractionResultsName = 'farming-crop-scientist-data.json';

const bonusSpecs: Record<string, {
  description: string;
  extractionKey: string;
  bonus: CropScientistBonusText;
}> = {
  totalDamage: {
    description: 'total damage bonus',
    extractionKey: 'crop_sc_0_bonus',
    bonus: CropScientistBonusText.TotalDamage,
  },
  plantEvolutionChance: {
    description: 'plant evolution chance bonus',
    extractionKey: 'crop_sc_1_bonus',
    bonus: CropScientistBonusText.PlantEvolutionChance,
  },
  jadeCoinGain: {
    description: 'jade coin gain bonus',
    extractionKey: 'crop_sc_2_bonus',
    bonus: CropScientistBonusText.JadeCoinGain,
  },
  cookingSpeed: {
    description: 'cooking speed bonus',
    extractionKey: 'crop_sc_3_bonus',
    bonus: CropScientistBonusText.CookingSpeed,
  },
  cash: {
    description: 'cash bonus',
    extractionKey: 'crop_sc_4_bonus',
    bonus: CropScientistBonusText.CashBonus,
  },
  shinyPetLevelUpRate: {
    description: 'shiny pet level-up rate bonus',
    extractionKey: 'crop_sc_5_bonus',
    bonus: CropScientistBonusText.ShinyPetLvlUpRate,
  },
  baseCritterPerTrap: {
    description: 'base critter per trap bonus',
    extractionKey: 'crop_sc_6_bonus',
    bonus: CropScientistBonusText.BaseCritterPerTrap,
  },
  dropRate: {
    description: 'drop rate bonus',
    extractionKey: 'crop_sc_7_bonus',
    bonus: CropScientistBonusText.DropRate,
  },
  spelunky: {
    description: 'spelunky bonus',
    extractionKey: 'crop_sc_8_bonus',
    bonus: CropScientistBonusText.Spelunky,
  },
  researchExp: {
    description: 'research EXP bonus',
    extractionKey: 'crop_sc_9_bonus',
    bonus: CropScientistBonusText.ResearchExp,
  },
};

describe('Farming Domain - Crop Scientist bonuses', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.values(bonusSpecs).forEach(spec => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const farming = gameData.get('farming') as Farming;
      const domainValue = farming.cropScientist.getBonus(spec.bonus);

      expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
        tolerance: 0,
        context: `Crop Scientist ${spec.description}`,
      });
    });
  });
});
