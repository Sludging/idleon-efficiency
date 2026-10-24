import type { Summoning } from '../../../data/domain/world-6/summoning';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const doublerCases = [
  {
    description: 'total Summoning Doubler capacity',
    field: 'summoningDoublersOwned',
    extractionKey: 'summoning_doublers_owned',
  },
  {
    description: 'Summoning Doublers still available to assign',
    field: 'summoningDoublersAvailable',
    extractionKey: 'summoning_doublers_available',
  },
  {
    description: 'Summoning Doublers assigned to upgrades',
    field: 'summoningDoublersUsed',
    extractionKey: 'summoning_doublers_used',
  },
] as const;

describe('Summoning Doublers', () => {
  let summoning: Summoning;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults('summoning-doublers-data.json');
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave('latest');
    summoning = gameData.get('summoning') as Summoning;
  });

  it.each(doublerCases)('matches $description', ({ description, field, extractionKey }) => {
    expect(summoning[field]).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, extractionKey), {
      tolerance: 0,
      context: description,
      debugInfo: {
        capacity: summoning.summoningDoublersOwned,
        available: summoning.summoningDoublersAvailable,
        assigned: summoning.summoningDoublersUsed,
      },
    });
  });
});
