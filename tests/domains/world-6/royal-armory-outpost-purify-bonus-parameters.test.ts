/**
 * Perfect Purification's Armory upgrade contribution, directly used by the
 * purified-map collection bonus.
 */

import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-outpost-purify-bonus-data.json';
const extractionKey = 'royal_armory_outpost_purify_armory_upgrade_1';

describe('Royal Armory purified-map collection bonus direct parameters', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
    });

    it('matches Perfect Purification contribution added to the collection bonus', () => {
        const extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const liveValue = getExtractedValue(extractionResults, extractionKey);
        const domainValue = royalArmory.getUpgradeBonus(1);

        expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
});
