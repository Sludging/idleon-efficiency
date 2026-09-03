/**
 * Talent Bonus Calculation Validation
 *
 * Tests the player talent bonus against player-0 live-game extraction.
 *
 * @testCovers Player.getTalentBonus
 */
import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Player } from '../../../data/domain/player';

const saveName = 'latest';
const extractionResultsName = 'talents-sludgeadin-data.json';

describe('Player Domain - Talent Bonus', () => {
  let extractionResults: ExtractionResults;
  let player: Player;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);

    const gameData = loadGameDataFromSave(saveName);
    const player0 = (gameData.get('players') as Player[]).find(candidate => candidate.playerID === 0);
    if (!player0) {
      throw new Error('Player 0 not found in save data');
    }
    player = player0;
  });

  it('validates Talent 112 bonus for player 0', () => {
    const liveValue = getExtractedValue(extractionResults, 'talent_112_bonus');
    const domainValue = player.getTalentBonus(112);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Player 0 talent 112 bonus',
    });
  });
  it('validates Talent 8 X bonus for player 0', () => {
    const liveValue = getExtractedValue(extractionResults, 'talent_8_bonus');
    const domainValue = player.getTalentBonus(8);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Player 0 talent 8 X bonus',
    });
  });
  it('validates Talent 91 X bonus for player 0', () => {
    const liveValue = getExtractedValue(extractionResults, 'talent_91_x_bonus');
    const domainValue = player.getTalentBonus(91);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Player 0 talent 91 X bonus',
    });
  });
  it('validates Talent 91 Y bonus for player 0', () => {
    const liveValue = getExtractedValue(extractionResults, 'talent_91_y_bonus');
    const domainValue = player.getTalent(91)?.getBonus(false, true) ?? 0;

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Player 0 talent 91 Y bonus',
    });
  });
});
