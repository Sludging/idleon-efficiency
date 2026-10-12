import { Gaming } from '../../../data/domain/world-5/gaming';
import { Arcade } from '../../../data/domain/world-2/arcade';
import { Votes } from '../../../data/domain/world-2/votes';
import { IslandExpeditions } from '../../../data/domain/world-2/islandExpedition';
import { Bribe } from '../../../data/domain/world-1/bribes';
import { Equinox, MetalDetector } from '../../../data/domain/world-3/equinox';
import { Hole } from '../../../data/domain/world-5/hole/hole';
import { AtomCollider } from '../../../data/domain/world-3/construction/atomCollider';
import { ResearchGrid } from '../../../data/domain/world-7/research';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { Meritocraty } from '../../../data/domain/world-7/meritocraty';
import { Tome } from '../../../data/domain/world-4/tome';
import { Farming, CropScientistBonusText } from '../../../data/domain/world-6/farming';
import { Sneaking } from '../../../data/domain/world-6/sneaking';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import { Divinity } from '../../../data/domain/world-5/divinity';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { SkillMastery, Rift } from '../../../data/domain/world-4/rift';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Worship, TotalizerBonus } from '../../../data/domain/world-3/worship';
import { Summoning } from '../../../data/domain/world-6/summoning';
import { Emperor } from '../../../data/domain/world-6/emperor';
import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { Cooking } from '../../../data/domain/world-4/cooking';
import { Player } from '../../../data/domain/player';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { Card } from '../../../data/domain/cards';
import { SprinklerImport, ShovelImport, SquirrelImport, ShellImport, BogLogImport, HighScoreImport, SnailImport, KingRatImport } from '../../../data/domain/world-5/gaming/imports';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

// Each row is a calculation directly consumed by the approved Gaming aspects.
// Same-domain parameters stay separate from the selected final result.
const parameters: ParameterTestSpec[] = [
    { extractionKey: "dependency_Voting_VotingBonusz_22", description: "Votes dig quantity bonus", domainExtractor: data => (data.get('votes') as Votes).getCurrentBonus(22) },
    { extractionKey: "shovel_island_bonus", description: "Fractal Island dig quantity bonus", domainExtractor: data => (data.get('islandExpeditions') as IslandExpeditions).bonusToShovelSpeed },
    { extractionKey: "shovel_bribe_bonus", description: "Shovel bribe dig quantity bonus", domainExtractor: data => (data.get('bribes') as Bribe[]).find(bribe => bribe.bribeIndex === 37)!.value },
    { extractionKey: "shovel_arcade_bonus", description: "Arcade dig quantity bonus", domainExtractor: data => (data.get('arcade') as Arcade).bonuses.find(bonus => bonus.index === 31)!.getBonus() },
    { extractionKey: "shovel_metal_detector", description: "Metal Detector nugget multiplier", domainExtractor: data => ((data.get('equinox') as Equinox).upgrades[7] as MetalDetector).getTotalBonus() },
    { extractionKey: "dependency_Holes_B_UPG_53", description: "Hole schematic Snail success bonus", domainExtractor: data => (data.get('hole') as Hole).getSchematicBonus(53, 0) },
    { extractionKey: "dependency_AtomCollider_AtomBonuses_10", description: "Atom Snail checkpoint bonus", domainExtractor: data => (data.get('collider') as AtomCollider).atoms.find(atom => atom.index === 10)!.getBonus() },
    { extractionKey: "dependency_Research_Grid_Bonus_108", description: "Research King Token production bonus", domainExtractor: data => (data.get('research') as ResearchGrid).getBonusForId(108, 0) },
    { extractionKey: "dependency_Sushi_RoG_BonusQTY_31", description: "Sushi crown chance bonus", domainExtractor: data => (data.get('sushi') as SushiStation).getBonusFromIndex(31) },
    { extractionKey: "dependency_JellyOperation_RoG_BonusQTY_42", description: "Jelly Operator crown chance bonus", domainExtractor: data => (data.get('jellyOperator') as JellyOperator).obstructions.find(obstruction => obstruction.index === 42)!.getBonus() },
    { extractionKey: "dependency_Arcade_ArcadeBonus_65", description: "Arcade crown chance bonus", domainExtractor: data => (data.get('arcade') as Arcade).bonuses.find(bonus => bonus.index === 65)!.getBonus() },
    { extractionKey: "dependency_Sushi_RoG_BonusQTY_42", description: "Sushi Palette Luck percentage", domainExtractor: data => (data.get('sushi') as SushiStation).getBonusFromIndex(42) },
    { extractionKey: "dependency_Summoning2_MeritocBonusz_8", description: "late Meritocracy Palette Luck percentage", domainExtractor: data => (data.get('meritocraty') as Meritocraty).getCurrentBonus(8) },
    { extractionKey: "dependency_Thingies_LoreEpiBon_5", description: "Tome epilogue Palette Luck bonus", domainExtractor: data => (data.get('tome') as Tome).getEpilogueBonus(5) },
    { extractionKey: "dependency_Farming_ExoticBonusQTY_44", description: "Farming exotic Palette Luck bonus", domainExtractor: data => (data.get('farming') as Farming).getExoticMarketBonusValue(44) },
    { extractionKey: "dependency_Ninja_EmporiumBonus_41", description: "Jade Palette slot bonus", domainExtractor: data => Number((data.get('sneaking') as Sneaking).jadeUpgrades.find(upgrade => upgrade.index === 41)!.purchased) },
    { extractionKey: "dependency_Arcade_ArcadeBonus_58", description: "Arcade Palette Luck bonus", domainExtractor: data => (data.get('arcade') as Arcade).bonuses.find(bonus => bonus.index === 58)!.getBonus() },
    { extractionKey: "dependency_Research_Grid_Bonus_107", description: "Research crown-scaled Palette Luck bonus", domainExtractor: data => (data.get('research') as ResearchGrid).getBonusForId(107, 2) },
    { extractionKey: "dependency_Thingies_LegendPTS_bonus_10", description: "Legend Talent earned Palette bonus multiplier input", domainExtractor: data => (data.get('legendTalents') as LegendTalents).getBonusFromIndex(10) },
    { extractionKey: "global_gaming_minor_bonus", description: "global Purrmep growth minor bonus, not arbitrary-player linking", domainExtractor: data => (data.get('divinity') as Divinity).getGamingGrowthMinorLinkBonus() },
    { extractionKey: "crop_scientist_evolution_chance", description: "Crop Scientist evolution factor", domainExtractor: data => (data.get('farming') as Farming).cropScientist.getBonus(CropScientistBonusText.PlantEvolutionChance) },
    { extractionKey: "voting_mutation_bonus", description: "Votes DNA mutation chance bonus", domainExtractor: data => (data.get('votes') as Votes).getCurrentBonus(21) },
    { extractionKey: "harvest_research", description: "Research harvest Bits percentage", domainExtractor: data => (data.get('research') as ResearchGrid).getBonusForId(87) },
    { extractionKey: "harvest_sushi", description: "Sushi harvest Bits percentage", domainExtractor: data => (data.get('sushi') as SushiStation).getBonusFromIndex(29) },
    { extractionKey: "harvest_artifact20", description: "Sailing gaming-level artifact bonus", domainExtractor: data => (data.get('sailing') as Sailing).artifacts[20].getBonus() },
    { extractionKey: "harvest_artifact23", description: "Sailing Bits artifact bonus", domainExtractor: data => (data.get('sailing') as Sailing).artifacts[23].getBonus() },
    { extractionKey: "harvest_monument", description: "Bravery Monument Bits percentage", domainExtractor: data => (data.get('hole') as Hole).getMonumentBonus('Bravery', 4) },
    { extractionKey: "harvest_rift", description: "Rift Gaming Bits percentage", domainExtractor: data => ((data.get('rift') as Rift).bonuses.find(bonus => bonus instanceof SkillMastery) as SkillMastery).getSkillBonus(SkillsIndex.Gaming, 1) },
    { extractionKey: "harvest_msa", description: "Worship Totalizer Bits percentage", domainExtractor: data => (data.get('worship') as Worship).totalizer.getBonus(TotalizerBonus.BitValue) },
    { extractionKey: "harvest_wins", description: "Summoning winner Bits percentage", domainExtractor: data => (data.get('summoning') as Summoning).getSummoningWinnerBonusFromIndex(16) },
    { extractionKey: "harvest_lamp", description: "Hole lamp Bits percentage", domainExtractor: data => (data.get('hole') as Hole).lamp.getBonus(false, 1, 1) },
    { extractionKey: "harvest_emperor", description: "Emperor Bits percentage", domainExtractor: data => (data.get('emperor') as Emperor).emperorBonuses[7].getBonus() },
    { extractionKey: "harvest_merit", description: "Meritocracy Bits percentage", domainExtractor: data => (data.get('meritocraty') as Meritocraty).getCurrentBonus(1) },
    { extractionKey: "harvest_sticker", description: "Farming Gaming sticker percentage", domainExtractor: data => (data.get('farming') as Farming).getStickerBonus(3) },
    { extractionKey: "harvest_vault", description: "Upgrade Vault Bits percentage", domainExtractor: data => (data.get('upgradeVault') as UpgradeVault).getBonusForId(68) },
    { extractionKey: "harvest_vial7bits", description: "7 Figure Followers vial Bits percentage", domainExtractor: data => (data.get('alchemy') as Alchemy).getVialBonusForKey('7bits') },
    { extractionKey: "harvest_vialGameBits", description: "Jar of Glitter vial Bits percentage", domainExtractor: data => (data.get('alchemy') as Alchemy).getVialBonusForKey('GameBits') },
    { extractionKey: "harvest_meal", description: "Cooking Bits percentage", domainExtractor: data => (data.get('cooking') as Cooking).getMealBonusForKey('GamingBits') },
    { extractionKey: "harvest_talent", description: "prepared Bits talent percentage", domainExtractor: data => (data.get('players') as Player[]).reduce((best, player) => Math.max(best, player.getTalentBonus(177)), 0) },
    { extractionKey: "harvest_companion", description: "Bits companion effect", domainExtractor: data => getCompanionActiveBonus(data.get('companions') as Companion[], 53) },
    // Native CardLv is a one-based earned level consumed as 20 * CardLv percentage.
    // Card.getLevels() is the star tier, not this native unit.
    { extractionKey: "harvest_card", description: "Bits card percentage", domainExtractor: data => (data.get('cards') as Card[]).find(card => card.id === 'w7b2')!.getBonus() },
    { extractionKey: "logbook_bubble", description: "Bit By Bit calculated bubble bonus", domainExtractor: data => (data.get('alchemy') as Alchemy).getBubbleBonusForKey('Y3') },
    { extractionKey: "acorn_shop_bonus_0", description: "same-domain Squirrel Bits multiplier", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(2) as SquirrelImport).shop[0].multiplier },
    { extractionKey: "acorn_shop_bonus_1", description: "same-domain Squirrel growth percentage", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(2) as SquirrelImport).shop[1].bonusPercent },
    { extractionKey: "acorn_shop_bonus_2", description: "same-domain Squirrel Palette Luck percentage", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(2) as SquirrelImport).shop[2].bonusPercent },
    { extractionKey: "rat_shop_bonus_1", description: "same-domain King Rat Palette Luck percentage", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(8) as KingRatImport).shop[1].bonusPercent },
    { extractionKey: "palette_bonus_3", description: "same-domain earned Palette Luck bonus", domainExtractor: data => (data.get('gaming') as Gaming).getPaletteBonus(3) },
    { extractionKey: "palette_bonus_18", description: "same-domain earned Palette Bits bonus", domainExtractor: data => (data.get('gaming') as Gaming).getPaletteBonus(18) },
    { extractionKey: "palette_bonus_7", description: "same-domain locked Palette Bits bonus", domainExtractor: data => (data.get('gaming') as Gaming).getPaletteBonus(7) },
    { extractionKey: "palette_or_superbit_8", description: "same-domain earned Palette growth bonus", domainExtractor: data => (data.get('gaming') as Gaming).getPaletteBonus(8) },
    { extractionKey: "palette_or_superbit_11", description: "same-domain earned second Palette growth bonus", domainExtractor: data => (data.get('gaming') as Gaming).getPaletteBonus(11) },
    { extractionKey: "palette_bonus_34", description: "same-domain earned Palette token percentage", domainExtractor: data => (data.get('gaming') as Gaming).getPaletteBonus(34) },
    { extractionKey: "snail_stuff_2", description: "same-domain Snail earned Bits multiplier", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(7) as SnailImport).bitsMultiplier },
    { extractionKey: "RatBitMulti", description: "same-domain King Rat unique-crown multiplier", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(8) as KingRatImport).bitsMultiplier },
    { extractionKey: "LogGameMulti", description: "same-domain Bog Log high-score multiplier", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(5) as BogLogImport).bitsMultiplier },
    { extractionKey: "GamingPOINGmulti", description: "same-domain POiNG high-score multiplier", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(6) as HighScoreImport).bitsMultiplier },
    { extractionKey: "logbook_bits_multiplier", description: "same-domain historical Logbook Bits multiplier", domainExtractor: data => (data.get('gaming') as Gaming).logbook.bitsMultiplier },
    { extractionKey: "shell_earned_multiplier", description: "same-domain Shell earned Bits multiplier", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(3) as ShellImport).earnedBitsMultiplier },
    { extractionKey: "import_bonus_0", description: "same-domain Sprinkler recharge percentage", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(0) as SprinklerImport).rechargeBonusPercent },
    { extractionKey: "import_bonus_1", description: "same-domain Shovel big-nugget Luck", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(1) as ShovelImport).bigNuggetLuck },
    { extractionKey: "import_bonus_2", description: "same-domain Squirrel acorn percentage", domainExtractor: data => ((data.get('gaming') as Gaming).getImport(2) as SquirrelImport).acornBonusPercent },
    { extractionKey: "import_bonus_3", description: "same-domain Shell next-rank bonus coefficient", domainExtractor: data => (data.get('gaming') as Gaming).getImport(3)!.getBonus() },
    { extractionKey: "import_bonus_4", description: "same-domain Kitsune growth percentage", domainExtractor: data => (data.get('gaming') as Gaming).getImport(4)!.getBonus() },
    { extractionKey: "import_bonus_5", description: "same-domain Bog Log free-game percentage", domainExtractor: data => (data.get('gaming') as Gaming).getImport(5)!.getBonus() },
    { extractionKey: "import_bonus_7", description: "same-domain Snail mail percentage", domainExtractor: data => (data.get('gaming') as Gaming).getImport(7)!.getBonus() },
    { extractionKey: "import_bonus_8", description: "same-domain King Rat crown percentage", domainExtractor: data => (data.get('gaming') as Gaming).getImport(8)!.getBonus() },
];

describe('Gaming direct calculation parameters', () => {
    let data: Map<string, any>;
    let results: ExtractionResults;
    beforeAll(() => {
        results = loadExtractionResults('gaming-mechanics-data.json');
        validateExtractionHealth(results);
        data = loadGameDataFromSave('latest');
    });
    it.each(parameters)('$description', ({ extractionKey, domainExtractor }) => {
        const expected = getExtractedValue(results, extractionKey);
        const liveValue = extractionKey === 'harvest_card' ? expected * 20 : expected;
        expect(domainExtractor(data)).toMatchLiveGame(liveValue, 0);
    });
});

