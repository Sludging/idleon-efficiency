import { round } from '../utility';
import { initStatueRepo, StatueDataBase } from './data/StatueRepo';
import { ImageData } from './imageData';
import { StatueDataModel } from './model/statueDataModel';
import { Player } from './player';

export const StatueConst = {
    LevelIndex: 0,
    ProgressIndex: 1,
    AnvilIndex: 11,
    SkillXpIndex: 17
}

export class Statue {
    public isGold: boolean = false;
    public level: number = 0;
    public progress: number = 0;

    public statueNumber: number = 0;

    constructor(public index: number, public displayName: string, public internalName: string, public bonus: string, public statueData: StatueDataModel) {
        const StatueNumberRegex = /EquipmentStatues(\d+)/gm;
        try {
            const regexMatches = StatueNumberRegex.exec(internalName);
            if (regexMatches) {
                this.statueNumber = parseInt(regexMatches[1]);
            }
        }
        catch (e) {
            console.debug("Failed parsing statue number");
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
                case "Thicc Skin Statue":
                case "Oceanman Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 112 || x.skillIndex == 127)?.getBonus() ?? 0) / 100;
                    break;
                case "Speed Statue":
                case "Anvil Statue":
                case "Bullseye Statue":
                case "Ol Reliable Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 307 || x.skillIndex == 292)?.getBonus() ?? 0) / 100;
                    break;
                case "Exp Book Statue":
                case "Lumberbob Statue":
                case "Beholder Statue":
                case "Cauldron Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 472 || x.skillIndex == 487)?.getBonus() ?? 0) / 100;
                    break;
                case "EhExPee Statue":
                case "Kachow Statue":
                case "Feasty Statue":
                    talentBonus += (player.talents.find(x => x.skillIndex == 37)?.getBonus() ?? 0) / 100;
                    break;
                default: talentBonus = 1;
            }
        }
        return this.level * this.statueData.bonus * talentBonus;
    }

    getBonusText = (player: Player | undefined = undefined) => {
        const bonus = round(this.getBonus(player));
        if (this.bonus.includes("%@")) {
            return this.bonus.replace("%@", `+${bonus}% `);
        }
        return this.bonus.replace("@", `+${bonus} `);
    }

    getImageData = (): ImageData => {
        return {
            location: `Statue${this.isGold ? "G" : ""}${this.statueNumber}`,
            height: 50,
            width: 41
        }
    }

    static fromBase = (data: StatueDataBase[]) => {
        return data.map(statue => new Statue(statue.index, `${statue.data.name} Statue`, `EquipmentStatues${statue.index+1}`, statue.data.effect, statue.data));
    }
}

export class PlayerStatues {
    statues: Statue[];

    constructor(public playerID: number) { 
        this.statues = Statue.fromBase(initStatueRepo());
    }
}

export default function parseStatues(allStatues: Array<Array<Array<number>>>, goldStatues: Array<boolean>) {
    const parsedData = [...Array(allStatues.length)].map((_, pIndex) => { // for each player we have data for
        const playerStatues = new PlayerStatues(pIndex);
        playerStatues.statues.forEach((statue, statueIndex) => {
            if (allStatues[pIndex].length > statueIndex) {
                statue.level = allStatues[pIndex][statueIndex][StatueConst.LevelIndex];
                statue.progress = allStatues[pIndex][statueIndex][StatueConst.ProgressIndex];
                if (goldStatues.length > statueIndex) {
                    statue.isGold = goldStatues[statueIndex];
                }
            }
        })

        return playerStatues;
    });
    return parsedData;
}