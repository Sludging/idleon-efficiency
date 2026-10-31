import { RoyalMapSource } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Royal Armory Outpost construction state', () => {
    let royalArmory: RoyalArmory;
    let results: ReturnType<typeof loadExtractionResults>;

    beforeAll(() => {
        results = loadExtractionResults('royal-armory-outpost-state-data.json');
        validateExtractionHealth(results);
        // Uses the normal domain factory, raw-save parsing and ordered account calculations.
        royalArmory = loadGameDataFromSave('latest').get('royalArmory') as RoyalArmory;
    });

    function stateAt(mapId: number): RoyalMapSource {
        const state = royalArmory.mapStates.get(mapId);
        if (!state) throw new Error(`Missing saved map ${mapId} in RoyalArmory.mapStates.`);
        return state;
    }

    // Actual empty and clearing rows must not become constructed Outposts.
    [0, 101, 1, 51].forEach(mapId => {
        it(`exposes a constructed Outpost only when saved map ${mapId} is built`, () => {
            const state = stateAt(mapId);
            expect(state.isOutpost() ? 1 : 0).toMatchLiveGameWithDetails(
                getExtractedValue(results, `outpost_built_${mapId}`),
                { tolerance: 0, context: `Saved map ${mapId} construction state` },
            );
        });
    });

});
