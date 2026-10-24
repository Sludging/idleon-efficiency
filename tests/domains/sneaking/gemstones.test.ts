import { Sneaking, SneakingGemstone } from '../../../data/domain/world-6/sneaking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

// The eight collected gemstones form the complete, small set of displayed effects.
const gemstoneCases: [number, string][] = [
    [0, 'Aquamarine stealth'],
    [1, 'Malachite Jade gain'],
    [2, 'Garnet door damage'],
    [3, 'Starite Gold Charm bonus'],
    [4, 'Topaz Sneaking EXP'],
    [5, 'Moissanite gemstone bonus'],
    [6, 'Emerald upgrade cost'],
    [7, 'Firefrost fractional charm levels'],
];

describe('Sneaking gemstone collection results', () => {
    let sneaking: Sneaking;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('sneaking-gemstones-data.json');
        validateExtractionHealth(results);
        sneaking = loadGameDataFromSave('latest').get('sneaking') as Sneaking;
    });

    const getGemstone = (index: number): SneakingGemstone => {
        return sneaking.gemstones[index];
    };

    it.each(gemstoneCases)('%i: matches the full %s effect', (index, description) => {
        const gemstone = getGemstone(index);
        expect(gemstone.getBonus()).toMatchLiveGameWithDetails(
            getExtractedValue(results, `gemstone_${index}_bonus`), {
                tolerance: 0,
                context: `${description}: full native collection effect`,
                debugInfo: { quantity: gemstone.quantity },
            }
        );
    });

    it.each(gemstoneCases)('%i: shows the collected quantity for %s', (index, description) => {
        expect(getGemstone(index).quantity).toMatchLiveGameWithDetails(
            getExtractedValue(results, `gemstone_${index}_quantity`), {
                tolerance: 0,
                context: `${description}: visible collected gemstone quantity`,
            }
        );
    });

    it('matches the Emerald discount shown by the native collection panel', () => {
        expect(getGemstone(6).getUpgradeDiscountPercent()).toMatchLiveGameWithDetails(
            getExtractedValue(results, 'emerald_discount_percent'), {
                tolerance: 0,
                context: 'Emerald effective upgrade discount, not its raw divisor bonus',
            }
        );
    });
});
