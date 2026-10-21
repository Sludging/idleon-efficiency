import { initResearchGridBonusRepo } from '../../../data/domain/data/ResearchGridBonusRepo';
import { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults } from '../../utils/live-game-data-loader';
import {
    OriginalGridInputs, OriginalGridUpgrade, assertPairing, extracted, numeric, resultName,
} from './grid-catalogue-test-helpers';
const realDefinitions = initResearchGridBonusRepo().filter(square => square.data.name !== 'Name');

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
            expect(upgrade.reachable).toBe(expected.reachable === 1);
            expect(upgrade.allBonusMultiplier).toMatchLiveGameWithDetails(numeric(results, 'grid_shared_multiplier'), { tolerance: 0 });
        });
    });

    it('matches earned, running-rounded spent, and available Points without clamping', () => {
        expect(research.points.earned).toMatchLiveGameWithDetails(numeric(results, 'points_earned'), { tolerance: 0, debugInfo: research.points.contributors });
        expect(research.points.spent).toMatchLiveGameWithDetails(numeric(results, 'points_spent'), { tolerance: 0 });
        expect(research.points.available).toMatchLiveGameWithDetails(numeric(results, 'points_available'), { tolerance: 0 });
        expect(research.points.milestone.cumulativeMilestonePoints).toMatchLiveGameWithDetails(numeric(results, 'point_milestone'), { tolerance: 0 });
    });







});
