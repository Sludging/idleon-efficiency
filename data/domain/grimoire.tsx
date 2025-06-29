import { nFormatter } from "../utility";
import { Domain, RawData } from "./base/domain";
import { GrimoireUpgradeBase, initGrimoireUpgradeRepo } from "./data/GrimoireUpgradeRepo";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { GrimoireUpgradeModel } from "./model/grimoireUpgradeModel";
import { 
    UnlockableUpgrade, 
    UnlockableDomain, 
    UnlockEfficiencyEngine, 
    StandardUnlockEfficiencyCalculator,
    UnlockPathInfo
} from "./base/unlockEfficiencyEngine";

export class GrimoireUpgrade implements UnlockableUpgrade {
    public level: number = 0;
    public unlocked: boolean = false;
    public bonus: number = 0;
    public cost: number = 0;
    public costToMax: number = 0;

    constructor(
        public id: number,
        public data: GrimoireUpgradeModel,
    ) { }

    static fromBase = (data: GrimoireUpgradeBase[]): GrimoireUpgrade[] => {
        return data.map((upgrade, index) => new GrimoireUpgrade(
            index,
            upgrade.data
        ));
    }

    getImageData = (): ImageData => {
        return {
            location: `GrimoireUpg${this.id}`,
            height: 56,
            width: 51,
        }
    }

    getBonus = (allUpgrades: GrimoireUpgrade[]): number => {
        if (this.level === 0) {
            return 0;
        }

        // Special handling for Writhing Grimoire (index 36) which boosts other upgrades
        // Also handle other special upgrades that don't get the Writhing Grimoire bonus
        const specialUpgrades = [9, 11, 26, 36, 39, 17, 32, 45];
        const isSpecialUpgrade = specialUpgrades.includes(this.id);

        if (isSpecialUpgrade) {
            return this.level * this.data.value;
        }

        // Apply the Writhing Grimoire bonus to other upgrades
        const writingGrimoireBonus = allUpgrades[36]?.level > 0 ? 
            (1 + allUpgrades[36].level * allUpgrades[36].data.value / 100) : 1;

        // Apply the bonus based on level and value
        return this.level * this.data.value * writingGrimoireBonus;
    }

    getCost = (allUpgrades: UnlockableUpgrade[]): number => {
        if (this.level >= this.data.max_level) {
            return 0;
        }

        // Based on the game code: GrimoireUpgCost
        // 3 * Math.pow(1.05, t) * (Grimoire[t] + (CustomLists.GrimoireUpg[t][1] + Grimoire[t]) * Math.pow(CustomLists.GrimoireUpg[t][2] + 0.01, Grimoire[t]))
        const baseCost = 3 * Math.pow(1.05, this.id) * 
            (this.level + (this.data.base_cost + this.level) * 
            Math.pow(this.data.scaling_factor + 0.01, this.level));

        return baseCost;
    }

    getCostToMax = (allUpgrades: GrimoireUpgrade[]): number => {
        let totalCost = 0;
        const tempUpgrade = new GrimoireUpgrade(this.id, this.data);
        tempUpgrade.level = this.level;

        for (let i = this.level; i < this.data.max_level; i++) {
            totalCost += tempUpgrade.getCost(allUpgrades);
            tempUpgrade.level++;
        }

        return totalCost;
    }

    getCostForNextNLevels = (allUpgrades: GrimoireUpgrade[], levels: number): number => {
        let totalCost = 0;
        const tempUpgrade = new GrimoireUpgrade(this.id, this.data);
        tempUpgrade.level = this.level;

        // Only calculate up to max level or the specified number of levels, whichever is smaller
        const levelsToCalculate = Math.min(levels, this.data.max_level - this.level);
        
        for (let i = 0; i < levelsToCalculate; i++) {
            totalCost += tempUpgrade.getCost(allUpgrades);
            tempUpgrade.level++;
        }

        return totalCost;
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
        if (description.includes('%')) {
            description = description.replace('%', '');
        }
        if (description.includes('$')) {
            // For KO/Elimination/Annihilation targets
            description = description.replace('$', this.data.x1.toString());
        }

        return description;
    }
}

export class Grimoire extends Domain implements UnlockableDomain {
    upgrades: GrimoireUpgrade[] = [];
    totalGrimoireLevel: number = 0;
    
    // Bone counts
    femurBones: number = 0;
    ribcageBones: number = 0;
    craniumBones: number = 0;
    bovinaeBones: number = 0;

    // Unlock path information - using new generalized system
    unlockPathInfo: UnlockPathInfo = {
        nextUnlock: null,
        pathUpgrades: [],
        levelsNeeded: 0,
        totalCost: 0,
        resourceCosts: [0, 0, 0, 0],
        remainingLevels: 0
    };

    // Unlock efficiency engine
    private unlockEngine = new UnlockEfficiencyEngine<Grimoire>();
    private unlockCalculator = new StandardUnlockEfficiencyCalculator<Grimoire>();

    get totalLevel(): number {
        return this.totalGrimoireLevel;
    }

    getRawKeys(): RawData[] {   
        return [
            { key: "Grimoire", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.upgrades = GrimoireUpgrade.fromBase(initGrimoireUpgradeRepo());
        return this;
    }

    // UnlockableDomain interface methods
    copyUpgrade(upgrade: UnlockableUpgrade): UnlockableUpgrade {
        const grimoireUpgrade = upgrade as GrimoireUpgrade;
        const copy = new GrimoireUpgrade(grimoireUpgrade.id, grimoireUpgrade.data);
        copy.level = grimoireUpgrade.level;
        copy.unlocked = grimoireUpgrade.unlocked;
        copy.bonus = grimoireUpgrade.bonus;
        copy.cost = grimoireUpgrade.cost;
        copy.costToMax = grimoireUpgrade.costToMax;
        return copy;
    }

    recalculateUpgrades(upgrades: UnlockableUpgrade[]): void {
        const grimoireUpgrades = upgrades as GrimoireUpgrade[];
        
        // First calculate special bonuses that affect other upgrades (Writhing Grimoire)
        const writingGrimoireUpgrade = grimoireUpgrades[36];
        if (writingGrimoireUpgrade) {
            writingGrimoireUpgrade.bonus = writingGrimoireUpgrade.getBonus(grimoireUpgrades);
        }

        // Then calculate all bonuses and costs
        grimoireUpgrades.forEach(upgrade => {
            upgrade.bonus = upgrade.getBonus(grimoireUpgrades);
            upgrade.cost = upgrade.getCost(grimoireUpgrades);
        });
    }

    getUpgradeResourceType(upgrade: UnlockableUpgrade): number {
        return (upgrade as GrimoireUpgrade).data.x1; // Bone type
    }

    // ResourceTracker interface methods
    getResourceCount(resourceType: number): number {
        switch(resourceType) {
            case 0: return this.femurBones;
            case 1: return this.ribcageBones;
            case 2: return this.craniumBones;
            case 3: return this.bovinaeBones;
            default: return 0;
        }
    }

    getResourceImageData(resourceType: number): ImageData {
        return {
            location: `GrimBone${resourceType}`,
            height: 20,
            width: 20,
        }
    }

    canAffordUpgrade(upgrade: UnlockableUpgrade, cost: number = upgrade.cost): boolean {
        if (upgrade.level >= upgrade.data.max_level) return false;
        
        const resourceType = this.getUpgradeResourceType(upgrade);
        return this.getResourceCount(resourceType) >= cost;
    }

    // Legacy methods for backward compatibility
    getBoneCount(boneType: number): number {
        return this.getResourceCount(boneType);
    }

    getBoneImageData(boneType: number): ImageData {
        return this.getResourceImageData(boneType);
    }

    parse(data: Map<string, any>): void {
        const grimoire = data.get(this.getDataKey()) as Grimoire;
        const upgradesData = data.get("Grimoire") as number[];
        const optionList = data.get("OptLacc") as number[];
    
        // Calculate total grimoire level first
        grimoire.totalGrimoireLevel = upgradesData.reduce((sum, level) => sum + level, 0);
    
        upgradesData.forEach((level, index) => {
            if (index < grimoire.upgrades.length) {
                const upgrade = grimoire.upgrades[index];
                upgrade.level = level;
                
                // Set unlocked status based on total grimoire level
                upgrade.unlocked = grimoire.totalGrimoireLevel >= upgrade.data.unlock_req;
            }
        });

        // Parse bone counts from OptLacc data
        // Based on the example from gaming.tsx, OptLacc contains game data at specific indices
        if (optionList && optionList.length > 333) {
            grimoire.femurBones = optionList[330] || 0;
            grimoire.ribcageBones = optionList[331] || 0;
            grimoire.craniumBones = optionList[332] || 0;
            grimoire.bovinaeBones = optionList[333] || 0;
        }

        // Pre-calculate bonus, cost and cost to max for each upgrade
        // We first need the bonuses for special upgrades that impact other upgrades (Writhing Grimoire)
        const writingGrimoireUpgrade = grimoire.upgrades[36];
        if (writingGrimoireUpgrade) {
            writingGrimoireUpgrade.bonus = writingGrimoireUpgrade.getBonus(grimoire.upgrades);
            writingGrimoireUpgrade.cost = writingGrimoireUpgrade.getCost(grimoire.upgrades);
            writingGrimoireUpgrade.costToMax = writingGrimoireUpgrade.getCostToMax(grimoire.upgrades);
        }

        // Then we can calculate the bonuses for the other upgrades
        grimoire.upgrades.forEach(upgrade => {
            upgrade.bonus = upgrade.getBonus(grimoire.upgrades);
            upgrade.cost = upgrade.getCost(grimoire.upgrades);
            
            // For upgrades with very high max levels, we don't need to calculate cost to max
            // as it would be an astronomical number and not useful for players
            if (upgrade.data.max_level >= 999999) {
                upgrade.costToMax = 0; // Set to 0 as we won't use this value
            } else {
                upgrade.costToMax = upgrade.getCostToMax(grimoire.upgrades);
            }
        });

        // Calculate unlock path using the new generalized system
        // Pass the exact levels needed to ensure we calculate the complete path
        const nextUnlock = grimoire.unlockCalculator.findNextUnlock(grimoire);
        const levelsNeeded = nextUnlock ? Math.max(0, nextUnlock.data.unlock_req - grimoire.totalGrimoireLevel) : 0;
        
        grimoire.unlockPathInfo = grimoire.unlockEngine.calculateUnlockPath(
            grimoire, 
            grimoire.unlockCalculator,
            levelsNeeded || 1 // Use at least 1 to avoid issues if no unlock needed
        );
    }
} 
