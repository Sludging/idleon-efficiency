import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { OutpostRank } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-total-stats-data.json';
const representativeBuiltOutpost = 1;
const purificationTrack = OutpostRank.Purity;

describe('Purified-outpost count direct parameter', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
    });

    it("matches saved outpost row 1's purification rank below the collection-bonus threshold", () => {
        const extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const liveValue = getExtractedValue(
            extractionResults,
            `royal_armory_total_stats_rank_row_${representativeBuiltOutpost}_type_${purificationTrack}`,
        );
        const domainValue = royalArmory.mapStates.get(representativeBuiltOutpost)!.getRankProgress(purificationTrack).level;

        expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
});
