import type { MasterClasses } from '../../../data/domain/masterClasses';
import type { Tesseract } from '../../../data/domain/tesseract';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'tesseract-upgrade-cost-data.json';

// Tesseract prices use these whole discounts directly. Their internal inputs
// belong to the discount producers, not this purchase-price comparison.
describe('Tesseract upgrade cost direct calculated discounts', () => {
    let tesseract: Tesseract;
    let masterClasses: MasterClasses;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave(saveName);
        tesseract = gameData.get('tesseract') as Tesseract;
        masterClasses = gameData.get('masterClasses') as MasterClasses;
    });

    it('matches the whole Massivon Hoarding Silver Tachyon discount bonus, including the Fractal Tesseract enhancement', () => {
        expect(tesseract.getUpgradeBonus(49)).toMatchLiveGame(
            getExtractedValue(extractionResults, 'tesseract_silver_discount_bonus_49'),
            0,
        );
    });

    it('matches the whole shared Master Classes upgrade cost multiplier', () => {
        expect(masterClasses.getUpgradeCostMultiplier()).toMatchLiveGame(
            getExtractedValue(extractionResults, 'tesseract_masterclass_cost_multiplier'),
            0,
        );
    });

    it('matches the whole first-three Master Classes upgrade cost multiplier', () => {
        const extractedFirst3 = getExtractedValue(extractionResults, 'tesseract_first_three_cost_multiplier');

        expect(masterClasses.getFirstThreeUpgradeCostMultiplier()).toMatchLiveGame(extractedFirst3, 0);
    });
});
