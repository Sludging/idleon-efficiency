import { notUndefined, round } from "../utility";
import { Alchemy, AlchemyConst, Bubble, CauldronIndex } from "./alchemy";
import { MapData, MapInfo } from "./maps";
import { Player, SkillsIndex } from "./player";
import { Stamp, StampConsts, StampTab } from "./stamps";
import { ClassIndex, TalentConst } from "./talents";

const getActiveBubbles = (alchemy: Alchemy, activeBubbleString: string[]): Bubble[] => {
    return activeBubbleString.map((bubbleString, _) => {
        const activeBubble = alchemy.getActiveBubble(bubbleString);
        if (activeBubble) {
            return activeBubble;
        }
    }).filter(notUndefined);
}

const SkullChargeMap: Record<string, number> = {
    "WorshipSkull1": 100,
    "WorshipSkull2": 200,
    "WorshipSkull3": 400,
    "WorshipSkull4": 750,
    "WorshipSkull5": 1250,
    "WorshipSkull6": 1750,
    "WorshipSkull7": 2500
}

const SkullSpeedMap: Record<string, number> = {
    "WorshipSkull1": 4,
    "WorshipSkull2": 5,
    "WorshipSkull3": 5,
    "WorshipSkull4": 6,
    "WorshipSkull5": 7,
    "WorshipSkull6": 7,
    "WorshipSkull7": 8
}

const totemNames: string[] = "Goblin_Gorefest Wakawaka_War Acorn_Assault Frosty_Firefight Clash_of_Cans Tower_Defence_6".split(" ");
const totemMapIds: number[] = [26, 63, 30, 107, 155];

const worshipBaseInfo: string[][] = ["4 130 goblinG 0 170 570 25 60 1".split(" "),
"7 70 moonman 21 42 357 40 250 10".split(" "),
"13 40 acorn 38 655 200 60 1000 30".split(" "),
"25 190 snowball 56 42 357 90 3000 45".split(" "),
"40 300 w4b2 74 2 493 120 8000 60".split(" "),
"70 130 goblinG 91 42 357 300 25000 75".split(" ")
]

export class Totem {
    constructor(public name: string, public map: MapData | undefined, public maxWave: number, public index: number) { }

    getWaveMultiplier = () => {
        if (this.maxWave == 0) {
            return 0;
        }

        return Math.pow((5 + this.maxWave) / 10, 2.6);
    }

    getExpRewards = (expMultiplier: number = 1) => {
        return Math.floor(15 * Math.pow(this.index + 1, 2) * expMultiplier * Math.pow(this.getWaveMultiplier(), 0.9));
    }

    getEfficiencyBonus = (efficiency: number = 0) => {
        const baseInfo = Number(worshipBaseInfo[this.index][7]);
        if (efficiency >= baseInfo) {
            return Math.floor(100 * Math.pow(efficiency / (10 * baseInfo), 0.25))
        }
        return 0;

    }

    getChargeCost = () => {
        return Number(worshipBaseInfo[this.index][6]);
    }

    getSoulRewards = (efficiency: number = 0, foodBonus: number = 0) => {
        return Math.floor(5 * (1 + (this.getEfficiencyBonus(efficiency) / 100)) * this.getWaveMultiplier() * (1 + (foodBonus / 100)))
    }

}

interface PlayerWorshipData {
    currentCharge: number
    estimatedCharge: number
    chargeRate: number
    maxCharge: number
    playerID: number
}

export class Worship {
    playerData: PlayerWorshipData[] = [];
    totemInfo: Totem[] = [];
    constructor() { }


    static getEstimatedCharge = (currentCharge: number, chargeRate: number, maxCharge: number, timeAwayInSeconds: number) => {
        return Math.min(currentCharge + chargeRate * (timeAwayInSeconds / 3600), maxCharge);
    }

    static getChargeRate = (skullInternalName: string, worshipLevel: number = 0, popeRate: number = 0, cardBonus: number = 0, stampBonus: number = 0, talentBonus: number = 0) => {
        const skullSpeed = SkullSpeedMap[skullInternalName];
        const speedMath = 0.2 * Math.pow(skullSpeed, 1.3);
        const levelMath = (0.9 * Math.pow(worshipLevel, 0.5)) / (Math.pow(worshipLevel, 0.5) + 250);
        const base = 6 / Math.max(5.7 - (speedMath + (levelMath + (0.6 * worshipLevel) / (worshipLevel + 40))), 0.57);
        return base * Math.max(1, popeRate) * (1 + (cardBonus + stampBonus) / 100) * Math.max(talentBonus, 1)
    }

    static getMaxCharge = (skullInternalName: string, cardBonus: number = 0, buffBonus: number = 0, stampBonus: number = 0, alchemyBonus: number = 0, worshipLevel: number = 0, popeRate: number = 0, postofficeBonus: number = 0) => {
        const skullChargeBonus = SkullChargeMap[skullInternalName];
        const base = buffBonus + (stampBonus + alchemyBonus * Math.floor(worshipLevel / 10));
        return Math.floor(Math.max(50, cardBonus + postofficeBonus + (base + skullChargeBonus * Math.max(popeRate, 1))));
    }
}

export default function parseWorship(totemInfo: number[][], accountData: Map<string, any>) {
    const worship = new Worship();
    const players = accountData.get("players") as Player[];
    const alchemy = accountData.get("alchemy") as Alchemy;
    const stamps = accountData.get("stamps") as Stamp[][];

    if (totemInfo.length > 0) {
        players.forEach(player => {
            const worshipLevel = player.skills.get(SkillsIndex.Worship)?.level;
            const praydayStamp = stamps[StampTab.Skill][StampConsts.PraydayIndex];
            let gospelLeaderBonus = alchemy.cauldrons[CauldronIndex.HighIQ].bubbles[AlchemyConst.GospelLeader].getBonus();
            let popeBonus = getActiveBubbles(alchemy, player.activeBubblesString).find(x => x.name == "Call Me Pope")?.getBonus() ?? 0;

            if (player.getBaseClass() == ClassIndex.Mage) {
                const classMultiBonus = alchemy.cauldrons[CauldronIndex.HighIQ].bubbles[1].getBonus();
                gospelLeaderBonus *= classMultiBonus;
            }

            // max charge
            const maxChargeCardBonus = player.cardInfo?.equippedCards.find(x => x.id == "F10")?.getBonus() ?? 0;
            const talentChargeBonus = player.activeBuffs.find(x => x.skillIndex == TalentConst.ChargeSiphonIndex)?.getBonus(false, true) ?? 0;
            const postOfficeBonus = player.postOffice[18].bonuses[1].getBonus(player.postOffice[18].level, 1);
            const maxCharge = player.gear.tools[5] ? Worship.getMaxCharge(player.gear.tools[5].internalName, maxChargeCardBonus, talentChargeBonus, praydayStamp.getBonus(worshipLevel), gospelLeaderBonus, worshipLevel, popeBonus, postOfficeBonus) : 0;

            // charge rate
            const flowinStamp = stamps[StampTab.Skill][StampConsts.FlowinIndex];
            const chargeSpeedTalent = player.talents.find(x => x.skillIndex == TalentConst.NearbyOutletIndex);
            const talentBonus = chargeSpeedTalent?.getBonus() ?? 0;
            const chargeCardBonus = player.cardInfo?.equippedCards.find(x => x.id == "F11")?.getBonus() ?? 0;
            const chargeRate = player.gear.tools[5] ? Worship.getChargeRate(player.gear.tools[5].internalName, worshipLevel, popeBonus, chargeCardBonus, flowinStamp.getBonus(worshipLevel), talentBonus) : 0;
            worship.playerData.push({
                maxCharge: maxCharge,
                chargeRate: chargeRate,
                currentCharge: round(player.currentCharge),
                estimatedCharge: round(Worship.getEstimatedCharge(player.currentCharge, chargeRate, maxCharge, player.afkFor)),
                playerID: player.playerID
            })
        });

        // hard coded info, maybe better way?
        worship.totemInfo.push(new Totem(totemNames[0].replace(/_/g, " "), MapInfo.find(map => map.id == totemMapIds[0]), totemInfo[0][0], 0));
        worship.totemInfo.push(new Totem(totemNames[1].replace(/_/g, " "), MapInfo.find(map => map.id == totemMapIds[1]), totemInfo[0][1], 1));
        worship.totemInfo.push(new Totem(totemNames[2].replace(/_/g, " "), MapInfo.find(map => map.id == totemMapIds[2]), totemInfo[0][2], 2));
        worship.totemInfo.push(new Totem(totemNames[3].replace(/_/g, " "), MapInfo.find(map => map.id == totemMapIds[3]), totemInfo[0][3], 3));
        worship.totemInfo.push(new Totem(totemNames[4].replace(/_/g, " "), MapInfo.find(map => map.id == totemMapIds[4]), totemInfo[0][4], 4));
    }
    return worship;
}