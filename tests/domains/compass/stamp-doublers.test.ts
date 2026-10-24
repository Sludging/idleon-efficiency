import type { Compass } from '../../../data/domain/compass';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

// The retained save has assigned Exalted Stamps and unused applications from all three grant sources.
const countComparisons = [
    { property: 'stampDoublersOwned', extractionKey: 'stamp_doublers_owned', mechanic: 'total granted Exalted Stamp uses, including assigned uses' },
    { property: 'stampDoublersAvailable', extractionKey: 'stamp_doublers_available', mechanic: 'available Exalted Stamp uses after saved assignments' },
] as const;

describe('Compass Exalted Stamp use counts', () => {
    let compass: Compass;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults('compass-stamp-doublers-data.json');
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave('latest');
        compass = gameData.get('compass') as Compass;
    });

    it.each(countComparisons)('matches $mechanic', ({ property, extractionKey, mechanic }) => {
        expect(compass[property]).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, extractionKey),
            {
                tolerance: 0,
                context: mechanic,
                debugInfo: {
                    owned: compass.stampDoublersOwned,
                    available: compass.stampDoublersAvailable,
                },
            },
        );
    });
});
