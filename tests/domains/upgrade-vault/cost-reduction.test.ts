import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'upgrade-vault-cost-reduction-data.json';

// This contract is the reciprocal shared cost factor, not a percent or individual upgrade quote.
describe('Upgrade Vault shared cost reduction', () => {
    let upgradeVault: UpgradeVault;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        upgradeVault = loadGameDataFromSave(saveName).get('upgradeVault') as UpgradeVault;
    });

    it('matches the common Upgrade Vault cheaper multiplier, excluding Major Discount', () => {
        expect(upgradeVault.getCostReductionMultiplier()).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'vault_cost_reduction_multiplier'),
            { tolerance: 0, context: 'Common Upgrade Vault cheaper multiplier excluding Major Discount' },
        );
    });
});
