import { Domain, RawData } from "../base/domain";
import { DancingCoralBonusBase, initDancingCoralBonusRepo } from "../data/DancingCoralBonusRepo";
import { Item } from "../items";
import { DancingCoralBonusModel } from "../model/dancingCoralBonusModel";

export class DancingCoralBonus {
    purchased: boolean = false;
    shrineLevel: number = 0;
    unlockValue: number = 0;

    constructor(public index: number, public data: DancingCoralBonusModel) {}
    
    static fromBase(data : DancingCoralBonusBase[]) {
        return data.map(d => new DancingCoralBonus(d.index, d.data));
    }

    getBonus(): number {
        if (!this.purchased) return 0;

        return this.data.bonus * Math.max(0, this.shrineLevel - 200);
    }

    getCost(): number {
        return this.data.cost / (1 + (10 * this.unlockValue + Math.pow(1.05, this.unlockValue)) / 100);
    }

    getCostText(): string {
        return `${this.getCost()} ${this.data.name}`
    }

    getUnlockFullText(): string {
        return `Buy this dance for ${this.getCostText()} (${this.data.itemSource})`;
    }

    getBonusText(): string {
        const bonus = this.getBonus();

        return this.data.desc.replace("{", bonus.toString()).replace("}", (1 + bonus / 100).toString());
    }
}

export class DancingCoral extends Domain {
    bonuses: DancingCoralBonus[] = [];

    getRawKeys(): RawData[] {
        return [
            { key: "Tower", perPlayer: false, default: [] },
            { key: "Spelunk", perPlayer: false, default: [] }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        this.bonuses = DancingCoralBonus.fromBase(initDancingCoralBonusRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const dancingCoral = data.get(this.getDataKey()) as DancingCoral;
        const spelunkingData = data.get("Spelunk") as any[][];
        const towerData = data.get("Tower") as number[];

        const spelunkCurrencies = spelunkingData[4] as number[];

        const buyingProgress = spelunkCurrencies[6] || 0;

        dancingCoral.bonuses.forEach(bonus => {
            bonus.purchased = bonus.index < buyingProgress;
            // Not sure what this value is about but in-game formula uses it
            bonus.unlockValue = spelunkCurrencies[7] || 0;
            // Avoid having to add more to the post parsing
            bonus.shrineLevel = towerData[18 + bonus.index] || 0;
        });
    }

    getBonusFromIndex(index: number): number {
        return this.bonuses.find(bonus => bonus.index == index)?.getBonus() || 0;
    }

    isDancingCoralPurchased(index: number): boolean {
        return this.bonuses.find(bonus => bonus.index == index)?.purchased || false;
    }
}