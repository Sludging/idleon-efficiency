import { lavaFunc, nFormatter, round } from '../utility'
import { Cooking } from './cooking';
import { CauldronBase, initBubbleRepo } from './data/BubbleRepo';
import { ImageData } from './imageData';
import { Item } from './items';
import { Lab } from './lab';
import { BubbleModel } from './model/bubbleModel';
import { ComponentBaseModel } from './model/componentBaseModel';
import { LiquidComponentModel } from './model/liquidComponentModel';
import { ComponentModel } from './model/componentModel';
import { SpiceComponentModel } from './model/spiceComponentModel';
import { Player } from './player';
import { ClassIndex } from './talents';
import { SkillsIndex } from './SkillsIndex';
import { Sailing } from './sailing';
import { TaskBoard } from './tasks';
import { Rift } from './rift';
import { Domain, RawData } from './base/domain';

export enum CauldronIndex {
    Power = 0,
    Quicc = 1,
    HighIQ = 2,
    Kazam = 3
}

export enum CauldronBoostIndex {
    Speed = 0,
    Luck = 1,
    Cost = 2,
    Extra = 3
}

export const AlchemyConst = {
    OrangeBargain: 14,
    VialIndex: 4,
    UnderdevelopedCosts: 6,
    Anvilnomics: 4,
    HammerHammer: 2,
    BarleyBrew: 9,
    BlueFlav: 18,
    SmartBoi: 13,
    GospelLeader: 12,
    CallMePope: 11,
    CauldronCount: 4,
    CauldronBonusBubbleIndex: 1,
    LoCostMoJade: 29,
    CropiusMapper: 25,
    CropChapter: 29
};

const cauldronPrefix: Record<string, string> = {
    "Power Cauldron": "O",
    "Quicc Cauldron": "G",
    "High-IQ Cauldron": "P",
    "Kazam Cauldron": "Y"
}

const cauldronIndex: Record<string, number> = {
    "Power Cauldron": 0,
    "Quicc Cauldron": 1,
    "High-IQ Cauldron": 2,
    "Kazam Cauldron": 3
}

export const VialIndex = 4;

const vialPercentages = "99 90 80 70 60 60 40 50 40 35 30 25 17 16 13 9 13 10 7 11 1 25 25 20 20 15 14 13 5 12 10 9 7 5 4 3 3 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1".split(" ").map((value) => parseInt(value));
const vialCostPerLevel = [0, 100, 1000, 2500, 10000, 50000, 100000, 500000, 1000001, 5000000, 25000000, 100000000, 1000000000, 50000000000];

const calcBubbleMatCost = (bubbleLvl: number, bubbleIndex: number, baseCost: number, isLiquid: boolean, cauldCostReduxLvl: number = 0, undevelopedCostsBubbleLevel: number = 0, bubbleCostVialLvl: number = 0, bubbleBargainLvl: number = 0, bubbleMultClassLvl: number = 0, shopBargainBought: number = 0, hasAchievement: boolean, bubbleNewMultiLevel: number = 0, vialMultiplier: number = 1, isBits: boolean): number => {
    if (isLiquid) {
        return baseCost + Math.floor(bubbleLvl / 20);
    } else if (isBits) {
        return baseCost * Math.pow(2, bubbleLvl) * Math.max(0.1, Math.pow(0.75, shopBargainBought)) * (hasAchievement ? 0.9 : 1)
    } else {
        const first = bubbleIndex < 15 ?
            baseCost * Math.pow(1.35 - (0.3 * bubbleLvl) / (50 + bubbleLvl), bubbleLvl) :
            baseCost * Math.pow(1.37 - (0.28 * bubbleLvl) / (60 + bubbleLvl), bubbleLvl);

        const cauldCostReduxBoost = Math.max(
            0.1,
            1 - (Math.round(10 * lavaFunc("decay", cauldCostReduxLvl, 90, 100)) / 10) / 100
        );
        const bubbleCostBubbleBoost = Math.max(
            0.05,
            1 - (lavaFunc("decay", undevelopedCostsBubbleLevel, 40, 70) + (lavaFunc("add", bubbleCostVialLvl, 1, 0) * vialMultiplier)) / 100
        );
        const bubbleBargainBoost = Math.max(
            0.05,
            1 - (lavaFunc("decay", bubbleBargainLvl, 40, 12) / 100) * lavaFunc("decayMulti", bubbleMultClassLvl, 2, 50) * lavaFunc("decayMulti", bubbleNewMultiLevel, 1.4, 30)
        );
        const shopBargainBoost = Math.max(0.1, Math.pow(0.75, shopBargainBought));
        // for any material besides liquid
        return Math.min(1e9, Math.round(first * cauldCostReduxBoost * bubbleBargainBoost * bubbleCostBubbleBoost * shopBargainBoost * (hasAchievement ? 0.9 : 1)));
    }
}

function handleToolBubbles(titleText: string, bubbleName: string) {
    switch (bubbleName) {
        case "Stronk Tools": return titleText.replace("$", "Pickaxes and Fishing Rods");
        case "Sanic Tools": return titleText.replace("$", "Catching Nets and Traps");
        case "Le Brain Tools": return titleText.replace("$", "Hatchets and Worship Skulls");
        default: return titleText;
    }
}

export class Bubble {
    name: string;
    x1: number;
    x2: number;
    func: string;
    description: string;
    rawRequirements: ComponentBaseModel[];
    requirements: Array<Item> = [];

    level: number = 0;
    labUpgrade: boolean = false;
    bubbleIndex: number;
    cauldronIndex: number;

    iconPrefix: string

    static fromBase = (id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) => {
        return new Bubble(id, data, iconPrefix, bubbleIndex);
    }

    constructor(id: string, public data: BubbleModel, iconPrefix: string, bubbleIndex: number) {
        this.name = id.replace("]", "²")
        this.x1 = data.x1;
        this.x2 = data.x2;
        this.func = data.func;
        this.description = data.description;
        this.rawRequirements = data.requirements;
        this.bubbleIndex = bubbleIndex;
        this.iconPrefix = iconPrefix;
        this.cauldronIndex = cauldronIndex[data.cauldron];

    }

    getImageData = (): ImageData => {
        return {
            location: `aUpgrades${this.iconPrefix}${this.bubbleIndex}`,
            height: 70,
            width: 70
        }
    }

    getMaterialCost = (cauldCostReduxLvl: number = 0, undevelopedCostsBubbleLevel: number = 0, bubbleCostVialLvl: number = 0, bubbleBargainLvl: number = 0, bubbleMultClassLvl: number = 0, shopBargainBought: number = 0, hasAchievement: boolean = false, bubbleNewMultiLevel: number = 0, vialMultiplier: number = 1): Map<Item, number> => {
        let toReturn = new Map<Item, number>();
        this.requirements.forEach((req) => {
            toReturn.set(req, calcBubbleMatCost(this.level, this.bubbleIndex, req.count, req.internalName.includes("Liquid"), cauldCostReduxLvl, undevelopedCostsBubbleLevel, bubbleCostVialLvl, bubbleBargainLvl, bubbleMultClassLvl, shopBargainBought, hasAchievement, bubbleNewMultiLevel, vialMultiplier, req.internalName == "Bits"))
        })
        return toReturn;
    }

    getAtomCost = (materialCost: number) => {
        return Math.floor((materialCost / 1e9) * (this.bubbleIndex + 1) * Math.pow(1.04, this.bubbleIndex) * 100)
    }

    getBonus = (roundResult: boolean = false): number => {
        return lavaFunc(this.func, this.level, this.x1, this.x2, roundResult);
    }

    getBonusText = (bonus: number = this.getBonus(true)): string => {
        let titleText = this.description.replace(/{/g, nFormatter(bonus));
        return handleToolBubbles(titleText, this.name);
    }

}

export class DiamonChefBubble extends Bubble {
    diamonMeals: number = 0;

    // Should this live inside the bubble base class? :thinking:
    static fromBase = (id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) => {
        return new DiamonChefBubble(id, data, iconPrefix, bubbleIndex);
    }

    constructor(id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) {
        super(id, data, iconPrefix, bubbleIndex);
    }

    override getBonus = (roundResult: boolean = false): number => {
        const bonus = lavaFunc(this.func, this.level, this.x1, this.x2, false);
        return roundResult ? round(Math.pow(bonus, this.diamonMeals)) : Math.pow(bonus, this.diamonMeals);
    }

    override getBonusText = (bonus: number = this.getBonus(true)): string => {
        let titleText = this.description.replace(/{/g, bonus.toString());
        titleText += ` (${this.diamonMeals} diamond plates)`;
        return handleToolBubbles(titleText, this.name);
    }
}

export class DailyDripBubble extends Bubble {
    totalAlchemyLevel: number = 0;

    // Should this live inside the bubble base class? :thinking:
    static fromBase = (id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) => {
        return new DailyDripBubble(id, data, iconPrefix, bubbleIndex);
    }

    constructor(id: string, data: BubbleModel, iconPrefix: string, bubbleIndex: number) {
        super(id, data, iconPrefix, bubbleIndex);
    }

    override getBonus = (roundResult: boolean = false): number => {
        const bonus = lavaFunc(this.func, this.level, this.x1, this.x2, roundResult);
        const alchemyBonus = bonus * Math.max(Math.pow(this.totalAlchemyLevel / 25, .3), 0);
        return roundResult ? round(alchemyBonus) : alchemyBonus;
    }

    override getBonusText = (bonus: number = this.getBonus(true)): string => {
        return this.description.replace(/\$/g, bonus.toString());
    }
}

export class Cauldron {
    name: string;
    short_name: string;
    bubbles: Array<Bubble> = [];
    boostLevels: Array<number> = [0, 0, 0, 0];

    constructor(name: string, short_name: string) {
        this.name = name;
        this.short_name = short_name;
    }

    static fromBase = (data: CauldronBase) => {
        const iconPrefix = cauldronPrefix[data.id];
        const toReturn = new Cauldron(data.id, iconPrefix);
        data.data.bubbles.forEach((bubble, index) => {
            if (iconPrefix == "Y" && index == 17) {
                toReturn.bubbles.push(DiamonChefBubble.fromBase(bubble.name, bubble, iconPrefix, index));
            }
            else if (bubble.name == "Da Daily Drip") {
                toReturn.bubbles.push(DailyDripBubble.fromBase(bubble.name, bubble, iconPrefix, index));
            }
            else {
                toReturn.bubbles.push(Bubble.fromBase(bubble.name, bubble, iconPrefix, index));
            }
        })

        return toReturn;
    }
}

export class Vial {
    name: string;
    x1: number;
    x2: number;
    func: string;
    description: string;
    rawRequirements: ComponentBaseModel[];
    requirements: Array<Item> = [];

    level: number = 0;
    bonusMulitplier: number = 1;
    maxedVials: number = 0;

    constructor(id: string, public data: BubbleModel, public vialIndex: number) {
        this.name = id;
        this.x1 = data.x1;
        this.x2 = data.x2;
        this.func = data.func;
        this.description = data.description;
        this.rawRequirements = data.requirements;
    }

    static fromBase = (id: string, data: BubbleModel, vialIndex: number) => {
        return new Vial(id, data, vialIndex);
    }

    getBonus = (round: boolean = false): number => {
        return lavaFunc(this.func, this.level, this.x1, this.x2, round)
            * this.bonusMulitplier
            * (1 + (2 * this.maxedVials) / 100);
    }

    getBonusText = (bonus: number = this.getBonus(true)): string => {
        return this.description.replace(/{/g, nFormatter(bonus, "Smaller"));
    }

    getImageData = (): ImageData => {
        const costItem = this.requirements.find(item => !item.internalName.includes("Liquid"));
        if (costItem) {
            return costItem.getImageData();
        }

        return {
            location: 'Blank',
            width: 36,
            height: 36
        };
    }

    getBackgroundImageData = (): ImageData => {
        return {
            location: `aVials${Math.max(this.level, 1)}`,
            width: 104,
            height: 120
        };
    }

    getNumberToRoll = () => {
        return 100 - vialPercentages[this.vialIndex];
    }

    getMaterialCost = (): Map<Item, number> => {
        let toReturn = new Map<Item, number>();
        this.requirements.forEach((req) => {
            if (req.internalName.includes("Liquid")) {
                toReturn.set(req, 3 * this.level)
            }
            else {
                toReturn.set(req, vialCostPerLevel[this.level]);
            }
        })
        return toReturn;
    }
}

export class Alchemy extends Domain {
    cauldrons: Array<Cauldron> = [];
    vials: Array<Vial> = [];

    getUndevelopedCostsBubbleLevel = (): number => {
        if (this.cauldrons.length > 0) {
            return this.cauldrons[CauldronIndex.Kazam].bubbles[AlchemyConst.UnderdevelopedCosts].level;
        }

        return 0;
    }

    getBarleyBrewVialLevel = (): number => {
        if (this.vials.length > 0) {
            return this.vials[AlchemyConst.BarleyBrew].level;
        }

        return 0;
    }

    _shouldBoostPlayer = (player: Player, cauldron: CauldronIndex, bubble: number) => {
        // 2nd bubble doesn't boost active talents.
        if (this.cauldrons[cauldron].bubbles[bubble].data.bonusKey.includes("ACTIVE")) {
            return false;
        }

        if (player.getBaseClass() == ClassIndex.Archer && cauldron == CauldronIndex.Quicc) {
            return true;
        }

        if (player.getBaseClass() == ClassIndex.Mage && cauldron == CauldronIndex.HighIQ) {
            return true;
        }

        if (player.getBaseClass() == ClassIndex.Warrior && cauldron == CauldronIndex.Power) {
            return true;
        }

        return false;
    }

    _shouldBoostBubble = (bubble: number, cauldron: CauldronIndex) => {
        if (cauldron == CauldronIndex.Power) {
            return [0, 2, 4, 7, 14].includes(bubble);
        }

        if (cauldron == CauldronIndex.Quicc) {
            return [0, 6, 9, 12, 14].includes(bubble);
        }

        if (cauldron == CauldronIndex.HighIQ) {
            return [0, 2, 6, 12, 14].includes(bubble);
        }

        return false
    }

    getBonusForBubble = (cauldron: CauldronIndex, bubble: number) => {
        let extraBonus = 1;

        // If bubble is boosted by the 16th bubble.
        if (this._shouldBoostBubble(bubble, cauldron)) {
            extraBonus *= this.cauldrons[cauldron].bubbles[16].getBonus();
        }

        return this.cauldrons[cauldron].bubbles[bubble].getBonus() * extraBonus;
    }

    getBubbleBonusForKey = (bonusKey: string) => {
        const matchingBubbles = this.cauldrons.flatMap(cauldron => cauldron.bubbles).filter(bubble => bubble.data.bonusKey == bonusKey);
        return matchingBubbles.reduce((sum, bubble) => {
            // If bubble is boosted by the 16th bubble.
            let extraBonus = 1;
            if (this._shouldBoostBubble(bubble.bubbleIndex, bubble.cauldronIndex)) {
                extraBonus *= this.cauldrons[bubble.cauldronIndex].bubbles[16].getBonus();
            }

            sum += bubble.getBonus() * extraBonus;
            return sum;
        }, 0)
    }

    getVialBonusForKey = (bonusKey: string) => {
        const matchingVials = this.vials.filter(vial => vial.data.bonusKey == bonusKey);
        return matchingVials.reduce((sum, vial) => sum += vial.getBonus(), 0)
    }

    getBonusTextForBubble = (cauldron: CauldronIndex, bubble: number) => {
        return this.cauldrons[cauldron].bubbles[bubble].getBonusText(this.getBonusForBubble(cauldron, bubble));
    }

    getBonusForPlayer = (player: Player, cauldron: CauldronIndex, bubble: number) => {
        let extraBonus = 1;

        // If player is right class, boost by the 2nd bubble
        if (this._shouldBoostPlayer(player, cauldron, bubble)) {
            extraBonus *= this.cauldrons[cauldron].bubbles[1].getBonus();
        }

        return this.getBonusForBubble(cauldron, bubble) * extraBonus;
    }

    hasAchievement = (): boolean => {
        return this.cauldrons[CauldronIndex.HighIQ].bubbles[AlchemyConst.SmartBoi].level > 50;
    }

    getActiveBubble = (bubbleString: string) => {
        switch (bubbleString[0]) {
            case "_": return this.cauldrons[CauldronIndex.Power].bubbles[parseInt(bubbleString.slice(1))]
            case "a": return this.cauldrons[CauldronIndex.Quicc].bubbles[parseInt(bubbleString.slice(1))]
            case "b": return this.cauldrons[CauldronIndex.HighIQ].bubbles[parseInt(bubbleString.slice(1))]
            case "c": return this.cauldrons[CauldronIndex.Kazam].bubbles[parseInt(bubbleString.slice(1))]
        }
    }

    getRawKeys(): RawData[] {
        return [
            { key: "CauldronInfo", default: {}, perPlayer: false },
            { key: "CauldUpgLVs", default: [], perPlayer: false },
        ];
    }

    init(allItems: Item[], charCount: number) {
        const data = initBubbleRepo();

        data.forEach(cauldron => {
            const cauldronName = cauldron.id
            // If one of the cauldrons
            if (["Power Cauldron", "Quicc Cauldron", "High-IQ Cauldron", "Kazam Cauldron"].includes(cauldronName)) {
                this.cauldrons.push(Cauldron.fromBase(cauldron))
            }
            // If vials
            if (cauldronName == "Vials") {
                cauldron.data.bubbles.forEach((vial, index) => {
                    this.vials.push(Vial.fromBase(vial.name, vial, index));
                })
            }
        })

        convertToItemClass(this, allItems);

        return this;
    }

    parse(data: Map<string, any>): void {
        const alchemy = data.get(this.getDataKey()) as Alchemy;
        // Must stay as raw
        const alchemyData = data.get("CauldronInfo") as Map<string, number>[];
        const boostLevels = data.get("CauldUpgLVs") as number[];

        alchemyData.forEach((indexData, index) => {
            // Handle cauldrons if the first 4 arrays of data
            if (index in CauldronIndex) {
                handleCauldron(indexData, index, alchemy, boostLevels)
            }
            // Handle vials if 5th array of data
            if (index == AlchemyConst.VialIndex) {
                handleVial(indexData, alchemy);
            }
        })
    }
}

const handleCauldron = (cauldronData: Map<string, number>, index: number, alchemy: Alchemy, boostLevels: Array<number>) => {
    Object.entries(cauldronData).forEach(([bubble_number, level], _) => {
        if (bubble_number !== "length" && parseInt(bubble_number) < alchemy.cauldrons[index].bubbles.length) {
            try {
                alchemy.cauldrons[index].bubbles[parseInt(bubble_number)].level = level;
            }
            catch (e) {
                console.log(`Failed on ${bubble_number} / ${index}`, e)
            }
        }
    });

    for (let boost in CauldronBoostIndex) {
        // ignore the keys from the enum
        if (isNaN(parseInt(boost))) {
            continue;
        }
        alchemy.cauldrons[index].boostLevels[boost] = boostLevels[(index * AlchemyConst.CauldronCount) + parseInt(boost.toString())];
    }
}

const handleVial = (vialData: Map<string, number>, alchemy: Alchemy) => {
    for (let [vial, level] of Object.entries(vialData)) {
        if (vial !== "length" && parseInt(vial) < alchemy.vials.length) {
            try {
                alchemy.vials[parseInt(vial)].level = level;
            }
            catch (e) {
                console.log(`Failed on vial ${vial}`, e)
            }
        }
    };
}

// Should move this to a common library for typeguards.
const isLiquidComponent = (x: ComponentBaseModel): x is LiquidComponentModel => "liquidNo" in x
const isComponent = (x: ComponentBaseModel): x is ComponentModel => "item" in x
const isSpiceComponent = (x: ComponentBaseModel): x is SpiceComponentModel => "spiceNo" in x

const convertToItemClass = (alchemy: Alchemy, allItems: Item[]) => {
    alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).forEach(bubble => {
        bubble.rawRequirements.forEach(req => {
            if (isLiquidComponent(req)) {
                const itemName = `Liquid${req.liquidNo}`;
                const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                reqItem.count = req.quantity;
                bubble.requirements.push(reqItem);
            }

            if (isComponent(req)) {
                const itemName = req.item;
                const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                reqItem.count = req.quantity;
                bubble.requirements.push(reqItem);
            }

            if (isSpiceComponent(req)) {
                const itemName = `CookingSpice${req.spiceNo}`;
                const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                reqItem.count = req.quantity;
                bubble.requirements.push(reqItem);
            }
        })
    })

    alchemy.vials.forEach(vial => {
        vial.rawRequirements.forEach(req => {
            if (isLiquidComponent(req)) {
                const itemName = `Liquid${req.liquidNo}`;
                const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                reqItem.count = req.quantity;
                vial.requirements.push(reqItem);
            }

            if (isComponent(req)) {
                const itemName = req.item;
                const reqItem = allItems.find(item => item.internalName == itemName)?.duplicate() ?? Item.emptyItem(itemName);
                reqItem.count = req.quantity;
                vial.requirements.push(reqItem);
            }
        })
    })
}

export function updateAlchemy(data: Map<string, any>) {
    const alchemy = data.get("alchemy") as Alchemy;
    const lab = data.get("lab") as Lab;
    const cooking = data.get("cooking") as Cooking;
    const players = data.get("players") as Player[];
    const sailing = data.get("sailing") as Sailing;
    const taskboard = data.get("taskboard") as TaskBoard;
    const rift = data.get("rift") as Rift;

    if (lab.bonuses.find(bonus => bonus.name == "My 1st Chemistry Set")?.active ?? false) {
        alchemy.vials.forEach(vial => vial.bonusMulitplier = 2)
    }

    const riftVialMastery = rift.bonuses.find(bonus => bonus.name == "Vial Mastery");
    if (riftVialMastery?.active ?? false) {
        const maxVials = alchemy.vials.reduce((sum, vial) => sum += vial.level == 13 ? 1 : 0, 0);
        alchemy.vials.forEach(vial => vial.maxedVials = maxVials);
    }

    if (lab.bonuses.find(bonus => bonus.name == "No Bubble Left Behind")?.active) {
        let bubblesToUpgrade = 3;
        if (lab.jewels.find(jewel => jewel.data.name == "Pyrite Rhinestone")?.active) {
            bubblesToUpgrade += 1;
        }
        bubblesToUpgrade += sailing.artifacts[12].getBonus(); //Amberite Artifact
        bubblesToUpgrade += taskboard.merits.find(merit => merit.descLine1.includes("Bubbles upgraded by"))?.getBonus() ?? 0;

        const sortedBubbles = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles.slice(0, 15).filter(bubble => bubble.level > 5)).sort((bubble1, bubble2) => {
            // If same level, then go with higher cauldron index + higher bubble index.
            if (bubble1.level == bubble2.level) {
                if (bubble1.cauldronIndex == bubble2.cauldronIndex) {
                    return bubble1.bubbleIndex > bubble2.bubbleIndex ? -1 : 1
                }
                else {
                    return bubble1.cauldronIndex > bubble2.cauldronIndex ? -1 : 1
                }
            }
            return bubble1.level < bubble2.level ? -1 : 1
        });
        sortedBubbles.slice(0, bubblesToUpgrade).forEach(bubble => bubble.labUpgrade = true);
    }

    const diamonChefBubble = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Diamond Chef") as DiamonChefBubble;
    if (diamonChefBubble) {
        diamonChefBubble.diamonMeals = cooking.meals.reduce((sum, meal) => sum += meal.level >= 11 ? 1 : 0, 0);
    }
    const dailyDripBubble = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Da Daily Drip") as DailyDripBubble;
    if (dailyDripBubble) {
        dailyDripBubble.totalAlchemyLevel = players.reduce((sum, player) => sum += player.skills.get(SkillsIndex.Alchemy)?.level ?? 0, 0);
    }

    return alchemy;
}
