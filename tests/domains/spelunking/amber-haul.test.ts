import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';


describe('Spelunking current-denomination recorded haul presentation', () => {
    let extractionResults: ExtractionResults;
    let spelunking: Spelunking;

    beforeAll(() => {
        extractionResults = loadExtractionResults('spelunking-amber-haul-data.json');
        validateExtractionHealth(extractionResults);
        spelunking = loadGameDataFromSave('latest').get('spelunking') as Spelunking;
    });

    it('selects the highest active Red unit while Pink remains locked', () => {
        const amber = spelunking.currentAmberDenomination;
        const options = { tolerance: 0, context: 'Account-wide Amber selection, not a tier chosen from each haul amount' };

        expect(amber.tier).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, 'amber_tier'), options);
        expect(amber.valueInBaseAmber).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'amber_denominator'), options,
        );
    });

});
