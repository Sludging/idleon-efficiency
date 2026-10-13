import { Deathnote } from '../../../../data/domain/world-3/construction/deathnote';

// Expected ranks follow ../IdleonWikiBot/codefiles/idleon1.22.txt:172317-172333.
// Eclipse Skulls require more than one billion kills. These numeric tests do not cover paired saves.
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

describe('Deathnote legacy numeric rank compatibility', () => {
    const exactMilestones = [25000, 100000, 250000, 500000, 1000000, 5000000, 100000000, 1000000000];
    const legacyRankCases = rankCases.map(({ killCount, inactiveRank, activeRank }) => ({
        killCount,
        legacyInactiveRank: exactMilestones.includes(killCount) ? 0 : inactiveRank,
        legacyActiveRank: exactMilestones.includes(killCount) ? 0 : activeRank,
    }));

    it.each(legacyRankCases)('preserves legacy rank $legacyInactiveRank for $killCount kills without the Rift bonus', ({ killCount, legacyInactiveRank }) => {
        const deathnote = new Deathnote('deathnote');

        expect(deathnote.getDeathnoteRank(killCount)).toBe(legacyInactiveRank);
    });

    it.each(legacyRankCases)('preserves legacy rank $legacyActiveRank for $killCount kills with the Rift bonus', ({ killCount, legacyActiveRank }) => {
        const deathnote = new Deathnote('deathnote');
        deathnote.hasRiftBonus = true;

        expect(deathnote.getDeathnoteRank(killCount)).toBe(legacyActiveRank);
    });

    it.each([
        { hasRiftBonus: false, expectedTotal: 17 },
        { hasRiftBonus: true, expectedTotal: 27 },
    ])('totals normal and miniboss legacy ranks as $expectedTotal with Rift bonus $hasRiftBonus', ({ hasRiftBonus, expectedTotal }) => {
        const deathnote = new Deathnote('deathnote');
        deathnote.mobKillCount.set('mushG', [1000000001]);
        deathnote.mobKillCount.set('slimeB', [100001]);
        deathnote.hasMinibosses = true;
        deathnote.hasRiftBonus = hasRiftBonus;

        expect(deathnote.getTotalRank()).toBe(expectedTotal);
    });

    it.each([
        { hasRiftBonus: false, eclipseSkullsActive: true, expectedRank: 20 },
        { hasRiftBonus: true, eclipseSkullsActive: false, expectedRank: 10 },
    ])('uses the explicit normal-world gate $eclipseSkullsActive independently of Rift bonus $hasRiftBonus', ({ hasRiftBonus, eclipseSkullsActive, expectedRank }) => {
        const deathnote = new Deathnote('deathnote');
        deathnote.hasRiftBonus = hasRiftBonus;

        expect(deathnote.getNormalWorldRank(1000000001, eclipseSkullsActive)).toBe(expectedRank);
    });
});
