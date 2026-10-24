import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type NativeCaveNodeOutcome = {
    eligible: boolean;
    harvestChance: number;
    pagesPerDrop: number | null;
    efficiency: number;
    prowess: number;
    difficulty: number;
};

const caveNodes = [
    { chapterIndex: 0, name: 'Fearful Tunnel' },
    { chapterIndex: 1, name: 'Decaying Crevasse' },
    { chapterIndex: 2, name: 'Buried Church' },
    { chapterIndex: 3, name: 'One Way Opening' },
    { chapterIndex: 4, name: 'Plunder Cranny' },
    { chapterIndex: 5, name: 'Kelp Forest' },
    { chapterIndex: 6, name: 'Burned Tunnel' },
];

describe('Spelunking Cave Node harvest outcomes', () => {
    const playerID = 3;
    let extractionResults: ExtractionResults;
    let spelunking: Spelunking;

    beforeAll(() => {
        extractionResults = loadExtractionResults('spelunking-cave-nodes-data.json');
        validateExtractionHealth(extractionResults);
        spelunking = loadGameDataFromSave('latest').get('spelunking') as Spelunking;
        expect(spelunking.chapters).toHaveLength(caveNodes.length);
    });

    it.each(caveNodes)('matches character 3 eligibility, harvest chance, and pages per drop at $name', ({ chapterIndex, name }) => {
        const label = `cave_node_${chapterIndex}_player_3`;
        expect(extractionResults.extractions[label]).toBeDefined();
        expect(extractionResults.extractions[label].result).not.toBeNull();
        const expected = extractionResults.extractions[label].result as NativeCaveNodeOutcome;
        const outcome = spelunking.getCaveNodeHarvest(chapterIndex, playerID);
        const context = `${name}: character 3; native efficiency ${expected.efficiency}, prowess ${expected.prowess}, difficulty ${expected.difficulty}`;

        // Efficiency eligibility does not bypass normal access to the node's map.
        expect(outcome.eligible).toBe(expected.eligible);
        expect(outcome.harvestChance).toMatchLiveGameWithDetails(expected.harvestChance, {
            tolerance: 0,
            context: `${context}; harvest chance fraction`,
        });

        if (expected.pagesPerDrop === null) {
            expect(outcome.pagesPerDrop).toBeUndefined();
        } else {
            // This integer quantity does not include extra drops or an EXP multiplier.
            expect(outcome.pagesPerDrop).toMatchLiveGameWithDetails(expected.pagesPerDrop, {
                tolerance: 0,
                context: `${context}; pages per drop`,
            });
        }
    });

    it('uses the highest Spelunking-level actual character for saved Grand Discovery chances', () => {
        const save = loadTestSave('latest');
        const names = save.get('playerNames') as string[];
        let expectedPlayerID: number | undefined;
        let highestLevel = -Infinity;

        // Read only real saved characters. Padded stamina slots do not define the roster.
        names.forEach((_, rosterIndex) => {
            const levels = save.get(`Lv0_${rosterIndex}`) as number[];
            const level = Number(levels[19]);
            if (level > highestLevel) {
                highestLevel = level;
                expectedPlayerID = rosterIndex;
            }
        });

        expect(expectedPlayerID).toBeDefined();
        expect(spelunking.grandDiscoveryPlayerID).toMatchLiveGameWithDetails(expectedPlayerID, {
            tolerance: 0,
            context: `Highest actual saved Spelunking level ${highestLevel}; first roster character wins a tie`,
        });
    });
});
