import { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

describe('Research earned Points', () => {
    let results: ExtractionResults;
    let research: ResearchGrid;

    beforeAll(() => {
        results = loadExtractionResults('research-points-earned-data.json');
        validateExtractionHealth(results);
        research = loadGameDataFromSave('latest').get('research') as ResearchGrid;
    });

    it('matches account-wide earned Points', () => {
        const extraction = results.extractions.points_earned;
        if (!extraction || extraction.result === null || extraction.result === undefined) {
            throw new Error('Missing native earned Research Points: ResearchStuff/Grid_PTSearned(0, 0)');
        }

        expect(research.points.earned).toMatchLiveGameWithDetails(getExtractedValue(results, 'points_earned'), {
            tolerance: 0,
            context: 'Account-wide earned Research Points',
            debugInfo: research.points.contributors,
        });
    });
});
