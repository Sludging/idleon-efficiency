import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import type { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import type { Grimoire } from '../../../data/domain/grimoire';
import { Tome } from '../../../data/domain/world-4/tome';

const saveName = 'latest';
const extractionResultsName = 'tome-epilogue-bonus-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
  grimoire_bonus_17: {
    description: 'Grimoire upgrade 17 contribution to Tome epilogue bonuses',
    extractionKey: 'grimoire_bonus_17',
    domainExtractor: (gameData) => {
      const grimoire = gameData.get('grimoire') as Grimoire;
      return grimoire.getUpgradeBonus(17);
    },
  },
  troll_set_bonus: {
    description: 'Troll equipment set contribution to Tome epilogue bonuses',
    extractionKey: 'troll_set_bonus',
    domainExtractor: (gameData) => {
      const equipmentSets = gameData.get('equipmentSets') as EquipmentSets;
      return equipmentSets.getSetBonus('TROLL_SET', true);
    },
  },
  epilogue_bonus_unlocked_count: {
    description: 'Spelunk unlock count controlling which Tome epilogue effects are available',
    extractionKey: 'epilogue_bonus_unlocked_count',
    domainExtractor: (gameData) => {
      const tome = gameData.get('tome') as Tome;
      return tome.epilogueBonuses.filter(bonus => bonus.unlocked).length;
    },
  }
};

describe('Tome Domain - Epilogue Bonus - Parameters', () => {
  let extractionResults: ExtractionResults;
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
