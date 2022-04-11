import { itemMap, monstersMap, mapsMap } from "../maps";
import { Capacity } from './capacity';
import { StarSignMap, StarSign } from './starsigns';
import { Box, initPostOffice, PostOfficeConst } from './postoffice';
import { Worship } from './worship';
import { ClassIndex, Talent, ClassTalentMap, GetTalentArray } from './talents';
import { Card, CardInfo } from "./cards";
import { Item, Equipment, Food, Tool, StoneProps } from "./items";
import { notUndefined } from '../utility';
import { Cloudsave } from "./cloudsave";
import { EnemyInfo } from "./enemies";
import { MapInfo } from "./maps";
import { Chip, chipSlotReq, Lab } from "./lab";
import { Alchemy } from "./alchemy";
import { Guild } from "./guild";
import { Bribe } from "./bribes";
import { Stat } from "./base/stat";
import { Family } from "./family";
import { Prayer } from "./prayers";
import { Cooking } from "./cooking";
import { Breeding } from "./breeding";
import { Dungeons, PassiveType } from "./dungeons";
import { Stamp } from "./stamps";
import { Achievement, AchievementConst } from "./achievements";
import { safeJsonParse } from "./idleonData";
import { Arcade } from "./arcade";
import { ObolsData, ObolStats } from "./obols";
import { ImageData } from "./imageData";

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

export enum SkillsIndex {
    Mining = 1,
    Smithing = 2,
    Chopping = 3,
    Fishing = 4,
    Alchemy = 5,
    Catching = 6,
    Trapping = 7,
    Construction = 8,
    Worship = 9,
    Cooking = 10,
    Breeding = 11,
    Intellect = 12,
}


// if ("Costs2TypeAnvilPA" == t) {
//     var B = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (5 > parsenum(B)) return "Grasslands1";
//     var P = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (15 > parsenum(P)) return "Grasslands2";
//     var O = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (25 > parsenum(O)) return "Grasslands3";
//     var x = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (40 > parsenum(x)) return "Jungle1";
//     var w = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (55 > parsenum(w)) return "Jungle3";
//     var Q = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (70 > parsenum(Q)) return "Forest1";
//     var X = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (85 > parsenum(X)) return "Forest3";
//     var z = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (100 > parsenum(z)) return "DesertA1";
//     var L = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (115 > parsenum(L)) return "DesertA3";
//     var Z = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (130 > parsenum(Z)) return "DesertB1";
//     var W = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (150 > parsenum(W)) return "DesertB3";
//     var Y = b.engine.getGameAttribute("AnvilPAstats")[2];
//     if (175 > parsenum(Y)) return "DesertC1";
//     var H = b.engine.getGameAttribute("AnvilPAstats")[2];
//     return 200 > parsenum(H) ? "DesertC2" : "DesertC4";
// }

const initCrafts = (): AnvilProduct[] => {
    return [
        { displayName: "Thread", internalName: "CraftMat1", time: 100, levelReq: 1, exp: 6, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Trusty Nails", internalName: "CraftMat5", time: 200, levelReq: 5, exp: 10, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Boring Brick", internalName: "CraftMat6", time: 350, levelReq: 12, exp: 16, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Chain Link", internalName: "CraftMat7", time: 700, levelReq: 17, exp: 25, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Leather Hide", internalName: "CraftMat9", time: 1200, levelReq: 25, exp: 35, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Pinion Spur", internalName: "CraftMat8", time: 2000, levelReq: 30, exp: 50, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Lugi Bracket", internalName: "CraftMat10", time: 3000, levelReq: 35, exp: 65, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Purple Screw", internalName: "CraftMat11", time: 4000, levelReq: 43, exp: 75, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Thingymabob", internalName: "CraftMat12", time: 6000, levelReq: 50, exp: 90, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Tangled Cords", internalName: "CraftMat13", time: 8500, levelReq: 60, exp: 110, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "PVC Pipe", internalName: "CraftMat14", time: 12000, levelReq: 70, exp: 140, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Filler", internalName: "CraftMat15", time: 120000, levelReq: 999, exp: 1000, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Filler", internalName: "CraftMat16", time: 160000, levelReq: 999, exp: 1300, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Filler", internalName: "CraftMat17", time: 250000, levelReq: 999, exp: 2000, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 }
    ];
}

interface AnvilProduct {
    displayName: string
    internalName: string
    time: number
    levelReq: number
    exp: number

    currentAmount: number
    currentXP: number
    currentProgress: number
    totalProduced: number
    hammers?: number
}

const range = (start: number, end: number) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

export class Anvil {
    // AnvilPAstats - 
    // [0] = Available points I think
    // [1] = coin costs - some crazy math, look at "Costs1"
    // [2] = number of points from monster mats, with logic on how to calculate which monster is next (look for "Costs2TypeAnvilPA")
    // [3] xp bonus = (n = (1 + (3 * (parsenum(n) = b.engine.getGameAttribute("AnvilPAstats")[3])) / 100) * H._customBlock_SkillStats("SmithingEXPmulti")),
    // [4] speed bonus = no math?
    // [5] cap bonus = if ("Cap" == t) return (t = H._customBlock_MaxCapacity("bCraft")), (n = b.engine.getGameAttribute("AnvilPAstats")[5]), Math.round(t * (2 + 0.1 * parsenum(n)));
    // AnvilPA_<x> -  // [0-13] of rawAnvil are each anvil product
    // of each product...
    // 0 = amount to be produced (claimed)
    // 1 = amount of xp gained when claimed
    // 2 = current progress? (idk need more proof but also kinda useless)
    // 3 = total produced

    // _customBlock_AFKcode for return from AFK math.
    availablePoints: number = 0
    pointsFromCoins: number = 0
    pointsFromMats: number = 0
    xpPoints: number = 0
    speedPoints: number = 0
    capPoints: number = 0
    production: AnvilProduct[]
    currentlySelect: number[] = []

    constructor() {
        this.production = initCrafts()
    }

    getCapacity = (bagCapacity: number = 0) => {
        return Math.round(bagCapacity * (2 + 0.1 * this.capPoints));
    }

    getSpeed = (agility: number = 0, stampBonus: number = 0, poBoxBonus: number = 0, hammerHammerBonus: number = 0, statueBonus: number = 0, starSignTownSpeed: number = 0, talentTownSpeed: number = 0) => {
        const boxAndStatueMath = 1 + ((poBoxBonus + statueBonus) / 100);
        const agilityBonus = this.getSpeedBonusFromAgility(agility);
        return (1 + (stampBonus + (2 * this.speedPoints)) / 100) * boxAndStatueMath * (1 + (hammerHammerBonus / 100)) * agilityBonus * (1 + (starSignTownSpeed + talentTownSpeed) / 100);
    }

    // if ("SmithingEXPmulti" == t) {
    //     var Ys = b.engine.getGameAttribute("DNSM"),
    //         Hs = null != d.TotStatSkMAP ? Ys.getReserved("TotStatSkMAP") : Ys.h.TotStatSkMAP,
    //         Js = 1 + (r._customBlock_GetTalentNumber(1, 265) + (r._customBlock_StampBonusOfTypeX("SmithExp") + r._customBlock_GetTalentNumber(1, 75))) / 100,
    //         js = 1 + U._customBlock_CardBonusREAL(49) / 100,
    //         qs = b.engine.getGameAttribute("DNSM"),
    //         Ks = null != d.BoxRewards ? qs.getReserved("BoxRewards") : qs.h.BoxRewards,
    //         $s = null != d.SmithExp ? Ks.getReserved("SmithExp") : Ks.h.SmithExp,
    //         ea = parsenum($s),
    //         ta = F._customBlock_SkillStats("AllSkillxpz"),
    //         na = b.engine.getGameAttribute("DNSM"),
    //         sa = null != d.CalcTalentMAP ? na.getReserved("CalcTalentMAP") : na.h.CalcTalentMAP,
    //         aa = (null != d[42] ? sa.getReserved("42") : sa.h[42])[1],
    //         Aa = Math.max(0.1, Js * js * (1 + ea / 100) + (ta + parsenum(aa)) / 100);
    //     null != d[t] ? Hs.setReserved(t, Aa) : (Hs.h[t] = Aa);
    //     var ra = b.engine.getGameAttribute("DNSM"),
    //         la = null != d.TotStatSkMAP ? ra.getReserved("TotStatSkMAP") : ra.h.TotStatSkMAP;
    //     return null != d[t] ? la.getReserved(t) : la.h[t];
    // }
    getXPMulti = (player: Player, allSkillsXP: number, mmanBonus: number) => {
        const focusedSoulBonus = player.talents.find(talent => talent.skillIndex == 265)?.getBonus() ?? 0;
        const stampBonus = 0; // TODO: Real look up, but currently stamp isn't obtainable.
        const happyDudeBonus = player.talents.find(talent => talent.skillIndex == 75)?.getBonus() ?? 0;
        const math1 = 1 + ((focusedSoulBonus + stampBonus + happyDudeBonus) / 100);
        const smithingCardBonus = 1 + Card.GetTotalBonusForId(player.cardInfo?.equippedCards ?? [], 49) / 100;
        const blackSmithBox = player.postOffice[PostOfficeConst.BlacksmithBoxIndex];
        const postOfficeBonus = blackSmithBox.level > 0 ? blackSmithBox.bonuses[0].getBonus(blackSmithBox.level, 0) : 0;

        return Math.max(0.1, math1 * smithingCardBonus * (1 + (postOfficeBonus / 100)) + (allSkillsXP + mmanBonus) / 100);
    }

    // return (
    //     (t = b.engine.getGameAttribute("DNSM")),
    //     (n = (1 + (3 * (parsenum(n) = b.engine.getGameAttribute("AnvilPAstats")[3])) / 100) * F._customBlock_SkillStats("SmithingEXPmulti")),
    //     null != d.AnvilPAxpDN ? t.setReserved("AnvilPAxpDN", n) : (t.h.AnvilPAxpDN = n),
    //     (t = b.engine.getGameAttribute("DNSM")),
    //     20 > (parsenum(t) = null != d.AnvilPAxpDN ? t.getReserved("AnvilPAxpDN") : t.h.AnvilPAxpDN)
    //         ? ((t = b.engine.getGameAttribute("DNSM")), null != d.AnvilPAxpDN ? t.getReserved("AnvilPAxpDN") : t.h.AnvilPAxpDN)
    //         : ((t = b.engine.getGameAttribute("DNSM")),
    //           (t = parsenum(t) = null != d.AnvilPAxpDN ? t.getReserved("AnvilPAxpDN") : t.h.AnvilPAxpDN),
    //           (n = b.engine.getGameAttribute("DNSM")),
    //           (n = null != d.AnvilPAxpDN ? n.getReserved("AnvilPAxpDN") : n.h.AnvilPAxpDN),
    //           Math.min(20 + ((t - 20) / (parsenum(n) - 20 + 70)) * 50, 75))
    // );
    getXP = (xpMulti: number) => {
        const baseMath = (1 + (3 * (this.xpPoints / 100))) * xpMulti;
        if (baseMath < 20) {
            return baseMath;
        }

        return Math.min(20 + ((baseMath - 20) / (baseMath - 20 + 70) * 50), 75);
    }

    getSpeedBonusFromAgility = (agility: number = 0): number => {
        let base: number = (Math.pow(agility + 1, 0.37) - 1) / 40;
        if (agility > 1000) {
            base = ((agility - 1000) / (agility + 2500)) * 0.5 + 0.297;
        }
        return (base * 2) + 1;
    }

    getCoinCost = (alchemyCostReduction: number, pointsBought: number = this.pointsFromCoins) => {
        const baseCost = Math.pow(pointsBought, 3) + 50;
        return Math.round(baseCost * (1 + pointsBought / 100) * Math.max(0.1, 1 - alchemyCostReduction / 100));
    }

    getMonsterMatCost = (alchemyCostReduction: number, pointsBought: number = this.pointsFromMats) => {
        if (pointsBought >= 200) {
            return Math.round((Math.pow(pointsBought + 1, 1.5) + pointsBought) * Math.max(0.1, 1 - alchemyCostReduction / 100));
        }
        // TODO: Handle before sharpshell!
        return 0;
    }

    getTotalCoinCost = (alchemyCostReduction: number, pointsBought: number = this.pointsFromCoins) => {
        let totalCost = 0;
        range(0, pointsBought).forEach((_, point) => {
            totalCost += this.getCoinCost(alchemyCostReduction, point);
        });

        return totalCost;
    }

    getTotalSharpshells = (alchemyCostReduction: number) => {
        if (this.pointsFromMats < 200) {
            return 0
        }
        let totalCost = 0;
        range(200, this.pointsFromMats).forEach((point, _) => {
            totalCost += this.getMonsterMatCost(alchemyCostReduction, point);
        });

        return totalCost;
    }
}

export class SkillData {
    constructor(public level: number, public currentXP: number, public xpReq: number) { }
}

export class ChipSlot {
    constructor(public chip: Chip | undefined, public lvlReq: number) { }
}

interface LabInfo {
    lineWidth: number
    supped: boolean
    chips: ChipSlot[]
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
    currentMonster: string = "Blank";
    currentMap: string = "Blank";
    currentMapId: number = 0;
    starSigns: StarSign[] = [];
    money: number = 0;
    skills: Map<SkillsIndex, SkillData>;
    skillsRank: Map<SkillsIndex, number>;
    anvil: Anvil = new Anvil();
    capacity: Capacity = new Capacity();
    talents: Talent[] = [];
    postOffice: Box[] = initPostOffice();
    activeBubblesString: string[] = [];
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

    constructor(playerID: number, playerName: string) {
        this.playerID = playerID;
        this.playerName = playerName;
        this.skills = new Map<SkillsIndex, SkillData>();
        this.skillsRank = new Map<SkillsIndex, number>();
    }

    getBaseClass = (): ClassIndex => {
        switch (ClassIndex[this.class.replace(/ /g, "_") as keyof typeof ClassIndex]) {
            case ClassIndex.Beginner:
            case ClassIndex.Journeyman:
            case ClassIndex.Maestro:
            case ClassIndex.Virtuoso:
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

    getClassClass = () => {
        return `icons-3836 icons-ClassIcons${this.classId.valueOf()}`
    }

    getClassImageData = (): ImageData => {
        return {
            location: `ClassIcons${this.classId.valueOf()}`,
            height: 36,
            width: 38
        }
    }

    getCurrentCooldown = (skillIndex: number) => {
        const skillCooldown = [...this.cooldown.entries()].filter(([talent, cooldown]) => talent.skillIndex == skillIndex).pop()
        if (skillCooldown) {
            return Math.max(0, skillCooldown[1] - this.afkFor);
        }
        return 0;
    }

    getGoldFoodMulti = (familyBonus: number = 0, goldFoodStampBonus: number = 0, achievement: boolean) => {
        const gearBonus = this.gear.equipment.reduce((sum, gear) => sum += gear?.getMiscBonus("Gold Food Effect") ?? 0, 0);
        return Math.max(familyBonus, 1) + (gearBonus + ((this.talents.find(skill => skill.skillIndex == 99)?.getBonus() ?? 0) + (goldFoodStampBonus + (achievement ? 5 : 0)))) / 100;
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

        this.doubleClaimChance.value = Math.min(75, bubbleBonus + bribeBonus + guildBonus + Math.min(cardBonus, 20) + boxBonus);
        this.doubleClaimChance.sources.push({ name: "Card", value: cardBonus });
        this.doubleClaimChance.sources.push({ name: "Post Office", value: boxBonus });
        this.doubleClaimChance.sources.push({ name: "Alchemy Bubble", value: bubbleBonus });
        this.doubleClaimChance.sources.push({ name: "Bribe", value: bribeBonus });
        this.doubleClaimChance.sources.push({ name: "Guild", value: guildBonus });
        this.doubleClaimChance.max = 75;
    }

    setMonsterCash = (strBubbleBonus: number, wisBubbleBonus: number, agiBubbleBonus: number, mealBonus: number,
        petArenaBonus1: number, petArenaBonus2: number, labBonus: number, vialBonus: number, dungeonBonus: number, guildBonus: number,
        family: Family, goldFoodStampBonus: number, goldFoodAchievement: boolean, prayers: Prayer[], arcadeBonus: number) => {
        let gearBonus = this.getMiscBonusFromGear("Money");
        const goldenFoodBonus = this.gear.food.filter(food => food && food.goldenFood != undefined && food.description.includes("Boosts coins dropped"))
            .reduce((sum, food) => sum += (food as Food).goldFoodBonus(food?.count ?? 0, this.getGoldFoodMulti(family.classBonus.get(ClassIndex.Shaman)?.getBonus() ?? 0, goldFoodStampBonus, goldFoodAchievement)), 0);
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
            (1 + prayerBonus / 100)
        const currentWorldBonus = 1 + Math.floor(this.currentMapId / 50);
        this.monsterCash.value = baseMath *
            (1 + (vialBonus + gearBonus + cardBonus + (this.talents.find(talent => talent.skillIndex == 22)?.getBonus() ?? 0)
                + dungeonBonus + arcadeBonus + boxBonus + (guildBonus * currentWorldBonus) +
                (this.talents.find(talent => talent.skillIndex == 643)?.getBonus() ?? 0) +
                (this.talents.find(talent => talent.skillIndex == 644)?.getBonus() ?? 0) +
                goldenFoodBonus) / 100);

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
                (this.talents.find(talent => talent.skillIndex == 644)?.getBonus() ?? 0) + (this.talents.find(talent => talent.skillIndex == 22)?.getBonus() ?? 0)
        });
    }
}

const keyFunctionMap: Record<string, Function> = {
    "equipment": (doc: Cloudsave, player: Player, allItems: Item[]) => parseEquipment(doc.get(`EquipOrder_${player.playerID}`), doc.get(`EquipQTY_${player.playerID}`), JSON.parse(doc.get(`EMm0_${player.playerID}`)), JSON.parse(doc.get(`EMm1_${player.playerID}`)), player, allItems),
    "stats": (doc: Cloudsave, player: Player) => parseStats(doc.get(`PVStatList_${player.playerID}`), doc.get(`Lv0_${player.playerID}`), doc.get(`Exp0_${player.playerID}`), doc.get(`ExpReq0_${player.playerID}`), player),
    "class": (doc: Cloudsave, player: Player) => {
        player.class = ClassIndex[doc.get(`CharacterClass_${player.playerID}`)]?.replace(/_/g, " ") || "New Class?";
        player.classId = doc.get(`CharacterClass_${player.playerID}`) as ClassIndex;
    },
    "monster": (doc: Cloudsave, player: Player) => { player.currentMonster = EnemyInfo.find(enemy => enemy.details.internalName == doc.get(`AFKtarget_${player.playerID}`))?.details.Name || doc.get(`AFKtarget_${player.playerID}`); },
    "map": (doc: Cloudsave, player: Player) => parseMap(doc.get(`CurrentMap_${player.playerID}`), player),
    "starsigns": (doc: Cloudsave, player: Player) => parseStarSigns(doc.get(`PVtStarSign_${player.playerID}`), player),
    "money": (doc: Cloudsave, player: Player) => { player.money = doc.get(`Money_${player.playerID}`) },
    "skills": (doc: Cloudsave, player: Player) => parseSkills(doc.get(`Lv0_${player.playerID}`), doc.get(`Exp0_${player.playerID}`), doc.get(`ExpReq0_${player.playerID}`), player),
    "anvil": (doc: Cloudsave, player: Player) => parseAnvil(
        doc.get(`AnvilPA_${player.playerID}`),
        doc.get(`AnvilPAstats_${player.playerID}`),
        doc.get(`AnvilPAselect_${player.playerID}`),
        player
    ),
    "capacity": (doc: Cloudsave, player: Player) => { player.capacity = new Capacity(JSON.parse(doc.get(`MaxCarryCap_${player.playerID}`))) },
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
        const currentCardSet = JSON.parse(doc.get(`CSetEq_${player.playerID}`));
        const equippedCards = doc.get(`CardEquip_${player.playerID}`) as string[];
        const cards = JSON.parse(doc.get('Cards0'));
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
        const talentCooldowns = JSON.parse(doc.get(`AtkCD_${player.playerID}`)) as Record<string, number>;
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

    const talentPageNames: string[] = ClassTalentMap[player.classId].concat(Array(5).fill("Blank").map((_, i) => `Special Talent ${i + 1}`))
    talentPageNames.forEach((page: string) => {
        player.talents = player.talents.concat(GetTalentArray(page));
    })

    player.talents.forEach((talent) => {
        talent.level = jsonTalents[talent.skillIndex] ?? 0;
        talent.maxLevel = jsonMaxTalents[talent.skillIndex] ?? 0;
    })
}

const parseAnvil = (anvilProduction: number[][], anvilStats: number[], anvilSelected: number[], player: Player) => {
    // TODO: Get rid of magic indexes
    player.anvil.production.forEach((item, index) => {
        item.currentAmount = anvilProduction[index][0];
        item.currentXP = anvilProduction[index][1];
        item.currentProgress = anvilProduction[index][2];
        item.totalProduced = anvilProduction[index][3];
        item.hammers = anvilSelected.filter(x => x == index).length;
    })

    player.anvil.availablePoints = anvilStats[0];
    player.anvil.pointsFromCoins = anvilStats[1];
    player.anvil.pointsFromMats = anvilStats[2];
    player.anvil.xpPoints = anvilStats[3];
    player.anvil.speedPoints = anvilStats[4];
    player.anvil.capPoints = anvilStats[5];

    player.anvil.currentlySelect = anvilSelected;
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
    player.starSigns = starSigns.split(',').map((sign) => {
        if (sign) {
            return StarSignMap[Number(sign)];
        }
    }).filter(notUndefined);
}

const parseMap = (currentMap: number, player: Player) => {
    player.currentMapId = currentMap;
    player.currentMap = MapInfo.find(map => map.id == currentMap)?.area || "New Map?";
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
    let playerEquipment = new PlayerEquipment();
    equipment?.forEach((data, equipIndex) => {
        if (equipIndex == 0) { // armor 
            Object.entries(data).filter(([location, _]) => location != "length").forEach(([location, name], _) => {
                let theItem = allItems.find((item) => item.internalName == name)?.duplicate();
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
                let theItem = allItems.find((item) => item.internalName == name)?.duplicate();
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

export default function parsePlayers(doc: Cloudsave, accountData: Map<string, any>, allItems: Item[], validCharCount: number) {
    const playerNames = accountData.get("playerNames") as string[];
    let parsedData = playerNames.slice(0, validCharCount).map((playerName, index) => {
        let player = new Player(index, playerName);

        Object.entries(keyFunctionMap).forEach(([key, toExecute]) => {
            try {
                if (key == "equipment") {
                    toExecute(doc, player, allItems);
                }
                else {
                    toExecute(doc, player);
                }
            }
            catch (e) {
                console.log(`Something went wrong parsing ${key}`);
                console.debug(e);
            }
        });

        return player;
    });

    // identify player ranking in each skill
    const allSkillsMap: Map<SkillsIndex, Array<number>> = new Map<SkillsIndex, Array<number>>();

    // record skill levels across all players in a map
    parsedData.forEach((player) => {
        player.skills.forEach((skill, skillIndex) => {
            if (!allSkillsMap.has(skillIndex)) {
                allSkillsMap.set(skillIndex, []);
            }
            allSkillsMap.get(skillIndex)?.push(skill.level);
        });
    });
    parsedData.forEach((player) => {
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

    return parsedData;
}

export const updatePlayers = (data: Map<string, any>) => {
    const players = data.get("players") as Player[];
    const obols = data.get("obols") as ObolsData;

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

    // Update star signs if has double starsign chip.
    players.forEach(player => {
        if (player.labInfo.chips.find(chip => chip.chip?.index == 15) != undefined) {
            player.starSigns.forEach(sign => sign.hasChip == true);
        }
    })

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

    // Double claim chance.
    const doubleChanceBubbleBonus = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Afk Expexp")?.getBonus() ?? 0;
    const doubleChanceGuildBonus = guild.guildBonuses.find(bonus => bonus.name == "Anotha One")?.getBonus() ?? 0;
    const doubleChanceBribeBonus = bribes.find(bribe => bribe.bonus == "AfkDoubleEXP")?.value ?? 0;
    players.forEach(player => {
        player.setDoubleClaimChance(doubleChanceBubbleBonus, doubleChanceBribeBonus, doubleChanceGuildBonus);
    })

    // Monster Cash.
    const strBubbleBonus = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Penny Of Strength")?.getBonus() ?? 0;
    const wisBubbleBonus = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Dollar Of Agility")?.getBonus() ?? 0;
    const agiBubbleBonus = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Nickel Of Wisdom")?.getBonus() ?? 0;
    const mealBonus = cooking.meals.filter(meal => meal.bonusKey == "Cash").reduce((sum, meal) => sum += meal.getBonus() ?? 0, 0);
    const petArenaBonus1 = breeding.hasBonus(5) ? 1 : 0;
    const petArenaBonus2 = breeding.hasBonus(14) ? 1 : 0;
    const labBonus = lab.bonuses.find(bonus => bonus.active && bonus.index == 9)?.getBonus() ?? 0;
    const vialBonus = alchemy.vials.find(vial => vial.name == "Dieter Drink")?.getBonus() ?? 0;
    const dungeonBonus = dungeons.passives.get(PassiveType.Flurbo)?.find(bonus => bonus.effect == "Monster Cash")?.getBonus() ?? 0;
    const guildBonus = guild.guildBonuses.find(bonus => bonus.index == 8)?.getBonus() ?? 0;
    const family = data.get("family") as Family;
    const goldFoodStampBonus = stamps.flatMap(stamp => stamp).find(stamp => stamp.raw_name == "StampC7")?.getBonus() ?? 0;
    const goldFoodAchievement = achievementsInfo[AchievementConst.GoldFood].completed;
    const prayers = data.get("prayers") as Prayer[];
    const arcadeBonus = arcade.bonuses.filter(bonus => [10, 11].includes(bonus.index)).reduce((sum, bonus) => sum += bonus.getBonus(), 0);
    players.forEach(player => {
        player.setMonsterCash(strBubbleBonus, wisBubbleBonus, agiBubbleBonus, mealBonus,
            petArenaBonus1, petArenaBonus2, labBonus, vialBonus,
            dungeonBonus, guildBonus, family, goldFoodStampBonus, goldFoodAchievement, prayers, arcadeBonus);
    })

    return players;
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