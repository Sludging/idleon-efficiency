import { Outpost } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { RoyalUnitRole } from '../../../data/domain/world-6/royalArmory/units';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

// These genuine Outposts have Advanced Logistics levels 7, 6 and 4; maps 1 and 51 also differ in Guard count.
const rangeCases = [
    { mapId: 1, description: 'Logistics level 7 without Guards' },
    { mapId: 6, description: 'Logistics level 6' },
    { mapId: 51, description: 'Logistics level 4 with a Guard' },
] as const;

describe('Royal Armory Outpost connection range', () => {
    let armory: RoyalArmory;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('royal-armory-outpost-range-data.json');
        validateExtractionHealth(results);
        armory = loadGameDataFromSave('latest').get('royalArmory') as RoyalArmory;
    });

    function outpostAt(mapId: number): Outpost {
        const map = armory.mapStates.get(mapId);
        if (!map?.isOutpost()) throw new Error(`Missing genuine Outpost ${mapId} in the paired save.`);
        return map;
    }

    rangeCases.forEach(({ mapId, description }) => {
        it(`matches the connection range for ${description} on map ${mapId}`, () => {
            const outpost = outpostAt(mapId);
            expect(outpost.connectionRange).toMatchLiveGameWithDetails(
                getExtractedValue(results, `outpost_range_${mapId}`),
                {
                    tolerance: 0,
                    context: `Outpost ${mapId} connection range; scalar only, not connection eligibility`,
                    debugInfo: {
                        advancedLogisticsLevel: outpost.advancedLogisticsLevel,
                        guards: outpost.units.getTotalCount(RoyalUnitRole.Guard),
                    },
                },
            );
        });
    });
});
