import { lavaFunc, range } from '../utility'
import { Alchemy } from './alchemy';
import { AtomCollider } from './atomCollider';
import { Bribe, BribeConst, BribeStatus } from './bribes';
import { ImageData } from './imageData';
import { Item } from './items';
import { Lab } from './lab';
import { BaseItemModel } from './model/baseItemModel';
import { StampDataModel } from './model/stampDataModel';
import { StampItemModel } from './model/stampItemModel';
import { Sigils } from './sigils';

export enum StampTab {
    Combat = 0,
    Skill = 1,
    Misc = 2
}

export const StampConsts = {
    PraydayIndex: 34,
    FlowinIndex: 33,
    CrystallinIndex: 2,
}

export class Stamp {
    raw_name: string;
    name: string;
    level: number = 0;
    maxLevel: number = 0;
    type: string; // todo: enum
    bonus: string;
    data: StampDataModel;

    materialItem: Item | undefined = undefined;

    // Update field
    multiplier: number = 1;
    sigilDiscount: number = 0;
    hasBribe: boolean = false;
    vialDiscount: number = 0;
    atomDiscount: number = 0;

    constructor(name: string, raw_name: string, type: string, bonus: string, data: StampDataModel) {
        this.raw_name = raw_name;
        this.name = name.replace("_", " ");
        this.type = type;
        this.bonus = bonus;
        this.data = data;
    }

    getGoldCost = (level: number = this.level): number => {
        const goldCost = this.data.startingCost * Math.pow(this.data.cCostExp - (level / (level + 5 * this.data.upgradeInterval)) * 0.25, level * (10 / this.data.upgradeInterval)) * Math.max(0.1, 1 - this.vialDiscount / 100);
        if (this.hasBribe) {
            //TODO: Make this math less... hard coded?
            return goldCost * 0.92;
        }
        return goldCost
    }

    getGoldCostToMax = (): number => {
        const maxLevel = this.level == this.maxLevel ? this.level + this.data.upgradeInterval : this.maxLevel
        return range(this.level, maxLevel).reduce((sum, level) => sum += this.getGoldCost(level), 0);
    }

    getMaterialCost = (): number => {
        const matDiscount = Math.max(0.1, 1 - this.atomDiscount / 100) * (1 / (1 + (this.sigilDiscount / 100)));
        const baseCost = this.data.startV * matDiscount * Math.pow(this.data.mCostExp, Math.pow(Math.round(this.level / this.data.upgradeInterval) - 1, 0.8));
        return Math.floor(Math.floor(baseCost) * Math.max(0.1, 1 - this.vialDiscount / 100));
    }

    getBonusText = (skillLevel: number = 0): string => {
        return this.bonus.replace(/{/, this.getBonus(skillLevel, true).toString());
    }

    getBonus = (skillLevel: number = 0, round = false): number => {
        const normalLevel = this.level * 10 / this.data.upgradeInterval;
        const lvlDiff = 3 + (normalLevel - 3) * Math.pow(skillLevel / (normalLevel - 3), 0.75)
        const reducedLevel = Math.floor(lvlDiff * this.data.upgradeInterval / 10);
        // only second tab gets reduced level math and only if the reduced level is lower than stamp level.
        if (skillLevel > 0 && reducedLevel < this.level && this.data.i10 > 0) {
            return lavaFunc(this.data.function, reducedLevel, this.data.x1, this.data.x2, round) * this.multiplier;
        }
        return lavaFunc(this.data.function, this.level, this.data.x1, this.data.x2, round) * this.multiplier;
    }

    isMaxLevel = (): boolean => {
        return this.level == this.maxLevel;
    }

    getImageData = (): ImageData => {
        return {
            location: this.raw_name,
            height: 72,
            width: 72
        }
    }

    static fromBase = (data: Item[]) => {
        return data.map(stamp => {
            if (isStampItem(stamp.data.item)) {
                return new Stamp(stamp.displayName, stamp.internalName, stamp.type, stamp.data.item.bonus, stamp.data.item.stampData);
            }
            throw new Error("This shouldn't be happening.");
        });
    }
}

export const getStampBonusForKey = (stamps: Stamp[][], key: string) => {
    return stamps.flatMap(tab => tab).filter(stamp => stamp.data.effect == key).reduce((sum, stamp) => sum += stamp.getBonus(), 0);
}

const isStampItem = (x: BaseItemModel): x is StampItemModel => "stampData" in x

const initStamps = (allItems: Item[]): Stamp[][] => {
    const stampItems = allItems.filter(item => isStampItem(item.data.item));
    const allStamps = Stamp.fromBase(stampItems);
    const combat_stamp = allStamps.filter(stamp => stamp.type == "Combat Stamp");
    const skills_stamp = allStamps.filter(stamp => stamp.type == "Skills Stamp");
    const misc_stamp = allStamps.filter(stamp => stamp.type == "Misc Stamp");

    return [combat_stamp, skills_stamp, misc_stamp]
}

const convertToItemClass = (stamps: Stamp[][], allItems: Item[]) => {
    stamps.flatMap(tab => tab).forEach(stamp => {
        const matItem = allItems.find(item => item.internalName == stamp.data.material.item)?.duplicate() ?? Item.emptyItem(stamp.data.material.item);
        stamp.materialItem = matItem;
    });
}

export default function parseStamps(rawData: Array<any>, maxData: Array<any>, allItems: Item[]) {
    const stampData = initStamps(allItems); // Initialize stamp array with all pre-populated data
    if (rawData) {
        rawData.forEach((tab, index) => { // for each tab in the cloud save
            Object.entries(tab).map(([key, value]) => { // for each stamp in the current tab
                if (key.toLowerCase() !== "length") {  // ignore length at the end
                    try {
                        stampData[index][parseInt(key)].level = value as number; // update our pre-populated data with the stamp level
                        stampData[index][parseInt(key)].maxLevel = maxData[index][key] as number;
                    }
                    catch (e) {
                        console.debug("Unable to set level for stamp", key);
                    }
                }
            })
        })
    }
    convertToItemClass(stampData, allItems);

    return stampData;
}

export function updateStamps(data: Map<string, any>) {
    const stamps = data.get("stamps") as Stamp[][];
    const lab = data.get("lab") as Lab;
    const sigils = data.get("sigils") as Sigils;
    const bribes = data.get("bribes") as Bribe[];
    const alchemy = data.get("alchemy") as Alchemy;
    const collider = data.get("collider") as AtomCollider;

    if (lab.bonuses.find(bonus => bonus.name == "Certified Stamp Book")?.active ?? false) {
        const allButMisc = stamps.flatMap(tab => tab).filter(stamp => stamp.type != "Misc Stamp");
        allButMisc.forEach(stamp => {
            stamp.multiplier = 2;
        })
    }

    const discountBribe = bribes[BribeConst.StampBribe];
    const vialDiscount = alchemy.getVialBonusForKey("MatCostStamp");
    stamps.flatMap(tab => tab).forEach(stamp => {
        stamp.sigilDiscount = sigils.sigils[6].getBonus();
        stamp.atomDiscount = collider.atoms[0].getBonus();
        stamp.vialDiscount = vialDiscount;
        stamp.hasBribe = discountBribe.status == BribeStatus.Purchased;
    })

    return stamps;
}