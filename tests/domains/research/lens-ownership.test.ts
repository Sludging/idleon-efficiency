import { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

// Compare all four approved native lens outputs without deriving plain Magnifying Glass ownership.
// The genuine save covers current ownership and capacity, not every ownership source or cap transition.
describe('Research account-wide lens ownership', () => {
    let results: ExtractionResults;
    let research: ResearchGrid;

    beforeAll(() => {
        results = loadExtractionResults('research-lens-ownership-data.json');
        validateExtractionHealth(results);
        research = loadGameDataFromSave('latest').get('research') as ResearchGrid;
    });

    it('matches total owned lenses across all lens kinds', () => {
        expect(research.lensOwnership.total).toMatchLiveGameWithDetails(getExtractedValue(results, 'owned_lenses'), {
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

    it('matches lens capacity per Observation', () => {
        expect(research.lensOwnership.capacityPerObservation).toMatchLiveGameWithDetails(getExtractedValue(results, 'lens_capacity'), {
            tolerance: 0,
            context: 'Maximum lenses per Observation',
        });
    });
});
