import { ShrineConstants, type Shrine } from '../../../data/domain/world-3/construction/shrines';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

// The retained save exercises permanent artifact activation, not local or same-world activation.
describe('Permanent map-independent HP and Defence Shrine', () => {
  it('matches the complete Shrine contribution enabled by Moai Head', () => {
    const results = loadExtractionResults('shrine-map-independent-bonus-data.json');
    validateExtractionHealth(results);
    const replay = results.extractions.map_independent_shrine.result;
    const shrines = loadGameDataFromSave('latest').get('shrines') as Shrine[];
    const shrine = shrines[ShrineConstants.HpDefShrine];
    expect(shrine.getMapIndependentBonus()).toMatchLiveGameWithDetails(replay.bonus, {
      tolerance: 0,
      context: `Permanent Shrine source diagnostics: ${JSON.stringify(replay)}`,
    });
  });
});
