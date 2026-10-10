import { HandleRawDataKey } from '../../../data/domain/base/domain';
import { Farming, updateFarmingStickerBonuses } from '../../../data/domain/world-6/farming';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
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

describe('Farming earned sticker bonuses', () => {
    let farming: Farming;
    let results: ExtractionResults;
    beforeAll(() => {
        results = loadExtractionResults('farming-stickers-data.json');
        validateExtractionHealth(results);
        farming = loadGameDataFromSave('latest').get('farming') as Farming;
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
});

it('reinitialization, reparsing and repeated Farming updates preserve earned sticker bonuses', () => {
    const results = loadExtractionResults('farming-stickers-data.json');
    validateExtractionHealth(results);
    const save = loadTestSave('latest');
    const data = loadGameDataFromSave('latest');
    const farming = data.get('farming') as Farming;
    const assertStickerResults = () => {
        for (let index = 0; index < 7; index++) {
            expect(farming.getStickerBonus(index)).toMatchLiveGame(
                getExtractedValue(results, `farming_sticker_bonus_${index}`), 0
            );
        }
    };
    assertStickerResults();
    const parsed = new Map(data);
    farming.getRawKeys().forEach(raw => HandleRawDataKey(raw, parsed, save, data.get('charCount')));
    farming.init([], 0);
    farming.parse(parsed);
    updateFarmingStickerBonuses(data);
    assertStickerResults();
    updateFarmingStickerBonuses(data);
    assertStickerResults();
});
