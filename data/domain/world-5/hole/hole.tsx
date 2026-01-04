import { Domain, RawData } from "../../base/domain";
import { CosmoUpgradeBase, initCosmoUpgradeRepo } from "../../data/CosmoUpgradeRepo";
import { initLampWishRepo, LampWishBase } from "../../data/LampWishRepo";
import { Item } from "../../items";
import { CosmoUpgradeModel } from "../../model/cosmoUpgradeModel";
import { LampWishModel } from "../../model/lampWishModel";
import { VillagerIndex, Villagers } from "./villager";
import { CosmoTypeEnum } from "../../enum/cosmoTypeEnum";
import { HoleBuildingBase, initHoleBuildingRepo } from "../../data/HoleBuildingRepo";
import { HoleBuildingModel } from "../../model/holeBuildingModel";
import { initStudyRepo, StudyBase } from "../../data/StudyRepo";
import { StudyModel } from "../../model/studyModel";
import { MeasurementModel } from "../../model/measurementModel";
import { initMeasurementRepo, MeasurementBase } from "../../data/MeasurementRepo";
import { initMonumentRepo } from "../../data/MonumentRepo";
import { MonumentBonusModel } from "../../model/monumentBonusModel";
import { MonumentUnlockModel } from "../../model/monumentUnlockModel";
import { BellImprovementModel } from "../../model/bellImprovementModel";
import { initBellImprovementRepo } from "../../data/BellImprovementRepo";
import { Well } from "./well";
import { lavaLog } from "../../../utility";
import { TaskBoard } from "../../tasks";
import { Tome } from "../../tome";
import { Farming } from "../../world-6/farming";
import { Slab } from "../../slab";
import { Deathnote } from "../../deathnote";
import { BellBonusModel } from "../../model/bellBonusModel";
import { initBellBonusRepo } from "../../data/BellBonusRepo";
import { initHarpNotesRepo } from "../../data/HarpNotesRepo";
import { HarpStringModel } from "../../model/harpStringModel";
import { initHarpStringsRepo } from "../../data/HarpStringsRepo";

export class Villager {
    level: number = 0;
    currentExp: number = 0;
    opals: number = 0;
    gemshopUpgrade: boolean = false;
    constructor(public index: number, public name: string, public title: string) { }
}

export class Wish {
    wishCount: number = 0;

    constructor(public index: number, public data: LampWishModel) {}

    static fromBase(data: LampWishBase[]) {
        return data.map(d => new Wish(d.index, d.data));
    }
}

export class CosmoUpgrade {
    unlocked: boolean = false;
    level: number = 0;

    constructor(public index: number, public data: CosmoUpgradeModel) { 
        this.data.name = this.data.name.replace(/_/g, " ");
        this.data.desc = this.data.desc.replace(/_/g, " ");
    }

    static fromBase(data: CosmoUpgradeBase[]) {
        return data.filter(d => d.data.name != "Confused_Bonus").map(d => {
            // Special handling for Pocket Divinity upgrade
            if (d.index == 21) {
                return new PocketDivinityUpgrade(d.index, d.data);
            }
            return new CosmoUpgrade(d.index, d.data);
        });
    }

    getBonus(): number {
        // Special case: Forge upgrade.
        if (this.index === 22 ) {
            return Math.floor(Math.max(1, Math.pow(3, this.level)));
        }
        // Default: perLvl * level
        return Math.floor((this.data.perLvl ?? 1) * this.level);
    }

    // This is pretty messy but meh.
    getDescription(): string {
        // If we have a multiplier
        if (this.data.desc.includes(" x")) {
            // Special case for Beeg Beeg Forge
            if (this.data.name == "Beeg Beeg Forge") {
                return this.data.desc.replace(/ x/g, ` ${(this.getBonus())}x`);
            }
            return this.data.desc.replace(/ x/g, ` ${(1 + (this.getBonus() / 100)).toFixed(0)}x`);
        }
        // If we have a percentage
        if (this.data.desc.includes("+%")) {
            return this.data.desc.replace(/\+%/g, `+${this.getBonus().toFixed(0)}%`);
        }
        // Everything else.
        return this.data.desc.replace(/[{}]/g, this.getBonus().toFixed(0));
    }
}


export class PocketDivinityUpgrade extends CosmoUpgrade {
    linkedGods: number[] = [];

    constructor(public index: number, public data: CosmoUpgradeModel) {
        super(index, data);
    }
}

export class Majiks {
    HoleUpgrades: CosmoUpgrade[] = [];
    VillageUpgrades: CosmoUpgrade[] = [];
    IdleonUpgrades: CosmoUpgrade[] = [];

    constructor() { 
        const allUpgrades = CosmoUpgrade.fromBase(initCosmoUpgradeRepo());
        this.HoleUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType == CosmoTypeEnum.Hole);
        this.VillageUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType == CosmoTypeEnum.Village);
        this.IdleonUpgrades = allUpgrades.filter(upgrade => upgrade.data.cosmoType == CosmoTypeEnum.Idleon);
    }
}

export class Schematic {
    unlocked: boolean = false;
    
    // Data references populated during parsing
    sedimentMulti: number[] = [];
    wellSediment: number[] = [];
    extraCalculations: number[] = [];
    bellImprovementMethods: number[] = [];
    
    // Study bonus value
    studyBolaiaBonuses: number = 0;
    
    
    // Cached calculations for performance
    private sedimentSum?: number;
    private bellSum?: number;

    constructor(public index: number, public data: HoleBuildingModel) { }

    static fromBase(data: HoleBuildingBase[]) {
        return data.map(d => new Schematic(d.index, d.data));
    }

    // TODO: Investigate what baseMultiplier should be - appears to be variable 'i' in original code
    // TODO: This seems to be in-accurate, needs a second pass.
    getBonus(baseMultiplier: number = 1): number {
        // Return 0 if not unlocked
        if (!this.unlocked) {
            return 0;
        }

        // TODO: Provide more context for some of the bonuses / extra calculations instead of just the index
        switch (this.index) {
            case 14: // Sediment-based bonus
                return this.getSedimentBonus();
                
            case 45: // Bell improvement bonus
                return this.getBellBonus();
                
            case 46: // 5x extraCalculations[26]
                return 5 * (this.extraCalculations[26] || 0);
                
            case 47: // 25x extraCalculations[26]
                return 25 * (this.extraCalculations[26] || 0);
                
            case 48: // 10x extraCalculations[26]
                return 10 * (this.extraCalculations[26] || 0);
                
            case 49: // Complex formula with recursive schematic calls
                return this.resourceLayersBonus(baseMultiplier);
                
            case 52: // 60 * LOG(wellSediment[0])
                return 60 * Math.floor(lavaLog(this.wellSediment[0] || 0));
                
            case 53: // 4 * LOG(wellSediment[13])
                return 4 * Math.floor(lavaLog(this.wellSediment[13] || 0));
                
            case 54: // 1.2^LOG(wellSediment[15])
                return Math.pow(1.2, Math.floor(lavaLog(this.wellSediment[15] || 0)));
                
            case 55: // 10 * LOG(wellSediment[11])
                return 10 * Math.floor(lavaLog(this.wellSediment[11] || 0));
                
            case 56: // 1.3^LOG(wellSediment[2])
                return Math.pow(1.3, Math.floor(lavaLog(this.wellSediment[2] || 0)));
                
            case 57: // 20 * LOG(wellSediment[1])
                return 20 * Math.floor(lavaLog(this.wellSediment[1] || 0));
                
            case 58: // 5 * LOG(extraCalculations[32])
                return 5 * lavaLog(this.extraCalculations[32] || 0);
                
            case 59: // Sum of extraCalculations[33-36] / 100 * 10
                const sum = (this.extraCalculations[33] || 0) + 
                           (this.extraCalculations[34] || 0) + 
                           (this.extraCalculations[35] || 0) + 
                           (this.extraCalculations[36] || 0);
                return (sum / 100) * 10;
                
            case 82:
            case 83:
            case 84: // All use extraCalculations[55] with base multiplier
                return baseMultiplier * (this.extraCalculations[55] || 0);
                
            default:
                return baseMultiplier; // Base multiplier for unknown schematics
        }
    }

    private getSedimentBonus(): number {
        if (this.sedimentSum === undefined) {
            this.sedimentSum = this.sedimentMulti.slice(0, 10).reduce((sum, val) => sum + (val || 0), 0);
            this.sedimentSum *= (20 + this.studyBolaiaBonuses);
        }
        return this.sedimentSum;
    }

    private getBellBonus(): number {
        if (this.bellSum === undefined) {
            this.bellSum = this.bellImprovementMethods.reduce((sum, val) => sum + (val || 0), 0);
        }
        return Math.max(1, Math.pow(1.1, Math.floor(this.bellSum / 25)));
    }

    private resourceLayersBonus(baseMultiplier: number = 1): number {
        // This bonus is based on the total of the layers you broke through in resource cavrens.
        // +15% All Skill Efficiency, and +10% All Skill EXP gain per resource layer.
        const totalResourceLayers = this.extraCalculations[1] + 
            (this.extraCalculations[3] || 0) +
            (this.extraCalculations[5] || 0);
        
        return baseMultiplier * (totalResourceLayers);
    }

    getDescription(): string {
        const description = this.data.desc.replace(/[{}]/g, this.getBonus().toFixed(2));
        
        // Special dynamic placeholders would need additional logic
        // For now we have placeholder N/A for all dynamic placeholders
/*         if (description.includes("!")) {
            description = description.replace(/!/g, "N/A");
        } 
        if (description.includes("#")) {
            description = description.replace(/\#/g, "N/A");
        }
        if (description.includes("$")) {
            description = description.replace(/\$/g, "N/A");
        }
        if (description.includes("%")) {
            description = description.replace(/\%/g, "N/A");
        }*/

        return description;
    }
}

export class Study {
    level: number = 0;
    unlocked: boolean = false;

    constructor(public index: number, public data: StudyModel) { }

    static fromBase(data: StudyBase[]) {
        return data.map(d => new Study(d.index, d.data));
    }

    // Calculate study bonus
    getBonus(): number {
        // Must have at least level 1 to get bonuses
        if (!this.unlocked) {
            return 0;
        }

        // Special cases for specific studies
        if (this.index === 9) {
            // Study 9 (JUSTICE): 50 + (level × multiplier)
            return 50 + this.level * this.data.multiplier;
        } else if (this.index === 3) {
            // Study 3 (BRAVERY): min(32, 12 + (level × multiplier))
            return Math.min(32, 12 + this.level * this.data.multiplier);
        } else {
            // Default: level × multiplier
            return this.level * this.data.multiplier;
        }
    }

    getDescription(): string {
        if (this.data.description.includes("}x")) {
            return this.data.description.replace(/}/g, (1 + (this.getBonus() / 100)).toFixed(2));
        }
        return this.data.description.replace(/[{}]/g, this.getBonus().toFixed(2));
    }
}

export class Measurement {
    unlocked: boolean = false;
    level: number = 0;
    cosmosBonus: number = 0; // CosmoBonusQTY from cosmos upgrades [TODO]
    
    // Variables for MeasurementQTYfound calculations by measurement type
    gloomieKills: number = 0; // Type 0: Gloomie Kills [DONE]
    cropsCount: number = 0; // Type 1: Crops [DONE]
    accountLevel: number = 0; // Type 2: Account lv [DONE]
    tomeScore: number = 0; // Type 3: Tome score [DONE]
    allSkillLevel: number = 0; // Type 4: All skill lv [DONE]
    // Type 5: Always returns 0
    deathnotePts: number = 0; // Type 6: Deathnote pts [DONE]
    highestDmg: number = 0; // Type 7: Highest DMG [DONE]
    slabItems: number = 0; // Type 8: Slab Items [DONE]
    studiesDone: number = 0; // Type 9: Studies done [DONE]
    golemKills: number = 0; // Type 10: Golem kills [DONE]

    constructor(public index: number, public data: MeasurementModel) { }

    static fromBase(data: MeasurementBase[]) {
        return data.map(d => new Measurement(d.index, d.data));
    }

    /**
     * Calculate the measurement quantity found based on measurement type
     * This determines the multiplier strength for the measurement bonus
     * @param isForMultiplier - If true (99), applies scaling for multiplier calculation
     */
    getMeasurementQTYfound(isForMultiplier: boolean = false): number {
        const measurementType = parseInt(this.data.measurementType.type);
        
        // Calculation logic verified against game source code
        switch (measurementType) {
            case 0: // Gloomie Kills
                return isForMultiplier ? lavaLog(this.gloomieKills) : this.gloomieKills;
                
            case 1: // Crops
                return isForMultiplier ? this.cropsCount / 14 : this.cropsCount;
                
            case 2: // Account lv
                return isForMultiplier ? this.accountLevel / 500 : this.accountLevel;
                
            case 3: // Tome score  
                return isForMultiplier ? this.tomeScore / 2500 : this.tomeScore;
                
            case 4: // All skill lv
                if (isForMultiplier) {
                    return this.allSkillLevel / 5000 + Math.max(0, this.allSkillLevel - 18000) / 1500;
                }
                return this.allSkillLevel;
                
            case 5: // Always 0
                return 0;
                
            case 6: // Deathnote pts
                return isForMultiplier ? this.deathnotePts / 125 : this.deathnotePts;
                
            case 7: // Highest DMG
                return isForMultiplier ? lavaLog(this.highestDmg) / 2 : this.highestDmg;
                
            case 8: // Slab Items
                return isForMultiplier ? this.slabItems / 150 : this.slabItems;
                
            case 9: // Studies done
                return isForMultiplier ? this.studiesDone / 6 : this.studiesDone;
                
            case 10: // Golem kills
                return isForMultiplier ? Math.max(0, lavaLog(this.golemKills) - 2) : this.golemKills;
                
            default:
                return 0;
        }
    }

    /**
     * Calculate the measurement multiplier based on quantity found
     * Uses a progressive scaling system with different rates above/below 5
     */
    getMeasurementMulti(): number {
        const qtyFound = this.getMeasurementQTYfound(true); // Use multiplier scaling
        
        if (qtyFound < 5) {
            // Below 5: 1 + (18% * qtyFound)
            return 1 + (18 * qtyFound) / 100;
        } else {
            // Above 5: 1 + (18% * qtyFound) + (8% * (qtyFound - 5))
            return 1 + (18 * qtyFound + 8 * (qtyFound - 5)) / 100;
        }
    }

    /**
     * Calculate the base bonus for this measurement
     * Based on the measurement's formula and current buff level
     */
    getMeasurementBaseBonus(): number {
        const formula = this.data.formula;
        const formulaType = this.data.formulaType;
        const cosmosMultiplier = 1 + this.cosmosBonus / 100;

        // Check if this is a TOT (total) type measurement
        if (formulaType === "TOT") {
            // Extract the base value from formula (e.g., "45TOT" -> 45)
            const baseValue = parseFloat(formula.replace("TOT", ""));
            
            // For TOT measurements, use the diminishing returns formula
            return cosmosMultiplier * ((baseValue * this.level) / (100 + this.level));
        } else {
            // For regular measurements, use simple multiplication
            const baseValue = parseFloat(formula);
            return cosmosMultiplier * baseValue * this.level;
        }
    }

    getBonus(): number {
        // Calculate the total measurement bonus (base * multiplier)
        return this.getMeasurementBaseBonus() * this.getMeasurementMulti();
    }

    getCost(): number {
        // Formula: (250 + 50 * level) * 1.6^(index - 6 * floor(index / 10)) * 1.1^level
        return (
            (250 + 50 * this.level) *
            Math.pow(1.6, this.index - 6 * Math.floor(this.index / 10)) *
            Math.pow(1.1, this.level)
        );
    }

    getDescription(): string {
        return this.data.description.replace(/[{}]/g, this.getBonus().toFixed(2));
    }
}

export class MonumentBonus {
    level: number = 0;
    monumentSelfBoost: number = 0;
    cosmoBonus: number = 0;

    constructor(public index: number, public data: MonumentBonusModel, public monumentIndex: number) { }

    getBonus(): number {
        // Placeholder variables for required data, to be replaced with actual data sources
        let bonusMultiplier = 1;

        // Apply ROG and Cosmo bonuses if i != 9
        if (this.index !== 9) {
            bonusMultiplier = 1 + this.monumentSelfBoost / 100;
            bonusMultiplier += this.cosmoBonus / 100;
        }

        if (this.data.multiplier < 30) {
            return this.level * this.data.multiplier * Math.max(1, bonusMultiplier);
        } else {
            return (
                0.1 *
                Math.ceil(
                    (this.level / (250 + this.level)) *
                        10 *
                        this.data.multiplier *
                        Math.max(1, bonusMultiplier)
                )
            );
        }
    }

    getDescription(): string {
        if (this.data.description.includes("}x")) {
            return this.data.description.replace(/}/g, (1 + (this.getBonus() / 100)).toFixed(2));
        }
        return this.data.description.replace(/[{}]/g, this.getBonus().toFixed(2));
    }
}

export class MonumentUnlock {
    unlocked: boolean = false;
    constructor(public index: number, public data: MonumentUnlockModel) { }
}

export class Monument {
    hours: number = 0;
    bonuses: MonumentBonus[] = [];  
    unlocks: MonumentUnlock[] = [];

    constructor(
        public index: number,
        public name: string,
        public bonusesData: MonumentBonusModel[],
        public unlocksData: MonumentUnlockModel[],
    ) { 
        this.bonusesData.forEach(bonus => {
            this.bonuses.push(new MonumentBonus(bonus.index, bonus, this.index));
        })
        this.unlocksData.forEach(unlock => {
            this.unlocks.push(new MonumentUnlock(unlock.index, unlock));
        })
    }
}

export class Monuments {
    monuments: Record<string, Monument> = {}
    constructor() {
        const data = initMonumentRepo();
        data.forEach(monument => {
            this.monuments[monument.data.name] = new Monument(monument.index, monument.data.name, monument.data.bonuses, monument.data.unlocks);
        })
    }
}

export class BellImprovement {
    level: number = 0;

    constructor(public index: number, public data: BellImprovementModel) { }
}

export class BellBonus {
    level: number = 0;

    constructor(public index: number, public data: BellBonusModel) { }

 /*    if ("BellUpgAfford" == e)
        return (
            0 == t
                ? ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Money")), (e.h.HoleozDN = s))
                : 1 == t
                  ? ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Holes")[9][3]), (e.h.HoleozDN = s))
                  : 2 == t
                    ? ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Gaming")[0]), (e.h.HoleozDN = s))
                    : 3 == t
                      ? ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Holes")[9][14]), (e.h.HoleozDN = s))
                      : 4 == t
                        ? ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Divinity")[39]), (e.h.HoleozDN = s))
                        : 5 == t && ((e = a.engine.getGameAttribute("DNSM")), (s = a.engine.getGameAttribute("Holes")[9][25]), (e.h.HoleozDN = s)),
            c.asNumber(a.engine.getGameAttribute("DNSM").h.HoleozDN) >= n._customBlock_Holes("BellCosts", t, 0) ? 1 : 0
        );
    if ("BellCosts" == e)
        return 0 == t
            ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[42][0 | t]) * Math.pow(1.25, c.asNumber(a.engine.getGameAttribute("Holes")[16][0 | t]))
            : 2 == t
              ? c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[42][0 | t]) * Math.pow(1.5, c.asNumber(a.engine.getGameAttribute("Holes")[16][0 | t]))
              : c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[42][0 | t]) * Math.pow(1.1, c.asNumber(a.engine.getGameAttribute("Holes")[16][0 | t]));
    if ("BellBonuss" == e) return c.asNumber(a.engine.getGameAttribute("Holes")[17][0 | t]) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.HolesInfo[59][Math.round(2 * t + 1)]); */

    getBonus(): number {
        return this.level * parseFloat(this.data.value);
    }

    getDescription(): string {
        if (this.data.description.includes("}x")) {
            return this.data.description.replace(/}/g, (1 + (this.getBonus() / 100)).toFixed(2));
        }
        return this.data.description.replace(/[{}]/g, this.getBonus().toFixed(2));
    }
}




export class Bell {
    // TODO: Improvement logic / costs / speed / exp per hour etc not done.
    improvements: BellImprovement[] = [];
    bonuses: BellBonus[] = [];
    // TODO: Think if we need bell actions.
    
    constructor() { 
        const improvementData = initBellImprovementRepo();
        improvementData.forEach(improvement => {
            this.improvements.push(new BellImprovement(improvement.index, improvement.data));
        })
        const bonusData = initBellBonusRepo();
        bonusData.forEach(bonus => {
            this.bonuses.push(new BellBonus(bonus.index, bonus.data));
        })
    }
}

export class ResourceCavren {
    layer: number = 0;
    resourceExtracted: number = 0;
    efficiencyType: string = "";

    constructor(public index: number, public name: string, public resource: string) {
        switch(resource) {
            case "Ores":
                this.efficiencyType = "Mining";
                break;
            case "Bugs":
                this.efficiencyType = "Catching";
                break;
            case "Logs":
                this.efficiencyType = "Chopping";
                break;
            default:
                this.efficiencyType = "";
                break;
        }
     }
}

export class ResourceCavrens {
    cavrens: Record<string, ResourceCavren> = {
        "Motherload": new ResourceCavren(0, "Motherload", "Ores"),
        "The Hive": new ResourceCavren(1, "The Hive", "Bugs"),
        "Evertree": new ResourceCavren(2, "Evertree", "Logs"),

    }
}

export class HarpString {
    level: number = 0;
    unlocked: boolean = false;
    constructor(public index: number, public data: HarpStringModel) { }

    getBonus(): number {
        return 0;
    }

    getDescription(): string {
        if (this.data.description.includes("}x")) {
            return this.data.description.replace(/}/g, (1 + (this.getBonus() / 100)).toFixed(2));
        }
        return this.data.description.replace(/[{}]/g, this.getBonus().toFixed(2));
    }
}

export class Harp {
    notes: { name: string, index: number, current: number }[] = [];
    strings: HarpString[] = [];
    stringCount = 0;

    constructor() { 
        const harpNotes = initHarpNotesRepo();
        harpNotes.forEach(note => {
            this.notes.push({ name: note.data.noteName, index: note.index, current: 0 });
        })
        const harpStrings = initHarpStringsRepo();
        harpStrings.forEach(string => {
            this.strings.push(new HarpString(string.index, string.data));
        })
    }

    parse(holeData: number[][]): void {
        const noteData = holeData[9].slice(10, 20);
        this.notes.forEach((note, index) => {
            note.current = noteData[index];
        })

        const stringData = holeData[19];
        this.strings.forEach((string, index) => {
            string.level = stringData[2 * index];
            // TODO: Verify this.
            string.unlocked = string.level > 0;
        })
    }
}

export class Lamp {
    wishes: Wish[] = [];
    // This is hard-coded in the game, can move to the repo maybe.
    specialBonusArray = "25,10,8;15,40,10;20,35,12;1,1,1;2,2,2".split(";");

    constructor() {
        this.wishes = Wish.fromBase(initLampWishRepo());
    }

    getBonus(holeBonus: boolean = false, specialIndex?: number, inlineIndex?: number): number {
        // This implementation is pretty odd so writing some notes.
        // 1. Wish 7 gives bonus of 25 * wishCount for hold related resources.
        // 2. Everything else comes from a weird string which is indexed on 2 indexes.

        // TODO: Wonder if we should make this code nicer at some point.
        if (holeBonus) {
            return 25 * this.wishes[7].wishCount;
        }

        if (specialIndex != undefined && inlineIndex != undefined) {
            const wishIndex = Math.min(11, Math.round(4 + 2 * specialIndex));
            return Number(this.specialBonusArray[specialIndex].split(",")[inlineIndex]) * this.wishes[wishIndex].wishCount;
        }

        return 0;
    }
}


export class Hole extends Domain {
    // Raw
    playerLocationData: number[] = []

    // Processed
    villagers: Villager[] = Villagers.getVillagers();
    majiks = new Majiks();
    schematics: Schematic[] = Schematic.fromBase(initHoleBuildingRepo());
    studies: Study[] = Study.fromBase(initStudyRepo());
    measurements: Measurement[] = Measurement.fromBase(initMeasurementRepo());
    monuments: Monuments = new Monuments();
    bell: Bell = new Bell();
    well: Well = new Well();
    resourceCavrens = new ResourceCavrens();
    harp: Harp = new Harp();
    lamp: Lamp = new Lamp();
    // TODO: 
    // Well - DONE?
    // Caverns
    // Engineer - DONE?
    // Bravery
    // Bell
    // Wishes - DONE?
    // Harp?
    // Measurement?

    // Get the bonus for a specific schematic by index
    getSchematicBonus(schematicIndex: number, baseMultiplier: number = 1): number {
        const schematic = this.schematics.find(s => s.index === schematicIndex);
        return schematic?.getBonus(baseMultiplier) || 0;
    }

    /**
     * Get study bonus
     * @param studyIndex - Index of the study to get bonus for
     */
    getStudyBolaiaBonuses(studyIndex: number): number {
        const study = this.studies.find(s => s.index === studyIndex);
        return study?.getBonus() || 0;
    }

    getMonumentBonus(monumentName: string, bonusIndex: number): number {
        const monument = this.monuments.monuments[monumentName];
        return monument.bonuses.find(bonus => bonus.index == bonusIndex)?.getBonus() ?? 0;
    }

    getMonumentBonusByText(text: string): number {
        const allBonuses = Object.values(this.monuments.monuments).flatMap(monument => monument.bonuses);
        return allBonuses.reduce((sum, bonus) => {
            if (bonus.data.description.includes(text)) {
                return sum + bonus.getBonus();
            }
            return sum;
        }, 0);
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Holes", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const hole = data.get(this.getDataKey()) as Hole;
        const holeData = data.get("Holes") as number[][];

        // Old accounts won't have data, so exit early.
        if (!holeData || holeData.length == 0) {
            return;
        }

        hole.playerLocationData = holeData[0];
        hole.villagers.forEach(villager => {
            villager.level = holeData[1][villager.index];
            villager.currentExp = holeData[2][villager.index];
            villager.opals = holeData[3][villager.index];
            villager.gemshopUpgrade = holeData[23][villager.index] == 1;
        });

        // Parse cosmo upgrades based on their type
        hole.majiks.HoleUpgrades.forEach((upgrade, index) => {
            upgrade.level = holeData[4][index];
            upgrade.unlocked = upgrade.level > 0;
        });

        hole.majiks.VillageUpgrades.forEach((upgrade, index) => {
            upgrade.level = holeData[5][index];
            upgrade.unlocked = upgrade.level > 0;
        }); 

        hole.majiks.IdleonUpgrades.forEach((upgrade, index) => {
            upgrade.level = holeData[6][index];
            upgrade.unlocked = upgrade.level > 0;

            if (upgrade.index == 21) {
                const pocketUpgrade = upgrade as PocketDivinityUpgrade;
                if (pocketUpgrade.level >= 1) {
                    pocketUpgrade.linkedGods.push(holeData[11][29]);
                }
                if (pocketUpgrade.level == 2) {
                    pocketUpgrade.linkedGods.push(holeData[11][30]);
                }
            }
        });

        hole.lamp.wishes.forEach(wish => {
            wish.wishCount = holeData[21][wish.index];
        });

        
        hole.studies.forEach(study => {
            study.level = holeData[26] ? holeData[26][study.index] || 0 : 0;
            study.unlocked = hole.villagers[VillagerIndex.Bolai].level > study.index;
        });

        hole.schematics.forEach(schematic => {
            schematic.unlocked = holeData[13][schematic.index] == 1;
            
            // Populate data references for bonus calculations
            schematic.sedimentMulti = holeData[8] || [];
            schematic.wellSediment = holeData[9] || [];
            schematic.extraCalculations = holeData[11] || [];
            schematic.bellImprovementMethods = holeData[16] || [];
            
            // Populate study bonus for sediment calculation
            schematic.studyBolaiaBonuses = hole.getStudyBolaiaBonuses(0);
        });

        hole.measurements.forEach(measurement => {
            measurement.level = holeData[22] ? holeData[22][measurement.index] || 0 : 0;
            measurement.unlocked = hole.villagers[VillagerIndex.Minau].level > measurement.index;
            
            measurement.gloomieKills = holeData[11][28] || 0;
            measurement.golemKills = holeData[11][63] || 0;            
            // Sum all studies for studiesDone
            measurement.studiesDone = hole.studies.reduce((sum, value) => sum + (value.level || 0), 0);
            // Cosmo Bonus - Lengthmeister
            measurement.cosmosBonus = hole.majiks.VillageUpgrades.find(upgrade => upgrade.index == 12)?.getBonus() || 0;
        });

        // Monument Jazz
        const braveryMonument = hole.monuments.monuments["Bravery"];
        braveryMonument.hours = holeData[14][2 * braveryMonument.index] || 0;

        const justiceMonument = hole.monuments.monuments["Justice"];
        justiceMonument.hours = holeData[14][2 * justiceMonument.index] || 0;
            
        const wisdomMonument = hole.monuments.monuments["Wisdom"];
        wisdomMonument.hours = holeData[14][2 * wisdomMonument.index] || 0;

        [braveryMonument, justiceMonument, wisdomMonument].forEach(monument => {
            monument.unlocks.forEach(unlock => {
                unlock.unlocked = monument.hours > unlock.data.hours_required;
            });
            monument.bonuses.forEach(bonus => {
                bonus.level = holeData[15][10 * monument.index + bonus.index] || 0;
                // Monumental Vibes
                bonus.cosmoBonus = hole.majiks.HoleUpgrades.find(upgrade => upgrade.index == 0)?.getBonus() || 0;
                bonus.monumentSelfBoost = monument.bonuses[9].getBonus();
            });
        });

        // Bell 
        hole.bell.improvements.forEach(improvement => {
            improvement.level = holeData[16][improvement.index] || 0;
        });
        hole.bell.bonuses.forEach(bonus => {
            bonus.level = holeData[17][bonus.index] || 0;
        });

        // Resource Cavrens
        // TODO: Calculate required efficiency, and required resource for next layer.
        Object.entries(hole.resourceCavrens.cavrens).forEach(([_, cavren]) => {
            cavren.layer = holeData[11][cavren.index * 2 + 1] || 0;
            cavren.resourceExtracted = holeData[11][cavren.index * 2] || 0;
        });

        hole.well.parse(hole, holeData);
        // TODO: Finish this, missing information
        hole.harp.parse(holeData);
    }
}

export const updateHole = (data: Map<string, any>) => {
    const hole = data.get("hole") as Hole;
    const slab = data.get("slab") as Slab;
    const taskboard = data.get("taskboard") as TaskBoard;
    const tome = data.get("tome") as Tome;
    const farming = data.get("farming") as Farming;
    const deathnote = data.get("deathnote") as Deathnote;

    // Update measurements with various cross domain data
    hole.measurements.forEach(measurement => {
        measurement.slabItems = slab.rawObtainedCount;
        measurement.highestDmg = taskboard.tasks.find(task => task.name == "Road to Max Damage")?.count || 0;
        // TODO: Tome score isn't correct right now, need to update it.
        measurement.tomeScore = tome.getHighestScore();
        measurement.cropsCount = farming.discoveredCrops;
        measurement.accountLevel = tome.totalAccountLevel;
        // TODO: Make this less messy one day, for now should be fine.
        measurement.allSkillLevel = parseInt(tome.lines[11].getPlayerCurrentValueDisplay(0));
        // TODO: This doesn't work on load, investigate why.
        measurement.deathnotePts = deathnote.getTotalRank();
    });
}
