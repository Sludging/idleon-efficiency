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
import { IslandExpeditions } from "./islandExpedition";
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
        const toReturn: ImportBox[] = [];

        data.forEach(box => {
            switch(box.index) {
                case 3:
                    toReturn.push(new ElegantSeashell(box.index, box.data));
                    break;
                case 7:
                    toReturn.push(new ImmortalSnail(box.index, box.data));
                    break;
                default:
                    toReturn.push(new ImportBox(box.index, box.data));
                    break;
            }
        });

        return toReturn;
    }
}

export class ElegantSeashell extends ImportBox {
    plantsEvolved: number = 0;

    constructor(public index: number, public data: GamingBoxModel) {
        super(index, data)
    }
}

export class ImmortalSnail extends ImportBox {
    currentSnailLevel: number = 0;
    highestSnailLevel: number = 0;
    lettersAvailable: number = 0;
    lettersSpentEncourage: number = 0;

    constructor(public index: number, public data: GamingBoxModel) {
        super(index, data)
    }
}

export class Gaming extends Domain {
    level: number = 0;

    importBoxes: ImportBox[] = ImportBox.fromBase(initGamingBoxRepo());
    upgrades: GamingUpgrade[] = GamingUpgrade.fromBase(initGamingUpgradeRepo());
    superbits: Superbits[] = Superbits.fromBase(initGamingSuperbitsRepo());
    rawGamingData: any[] = [];
    rawSproutData: number[][] = [];

    biggestGoldNugget: number = 0;

    currenBitsOwned: number = 0;

    equinoxBonusToNuggets: number = 1;

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

    getShovelSpeedBonus = (): number => {
        return 1 + (this.islandExpeditionBonusToShovelSpeed + this.bribeBonusToShovelSpeed + this.arcadeBonusToShovelSpeed) / 100;
    }

    getShovelCount = (): number => {
        return Math.round(Math.floor(Math.pow(this.rawSproutData[26][1] / 3600, .44)) * this.getShovelSpeedBonus());
    }

    getNextShovelTime = (): number => {
        // Math in seconds.
        const absoluteTimeToNextShovel = Math.pow((this.getShovelCount() + 1) / this.getShovelSpeedBonus(), 25 / 11) * 3600;

        return absoluteTimeToNextShovel - this.rawSproutData[26][1];
    }

    getNuggetRange = (): number[] => {
        const boxUpgrade = this.importBoxes[1].getBonus();
        const maxStat = boxUpgrade * (1 / Math.pow(1e-5, .64)) * this.equinoxBonusToNuggets;
        const minStat = boxUpgrade * (1 / Math.pow(1, .64)) * this.equinoxBonusToNuggets;
        return [minStat, maxStat];
    }

    getRawKeys(): RawData[] {
        return [
            {key: "Gaming", perPlayer: false, default: []},
            {key: "GamingSprout", perPlayer: false, default: []},
            {key: "Lv0_", perPlayer: true, default: []},
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const gaming = data.get(this.getDataKey()) as Gaming;
        const charCount = data.get("charCount") as number;
        const gamingData = data.get("Gaming") as any[] || [];
        const gamingSproutData = data.get("GamingSprout") as number[][];
        const playerSkillLevels = range(0, charCount).map((_, i) => { return data.get(`Lv0_${i}`) }) as number[][];
        const optionList = data.get("OptLacc") as number[];

        if (gamingData.length == 0) {
            return;
        }

        gaming.rawGamingData = gamingData;
        gaming.rawSproutData = gamingSproutData;

        gaming.biggestGoldNugget = gamingData[8] ?? 0;

        gaming.currenBitsOwned = gamingData[0] ?? 0;

        gaming.level = playerSkillLevels.reduce((max, player) => max = Math.max(max, player[SkillsIndex.Gaming]), 0);

        gaming.importBoxes.forEach(box => {
            const dataIndex = 25+box.index;
            box.level = gamingSproutData[dataIndex][0] ?? 0;
            switch (box.index) {
                case 3:
                    (box as ElegantSeashell).plantsEvolved = gamingSproutData[dataIndex][1] ?? 0;
                    break;
                case 7:
                    (box as ImmortalSnail).currentSnailLevel = gamingSproutData[dataIndex][1] ?? 0;
                    (box as ImmortalSnail).highestSnailLevel = Math.max(gamingSproutData[dataIndex][1] ?? 0, optionList[210] ?? 0);
                    (box as ImmortalSnail).lettersAvailable = 0;
                    (box as ImmortalSnail).lettersSpentEncourage = gamingSproutData[dataIndex][2] ?? 0;
                    break;
            }
        });

        if (gamingData[12] != undefined && gamingData[12] != null && (gamingData[12] as string) != "") {
            [...(gamingData[12] as string)].forEach(char => {
                const bitIndex = letterToNumber(char);
                if (bitIndex >= 0 && bitIndex < gaming.superbits.length) { // This should never not be the case but .. you know.
                    gaming.superbits[bitIndex].unlocked = true;
                }
            })
        }
    }
}

export const updateGaming = (data: Map<string, any>) => {
    const gaming = data.get("gaming") as Gaming;
    const equinox = data.get("equinox") as Equinox;
    const bribes = data.get("bribes") as Bribe[];
    const arcade = data.get("arcade") as Arcade;
    const islandExpeditions = data.get("islandExpeditions") as IslandExpeditions;

    gaming.equinoxBonusToNuggets = Math.max(1, (equinox.upgrades[7] as MetalDetector).getTotalBonus());

    gaming.bribeBonusToShovelSpeed = bribes.find(bribe => bribe.bribeIndex == 37)?.value ?? 0;
    gaming.islandExpeditionBonusToShovelSpeed = islandExpeditions.bonusToShovelSpeed;
    gaming.arcadeBonusToShovelSpeed = arcade.bonuses.find(bonus => bonus.effect == "+{% Nugget Regen")?.getBonus() ?? 0;;

    return gaming;
}

export const updateSuperbitImpacts = (data: Map<string, any>) => {
    const gaming = data.get("gaming") as Gaming;   
    const equinox = data.get("equinox") as Equinox;
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

    if (gaming.superbits[35].unlocked) {
        equinox.upgrades.forEach(upgrade => upgrade.bonusLevelFromSuperBit35 = 10);
    }
}
