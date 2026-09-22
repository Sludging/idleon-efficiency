import { Domain, RawData } from "../base/domain";
import { initJellyObstructionRepo, JellyObstructionBase } from "../data/JellyObstructionRepo";
import { initJellyOperatorUpgradeRepo, JellyOperatorUpgradeBase } from "../data/JellyOperatorUpgradeRepo";
import { Item } from "../items";
import { SkillsIndex } from "../SkillsIndex";
import { JellyObstructionModel } from "../model/jellyObstructionModel";
import { JellyOperatorUpgradeModel } from "../model/jellyOperatorUpgradeModel";


export class JellyObstruction {
    completed: boolean = false;

    constructor(public index: number, public data: JellyObstructionModel) { }

    static fromBase(data: JellyObstructionBase[]): JellyObstruction[] {
        return data.map(obstruction => new JellyObstruction(obstruction.index, obstruction.data));
    }

    getBaseBonus = (): number => {
        return this.data.bonusValue;
    }

    getBonus = (): number => {
        // An obstruction's catalog bonus is earned only after its operation index is cleared.
        return this.completed ? this.getBaseBonus() : 0;
    }
}

export class JellyOperatorUpgrade {
    level: number = 0;
    unlocked: boolean = false;
    costReduction: number = 1;

    constructor(public index: number, public data: JellyOperatorUpgradeModel) { }

    static fromBase(data: JellyOperatorUpgradeBase[]): JellyOperatorUpgrade[] {
        return data.map(upgradeData => new JellyOperatorUpgrade(upgradeData.index, upgradeData.data));
    }

    getQuantity = (): number => {
        return this.data.bonusPerLevel * this.level;
    }

    getBonus = (): number => {
        return this.getQuantity();
    }

    getRequiredLevel = (): number => {
        const position = this.data.displayIndex;
        return 15 + 2 * position + Math.floor(position / 15) - Math.floor(position / 11);
    }

    getUpgradeCost = (): number => {
        const position = this.data.displayIndex;
        if (position <= 0) {
            return 0;
        }

        const costScale = this.data.costMultiplier === 0 ? 1 : this.data.costMultiplier;
        // Keep the game's source order: menu-position scaling, late-shop factors,
        // Lower Cholesterol, then the mapped upgrade's exponentiation.
        return Math.max(0.1, costScale)
            * (1 + position / 7)
            * (6 + 5 * position + Math.pow(Math.max(0, position), 2))
            * Math.pow(1.4 + Math.max(0, position - 3) / 30, Math.max(0, position - 4))
            * Math.pow(1.3, Math.max(0, position - 20))
            * this.costReduction
            * Math.pow(this.data.costExponent, this.level);
    }

    isUnlocked = (): boolean => {
        return this.unlocked;
    }

    isMaxed = (): boolean => {
        // The game's >998 maximum convention marks high-cap entries as unlimited.
        return this.data.maxLevel <= 998 && this.level >= this.data.maxLevel;
    }
}

export class JellyOperator extends Domain {
    obstructions: JellyObstruction[] = [];
    upgrades: JellyOperatorUpgrade[] = [];
    successfulOperations: number = 0;
    bloodcells: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "Research", perPlayer: false, default: [] },
            // Jelly shop unlocks are account-wide and use player 0's Research level.
            { key: "Lv0_0", perPlayer: false, default: [] },
        ];
    }

    init(_allItems: Item[], _charCount: number) {
        if (this.obstructions.length === 0) {
            this.obstructions = JellyObstruction.fromBase(initJellyObstructionRepo());
        }
        if (this.upgrades.length === 0) {
            this.upgrades = JellyOperatorUpgrade.fromBase(initJellyOperatorUpgradeRepo());
        }
        return this;
    }

    parse(data: Map<string, any>): void {
        const jellyOperator = data.get(this.getDataKey()) as JellyOperator;
        const research = (data.get("Research") as number[][] | undefined) || [];
        const progression = research[7] || [];
        const upgradeLevels = research[17] || [];
        const player0Skills = (data.get("Lv0_0") as number[] | undefined) || [];
        const researchLevel = Number(player0Skills[SkillsIndex.Research]) || 0;

        // Research[7][9] is the account-wide count incremented after each cleared obstruction.
        jellyOperator.successfulOperations = Number(progression[9]) || 0;
        jellyOperator.bloodcells = Number(progression[11]) || 0;

        // Research[17] stores Jelly upgrade levels by canonical upgrade ID, not shop position.
        jellyOperator.upgrades.forEach(upgrade => {
            upgrade.level = Number(upgradeLevels[upgrade.index]) || 0;
            upgrade.unlocked = researchLevel >= upgrade.getRequiredLevel();
        });

        jellyOperator.obstructions.forEach(obstruction => {
            // Completion is strictly after the account-wide successful-operation index.
            obstruction.completed = jellyOperator.successfulOperations > obstruction.index;
        });
    }

    getSuccessfulOperations = (): number => {
        return this.successfulOperations;
    }

    canAffordUpgrade(index: number): boolean {
        const upgrade = this.upgrades.find(candidate => candidate.index === index);
        if (!upgrade) {
            return false;
        }

        const menuPosition = upgrade.data.displayIndex;
        const previousUpgrade = menuPosition > 0
            ? this.upgrades.find(candidate => candidate.data.displayIndex === menuPosition - 1)
            : undefined;
        const previousLevel = menuPosition === 0
            ? 1
            : previousUpgrade?.level ?? 0;

        return previousLevel >= 1
            && this.bloodcells >= upgrade.getUpgradeCost()
            && !upgrade.isMaxed();
    }

    canBuyUpgrade(index: number): boolean {
        const upgrade = this.upgrades.find(candidate => candidate.index === index);
        return upgrade !== undefined && upgrade.isUnlocked() && this.canAffordUpgrade(index);
    }
}

export const updateJellyOperator = (data: Map<string, any>) => {
    const jellyOperator = data.get("jellyOperator") as JellyOperator;
    const lowerCholesterolQuantity = jellyOperator.upgrades.find(upgrade => upgrade.index === 34)?.getQuantity() ?? 0;
    const costReduction = 1 / (1 + lowerCholesterolQuantity / 100);

    jellyOperator.upgrades.forEach(upgrade => {
        upgrade.costReduction = costReduction;
    });

    return jellyOperator;
};


