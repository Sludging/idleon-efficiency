import { nFormatter } from "../utility";
import { Domain, RawData } from "./base/domain";
import { UpgradeVaultBase, initUpgradeVaultRepo } from "./data/UpgradeVaultRepo";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { UpgradeVaultModel } from "./model/upgradeVaultModel";

export class VaultUpgBonus {
    public level: number = 0;
    public unlocked: boolean = false;
    public bonus: number = 0;
    public cost: number = 0;
    public costToMax: number = 0;

    constructor(
        public id: number,
        public data: UpgradeVaultModel,
    ) { 
        // Remove the "製" from the name if it exists, they are used in-game to indicate tooltips.
        if (data.name.indexOf("製") > -1) {
            this.data.name = this.data.name.split("製")[0].trim();
        }
        // $ is used as placeholder for additional text (depending on other game mechanics), remove it.
        this.data.name = data.name.replace("$", "");
    }

    static fromBase = (data: UpgradeVaultBase[]): VaultUpgBonus[] => {
        return data.map((upgrade, index) => new VaultUpgBonus(
            index,
            upgrade.data
        ));
    }

    getImageData = (): ImageData => {
        return {
            location: `VaultUpg${this.id}`,
            height: 56,
            width: 51,
        }
    }

    getBonus = (allUpgrades: VaultUpgBonus[]): number => {
        if (this.level === 0) {
            return 0;
        }

        const isSpecialUpgrade = [32, 1, 6, 7, 8, 9, 13, 33, 36, 40, 42, 43, 44, 49, 51, 52, 53, 57, 61].includes(this.id);

        const baseBonus = this.level * this.data.value;
        if (isSpecialUpgrade) {
            return baseBonus;
        }

        // Special handling for base damage upgrade (index 0)
        if (this.id === 0) {
            const extraBonus = (
                Math.max(0, this.level - 25) +
                Math.max(0, this.level - 50) +
                Math.max(0, this.level - 100)
            );
            const vaultMasteryBonus: number = allUpgrades[32]?.getBonus(allUpgrades) || 0;
            return (baseBonus + extraBonus) * (1 + vaultMasteryBonus / 100);
        }

        // Special handling for cooking upgrade (index 60)
        if (this.id === 60) {
            const extraBonus = (
                Math.max(0, this.level - 25) +
                Math.max(0, this.level - 50) +
                2 * Math.max(0, this.level - 100) +
                3 * Math.max(0, this.level - 200) +
                5 * Math.max(0, this.level - 300) +
                7 * Math.max(0, this.level - 400) +
                10 * Math.max(0, this.level - 450)
            );
            const levelMultiplier = 1 + Math.floor(this.level / 25) / 5;
            const vaultMasteryBonus2: number = allUpgrades[61]?.getBonus(allUpgrades) || 0;
            return (baseBonus + extraBonus) * levelMultiplier * (1 + vaultMasteryBonus2 / 100);
        }

        // Regular upgrades with mastery bonuses
        if (this.id < 32) {
            const vaultMasteryBonus: number = allUpgrades[32]?.getBonus(allUpgrades) || 0;
            return this.level * this.data.value * (1 + vaultMasteryBonus / 100);
        }

        if (this.id < 61) {
            const vaultMasteryBonus2: number = allUpgrades[61]?.getBonus(allUpgrades) || 0;
            return this.level * this.data.value * (1 + vaultMasteryBonus2 / 100);
        }

        return baseBonus;
    }

    getCost = (allUpgrades: VaultUpgBonus[]): number => {
        if (this.level >= this.data.max_level) {
            return 0;
        }

        const baseCost = this.level + (this.data.base_cost + this.level) * Math.pow(this.data.scaling_factor, this.level);
        
        // First 33 upgrades can have cost reduction from upgrade 13.
        if (this.id < 33) {
            const summoningBonus: number = allUpgrades[13]?.getBonus(allUpgrades) || 0;
            return Math.max(0.1, 1 - summoningBonus / 100) * baseCost;
        }

        return baseCost;
    }

    getCostToMax = (allUpgrades: VaultUpgBonus[]): number => {
        let totalCost = 0;
        const tempUpgrade = new VaultUpgBonus(this.id, this.data);
        tempUpgrade.level = this.level;

        for (let i = this.level; i < this.data.max_level; i++) {
            totalCost += tempUpgrade.getCost(allUpgrades);
            tempUpgrade.level++;
        }

        return totalCost;
    }

    getDescription = (): string => {
        // For now we only care about line1
        /* const fullDescription = this.data.description_line2 ?
            [this.data.description_line1, this.data.description_line2].join(' ') :
            this.data.description_line1; */

        const fullDescription = this.data.description_line1;
        return fullDescription.replace('{', this.bonus.toFixed(2)).replace('}', nFormatter(1 + this.bonus / 100, "MultiplierInfo"));
    }
}

export class UpgradeVault extends Domain {
    bonuses: VaultUpgBonus[] = [];
    totalVaultLevel: number = 0;

    getRawKeys(): RawData[] {   
        return [
            { key: "UpgVault", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.bonuses = VaultUpgBonus.fromBase(initUpgradeVaultRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const upgradeVault = data.get(this.getDataKey()) as UpgradeVault;
        const upgradesData = data.get("UpgVault") as number[];
    
        // Calculate total vault level first
        upgradeVault.totalVaultLevel = upgradesData.reduce((sum, level) => sum + level, 0);
    
        upgradesData.forEach((level, index) => {
            if (index < upgradeVault.bonuses.length) {
                const upgrade = upgradeVault.bonuses[index];
                upgrade.level = level;
                
                // Set unlocked status based on total vault level
                upgrade.unlocked = upgradeVault.totalVaultLevel >= upgrade.data.unlock_req;
            }
        });

        // Pre-calculate bonus, cost and cost to max for each upgrade
        // We first need the bonuses for special upgrades that impact other upgrades
        const specialUpgrades = [13, 32, 61];
        const specialUpgradesBonuses = upgradeVault.bonuses.filter(bonus => specialUpgrades.includes(bonus.id));

        specialUpgradesBonuses.forEach(bonus => {
            bonus.bonus = bonus.getBonus(upgradeVault.bonuses);
            bonus.cost = bonus.getCost(upgradeVault.bonuses);
            bonus.costToMax = bonus.getCostToMax(upgradeVault.bonuses);
        });

        // Then we can calculate the bonuses for the other upgrades
        upgradeVault.bonuses.forEach(bonus => {
            bonus.bonus = bonus.getBonus(upgradeVault.bonuses);
            bonus.cost = bonus.getCost(upgradeVault.bonuses);
            bonus.costToMax = bonus.getCostToMax(upgradeVault.bonuses);
        });
    }

    getBonusForId = (id: number): number => {
        const upgrade = this.bonuses.find(bonus => bonus.id === id);
        if (!upgrade) {
            return 0;
        }

        return upgrade.getBonus(this.bonuses);
    }
} 