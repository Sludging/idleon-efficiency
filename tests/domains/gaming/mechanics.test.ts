import { Gaming } from '../../../data/domain/world-5/gaming';
import { SprinklerImport, ShovelImport, SquirrelImport, ShellImport, BogLogImport, HighScoreImport, SnailImport, KingRatImport } from '../../../data/domain/world-5/gaming/imports';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

// Genuine paused offline 1.22 state. Relevant saved Gaming, shops, Palette,
// Research progress and uniform level were paired with latest before extraction.
// This save exercises extended Snail, capped crown odds, locked colors, decay,
// doubled earned bonuses and late Meritocracy; it does not simulate other saves.
const cases: [string, string, (gaming: Gaming) => number | null][] = [
    ["import_purchase_cost_0", "purchase cost of Sprinkler", g => g.getImport(0)!.purchaseCostBits],
    ["import_upgrade_cost_0", "upgrade cost of Sprinkler", g => g.getImport(0)!.getUpgradeCost()],
    ["import_bonus_0", "earned upgrade effect of Sprinkler", g => g.getImport(0)!.getBonus()],
    ["import_purchase_cost_1", "purchase cost of Shovel", g => g.getImport(1)!.purchaseCostBits],
    ["import_upgrade_cost_1", "upgrade cost of Shovel", g => g.getImport(1)!.getUpgradeCost()],
    ["import_bonus_1", "earned upgrade effect of Shovel", g => g.getImport(1)!.getBonus()],
    ["import_purchase_cost_2", "purchase cost of Squirrel", g => g.getImport(2)!.purchaseCostBits],
    ["import_upgrade_cost_2", "upgrade cost of Squirrel", g => g.getImport(2)!.getUpgradeCost()],
    ["import_bonus_2", "earned upgrade effect of Squirrel", g => g.getImport(2)!.getBonus()],
    ["import_purchase_cost_3", "purchase cost of Shell", g => g.getImport(3)!.purchaseCostBits],
    ["import_upgrade_cost_3", "upgrade cost of Shell", g => g.getImport(3)!.getUpgradeCost()],
    ["import_bonus_3", "earned upgrade effect of Shell", g => g.getImport(3)!.getBonus()],
    ["import_purchase_cost_4", "purchase cost of Kitsune", g => g.getImport(4)!.purchaseCostBits],
    ["import_upgrade_cost_4", "upgrade cost of Kitsune", g => g.getImport(4)!.getUpgradeCost()],
    ["import_bonus_4", "earned upgrade effect of Kitsune", g => g.getImport(4)!.getBonus()],
    ["import_purchase_cost_5", "purchase cost of Bog Log", g => g.getImport(5)!.purchaseCostBits],
    ["import_upgrade_cost_5", "upgrade cost of Bog Log", g => g.getImport(5)!.getUpgradeCost()],
    ["import_bonus_5", "earned upgrade effect of Bog Log", g => g.getImport(5)!.getBonus()],
    ["import_purchase_cost_6", "purchase cost of POiNG", g => g.getImport(6)!.purchaseCostBits],
    ["import_upgrade_cost_6", "upgrade cost of POiNG", g => g.getImport(6)!.getUpgradeCost()],
    ["import_purchase_cost_7", "purchase cost of Snail", g => g.getImport(7)!.purchaseCostBits],
    ["import_upgrade_cost_7", "upgrade cost of Snail", g => g.getImport(7)!.getUpgradeCost()],
    ["import_bonus_7", "earned upgrade effect of Snail", g => g.getImport(7)!.getBonus()],
    ["import_purchase_cost_8", "purchase cost of King Rat", g => g.getImport(8)!.purchaseCostBits],
    ["import_upgrade_cost_8", "upgrade cost of King Rat", g => g.getImport(8)!.getUpgradeCost()],
    ["import_bonus_8", "earned upgrade effect of King Rat", g => g.getImport(8)!.getBonus()],
    ["SaveSprinkler", "combined golden sprinkler and Palette preservation probability", g => (g.getImport(0) as SprinklerImport).preservationProbability],
    ["shovel_nugget_minimum", "nugget lower draw bound, not a guaranteed improvement", g => (g.getImport(1) as ShovelImport).nuggetRange.minimum],
    ["shovel_nugget_maximum", "nugget upper draw bound with Metal Detector", g => (g.getImport(1) as ShovelImport).nuggetRange.maximum],
    ["shell_next_threshold", "next Shell rank cumulative evolution requirement", g => (g.getImport(3) as ShellImport).nextRankThreshold],
    ["LogGameMulti", "earned Bog Log high score multiplier", g => (g.getImport(5) as BogLogImport).bitsMultiplier],
    ["GamingPOINGmulti", "earned POiNG high score multiplier", g => (g.getImport(6) as HighScoreImport).bitsMultiplier],
    ["MaxSnailLV", "extended Snail level cap", g => (g.getImport(7) as SnailImport).levelCap],
    ["snail_stuff_0", "extended Snail success probability", g => (g.getImport(7) as SnailImport).successProbability],
    ["snail_stuff_1", "Snail reset probability conditional on failure", g => (g.getImport(7) as SnailImport).resetOnFailureProbability],
    ["snail_stuff_2", "Snail earned Bits multiplier above level25", g => (g.getImport(7) as SnailImport).bitsMultiplier],
    ["snail_stuff_3", "extended Snail level-up mail cost", g => (g.getImport(7) as SnailImport).levelUpMailCost],
    ["snail_stuff_protection_cost", "extended Snail consecration mail cost", g => (g.getImport(7) as SnailImport).protectionMailCost],
    ["RatBitMulti", "King Rat unique-crown Bits multiplier", g => (g.getImport(8) as KingRatImport).bitsMultiplier],
    ["RatCurrencyGain", "King Token hourly income with research unlock", g => (g.getImport(8) as KingRatImport).tokensPerHour],
    ["PaletteLuck", "Palette Luck after late Meritocracy settles", g => g.palette.bonusLuck],
    ["TotalSelectorSlots", "active equipped Palette slot limit", g => g.palette.slotLimit],
    ["palette_bonus_37", "total earned Palette levels", g => g.palette.totalLevelsBonus],
    ["acorn_shop_cost_0", "Squirrel shop0 acorn cost", g => (g.getImport(2) as SquirrelImport).shop[0].cost],
    ["acorn_shop_bonus_0", "Squirrel shop0 earned Bits multiplier effect", g => (g.getImport(2) as SquirrelImport).shop[0].multiplier],
    ["rat_shop_cost_0", "King Token shop0 cost", g => (g.getImport(8) as KingRatImport).shop[0].cost],
    ["rat_shop_bonus_0", "King Token shop0 earned effect", g => (g.getImport(8) as KingRatImport).shop[0].bonusPercent],
    ["acorn_shop_cost_1", "Squirrel shop1 acorn cost", g => (g.getImport(2) as SquirrelImport).shop[1].cost],
    ["acorn_shop_bonus_1", "Squirrel shop1 earned growth effect", g => (g.getImport(2) as SquirrelImport).shop[1].bonusPercent],
    ["rat_shop_cost_1", "King Token shop1 cost", g => (g.getImport(8) as KingRatImport).shop[1].cost],
    ["rat_shop_bonus_1", "King Token shop1 earned effect", g => (g.getImport(8) as KingRatImport).shop[1].bonusPercent],
    ["acorn_shop_cost_2", "Squirrel shop2 acorn cost", g => (g.getImport(2) as SquirrelImport).shop[2].cost],
    ["acorn_shop_bonus_2", "Squirrel shop2 earned Luck effect", g => (g.getImport(2) as SquirrelImport).shop[2].bonusPercent],
    ["rat_shop_cost_2", "King Token shop2 cost", g => (g.getImport(8) as KingRatImport).shop[2].cost],
    ["rat_shop_bonus_2", "King Token shop2 earned effect", g => (g.getImport(8) as KingRatImport).shop[2].bonusPercent],
    ["rat_crown_odds_0", "crown draw probability at visible stage1", g => (g.getImport(8) as KingRatImport).crownChances[0].probability],
    ["rat_crown_odds_1", "crown draw probability at visible stage2", g => (g.getImport(8) as KingRatImport).crownChances[1].probability],
    ["rat_crown_odds_2", "crown draw probability at visible stage3 reaches cap", g => (g.getImport(8) as KingRatImport).crownChances[2].probability],
    ["rat_crown_odds_7", "crown draw probability at visible stage8", g => (g.getImport(8) as KingRatImport).crownChances[7].probability],
    ["palette_bonus_0", "earned Palette color0 bonus remains zero while locked", g => g.getPaletteBonus(0)],
    ["palette_bonus_3", "earned Palette color3 bonus uses decay and Superbit doubling", g => g.getPaletteBonus(3)],
    ["palette_bonus_7", "earned Palette color7 bonus remains zero while locked", g => g.getPaletteBonus(7)],
    ["palette_bonus_12", "earned Palette color12 bonus", g => g.getPaletteBonus(12)],
    ["palette_bonus_13", "earned Palette color13 bonus", g => g.getPaletteBonus(13)],
    ["palette_bonus_18", "earned Palette color18 bonus", g => g.getPaletteBonus(18)],
    ["palette_bonus_25", "earned Palette color25 bonus", g => g.getPaletteBonus(25)],
    ["palette_bonus_31", "earned Palette color31 bonus", g => g.getPaletteBonus(31)],
    ["palette_bonus_34", "earned Palette color34 bonus", g => g.getPaletteBonus(34)],
    ["palette_level_chance_0", "Palette color0 next-level probability", g => g.paletteColors[0].levelUpProbability],
    ["palette_unlock_chance_0", "Palette color0 unlock probability", g => g.paletteColors[0].unlockProbability],
    ["palette_level_chance_3", "Palette color3 next-level probability", g => g.paletteColors[3].levelUpProbability],
    ["palette_unlock_chance_3", "Palette color3 unlock probability", g => g.paletteColors[3].unlockProbability],
    ["palette_level_chance_18", "Palette color18 next-level probability", g => g.paletteColors[18].levelUpProbability],
    ["palette_unlock_chance_18", "Palette color18 unlock probability saturates at1", g => g.paletteColors[18].unlockProbability],
    ["superbit_cost_0", "Superbit0 purchase cost across all three boards", g => g.superbits.find(bit => bit.superbitId === 0)!.getCost()],
    ["superbit_cost_24", "Superbit24 purchase cost across all three boards", g => g.superbits.find(bit => bit.superbitId === 24)!.getCost()],
    ["superbit_cost_48", "Superbit48 purchase cost across all three boards", g => g.superbits.find(bit => bit.superbitId === 48)!.getCost()],
    ["superbit_cost_68", "Superbit68 purchase cost across all three boards", g => g.superbits.find(bit => bit.superbitId === 68)!.getCost()],
    ["fertilizer_cost_0", "Bits fertilizer cost above the exponent cap", g => g.fertilizer[0].costBits],
    ["fertilizer_cost_1", "Growth fertilizer Bits cost", g => g.fertilizer[1].costBits],
    ["fertilizer_cost_2", "Garden capacity fertilizer late-level cost branch", g => g.fertilizer[2].costBits],
    ["SproutValueBase", "Bits fertilizer's prepared harvest base", g => g.fertilizer[0].effect.harvestBits!],
    ["SproutCapacity", "garden capacity at the native cap", g => g.garden.capacity],
    ["MutateUpgCosts", "evolution upgrade Bits cost", g => g.garden.evolutionUpgradeCostBits],
    ["SproutValueNonPlantMulti", "combined account harvest multiplier", g => g.garden.nonPlantBitsMultiplier],
    ["NewMutantChanceDEC", "DNA mutation probability with saved discoveries and pity", g => g.mutations.attemptProbability],
    ["SproutGrowthTime", "garden growth cycle in seconds", g => g.garden.growthCycleSeconds],
    ["SproutMaxEvo", "maximum visible garden stage", g => g.garden.maximumStage],
    ["initial_appearance_probability", "initial appearance chance is separate from evolution", g => g.garden.initialAppearanceProbability],
    ["logbook_bits_multiplier", "Logbook earned Bits multiplier from historical stages", g => g.logbook.bitsMultiplier],
    ["garden_standard_harvest", "standard stage-one sprout harvest before species effects", g => g.garden.harvestBits],
    ["slot_evolution_probability_0", "slot 0 occupied-plant evolution probability with maximum-stage cap", g => g.garden.slots[0].nextEvolutionProbability],
    ["slot_evolution_probability_2", "slot 2 occupied-plant evolution probability with maximum-stage cap", g => g.garden.slots[2].nextEvolutionProbability],
    ["slot_evolution_probability_4", "slot 4 occupied-plant evolution probability with maximum-stage cap", g => g.garden.slots[4].nextEvolutionProbability],
];

describe('Gaming account mechanics', () => {
    let gaming: Gaming;
    let results: ExtractionResults;
    beforeAll(() => {
        results = loadExtractionResults('gaming-mechanics-data.json');
        validateExtractionHealth(results);
        gaming = loadGameDataFromSave('latest').get('gaming') as Gaming;
    });
    it.each(cases)('%s: %s', (label, description, extract) => {
        const expected = getExtractedValue(results, label);
        expect(extract(gaming)).toMatchLiveGameWithDetails(expected, {
            tolerance: 0, context: description,
            debugInfo: { gamingLevel: gaming.level, bits: gaming.bits, paletteLuck: gaming.palette.bonusLuck }
        });
    });
});

