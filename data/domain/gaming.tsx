import { letterToNumber, range } from "../utility";
import { SkillsIndex } from "./SkillsIndex";
import { AtomCollider } from "./atomCollider";
import { Cloudsave } from "./cloudsave";
import { Construction } from "./construction";
import { GamingBoxBase, initGamingBoxRepo } from "./data/GamingBoxRepo";
import { GamingSuperbitBase, initGamingSuperbitsRepo } from "./data/GamingSuperbitsRepo";
import { GamingUpgradeBase, initGamingUpgradeRepo } from "./data/GamingUpgradeRepo";
import { IParser, safeJsonParse } from "./idleonData";
import { GamingBoxModel } from "./model/gamingBoxModel";
import { GamingSuperbitModel } from "./model/gamingSuperbitModel";
import { GamingUpgradeModel } from "./model/gamingUpgradeModel";
import { Worship } from "./worship";

export class GamingUpgrade {
    constructor(public index: number, public data: GamingUpgradeModel) {}

    static fromBase = (data: GamingUpgradeBase[]): GamingUpgrade[] => {
        return data.map(box => new GamingUpgrade(box.index, box.data))
    }
}

export class Superbits {
    unlocked: boolean = false;
    constructor(public index: number, public data: GamingSuperbitModel) {}

    static fromBase = (data: GamingSuperbitBase[]): Superbits[] => {
        return data.map(superbit => new Superbits(superbit.index, superbit.data))
    }

    
    getCost = () => {
        return this.data.x1 * Math.pow(10, this.data.x2);
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

export enum TotalizerBonus {
    Damage = 0,
    Cooking = 1,
    BoatSpeed = 2,
    BitValue = 3,
    ExpMulti = 4,
    SkillExp = 5
}

// Should this be here or .. worship? :shrug:
export class Totalizer {
    totalWaves: number = 0;
    unlockedBonuses: TotalizerBonus[] = [];

    getBonus = (bonus: TotalizerBonus) => {
        if (this.unlockedBonuses.length == 0 || !this.unlockedBonuses.includes(bonus)) {
            return 0;
        }

        switch(bonus) {
            case TotalizerBonus.Damage: 
            case TotalizerBonus.BoatSpeed:
            case TotalizerBonus.ExpMulti:
            case TotalizerBonus.SkillExp:
                return Math.floor(this.totalWaves / 10);
            case TotalizerBonus.Cooking: return 10 * Math.floor(this.totalWaves / 10);
            case TotalizerBonus.BoatSpeed: return Math.floor(this.totalWaves / 10);
            default: return 0;
        }
    }
}

export class Gaming {
    level: number = 0;

    importBoxes: ImportBox[] = ImportBox.fromBase(initGamingBoxRepo());
    upgrades: GamingUpgrade[] = GamingUpgrade.fromBase(initGamingUpgradeRepo());
    superbits: Superbits[] = Superbits.fromBase(initGamingSuperbitsRepo());
    rawGamingData: any[] = [];
    rawSproutData: number[][] = [];

    totalizer: Totalizer = new Totalizer();

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

export const initGaming = () => {
    return new Gaming();
}

const parseGaming: IParser = function (raw: Cloudsave, data: Map<string, any>) {
    const gaming = data.get("gaming") as Gaming;
    const charCount = data.get("charCount") as number;
    const gamingData = safeJsonParse(raw, "Gaming", []) as any[] || [];
    const gamingSproutData = safeJsonParse(raw, "GamingSprout", []) as number[][];
    const playerSkillLevels = range(0, charCount).map((_, i) => { return raw.get(`Lv0_${i}`) }) as number[][];

    if (gamingData.length == 0) {
        return;
    }
    
    gaming.rawGamingData = gamingData;
    gaming.rawSproutData = gamingSproutData;

    gaming.level = playerSkillLevels.reduce((max, player) => max = Math.max(max, player[SkillsIndex.Gaming]), 0);

    gaming.importBoxes[0].level = gamingSproutData[25][0];
    gaming.importBoxes[1].level = gamingSproutData[26][0];

    [...(gamingData[12] as string)].forEach(char => {
        const bitIndex = letterToNumber(char);
        if (bitIndex >= 0 && bitIndex < gaming.superbits.length) { // This should never not be the case but .. you know.
            gaming.superbits[bitIndex].unlocked = true;
        }
    })
}

export const updateGaming = (data: Map<string, any>) => {
    const gaming = data.get("gaming") as Gaming;
    const worship = data.get("worship") as Worship;

    gaming.totalizer.totalWaves = worship.totemInfo.reduce((sum, totem) => sum += totem.maxWave, 0);
    return gaming;
}

export const updateSuperbitImpacts = (data: Map<string, any>) => {
    const gaming = data.get("gaming") as Gaming;

    //TODO: Do obols

    // Totalizer stuff.
    if (gaming.superbits[7].unlocked) {
        gaming.totalizer.unlockedBonuses.push(TotalizerBonus.Damage);
    }
    if (gaming.superbits[13].unlocked) {
        gaming.totalizer.unlockedBonuses.push(TotalizerBonus.Cooking);
    }
    if (gaming.superbits[3].unlocked) {
        gaming.totalizer.unlockedBonuses.push(TotalizerBonus.BoatSpeed);
    }
    if (gaming.superbits[20].unlocked) {
        gaming.totalizer.unlockedBonuses.push(TotalizerBonus.BitValue);
    }
    if (gaming.superbits[11].unlocked) {
        gaming.totalizer.unlockedBonuses.push(TotalizerBonus.ExpMulti);
    }
    if (gaming.superbits[16].unlocked) {
        gaming.totalizer.unlockedBonuses.push(TotalizerBonus.SkillExp);
    }

    //TODO: Do shrine level up speed
    //TODO: Figure out the prayer thing, it requires some refactoring.

    const construction = data.get("construction") as Construction;
    if (gaming.superbits[12].unlocked) {
        construction.library.gamingCheckoutBoost = gaming.level;
    }

    const atomCollider = data.get("collider") as AtomCollider;
    if (gaming.superbits[21].unlocked) {
        atomCollider.atoms.forEach(atom => atom.gamingDiscount = 10);
    }
    if (gaming.superbits[23].unlocked) {
        atomCollider.atoms.forEach(atom => atom.gamingMaxLevelBoost = 10);
    }
}

export default parseGaming;