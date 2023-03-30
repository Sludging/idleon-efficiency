import { Alchemy } from "./alchemy";
import { initDivinityStyleRepo } from "./data/DivinityStyleRepo";
import { GodInfoBase, initGodInfoRepo } from "./data/GodInfoRepo";
import { ImageData } from "./imageData";
import { DivinityStyleModel } from "./model/divinityStyleModel";
import { GodInfoModel } from "./model/godInfoModel";
import { Player } from "./player";
import { SkillsIndex } from "./SkillsIndex";

export class DivinityGod {
    blessLevel: number = 0;
    unlocked: boolean = false;
    linkedPlayers: Player[] = [];

    // updated values
    activeBubblePassiveBonus: number = 0;
    constructor(public index: number, public data: GodInfoModel) { }


    static fromBase = (data: GodInfoBase[]): DivinityGod[] => {
        const godData = data.map(god => new DivinityGod(god.index, god.data));
        const godCopy = JSON.parse(JSON.stringify(godData));

        // Fix up the bonus texts based on bonus index, because ... Lava.
        godData.forEach(god => {
            god.data.majorBonus = godCopy[god.data.bonusIndex].data.majorBonus;
            god.data.passiveBonus = godCopy[god.data.bonusIndex].data.passiveBonus;
            god.data.passiveMax = godCopy[god.data.bonusIndex].data.passiveMax;
        })
        return godData;
    }

    getMaxMinorLinkBonusText = () => {
        return this.data.passiveBonus.replace(/{/g, this.data.passiveMax.toString());
    }

    getMinorLinkBonus = (player: Player) => {
        // If not linked to this god, return 0.
        if (!this.linkedPlayers.find(linked => linked.playerID == player.playerID)) {
            return 0;
        }
        const divinityLevel = player.skills.get(SkillsIndex.Divinity)?.level ?? 0
        const hasActiveBubble = player.activeBubbles.filter(bubble => bubble.data.bonusKey == "Y2ACTIVE").length > 0;

        const alchemyBoost = Math.max(1, hasActiveBubble ? this.activeBubblePassiveBonus : 0);
        return divinityLevel / (60 + divinityLevel) * alchemyBoost * this.data.passiveMax;
    }

    getBlessingBonusText = () => {
        return this.data.blessingBonus.replace("{", this.getBlessingBonus().toString());
    }

    getBlessingBonus = () => {
        if (this.index == 2) {
            // TODO: Fix this properly, bit weird with skilling eff
            return 0;
        }

        return this.blessLevel * this.data.blessingPerLevel;
    }

    getImageData = (): ImageData => {
        return {
            location: `DivGod${this.index}`,
            width: 108,
            height: 97
        }
    }
}

export class PlayerDivinityInfo {
    // es has a second god, jam it in here.
    esGod: DivinityGod | undefined = undefined;

    constructor(public playerIndex: number, public style: DivinityStyleModel, public gods: DivinityGod[], public active: boolean = false) { }

    divinityPerHour = (): number => {
        return 0;
    }

    isLinkedToGod = (godIndex: number) => {
        if (!this.esGod && this.gods.length == 0) {
            return false;
        }

        if (this.gods.find(god => god.index == godIndex)) {
            return true;
        }

        return this.esGod && this.esGod.index == godIndex;
    }
}

export class GodOffering {
    constructor(public index: number, public odds: number) { }
}

export class Divinity {
    playerInfo: PlayerDivinityInfo[] = [];
    currentDivinity: number = 0;
    gods: DivinityGod[] = DivinityGod.fromBase(initGodInfoRepo());
    offerings: GodOffering[] = [];
}

export const initDivinity = () => {
    return new Divinity();
}

export default function parseDivinity(playerCount: number, divinityData: number[], afkTarget: string[], talentLevels: string[]) {
    const divinity = new Divinity();

    if (divinityData.length == 0) {
        return divinity;
    }
    // Index 25 = Number of gods unlocked?
    const numberOfUnlockedGods = divinityData[25];

    // Index 26 = ? 
    // Index 27 = ?
    // Next 10 indexes = god levels
    divinity.gods.forEach((god, godIndex) => {
        // The index of the god doesn't match up the bonus, yay Lava.
        // Using bonus index instead of godIndex.
        god.blessLevel = divinityData[godIndex + 28];
        god.unlocked = godIndex < numberOfUnlockedGods
    });

    const mantraInfo = initDivinityStyleRepo();
    // Read player data.
    [...Array(playerCount)].forEach((_, playerIndex) => {
        const playerMantra = divinityData[playerIndex];
        const linkedGodIndex = divinityData[playerIndex + 12];
        const playerLinkedGod = linkedGodIndex != -1 && linkedGodIndex < divinity.gods.length ? divinity.gods[linkedGodIndex] : undefined;
        // Player is active if actually on divinity alter or using Goharut as god and being in lab.
        const isActive = afkTarget[playerIndex] == "Divinity" || (playerLinkedGod && playerLinkedGod.index == 4 && afkTarget[playerIndex] == "Laboratory")
        divinity.playerInfo.push(new PlayerDivinityInfo(playerIndex, mantraInfo[playerMantra].data, playerLinkedGod ? [playerLinkedGod] : [], isActive));

        // Handle ES extra link talent.
        if (talentLevels.length > playerIndex) { // This should never fail but better safe than sorry.
            const playerTalents = JSON.parse(talentLevels[playerIndex]);
            if (playerTalents[505] > 0) {
                const godIndex = playerTalents[505] % 10;
                divinity.playerInfo[playerIndex].esGod = divinity.gods[godIndex];
            }
        }
    });

    divinity.currentDivinity = divinityData[24];
    // 24 is the index of the current divinity count, or basically after 12 characters worth of god/mantra info.
    // Index 26 = Odds of first offering
    // Index 27 = Odds of second offering
    divinity.offerings.push(new GodOffering(0, divinityData[26]));
    divinity.offerings.push(new GodOffering(1, divinityData[27]));


    return divinity;
}

export const updateDivinity = (data: Map<string, any>) => {
    const divinity = data.get("divinity") as Divinity;
    const alchemy = data.get("alchemy") as Alchemy;
    const players = data.get("players") as Player[];

    // God related math values;
    const activeBubblePassiveDivinityBonus = alchemy.getBubbleBonusForKey("Y2ACTIVE")
    divinity.gods.forEach(god => {
        god.activeBubblePassiveBonus = activeBubblePassiveDivinityBonus;
    })

    // Update the linked player to each god by iterating on each player's data.
    divinity.playerInfo.forEach(player => {
        player.gods.forEach(god => {
            // Due to Doot double linking can happen, so avoid that.
            if (!god.linkedPlayers.find(p => p.playerID == player.playerIndex)) {
                god.linkedPlayers.push(players[player.playerIndex]);
            }
        })

        if (player.esGod && !player.esGod.linkedPlayers.find(p => p.playerID == player.playerIndex)) {
            player.esGod.linkedPlayers.push(players[player.playerIndex]);
        }
    })

    return divinity;
}
