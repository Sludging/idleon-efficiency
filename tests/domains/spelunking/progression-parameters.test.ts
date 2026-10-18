import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

describe('Spelunking Grand discovery parameters', () => {
    let extractionResults: ExtractionResults;
    let spelunking: Spelunking;

    beforeAll(() => {
        extractionResults = loadExtractionResults('spelunking-progression-data.json');
        validateExtractionHealth(extractionResults);
        spelunking = loadGameDataFromSave('latest').get('spelunking') as Spelunking;
    });

    it('matches the shared Grand Discoveries upgrade bonus used by eligibility', () => {
        // The paired save observes a purchased bonus. Locked and zero upgrade branches remain unobserved.
        expect(spelunking.grandDiscoveryUpgradeBonus).toMatchLiveGame(
            getExtractedValue(extractionResults, 'grand_upgrade_bonus'), 0,
        );
    });

    it('matches available tunnel count used by tunnel access', () => {
        expect(spelunking.availableTunnelCount).toMatchLiveGame(
            getExtractedValue(extractionResults, 'available_tunnel_count'), 0,
        );
    });

});
