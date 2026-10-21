import { HandleRawDataKey } from '../../../data/domain/base/domain';
import { RoyalMapSource } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadTestSave } from '../../utils/cloudsave-loader';

const requirementCases = [
    { mapId: 1, description: 'Spore Meadows default' },
    { mapId: 2, description: 'Froggy Fields default' },
    { mapId: 10, description: 'built own-key override' },
    { mapId: 29, description: 'empty-row small override' },
    { mapId: 51, description: 'second-world default' },
    { mapId: 101, description: 'third-world unbuilt default' },
    { mapId: 112, description: 'third-world override' },
    { mapId: 166, description: 'fourth-world large override' },
];

describe('Royal Armory outpost construction and availability', () => {
    let armory: RoyalArmory;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('royal-armory-outpost-construction-data.json');
        validateExtractionHealth(results);
        // Requirements and expansions use only the owning domain's real parsed save and static data.
        const save = loadTestSave('latest');
        const characterCount = (save.get('playerNames') as string[]).length;
        armory = new RoyalArmory('royalArmory').init([], characterCount);
        const parseData = new Map<string, unknown>([['royalArmory', armory]]);
        armory.getRawKeys().forEach(raw => HandleRawDataKey(raw, parseData, save, characterCount));
        armory.parse(parseData);
    });

    function mapAt(mapId: number): RoyalMapSource {
        const map = armory.mapStates.get(mapId);
        if (!map) throw new Error(`Missing paired saved map ${mapId}.`);
        return map;
    }

    requirementCases.forEach(({ mapId, description }) => {
        it(`matches the build kill requirement for ${description}`, () => {
            expect(mapAt(mapId).requiredOutpostKills).toMatchLiveGameWithDetails(
                getExtractedValue(results, `required_kills_${mapId}`),
                { tolerance: 0, context: `Build kill requirement for map ${mapId}` },
            );
        });
    });

    it('matches the cumulative number of worlds enabled for Outposts', () => {
        expect(armory.getUnlockedOutpostWorldCount()).toMatchLiveGameWithDetails(
            getExtractedValue(results, 'unlocked_world_count'),
            { tolerance: 0, context: 'Outpost world expansion count' },
        );
    });

    // The paired account unlocks worlds 1 and 2. World 3 is the first locked boundary.
    [0, 1, 2, 7].forEach(worldIndex => {
        it(`gates zero-based world ${worldIndex} at the game expansion-count boundary`, () => {
            const unlockedCount = getExtractedValue(results, 'unlocked_world_count');
            const state = armory.getOutpostWorldUnlock(worldIndex);
            expect(state.unlocked).toBe(worldIndex < unlockedCount);
        });
    });
});
