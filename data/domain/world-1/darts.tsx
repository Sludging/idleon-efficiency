import { Domain, RawData } from "../base/domain";
import { Item } from "../items";

export const DartsBonusesDesc = [
    "+{% Extra Damage against Monsters!", 
    "+{ Talent PTS for the first page!",
    "All Vault upgrades are }x Cheaper!",
    "+{% Movement Speed, so you can run faster!"
]

export const DartsUnlockBonuses = [ 0, 12, 80, 200 ]

export class DartsBonus {
    unlocked: boolean = false;
    level: number = 0;

    constructor(public index: number, public unlockThreshold: number, public desc: string) {}

    getBonus(): number {
        return this.level;
    }

    getBonusText(): string {
        return this.desc.replace("{", this.level.toString())
    }

    getNextLevelCost(): number {
        switch(this.index) {
            case 1 :
                return Math.floor(3 + this.level / .25);
            case 3:
                return Math.floor(5 + this.level / .05)
            default:
                return Math.floor(2 + this.level / 12);
        }
    }
}

export class Darts extends Domain {
    highestScore: number = 0;
    pointsOwned: number = 0;
    timeUntilCanPlay: number = 0;
    bonuses: DartsBonus[] = [];

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number) {
        for (let i = 0; i < 4; i++) {
            this.bonuses.push(new DartsBonus(i, DartsUnlockBonuses[i], DartsBonusesDesc[i]));
        }
        return this;
    }

    parse(data: Map<string, any>): void {
        const darts = data.get(this.getDataKey()) as Darts;
        const optionList = data.get("OptLacc") as number[];

        darts.highestScore = optionList[442];
        darts.pointsOwned = optionList[434];
        darts.timeUntilCanPlay = optionList[441]; // timer until can play again (in seconds)

        const totalLevels = optionList.slice(435, 439).reduce((sum, level) => sum += level, 0);

        darts.bonuses.forEach(bonus => {
            bonus.level = optionList[435 + bonus.index] || 0;
            bonus.unlocked = totalLevels >= bonus.unlockThreshold;
        });
    }

    getBonus(index: number): number {
        return this.bonuses.find(bonus => bonus.index == index)?.getBonus() || 0;
    }

    getBonusText(index: number): string {
        return this.bonuses.find(bonus => bonus.index == index)?.getBonusText() || "";
    }

    getNextLevelCost(index: number): number {
        return this.bonuses.find(bonus => bonus.index == index)?.getNextLevelCost() || 0;
    }

    getTotalBonusLevels(): number {
        return this.bonuses.reduce((sum, bonus) => sum += bonus.level, 0);
    }
}