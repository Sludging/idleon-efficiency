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

    // These representatives cover partial Grand progress, no Grand progress, and a missing final ordinary discovery.
    // Access and missing Grand capacity are same-domain calculations. Ordinary ownership is parsed state.
    ['Pebble Cove', 'Bizarrio', 'Glitter End', 'Exiled Throne'].forEach(name => {
        it(`matches ${name} access and missing Grand capacity used by eligibility`, () => {
            const tunnel = spelunking.tunnels.find(entry => entry.data.name === name)!;
            const availableCount = getExtractedValue(extractionResults, 'available_tunnel_count');
            const grandFound = getExtractedValue(extractionResults, `tunnel_${tunnel.index}_grand_found`);

            expect(Number(tunnel.available)).toMatchLiveGame(Number(tunnel.index < availableCount), 0);
            expect(tunnel.grandSummary.missing).toMatchLiveGame(10 - grandFound, 0);
        });
    });
});
