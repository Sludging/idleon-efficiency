import type { Player } from '../../../data/domain/player';
import type { Rift } from '../../../data/domain/world-4/rift';
import type { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Cards progression effect parameters', () => {
  let gameData: Map<string, any>;
  let player: Player;
  let unlockResults: ExtractionResults;
  let legendResults: ExtractionResults;
  let chipResults: ExtractionResults;

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
    unlockResults = loadExtractionResults('cards-progression-data.json');
    legendResults = loadExtractionResults('legend-talents-data.json');
    chipResults = loadExtractionResults('player-chip-bonuses-data.json');
    [unlockResults, legendResults, chipResults].forEach(validateExtractionHealth);
  });

  it('matches Ruby Cards access used by count progression', () => {
    const rift = gameData.get('rift') as Rift;
    const rubyCards = rift.bonuses.find(bonus => bonus.name === 'Ruby Cards')!;
    expect(Number(rubyCards.active)).toMatchLiveGame(
      getExtractedValue(unlockResults, 'card_ruby_unlock'), 0,
    );
  });

  it('matches six-star access used by count progression', () => {
    const spelunking = gameData.get('spelunking') as Spelunking;
    expect(Number(spelunking.tunnels[2].loreCompleted)).toMatchLiveGame(
      getExtractedValue(unlockResults, 'card_six_star_unlock'), 0,
    );
  });

  it('matches the Legend Talent boost applied to equipped-card effects', () => {
    const legendTalents = gameData.get('legendTalents') as LegendTalents;
    expect(legendTalents.getBonusFromIndex(21)).toMatchLiveGame(
      getExtractedValue(legendResults, 'talent_21_bonus'), 0,
    );
  });

  it.each([
    { selector: 'card1', slot: 'top-left' },
    { selector: 'card2', slot: 'bottom-right' },
  ])('matches $slot chip access used to double the equipped-card effect', ({ selector }) => {
    expect(player.getChipBonus(selector)).toMatchLiveGame(
      getExtractedValue(chipResults, `chip_bonus_${selector}`), 0,
    );
  });
});
