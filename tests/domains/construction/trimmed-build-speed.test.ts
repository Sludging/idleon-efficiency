import type { Construction } from '../../../data/domain/world-3/construction/construction';
import type { Player } from '../../../data/domain/player';
import { getTargetPlayer } from '../../utils/target-player';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Construction trimmed build speed', () => {
  it('matches the native build rate multiplied by the native trimmed slot multiplier', () => {
    const rateResults = loadExtractionResults('construction-cog-build-rate-data.json');
    const multiplierResults = loadExtractionResults('construction-trimmed-build-speed-data.json');
    validateExtractionHealth(rateResults);
    validateExtractionHealth(multiplierResults);

    const rate = getExtractedValue(rateResults, 'construction_cog_build_rate');
    const multiplier = getExtractedValue(multiplierResults, 'construction_trimmed_multiplier');
    const gameData = loadGameDataFromSave('latest');
    const construction = gameData.get('construction') as Construction;
    const result = construction.getBuildingTiming(getTargetPlayer(gameData.get('players') as Player[])).trimmedBuildSpeed;
    // Game 1.24 applies this multiplier to the board rate for trimmed slots.
    // Toolbox exposes the same product as trimmed build speed.
    expect(result).toMatchLiveGameWithDetails(rate * multiplier, {
      tolerance: 0,
      context: 'Trimmed building work per hour for the retained account',
    });
  });
});
