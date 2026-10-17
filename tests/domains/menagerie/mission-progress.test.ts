import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import missionProgressConfig from '../../configs/menagerie-mission-progress.json';

const extractionResultsName = 'menagerie-mission-progress-data.json';
const missionTests = missionProgressConfig.extractions.map((extraction) => ({
 index: Number(extraction.label.replace('mission_progress_', '')),
 description: extraction.description,
}));

describe('Menagerie mission progress', () => {
 let extractionResults: ExtractionResults;
 let missions: Array<{ progress: number }>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const accountData = loadGameDataFromSave('latest');
  missions = accountData.get('menagerie').getMissions();
 });

 missionTests.forEach(({ index, description }) => {
  it(`matches ${description}`, () => {
   const gameProgress = getExtractedValue(extractionResults, `mission_progress_${index}`);

   expect(missions[index].progress).toMatchLiveGameWithDetails(gameProgress, {
    tolerance: 0,
    context: `Menagerie mission ${index} progress`,
   });
  });
 });
});
