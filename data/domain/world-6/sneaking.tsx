import { letterToNumber, nFormatter } from "../../utility";
import { SkillsIndex } from "../SkillsIndex";
import { Alchemy, AlchemyConst, CauldronIndex } from "../world-2/alchemy/alchemy";
import { Domain, RawData } from "../base/domain";
import { initJadeUpgradeRepo } from "../data/JadeUpgradeRepo";
import { BaseNinjaItemBase, initNinjaItemRepo } from "../data/NinjaItemRepo";
import { NinjaUpgradeBase, initNinjaUpgradeRepo } from "../data/NinjaUpgradeRepo";
import { initNinjaFloorRepo, NinjaFloorBase } from "../data/NinjaFloorRepo";
import { initRandoListRepo, RandoListBase } from "../data/RandoListRepo";
import { NinjaFloorModel } from "../model/ninjaFloorModel";
import { NinjaItemTypeEnum } from "../enum/ninjaItemTypeEnum";
import { ImageData } from "../imageData";
import { Food, Item, initAllItems } from "../items";
import { JadeUpgradeModel } from "../model/jadeUpgradeModel";
import { NinjaPristineCharmModel } from '../model/ninjaPristineCharmModel';
import { NinjaUpgradeModel } from "../model/ninjaUpgradeModel";
import { NinjaItemModel } from '../model/ninjaItemModel';
import { NinjaWeaponModel } from '../model/ninjaWeaponModel';
import { NinjaTrinketModel } from '../model/ninjaTrinketModel';
import { BaseNinjaItemModel } from "../model/baseNinjaItemModel";
import type { Rift } from "../world-4/rift";
import { Account } from "../account";
import { Achievement } from "../achievements";
import { Card } from "../cards";
import { Companion, getCompanionActiveBonus } from "../companions";
import { Compass } from "../compass";
import { Menagerie } from "../menagerie";
import { Player } from "../player";
import { PlayerStatues } from "../world-1/statues";
import { Votes } from "../world-2/votes";
import { Hole } from "../world-5/hole/hole";
import { Emperor } from "./emperor";
import { Farming } from "./farming";
import { JellyOperator } from "../world-7/jellyOperator";
import { LegendTalents } from "../world-7/legendTalents";
import { SushiStation } from "../world-7/sushi";
import { StarSigns } from "../starsigns";
import { Talent } from "../talents";

export enum SneakingActivity {
    Sneaking = "Sneaking",
    Breaching = "Breaching",
    Untying = "Untying",
    Tied = "Tied",
    KnockedOut = "Knocked Out",
}

export enum SneakinWeaponType {
    Nunchaku = 1,
    Gloves = 0,
    Kunai = 2
}

const sneakingStaticLists = initRandoListRepo().filter(base => base.index == 101 || base.index == 102);

export const TiedPlayersHP = [
    0,
    10,
    60,
    750,
    3000,
    17000,
    80000,
    500000,
    1500000,
    7000000,
    30000000,
    200000000
]


export interface SneakingTie {
    damageDone: number,
    maxHP: number
}

export class SneakingItem {
    constructor(public index: number, public data: BaseNinjaItemModel, public level: number = 0) { }

    getImageData = (): ImageData => {
        return {
            location: `${this.data.internalId}`,
            height: 60,
            width: 60
        }
    }

    getDisplayText = (): string => {
        return "";
    }

    static fromBase(baseItem: BaseNinjaItemBase | undefined, level: number = 0): SneakingItem | undefined {
        if (baseItem) {
            if (baseItem.data.internalId == "Blank") {
                return undefined;
            }
            switch (baseItem.data.itemType) {
                case NinjaItemTypeEnum.Item:
                    return new SneakingHat(baseItem.index, baseItem.data as NinjaItemModel, level);
                case NinjaItemTypeEnum.Weapon:
                    return new SneakingWeapon(baseItem.index, baseItem.data as NinjaWeaponModel, level);
                case NinjaItemTypeEnum.Trinket:
                    return new SneakingTrinket(baseItem.index, baseItem.data as NinjaTrinketModel, level);
                case NinjaItemTypeEnum.PristineCharm:
                    return new SneakingPristineCharm(baseItem.index, baseItem.data as NinjaPristineCharmModel, level);
                case NinjaItemTypeEnum.Gemstone:
                    return SneakingGemstone.fromBase(baseItem);
                default:
                    return undefined;
            }
        } else {
            return undefined;
        }
    }
}

export class SneakingHat extends SneakingItem {
    constructor(public index: number, public data: NinjaItemModel, level: number = 0) {
        super(index, data, level);
    }

    override getDisplayText = (): string => {
        return this.data.desc;
    }
}

export class SneakingWeapon extends SneakingItem {
    constructor(public index: number, public data: NinjaWeaponModel, level: number) {
        super(index, data, level);
    }

    override getDisplayText = (): string => {
        return `Base Damage: ${nFormatter(this.getBaseDamage())}`;
    }

    getBaseDamage = (): number => {
        return this.data.x1 * Math.pow(1.23, this.level) * Math.pow(0.92, Math.max(0, this.level - 80)) * Math.pow(0.94, Math.max(0, this.level - 110));
    }
}

export class SneakingTrinket extends SneakingItem {
    symbolLevel: number = 0;
    // Each symbol slot level adds 50 percentage points to its charm bonus.

    getSymbolMultiplier = (): number => 1 + 50 * this.symbolLevel / 100;
    constructor(public index: number, public data: NinjaTrinketModel, level: number) {
        super(index, data, level);
    }

    override getDisplayText = (): string => {
        if (this.data.bonus.indexOf('{') > -1) {
            return this.data.bonus.replace(/{/, nFormatter(this.getBonus()));
        } else {
            return this.data.bonus.replace(/}/, nFormatter(1 + this.getBonus() / 100));
        }
    }

    getBonus = (): number => {
        const initialBonus = Math.min(this.data.x1 + this.data.x3 * (this.level / (this.level + 50)), this.data.x3);
        const highLevelBonus = Math.min(this.data.x3 * (this.level / (this.level + 900)), this.data.x3);
        return initialBonus + highLevelBonus;
    }
}

export class SneakingPristineCharm extends SneakingItem {
    constructor(public index: number, public data: NinjaPristineCharmModel, level: number = 0) {
        super(index, data, level);
    }

    override getDisplayText = (): string => {
        if (this.data.bonus.indexOf('{') > -1) {
            return this.data.desc.replace("Click it there to see its bonus.", this.data.bonus.replace(/{/, this.data.x1.toString()));
        } else {
            return this.data.desc.replace("Click it there to see its bonus.", this.data.bonus.replace(/}/, (1 + this.data.x1 / 100).toString()));
        }
    }
}

export class SneakingMasteryReward {
    earned: boolean = false;

    constructor(
        public index: number,
        public requiredMastery: number,
        public description: string,
        public bonusDescription: string | undefined
    ) { }

    update(completedMasteries: number): void {
        this.earned = completedMasteries >= this.requiredMastery;
    }

    static fromBase(base: RandoListBase, index: number): SneakingMasteryReward {
        const [description, bonusDescription] = base.data.elements[index].split("{");
        return new SneakingMasteryReward(index, index + 1, description, bonusDescription);
    }
}

export class SneakingGemstone extends SneakingItem {
    quantity: number = 0;
    discovered: boolean = false;
    private moissaniteBonus: number = 0;
    private talentMultiplier: number = 1;
    readonly gemstoneIndex: number;
    readonly description: string;

    constructor(index: number, public data: NinjaTrinketModel) {
        super(index, data);
        this.gemstoneIndex = Number(data.internalId.slice("NjGem".length));
        this.description = sneakingStaticLists.find(base => base.index == 102)!.data.elements[this.gemstoneIndex];
    }

    override getImageData = (): ImageData => ({
        location: this.data.internalId,
        width: 56,
        height: 56
    });

    parse(quantity: number | string | undefined, discoveries: readonly string[]): void {
        this.quantity = Number(quantity ?? 0);
        this.discovered = discoveries.includes(this.data.internalId);
        this.moissaniteBonus = 0;
        this.talentMultiplier = 1;
    }

    update(moissaniteBonus: number, talentEffect: number): void {
        this.moissaniteBonus = moissaniteBonus;
        this.talentMultiplier = Math.max(1, talentEffect);
    }

    private calculateBonus(saturation: number): number {
        const bonus = this.data.x1 + this.data.x3 * saturation;
        if (this.gemstoneIndex == 5) {
            return bonus;
        }
        return bonus * (1 + this.moissaniteBonus / 100) * this.talentMultiplier;
    }

    getBonus = (): number => {
        if (this.quantity <= 0.5) {
            return 0;
        }
        return this.calculateBonus(this.quantity / (1000 + this.quantity));
    }

    // The limit keeps the current Moissanite and talent inputs fixed.
    getBonusLimit = (): number => this.calculateBonus(1);

    private calculateUpgradeDiscountPercent(bonus: number): number {
        return 100 * (1 - 1 / (1 + bonus / 100));
    }

    getUpgradeDiscountPercent = (): number => this.calculateUpgradeDiscountPercent(this.getBonus());

    getUpgradeDiscountLimitPercent = (): number => this.calculateUpgradeDiscountPercent(this.getBonusLimit());

    static fromBase(base: BaseNinjaItemBase): SneakingGemstone {
        return new SneakingGemstone(base.index, base.data as NinjaTrinketModel);
    }
}

export class SneakingFloor {
    damageDone: number = 0;
    maxHP: number = 0;
    remainingHP: number = 0;
    flowerStacks: number = 0;
    detectionThreshold: number = 0;

    constructor(public index: number, public data: NinjaFloorModel) { }

    parse(damageDone: number | string | undefined, flowerStacks: number | string | undefined): void {
        this.damageDone = Number(damageDone ?? 0);
        this.flowerStacks = Number(flowerStacks ?? 0);
        this.maxHP = 0;
        this.remainingHP = 0;
        this.detectionThreshold = 0;
    }

    update(maxHP: number, detectionThreshold: number): void {
        this.maxHP = maxHP;
        this.remainingHP = Math.max(0, maxHP - this.damageDone);
        this.detectionThreshold = detectionThreshold;
    }

    static fromBase(base: NinjaFloorBase): SneakingFloor {
        return new SneakingFloor(base.data.floorIndex, base.data);
    }
}

export class SneakingDailyCharmRolls {
    readonly pristineRollLimit: number = 120;
    readonly symbolRollLimit: number = 75;
    used: number = 0;
    pristineRemaining: number = this.pristineRollLimit;
    symbolRemaining: number = this.symbolRollLimit;
    symbolsUnlocked: boolean = false;

    parse(used: number | string | undefined): void {
        this.used = Number(used ?? 0);
        this.pristineRemaining = this.pristineRollLimit;
        this.symbolRemaining = this.symbolRollLimit;
        this.symbolsUnlocked = false;
    }

    update(symbolKnowledgeBonus: number): void {
        this.pristineRemaining = Math.max(0, this.pristineRollLimit - this.used);
        this.symbolRemaining = Math.max(0, this.symbolRollLimit - this.used);
        this.symbolsUnlocked = symbolKnowledgeBonus > 0;
    }
}

export class PlayerEquipment {
    constructor(public hat: SneakingItem | undefined, public weapon: SneakingWeapon | undefined, public Trinket1: SneakingTrinket | undefined, public Trinket2: SneakingTrinket | undefined) { }
}

interface SneakingStealthInputs {
    farmingMultiplier: number;
    compassBonus: number;
    gambitBonus: number;
    goldBeadsBonus: number;
    alchemyAndStarSignBonus: number;
    statueBonus: number;
    cardBonus: number;
    achievementBonus: number;
    aquamarineBonus: number;
    ballotBonus: number;
    lampBonus: number;
    wellMultiplier: number;
    wayOfStealthBonus: number;
    funeralFlowerBonus: number;
    fractalStealthUnlocked: boolean;
    emperorBonus: number;
    sushiBonus: number;
    jellyBonus: number;
    sneakierStealthBonus: number;
    companionBonus: number;
}

export class SneakingPlayer {
    activity: SneakingActivity = SneakingActivity.Tied;
    equipment: PlayerEquipment = new PlayerEquipment(undefined, undefined, undefined, undefined);
    // The action timer is based on this, action time - time past will tell you how long till next action calculation.
    timePast: number = 0;
    stealth: number = 0;
    detectionChance: number = 0;
    private silkVeilBonus: number = 0;
    private scrollOfPowerBonus: number = 0;
    private rosariesBonus: number = 0;
    smokeBombBonus: number = 0;
    lotusFlowerBonus: number = 0;

    tie: SneakingTie = { damageDone: 0, maxHP: 0 };

    floor: number = 9;
    constructor(public index: number, public level: number, activityInfo: number[], equipment: PlayerEquipment) {
        this.timePast = Number(activityInfo[1]);
        this.floor = activityInfo[0];
        // activityInfo[1] can be one of two things:
        // Positive -> Seconds spent actively doing a task (could be sneaking, untying or breaching)
        // Negative -> Seconds spent being down
        this.equipment = equipment;
        this.tie.damageDone = activityInfo[3];
        if (this.index < TiedPlayersHP.length) {
            this.tie.maxHP = TiedPlayersHP[this.index];
        }
    }

    updateCharmBonuses(goldScrollBonus: number): void {
        this.silkVeilBonus = 0;
        this.scrollOfPowerBonus = 0;
        this.rosariesBonus = 0;
        this.smokeBombBonus = 0;
        this.lotusFlowerBonus = 0;
        for (let slot = 0; slot < 2; slot++) {
            const charm = slot == 0 ? this.equipment.Trinket1 : this.equipment.Trinket2;
            if (!charm) {
                continue;
            }
            const bonus = charm.getBonus() * (1 + goldScrollBonus / 100) * charm.getSymbolMultiplier();
            switch (charm.data.itemId) {
                case 4:
                    this.silkVeilBonus += bonus;
                    break;
                case 7:
                    this.scrollOfPowerBonus += bonus;
                    break;
                case 8:
                    this.smokeBombBonus += bonus;
                    break;
                case 16:
                    this.lotusFlowerBonus += bonus;
                    break;
                case 17:
                    this.rosariesBonus += bonus;
                    break;
            }
        }
    }

    updateDetection(inputs: SneakingStealthInputs, floorMateMultiplier: number, flowerStacks: number, difficulty: number): void {
        // Keep native multiplier order. The two floor-mate bonuses add before these factors.
        const multiplier = floorMateMultiplier
            * inputs.farmingMultiplier
            * (1 + this.scrollOfPowerBonus / 100)
            * (1 + inputs.compassBonus / 100)
            * (1 + inputs.gambitBonus / 100)
            * (1 + this.silkVeilBonus / 100)
            * (1 + this.rosariesBonus / 100)
            * (1 + inputs.goldBeadsBonus / 100)
            * (1 + inputs.alchemyAndStarSignBonus / 100)
            * (1 + inputs.statueBonus / 100)
            * (1 + inputs.cardBonus / 100)
            * (1 + inputs.achievementBonus / 100)
            * (1 + inputs.aquamarineBonus / 100)
            * (1 + inputs.ballotBonus / 100)
            * (1 + inputs.lampBonus / 100)
            * inputs.wellMultiplier;
        this.stealth = (10 + inputs.wayOfStealthBonus * this.level) * multiplier
            * (1 + flowerStacks * inputs.funeralFlowerBonus / 100)
            * (1 + 2 * Number(inputs.fractalStealthUnlocked) * this.level / 100)
            * (1 + inputs.emperorBonus / 100)
            * (1 + inputs.sushiBonus / 100)
            * (1 + inputs.jellyBonus / 100)
            * (1 + inputs.sneakierStealthBonus / 100)
            * (1 + 39 * inputs.companionBonus);
        this.detectionChance = Math.max(0, Math.min(1, 1 - 1.1 * this.stealth / (this.stealth + difficulty)));
    }
}

const jadeUpgradeDisplayOrder = [0, 12, 5, 8, 22, 27, 18, 1, 17, 24, 19, 25, 13, 16, 26, 7, 9, 23, 14, 20, 28, 2, 3, 15, 10, 11, 6, 21, 35, 30, 34, 37, 29, 31, 32, 4, 36, 33, 39, 40, 41, 42, 38, 43, 44, 45, 46, 47, 48, 49];

export class JadeUpgrade {
    purchased: boolean = false;
    display: boolean = true;

    // This comes from servervars -> A_empoExpon
    // Setting default value to what it was first time I looked at it :shrug:.
    costExponent: number = 2.52;

    constructor(public index: number, public data: JadeUpgradeModel, public displayOrder: number = 0) { }

    getImageData = (): ImageData => {
        return {
            location: `NjJupg${this.index}`,
            height: 78,
            width: 128
        }
    }

    unlockCost = (): number => {
        return (
            (300 + 500 * this.displayOrder + Math.pow(this.displayOrder, 3))
            * Math.pow(this.costExponent, this.displayOrder)
            * Math.pow(3.07, Math.max(0, this.displayOrder - 28))
        )
    }
}

export class SneakingUpgrade {
    unlocked: boolean = false;
    level: number = 0;
    bonusPerLvl: number = 0;
    shouldBeDisplayed: boolean = true;
    bubbleDiscount: number = 0;
    itemDiscount: number = 0;

    constructor(public index: number, public data: NinjaUpgradeModel) {
        if (Number.isFinite(data.bonusPerLvl)) {
            // If value is a valid number, use it.
            this.bonusPerLvl = data.bonusPerLvl as number;
        }
        this.shouldBeDisplayed = (data.name != "Name");
    }

    nextLevelCost = (): number => {
        if (this.index == 8) {
            return (1 / (1 + this.itemDiscount / 100)) * (1 / (1 + this.bubbleDiscount / 100)) * this.data.costBase * Math.pow(this.data.costExponent, this.level);
        } else {
            return (1 / (1 + this.itemDiscount / 100)) * this.data.costBase * Math.pow(this.data.costExponent, this.level);
        }
    }

    getBonus = (level: number = this.level): number => {
        return level * this.bonusPerLvl;
    }

    getImageData = (): ImageData => {
        return {
            location: `NjUpgI${this.index}`,
            height: 62,
            width: 62
        }
    }

    getBonusText = (level: number = this.level): string => {
        //This bonus is special so need to do a special treatment
        if (this.index == 14) {
            const bonus = 1 + (this.getBonus(level) / 100);

            return this.data.bonus.replace(/}/, bonus.toString());
        } else {
            return this.data.bonus.replace(/{/, this.getBonus(level).toString());
        }
    }

    static fromBase = (data: NinjaUpgradeBase[]): SneakingUpgrade[] => {
        return data.filter(value => value.data.name != "").map((value) => new SneakingUpgrade(value.index, value.data));
    }
}

export class PristineCharm {
    unlocked: boolean = false;

    constructor(public index: number, public data: NinjaPristineCharmModel, unlocked: boolean = false) {
        this.unlocked = unlocked;
    }

    getImageData = (): ImageData => {
        return {
            location: `NjTrP${this.data.itemId}`,
            height: 56,
            width: 56
        }
    }

    getBonus = (): number => {
        if (this.data.bonus.indexOf('{') > -1) {
            return this.data.x1;
        } else {
            return 1 + this.data.x1 / 100;
        }
    }

    getBonusText = (): string => {
        return this.data.bonus
            // { Means that the bonus is "flat", we don't need to manipulate it
            .replace(/{/, this.getBonus().toString())
            // } Means that to display it we need to calculate the bonus value
            .replace(/}/, (this.getBonus()).toString());
    }
}

export enum BeanstalkingBonusType {
    GoldenPeanut = 0,
    ButterBar = 1,
    GoldenJam = 2,
    GoldenKebabs = 3,
    GoldenMeatPie = 4,
    GoldenNomwitch = 5,
    GoldenHam = 6,
    GoldenBread = 7,
    GoldenRibs = 8,
    GoldenCheese = 9,
    GoldenGrilledCheese = 10,
    GoldenHampter = 11,
    GoldenNigiri = 12,
    GoldenDumpling = 13,
}

export class BeanstalkingBonus {
    constructor(public type: BeanstalkingBonusType, public level: number = 0, public item: Food) { }

    getStackSize = (): number => {
        return this.level == 2 ? 100000 : this.level == 1 ? 10000 : 0;
    }
}

export class Beanstalking {
    bonuses: BeanstalkingBonus[] = [];
    unlocked: boolean = false;
    supersizedUnlocked: boolean = false;

    constructor() { }

    getBonus = (type: BeanstalkingBonusType): number => {
        const bonus = this.bonuses.find(bonus => bonus.type == type);

        if (!bonus || this.unlocked == false) {
            return 0;
        } else {
            return bonus.item.goldFoodBonus(bonus.getStackSize(), 1);
        }
    }

    getBonusText = (type: BeanstalkingBonusType): string => {
        const bonus = this.bonuses.find(bonus => bonus.type == type);

        if (!bonus) {
            return "";
        } else {
            return bonus.item.getBonusText(bonus.getStackSize(), 1);
        }
    }
}

export class Sneaking extends Domain {
    inventory: (SneakingItem | undefined)[] = [];
    players: SneakingPlayer[] = [];
    pristineCharms: PristineCharm[] = [];
    floors: SneakingFloor[] = initNinjaFloorRepo().map(SneakingFloor.fromBase);
    masteryRewards: SneakingMasteryReward[] = [];
    gemstones: SneakingGemstone[] = [];
    dailyCharmRolls: SneakingDailyCharmRolls = new SneakingDailyCharmRolls();
    jade: number = 0;
    completedMasteries: number = 0;
    selectedMastery: number = 0;
    beanstalking: Beanstalking = new Beanstalking();

    minibossKills: number[] = [];

    // Store the item source data so we can make decisions based on it.
    baseItems: BaseNinjaItemBase[] = initNinjaItemRepo();
    sneakingUpgrades: SneakingUpgrade[] = SneakingUpgrade.fromBase(initNinjaUpgradeRepo());
    jadeUpgrades: JadeUpgrade[] = initJadeUpgradeRepo()
        .filter(base => !["idk", "Idk yet"].includes(base.data.bonus) && !["UNDER CONSTRUCTION"].includes(base.data.name))
        .map(
            base => new JadeUpgrade(base.index, base.data, jadeUpgradeDisplayOrder.indexOf(base.index))
        );

    // You have loot: Njloot.png

    updateUnlockedUpgrades = () => {
        this.sneakingUpgrades.forEach(upgrade => {
            upgrade.unlocked = upgrade.data.unlockId == 0 ? true : (this.sneakingUpgrades.find(value => value.index == upgrade.data.unlockId)?.level?.valueOf() || 0) > 0 || false;
        });
    }

    static getJadeImageData = (): ImageData => {
        return {
            location: "W6item0_x1",
            width: 36,
            height: 36
        }
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Ninja", perPlayer: false, default: [] },
            { key: "OptLacc", perPlayer: false, default: [] },
            { key: "Spelunk", perPlayer: false, default: [] },
            { key: "Lv0_", perPlayer: true, default: [] },
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        this.pristineCharms = this.baseItems
            .filter(item => item.data.itemType === NinjaItemTypeEnum.PristineCharm)
            .slice().sort((first, second) => first.data.itemId - second.data.itemId)
            .map(item => new PristineCharm(item.index, item.data as NinjaPristineCharmModel, false));
        const masteryBase = sneakingStaticLists.find(base => base.index == 101)!;
        this.masteryRewards = masteryBase.data.elements.map((_, index) => SneakingMasteryReward.fromBase(masteryBase, index));
        this.gemstones = this.baseItems
            .filter(item => item.data.itemType == NinjaItemTypeEnum.Gemstone)
            .map(SneakingGemstone.fromBase);
        return this;
    }

    parse(data: Map<string, any>): void {
        const sneaking = data.get(this.dataKey) as Sneaking;
        const ninjaData = data.get("Ninja") as any[];
        const serverVars = data.get("servervars");
        const charCount = data.get("charCount") as number;
        const optionList = data.get("OptLacc") as (number | string)[];
        sneaking.completedMasteries = Number(optionList[232] ?? 0);
        sneaking.selectedMastery = Number(optionList[231] ?? 0);
        sneaking.players = [];
        sneaking.inventory = [];
        sneaking.jade = 0;
        sneaking.minibossKills = [];
        sneaking.beanstalking = new Beanstalking();
        sneaking.sneakingUpgrades.forEach(upgrade => {
            upgrade.level = 0;
            upgrade.unlocked = false;
            upgrade.bubbleDiscount = 0;
            upgrade.itemDiscount = 0;
        });
        sneaking.jadeUpgrades.forEach(upgrade => {
            upgrade.purchased = false;
        });
        sneaking.masteryRewards.forEach(reward => {
            reward.earned = false;
        });
        const discoveries = (ninjaData?.[106] ?? []) as string[];
        sneaking.gemstones.forEach(gemstone => gemstone.parse(optionList[233 + gemstone.gemstoneIndex], discoveries));
        const spelunking = data.get("Spelunk") as (number | string)[][];
        sneaking.floors.forEach(floor => floor.parse(ninjaData?.[100]?.[floor.index], spelunking[15]?.[floor.index]));
        sneaking.dailyCharmRolls.parse(optionList[402]);
        sneaking.pristineCharms.forEach(charm => {
            charm.unlocked = false;
        });

        // Old accounts won't have this data, exit early.
        if (!ninjaData || ninjaData.length == 0) {
            return;
        }

        sneaking.jade = ninjaData[102][1];

        ninjaData.slice(0, charCount).forEach((playerInfo: number[], index) => {
            const playerLevel = data.get(`Lv0_${index}`) as number[];
            const sneakingLevel = playerLevel[SkillsIndex.Sneaking];
            // Equipment per player is stored in 4 different indexes, starting from 10.
            // Figure how the starting index of current player.
            const startingIndex = 12 + 4 * index;
            // get 4 indexes from the array starting from starting index.
            const playerEquipment = ninjaData.slice(startingIndex, startingIndex + 4);
            const hat: SneakingHat | undefined = SneakingItem.fromBase(sneaking.baseItems.find(item => item.data.internalId == playerEquipment[0][0]), playerEquipment[0][1]) as SneakingHat | undefined;
            const weapon: SneakingWeapon | undefined = SneakingItem.fromBase(sneaking.baseItems.find(item => item.data.internalId == playerEquipment[1][0]), playerEquipment[1][1]) as SneakingWeapon | undefined;
            const trinket1: SneakingTrinket | undefined = SneakingItem.fromBase(sneaking.baseItems.find(item => item.data.internalId == playerEquipment[2][0]), playerEquipment[2][1]) as SneakingTrinket | undefined;
            const trinket2: SneakingTrinket | undefined = SneakingItem.fromBase(sneaking.baseItems.find(item => item.data.internalId == playerEquipment[3][0]), playerEquipment[3][1]) as SneakingTrinket | undefined;
            if (trinket1) {
                trinket1.symbolLevel = Number(spelunking[14]?.[2 * index] ?? 0);
            }
            if (trinket2) {
                trinket2.symbolLevel = Number(spelunking[14]?.[2 * index + 1] ?? 0);
            }

            sneaking.players.push(new SneakingPlayer(index, sneakingLevel, playerInfo, new PlayerEquipment(hat, weapon, trinket1, trinket2)));
        })

        sneaking.inventory = [];
        ninjaData.slice(60, 100).forEach((equipment: [name: string, level: number], index: number) => {
            const item = SneakingItem.fromBase(sneaking.baseItems.find(base => base.data.internalId == equipment[0]), equipment[1]);
            if (item instanceof SneakingTrinket) {
                item.symbolLevel = Number(spelunking[14]?.[24 + index] ?? 0);
            }
            sneaking.inventory.push(item);
        });

        const sneakingUpgradesLevels: number[] = ninjaData[103];
        sneaking.sneakingUpgrades.forEach(upgrade => {
            if (upgrade.index < sneakingUpgradesLevels.length) {
                upgrade.level = sneakingUpgradesLevels[upgrade.index];
            }
        });
        sneaking.updateUnlockedUpgrades();

        const pristineCharmUnlocking: number[] = ninjaData[107];
        sneaking.pristineCharms.forEach(charm => {
            charm.unlocked = pristineCharmUnlocking[charm.data.itemId] == 1;
        });

        // Yes, Lava stores the enabled upgrades as letters in a single string, need to take that and convert to indexes.
        const lettersOfEnabledUpgrades = ninjaData[102][9] ?? "";
        const purchasedUpgrades: number[] = [];
        for (const upgradeLetter of lettersOfEnabledUpgrades) {
            purchasedUpgrades.push(letterToNumber(upgradeLetter));
        }
        sneaking.jadeUpgrades.forEach(upgrade => {
            upgrade.purchased = purchasedUpgrades.includes(upgrade.index);
            upgrade.costExponent = serverVars["A_empoExpon"];
        })


        sneaking.minibossKills = [];
        sneaking.minibossKills = ninjaData[105] as number[];

        sneaking.beanstalking = new Beanstalking();
        const beanStalkingData = ninjaData[104] as number[];
        const goldenFoods = initAllItems().filter(item => item.type == "Golden Food") as Food[];
        Object.values(BeanstalkingBonusType).forEach((_, index) => {
            if (index < beanStalkingData.length) {
                let item: Food | undefined = undefined;
                switch (index) {
                    case BeanstalkingBonusType.GoldenPeanut:
                        item = goldenFoods.find(food => food.internalName == "PeanutG");
                        break;
                    case BeanstalkingBonusType.ButterBar:
                        item = goldenFoods.find(food => food.internalName == "ButterBar");
                        break;
                    default:
                        item = goldenFoods.find(food => food.internalName == `FoodG${index - 1}`);
                        break;
                }
                if (item) {
                    const level = beanStalkingData[index];

                    sneaking.beanstalking.bonuses.push(new BeanstalkingBonus(index, level, item));
                }
            }
        });
        sneaking.beanstalking.unlocked = sneaking.jadeUpgrades.find(upgrade => upgrade.index == 1)?.purchased ?? false;
        sneaking.beanstalking.supersizedUnlocked = sneaking.jadeUpgrades.find(upgrade => upgrade.index == 2)?.purchased ?? false;

    }

    getMasteryAllStatBonus(): number {
        // Completed mastery milestones grant all-stat percentage points.
        return 10 * Math.floor((98 + this.completedMasteries) / 100);
    }

    getMasteryTalentLevels(): number {
        // All-talent levels start one completed mastery after the all-stat milestone.
        return 5 * Math.floor((97 + this.completedMasteries) / 100);
    }

    updateProgression(): void {
        this.masteryRewards.forEach(reward => reward.update(this.completedMasteries));
        this.dailyCharmRolls.update(this.sneakingUpgrades.find(upgrade => upgrade.index == 17)!.getBonus());

        this.floors.forEach(floor => {
            floor.maxHP = floor.data.baseDoorHp;
            floor.detectionThreshold = floor.data.baseDetectionThreshold;
        });
        if (this.selectedMastery > 0) {
            // Native scaling changes floor 10 before the final door reads its factor.
            for (const floor of this.floors) {
                floor.maxHP = 0.01 * floor.maxHP * Math.pow(this.floors[10].maxHP, this.selectedMastery);
            }
            this.floors[0].maxHP = 1;
            for (const floor of this.floors) {
                floor.detectionThreshold = 0.1 * floor.detectionThreshold * Math.pow(this.floors[11].detectionThreshold, this.selectedMastery);
            }
            this.floors[0].detectionThreshold = 0.01;
        }
        for (const floor of this.floors) {
            floor.update(this.selectedMastery < this.completedMasteries ? 0 : floor.maxHP, floor.detectionThreshold);
        }
        this.updatePlayersActivity();
    }

    updateGemstones(talentEffect: number): void {
        const moissanite = this.gemstones.find(gemstone => gemstone.gemstoneIndex == 5)!;
        moissanite.update(0, 1);
        const moissaniteBonus = moissanite.getBonus();
        for (const gemstone of this.gemstones) {
            if (gemstone != moissanite) {
                gemstone.update(moissaniteBonus, talentEffect);
            }
        }
    }

    preparePermanentCharmBonuses(legendCharmBonus: number): { goldBeadsBonus: number; goldScrollBonus: number } {
        let goldBeadsBonus = 0;
        let goldScrollBonus = 0;
        const stariteMultiplier = 1 + this.gemstones.find(gemstone => gemstone.gemstoneIndex == 3)!.getBonus() / 100;
        for (const item of this.inventory) {
            if (!(item instanceof SneakingTrinket)) {
                continue;
            }
            const rawBonus = item.getBonus();
            const currentBonus = item.data.itemId == 12 ? goldScrollBonus : goldBeadsBonus;
            if ((item.data.itemId != 12 && item.data.itemId != 20) || rawBonus <= currentBonus) {
                continue;
            }
            // Native compares raw strength with the previously stored boosted bonus.
            const bonus = rawBonus * stariteMultiplier * (1 + legendCharmBonus / 100) * item.getSymbolMultiplier();
            if (item.data.itemId == 12) {
                goldScrollBonus = bonus;
            } else {
                goldBeadsBonus = bonus;
            }
        }
        return { goldBeadsBonus, goldScrollBonus };
    }

    updateNinjas(inputs: SneakingStealthInputs, goldScrollBonus: number): void {
        for (const player of this.players) {
            player.updateCharmBonuses(goldScrollBonus);
        }
        for (const player of this.players) {
            let floorMateMultiplier = 1;
            for (const other of this.players) {
                if (other != player && other.floor == player.floor) {
                    floorMateMultiplier += other.smokeBombBonus / 100;
                    floorMateMultiplier += other.lotusFlowerBonus / 100;
                }
            }
            const floor = this.floors[player.floor];
            player.updateDetection(inputs, floorMateMultiplier, floor.flowerStacks, floor.detectionThreshold);
        }
    }

    getUnlockedFloors = (): number => {
        let floorUnlocked: number = 0;
        let i: number = 0;
        for (i = 0; i < this.floors.length; i++) {
            if (this.floors[i].remainingHP <= 0) {
                floorUnlocked = Math.min(this.floors.length, i + 2);
            }
        }

        return floorUnlocked;
    }

    updatePlayersActivity = () => {
        this.players.forEach((player, _) => {
            const currentFloorDoor = this.floors[player.floor];

            if (player.tie.damageDone < player.tie.maxHP || player.timePast == 0) {
                player.activity = SneakingActivity.Tied
            } else if (player.timePast < 0) {
                player.activity = SneakingActivity.KnockedOut;
            } else if (player.timePast > 0) {
                switch (true) {
                    case currentFloorDoor.remainingHP > 0 && (player.equipment.weapon?.data.itemId ?? -1) == SneakinWeaponType.Nunchaku:
                        player.activity = SneakingActivity.Breaching;
                        break;
                    case this.players.filter(filterPlayer => filterPlayer.floor == player.floor && (filterPlayer.tie.maxHP - filterPlayer.tie.damageDone) > 0).length > 0 && (player.equipment.weapon?.data.itemId ?? -1) == SneakinWeaponType.Kunai:
                        player.activity = SneakingActivity.Untying
                        break;
                    default:
                        player.activity = SneakingActivity.Sneaking;
                        break;
                }
            }
        })
    }
}

export const updateSneakingProgression = (data: Map<string, unknown>) => {
    const sneaking = data.get("sneaking") as Sneaking;
    sneaking.updateProgression();
}

export const updateSneaking = (data: Map<string, any>) => {
    const alchemy = data.get("alchemy") as Alchemy;
    const sneaking = data.get("sneaking") as Sneaking;
    const rift = data.get("rift") as Rift;

    // The highest mastery display uses completed runs, not the selected difficulty.
    rift.updateHighestSneakMastery(sneaking.completedMasteries);

    const currencyConduitUpgrade = sneaking.sneakingUpgrades.find(upgrade => upgrade.index == 8);
    if (currencyConduitUpgrade) {
        currencyConduitUpgrade.bubbleDiscount = alchemy.getBonusForBubble(CauldronIndex.Kazam, AlchemyConst.LoCostMoJade);
    }
}

export const updateSneakingGemstones = (data: Map<string, unknown>): void => {
    const sneaking = data.get("sneaking") as Sneaking;
    const players = data.get("players") as Player[];
    let talentEffect = 1;
    for (const player of players) {
        talentEffect = Math.max(talentEffect, Talent.getAccountTalentBonus(players, 432, player.finalTalentInputs));
    }
    sneaking.updateGemstones(talentEffect);
}

export const updateSneakingNinjas = (data: Map<string, unknown>): void => {
    const sneaking = data.get("sneaking") as Sneaking;
    const players = data.get("players") as Player[];
    const account = data.get("account") as Account;
    const alchemy = data.get("alchemy") as Alchemy;
    const cards = data.get("cards") as Card[];
    const achievements = data.get("achievements") as Achievement[];
    const companions = data.get("companions") as Companion[];
    const compass = data.get("compass") as Compass;
    const emperor = data.get("emperor") as Emperor;
    const farming = data.get("farming") as Farming;
    const hole = data.get("hole") as Hole;
    const jellyOperator = data.get("jellyOperator") as JellyOperator;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const menagerie = data.get("menagerie") as Menagerie;
    const starSigns = data.get("starsigns") as StarSigns;
    const statues = data.get("statues") as PlayerStatues[];
    const sushi = data.get("sushi") as SushiStation;
    const votes = data.get("votes") as Votes;

    let statueBonus = 0;
    const infiniteStarBonus = players.length > 0
        ? starSigns.infinityStarSigns.reduce((sum, sign) => sum + sign.getBonus("Ninja Twin Stealth"), 0)
        : 0;
    let starSignBonus = infiniteStarBonus;
    for (const player of players) {
        const playerStatues = statues.find(record => record.playerID == player.playerID)!;
        statueBonus = Math.max(statueBonus, playerStatues.statues.find(statue => statue.index == 26)!.getBonus());
        if (infiniteStarBonus == 0) {
            // Without an Infinite Star, project only the strongest actual aligned sign.
            const equippedStarBonus = player.starSigns.reduce((sum, sign) => sum + sign.getBonus("Ninja Twin Stealth"), 0);
            starSignBonus = Math.max(starSignBonus, equippedStarBonus);
        }
    }

    const landRankBonus = farming.landrankDatabase.getUpgradeBonusByIndex(4);
    const wayOfStealth = sneaking.sneakingUpgrades.find(upgrade => upgrade.index == 13)!;
    const { goldBeadsBonus, goldScrollBonus } = sneaking.preparePermanentCharmBonuses(legendTalents.getBonusFromIndex(6));
    // Shared sign and statue inputs project actual account snapshots, not an inferred active character.
    const inputs: SneakingStealthInputs = {
        farmingMultiplier: 1 + landRankBonus * farming.farmingLevel / 100,
        compassBonus: compass.getUpgradeBonus(45),
        gambitBonus: hole.gambit.getBonus(11),
        goldBeadsBonus,
        alchemyAndStarSignBonus: alchemy.getBubbleBonusForKey("A10AllCharz") + starSignBonus,
        statueBonus,
        cardBonus: 4 * cards.find(card => card.id == "Crystal5")!.getLevels(),
        achievementBonus: 5 * Number(achievements.find(achievement => achievement.index == 368)!.completed),
        aquamarineBonus: sneaking.gemstones.find(gemstone => gemstone.gemstoneIndex == 0)!.getBonus(),
        ballotBonus: votes.getCurrentBonus(25),
        lampBonus: hole.lamp.getBonus(false, 2, 1),
        wellMultiplier: Math.max(1, hole.getSchematicBonus(54)),
        wayOfStealthBonus: wayOfStealth.getBonus(wayOfStealth.level + menagerie.getSneakingUpgradeBonusLevels(13)),
        funeralFlowerBonus: sneaking.sneakingUpgrades.find(upgrade => upgrade.index == 21)!.getBonus(),
        fractalStealthUnlocked: account.isFractalStealthUnlocked(),
        emperorBonus: emperor.getEffectiveBonus(0),
        sushiBonus: sushi.getBonusFromIndex(32),
        jellyBonus: jellyOperator.getObstructionBonus(16),
        sneakierStealthBonus: sneaking.sneakingUpgrades.find(upgrade => upgrade.index == 23)!.getBonus(),
        companionBonus: getCompanionActiveBonus(companions, 163),
    };
    sneaking.updateNinjas(inputs, goldScrollBonus);
}
