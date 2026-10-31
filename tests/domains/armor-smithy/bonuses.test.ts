import { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const additiveResultsName = 'player-attribute-sources-data.json';
const foodResultsName = 'player-health-data.json';

describe('Armor Smithy set bonuses', () => {
  let additiveResults: ExtractionResults;
  let foodResults: ExtractionResults;
  let equipmentSets: EquipmentSets;

  beforeAll(() => {
    additiveResults = loadExtractionResults(additiveResultsName);
    validateExtractionHealth(additiveResults);
    foodResults = loadExtractionResults(foodResultsName);
    validateExtractionHealth(foodResults);

    const gameData = loadGameDataFromSave(saveName);
    equipmentSets = gameData.get('equipmentSets') as EquipmentSets;
  });

  it('matches the Marbiglass set All Stat percentage points', () => {
    const set = equipmentSets.equipmentSets.find(candidate => candidate.data.name === 'MARBIGLASS_SET');
    if (!set) {
      throw new Error('Marbiglass set is missing from the equipment set data');
    }

    const liveValue = getExtractedValue(additiveResults, 'marbiglass_all_stat');
    expect(equipmentSets.getSetBonus('MARBIGLASS_SET')).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Marbiglass set All Stat percentage points',
      debugInfo: {
        saveName,
        unlocked: set.unlocked,
      },
    });
  });

  it('matches the Secret set Gold Food percentage points', () => {
    const set = equipmentSets.equipmentSets.find(candidate => candidate.data.name === 'SECRET_SET');
    if (!set) {
      throw new Error('Secret set is missing from the equipment set data');
    }

    const secretSetPercent = getExtractedValue(foodResults, 'secret_set');
    expect(equipmentSets.getSetBonus('SECRET_SET', true)).toMatchLiveGameWithDetails(secretSetPercent, {
      tolerance: 0,
      context: 'Secret set Gold Food percentage points',
      debugInfo: {
        saveName,
        unlocked: set.unlocked,
      },
    });
  });

});
