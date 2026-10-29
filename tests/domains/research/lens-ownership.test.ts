import { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { PreviewExpectations, researchExpected, researchPreviewExpectations } from './preview-expectations';

describe('Research account-wide lens ownership', () => {
    let results: ExtractionResults;
    let research: ResearchGrid;
    let preview: PreviewExpectations | undefined;

    beforeAll(() => {
        results = loadExtractionResults('research-lens-ownership-data.json');
        validateExtractionHealth(results);
        research = loadGameDataFromSave('latest').get('research') as ResearchGrid;
        preview = researchPreviewExpectations();
    });

    it('reports the previewed lens total before entry and matches the game total after entry', () => {
        expect(research.lensOwnership.total).toMatchLiveGameWithDetails(researchExpected(preview, 'owned_lenses', () => getExtractedValue(results, 'owned_lenses')), {
            tolerance: 0,
            context: 'Total owned Research lenses, including Optical Monocles and Kaleidoscopes',
        });
    });

    it('matches owned Optical Monocles', () => {
        expect(research.lensOwnership.opticalMonocles).toMatchLiveGameWithDetails(getExtractedValue(results, 'owned_monocles'), {
            tolerance: 0,
            context: 'Owned Optical Monocles',
        });
    });

    it('matches owned Kaleidoscopes', () => {
        expect(research.lensOwnership.kaleidoscopes).toMatchLiveGameWithDetails(getExtractedValue(results, 'owned_kaleidoscopes'), {
            tolerance: 0,
            context: 'Owned Kaleidoscopes',
        });
    });

    it('reports previewed lens capacity before entry and matches game capacity after entry', () => {
        expect(research.lensOwnership.capacityPerObservation).toMatchLiveGameWithDetails(researchExpected(preview, 'lens_capacity', () => getExtractedValue(results, 'lens_capacity')), {
            tolerance: 0,
            context: 'Maximum lenses per Observation',
        });
    });
});
