import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

describe('Spelunking tunnel access and Grand progression', () => {
    let extractionResults: ExtractionResults;
    let spelunking: Spelunking;

    const gameValue = (key: string): number => getExtractedValue(extractionResults, key);

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




    it('maps saved Grand counts to each tunnel', () => {
        // Each tunnel has a separate positional Grand save slot.
        for (const tunnel of spelunking.tunnels) {
            const prefix = `tunnel_${tunnel.index}`;
            expect(tunnel.grandSummary.found).toMatchLiveGameWithDetails(gameValue(`${prefix}_grand_found`), {
                tolerance: 0, context: `${tunnel.data.name}: saved Grand count`,
            });
        }
    });

    it('matches the native Grand account total', () => {
        expect(spelunking.grandSummary.found).toMatchLiveGameWithDetails(gameValue('grand_total'), {
            tolerance: 0, context: 'Native Grand account total',
        });
    });

});
