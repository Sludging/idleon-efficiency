import { Traps } from '../../../data/domain/world-3/traps';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Trapping shiny-critter reward multiplier', () => {
  it('matches the account-wide multiplier for successful shiny-critter rewards', () => {
    const gameData = loadGameDataFromSave('latest');
    const traps = gameData.get('traps') as Traps;
    const results = loadExtractionResults('trapping-shiny-critter-reward-multiplier-data.json');
    validateExtractionHealth(results);
    const actual = traps.getShinyCritterRewardMultiplier();

    expect(actual).toMatchLiveGameWithDetails(getExtractedValue(results, 'shiny_critter_reward_multiplier'), {
      tolerance: 0,
      context: 'Account-wide shiny-critter reward multiplier',
    });
  });
});
