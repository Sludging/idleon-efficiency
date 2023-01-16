import { lavaLog, round } from "../utility";
import { initItemRepo, ItemBase } from "./data/ItemRepo";
import { TypeGenEnum } from "./enum/typeGenEnum";
import { ArmourItemModel } from "./model/armourItemModel";
import { BaseItemModel } from "./model/baseItemModel";
import { ItemModel } from "./model/itemModel";
import { StatItemModel } from "./model/statItemModel";
import { WeaponItemModel } from "./model/weaponItemModel";
import { SourcesModel } from "./model/sourcesModel";
import { DescItemModel } from "./model/descItemModel";
import { GoldenFoodItemModel } from "./model/goldenFoodItemModel";

export const filteredMissingItems = [
    'CardsC13',
    'CardsC14',
    'CardsC15',
    'CardsD12',
    'CardsD13',
    'CardsF1',
    'CatchingNet1',
    'CraftMat16',
    'CraftMat17',
    'EquipmentShirts8',
    'EquipmentShirts9',
    'EquipmentSmithingTabs5',
    'EquipmentSmithingTabs6',
    'EquipmentSmithingTabs7',
    'EquipmentSmithingTabs8',
    'FillerMaterial',
    'FishingRod1',
    'GemP11',
    'GemP12',
    'GemP13',
    'GemP14',
    'GemP15',
    'NPCtoken8',
    'Quest8',
    'StampA1',
    'StampA2',
    'StampA33',
    'StampA34',
    'StampA35',
    'StampB1',
    'StampB2',
    'StampB28',
    'StampB29',
    'StampB32',
    'StampB33',
    'StampB35',
    'StampC10',
    'StampC11',
    'StampC12',
    'StampC13',
    'StampC16',
    'StampC17',
    'TestObj10',
    'TestObj14',
    'TestObj15',
    'TestObj16',
    'TestObj2',
    'TestObj4',
    'TestObj5',
    'TestObj8',
    'TestObj9',
    'TrapBoxSet6',
    'Trophy4',
    'WorshipSkull6',
    'DungWeaponBow1',
    'DungWeaponSword1',
    'DungWeaponWand1',
    'EquipmentPendant1',
    'EquipmentPendant2',
    'EquipmentPendant3',
    'EquipmentPendant4',
    'EquipmentPendant5',
    'EquipmentPendant6',
    'EquipmentPendant7',
    'EquipmentPendant8',
    'EquipmentPendant13',
    'ObolBronzeCard',
    'ObolBronzeCatching',
    'ObolBronzeChoppin',
    'ObolBronzeDamage',
    'ObolBronzeFishing',
    'ObolBronzeMining',
    'ObolFrag',
    'ObolPinkChoppin',
    'ObolPinkCons',
    'ObolPinkTrapping',
    'ObolPinkWorship',
    'ObolPlatinumCons',
    'ObolPlatinumSpeed',
    'ObolPlatinumTrapping',
    'ObolPlatinumWorship',
    'ObolSilverKill',
    'ObolSilverPop',
    'DeliveryBox',
    'EquipmentHats10',
    'EquipmentPants9',
    'EquipmentPants8',
    'EquipmentPants7',
    'EquipmentPants14',
    'EquipmentPants13',
    'EquipmentPants12',
    'EquipmentPants11',
    'EquipmentHats23',
    'EquipmentHats24',
    'EquipmentHats27',
    'EquipmentRings1',
    'EquipmentRings10',
    'EquipmentRings4',
    'EquipmentRings5',
    'EquipmentRings8',
    'EquipmentRings9',
    'EquipmentRingsFishing1',
    'EquipmentRingsFishing2',
    'EquipmentRingsFishing3',
    'EquipmentShirts6',
    'EquipmentShirts7',
    'EquipmentShoes10',
    'EquipmentShoes11',
    'EquipmentShoes13',
    'EquipmentShoes14',
    'EquipmentShoes2',
    'EquipmentShoes6',
    'EquipmentShoes8',
    'EquipmentToolsHatchet10',
    'EquipmentWands4',
    'Godshard',
    'GodshardBar',
    'IceMountains2',
    'OilBarrel3',
    'Quest2',

    'FoodHealth8',
    'MaxCapBagFi0',
    'MaxCapBagB0',
    'MaxCapBagTr0',
    'MaxCapBagTr2',
    'MaxCapBagS0',
    'MaxCapBagS2',
    'DoubleAFKtix',
    'Spice0',
    'Spice6',
    'Spice9',
    'SailTr10',
    'SailTr12',
    'SailTr14',
    'SailTr21',
    'SailTr25',
    'SailTr29',
    'Bits',
    'EquipmentHatsBeg1'
]

export const filteredLootyItems = [
    "InvStorage31",
    "InvStorage32",
    "InvStorage33",
    "InvStorage34",
    "InvStorage35",
    "InvStorage36",
    "InvStorage37",
    "InvStorage38",
    "InvStorage39",
    "InvStorage40",
    "InvStorage41",
    "InvStorage42",
    "InvBag21",
    "InvBag22",
    "InvBag23",
    "InvBag24",
    "InvBag25",
    "InvBag26",
    "EquipmentHats31",
    "EquipmentHats32",
    "EquipmentHats33",
    "EquipmentHats34",
    "EquipmentHats35",
    "EquipmentHats36",
    "EquipmentHats37",
    "EquipmentHats38",
    "EquipmentHats40",
    "EquipmentHats43",
    "EquipmentHats46",
    "EquipmentHats47",
    "EquipmentHats48",
    "EquipmentHats49",
    "EquipmentHats50",
    "EquipmentHats45",
    "EquipmentHats57",
    "EquipmentHats62",
    "Quest28",
    "EquipmentRingsChat1",
    "EquipmentRingsChat2",
    "EquipmentRingsChat3",
    "EquipmentRingsChat4",
    "EquipmentRingsChat5",
    "EquipmentRingsChat6",
    "EquipmentRingsChat8",
    "EquipmentRingsChat9",

    // Personal list! need to keep around manually!
    'EquipmentSmithingTabs5',
    'EquipmentSmithingTabs6',
    'EquipmentSmithingTabs7',
    'EquipmentSmithingTabs8',
    'StampA33',
    'StampA34',
    'StampA35',
    'DungRNG0',
    'DungRNG1',
    'DungRNG2',
    'DungRNG3',
    'DungRNG4'
];


export interface DropSource {
    source: string
    quantity: number
    chance: number
}

export interface DropInfo {
    sources: DropSource[]
}

export interface ItemSource {
    wikiName: string
    txtName: string
}

export interface ItemSources {
    sources: ItemSource[]
    recipeFrom: ItemSource[]
    questAss: ItemSource[]
}

export interface StoneProps {
    Defence?: number,
    STR?: number,
    WIS?: number,
    Weapon_Power?: number,
    LUK?: number,
    Reach?: number,
    AGI?: number,
    Upgrade_Slots_Left?: number,
    Power?: number,
    Speed?: number,
    UQ1txt?: string,
    UQ1val?: number,
    UQ2txt?: string,
    UQ2val?: number
}

export class ItemStat {
    value: number = 0;
    stone: number = 0;
    extra: string = '';
    constructor(public displayName: string, public stoneName: string, value?: number, extra?: string, stone?: number) {
        if (value) {
            this.value = value;
        }
        if (stone) {
            this.stone = stone;
        }
        if (extra) {
            this.extra = extra;
        }
    }

    getValue = () => {
        return this.value + this.stone;
    }

    shouldDisplay = (): boolean => {
        return (this.value != 0 || this.stone != 0) && this.getValue() > 0;
    }

    getDisplay = () => {
        // This is probably, misc? 
        if (this.extra != '') {
            return `${this.displayName}: ${this.getValue()}${this.extra.replace(/_/g, ' ')}${this.stone != 0 ? ` (${this.stone})` : ''}`
        }
        return `${this.displayName}: ${this.getValue()}${this.stone != 0 ? ` (${this.stone})` : ''}`
    }

    duplicate = () => {
        return new ItemStat(this.displayName, this.stoneName, this.value, this.extra, this.stone);
    }
}

const getMiscStatRegex = () => { return /(\d+)(.*)/g };
const getRegex = () => { return /Cards(\w)(\d+)/g };
const getEnhancerRegex = () => { return /DungEnhancer(\d+)/g };
const liquidRegex = () => { return /Liquid(\d+)/g };

// Should move this to a common library for typeguards.
const isStatModel = (x: BaseItemModel): x is StatItemModel => "Upgrade_Slots_Left" in x
const isArmorModel = (x: BaseItemModel): x is ArmourItemModel => "Skill_Power" in x
const isWeaponModel = (x: BaseItemModel): x is WeaponItemModel => "Reach" in x
const isDescModel = (x: BaseItemModel): x is DescItemModel => "description" in x
const isGoldenFood = (x: BaseItemModel): x is GoldenFoodItemModel => "goldenFoodData" in x

export class Item {
    internalName: string;
    displayName: string;
    sellPrice: number;
    typeGen: TypeGenEnum;
    type: string;
    lvReqToCraft: number;
    lvReqToEquip: number = 0;
    allowedClass: string = ''; // ENUM?
    weaponPower: number = 0;
    str: number = 0;
    agi: number = 0;
    wis: number = 0;
    luk: number = 0;
    defence: number = 0;
    miscUp1: string = '';
    miscUp2: string = '';
    upgradeSlots: number = 0;
    skill: string = '';
    skillPower: number = 0;
    speed: number = 0;
    reach: number = 0;
    dropInfo: DropSource[];
    sources: SourcesModel;
    description: string = '';

    itemStats: ItemStat[] = [];
    count: number = 0;

    constructor(public data: ItemModel) {
        this.internalName = data.item.internalName;
        this.displayName = data.item.displayName;
        this.sellPrice = data.item.sellPrice;
        this.typeGen = data.item.typeGen;
        this.type = data.item.Type ?? '';
        this.lvReqToCraft = data.recipe?.levelReqToCraft ?? 0;
        if (isStatModel(data.item)) {
            this.lvReqToEquip = data.item.lvReqToEquip;
            this.allowedClass = data.item.Class ?? '';
            this.weaponPower = data.item.Weapon_Power ?? 0;
            this.str = data.item.STR ?? 0;
            this.agi = data.item.AGI ?? 0;
            this.wis = data.item.WIS ?? 0;
            this.luk = data.item.LUK ?? 0;
            this.defence = data.item.Defence ?? 0;
            this.miscUp1 = data.item.miscUp1 ?? '';
            this.miscUp2 = data.item.miscUp2 ?? '';
            this.upgradeSlots = data.item.Upgrade_Slots_Left ?? 0;

            this.itemStats.push(new ItemStat("Weapon Power", "Weapon_Power", data.item.Weapon_Power));
            this.itemStats.push(new ItemStat("STR", "STR", data.item.STR));
            this.itemStats.push(new ItemStat("AGI", "AGI", data.item.AGI));
            this.itemStats.push(new ItemStat("WIS", "WIS", data.item.WIS));
            this.itemStats.push(new ItemStat("LUK", "LUK", data.item.LUK));
            this.itemStats.push(new ItemStat("Defence", "Defence", data.item.Defence));
            this.itemStats.push(new ItemStat("Upgrade Slots Left", "Upgrade_Slots_Left", data.item.Upgrade_Slots_Left));

            // If we have misc but it's not a keychain
            if (this.miscUp1 && this.miscUp1 != "" && !this.miscUp1?.includes("]")) {
                const match = getMiscStatRegex().exec(this.miscUp1 ?? "");
                if (match) {
                    this.itemStats.push(new ItemStat("Misc", "UQ1val", Number(match[1]), match[2]));
                }
            }
            if (this.miscUp2 && this.miscUp2 != "00" && !this.miscUp2?.includes("]")) {
                const match = getMiscStatRegex().exec(this.miscUp2 ?? "");
                if (match) {
                    this.itemStats.push(new ItemStat("Misc", "UQ2val", Number(match[1]), match[2]));
                }
            }

        }
        if (isArmorModel(data.item)) {
            this.skill = data.item.Skill ?? '';
            this.skillPower = data.item.Skill_Power ?? 0;
            this.itemStats.push(new ItemStat(`${data.item.Skill} Power`, "Weapon_Power", data.item.Skill_Power));
        }
        if (isWeaponModel(data.item)) {
            this.speed = data.item.Speed ?? 0;
            this.reach = data.item.Reach ?? 0;

            this.itemStats.push(new ItemStat("Speed", "Speed", data.item.Speed));
            this.itemStats.push(new ItemStat("Reach", "Reach", data.item.Reach));
        }
        this.dropInfo = data.detDrops?.sources ?? [];
        this.sources = data.sources ?? { sources: [], recipeFrom: [], questAss: [] };
        if (isDescModel(data.item)) {
            this.description = data.item.description ?? '';
        }
    }

    duplicate = () => {
        return new Item(this.data);
    }

    getMiscBonus = (type: string) => {
        let bonusTotal = 0;
        // This is a keychain .. I think.
        if (this.itemStats.filter(stat => stat.stoneName == "Nothing").length > 0) {
            return this.itemStats.filter(stat => stat.extra.toLowerCase().includes(type.toLowerCase())).reduce((total, stat) => total += stat.getValue(), 0);
        }
        if (this.miscUp1.toLowerCase().includes(type.toLowerCase())) {
            bonusTotal += this.itemStats.find(stat => stat.stoneName == "UQ1val")?.getValue() ?? 0;
        }

        if (this.miscUp2.toLowerCase().includes(type.toLowerCase())) {
            bonusTotal += this.itemStats.find(stat => stat.stoneName == "UQ2val" || stat.extra.toLowerCase().includes(type.toLowerCase()))?.getValue() ?? 0;
        }

        return bonusTotal;
    }

    getImageData = () => {
        return Item.getImageData(this.internalName);
    }

    addStone = (data: StoneProps) => {
        if (data == undefined) {
            return;
        }

        Object.keys(data).forEach((key) => {
            // logic is as follows:
            // 1. Check if the value is a number, and if it's 0 ignore it.
            // 2. Check if we already have a stat that matches this value, and if so update it to know about the stone modifications
            // 3. Else if it's a unique value, it's value is larger then 0 and we don't have a stat that matches the stone name, add it as a new value (this is usually keychains).

            const asNumber = Number(data[key as keyof StoneProps]);
            // ignore 0 values.
            if (!isNaN(asNumber) && asNumber == 0) {
                return;
            }

            let matchingStat = this.itemStats.find((stat) => stat.stoneName == key);
            if (matchingStat) {
                matchingStat.stone = asNumber;
            }
            else {
                // If this is unique txt, it's actually a text and we have a value for it, add it as a new misc
                if (key == "UQ1txt" && isNaN(asNumber) && data.UQ1val && data.UQ1val > 0 && this.itemStats.find((stat) => stat.stoneName == "UQ1val") == undefined) {
                    this.itemStats.push(new ItemStat("Misc", "Nothing", data.UQ1val, data.UQ1txt))
                }
                if (key == "UQ2txt" && isNaN(asNumber) && data.UQ2val && data.UQ2val > 0 && this.itemStats.find((stat) => stat.stoneName == "UQ2val") == undefined) {
                    this.itemStats.push(new ItemStat("Misc", "Nothing", data.UQ2val, data.UQ2txt))
                }
            }
        })
    }

    getArchType = () => {
        switch (this.type) {
            case 'Bow':
            case 'Trophy':
            case 'Pickaxe':
            case 'Wand':
            case 'Fishing Rod':
            case 'Dna Splicer':
            case 'Spear':
            case 'Hatchet':
            case 'Fisticuff':
            case 'Helmet':
            case 'Trap Box Set':
            case 'Shirt':
            case 'Sword':
            case 'Pants':
            case 'Shoes':
            case 'Pendant':
            case 'Cape':
            case 'Keychain':
            case 'Bug Catching Net':
            case 'Ring':
            case 'Worship Skull':
            case 'Premium Helmet':
            case 'Chat Ring':
                return "Equipment";
            case 'Critter':
            case 'Ore':
            case 'Bug':
            case 'Material':
            case 'Soul':
            case 'Leaf':
            case 'Bar':
            case 'Log':
            case 'Fish':
            case 'Barrel':
            case 'Refinery Salts':
            case 'Monster Drop':
                return "Materials";
            case 'Health Food':
            case 'Golden Food':
            case 'Reset Potion':
            case 'Teleport':
            case 'Time Candy':
            case 'Exp Balloon':
            case 'Dungeon Food':
            case 'Talent Point':
            case 'Boost Food':
            case 'Loot Dice':
            case 'Upgrade':
            case 'Boss Key':
            case 'Inventory G':
            case 'Office Pen':
                return "Consumable";
            case 'Gem':
            case 'Anvil Expansion':
            case 'Card Pack':
            case 'Usable Box':
            case 'Fragment':
            case 'Combat Stamp':
            case 'Circle Obol':
            case 'Summon Item':
            case 'Square Obol':
            case 'Quest Item':
            case 'Trash':
            case 'Usable':
            case 'Dungeon Evaporate':
            case 'Storage':
            case 'Skills Stamp':
            case 'What':
            case 'Dungeon Key':
            case 'Hunk Of Junk':
            case 'Box':
            case 'Event Box':
            case 'Carry Bag':
            case 'Sparkle Obol':
            case 'Hexagon Obol':
            case 'Dungeon Item':
            case 'Ticket':
            case 'Lava Letter':
            case 'Card':
            case 'Inventory':
            case 'Obol Stack':
            case 'Misc Stamp':
            case 'Currency':
            case 'Event Item':
            case 'Obol Fragment':
            case 'Fishing Accessory':
            case 'Statue':
            default:
                return "Misc";
        }
    }

    static emptyItem = (name: string, displayName: string = name, type: string = "Misc"): Item => {
        const fakeModel: ItemModel = {
            "item": {
                "internalName": name,
                "displayName": displayName,
                "sellPrice": 1,
                "typeGen": TypeGenEnum.dQuest,
                "Type": type,
            },
            "sources": undefined,
            "notes": undefined,
            "recipe": undefined,
            "vendors": undefined,
            "anvilProduction": undefined,
            "detDrops":undefined
        }
        return new Item(fakeModel);
    }

    static fromBase = (data: ItemBase[]) => {
        return data.map(item => {
            switch (item.data.item.typeGen) {
                case TypeGenEnum.aBugNet:
                case TypeGenEnum.aFishingRod:
                case TypeGenEnum.aPick:
                case TypeGenEnum.aHatchet:
                case TypeGenEnum.aTrap:
                case TypeGenEnum.aSkull:
                case TypeGenEnum.aDNAgun:
                    return new Tool(item.data);
                case TypeGenEnum.aHelmet:
                case TypeGenEnum.aWeapon:
                case TypeGenEnum.aShirt:
                case TypeGenEnum.aPants:
                case TypeGenEnum.aShoes:
                case TypeGenEnum.aPendant:
                case TypeGenEnum.aRing:
                    return new Equipment(item.data);
                case TypeGenEnum.aCape:
                case TypeGenEnum.aTrophy:
                case TypeGenEnum.aKeychain:
                case TypeGenEnum.aChatRingMTX:
                    return new Special(item.data);
                case TypeGenEnum.cFood:
                    return new Food(item.data);
                case TypeGenEnum.aObolCircle:
                case TypeGenEnum.aObolSquare:
                case TypeGenEnum.aObolHexagon:                    
                case TypeGenEnum.aObolSparkle:
                default:
                    return new Item(item.data);
                
            }
        })
    }

    static getImageData = (internalName: string) => {
        if (getEnhancerRegex().exec(internalName)) {
            return {
                height: 34,
                location: `${internalName}_x1`,
                width: 34
            };
        }
        if (getRegex().exec(internalName)) {
            return {
                height: 36,
                location: internalName,
                width: 28
            };
        }
        if (liquidRegex().exec(internalName)) {
            return {
                height: 36,
                location: `${internalName}_x1`,
                width: 36
            };
        }
        // Cons dem for some reason has capital x.
        if (internalName == "ObolPinkCons") {
            return {
                height: 36,
                location: `${internalName}_X1`,
                width: 36
            };
        }

        return {
            height: 36,
            location: `${internalName}`,
            width: 36
        };
    }
}

export class Equipment extends Item {
    constructor(data: ItemModel) {
        super(data);
    }

    override duplicate = () => {
        return new Equipment(this.data);
    }
}

export class Tool extends Item {
    constructor(data: ItemModel) {
        super(data);
    }

    override duplicate = () => {
        return new Tool(this.data);
    }
}

export class Food extends Item {
    goldenFood: { effect: string, amount: number } | undefined
    constructor(data: ItemModel) {
        super(data);
        if (isGoldenFood(data.item)) {
            this.goldenFood = {
                effect: data.item.goldenFoodData.effect,
                amount: data.item.goldenFoodData.amount
            }
        }
    }

    goldFoodBonus = (stack: number, goldFoodMulti: number = 0) => {
        if (!this.goldenFood) {
            return 0;
        }

        return round(this.goldenFood.amount * goldFoodMulti * 0.05 * lavaLog(1 + stack) * (1 + lavaLog(1 + stack) / 2.14));
    }

    getBonusText = (stack: number, goldFoodMulti: number = 0) => {
        if (!this.goldenFood) {
            return "";
        }

        return this.goldenFood.effect.replace(/\[/, this.goldFoodBonus(stack, goldFoodMulti).toFixed(1));
    }

    override duplicate = () => {
        return new Food(this.data);
    }
}

export class Special extends Item {
    constructor(data: ItemModel) {
        super(data);
    }
}

export const initAllItems = (): Item[] => Item.fromBase(initItemRepo());