import { initNinjaUpgradeRepo } from '../../../data/domain/data/NinjaUpgradeRepo';
import { Sneaking, SneakingUpgrade } from '../../../data/domain/world-6/sneaking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

// Main Knowledge effects include ordinary scaling and each special item-level branch. Index 9 is filler.
const mainKnowledgeUpgrades = initNinjaUpgradeRepo().filter(upgrade => upgrade.index < 17 && upgrade.index !== 9);

describe('Sneaking Omnijade counts, daily levels, and Knowledge effects', () => {
    let sneaking: Sneaking;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('sneaking-omnijade-data.json');
        validateExtractionHealth(results);
        const gameData = loadGameDataFromSave('latest');
        sneaking = gameData.get('sneaking') as Sneaking;
    });

    const expected = (label: string): number => results.extractions[label].result as number;

    it('matches the remaining Omnijade count after saved allocations', () => {
        expect(sneaking.omnijade.getAvailableCount()).toMatchLiveGameWithDetails(expected('omnijade_remaining'), {
            tolerance: 0,
            context: 'Remaining account-wide Omnijade after the saved allocations',
        });
    });

    it('matches the daily free levels for each allocated Knowledge upgrade', () => {
        expect(sneaking.omnijade.getDailyLevelsPerAllocation()).toMatchLiveGameWithDetails(expected('omnijade_daily_levels'), {
            tolerance: 0,
            context: 'Daily free levels per allocation, not future applied levels',
        });
    });

    it.each(mainKnowledgeUpgrades)('$data.name: matches the current Knowledge effect', ({ index, data }) => {
        const upgrade: SneakingUpgrade = sneaking.sneakingUpgrades.find(upgrade => upgrade.index === index)!;
        expect(upgrade.getBonus()).toMatchLiveGameWithDetails(expected(`knowledge_bonus_${index}`), {
            tolerance: 0,
            context: `${data.name}: current Knowledge effect including saved free levels and native special additions`,
            debugInfo: { upgradeIndex: index, paidLevel: upgrade.level, selectedMastery: sneaking.selectedMastery },
        });
    });

    it('matches the displayed Knowledge source of usable Omnijade', () => {
        const upgrade: SneakingUpgrade = sneaking.sneakingUpgrades.find(upgrade => upgrade.index === 31)!;
        expect(upgrade.getBonus()).toMatchLiveGameWithDetails(expected('knowledge_bonus_31'), {
            tolerance: 0,
            context: 'Omnijade Usable: current Knowledge source contribution',
            debugInfo: { paidLevel: upgrade.level },
        });
    });
});
