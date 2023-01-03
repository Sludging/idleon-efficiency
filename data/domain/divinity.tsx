import { initDivinityStyleRepo } from "./data/DivinityStyleRepo";
import { GodInfoBase, initGodInfoRepo } from "./data/GodInfoRepo";
import { DivinityStyleModel } from "./model/divinityStyleModel";
import { GodInfoModel } from "./model/godInfoModel";

export class DivinityGod {
    bonusLevel: number = 0;
    unlocked: boolean = false;

    constructor(public index: number, public data: GodInfoModel) {}


    static fromBase = (data: GodInfoBase[]): DivinityGod[] => {
        return data.map(god => new DivinityGod(god.index, god.data));
    }
}

export class PlayerDivinityInfo {
    constructor(public style: DivinityStyleModel, public god: DivinityGod, public active: boolean = false) {}

    divinityPerHour = (): number => {
        
        return 0;
    }
}

export class GodOffering {
    constructor(public index: number, public odds: number) {}
}

export class Divinity {
    playerInfo: PlayerDivinityInfo[] = [];
    currentDivinity: number = 0;
    gods: DivinityGod[] = DivinityGod.fromBase(initGodInfoRepo());
    offerings: GodOffering[] = [];

    purrmepActive = (): boolean => {
        return this.playerInfo.some(info => info.god.index == 6);
    }
}

export default function parseDivinity(playerCount: number, divinityData: number[], afkTarget: string[]) {
    const divinity = new Divinity();

    if (divinityData.length == 0) {
        return divinity;
    }
    // Index 25 = Number of gods unlocked?
    const numberOfUnlockedGods = divinityData[25];
    // Next 10 indexes = god bonus level
    divinity.gods.forEach((god, godIndex) => {
        god.bonusLevel = divinityData[godIndex + 26];
        god.unlocked = godIndex < numberOfUnlockedGods
    });

    const mantraInfo = initDivinityStyleRepo();
    // Read player data.
    [...Array(playerCount)].forEach((_, playerIndex) => {
        const playerMantra = divinityData[playerIndex];
        const playerLinkedGod = divinityData[playerIndex + 12];
        divinity.playerInfo.push(new PlayerDivinityInfo(mantraInfo[playerMantra].data, divinity.gods[playerLinkedGod], afkTarget[playerIndex] == "Divinity"));
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
    return divinity;
}
