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

    it('shows the unreached capacity milestone reward without adding capacity or future lens ownership', () => {
        expect(research.progress.highestLevel).toBe(70);
        const note = research.postyNotes.find(note => note.data.requiredResearchLevel === 120)!;
        expect(note.reached).toBe(false);
        expect(note.context).toMatchObject({kind: 'capacity', capacity: 4, currentCapacity: 3});
        const contributor = research.lensOwnership.capacityContributors.find(contributor =>
            contributor.source === 'Posty Note: Research level 120')!;
        expect(contributor).toMatchObject({
            value: 0,
            inputValue: 0,
            operation: 'add',
            reward: {
                value: 1,
                operation: 'add',
                unit: 'lens capacity per Observation',
                basis: 'milestone',
                acquired: false,
                active: false,
                requiredResearchLevel: 120,
            },
        });
        expect(research.lensOwnership.capacityPerObservation).toBe(3);
        const ownedLensMilestones = research.lensOwnership.contributors
            .filter(contributor => contributor.source.startsWith('Posty Note:'));
        expect(ownedLensMilestones.map(contributor => contributor.source)).toEqual(['Posty Note: Research level 10']);
    });

    it('shows the undefeated Brainhead lens reward while its current lens contribution stays zero', () => {
        const minehead = gameData.get('minehead') as Minehead;
        const opponent = minehead.opponents.find(opponent => opponent.index === 20)!;
        expect(opponent.data.name).toBe('Brainhead');
        expect(opponent.defeated).toBe(false);
        expect(opponent.getBaseBonus()).toBe(1);
        expect(opponent.getBonus()).toBe(0);
        const contributor = research.lensOwnership.contributors.find(contributor =>
            contributor.source === 'Minehead: Brainhead')!;
        expect(contributor).toMatchObject({
            value: 0,
            inputValue: 0,
            operation: 'add',
            reward: {
                value: 1,
                operation: 'add',
                unit: 'Magnifying Glasses',
                basis: 'unlock',
                acquired: false,
                active: false,
            },
        });
        expect(contributor.value).toMatchLiveGameWithDetails(value('minehead_20'), {tolerance: 0});
    });

    it('keeps unowned Event Shop unlock rewards visible without adding their current contributions', () => {
        // Retained save has all four Research Event Shop rewards unowned.
        const rewards = [
            {source: 'Event Shop: Kaleidoscope', contributors: research.lensOwnership.contributors, amount: 1, unit: 'Kaleidoscopes'},
            {source: 'Event Shop: Magnifying Glass', contributors: research.lensOwnership.contributors, amount: 1, unit: 'Magnifying Glasses'},
            {source: 'Event Shop: Keen Observations', contributors: research.discoveryAllowance.dailyAllocationContributors, amount: 3, unit: 'attempts/day'},
            {source: 'Event Shop: Shape Obsession', contributors: research.shapeOwnership.contributors, amount: 1, unit: 'Shapes'},
        ];
        for (const reward of rewards) {
            const contributor = reward.contributors.find(contributor => contributor.source === reward.source)!;
            expect(contributor.value).toBe(0);
            expect(contributor.operation).toBe('add');
            expect(contributor.reward).toMatchObject({
                value: reward.amount,
                operation: 'add',
                unit: reward.unit,
                basis: 'unlock',
                acquired: false,
                active: false,
            });
        }
    });

    it('distinguishes a Grid rank count reward from its percentage reward and conditional EXP basis', () => {
        // Retained source evidence: .omp/research/research-observation-ui-evidence.md, Grid examples.
        const kaleidoscopeName = research.bonuses.find(bonus => bonus.index === 72)!.data.name;
        const countReward = research.lensOwnership.contributors.find(contributor => contributor.source === `Research Grid: ${kaleidoscopeName}`)!;
        expect(countReward.value).toBe(4);
        expect(countReward.reward).toMatchObject({
            value: 1,
            operation: 'add',
            unit: 'Kaleidoscopes',
            basis: 'per Grid level',
            acquired: true,
            active: true,
            grid: {level: 4, mode: 1},
        });
        const effectReward = research.production.kaleidoscopeContributors.find(contributor => contributor.source === `Research Grid: ${kaleidoscopeName}`)!;
        expect(effectReward.value).toBe(28.75);
        expect(effectReward.reward).toMatchObject({
            value: 5,
            operation: 'addPercent',
            unit: 'Kaleidoscope effect',
            basis: 'per Grid level',
            acquired: true,
            active: true,
            grid: {level: 4, mode: 0},
        });

        const conditionalRewards = [
            {index: 94, amount: 1, level: 4, current: 1100, count: 176, unit: 'total Insight level'},
            {index: 112, amount: 5, level: 1, current: 172.5, count: 24, unit: 'found Observation'},
        ];
        for (const reward of conditionalRewards) {
            const name = research.bonuses.find(bonus => bonus.index === reward.index)!.data.name;
            const contributor = research.production.additiveExpContributors.find(contributor => contributor.source === `Research Grid: ${name}`)!;
            expect(contributor.value).toBe(reward.current);
            expect(contributor.reward).toMatchObject({
                value: reward.amount,
                operation: 'addPercent',
                unit: 'EXP',
                basis: `per Grid level per ${reward.unit}`,
                acquired: true,
                active: true,
                grid: {level: reward.level, mode: 2, conditionalBasis: {count: reward.count, unit: reward.unit}},
            });
        }
    });

    it('colors saved Insight progress by the next level and darkens the last palette entry', () => {
        // Game 1.22 Research menu drawing, idleon1.22.txt:285213-285236.
        // These real saved levels cover the first fill, last palette entry, and darkening.
        const original = extracted<{levels: number[]}>('research_state');
        const colors = [
            {index: 23, level: 0, color: 'rgb(152, 116, 99)'},
            {index: 0, level: 9, color: 'rgb(118, 104, 121)'},
            {index: 14, level: 10, color: 'rgb(110, 96, 113)'},
            {index: 2, level: 11, color: 'rgb(102, 88, 105)'},
        ];
        for (const expected of colors) {
            const observation = research.observations[expected.index];
            expect(original.levels[expected.index]).toBe(expected.level);
            expect(observation.insightLevel).toBe(expected.level);
            expect(observation.getInsightProgressColor()).toBe(expected.color);
        }
    });

    it('reveals Big Ol Reef before its study requirement without treating that level as a discovery gate', () => {
        // Versioned 1.22 discovery and lens-assignment callers use separate gates.
        // See .omp/research/research-observation-ui-evidence.md, Big Ol Reef evidence.
        const reference = extracted<{level: number}>('reference_state');
        const original = extracted<{found: number[]; attempts: number}>('research_state');
        const reef = research.observations[30];
        expect(reference.level).toBe(70);
        expect(research.progress.highestLevel).toBe(reference.level);
        expect(value('eligible_count')).toBe(34);
        expect(original.found[30]).toBe(0);
        expect(original.attempts).toBe(9);
        expect(reef.revealed).toBe(true);
        expect(research.getObservationRevealRequirement(30)).toEqual({
            researchLevel: 70, requiresFirstDiscovery: false,
        });
        expect(reef.found).toBe(false);
        expect(reef.discoveryConditions).toEqual({
            outsideRevealedPrefix: false,
            alreadyDiscovered: false,
            exhaustedAttempts: false,
            insufficientMaximumRoll: false,
        });
        expect(reef.study).toEqual({
            requiredResearchLevel: 72,
            unmetResearchLevel: true,
            eligible: false,
            state: 'notFound',
        });
        expect(reef.eligibleForProduction).toBe(true);
    });

    it('keeps found study eligibility, undiscovered state, and the unrevealed prefix distinct', () => {
        const original = extracted<{found: number[]}>('research_state');
        expect(original.found[0]).toBe(1);
        expect(research.observations[0].revealed).toBe(true);
        expect(research.observations[0].study).toMatchObject({
            unmetResearchLevel: false,
            eligible: true,
            state: 'eligible',
        });
        expect(original.found[29]).toBe(0);
        expect(research.observations[29].revealed).toBe(true);
        expect(research.observations[29].study).toEqual({
            requiredResearchLevel: 70,
            unmetResearchLevel: false,
            eligible: false,
            state: 'notFound',
        });
        expect(value('eligible_count')).toBe(34);
        expect(research.observations[34].revealed).toBe(false);
        expect(research.observations[34].discoveryConditions.outsideRevealedPrefix).toBe(true);
        expect(research.observations[34].study).toMatchObject({
            eligible: false,
            state: 'notRevealed',
        });
    });

    it('reveals the first Observation at level 1 and does not predict beyond the source-supported prefix', () => {
        expect(research.observations[0].found).toBe(true);
        expect(research.getObservationRevealRequirement(0)).toEqual({
            researchLevel: 1, requiresFirstDiscovery: false,
        });
        expect(research.getObservationRevealRequirement(43)).toBeUndefined();
    });

    // ResearchStuff.1.22.js:10–21 gives prefixes 34, 38, 42, and 43 at levels 70, 80, 90, and 100.
    // Index 38 first enters the prefix at level 90, not 80.
    it.each([
        [34, 80], [35, 80], [36, 80], [37, 80],
        [38, 90], [39, 90], [40, 90], [41, 90],
        [42, 100],
    ])('reveals retained hidden Observation %s at Research level %s after the completed first discovery', (index, researchLevel) => {
        expect(research.progress.highestLevel).toBe(70);
        expect(research.progress.eligibleObservationCount).toBe(34);
        expect(research.observations[index].revealed).toBe(false);
        expect(research.getObservationRevealRequirement(index)).toEqual({
            researchLevel, requiresFirstDiscovery: false,
        });
    });

    observations.forEach(({index, data}) => {
        it('preserves ' + data.name + ' reveal, discovery, study conditions, and saved partial Insight without pending progress', () => {
            const observation = research.observations[index];
            const original = extracted<{found: number[]; levels: number[]; attempts: number}>('research_state');
            const reference = extracted<{level: number}>('reference_state');
            const revealed = index < value('eligible_count');
            const found = original.found[index] >= 1;
            const unmetStudyLevel = reference.level < data.requiredResearchLevel;
            expect(observation.revealed).toBe(revealed);
            expect(observation.study.requiredResearchLevel).toBe(data.requiredResearchLevel);
            expect(observation.study.unmetResearchLevel).toBe(unmetStudyLevel);
            expect(observation.study.eligible).toBe(revealed && found && !unmetStudyLevel);
            expect(observation.found).toBe(original.found[index] >= 1);
            expect(observation.insightLevel).toBe(original.levels[index]);
            expect(observation.insightExperience).toBe(savedResearch[3][index]);
            expect(observation.discoveryConditions).toEqual({
                outsideRevealedPrefix: !revealed,
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

    it('keeps the Prehistoric Research reward separate from permanent acquisition and reference-character activation', () => {
        const sets = gameData.get('equipmentSets') as EquipmentSets;
        const set = sets.equipmentSets.find(set => set.data.name === 'PREHISTORIC_SET')!;
        const contributor = research.production.additiveExpContributors.find(contributor =>
            contributor.source === 'Equipment set: Prehistoric set')!;
        const players = gameData.get('players') as Player[];
        const referencePlayer = players.find(player => player.playerID === contributor.characterID)!;
        expect(set.unlocked).toBe(false);
        expect(set.isActiveFor(referencePlayer)).toBe(false);
        expect(set.getBonus(true)).toBe(100);
        // ResearchStuff.1.22.js:140 caps the raw set reward at 50%, even before permanent acquisition.
        expect(contributor).toMatchObject({
            value: 0,
            inputValue: 0,
            operation: 'addPercent',
            cap: 50,
            reward: {
                value: 50,
                operation: 'addPercent',
                unit: 'EXP',
                acquired: false,
                active: false,
            },
        });
        expect(contributor.value).toMatchLiveGameWithDetails(value('prehistoric_raw'), {tolerance: 0});
    });

    it('shows Paper Hardhat EXP per purchased shop level while its unpurchased effect stays zero', () => {
        const spelunking = gameData.get('spelunking') as Spelunking;
        const upgrade = spelunking.upgrades.find(upgrade => upgrade.index === 63)!;
        expect(upgrade.data.name).toBe('Paper Hardhat');
        expect(upgrade.data.bonusPerLevel).toBe(2);
        expect(upgrade.purchasedLevel).toBe(0);
        expect(upgrade.getBonus()).toBe(0);
        const contributor = research.production.additiveExpContributors.find(contributor =>
            contributor.source === 'Spelunking shop: Paper Hardhat')!;
        expect(contributor).toMatchObject({
            value: 0,
            inputValue: 0,
            operation: 'addPercent',
            reward: {
                value: 2,
                operation: 'addPercent',
                unit: 'EXP',
                basis: 'per shop level',
                acquired: false,
                active: false,
            },
        });
        expect(contributor.value).toMatchLiveGameWithDetails(value('spelunking_shop'), {tolerance: 0});
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

    it('shows Pen N Paper EXP per Fountain level while the unpurchased multiplier stays neutral', () => {
        const hole = gameData.get('hole') as Hole;
        const upgrade = hole.fountain.upgrades.find(upgrade => upgrade.data.waterIndex === 2 && upgrade.data.index === 16)!;
        expect(upgrade.data.name).toBe('Pen N Paper');
        expect(upgrade.data.bonusPerLevel).toBe(1);
        expect(upgrade.level).toBe(0);
        expect(upgrade.getBonus()).toBe(0);
        const contributor = research.production.expMultiplierContributors.find(contributor =>
            contributor.source === 'The Hole Fountain: Pen N Paper')!;
        expect(contributor).toMatchObject({
            value: 1,
            inputValue: 0,
            operation: 'multiply',
            reward: {
                value: 1.01,
                operation: 'multiply',
                unit: 'EXP',
                basis: 'per Fountain level before Marbleization',
                acquired: false,
                active: false,
            },
        });
        expect(contributor.value).toMatchLiveGameWithDetails(1 + value('hole_fountain') / 100, {tolerance: 0});
    });

    it('shows the available Research Outpost selection reward using only currently built Outposts', () => {
        const armory = gameData.get('royalArmory') as RoyalArmory;
        const selector = armory.upgrades.find(upgrade => upgrade.index === 79)!;
        expect(selector.data.name).toBe('Compounding Outposting');
        expect(selector.isUnlocked()).toBe(true);
        const reward = armory.getResearchExpOutpostReward();
        expect(reward.available).toBe(true);
        expect(reward.selected).toBe(false);
        // RoyalG.1.22.js:138-149 scales Research EXP from current built Outposts, not a future maximum.
        const additionalOutposts = Math.max(1, armory.builtOutpostCount - 6);
        const expectedMultiplier = 1 + (additionalOutposts / (40 + additionalOutposts)) * 2;
        expect(reward.multiplier).toBe(expectedMultiplier);
        expect(reward.multiplier).toBeGreaterThan(1);
        expect(armory.getResearchExpOutpostMultiplier()).toBe(1);
        const contributor = research.production.expMultiplierContributors.find(contributor =>
            contributor.source === 'Royal Armory: Research Outpost')!;
        expect(contributor).toMatchObject({
            value: 1,
            inputValue: 1,
            operation: 'multiply',
            reward: {
                value: expectedMultiplier,
                operation: 'multiply',
                unit: 'EXP',
                acquired: true,
                active: false,
            },
        });
        expect(contributor.value).toMatchLiveGameWithDetails(value('outpost_research'), {tolerance: 0});
    });

    it('keeps inactive Jelly EXP unlock factors visible while their effective factors remain neutral', () => {
        // Retained save completed 16 obstructions; these three EXP rewards remain locked.
        const rewards = [
            {source: 'Jelly Operator: Tiger Eye', factor: 1.4},
            {source: 'Jelly Operator: Golden Ticket', factor: 1.3},
            {source: 'Jelly Operator: Janky Jewel', factor: 1.6},
        ];
        for (const reward of rewards) {
            const contributor = research.production.expMultiplierContributors.find(contributor => contributor.source === reward.source)!;
            expect(contributor.value).toBe(1);
            expect(contributor.operation).toBe('multiply');
            expect(contributor.reward).toMatchObject({
                value: reward.factor,
                operation: 'multiply',
                unit: 'EXP',
                basis: 'unlock',
                acquired: false,
                active: false,
            });
        }
        const adjacentEffect = research.production.kaleidoscopeContributors.find(contributor => contributor.source === 'Jelly Operator: Blubbury')!;
        expect(adjacentEffect.value).toBe(0);
        expect(adjacentEffect.reward).toMatchObject({
            value: 1,
            operation: 'addPercent',
            unit: 'Kaleidoscope effect',
            basis: 'unlock',
            acquired: false,
            active: false,
        });
    });

    it('keeps the discovered Sushi EXP unlock reward in the same factor unit as its effective contribution', () => {
        const contributor = research.production.expMultiplierContributors.find(contributor => contributor.source === 'Sushi: Fish Eggs')!;
        expect(contributor.value).toBe(2);
        expect(contributor.reward).toMatchObject({
            value: 2,
            operation: 'multiply',
            unit: 'EXP',
            basis: 'unlock',
            acquired: true,
            active: true,
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
            {id: 'jellofish', name: 'Jellofish', factor: 1.8, basis: 'unlock', requiredLevel: 1, terms: [
                {source: 'Companion: Jellofish', key: 'companion_52', scale: 1, gate: ownedGate},
            ]},
            {id: 'riftStalker', name: 'Rift Stalker', factor: 3, basis: 'unlock', requiredLevel: 1, terms: [
                {source: 'Companion: Rift Stalker', key: 'companion_153', scale: 1, gate: ownedGate},
                {source: 'Companion: Rift Stalker level two', key: 'companion_level_two_153', scale: 1, gate: levelTwoGate},
            ]},
            {id: 'neonscale', name: 'Neonscale', factor: 1.15, basis: 'level two', requiredLevel: 2, terms: [
                {source: 'Companion: Neonscale level two', key: 'companion_level_two_54', scale: 0.15, gate: levelTwoGate},
            ]},
        ];
        expect(companions.components!.map(component => component.source)).toEqual(specs.flatMap(spec => spec.terms.map(term => term.source)));
        for (const spec of specs) {
            const group = groups.find(group => group.id === spec.id)!;
            expect(group.name).toBe(spec.name);
            expect(group.factor).toBe(spec.factor);
            expect(group.reward).toMatchObject({
                value: spec.factor,
                operation: 'multiply',
                unit: 'EXP',
                basis: spec.basis,
                acquired: true,
                active: true,
                companion: {
                    owned: true,
                    level: 2,
                    bonusTokenActive: false,
                    requiredLevel: spec.requiredLevel,
                },
            });
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

    it.each([80, 110])('shows the unreached level %s Shape reward without increasing current Shape ownership', requiredLevel => {
        expect(research.progress.highestLevel).toBe(70);
        const note = research.postyNotes.find(note => note.data.requiredResearchLevel === requiredLevel)!;
        expect(note.reached).toBe(false);
        expect(note.context).toMatchObject({kind: 'shape', additionalShapes: 1});
        const contributor = research.shapeOwnership.contributors.find(contributor =>
            contributor.source === `Posty Note: Research level ${requiredLevel}`)!;
        expect(contributor).toMatchObject({
            value: 0,
            inputValue: 1,
            operation: 'add',
            reward: {
                value: 1,
                operation: 'add',
                unit: 'Shapes',
                basis: 'milestone',
                acquired: false,
                active: false,
                requiredResearchLevel: requiredLevel,
            },
        });
        expect(research.shapeOwnership.count).toBe(5);
        expect(research.shapeOwnership.cap).toBe(10);
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
