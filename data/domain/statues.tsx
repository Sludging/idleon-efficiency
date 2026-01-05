import { range, round } from '../utility';
import { Domain, RawData } from './base/domain';
import { initStatueRepo, StatueDataBase } from './data/StatueRepo';
import { ImageData } from './imageData';
import { Item } from './items';
import { StatueDataModel } from './model/statueDataModel';
import { Player } from './player';
import { Sailing } from './sailing';

export const StatueConst = {
    LevelIndex: 0,
    ProgressIndex: 1,
    AnvilIndex: 11,
    SkillXpIndex: 17
}

export enum StatusType {
    Basic,
    Gold,
    Onyx
}

export class Statue {
    public type: StatusType = StatusType.Basic;
    public level: number = 0;
    public progress: number = 0;

    public statueNumber: number = 0;

    voodooStatuficationBonus: number = 1;
    onyxStatueBonus: number = 2;

    constructor(public index: number, public displayName: string, public internalName: string, public bonus: string, public statueData: StatueDataModel) {
        const StatueNumberRegex = /EquipmentStatues(\d+)/gm;
        try {
            const regexMatches = StatueNumberRegex.exec(internalName);
            if (regexMatches) {
                this.statueNumber = parseInt(regexMatches[1]);
            }
        }
        catch (e) {
            console.debug("Failed parsing statue number", e);
        }
    }

    getRequiredForNextLevel = () => {
        return 0;
    }

    getBonus = (player: Player | undefined = undefined): number => {
        let talentBonus = 1;

        // Calculate statue bonus based on talents
        if (player) {
            switch (this.displayName) {
                case "Power Statue":
                case "Mining Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 112 || x.skillIndex == 127)?.getBonus() ?? 0) / 100;
                    break;
                case "Thicc Skin Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 127)?.getBonus() ?? 0) / 100;
                    break;
                case "Oceanman Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 112)?.getBonus() ?? 0) / 100;
                    break;
                case "Speed Statue":
                case "Anvil Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 307 || x.skillIndex == 292)?.getBonus() ?? 0) / 100;
                    break;
                case "Bullseye Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 307)?.getBonus() ?? 0) / 100;
                    break;
                case "Ol Reliable Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 292)?.getBonus() ?? 0) / 100;
                    break;
                case "Exp Statue":
                case "Lumberbob Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 472 || x.skillIndex == 487)?.getBonus() ?? 0) / 100;
                    break;
                case "Beholder Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 472)?.getBonus() ?? 0) / 100;
                    break;
                case "Cauldron Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 487)?.getBonus() ?? 0) / 100;
                    break;
                case "EhExPee Statue":
                case "Kachow Statue":
                case "Feasty Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 37)?.getBonus() ?? 0) / 100;
                    break;
                default: talentBonus = 1;
            }
        }
        return this.level * this.statueData.bonus * talentBonus * this.voodooStatuficationBonus * (this.type == StatusType.Onyx ? this.onyxStatueBonus : 1);
    }

    getBonusText = (player: Player | undefined = undefined) => {
        const bonus = round(this.getBonus(player));
        if (this.bonus.includes("%@")) {
            return this.bonus.replace("%@", `+${bonus}% `);
        }
        return this.bonus.replace("@", `+${bonus} `);
    }

    getImageData = (): ImageData => {
        let extraChar = "";
        switch (this.type) {
            case StatusType.Gold: {
                extraChar = "G"
                break;
            }
            case StatusType.Onyx: {
                extraChar = "O";
                break;
            }
        }
        return {
            location: `Statue${extraChar}${this.statueNumber}`,
            height: 50,
            width: 41
        }
    }

    static fromBase = (data: StatueDataBase[]) => {
        return data.map(statue => new Statue(statue.index, `${statue.data.name} Statue`, `EquipmentStatues${statue.index + 1}`, statue.data.effect, statue.data));
    }
}

export class PlayerStatues {
    statues: Statue[];

    constructor(public playerID: number) {
        this.statues = Statue.fromBase(initStatueRepo());
    }
}

export class Statues extends Domain {
    getRawKeys(): RawData[] {
        return [
            { key: `StatueLevels_`, perPlayer: true, default: [] },
            { key: `StuG`, perPlayer: false, default: [] },
        ]
    }
    init(_allItems: Item[], charCount: number) {
        return [...Array(charCount)].map((_, pIndex) => new PlayerStatues(pIndex));
    }
    parse(data: Map<string, any>): void {
        const charCount = data.get("charCount") as number;
        const statues = data.get(this.getDataKey()) as PlayerStatues[];

        const allStatues = [...Array(charCount)].map((_, i) => data.get(`StatueLevels_${i}`)) as number[][][];
        const goldStatues = data.get(`StuG`) as number[];


        range(0, charCount).forEach((_, pIndex) => {
            // If this is the first time handling this player, init.
            if (statues.length <= pIndex) {
                statues.push(new PlayerStatues(pIndex))
            }

            statues[pIndex].statues.forEach((statue, statueIndex) => {
                if (allStatues[pIndex].length > statueIndex) {
                    statue.level = allStatues[pIndex][statueIndex][StatueConst.LevelIndex];
                    statue.progress = allStatues[pIndex][statueIndex][StatueConst.ProgressIndex];
                    if (goldStatues.length > statueIndex) {
                        switch (goldStatues[statueIndex]) {
                            case 1: {
                                statue.type = StatusType.Gold
                                break;
                            }
                            case 2: {
                                statue.type = StatusType.Onyx
                                break;
                            }
                        }
                    }
                }
            });
        });
    }
}

export const updateStatueBonuses = (data: Map<string, any>) => {
    const statues = data.get("statues") as PlayerStatues[];
    const playerData = data.get("players") as Player[];
    const sailing = data.get("sailing") as Sailing;

    const bestVoidMan = playerData.reduce((final, player) => final = (player.talents.find(talent => talent.skillIndex == 56)?.level ?? 0) > 0 && player.playerID > final.playerID ? player : final, playerData[0]);
    if (bestVoidMan) {
        statues.flatMap(player => player.statues).forEach(statue => {
            statue.voodooStatuficationBonus = (1 + (bestVoidMan.talents.find(talent => talent.skillIndex == 56)?.getBonus() ?? 0) / 100);
        })
    }

    const onyxStatueBonus = 2 + Math.max(0, sailing.artifacts[30].getBonus()) / 100;
    statues.flatMap(player => player.statues).forEach(statue => {
        statue.onyxStatueBonus = onyxStatueBonus;
    })
}
