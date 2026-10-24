import { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

describe('Spelunking persistent POW', () => {
    let extractionResults: ExtractionResults;
    let spelunking: Spelunking;

    beforeAll(() => {
        extractionResults = loadExtractionResults('spelunking-power-data.json');
        validateExtractionHealth(extractionResults);
        spelunking = loadGameDataFromSave('latest').get('spelunking') as Spelunking;
    });

    it('matches persistent account POW outside active delve effects', () => {
        const liveValue = getExtractedValue(extractionResults, 'spelunking_persistent_power');

        expect(spelunking.persistentPower).toMatchLiveGameWithDetails(liveValue, {
            tolerance: 0,
            context: 'Spelunking persistent account POW outside active delve effects',
        });
    });
});
