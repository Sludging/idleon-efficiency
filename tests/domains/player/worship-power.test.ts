import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { updatePlayerPowers } from '../../../data/domain/player-stats';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import {
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

// The retained target character equips a Worship skull. Its power belongs in this total.
const extractionResultsName = 'player-powers-data.json';

const getExpectedPower = (): number => {
  const results = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(results);
  return results.extractions.powers.result.powers.worship;
};

describe('Player Worship Power', () => {
  let gameData: Map<string, unknown>;
  let player: Player;

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });


  it('keeps Worship Power unchanged when the same equipment and account bonuses are prepared twice', () => {
    updatePlayerPowers(gameData);
    const firstPower = player.stats.getSkillPower(SkillsIndex.Worship);
    updatePlayerPowers(gameData);
    const repeatedPower = player.stats.getSkillPower(SkillsIndex.Worship);
    const expected = getExpectedPower();

    expect(firstPower).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: `Player ${player.playerID} first Worship Power update`,
    });
    expect(repeatedPower).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: `Player ${player.playerID} repeated Worship Power update`,
    });
  });
});
