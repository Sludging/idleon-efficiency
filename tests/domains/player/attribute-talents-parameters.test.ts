import type { Player } from '../../../data/domain/player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

describe('Talent attribute contribution direct parameters', () => {
  let player: Player;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    const gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
    extractionResults = loadExtractionResults('player-attribute-sources-data.json');
    validateExtractionHealth(extractionResults);
  });

  it('matches the ordinary Will Of The Eldest effect before the character-level cap', () => {
    expect(player.getTalentBonusAtInputs(620, player.finalTalentInputs)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'talent_620'),
      0,
    );
  });

  it('matches the ordinary Dummy Thicc Stats effect used with the Dummy Target record', () => {
    // Reuse the existing ordinary-effect extraction; the specialized talent helper is not this input.
    expect(player.getTalentBonusAtInputs(653, player.finalTalentInputs)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'talent_653'),
      0,
    );
  });
});
