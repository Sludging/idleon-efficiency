/**
 * Direct calculated inputs used by Royal Armory unit specialization effects.
 *
 * Armory upgrades 19–26 and the extra outpost clear-kills multiplier are
 * compared with their corresponding Armory accessors before checking unit effects.
 */

import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-unit-spec-effect-data.json';

const upgradeCases = [
    { index: 19, extractionKey: 'royal_armory_unit_spec_upgrade_19' },
    { index: 20, extractionKey: 'royal_armory_unit_spec_upgrade_20' },
    { index: 21, extractionKey: 'royal_armory_unit_spec_upgrade_21' },
    { index: 22, extractionKey: 'royal_armory_unit_spec_upgrade_22' },
    { index: 23, extractionKey: 'royal_armory_unit_spec_upgrade_23' },
    { index: 24, extractionKey: 'royal_armory_unit_spec_upgrade_24' },
    { index: 25, extractionKey: 'royal_armory_unit_spec_upgrade_25' },
    { index: 26, extractionKey: 'royal_armory_unit_spec_upgrade_26' },
];

describe('Royal Armory unit specialization direct parameters', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
    });

    upgradeCases.forEach(({ index, extractionKey }) => {
        it(`matches Armory upgrade ${index} used by unit specialization`, () => {
            const extractionResults = loadExtractionResults(extractionResultsName);
            validateExtractionHealth(extractionResults);
            const liveValue = getExtractedValue(extractionResults, extractionKey);
            const domainValue = royalArmory.getUpgradeBonus(index);

            expect(domainValue).toMatchLiveGame(liveValue, 0);
        });
    });

    it('matches the extra outpost clear-kills multiplier used by unit specialization index 4', () => {
        const extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const liveValue = getExtractedValue(
            extractionResults,
            'royal_armory_unit_spec_extra_clear_killz',
        );
        const domainValue = royalArmory.getExtraClearKills();

        expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
});
