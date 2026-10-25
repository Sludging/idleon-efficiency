import { initAllItems } from '../../../data/domain/items';
import { StaticRepositories } from '../../../data/domain/repositories';
import { Spelunking, updateSpelunkingAccountMetrics, updateSpelunkingLateCalculations } from '../../../data/domain/world-7/spelunking';
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
    let gameData: Map<string, unknown>;

    beforeAll(() => {
        extractionResults = loadExtractionResults('spelunking-cave-nodes-data.json');
        validateExtractionHealth(extractionResults);
        gameData = loadGameDataFromSave('latest');
        spelunking = gameData.get('spelunking') as Spelunking;
        expect(spelunking.chapters).toHaveLength(caveNodes.length);
    });

    it('initializes neutral results for every saved character, tunnel, and chapter', () => {
        const names = loadTestSave('latest').get('playerNames') as string[];
        const initialized = new Spelunking();
        initialized.init(initAllItems(), names.length, new StaticRepositories());

        expect(initialized.characters).toHaveLength(names.length);
        initialized.characters.forEach((character, playerID) => {
            expect(character.playerID).toBe(playerID);
            expect(character.playerName).toBe('');
            expect(character.skillLevel).toBe(0);
            expect(character.efficiency).toBe(0);
            expect(character.grandDiscoveryChances).toHaveLength(initialized.tunnels.length);
            expect(character.caveNodeHarvests).toHaveLength(initialized.chapters.length);
            initialized.tunnels.forEach(tunnel => {
                expect(character.grandDiscoveryChances[tunnel.index]).toBe(0);
            });
            initialized.chapters.forEach(chapter => {
                const outcome = character.caveNodeHarvests[chapter.index];
                expect(outcome.eligible).toBe(false);
                expect(outcome.harvestChance).toBe(0);
                expect(outcome.pagesPerDrop).toBe(0);
            });
        });
        expect(initialized.grandDiscovery.playerName).toBe('');
        expect(initialized.grandDiscovery.skillLevel).toBe(0);
        expect(initialized.grandDiscovery.chances).toHaveLength(initialized.tunnels.length);
        initialized.tunnels.forEach(tunnel => {
            expect(tunnel.grandEligible).toBe(false);
            expect(initialized.grandDiscovery.chances[tunnel.index]).toBe(0);
        });
    });

    it('resets prepared character results when parsing the real save again', () => {
        const save = loadTestSave('latest');
        const names = save.get('playerNames') as string[];
        const prepared = new Spelunking('spelunking').init(initAllItems(), names.length, new StaticRepositories());
        const data = new Map(gameData);
        data.set('spelunking', prepared);
        data.set('charCount', names.length);
        ['Spelunk', 'OptLacc', 'GemItemsPurchased'].forEach(key => {
            const value = save.get(key);
            data.set(key, typeof value === 'string' ? JSON.parse(value) : value);
        });

        prepared.parse(data);
        updateSpelunkingAccountMetrics(data);
        updateSpelunkingLateCalculations(data);
        expect(prepared.characters.some(character => character.efficiency > 0)).toBe(true);
        expect(prepared.grandDiscovery.playerName).not.toBe('');

        prepared.parse(data);

        expect(prepared.characters).toHaveLength(names.length);
        prepared.characters.forEach(character => {
            expect(character.playerName).toBe('');
            expect(character.skillLevel).toBe(0);
            expect(character.efficiency).toBe(0);
            prepared.tunnels.forEach(tunnel => {
                expect(character.grandDiscoveryChances[tunnel.index]).toBe(0);
            });
            prepared.chapters.forEach(chapter => {
                const outcome = character.caveNodeHarvests[chapter.index];
                expect(outcome.eligible).toBe(false);
                expect(outcome.harvestChance).toBe(0);
                expect(outcome.pagesPerDrop).toBe(0);
            });
        });
        expect(prepared.grandDiscovery.playerName).toBe('');
        expect(prepared.grandDiscovery.skillLevel).toBe(0);
        prepared.tunnels.forEach(tunnel => {
            expect(prepared.grandDiscovery.chances[tunnel.index]).toBe(0);
        });
    });

    it.each(caveNodes)('matches character 3 eligibility, harvest chance, and pages per drop at $name', ({ chapterIndex, name }) => {
        const label = `cave_node_${chapterIndex}_player_3`;
        expect(extractionResults.extractions[label]).toBeDefined();
        expect(extractionResults.extractions[label].result).not.toBeNull();
        const expected = extractionResults.extractions[label].result as NativeCaveNodeOutcome;
        const outcome = spelunking.characters[playerID].caveNodeHarvests[chapterIndex];
        const context = `${name}: character 3; native efficiency ${expected.efficiency}, prowess ${expected.prowess}, difficulty ${expected.difficulty}`;

        // Efficiency eligibility does not bypass normal access to the node's map.
        expect(outcome.eligible).toBe(expected.eligible);
        expect(outcome.harvestChance).toMatchLiveGameWithDetails(expected.harvestChance, {
            tolerance: 0,
            context: `${context}; harvest chance fraction`,
        });

        if (expected.pagesPerDrop === null) {
            expect(outcome.eligible).toBe(false);
            expect(outcome.pagesPerDrop).toBe(0);
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
        const selectedPlayerID = expectedPlayerID!;
        expect(spelunking.grandDiscovery.playerName).toBe(names[selectedPlayerID]);
        expect(spelunking.grandDiscovery.skillLevel).toMatchLiveGameWithDetails(highestLevel, {
            tolerance: 0,
            context: `Highest actual saved Spelunking level ${highestLevel}; first roster character wins a tie`,
        });
        spelunking.tunnels.forEach(tunnel => {
            expect(spelunking.grandDiscovery.chances[tunnel.index]).toBe(
                spelunking.characters[selectedPlayerID].grandDiscoveryChances[tunnel.index],
            );
        });
    });
});
