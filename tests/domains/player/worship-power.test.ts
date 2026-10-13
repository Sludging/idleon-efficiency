import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import * as PlayerDomain from '../../../data/domain/player';
import {
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

// The retained target character equips a Worship skull. Its power belongs in this total.
const extractionResultsName = 'player-worship-power-data.json';

// Remove these missing-API adapters when Player owns the prepared Worship Power result.
const getWorshipPower = (player: Player): number => {
  const candidate = player as Player & { getWorshipPower?: () => number };
  if (typeof candidate.getWorshipPower !== 'function') {
    throw new Error('Missing Player.getWorshipPower(): Worship Power must match TotalStats("Worship_Power").');
  }
  return candidate.getWorshipPower();
};

const updateWorshipPower = (gameData: Map<string, any>): void => {
  const candidate = PlayerDomain as typeof PlayerDomain & {
    updatePlayerWorshipPower?: (accountData: Map<string, any>) => void;
  };
  if (typeof candidate.updatePlayerWorshipPower !== 'function') {
    throw new Error('Missing updatePlayerWorshipPower(accountData): prepare Player Worship Power from TotalStats("Worship_Power").');
  }
  candidate.updatePlayerWorshipPower(gameData);
};

const getExpectedPower = (): number => {
  const results = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(results);
  return getExtractedValue(results, 'worship_power');
};

describe('Player Worship Power', () => {
  let gameData: Map<string, any>;
  let player: Player;

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  it('matches the target character Worship Power after normal account processing', () => {
    const actual = getWorshipPower(player);
    expect(actual).toMatchLiveGameWithDetails(getExpectedPower(), {
      tolerance: 0,
      context: `Player ${player.playerID} Worship Power`,
    });
  });

  it('keeps Worship Power unchanged when the same equipment and account bonuses are prepared twice', () => {
    updateWorshipPower(gameData);
    const firstPower = getWorshipPower(player);
    updateWorshipPower(gameData);
    const repeatedPower = getWorshipPower(player);
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
