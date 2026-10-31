import { Companion } from '../../../data/domain/companions';
import { Equinox } from '../../../data/domain/world-3/equinox';
import { Cooking } from '../../../data/domain/world-4/cooking';
import { Rift } from '../../../data/domain/world-4/rift';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { Glimbo } from '../../../data/domain/world-7/glimbo';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { DivineDesignResearchGridBonus, ObservationLevelResearchGridBonus, OccurrenceCountResearchGridBonus, ResearchGrid } from '../../../data/domain/world-7/research';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { OriginalBoatQualification, OriginalGridUpgrade, extracted, numeric, resultName } from './grid-catalogue-test-helpers';
import { nativeResearchNumber, PreviewExpectations, researchExpected, researchPreviewExpectations } from './preview-expectations';

// All direct calculated inputs stay here, including same-domain inputs used by secondary effects and presentation.
// Static caps, Shape percentages, saved levels/options, artifact status, merit level, and placements are supporting state.
const parameters: ParameterTestSpec[] = [
    ...(['earned', 'spent', 'available'] as const).map(kind => ({
        description: `${kind} Points used by the balance or affordability`, extractionKey: `points_${kind}`,
        domainExtractor: (data: Map<string, any>) => (data.get('research') as ResearchGrid).points[kind],
    })),
    {
        description: 'shared Grid modifier used by every primary effect', extractionKey: 'grid_shared_multiplier',
        domainExtractor: data => (data.get('research') as ResearchGrid).getGridBonusAllmulti(),
    },
    ...[71, 72, 76].map(index => ({
        description: `Equinox challenge ${index} shared Grid contribution`, extractionKey: `cloud_${index}`,
        domainExtractor: (data: Map<string, any>) => (data.get('equinox') as Equinox).getChallengeBonus(index),
    })),
    ...[3, 13, 53].map(index => ({
        description: `Sushi reward ${index} used by Points or shared Grid effects`, extractionKey: `sushi_${index}`,
        domainExtractor: (data: Map<string, any>) => (data.get('sushi') as SushiStation).getBonusFromIndex(index),
    })),
    ...[4, 57].map(index => ({
        description: `Jelly obstruction ${index} Point reward`, extractionKey: `jelly_${index}`,
        domainExtractor: (data: Map<string, any>) => (data.get('jellyOperator') as JellyOperator).obstructions.find(obstruction => obstruction.index === index)!.getBonus(),
    })),
    {
        description: 'cumulative ten-level reward used by earned Points', extractionKey: 'point_milestone',
        domainExtractor: data => (data.get('research') as ResearchGrid).pointMilestone.cumulativeMilestonePoints,
    },
    {
        description: 'revealed total Insight levels used by Game Design 102', extractionKey: 'observation_levels',
        domainExtractor: data => ((data.get('research') as ResearchGrid).bonuses[94] as ObservationLevelResearchGridBonus).totalObservationLevels,
    },
    {
        description: 'discovered Observation count used by See Em All', extractionKey: 'discoveries',
        domainExtractor: data => ((data.get('research') as ResearchGrid).bonuses[112] as OccurrenceCountResearchGridBonus).totalOccurrencesFound,
    },
    {
        description: 'Glimbo total used by complete 100-trade blocks', extractionKey: 'glimbo_trades',
        domainExtractor: data => (data.get('glimbo') as Glimbo).totalTrades,
    },
    {
        description: 'Cooking Mastery predicate used by Masterius Cookerius', extractionKey: 'cooking_mastery',
        domainExtractor: data => Number((data.get('cooking') as Cooking).isCookingMasteryUnlocked(data.get('rift') as Rift, data.get('companions') as Companion[])),
    },
    {
        description: 'conditional Divine Design contribution used by shared Grid effects', extractionKey: 'divine_shared_contribution',
        domainExtractor: data => ((data.get('research') as ResearchGrid).bonuses[173] as DivineDesignResearchGridBonus).getGridBonusAllmultiContribution(),
    },
    {
        description: 'owned Shape prefix used by all ten Shape wrappers', extractionKey: 'shape_count',
        domainExtractor: data => (data.get('research') as ResearchGrid).shapeOwnership.count,
    },
];

describe('Research Grid catalogue direct parameters', () => {
    let results: ExtractionResults;
    let data: Map<string, any>;
    let research: ResearchGrid;
    let preview: PreviewExpectations | undefined;

    beforeAll(() => {
        results = loadExtractionResults(resultName);
        validateExtractionHealth(results);
        data = loadGameDataFromSave('latest');
        research = data.get('research') as ResearchGrid;
        preview = researchPreviewExpectations();
    });

    parameters.forEach(spec => {
        const key = spec.extractionKey;
        const previewKey = key === 'points_earned' || key === 'points_available' || key === 'point_milestone' || key === 'shape_count' ? key : undefined;
        it(`${previewKey ? 'reports website preview or matches native' : 'matches'} ${spec.description}`, () => {
            const expected = previewKey
                ? researchExpected(preview, previewKey, () => nativeResearchNumber(results, previewKey))
                : numeric(results, key);
            expect(spec.domainExtractor(data)).toMatchLiveGame(expected, 0);
        });
    });

    it('matches primary/secondary effects directly consumed by multipliers, descriptions, specialized effects, and linked grants', () => {
        extracted<OriginalGridUpgrade[]>(results, 'catalogue').forEach(original => {
            expect(research.bonuses[original.index].primaryBonus).toMatchLiveGame(original.primary, 0);
            expect(research.bonuses[original.index].secondaryBonus).toMatchLiveGame(original.secondary, 0);
        });
    });

    it('matches the Sailing qualification summary directly consumed by the conditional boat grant', () => {
        const original = extracted<OriginalBoatQualification[]>(results, 'boats');
        const summary = (data.get('sailing') as Sailing).getUndeadBattalionQualification();
        expect(summary.qualifyingBoatCount).toMatchLiveGame(original.filter(boat => boat.qualifies === 1).length, 0);
    });


});
