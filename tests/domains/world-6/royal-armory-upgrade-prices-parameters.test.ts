import type { MasterClasses } from '../../../data/domain/masterClasses';
import type { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-upgrade-prices-data.json';

// Ordinary Royal prices call these three whole calculations directly. Inputs
// internal to the whole Master Classes multiplier belong to that producer's case.
describe('Royal Armory upgrade price direct calculated discounts', () => {
    let masterClasses: MasterClasses;
    let jellyOperator: JellyOperator;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave(saveName);
        masterClasses = gameData.get('masterClasses') as MasterClasses;
        jellyOperator = gameData.get('jellyOperator') as JellyOperator;
    });

    it('matches the whole Master Classes cost multiplier shared by ordinary Royal Armory prices', () => {
        expect(masterClasses.getUpgradeCostMultiplier()).toMatchLiveGame(
            getExtractedValue(extractionResults, 'royal_armory_price_masterclass_multiplier'),
            0,
        );
    });

    it('matches the first Jelly discount weighted by the Royal Armory position lookup', () => {
        const obstruction = jellyOperator.obstructions.find(candidate => candidate.index === 11);
        if (!obstruction) {
            throw new Error('Missing direct Royal Armory price parameter: Jelly obstruction 11 getBonus(), matching JellyOperation("RoG_BonusQTY", 11, 0).');
        }
        expect(obstruction.getBonus()).toMatchLiveGame(
            getExtractedValue(extractionResults, 'royal_armory_price_jelly_quantity_11'),
            0,
        );
    });

    it('matches the second Jelly discount weighted by the Royal Armory position lookup', () => {
        const obstruction = jellyOperator.obstructions.find(candidate => candidate.index === 26);
        if (!obstruction) {
            throw new Error('Missing direct Royal Armory price parameter: Jelly obstruction 26 getBonus(), matching JellyOperation("RoG_BonusQTY", 26, 0).');
        }
        expect(obstruction.getBonus()).toMatchLiveGame(
            getExtractedValue(extractionResults, 'royal_armory_price_jelly_quantity_26'),
            0,
        );
    });
});
