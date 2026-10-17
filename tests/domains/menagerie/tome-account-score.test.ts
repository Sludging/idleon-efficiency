import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Tome } from '../../../data/domain/world-4/tome';

const extractionResultsName = 'menagerie-mission-progress-data.json';

describe('Menagerie Tome score mission', () => {
  let extractionResults: ExtractionResults;
  let tome: Tome;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave('latest');
    tome = gameData.get('tome') as Tome;

    if (!tome) {
      throw new Error('Tome domain not found in save data');
    }
  });

  it('matches account sum of each Tome entry best score across saved characters', () => {
    const nativeMissionProgress = getExtractedValue(extractionResults, 'mission_progress_16');
    const totalBestEntryScore = tome.lines.reduce((total, line) => {
      let bestCharacterScore = 0;
      for (let characterIndex = 0; characterIndex < tome.charCount; characterIndex++) {
        bestCharacterScore = Math.max(bestCharacterScore, line.getPlayerScore(characterIndex));
      }
      return total + bestCharacterScore;
    }, 0);

    expect(totalBestEntryScore).toMatchLiveGameWithDetails(nativeMissionProgress, {
      tolerance: 0,
      context: 'Menagerie Tome Score mission progress',
    });
  });
});
