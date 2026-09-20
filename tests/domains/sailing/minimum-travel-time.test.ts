import { Family } from '../../../data/domain/family';
import { GemStore } from '../../../data/domain/gemPurchases';
import { ClassIndex } from '../../../data/domain/talents';
import {
  Sailing,
  updateMinTravelTimeAndSpeed,
} from '../../../data/domain/world-5/sailing/sailing';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'sailing-speed-data.json';

const configureMinimumTravelTimeInputs = (
  gameData: Map<string, any>,
  siegeBonus: number,
  shinyBonus: number,
  gemPurchases: number,
) => {
  const family = gameData.get('family') as Family;
  const sailing = gameData.get('sailing') as Sailing;
  const legendTalents = gameData.get('legendTalents') as LegendTalents;
  const gems = gameData.get('gems') as GemStore;
  const siegeBreakerBonus = family.classBonus.get(ClassIndex.Siege_Breaker);
  const gemUpgrade = gems.purchases.find(upgrade => upgrade.no === 8);

  if (!siegeBreakerBonus || !gemUpgrade) {
    throw new Error('Minimum travel time inputs are missing from the loaded save');
  }

  jest.spyOn(siegeBreakerBonus, 'getBonus').mockReturnValue(siegeBonus);
  jest.spyOn(legendTalents, 'getBonusFromIndex').mockReturnValue(0);
  sailing.shinyMinSpeedBonus = shinyBonus;
  gemUpgrade.pucrhased = gemPurchases;
};

describe('Sailing Domain - Minimum Travel Time', () => {
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('matches the game minimum travel time for the paired save', () => {
    const sailing = loadGameDataFromSave(saveName).get('sailing') as Sailing;

    expect(sailing.boats[0].minTravelTime).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'minimum_travel_time'),
      { tolerance: 0, context: 'Sailing minimum travel time' },
    );
  });

  it('subtracts gem purchase 8 before applying the 15-minute floor', () => {
    const gameData = loadGameDataFromSave(saveName);
    configureMinimumTravelTimeInputs(gameData, 0, 0, 27);

    const sailing = updateMinTravelTimeAndSpeed(gameData);

    expect(sailing.boats[0].minTravelTime).toMatchLiveGameWithDetails(15, {
      tolerance: 0,
      context: 'Gem reduction before the minimum travel-time floor',
    });
  });

  it('rounds a non-integer minimum travel time after all other operations', () => {
    const gameData = loadGameDataFromSave(saveName);
    configureMinimumTravelTimeInputs(gameData, 10, 20, 0);

    const sailing = updateMinTravelTimeAndSpeed(gameData);

    expect(sailing.boats[0].minTravelTime).toMatchLiveGameWithDetails(92, {
      tolerance: 0,
      context: 'Final minimum travel-time rounding',
    });
  });
});
