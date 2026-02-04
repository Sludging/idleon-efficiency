import { lavaFunc, range } from '../../utility'
import { Account } from '../account';
import { Alchemy } from '../world-2/alchemy/alchemy';
import { AtomCollider } from '../world-3/construction/atomCollider';
import { Domain, RawData } from '../base/domain';
import { Bribe, BribeConst, BribeStatus } from './bribes';
import { Capacity } from '../capacity';
import { ImageData } from '../imageData';
import { Item } from '../items';
import { Lab } from '../world-4/lab';
import { BaseItemModel } from '../model/baseItemModel';
import { StampDataModel } from '../model/stampDataModel';
import { StampItemModel } from '../model/stampItemModel';
import { StampUpgradeCalculator } from './stampUpgradeCalculator';
import { Player } from '../player';
import { Rift } from '../world-4/rift';
import { Sigils } from '../world-2/alchemy/sigils';
import { Storage } from '../storage';
import { Sneaking } from '../world-6/sneaking';

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
    labMultiplier: number = 1;
    pristineCharmMultiplier: number = 1;
    sigilDiscount: number = 0;
    hasBribe: boolean = false;
    vialDiscount: number = 0;
    atomDiscount: number = 0;
    gildedAvailable: boolean = false;
    gildedCount: number = 0;

    canUpgradeWithCoins: boolean = false;
    canUpgradeWithMats: boolean = false;
    lowOnResources: boolean = false;
    cantCarry: boolean = false;

    removeLimitFromUnderLevel: boolean = false;

    // Max upgrades (key is the stamp level that will the costs in the value)
    maxCarryInfo: Record<number, {
        colliderDiscount: number,
        costToLevel: number,
        goldCostToLevel: number,
        currentDiscount: boolean,
    }> = {}
    maxCarryAmount: number = 0;
    maxCarryPlayer: Player | undefined;
    
    // Upgrade calculator for different discount scenarios
    upgradeCalculator: StampUpgradeCalculator | undefined;

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

    getMaterialCost = (level: number = this.level): number => {
        const matDiscount = Math.max(0.1, 1 - this.atomDiscount / 100) * (1 / (1 + (this.sigilDiscount / 100)));
        const baseCost = this.data.startV * matDiscount * Math.pow(this.data.mCostExp, Math.pow(Math.round(level / this.data.upgradeInterval) - 1, 0.8));
        const discountedCost = Math.floor(Math.floor(baseCost) * Math.max(0.1, 1 - this.vialDiscount / 100));
        // Gilded Stamp
        const finalCost = this.gildedAvailable && this.gildedCount > 0 ? discountedCost * 0.05 : discountedCost;
        return Math.max(1, finalCost) // Cost can never be 0;
    }

    // Some stamps max cap isn't realistic, not showing their caps is more realistic.
    shouldShowMaxCap = () => {
        // If not one of these stamps, show max level.
        return ![
            "StampC15", // Talent III
            "StampC18", // Talent S
            "StampC7", // Golden Apple
            "StampA11", // Agile Stamp
            "StampA15", // Clover Stamp
            "StampB10", // Cool Diggy Tool
            "StampB8", // Matty Bag
            "StampA19", // Polearm Stamp
            "StampB12", // Swag Swingy
            "StampA23", // Sukka Foo
            "StampA28", // Stat Graph
            "StampB7", // Duplogs
            "StampC2", // Mason Jar
            "StampB5", // Twin ores
            "StampB34", // Flowin
            "StampC16", // Talent IV
            "StampC6", // Potion
            "StampC21", // DNA
            "StampC22", // Refinery
            "StampA10", // Battleaxe
            // My own list, based on money scaling and not mat scaling.
            "StampA29", // Gilded Axe
            "StampA30", // Diamond Axe
            "StampA31", // Tripleshot
            "StampA32", // Blackheart
        ].includes(this.raw_name)
    }

    // Calculate information required to show the user the following information:
    // 1. The cost to reach their current max level if not maxed
    // 2. The cost to unlock the next 3 "tiers" (both material and money)
    // The cost will be the total cost to reach that "max", not the cost to unlock that max.
    calculateCostForNextTiers = (discountIncrement: number) => {
        // We currently should only have one key and that's the max carry level with max possible discount (0 if not unlocked or 90% if unlocked).
        const maxCarryLevel = Number(Object.keys(this.maxCarryInfo)[0]);
        const nextTier = this.maxLevel + this.data.upgradeInterval;
        // If we are already at our max carry level, show the next tier cost at current discount
        if (this.maxLevel == maxCarryLevel) {
            this.maxCarryInfo = {}; // Clear out the previous max tier math.
            this.maxCarryInfo[nextTier] = { colliderDiscount: 0, costToLevel: this.getMaterialCost(), goldCostToLevel: range(this.level, nextTier).reduce((sum, level) => sum += this.getGoldCost(level), 0), currentDiscount: true };
        }

        // Show money cost to reach max level if we haven't fully capped our stamp yet.
        if (this.level < this.maxLevel) {
            this.maxCarryInfo[this.maxLevel] = { colliderDiscount: 0, costToLevel: 0, goldCostToLevel: range(this.level, this.maxLevel).reduce((sum, level) => sum += this.getGoldCost(level), 0), currentDiscount: false };
        }

        const currentAtomDiscount = this.atomDiscount;
        const upperLimit = Math.min(maxCarryLevel, nextTier + this.data.upgradeInterval * 2); // Show at most 3 tiers + max carry level

        // Calculate the next 2 tiers (using for loop so can break early).
        for (let tier = nextTier; tier <= upperLimit; tier += this.data.upgradeInterval) {
            // Start from 0 discount, find the minimum discount required to level this tier
            for (let atomDiscount = (tier == nextTier ? currentAtomDiscount : 0); atomDiscount <= 90; atomDiscount = Math.min(90, atomDiscount + discountIncrement)) {
                this.atomDiscount = atomDiscount;
                const tierCost = this.getMaterialCost(tier - this.data.upgradeInterval) // to reach this level, we only need to unlock the previous tier.
                if (tierCost < this.maxCarryAmount) { // If we can carry this amount, we found the minimum required to reach this tier
                    const costToLevel = tierCost + (Object.keys(this.maxCarryInfo).includes((tier - this.data.upgradeInterval).toString()) ? this.maxCarryInfo[tier - this.data.upgradeInterval].costToLevel : 0);
                    const goldCostToLevel = range(this.level, tier).reduce((sum, level) => sum += this.getGoldCost(level), 0);
                    const isCurrentUnlock = tier == nextTier;
                    this.maxCarryInfo[tier] = { colliderDiscount: atomDiscount, costToLevel: costToLevel, goldCostToLevel: goldCostToLevel, currentDiscount: isCurrentUnlock && currentAtomDiscount == atomDiscount ? true : false };
                    break;
                }
                // Ugly hack: for users without hydrogen atom, no discount increment means infinite loop on this for. So we break after checking once.
                if (discountIncrement == 0) {
                    break;
                }
            }
        }

        // Revert the discount to real number.
        this.atomDiscount = currentAtomDiscount;
    }

    // I don't like this, need to think of a better way
    setMaxLevelForCarryCap = (discountUnlocked: boolean) => {
        const currentAtomDiscount = this.atomDiscount;
        this.atomDiscount = discountUnlocked ? 90 : 0;
        let maxCarryLevel = this.maxLevel;

        // As long as we can carry enough for upgrade, keep increasing the upgrades.
        while (this.getMaterialCost(maxCarryLevel) < this.maxCarryAmount) {
            maxCarryLevel += this.data.upgradeInterval;
        }

        const costToLevel = range(this.maxLevel, maxCarryLevel, this.data.upgradeInterval).reduce((sum, level) => sum += this.getMaterialCost(level), 0);
        const goldCostToLevel = range(this.level, maxCarryLevel).reduce((sum, level) => sum += this.getGoldCost(level), 0);
        this.maxCarryInfo[maxCarryLevel] = { colliderDiscount: this.atomDiscount, costToLevel: costToLevel, goldCostToLevel: goldCostToLevel, currentDiscount: false }

        // Revert the discount to real number.
        this.atomDiscount = currentAtomDiscount;
    }

    getBonusText = (skillLevel: number = 0): string => {
        const bonus = this.getBonus(skillLevel, true);
        // Only show decimals if they exist
        const formattedBonus = Number.isInteger(bonus) ? bonus.toString() : bonus.toFixed(2);
        return this.bonus.replace(/{/, formattedBonus);
    }

    getBonus = (skillLevel: number = 0, round = false): number => {
        const normalLevel = this.level * 10 / this.data.upgradeInterval;
        const lvlDiff = 3 + (normalLevel - 3) * Math.pow(skillLevel / (normalLevel - 3), 0.75)
        const reducedLevel = Math.floor(lvlDiff * this.data.upgradeInterval / 10);
        // only second tab gets reduced level math and only if the reduced level is lower than stamp level.
        if (this.removeLimitFromUnderLevel == false && skillLevel > 0 && reducedLevel < this.level && this.data.i10 > 0) {
            return lavaFunc(this.data.function, reducedLevel, this.data.x1, this.data.x2, round) * this.labMultiplier * this.pristineCharmMultiplier;
        }
        return lavaFunc(this.data.function, this.level, this.data.x1, this.data.x2, round) * this.labMultiplier * this.pristineCharmMultiplier;
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

export class Stamps extends Domain {
    constructor(public dataKey: string) {
        super(dataKey);
    }
    
    init = (allItems: Item[]) => {
        const stampItems = allItems.filter(item => isStampItem(item.data.item));
        const allStamps = Stamp.fromBase(stampItems);
        const combat_stamp = allStamps.filter(stamp => stamp.type == "Combat Stamp");
        const skills_stamp = allStamps.filter(stamp => stamp.type == "Skills Stamp");
        const misc_stamp = allStamps.filter(stamp => stamp.type == "Misc Stamp");
    
        convertToItemClass([combat_stamp, skills_stamp, misc_stamp], allItems);

        return [combat_stamp, skills_stamp, misc_stamp];
    }

    parse = (data: Map<string, any>) => {
        const stamps = data.get(this.getDataKey());
        const stampLevels = data.get("StampLv") as any[] // safeJsonParse(raw, "StampLv", []) as any[];
        const stampMaxLevels = data.get("StampLvM") as any[] // safeJsonParse(raw, "StampLvM", []) as any[];
        
        if (stampLevels) {
            stampLevels.forEach((tab, index) => { // for each tab in the cloud save
                Object.entries(tab).map(([key, value]) => { // for each stamp in the current tab
                    if (key.toLowerCase() !== "length") {  // ignore length at the end
                        try {
                            stamps[index][parseInt(key)].level = Number(value); // update our pre-populated data with the stamp level
                            stamps[index][parseInt(key)].maxLevel = Number(stampMaxLevels[index][key]);
                        }
                        catch (e) {
                            console.debug("Unable to set level for stamp", key, e);
                        }
                    }
                })
            })
        }
    }

    getRawKeys(): RawData[] {
        return [
            { key: "StampLv", default: [], perPlayer: false},
            { key: "StampLvM", default: [], perPlayer: false},
        ]
    }
}

export const getStampBonusForKey = (stamps: Stamp[][], key: string) => {
    return stamps.flatMap(tab => tab).filter(stamp => stamp.data.effect == key).reduce((sum, stamp) => sum += stamp.getBonus(), 0);
}

const isStampItem = (x: BaseItemModel): x is StampItemModel => "stampData" in x

const convertToItemClass = (stamps: Stamp[][], allItems: Item[]) => {
    stamps.flatMap(tab => tab).forEach(stamp => {
        const matItem = allItems.find(item => item.internalName == stamp.data.material.item)?.duplicate() ?? Item.emptyItem(stamp.data.material.item);
        stamp.materialItem = matItem;
    });
}

export function updateStamps(data: Map<string, any>) {
    const stamps = data.get("stamps") as Stamp[][];
    const lab = data.get("lab") as Lab;
    const sigils = data.get("sigils") as Sigils;
    const bribes = data.get("bribes") as Bribe[];
    const alchemy = data.get("alchemy") as Alchemy;
    const collider = data.get("collider") as AtomCollider;
    const rift = data.get("rift") as Rift;
    const sneaking = data.get("sneaking") as Sneaking;

    // Update gilded stamps (this can totally be done in parse if needed)
    const optLacc = data.get("OptLacc"); 
    const gildedStampCount = parseInt(optLacc[154]);
    const stampMastery = rift.bonuses.find(bonus => bonus.name == "Stamp Mastery");
 
    const labBonus = (lab.bonuses.find(bonus => bonus.name == "Certified Stamp Book")?.active ?? false) ? 2 : 1;
    const pristineCharm17 = sneaking.pristineCharms.find(charm => charm.data.itemId == 17);
    const allButMisc = stamps.flatMap(tab => tab).filter(stamp => stamp.type != "Misc Stamp");
    allButMisc.forEach(stamp => {
        stamp.labMultiplier = labBonus;
        stamp.pristineCharmMultiplier = (pristineCharm17 && pristineCharm17.unlocked) ? (1 + pristineCharm17.data.x1 / 100) : 1;
    })

    const limitIsRemoved = sneaking.jadeUpgrades.find(upgrade => upgrade.index == 5)?.purchased ?? false;
    const discountBribe = bribes[BribeConst.StampBribe];
    const vialDiscount = alchemy.getVialBonusForKey("MatCostStamp");
    stamps.flatMap(tab => tab).forEach(stamp => {
        stamp.sigilDiscount = sigils.sigils[6].getBonus();
        stamp.atomDiscount = collider.atoms[0].getBonus();
        stamp.vialDiscount = vialDiscount;
        stamp.hasBribe = discountBribe.status == BribeStatus.Purchased;
        stamp.gildedAvailable = stampMastery?.active ?? false;
        stamp.gildedCount = gildedStampCount;
        stamp.removeLimitFromUnderLevel = limitIsRemoved;
    })

    return stamps;
}

// Carry cap is influenced by stamps, so this has to be done in a separate function after carry caps are calculated.
export function updateStampMaxCarry(data: Map<string, any>) {
    const stamps = data.get("stamps") as Stamp[][];
    const capacity = data.get("capacity") as Capacity;
    const collider = data.get("collider") as AtomCollider;
    const storage = data.get("storage") as Storage;
    const account = data.get("account") as Account;

    const dailyAtomDiscountIncrease = collider.atoms[0].level * collider.atoms[0].data.bonusPerLv;
    stamps.flatMap(tab => tab).forEach(stamp => {
        // Identify the max possible level for this stamp based on current carry caps.
        const stampMatBagType = stamp.materialItem?.getBagType();
        stamp.maxCarryInfo = {}; // clean data so we don't get any old info mix-up.
        if (stampMatBagType) {
            const maxCarry = capacity.maxCapacityByType[stampMatBagType];
            stamp.maxCarryAmount = maxCarry.maxCapacity * maxCarry.inventorySlots;
            stamp.maxCarryPlayer = maxCarry.player;
        }
        else {
            stamp.maxCarryAmount = ["dStone", "dQuest"].includes((stamp.materialItem as Item).typeGen) ? 999999 : 80;
        }
        
        // Initialize the upgrade calculator
        stamp.upgradeCalculator = new StampUpgradeCalculator(stamp);
        
        // For backward compatibility, still calculate these values using the old methods
        stamp.setMaxLevelForCarryCap(collider.atoms[0].level > 0);
        stamp.calculateCostForNextTiers(dailyAtomDiscountIncrease);
        
        // Calculate all common upgrade scenarios
        stamp.upgradeCalculator.calculateAllScenarios(dailyAtomDiscountIncrease, stamp.gildedAvailable ?? false);

        if (stamp.level > 0 && stampMatBagType != undefined) { // if stamp is actually unlocked and material used fits the carry cap maths.
            // If max level, we need to upgrade with mats
            if (stamp.isMaxLevel()) {
                const nextTierLevel = stamp.maxLevel + stamp.data.upgradeInterval;
                const nextTierInfo = stamp.maxCarryInfo[nextTierLevel];
                const matInStorage = storage?.amountInStorage(stamp.materialItem?.internalName ?? "");
                
                // Use the calculator to determine upgrade possibilities
                const canUpgradeWithoutDiscounts = stamp.upgradeCalculator.canUpgradeWithoutDiscounts();
                const canUpgradeWithGildedOnly = stamp.upgradeCalculator.canUpgradeWithGildedOnly();
                const minAtomDiscount = stamp.upgradeCalculator.getMinimumAtomDiscount(true);
                
                // Set flags based on calculator results
                if (canUpgradeWithoutDiscounts && matInStorage >= nextTierInfo.costToLevel) {
                    stamp.canUpgradeWithMats = true;
                } else if (canUpgradeWithGildedOnly && stamp.gildedAvailable && matInStorage >= nextTierInfo.costToLevel ) {
                    stamp.canUpgradeWithMats = true;
                } else if (minAtomDiscount >= 0 && minAtomDiscount <= stamp.atomDiscount && matInStorage >= nextTierInfo.costToLevel) {
                    stamp.canUpgradeWithMats = true;
                } else if (stamp.maxCarryAmount < nextTierInfo.costToLevel) {
                    stamp.cantCarry = true;
                } else if (matInStorage < nextTierInfo.costToLevel) {
                    stamp.lowOnResources = true;
                }
            }
            // else we need to use coins to max it out first.
            else {
                const nextTier = stamp.maxCarryInfo[stamp.maxLevel];
                if (account.totalMoney >= nextTier.goldCostToLevel) {
                    stamp.canUpgradeWithCoins = true;
                }
                else {
                    stamp.lowOnResources = true;
                }
            }
        }
    })

    return stamps;
}

// Example function to demonstrate how to use the new filtering capabilities
export function getUpgradableStampsByDiscountType(data: Map<string, any>) {
    const stamps = data.get("stamps") as Stamp[][];
    
    // Make sure stamps have their upgrade calculators initialized
    if (!stamps.flatMap(tab => tab)[0]?.upgradeCalculator) {
        updateStampMaxCarry(data);
    }
    
    // 1. All stamps that can be upgraded without atom or gilded discount
    const noDiscountStamps = StampUpgradeCalculator.filterUpgradableStamps(stamps, {
        requireNoDiscounts: true
    });
    
    // 2. Stamps that can be upgraded with just gilded discount
    const gildedOnlyStamps = StampUpgradeCalculator.filterUpgradableStamps(stamps, {
        requireGildedOnly: true
    });
    
    // 3. Stamps that require gilded discount AND atom discount with a selectable discount %
    const atomWithGildedStamps = StampUpgradeCalculator.filterUpgradableStamps(stamps, {
        requireAtomDiscount: 30, // Example: 30% atom discount
        includeGildedWithAtom: true
    });
    
    return {
        noDiscountStamps,
        gildedOnlyStamps,
        atomWithGildedStamps,
    };
}
