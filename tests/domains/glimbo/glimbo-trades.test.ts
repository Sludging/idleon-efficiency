import { Glimbo, greenstackThreshold } from '../../../data/domain/world-7/glimbo';
import { initAllItems } from '../../../data/domain/items';
import { StaticRepositories } from '../../../data/domain/repositories';
import { Storage } from '../../../data/domain/storage';
import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';

describe('Glimbo trade state and previews', () => {
    let extractionResults: ExtractionResults;
    let glimbo: Glimbo;
    let storage: Storage;
    let upgradeVault: UpgradeVault;

    beforeAll(() => {
        extractionResults = loadExtractionResults('glimbo-trades-data.json');
        validateExtractionHealth(extractionResults);
        const gameData = loadGameDataFromSave('latest');
        glimbo = gameData.get('glimbo') as Glimbo;
        storage = gameData.get('storage') as Storage;
        upgradeVault = gameData.get('upgradeVault') as UpgradeVault;
    });

    it('matches total trade count and Drop Rate multiplier from the regular save', () => {
        expect(glimbo.totalTrades).toMatchLiveGame(getExtractedValue(extractionResults, 'total_trades'), 0);
        expect(glimbo.dropRateBonusMultiplier).toMatchLiveGame(getExtractedValue(extractionResults, 'drop_rate_multiplier'), 0);
    });

    it.each([
        { index: 0, prefix: 'trade_0' },
        { index: 2, prefix: 'trade_2' },
        { index: 15, prefix: 'trade_15' },
    ])('matches native state and previews for trade $index', ({ index, prefix }) => {
        const trade = glimbo.trades[index];

        expect(trade.count).toMatchLiveGame(getExtractedValue(extractionResults, `${prefix}_count`), 0);
        expect(trade.cost).toMatchLiveGame(getExtractedValue(extractionResults, `${prefix}_cost`), 0);
        expect(trade.maximumLevel).toMatchLiveGame(getExtractedValue(extractionResults, `${prefix}_maximum`), 0);
        expect(trade.nextMaximumLevelGain).toMatchLiveGame(
            getExtractedValue(extractionResults, `${prefix}_next_gain`),
            0,
        );
        expect(trade.material.internalName).toBe(trade.data.costItem);
        expect(trade.upgradeName).toBe(upgradeVault.bonuses[trade.data.vaultUpgradeIndex].data.name.replace('$', '').split('製')[0].trim());
    });

    it.each([0, 2, 15])('exposes current Vault level and prices hypothetical trade counts for trade %i', index => {
        const trade = glimbo.trades[index];

        expect(trade.currentVaultLevel).toBe(upgradeVault.bonuses[trade.data.vaultUpgradeIndex].level);
        expect(trade.getCostAtCount(trade.count)).toBe(trade.cost);
        expect(trade.getCostAtCount(trade.count + 1)).toBeGreaterThan(0);
    });

    it.each([0, 2, 15])('prices only sequential trades covered by the supplied budget for trade %i', index => {
        const trade = glimbo.trades[index];
        const nextCost = trade.getCostAtCount(trade.count);

        expect(trade.canAfford(nextCost - 1)).toBe(false);
        expect(trade.canAfford(nextCost)).toBe(true);
        expect(trade.getAffordableTradeCount(nextCost - 1)).toBe(0);
        expect(trade.getAffordableTradeCount(nextCost)).toBe(1);
        expect(trade.getAffordableTradeCount(nextCost + trade.getCostAtCount(trade.count + 1))).toBe(2);
        expect(trade.count).toBe(getExtractedValue(extractionResults, `trade_${index}_count`));
    });

    it.each([false, true])('derives spendable resource budget from regular-save stock with greenstack policy %s', maintainGreenstacks => {
        glimbo.trades.forEach((trade, index) => {
            const bankStock = storage.chest.reduce(
                (total, item) => total + (item.internalName === trade.data.costItem ? item.count : 0),
                0,
            );
            const totalStock = storage.amountInStorage(trade.data.costItem);
            const reserved = maintainGreenstacks ? Math.min(bankStock, greenstackThreshold) : 0;

            expect(glimbo.getResourceBudget(index, maintainGreenstacks)).toBe(totalStock - reserved);
        });
    });

    it('initializes static trades and neutral price and budget before save parsing', () => {
        const unparsed = new Glimbo().init(initAllItems(), 0, new StaticRepositories());

        expect(unparsed.trades).toHaveLength(22);
        expect(unparsed.trades[0].getCostAtCount(0)).toBeGreaterThan(0);
        expect(unparsed.getResourceBudget(0, true)).toBe(0);
    });
});