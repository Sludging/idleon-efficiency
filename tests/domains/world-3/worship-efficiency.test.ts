import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import type { Player } from '../../../data/domain/player';
import { Skilling } from '../../../data/domain/skilling';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Worship efficiency', () => {
  it('matches the target character efficiency from the saved account pipeline', () => {
    const gameData = loadGameDataFromSave('latest');
    const player = getTargetPlayer(gameData.get('players') as Player[]);
    const skilling = gameData.get('skilling') as Skilling;
    const extractionResults = loadExtractionResults('worship-efficiency-parameters-data.json');
    validateExtractionHealth(extractionResults);
    const actual = skilling.getSkillEfficiency(player.playerID, SkillsIndex.Worship);

    expect(actual).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, 'worship_efficiency'), {
      tolerance: 0,
      context: `Player ${player.playerID} Worship efficiency`,
    });
  });
});
