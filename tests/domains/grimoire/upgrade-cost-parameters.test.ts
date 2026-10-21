import type { MasterClasses } from '../../../data/domain/masterClasses';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

// Grimoire uses both whole discounts for every upgrade, including upgrades after the first three.
// Their internal inputs belong to the discount producers, not this price comparison.
describe('Grimoire upgrade cost direct calculated discounts', () => {
    let masterClasses: MasterClasses;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults('grimoire-upgrade-cost-data.json');
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave('latest');
        masterClasses = gameData.get('masterClasses') as MasterClasses;
    });

    it('matches the whole shared Master Classes upgrade cost multiplier', () => {
        expect(masterClasses.getUpgradeCostMultiplier()).toMatchLiveGame(
            getExtractedValue(extractionResults, 'grimoire_masterclass_cost_multiplier'),
            0,
        );
    });

    it('matches the whole first-three Master Classes upgrade cost multiplier', () => {
        expect(masterClasses.getFirstThreeUpgradeCostMultiplier()).toMatchLiveGame(
            getExtractedValue(extractionResults, 'grimoire_first_three_cost_multiplier'),
            0,
        );
    });
});
