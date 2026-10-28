import { ResearchGrid } from '../../../data/domain/world-7/research';
import { initResearchObservationRepo } from '../../../data/domain/data/ResearchObservationRepo';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults } from '../../utils/live-game-data-loader';
import { highestSavedResearchLevel, PreviewExpectations, researchExpected, researchPreviewExpectations } from './preview-expectations';

const observations = initResearchObservationRepo();

describe('Research account progress and production', () => {
    let results: ExtractionResults;
    let gameData: Map<string, any>;
    let research: ResearchGrid;
    let preview: PreviewExpectations | undefined;

    beforeAll(() => {
        results = loadExtractionResults('research-account-progress-data.json');
        gameData = loadGameDataFromSave('latest');
        research = gameData.get('research') as ResearchGrid;
        preview = researchPreviewExpectations();
    });

    // Keep missing pairing local to the affected result. Other comparisons remain active.
    const extracted = <T,>(label: string): T => {
        if (results.errors[label]) throw new Error(results.errors[label].error);
        if (!results.extractions[label]) throw new Error('Missing original-game extraction: ' + label);
        return results.extractions[label].result as T;
    };
    const value = (label: string): number => {
        extracted(label);
        return getExtractedValue(results, label);
    };
    it('uses zero Research progress before entry and the highest saved level after entry', () => {
        const highestLevel = highestSavedResearchLevel();
        expect(research.progress.highestLevel).toBe(Math.max(0, highestLevel));
        if (highestLevel <= 0) {
            expect(research.progress.currentXP).toBe(0);
            expect(research.progress.xpReq).toBe(0);
        }
    });



    it('matches eligible Observations, discoveries, and total Insight levels', () => {
        expect(research.progress.eligibleObservationCount).toMatchLiveGameWithDetails(value('eligible_count'), {tolerance: 0});
        expect(research.progress.discoveries).toMatchLiveGameWithDetails(value('discoveries'), {tolerance: 0});
        expect(research.progress.totalObservationLevels).toMatchLiveGameWithDetails(value('observation_levels'), {tolerance: 0});
    });

    it('separates remaining attempts, daily allocation, roll bounds, and shared failed-roll counter', () => {
        const original = extracted<{attempts: number}>('research_state');
        const reference = extracted<{failedRolls: number}>('reference_state');
        expect(research.discoveryAllowance.remainingAttempts).toBe(original.attempts);
        expect(research.discoveryAllowance.dailyAllocation).toMatchLiveGameWithDetails(value('daily_attempts'), {tolerance: 0});
        expect(research.discoveryAllowance.minimumRoll).toMatchLiveGameWithDetails(value('minimum_roll'), {tolerance: 0});
        expect(research.discoveryAllowance.maximumRoll).toMatchLiveGameWithDetails(value('maximum_roll'), {tolerance: 0});
        expect(research.discoveryAllowance.failedRollCount).toBe(reference.failedRolls);
        expect(research.discoveryAllowance.failedRollBonusCap).toMatchLiveGameWithDetails(value('grid_31_2'), {tolerance: 0});
    });


    it('reports website preview lens ownership before entry and matches native ownership after entry', () => {
        const total = researchExpected(preview, 'owned_lenses', () => value('owned_lenses'));
        expect(research.lensOwnership.total).toMatchLiveGameWithDetails(total, {tolerance: 0});
        expect(research.lensOwnership.opticalMonocles).toMatchLiveGameWithDetails(value('owned_monocles'), {tolerance: 0});
        expect(research.lensOwnership.kaleidoscopes).toMatchLiveGameWithDetails(value('owned_kaleidoscopes'), {tolerance: 0});
        expect(research.lensOwnership.magnifyingGlasses).toMatchLiveGameWithDetails(researchExpected(preview, 'magnifying_glasses', () => value('owned_lenses') - value('owned_monocles') - value('owned_kaleidoscopes')), {tolerance: 0});
        expect(research.lensOwnership.capacityPerObservation).toMatchLiveGameWithDetails(researchExpected(preview, 'lens_capacity', () => value('lens_capacity')), {tolerance: 0});
    });









    observations.forEach(({index, data}) => {


        it('matches ' + data.name + ' EXP subtotal and actual hourly Insight accrual', () => {
            const observation = research.observations[index];
            expect(observation.expBeforeSharedMultiplierPerHour).toMatchLiveGameWithDetails(extracted<number[]>('observation_subtotals')[index], {tolerance: 0, context: data.name});
            const eligible = index < value('eligible_count');
            expect(observation.insightAccrualPerHour).toMatchLiveGameWithDetails(eligible ? extracted<number[]>('observation_insight_rates')[index] : 0, {tolerance: 0, context: data.name});
        });

        it('matches ' + data.name + ' final hourly EXP and the distinct game-displayed Insight figure', () => {
            const observation = research.observations[index];
            const eligible = index < value('eligible_count');
            // Original accrual and display callers use different multipliers. Both are hourly figures.
            const multiplier = value('exp_multiplier');
            expect(observation.expPerHour).toMatchLiveGameWithDetails(eligible ? extracted<number[]>('observation_subtotals')[index] * multiplier : 0, {tolerance: 0, context: data.name});
            expect(observation.gameDisplayedInsightPerHour).toMatchLiveGameWithDetails(eligible ? extracted<number[]>('observation_insight_rates')[index] * multiplier : 0, {tolerance: 0, context: data.name});
        });
    });










    it('matches eligible EXP subtotal and Insight production bonuses', () => {
        expect(research.production.expBeforeSharedMultiplierPerHour).toMatchLiveGameWithDetails(value('exp_subtotal'), {tolerance: 0});
        expect(research.production.kaleidoscopeBoostPercent).toMatchLiveGameWithDetails(100 * value('kaleidoscope_base'), {tolerance: 0});
        expect(research.production.totalInsightExpBonusPercent).toMatchLiveGameWithDetails(value('grid_94_2'), {tolerance: 0});
    });

    it('matches shared EXP multiplier and final hourly EXP', () => {
        expect(research.production.expMultiplier).toMatchLiveGameWithDetails(value('exp_multiplier'), {tolerance: 0});
        expect(research.production.expPerHour).toMatchLiveGameWithDetails(value('exp_total'), {tolerance: 0});
    });

    it('matches original offline percentage and fraction', () => {
        expect(research.offlineGains.percent).toMatchLiveGameWithDetails(value('offline_percent'), {tolerance: 0});
        expect(research.offlineGains.fraction).toMatchLiveGameWithDetails(value('offline_percent') / 100, {tolerance: 0});
    });






});
