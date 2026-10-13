import { Card } from '../../../data/domain/cards';
import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

// The paired character equips Poop and Demon Genie in the two chip-boosted slots.
describe('Cards progression effects', () => {
  let player: Player;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    const gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
    extractionResults = loadExtractionResults('cards-progression-data.json');
    validateExtractionHealth(extractionResults);
  });

  it('matches equipped-card crystal monster spawn chance after progression and effect boosts', () => {
    expect(Card.GetTotalBonusForId(player.cardInfo!.equippedCards, 14)).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'equipped_crystal_spawn_chance'),
      {
        tolerance: 0,
        context: `Player ${player.playerID} equipped-card crystal monster spawn chance`,
      },
    );
  });
});
