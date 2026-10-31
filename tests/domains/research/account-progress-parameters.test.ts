import { ResearchGrid } from '../../../data/domain/world-7/research';
import { initResearchGridBonusRepo } from '../../../data/domain/data/ResearchGridBonusRepo';
import { initResearchObservationRepo } from '../../../data/domain/data/ResearchObservationRepo';
import { initCompanionRepo } from '../../../data/domain/data/CompanionRepo';
import { initSushiRepo } from '../../../data/domain/data/SushiRepo';
import { initJellyObstructionRepo } from '../../../data/domain/data/JellyObstructionRepo';
import { initMineheadOpponentRepo } from '../../../data/domain/data/MineheadOpponentRepo';
import { initEventShopBonusRepo } from '../../../data/domain/data/EventShopBonusRepo';
import { EnemyInfo } from '../../../data/domain/enemies';
import { Companion, getCompanionActiveBonus, isCompanionLevelTwo } from '../../../data/domain/companions';
import { Card } from '../../../data/domain/cards';
import { Farming, CropScientistBonusText } from '../../../data/domain/world-6/farming';
import { Cooking } from '../../../data/domain/world-4/cooking';
import { DancingCoral } from '../../../data/domain/world-7/dancingCoral';
import { ZenithMarket } from '../../../data/domain/world-7/zenithShop';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { Spelunking } from '../../../data/domain/world-7/spelunking';
import { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import { Arcade } from '../../../data/domain/world-2/arcade';
import { Equinox } from '../../../data/domain/world-3/equinox';
import { Button } from '../../../data/domain/world-7/button';
import { KillRoy } from '../../../data/domain/world-2/killroy';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { Hole } from '../../../data/domain/world-5/hole/hole';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { Minehead } from '../../../data/domain/world-7/minehead';
import { Sneaking } from '../../../data/domain/world-6/sneaking';
import { EventShop } from '../../../data/domain/eventShop';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { Worship } from '../../../data/domain/world-3/worship';
import { Slab } from '../../../data/domain/world-5/slab';
import { Lab } from '../../../data/domain/world-4/lab';
import { Tome } from '../../../data/domain/world-4/tome';
import { Grimoire } from '../../../data/domain/grimoire';
import { Tesseract } from '../../../data/domain/tesseract';
import { Deathnote } from '../../../data/domain/world-3/construction/deathnote';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { PreviewExpectations, researchExpected, researchPreviewExpectations } from './preview-expectations';

const gridMetadata = initResearchGridBonusRepo();
const companionMetadata = Companion.fromBase(initCompanionRepo());
const sushiMetadata = initSushiRepo();
const jellyMetadata = initJellyObstructionRepo();
const mineheadMetadata = initMineheadOpponentRepo();
const eventMetadata = initEventShopBonusRepo();

// Only directly consumed calculations are parameters. Parsed gates remain preparation evidence.
// A missing context pairing fails only its comparison. It does not suppress paired producers.
const parameterSpecs: (ParameterTestSpec & {owner: string})[] = [
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 31)!.data.name + '" effective effect',
        extractionKey: "grid_31_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(31, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 31)!.data.name + '" purchased level',
        extractionKey: "grid_31_1",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(31, 1),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 31)!.data.name + '" secondary effect',
        extractionKey: "grid_31_2",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(31, 2),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 50)!.data.name + '" effective effect',
        extractionKey: "grid_50_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(50, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 50)!.data.name + '" purchased level',
        extractionKey: "grid_50_1",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(50, 1),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 51)!.data.name + '" effective effect',
        extractionKey: "grid_51_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(51, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 51)!.data.name + '" purchased level',
        extractionKey: "grid_51_1",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(51, 1),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 52)!.data.name + '" effective effect',
        extractionKey: "grid_52_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(52, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 70)!.data.name + '" effective effect',
        extractionKey: "grid_70_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(70, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 71)!.data.name + '" effective effect',
        extractionKey: "grid_71_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(71, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 72)!.data.name + '" effective effect',
        extractionKey: "grid_72_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(72, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 72)!.data.name + '" purchased level',
        extractionKey: "grid_72_1",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(72, 1),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 90)!.data.name + '" effective effect',
        extractionKey: "grid_90_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(90, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 90)!.data.name + '" purchased level',
        extractionKey: "grid_90_1",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(90, 1),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 91)!.data.name + '" effective effect',
        extractionKey: "grid_91_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(91, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 91)!.data.name + '" purchased level',
        extractionKey: "grid_91_1",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(91, 1),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 92)!.data.name + '" effective effect',
        extractionKey: "grid_92_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(92, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 93)!.data.name + '" effective effect',
        extractionKey: "grid_93_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(93, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 94)!.data.name + '" secondary effect',
        extractionKey: "grid_94_2",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(94, 2),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 110)!.data.name + '" effective effect',
        extractionKey: "grid_110_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(110, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 111)!.data.name + '" effective effect',
        extractionKey: "grid_111_0",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(111, 0),
    },
    {
        owner: "Research",
        description: 'Research Grid "' + gridMetadata.find(square => square.index === 112)!.data.name + '" secondary effect',
        extractionKey: "grid_112_2",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).getBonusForId(112, 2),
    },
    {
        owner: "Research",
        description: "Farming sticker Research EXP percentage points",
        extractionKey: "farming_sticker",
        domainExtractor: gameData => (gameData.get('farming') as Farming).getStickerBonus(1),
    },
    {
        owner: "Research",
        description: "Crop Scientist Research EXP percentage points",
        extractionKey: "crop_scientist",
        domainExtractor: gameData => (gameData.get('farming') as Farming).cropScientist.getBonus(CropScientistBonusText.ResearchExp),
    },
    {
        owner: "Research",
        description: "Cooking meal Research EXP percentage points",
        extractionKey: "cooking_research",
        domainExtractor: gameData => (gameData.get('cooking') as Cooking).getMealBonusForKey('ResearchXP'),
    },
    {
        owner: "Research",
        description: "Dancing Coral Research EXP percentage points",
        extractionKey: "coral_research",
        domainExtractor: gameData => (gameData.get('dancingCoral') as DancingCoral).getBonusFromIndex(4),
    },
    {
        owner: "Research",
        description: "Zenith Market Research EXP percentage points",
        extractionKey: "zenith_research",
        domainExtractor: gameData => (gameData.get('zenithMarket') as ZenithMarket).getBonusForId(8),
    },
    {
        owner: "Research",
        description: "Gaming Superbit Research EXP from Worship best waves",
        extractionKey: "gaming_research",
        domainExtractor: gameData => (gameData.get('worship') as Worship).totalizer.getResearchExpBonus(),
    },
    {
        owner: "Research",
        description: "Sailing Research EXP from raw Slab registrations",
        extractionKey: "sailing_research",
        domainExtractor: gameData => (gameData.get('sailing') as Sailing).getResearchExpSlabBonus(),
    },
    {
        owner: "Research",
        description: "Spelunking epilogue Research EXP versus the captured native result",
        extractionKey: "epilogue_research",
        domainExtractor: gameData => (gameData.get('spelunking') as Spelunking).getResearchExpEpilogueBonus(
            gameData.get('tome') as Tome,
            gameData.get('grimoire') as Grimoire,
            gameData.get('equipmentSets') as EquipmentSets,
        ),
    },
    {
        owner: "Research",
        description: 'Owned ' + EnemyInfo.find(enemy => enemy.id === 'w7b1')!.details.Name + ' card level, not equipped effect',
        extractionKey: "card_w7b1",
        domainExtractor: gameData => (gameData.get('cards') as Card[]).find(card => card.id === 'w7b1')!.getLevels(),
    },
    {
        owner: "Research",
        description: 'Owned ' + EnemyInfo.find(enemy => enemy.id === 'w7b4')!.details.Name + ' card level, not equipped effect',
        extractionKey: "card_w7b4",
        domainExtractor: gameData => (gameData.get('cards') as Card[]).find(card => card.id === 'w7b4')!.getLevels(),
    },
    {
        owner: "Research",
        description: 'Owned ' + EnemyInfo.find(enemy => enemy.id === 'w7a11')!.details.Name + ' card level, not equipped effect',
        extractionKey: "card_w7a11",
        domainExtractor: gameData => (gameData.get('cards') as Card[]).find(card => card.id === 'w7a11')!.getLevels(),
    },
    {
        owner: "Research",
        description: 'Owned ' + EnemyInfo.find(enemy => enemy.id === 'w7b8')!.details.Name + ' card level, not equipped effect',
        extractionKey: "card_w7b8",
        domainExtractor: gameData => (gameData.get('cards') as Card[]).find(card => card.id === 'w7b8')!.getLevels(),
    },
    {
        owner: "Research",
        description: 'Owned ' + EnemyInfo.find(enemy => enemy.id === 'w7b11')!.details.Name + ' card level, not equipped effect',
        extractionKey: "card_w7b11",
        domainExtractor: gameData => (gameData.get('cards') as Card[]).find(card => card.id === 'w7b11')!.getLevels(),
    },
    {
        owner: "Research",
        description: "Arcade Research EXP percentage points",
        extractionKey: "arcade_research",
        domainExtractor: gameData => (gameData.get('arcade') as Arcade).bonuses[63].getBonus(),
    },
    {
        owner: "Research",
        description: "Raw Prehistoric set bonus before Research cap of 50",
        extractionKey: "prehistoric_raw",
        domainExtractor: gameData => (gameData.get('equipmentSets') as EquipmentSets).getSetBonus('PREHISTORIC_SET', true),
    },
    {
        owner: "Research",
        description: "Spelunking shop Research EXP percentage points",
        extractionKey: "spelunking_shop",
        domainExtractor: gameData => (gameData.get('spelunking') as Spelunking).getUpgradeBonus(63),
    },
    {
        owner: "Research",
        description: "Equinox Research EXP percentage points from source upgrade scale",
        extractionKey: "equinox_research",
        domainExtractor: gameData => (gameData.get('equinox') as Equinox).getResearchExpBonus(),
    },
    {
        owner: "Research",
        description: "The Button Research EXP percentage points",
        extractionKey: "button_research",
        domainExtractor: gameData => (gameData.get('button') as Button).getBonusForIndex(0),
    },
    {
        owner: "Research",
        description: "Killroy source output before Research division by 100",
        extractionKey: "killroy_research",
        domainExtractor: gameData => (gameData.get('killroy') as KillRoy).spelunkingExpMulti,
    },
    {
        owner: "Research",
        description: companionMetadata.find(companion => companion.id === 28)!.name + ' active Research offline reward',
        extractionKey: "companion_28",
        domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 28),
    },
    {
        owner: "Research",
        description: companionMetadata.find(companion => companion.id === 52)!.name + ' active Research EXP reward',
        extractionKey: "companion_52",
        domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 52),
    },
    {
        owner: "Research",
        description: companionMetadata.find(companion => companion.id === 54)!.name + ' active Shape ownership reward',
        extractionKey: "companion_54",
        domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 54),
    },
    {
        owner: "Research",
        description: companionMetadata.find(companion => companion.id === 153)!.name + ' active Research lens, EXP, and offline rewards',
        extractionKey: "companion_153",
        domainExtractor: gameData => getCompanionActiveBonus(gameData.get('companions') as Companion[], 153),
    },
    {
        owner: "Research",
        description: companionMetadata.find(companion => companion.id === 54)!.name + ' owned level-two Research EXP gate',
        extractionKey: "companion_level_two_54",
        domainExtractor: gameData => isCompanionLevelTwo(gameData.get('companions') as Companion[], 54),
    },
    {
        owner: "Research",
        description: companionMetadata.find(companion => companion.id === 153)!.name + ' owned level-two Research EXP and offline gates',
        extractionKey: "companion_level_two_153",
        domainExtractor: gameData => isCompanionLevelTwo(gameData.get('companions') as Companion[], 153),
    },
    {
        owner: "Research",
        description: 'Discovered ' + sushiMetadata.find(sushi => sushi.index === 0)!.data.name + ' Research EXP reward',
        extractionKey: "sushi_0",
        domainExtractor: gameData => (gameData.get('sushi') as SushiStation).getBonusFromIndex(0),
    },
    {
        owner: "Research",
        description: 'Discovered ' + sushiMetadata.find(sushi => sushi.index === 2)!.data.name + ' daily discovery attempt reward',
        extractionKey: "sushi_2",
        domainExtractor: gameData => (gameData.get('sushi') as SushiStation).getBonusFromIndex(2),
    },
    {
        owner: "Research",
        description: 'Discovered ' + sushiMetadata.find(sushi => sushi.index === 4)!.data.name + ' Research offline reward',
        extractionKey: "sushi_4",
        domainExtractor: gameData => (gameData.get('sushi') as SushiStation).getBonusFromIndex(4),
    },
    {
        owner: "Research",
        description: 'Discovered ' + sushiMetadata.find(sushi => sushi.index === 8)!.data.name + ' Research lens reward',
        extractionKey: "sushi_8",
        domainExtractor: gameData => (gameData.get('sushi') as SushiStation).getBonusFromIndex(8),
    },
    {
        owner: "Research",
        description: 'Discovered ' + sushiMetadata.find(sushi => sushi.index === 24)!.data.name + ' Research offline reward',
        extractionKey: "sushi_24",
        domainExtractor: gameData => (gameData.get('sushi') as SushiStation).getBonusFromIndex(24),
    },
    {
        owner: "Research",
        description: 'Discovered ' + sushiMetadata.find(sushi => sushi.index === 30)!.data.name + ' maximum discovery roll reward',
        extractionKey: "sushi_30",
        domainExtractor: gameData => (gameData.get('sushi') as SushiStation).getBonusFromIndex(30),
    },
    {
        owner: "Research",
        description: 'Completed ' + jellyMetadata.find(obstruction => obstruction.index === 0)!.data.name + ' Research EXP reward',
        extractionKey: "jelly_0",
        domainExtractor: gameData => (gameData.get('jellyOperator') as JellyOperator).getObstructionBonus(0),
    },
    {
        owner: "Research",
        description: 'Completed ' + jellyMetadata.find(obstruction => obstruction.index === 7)!.data.name + ' Insight reward',
        extractionKey: "jelly_7",
        domainExtractor: gameData => (gameData.get('jellyOperator') as JellyOperator).getObstructionBonus(7),
    },
    {
        owner: "Research",
        description: 'Completed ' + jellyMetadata.find(obstruction => obstruction.index === 12)!.data.name + ' maximum discovery roll reward',
        extractionKey: "jelly_12",
        domainExtractor: gameData => (gameData.get('jellyOperator') as JellyOperator).getObstructionBonus(12),
    },
    {
        owner: "Research",
        description: 'Completed ' + jellyMetadata.find(obstruction => obstruction.index === 23)!.data.name + ' Research EXP reward',
        extractionKey: "jelly_23",
        domainExtractor: gameData => (gameData.get('jellyOperator') as JellyOperator).getObstructionBonus(23),
    },
    {
        owner: "Research",
        description: 'Completed ' + jellyMetadata.find(obstruction => obstruction.index === 25)!.data.name + ' Kaleidoscope reward',
        extractionKey: "jelly_25",
        domainExtractor: gameData => (gameData.get('jellyOperator') as JellyOperator).getObstructionBonus(25),
    },
    {
        owner: "Research",
        description: 'Completed ' + jellyMetadata.find(obstruction => obstruction.index === 46)!.data.name + ' Research EXP reward',
        extractionKey: "jelly_46",
        domainExtractor: gameData => (gameData.get('jellyOperator') as JellyOperator).getObstructionBonus(46),
    },
    {
        owner: "Research",
        description: 'Completed ' + jellyMetadata.find(obstruction => obstruction.index === 54)!.data.name + ' Research EXP reward',
        extractionKey: "jelly_54",
        domainExtractor: gameData => (gameData.get('jellyOperator') as JellyOperator).getObstructionBonus(54),
    },
    {
        owner: "Research",
        description: 'Defeated ' + mineheadMetadata.find(opponent => opponent.index === 1)!.data.name + ' Research offline reward',
        extractionKey: "minehead_1",
        domainExtractor: gameData => (gameData.get('minehead') as Minehead).getBonusFromIndex(1),
    },
    {
        owner: "Research",
        description: 'Defeated ' + mineheadMetadata.find(opponent => opponent.index === 2)!.data.name + ' Research lens reward',
        extractionKey: "minehead_2",
        domainExtractor: gameData => (gameData.get('minehead') as Minehead).getBonusFromIndex(2),
    },
    {
        owner: "Research",
        description: 'Defeated ' + mineheadMetadata.find(opponent => opponent.index === 10)!.data.name + ' Research offline reward',
        extractionKey: "minehead_10",
        domainExtractor: gameData => (gameData.get('minehead') as Minehead).getBonusFromIndex(10),
    },
    {
        owner: "Research",
        description: 'Defeated ' + mineheadMetadata.find(opponent => opponent.index === 12)!.data.name + ' Research lens reward',
        extractionKey: "minehead_12",
        domainExtractor: gameData => (gameData.get('minehead') as Minehead).getBonusFromIndex(12),
    },
    {
        owner: "Research",
        description: 'Defeated ' + mineheadMetadata.find(opponent => opponent.index === 20)!.data.name + ' Research lens reward',
        extractionKey: "minehead_20",
        domainExtractor: gameData => (gameData.get('minehead') as Minehead).getBonusFromIndex(20),
    },
    {
        owner: "Research",
        description: "Hole Researchy upgrade percentage points",
        extractionKey: "hole_upgrade",
        domainExtractor: gameData => (gameData.get('hole') as Hole).getResearchExpUpgradeBonus(),
    },
    {
        owner: "Research",
        description: "Hole Fountain Research EXP percentage points",
        extractionKey: "hole_fountain",
        domainExtractor: gameData => (gameData.get('hole') as Hole).fountain.getBonus(2, 16),
    },
    {
        owner: "Research",
        description: "Hole Gambit Research offline percentage points with score gate",
        extractionKey: "hole_gambit",
        domainExtractor: gameData => (gameData.get('hole') as Hole).gambit.getBonus(15),
    },
    {
        owner: "Research",
        description: "Sneaking Emporium ownership used by Insight and Kaleidoscopes",
        extractionKey: "em_production",
        domainExtractor: gameData => Number((gameData.get('sneaking') as Sneaking).jadeUpgrades.find(upgrade => upgrade.index === 46)!.purchased),
    },
    {
        owner: "Research",
        description: 'Owned Event Shop ' + eventMetadata.find(bonus => bonus.index === 33)!.data.name + ' Kaleidoscope reward',
        extractionKey: "event_33",
        domainExtractor: gameData => Number((gameData.get('eventShop') as EventShop).isBonusOwned(33)),
    },
    {
        owner: "Research",
        description: 'Owned Event Shop ' + eventMetadata.find(bonus => bonus.index === 34)!.data.name + ' Research lens reward',
        extractionKey: "event_34",
        domainExtractor: gameData => Number((gameData.get('eventShop') as EventShop).isBonusOwned(34)),
    },
    {
        owner: "Research",
        description: 'Owned Event Shop ' + eventMetadata.find(bonus => bonus.index === 35)!.data.name + ' daily discovery attempt reward',
        extractionKey: "event_35",
        domainExtractor: gameData => Number((gameData.get('eventShop') as EventShop).isBonusOwned(35)),
    },
    {
        owner: "Research",
        description: 'Owned Event Shop ' + eventMetadata.find(bonus => bonus.index === 36)!.data.name + ' Shape reward',
        extractionKey: "event_36",
        domainExtractor: gameData => Number((gameData.get('eventShop') as EventShop).isBonusOwned(36)),
    },
    {
        owner: "Research",
        description: "Selected Research Royal Outpost multiplier",
        extractionKey: "outpost_research",
        domainExtractor: gameData => (gameData.get('royalArmory') as RoyalArmory).getResearchExpOutpostMultiplier(),
    },
    {
        owner: "Research",
        description: "Completed Spelunking Lore used by Shape ownership",
        extractionKey: "lore_shape",
        domainExtractor: gameData => Number((gameData.get('spelunking') as Spelunking).tunnels.find(tunnel => tunnel.index === 7)!.loreCompleted),
    },
    {
        owner: "Sailing",
        description: "Slab multiplier prepared for Sailing Research reward",
        extractionKey: "slab_multiplier",
        domainExtractor: gameData => (gameData.get('slab') as Slab).getSlabBonusMultiplier(),
    },
    {
        owner: "Sailing",
        description: "Lab Slab multiplier input for Sailing Research reward",
        extractionKey: "lab_slab",
        domainExtractor: gameData => (gameData.get('lab') as Lab).bonuses[15].getBonus(),
    },
    {
        owner: "Spelunking",
        description: "Account-highest Tome score versus the captured native Tome total",
        extractionKey: "tome_reference",
        domainExtractor: gameData => (gameData.get('tome') as Tome).getHighestScore(),
    },
    {
        owner: "Spelunking",
        description: "Grimoire epilogue bonus used by Spelunking Research reward",
        extractionKey: "grimoire_epilogue",
        domainExtractor: gameData => (gameData.get('grimoire') as Grimoire).getUpgradeBonus(17),
    },
    {
        owner: "Spelunking",
        description: "Raw Troll set bonus used by Spelunking epilogue",
        extractionKey: "troll_raw",
        domainExtractor: gameData => (gameData.get('equipmentSets') as EquipmentSets).getSetBonus('TROLL_SET', true),
    },
    {
        owner: "Hole",
        description: "Calculated Gambit total score used by Research offline reward",
        extractionKey: "gambit_score",
        domainExtractor: gameData => (gameData.get('hole') as Hole).gambit.getGambitTotalScore(),
    },
    {
        owner: "Hole",
        description: "Gambit score multiplier used before reward score gates",
        extractionKey: "gambit_points_multiplier",
        domainExtractor: gameData => (gameData.get('hole') as Hole).gambit.gambitPointsMulti,
    },
    {
        owner: "Hole",
        description: "Gambit Research offline reward score requirement",
        extractionKey: "gambit_score_requirement",
        domainExtractor: gameData => (gameData.get('hole') as Hole).gambit.bonuses.find(bonus => bonus.index === 15)!.getScoreThreshold(),
    },
    {
        owner: "Hole",
        description: "Measurement Gambit score percentage points",
        extractionKey: "gambit_measurement_13",
        domainExtractor: gameData => (gameData.get('hole') as Hole).measurements.find(measurement => measurement.index === 13)!.getBonus(),
    },
    {
        owner: "Hole",
        description: "Bolaia study Gambit score percentage points",
        extractionKey: "gambit_study_13",
        domainExtractor: gameData => (gameData.get('hole') as Hole).getStudyBolaiaBonuses(13),
    },
    {
        owner: "Hole",
        description: "Schematic Gambit score percentage points",
        extractionKey: "gambit_schematic_78",
        domainExtractor: gameData => (gameData.get('hole') as Hole).schematics.find(schematic => schematic.index === 78)!.getBonus(10),
    },
    {
        owner: "Hole",
        description: "Wisdom monument Gambit score percentage points",
        extractionKey: "gambit_wisdom_7",
        domainExtractor: gameData => (gameData.get('hole') as Hole).monuments.monuments['Wisdom'].bonuses.find(bonus => bonus.index === 7)!.getBonus(),
    },
    {
        owner: "Hole",
        description: "First jar collectible Gambit score percentage points",
        extractionKey: "gambit_jar_23",
        domainExtractor: gameData => (gameData.get('hole') as Hole).jar.getBonus(23),
    },
    {
        owner: "Hole",
        description: "Second jar collectible Gambit score percentage points",
        extractionKey: "gambit_jar_30",
        domainExtractor: gameData => (gameData.get('hole') as Hole).jar.getBonus(30),
    },
    {
        owner: "Hole",
        description: "Tesseract upgrade Gambit score percentage points",
        extractionKey: "gambit_tesseract_47",
        domainExtractor: gameData => (gameData.get('tesseract') as Tesseract).getUpgradeBonus(47),
    },
    {
        owner: "Hole",
        description: "Gambit measurement base bonus before the Deathnote multiplier",
        extractionKey: "gambit_measurement_base_13",
        domainExtractor: gameData => (gameData.get('hole') as Hole).measurements.find(measurement => measurement.index === 13)!.getMeasurementBaseBonus(),
    },
    {
        owner: "Hole",
        description: "Deathnote multiplier used by the Gambit measurement",
        extractionKey: "gambit_measurement_multi_6",
        domainExtractor: gameData => (gameData.get('hole') as Hole).measurements.find(measurement => measurement.index === 13)!.getMeasurementMulti(),
    },
    {
        owner: "Hole",
        description: "Deathnote rank total across all seven worlds used by the Gambit measurement",
        extractionKey: "gambit_deathnote_world_total",
        domainExtractor: gameData => (gameData.get('deathnote') as Deathnote).getTotalWorldRank(),
    },
    {
        owner: "Hole",
        description: "Lengthmeister measurement bonus percentage points used by the Gambit measurement base",
        extractionKey: "gambit_measurement_cosmos",
        domainExtractor: gameData => (gameData.get('hole') as Hole).majiks.VillageUpgrades.find(upgrade => upgrade.index === 12)!.getBonus(),
    },
    {
        owner: "Research",
        description: "Shared Research EXP multiplier used by every Observation",
        extractionKey: "exp_multiplier",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).production.expMultiplier,
    },
    {
        owner: "Research",
        description: "Shared Kaleidoscope adjacent boost fraction used by Observation support",
        extractionKey: "kaleidoscope_base",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).production.kaleidoscopeBoostPercent / 100,
    },
    {
        owner: "Research",
        description: "Eligible Observation count used by production and discovery totals",
        extractionKey: "eligible_count",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).progress.eligibleObservationCount,
    },
    {
        owner: "Research",
        description: "Owned lens total used by Posty Note ownership context",
        extractionKey: "owned_lenses",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).lensOwnership.total,
    },
    {
        owner: "Research",
        description: "Observation lens capacity used by Posty Note context",
        extractionKey: "lens_capacity",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).lensOwnership.capacityPerObservation,
    },
    {
        owner: "Research",
        description: "Current Shape ownership used by capped Posty Note context",
        extractionKey: "shape_count",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).shapeOwnership.count,
    },
    {
        owner: "Research",
        description: "Shape rotation unlock used by Posty Note context",
        extractionKey: "rotation_unlocked",
        domainExtractor: gameData => Number((gameData.get('research') as ResearchGrid).shapeOwnership.rotationUnlocked),
    },
    {
        owner: "Research",
        description: "Points-per-ten-level term used by cumulative Posty Note context",
        extractionKey: "point_term",
        domainExtractor: gameData => (gameData.get('research') as ResearchGrid).pointMilestone.pointsPerTenLevelBlock,
    },
];

describe('Research direct calculation parameters and producer preparation', () => {
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

    const extracted = <T,>(label: string): T => {
        if (results.errors[label]) throw new Error(results.errors[label].error);
        if (!results.extractions[label]) throw new Error('Missing original-game extraction: ' + label);
        return results.extractions[label].result as T;
    };
    const value = (label: string): number => {
        extracted(label);
        return getExtractedValue(results, label);
    };

    ['Research', 'Sailing', 'Spelunking', 'Hole'].forEach(owner => {
        describe(owner + ' direct parameters', () => {
            parameterSpecs.filter(spec => spec.owner === owner).forEach(spec => {
                const key = spec.extractionKey;
                const previewKey = key === 'owned_lenses' || key === 'lens_capacity' || key === 'shape_count' || key === 'point_term' ? key : undefined;
                it((previewKey ? 'reports website preview or matches native ' : 'matches ') + spec.description, () => {
                    const expected = previewKey
                        ? researchExpected(preview, previewKey, () => value(previewKey))
                        : value(key);
                    expect(spec.domainExtractor(gameData)).toMatchLiveGame(expected, 0);
                });
            });
        });
    });

    it('prepares Worship Totalizer with the actual Worship best-wave total', () => {
        expect((gameData.get('worship') as Worship).totalizer.totalWaves).toMatchLiveGame(value('worship_waves'), 0);
    });


    initResearchObservationRepo().forEach(({index, data}) => {
        it('matches ' + data.name + ' Kaleidoscope support used by EXP and Insight', () => {
            expect(research.observations[index].kaleidoscopeMultiplier).toMatchLiveGame(extracted<number[]>('observation_support')[index], 0);
        });

        it('matches ' + data.name + ' Insight requirement used by its progress display', () => {
            expect(research.observations[index].nextInsightRequirement).toMatchLiveGame(extracted<number[]>('observation_requirements')[index], 0);
        });

        it('matches ' + data.name + ' EXP subtotal used by the eligible account aggregate', () => {
            expect(research.observations[index].expBeforeSharedMultiplierPerHour).toMatchLiveGame(extracted<number[]>('observation_subtotals')[index], 0);
        });

        it('matches ' + data.name + ' actual Insight rate used by the eligible account aggregate', () => {
            const expected = index < value('eligible_count') ? extracted<number[]>('observation_insight_rates')[index] : 0;
            expect(research.observations[index].insightAccrualPerHour).toMatchLiveGame(expected, 0);
        });
    });
});
