import { initUpgradeVaultRepo } from '../../../data/domain/data/UpgradeVaultRepo';
import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    loadExtractionResults,
    normalizeExtractedValue,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const maximumLevelCases = initUpgradeVaultRepo().map(({ index, data }) => ({ index, name: data.name }));

// Current Gilded Awnings ownership (65) is zero; this save does not prove the positive branch.
describe('Upgrade Vault effective maximum levels', () => {
    let upgradeVault: UpgradeVault;
    let nativeMaxLevels: Map<number, number>;

    beforeAll(() => {
        const results = loadExtractionResults('upgrade-vault-max-level-data.json');
        validateExtractionHealth(results);
        const nativeRows: unknown = results.extractions.vault_max_levels?.result;
        if (!Array.isArray(nativeRows)) {
            throw new Error('Missing native Upgrade Vault maximum-level catalog array: vault_max_levels');
        }
        if (nativeRows.length !== maximumLevelCases.length) {
            throw new Error(`Upgrade Vault maximum-level catalog mismatch: native ${nativeRows.length}, generated ${maximumLevelCases.length}`);
        }
        for (const { index, name } of maximumLevelCases) {
            const nativeRow = nativeRows.find(row => row !== null && row !== undefined && row.index === index);
            if (nativeRow === undefined || nativeRow.maxLevel === null || nativeRow.maxLevel === undefined) {
                throw new Error(`Missing native Upgrade Vault maximum level for ${name} (${index})`);
            }
        }
        nativeMaxLevels = new Map(nativeRows.map(row => [row.index, normalizeExtractedValue(row.maxLevel)]));
        upgradeVault = loadGameDataFromSave(saveName).get('upgradeVault') as UpgradeVault;
    });

    it.each(maximumLevelCases)('matches the $name effective maximum level ($index)', ({ index, name }) => {
        const expected = nativeMaxLevels.get(index);
        if (expected === null || expected === undefined) {
            throw new Error(`Missing native Upgrade Vault maximum level for ${name} (${index})`);
        }
        const upgrade = upgradeVault.bonuses[index];

        expect(upgrade.getMaxLevel()).toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: `Upgrade Vault ${name} effective maximum level (${index})`,
            debugInfo: { saveName, upgradeIndex: index, level: upgrade.level, unlocked: upgrade.unlocked },
        });
    });
});
