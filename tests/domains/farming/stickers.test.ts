import { Farming } from '../../../data/domain/world-6/farming';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

// All seven Farming sticker effects form a small set. The genuine account has
// earned stickers for six effects and no Threepeat Champ stickers.
const stickerCases: [number, string][] = [
    [0, 'Mega Mongo Sticker Class EXP bonus'],
    [1, 'Laissez Maize Sticker Research EXP bonus'],
    [2, 'Chocotastic Muffin Sticker Artifact Find Chance bonus'],
    [3, 'UWU Kawaii Rice Sticker Gaming Bits bonus'],
    [4, 'Sporrious Stalk Sticker Crop Evolution bonus'],
    [5, 'Glassical Bananical Sticker Sticker Find Chance bonus'],
    [6, 'Threepeat Champ Sticker Spelunking POW bonus without earned stickers'],
];

describe('Farming sticker account results', () => {
    let farming: Farming;
    let results: ExtractionResults;
    beforeAll(() => {
        results = loadExtractionResults('farming-stickers-data.json');
        validateExtractionHealth(results);
        const data = loadGameDataFromSave('latest');
        farming = data.get('farming') as Farming;
    });
    it.each(stickerCases)('%i: %s', (index, description) => {
        expect(farming.getStickerBonus(index)).toMatchLiveGameWithDetails(
            getExtractedValue(results, `farming_sticker_bonus_${index}`), {
                tolerance: 0,
                context: description,
                debugInfo: { count: farming.stickers[index].count },
            }
        );
    });

    it.each(stickerCases)('%i: %s saved count', (index, description) => {
        expect(farming.stickers[index].count).toMatchLiveGameWithDetails(
            getExtractedValue(results, `farming_sticker_count_${index}`), {
                tolerance: 0,
                context: `${description}: saved copies`,
            }
        );
    });

    it('matches total owned sticker quantity, including every saved sticker slot', () => {
        expect(farming.getTotalStickers()).toMatchLiveGameWithDetails(
            getExtractedValue(results, 'farming_sticker_total'), {
                tolerance: 0,
                context: 'Total owned Farming stickers, not distinct sticker types',
            }
        );
    });

    it('matches the direct sticker damage multiplier', () => {
        expect(farming.getStickerDamageMultiplier()).toMatchLiveGameWithDetails(
            getExtractedValue(results, 'farming_sticker_damage_multiplier'), {
                tolerance: 0,
                context: 'Damage multiplier from all owned Farming stickers',
            }
        );
    });

    it.each(stickerCases)('%i: %s base next-find chance', (index, description) => {
        const probability = farming.stickers[index].getFindProbability();
        // The native Sticker Depot shows 1 / StickerOdds without a plot overgrowth factor.
        // Compare that visible denominator so very small probabilities retain relative precision.
        expect(1 / probability).toMatchLiveGameWithDetails(
            getExtractedValue(results, `farming_sticker_denominator_${index}`), {
                tolerance: 0,
                context: `${description}: base next-copy chance denominator`,
                debugInfo: { probability, count: farming.stickers[index].count },
            }
        );
    });
});
