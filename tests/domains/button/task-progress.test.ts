import { getButtonTaskProgress, updateButtonTaskProgress } from '../../../data/domain/world-7/buttonTaskProgress';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Button } from '../../../data/domain/world-7/button';

const saveName = 'latest';
const extractionResultsName = 'button-task-progress-data.json';
const taskCases = [
  { offset: 0, indexKey: 'button_task_0_index', pressCountKey: 'button_task_0_press_count', requiredKey: 'button_task_0_requirement', haveKey: 'button_task_0_have' },
  { offset: 1, indexKey: 'button_task_1_index', pressCountKey: 'button_task_1_press_count', requiredKey: 'button_task_1_requirement', haveKey: 'button_task_1_have' },
  { offset: 2, indexKey: 'button_task_2_index', pressCountKey: 'button_task_2_press_count', requiredKey: 'button_task_2_requirement', haveKey: 'button_task_2_have' },
] as const;

describe('The Button - upcoming task progress', () => {
  let button: Button;
  let gameData: ReturnType<typeof loadGameDataFromSave>;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    button = gameData.get('button') as Button;
  });


  it('matches native maximum character damage for Button task 49', () => {
    const progress = getButtonTaskProgress(gameData, 49);
    const expected = getExtractedValue(loadExtractionResults('player-combat-stats-data.json'), 'player_maximum_damage');
    expect(progress.currentValue).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'Maximum character damage used by Button task 49',
    });
  });
  it('matches native Copper sample progress for Button task 22', () => {
    const progress = getButtonTaskProgress(gameData, 22);
    const expected = getExtractedValue(loadExtractionResults('button-copper-sample-data.json'), 'button_copper_sample_progress');
    expect(progress.currentValue).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'First saved Copper printer sample rate used by Button task 22',
    });
  });

  it('matches the active and next two tasks, requirements, progress, and readiness', () => {
    updateButtonTaskProgress(gameData);
    const tasks = button.getUpcomingTasks();

    taskCases.forEach(({ offset, indexKey, pressCountKey, requiredKey, haveKey }) => {
      const task = tasks[offset];
      const expectedIndex = getExtractedValue(extractionResults, indexKey);
      const expectedPressCount = getExtractedValue(extractionResults, pressCountKey);
      const expectedRequirement = getExtractedValue(extractionResults, requiredKey);
      const expectedHave = getExtractedValue(extractionResults, haveKey);

      expect(task.index).toMatchLiveGameWithDetails(expectedIndex, {
        tolerance: 0,
        context: `The Button task index at queue position ${offset}`,
      });
      expect(task.pressCount).toMatchLiveGameWithDetails(expectedPressCount, {
        tolerance: 0,
        context: `The completed press count for Button task ${task.index}`,
      });
      expect(task.pressNumber).toBe(expectedPressCount + 1);
      expect(task.requiredValue).toMatchLiveGameWithDetails(expectedRequirement, {
        tolerance: 0,
        context: `The requirement for Button task ${task.index}`,
      });

      expect(task.progress.currentValue).toMatchLiveGameWithDetails(expectedHave, {
        tolerance: 0,
        context: `Saved progress for Button task ${task.index}`,
      });
      expect(task.progress.isReady).toBe(expectedHave >= expectedRequirement);
    });
  });

});

