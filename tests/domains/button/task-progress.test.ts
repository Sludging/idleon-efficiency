import { getButtonTaskProgress } from '../../../data/domain/world-7/buttonTaskProgress';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Button } from '../../../data/domain/world-7/button';

const saveName = 'latest';
const extractionResultsName = 'button-task-progress-data.json';

describe('The Button - current task and Copper sample progress', () => {
  let button: Button;
  let gameData: ReturnType<typeof loadGameDataFromSave>;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    button = gameData.get('button') as Button;
  });

  it('matches native Copper sample progress for Button task 22', () => {
    const progress = getButtonTaskProgress(gameData, 22);
    const expected = getExtractedValue(loadExtractionResults('button-copper-sample-data.json'), 'button_copper_sample_progress');
    expect(progress.currentValue).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'First saved Copper printer sample rate used by Button task 22',
    });
  });

  it('matches the current task identity and requirement', () => {
    const task = button.getUpcomingTasks()[0];
    const expectedIndex = getExtractedValue(extractionResults, 'button_task_0_index');
    const expectedRequirement = getExtractedValue(extractionResults, 'button_task_0_requirement');

    expect(task.index).toMatchLiveGameWithDetails(expectedIndex, {
      tolerance: 0,
      context: 'The current Button task index',
    });
    expect(task.requiredValue).toMatchLiveGameWithDetails(expectedRequirement, {
      tolerance: 0,
      context: `The requirement for current Button task ${task.index}`,
    });
  });

});

