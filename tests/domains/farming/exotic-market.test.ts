import { Farming } from '../../../data/domain/world-6/farming';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Farming Domain - Exotic Market Plump Database', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('farming-land-rank-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  it('validates the Plump Database percentage boost to Land Rank bonuses', () => {
    const farming = gameData.get('farming') as Farming;
    const liveValue = getExtractedValue(extractionResults, 'plump_database_bonus');
    // Plump Database uses only its parsed upgrade level and generated diminishing-curve metadata.
    const domainValue = farming.getExoticMarketBonusValue(14);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Plump Database percentage boost to Land Rank Database bonuses',
    });
  });
});
