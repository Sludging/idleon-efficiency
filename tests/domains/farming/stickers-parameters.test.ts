import { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const stickerParameters: ParameterTestSpec[] = [
    { extractionKey: 'sticker_research_bonus', description: 'Research enhancement for Farming sticker bonuses', domainExtractor: data => (data.get('research') as ResearchGrid).getBonusForId(68, 2) },
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
