import { Player } from '../../../data/domain/player';
import { Skilling } from '../../../data/domain/skilling';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

// Tests-stage scaffold. Replace this adapter with the approved typed API after implementation.
const getAllBaseSkillEfficiency = (_skilling: Skilling, _player: Player): number => {
  throw new Error('Missing Skilling.getAllBaseSkillEfficiency(player) and updateAllBaseSkillEfficiencies(accountData): SkillStats("AllBaseSkillEff")');
};

describe('Skilling all-base skill efficiency', () => {
  it('matches the target character additive base efficiency after the account pipeline', () => {
    const gameData = loadGameDataFromSave('latest');
    const player = getTargetPlayer(gameData.get('players') as Player[]);
    const actual = getAllBaseSkillEfficiency(gameData.get('skilling') as Skilling, player);
    const results = loadExtractionResults('skilling-all-base-skill-efficiency-data.json');
    validateExtractionHealth(results);

    expect(actual).toMatchLiveGameWithDetails(getExtractedValue(results, 'all_base_skill_efficiency'), {
      tolerance: 0,
      context: `Player ${player.playerID} additive base skill efficiency`,
    });
  });
});
