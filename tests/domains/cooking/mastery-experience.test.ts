import { Cooking } from '../../../data/domain/world-4/cooking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const extractionResultsName = 'cooking-mastery-experience-data.json';

describe('Cooking Mastery EXP per hour', () => {
  let extractionResults: ExtractionResults;
  let cooking: Cooking;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    cooking = loadGameDataFromSave('latest').get('cooking') as Cooking;
  });

  it('matches raw account Mastery EXP per hour with the game', () => {
    const expected = getExtractedValue(extractionResults, 'cooking_mastery_experience_rate');

    expect(cooking.getMasteryExperienceRate()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Raw account Cooking Mastery EXP per hour',
      debugInfo: { unit: 'EXP/hour', scope: 'account' },
    });
  });
});
