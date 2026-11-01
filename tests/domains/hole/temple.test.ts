import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { coreNumber } from './part1-test-helpers';

describe('Temple current progression and torch upgrades', () => {
    let hole: Hole;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('hole-temple-data.json');
        validateExtractionHealth(results);
        hole = loadGameDataFromSave('latest').get('hole') as Hole;
    });

    it('matches torches, current layer, extra torch chance, and earned Opals', () => {
        coreNumber(hole.temple.torches, results, 'torches', 'Temple torch balance');
        coreNumber(hole.temple.layer, results, 'layer', 'Temple current layer');
        coreNumber(hole.temple.extraTorchChance, results, 'extra_torch_chance', 'Temple extra torch chance');
        coreNumber(hole.temple.opalsFound, results, 'opals_found', 'Temple earned Opals');
    });

    it('matches Illuminate level, Search multiplier, and current cost', () => {
        coreNumber(hole.temple.illuminateLevel, results, 'illuminate_level', 'Illuminate level');
        coreNumber(hole.temple.illuminateSearchMultiplier, results, 'illuminate_search_multiplier', 'Illuminate Search multiplier');
        coreNumber(hole.temple.illuminateCost, results, 'illuminate_cost', 'Illuminate current torch cost');
    });

    it('matches Search purchases, current awakening chance, and current cost', () => {
        coreNumber(hole.temple.searchLevel, results, 'search_level', 'Search purchase count');
        coreNumber(hole.temple.centurionAwakenChancePercent, results, 'centurion_awaken_chance_percent', 'Current Centurion awakening chance');
        coreNumber(hole.temple.searchCost, results, 'search_cost', 'Search current torch cost');
    });

    it('matches Amplify level, golem respawn speed, and current cost', () => {
        coreNumber(hole.temple.amplifyLevel, results, 'amplify_level', 'Amplify level');
        coreNumber(hole.temple.golemRespawnSpeedPercent, results, 'golem_respawn_speed_percent', 'Amplify golem respawn speed');
        coreNumber(hole.temple.amplifyCost, results, 'amplify_cost', 'Amplify current torch cost');
    });
});
