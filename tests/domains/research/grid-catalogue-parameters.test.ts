import { Companion, getCompanionActiveBonus, getCompanionBonus, isCompanionLevelTwo } from '../../../data/domain/companions';
import { EventShop } from '../../../data/domain/eventShop';
import { Equinox } from '../../../data/domain/world-3/equinox';
import { Cooking } from '../../../data/domain/world-4/cooking';
import { Rift } from '../../../data/domain/world-4/rift';
import { Gaming } from '../../../data/domain/world-5/gaming';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { Glimbo } from '../../../data/domain/world-7/glimbo';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { DivineDesignResearchGridBonus, ObservationLevelResearchGridBonus, OccurrenceCountResearchGridBonus, ResearchGrid } from '../../../data/domain/world-7/research';
import { Spelunking } from '../../../data/domain/world-7/spelunking';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { OriginalBoatQualification, OriginalGridInputs, OriginalGridUpgrade, assertPairing, extracted, numeric, resultName } from './grid-catalogue-test-helpers';

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
    {
        description: 'existing numerical King Doot input for shared Grid effects', extractionKey: 'companion_0',
        domainExtractor: data => getCompanionBonus(data.get('companions') as Companion[], 0),
    },
    {
        description: 'active King Doot condition for Divine Design text', extractionKey: 'companion_0',
        domainExtractor: data => getCompanionActiveBonus(data.get('companions') as Companion[], 0),
    },
    ...[55, 153, 54].map(index => ({
        description: `active companion ${index} reward for Grid effects, Points, or Shapes`, extractionKey: `companion_${index}`,
        domainExtractor: (data: Map<string, any>) => getCompanionActiveBonus(data.get('companions') as Companion[], index),
    })),
    {
        description: 'level-two companion gate for five additional Points', extractionKey: 'companion_level_two_153',
        domainExtractor: data => Number(isCompanionLevelTwo(data.get('companions') as Companion[], 153)),
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
    ...[6, 7].map(index => ({
        description: `Spelunking Lore ${index} condition for Sigils or Shapes`, extractionKey: `lore_${index}`,
        domainExtractor: (data: Map<string, any>) => Number((data.get('spelunking') as Spelunking).tunnels.find(tunnel => tunnel.index === index)!.loreCompleted),
    })),
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
    {
        description: 'rotation gate used by Shape presentation', extractionKey: 'rotation_unlocked',
        domainExtractor: data => Number((data.get('research') as ResearchGrid).shapeOwnership.rotationUnlocked),
    },
    {
        description: 'event-shop Shape ownership contribution', extractionKey: 'event_shape',
        domainExtractor: data => Number((data.get('eventShop') as EventShop).isBonusOwned(36)),
    },
];

describe('Research Grid catalogue direct parameters', () => {
    let results: ExtractionResults;
    let data: Map<string, any>;
    let research: ResearchGrid;

    beforeAll(() => {
        results = loadExtractionResults(resultName);
        assertPairing(results);
        data = loadGameDataFromSave('latest');
        research = data.get('research') as ResearchGrid;
    });

    parameters.forEach(spec => {
        it(`matches ${spec.description}`, () => {
            expect(spec.domainExtractor(data)).toMatchLiveGame(numeric(results, spec.extractionKey), 0);
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
        expect(summary.totalBoatCount).toBe(original.length);
    });


});
