import type { Player } from '../../../data/domain/player';
import { getClassExperienceMultiplier } from '../../../data/domain/player-experience';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Persistent player class EXP multiplier', () => {
  let player: Player;
  let gameData: Map<string, any>;
  let experienceMultiplier: number;

  beforeAll(() => {
    const results = loadExtractionResults('player-combat-stats-data.json');
    validateExtractionHealth(results);
    experienceMultiplier = getExtractedValue(results, 'player_class_experience_multiplier');
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  it('matches the selected persistent character class EXP multiplier', () => {
    expect(getClassExperienceMultiplier(gameData, player)).toMatchLiveGameWithDetails(experienceMultiplier, {
      tolerance: 0,
      context: `${player.playerName} persistent class EXP multiplier from ExpMulti(0)`,
    });
  });
});
