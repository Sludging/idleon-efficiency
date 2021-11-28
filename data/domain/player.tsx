import { DocumentSnapshot as Document } from "@firebase/firestore";

import { itemMap, monstersMap, mapsMap } from "../maps";
import { Capacity } from './capacity';
import { StarSignMap, StarSign } from './starsigns';
import { Box, initPostOffice } from './postoffice';
import { Worship } from './worship';
import { ClassIndex, Talent, ClassTalentMap, GetTalentArray } from './talents';
import { CardInfo } from "./cards";
import { notUndefined } from '../utility';

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

    getSpeedBonusFromAgility = (agility: number = 0): number => {
        let base: number = (Math.pow(agility + 1, 0.37) - 1) / 40;
        if (agility > 1000) {
            base = ((agility - 1000) / (agility + 2500)) * 0.5 + 0.255;
        }
        return (base * 2) + 1;
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
    classId: ClassIndex = ClassIndex.Beginner;
    currentMonster: string = "Blank";
    currentMap: string = "Blank";
    currentMapId: number = 0;
    starSigns: StarSign[] = [];
    money: number = 0;
    skills: Map<SkillsIndex, number>;
    skillsRank: Map<SkillsIndex, number>;
    anvil: Anvil = new Anvil();
    capacity: Capacity = new Capacity();
    talents: Talent[] = [];
    postOffice: Box[] = initPostOffice();
    activeBubblesString: string[] = [];
    afkFor: number = 0;
    worship: Worship = new Worship();
    cardInfo: CardInfo | undefined = undefined; // TODO: Do BETTER!
    activeBuffs: Talent[] = [];

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

const functionArray: Function[] = [
    (doc: Document, player: Player) => parseEquipment(doc.get(`EquipOrder_${player.playerID}`), player),
    (doc: Document, player: Player) => parseStats(doc.get(`PVStatList_${player.playerID}`), player),
    (doc: Document, player: Player) => { 
        player.class = ClassIndex[doc.get(`CharacterClass_${player.playerID}`)]?.replace(/_/g, " ") || "New Class?";
        player.classId = doc.get(`CharacterClass_${player.playerID}`) as ClassIndex;
    },
    (doc: Document, player: Player) => { player.currentMonster = monstersMap.get(doc.get(`AFKtarget_${player.playerID}`))?.replace(/_/g, " ") || "New Monster?"; },
    (doc: Document, player: Player) => parseMap(doc.get(`CurrentMap_${player.playerID}`), player),
    (doc: Document, player: Player) => parseStarSigns(doc.get(`PVtStarSign_${player.playerID}`), player),
    (doc: Document, player: Player) => parseStarSigns(doc.get(`PVtStarSign_${player.playerID}`), player),
    (doc: Document, player: Player) => { player.money = doc.get(`Money_${player.playerID}`) },
    (doc: Document, player: Player) => parseSkills(doc.get(`Lv0_${player.playerID}`), player),
    (doc: Document, player: Player) => parseAnvil(
        doc.get(`AnvilPA_${player.playerID}`),
        doc.get(`AnvilPAstats_${player.playerID}`),
        doc.get(`AnvilPAselect_${player.playerID}`),
        player
    ),
    (doc: Document, player: Player) => { player.capacity = new Capacity(JSON.parse(doc.get(`MaxCarryCap_${player.playerID}`))) },
    (doc: Document, player: Player) => parseTalents(
        doc.get(`SL_${player.playerID}`),
        doc.get(`SM_${player.playerID}`),
        player
    ),
    (doc: Document, player: Player) => parsePostOffice(doc.get(`POu_${player.playerID}`), player),
    (doc: Document, player: Player) => { player.activeBubblesString = (JSON.parse(doc.get('CauldronBubbles')) as string[][])[player.playerID] },
    (doc: Document, player: Player) => { 
        const timeAway = JSON.parse(doc.get('TimeAway'));
        player.afkFor = timeAway['Player'] - (doc.get(`PTimeAway_${player.playerID}`) * 1000);
    },
    (doc: Document, player: Player) => { 
        const jsonStuff = JSON.parse(doc.get(`PlayerStuff_${player.playerID}`));
        player.worship.currentCharge = jsonStuff[0];
    },
    (doc: Document, player: Player) => { 
        const currentCardSet = JSON.parse(doc.get(`CSetEq_${player.playerID}`));
        const equippedCards = doc.get(`CardEquip_${player.playerID}`) as string[];
        const cards = JSON.parse(doc.get('Cards0'));
        player.cardInfo = new CardInfo(cards, currentCardSet, equippedCards);
    },
    (doc: Document, player: Player) => { 
        const activeBuffs = doc.get(`BuffsActive_${player.playerID}`) as Record<number, number>[];
        player.activeBuffs = activeBuffs.map((buff) => {
            return player.talents.find(x => x.skillIndex == buff[0]);
        }).filter(notUndefined)
    }
];

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

const parseSkills = (skills: Array<number>, player: Player) => {
    skills.forEach((skillLevel, skillIndex) => {
        // Only get the indexes we care about
        if (skillIndex in SkillsIndex) {
            // update the player skill level
            player.skills.set(skillIndex as SkillsIndex, skillLevel);
        }
    })
}

const parseStarSigns = (starSigns: string, player: Player) => {
    player.starSigns = starSigns.split(',').map((sign) => {
        const asNumber: number = Number(sign);
        if (!isNaN(asNumber)) {
            return StarSignMap[asNumber];
        }
    }).filter(notUndefined);
}

const parseMap = (currentMap: number, player: Player) => {
    player.currentMapId = currentMap;
    player.currentMap = mapsMap.get(currentMap.toString())?.replace(/_/g, " ") || "New Map?";
}

const parseStats = (stats: Array<number>, player: Player) => {
    player.stats.setStats(stats);
    player.level = stats[4];
}

const parseEquipment = (equipment: Array<Map<string, string>>, player: Player) => {
    let playerEquipment = new PlayerEquipment();
    equipment?.forEach((data, equipIndex) => {
        if (equipIndex == 0) { // armor 
            Object.entries(data).forEach(([location, name], _) => {
                playerEquipment.equipment.push(new Equipment(name, parseInt(location), "armor"));
            })
        }
        if (equipIndex == 1) { // tools
            Object.entries(data).forEach(([location, name], _) => {
                playerEquipment.tools.push(new Tool(name, parseInt(location), "tools"));
            })
        }
        if (equipIndex == 2) { // food
            Object.entries(data).forEach(([location, name], _) => {
                playerEquipment.food.push(new Food(name, parseInt(location), "food"));
            })
        }
    });

    player.gear = playerEquipment;
}

export default function parsePlayers(doc: Document, accountData: Map<string, any>) {
    const playerNames = accountData.get("playerNames") as string[];
    let parsedData = playerNames.map((playerName, index) => {
        let player = new Player(index, playerName);

        functionArray.forEach((toExecute) => {
            try {
                toExecute(doc, player);
            }
            catch (e) {
                console.log("Something went wrong parsing some player data");
                console.debug(e);
            }
        });

        return player;
    });

    // identify player ranking in each skill
    const allSkillsMap: Map<SkillsIndex, Array<number>> = new Map<SkillsIndex, Array<number>>();
    
    // record skill levels across all players in a map
    parsedData.forEach((player) => {
        player.skills.forEach((skillLevel, skillIndex) => {
            if (!allSkillsMap.has(skillIndex)) {
                allSkillsMap.set(skillIndex, []);
            }
            allSkillsMap.get(skillIndex)?.push(skillLevel);
        });
    });
    parsedData.forEach((player) => {
        if (player) {
            for (const [skillIndex, skillLevel] of player.skills) {
                const sortedList = allSkillsMap.get(skillIndex)?.sort((a, b) => b - a);
                if (sortedList) {
                    const skillRank = sortedList.indexOf(skillLevel);
                    player.skillsRank.set(skillIndex, skillRank);
                }
            }
        }
    })

    return parsedData;
}