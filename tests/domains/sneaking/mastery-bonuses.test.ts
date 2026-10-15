import type { Sneaking } from '../../../data/domain/world-6/sneaking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

describe('Sneaking completed mastery bonuses', () => {
  let sneaking: Sneaking;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    const gameData = loadGameDataFromSave('latest');
    sneaking = gameData.get('sneaking') as Sneaking;
    extractionResults = loadExtractionResults('player-attribute-sources-data.json');
    validateExtractionHealth(extractionResults);
  });

  it('matches the All Stat percentage from completed Sneaking masteries', () => {
    expect(sneaking.getMasteryAllStatBonus()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'sneaking_mastery_all_stat_bonus'),
      {
        tolerance: 0,
        context: 'Completed Sneaking mastery All Stat percentage points',
      },
    );
  });

  it('matches the extra talent levels from completed Sneaking masteries', () => {
    // The talent-level milestone differs from the All Stat milestone.
    expect(sneaking.getMasteryTalentLevels()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'sneaking_mastery_talent_levels'),
      {
        tolerance: 0,
        context: 'Completed Sneaking mastery extra talent levels',
      },
    );
  });
});
