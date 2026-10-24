import { initResearchObservationRepo } from '../../../data/domain/data/ResearchObservationRepo';
import { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

interface ObservationSubtotal {
    index: number;
    subtotal: number;
}

// The genuine save has no deposited or equipped Research nametag and no active Prehistoric set.
// Native aggregate parity here does not establish positive Gallery or assumed-chip behavior.
// No independent native final per-Observation EXP getter exists; compare subtotals only.
describe('Research account-wide EXP estimate', () => {
    let results: ExtractionResults;
    let research: ResearchGrid;
    let subtotals: ObservationSubtotal[];

    beforeAll(() => {
        results = loadExtractionResults('research-production-data.json');
        validateExtractionHealth(results);
        research = loadGameDataFromSave('latest').get('research') as ResearchGrid;
        subtotals = results.extractions.observation_subtotals.result as ObservationSubtotal[];
    });

    it('matches the shared Research EXP multiplier in the matching zero-nametag context', () => {
        expect(research.production.expMultiplier).toMatchLiveGameWithDetails(getExtractedValue(results, 'exp_multiplier'), {
            tolerance: 0,
            context: 'Account-wide Research EXP multiplier; no Research nametag contribution in this save',
        });
    });

    it('matches final aggregate Research EXP per hour in the matching account context', () => {
        expect(research.production.expPerHour).toMatchLiveGameWithDetails(getExtractedValue(results, 'exp_total'), {
            tolerance: 0,
            context: 'Final aggregate Research EXP per hour across the eligible Observation prefix',
        });
    });

    // Compare every exported Observation, including zero results. Native placeholder rows have no public Observation.
    initResearchObservationRepo().forEach(({ index, data }) => {
        it(`matches ${data.name} EXP before the shared multiplier`, () => {
            const native = subtotals.find(entry => entry.index === index);
            if (!native) {
                throw new Error(`Missing ResearchStuff / ResearchEXPrateObj subtotal for Observation ${index}`);
            }
            expect(research.observations[index].expBeforeSharedMultiplierPerHour).toMatchLiveGameWithDetails(native.subtotal, {
                tolerance: 0,
                context: `${data.name}: native Observation index ${index}; subtotal, not final EXP per hour`,
            });
        });
    });
});
