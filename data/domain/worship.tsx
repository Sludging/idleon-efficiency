import { notUndefined, round } from "../utility";
import { Alchemy, AlchemyConst, Bubble, CauldronIndex } from "./alchemy";
import { Domain, RawData } from "./base/domain";
import { MapDataBase } from "./data/MapDataRepo";
import { Item } from "./items";
import { MapInfo } from "./maps";
import { SkullItemModel } from "./model/skullItemModel";
import { Player } from "./player";
import { SkillsIndex } from "./SkillsIndex";
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

const totemNames: string[] = "Goblin_Gorefest Wakawaka_War Acorn_Assault Frosty_Firefight Clash_of_Cans Citric_Conflict".split(" ");
const totemMapIds: number[] = [26, 63, 30, 107, 155, 208];

const worshipBaseInfo: string[][] = ["3 130 goblinG 0 170 570 25 60 1".split(" "),
"5 70 moonman 21 42 357 40 250 10".split(" "),
"9 40 acorn 38 655 200 60 1000 30".split(" "),
"18 190 snowball 56 42 357 90 3000 40".split(" "),
"34 300 w4b2 74 2 493 120 8000 50".split(" "),
"55 45 w5b3 91 158 362 250 25000 60".split(" ")
]

export class Totem {
    constructor(public name: string, public map: MapDataBase, public maxWave: number, public index: number) { }

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

interface TotalWorshipData {
    currentCharge: number
    chargeRate: number
    maxCharge: number
    overFlowTime: number
}

export class Worship extends Domain {
    playerData: PlayerWorshipData[] = [];
    totalData: TotalWorshipData = {
        currentCharge: 0,
        chargeRate: 0,
        maxCharge: 0,
        overFlowTime: 0
    };
    bestWizardPlayerID: number = -1;
    totemInfo: Totem[] = [];

    static getEstimatedCharge = (currentCharge: number, chargeRate: number, maxCharge: number, timeAwayInSeconds: number) => {
        return Math.min(currentCharge + chargeRate * (timeAwayInSeconds / 3600), maxCharge);
    }

    static getChargeRate = (skullSpeed: number, worshipLevel: number = 0, popeRate: number = 0, cardBonus: number = 0, stampBonus: number = 0, talentBonus: number = 0) => {
        if (skullSpeed < 3) {
            const speedMath = 5.7 + Math.pow(4 - skullSpeed, 2.2);
            const levelMath = (0.9 * Math.pow(worshipLevel, 0.5)) / (Math.pow(worshipLevel, 0.5) + 250);
            const base = 6 / Math.max(speedMath - (levelMath + (0.6 * worshipLevel) / (worshipLevel + 40)), 0.57);
            return base * Math.max(1, popeRate) * (1 + (cardBonus + stampBonus) / 100) * Math.max(talentBonus, 1)
        }
        // skull speed >= 3
        const speedMath = 0.2 * Math.pow(skullSpeed, 1.3);
        const levelMath = (0.9 * Math.pow(worshipLevel, 0.5)) / (Math.pow(worshipLevel, 0.5) + 250);
        const base = 6 / Math.max(5.7 - (speedMath + (levelMath + (0.6 * worshipLevel) / (worshipLevel + 40))), 0.57);
        return base * Math.max(1, popeRate) * (1 + (cardBonus + stampBonus) / 100) * Math.max(talentBonus, 1)
    }

    static getMaxCharge = (skullMaxCharge: number, cardBonus: number = 0, buffBonus: number = 0, stampBonus: number = 0, alchemyBonus: number = 0, worshipLevel: number = 0, popeRate: number = 0, postofficeBonus: number = 0) => {
        const base = buffBonus + (stampBonus + alchemyBonus * Math.floor(worshipLevel / 10));
        return Math.floor(Math.max(50, cardBonus + postofficeBonus + (base + skullMaxCharge * Math.max(popeRate, 1))));
    }

    getRawKeys(): RawData[] {
        return [
            {key: "TotemInfo", perPlayer: false, default: []},
        ]
    }

    init(allItems: Item[], charCount: number) {
        [...Array(6)].forEach((_, index) => {
            this.totemInfo.push(new Totem(totemNames[index].replace(/_/g, " "), MapInfo[totemMapIds[index]], 0, index));
        });

        return this;
    }

    parse(data: Map<string, any>): void {
        const worship = data.get(this.getDataKey()) as Worship;
        const totemInfo = data.get("TotemInfo") as number[][];

        const waveInfo = totemInfo[0];
        worship.totemInfo.forEach(totem => {
            if (waveInfo.length > totem.index) {
                totem.maxWave = waveInfo[totem.index];
            }
        });
    }
}

export const updateWorship = (data: Map<string, any>) => {
    const worship = data.get("worship") as Worship;
    const players = data.get("players") as Player[];
    const alchemy = data.get("alchemy") as Alchemy;
    const stamps = data.get("stamps") as Stamp[][];

    // Reset the data since it will all be calculated in the next section.
    worship.playerData = [];
    
    if (worship.totemInfo.length > 0) {
        players.forEach(player => {
            const worshipLevel = player.skills.get(SkillsIndex.Worship)?.level;
            const praydayStamp = stamps[StampTab.Skill][StampConsts.PraydayIndex];
            const gospelLeaderBonus = alchemy.getBonusForPlayer(player, CauldronIndex.HighIQ, AlchemyConst.GospelLeader);
            const popeFromActive = getActiveBubbles(alchemy, player.activeBubblesString).find(x => x.name == "Call Me Pope");
            const popeBonus = popeFromActive ? alchemy.getBonusForPlayer(player, CauldronIndex.HighIQ, AlchemyConst.CallMePope) : 0;

            // Make skull info available.
            const playerSkull = player.gear.tools[5] ? (player.gear.tools[5].data.item as SkullItemModel) : undefined;

            // max charge
            const maxChargeCardBonus = player.cardInfo?.equippedCards.find(x => x.id == "SoulCard4")?.getBonus() ?? 0;
            const talentChargeBonus = player.activeBuffs.find(x => x.skillIndex == TalentConst.ChargeSiphonIndex)?.getBonus(false, true) ?? 0;
            const postOfficeBonus = player.postOffice[18].bonuses[1].getBonus(player.postOffice[18].level, 1);
            const maxCharge = playerSkull ? Worship.getMaxCharge(playerSkull.maxCharge, maxChargeCardBonus, talentChargeBonus, praydayStamp.getBonus(worshipLevel), gospelLeaderBonus, worshipLevel, popeBonus, postOfficeBonus) : 0;

            // charge rate
            const flowinStamp = stamps[StampTab.Skill][StampConsts.FlowinIndex];
            const chargeSpeedTalent = player.talents.find(x => x.skillIndex == TalentConst.NearbyOutletIndex);
            const talentBonus = chargeSpeedTalent?.getBonus() ?? 0;
            const chargeCardBonus = player.cardInfo?.equippedCards.find(x => x.id == "SoulCard5")?.getBonus() ?? 0;
            const chargeRate = playerSkull ? Worship.getChargeRate(playerSkull.Speed, worshipLevel, popeBonus, chargeCardBonus, flowinStamp.getBonus(worshipLevel), talentBonus) : 0;

            worship.playerData.push({
                maxCharge: maxCharge,
                chargeRate: chargeRate,
                currentCharge: round(player.currentCharge),
                estimatedCharge: round(Worship.getEstimatedCharge(player.currentCharge, chargeRate, maxCharge, player.afkFor)),
                playerID: player.playerID
            })
        });
    }

    const bestWizard = players.filter(player => [ClassIndex.Wizard, ClassIndex.Elemental_Sorcerer].includes(player.classId)).sort((player1, player2) => player1.getTalentMaxLevel(475) > player2.getTalentMaxLevel(475) ? -1 : 1)[0];
    if (bestWizard) {
        worship.bestWizardPlayerID = bestWizard.playerID;

        worship.totalData.currentCharge = worship.playerData.filter(player => player.playerID != bestWizard.playerID).reduce((sum, player) => sum += player.estimatedCharge, 0) ?? 0;
        worship.totalData.chargeRate = worship.playerData.filter(player => player.playerID != bestWizard.playerID).reduce((sum, player) => sum += player.chargeRate, 0) ?? 0;
        worship.totalData.maxCharge = worship.playerData[bestWizard.playerID].maxCharge + (bestWizard.talents.find(talent => talent.skillIndex == 475)?.getBonus(false, true, true) ?? 0);
        worship.totalData.overFlowTime = (worship.totalData.maxCharge - worship.totalData.currentCharge) / (worship.totalData.chargeRate / 60 / 60);
    }

    return worship;
}