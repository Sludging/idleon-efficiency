import { initGamingPaletteRepo } from '../../../data/domain/data/GamingPaletteRepo';
import { Gaming } from '../../../data/domain/world-5/gaming';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const paletteColors = initGamingPaletteRepo().map(record => ({ colorIndex: record.index, name: record.data.name }));

describe('Gaming Palette bonuses and Black Stars', () => {
    let gaming: Gaming;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('gaming-palette-black-stars-data.json');
        validateExtractionHealth(results);
        gaming = loadGameDataFromSave('latest').get('gaming') as Gaming;
    });

    it.each(paletteColors)('matches the $name Palette bonus', ({ colorIndex, name }) => {
        const expected = getExtractedValue(results, `palette_bonus_${colorIndex}`);
        expect(gaming.getPaletteBonus(colorIndex)).toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: `Gaming ${name} Palette bonus`,
            debugInfo: { colorIndex, blackStarsAvailable: gaming.palette.blackStarsAvailable },
        });
    });

    it('matches available Black Stars', () => {
        const expected = getExtractedValue(results, 'black_stars_available');
        expect(gaming.palette.blackStarsAvailable).toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: 'available Black Stars',
            debugInfo: { blackStarsAvailable: gaming.palette.blackStarsAvailable },
        });
    });
});
