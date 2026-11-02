import { initAllItems } from '../../../data/domain/items';
import { StaticRepositories } from '../../../data/domain/repositories';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Rift, SkillMastery } from '../../../data/domain/world-4/rift';
import { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';

const allItems = initAllItems();
const repositories = new StaticRepositories();

function createResearch(totalLevel: number, active = true, failedRollCount = 0) {
    const research = new ResearchGrid().init(allItems, 0, repositories);
    const mastery = new SkillMastery(2, SkillMastery.displayName, 16, '');
    mastery.active = active;
    mastery.skillLevels[SkillsIndex.Research] = totalLevel;

    // Set Skill Mastery and failed-roll inputs without loading a saved account.
    Object.assign(research.sources, { mastery });
    Object.assign(research, { failedRollCount });
    const readGridBonus = research.getBonusForId.bind(research);
    jest.spyOn(research, 'getBonusForId').mockImplementation((index, mode = 0) => {
        if (index === 31 && mode === 1) return 2;
        if (index === 31 && mode === 2) return 5;
        return readGridBonus(index, mode);
    });

    const masterySources = [
        ...research.sources.inputs.additiveExp,
        ...research.sources.inputs.expMultipliers,
        ...research.sources.minimumRoll,
        ...research.sources.inputs.maximumRoll,
        ...research.sources.points,
    ].filter(source => source.source.startsWith('Rift Skill Mastery:'));
    const prepare = () => {
        for (const source of masterySources) (source as typeof research.sources.failedRoll).update();
        research.sources.prepare();
    };
    return { research, mastery, prepare };
}

describe('Research Skill Mastery calculations', () => {
    it.each([
        { totalLevel: 149, active: true, existingPercent: 50, expected: 1.5 },
        { totalLevel: 150, active: true, existingPercent: 50, expected: 1.6 },
        { totalLevel: 400, active: true, existingPercent: 50, expected: 1.75 },
        { totalLevel: 750, active: true, existingPercent: 50, expected: 1.925 },
        { totalLevel: 1000, active: true, existingPercent: 0, expected: 1.375 },
        { totalLevel: 1000, active: false, existingPercent: 50, expected: 1.5 },
    ])('keeps additive EXP bonuses separate from EXP multipliers at total $totalLevel, active $active', ({
        totalLevel, active, existingPercent, expected,
    }) => {
        const { research, prepare } = createResearch(totalLevel, active);
        research.sources.inputs.additiveExp.push({
            source: 'Existing additive EXP', inputValue: existingPercent, value: existingPercent, operation: 'addPercent',
        });
        prepare();
        expect(research.production.expMultiplier).toBeCloseTo(expected, 12);
    });

    it.each([
        { totalLevel: 199, active: true, failures: 0, minimum: 1 },
        { totalLevel: 200, active: true, failures: 0, minimum: 2 },
        { totalLevel: 200, active: true, failures: 1, minimum: 4 },
        { totalLevel: 200, active: true, failures: 20, minimum: 7 },
        { totalLevel: 200, active: false, failures: 20, minimum: 6 },
    ])('adds minimum-roll mastery outside the failed-roll cap with $failures failures, active $active', ({
        totalLevel, active, failures, minimum,
    }) => {
        const { research, prepare } = createResearch(totalLevel, active, failures);
        prepare();
        expect(research.discoveryAllowance.minimumRoll).toBe(minimum);
        expect(research.discoveryAllowance.currentFailedRollBonus).toBe(Math.min(failures * 2, 5));
        expect(research.discoveryAllowance.failedRollBonusCap).toBe(5);
    });

    it.each([
        { totalLevel: 299, active: true, earned: 0 },
        { totalLevel: 300, active: true, earned: 1 },
        { totalLevel: 499, active: true, earned: 1 },
        { totalLevel: 500, active: true, earned: 2 },
        { totalLevel: 1000, active: false, earned: 0 },
    ])('adds earned Points without changing spending at total $totalLevel, active $active', ({ totalLevel, active, earned }) => {
        const { research, prepare } = createResearch(totalLevel, active);
        Object.assign(research, { purchasedLevels: [1, 2] });
        research.sources.points.push({ source: 'Other Points', inputValue: 0.8, value: 0.8, operation: 'add' });
        prepare();
        expect(research.points.earned).toBe(earned);
        expect(research.points.spent).toBe(3);
        expect(research.points.available).toBe(earned - 3);
    });

    it.each([
        { totalLevel: 999, active: true, maximum: 100 },
        { totalLevel: 1000, active: true, maximum: 101 },
        { totalLevel: 1000, active: false, maximum: 100 },
    ])('changes maximum roll, not daily attempts, at total $totalLevel, active $active', ({ totalLevel, active, maximum }) => {
        const { research, prepare } = createResearch(totalLevel, active);
        prepare();
        expect(research.discoveryAllowance.maximumRoll).toBe(maximum);
        expect(research.discoveryAllowance.dailyAllocation).toBe(3);
    });

    it('replaces mastery contributions when fresh-instance inputs change or preparation repeats', () => {
        const { research, mastery, prepare } = createResearch(1000);
        prepare();
        prepare();
        expect(research.production.expMultiplier).toBeCloseTo(1.375, 12);
        expect(research.points.earned).toBe(2);
        expect(research.discoveryAllowance.minimumRoll).toBe(2);
        expect(research.discoveryAllowance.maximumRoll).toBe(101);

        mastery.skillLevels[SkillsIndex.Research] = 0;
        prepare();
        expect(research.production.expMultiplier).toBe(1);
        expect(research.points.earned).toBe(0);
        expect(research.discoveryAllowance.minimumRoll).toBe(1);
        expect(research.discoveryAllowance.maximumRoll).toBe(100);
    });
});

it('keeps account mastery total separate from highest Research progression in the selected save', () => {
    const save = loadTestSave('latest');
    const names = save.get('playerNames') as string[];
    const levels = names.map((_, index) => Number((save.get(`Lv0_${index}`) as number[])[SkillsIndex.Research]) || 0);
    const account = loadGameDataFromSave('latest');
    const mastery = (account.get('rift') as Rift).bonuses.find(bonus => bonus.name === SkillMastery.displayName) as SkillMastery;
    expect(mastery.skillLevels[SkillsIndex.Research]).toBe(levels.reduce((total, level) => total + level, 0));
    expect((account.get('research') as ResearchGrid).progress.highestLevel).toBe(Math.max(0, ...levels));
});
