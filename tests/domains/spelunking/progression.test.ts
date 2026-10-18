import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

// The paired save has available Scoutpost without completed Lore and locked Exiled Throne.
// Pebble Cove has partial Grand progress. Bizarrio has none and owns its final ordinary discovery.
// Glitter End lacks its final ordinary discovery. Lunarheim saves Kingdom Flags with underscores and trailing whitespace.
describe('Spelunking tunnel and collection progression', () => {
    let extractionResults: ExtractionResults;
    let spelunking: Spelunking;

    const gameValue = (key: string): number => getExtractedValue(extractionResults, key);
    const tunnelNamed = (name: string) => spelunking.tunnels.find(tunnel => tunnel.data.name === name)!;

    beforeAll(() => {
        // Original offline v1.22 outputs matched the retained save's relevant rows before and after extraction.
        // These comparisons do not establish connected live-game parity.
        extractionResults = loadExtractionResults('spelunking-progression-data.json');
        validateExtractionHealth(extractionResults);
        spelunking = loadGameDataFromSave('latest').get('spelunking') as Spelunking;
    });

    it('matches available tunnel count without treating access as Lore completion', () => {
        expect(spelunking.availableTunnelCount).toMatchLiveGameWithDetails(gameValue('available_tunnel_count'), {
            tolerance: 0,
            context: 'Available tunnels from the highest completed Lore milestone',
        });
    });




    it('maps ordinary ownership and saved Grand counts to each tunnel', () => {
        // Each tunnel has a separate object catalogue and positional Grand save slot.
        // Keep this compact index comparison to catch cross-tunnel mapping and Lore-boss inclusion errors.
        for (const tunnel of spelunking.tunnels) {
            const prefix = `tunnel_${tunnel.index}`;
            const options = { tolerance: 0, context: `${tunnel.data.name}: tunnel-local collection mapping` };

            expect(tunnel.ordinarySummary.found).toMatchLiveGameWithDetails(gameValue(`${prefix}_ordinary_found`), options);
            expect(tunnel.ordinarySummary.capacity).toMatchLiveGameWithDetails(gameValue(`${prefix}_ordinary_capacity`), options);
            expect(tunnel.grandSummary.found).toMatchLiveGameWithDetails(gameValue(`${prefix}_grand_found`), options);
        }
    });

    it('keeps ordinary and Grand account totals separate and excludes Lore bosses', () => {
        const ordinaryFound = spelunking.tunnels.reduce((total, tunnel) => total + gameValue(`tunnel_${tunnel.index}_ordinary_found`), 0);
        const ordinaryCapacity = spelunking.tunnels.reduce((total, tunnel) => total + gameValue(`tunnel_${tunnel.index}_ordinary_capacity`), 0);
        const grandFound = gameValue('grand_total');
        const grandCapacity = spelunking.tunnels.length * 10;
        const options = { tolerance: 0, context: 'Separate ordinary and Grand account collection totals' };

        expect(spelunking.ordinarySummary.found).toMatchLiveGameWithDetails(ordinaryFound, options);
        expect(spelunking.ordinarySummary.capacity).toMatchLiveGameWithDetails(ordinaryCapacity, options);
        expect(spelunking.ordinarySummary.missing).toMatchLiveGameWithDetails(ordinaryCapacity - ordinaryFound, options);
        expect(spelunking.getTotalDiscoveries()).toMatchLiveGameWithDetails(ordinaryFound, options);
        expect(spelunking.grandSummary.found).toMatchLiveGameWithDetails(grandFound, options);
        expect(spelunking.grandSummary.capacity).toMatchLiveGameWithDetails(grandCapacity, options);
        expect(spelunking.grandSummary.missing).toMatchLiveGameWithDetails(grandCapacity - grandFound, options);
    });

});
