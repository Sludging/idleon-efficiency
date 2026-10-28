import { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { PreviewExpectations, researchExpected, researchPreviewExpectations } from './preview-expectations';

describe('Research earned Points', () => {
    let results: ExtractionResults;
    let research: ResearchGrid;
    let preview: PreviewExpectations | undefined;

    beforeAll(() => {
        results = loadExtractionResults('research-points-earned-data.json');
        validateExtractionHealth(results);
        research = loadGameDataFromSave('latest').get('research') as ResearchGrid;
        preview = researchPreviewExpectations();
    });

    it('reports website preview earned Points before entry and matches native earned Points after entry', () => {
        const extraction = results.extractions.points_earned;
        if (!extraction || extraction.result === null || extraction.result === undefined) {
            throw new Error('Missing native earned Research Points: ResearchStuff/Grid_PTSearned(0, 0)');
        }

        expect(research.points.earned).toMatchLiveGameWithDetails(researchExpected(preview, 'points_earned', () => getExtractedValue(results, 'points_earned')), {
            tolerance: 0,
            context: 'Account-wide earned Research Points',
            debugInfo: research.points.contributors,
        });
    });
});
