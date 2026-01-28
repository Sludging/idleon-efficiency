import { Domain, RawData } from "./base/domain";
import { Item } from "./items";

export const HoopsBonusesDesc = [
    "+{% Damage to Monsters", 
    "+{% Coins dropped by monsters", 
    "+{% Class EXP when killing monsters", 
    "+{% Efficiency for all Skills, like Mining and Choppin!",
]

export const HoopsUnlockBonuses = [ 0, 40, 150, 250 ]

export class HoopsBonus {
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
            case 2:
                return Math.floor(3 + this.level / 8);
            default:
                return Math.floor(1 + this.level / 20);
        }
    }
}

export class Hoops extends Domain {
    highestScore: number = 0;
    pointsOwned: number = 0;
    timeUntilCanPlay: number = 0;
    bonuses: HoopsBonus[] = [];

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number) {
        for (let i = 0; i < 4; i++) {
            this.bonuses.push(new HoopsBonus(i, HoopsUnlockBonuses[i], HoopsBonusesDesc[i]));
        }
        return this;
    }

    parse(data: Map<string, any>): void {
        const hoops = data.get(this.getDataKey()) as Hoops;
        const optionList = data.get("OptLacc") as number[];

        hoops.highestScore = optionList[242];
        hoops.pointsOwned = optionList[418];
        hoops.timeUntilCanPlay = optionList[423]; // timer until can play again (in seconds)

        const totalLevels = optionList.slice(419, 423).reduce((sum, level) => sum += level, 0);

        hoops.bonuses.forEach(bonus => {
            bonus.level = optionList[419 + bonus.index] || 0;
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