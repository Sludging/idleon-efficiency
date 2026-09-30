/**
 * Direct rank input used by Royal Armory map purification.
 *
 * A populated outpost is purified when it reaches the first purification
 * rank; compare that rank before attributing a purification-state mismatch.
 */

import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-map-purification-state-data.json';
const mapIndex = 1;
const rankType = 4;
const extractionKey = 'royal_armory_outpost_exp_rank_row_1_rank_4';

describe('Royal Armory map purification direct parameters', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        const gameData = loadGameDataFromSave(saveName);
        royalArmory = gameData.get('royalArmory') as RoyalArmory;
        if (!royalArmory) {
            throw new Error('Royal Armory domain not found in save data');
        }
    });

    it("matches outpost row 1's purification rank used to determine its state", () => {
        const domainValue = royalArmory.getOutpostExperienceRank(mapIndex, rankType);
        if (domainValue === undefined) {
            throw new Error(
                'Missing website rank result for populated map row 1 at rank type 4; ' +
                'cannot compare RoyalG("OutpostEXPrank", 1, 4).',
            );
        }
        const extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const liveValue = getExtractedValue(extractionResults, extractionKey);

        expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
});
