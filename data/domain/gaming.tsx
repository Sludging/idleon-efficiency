import { letterToNumber, range } from "../utility";
import { SkillsIndex } from "./SkillsIndex";
import { Arcade } from "./arcade";
import { AtomCollider } from "./atomCollider";
import { Domain, RawData } from "./base/domain";
import { Bribe } from "./bribes";
import { Construction } from "./construction";
import { GamingBoxBase, initGamingBoxRepo } from "./data/GamingBoxRepo";
import { GamingSuperbitBase, initGamingSuperbitsRepo } from "./data/GamingSuperbitsRepo";
import { GamingUpgradeBase, initGamingUpgradeRepo } from "./data/GamingUpgradeRepo";
import { Equinox, MetalDetector } from "./equinox";
import { Item } from "./items";
import { GamingBoxModel } from "./model/gamingBoxModel";
import { GamingSuperbitModel } from "./model/gamingSuperbitModel";
import { GamingUpgradeModel } from "./model/gamingUpgradeModel";

export class GamingUpgrade {
    constructor(public index: number, public data: GamingUpgradeModel) { }

    static fromBase = (data: GamingUpgradeBase[]): GamingUpgrade[] => {
        return data.map(box => new GamingUpgrade(box.index, box.data))
    }
}

export class Superbits {
    unlocked: boolean = false;
    constructor(public index: number, public data: GamingSuperbitModel) { }

    static fromBase = (data: GamingSuperbitBase[]): Superbits[] => {
        return data.map(superbit => new Superbits(superbit.index, superbit.data))
    }


    getCost = () => {
        return this.data.x1 * Math.pow(10, this.data.x2);
    }
}

export class ImportBox {
    level: number = 0;
    constructor(public index: number, public data: GamingBoxModel) { }

    getBonus = () => {
        switch (this.index) {
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

export class Gaming extends Domain {
    level: number = 0;

    importBoxes: ImportBox[] = ImportBox.fromBase(initGamingBoxRepo());
    upgrades: GamingUpgrade[] = GamingUpgrade.fromBase(initGamingUpgradeRepo());
    superbits: Superbits[] = Superbits.fromBase(initGamingSuperbitsRepo());
    rawGamingData: any[] = [];
    rawSproutData: number[][] = [];

    equinoxBonustoNuggets: number = 1;

    bribeBonusToShovelSpeed: number = 0;
    islandExpeditionBonusToShovelSpeed: number = 0;
    arcadeBonusToShovelSpeed: number = 0;

    getCurrentWater = (): number => {
        return Math.floor(Math.pow(this.rawSproutData[25][1] * (1 + this.importBoxes[0].getBonus() / 100) / 3600, .75));
    }

    getNextWaterTime = (): number => {
        // Math in seconds.
        const absoluteTimeToNextWater = Math.pow(this.getCurrentWater() + 1, 4 / 3) * 3600;

        return absoluteTimeToNextWater - this.rawSproutData[25][1];
    }

    getShovelCount = (): number => {
        const baseShovelCount = Math.floor(Math.pow(this.rawSproutData[26][1] / 3600, .44));
        const bonus = 1 + (this.islandExpeditionBonusToShovelSpeed + this.bribeBonusToShovelSpeed + this.arcadeBonusToShovelSpeed) / 100;
        return Math.round(baseShovelCount * bonus);
    }

    getNextShovelTime = (): number => {
        // Math in seconds.
        const absoluteTimeToNextShovel = Math.pow(this.getShovelCount() + 1, 25 / 11) * 3600;

        return absoluteTimeToNextShovel - this.rawSproutData[26][1];
    }

    getNuggetRange = (): number[] => {
        const boxUpgrade = this.importBoxes[1].getBonus();
        const maxStat = boxUpgrade * (1 / Math.pow(1e-5, .64)) * this.equinoxBonustoNuggets;
        const minStat = boxUpgrade * (1 / Math.pow(1, .64)) * this.equinoxBonustoNuggets;
        return [minStat, maxStat];
    }

    getRawKeys(): RawData[] {
        return [
            {key: "Gaming", perPlayer: false, default: []},
            {key: "GamingSprout", perPlayer: false, default: []},
            {key: "Lv0_", perPlayer: true, default: []},
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const gaming = data.get(this.getDataKey()) as Gaming;
        const charCount = data.get("charCount") as number;
        const gamingData = data.get("Gaming") as any[] || [];
        const gamingSproutData = data.get("GamingSprout") as number[][];
        const playerSkillLevels = range(0, charCount).map((_, i) => { return data.get(`Lv0_${i}`) }) as number[][];

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
}

export const updateGaming = (data: Map<string, any>) => {
    const gaming = data.get("gaming") as Gaming;
    const equinox = data.get("equinox") as Equinox;
    const bribes = data.get("bribes") as Bribe[];
    const arcade = data.get("arcade") as Arcade;

    gaming.equinoxBonustoNuggets = Math.max(1, (equinox.upgrades[7] as MetalDetector).getTotalBonus());

    gaming.bribeBonusToShovelSpeed = bribes.find(bribe => bribe.bribeIndex == 37)?.value ?? 0;
    gaming.islandExpeditionBonusToShovelSpeed = 0; // TODO : update this once island expeditions are supported in IE, should be 25 if activated
    gaming.arcadeBonusToShovelSpeed = arcade.bonuses.find(bonus => bonus.effect == "+{% Nugget Regen")?.getBonus() ?? 0;;

    return gaming;
}

export const updateSuperbitImpacts = (data: Map<string, any>) => {
    const gaming = data.get("gaming") as Gaming;   
    //TODO: Do obols

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