import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Divinity } from '../../../data/domain/world-5/divinity';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';

const saveName = 'latest';
const extractionResultsName = 'divinity-points-exp-gain-data.json';

describe('Divinity Points and EXP gain', () => {
  let extractionResults: ExtractionResults;
  let divinity: Divinity;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);

    const gameData = loadGameDataFromSave(saveName);
    divinity = gameData.get('divinity') as Divinity;
  });

  it("matches the selected character's Points gain potential", () => {
    const extractedRate = getExtractedValue(extractionResults, 'divinity_points_gain_potential');
    const calculatedRate = divinity.getDivinityPointsPerHour(TARGET_PLAYER_INDEX);

    expect(calculatedRate).toMatchLiveGameWithDetails(extractedRate, {
      tolerance: 0,
      context: `Selected character ${TARGET_PLAYER_INDEX} Points gain potential`,
    });
  });

  it("matches a character's Divinity EXP gain rate", () => {
    const playerInfo = divinity.playerInfo[TARGET_PLAYER_INDEX];

    const extractedRate = getExtractedValue(extractionResults, 'divinity_exp_gain_per_hour');
    const calculatedRate = playerInfo.getDivinityExpPerHour();

    expect(calculatedRate).toMatchLiveGameWithDetails(extractedRate, {
      tolerance: 0,
      context: `Character ${TARGET_PLAYER_INDEX} Divinity EXP per hour`,
    });
  });
});