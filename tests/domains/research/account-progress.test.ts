import { ResearchGrid, updateResearchDisplay } from '../../../data/domain/world-7/research';
import { initResearchObservationRepo } from '../../../data/domain/data/ResearchObservationRepo';
import { initResearchPostyNoteRepo } from '../../../data/domain/data/ResearchPostyNoteRepo';
import { initGamingSuperbitsRepo } from '../../../data/domain/data/GamingSuperbitsRepo';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Player } from '../../../data/domain/player';
import { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import { Spelunking } from '../../../data/domain/world-7/spelunking';
import { Minehead } from '../../../data/domain/world-7/minehead';
import { Hole } from '../../../data/domain/world-5/hole/hole';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults } from '../../utils/live-game-data-loader';

const observations = initResearchObservationRepo();
const notes = initResearchPostyNoteRepo();
const save = loadTestSave('latest');
const rawResearch = save.get('Research');
const savedResearch = (typeof rawResearch === 'string' ? JSON.parse(rawResearch) : rawResearch) as number[][];
const rawTimeAway = save.get('TimeAway');
const savedTimeAway = typeof rawTimeAway === 'string' ? JSON.parse(rawTimeAway) : rawTimeAway;

// Startup /cloud-save matched all 799 retained keys after JSON decoding.
// Runtime EXP and partial Insight advanced. Saved progress must use the original input.
// Reached and upcoming milestones, reserved lens slots, no support, and multiple support are observed.
// Owned unplaced lenses, exhausted attempts, impossible rolls, row-edge Kaleidoscopes, ownership caps, and nonzero pending time are not observed.
describe('Research account progress and production', () => {
    let results: ExtractionResults;
    let gameData: Map<string, any>;
    let research: ResearchGrid;

    beforeAll(() => {
        results = loadExtractionResults('research-account-progress-data.json');
        gameData = loadGameDataFromSave('latest');
        research = gameData.get('research') as ResearchGrid;
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


    it('matches eligible Observations, discoveries, and total Insight levels', () => {
        expect(research.observations).toHaveLength(43);
        expect(research.progress.eligibleObservationCount).toMatchLiveGameWithDetails(value('eligible_count'), {tolerance: 0});
        expect(research.progress.discoveries).toMatchLiveGameWithDetails(value('discoveries'), {tolerance: 0});
        expect(research.progress.totalObservationLevels).toMatchLiveGameWithDetails(value('observation_levels'), {tolerance: 0});
    });

    it('separates remaining attempts, daily allocation, inclusive rolls, and the shared failed-roll counter', () => {
        const original = extracted<{attempts: number}>('research_state');
        const reference = extracted<{failedRolls: number}>('reference_state');
        expect(research.discoveryAllowance.remainingAttempts).toBe(original.attempts);
        expect(research.discoveryAllowance.dailyAllocation).toMatchLiveGameWithDetails(value('daily_attempts'), {tolerance: 0});
        expect(research.discoveryAllowance.minimumRoll).toMatchLiveGameWithDetails(value('minimum_roll'), {tolerance: 0});
        expect(research.discoveryAllowance.maximumRoll).toMatchLiveGameWithDetails(value('maximum_roll'), {tolerance: 0});
        expect(research.discoveryAllowance.inclusiveRollBounds).toBe(true);
        expect(research.discoveryAllowance.failedRollCount).toBe(reference.failedRolls);
        expect(research.discoveryAllowance.failedRollBonusCap).toMatchLiveGameWithDetails(value('grid_31_2'), {tolerance: 0});
        expect(research.discoveryAllowance.currentFailedRollBonus).toMatchLiveGameWithDetails(value('minimum_roll') - research.metadata.baseDiscoveryMinRoll, {tolerance: 0});
    });


    it('matches total lens ownership, fixed-kind counts, and per-Observation capacity', () => {
        expect(research.lensOwnership.total).toMatchLiveGameWithDetails(value('owned_lenses'), {tolerance: 0});
        expect(research.lensOwnership.opticalMonocles).toMatchLiveGameWithDetails(value('owned_monocles'), {tolerance: 0});
        expect(research.lensOwnership.kaleidoscopes).toMatchLiveGameWithDetails(value('owned_kaleidoscopes'), {tolerance: 0});
        expect(research.lensOwnership.magnifyingGlasses).toMatchLiveGameWithDetails(value('owned_lenses') - value('owned_monocles') - value('owned_kaleidoscopes'), {tolerance: 0});
        expect(research.lensOwnership.capacityPerObservation).toMatchLiveGameWithDetails(value('lens_capacity'), {tolerance: 0});
        expect(research.lensOwnership.contributors.reduce((sum, source) => sum + source.value, 0)).toBe(research.lensOwnership.uncappedTotal);
        expect(research.lensOwnership.total).toBe(Math.min(research.lensOwnership.cap, research.lensOwnership.uncappedTotal));
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

    // These caps and conversions come from the original Research EXP additive group.
    const additiveSources: [string, string, number, number][] = [
        ['Farming sticker', 'farming_sticker', 1, Infinity],
        ['Cooking meals', 'cooking_research', 1, Infinity],
        ['Dancing Coral', 'coral_research', 1, Infinity],
        ['Crop Scientist', 'crop_scientist', 1, Infinity],
        ['Points and EXP Grid reward', 'grid_50_0', 1, Infinity],
        ['Discovery allowance Grid reward', 'grid_90_0', 1, Infinity],
        ['Advanced Research EXP Grid reward', 'grid_110_0', 1, Infinity],
        ['Discovered Observation Grid reward', 'grid_112_2', 1, Infinity],
        ['Zenith Market', 'zenith_research', 1, Infinity],
        ['Gaming Worship reward', 'gaming_research', 1, Infinity],
        ['Sailing Slab reward', 'sailing_research', 1, Infinity],
        ['Spelunking epilogue', 'epilogue_research', 1, Infinity],
        ['First owned EXP card', 'card_w7b1', 1, 10],
        ['Second owned EXP card', 'card_w7b4', 2, 15],
        ['Arcade', 'arcade_research', 1, Infinity],
        ['Prehistoric set', 'prehistoric_raw', 1, 50],
        ['Total Observation Insight levels', 'grid_94_2', 1, Infinity],
        ['Smart Eye EXP reward', 'grid_31_0', 1, Infinity],
        ['Maximum roll EXP reward', 'grid_51_0', 1, Infinity],
        ['Third owned EXP card', 'card_w7a11', 1, 10],
        ['Fourth owned EXP card', 'card_w7b8', 3, 20],
        ['Spelunking shop', 'spelunking_shop', 1, Infinity],
    ];
    additiveSources.forEach(([name, key, scale, cap], index) => {
        it('matches the ' + name + ' additive EXP contribution in its source unit', () => {
            const contributor = research.production.additiveExpContributors[index];
            const originalInput = scale * value(key);
            expect(contributor.inputValue).toMatchLiveGameWithDetails(originalInput, {tolerance: 0, context: name});
            expect(contributor.value).toMatchLiveGameWithDetails(Math.min(cap, originalInput), {tolerance: 0, context: name});
            expect(contributor.operation).toBe('addPercent');
        });
    });





    const separateSources: [string, () => number][] = [
        ['Research Grid', () => 1 + value('grid_70_0') / 100],
        ['Equinox', () => 1 + value('equinox_research') / 100],
        ['The Button', () => 1 + value('button_research') / 100],
        ['Killroy', () => 1 + value('killroy_research') / 100],
        ['Companions', () => Math.max(1, (1 + value('companion_52'))
            * (1 + value('companion_153') + value('companion_level_two_153'))
            * (1 + 0.15 * value('companion_level_two_54')))],
        ['Sushi', () => 1 + value('sushi_0') / 100],
        ['Hole Researchy', () => 1 + value('hole_upgrade') / 100],
        ['Hole Fountain', () => 1 + value('hole_fountain') / 100],
        ['First Jelly reward', () => 1 + value('jelly_0') / 100],
        ['Second Jelly reward', () => 1 + value('jelly_23') / 100],
        ['Third Jelly reward', () => 1 + value('jelly_46') / 100],
        ['Fourth Jelly reward', () => 1 + value('jelly_54') / 100],
        ['Selected Royal Outpost', () => Math.max(1, value('outpost_research'))],
    ];




    it('matches eligible EXP subtotal and actual total hourly Insight', () => {
        expect(research.production.expBeforeSharedMultiplierPerHour).toMatchLiveGameWithDetails(value('exp_subtotal'), {tolerance: 0});
        const totalInsight = extracted<number[]>('observation_insight_rates').slice(0, value('eligible_count')).reduce((sum, rate) => sum + rate, 0);
        expect(research.production.insightAccrualPerHour).toMatchLiveGameWithDetails(totalInsight, {tolerance: 0});
        expect(research.production.kaleidoscopeBoostPercent).toMatchLiveGameWithDetails(100 * value('kaleidoscope_base'), {tolerance: 0});
        expect(research.production.totalInsightExpBonusPercent).toMatchLiveGameWithDetails(value('grid_94_2'), {tolerance: 0});
    });

    it('matches the shared EXP multiplier, final hourly EXP, and total game-displayed Insight', () => {
        expect(research.production.expMultiplier).toMatchLiveGameWithDetails(value('exp_multiplier'), {tolerance: 0});
        expect(research.production.expPerHour).toMatchLiveGameWithDetails(value('exp_total'), {tolerance: 0});
        const totalInsight = extracted<number[]>('observation_insight_rates').slice(0, value('eligible_count')).reduce((sum, rate) => sum + rate, 0);
        expect(research.production.gameDisplayedInsightPerHour).toMatchLiveGameWithDetails(totalInsight * value('exp_multiplier'), {tolerance: 0});
        expect(research.production.insightDisplayDiscrepancy).toContain('Actual Insight accrual does not use that multiplier');
    });

    it('matches every offline percentage-point contributor before the floor and cap', () => {
        const expected = extracted<number[]>('offline_contributions');
        expect(research.offlineGains.contributors).toHaveLength(expected.length);
        research.offlineGains.contributors.forEach((contributor, index) => {
            expect(contributor.value).toMatchLiveGameWithDetails(expected[index], {tolerance: 0, context: contributor.source});
            expect(contributor.operation).toBe('addPercent');
        });
        expect(research.offlineGains.contributors[6].inputValue).toMatchLiveGameWithDetails(Math.round(value('artifact_status')), {tolerance: 0});
        expect(research.offlineGains.contributors[6].cap).toBe(6);
        expect(research.offlineGains.contributors[7].inputValue).toMatchLiveGameWithDetails(value('card_w7b11'), {tolerance: 0});
        expect(research.offlineGains.contributors[7].cap).toBe(10);
        expect(research.offlineGains.unclampedPercent).toMatchLiveGameWithDetails(1 + expected.reduce((sum, bonus) => sum + bonus, 0), {tolerance: 0});
        expect(research.offlineGains.percent).toMatchLiveGameWithDetails(value('offline_percent'), {tolerance: 0});
        expect(research.offlineGains.fraction).toMatchLiveGameWithDetails(value('offline_percent') / 100, {tolerance: 0});
        expect(research.offlineGains.baselinePercent).toBe(1);
        expect(research.offlineGains.floorPercent).toBe(1);
        expect(research.offlineGains.capPercent).toBe(100);
        expect(research.offlineGains.onlinePercent).toBe(100);
    });






});
