import { OUTPOST_RANKS, OutpostRank, RoyalMapSource } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { expectOutpostXpWithinBounds, outpostThresholdBounds } from '../../utils/outpost-xp-comparison';

describe('Royal Armory constructed Outposts and remaining upgrade points', () => {
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

    // Different world buckets use different direct Jelly and Armory point producers.
    [1, 51].forEach(mapId => {
        // Map 1 covers rank-zero Command progress; map 51 covers Command rank 2.
        OUTPOST_RANKS.forEach(rankType => {
            const track = OutpostRank[rankType];
            it(`matches ${track} rank, saved XP and current progress for constructed map ${mapId}`, () => {
                const state = stateAt(mapId);
                if (!state.isOutpost()) throw new Error(`Saved constructed map ${mapId} must expose its Outpost.`);
                const progress = state.getRankProgress(rankType);
                const extracted = (field: string) => getExtractedValue(results, `outpost_${mapId}_track_${rankType}_${field}`);
                // Saved experience and rank remain exact under the human-approved XP exception.
                expect(progress.level).toMatchLiveGameWithDetails(extracted('rank'), {
                    tolerance: 0, context: `${track} rank for constructed map ${mapId}`,
                });
                const experience = extracted('experience');
                expect(progress.totalXP).toMatchLiveGameWithDetails(experience, {
                    tolerance: 0, context: `${track} saved experience for constructed map ${mapId}`,
                });
                const previousThreshold = extracted('previous_threshold');
                const nextThreshold = extracted('next_threshold');
                const previous = outpostThresholdBounds(previousThreshold);
                const next = outpostThresholdBounds(nextThreshold);
                expectOutpostXpWithinBounds(progress.previousThreshold, previousThreshold, previous);
                expectOutpostXpWithinBounds(progress.nextThreshold, nextThreshold, next);
                // Propagate only threshold uncertainty through the game's exact subtractions:
                // current XP minus previous threshold, and next minus previous threshold.
                expectOutpostXpWithinBounds(progress.currentXP, extracted('progress_experience'), {
                    lower: experience - previous.upper,
                    upper: experience - previous.lower,
                });
                expectOutpostXpWithinBounds(progress.requiredXP, extracted('required_experience'), {
                    lower: next.lower - previous.upper,
                    upper: next.upper - previous.lower,
                });
            });
        });

        it(`matches unused upgrade points for constructed map ${mapId} after account calculations`, () => {
            const state = stateAt(mapId);
            if (!state.isOutpost()) throw new Error(`Saved constructed map ${mapId} must expose its Outpost.`);
            expect(state.getUnusedPoints()).toMatchLiveGameWithDetails(
                getExtractedValue(results, `outpost_unused_points_${mapId}`),
                { tolerance: 0, context: `Constructed map ${mapId} unused upgrade points` },
            );
        });
    });
});
