import { initFountainUpgradeRepo, FountainUpgradeBase } from "../../data/FountainUpgradeRepo";
import { FountainUpgradeModel } from "../../model/fountainUpgradeModel";

export class FountainUpgrade {
    level: number = 0;
    marbleizationLevel: number = 0;

    constructor(public index: number, public data: FountainUpgradeModel) { }

    static fromBase(data: FountainUpgradeBase[]) {
        return data.map(d => new FountainUpgrade(d.index, d.data));
    }

    getMarbleBonus(): number {
        return this.marbleizationLevel == 0 ? 1 : 1.5 + 0.5 * this.marbleizationLevel;
    }

    getBonus(): number {
        return Math.round(this.getMarbleBonus() * this.level * this.data.bonusPerLevel);
    }
}

export class Fountain {
    upgrades: FountainUpgrade[] = [];

    constructor() {
        this.upgrades = FountainUpgrade.fromBase(initFountainUpgradeRepo());
    }

    parse(holeData: number[][]): void {
        const upgradeLevels = holeData[31] as unknown as number[][];
        const marbleizationLevels = holeData[32] as unknown as number[][];

        this.upgrades.forEach(upgrade => {
            const waterIndex = upgrade.data.waterIndex;
            const upgradeIndex = upgrade.data.index;
            upgrade.level = upgradeLevels?.[waterIndex]?.[upgradeIndex] ?? 0;
            upgrade.marbleizationLevel = marbleizationLevels?.[waterIndex]?.[upgradeIndex] ?? 0;
        });
    }

    getBonus(waterIndex: number, upgradeIndex: number): number {
        return this.upgrades.find(upgrade => upgrade.data.waterIndex == waterIndex && upgrade.data.index == upgradeIndex)?.getBonus() ?? 0;
    }
}
