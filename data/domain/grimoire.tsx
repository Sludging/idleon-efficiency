import { nFormatter } from "../utility";
import { Domain, RawData } from "./base/domain";
import { GrimoireUpgradeBase, initGrimoireUpgradeRepo } from "./data/GrimoireUpgradeRepo";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { GrimoireUpgradeModel } from "./model/grimoireUpgradeModel";

export class GrimoireUpgrade {
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

    getCost = (allUpgrades: GrimoireUpgrade[]): number => {
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

export class Grimoire extends Domain {
    upgrades: GrimoireUpgrade[] = [];
    totalGrimoireLevel: number = 0;
    
    // Bone counts
    femurBones: number = 0;
    ribcageBones: number = 0;
    craniumBones: number = 0;
    bovinaeBones: number = 0;

    // Unlock path information
    unlockPathInfo: {
        nextUnlock: GrimoireUpgrade | null;
        pathUpgrades: Array<{
            id: number;
            name: string;
            levels: number;
            cost: number;
            boneType: number;
            imageData: ImageData;
        }>;
        levelsNeeded: number;
        totalCost: number;
        boneTypes: number[];
        remainingLevels: number;
    } = {
        nextUnlock: null,
        pathUpgrades: [],
        levelsNeeded: 0,
        totalCost: 0,
        boneTypes: [0, 0, 0, 0],
        remainingLevels: 0
    };

    getRawKeys(): RawData[] {   
        return [
            { key: "Grimoire", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.upgrades = GrimoireUpgrade.fromBase(initGrimoireUpgradeRepo());
        return this;
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

        // Calculate the next locked upgrade and the cheapest path to unlock it
        this.calculateUnlockPath(grimoire);
    }

    // Helper method to get total bones of a specific type
    getBoneCount(boneType: number): number {
        switch(boneType) {
            case 0: return this.femurBones;
            case 1: return this.ribcageBones;
            case 2: return this.craniumBones;
            case 3: return this.bovinaeBones;
            default: return 0;
        }
    }

    // Helper method to determine if player can afford an upgrade
    canAffordUpgrade(upgrade: GrimoireUpgrade, cost: number = upgrade.cost): boolean {
        if (upgrade.level >= upgrade.data.max_level) return false;
        
        let boneType = upgrade.data.x1;
        
        return this.getBoneCount(boneType) >= cost;
    }

    getBoneImageData(boneType: number): ImageData {
        return {
            location: `GrimBone${boneType}`,
            height: 20,
            width: 20,
        }
    }

    // Calculate the next locked upgrade and the cheapest path to unlock it
    private calculateUnlockPath(grimoire: Grimoire): void {
        // Find the next locked upgrade with the lowest unlock requirement
        const nextUnlock = [...grimoire.upgrades]
            .filter(u => !u.unlocked)
            .sort((a, b) => a.data.unlock_req - b.data.unlock_req)[0];

        if (!nextUnlock) {
            grimoire.unlockPathInfo = { 
                nextUnlock: null, 
                pathUpgrades: [], 
                levelsNeeded: 0, 
                totalCost: 0, 
                boneTypes: [0, 0, 0, 0],
                remainingLevels: 0
            };
            return;
        }

        // Calculate how many more levels we need
        const levelsNeeded = nextUnlock.data.unlock_req - grimoire.totalGrimoireLevel;
        
        if (levelsNeeded <= 0) {
            grimoire.unlockPathInfo = { 
                nextUnlock, 
                pathUpgrades: [], 
                levelsNeeded: 0, 
                totalCost: 0,
                boneTypes: [0, 0, 0, 0],
                remainingLevels: 0
            };
            return;
        }

        // Get all unlocked upgrades that aren't maxed
        const availableUpgrades = grimoire.upgrades
            .filter(u => u.unlocked && u.level < u.data.max_level);

        // Create a simulation of the current state
        const simulationUpgrades = availableUpgrades.map(upgrade => ({
            id: upgrade.id,
            name: upgrade.data.name,
            currentLevel: upgrade.level,
            maxLevel: upgrade.data.max_level,
            boneType: upgrade.data.x1,
            baseCost: upgrade.data.base_cost,
            scalingFactor: upgrade.data.scaling_factor,
            imageData: upgrade.getImageData(),
            // Clone the upgrade for cost calculations
            upgrade: new GrimoireUpgrade(upgrade.id, upgrade.data)
        }));

        // Function to calculate the cost of the next level for a specific upgrade
        const calculateNextLevelCost = (upgrade: typeof simulationUpgrades[0]) => {
            // Set the level to the current simulation level
            upgrade.upgrade.level = upgrade.currentLevel;
            // Get the cost for the next level
            return upgrade.upgrade.getCost([]);
        };

        // Greedy algorithm to find the cheapest path
        let remainingLevels = levelsNeeded;
        const pathUpgrades: Array<{
            id: number,
            name: string,
            levels: number,
            cost: number,
            boneType: number,
            imageData: ImageData
        }> = [];
        
        const boneTypeCosts = [0, 0, 0, 0]; // Track cost by bone type
        let totalCost = 0;

        while (remainingLevels > 0) {
            // Find the upgrade with the cheapest next level
            let cheapestUpgrade = null;
            let cheapestCost = Infinity;

            for (const upgrade of simulationUpgrades) {
                // Skip if already at max level
                if (upgrade.currentLevel >= upgrade.maxLevel) continue;
                
                const cost = calculateNextLevelCost(upgrade);
                if (cost < cheapestCost) {
                    cheapestCost = cost;
                    cheapestUpgrade = upgrade;
                }
            }

            // If we couldn't find any more upgrades, break
            if (!cheapestUpgrade) break;

            // Add one level to the cheapest upgrade
            cheapestUpgrade.currentLevel++;
            totalCost += cheapestCost;
            boneTypeCosts[cheapestUpgrade.boneType] += cheapestCost;
            remainingLevels--;

            // Find or create an entry in pathUpgrades
            let pathUpgrade = pathUpgrades.find(p => p.id === cheapestUpgrade.id);
            if (!pathUpgrade) {
                pathUpgrade = {
                    id: cheapestUpgrade.id,
                    name: cheapestUpgrade.name,
                    levels: 1,
                    cost: cheapestCost,
                    boneType: cheapestUpgrade.boneType,
                    imageData: cheapestUpgrade.imageData
                };
                pathUpgrades.push(pathUpgrade);
            } else {
                pathUpgrade.levels++;
                pathUpgrade.cost += cheapestCost;
            }
        }

        // Sort path upgrades by bone type and then by id for a cleaner display
        pathUpgrades.sort((a, b) => {
            if (a.boneType !== b.boneType) {
                return a.boneType - b.boneType;
            }
            return a.id - b.id;
        });

        grimoire.unlockPathInfo = {
            nextUnlock,
            pathUpgrades,
            levelsNeeded,
            totalCost,
            boneTypes: boneTypeCosts,
            remainingLevels // This will be > 0 if we couldn't find enough upgrades
        };
    }
} 