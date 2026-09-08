import { Domain, RawData } from "../base/domain";
import { RoyalArmoryUpgradeBase, initRoyalArmoryUpgradeRepo } from "../data/RoyalArmoryUpgradeRepo";
import { Item } from "../items";
import { RoyalArmoryUpgradeModel } from "../model/royalArmoryUpgradeModel";

export class RoyalArmoryUpgrade {
    level: number = 0;

    constructor(
        public index: number,
        public data: RoyalArmoryUpgradeModel,
    ) { }

    static fromBase(data: RoyalArmoryUpgradeBase[]): RoyalArmoryUpgrade[] {
        return data.map((upgrade) => new RoyalArmoryUpgrade(upgrade.index, upgrade.data));
    }

    getBonus(): number {
        return this.level * this.data.bonusPerLevel;
    }
}

export class RoyalArmory extends Domain {
    upgrades: RoyalArmoryUpgrade[] = [];
    // TODO: Make proper models from wiki data for these.
    royalStatueLevels: number[] = [];
    outposts: number[][] = [];
    resourceGrades: number[] = [];

    getRawKeys(): RawData[] {
        return [
            { key: "RoyalG", perPlayer: false, default: [] },
            { key: "RoyalMaps", perPlayer: false, default: [] },
        ];
    }

    init(_allItems: Item[], _charCount: number) {
        this.upgrades = RoyalArmoryUpgrade.fromBase(initRoyalArmoryUpgradeRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const royalArmory = data.get(this.getDataKey()) as RoyalArmory;
        const royalG = data.get("RoyalG") as number[][] | undefined;
        const royalMaps = data.get("RoyalMaps") as number[][] | undefined;
        const upgradeLevels = royalG?.[2] ?? [];
        royalArmory.royalStatueLevels = royalG?.[0] ?? [];
        royalArmory.outposts = royalMaps ?? [];
        royalArmory.resourceGrades = royalG?.[5] ?? [];

        royalArmory.upgrades.forEach((upgrade) => {
            upgrade.level = Number(upgradeLevels[upgrade.index]) || 0;
        });
    }

    getUpgradeBonus(index: number): number {
        return this.upgrades.find((upgrade) => upgrade.index === index)?.getBonus() ?? 0;
    }
    getTotalRoyalStatueLevels(): number {
        return this.royalStatueLevels.reduce(
            (total, level) => total + Math.max(0, Number(level) || 0),
            0,
        );
    }

    getOutpostsBuilt(): number {
        return this.outposts.filter((outpost) => outpost.length >= 3).length;
    }

    getTotalResourceGrade(): number {
        return this.resourceGrades.reduce((total, grade) => total + (Number(grade) || 0), 0);
    }
}
