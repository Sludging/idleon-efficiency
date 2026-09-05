import { Domain, RawData } from "../base/domain";
import { RoyalArmoryUpgradeBase, initRoyalArmoryUpgradeRepo } from "../data/RoyalArmoryUpgradeRepo";
import { Item } from "../items";
import { RoyalArmoryUpgradeModel } from "../model/royalArmoryUpgradeModel";

export class RoyalArmoryUpgrade {
    level: number = 0;

    constructor(public index: number, public data: RoyalArmoryUpgradeModel) { }

    static fromBase(data: RoyalArmoryUpgradeBase[]): RoyalArmoryUpgrade[] {
        return data.map(upgrade => new RoyalArmoryUpgrade(upgrade.index, upgrade.data));
    }

    getBonus(): number {
        return this.level * this.data.bonusPerLevel;
    }
}

export class RoyalArmory extends Domain {
    upgrades: RoyalArmoryUpgrade[] = [];

    getRawKeys(): RawData[] {
        return [
            { key: "RoyalG", perPlayer: false, default: [] }
        ];
    }

    init(_allItems: Item[], _charCount: number) {
        this.upgrades = RoyalArmoryUpgrade.fromBase(initRoyalArmoryUpgradeRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const royalArmory = data.get(this.getDataKey()) as RoyalArmory;
        const royalG = data.get("RoyalG") as number[][] | undefined;
        const upgradeLevels = royalG?.[2] ?? [];

        royalArmory.upgrades.forEach(upgrade => {
            upgrade.level = Number(upgradeLevels[upgrade.index]) || 0;
        });
    }

    getUpgradeBonus(index: number): number {
        return this.upgrades.find(upgrade => upgrade.index === index)?.getBonus() ?? 0;
    }
}
