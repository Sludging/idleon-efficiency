import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';

describe('Upgrade Vault cost reduction sources', () => {
    let upgradeVault: UpgradeVault;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults('upgrade-vault-cost-reduction-sources-data.json');
        validateExtractionHealth(extractionResults);
        upgradeVault = loadGameDataFromSave('latest').get('upgradeVault') as UpgradeVault;
    });

    it.each([
        { source: 'darts', label: 'vault_darts_cheaper_multiplier', name: 'Darts' },
        { source: 'sushiRoll', label: 'vault_companion_cheaper_multiplier', name: 'active Sushi Roll companion' },
        { source: 'sushiStation', label: 'vault_sushi_cheaper_multiplier', name: 'strongest Sushi Station bonus' },
    ] as const)('matches the $name contribution to cheaper Vault upgrades', ({ source, label, name }) => {
        expect(upgradeVault.getCostReductionMultipliers()[source]).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, label),
            { tolerance: 0, context: `Upgrade Vault cheaper multiplier from ${name}` },
        );
    });
});
