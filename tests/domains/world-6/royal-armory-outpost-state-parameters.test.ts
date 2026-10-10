import { OUTPOST_RANKS, OutpostRank, OutpostRankProgress } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { expectOutpostXpWithinBounds } from '../../utils/outpost-xp-comparison';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const extractionName = 'royal-armory-outpost-state-data.json';

describe('Outpost current progress and unused-points direct calculations', () => {
    let royalArmory: RoyalArmory;
    let jellyOperator: JellyOperator;
    let results: ReturnType<typeof loadExtractionResults>;

    beforeAll(() => {
        results = loadExtractionResults(extractionName);
        validateExtractionHealth(results);
        const gameData = loadGameDataFromSave('latest');
        royalArmory = gameData.get('royalArmory') as RoyalArmory;
        jellyOperator = gameData.get('jellyOperator') as JellyOperator;
    });

    // Maps 1 and 51 use world buckets 0 and 1: exact Jelly inputs, not unrelated obstruction bonuses.
    [3, 15].forEach(index => {
        it(`matches the Jelly obstruction ${index} contribution to constructed Outpost points`, () => {
            const obstruction = jellyOperator.obstructions[index];
            if (!obstruction) throw new Error(`Missing direct Jelly obstruction ${index} producer: JellyOperation / RoG_BonusQTY(${index}, 0).`);
            expect(obstruction.getBonus()).toMatchLiveGame(
                getExtractedValue(results, `outpost_jelly_bonus_${index}`), 0,
            );
        });
    });

    // World bonuses plus extra points per Trading rank; do not investigate their upstream inputs here.
    [9, 10, 71].forEach(index => {
        it(`matches Armory upgrade ${index} used directly by remaining Outpost points`, () => {
            expect(royalArmory.getUpgradeBonus(index)).toMatchLiveGame(
                getExtractedValue(results, `outpost_armory_bonus_${index}`), 0,
            );
        });
    });

    [1, 51].forEach(mapId => {
        OUTPOST_RANKS.forEach(rankType => {
            it(`matches the ${OutpostRank[rankType]} rank used by current progress${rankType === OutpostRank.Trading ? ' and unused points' : ''} on map ${mapId}`, () => {
                expect(royalArmory.mapStates.get(mapId)!.getRankProgress(rankType).level).toMatchLiveGame(
                    getExtractedValue(results, `outpost_${mapId}_track_${rankType}_rank`), 0,
                );
            });

            it(`matches the current ${OutpostRank[rankType]} threshold calculations on map ${mapId}`, () => {
                const rank = getExtractedValue(results, `outpost_${mapId}_track_${rankType}_rank`);
                expectOutpostXpWithinBounds(
                    OutpostRankProgress.getExperienceThreshold(rank, rankType),
                    getExtractedValue(results, `outpost_${mapId}_track_${rankType}_next_threshold`),
                );
                // Before the first rank the previous threshold is literal zero, not a calculated producer.
                if (rank > 0) {
                    expectOutpostXpWithinBounds(
                        OutpostRankProgress.getExperienceThreshold(rank - 1, rankType),
                        getExtractedValue(results, `outpost_${mapId}_track_${rankType}_previous_threshold`),
                    );
                }
            });
        });
    });
});
