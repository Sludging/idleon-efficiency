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

// The selected character owns both cards and equips them in chip-boosted slots.
const progressionCards = [
  { id: 'poopSmall', label: 'Poop', extractionPrefix: 'poop' },
  { id: 'demonP', label: 'Demon Genie', extractionPrefix: 'demon_genie' },
] as const;


describe('Cards progression effects', () => {
  let player: Player;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    const gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
    extractionResults = loadExtractionResults('cards-progression-data.json');
    validateExtractionHealth(extractionResults);
  });

  progressionCards.forEach(({ id, label, extractionPrefix }) => {
    it(`matches ${label} native level and displayed stars`, () => {
      const card = player.cardInfo!.cards.find(({ id: cardId }) => cardId === id)!;
      const nativeLevel = getExtractedValue(extractionResults, `${extractionPrefix}_level`);
      const displayedStars = getExtractedValue(extractionResults, `${extractionPrefix}_stars`);

      expect(card.getLevels()).toMatchLiveGameWithDetails(nativeLevel, {
        tolerance: 0,
        context: `${label} native effect level`,
      });
      expect(card.getStarCount()).toMatchLiveGameWithDetails(displayedStars, {
        tolerance: 0,
        context: `${label} displayed stars`,
      });
    });
  });
  it('matches the next-level card requirement for owned w7a5', () => {
    const card = player.cardInfo!.cards.find(({ id }) => id === 'w7a5')!;
    expect(card.getCardsForLevel(card.getStarCount() + 1)).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'w7a5_next_level_card_requirement'),
      {
        tolerance: 0,
        context: 'w7a5 next-level saved-card requirement',
      },
    );
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
