import { PostOfficeConst } from './postoffice';
import { Card } from "./cards";
import { Player } from './player';
import { range } from '../utility';
import { AnvilProduceBase, initAnvilRepo } from './data/AnvilRepo';
import { AnvilProduceModel } from './model/anvilProduceModel';
import { Item } from './items';
import { Alchemy, AlchemyConst, CauldronIndex } from './alchemy';
import { Stamp, getStampBonusForKey } from './world-1/stamps';
import { SkillsIndex } from './SkillsIndex';
import { PlayerStatues, StatueConst } from './statues';
import { Shrine } from './shrines';
import { Prayer } from './prayers';
import { SaltLick } from './saltLick';
import { Family } from './family';
import { Achievement } from './achievements';
import { Dungeons, PassiveType } from './dungeons';
import { Sigils } from './sigils';
import { Skilling } from './skilling';
import { ClassIndex } from './talents';
import { Capacity } from './capacity';
import { Divinity } from './divinity';
import { Rift, SkillMastery } from './rift';
import { Breeding } from './breeding';
import { Domain, RawData } from './base/domain';
import { Worship } from './worship';
import { Summoning } from './world-6/summoning';
import { Guild } from './guild';
import { Bribe } from './bribes';
import { Sneaking } from './world-6/sneaking';
import { Cooking } from './cooking';


// if ("Costs2TypeAnvilPA" == t) {}
export class AnvilProduct {
    displayName: string = ''
    currentAmount: number = 0
    currentXP: number = 0
    currentProgress: number = 0
    totalProduced: number = 0
    hammers: number = 0

    totalSpeed: number = 0;

    // Production math
    futureProduction: number = 0;
    percentOfCap: number = 0
    timeTillCap: number = 0;

    constructor(public index: number, public data: AnvilProduceModel) { }

    static fromBase = (data: AnvilProduceBase[]) => {
        return data.filter(product => product.data.levelReq != 999).map(product => new AnvilProduct(product.index, product.data));
    }
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
    availablePoints: number = 0;
    pointsFromCoins: number = 0;
    pointsFromMats: number = 0;
    xpPoints: number = 0;
    speedPoints: number = 0;
    capPoints: number = 0;
    production: AnvilProduct[];
    currentlySelect: number[] = [];

    // Calculated
    costDiscount: number = 0;
    anvilSpeed: number = 0;
    anvilXP: number = 0;
    productCapacity: number = 0;

    constructor(public playerID: number) {
        this.production = AnvilProduct.fromBase(initAnvilRepo());
    }

    setCapacity = (bagCapacity: number = 0) => {
        this.productCapacity = Math.round(bagCapacity * (2 + 0.1 * this.capPoints));
    };

    setSpeed = (agility: number = 0, stampBonus: number = 0, poBoxBonus: number = 0, hammerHammerBonus: number = 0, statueBonus: number = 0, starSignTownSpeed: number = 0, talentTownSpeed: number = 0) => {
        const boxAndStatueMath = 1 + ((poBoxBonus + statueBonus) / 100);
        const agilityBonus = this.getSpeedBonusFromAgility(agility);
        this.anvilSpeed = 3600 * (1 + (stampBonus + (2 * this.speedPoints)) / 100) * boxAndStatueMath * (1 + (hammerHammerBonus / 100)) * agilityBonus * (1 + (starSignTownSpeed + talentTownSpeed) / 100);
    };

    getXPMulti = (player: Player, allSkillsXP: number, mmanBonus: number, riftBonus: number) => {
        const focusedSoulBonus = player.talents.find(talent => talent.skillIndex == 265)?.getBonus() ?? 0;
        const stampBonus = 0; // TODO: Real look up, but currently stamp isn't obtainable.
        const happyDudeBonus = player.talents.find(talent => talent.skillIndex == 75)?.getBonus() ?? 0;
        const math1 = 1 + ((focusedSoulBonus + stampBonus + happyDudeBonus + riftBonus) / 100);
        const smithingCardBonus = 1 + Card.GetTotalBonusForId(player.cardInfo?.equippedCards ?? [], 49) / 100;
        const blackSmithBox = player.postOffice[PostOfficeConst.BlacksmithBoxIndex];
        const postOfficeBonus = blackSmithBox.level > 0 ? blackSmithBox.bonuses[0].getBonus(blackSmithBox.level, 0) : 0;

        return Math.max(0.1, math1 * smithingCardBonus * (1 + (postOfficeBonus / 100)) + (allSkillsXP + mmanBonus) / 100);
    };

    setXP = (xpMulti: number) => {
        const baseMath = (1 + (3 * (this.xpPoints / 100))) * xpMulti;
        if (baseMath < 20) {
            this.anvilXP = baseMath;
            return;
        }

        const finalMath = Math.min(20 + ((baseMath - 20) / (baseMath - 20 + 70) * 50), 75);
        this.anvilXP = (100 * (finalMath - 1));
    };

    getSpeedBonusFromAgility = (agility: number = 0): number => {
        let base: number = (Math.pow(agility + 1, 0.37) - 1) / 40;
        if (agility > 1000) {
            base = ((agility - 1000) / (agility + 2500)) * 0.5 + 0.297;
        }
        return (base * 2) + 1;
    };

    getCoinCost = (pointsBought: number = this.pointsFromCoins) => {
        if (pointsBought >= 600) {
            return 0;
        }
        const baseCost = Math.pow(pointsBought, 3) + 50;
        return Math.round(baseCost * (1 + pointsBought / 100) * Math.max(0.1, 1 - this.costDiscount / 100));
    };

    getCoinCostToMax = (pointsBought: number = this.pointsFromCoins) => {
        return range(pointsBought, 600).reduce((sum, level) => sum += this.getCoinCost(level), 0)
    }

    getMonsterMat = (pointsBought: number = this.pointsFromMats) => {
        switch (true) {
            case pointsBought < 5: return 'Grasslands1';
            case pointsBought < 15: return 'Grasslands2';
            case pointsBought < 25: return 'Grasslands3';
            case pointsBought < 40: return 'Jungle1';
            case pointsBought < 55: return 'Jungle3';
            case pointsBought < 70: return 'Forest1';
            case pointsBought < 85: return 'Forest3';
            case pointsBought < 100: return 'DesertA1';
            case pointsBought < 115: return 'DesertA3';
            case pointsBought < 130: return 'DesertB1';
            case pointsBought < 150: return 'DesertB3';
            case pointsBought < 175: return 'DesertC1';
            case pointsBought < 200: return 'DesertC2';
            case pointsBought < 225: return 'DesertC4';
            case pointsBought < 250: return 'SnowA2';
            case pointsBought < 280: return 'SnowB1';
            case pointsBought < 310: return 'SnowB3';
            case pointsBought < 350: return 'SnowC1';
            case pointsBought < 375: return 'SnowA4';
            case pointsBought < 410: return 'GalaxyA1';
            case pointsBought < 440: return 'GalaxyA3';
            case pointsBought < 470: return 'GalaxyA4';
            case pointsBought < 500: return 'GalaxyB1';
            case pointsBought < 540: return 'GalaxyB3';
            case pointsBought < 600: return 'GalaxyC1';
            case pointsBought < 700: return 'GalaxyC4';
            default: return '';
        }
    }

    getMonsterMatCost = (pointsBought: number = this.pointsFromMats) => {
        return Math.round((Math.pow(pointsBought + 1, 1.5) + pointsBought) * Math.max(0.1, 1 - this.costDiscount / 100));
    };

    getTotalCoinCost = (pointsBought: number = this.pointsFromCoins) => {
        let totalCost = 0;
        range(0, pointsBought).forEach((_, point) => {
            totalCost += this.getCoinCost(point);
        });

        return totalCost;
    };

    getMonsterCostToMax = (pointsBought: number = this.pointsFromMats) => {
        const finalCosts: { [key: string]: number; } = {};
        range(pointsBought, 700).forEach(level => {
            const monsterMat = this.getMonsterMat(level);
            const cost = this.getMonsterMatCost(level);
            if (!finalCosts[monsterMat]) {
                finalCosts[monsterMat] = 0;
            }
            finalCosts[monsterMat] = finalCosts[monsterMat] + cost;
        })
        return finalCosts;
    }
}

export class AnvilWrapper extends Domain {
    getRawKeys(): RawData[] {
        return [
            { key: "AnvilPA_", perPlayer: true, default: [] },
            { key: "AnvilPAstats_", perPlayer: true, default: [] },
            { key: "AnvilPAselect_", perPlayer: true, default: [] },
        ]
    }
    init(allItems: Item[], charCount: number) {
        this.production = AnvilProduct.fromBase(initAnvilRepo());
        [...Array(charCount)].forEach((_, pIndex) => {
            const playerAnvil = new Anvil(pIndex);
            playerAnvil.playerID = pIndex;
            this.playerAnvils[pIndex] = playerAnvil;
        })

        return this;
    }

    parse(data: Map<string, any>): void {
        const charCount = data.get("charCount") as number;
        const allItems = data.get("itemsData") as Item[];
        const wrapper = data.get(this.getDataKey()) as AnvilWrapper;

        const anvilProduction = [...Array(charCount)].map((_, i) => data.get(`AnvilPA_${i}`)) as number[][][];
        const anvilStats = [...Array(charCount)].map((_, i) => data.get(`AnvilPAstats_${i}`)) as number[][];
        const anvilSelected = [...Array(charCount)].map((_, i) => data.get(`AnvilPAselect_${i}`)) as number[][];

        range(0, charCount).forEach((_, pIndex) => {
            // If this is the first time handling this player, init.
            if (Object.values(wrapper.playerAnvils).length <= pIndex) {
                wrapper.playerAnvils[pIndex] = new Anvil(pIndex);
            }

            const anvil = wrapper.playerAnvils[pIndex];

            anvil.production.forEach((item, index) => {
                item.currentAmount = anvilProduction[pIndex][index][0];
                item.currentXP = anvilProduction[pIndex][index][1];
                item.currentProgress = anvilProduction[pIndex][index][2];
                item.totalProduced = anvilProduction[pIndex][index][3];
                item.hammers = anvilSelected[pIndex].filter(x => x == index).length;
                item.displayName = allItems.find(fullItem => fullItem.internalName == item.data.item)?.displayName ?? "Unknown";
            })

            anvil.availablePoints = anvilStats[pIndex][0];
            anvil.pointsFromCoins = anvilStats[pIndex][1];
            anvil.pointsFromMats = anvilStats[pIndex][2];
            anvil.xpPoints = anvilStats[pIndex][3];
            anvil.speedPoints = anvilStats[pIndex][4];
            anvil.capPoints = anvilStats[pIndex][5];

            anvil.currentlySelect = anvilSelected[pIndex];
        })
    }

    playerAnvils: Record<number, Anvil> = {};
    production: AnvilProduct[] = [];

    constructor(public dataKey: string) {
        super(dataKey)
    }

}

export const updateAnvil = (data: Map<string, any>) => {
    const anvilWrapper = data.get("anvil") as AnvilWrapper;
    const alchemy = data.get("alchemy") as Alchemy;
    const stampData = data.get("stamps") as Stamp[][];
    const players = data.get("players") as Player[];
    const statues = data.get("statues") as PlayerStatues[];

    // Xp stuff, should we do some of this in player?
    const shrines = data.get("shrines") as Shrine[];
    const prayers = data.get("prayers") as Prayer[];
    const saltLick = data.get("saltLick") as SaltLick;
    const family = data.get("family") as Family;
    const achievementsInfo = data.get("achievements") as Achievement[];
    const dungeonsData = data.get("dungeons") as Dungeons;
    const sigils = data.get("sigils") as Sigils;
    const divinity = data.get("divinity") as Divinity;
    const cards = data.get("cards") as Card[];
    const rift = data.get("rift") as Rift;
    const breeding = data.get("breeding") as Breeding;
    const worship = data.get("worship") as Worship;
    const summoning = data.get("summoning") as Summoning;
    const guild = data.get("guild") as Guild;
    const cooking = data.get("cooking") as Cooking;
    const sneaking = data.get("sneaking") as Sneaking;
    const bribes = data.get("bribes") as Bribe[];

    const skillMastery = rift.bonuses.find(bonus => bonus.name == "Skill Mastery") as SkillMastery;
    // Cap stuff
    const capacity = data.get("capacity") as Capacity;

    players.forEach(player => {
        const playerAnvil = anvilWrapper.playerAnvils[player.playerID];

        // Get anvilnomics discount.
        playerAnvil.costDiscount = alchemy.getBonusForPlayer(player, CauldronIndex.Quicc, AlchemyConst.Anvilnomics);

        // Speed math
        const anvilZoomerBonus = stampData ? stampData[1][2].getBonus(player.skills.get(SkillsIndex.Smithing)?.level) : 0;
        const blackSmithBox = player.postOffice[PostOfficeConst.BlacksmithBoxIndex];
        const postOfficeBonus = blackSmithBox.level > 0 ? blackSmithBox.bonuses[1].getBonus(blackSmithBox.level, 1) : 0;
        const activeHammer = player.activeBubbles.find(bubble => bubble.name == "Hammer Hammer");
        const hammerHammerBonus = activeHammer ? alchemy.getBonusForPlayer(player, CauldronIndex.Quicc, activeHammer.bubbleIndex) : 0;
        const anvilStatueBonus = statues[player.playerID].statues[StatueConst.AnvilIndex].getBonus(player);
        const starSignBonus = player.starSigns.reduce((sum, sign) => sum += sign.getBonus("Speed in Town"), 0);
        const talentTownSpeedBonus = player.talents.find(x => x.skillIndex == 269)?.getBonus() ?? 0;
        playerAnvil.setSpeed(player.stats.agility, anvilZoomerBonus, postOfficeBonus, hammerHammerBonus, anvilStatueBonus, starSignBonus, talentTownSpeedBonus);

        // XP Math
        const saltLickBonus = saltLick.getBonus(3);
        const dungeonBonus = (dungeonsData.passives.get(PassiveType.Flurbo) ?? [])[2]?.getBonus() ?? 0; // Lava is looking at the wrong bonus.
        const goldFoodStampBonus = getStampBonusForKey(stampData, "GFood");
        const goldFoodBubble = alchemy.getBonusForPlayer(player, CauldronIndex.Power, 18);
        const allSkillXP = Skilling.getAllSkillXP(player, shrines, statues[player.playerID], prayers, saltLickBonus, dungeonBonus, family, goldFoodStampBonus, sigils.sigils[14].getBonus(), goldFoodBubble, divinity, cards, achievementsInfo, skillMastery, breeding, worship, guild, summoning, sneaking, bribes, cooking);
        const mmanBonus = players.find(player => [ClassIndex.Maestro, ClassIndex.Voidwalker].includes(player.classId))?.talents.find(talent => talent.skillIndex == 42)?.getBonus() ?? 0;
        const riftBonus = skillMastery.getSkillBonus(SkillsIndex.Smithing, 1);
        const xpMulti = playerAnvil.getXPMulti(player, allSkillXP, mmanBonus, riftBonus);
        playerAnvil.setXP(xpMulti);

        // Capacity
        const playerCapacity = capacity.players[player.playerID];
        playerAnvil.setCapacity(playerCapacity?.bags.find(x => x.name == "bCraft")?.maxCarry ?? 0);

        playerAnvil.production.forEach(anvilProduct => {
            anvilProduct.futureProduction = Math.min(Math.round(anvilProduct.currentAmount + ((anvilProduct.currentProgress + (player.afkFor * playerAnvil.anvilSpeed / 3600)) / anvilProduct.data.time) * (anvilProduct.hammers ?? 0)), playerAnvil.productCapacity);
            anvilProduct.percentOfCap = Math.round(anvilProduct.futureProduction / playerAnvil.productCapacity * 100);
            anvilProduct.timeTillCap = ((playerAnvil.productCapacity - anvilProduct.futureProduction) / (playerAnvil.anvilSpeed / 3600 / anvilProduct.data.time * (anvilProduct.hammers ?? 0)));
        })
    })

    anvilWrapper.production.forEach((anvilProduct, index) => {
        anvilProduct.totalProduced = Object.entries(anvilWrapper.playerAnvils).reduce((sum, [_, anvil]) => sum += anvil.production[index].totalProduced, 0);
        anvilProduct.totalSpeed = Object.entries(anvilWrapper.playerAnvils).reduce((sum, [_, anvil]) =>
            sum += anvil.production[index].hammers > 0 ? anvil.anvilSpeed * anvil.production[index].hammers : 0
            , 0);
    })

    return anvilWrapper;
}