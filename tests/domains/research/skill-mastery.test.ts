import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { SkillMastery } from '../../../data/domain/world-4/rift';

const researchBonusSlots = [0, 1, 2, 3, 4, 5, 6];
const genericTotalSlots = [2, 3, 4, 5, 6];

function createMastery(researchTotal: number, active = true): SkillMastery {
    const mastery = new SkillMastery(2, 'Skill Mastery', 16, '');
    mastery.active = active;
    mastery.skillLevels[SkillsIndex.Research] = researchTotal;
    return mastery;
}

function researchBonuses(mastery: SkillMastery): number[] {
    return researchBonusSlots.map(slot => mastery.getSkillBonus(SkillsIndex.Research, slot));
}

function genericTotals(mastery: SkillMastery): number[] {
    return genericTotalSlots.map(slot => mastery.getTotalBonusByIndex(slot));
}

const researchThresholdCases = [
    { total: 149, rank: 0, bonuses: [0, 0, 0, 0, 0, 0, 0] },
    { total: 150, rank: 1, bonuses: [10, 0, 0, 0, 0, 0, 0] },
    { total: 151, rank: 1, bonuses: [10, 0, 0, 0, 0, 0, 0] },
    { total: 199, rank: 1, bonuses: [10, 0, 0, 0, 0, 0, 0] },
    { total: 200, rank: 2, bonuses: [10, 1, 0, 0, 0, 0, 0] },
    { total: 201, rank: 2, bonuses: [10, 1, 0, 0, 0, 0, 0] },
    { total: 299, rank: 2, bonuses: [10, 1, 0, 0, 0, 0, 0] },
    { total: 300, rank: 3, bonuses: [10, 1, 1, 0, 0, 0, 0] },
    { total: 301, rank: 3, bonuses: [10, 1, 1, 0, 0, 0, 0] },
    { total: 399, rank: 3, bonuses: [10, 1, 1, 0, 0, 0, 0] },
    { total: 400, rank: 4, bonuses: [10, 1, 1, 15, 0, 0, 0] },
    { total: 401, rank: 4, bonuses: [10, 1, 1, 15, 0, 0, 0] },
    { total: 499, rank: 4, bonuses: [10, 1, 1, 15, 0, 0, 0] },
    { total: 500, rank: 5, bonuses: [10, 1, 1, 15, 1, 0, 0] },
    { total: 501, rank: 5, bonuses: [10, 1, 1, 15, 1, 0, 0] },
    { total: 749, rank: 5, bonuses: [10, 1, 1, 15, 1, 0, 0] },
    { total: 750, rank: 6, bonuses: [10, 1, 1, 15, 1, 10, 0] },
    { total: 751, rank: 6, bonuses: [10, 1, 1, 15, 1, 10, 0] },
    { total: 999, rank: 6, bonuses: [10, 1, 1, 15, 1, 10, 0] },
    { total: 1000, rank: 7, bonuses: [10, 1, 1, 15, 1, 10, 1] },
    { total: 1001, rank: 7, bonuses: [10, 1, 1, 15, 1, 10, 1] },
];

describe('Research Skill Mastery with controlled mechanic inputs', () => {
    it.each(researchThresholdCases)(
        'gives rank $rank and cumulative Research effects at total level $total',
        ({ total, rank, bonuses }) => {
            const mastery = createMastery(total);

            expect(mastery.getSkillRank(SkillsIndex.Research)).toBe(rank);
            expect(researchBonuses(mastery)).toEqual(bonuses);
        },
    );

    it('keeps the qualifying rank but grants no numeric effects while Skill Mastery is locked', () => {
        const mastery = createMastery(1000, false);

        expect(mastery.getSkillRank(SkillsIndex.Research)).toBe(7);
        expect(researchBonuses(mastery)).toEqual([0, 0, 0, 0, 0, 0, 0]);
        expect(genericTotals(mastery)).toEqual([7, 7, 7, 7, 7]);
    });

    // Research grants no generic bonuses. Alchemy contributes [5, 10, 5, 1, 25] to the five totals.
    it.each([0, 149, 150, 200, 300, 400, 500, 750, 792, 1000, 1001])(
        'excludes Research total %i while still counting another generic skill',
        total => {
            const mastery = createMastery(total);

            expect(genericTotals(mastery)).toEqual([7, 7, 7, 7, 7]);

            mastery.skillLevels[SkillsIndex.Alchemy] = 1000;

            expect(genericTotals(mastery)).toEqual([12, 17, 12, 8, 32]);
        },
    );
});
