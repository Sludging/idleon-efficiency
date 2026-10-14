import { lavaLog, round } from "../utility";
import { initItemRepo, ItemBase } from "./data/ItemRepo";
import { initItemDetailRepo } from "./data/ItemDetailRepo";
import { TypeGenEnum } from "./enum/typeGenEnum";
import { ArmourItemModel } from "./model/armourItemModel";
import { BaseItemModel } from "./model/baseItemModel";
import { ItemModel } from "./model/itemModel";
import { StatItemModel } from "./model/statItemModel";
import { WeaponItemModel } from "./model/weaponItemModel";
import { SourcesModel } from "./model/sourcesModel";
import { DescItemModel } from "./model/descItemModel";
import { GoldenFoodItemModel } from "./model/goldenFoodItemModel";
import { NoteModel } from "./model/noteModel";
import type { CommonItemModel } from "./model/commonItemModel";
import type { ConsumableItemModel } from "./model/consumableItemModel";
import { Card } from "./cards";
import { EquipmentBonus } from "./equipment-effects";
import type { ItemProperty } from "./equipment-effects";
import type { Player } from "./player";
import type { TalentLevelInputs } from "./talents";

export interface BoostFoodEffectivenessInputs {
    boostFoodStamp: number;
    foodStatue: number;
}

const isConsumableItemModel = (item: CommonItemModel): item is ConsumableItemModel =>
    "Effect" in item && typeof item.Effect === "string" &&
    "Amount" in item && typeof item.Amount === "number";

const foodEffectsByName: Record<string, { effect: string, amount: number }> = {};
const trapCapacityByName: Record<string, number> = {};

for (const item of initItemDetailRepo()) {
    if (item.data.typeGen === TypeGenEnum.cFood && isConsumableItemModel(item.data)) {
        foodEffectsByName[item.id] = { effect: item.data.Effect, amount: item.data.Amount };
    }
    if (item.data.typeGen === TypeGenEnum.aTrap) {
        trapCapacityByName[item.id] = item.data.ID;
    }
}

export const getTrapCapacity = (internalName: string): number => trapCapacityByName[internalName] ?? 1;

// Used to make slab page nicer.
const specialNotes: Record<string, NoteModel> = {
    "EquipmentHats75": { "note": "Was available during the launch event of the iOS version." },
    "EquipmentHats76": { "note": "Available from the Idle Skilling crossover event, requires reaching the mist in IS." },
    "EquipmentHats78": { "note": "Available from Random Events (Meteorite)" },
    "EquipmentHats79": { "note": "Available from Random Events (Glacial Guild)" },
    "EquipmentShoes2": { "note": "Unobtainable" },
    "EquipmentRingsChat10": { "note": "Available from Random Events (Meteorite)" },
    "EquipmentCape2": { "note": "Requires buying the Eggscellent Pack." },
    "EquipmentKeychain25": { "note": "Dungeon Loot Dice (Random)" },
    "EquipmentKeychain26": { "note": "Dungeon Loot Dice (Random)" },
    "EquipmentKeychain27": { "note": "Dungeon Loot Dice (Random)" },
    "EquipmentKeychain28": { "note": "Dungeon Loot Dice (Random)" },
    "Trophy16": { "note": "Available from the Idle Skilling crossover event, requires reaching Tee Hee 15 in IS." },
    "EquipmentTools13": { "note": "Random Events (Snake Swarm)" },
    "EquipmentToolsHatchet11": { "note": "Random Events (Mega Grumblo)" },
    "Crystal4": { "note": "Massive Troll (Any Difficulty)" },
    "Trash3": { "note": "Treasure Hunt (check Idleon youtube)" },
    "Quest58": { "note": "Made from a Damaged Cog, which you can buy at the world 3 Town Shop!" },
    "Quest69": { "note": "Killroy" },
    "Quest71": {
        "note": "Droprates are displayed on the Event page this item was apart of: [[Events/iOS_Release|iOS Release Event]]."
    },
    "ObolBronzeCard": { "note": "Alchemy Shop" },
    "ObolFrog": { "note": "Random Events (Mega Grumblo)" },

}

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
            // Stone-only unique effects keep their existing combined display without an upgrade suffix.
            const stoneOnlyEffect = this.value === 0 && (this.stoneName === 'UQ1val' || this.stoneName === 'UQ2val');
            return `${this.displayName}: ${this.getValue()}${this.extra.replace(/_/g, ' ')}${this.stone != 0 && !stoneOnlyEffect ? ` (${this.stone})` : ''}`;
        }
        return `${this.displayName}: ${this.getValue()}${this.stone != 0 ? ` (${this.stone})` : ''}`
    }

    duplicate = () => {
        return new ItemStat(this.displayName, this.stoneName, this.value, this.extra, this.stone);
    }
}

const getMiscStatRegex = () => { return /(\d+)(.*)/g; };
const getRegex = () => { return /Cards(\w)(\d+)/g; };
const getEnhancerRegex = () => { return /DungEnhancer(\d+)/g; };
const getDungRNGRegex = () => { return /DungRNG(\d+)/g; };
const liquidRegex = () => { return /Liquid(\d+)/g; };

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

    // Slab related
    obtained: boolean = false;

    constructor(public data: ItemModel) {
        this.internalName = data.item.internalName;
        this.displayName = data.item.displayName;
        this.sellPrice = data.item.sellPrice;
        this.typeGen = data.item.typeGen;
        this.type = data.item.Type ?? '';
        this.lvReqToCraft = data.recipe?.levelReqToCraft ?? 0;

        // Special note handling for slab display.
        const noteOverwrite = specialNotes[this.internalName];
        if (noteOverwrite) {
            this.data.notes = noteOverwrite;
        }

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

            this.itemStats.push(new ItemStat("STR", "STR", data.item.STR));
            this.itemStats.push(new ItemStat("AGI", "AGI", data.item.AGI));
            this.itemStats.push(new ItemStat("WIS", "WIS", data.item.WIS));
            this.itemStats.push(new ItemStat("LUK", "LUK", data.item.LUK));
            this.itemStats.push(new ItemStat("Defence", "Defence", data.item.Defence));
            // Stat items can supply weapon power without being weapons or tools.
            if (!isArmorModel(data.item) && !isWeaponModel(data.item) && this.weaponPower !== 0) {
                this.itemStats.push(new ItemStat("Weapon Power", "Weapon_Power", this.weaponPower));
            }
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
            // Obols also have skill fields. An empty skill retains their ordinary weapon power.
            if (this.skill !== '') {
                this.itemStats.push(new ItemStat(`${this.skill} Power`, "Weapon_Power", this.skillPower));
            } else if (!isWeaponModel(data.item)) {
                this.itemStats.push(new ItemStat("Weapon Power", "Weapon_Power", this.weaponPower));
            }
        }
        if (isWeaponModel(data.item)) {
            this.speed = data.item.Speed ?? 0;
            this.reach = data.item.Reach ?? 0;
            this.itemStats.push(new ItemStat("Weapon Power", "Weapon_Power", data.item.Weapon_Power));
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
        const copy = new Item(this.data);
        copy.itemStats = this.itemStats.map(stat => stat.duplicate());
        return copy;
    }

    getProperty(property: ItemProperty): ItemStat | undefined {
        for (const stat of this.itemStats) {
            if (stat.stoneName === property) return stat;
        }
        return undefined;
    }


    getImageData = () => {
        return Item.getImageData(this.internalName);
    }

    addStone = (data: StoneProps) => {
        if (data == undefined) {
            return;
        }

        Object.keys(data).forEach((key) => {
            if (key === "UQ1txt" || key === "UQ2txt") {
                const stoneName = key === "UQ1txt" ? "UQ1val" : "UQ2val";
                const value = data[stoneName];
                const label = data[key];
                if (label && isNaN(Number(label)) && value !== undefined && value > 0) {
                    const stat = this.itemStats.find(stat => stat.stoneName === stoneName);
                    if (!stat) {
                        this.itemStats.push(new ItemStat("Misc", stoneName, 0, label, value));
                    } else if (!stat.extra || stat.extra === '0') {
                        // An empty definition effect can acquire its label from the upgrade.
                        stat.extra = label;
                        stat.stone = value;
                    }
                }
                return;
            }
            const asNumber = Number(data[key as keyof StoneProps]);
            if (!isNaN(asNumber) && asNumber === 0) return;

            const matchingStat = this.itemStats.find((stat) => stat.stoneName == key);
            if (matchingStat) {
                matchingStat.stone = asNumber;
            } else if (!isNaN(asNumber) && (
                key === "STR" || key === "AGI" || key === "WIS" || key === "LUK"
                || key === "Defence" || key === "Weapon_Power" || key === "Reach"
            )) {
                // Upgrade-only properties keep their stone contribution and existing display format.
                this.itemStats.push(new ItemStat(key === "Weapon_Power" ? "Weapon Power" : key, key, 0, '', asNumber));
            }
        })
    }

    getBagType = () => {
        // This function is based on _customBlock_MaxCapacity
        switch (this.data.item.typeGen) {
            case TypeGenEnum.bBar:
            case TypeGenEnum.cOil:
            case TypeGenEnum.bOre:
                return "Mining"
            case TypeGenEnum.dFish:
                return "Fishing";
            case TypeGenEnum.dBugs:
                return "Bugs"
            case TypeGenEnum.bLeaf:
            case TypeGenEnum.bLog:
                return "Chopping";
            case TypeGenEnum.cFood:
                return "Foods"
            case TypeGenEnum.dCritters:
                return "Critters"
            case TypeGenEnum.dSouls:
                return "Souls"
            case TypeGenEnum.bCraft:
                return "bCraft";
            default:
                return undefined;
        }
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
            "detDrops": undefined
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
        if (liquidRegex().exec(internalName) || getDungRNGRegex().exec(internalName) || internalName.includes("SailTr") || internalName == "Bits" || internalName.startsWith("W7item")) {
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
        const copy = new Equipment(this.data);
        copy.itemStats = this.itemStats.map(stat => stat.duplicate());
        return copy;
    }
}

export class Tool extends Item {
    constructor(data: ItemModel) {
        super(data);
    }

    override duplicate = () => {
        const copy = new Tool(this.data);
        copy.itemStats = this.itemStats.map(stat => stat.duplicate());
        return copy;
    }
}

export class Food extends Item {
    goldenFood: { effect: string, amount: number } | undefined
    readonly effect: string;
    readonly effectAmount: number;
    constructor(data: ItemModel) {
        super(data);
        const foodEffect = foodEffectsByName[this.internalName];
        this.effect = foodEffect.effect;
        this.effectAmount = foodEffect.amount;
        if (isGoldenFood(data.item)) {
            this.goldenFood = {
                effect: data.item.goldenFoodData.effect,
                amount: data.item.goldenFoodData.amount
            }
        }
    }

    getBaseHPBoost = (): number => {
        return this.effect === "HpBaseBoosts" ? this.effectAmount : 0;
    }

    static getBoostFoodEffectiveness(
        player: Player,
        inputs: BoostFoodEffectivenessInputs,
        talentInputs: TalentLevelInputs = player.finalTalentInputs,
    ): number {
        let postOfficeBoostFoodEffect = 0;
        for (const box of player.postOffice) {
            for (let index = 0; index < box.bonuses.length; index++) {
                const bonus = box.bonuses[index];
                if (bonus.data.bonusKey === "PowerFoodEffect") {
                    postOfficeBoostFoodEffect += bonus.getBonus(box.level, index);
                }
            }
        }
        let starSignFoodEffect = 0;
        for (const sign of player.starSigns) {
            starSignFoodEffect += sign.getBonus("All Food Effect");
        }
        const equipmentFoodEffect = player.gear.getBonus(EquipmentBonus.FoodEffect);
        const cardFoodEffect = Card.GetTotalBonusForId(player.cardInfo!.equippedCards, 48);
        const cardSetFoodEffect = player.cardInfo!.getBonusForId(1);
        const talentFoodEffect = player.getTalentBonusAtInputs(631, talentInputs);
        // HP boost foods use the boost-food factor, not the separate healing-food factor.
        // Preserve the nested sum; Alchemy can supply its earlier talent snapshot.
        return 1 + (postOfficeBoostFoodEffect + (inputs.foodStatue + (equipmentFoodEffect
            + (inputs.boostFoodStamp + (starSignFoodEffect + (cardFoodEffect
                + (cardSetFoodEffect + talentFoodEffect))))))) / 100;
    }

    static getBaseHPContribution(
        player: Player,
        inputs: BoostFoodEffectivenessInputs,
        talentInputs: TalentLevelInputs = player.finalTalentInputs,
    ): number {
        let contribution = 0;
        let effectiveness: number | undefined;
        for (let slot = 0; slot < player.foodSlotsOwned; slot++) {
            const food = player.gear.food[slot];
            if (!food || food.count === 0 || food.effect !== "HpBaseBoosts") {
                continue;
            }
            // Stack quantity gates ordinary boost food; it does not scale the food's base amount.
            if (effectiveness === undefined) {
                effectiveness = Food.getBoostFoodEffectiveness(player, inputs, talentInputs);
            }
            contribution += food.getBaseHPBoost() * effectiveness;
        }
        return contribution;
    }

    goldFoodBonusUnrounded = (stack: number, goldFoodMulti: number = 0): number => {
        if (!this.goldenFood) {
            return 0;
        }

        const stackLog = lavaLog(1 + stack);
        return this.effectAmount * goldFoodMulti * 0.05 * stackLog * (1 + stackLog / 2.14);
    }

    goldFoodBonus = (stack: number, goldFoodMulti: number = 0): number => {
        return round(this.goldFoodBonusUnrounded(stack, goldFoodMulti));
    }

    getBonusText = (stack: number, goldFoodMulti: number = 0) => {
        if (!this.goldenFood) {
            return "";
        }

        return this.goldenFood.effect.replace(/\[/, this.goldFoodBonus(stack, goldFoodMulti).toFixed(1));
    }

    override duplicate = () => {
        const copy = new Food(this.data);
        copy.itemStats = this.itemStats.map(stat => stat.duplicate());
        return copy;
    }
}

export class Special extends Item {
    constructor(data: ItemModel) {
        super(data);
    }
}

export const initAllItems = (): Item[] => Item.fromBase(initItemRepo());