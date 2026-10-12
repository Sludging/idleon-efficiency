import { EventShop } from '../../../data/domain/eventShop';
import { Gaming } from '../../../data/domain/world-5/gaming';
import { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const stickerParameters: ParameterTestSpec[] = [
    { extractionKey: 'sticker_research_bonus', description: 'Research enhancement for Farming sticker bonuses', domainExtractor: data => (data.get('research') as ResearchGrid).getBonusForId(68, 2) },
    { extractionKey: 'sticker_event_shop_bonus', description: 'Event Shop Farming sticker enhancement ownership', domainExtractor: data => Number((data.get('eventShop') as EventShop).isBonusOwned(37)) },
    { extractionKey: 'sticker_superbit_bonus', description: 'Superbit Farming sticker enhancement ownership', domainExtractor: data => Number((data.get('gaming') as Gaming).isSuperbitPurchased(62)) },
];

describe('Farming sticker direct calculation parameters', () => {
    let data: Map<string, any>;
    let results: ExtractionResults;
    beforeAll(() => {
        results = loadExtractionResults('farming-stickers-data.json');
        validateExtractionHealth(results);
        data = loadGameDataFromSave('latest');
    });
    it.each(stickerParameters)('$description', ({ extractionKey, domainExtractor }) => {
        expect(domainExtractor(data)).toMatchLiveGame(getExtractedValue(results, extractionKey), 0);
    });
});
