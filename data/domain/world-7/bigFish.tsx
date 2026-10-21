import { ImageData } from "../imageData";
import { notateNumber } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { BigFishBonusBase, initBigFishBonusRepo } from "../data/BigFishBonusRepo";
import { Item } from "../items";
import { BigFishBonusModel } from "../model/bigFishBonusModel";
import { Player } from "../player";

export class BigFishBonus {
    level: number = 0;
    unlocked: boolean = false;

    constructor(public index: number, public data: BigFishBonusModel) {}

    getImageData(): ImageData {
        return { location: "W7_fishUI", width: 311, height: 278 };
    }

    getImageCrop(): { x: number; y: number; width: number; height: number } {
        return {
            x: 14 + 57 * (this.index % 5),
            y: 30 + 54 * Math.floor(this.index / 5),
            width: 53,
            height: 52
        };
    }
    
    static fromBase(data : BigFishBonusBase[]) {
        return data.map(d => new BigFishBonus(d.index, d.data));
    }

    getBonus(): number {
        if (!this.unlocked) return 0;

        return this.level / (100 + this.level) * this.data.x0;
    }

    getUpgradeCost(): number {
        return Math.pow(1.15, this.level) * Math.pow(10.01, this.data.x1);
    }

    getBonusText(): string {
        const bonus = this.getBonus();

        return this.data.desc.replace("{", notateNumber(bonus, "MultiplierInfo").replace("#", "")).replace("}", notateNumber(1 + bonus / 100, "MultiplierInfo").replace("#", ""));
    }

    getUnlockLevelRequired(): number {
        return 4E3 + (300 + 50 * Math.max(0, this.index - 2)) * this.index;
    }
}

export class BigFish extends Domain {
    bonuses: BigFishBonus[] = [];
    familyLevel: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "Spelunk", perPlayer: false, default: 0 }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        this.bonuses = BigFishBonus.fromBase(initBigFishBonusRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const bigFish = data.get(this.getDataKey()) as BigFish;
        const spelunkingData = data.get("Spelunk") as any[][];
        
        const bigFishLevels = (spelunkingData[11] || []) as number[];
        
        bigFish.bonuses.forEach(bonus => {
            bonus.level = bigFishLevels[bonus.index] || 0;
        });
    }

    getBonusFromIndex(index: number): number {
        return this.bonuses.find(bonus => bonus.index == index)?.getBonus() || 0;
    }

    getBonusTextFromIndex(index: number): string {
        return this.bonuses.find(bonus => bonus.index == index)?.getBonusText() || "";
    }

    getBonusNextlevelCost(index: number): number {
        return this.bonuses.find(bonus => bonus.index == index)?.getUpgradeCost() || 0; 
    }
}

export const updateBigFishUnlocked = (data: Map<string, any>) => {
    const bigFish = data.get("bigFish") as BigFish;
    const players = data.get("players") as Player[];

    const totalPlayersLevels = players.reduce((sum, player) => sum + player.level, 0);
    bigFish.familyLevel = totalPlayersLevels;

    bigFish.bonuses.forEach(bonus => {
        bonus.unlocked = totalPlayersLevels > bonus.getUnlockLevelRequired();
    });
}
