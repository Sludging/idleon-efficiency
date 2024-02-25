import { Domain, RawData } from "../base/domain";
import { SummonUpgradeBase, initSummonUpgradeRepo } from "../data/SummonUpgradeRepo";
import { SummonEnemyBase, initSummonEnemyRepo } from "../data/SummonEnemyRepo";
import { SummonUnitBase, initSummonUnitRepo } from "../data/SummonUnitRepo";
import { SummonEnemyBonusBase, initSummonEnemyBonusRepo } from "../data/SummonEnemyBonusRepo";
import { ImageData } from "../imageData";
import { Item } from "../items";
import { SummonUpgradeModel } from "../model/summonUpgradeModel";
import { SkillsIndex } from "../SkillsIndex";

export enum SummonEssenceColor {
    White = 0,
    Green = 1,
    Yellow = 2,
    Blue = 3,
    Purple = 4,
    FutureContent1 = 5,
    FutureContent2 = 6,
    FutureContent3 = 7,
    FutureContent4 = 8
}

export class SummonUpgrade {
    unlocked: boolean = false;
    level: number = 0;
    shouldBeDisplayed: boolean = true;

    constructor(public index: number, public data: SummonUpgradeModel) {
        this.shouldBeDisplayed = (data.name != "Name");
    }

    nextLevelCost = (): number => {
        return this.data.cost * Math.pow(this.data.costExponent, this.level);
    }

    getBonus = (level: number = this.level): number => {
        return level * this.data.bonusQty
    }

    getImageData = (): ImageData => {
        return {
            location: `SumUpgIc${this.index}`,
            height: 42,
            width: 42
        }
    }

    getBorderImageData = (): ImageData => {
        return {
            location: `SumUpgBr${this.data.colour}`,
            height: 42,
            width: 42
        }
    }

    getLevelDisplay = (): string => {
        if (this.data.maxLvl == this.level) {
            return "MAX LV";
        }

        if (this.data.maxLvl == 9999) {
            return `Lv.${this.level}`;
        } else {
            return `Lv.${this.level}/${this.data.maxLvl}`;
        }
    }

    getBonusText = (level: number = this.level): string => {
        return this.data.bonus.replace(/{/, this.getBonus(level).toString());
    }

    static fromBase = (data: SummonUpgradeBase[]): SummonUpgrade[] => {
        return data.map((value) => new SummonUpgrade(value.index, value.data));
    }
}

export class SummonBonus {

}

export interface SummonEssence {
    color: SummonEssenceColor,
    quantity: number,
    display: boolean
}

export class Summoning extends Domain {
    summonUpgrades: SummonUpgrade[] = [];
    summonBonuses: SummonBonus[] = [];
    summonEssences: SummonEssence[] = [];
    summoningLevel: number = 0;

    updateUnlockedUpgrades = () => {
        // TODO : check which upgrade is unlocked using upgrade.data.idReq

        // TODO : check which essence should be displayed based on unlocked bonuses (to prevent showing essences based on if they're above 0 to prevent case where someone spend exactly all their essences)
    }

    getEssenceIcon(color: SummonEssenceColor): ImageData {
        return {
            location: `SummC${color+1}`,
            height: 25,
            width: 25
        }
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Summon", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const summoning = data.get(this.dataKey) as Summoning;
        const summoningData = data.get("Summon") as any[];
        const playerLevel = data.get(`Lv0_0`) as number[];

        // TODO : get Summoning skill level

        summoning.summonEssences = [];
        const essences = summoningData[2] as number[];
        essences.forEach((value, index) => {
            summoning.summonEssences.push({ color: index, quantity: value, display: false });
        });

        // TODO : get SummoningUpgrades and level, should be summoningData[0]

        this.updateUnlockedUpgrades();

        // TODO : get SummoningBonuses and level, don't know yet where they are

        console.log(summoningData);
    }
}