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

    it('keeps all 240 indexed positions but exposes exactly 60 real upgrades in original order', () => {
        expect(research.bonuses).toHaveLength(240);
        expect(research.upgrades).toHaveLength(60);
        expect(original).toHaveLength(60);
        expect(research.upgrades.map(upgrade => upgrade.index)).toEqual(original.map(upgrade => upgrade.index));
        expect(research.bonuses.filter(upgrade => upgrade.data.name === 'Name')).toHaveLength(180);
        research.upgrades.forEach((upgrade, index) => {
            expect(upgrade).toBe(research.bonuses[upgrade.index]);
            expect(upgrade.data.name).toBe(normalizeGameText(original[index].name));
        });
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

    realDefinitions.forEach(definition => {
        it(`preserves ${definition.data.name} original static description template`, () => {
            const expected = original.find(square => square.index === definition.index)!;
            expect(research.bonuses[definition.index].data.description).toBe(normalizeGameText(expected.template));
        });

        it(`matches ${definition.data.name} populated description with original game substitutions`, () => {
            const expected = extracted<{ index: number; text: string }[]>(results, 'descriptions')
                .find(entry => entry.index === definition.index)!;
            const description = research.bonuses[definition.index].getDescription();
            expect(normalizeGameText(description)).toBe(normalizeGameText(expected.text));
            expect(description).not.toMatch(/[{}$^&|<]/);
        });
    });

    it('observes all six original description tokens, including purchased levels in sixteen templates', () => {
        const descriptions = extracted<{ index: number; text: string }[]>(results, 'descriptions');
        expect(descriptions.map(description => description.index)).toEqual(research.upgrades.map(upgrade => upgrade.index));
        const observedTokens = new Set<string>();
        original.forEach(upgrade => {
            for (const token of ['{', '}', '$', '^', '&', '|']) {
                if (upgrade.template.includes(token)) observedTokens.add(token);
            }
        });
        expect([...observedTokens].sort()).toEqual(['$', '&', '^', '{', '|', '}'].sort());
        expect(original.filter(upgrade => upgrade.template.includes('|')).map(upgrade => upgrade.index))
            .toEqual([50, 51, 72, 90, 91, 126, 130, 131, 132, 147, 152, 166, 169, 186, 188, 190]);
    });

    it('observes the Doot Divine Design sentence without fabricating the non-Doot branch', () => {
        const divine = research.bonuses[173];
        expect(divine.getDescription().startsWith(dootSentence)).toBe(true);
        expect(divine.getDescription()).not.toContain(arctisSentence);
    });

    it('keeps Lore, Cooking Mastery, and boat prerequisites separate from grants, reachability, cap, and affordability', () => {
        const sigils = research.bonuses[128];
        const lore = (data.get('spelunking') as Spelunking).tunnels.find(tunnel => tunnel.index === 6)!;
        expect(sigils.prerequisites).toEqual([{ kind: 'lore', tunnelIndex: 6, name: lore.data.name, met: numeric(results, 'lore_6') === 1 }]);
        expect(sigils.linkedState).toEqual({ kind: 'eclecticSigils', researchGranted: true, loreCompleted: true, effectiveUnlocked: numeric(results, 'green_sigils') === 1 });
        const cooking = research.bonuses[190];
        expect(cooking.prerequisites).toEqual([{ kind: 'cookingMastery', met: numeric(results, 'cooking_mastery') === 1 }]);
        const cookingState = cooking.linkedState!;
        expect(cookingState).toMatchObject({ kind: 'cookingMastery', researchGranted: true, masteryUnlocked: true, effectiveActive: true });
        if (cookingState.kind !== 'cookingMastery') throw new Error('Missing Cooking Mastery linked state');
        expect(cookingState.expMultiplier).toMatchLiveGameWithDetails(1 + original.find(square => square.index === 190)!.primary / 100, { tolerance: 0 });
        expect(cooking.data.description).toContain('Rift 61');
        expect((data.get('rift') as Rift).level).toBe(inputs.rift[0]);
        const boats = extracted<OriginalBoatQualification[]>(results, 'boats');
        const undead = research.bonuses[105];
        expect(boats).toHaveLength(20);
        expect(boats.every(boat => boat.qualifies === 0)).toBe(true);
        expect(undead.prerequisites).toEqual([{ kind: 'undeadBattalion', qualifyingBoatCount: 0, totalBoatCount: 20, met: false }]);
        expect(undead.linkedState).toEqual({ kind: 'undeadBattalion', researchGranted: true, qualifyingBoatCount: 0, totalBoatCount: 20, effectiveBoatCount: 0 });
        [sigils, cooking, undead].forEach(upgrade => {
            expect(upgrade.reachable).toBe(true);
            expect(upgrade.affordable).toBe(false);
        });
        expect(research.upgrades.filter(upgrade => upgrade.prerequisites.length > 0).map(upgrade => upgrade.index)).toEqual([105, 128, 190]);
        const unpurchased = research.bonuses[170];
        expect(unpurchased).toMatchObject({ level: 0, reachable: true, affordable: false, prerequisites: [] });
        expect(unpurchased.atCap).toBe(false);
        expect(research.upgrades.some(upgrade => upgrade.atCap)).toBe(true);
    });

    it('exposes crown/trade scaling, bounded Masterclass costs, and independent Divine Design state', () => {
        [67, 68, 107].forEach(index => {
            const state = research.bonuses[index].linkedState!;
            expect(state).toMatchObject({ kind: 'crowns', crownCount: inputs.crowns.length });
            if (state.kind !== 'crowns') throw new Error('Missing crown linked state');
            const expected = original.find(square => square.index === index)!;
            expect(state.bonusPerCrown).toMatchLiveGameWithDetails(expected.primary, { tolerance: 0 });
            expect(state.totalBonus).toMatchLiveGameWithDetails(expected.secondary, { tolerance: 0 });
        });
        const trades = research.bonuses[168].linkedState!;
        expect(trades).toMatchObject({ kind: 'glimboTrades', totalTrades: numeric(results, 'glimbo_trades'), completeTradeBlocks: 4 });
        if (trades.kind !== 'glimboTrades') throw new Error('Missing Glimbo linked state');
        expect(trades.bonusPerBlock).toMatchLiveGameWithDetails(original.find(square => square.index === 168)!.primary, { tolerance: 0 });
        expect(trades.totalBonus).toMatchLiveGameWithDetails(original.find(square => square.index === 168)!.secondary, { tolerance: 0 });
        const masterclass = research.bonuses[150].linkedState!;
        expect(masterclass).toMatchObject({ kind: 'masterclass', researchGranted: true, classes: ['Deathbringer', 'Windwalker', 'Arcane Cultist'], accumulatedReduction: inputs.accumulatedReduction });
        if (masterclass.kind !== 'masterclass') throw new Error('Missing Masterclass linked state');
        expect(masterclass.dailyReductionPercent).toMatchLiveGameWithDetails(original.find(square => square.index === 150)!.primary, { tolerance: 0 });
        expect(masterclass.accumulatedReductionPercent).toMatchLiveGameWithDetails(numeric(results, 'accumulated_reduction_percent'), { tolerance: 0 });
        expect(masterclass.costMultiplier).toMatchLiveGameWithDetails(numeric(results, 'masterclass_cost_multiplier'), { tolerance: 0 });
        expect(masterclass.classes).not.toContain('Royal Guardian');
        const divine = research.bonuses[173].linkedState!;
        expect(divine).toMatchObject({ kind: 'divineDesign', arctisGranted: true, dootActive: true });
        if (divine.kind !== 'divineDesign') throw new Error('Missing Divine Design linked state');
        expect(divine.dropRatePercent).toMatchLiveGameWithDetails(original.find(square => square.index === 173)!.primary, { tolerance: 0 });
        expect(divine.sharedGridContributionPercent).toMatchLiveGameWithDetails(numeric(results, 'divine_shared_contribution'), { tolerance: 0 });
    });

    it('uses saved twenty-column orthogonal neighbors without inventing a row-edge transition', () => {
        const mask = extracted<number[]>(results, 'selection_mask');
        expect(mask).toHaveLength(240);
        const lore = (data.get('spelunking') as Spelunking).tunnels.find(tunnel => tunnel.index === 6)!;
        const linkedInputs = {
            sigilLore: { index: lore.index, name: lore.data.name, completed: lore.loreCompleted },
            cookingMasteryUnlocked: (data.get('cooking') as Cooking).isCookingMasteryUnlocked(data.get('rift') as Rift, data.get('companions') as Companion[]),
            undeadBattalion: (data.get('sailing') as Sailing).getUndeadBattalionQualification(),
        };
        research.bonuses.forEach(upgrade => {
            upgrade.preparePresentation(research.bonuses, inputs.accumulatedReduction, linkedInputs);
            expect(upgrade.reachable).toBe(mask[upgrade.index] === 1);
        });
        // Upgrade 170 is the only unpurchased real square. Its four genuine orthogonal neighbors all have purchased ranks.
        expect(inputs.levels[170]).toBe(0);
        expect([150, 169, 171, 190].map(index => Number(inputs.levels[index]))).toEqual([2, 1, 1, 4]);
        expect(research.bonuses[170].reachable).toBe(true);
        expect([109, 110, 129, 130].map(index => research.bonuses[index].reachable)).toEqual([true, true, true, true]);
        for (let row = 0; row < 12; row++) {
            expect(inputs.levels[20 * row]).toBe(0);
            expect(inputs.levels[20 * row + 19]).toBe(0);
            expect(research.bonuses[20 * row].reachable).toBe(false);
            expect(research.bonuses[20 * row + 19].reachable).toBe(false);
        }
        expect(research.bonuses.filter(upgrade => upgrade.data.name === 'Name').every(upgrade => !upgrade.reachable)).toBe(true);
    });

    it('retains all ten static Shape definitions, including unchanged Cyan/Maroon EXP prose', () => {
        const definitions = extracted<OriginalShapeDefinitions>(results, 'shape_static');
        expect(research.shapes).toHaveLength(10);
        expect(definitions.modifiers).toHaveLength(10);
        research.shapes.forEach((shape, index) => {
            expect(shape.index).toBe(index);
            expect(shape.data).toEqual(shapeDefinitions[index].data);
            expect(shape.data.name).toBe(normalizeGameText(definitions.names[index]));
            expect(shape.data.vertices).toEqual(definitions.vertices[index].split(';').map(vertex => {
                const [x, y] = vertex.split(',').map(Number);
                return { x, y };
            }));
            const [width, height] = definitions.dimensions[index].split(',').map(Number);
            expect(shape.data.width).toBe(width);
            expect(shape.data.height).toBe(height);
            expect(shape.data.bonusPercent).toBe(Number(definitions.modifiers[index]));
            expect(shape.bonusMultiplier).toBe(1 + Number(definitions.modifiers[index]) / 100);
            const description = shapeDefinitions[index].data.descriptionTemplate
                .replace(/{/g, String(Number(definitions.modifiers[index])))
                .replace(/}/g, extracted<string[]>(results, 'shape_multiplier_texts')[index]);
            expect(shape.getDescription()).toBe(description);
            expect(shape.getDescription()).not.toMatch(/[{}]/);
        });
        expect(research.shapes[3].data.descriptionTemplate).toBe('+{% Research EXP per highlighted bonus');
        expect(research.shapes[3].getDescription()).toBe('+20% Research EXP per highlighted bonus');
        expect(research.shapes[6].data.descriptionTemplate).toBe('+{% Research EXP per highlighted bonus');
        expect(research.shapes[6].getDescription()).toBe('+25% Research EXP per highlighted bonus');
    });

    it('uses the five observed owners, saved pixel placements/rotations, and reverse real-upgrade coverage', () => {
        const definitions = extracted<OriginalShapeDefinitions>(results, 'shape_static');
        const count = numeric(results, 'shape_count');
        expect(count).toBe(5);
        expect(research.shapeOwnership.count).toMatchLiveGameWithDetails(count, { tolerance: 0 });
        expect(research.shapeOwnership.rotationUnlocked).toBe(numeric(results, 'rotation_unlocked') === 1);
        expect(inputs.placements).toHaveLength(80);
        research.shapes.forEach(shape => {
            expect(shape.owned).toBe(shape.index < count);
            expect(shape.placement).toEqual({ x: Number(inputs.placements[4 * shape.index]), y: Number(inputs.placements[4 * shape.index + 1]), rotationDegrees: Number(inputs.placements[4 * shape.index + 2]) });
            expect(shape.rotationModuloDegrees).toBe(0);
            expect(shape.rotationUnlocked).toBe(false);
            expect(shape.rotationRequiredLevel).toBe(90);
            expect(shape.rotationStepDegrees).toBe(5);
            const coveredIndexes = original.filter(upgrade => Number(inputs.owners[upgrade.index]) === shape.index).map(upgrade => upgrade.index);
            expect(shape.coveredUpgrades.map(upgrade => upgrade.index)).toEqual(coveredIndexes);
            shape.coveredUpgrades.forEach(upgrade => expect(upgrade).toBe(research.bonuses[upgrade.index]));
        });
        expect(research.shapes.slice(0, count).map(shape => shape.coveredUpgrades.length)).toEqual([2, 9, 3, 9, 13]);
        expect(research.shapes.slice(count).every(shape => shape.coveredUpgrades.length === 0)).toBe(true);
        research.bonuses.forEach(upgrade => {
            const owner = Number(inputs.owners[upgrade.index]);
            expect(upgrade.activeOwner).toBe(owner === -1 ? undefined : owner);
            const percent = owner === -1 ? 0 : Number(definitions.modifiers[owner]);
            expect(upgrade.shapeBonusPercent).toBe(percent);
            expect(upgrade.shapeMultiplier).toBe(1 + percent / 100);
        });
        expect(research.upgrades.filter(upgrade => upgrade.activeOwner === undefined)).toHaveLength(24);
        const covered = research.shapes.flatMap(shape => shape.coveredUpgrades.map(upgrade => upgrade.index));
        expect(new Set(covered).size).toBe(covered.length);
        expect(covered).toHaveLength(36);
    });

    it('replaces early/late preparation without stacking totals or coverage and preserves Part 1 production', () => {
        const before = catalogueSnapshot(research);
        const fixtureBefore = saveHash();
        for (let pass = 0; pass < 3; pass++) {
            expect(updateResearchGrid(data)).toBe(research);
            expect(updateResearchDisplay(data)).toBe(research);
            expect(catalogueSnapshot(research)).toBe(before);
        }
        expect(saveHash()).toBe(fixtureBefore);
        expect(savedResearch[0].map(Number)).toEqual(inputs.levels.map(Number));
        expect(research.production.expPerHour).toMatchLiveGameWithDetails(36111541.95983566, { tolerance: 0, context: 'Retained original Part 1 EXP per hour' });
        expect(research.production.insightAccrualPerHour).toMatchLiveGameWithDetails(40.285349999999994, { tolerance: 0, context: 'Retained original Part 1 actual Insight per hour' });
    });
});
