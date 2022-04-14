import { ImageData } from './imageData';
import { Player } from './player';

export const StatueConst = {
    LevelIndex: 0,
    ProgressIndex: 1,
    AnvilIndex: 11,
    SkillXpIndex: 17
}

interface StatuesData {
    name: string,
    effect: string,
    dk: number,
    bonus: number
}

export class Statue {
    public isGold: boolean = false;
    public level: number = 0;
    public progress: number = 0;

    public statueNumber: number = 0;

    constructor(public displayName: string, public internalName: string, public bonus: string, public statueData: StatuesData) {
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

    getImageData = (): ImageData => {
        return {
            location: `Statue${this.isGold ? "G" : ""}${this.statueNumber}`,
            height: 50,
            width: 41
        }
    }
}

export class PlayerStatues {
    statues: Statue[] = initStatues()

    constructor(public playerID: number) { }
}

const initStatues = () => {
    return [
        new Statue("Power Statue", "EquipmentStatues1", "Base Damage", JSON.parse('{"name": "Power", "effect": "@Base Damage", "dk": 30, "bonus": 3}')),
        new Statue("Speed Statue", "EquipmentStatues2", "%Move Speed", JSON.parse('{"name": "Speed", "effect": "%@Move Speed", "dk": 65, "bonus": 0.1}')),
        new Statue("Mining Statue", "EquipmentStatues3", "Mining Power", JSON.parse('{"name": "Mining", "effect": "@Mining Power", "dk": 280, "bonus": 0.3}')),
        new Statue("Feasty Statue", "EquipmentStatues4", "%Food Effect", JSON.parse('{"name": "Feasty", "effect": "%@Food Effect", "dk": 320, "bonus": 1}')),
        new Statue("Health Statue", "EquipmentStatues5", "Base Health", JSON.parse('{"name": "Health", "effect": "@Base Health", "dk": 0, "bonus": 3}')),
        new Statue("Kachow Statue", "EquipmentStatues6", "%Crit Damage", JSON.parse('{"name": "Kachow", "effect": "%@Crit Damage", "dk": -15, "bonus": 0.4}')),
        new Statue("Lumberbob Statue", "EquipmentStatues7", "Choppin Power", JSON.parse('{"name": "Lumberbob", "effect": "@Choppin Power", "dk": 90, "bonus": 0.3}')),
        new Statue("Thicc Skin Statue", "EquipmentStatues8", "Base Defence", JSON.parse('{"name": "Thicc Skin", "effect": "@Base Defence", "dk": 210, "bonus": 1}')),
        new Statue("Oceanman Statue", "EquipmentStatues9", "Fishing Power", JSON.parse('{"name": "Oceanman", "effect": "@Fishing Power", "dk": 115, "bonus": 0.3}')),
        new Statue("Ol Reliable Statue", "EquipmentStatues10", "Catchin Power", JSON.parse('{"name": "Ol Reliable", "effect": "@Catchin Power", "dk": 45, "bonus": 0.3}')),
        new Statue("Exp Book Statue", "EquipmentStatues11", "%Class Exp", JSON.parse('{"name": "Exp", "effect": "%@Class Exp", "dk": 0, "bonus": 0.1}')),
        new Statue("Anvil Statue", "EquipmentStatues12", "%Product Spd", JSON.parse('{"name": "Anvil", "effect": "%@Product Spd", "dk": 165, "bonus": 0.5}')),
        new Statue("Cauldron Statue", "EquipmentStatues13", "%Alchemy Exp", JSON.parse('{"name": "Cauldron", "effect": "%@Alchemy Exp", "dk": 280, "bonus": 0.5}')),
        new Statue("Beholder Statue", "EquipmentStatues14", "%Crit Chance", JSON.parse('{"name": "Beholder", "effect": "%@Crit Chance", "dk": 300, "bonus": 0.2}')),
        new Statue("Bullseye Statue", "EquipmentStatues15", "%Accuracy", JSON.parse('{"name": "Bullseye", "effect": "%@Accuracy", "dk": 110, "bonus": 0.8}')),
        new Statue("Box Statue", "EquipmentStatues16", "Trappin Power", JSON.parse('{"name": "Box", "effect": "@Trappin Power", "dk": 180, "bonus": 0.3}')),
        new Statue("Twosoul Statue", "EquipmentStatues17", "Worship Power", JSON.parse('{"name": "Twosoul", "effect": "@Worship Power", "dk": 260, "bonus": 0.3}')),
        new Statue("EhExPee Statue", "EquipmentStatues18", "%Skill Exp", JSON.parse('{"name": "Ehexpee", "effect": "%@Skill Exp", "dk": 69, "bonus": 0.1}')),
        new Statue("Seesaw Statue", "EquipmentStatues19", "%Cons Exp", JSON.parse('{"name": "Seesaw", "effect": "%@Cons Exp", "dk": 13, "bonus": 0.5}')),
    ]
};

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