import { itemMap, monstersMap, mapsMap, starSignMap } from "../maps";
import { Capacity } from './capacity';
import { Box, initPostOffice } from './postoffice';
import { ClassIndex, Talent, ClassTalentMap, GetTalentArray } from './talents';

export interface rawPlayerData {
    equipment: Array<Map<string, string>>
    equipmentStoneData: Map<string, Map<string, number>>
    toolsStoneData: Map<string, Map<string, number>>
    stats: Array<number>
    classNumber: number
    afkTarget: number
    currentMap: number
    starSigns: Array<string>
    money: number
    skills: Array<number>
    anvilProduction: Array<Array<number>>
    anvilStats: Array<number>
    anvilSelected: Array<number>
    maxCarryCap: string
    prayers: number[] // NOT MAPPED YET
    postOffice: number[] // NOT MAPPED YET
    timeAway: number // NOT MAPPED YET
    playerStuff: number[] // NOT MAPPED YET
    attackLoadout: number[][] // NOT MAPPED YET
    equippedCards: string[] // NOT MAPPED YET
    talentLevels: Record<string, number>
    talentMaxLevels: Record<string, number>
    postOffice: number[]
}

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

export class Item {
    raw_name: string;
    raw_item_data: any;
    location: number;
    type: string;
    display_name: string;

    constructor(raw_name: string, location: number, type: string) {
        this.raw_name = raw_name;
        this.raw_item_data = itemMap.get(raw_name);
        this.location = location;
        this.type = type;
        this.display_name = this.raw_item_data?.displayName.replace(/_/g, " ") || "Unknown";
    }
}

export class Equipment extends Item {
    constructor(raw_name: string, location: number, type: string) {
        super(raw_name, location, type);
    }
}

export class Tool extends Item {
    constructor(raw_name: string, location: number, type: string) {
        super(raw_name, location, type);
    }
}

export class Food extends Item {
    constructor(raw_name: string, location: number, type: string) {
        super(raw_name, location, type);
    }
}

export class PlayerEquipment {
    equipment: Array<Item>;
    tools: Array<Item>;
    food: Array<Item>;

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
    Worship = 9
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
        { displayName: "Thread", internalName: "CraftMat1", time: 100, levelReq: 1, exp: 5, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Trusty Nails", internalName: "CraftMat5", time: 250, levelReq: 5, exp: 8, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Boring Brick", internalName: "CraftMat6", time: 500, levelReq: 12, exp: 14, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Chain Link", internalName: "CraftMat7", time: 1000, levelReq: 18, exp: 25, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Leather Hide", internalName: "CraftMat9", time: 2000, levelReq: 25, exp: 40, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Pinion Spur", internalName: "CraftMat8", time: 5000, levelReq: 32, exp: 80, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Lugi Bracket", internalName: "CraftMat10", time: 12500, levelReq: 40, exp: 160, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Filler", internalName: "CraftMat11", time: 25000, levelReq: 50, exp: 200, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Filler", internalName: "CraftMat12", time: 40000, levelReq: 60, exp: 350, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Filler", internalName: "CraftMat13", time: 60000, levelReq: 70, exp: 500, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Filler", internalName: "CraftMat14", time: 90000, levelReq: 80, exp: 700, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Filler", internalName: "CraftMat15", time: 120000, levelReq: 90, exp: 1000, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Filler", internalName: "CraftMat16", time: 160000, levelReq: 100, exp: 1300, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 },
        { displayName: "Filler", internalName: "CraftMat17", time: 250000, levelReq: 110, exp: 2000, currentAmount: 0, currentXP: 0, currentProgress: 0, totalProduced: 0 }
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
    currentProgress: number // maybe not?
    totalProduced: number // I'm taking a wild guess
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

    getSpeed = (agilitySpeedBonus: number = 0, statueBonus: number = 0) => {
        // if ("ProdSpdBonus" == t) {
        //     t = r._customBlock_StampBonusOfTypeX("AnvilPAspd");
        //     var n = b.engine.getGameAttribute("AnvilPAstats")[4];
        //     n = parsenum(n);
        //     var s = b.engine.getGameAttribute("DNSM");
        //     (s = null != d.BoxRewards ? s.getReserved("BoxRewards") : s.h.BoxRewards),
        //         (s = 1 + ((parsenum(s) = null != d.ProdSpd ? s.getReserved("ProdSpd") : s.h.ProdSpd) + H._customBlock_ArbitraryCode("StatueBonusGiven11")) / 100);
        //     var a = b.engine.getGameAttribute("DNSM");
        //     return (
        //         (a = null != d.AlchBubbles ? a.getReserved("AlchBubbles") : a.h.AlchBubbles),
        //         (1 + (t + 2 * n) / 100) * s * (1 + (parsenum(a) = null != d.AnvilACTIVE ? a.getReserved("AnvilACTIVE") : a.h.AnvilACTIVE) / 100) * K._customBlock_AnvilProduceStats("ProdSpdBonusFromAGI")
        //     );
        // }
        // if ("ProdSpdBonusFromAGI" == t)
        //     return (
        //         1000 > H._customBlock_TotalStats("AGI")
        //             ? ((t = b.engine.getGameAttribute("DNSM")), (n = (Math.pow(H._customBlock_TotalStats("AGI") + 1, 0.37) - 1) / 40))
        //             : ((t = b.engine.getGameAttribute("DNSM")), (n = ((H._customBlock_TotalStats("AGI") - 1000) / (H._customBlock_TotalStats("AGI") + 2500)) * 0.5 + 0.255)),
        //         null != d.ProdAGIspd ? t.setReserved("ProdAGIspd", n) : (t.h.ProdAGIspd = n),
        //         (t = b.engine.getGameAttribute("DNSM")),
        //         (n = b.engine.getGameAttribute("DNSM")),
        //         (n = 2 * (parsenum(n) = null != d.ProdAGIspd ? n.getReserved("ProdAGIspd") : n.h.ProdAGIspd)),
        //         null != d.ProdAGIspd ? t.setReserved("ProdAGIspd", n) : (t.h.ProdAGIspd = n),
        //         (t = b.engine.getGameAttribute("DNSM")),
        //         1 + (parsenum(t) = null != d.ProdAGIspd ? t.getReserved("ProdAGIspd") : t.h.ProdAGIspd)
        //     );

    }

    getSpeedBonusFromAgility = (agility: number = 0): number => {
        let base: number = (Math.pow(agility + 1, 0.37) - 1) / 40;
        if (agility > 1000) {
            base = ((agility - 1000) / (agility + 2500)) * 0.5 + 0.255;
        }
        return base * 2 + 1;
    }

    getCoinCost = (alchemyCostReduction: number, pointsBought: number = this.pointsFromCoins) => {
        const baseCost = Math.pow(pointsBought, 3) + 50;
        return Math.round(baseCost * (1 + pointsBought / 100) * Math.max(0.1, 1 - alchemyCostReduction / 100));
    }

    getTotalCoinCost = (alchemyCostReduction: number, pointsBought: number = this.pointsFromCoins) => {
        let totalCost = 0;
        range(0, pointsBought).forEach((_, point) => {
            totalCost += this.getCoinCost(alchemyCostReduction, point);
        });

        return totalCost;
    }
}

export class Player {
    playerID: number;
    playerName: string;
    gear: PlayerEquipment = new PlayerEquipment();
    stats: PlayerStats = new PlayerStats();
    level: number = 0;
    class: string = "Blank";
    currentMonster: string = "Blank";
    currentMap: string = "Blank";
    starSigns: Array<string> = [];
    money: number = 0;
    skills: Map<SkillsIndex, number>;
    skillsRank: Map<SkillsIndex, number>;
    anvil: Anvil = new Anvil();
    capacity: Capacity = new Capacity();
    talents: Talent[] = [];
    postOffice: Box[] = initPostOffice();

    constructor(playerID: number, playerName: string) {
        this.playerID = playerID;
        this.playerName = playerName;
        this.skills = new Map<SkillsIndex, number>();
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
            default: return ClassIndex.Beginner; // Is this really the best, default?
        }
    }
}


function parseEquipment(rawPlayerData: rawPlayerData) {
    let currentPlayer = new PlayerEquipment();
    rawPlayerData.equipment?.forEach((data, equipIndex) => {
        if (equipIndex == 0) { // armor 
            Object.entries(data).forEach(([location, name], _) => {
                currentPlayer.equipment.push(new Equipment(name, parseInt(location), "armor"));
            })
        }
        if (equipIndex == 1) { // tools
            Object.entries(data).forEach(([location, name], _) => {
                currentPlayer.tools.push(new Tool(name, parseInt(location), "tools"));
            })
        }
        if (equipIndex == 2) { // food
            Object.entries(data).forEach(([location, name], _) => {
                currentPlayer.food.push(new Food(name, parseInt(location), "food"));
            })
        }
    });

    return currentPlayer;
}

export default function parsePlayer(rawData: Array<rawPlayerData>, playerNames: Array<string>) {
    const allSkillsMap: Map<SkillsIndex, Array<number>> = new Map<SkillsIndex, Array<number>>();
    const parsedData = rawData.map((rawPlayerData, index) => {
        if (!playerNames) {
            console.log("Player Names is missing!");
        }
        let currentPlayer = new Player(index, playerNames ? playerNames[index] : "");
        currentPlayer.gear = parseEquipment(rawPlayerData);
        currentPlayer.stats.setStats(rawPlayerData.stats);
        currentPlayer.level = rawPlayerData.stats[4];
        if (rawPlayerData.classNumber) {
            currentPlayer.class = ClassIndex[rawPlayerData.classNumber]?.replace(/_/g, " ") || "New Class?";
        }
        if (rawPlayerData.afkTarget) {
            currentPlayer.currentMonster = monstersMap.get(rawPlayerData.afkTarget.toString())?.replace(/_/g, " ") || "New Monster?";
        }
        if (rawPlayerData.currentMap) {
            currentPlayer.currentMap = mapsMap.get(rawPlayerData.currentMap.toString())?.replace(/_/g, " ") || "New Map?";
        }
        if (rawPlayerData.starSigns) {
            currentPlayer.starSigns = rawPlayerData.starSigns.map((sign: string) => {
                const signData = starSignMap.get(sign);
                if (!signData) {
                    return "";
                }
                return `${signData.name.replace(/_/g, " ")} | ${signData.description.replace(/_/g, " ")}`;
            });
            // Remove empty sign, need to handle this better in the future. 
            // This is due to the array ending with a trailing ',' before the split.
            currentPlayer.starSigns = currentPlayer.starSigns.filter((sign) => { if (sign) return sign; });
        }
        if (rawPlayerData.money) {
            currentPlayer.money = rawPlayerData.money;
        }
        rawPlayerData.skills.forEach((skillLevel, skillIndex) => {
            // Only get the indexes we care about
            if (skillIndex in SkillsIndex) {
                // update the player skill level
                currentPlayer.skills.set(skillIndex as SkillsIndex, skillLevel);
                // record skill levels across all players in a map
                if (!allSkillsMap.has(skillIndex)) {
                    allSkillsMap.set(skillIndex, []);
                }
                allSkillsMap.get(skillIndex)?.push(skillLevel);
            }
        })

        if (rawPlayerData.anvilProduction) {
            currentPlayer.anvil.production.forEach((item, index) => {
                // TODO: Get rid of magic index
                item.currentAmount = rawPlayerData.anvilProduction[index][0];
                item.currentXP = rawPlayerData.anvilProduction[index][1];
                item.currentProgress = rawPlayerData.anvilProduction[index][2];
                item.totalProduced = rawPlayerData.anvilProduction[index][3];
            })
        }

        if (rawPlayerData.anvilStats) {
            // TODO: Get rid of magic index
            currentPlayer.anvil.availablePoints = rawPlayerData.anvilStats[0];
            currentPlayer.anvil.pointsFromCoins = rawPlayerData.anvilStats[1];
            currentPlayer.anvil.pointsFromMats = rawPlayerData.anvilStats[2];
            currentPlayer.anvil.xpPoints = rawPlayerData.anvilStats[3];
            currentPlayer.anvil.speedPoints = rawPlayerData.anvilStats[4];
            currentPlayer.anvil.capPoints = rawPlayerData.anvilStats[5];
        }

        if (rawPlayerData.anvilSelected) {
            currentPlayer.anvil.currentlySelect = rawPlayerData.anvilSelected;
        }

        if (rawPlayerData.maxCarryCap) {
            currentPlayer.capacity = new Capacity(JSON.parse(rawPlayerData.maxCarryCap));
        }

        if (rawPlayerData.talentLevels && rawPlayerData.talentMaxLevels) {
            // NEED TO CLEAN THIS UP SO MUCH!
            const classIndex: ClassIndex = rawPlayerData.classNumber as ClassIndex;
            const talentPageNames: string[] = ClassTalentMap[classIndex].concat(Array(5).fill("Blank").map((_, i) => `Special Talent ${i + 1}`))
            talentPageNames.forEach((page: string) => {
                currentPlayer.talents = currentPlayer.talents.concat(GetTalentArray(page));
            })

            currentPlayer.talents.forEach((talent) => {
                talent.level = rawPlayerData.talentLevels[talent.skillIndex] ?? 0;
                talent.maxLevel = rawPlayerData.talentMaxLevels[talent.skillIndex] ?? 0;
            })
        }

        if (rawPlayerData.postOffice) {
            currentPlayer.postOffice.forEach((box, index) => {
                box.level = rawPlayerData.postOffice[index];
            })
        }

        return currentPlayer;
    });

    // identify player ranking in each skill
    parsedData.forEach((player) => {
        for (const [skillIndex, skillLevel] of player.skills) {
            const sortedList = allSkillsMap.get(skillIndex)?.sort((a, b) => b - a);
            if (sortedList) {
                const skillRank = sortedList.indexOf(skillLevel);
                player.skillsRank.set(skillIndex, skillRank);
            }
        }
    })

    return parsedData;
}