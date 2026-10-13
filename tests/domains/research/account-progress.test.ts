import { ResearchGrid, updateResearchDisplay } from '../../../data/domain/world-7/research';
import { initResearchObservationRepo } from '../../../data/domain/data/ResearchObservationRepo';
import { initResearchPostyNoteRepo } from '../../../data/domain/data/ResearchPostyNoteRepo';
import { initGamingSuperbitsRepo } from '../../../data/domain/data/GamingSuperbitsRepo';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Player } from '../../../data/domain/player';
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

    it('preserves the highest saved level and its provenance-labeled same-character EXP requirement', () => {
        const levels = (save.get('playerNames') as string[]).map((_, id) => Number(save.get('Lv0_' + id)[SkillsIndex.Research]));
        const highestLevel = Math.max(...levels);
        const referenceID = levels.indexOf(highestLevel);
        expect(research.progress.highestLevel).toBe(highestLevel);
        expect(research.progress.savedExpCopy!.characterID).toBe(referenceID);
        expect(research.progress.savedExpCopy!.characterName).toBe((save.get('playerNames') as string[])[referenceID]);
        expect(research.progress.savedExpCopy!.level).toBe(levels[referenceID]);
        expect(research.progress.savedExpCopy!.currentXP).toBe(Number(save.get('Exp0_' + referenceID)[SkillsIndex.Research]));
        expect(research.progress.savedExpCopy!.xpReq).toBe(Number(save.get('ExpReq0_' + referenceID)[SkillsIndex.Research]));
        expect(research.progress.savedExpCopy!.provenance).toContain('not account-authoritative EXP');
        expect(research.progress.saveGlobalTime).toBe(Number(savedTimeAway.GlobalTime));
        const original = extracted<{level: number; requirement: number; name: string}>('reference_state');
        expect(research.progress.savedExpCopy!.level).toBe(original.level);
        expect(research.progress.savedExpCopy!.xpReq).toBe(Number(original.requirement));
        expect(research.progress.savedExpCopy!.characterName).toBe(original.name);
    });

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

    it('exposes only owned lenses with their original kinds, positions, and placed targets', () => {
        const original = extracted<{lenses: number[]}>('research_state').lenses;
        const ownedCount = value('owned_lenses');
        // Original allocation and drawing callers use the ownership prefix, not all saved slots.
        const originalOwned = original.slice(0, 4 * ownedCount);
        const kinds = ['magnifyingGlass', 'opticalMonocle', 'kaleidoscope'];
        expect(ownedCount).toBe(14);
        expect(originalOwned).toEqual(savedResearch[5].slice(0, 4 * ownedCount));
        expect(original.length).toBeGreaterThan(originalOwned.length);
        expect(research.lenses).toHaveLength(ownedCount);
        research.lenses.forEach((lens, index) => {
            expect(lens.index).toBe(index);
            expect(lens.index).toBeLessThan(ownedCount);
            expect(lens.kind).toBe(kinds[originalOwned[4 * index + 3]]);
            expect(lens.x).toBe(originalOwned[4 * index]);
            expect(lens.y).toBe(originalOwned[4 * index + 1]);
            const target = originalOwned[4 * index + 2];
            expect(target).not.toBe(-1);
            expect(lens.targetObservationIndex).toBe(target);
            expect(lens.placed).toBe(true);
        });
        expect(research.lenses.filter(lens => lens.kind === 'magnifyingGlass')).toHaveLength(ownedCount - value('owned_monocles') - value('owned_kaleidoscopes'));
        expect(research.lenses.filter(lens => lens.kind === 'opticalMonocle')).toHaveLength(value('owned_monocles'));
        expect(research.lenses.filter(lens => lens.kind === 'kaleidoscope')).toHaveLength(value('owned_kaleidoscopes'));
        expect(research.lensOwnership.unplacedLensCount).toBe(0);
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
        it('preserves ' + data.name + ' discovery conditions and saved partial Insight without pending progress', () => {
            const observation = research.observations[index];
            const original = extracted<{found: number[]; levels: number[]; attempts: number}>('research_state');
            expect(observation.found).toBe(original.found[index] >= 1);
            expect(observation.insightLevel).toBe(original.levels[index]);
            expect(observation.insightExperience).toBe(savedResearch[3][index]);
            expect(observation.discoveryConditions).toEqual({
                unmetResearchLevel: research.progress.highestLevel < data.requiredResearchLevel,
                alreadyDiscovered: original.found[index] >= 1,
                exhaustedAttempts: original.attempts <= 0,
                insufficientMaximumRoll: value('maximum_roll') < data.discoveryRollRequirement,
            });
            expect(observation.eligibleForProduction).toBe(index < value('eligible_count'));
            expect(observation.map.data.map.id).toBe(data.mapId);
        });

        it('matches ' + data.name + ' next Insight requirement, local effect, and actual Kaleidoscope support', () => {
            const observation = research.observations[index];
            expect(observation.nextInsightRequirement).toMatchLiveGameWithDetails(extracted<number[]>('observation_requirements')[index], {tolerance: 0, context: data.name});
            expect(observation.localInsightExpBonusPercent).toMatchLiveGameWithDetails(value('grid_93_0') * savedResearch[4][index], {tolerance: 0, context: data.name});
            expect(observation.kaleidoscopeMultiplier).toMatchLiveGameWithDetails(extracted<number[]>('observation_support')[index], {tolerance: 0, context: data.name});
            const originalLenses = extracted<{lenses: number[]}>('research_state').lenses;
            const ownedIndexes = Array.from({length: value('owned_lenses')}, (_, lensIndex) => lensIndex);
            expect(observation.assignedLenses.map(lens => lens.index)).toEqual(ownedIndexes.filter(lensIndex => originalLenses[4 * lensIndex + 2] === index));
            // Original support uses orthogonal neighbors on an eight-column board.
            const supportingIndexes = ownedIndexes.filter(lensIndex => {
                const target = originalLenses[4 * lensIndex + 2];
                return originalLenses[4 * lensIndex + 3] === 2 && target >= 0
                    && ((target % 8 !== 7 && index === target + 1)
                        || (target % 8 !== 0 && index === target - 1)
                        || (target > 7 && index === target - 8)
                        || (target < 72 && index === target + 8));
            });
            expect(observation.supportingKaleidoscopes.map(lens => lens.index)).toEqual(supportingIndexes);
            expect(observation.supportingKaleidoscopes.length).toMatchLiveGameWithDetails((extracted<number[]>('observation_support')[index] - 1) / value('kaleidoscope_base'), {tolerance: 0});
            expect(observation.supportingKaleidoscopes.every(lens => lens.kind === 'kaleidoscope' && lens.placed)).toBe(true);
        });

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

    it('uses readable generated producer names and activation gates for EXP contributors', () => {
        const superbits = initGamingSuperbitsRepo();
        const gamingName = superbits.find(superbit => superbit.data.superbitId === 44)!.data.name;
        const sailingName = superbits.find(superbit => superbit.data.superbitId === 34)!.data.name;
        const contributors = research.production.additiveExpContributors;

        expect(contributors.find(contributor => contributor.source === `Gaming: ${gamingName}`)).toMatchObject({
            source: `Gaming: ${gamingName}`,
            gate: `Purchased ${gamingName} Superbit and total Worship best waves`,
        });
        expect(contributors.find(contributor => contributor.source === `Sailing: ${sailingName}`)).toMatchObject({
            source: `Sailing: ${sailingName}`,
            gate: `Purchased ${sailingName} Superbit`,
        });
        expect(contributors.find(contributor => contributor.source === 'Equipment set: Prehistoric set')).toMatchObject({
            source: 'Equipment set: Prehistoric set',
            gate: "Permanent activation or reference character's equipped set",
        });

        const contributorText = contributors.map(contributor => `${contributor.source} ${contributor.gate}`).join('\n');
        expect(contributorText).not.toContain('Superbit 44');
        expect(contributorText).not.toContain('Superbit 34');
        expect(contributorText).not.toContain('PREHISTORIC_SET');
    });

    it('matches the source additive EXP percentage subtotal before separate multipliers', () => {
        const expected = additiveSources.reduce((sum, [, key, scale, cap]) => sum + Math.min(cap, scale * value(key)), 0);
        expect(research.production.additiveExpPercent).toMatchLiveGameWithDetails(expected, {tolerance: 0});
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
    separateSources.forEach(([name, expected], index) => {
        it('matches the separate ' + name + ' Research EXP factor', () => {
            const contributor = research.production.expMultiplierContributors[index];
            expect(contributor.value).toMatchLiveGameWithDetails(expected(), {tolerance: 0, context: name});
            expect(contributor.operation).toBe('multiply');
        });
    });

    it('retains named companion display factors and their original additive source objects', () => {
        const companions = research.production.expMultiplierContributors.find(contributor => contributor.source === 'Companions')!;
        const groups = companions.companionGroups!;
        expect(groups).toHaveLength(3);
        expect(groups.map(group => group.id).sort()).toEqual(['jellofish', 'neonscale', 'riftStalker']);
        const ownedGate = "Owned companion's active bonus";
        const levelTwoGate = 'Owned at level two. Pet Bonus Tokens do not grant level two.';
        const specs = [
            {id: 'jellofish', name: 'Jellofish', factor: 1.8, terms: [
                {source: 'Companion: Jellofish', key: 'companion_52', scale: 1, gate: ownedGate},
            ]},
            {id: 'riftStalker', name: 'Rift Stalker', factor: 3, terms: [
                {source: 'Companion: Rift Stalker', key: 'companion_153', scale: 1, gate: ownedGate},
                {source: 'Companion: Rift Stalker level two', key: 'companion_level_two_153', scale: 1, gate: levelTwoGate},
            ]},
            {id: 'neonscale', name: 'Neonscale', factor: 1.15, terms: [
                {source: 'Companion: Neonscale level two', key: 'companion_level_two_54', scale: 0.15, gate: levelTwoGate},
            ]},
        ];
        expect(companions.components!.map(component => component.source)).toEqual(specs.flatMap(spec => spec.terms.map(term => term.source)));
        for (const spec of specs) {
            const group = groups.find(group => group.id === spec.id)!;
            expect(group.name).toBe(spec.name);
            expect(group.factor).toBe(spec.factor);
            expect(group.components.map(component => component.source)).toEqual(spec.terms.map(term => term.source));
            for (const term of spec.terms) {
                const component = group.components.find(component => component.source === term.source)!;
                expect(component).toBe(companions.components!.find(component => component.source === term.source));
                expect(component).toMatchObject({operation: 'add', gate: term.gate});
                expect(component.inputValue).toMatchLiveGameWithDetails(term.scale * value(term.key), {tolerance: 0, context: term.source});
                expect(component.value).toMatchLiveGameWithDetails(term.scale * value(term.key), {tolerance: 0, context: term.source});
            }
        }
    });

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

    it('separates consumable Papers from permanent Professional Papers and their offline contribution', () => {
        const count = (orders: string[], quantities: number[]): number => orders.reduce((sum, item, index) => sum + (item === 'Quest115' ? Number(quantities[index]) : 0), 0);
        let expectedInventory = count(save.get('ChestOrder'), save.get('ChestQuantity'));
        (save.get('playerNames') as string[]).forEach((_, id) => {
            expectedInventory += count(save.get('InventoryOrder_' + id), save.get('ItemQTY_' + id));
        });
        expect(research.papers.consumable.count).toBe(expectedInventory);
        expect(research.papers.consumable.item.internalName).toBe('Quest115');
        expect(research.papers.consumable.grantHours).toBe(2);
        expect(research.papers.consumable.includesMineheadCurrency).toBe(true);
        expect(research.papers.permanent.purchase.no).toBe(45);
        expect(research.papers.permanent.purchasedCount).toMatchLiveGameWithDetails(value('paper_purchase'), {tolerance: 0});
        expect(research.papers.permanent.offlinePercent).toMatchLiveGameWithDetails(extracted<number[]>('offline_contributions')[10], {tolerance: 0});
    });

    it('matches current Shape ownership, outside rewards, the ordered prefix, and rotation', () => {
        expect(research.shapeOwnership.count).toMatchLiveGameWithDetails(value('shape_count'), {tolerance: 0});
        expect(research.shapeOwnership.cap).toBe(10);
        expect(research.shapeOwnership.ownedShapes.map(shape => shape.index)).toEqual(Array.from({length: value('shape_count')}, (_, index) => index));
        expect(Number(research.shapeOwnership.rotationUnlocked)).toMatchLiveGameWithDetails(value('rotation_unlocked'), {tolerance: 0});
        expect(research.shapeOwnership.contributors[0].value).toMatchLiveGameWithDetails(value('event_36'), {tolerance: 0});
        expect(research.shapeOwnership.contributors[1].value).toMatchLiveGameWithDetails(Math.min(1, Math.max(0, Math.floor(research.progress.highestLevel / 20) * value('companion_54'))), {tolerance: 0});
        expect(research.shapeOwnership.contributors[2].value).toMatchLiveGameWithDetails(Math.min(1, Math.floor(research.progress.highestLevel / 20) * value('lore_shape')), {tolerance: 0});
    });

    it('matches the cumulative Points-per-ten-level milestone term without exposing Point balances', () => {
        expect(research.pointMilestone.pointsPerTenLevelBlock).toMatchLiveGameWithDetails(value('point_term'), {tolerance: 0});
        expect(research.pointMilestone.purchasedGrid50Level).toMatchLiveGameWithDetails(value('grid_50_1'), {tolerance: 0});
        expect(research.pointMilestone.reachedTenLevelBlocks).toBe(Math.floor(research.progress.highestLevel / 10));
        expect(research.pointMilestone.cumulativeMilestonePoints).toBe(Math.floor(research.progress.highestLevel / 10) * value('point_term'));
        expect(research.pointMilestone.level60Reached).toBe(research.progress.highestLevel >= 60);
    });

    notes.forEach(({index, data}) => {
        it('matches the level ' + data.requiredResearchLevel + ' Posty Note reward and current ownership context', () => {
            const note = research.postyNotes[index];
            expect(note.reached).toBe(index < value('notes_reached'));
            expect(note.upcoming).toBe(index >= value('notes_reached'));
            const context = note.context;
            const expectedKind = [10, 100, 130, 140].includes(data.requiredResearchLevel) ? 'lens'
                : [40, 70, 120].includes(data.requiredResearchLevel) ? 'capacity'
                : [20, 30, 50, 80, 110].includes(data.requiredResearchLevel) ? 'shape'
                : data.requiredResearchLevel === 60 ? 'points' : 'rotation';
            expect(context.kind).toBe(expectedKind);
            switch (context.kind) {
                case 'lens':
                    expect(context.additionalLenses).toBe(1);
                    expect(context.currentTotal).toMatchLiveGameWithDetails(value('owned_lenses'), {tolerance: 0});
                    expect(context.cap).toBe(80);
                    break;
                case 'capacity':
                    expect(context.capacity).toBe([40, 70, 120].indexOf(data.requiredResearchLevel) + 2);
                    expect(context.currentCapacity).toMatchLiveGameWithDetails(value('lens_capacity'), {tolerance: 0});
                    break;
                case 'shape':
                    expect(context.additionalShapes).toBe(1);
                    expect(context.currentOwnership).toBe(research.shapeOwnership);
                    expect(context.canAddOwnedShape).toBe(value('shape_count') < 10);
                    break;
                case 'rotation':
                    expect(context.requiredLevel).toBe(research.metadata.shapeRotationResearchLevel);
                    expect(Number(context.unlocked)).toMatchLiveGameWithDetails(value('rotation_unlocked'), {tolerance: 0});
                    expect(context.stepDegrees).toBe(research.metadata.shapeRotationStepDegrees);
                    break;
                case 'points':
                    expect(context.current).toBe(research.pointMilestone);
                    expect(context.current.pointsPerTenLevelBlock).toMatchLiveGameWithDetails(value('point_term'), {tolerance: 0});
                    break;
            }
        });
    });

    it('replaces late results on repeated processing with the same real producer objects', () => {
        const snapshot = () => JSON.stringify({progress: research.progress, allowance: research.discoveryAllowance, lenses: research.lensOwnership, ownedLenses: research.lenses, observations: research.observations, production: research.production, offline: research.offlineGains, shapes: research.shapeOwnership, notes: research.postyNotes, points: research.pointMilestone, papers: research.papers});
        const before = snapshot();
        updateResearchDisplay(gameData);
        expect(snapshot()).toBe(before);
        expect(research.pendingEffectiveProgressSeconds).toBe(savedResearch[7][3]);
        research.observations.forEach(observation => expect(observation.insightExperience).toBe(savedResearch[3][observation.index]));
        const reference = (gameData.get('players') as Player[]).find(player => player.playerID === research.progress.savedExpCopy!.characterID)!;
        expect(research.progress.savedExpCopy!.currentXP).toBe(reference.skills.get(SkillsIndex.Research)!.currentXP);
        expect(research.postyNotes).toHaveLength(14);
    });
});
