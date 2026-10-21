import { Bribe, BribeStatus } from '../../../data/domain/world-1/bribes';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const goldenFoodResultsName = 'player-health-data.json';

describe('Bribe displayed effects', () => {
  let bribes: Bribe[];
  let goldenFoodResults: ExtractionResults;

  beforeAll(() => {
    const gameData = loadGameDataFromSave(saveName);
    bribes = gameData.get('bribes') as Bribe[];

    goldenFoodResults = loadExtractionResults(goldenFoodResultsName);
    validateExtractionHealth(goldenFoodResults);
  });

  const getBribe = (index: number): Bribe => {
    const bribe = bribes.find(candidate => candidate.bribeIndex === index);
    if (!bribe) {
      throw new Error(`Bribe ${index} is missing from save data`);
    }

    return bribe;
  };


  it('matches purchased Golden Food bribe effect', () => {
    const bribe = getBribe(36);
    expect(bribe.status).toBe(BribeStatus.Purchased);
    expect(bribe.getBonus()).toMatchLiveGameWithDetails(
      getExtractedValue(goldenFoodResults, 'bribe_gold_food'),
      {
        tolerance: 0,
        context: 'Purchased Golden Food bonus displayed by the website',
        debugInfo: { saveName, status: bribe.status },
      },
    );
  });

});
