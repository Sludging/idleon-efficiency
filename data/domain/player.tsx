import { StarSignMap, StarSign, StarSigns } from './starsigns';
import { Box, initPostOffice, PostOfficeConst } from './postoffice';
import { ClassIndex, Talent, ClassTalentMap, GetTalentArray, TalentConst, ApocalypseChowTalent, EnhancedTalent, BloodMarrowTalent } from './talents';
import { Card, CardInfo, Cards } from "./cards";
import { Item, Food, Tool, StoneProps } from "./items";
import { notUndefined, range } from '../utility';
import { Cloudsave } from "./cloudsave";
import { EnemyData, EnemyInfo } from "./enemies";
import { MapInfo } from "./maps";
import { Chip, chipSlotReq, Lab } from "./lab";
import { Alchemy, Bubble, CauldronIndex } from "./alchemy";
import { Guild } from "./guild";
import { Bribe } from "./bribes";
import { Stat } from "./base/stat";
import { Family } from "./family";
import { Prayer } from "./prayers";
import { Cooking } from "./cooking";
import { Breeding } from "./breeding";
import { Dungeons, PassiveType } from "./dungeons";
import { Stamp, StampConsts, StampTab } from "./world-1/stamps";
import { Achievement, AchievementConst } from "./achievements";
import { safeJsonParse } from "./idleonData";
import { Arcade } from "./arcade";
import { ObolsData, ObolStats } from "./obols";
import { ImageData } from "./imageData";
import { Sigils } from "./sigils";
import { SkillsIndex } from './SkillsIndex';
import { AFKTypeEnum } from './enum/aFKTypeEnum';
import { Shrine, ShrineConstants } from './shrines';
import { Divinity } from './divinity';
import { Deathnote } from './deathnote';
import { Domain, RawData } from './base/domain';
import { Equinox } from './equinox';
import { BeanstalkingBonusType, Sneaking } from './world-6/sneaking';
import { Account } from './account';
import { IslandExpeditions } from './islandExpedition';
import { TaskBoard } from './tasks';
import { Grimoire } from './grimoire';
import { Tesseract } from './tesseract';
import { EquipmentSets } from './misc/equipmentSets';
import { LegendTalents } from './world-7/legendTalents';
import { Companion } from './companions';
import { Votes } from './world-2/votes';

export class PlayerStats {
    strength: number = 0;
    agility: number = 0;
    wisdom: number = 0;
    luck: number = 0;

    constructor() { }

    setStats(statsArray: Array<number>) {
        this.strength = statsArray[0];
        this.agility = statsArray[1];
        this.wisdom = statsArray[2];
        this.luck = statsArray[3];
    }
}

export class PlayerEquipment {
    equipment: Array<Item | undefined>;
    tools: Array<Tool | undefined>;
    food: Array<Food | undefined>;

    constructor() {
        this.equipment = [];
        this.tools = [];
        this.food = [];
    }
}

export class SkillData {
    constructor(public level: number, public currentXP: number, public xpReq: number) { }
}

export class ChipSlot {
    constructor(public chip: Chip | undefined, public lvlReq: number) { }
}

export enum Activity {
    Skilling = "Skilling",
    Fighting = "Fighting",
    Lab = "Lab",
    Divinity = "Divinity",
    Unknown = "Unknown",
}

interface LabInfo {
    lineWidth: number
    supped: boolean
    chips: ChipSlot[]
}

export enum TalentTab {
    FirstTab = "Basics",
    SecondTab = "Class",
    ThirdTab = "Subclass",
    FourthTab = "Elite Class",
    FifthTab = "",
    SpecialTab = "Star Talents"
}

interface TalentPoints {
    tab: TalentTab
    spent: number
    totalOwned: number
}

export class Player {
    playerID: number;
    playerName: string;
    gear: PlayerEquipment = new PlayerEquipment();
    stats: PlayerStats = new PlayerStats();
    level: number = 0; // combine to one "class" class
    class: string = "Blank"; // combine to one "class" class
    classId: ClassIndex = ClassIndex.Beginner; // combine to one "class" class
    classExp: number = 0;
    classExpReq: number = 0;
    currentMonster: EnemyData | undefined; // TODO: Do BETTER!
    currentMap: string = "Blank";
    currentMapId: number = 0;
    starSigns: StarSign[] = [];
    money: number = 0;
    skills: Map<SkillsIndex, SkillData>;
    skillsRank: Map<SkillsIndex, number>;
    talents: Talent[] = [];
    talentPoints: TalentPoints[] = [];
    postOffice: Box[] = initPostOffice();
    activeBubblesString: string[] = [];
    activeBubbles: Bubble[] = [];
    afkFor: number = 0;
    currentCharge: number = 0;
    cardInfo: CardInfo | undefined = undefined; // TODO: Do BETTER!
    activeBuffs: Talent[] = [];
    activePrayers: number[] = [];
    cooldown: Map<Talent, number> = new Map();
    invBagsUsed: Record<string, number> = {};
    labInfo: LabInfo = {
        lineWidth: 0,
        supped: false,
        chips: [...Array(chipSlotReq.length)].map((_, index) => new ChipSlot(undefined, chipSlotReq[index])),
    };
    killInfo: Map<number, number> = new Map();
    obolStats: ObolStats[] = [];
    // Stats
    doubleClaimChance: Stat = new Stat("Double XP Chance", "%");
    monsterCash: Stat = new Stat("Monster Cash", "x");
    crystalChance: Stat = new Stat("Crystal Spawn Chance", undefined, "1 in ");

    // Misc
    extraLevelsFromTalent: number = 0;
    extraLevelsFromBear: number = 0;
    extraLevelsFromES: number = 0;
    extraLevelsFromSlug: number = 0;
    extraLevelsFromEquinox: number = 0;
    extraLevelsFromNinjaMastery: number = 0;
    extraLevelsFromAchievements: number = 0;
    extraLevelsFromKattlekrukSet: number = 0;
    extraLevelsFromGrimoire: number = 0;
    extraLevelsFromTesseract: number = 0;

    constructor(playerID: number, playerName: string) {
        this.playerID = playerID;
        this.playerName = playerName;
        this.skills = new Map<SkillsIndex, SkillData>();
        this.skillsRank = new Map<SkillsIndex, number>();
    }

    getBaseClass = (): ClassIndex => {
        switch (this.classId) {
            case ClassIndex.Beginner:
            case ClassIndex.Journeyman:
            case ClassIndex.Maestro:
            case ClassIndex.Voidwalker:
            case ClassIndex.Infinilyte:
                return ClassIndex.Beginner;
            case ClassIndex.Warrior:
            case ClassIndex.Barbarian:
            case ClassIndex.Squire:
            case ClassIndex.Blood_Berserker:
            case ClassIndex.Death_Bringer:
            case ClassIndex.Divine_Knight:
            case ClassIndex.Royal_Guardian:
                return ClassIndex.Warrior;
            case ClassIndex.Archer:
            case ClassIndex.Bowman:
            case ClassIndex.Hunter:
            case ClassIndex.Siege_Breaker:
            case ClassIndex.Mayheim:
            case ClassIndex.Wind_Walker:
            case ClassIndex.Beast_Master:
                return ClassIndex.Archer;
            case ClassIndex.Mage:
            case ClassIndex.Wizard:
            case ClassIndex.Shaman:
            case ClassIndex.Elemental_Sorcerer:
            case ClassIndex.Spiritual_Monk:
            case ClassIndex.Bubonic_Conjuror:
            case ClassIndex.Arcane_Cultist:
                return ClassIndex.Mage;
            default: return ClassIndex.Beginner; // Is this really the best default?
        }
    }

    getSubClass = (): ClassIndex => {
        switch (this.classId) {
            case ClassIndex.Maestro:
            case ClassIndex.Voidwalker:
            case ClassIndex.Infinilyte:
                return ClassIndex.Maestro;
            case ClassIndex.Barbarian:
            case ClassIndex.Blood_Berserker:
            case ClassIndex.Death_Bringer:
                return ClassIndex.Barbarian;
            case ClassIndex.Squire:
            case ClassIndex.Divine_Knight:
            case ClassIndex.Royal_Guardian:
                return ClassIndex.Squire;
            case ClassIndex.Bowman:
            case ClassIndex.Siege_Breaker:
            case ClassIndex.Mayheim:
                return ClassIndex.Bowman;
            case ClassIndex.Hunter:
            case ClassIndex.Beast_Master:
            case ClassIndex.Wind_Walker:
                return ClassIndex.Hunter;
            case ClassIndex.Wizard:
            case ClassIndex.Elemental_Sorcerer:
            case ClassIndex.Spiritual_Monk:
                return ClassIndex.Wizard;
            case ClassIndex.Shaman:
            case ClassIndex.Bubonic_Conjuror:
            case ClassIndex.Arcane_Cultist:
                return ClassIndex.Shaman;
            default: return ClassIndex.None;
        }
    }

    getEliteClass = (): ClassIndex => {
        switch (this.classId) {
            case ClassIndex.Voidwalker:
            case ClassIndex.Infinilyte:
                return ClassIndex.Voidwalker;
            case ClassIndex.Blood_Berserker:
            case ClassIndex.Death_Bringer:
                return ClassIndex.Blood_Berserker;
            case ClassIndex.Divine_Knight:
            case ClassIndex.Royal_Guardian:
                return ClassIndex.Divine_Knight;
            case ClassIndex.Siege_Breaker:
            case ClassIndex.Mayheim:
                return ClassIndex.Siege_Breaker;
            case ClassIndex.Beast_Master:
            case ClassIndex.Wind_Walker:
                return ClassIndex.Beast_Master;
            case ClassIndex.Elemental_Sorcerer:
            case ClassIndex.Spiritual_Monk:
                return ClassIndex.Elemental_Sorcerer;
            case ClassIndex.Bubonic_Conjuror:
            case ClassIndex.Arcane_Cultist:
                return ClassIndex.Bubonic_Conjuror;
            default: return ClassIndex.None;
        }
    }

    getPlayerLetter = () => {
        switch (this.playerID) {
            case 0: return "_";
            case 1: return "a";
            case 2: return "b";
            case 3: return "c";
            case 4: return "d";
            case 5: return "e";
            case 6: return "f";
            case 7: return "g";
            case 8: return "h";
            case 9: return "i";
            default: return '';
        }
    }

    getClassImageData = (): ImageData => {
        return {
            location: `ClassIcons${this.classId.valueOf()}`,
            height: 36,
            width: 38
        }
    }

    getTalentBonus = (skillIndex: number) => {
        return this.talents.find(talent => talent.skillIndex == skillIndex)?.getBonus() ?? 0;
    }

    getTalent = (skillIndex: number) => {
        return this.talents.find(talent => talent.skillIndex == skillIndex);
    }
    
    markTalentAsEnhanced = (skillIndex: number) => {
        const talent = this.talents.find(talent => talent.skillIndex == skillIndex);
        if (talent && talent instanceof EnhancedTalent) {
            talent.isEnhanced = true;
        }
    }

    getTalentEnhancedBonus = (skillIndex: number) => {
        return this.talents.find(talent => talent.skillIndex == skillIndex)?.getEnhancedBonus() ?? 0;
    }

    getTalentMaxLevel = (skillIndex: number) => {
        return this.talents.find(talent => talent.skillIndex == skillIndex)?.maxLevel ?? 0;
    }

    getCurrentCooldown = (skillIndex: number) => {
        const skillCooldown = [...this.cooldown.entries()].filter(([talent, _]) => talent.skillIndex == skillIndex).pop()
        if (skillCooldown) {
            return Math.max(0, skillCooldown[1] - this.afkFor);
        }
        return 0;
    }

    getGoldFoodMulti = (familyBonus: number = 0, goldFoodStampBonus: number = 0, achievement37: boolean, achievement380: boolean, achievement383: boolean, sigilBonus: number, bubbleBonus: number, zGoldFoodMealBonus: number, starSign69: number, bribeBonus36: number, pristineBonus14: number, equipmentSetBonus: number, votingBonus26: number, apocalypseWoW: number , companion48: number, legendTalentBonus25: number, cropfallEvent1Card: number) => {
        const gearBonus = this.gear.equipment.reduce((sum, gear) => sum += gear?.getMiscBonus("Gold Food Effect") ?? 0, 0);

        const setBonus = (1 + equipmentSetBonus / 100);
        return setBonus * ((Math.max(familyBonus, 1) + gearBonus + (this.talents.find(skill => skill.skillIndex == 99)?.getBonus() ?? 0) + goldFoodStampBonus + (achievement37 ? 5 : 0) + bubbleBonus + sigilBonus + zGoldFoodMealBonus + starSign69 + bribeBonus36 + pristineBonus14 + (achievement380 ? 2 : 0) + (achievement383 ? 3 : 0) + votingBonus26 + apocalypseWoW + companion48 + legendTalentBonus25 + Math.min(cropfallEvent1Card, 50)) / 100);
    }

    getMiscBonusFromGear = (bonusType: string) => {
        let gearBonus = 0;
        this.gear.equipment.forEach((gear, index) => {
            if (gear) {

                if (index == 3 && this.labInfo.chips.find(chip => chip.chip?.index == 18) != undefined ||  // Pendant
                    index == 10 && this.labInfo.chips.find(chip => chip.chip?.index == 16) != undefined || // Trophy
                    index == 9 && this.labInfo.chips.find(chip => chip.chip?.index == 17) != undefined) {  // Upper Keychain
                    gearBonus += gear.getMiscBonus(bonusType) * 2;
                }
                else {
                    gearBonus += gear.getMiscBonus(bonusType)
                }
            }
        })
        gearBonus = this.obolStats.flatMap(stat => stat.stats).filter(stat => stat.extra.includes(bonusType)).reduce((sum, stat) => sum += stat.getValue(), gearBonus);

        return gearBonus;
    }

    setDoubleClaimChance = (bubbleBonus: number, bribeBonus: number, guildBonus: number) => {
        const cardBonus = Card.GetTotalBonusForId(this.cardInfo?.equippedCards ?? [], 47);
        const lazyCrateBox = this.postOffice.find(box => box.name == "Lazzzy Lootcrate");
        const boxBonus = lazyCrateBox?.bonuses[0].getBonus(lazyCrateBox.level, 0) ?? 0;

        // Reset any existing data, since next section should include all the required info.
        this.doubleClaimChance.sources = [];

        this.doubleClaimChance.value = Math.min(75, bubbleBonus + bribeBonus + guildBonus + Math.min(cardBonus, 20) + boxBonus);
        this.doubleClaimChance.sources.push({ name: "Card", value: cardBonus });
        this.doubleClaimChance.sources.push({ name: "Post Office", value: boxBonus });
        this.doubleClaimChance.sources.push({ name: "Alchemy Bubble", value: bubbleBonus });
        this.doubleClaimChance.sources.push({ name: "Bribe", value: bribeBonus });
        this.doubleClaimChance.sources.push({ name: "Guild", value: guildBonus });
        this.doubleClaimChance.max = 75;
    }

    setMonsterCash = (strBubbleBonus: number, wisBubbleBonus: number, agiBubbleBonus: number, mealBonus: number,
        petArenaBonus1: number, petArenaBonus2: number, labBonus: number, pristineBonus: number, vialBonus: number, dungeonBonus: number, guildBonus: number,
        family: Family, goldFoodStampBonus: number, goldFoodAchievement37: boolean, goldFoodAchievement380: boolean, goldFoodAchievement383: boolean, prayers: Prayer[], 
        arcadeBonus: number, sigilBonus: number, bubbleBonus: number, zGoldFoodMealBonus: number, bribeBonus36: number, pristineBonus14: number, beanstalkingStack: number, 
        beanstalkingItem: Food | undefined, equipmentSetBonus: number, votingBonus26: number, apocalypseWoW: number, companion48: number, legenTalent25: number, cropFallEventCard: number) => {
        const gearBonus = this.getMiscBonusFromGear("Money");
        const goldFoodBoost = this.getGoldFoodMulti(family.classBonus.get(ClassIndex.Shaman)?.getBonus(this) ?? 0, goldFoodStampBonus, goldFoodAchievement37, goldFoodAchievement380, goldFoodAchievement383, sigilBonus, bubbleBonus, zGoldFoodMealBonus, this.starSigns.find(sign => sign.name == "Beanbie Major")?.getBonus("Golden Food") ?? 0, bribeBonus36, pristineBonus14, equipmentSetBonus, votingBonus26, apocalypseWoW, companion48, legenTalent25, cropFallEventCard);
        const goldenFoodBonus = this.gear.food.filter(food => food && food.goldenFood != undefined && food.description.includes("Boosts coins dropped"))
            .reduce((sum, food) => sum += (food as Food).goldFoodBonus(food?.count ?? 0, goldFoodBoost), 0);
        const beanstalkingBonus = beanstalkingItem?.goldFoodBonus(beanstalkingStack, goldFoodBoost) ?? 0;
        const cardBonus = Card.GetTotalBonusForId(this.cardInfo?.equippedCards ?? [], 11);
        const poBox = this.postOffice.find(box => box.index == 13);
        const boxBonus = poBox?.bonuses[2].getBonus(poBox.level, 2) ?? 0;
        const prayerBonus = this.activePrayers.filter(prayer => prayer == 8).length > 0 ? (this.activePrayers.filter(prayer => prayer == 8).map(prayer => prayers.find(actual => actual.index == prayer)?.getBonus() ?? 0)[0]) : 0;

        const bubbleAtrributeMath = (strBubbleBonus * Math.floor(this.stats.strength / 250))
            + (agiBubbleBonus * Math.floor(this.stats.agility / 250))
            + (wisBubbleBonus * Math.floor(this.stats.wisdom / 250))
        const baseMath = (1 + (bubbleAtrributeMath / 100)) *
            (1 + mealBonus / 100) *
            (1 + (petArenaBonus1 * 0.5) + petArenaBonus2) *
            (1 + labBonus / 100) *
            (1 + pristineBonus / 100) *
            (1 + prayerBonus / 100)

        const americaTipper = (this.talents.find(talent => talent.skillIndex == 644)?.getBonus() ?? 0) * ((this.skills.get(SkillsIndex.Cooking)?.level ?? 0) / 10);
        const currentWorldBonus = 1 + Math.floor(this.currentMapId / 50);
        this.monsterCash.value = baseMath *
            (1 + (vialBonus + gearBonus + cardBonus + (this.talents.find(talent => talent.skillIndex == 22)?.getBonus() ?? 0)
                + dungeonBonus + arcadeBonus + boxBonus + (guildBonus * currentWorldBonus) +
                (this.talents.find(talent => talent.skillIndex == 643)?.getBonus() ?? 0) +
                americaTipper +
                goldenFoodBonus + beanstalkingBonus) / 100);

        // Reset any existing data, since next section should include all the required info.
        this.monsterCash.sources = [];

        this.monsterCash.sources.push({ name: "Prayer (*)", value: prayerBonus });
        this.monsterCash.sources.push({ name: "Alchemy Bubbles (STR/AGI/WIS) (*)", value: bubbleAtrributeMath });
        this.monsterCash.sources.push({ name: "Meals (*)", value: mealBonus });
        this.monsterCash.sources.push({ name: "Pet Arena (*)", value: ((petArenaBonus1 * 0.5) + petArenaBonus2) * 100 });
        this.monsterCash.sources.push({ name: "Lab Bonus (*)", value: labBonus });
        this.monsterCash.sources.push({ name: "Equipment", value: gearBonus });
        this.monsterCash.sources.push({ name: "Gold Food", value: goldenFoodBonus });
        this.monsterCash.sources.push({ name: "Card", value: cardBonus });
        this.monsterCash.sources.push({ name: "Post Office", value: boxBonus });
        this.monsterCash.sources.push({ name: "Vial", value: vialBonus });
        this.monsterCash.sources.push({ name: "Guild + World bonus", value: (guildBonus * currentWorldBonus) });
        this.monsterCash.sources.push({ name: "Dungeons Bonus", value: dungeonBonus });
        this.monsterCash.sources.push({ name: "Arcade", value: arcadeBonus });
        this.monsterCash.sources.push({
            name: "Talents", value: (this.talents.find(talent => talent.skillIndex == 643)?.getBonus() ?? 0) +
                americaTipper + (this.talents.find(talent => talent.skillIndex == 22)?.getBonus() ?? 0)
        });
        this.monsterCash.sources.push({ name: "Pristine Charm (*)", value: pristineBonus});
        this.monsterCash.sources.push({ name: "Beanstalking (*)", value: beanstalkingBonus});
    }

    setCrystalChance = (crystalSpawnStamp: number, crystalShrine: Shrine) => {
        const shrineBonus = crystalShrine.getBonus(this.currentMapId);
        const cardBonus = this.cardInfo?.equippedCards.filter((card) => card.data.effect.includes("Crystal Mob Spawn Chance")).reduce((sum, card) => sum += card.getBonus(), 0) ?? 0;
        const crystalSpawnTalentBonus = this.talents.find(x => x.skillIndex == TalentConst.CrystalSpawnIndex)?.getBonus() ?? 0;
        const crystalForDaysTalentBonus = this.talents.find(x => x.skillIndex == TalentConst.CrystalForDaysIndex)?.getBonus() ?? 0;

        let postOfficeBonus = 0;
        if (this.postOffice) {
            const nonPredatoryBox = this.postOffice[PostOfficeConst.NonPredatoryBoxIndex];
            postOfficeBonus = nonPredatoryBox.level > 0 ? nonPredatoryBox.bonuses[2].getBonus(nonPredatoryBox.level, 2) : 0;
        }

        const spawnChance = 5e-4 *
            (1 + crystalSpawnTalentBonus / 100) *
            (1 + (postOfficeBonus + shrineBonus) / 100) *
            (1 + crystalForDaysTalentBonus / 100) *
            (1 + crystalSpawnStamp / 100) *
            (1 + cardBonus / 100);

        this.crystalChance.value = Math.floor(1 / spawnChance);

        // Reset any existing data, since next section should include all the required info.
        this.crystalChance.sources = [];

        this.crystalChance.sources.push({ name: "Shrine", value: shrineBonus });
        this.crystalChance.sources.push({ name: "Cards", value: cardBonus });
        this.crystalChance.sources.push({ name: "Stamp", value: crystalSpawnStamp });
        this.crystalChance.sources.push({ name: "Talents", value: crystalForDaysTalentBonus + crystalSpawnTalentBonus });
        this.crystalChance.sources.push({ name: "Post Office", value: postOfficeBonus });
    }

    getActivityType = (): Activity => {
        if (this.currentMonster && this.currentMonster.details) {
            switch (this.currentMonster.details.AFKtype) {
                case AFKTypeEnum.Catching:
                case AFKTypeEnum.Choppin:
                case AFKTypeEnum.Cooking:
                case AFKTypeEnum.Fishing:
                case AFKTypeEnum.Mining:
                case AFKTypeEnum.Spelunking:
                    return Activity.Skilling;
                case AFKTypeEnum.Divinity:
                    return Activity.Divinity;
                case AFKTypeEnum.Fighting:
                    return Activity.Fighting;
                case AFKTypeEnum.Laboratory:
                    return Activity.Lab;
                default:
                    return Activity.Unknown
            }
        }
        else {
            return Activity.Unknown;
        }
    }

    static getActivityIcon = (afkType?: AFKTypeEnum): ImageData => {
        let imageLocation: string;
        switch (afkType) {
            case AFKTypeEnum.Catching:
                imageLocation = "ClassIcons47";
                break;
            case AFKTypeEnum.Choppin:
                imageLocation = "ClassIcons44";
                break;
            case AFKTypeEnum.Cooking:
                imageLocation = "ClassIcons51";
                break;
            case AFKTypeEnum.Fishing:
                imageLocation = "ClassIcons45";
                break;
            case AFKTypeEnum.Mining:
                imageLocation = "ClassIconsM";
                break;
            case AFKTypeEnum.Divinity:
                imageLocation = "ClassIcons55";
                break;
            case AFKTypeEnum.Fighting:
                imageLocation = "ClassIconsF";
                break;
            case AFKTypeEnum.Laboratory:
                imageLocation = "ClassIcons53";
                break;
            case AFKTypeEnum.PayingRespect:
                imageLocation = "ClassIconsFc";
                break;
            case AFKTypeEnum.Nothing:
                imageLocation = "ClassIconsNA1";
                break;
            case AFKTypeEnum.PayingRespect:
                imageLocation = "ClassIconsFc";
                break;
            case AFKTypeEnum.Spelunking:
                imageLocation = "ClassIcons60";
                break;
            default:
                imageLocation = "ClassIconsNA2";
                break;
        }

        return {
            location: imageLocation,
            height: 38,
            width: 36
        }
    }
}

const keyFunctionMap: Record<string, Function> = {
    "equipment": (doc: Cloudsave, player: Player, allItems: Item[]) => parseEquipment(doc.get(`EquipOrder_${player.playerID}`), doc.get(`EquipQTY_${player.playerID}`), JSON.parse(doc.get(`EMm0_${player.playerID}`)), JSON.parse(doc.get(`EMm1_${player.playerID}`)), player, allItems),
    "stats": (doc: Cloudsave, player: Player) => parseStats(doc.get(`PVStatList_${player.playerID}`), doc.get(`Lv0_${player.playerID}`), doc.get(`Exp0_${player.playerID}`), doc.get(`ExpReq0_${player.playerID}`), player),
    "class": (doc: Cloudsave, player: Player) => {
        player.class = ClassIndex[doc.get(`CharacterClass_${player.playerID}`)]?.replace(/_/g, " ") || "New Class?";
        player.classId = doc.get(`CharacterClass_${player.playerID}`) as ClassIndex;
    },
    "monster": (doc: Cloudsave, player: Player) => { player.currentMonster = EnemyInfo.find(enemy => enemy.id == doc.get(`AFKtarget_${player.playerID}`)) || doc.get(`AFKtarget_${player.playerID}`); },
    "map": (doc: Cloudsave, player: Player) => parseMap(doc.get(`CurrentMap_${player.playerID}`), player),
    "starsigns": (doc: Cloudsave, player: Player) => parseStarSigns(doc.get(`PVtStarSign_${player.playerID}`), player),
    "money": (doc: Cloudsave, player: Player) => { player.money = doc.get(`Money_${player.playerID}`) },
    "skills": (doc: Cloudsave, player: Player) => parseSkills(doc.get(`Lv0_${player.playerID}`), doc.get(`Exp0_${player.playerID}`), doc.get(`ExpReq0_${player.playerID}`), player),
    "talents": (doc: Cloudsave, player: Player) => parseTalents(
        doc.get(`SL_${player.playerID}`),
        doc.get(`SM_${player.playerID}`),
        player
    ),
    "postoffice": (doc: Cloudsave, player: Player) => parsePostOffice(doc.get(`POu_${player.playerID}`), player),
    "activeBubbles": (doc: Cloudsave, player: Player) => { player.activeBubblesString = (JSON.parse(doc.get('CauldronBubbles')) as string[][])[player.playerID] },
    "timeaway": (doc: Cloudsave, player: Player) => {
        const timeAway = JSON.parse(doc.get('TimeAway'));
        const time = new Date()
        const gapFromLastSave = (time.getTime() / 1000) - timeAway['Player'];
        // If less than 5 mintues from last time save was updated, just rely on save data
        if (gapFromLastSave < 60 * 5) {
            player.afkFor = timeAway['Player'] - (doc.get(`PTimeAway_${player.playerID}`) * 1000);
        }
        else {
            // otherwise try and guess the AFK time based by adding the time gap from now and last save time;
            player.afkFor = (timeAway['Player'] - (doc.get(`PTimeAway_${player.playerID}`) * 1000)) + gapFromLastSave;
        }

    },
    "playerstuff": (doc: Cloudsave, player: Player) => {
        const jsonStuff = safeJsonParse(doc, `PlayerStuff_${player.playerID}`, []);
        if (jsonStuff.length > 0) {
            player.currentCharge = jsonStuff[0];
        }
    },
    "cards": (doc: Cloudsave, player: Player) => {
        const currentCardSet = safeJsonParse(doc, `CSetEq_${player.playerID}`, new Map());
        const equippedCards = doc.get(`CardEquip_${player.playerID}`) as string[];
        const cards = safeJsonParse(doc, 'Cards0', {});
        player.cardInfo = new CardInfo(cards, currentCardSet, equippedCards);
    },
    "activebuffs": (doc: Cloudsave, player: Player) => {
        const activeBuffs = doc.get(`BuffsActive_${player.playerID}`) as Record<number, number>[];
        player.activeBuffs = activeBuffs.map((buff) => {
            return player.talents.find(x => x.skillIndex == buff[0]);
        }).filter(notUndefined)
    },
    "activePrayers": (doc: Cloudsave, player: Player) => {
        const activePrayers = safeJsonParse(doc, `Prayers_${player.playerID}`, []) as number[];
        player.activePrayers = activePrayers.filter((prayer) => prayer != -1);
    },
    "cooldowns": (doc: Cloudsave, player: Player) => {
        const talentCooldowns = safeJsonParse(doc, `AtkCD_${player.playerID}`, {}) as Record<string, number>;
        Object.entries(talentCooldowns).forEach(([talentId, cooldown]) => {
            const talent = player.talents.find((talent) => talent.skillIndex == parseInt(talentId));
            if (talent) {
                player.cooldown.set(talent, cooldown);
            }
        });
    },
    "invBagsUsed": (doc: Cloudsave, player: Player) => {
        const bagsUsed = JSON.parse(doc.get(`InvBagsUsed_${player.playerID}`)) as Record<string, number>;
        player.invBagsUsed = bagsUsed;
    },
};

const parsePostOffice = (postOffice: string, player: Player) => {
    const jsonPostOffice = JSON.parse(postOffice);
    player.postOffice.forEach((box, index) => {
        box.level = jsonPostOffice[index];
    });
}

const parseTalents = (talentLevels: string, talentMaxLevels: string, player: Player) => {
    const jsonTalents = JSON.parse(talentLevels);
    const jsonMaxTalents = JSON.parse(talentMaxLevels);

    if (player.talents.length == 0) {
        const talentPageNames: string[] = ClassTalentMap[player.classId].concat(Array(5).fill("Blank").map((_, i) => `Special Talent ${i + 1}`))
        talentPageNames.forEach((page: string) => {
            player.talents = player.talents.concat(GetTalentArray(page));
        })
    }

    player.talents.forEach((talent) => {
        talent.level = jsonTalents[talent.skillIndex] ?? 0;
        talent.pointsSpent = jsonTalents[talent.skillIndex] ?? 0;
        talent.maxLevel = jsonMaxTalents[talent.skillIndex] ?? 0;
        talent.bookMaxLevel = jsonMaxTalents[talent.skillIndex] ?? 0;
    })
    player.extraLevelsFromBear = 0;
    player.extraLevelsFromES = 0;
    player.extraLevelsFromTalent = 0;

    // Update players talents levels due to elite class level increase talents.
    const extraLevels = Math.floor(player.talents.filter(talent => [149, 374, 539].includes(talent.skillIndex)).reduce((sum, value) => sum += value.getBonus(), 0))
    // Only update if different.
    if (player.extraLevelsFromTalent == 0 || player.extraLevelsFromTalent != extraLevels) {
        player.talents.filter(talent => ![149, 374, 539, 505].includes(talent.skillIndex) && talent.skillIndex <= 614 && !(49 <= talent.skillIndex && 59 >= talent.skillIndex))
            .forEach(talent => {
                talent.level += talent.level > 0 ? extraLevels : 0;
                talent.maxLevel += extraLevels;
            });
        player.extraLevelsFromTalent = extraLevels;
    }
}

const parseSkills = (skills: Array<number>, skillXP: Array<number>, skillXPReqs: Array<number>, player: Player) => {
    skills.forEach((skillLevel, skillIndex) => {
        // Only get the indexes we care about
        if (skillIndex in SkillsIndex) {
            // update the player skill level
            player.skills.set(skillIndex as SkillsIndex, new SkillData(skillLevel, skillXP[skillIndex], skillXPReqs[skillIndex]));
        }
    })
}

const parseStarSigns = (starSigns: string, player: Player) => {
    if (starSigns == undefined) {
        return;
    }
    player.starSigns = starSigns.split(',').map((sign) => {
        if (sign && Object.keys(StarSignMap).includes(sign)) {
            const matchingSign = StarSignMap[Number(sign)].duplicate();
            matchingSign.aligned = true;
            return matchingSign;
        }
    }).filter(notUndefined);
}

const parseMap = (currentMap: number, player: Player) => {
    player.currentMapId = currentMap;
    if (currentMap < MapInfo.length) {
        player.currentMap = MapInfo[currentMap].data.map.name;
    }
}

const parseStats = (stats: number[], lvZero: number[], skillXP: Array<number>, skillXPReqs: Array<number>, player: Player) => {
    player.stats.setStats(stats);
    player.level = lvZero[0];
    player.classExp = skillXP[0];
    player.classExpReq = skillXPReqs[0];
}

const parseEquipment = (
    equipment: Array<Record<number, string>>,
    equipCount: Array<Record<number, number>>,
    equipStones: Record<number, StoneProps>,
    toolStones: Record<number, StoneProps>,
    player: Player,
    allItems: Item[]
) => {
    const playerEquipment = new PlayerEquipment();
    equipment?.forEach((data, equipIndex) => {
        if (equipIndex == 0) { // armor 
            Object.entries(data).filter(([location, _]) => location != "length").forEach(([location, name], _) => {
                const theItem = allItems.find((item) => item.internalName == name)?.duplicate();
                if (theItem) {
                    theItem.addStone(equipStones[Number(location)])
                }
                else if (name != "Blank") {
                    console.log("Armor not found", name, location);
                }
                playerEquipment.equipment.push(theItem);
            })
        }
        if (equipIndex == 1) { // tools
            Object.entries(data).filter(([location, _]) => location != "length").forEach(([location, name], _) => {
                const theItem = allItems.find((item) => item.internalName == name)?.duplicate();
                if (theItem) {
                    theItem.addStone(toolStones[Number(location)])
                }
                else if (name != "Blank") {
                    console.log("Tool not found", name, location);
                }
                playerEquipment.tools.push(theItem);

            })
        }
        if (equipIndex == 2) { // food
            Object.entries(data).filter(([location, _]) => location != "length").forEach(([location, name], _) => {
                const item = allItems.find(item => item.internalName == name)?.duplicate() as Food | undefined;
                if (item) {
                    item.count = equipCount[equipIndex][Number(location)];
                }
                else if (name != "Blank") {
                    console.log("Food not found", name, location);
                }
                playerEquipment.food.push(item);
            })
        }
    });

    player.gear = playerEquipment;
}

export class Players extends Domain {
    getRawKeys(): RawData[] {
        // Update this to cover all the sub-functions.
        return [];
    }
    init(_allItems: Item[], charCount: number) {
        return [...Array(charCount)].map((_, pIndex) => new Player(pIndex, `Player_${pIndex}`));
    }
    parse(data: Map<string, any>): void {
        const playerNames = data.get("playerNames") as string[];
        const charCount = data.get("charCount") as number;
        const allItems = data.get("itemsData") as Item[];

        const players = data.get(this.getDataKey()) as Player[];

        // Due to the issue with calling parse multiple times on the same init, it's easier to just start fresh every time.
        range(0, charCount).forEach(() => {
            if (players.length > 0) {
                players.pop();
            }
        })

        // Make sure we init all the players properly.
        range(0, charCount).forEach((_, playerIndex) => {
            // If this is the first time handling this player, init.
            if (players.length <= playerIndex) {
                players.push(new Player(playerIndex, playerNames[playerIndex]));
            }
        });

        // Get rid of this once I convert all the key function maps to work based on the parsed data map instead.
        const raw = Cloudsave.fromJSON(data.get("rawData"))

        players.map(player => {
            Object.entries(keyFunctionMap).forEach(([key, toExecute]) => {
                try {
                    if (key == "equipment") {
                        toExecute(raw, player, allItems);
                    }
                    else {
                        toExecute(raw, player);
                    }
                }
                catch (e) {
                    console.log(`Something went wrong parsing ${key}`);
                    console.debug(e);
                }
            });
        });

        // identify player ranking in each skill
        const allSkillsMap: Map<SkillsIndex, Array<number>> = new Map<SkillsIndex, Array<number>>();

        // record skill levels across all players in a map
        players.forEach((player) => {
            player.skills.forEach((skill, skillIndex) => {
                if (!allSkillsMap.has(skillIndex)) {
                    allSkillsMap.set(skillIndex, []);
                }
                allSkillsMap.get(skillIndex)?.push(skill.level);
            });
        });

        players.forEach((player) => {
            if (player) {
                for (const [skillIndex, skill] of player.skills) {
                    const sortedList = allSkillsMap.get(skillIndex)?.sort((a, b) => b - a);
                    if (sortedList) {
                        const skillRank = sortedList.indexOf(skill.level);
                        player.skillsRank.set(skillIndex, skillRank);
                    }
                }
            }
        })
    }
}

export const updatePlayerTalentPoints = (data: Map<string, any>) => {
    const players = data.get("players") as Player[];
    const account = data.get("account") as Account;
    const alchemy = data.get("alchemy") as Alchemy;
    const guild = data.get("guild") as Guild;
    const bribes = data.get("bribes") as Bribe[];
    const islandExpeditions = data.get("islandExpeditions") as IslandExpeditions;
    const family = data.get("family") as Family;
    const stamps = data.get("stamps") as Stamp[][];
    const cards = data.get("cards") as Card[];
    const taskBoard = data.get("taskboard") as TaskBoard;
    const achievements = data.get("achievements") as Achievement[];
    const optionListAccount = data.get("OptLacc") as number[];
    const sigils = data.get("sigils") as Sigils;
    const dungeonsData = data.get("dungeons") as Dungeons;
    const breeding = data.get("breeding") as Breeding;
    const arcade = data.get("arcade") as Arcade;
    
    players.forEach(player => {
        player.talentPoints = [];
        const talentDL: number[] = [];
        const talentDLbonus: number[] = [];
        let talentDN4 = -3

        const skillsToUseForTalentPoints = [SkillsIndex.Mining, SkillsIndex.Smithing, SkillsIndex.Chopping, 
                                            SkillsIndex.Fishing, SkillsIndex.Alchemy, SkillsIndex.Catching, 
                                            SkillsIndex.Trapping, SkillsIndex.Construction, SkillsIndex.Worship];


        // Base talent points
        skillsToUseForTalentPoints.forEach(skillIndex => {
            talentDN4 += player.skills.get(skillIndex)?.level ?? 0;
        });
        talentDN4 += Math.round(player.getTalentBonus(275));
        talentDL.push(talentDN4);

        talentDN4 = 0;
        skillsToUseForTalentPoints.forEach(skillIndex => {
            talentDN4 += Math.floor((player.skills.get(skillIndex)?.level ?? 0) / 2);
        });
        talentDL.push(talentDN4);

        talentDN4 = 0;
        skillsToUseForTalentPoints.forEach(skillIndex => {
            talentDN4 += Math.floor((player.skills.get(skillIndex)?.level ?? 0) / 5);
        });
        talentDL.push(talentDN4);

        // Bonus talent points
        talentDLbonus.push(account.talentPointsOwned[0] ?? 0);
        talentDLbonus.push(account.talentPointsOwned[1] ?? 0);
        talentDLbonus.push(account.talentPointsOwned[2] ?? 0);
        talentDLbonus.push(account.talentPointsOwned[3] ?? 0);
        talentDLbonus.push(account.talentPointsOwned[4] ?? 0);
        talentDLbonus.push(account.talentPointsOwned[5] ?? 0);

        let bubbleBonus = 0;
        switch (true) {
            case player.getBaseClass() == ClassIndex.Archer:
            case player.getBaseClass() == ClassIndex.Beginner:
                const bubbleArcherIndex = alchemy.cauldrons[CauldronIndex.Quicc].bubbles.findIndex(bubble => bubble.data.bonusKey == "TalArchers");
                if (bubbleArcherIndex > -1) {
                    bubbleBonus = alchemy.getBonusForPlayer(player, 1, bubbleArcherIndex);
                }
                break;
            case player.getBaseClass() == ClassIndex.Warrior:
                const bubbleWarriorIndex = alchemy.cauldrons[CauldronIndex.Power].bubbles.findIndex(bubble => bubble.data.bonusKey == "TalWarrior");
                if (bubbleWarriorIndex > -1) {
                    bubbleBonus = alchemy.getBonusForPlayer(player, 0, bubbleWarriorIndex);
                }
                break;
            case player.getBaseClass() == ClassIndex.Mage:
                const bubbleMageIndex = alchemy.cauldrons[CauldronIndex.HighIQ].bubbles.findIndex(bubble => bubble.data.bonusKey == "TalWiz");
                if (bubbleMageIndex > -1) {
                    bubbleBonus = alchemy.getBonusForPlayer(player, 2, bubbleMageIndex);
                }                    
                break;
        }  

        for (let f = 0; 4 > f; f++) {
                talentDLbonus[f] += bubbleBonus;       
        }

        // Sum of all sources for talent points
        // First tab
        let firstTabPoints = 0;
        firstTabPoints = Math.floor((3 * (player.level - 1)) + talentDL[0] + talentDLbonus[0] +
            alchemy.getVialBonusForKey("Tab1Pts") +
            player.starSigns.reduce((sum, sign) => sum + sign.getBonus("Talent Points"), 0) +
            stamps.flatMap(tab => tab).reduce((sum, stamp) => sum + (stamp.data.effect == "Talent1" ? stamp.getBonus() : 0), 0) +
            (dungeonsData.passives.get(PassiveType.Flurbo)?.find(passive => passive.index == 1)?.getBonus() ?? 0) + 
            (arcade.bonuses.find(bonus => bonus.index == 16)?.getBonus() ?? 0) + 
            (achievements[54].completed ? 5 : 0) + 
            (achievements[216].completed ? 6 : 0) +
            (breeding.shinyBonuses.find(bonus => bonus.data.index == 10)?.getBonus() ?? 0));
        player.talentPoints.push({tab: TalentTab.FirstTab, spent: 0, totalOwned: firstTabPoints});

        // Second tab
        let secondTabPoints = 0;
        secondTabPoints = Math.floor((3 * (player.level - 9)) + talentDL[1] + talentDLbonus[1] + 
            alchemy.getVialBonusForKey("Tab2Pts") + 
            player.getTalentBonus(119) +
            player.getTalentBonus(299) +
            player.getTalentBonus(494) +
            player.getTalentBonus(44) +
            stamps.flatMap(tab => tab).reduce((sum, stamp) => sum + (stamp.data.effect == "Talent2" ? stamp.getBonus() : 0), 0) +
            (achievements[76].completed ? 2 : 0) + 
            (achievements[78].completed ? 3 : 0) +
            (achievements[230].completed ? 8 : 0) +
            (dungeonsData.passives.get(PassiveType.Flurbo)?.find(passive => passive.index == 1)?.getBonus() ?? 0) + 
            (breeding.shinyBonuses.find(bonus => bonus.data.index == 11)?.getBonus() ?? 0));
        player.talentPoints.push({tab: TalentTab.SecondTab, spent: 0, totalOwned: secondTabPoints});

        // Third tab
        let thirdTabPoints = 0;
        thirdTabPoints = Math.floor((3 * (player.level - 29)) + talentDL[1] + talentDLbonus[2] + 
            alchemy.getVialBonusForKey("Tab3Pts") + 
            stamps.flatMap(tab => tab).reduce((sum, stamp) => sum + (stamp.data.effect == "Talent3" ? stamp.getBonus() : 0), 0) +
            (achievements[166].completed ? 5 : 0) + 
            (achievements[170].completed ? 10 : 0) +
            (achievements[219].completed ? 8 : 0) +
            (dungeonsData.passives.get(PassiveType.Flurbo)?.find(passive => passive.index == 1)?.getBonus() ?? 0) + 
            (breeding.shinyBonuses.find(bonus => bonus.data.index == 12)?.getBonus() ?? 0));
        player.talentPoints.push({tab: TalentTab.ThirdTab, spent: 0, totalOwned: thirdTabPoints});

        // Fourth tab
        let fourthTabPoints = 0;
        if (player.getEliteClass() == ClassIndex.Maestro) {
            fourthTabPoints = Math.floor(Math.max(0, 1 + 
                player.getTalentBonus(34) + 
                player.getTalentBonus(45) * optionListAccount[158])); 
        } else {
            fourthTabPoints = Math.floor(Math.max(0, 
                3 * Math.min(player.level - 89, 100) + 
                Math.max(0, 2 * (player.level - 189)) + talentDL[2] + talentDLbonus[3] +
                stamps.flatMap(tab => tab).reduce((sum, stamp) => sum + (stamp.data.effect == "Talent4" ? stamp.getBonus() : 0), 0) +
                (dungeonsData.passives.get(PassiveType.Flurbo)?.find(passive => passive.index == 1)?.getBonus() ?? 0) + 
                Math.floor((player.skills.get(SkillsIndex.Divinity)?.level ?? 0) / 2) + 
                alchemy.getVialBonusForKey("Tab4Pts") +
                (taskBoard.merits.find(merit => merit.index == 32)?.getBonus() ?? 0) +
                (achievements[292].completed ? 10 : 0) + 
                (achievements[295].completed ? 10 : 0) +
                (achievements[239].completed ? 10 : 0) +
                (achievements[240].completed ? 15 : 0) +
                (achievements[241].completed ? 12 : 0) +
                (breeding.shinyBonuses.find(bonus => bonus.data.index == 13)?.getBonus() ?? 0)));
        }
        player.talentPoints.push({tab: TalentTab.FourthTab, spent: 0, totalOwned: fourthTabPoints});

        // Fifth tab
        let fifthTabPoints = 0;
        fifthTabPoints = Math.floor(Math.max(0, 3 * (player.level - 149) + talentDL[2] + talentDLbonus[4] + 
            stamps.flatMap(tab => tab).reduce((sum, stamp) => sum + (stamp.data.effect == "Talent5" ? stamp.getBonus() : 0), 0) +
            (dungeonsData.passives.get(PassiveType.Flurbo)?.find(passive => passive.index == 1)?.getBonus() ?? 0) + 
            (taskBoard.merits.find(merit => merit.index == 40)?.getBonus() ?? 0)));
        player.talentPoints.push({tab: TalentTab.FifthTab, spent: 0, totalOwned: fifthTabPoints});

        // Star talents
        let specialTabPoints = 0;
        specialTabPoints = Math.floor(player.level - 1 + talentDL[0] + talentDLbonus[5] +
            player.getTalentBonus(8) +
            player.getTalentBonus(622) +
            player.getTalentBonus(17) +
            (family.classBonus.get(ClassIndex.Wizard)?.getBonus(player) ?? 0) + 
            stamps.flatMap(tab => tab).reduce((sum, stamp) => sum + (stamp.data.effect == "TalentS" ? stamp.getBonus() : 0), 0) +
            Math.floor(guild.guildBonuses.find(bonus => bonus.index == 11)?.getBonus() ?? 0) + 
            (dungeonsData.passives.get(PassiveType.Flurbo)?.find(passive => passive.index == 1)?.getBonus() ?? 0) + 
            Math.min(cards.find(card => card.id == "w4b2")?.getBonus() ?? 0, 50) + 
            Math.min(cards.find(card => card.id == "Boss2C")?.getBonus() ?? 0, 100) + 
            Math.min(cards.find(card => card.id == "fallEvent1")?.getBonus() ?? 0, 100) + 
            (sigils.sigils.find(sigil => sigil.index == 9)?.getBonus() ?? 0) + 
            (achievements[212].completed ? 10 : 0) + 
            (achievements[289].completed ? 20 : 0) + 
            (achievements[305].completed ? 20 : 0) +
            (breeding.shinyBonuses.find(bonus => bonus.data.index == 14)?.getBonus() ?? 0) + 
            (bribes.find(bribe => bribe.bribeIndex == 32)?.getBonus() ?? 0) + 
            islandExpeditions.bonusStarTalentPoints);
        player.talentPoints.push({tab: TalentTab.SpecialTab, spent: 0, totalOwned: specialTabPoints});

        // Calculate the points spent for each tab
        ClassTalentMap[ClassIndex[player.class.replace(/ /g, "_") as keyof typeof ClassIndex]].concat(["Special Talent 1", "Special Talent 2", "Special Talent 3", "Special Talent 4"]).forEach((talentPage, pageIndex) => {
            // special talents all share the same points value
            const pointsArrayIndex = talentPage.indexOf("Special Talent") == -1 ? pageIndex : player.talentPoints.length - 1;
            GetTalentArray(talentPage).forEach((originalTalent, _) => {
                const talent = player.talents.find(x => x.skillIndex == originalTalent.skillIndex);
                if (talent && pointsArrayIndex < player.talentPoints.length) {
                    player.talentPoints[pointsArrayIndex].spent += talent.pointsSpent;
                }
            });
        });
    });
}

export const updatePlayerStarSigns = (data: Map<string, any>) => {
    const players = data.get("players") as Player[];
    const starSigns = data.get("starsigns") as StarSigns;

    // Apply Seraph Bonus to manually equipped star signs as the ones in InfinityStarSigns already have it
    const seraphCosmosBonus = starSigns.getSeraphCosmosBonus();
    players.forEach(player => {
        player.starSigns.filter(sign => !["Chronus Cosmos", "Hydron Cosmos", "Seraph Cosmos"].includes(sign.name)).forEach(sign => {
            if (sign.seraphCosmosBonus != seraphCosmosBonus) {
                sign.seraphCosmosBonus = seraphCosmosBonus
            }
        })
    })

    // Add Star signs impacted by infinity shiny pet bonus to star signs of the player
    starSigns.infinityStarSigns.forEach(starSign => {
        players.forEach(player => {
            // If player isn't manually aligned to this sign, add it
            if (!player.starSigns.find(sign => sign.name == starSign.name)) {
                player.starSigns.push(starSign.duplicate(true));
            }
        })
    })
}

export const updatePlayerDeathnote = (data: Map<string, any>) => {
    const players = data.get("players") as Player[];
    const deathnote = data.get("deathnote") as Deathnote;

    // Track player deathnote data on the player object as well.
    players.forEach(player => {
        player.killInfo = deathnote.playerKillsByMap.get(player.playerID)!;
    });
}

export const updatePlayerTalentLevelESBonus = (data: Map<string, any>) => {
    const players = data.get("players") as Player[];
    const family = data.get("family") as Family;

    // Max talent level from Elemental Sorcerer
    players.forEach(player => {
        const esBonus = Math.floor(family.classBonus.get(ClassIndex.Elemental_Sorcerer)?.getBonus(player) ?? 0);
        // Only update if different.
        if (player.extraLevelsFromES == 0 || player.extraLevelsFromES != esBonus) {
            player.talents.filter(talent => ![149, 374, 539, 505].includes(talent.skillIndex) && talent.skillIndex <= 614 && !(49 <= talent.skillIndex && 59 >= talent.skillIndex))
                .forEach(talent => {
                    talent.level += talent.level > 0 ? esBonus : 0;
                    talent.maxLevel += esBonus;
                });
            player.extraLevelsFromES = esBonus;
        }
    })

    return players;
}

export const updatePlayerTalentLevelExceptESBonus = (data: Map<string, any>) => {
    const players = data.get("players") as Player[];
    const divinity = data.get("divinity") as Divinity;
    const equinox = data.get("equinox") as Equinox;
    const achievementsInfo = data.get("achievements") as Achievement[];
    const grimoire = data.get("grimoire") as Grimoire;
    const tesseract = data.get("tesseract") as Tesseract;
    const optLacc = data.get("OptLacc") as (number | string)[];
    const equipmentSets = data.get("equipmentSets") as EquipmentSets;   

    // Update max talent level due to bear.
    const bearGod = divinity.gods[1];
    bearGod.linkedPlayers.forEach(linkedPlayer => {
        const bearBonus = Math.ceil(bearGod.getMinorLinkBonus(linkedPlayer));
        // Only update if different.
        if (linkedPlayer.extraLevelsFromBear == 0 || linkedPlayer.extraLevelsFromBear != bearBonus) {
            linkedPlayer.talents.filter(talent => ![149, 374, 539, 505].includes(talent.skillIndex) && talent.skillIndex <= 614 && !(49 <= talent.skillIndex && 59 >= talent.skillIndex))
                .forEach(talent => {
                    talent.level += talent.level > 0 ? bearBonus : 0;
                    talent.maxLevel += bearBonus;
                });
            linkedPlayer.extraLevelsFromBear = bearBonus;
        }
    })

    // Max talent level from Equinox
    players.forEach(player => {
        // TODO: Double check Equinox code, in-game says 12 but we get 10 here.
        const equinoxBonus = equinox.upgrades[10].getBonus();
        // Only update if different.
        if (player.extraLevelsFromEquinox == 0 || player.extraLevelsFromEquinox != equinoxBonus) {
            player.talents.filter(talent => ![149, 374, 539, 505].includes(talent.skillIndex) && talent.skillIndex <= 614 && !(49 <= talent.skillIndex && 59 >= talent.skillIndex))
                .forEach(talent => {
                    talent.level += talent.level > 0 ? equinoxBonus : 0;
                    talent.maxLevel += equinoxBonus;
                });
            player.extraLevelsFromEquinox = equinoxBonus;
        }
    })


    // Bonus talent level from achievement
    const totalTalentFromAchievments = [achievementsInfo[291]].reduce((sum, achiev) => sum += achiev.completed ? 1 : 0, 0);
    if (totalTalentFromAchievments > 0) {
        players.forEach(player => {
            if (player.extraLevelsFromAchievements == 0 || player.extraLevelsFromAchievements != totalTalentFromAchievments) {
                player.talents.filter(talent => ![149, 374, 539, 505].includes(talent.skillIndex) && talent.skillIndex <= 614 && !(49 <= talent.skillIndex && 59 >= talent.skillIndex))
                    .forEach(talent => {
                        talent.level += talent.level > 0 ? totalTalentFromAchievments : 0;
                        talent.maxLevel += totalTalentFromAchievments;
                    });
                player.extraLevelsFromAchievements = totalTalentFromAchievments;
            }
        })
    }

    const skullOfMajorTalentLevel = grimoire.getUpgradeBonus(39);
    if (skullOfMajorTalentLevel > 0) {
        players.forEach(player => {
            player.talents
                .filter(talent =>
                    ![149, 374, 539, 505].includes(talent.skillIndex) &&
                    talent.skillIndex <= 614 &&
                    !(49 <= talent.skillIndex && 59 >= talent.skillIndex)
                )
                .forEach(talent => {
                    talent.level += talent.level > 0 ? skullOfMajorTalentLevel : 0;
                    talent.maxLevel += skullOfMajorTalentLevel;
                });
            player.extraLevelsFromGrimoire = skullOfMajorTalentLevel;
        });
    }

    const universeTalentLevel = tesseract?.getUpgradeBonus(57) ?? 0;
    if (universeTalentLevel > 0) {
        players.forEach(player => {
            player.talents
                .filter(talent =>
                    ![149, 374, 539, 505].includes(talent.skillIndex) &&
                    talent.skillIndex <= 614 &&
                    !(49 <= talent.skillIndex && 59 >= talent.skillIndex)
                )
                .forEach(talent => {
                    talent.level += talent.level > 0 ? universeTalentLevel : 0;
                    talent.maxLevel += universeTalentLevel;
                });
            player.extraLevelsFromTesseract = universeTalentLevel;
        });
    }

    const sneakingMasteryLevel = optLacc[232] as number;
    if (sneakingMasteryLevel > 0) {
        const sneakyingMasteryBonus = 5 * Math.floor((97 + sneakingMasteryLevel) / 100);
        players.forEach(player => {
            player.talents.filter(talent => ![149, 374, 539, 505].includes(talent.skillIndex) && talent.skillIndex <= 614 && !(49 <= talent.skillIndex && 59 >= talent.skillIndex))
                .forEach(talent => {
                    talent.maxLevel += sneakyingMasteryBonus
                });
            player.extraLevelsFromNinjaMastery = sneakyingMasteryBonus;
        });
    }

    const kattlekrukSetBonus = equipmentSets.getSetBonus("KATTLEKRUK_SET");
    if (kattlekrukSetBonus > 0) {
        players.forEach(player => {
            player.talents.filter(talent => ![149, 374, 539, 505].includes(talent.skillIndex) && talent.skillIndex <= 614 && !(49 <= talent.skillIndex && 59 >= talent.skillIndex))
                .forEach(talent => {
                    talent.maxLevel += kattlekrukSetBonus;
                });
            player.extraLevelsFromKattlekrukSet = kattlekrukSetBonus;
        })
    }

    return players;
}

// Handles enhanced talents and talents such as blood marrow.
// This is not the same as "Special Talents" page.
export const updatePlayerSpecialTalents = (data: Map<string, any>) => {
    const players = data.get("players") as Player[];
    const cooking = data.get("cooking") as Cooking;

    // Find the highest level of the voidwalker "Enhancement Eclipse" talent.
    const enhancementLevel = Math.max(...players.flatMap(player => (player.talents.find(talent => talent.skillIndex == 49)?.level ?? 0)));
    switch(true) {
        case enhancementLevel >= 25:
            // Left Hand of Learning - Enhanced bonus is double xp for mman only.
            players.forEach(player => {
                player.markTalentAsEnhanced(42);
            });
        case enhancementLevel >= 50:
            // Pirate Flag - Gameplay only, I don't care.
        case enhancementLevel >= 75:
            // Radiant Chainbolt - Gameplay only, I don't care.
        case enhancementLevel >= 100:
            // Sleepin' On The Job - Enhanced bonus is skilling afk for mman.
            players.forEach(player => {
                player.markTalentAsEnhanced(79);
            });
        case enhancementLevel >= 125:
            // Apocalypse Chow
            players.forEach(player => {
                const apocalypseChow = player.getTalent(146) as ApocalypseChowTalent;
                if (apocalypseChow) {
                    apocalypseChow.killsOver100M = Array.from(player.killInfo.entries()).reduce((sum, [_, value]) => sum += value >= 1e8 ? 1 : 0, 0);
                    apocalypseChow.killsOver1M = Array.from(player.killInfo.entries()).reduce((sum, [_, value]) => sum += value >= 1e6 ? 1 : 0, 0);
                    player.markTalentAsEnhanced(146);
                }
            });
        case enhancementLevel >= 150:
            // Whale Wallop - Gameplay only, I don't care.
        case enhancementLevel >= 175:
            // Right hand of action - Enhanced Bonus is double skill eff for mman only. 
            players.forEach(player => {
                player.markTalentAsEnhanced(43);
            });
        case enhancementLevel >= 200:
            // Green Tube - All Skill Exp for everyone.
            players.forEach(player => {
                player.markTalentAsEnhanced(536);
            });
        case enhancementLevel >= 225:
            // Knightly Disciple - Gameplay only, I don't care.
        case enhancementLevel >= 250:
            // Lucky Charm - Skill exp on top of class exp.
            players.forEach(player => {
                player.markTalentAsEnhanced(35);
            });
            break;
    }

    // Update blood marrow talent total meals.
    const totalMeals = cooking.meals.reduce((sum, meal) => sum += meal.level, 0)
    players.flatMap(player => player.talents).filter(talent => talent.skillIndex == 59).forEach(talent => {
        const bloodMarrow = talent as BloodMarrowTalent;
        bloodMarrow.totalMeals = totalMeals;
    });
}


export const updatePlayers = (data: Map<string, any>) => {
    const players = data.get("players") as Player[];
    const obols = data.get("obols") as ObolsData;
    const alchemy = data.get("alchemy") as Alchemy;

    // Set player active bubble array, easier to work with.
    players.forEach(player => {
        if (player.activeBubblesString.length > 0) {
            const bubbleArray: Bubble[] = player.activeBubblesString.map((bubbleString, _) => {
                const activeBubble = alchemy.getActiveBubble(bubbleString);
                if (activeBubble) {
                    return activeBubble;
                }
            }).filter(notUndefined);
            // Companions can set all your active bubbles to active so if we handled it already ignore the string.
            if (player.activeBubbles.length == 0) {
                player.activeBubbles = bubbleArray;
            }
        }
    })

    // Reset data, next section will calculate it.
    players.forEach(player => player.obolStats = []);

    // Update player obols info so we can use it in maths
    players.forEach(player => {
        obols.playerStats[player.playerID]?.stats.filter(stat => stat.getValue() > 0).forEach(stat => {
            const matchingFamilyStat = obols.familyStats.stats.find(famStat => stat.extra == '' ? famStat.displayName == stat.displayName : stat.extra == famStat.extra && famStat.getValue() > 0);
            const newObolStat = new ObolStats();
            newObolStat.addStat(stat);
            if (matchingFamilyStat) {
                newObolStat.addStat(matchingFamilyStat);
            }
            player.obolStats.push(newObolStat);
        })
        obols.familyStats.stats.filter(stat => obols.playerStats[player.playerID].stats.find(playerStat => stat.extra == '' ? playerStat.displayName == stat.displayName : stat.extra == playerStat.extra) == undefined)
            .filter(stat => stat.shouldDisplay() && stat.getValue() > 0)
            .forEach(stat => {
                const newObolStat = new ObolStats();
                newObolStat.addStat(stat);
                player.obolStats.push(newObolStat);
            });
    })

    // I dunno why I have to sort it now, I never had to before. Need to think about it further.
    return players;
}

export const playerExtraCalculations = (data: Map<string, any>) => {
    const players = data.get("players") as Player[];
    const alchemy = data.get("alchemy") as Alchemy;
    const guild = data.get("guild") as Guild;
    const bribes = data.get("bribes") as Bribe[];
    const cooking = data.get("cooking") as Cooking;
    const breeding = data.get("breeding") as Breeding;
    const lab = data.get("lab") as Lab;
    const dungeons = data.get("dungeons") as Dungeons;
    const stamps = data.get("stamps") as Stamp[][];
    const achievementsInfo = data.get("achievements") as Achievement[];
    const arcade = data.get("arcade") as Arcade;
    const sigils = data.get("sigils") as Sigils;
    const shrines = data.get("shrines") as Shrine[];
    const sneaking = data.get("sneaking") as Sneaking;
    const family = data.get("family") as Family;
    const prayers = data.get("prayers") as Prayer[];
    const cards = data.get("cards") as Card[];
    const equipmentSets = data.get("equipmentSets") as EquipmentSets;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const companions = data.get("companions") as Companion[];
    const votes = data.get("votes") as Votes;

    // Double claim chance.
    const doubleChanceGuildBonus = guild.guildBonuses.find(bonus => bonus.name == "Anotha One")?.getBonus() ?? 0;
    const doubleChanceBribeBonus = bribes.find(bribe => bribe.bonus == "AfkDoubleEXP")?.value ?? 0;
    players.forEach(player => {
        const doubleChanceBubbleBonus = alchemy.getBonusForPlayer(player, CauldronIndex.Quicc, 19)
        player.setDoubleClaimChance(doubleChanceBubbleBonus, doubleChanceBribeBonus, doubleChanceGuildBonus);
    })

    // Monster Cash.
    const mealBonus = cooking.meals.filter(meal => meal.bonusKey == "Cash").reduce((sum, meal) => sum += meal.getBonus() ?? 0, 0);
    const petArenaBonus1 = breeding.hasBonus(5) ? 1 : 0;
    const petArenaBonus2 = breeding.hasBonus(14) ? 1 : 0;
    const labBonus = lab.bonuses.find(bonus => bonus.active && bonus.index == 9)?.getBonus() ?? 0;
    const vialBonus = alchemy.vials.find(vial => vial.name == "Dieter Drink")?.getBonus() ?? 0;
    const dungeonBonus = dungeons.passives.get(PassiveType.Flurbo)?.find(bonus => bonus.effect == "Monster Cash")?.getBonus() ?? 0;
    const guildBonus = guild.guildBonuses.find(bonus => bonus.index == 8)?.getBonus() ?? 0;
    const goldFoodStampBonus = stamps.flatMap(stamp => stamp).find(stamp => stamp.raw_name == "StampC7")?.getBonus() ?? 0;
    const goldFoodAchievement37 = achievementsInfo[37].completed;
    const goldFoodAchievement380 = achievementsInfo[380].completed;
    const goldFoodAchievement383 = achievementsInfo[383].completed;
    const arcadeBonus = arcade.bonuses.filter(bonus => [10, 11].includes(bonus.index)).reduce((sum, bonus) => sum += bonus.getBonus(), 0);
    const pristineCharm16 = sneaking.pristineCharms.find(charm => charm.data.itemId == 16);
    const pristineCharm14 = sneaking.pristineCharms.find(charm => charm.data.itemId == 14);
    const zGoldFoodMealBonus = cooking.meals.filter(meal => meal.bonusKey == "zGoldFood").reduce((sum, meal) => sum += meal.getBonus() ?? 0, 0);
    const bribeBonus36 = bribes.find(bribe => bribe.bribeIndex == 36)?.value ?? 0;
    const beanstalkingBonus = sneaking.beanstalking.bonuses.find(bonus => bonus.type == BeanstalkingBonusType.GoldenBread);
    const votingBonus26 = votes.getCurrentBonus(26);
    const companion48 = companions.find(c => c.id === 48)?.owned || false ? 5 : 0;
    const legenTalent25 = legendTalents.legendTalents.find(talent => talent.index == 25)?.getBonus() ?? 0;
    const cropFallEventCard = cards.filter(card => card.data.cardID == "cropfallEvent1").reduce((sum, card) => sum += card.getBonus(), 0);;
    
    let apocalypseWoW = 0;
    const bestDeathBringer = players.filter(player => player.classId == ClassIndex.Death_Bringer).sort((player1, player2) => player1.getTalentBonus(209) > player2.getTalentBonus(209) ? 1 : -1).pop();
    const deathBringerForKills = players.filter(player => [ClassIndex.Blood_Berserker, ClassIndex.Death_Bringer].indexOf(player.classId) >= 0).sort((player1, player2) => player1.playerID > player2.playerID ? 1 : -1).pop();
    if (bestDeathBringer && deathBringerForKills) {
        const deathbringeWoWStacks = Array.from(deathBringerForKills.killInfo.entries()).filter(([_, count]) => count >= 1000000000).length;;
        const skillBonus = bestDeathBringer.getTalentBonus(209);
        apocalypseWoW = skillBonus * deathbringeWoWStacks;
    }

    players.forEach(player => {
        const strBubbleBonus = alchemy.getBonusForPlayer(player, CauldronIndex.Power, 15)
        const wisBubbleBonus = alchemy.getBonusForPlayer(player, CauldronIndex.HighIQ, 15)
        const agiBubbleBonus = alchemy.getBonusForPlayer(player, CauldronIndex.Quicc, 15)
        const goldFoodBubble = alchemy.getBonusForPlayer(player, CauldronIndex.Power, 18);
        const equipmentSetBonus = equipmentSets.getSetBonus("SECRET_SET", player);

        player.setMonsterCash(strBubbleBonus, wisBubbleBonus, agiBubbleBonus, mealBonus,
            petArenaBonus1, petArenaBonus2, labBonus, ((pristineCharm16 && pristineCharm16.unlocked) ? pristineCharm16.data.x1 : 0), vialBonus,
            dungeonBonus, guildBonus, family, goldFoodStampBonus, goldFoodAchievement37, goldFoodAchievement380, goldFoodAchievement383, prayers, arcadeBonus, sigils.sigils[14].getBonus(), goldFoodBubble,
            zGoldFoodMealBonus, bribeBonus36, ((pristineCharm14 && pristineCharm14.unlocked) ? pristineCharm14.data.x1 : 0), beanstalkingBonus?.getStackSize() ?? 0, beanstalkingBonus?.item, equipmentSetBonus, votingBonus26, apocalypseWoW, companion48, legenTalent25, cropFallEventCard);
    })

    // Crystal Spawn Chance
    const crystalSpawnStamp = stamps[StampTab.Misc][StampConsts.CrystallinIndex].getBonus();
    const crysalShrine = shrines[ShrineConstants.CrystalShrine];
    players.forEach(player => {
        player.setCrystalChance(crystalSpawnStamp, crysalShrine);
    })
}


// if ("FoodNOTconsume" == n) {
//     var Ki = 90 + 5 * w._customBlock_MainframeBonus(108),
//         $i = b.engine.getGameAttribute("DNSM"),
//         eo = null != d.AlchBubbles ? $i.getReserved("AlchBubbles") : $i.h.AlchBubbles,
//         to = null != d.nonFoodACTIVE ? eo.getReserved("nonFoodACTIVE") : eo.h.nonFoodACTIVE,
//         no = Math.min(Ki, 98 + Math.min(parsenum(to), 1)),
//         so = Math.max(1, w._customBlock_MainframeBonus(108)),
//         ao = t._customBlock_GetTalentNumber(1, 458),
//         Ao = b.engine.getGameAttribute("DNSM"),
//         ro = null != d.BoxRewards ? Ao.getReserved("BoxRewards") : Ao.h.BoxRewards,
//         lo = null != d.NonConsume ? ro.getReserved("NonConsume") : ro.h.NonConsume,
//         io = parsenum(lo),
//         oo = N._customBlock_CardBonusREAL(16),
//         uo = b.engine.getGameAttribute("DNSM"),
//         go = null != d.StarSigns ? uo.getReserved("StarSigns") : uo.h.StarSigns,
//         mo = null != d.NoConsumeFood ? go.getReserved("NoConsumeFood") : go.h.NoConsumeFood,
//         co = parsenum(mo),
//         po = b.engine.getGameAttribute("DNSM"),
//         ho = null != d.AlchBubbles ? po.getReserved("AlchBubbles") : po.h.AlchBubbles,
//         bo = null != d.nonFoodACTIVE ? ho.getReserved("nonFoodACTIVE") : ho.h.nonFoodACTIVE;
//     return Math.min(no, so * (ao + (io + (oo + co + parsenum(bo)))));
// }
// if ("MonsterCash" == n) {
//     var fo = b.engine.getGameAttribute("DNSM"),
//         yo = null != d.AlchBubbles ? fo.getReserved("AlchBubbles") : fo.h.AlchBubbles,
//         Ro = null != d.CashSTR ? yo.getReserved("CashSTR") : yo.h.CashSTR,
//         vo = parsenum(Ro) * Math.floor(H._customBlock_TotalStats("STR") / 250),
//         Fo = b.engine.getGameAttribute("DNSM"),
//         No = null != d.AlchBubbles ? Fo.getReserved("AlchBubbles") : Fo.h.AlchBubbles,
//         Io = null != d.CashAGI ? No.getReserved("CashAGI") : No.h.CashAGI,
//         Do = parsenum(Io) * Math.floor(H._customBlock_TotalStats("AGI") / 250),
//         Eo = b.engine.getGameAttribute("DNSM"),
//         So = null != d.AlchBubbles ? Eo.getReserved("AlchBubbles") : Eo.h.AlchBubbles,
//         Go = null != d.CashWIS ? So.getReserved("CashWIS") : So.h.CashWIS,
//         To =
//             (1 + (vo + (Do + parsenum(Go) * Math.floor(H._customBlock_TotalStats("WIS") / 250))) / 100) *
//             (1 + C._customBlock_MealBonus("Cash") / 100) *
//             (1 + (0.5 * w._customBlock_Breeding("PetArenaBonus", "0", 5, 0) + w._customBlock_Breeding("PetArenaBonus", "0", 14, 0))) *
//             (1 + w._customBlock_MainframeBonus(9) / 100) *
//             (1 + w._customBlock_prayersReal(8, 0) / 100),
//         Uo = b.engine.getGameAttribute("DNSM"),
//         _o = null != d.AlchVials ? Uo.getReserved("AlchVials") : Uo.h.AlchVials,
//         Mo = null != d.MonsterCash ? _o.getReserved("MonsterCash") : _o.h.MonsterCash,
//         Vo = parsenum(Mo),
//         Co = N._customBlock_EtcBonuses("3"),
//         Po = N._customBlock_CardBonusREAL(11),
//         Bo = t._customBlock_GetTalentNumber(1, 22),
//         Oo = w._customBlock_FlurboShop(4),
//         xo = b.engine.getGameAttribute("DNSM"),
//         ko = null != d.BoxRewards ? xo.getReserved("BoxRewards") : xo.h.BoxRewards,
//         wo = null != d["13c"] ? ko.getReserved("13c") : ko.h["13c"];
//     return (
//         To *
//         (1 +
//             (Vo +
//                 (Co +
//                     (Po +
//                         (Bo +
//                             (Oo +
//                                 (parsenum(wo) +
//                                     (w._customBlock_GuildBonuses(8) * (1 + Math.floor(b.engine.getGameAttribute("CurrentMap") / 50)) +
//                                         (t._customBlock_TalentCalc(643) + (t._customBlock_TalentCalc(644) + C._customBlock_GoldFoodBonuses("MonsterCash")))))))))) /
//                 100)
//     );
// }
// if ("KillPerKill" == n) {
//     if (1 == H._customBlock_RunCodeOfTypeXforThingY("OverkillStuffs", "3")) {
//         var Xo = Math.max(1, w._customBlock_MainframeBonus(4)),
//             zo = t._customBlock_GetTalentNumber(1, 109),
//             Lo = w._customBlock_WorkbenchStuff("MultiKillTOTAL", 0, 0),
//             Qo = b.engine.getGameAttribute("DNSM"),
//             Wo = null != d.AlchBubbles ? Qo.getReserved("AlchBubbles") : Qo.h.AlchBubbles,
//             Yo = null != d.kpkACTIVE ? Wo.getReserved("kpkACTIVE") : Wo.h.kpkACTIVE;
//         return Xo * (1 + (zo + (Lo + (parsenum(Yo) + w._customBlock_prayersReal(13, 0)))) / 100);
//     }
//     var Zo = Math.max(1, w._customBlock_MainframeBonus(4)),
//         Ho = t._customBlock_GetTalentNumber(1, 109),
//         Jo = b.engine.getGameAttribute("DNSM"),
//         jo = null != d.AlchBubbles ? Jo.getReserved("AlchBubbles") : Jo.h.AlchBubbles,
//         qo = null != d.kpkACTIVE ? jo.getReserved("kpkACTIVE") : jo.h.kpkACTIVE;
//     return Zo * (1 + (Ho + (parsenum(qo) + w._customBlock_prayersReal(13, 0))) / 100);
// }
// if ("CrystalSpawn" == n) {
//     var Ko = 1 + t._customBlock_GetTalentNumber(1, 26) / 100,
//         $o = b.engine.getGameAttribute("DNSM"),
//         eu = null != d.BoxRewards ? $o.getReserved("BoxRewards") : $o.h.BoxRewards,
//         tu = null != d.CrystalSpawn ? eu.getReserved("CrystalSpawn") : eu.h.CrystalSpawn;
//     return (
//         5e-4 *
//         Ko *
//         (1 + (parsenum(tu) + w._customBlock_Shrine(6)) / 100) *
//         (1 + t._customBlock_GetTalentNumber(1, 619) / 100) *
//         (1 + t._customBlock_StampBonusOfTypeX("CrySpawn") / 100) *
//         (1 + N._customBlock_CardBonusREAL(14) / 100)
//     );
// }
// if ("GiantMob" == n) {
//     if (5 < w._customBlock_prayersReal(5, 0)) {
//         var nu = b.engine.getGameAttribute("OptionsListAccount")[57];
//         if (5 > parsenum(nu)) {
//             var su = b.engine.getGameAttribute("OptionsListAccount")[57],
//                 au = 1 / ((100 + 50 * Math.pow(parsenum(su) + 1, 2)) * (1 + w._customBlock_prayersReal(18, 1) / 100)),
//                 Au = w._customBlock_Shrine(6),
//                 ru = b.engine.getGameAttribute("DNSM"),
//                 lu = null != d.AlchVials ? ru.getReserved("AlchVials") : ru.h.AlchVials,
//                 iu = null != d.GiantMob ? lu.getReserved("GiantMob") : lu.h.GiantMob;
//             return au * (1 + (Au + parsenum(iu)) / 100);
//         }
//         var ou = b.engine.getGameAttribute("OptionsListAccount")[57],
//             uu = 2 * Math.pow(parsenum(ou) + 1, 1.95) * (1 + w._customBlock_prayersReal(18, 1) / 100),
//             gu = b.engine.getGameAttribute("OptionsListAccount")[57],
//             mu = parsenum(gu),
//             du = b.engine.getGameAttribute("OptionsListAccount")[57],
//             cu = 1 / (uu * Math.pow(mu + 1, 1.5 + parsenum(du) / 15)),
//             pu = w._customBlock_Shrine(6),
//             hu = b.engine.getGameAttribute("DNSM"),
//             bu = null != d.AlchVials ? hu.getReserved("AlchVials") : hu.h.AlchVials,
//             fu = null != d.GiantMob ? bu.getReserved("GiantMob") : bu.h.GiantMob;
//         return cu * (1 + (pu + parsenum(fu)) / 100);
//     }
//     return 0;
// }
// if ("CardChanceMulti" == n) {
//     var rm = C._customBlock_GetBribeBonus("10"),
//         lm = b.engine.getGameAttribute("DNSM"),
//         im = null != d.StarSigns ? lm.getReserved("StarSigns") : lm.h.StarSigns,
//         om = null != d.pctCardDrop ? im.getReserved("pctCardDrop") : im.h.pctCardDrop,
//         um = parsenum(om) + N._customBlock_CardBonusREAL(12),
//         gm = b.engine.getGameAttribute("DNSM"),
//         mm = null != d.AlchVials ? gm.getReserved("AlchVials") : gm.h.AlchVials,
//         dm = null != d.CardDrop ? mm.getReserved("CardDrop") : mm.h.CardDrop,
//         cm = parsenum(dm),
//         pm = t._customBlock_StampBonusOfTypeX("CardDrop"),
//         hm = t._customBlock_GetTalentNumber(1, 28),
//         bm = w._customBlock_GuildBonuses(12),
//         fm = N._customBlock_EtcBonuses("26"),
//         ym = b.engine.getGameAttribute("DNSM"),
//         Rm = null != d.AlchBubbles ? ym.getReserved("AlchBubbles") : ym.h.AlchBubbles,
//         vm = null != d.CardDropz ? Rm.getReserved("CardDropz") : Rm.h.CardDropz;
//     return 1.2 + ((rm + (um + cm + (pm + (hm + (bm + (fm + parsenum(vm))))))) / 100) * (1 + t._customBlock_GetTalentNumber(1, 628) / 100);
// }
