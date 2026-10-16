import { Tesseract } from '../../../data/domain/tesseract';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Arcane map-multiplier bonus used by class EXP', () => {
  let player: Player;
  let players: Player[];
  let tesseract: Tesseract;
  let nativeBonus: number;

  beforeAll(() => {
    const results = loadExtractionResults('player-experience-arcane-map-multi-parameters-data.json');
    validateExtractionHealth(results);
    nativeBonus = getExtractedValue(results, 'arcane_map_multi_bonus_1');
    const gameData = loadGameDataFromSave('latest');
    players = gameData.get('players') as Player[];
    player = getTargetPlayer(players);
    tesseract = gameData.get('tesseract') as Tesseract;
  });

  it('matches ArcaneMapMulti_bon index 1 for the class-EXP player map', () => {
    expect(tesseract.getArcaneMapMultiBonus(player, players)).toMatchLiveGameWithDetails(nativeBonus, {
      tolerance: 0,
      context: `${player.playerName} Arcane map-multiplier bonus index 1`,
    });
  });
});
