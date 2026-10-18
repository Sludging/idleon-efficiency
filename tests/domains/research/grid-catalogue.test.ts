import { initResearchGridBonusRepo } from '../../../data/domain/data/ResearchGridBonusRepo';
import { initResearchShapeRepo } from '../../../data/domain/data/ResearchShapeRepo';
import { Cooking } from '../../../data/domain/world-4/cooking';
import { Rift } from '../../../data/domain/world-4/rift';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { Spelunking } from '../../../data/domain/world-7/spelunking';
import { Companion } from '../../../data/domain/companions';
import { ResearchGrid, updateResearchDisplay, updateResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults } from '../../utils/live-game-data-loader';
import {
    OriginalBoatQualification, OriginalGridInputs, OriginalGridUpgrade, OriginalShapeDefinitions,
    assertPairing, catalogueSnapshot, extracted, normalizeGameText, numeric, resultName, saveHash, savedResearch,
} from './grid-catalogue-test-helpers';

const realDefinitions = initResearchGridBonusRepo().filter(square => square.data.name !== 'Name');
const shapeDefinitions = initResearchShapeRepo();
const dootSentence = 'Arctis_nods_in_approval..._all_Research_Grid_bonuses_are_1.05x_higher';
const arctisSentence = 'You_are_now_permanently_linked_to_Arctis_on_all_characters.';

// The retained save observes zero available Points, capped/uncapped ranks, all specialized effects, and five owned Shapes.
// It does not observe row-edge purchases, missing placements, nonzero rotations, qualifying boats, or non-Doot text.
// Existing Grid suites retain generic numerical API regressions. These comparisons cover the complete new public catalogue.
describe('Research Grid catalogue, Points, linked grants, and Shapes', () => {
    let results: ExtractionResults;
    let data: Map<string, any>;
    let research: ResearchGrid;
    let original: OriginalGridUpgrade[];
    let inputs: OriginalGridInputs;

    beforeAll(() => {
        results = loadExtractionResults(resultName);
        assertPairing(results);
        data = loadGameDataFromSave('latest');
        research = data.get('research') as ResearchGrid;
        original = extracted<OriginalGridUpgrade[]>(results, 'catalogue');
        inputs = extracted<OriginalGridInputs>(results, 'pairing_before');
    });

    realDefinitions.forEach(definition => {
        it(`matches ${definition.data.name} primary/secondary effects and independent purchase state`, () => {
            const upgrade = research.bonuses[definition.index];
            const expected = original.find(square => square.index === definition.index)!;
            expect(upgrade.primaryBonus).toMatchLiveGameWithDetails(expected.primary, {
                tolerance: 0, context: `${upgrade.data.name} primary effect`,
                debugInfo: { level: upgrade.level, owner: upgrade.activeOwner, shape: upgrade.shapeMultiplier, shared: upgrade.allBonusMultiplier },
            });
            expect(upgrade.secondaryBonus).toMatchLiveGameWithDetails(expected.secondary, {
                tolerance: 0, context: `${upgrade.data.name} secondary effect`,
            });
            // The original description caller converts percentage-point effects to multipliers.
            expect(upgrade.primaryMultiplier).toMatchLiveGameWithDetails(1 + expected.primary / 100, { tolerance: 0 });
            expect(upgrade.secondaryMultiplier).toMatchLiveGameWithDetails(1 + expected.secondary / 100, { tolerance: 0 });
            expect(upgrade.level).toBe(inputs.levels[upgrade.index]);
            expect(upgrade.getLevel()).toBe(expected.level);
            expect(upgrade.maxLevel).toBe(expected.cap);
            expect(upgrade.atCap).toBe(expected.level >= expected.cap);
            expect(upgrade.reachable).toBe(expected.reachable === 1);
            expect(upgrade.affordable).toBe(numeric(results, 'points_available') > 0);
            expect(Number(!upgrade.atCap && upgrade.affordable)).toBe(expected.canUpgrade);
            expect(upgrade.allBonusMultiplier).toMatchLiveGameWithDetails(numeric(results, 'grid_shared_multiplier'), { tolerance: 0 });
        });
    });

    it('matches earned, running-rounded spent, and available Points without clamping', () => {
        expect(research.points.earned).toMatchLiveGameWithDetails(numeric(results, 'points_earned'), { tolerance: 0, debugInfo: research.points.contributors });
        expect(research.points.spent).toMatchLiveGameWithDetails(numeric(results, 'points_spent'), { tolerance: 0 });
        expect(research.points.available).toMatchLiveGameWithDetails(numeric(results, 'points_available'), { tolerance: 0 });
        expect(research.points.milestone).toBe(research.pointMilestone);
        expect(research.points.milestone.cumulativeMilestonePoints).toMatchLiveGameWithDetails(numeric(results, 'point_milestone'), { tolerance: 0 });
        const contributions = extracted<number[]>(results, 'point_contributions');
        expect(research.points.contributors).toHaveLength(contributions.length);
        research.points.contributors.forEach((contributor, index) => {
            expect(contributor.value).toMatchLiveGameWithDetails(contributions[index], { tolerance: 0, context: contributor.source });
        });
        expect(research.points.contributors[5]).toMatchObject({ inputValue: inputs.artifactStatus, cap: 10 });
        expect(research.points.contributors[6].value).toBe(inputs.researchMerit);
        expect(research.pointMilestone).toMatchObject({ reachedTenLevelBlocks: 7, pointsPerTenLevelBlock: 3, purchasedGrid50Level: 1, level60Reached: true });
        expect(research.points).toMatchObject({ earned: 115, spent: 115, available: 0 });
        // Real ranks are integers. This checks the original result, not unobserved fractional or negative rounding boundaries.
        expect(inputs.levels.every(level => Number.isInteger(Number(level)) && Number(level) >= 0)).toBe(true);
    });







});
