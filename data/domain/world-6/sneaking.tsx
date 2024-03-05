import { letterToNumber, nFormatter } from "../../utility";
import { SkillsIndex } from "../SkillsIndex";
import { Alchemy, AlchemyConst, CauldronIndex } from "../alchemy";
import { Domain, RawData } from "../base/domain";
import { initJadeUpgradeRepo } from "../data/JadeUpgradeRepo";
import { BaseNinjaItemBase, initNinjaItemRepo } from "../data/NinjaItemRepo";
import { NinjaUpgradeBase, initNinjaUpgradeRepo } from "../data/NinjaUpgradeRepo";
import { NinjaItemTypeEnum } from "../enum/ninjaItemTypeEnum";
import { ImageData } from "../imageData";
import { Item } from "../items";
import { JadeUpgradeModel } from "../model/jadeUpgradeModel";
import { NinjaPristineCharmModel } from '../model/ninjaPristineCharmModel';
import { NinjaUpgradeModel } from "../model/ninjaUpgradeModel";
import { NinjaItemModel } from '../model/ninjaItemModel';
import { NinjaWeaponModel } from '../model/ninjaWeaponModel';
import { NinjaTrinketModel } from '../model/ninjaTrinketModel';
import { BaseNinjaItemModel } from "../model/baseNinjaItemModel";

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

export const DoorsMaxHP = [
    1,
    150,
    1000,
    8000,
    45000,
    350000,
    5000000,
    80000000,
    1000000000,
    25000000000.0,
    800000000000.0,
    45000000000000.0
]

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

export interface SneakingDoor {
    damageDone: number,
    maxHP: number
}

export interface SneakingTie {
    damageDone: number,
    maxHP: number
}

export class SneakingItem {
    constructor(public index: number, public data: BaseNinjaItemModel) {}

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
                    return new SneakingHat(baseItem.index, baseItem.data as NinjaItemModel);
                case NinjaItemTypeEnum.Weapon:
                    return new SneakingWeapon(baseItem.index, baseItem.data as NinjaWeaponModel, level);
                case NinjaItemTypeEnum.Trinket:
                    return new SneakingTrinket(baseItem.index, baseItem.data as NinjaTrinketModel, level);
                case NinjaItemTypeEnum.PristineCharm:
                    return new SneakingPristineCharm(baseItem.index, baseItem.data as NinjaPristineCharmModel);
                default:
                    return undefined;
            }
        } else {
            return undefined;
        }
    }
}

export class SneakingHat extends SneakingItem {
    constructor(public index: number, public data: NinjaItemModel) {
        super(index, data);
    }

    override getDisplayText = (): string => {
        return this.data.desc;
    }
}

export class SneakingWeapon extends SneakingItem {
    constructor(public index: number, public data: NinjaWeaponModel, public level: number) {
        super(index, data);
    }

    override getDisplayText = (): string => {
        return `Base Damage: ${this.getBaseDamage.toString()}`;
    }

    getBaseDamage = (): number => {
        return this.data.x1 * Math.pow(1.23, this.level) * Math.pow(0.92, Math.max(0, this.level - 80)) * Math.pow(0.94, Math.max(0, this.level - 110));
    }
}

export class SneakingTrinket extends SneakingItem {
    constructor(public index: number, public data: NinjaTrinketModel, public level: number) {
        super(index, data);
    }

    override getDisplayText = (): string => {
        if (this.data.bonus.indexOf('{') != undefined) {
            return this.data.bonus.replace(/{/, nFormatter(this.getBonus()));
        } else {
            return this.data.bonus.replace(/}/, nFormatter(1 + this.getBonus() / 100));
        }
    }

    getBonus = (): number => {
        return Math.min(this.data.x1 + this.data.x3 * (this.level / (this.level + 50)), this.data.x3)
    }
}

export class SneakingPristineCharm extends SneakingItem {
    constructor(public index: number, public data: NinjaPristineCharmModel) {
        super(index, data);
    }

    override getDisplayText = (): string => {
        if (this.data.bonus.indexOf('{') != undefined) {
            return this.data.desc.replace("Click it there to see its bonus.", this.data.bonus.replace(/{/, this.data.x1.toString()));
        } else {
            return this.data.desc.replace("Click it there to see its bonus.", this.data.bonus.replace(/}/, (1 + this.data.x1 / 100).toString()));
        }
    }
}

export class PlayerEquipment {
    constructor(public hat: SneakingItem | undefined, public weapon: SneakingWeapon | undefined, public Trinket1: SneakingTrinket | undefined, public Trinket2: SneakingTrinket | undefined) {}
}

export class SneakingPlayer {
    activity: SneakingActivity = SneakingActivity.Tied;
    equipment: PlayerEquipment = new PlayerEquipment(undefined, undefined, undefined, undefined);
    // The action timer is based on this, action time - time past will tell you how long till next action calculation.
    timePast: number = 0;

    tie: SneakingTie = {damageDone: 0, maxHP: 0};

    floor: number = 9;
    // Temp holding of raw info so it's easier to map.
    rawData: number[];
    constructor(public index: number, public level: number, activityInfo: number[], equipment: PlayerEquipment) {
        this.rawData = activityInfo;
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
}

const jadeUpgradeDisplayOrder = [0, 12, 5, 8, 22, 27, 18, 1, 17, 24, 19, 25, 13, 16, 26, 7, 9, 23, 14, 20, 28, 2, 3, 15, 10, 11, 6, 21, 35, 30, 34, 37, 29, 31, 32, 4, 36, 33, 39, 40, 41, 42, 38, 43, 44, 45, 46, 47, 48, 49];

export class JadeUpgrade {
    purchased: boolean = false;
    display: boolean = true;

    // This comes from servervars -> A_empoExpon
    // Setting default value to what it was first time I looked at it :shrug:.
    costExponent: number = 2.52;

    constructor(public index: number, public data: JadeUpgradeModel, public displayOrder: number = 0) {}

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
            * Math.pow(this.costExponent, this .displayOrder)
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
        if(Number.isFinite(data.bonusPerLvl)) {
            // If value is a valid number, use it.
            this.bonusPerLvl = data.bonusPerLvl as number;
        } 
        this.shouldBeDisplayed = (data.name != "Name");
    }

    nextLevelCost = (): number => {
        if (this.index == 8) {
            return (1 / (1 + this.itemDiscount / 100)) *  (1 / (1 + this.bubbleDiscount / 100)) * this.data.costBase * Math.pow(this.data.costExponent, this.level);
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
            const bonus = 1 + (this.getBonus(level)/100);

            return this.data.bonus.replace(/}/, bonus.toString());
        } else {
            return this.data.bonus.replace(/{/, this.getBonus(level).toString());
        }
    }

    static fromBase = (data: NinjaUpgradeBase[]): SneakingUpgrade[] => {
       return data.map((value) => new SneakingUpgrade(value.index, value.data));
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

    getBonusText = (): string => {
        return this.data.bonus
            // { Means that the bonus is "flat", we don't need to manipulate it
            .replace(/{/, this.data.x1.toString())
            // } Means that to display it we need to calculate the bonus value
            .replace(/}/, (1 + this.data.x1 / 100).toString());
    }
}

export class Sneaking extends Domain {
    inventory: (SneakingItem | undefined)[] = [];
    players: SneakingPlayer[] = [];
    pristineCharms: PristineCharm[] = [];
    doors: SneakingDoor[] = [];
    jade: number = 0;

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
            { key: "Ninja", perPlayer: false, default: []},
            {key: "Lv0_", perPlayer: true, default: []},
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const sneaking = data.get(this.dataKey) as Sneaking;
        const ninjaData = data.get("Ninja") as any[];
        const serverVars = data.get("servervars");
        const charCount = data.get("charCount") as number;

        // Old accounts won't have this data, exit early.
        if (!ninjaData) {
            return;
        }

        // reset old data
        sneaking.players = [];

        sneaking.jade = ninjaData[102][1];

        ninjaData.slice(0, charCount).forEach((playerInfo: number[], index) => {
            const playerLevel = data.get(`Lv0_${index}`) as number[];
            const sneakingLevel = playerLevel[SkillsIndex.Sneaking];
            // Equipment per player is stored in 4 different indexes, starting from 10.
            // Figure how the starting index of current player.
            const startingIndex = 12 + 4 * index;
            // get 4 indexes from the array starting from starting index.
            const playerEquipment = ninjaData.slice(startingIndex, startingIndex + 4);
            let hat: SneakingHat | undefined = SneakingItem.fromBase(sneaking.baseItems.find(item => item.data.internalId == playerEquipment[0][0]), playerEquipment[0][1]) as SneakingHat | undefined;
            let weapon: SneakingWeapon | undefined = SneakingItem.fromBase(sneaking.baseItems.find(item => item.data.internalId == playerEquipment[1][0]), playerEquipment[1][1]) as SneakingWeapon | undefined;
            let trinket1: SneakingTrinket | undefined = SneakingItem.fromBase(sneaking.baseItems.find(item => item.data.internalId == playerEquipment[2][0]), playerEquipment[2][1]) as SneakingTrinket | undefined;
            let trinket2: SneakingTrinket | undefined = SneakingItem.fromBase(sneaking.baseItems.find(item => item.data.internalId == playerEquipment[3][0]), playerEquipment[3][1]) as SneakingTrinket | undefined;

            sneaking.players.push(new SneakingPlayer(index, sneakingLevel, playerInfo, new PlayerEquipment(hat, weapon, trinket1, trinket2)));
        }) 

        ninjaData.slice(60,99).forEach((equipment: [name: string, level: number]) => {
            if (equipment[0] != "Blank") {
                sneaking.inventory.push(SneakingItem.fromBase(sneaking.baseItems.find(item => item.data.internalId == equipment[0]), equipment[1]));
            } else {
                sneaking.inventory.push(undefined);
            }
        });

        const sneakingUpgradesLevels: number[] = ninjaData[103];
        sneaking.sneakingUpgrades.forEach(upgrade => {
            if(upgrade.index < sneakingUpgradesLevels.length) {
                upgrade.level = sneakingUpgradesLevels[upgrade.index];
            }
        });
        sneaking.updateUnlockedUpgrades();

        const pristineCharmUnlocking: number[] = ninjaData[107];
        sneaking.pristineCharms = [];
        sneaking.baseItems
            .filter(item => item.data.itemType == NinjaItemTypeEnum.PristineCharm)
            .slice().sort((item1, item2) => item1.data.itemId - item2.data.itemId).forEach((item, index) => {
            let unlocked: boolean = false;
            if (item.data.itemId < pristineCharmUnlocking.length) {
                unlocked = (pristineCharmUnlocking[item.data.itemId] == 1);
            }
            sneaking.pristineCharms.push(new PristineCharm(item.index, item.data as NinjaPristineCharmModel, unlocked));
        })

        // Yes, Lava stores the enabled upgrades as letters in a single string, need to take that and convert to indexes.
        const lettersOfEnabledUpgrades = ninjaData[102][9]
        const purchasedUpgrades: number[] = [];
        for (const upgradeLetter of lettersOfEnabledUpgrades) {
            purchasedUpgrades.push(letterToNumber(upgradeLetter));
        }
        sneaking.jadeUpgrades.forEach(upgrade => {
            upgrade.purchased = purchasedUpgrades.includes(upgrade.index);
            upgrade.costExponent = serverVars["A_empoExpon"];
        })

        sneaking.doors = [];
        const doorsDamage = ninjaData[100] as number[];
        doorsDamage.forEach((damageDone, index) => {
            sneaking.doors.push({damageDone: damageDone, maxHP: ((index < DoorsMaxHP.length) ? DoorsMaxHP[index] : 1E9999999999)});
        });
    }

    updatePlayersActivity = () => {
        this.players.forEach((player, index) => {
            const currentFloorDoor = (player.floor < this.doors.length) ? this.doors[player.floor] : undefined;
    
            if (player.tie.damageDone < player.tie.maxHP || player.rawData[1] == 0) {
                player.activity = SneakingActivity.Tied
            } else if (player.rawData[1] < 0) {
                player.activity = SneakingActivity.KnockedOut;
            } else if (player.rawData[1] > 0) {
                switch (true) {
                    case ((currentFloorDoor?.maxHP ?? 0) - (currentFloorDoor?.damageDone ?? 0)) > 0 && (player.equipment.weapon?.data.itemId ?? -1) == SneakinWeaponType.Nunchaku:
                        player.activity = SneakingActivity.Breaching;
                        break;
                    case this.players.filter(filterPlayer => filterPlayer.floor == player.floor && (filterPlayer.tie.maxHP - filterPlayer.tie.damageDone)).length > 0 && (player.equipment.weapon?.data.itemId ?? -1) == SneakinWeaponType.Kunai:
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

export const updateSneaking = (data: Map<string, any>) => {
    const alchemy = data.get("alchemy") as Alchemy;
    const sneaking = data.get("sneaking") as Sneaking;

    const currencyConduitUpgrade = sneaking.sneakingUpgrades.find(upgrade => upgrade.index == 8);
    if (currencyConduitUpgrade) {
        currencyConduitUpgrade.bubbleDiscount = alchemy.getBonusForBubble(CauldronIndex.Kazam, AlchemyConst.LoCostMoJade);
    }

    sneaking.updatePlayersActivity();
}