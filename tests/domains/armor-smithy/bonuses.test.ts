import type { Player } from '../../../data/domain/player';
import { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import { getTargetPlayer } from '../../utils/target-player';
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
  let player: Player;

  beforeAll(() => {
    additiveResults = loadExtractionResults(additiveResultsName);
    validateExtractionHealth(additiveResults);
    foodResults = loadExtractionResults(foodResultsName);
    validateExtractionHealth(foodResults);

    const gameData = loadGameDataFromSave(saveName);
    equipmentSets = gameData.get('equipmentSets') as EquipmentSets;
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  it('matches the Marbiglass set All Stat percentage points', () => {
    const set = equipmentSets.equipmentSets.find(candidate => candidate.data.name === 'MARBIGLASS_SET');
    if (!set) {
      throw new Error('Marbiglass set is missing from the equipment set data');
    }

    const liveValue = getExtractedValue(additiveResults, 'marbiglass_all_stat');
    expect(equipmentSets.getSetBonus('MARBIGLASS_SET', player)).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Marbiglass set All Stat percentage points',
      debugInfo: {
        saveName,
        unlocked: set.unlocked,
        activeForTargetPlayer: set.isActiveFor(player),
      },
    });
  });

  it('matches the Secret set multiplier used by Gold Food', () => {
    const set = equipmentSets.equipmentSets.find(candidate => candidate.data.name === 'SECRET_SET');
    if (!set) {
      throw new Error('Secret set is missing from the equipment set data');
    }

    const secretSetPercent = getExtractedValue(foodResults, 'secret_set');
    // GoldFoodBonuses.1.22.js:8 applies 1 + GetSetBonus("SECRET_SET", "Bonus", 0, 0) / 100.
    const expectedMultiplier = 1 + secretSetPercent / 100;
    expect(equipmentSets.getSetBonus('SECRET_SET', player)).toMatchLiveGameWithDetails(expectedMultiplier, {
      tolerance: 0,
      context: 'Secret set Gold Food multiplier',
      debugInfo: {
        saveName,
        unlocked: set.unlocked,
        activeForTargetPlayer: set.isActiveFor(player),
      },
    });
  });

});
