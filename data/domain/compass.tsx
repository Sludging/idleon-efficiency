import { nFormatter } from "../utility";
import { Domain, RawData } from "./base/domain";
import { CompassUpgradeBase, initCompassUpgradeRepo } from "./data/CompassUpgradeRepo";
import { initRandoListRepo } from "./data/RandoListRepo";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { CompassUpgradeModel } from "./model/compassUpgradeModel";

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

export class CompassUpgrade {
    public level: number = 0;
    public unlocked: boolean = false;
    public bonus: number = 0;
    public cost: number = 0;
    public costToMax: number = 0;

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
        return {
            location: `CompassUpg${this.id}`,
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

    getCost = (allUpgrades: CompassUpgrade[], upgradeMetadata: Record<string, { pathLevel: number, pathUpgrades: number[] }>): number => {
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
                const bonus151 = allUpgrades.find(u => u.id === 151)?.getBonus(allUpgrades) || 0;
                const bonus152 = allUpgrades.find(u => u.id === 152)?.getBonus(allUpgrades) || 0;
                const bonus153 = allUpgrades.find(u => u.id === 153)?.getBonus(allUpgrades) || 0;
                costReduction = 1 + (bonus151 + (bonus152 + bonus153)) / 100;
                break;
            case 43:
                // Uses bonuses from upgrades 154, 156
                const bonus154 = allUpgrades.find(u => u.id === 154)?.getBonus(allUpgrades) || 0;
                const bonus156 = allUpgrades.find(u => u.id === 156)?.getBonus(allUpgrades) || 0;
                costReduction = 1 + (bonus154 + bonus156) / 100;
                break;
            case 48:
                // Uses bonuses from upgrades 155, 157, 158
                const bonus155 = allUpgrades.find(u => u.id === 155)?.getBonus(allUpgrades) || 0;
                const bonus157 = allUpgrades.find(u => u.id === 157)?.getBonus(allUpgrades) || 0;
                const bonus158 = allUpgrades.find(u => u.id === 158)?.getBonus(allUpgrades) || 0;
                costReduction = 1 + (bonus155 + (bonus157 + bonus158)) / 100;
                break;
            case 57:
                // Uses bonuses from upgrades 159, 160, 161, 168
                const bonus159 = allUpgrades.find(u => u.id === 159)?.getBonus(allUpgrades) || 0;
                const bonus160 = allUpgrades.find(u => u.id === 160)?.getBonus(allUpgrades) || 0;
                const bonus161 = allUpgrades.find(u => u.id === 161)?.getBonus(allUpgrades) || 0;
                const bonus168 = allUpgrades.find(u => u.id === 168)?.getBonus(allUpgrades) || 0;
                costReduction = 1 + (bonus159 + (bonus160 + (bonus161 + bonus168))) / 100;
                break;
            case 51:
                // Uses bonuses from upgrades 162, 163, 164, 166, 167
                const bonus162 = allUpgrades.find(u => u.id === 162)?.getBonus(allUpgrades) || 0;
                const bonus163 = allUpgrades.find(u => u.id === 163)?.getBonus(allUpgrades) || 0;
                const bonus164 = allUpgrades.find(u => u.id === 164)?.getBonus(allUpgrades) || 0;
                const bonus166 = allUpgrades.find(u => u.id === 166)?.getBonus(allUpgrades) || 0;
                const bonus167 = allUpgrades.find(u => u.id === 167)?.getBonus(allUpgrades) || 0;
                costReduction = 1 + (bonus162 + (bonus163 + (bonus164 + (bonus166 + bonus167)))) / 100;
                break;
            case 54:
                // Uses bonuses from upgrades 165, 169
                const bonus165 = allUpgrades.find(u => u.id === 165)?.getBonus(allUpgrades) || 0;
                const bonus169 = allUpgrades.find(u => u.id === 169)?.getBonus(allUpgrades) || 0;
                costReduction = 1 + (bonus165 + bonus169) / 100;
                break;
        }

        // General cost reduction from CompassBonus upgrades 36 and 77
        const bonus36 = allUpgrades.find(u => u.id === 36)?.getBonus(allUpgrades) || 0;
        const bonus77 = allUpgrades.find(u => u.id === 77)?.getBonus(allUpgrades) || 0;
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
}

export class Compass extends Domain {
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
            pathLevel:  abominationsRaw.length, 
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
} 