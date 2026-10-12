import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Player } from '../../../data/domain/player';
import { Skilling } from '../../../data/domain/skilling';
import { getTargetPlayer } from '../../utils/target-player';

const saveName = 'latest';
const extractionResultsName = 'skill-stats-all-efficiencies-data.json';

describe('SkillStats Domain - AllEfficiencies', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;
  let player: Player;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  it("matches the configured target player's All Efficiencies with the saved game result", () => {
    const liveValue = getExtractedValue(extractionResults, 'skill_all_efficiencies');
    const skilling = gameData.get('skilling') as Skilling;
    const domainValue = skilling.getAllEfficiencies(player);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: `Player ${player.playerID} All Efficiencies`,
    });
  });
});
