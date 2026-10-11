import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const resultFile = 'royal-armory-parchment-acquisition-data.json';

describe('Royal Guardian parchment acquisition and Royal Castle damage', () => {
    let results: ExtractionResults;
    let armory: RoyalArmory;

    beforeAll(() => {
        results = loadExtractionResults(resultFile);
        validateExtractionHealth(results);
        armory = loadGameDataFromSave('latest').get('royalArmory') as RoyalArmory;
    });

    it('matches parchment probability per Verminous Rat defeat as a Royal Guardian', () => {
        expect(armory.getParchmentDropChance()).toMatchLiveGameWithDetails(
            getExtractedValue(results, 'parchment_drop_chance'), {
                tolerance: 0,
                context: 'Parchment of Enchantment probability per Royal Guardian Verminous Rat defeat',
                debugInfo: {
                    parchmentUpgradeBonus: armory.getUpgradeBonus(37),
                    surplusBonus: armory.getUpgradeBonus(38),
                    orbletBonus: armory.getOrbletMarketBonus(9),
                },
            });
    });

    it('matches maximum Royal Castle damage without treating it as fixed damage per hit', () => {
        expect(armory.getRoyalCastleMaximumDamage()).toMatchLiveGameWithDetails(
            getExtractedValue(results, 'royal_castle_maximum_damage'), {
                tolerance: 0,
                context: 'Maximum damage used by the Royal Castle map-43 combat branch',
                debugInfo: {
                    baseDamageBonus: armory.getUpgradeBonus(35),
                    damagePercentBonus: armory.getUpgradeBonus(36),
                },
            });
    });
});
