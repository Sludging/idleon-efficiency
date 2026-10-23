import { initUpgradeVaultRepo } from '../../../data/domain/data/UpgradeVaultRepo';
import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    loadExtractionResults,
    normalizeExtractedValue,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const costCases = initUpgradeVaultRepo().map(({ index, data }) => ({ index, name: data.name }));

// Native raw quotes remain nonzero at the purchase cap. Do not compare them with capped purchase costs.
// The genuine save exercises blue, Companion, Sushi, and red-band factors, but no Darts reduction.
describe('Upgrade Vault current-level raw quotes', () => {
    let upgradeVault: UpgradeVault;
    let nativeCosts: Map<number, number>;

    beforeAll(() => {
        const results = loadExtractionResults('upgrade-vault-cost-data.json');
        validateExtractionHealth(results);
        const nativeRows: unknown = results.extractions.vault_upgrade_costs?.result;
        if (!Array.isArray(nativeRows)) {
            throw new Error('Missing native Upgrade Vault raw quote catalog array: vault_upgrade_costs');
        }
        if (nativeRows.length !== costCases.length) {
            throw new Error(`Upgrade Vault raw quote catalog mismatch: native ${nativeRows.length}, generated ${costCases.length}`);
        }
        nativeCosts = new Map(nativeRows.map(row => {
            if (row === null || row === undefined || row.cost === null || row.cost === undefined) {
                throw new Error('Missing native Upgrade Vault raw quote row');
            }
            return [row.index, normalizeExtractedValue(row.cost)];
        }));
        upgradeVault = loadGameDataFromSave(saveName).get('upgradeVault') as UpgradeVault;
    });

    it.each(costCases)('matches the $name current-level raw quote ($index)', ({ index, name }) => {
        const expected = nativeCosts.get(index);
        if (expected === null || expected === undefined) {
            throw new Error(`Missing native Upgrade Vault raw quote for ${name} (${index})`);
        }
        const upgrade = upgradeVault.bonuses[index];
        const maximumLevel = upgrade.getMaxLevel();
        expect(upgrade.getRawCost(upgradeVault.bonuses)).toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: `Upgrade Vault ${name} current-level raw quote (${index})`,
            debugInfo: {
                saveName,
                upgradeIndex: index,
                level: upgrade.level,
                effectiveCap: maximumLevel,
                unlocked: upgrade.unlocked,
            },
        });
    });
});
