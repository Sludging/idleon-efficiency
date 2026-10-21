import { Deathnote } from '../../../../data/domain/world-3/construction/deathnote';
import { loadGameDataFromSave } from '../../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../../utils/live-game-data-loader';

// Expected scalar ranks follow ../IdleonWikiBot/codefiles/idleon1.22.txt:172317-172333.
// Eclipse Skulls require more than one billion kills.
const rankCases = [
    { killCount: 0, inactiveRank: 0, activeRank: 0 },
    { killCount: 24999, inactiveRank: 0, activeRank: 0 },
    { killCount: 25000, inactiveRank: 1, activeRank: 1 },
    { killCount: 25001, inactiveRank: 1, activeRank: 1 },
    { killCount: 99999, inactiveRank: 1, activeRank: 1 },
    { killCount: 100000, inactiveRank: 2, activeRank: 2 },
    { killCount: 100001, inactiveRank: 2, activeRank: 2 },
    { killCount: 249999, inactiveRank: 2, activeRank: 2 },
    { killCount: 250000, inactiveRank: 3, activeRank: 3 },
    { killCount: 250001, inactiveRank: 3, activeRank: 3 },
    { killCount: 499999, inactiveRank: 3, activeRank: 3 },
    { killCount: 500000, inactiveRank: 4, activeRank: 4 },
    { killCount: 500001, inactiveRank: 4, activeRank: 4 },
    { killCount: 999999, inactiveRank: 4, activeRank: 4 },
    { killCount: 1000000, inactiveRank: 5, activeRank: 5 },
    { killCount: 1000001, inactiveRank: 5, activeRank: 5 },
    { killCount: 4999999, inactiveRank: 5, activeRank: 5 },
    { killCount: 5000000, inactiveRank: 7, activeRank: 7 },
    { killCount: 5000001, inactiveRank: 7, activeRank: 7 },
    { killCount: 99999999, inactiveRank: 7, activeRank: 7 },
    { killCount: 100000000, inactiveRank: 10, activeRank: 10 },
    { killCount: 100000001, inactiveRank: 10, activeRank: 10 },
    { killCount: 999999999, inactiveRank: 10, activeRank: 10 },
    { killCount: 1000000000, inactiveRank: 10, activeRank: 10 },
    { killCount: 1000000001, inactiveRank: 10, activeRank: 20 },
    { killCount: 1e20, inactiveRank: 10, activeRank: 20 },
    { killCount: Number.MAX_SAFE_INTEGER, inactiveRank: 10, activeRank: 20 },
    { killCount: Number.MAX_VALUE, inactiveRank: 10, activeRank: 20 },
];

describe('Deathnote normal-world numeric ranks', () => {
    const deathnote = new Deathnote('deathnote');

    it.each(rankCases)('returns $inactiveRank for $killCount kills with Eclipse Skulls inactive', ({ killCount, inactiveRank }) => {
        expect(deathnote.getNormalWorldRank(killCount, false)).toBe(inactiveRank);
    });

    it.each(rankCases)('returns $activeRank for $killCount kills with Eclipse Skulls active', ({ killCount, activeRank }) => {
        expect(deathnote.getNormalWorldRank(killCount, true)).toBe(activeRank);
    });
});

describe('Deathnote normal-world aggregate', () => {
    it('matches native Deathnote ranks across normal worlds for the retained save', () => {
        const results = loadExtractionResults('research-account-progress-data.json');
        validateExtractionHealth(results);
        const deathnote = loadGameDataFromSave('latest').get('deathnote') as Deathnote;
        const nativeRankTotal = getExtractedValue(results, 'gambit_deathnote_world_total');

        expect(deathnote.getTotalWorldRank()).toMatchLiveGameWithDetails(nativeRankTotal, {
            tolerance: 0,
            context: 'Deathnote normal-world ranks across all seven worlds; excludes miniboss ranks',
        });
    });
});

