import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-total-stats-data.json';
const representativeBuiltOutpost = 1;
const purificationTrack = 4;

describe('Purified-outpost count direct parameter', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
    });

    it('matches the purification rank used to include a built outpost in the collection bonus', () => {
        const extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const liveValue = getExtractedValue(
            extractionResults,
            `royal_armory_total_stats_rank_row_${representativeBuiltOutpost}_type_${purificationTrack}`,
        );
        const domainValue = royalArmory.getOutpostExperienceRank(
            representativeBuiltOutpost,
            purificationTrack,
        );

        expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
});
