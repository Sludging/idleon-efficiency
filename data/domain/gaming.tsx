import { GamingBoxBase, initGamingBoxRepo } from "./data/GamingBoxRepo";
import { GamingUpgradeBase, initGamingUpgradeRepo } from "./data/GamingUpgradeRepo";
import { GamingBoxModel } from "./model/gamingBoxModel";
import { GamingUpgradeModel } from "./model/gamingUpgradeModel";

export class GamingUpgrade {
    constructor(public index: number, public data: GamingUpgradeModel) {}

    static fromBase = (data: GamingUpgradeBase[]): GamingUpgrade[] => {
        return data.map(box => new GamingUpgrade(box.index, box.data))
    }
}

export class ImportBox {
    level: number = 0;
    constructor(public index: number, public data: GamingBoxModel) {}

    getBonus = () => {
        switch(this.index) {
            case 1:
                return Math.floor(10 * (1 + Math.pow(60 * this.level / (250 + this.level), 1.7))) / 10;
            case 2:
                return Math.round(5 * this.level);
            case 5:
                return Math.floor(60 * this.level / (100 + this.level) * 10) / 10;
            default:
                return Math.round(this.level)
        }
    }

    static fromBase = (data: GamingBoxBase[]): ImportBox[] => {
        return data.map(box => new ImportBox(box.index, box.data))
    }
}

export class Gaming {
    importBoxes: ImportBox[] = ImportBox.fromBase(initGamingBoxRepo());
    upgrades: GamingUpgrade[] = GamingUpgrade.fromBase(initGamingUpgradeRepo());
    rawGamingData: any[] = [];
    rawSproutData: number[][] = [];

    getCurrentWater = (): number => {
        return Math.floor(Math.pow(this.rawSproutData[25][1] * (1 + this.importBoxes[0].getBonus() / 100) / 3600, .75));
    }

    getNextWaterTime = (): number => {
        // Math in seconds.
        const absoluteTimeToNextWater = Math.pow(this.getCurrentWater() + 1, 4/3) * 3600;

        return absoluteTimeToNextWater - this.rawSproutData[25][1];
    }

    getShovelCount = (): number => {
        return Math.floor(Math.pow(this.rawSproutData[26][1] / 3600, .44));
    }

    getNextShovelTime = (): number => {
        // Math in seconds.
        const absoluteTimeToNextShovel = Math.pow(this.getShovelCount() + 1, 25/11) * 3600;

        return absoluteTimeToNextShovel - this.rawSproutData[26][1];
    }

    getNuggetRange = (): number[] => {
        const boxUpgrade = this.importBoxes[1].getBonus();
        const maxStat = boxUpgrade * (1 / Math.pow(1e-5, .64));
        const minStat = boxUpgrade * (1 / Math.pow(1, .64));
        return [minStat, maxStat];
    }
}

export default function parseGaming(gamingData: any[], gamingSproutData: number[][]) {
    const gaming = new Gaming();

    gaming.rawGamingData = gamingData;
    gaming.rawSproutData = gamingSproutData;

    gaming.importBoxes[0].level = gamingSproutData[25][0];
    gaming.importBoxes[1].level = gamingSproutData[26][0];
    
    return gaming;    
}

export const updateGaming = (data: Map<string, any>) => {
    const gaming = data.get("gaming") as Gaming;
    return gaming;
}
