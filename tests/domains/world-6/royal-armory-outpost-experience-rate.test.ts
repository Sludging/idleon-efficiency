import { OUTPOST_RANKS, OutpostRank } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { RoyalUnitRole } from '../../../data/domain/world-6/royalArmory/units';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';


describe('Royal Armory Outpost rank experience multipliers and hourly progress', () => {
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

    // Genuine assignments: map6 Trader+Commander, map53 Trader, map51 Commander, map1 no gain.
    // No Knights/Priests exist and upgrade17 is inactive: Militia highest-rank/tie behavior is source-only.
    [
        ...OUTPOST_RANKS.map(rank => ({ mapId: 6, rank })),
        { mapId: 53, rank: OutpostRank.Trading },
        { mapId: 51, rank: OutpostRank.Command },
        { mapId: 1, rank: OutpostRank.Trading },
        { mapId: 1, rank: OutpostRank.Command },
    ].forEach(({ mapId, rank }) => {
        it(`matches current ${OutpostRank[rank]} XP/hour on map ${mapId}`, () => {
            expect(armory.mapStates.get(mapId)!.getRankProgress(rank).experiencePerHour).toMatchLiveGameWithDetails(
                getExtractedValue(results, `xp_hourly_${mapId}_${rank}`),
                { tolerance: 0, context: `${OutpostRank[rank]} XP/hour from current contributors on map ${mapId}` },
            );
        });
    });

    [{ mapId: 6, rank: OutpostRank.Trading }, { mapId: 6, rank: OutpostRank.Command }, { mapId: 53, rank: OutpostRank.Trading }].forEach(({ mapId, rank }) => {
        it(`estimates hours to the next ${OutpostRank[rank]} rank on active map ${mapId}`, () => {
            const threshold = getExtractedValue(results, `xp_threshold_${mapId}_${rank}`);
            const savedXP = getExtractedValue(results, `xp_saved_${mapId}_${rank}`);
            const rate = getExtractedValue(results, `xp_hourly_${mapId}_${rank}`);
            const expected = (threshold - savedXP) / rate;
            expect(armory.mapStates.get(mapId)!.getRankProgress(rank).getHoursToNextRank()).toMatchLiveGameWithDetails(expected, {
                tolerance: 0,
                context: `${OutpostRank[rank]} hours to next rank on map ${mapId}`,
            });
        });
    });

    // These public counts feed the Outposts unit display; hourly XP adds each placement separately.
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

    it('reports no finite Trading next-rank ETA on map1 without contributors', () => {
        const progress = armory.mapStates.get(1)!.getRankProgress(OutpostRank.Trading);
        expect(progress.experiencePerHour).toMatchLiveGame(getExtractedValue(results, 'xp_hourly_1_0'), 0);
        expect(progress.getHoursToNextRank()).toBe(Infinity);
    });
});
