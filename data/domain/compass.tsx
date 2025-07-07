import { nFormatter } from "../utility";
import { lavaLog } from "../utility";
import { Arcade } from "./arcade";
import { Domain, RawData } from "./base/domain";
import { 
    EfficiencyUpgrade, 
    EfficiencyDomain, 
    EfficiencyEngine, 
    EfficiencyCalculator
} from "../../lib/efficiencyEngine/efficiencyEngine";
import { CompassUpgradeBase, initCompassUpgradeRepo } from "./data/CompassUpgradeRepo";
import { initRandoListRepo } from "./data/RandoListRepo";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { CompassUpgradeModel } from "./model/compassUpgradeModel";
import { Player } from "./player";
import { Sneaking } from "./world-6/sneaking";

export enum WeaknessType {
    Fire = 0,
    Wind = 1,
    Grass = 2,
    Ice = 3
}
  
export enum DustType {
    Stardust = 0,
    Moondust = 1,
    Solardust = 2,
    Cooldust = 3,
    Novadust = 4
  }

// Compass efficiency result structure (for backward compatibility)
interface CompassEfficiencyResult {
    upgrade: CompassUpgrade;
    valueIncrease: number;
    dustCost: number;
    efficiency: number;
}

// Helper function to add meta-upgrades that boost circle-shaped upgrades
function addMetaUpgradesIfRelevant(baseIds: number[], compass: Compass): number[] {
    const result = [...baseIds];
    
    // Check if any of the base upgrades are circle-shaped (x5 = 1)
    const hasCircleUpgrades = baseIds.some(id => {
        const upgrade = compass.upgrades.find(u => u.id === id);
        return upgrade?.data.x5 === 1;
    });
    
    if (hasCircleUpgrades) {
        // Add Circle Supremacy (39) and Abomination Slayer XXI (80) if not already included
        if (!result.includes(39)) result.push(39);
        if (!result.includes(80)) result.push(80);
    }
    
    // Always include general cost reduction upgrades since they affect all upgrades
    if (!result.includes(36)) result.push(36); // Knockoff Compass - all compass upgrades cheaper
    if (!result.includes(77)) result.push(77); // Abomination Slayer XVIII - cheaper compass upgrade costs
    
    return result;
}

// Damage efficiency calculator implementation
class DamageEfficiencyCalculator implements EfficiencyCalculator<Compass> {
    name = "Tempest Damage";
    
    getRelevantUpgradeIds(domain: Compass): number[] {
        const baseIds = [
            // Flat damage bonuses
            14, 15, 24, 60, 81,
            // Percentage damage bonuses
            119, 10, 121, 122, 123, 126, 127, 129, 130, 132, 135, 64, 78, 85, 94,
            // Special multiplier bonuses
            23, // Cooldust hoarding
            26, // Mastery completion  
            6   // Medallion bonus
        ];
        
        // Add meta-upgrades that boost circle-shaped upgrades if any of our base upgrades are circle-shaped
        return addMetaUpgradesIfRelevant(baseIds, domain);
    }
    
    calculateCurrentValue(domain: Compass): number {
        return domain.calculateTempestDamage();
    }
    
    calculateValueWithUpgrade(domain: Compass, simulatedUpgrades: EfficiencyUpgrade[], upgradeId: number, simulatedResources: Record<number, number>): number {
        // Create a working copy of the simulated upgrades with the specified upgrade at +1 level
        const tempUpgrades = simulatedUpgrades.map(u => domain.copyUpgrade(u)) as CompassUpgrade[];
        const targetUpgrade = tempUpgrades.find(u => u.id === upgradeId);
        
        if (!targetUpgrade) return this.calculateCurrentValue(domain);
        
        targetUpgrade.level += 1;
        domain.recalculateUpgrades(tempUpgrades);
        
        // Convert simulatedResources to DustType format
        const simulatedAvailableDust = simulatedResources as Record<DustType, number>;
        
        // Calculate damage with temporary upgrades
        return domain.calculateDamageWithUpgrades(tempUpgrades, simulatedAvailableDust);
    }
}

// Dust efficiency calculator implementation
class DustEfficiencyCalculator implements EfficiencyCalculator<Compass> {
    name = "Dust Multiplier";
    
    getRelevantUpgradeIds(domain: Compass): number[] {
        const baseIds = [
            // Direct dust multiplier bonuses
            31,  // Mountains of Dust
            34,  // Solardust Hoarding
            38,  // Spire of Dust
            // Additive dust bonuses
            139, // De Dust I
            142, // De Dust II
            145, // De Dust III
            148, // De Dust IV
            150, // De Dust V
            68,  // Abomination Slayer IX
            93,  // Abomination Slayer XXXIV
            89   // Abomination Slayer XXX
        ];
        
        // Add meta-upgrades that boost circle-shaped upgrades if any of our base upgrades are circle-shaped
        return addMetaUpgradesIfRelevant(baseIds, domain);
    }
    
    calculateCurrentValue(domain: Compass): number {
        // Use default values for external bonuses since they don't change with compass upgrades
        return domain.calculateDustMultiplier();
    }
    
    calculateValueWithUpgrade(domain: Compass, simulatedUpgrades: EfficiencyUpgrade[], upgradeId: number, simulatedResources: Record<number, number>): number {
        // Create a working copy of the simulated upgrades with the specified upgrade at +1 level
        const tempUpgrades = simulatedUpgrades.map(u => domain.copyUpgrade(u)) as CompassUpgrade[];
        const targetUpgrade = tempUpgrades.find(u => u.id === upgradeId);
        
        if (!targetUpgrade) return this.calculateCurrentValue(domain);
        
        targetUpgrade.level += 1;
        domain.recalculateUpgrades(tempUpgrades);
        
        // Convert simulatedResources to DustType format
        const simulatedAvailableDust = simulatedResources as Record<DustType, number>;
        
        // Calculate dust multiplier with temporary upgrades
        return domain.calculateDustWithUpgrades(tempUpgrades, simulatedAvailableDust);
    }
}



export class CompassUpgrade implements EfficiencyUpgrade {
    public level: number = 0;
    public unlocked: boolean = false;
    public bonus: number = 0;
    public cost: number = 0;
    public costToMax: number = 0;
    public costToUnlock: number = 0; // Cost to unlock this upgrade if it's locked

    public indexInPath: number = 0;

    public dustServerVarMultiplier: number = 1;

    constructor(
        public id: number,
        public data: CompassUpgradeModel,
    ) { }

    static fromBase = (data: CompassUpgradeBase[]): CompassUpgrade[] => {
        return data.map((upgrade, index) => new CompassUpgrade(
            index,
            upgrade.data
        ));
    }

    getImageData = (): ImageData => {
        // We default to upgrade 0 for the image.
        let location = `CompassUpg0`;
        // If index is less than 106, it's a normal upgrade.
        if (this.id < 106) {
            location = `CompassUpg${this.id}`;
        } else if (Object.keys(CompassIconz).includes(this.id.toString())) {
            // If index is greater than 106, and it's in the CompassIconz object, it's a special upgrade.
            location = `CompassUpg${parseInt(CompassIconz[this.id]) + 106}`;
        }

        return {
            location: location,
            height: 57,
            width: 57,
        }
    }

    getBonus = (allUpgrades: CompassUpgrade[]): number => {
        if (this.level === 0) {
            return 0;
        }

        // Base bonus calculation
        let bonus = this.level * this.data.bonusValue;

        // Special case for upgrades with special flag (CompassUpg[t][9] == 1)
        if (this.data.x5 === 1) {
            const bonus39 = allUpgrades.find(u => u.id === 39)?.bonus || 0;
            const bonus80 = allUpgrades.find(u => u.id === 80)?.bonus || 0;
            bonus *= (1 + (bonus39 + bonus80) / 100);
        }
        // Special case for upgrade ID 45
        else if (this.id === 45) {
            bonus *= Math.pow(2, Math.floor(this.level / 50));
        }

        return bonus;
    }

    getCost = (allUpgrades: EfficiencyUpgrade[], ...args: any[]): number => {
        const compassUpgrades = allUpgrades as unknown as CompassUpgrade[];
        const upgradeMetadata = args[0] as Record<string, { pathLevel: number, pathUpgrades: number[] }>;
        
        if (this.level >= this.data.maxLevel) {
            return 0;
        }



        // Base dust cost from server variable
        const baseDustCost = Math.max(this.dustServerVarMultiplier, 1);

        // Special cost reductions for specific upgrade IDs
        let costReduction = 1;
        switch (this.id) {
            case 45:
                // Uses bonuses from upgrades 151, 152, 153
                const bonus151 = compassUpgrades.find(u => u.id === 151)?.getBonus(compassUpgrades) || 0;
                const bonus152 = compassUpgrades.find(u => u.id === 152)?.getBonus(compassUpgrades) || 0;
                const bonus153 = compassUpgrades.find(u => u.id === 153)?.getBonus(compassUpgrades) || 0;
                costReduction = 1 + (bonus151 + (bonus152 + bonus153)) / 100;
                break;
            case 43:
                // Uses bonuses from upgrades 154, 156
                const bonus154 = compassUpgrades.find(u => u.id === 154)?.getBonus(compassUpgrades) || 0;
                const bonus156 = compassUpgrades.find(u => u.id === 156)?.getBonus(compassUpgrades) || 0;
                costReduction = 1 + (bonus154 + bonus156) / 100;
                break;
            case 48:
                // Uses bonuses from upgrades 155, 157, 158
                const bonus155 = compassUpgrades.find(u => u.id === 155)?.getBonus(compassUpgrades) || 0;
                const bonus157 = compassUpgrades.find(u => u.id === 157)?.getBonus(compassUpgrades) || 0;
                const bonus158 = compassUpgrades.find(u => u.id === 158)?.getBonus(compassUpgrades) || 0;
                costReduction = 1 + (bonus155 + (bonus157 + bonus158)) / 100;
                break;
            case 57:
                // Uses bonuses from upgrades 159, 160, 161, 168
                const bonus159 = compassUpgrades.find(u => u.id === 159)?.getBonus(compassUpgrades) || 0;
                const bonus160 = compassUpgrades.find(u => u.id === 160)?.getBonus(compassUpgrades) || 0;
                const bonus161 = compassUpgrades.find(u => u.id === 161)?.getBonus(compassUpgrades) || 0;
                const bonus168 = compassUpgrades.find(u => u.id === 168)?.getBonus(compassUpgrades) || 0;
                costReduction = 1 + (bonus159 + (bonus160 + (bonus161 + bonus168))) / 100;
                break;
            case 51:
                // Uses bonuses from upgrades 162, 163, 164, 166, 167
                const bonus162 = compassUpgrades.find(u => u.id === 162)?.getBonus(compassUpgrades) || 0;
                const bonus163 = compassUpgrades.find(u => u.id === 163)?.getBonus(compassUpgrades) || 0;
                const bonus164 = compassUpgrades.find(u => u.id === 164)?.getBonus(compassUpgrades) || 0;
                const bonus166 = compassUpgrades.find(u => u.id === 166)?.getBonus(compassUpgrades) || 0;
                const bonus167 = compassUpgrades.find(u => u.id === 167)?.getBonus(compassUpgrades) || 0;
                costReduction = 1 + (bonus162 + (bonus163 + (bonus164 + (bonus166 + bonus167)))) / 100;
                break;
            case 54:
                // Uses bonuses from upgrades 165, 169
                const bonus165 = compassUpgrades.find(u => u.id === 165)?.getBonus(compassUpgrades) || 0;
                const bonus169 = compassUpgrades.find(u => u.id === 169)?.getBonus(compassUpgrades) || 0;
                costReduction = 1 + (bonus165 + bonus169) / 100;
                break;
        }

        // General cost reduction from CompassBonus upgrades 36 and 77
        const bonus36 = compassUpgrades.find(u => u.id === 36)?.getBonus(compassUpgrades) || 0;
        const bonus77 = compassUpgrades.find(u => u.id === 77)?.getBonus(compassUpgrades) || 0;
        const generalCostReduction = 1 / (1 + (bonus36 + bonus77) / 100);

        // Base cost from upgrade data
        const baseCost = this.data.baseCost / 2;

        // Get the path length for scaling factor calculation
        let pathLength = 0;
        if (this.data.upgradeType && Object.keys(upgradeMetadata).includes(this.data.upgradeType)) {
            pathLength = upgradeMetadata[this.data.upgradeType].pathUpgrades.length;
        }

        // Scaling factor based on upgrade position in path
        const scalingFactor = Math.pow(3.2 - pathLength / 60, this.indexInPath);

        // Final cost calculation
        const cost = baseDustCost * 
            (1 / Math.max(1, costReduction)) * 
            generalCostReduction * 
            baseCost * 
            scalingFactor * 
            Math.pow(this.data.costMult, this.level);

        return cost;
    }

    getCostType(): number {
        return this.data.dustType;
    }

    getCostToMax = (allUpgrades: CompassUpgrade[], upgradeMetadata: Record<string, { pathLevel: number, pathUpgrades: number[] }>): number => {
        // Don't accidently calculate the cost to max for upgrades with max level 999999
        if (this.data.maxLevel >= 999999) {
            return 0;
        }

        let totalCost = 0;
        const tempUpgrade = new CompassUpgrade(this.id, this.data);
        tempUpgrade.level = this.level;

        for (let i = this.level; i < this.data.maxLevel; i++) {
            totalCost += tempUpgrade.getCost(allUpgrades, upgradeMetadata);
            tempUpgrade.level++;
        }

        return totalCost;
    }

    getCostForNextNLevels = (allUpgrades: CompassUpgrade[], levels: number, upgradeMetadata: Record<string, { pathLevel: number, pathUpgrades: number[] }>): number => {
        let totalCost = 0;
        const tempUpgrade = new CompassUpgrade(this.id, this.data);
        // Preserve all necessary fields from the original upgrade
        tempUpgrade.level = this.level;
        tempUpgrade.indexInPath = this.indexInPath;
        tempUpgrade.dustServerVarMultiplier = this.dustServerVarMultiplier;
        tempUpgrade.unlocked = this.unlocked;

        // Only calculate up to max level or the specified number of levels, whichever is smaller
        const levelsToCalculate = Math.min(levels, this.data.maxLevel - this.level);
        
        for (let i = 0; i < levelsToCalculate; i++) {
            // Calculate cost for current level before incrementing
            const currentLevelCost = tempUpgrade.getCost(allUpgrades, upgradeMetadata);
            totalCost += currentLevelCost;
            tempUpgrade.level++;
        }

        return totalCost;
    }

    getCostToUnlock = (allUpgrades: CompassUpgrade[], upgradeMetadata: Record<string, { pathLevel: number, pathUpgrades: number[] }>): number => {
        // If already unlocked, no cost to unlock
        if (this.unlocked) {
            return 0;
        }

        // If not part of a path, should be unlocked by default
        if (!this.data.upgradeType || !Object.keys(upgradeMetadata).includes(this.data.upgradeType)) {
            return 0;
        }

        const pathData = upgradeMetadata[this.data.upgradeType];
        const currentPathLevel = pathData.pathLevel;
        const requiredPathLevel = this.indexInPath + 1; // Need to reach this level to unlock

        // If already at or past required level, no cost
        if (currentPathLevel >= requiredPathLevel) {
            return 0;
        }

        // Special case for Abomination path - can't be leveled up with dust
        if (this.data.upgradeType === "Abomination") {
            return 0; // Cannot calculate cost as it depends on killing abominations
        }

        // Find the path level upgrade that controls this path
        let pathLevelUpgradeId: number;
        switch (this.data.upgradeType) {
            case "Elemental":
                pathLevelUpgradeId = 1;
                break;
            case "Fighter":
                pathLevelUpgradeId = 13;
                break;
            case "Survival":
                pathLevelUpgradeId = 27;
                break;
            case "Nomadic":
                pathLevelUpgradeId = 40;
                break;
            default:
                return 0; // Unknown path type
        }

        // Find the path level upgrade
        const pathLevelUpgrade = allUpgrades.find(u => u.id === pathLevelUpgradeId);
        if (!pathLevelUpgrade) {
            return 0;
        }

        // Calculate cost to level up the path level upgrade from current level to required level
        const levelsNeeded = requiredPathLevel - currentPathLevel;
        return pathLevelUpgrade.getCostForNextNLevels(allUpgrades, levelsNeeded, upgradeMetadata);
    }

    getDescription = (): string => {
        let description = this.data.description;

        // Replace placeholders in the description
        if (description.includes('{')) {
            description = description.replace('{', this.bonus.toFixed(0));
        }
        if (description.includes('}')) {
            description = description.replace('}', nFormatter(1 + this.bonus / 100, "MultiplierInfo"));
        }

        return description;
    }

    // EfficiencyUpgrade interface methods
    getId(): number {
        return this.id;
    }

    getLevel(): number {
        return this.level;
    }

    setLevel(level: number): void {
        this.level = level;
    }

    isUnlocked(): boolean {
        return this.unlocked;
    }

    getName(): string {
        return this.data.name;
    }

    getMaxLevel(): number {
        return this.data.maxLevel;
    }

    // Compass doesn't use unlock requirements like Grimoire/Tesseract
    getUnlockRequirement(): number | undefined {
        return undefined;
    }

    copyUpgrade(): EfficiencyUpgrade {
        const copy = new CompassUpgrade(this.id, this.data);
        copy.level = this.level;
        copy.unlocked = this.unlocked;
        copy.bonus = this.bonus;
        copy.cost = this.cost;
        copy.costToMax = this.costToMax;
        copy.costToUnlock = this.costToUnlock;
        copy.indexInPath = this.indexInPath;
        copy.dustServerVarMultiplier = this.dustServerVarMultiplier;
        return copy;
    }
}

export class Compass extends Domain implements EfficiencyDomain {
    upgrades: CompassUpgrade[] = [];

    totalCompassLevel: number = 0;
    totalDustsCollected: number = 0;

    upgradeMetadata: Record<string, { pathLevel: number, pathUpgrades: number[] }> = {};

    // Resource counts
    availableDust: Record<DustType, number> = {
        [DustType.Stardust]: 0,
        [DustType.Moondust]: 0,
        [DustType.Solardust]: 0,
        [DustType.Cooldust]: 0,
        [DustType.Novadust]: 0
    };

    // Efficiency calculation fields
    currentTempestDamage: number = 0;
    currentDustMultiplier: number = 0;
    efficiencyResults: Map<string, CompassEfficiencyResult[]> = new Map();

    // Compass raw data for calculations
    medallionsCollected: any[] = [];
    titansKilled: any[] = [];
    portalsCompleted: any[] = [];

    // Collected data for calculations
    bestWindWalker: Player | null = null;
    pristineBonus19: number = 0;
    etcBonus85: number = 0; // "Dust Multi" from equipment
    etcBonus79: number = 0; // "Extra Dust" from equipment
    talent421: number = 0;
    arcadeBonus47: number = 0;
    completedMasteries: number = 0;

    getRawKeys(): RawData[] {   
        return [
            { key: "Compass", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.upgrades = CompassUpgrade.fromBase(initCompassUpgradeRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const compass = data.get(this.getDataKey()) as Compass;
        const compassData = data.get("Compass") as any[][];
        const optionList = data.get("OptLacc") as number[];
        const serverVars = data.get("servervars") as Record<string, any>;

        // Exit early for older accounts that don't have a compass data array.
        if (!compassData || compassData.length == 0) {
            return;
        }

        // I really should only do this once and pass it in, instead of reinitializing it every time.
        const randoList = initRandoListRepo();

        const dustCostServerVar = serverVars["DustCost"] || 1;

        const [upgradesLevels, abominationsRaw, portalsRaw, medallionsRaw, exaltedStampsRaw] = compassData;

        compass.totalCompassLevel = upgradesLevels?.reduce((sum, level) => sum + level, 0);
    
        // Dust
        compass.availableDust[DustType.Stardust] = optionList[357];
        compass.availableDust[DustType.Moondust] = optionList[358];
        compass.availableDust[DustType.Solardust] = optionList[359];
        compass.availableDust[DustType.Cooldust] = optionList[360];
        compass.availableDust[DustType.Novadust] = optionList[361];
        compass.totalDustsCollected = optionList[362];

        // Game state
        compass.completedMasteries = optionList[232] || 0; // Number of completed masteries

        // Store raw compass data for calculations
        compass.medallionsCollected = medallionsRaw || [];
        compass.titansKilled = abominationsRaw || [];
        compass.portalsCompleted = portalsRaw || [];

        // Upgrade related things.
        this.upgradeMetadata["Elemental"] = { 
            pathLevel:  upgradesLevels[1], 
            pathUpgrades: randoList[105].data.elements.map(element => parseInt(element)) 
        };

        this.upgradeMetadata["Fighter"] = { 
            pathLevel:  upgradesLevels[13], 
            pathUpgrades: randoList[106].data.elements.map(element => parseInt(element)) 
        };

        this.upgradeMetadata["Survival"] = { 
            pathLevel:  upgradesLevels[27], 
            pathUpgrades: randoList[107].data.elements.map(element => parseInt(element)) 
        };

        this.upgradeMetadata["Nomadic"] = { 
            pathLevel:  upgradesLevels[40], 
            pathUpgrades: randoList[108].data.elements.map(element => parseInt(element)) 
        };

        this.upgradeMetadata["Abomination"] = { 
            pathLevel:  abominationsRaw.filter(abomination => abomination > 0).length, 
            pathUpgrades: randoList[109].data.elements.map(element => parseInt(element)) 
        };

        compass.upgrades.forEach(upgrade => {
            upgrade.level = upgradesLevels[upgrade.id];

            if (Object.keys(this.upgradeMetadata).includes(upgrade.data.upgradeType)) {
                upgrade.indexInPath = this.upgradeMetadata[upgrade.data.upgradeType].pathUpgrades.indexOf(upgrade.id);
                // TODO: Verify this works as expected.
                upgrade.unlocked = upgrade.indexInPath < this.upgradeMetadata[upgrade.data.upgradeType].pathLevel;
            } else {
                upgrade.unlocked = true;
            }

            upgrade.dustServerVarMultiplier = dustCostServerVar;
        });

        // Before we can calculate the costs / bonus etc. for upgrades we need to 
        // calculate the bonuses for special upgrades that impact other upgrades (Writhing Grimoire)
        const specialBonuses = [36, 80];
        specialBonuses.forEach(bonusId => {
            const upgrade = this.upgrades.find(u => u.id === bonusId);
            if (upgrade) {
                upgrade.bonus = upgrade.getBonus(this.upgrades);
            }
        });
        
        compass.upgrades.forEach(upgrade => {
            upgrade.bonus = upgrade.getBonus(this.upgrades);
            upgrade.cost = upgrade.getCost(this.upgrades, this.upgradeMetadata);

            // For upgrades with very high max levels, we don't need to calculate cost to max
            // as it would be an astronomical number and not useful for players
            if (upgrade.data.maxLevel >= 999999) {
                upgrade.costToMax = 0; // Set to 0 as we won't use this value
            } else {
                upgrade.costToMax = upgrade.getCostToMax(this.upgrades, this.upgradeMetadata);
            }

            // Calculate cost to unlock for locked upgrades
            upgrade.costToUnlock = upgrade.getCostToUnlock(this.upgrades, this.upgradeMetadata);
        });
    }

    // Helper method to determine if player can afford an upgrade
    canAffordUpgrade(upgrade: CompassUpgrade, cost: number = upgrade.cost): boolean {
        if (upgrade.level >= upgrade.data.maxLevel) return false;
        
        const dustType = upgrade.data.dustType;
        const dustTypeKey = dustType as unknown as DustType;
        
        return this.availableDust[dustTypeKey] >= cost;
    }

    getDustImageData(dustType: DustType): ImageData {
        return {
            location: `Dust${dustType}_x1`,
            height: 36,
            width: 36,
        }
    }

    // EfficiencyDomain interface methods
    getResources(): Record<number, number> {
        return this.availableDust;
    }

    getResourceCount(resourceType: number): number {
        return this.availableDust[resourceType as DustType] || 0;
    }

    getResourceImageData(resourceType: number): ImageData {
        return this.getDustImageData(resourceType as DustType);
    }

    copyUpgrade(upgrade: EfficiencyUpgrade): EfficiencyUpgrade {
        const compassUpgrade = upgrade as CompassUpgrade;
        const copy = new CompassUpgrade(compassUpgrade.id, compassUpgrade.data);
        copy.level = compassUpgrade.level;
        copy.unlocked = compassUpgrade.unlocked;
        copy.cost = compassUpgrade.cost;
        copy.costToMax = compassUpgrade.costToMax;
        copy.costToUnlock = compassUpgrade.costToUnlock;
        copy.indexInPath = compassUpgrade.indexInPath;
        copy.dustServerVarMultiplier = compassUpgrade.dustServerVarMultiplier;
        copy.bonus = compassUpgrade.bonus;
        return copy;
    }

    recalculateUpgrades(upgrades: EfficiencyUpgrade[]): void {
        const compassUpgrades = upgrades as CompassUpgrade[];
        
        // First handle special bonuses that affect other upgrades
        const specialBonuses = [36, 80];
        specialBonuses.forEach(bonusId => {
            const specialUpgrade = compassUpgrades.find(u => u.id === bonusId);
            if (specialUpgrade) {
                specialUpgrade.bonus = specialUpgrade.getBonus(compassUpgrades);
            }
        });

        // Then recalculate all bonuses and costs
        compassUpgrades.forEach(upgrade => {
            upgrade.bonus = upgrade.getBonus(compassUpgrades);
            upgrade.cost = upgrade.getCost(upgrades, this.upgradeMetadata);
        });
    }

    // Provide additional cost arguments for compass upgrades (upgradeMetadata)
    getAdditionalCostArgs(): any[] {
        return [this.upgradeMetadata];
    }

    /**
     * Calculate current tempest damage based on the Compass_DMG formula
     * @param includeEquipment Whether to include equipment bonuses (default true)
     * @returns Current tempest damage
     */
    calculateTempestDamage(includeEquipment: boolean = true): number {
        // Find Wind Walker player
        if (!this.bestWindWalker) {
            return 0; // No Wind Walker found
        }

        // Equipment bonus calculation (WWzWepAtk in source code)
        let equipmentBonus = 0;
        if (includeEquipment && this.bestWindWalker.gear?.equipment) {
            const equipment = this.bestWindWalker.gear.equipment;
            // Check weapon slot (index 1) for Tempest weapon
            const weapon = equipment[1];
            if (weapon && weapon.internalName.includes("Tempest")) {
                const weaponPowerStat = weapon.itemStats.find((stat: any) => stat.displayName === "Weapon Power");
                if (weaponPowerStat) {
                    equipmentBonus += weaponPowerStat.getValue();
                }
            }

            // Check ring slots (indices 5 and 7) for Tempest rings
            [5, 7].forEach(ringSlot => {
                const ring = equipment[ringSlot];
                if (ring && ring.internalName.includes("Tempest")) {
                    // Check for "Power" stat in itemStats (for upgraded rings)
                    const powerStat = ring.itemStats.find((stat: any) => stat.displayName === "Power" || stat.displayName === " Power");
                    if (powerStat) {
                        equipmentBonus += powerStat.getValue();
                    }
                    
                    // Check for "Weapon Power" stat in itemStats (might be upgraded)
                    const weaponPowerStat = ring.itemStats.find((stat: any) => stat.displayName === "Weapon Power");
                    if (weaponPowerStat) {
                        equipmentBonus += weaponPowerStat.getValue();
                    }
                    
                    // Also check the base weaponPower property (like weapons do)
                    if (ring.weaponPower && ring.weaponPower > 0) {
                        equipmentBonus += ring.weaponPower;
                    }
                }
            });
        }

        // Start with exact source code formula: (5 + flatDamageBonuses) * equipmentMultiplier * etcMultiplier * specialMultipliers * (1 + percentageBonuses/100)
        
        // Step 1: Base damage + flat damage bonuses (added together first)
        const flatDamageBonus = this.getUpgradeBonus(14) + // ID 14: "Tempest Damage"
                               this.getUpgradeBonus(15) + // ID 15: "Tempest Mega Damage"  
                               this.getUpgradeBonus(24) + // ID 24: "Tempest Ultra Damage"
                               this.getUpgradeBonus(60) + // ID 60: "Abomination Slayer I"
                               this.getUpgradeBonus(81);  // ID 81: "Abomination Slayer II"

        let damage = 5 + flatDamageBonus;

        // Step 2: Equipment multiplier (Math.pow(1.05, equipmentBonus))
        damage *= Math.pow(1.05, equipmentBonus);

        // Step 3: ETC bonus multiplier - specifically for ETC bonus 86 "Tempest Damage"
        let etcBonusMultiplier = 1;
        if (includeEquipment && this.bestWindWalker.gear?.equipment) {
            const equipment = this.bestWindWalker.gear.equipment;
            // Check for "Tempest Damage" misc bonus (currently just rings)
            etcBonusMultiplier += equipment.reduce((sum, item) => sum += item?.getMiscBonus("Tempest Damage") ?? 0, 0);
        }
        damage *= etcBonusMultiplier;

        // Step 4: Cooldust hoarding multiplier (1 + CompassBonus(23) * LOG(cooldust) / 100)
        const cooldust = this.availableDust[DustType.Cooldust];
        const coolddustHoardingBonus = this.getUpgradeBonus(23);
        const coolddustMultiplier = cooldust > 0 ? 
            1 + (coolddustHoardingBonus * this.getLogValue(cooldust)) / 100 : 1;
        damage *= coolddustMultiplier;

        // Step 5: Mastery completion multiplier (Math.pow(1 + CompassBonus(26) / 100, completedMasteries))
        const masteryBonus = this.getUpgradeBonus(26);
        const masteryMultiplier = Math.pow(1 + masteryBonus / 100, this.completedMasteries);
        damage *= masteryMultiplier;

        // Step 6: Medallion multiplier (1 + CompassBonus(6) * medallionCount / 100)
        const medallionBonus = this.getUpgradeBonus(6);
        const medallionCount = this.getMedallionCount();
        const medallionMultiplier = 1 + (medallionBonus * medallionCount) / 100;
        damage *= medallionMultiplier;

        // Step 7: All percentage damage bonuses (added together, then applied as single multiplier)
        let percentageBonuses = 0;
        
        // Compass upgrade percentage bonuses
        percentageBonuses += this.getUpgradeBonus(119); // "Tempest Damage I"
        percentageBonuses += this.getUpgradeBonus(10);  // "Weapon Improvement"
        percentageBonuses += this.getUpgradeBonus(121); // "Tempest Damage IV"
        percentageBonuses += this.getUpgradeBonus(122); // "Tempest Damage II"
        percentageBonuses += this.getUpgradeBonus(123); // "Tempest Damage III"
        percentageBonuses += this.getUpgradeBonus(126); // "Tempest Damage X"
        percentageBonuses += this.getUpgradeBonus(127); // "Tempest Damage VII"
        percentageBonuses += this.getUpgradeBonus(129); // "Tempest Damage V"
        percentageBonuses += this.getUpgradeBonus(130); // "Tempest Damage VI"
        percentageBonuses += this.getUpgradeBonus(132); // "Tempest Damage VIII"
        percentageBonuses += this.getUpgradeBonus(135); // "Tempest Damage IX"
        percentageBonuses += this.getUpgradeBonus(64);  // Abomination Slayer V
        percentageBonuses += this.getUpgradeBonus(85);  // Abomination Slayer XXVI
        percentageBonuses += this.getUpgradeBonus(94);  // Abomination Slayer XXXV

        // HP-based bonus (CompassBonus(78) * LOG(Compass_HP))
        const compassHP = this.calculateCompassHP();
        const bonus78 = this.getUpgradeBonus(78);
        const hpBasedBonus = bonus78 * this.getLogValue(compassHP);
        percentageBonuses += hpBasedBonus;

        // Talent 420 bonus (GetTalentNumber(1, 420))
        const talentBonus420 = this.getTalentBonus(this.bestWindWalker, 420);
        percentageBonuses += talentBonus420;

        // Step 8: Apply all percentage bonuses as single multiplier (1 + percentageBonuses / 100)
        damage *= (1 + percentageBonuses / 100);

        return damage;
    }


    /**
     * Helper function to calculate damage with a temporary compass state
     */
    public calculateDamageWithUpgrades(upgrades: CompassUpgrade[], availableDust: Record<DustType, number>): number {
        const tempCompass = new Compass("compass");
        tempCompass.upgrades = upgrades;
        tempCompass.upgradeMetadata = this.upgradeMetadata;
        tempCompass.availableDust = availableDust;
        tempCompass.medallionsCollected = this.medallionsCollected;
        tempCompass.titansKilled = this.titansKilled;
        tempCompass.portalsCompleted = this.portalsCompleted;
        tempCompass.bestWindWalker = this.bestWindWalker;
        
        // Copy game state attributes
        tempCompass.completedMasteries = this.completedMasteries;
        
        return tempCompass.calculateTempestDamage();
    }

    /**
     * Helper function to calculate dust multiplier with a temporary compass state
     */
    public calculateDustWithUpgrades(upgrades: CompassUpgrade[], availableDust: Record<DustType, number>): number {
        const tempCompass = new Compass("compass");
        tempCompass.upgrades = upgrades;
        tempCompass.upgradeMetadata = this.upgradeMetadata;
        tempCompass.availableDust = availableDust;
        tempCompass.medallionsCollected = this.medallionsCollected;
        tempCompass.titansKilled = this.titansKilled;
        tempCompass.portalsCompleted = this.portalsCompleted;
        
        // Copy external bonus attributes
        tempCompass.pristineBonus19 = this.pristineBonus19;
        tempCompass.etcBonus85 = this.etcBonus85;
        tempCompass.etcBonus79 = this.etcBonus79;
        tempCompass.talent421 = this.talent421;
        tempCompass.arcadeBonus47 = this.arcadeBonus47;
        
        return tempCompass.calculateDustMultiplier();
    }

    /**
     * Calculate dust multiplier based on the ExtraDust formula from source code
     * @returns Current dust multiplier
     */
    calculateDustMultiplier(): number {
        // Base multiplier starts at 1
        let multiplier = 1;

        // Step 1: (1 + (CompassBonus(31) + CompassBonus(34) * LOG(Solardust)) / 100)
        const bonus31 = this.getUpgradeBonus(31); // Mountains of Dust
        const bonus34 = this.getUpgradeBonus(34); // Solardust Hoarding
        const solardust = this.availableDust[DustType.Solardust];
        const solardustMultiplier = 1 + (bonus31 + bonus34 * this.getLogValue(solardust)) / 100;
        multiplier *= solardustMultiplier;

        // Step 2: (1 + CompassBonus(38) / 100) - Spire of Dust
        const bonus38 = this.getUpgradeBonus(38);
        multiplier *= (1 + bonus38 / 100);

        // Step 3: (1 + PristineBon(19) / 100)
        multiplier *= (1 + this.pristineBonus19 / 100);

        // Step 4: (1 + (EtcBonuses(85) + EtcBonuses(79)) / 100)
        multiplier *= (1 + (this.etcBonus85 + this.etcBonus79) / 100);

        // Step 5: Skip talent 423 calculation as requested

        // Step 6: All the additive compass bonuses
        let additiveBonus = 0;
        additiveBonus += this.getUpgradeBonus(139); // De Dust I
        additiveBonus += this.getUpgradeBonus(142); // De Dust II
        additiveBonus += this.getUpgradeBonus(145); // De Dust III
        additiveBonus += this.getUpgradeBonus(148); // De Dust IV
        additiveBonus += this.getUpgradeBonus(150); // De Dust V
        additiveBonus += this.getUpgradeBonus(68);  // Abomination Slayer IX
        additiveBonus += this.getUpgradeBonus(93);  // Abomination Slayer XXXIV
        additiveBonus += this.getUpgradeBonus(89);  // Abomination Slayer XXX

        // Add talent and arcade bonuses
        additiveBonus += this.talent421;
        additiveBonus += this.arcadeBonus47;

        multiplier *= (1 + additiveBonus / 100);

        return multiplier;
    }

    /**
     * Calculate efficiency for all supported attributes using the efficiency system
     */
    calculateAllEfficiencies(): void {
        const currentDamage = this.calculateTempestDamage();
        this.currentTempestDamage = currentDamage;
        
        const currentDustMultiplier = this.calculateDustMultiplier();
        this.currentDustMultiplier = currentDustMultiplier;
        
        const engine = new EfficiencyEngine<Compass>();
        const calculators = [
            new DamageEfficiencyCalculator(),
            new DustEfficiencyCalculator(),
            // Easy to add more calculators here in the future
        ];
        
        calculators.forEach(calculator => {
            const pathInfo = engine.calculateEfficiency(this, calculator);
            // Convert EfficiencyPathInfo to CompassEfficiencyResult[] for backward compatibility
            const results: CompassEfficiencyResult[] = pathInfo.pathUpgrades.map(pathUpgrade => ({
                upgrade: pathUpgrade.upgrade as CompassUpgrade,
                valueIncrease: pathUpgrade.valueIncrease,
                dustCost: pathUpgrade.resourceCost,
                efficiency: pathUpgrade.efficiency,
            }));
            this.efficiencyResults.set(calculator.name, results);
        });
    }

    /**
     * Get the top N most efficient damage upgrades
     * @param n Number of upgrades to return (default 10)
     * @returns Array of most efficient upgrades
     */
    getTopDamageEfficiencyUpgrades(n: number = 10): CompassEfficiencyResult[] {
        const damageResults = this.efficiencyResults.get("Tempest Damage") || [];
        return damageResults.slice(0, n);
    }

    /**
     * Get the top N most efficient dust upgrades
     * @param n Number of upgrades to return (default 10)
     * @returns Array of most efficient upgrades
     */
    getTopDustEfficiencyUpgrades(n: number = 10): CompassEfficiencyResult[] {
        const dustResults = this.efficiencyResults.get("Dust Multiplier") || [];
        return dustResults.slice(0, n);
    }

    /**
     * Get the bonus value for a specific compass upgrade ID
     */
    private getUpgradeBonus(upgradeId: number): number {
        const upgrade = this.upgrades.find(u => u.id === upgradeId);
        return upgrade?.bonus || 0;
    }

    /**
     * Calculate logarithm value (using lavaLog function from utility)
     */
    private getLogValue(value: number): number {
        return lavaLog(value);
    }

    /**
     * Calculate compass HP for damage calculations
     */
    private calculateCompassHP(): number {
        // Base HP: 10
        let hp = 10;

        // Flat HP bonuses: CompassBonus 28 + CompassBonus 87
        const flatHPBonus = this.getUpgradeBonus(28) + this.getUpgradeBonus(87);
        hp += flatHPBonus;

        // Percentage HP multipliers (all additive with each other)
        let percentageHPBonuses = 0;
        percentageHPBonuses += this.getUpgradeBonus(140); // ID 140
        percentageHPBonuses += this.getUpgradeBonus(146); // ID 146  
        percentageHPBonuses += this.getUpgradeBonus(92);  // ID 92

        // Apply percentage bonuses
        hp *= (1 + percentageHPBonuses / 100);

        return hp;
    }

    /**
     * Get talent bonus from a player's talent
     */
    private getTalentBonus(player: any, skillIndex: number): number {
        if (!player?.talents) return 0;
        
        const talent = player.talents.find((t: any) => t.skillIndex === skillIndex);
        if (!talent?.getBonus) return 0;

        // For tempest damage calculations, we only use talent 420
        return talent.getBonus(); // Use default parameters
    }

    /**
     * Get medallion count from compass data
     */
    private getMedallionCount(): number {
        // Medallions are stored in medallionsCollected (Compass[3] in source)
        return this.medallionsCollected.length;
    }
}

/**
 * Update function for compass efficiency calculations
 * This should be called in post-processing after players data is available
 */
export const updateCompassDamageEfficiency = (accountData: Map<string, any>) => {
    const compass = accountData.get("compass") as Compass;
    const players = accountData.get("players") as Player[];
    const sneaking = accountData.get("sneaking") as Sneaking;
    const arcade = accountData.get("arcade") as Arcade;

    if (compass && players) {
        try {

            // Find Wind Walker player
            const windWalker = players.slice().sort((player1, player2) => player1.level > player2.level ? -1 : 1).find((player: any) => player.classId === 29);
            if (windWalker) {
                compass.bestWindWalker = windWalker;

                // Set ETC bonuses from Wind Walker equipment
                const windWalkerEquipment = windWalker.gear.equipment;
                compass.etcBonus85 = windWalkerEquipment.reduce((sum, item) => sum += item?.getMiscBonus("Dust Multi") ?? 0, 0);
                compass.etcBonus79 = windWalkerEquipment.reduce((sum, item) => sum += item?.getMiscBonus("Extra Dust") ?? 0, 0);
            }

            // Set pristine bonus 19 from sneaking
            compass.pristineBonus19 = 0;
            if (sneaking?.pristineCharms) {
                const charm19 = sneaking.pristineCharms.find((charm: any) => charm.index === 19);
                if (charm19?.unlocked) {
                    compass.pristineBonus19 = charm19.getBonus();
                }
            }


            // Set talent 421 from Wind Walker
            compass.talent421 = 0;
            if (windWalker?.talents) {
                const talent = windWalker.talents.find((t: any) => t.skillIndex === 421);
                compass.talent421 = talent?.getBonus() || 0;
            }

            // Set arcade bonus 47
            compass.arcadeBonus47 = 0;
            if (arcade?.bonuses && arcade.bonuses.length > 47) {
                compass.arcadeBonus47 = arcade.bonuses[47]?.getBonus() || 0;
            }

            compass.calculateAllEfficiencies();
        } catch (error) {
            console.error("Failed to calculate compass efficiency:", error);
        }
    } else {
        console.error("Failed to calculate compass efficiency: compass or players is undefined");
    }

    return compass;
} 


const CompassIconz: Record<number, string> = {
    139: "0",
    142: "0",
    145: "0",
    148: "0",
    150: "0",
    137: "1",
    138: "1",
    141: "1",
    143: "1",
    144: "1",
    149: "1",
    106: "2",
    107: "2",
    108: "2",
    109: "2",
    110: "2",
    111: "2",
    112: "2",
    113: "2",
    114: "2",
    115: "2",
    116: "2",
    117: "2",
    118: "2",
    119: "3",
    121: "3",
    122: "3",
    123: "3",
    126: "3",
    127: "3",
    129: "3",
    130: "3",
    132: "3",
    135: "3",
    120: "4",
    124: "4",
    125: "4",
    128: "4",
    131: "4",
    133: "4",
    134: "4",
    136: "4",
    147: "4",
    140: "5",
    146: "5",
    151: "6",
    152: "6",
    153: "6",
    154: "7",
    156: "7",
    162: "8",
    163: "8",
    164: "8",
    166: "8",
    167: "8",
    155: "9",
    157: "9",
    158: "9",
    159: "10",
    160: "10",
    161: "10",
    165: "10",
    168: "10",
    169: "10",
    170: "11"
};
