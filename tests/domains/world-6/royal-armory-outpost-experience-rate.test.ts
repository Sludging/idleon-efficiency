import { OUTPOST_RANKS, OutpostRank } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { RoyalUnitRole } from '../../../data/domain/world-6/royalArmory/units';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';


describe('Royal Armory Outpost experience multipliers and assigned unit counts', () => {
    let armory: RoyalArmory;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('royal-armory-outpost-experience-rate-data.json');
        validateExtractionHealth(results);
        armory = loadGameDataFromSave('latest').get('royalArmory') as RoyalArmory;
    });

    // Greater Education is absent on map6 and positive on map31. All five role effects apply.
    [6, 31].forEach(mapId => OUTPOST_RANKS.forEach(rank => {
        it(`matches the ${OutpostRank[rank]} per-unit experience multiplier on map ${mapId}`, () => {
            expect(armory.mapStates.get(mapId)!.getRankExperienceMultiplier(rank)).toMatchLiveGameWithDetails(
                getExtractedValue(results, `xp_multiplier_${mapId}_${rank}`),
                { tolerance: 0, context: `${OutpostRank[rank]} per-unit experience on map ${mapId}` },
            );
        });
    }));


    // These public counts feed the Outposts unit display.
    [
        { mapId: 6, role: RoyalUnitRole.Commander },
        { mapId: 1, role: RoyalUnitRole.Commander },
        { mapId: 6, role: RoyalUnitRole.Knight },
        { mapId: 6, role: RoyalUnitRole.Priest },
    ].forEach(({ mapId, role }) => {
        it(`matches the displayed assigned ${RoyalUnitRole[role]} count on map${mapId}`, () => {
            expect(armory.mapStates.get(mapId)!.units.getAssignedCount(role)).toMatchLiveGameWithDetails(
                getExtractedValue(results, `xp_movable_count_${mapId}_${role}`),
                { tolerance: 0, context: `Assigned ${RoyalUnitRole[role]} units displayed on map${mapId}` },
            );
        });
    });

});
