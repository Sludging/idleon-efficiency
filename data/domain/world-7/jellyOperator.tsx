import { Domain, RawData } from "../base/domain";
import { initJellyCellRepo, JellyCellBase } from "../data/JellyCellRepo";
import { initJellyFeverRepo, JellyFeverBase } from "../data/JellyFeverRepo";
import { initJellyObstructionRepo, JellyObstructionBase } from "../data/JellyObstructionRepo";
import { initJellyOperationMetadataRepo } from "../data/JellyOperationMetadataRepo";
import { initJellyOperatorUpgradeRepo, JellyOperatorUpgradeBase } from "../data/JellyOperatorUpgradeRepo";
import { Item } from "../items";
import { SkillsIndex } from "../SkillsIndex";
import { JellyCellModel } from "../model/jellyCellModel";
import { JellyObstructionModel } from "../model/jellyObstructionModel";
import { JellyOperatorUpgradeModel } from "../model/jellyOperatorUpgradeModel";
import { lavaLog, lavaLog2, nFormatter } from "../../utility";
import type { ImageData } from "../imageData";
import type { Arcade } from "../world-2/arcade";
import type { AtomCollider } from "../world-3/construction/atomCollider";
import type { ResearchGrid } from "./research";

// Image dimensions cover the eight obtainable cells.
const CELL_DIMENSIONS: [number, number][] = [
    [36, 36],
    [73, 36],
    [36, 109],
    [110, 110],
    [73, 73],
    [36, 36],
    [147, 147],
    [184, 183],
];

export class JellyCell {
    level: number = 0;
    xp: number = 0;
    placedCopies: number = 0;
    unlocked: boolean = false;

    constructor(public index: number, public data: JellyCellModel) { }

    static fromBase(data: JellyCellBase[]): JellyCell[] {
        return data.map(cell => new JellyCell(cell.index, cell.data));
    }

    getXPRequired(): number {
        return 20 * Math.pow(1.3, this.level);
    }

    getImageData(): ImageData {
        const [width, height] = CELL_DIMENSIONS[this.index];
        return { location: `JellyUnit${this.index}`, width, height };
    }
}


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

    getBonusText(): string {
        const bonus = this.getBaseBonus();
        return this.data.description
            .replace(/{/g, nFormatter(bonus, "CommaNotation"))
            .replace(/}/g, nFormatter(1 + bonus / 100, "MultiplierInfo"))
            .replace(/ @ /g, "\n\n");
    }

    getImageData(): ImageData {
        return { location: `JellyOp${this.index}`, width: 50, height: 50 };
    }
}

export class JellyOperatorUpgrade {
    level: number = 0;
    unlocked: boolean = false;
    costReduction: number = 1;
    previousUpgradePurchased: boolean = false;
    descriptionValue: number = 0;

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

    isAvailable(): boolean {
        return this.unlocked && this.previousUpgradePurchased;
    }

    isMaxed = (): boolean => {
        // The game's >998 maximum convention marks high-cap entries as unlimited.
        return this.data.maxLevel <= 998 && this.level >= this.data.maxLevel;
    }

    getImageData(): ImageData {
        // The canonical upgrade ID selects the art, independently of its display position.
        return { location: `JellyUpg${this.index}`, width: 49, height: 55 };
    }

    prepareDescription(jellyOperator: JellyOperator): void {
        const quantity = this.getQuantity();
        switch (this.index) {
            case 9: this.descriptionValue = jellyOperator.plotPurchasesLeft; break;
            case 10: this.descriptionValue = Math.floor(jellyOperator.xpPerHit * 100) / 100; break;
            case 15: this.descriptionValue = Math.round(1 + quantity); break;
            case 17: this.descriptionValue = Math.round(1 + quantity); break;
            case 23: this.descriptionValue = Math.round(jellyOperator.bloodcellGainPerDamage * 100) / 100; break;
            case 29: this.descriptionValue = 1 + (50 + quantity) / 100; break;
            case 32: this.descriptionValue = quantity * Math.floor(jellyOperator.getTotalCellLevels() / 100); break;
            case 33: this.descriptionValue = quantity * jellyOperator.getTotalCellLevels(); break;
            case 34: this.descriptionValue = Math.round(10000 * (1 - this.costReduction)) / 100; break;
            case 38: this.descriptionValue = jellyOperator.getDailyBloodcells(); break;
            default: this.descriptionValue = 0;
        }
    }

    getDescription(): string {
        const quantity = this.getQuantity();
        const special = this.index === 38
            ? nFormatter(this.descriptionValue, "Big")
            : this.index === 29
                ? nFormatter(this.descriptionValue, "MultiplierInfo")
                : this.descriptionValue.toString();
        return this.data.description
            .replace(/{/g, nFormatter(quantity, "CommaNotation"))
            .replace(/}/g, nFormatter(1 + quantity / 100, "MultiplierInfo"))
            .replace(/\$/g, special)
            .replace(/ @ /g, "\n");
    }
}

export class JellyOperator extends Domain {
    obstructions: JellyObstruction[] = [];
    upgrades: JellyOperatorUpgrade[] = [];
    successfulOperations: number = 0;
    bloodcells: number = 0;
    attemptsRemaining: number = 0;
    bestDPS: number = 0;
    bestOperationBloodcells: number = 0;
    selectedFeverIndex: number = 0;
    jellyBundleOwned: boolean = false;
    purchasedPlotCount: number = 0;
    cells: JellyCell[] = JellyCell.fromBase(initJellyCellRepo());
    fevers: JellyFeverBase[] = initJellyFeverRepo();
    private operationMetadata = initJellyOperationMetadataRepo()[0].data;
    private plotPurchaseCounts: number[] = new Array(this.operationMetadata.board.plots.length).fill(0);

    dailyAllowance: number = 2;
    bloodcellGainPerDamage: number = 1;
    xpPerHit: number = 0;
    unlockedTileCount: number = 0;
    plotPurchasesLeft: number = 0;
    selectedFever: JellyFeverBase | null = null;

    static getBloodcellImageData(): ImageData {
        return { location: "Bloodcells", width: 26, height: 24 };
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Research", perPlayer: false, default: [] },
            // Jelly shop unlocks are account-wide and use player 0's Research level.
            { key: "Lv0_0", perPlayer: false, default: [] },
            { key: "BundlesReceived", perPlayer: false, default: {} },
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

        // Successful operations count cleared obstructions and identify the next obstruction.
        jellyOperator.successfulOperations = Number(progression[9]) || 0;
        jellyOperator.attemptsRemaining = Number(progression[10]) || 0;
        jellyOperator.bloodcells = Number(progression[11]) || 0;
        jellyOperator.bestDPS = Number(progression[12]) || 0;
        jellyOperator.selectedFeverIndex = Number(progression[13]) || 0;
        jellyOperator.bestOperationBloodcells = Number(progression[14]) || 0;
        const bundlesReceived = (data.get("BundlesReceived") as Record<string, unknown> | undefined) || {};
        jellyOperator.jellyBundleOwned = Number(bundlesReceived.ban_j) === 1;
        const purchasedPlots = research[18] || [];
        jellyOperator.purchasedPlotCount = purchasedPlots.length;
        jellyOperator.plotPurchaseCounts.fill(0);
        for (const plotIndex of purchasedPlots) {
            jellyOperator.plotPurchaseCounts[Number(plotIndex)]++;
        }
        const cellExperience = research[15] || [];
        const cellLevels = research[16] || [];
        jellyOperator.cells.forEach(cell => {
            cell.level = Number(cellLevels[cell.index]) || 0;
            cell.xp = Number(cellExperience[cell.index]) || 0;
            cell.placedCopies = 0;
            cell.unlocked = false;
        });
        for (const rawCellIndex of research[14] || []) {
            const cellIndex = Number(rawCellIndex);
            if (cellIndex !== -1) {
                jellyOperator.cells[cellIndex].placedCopies++;
            }
        }

        // Research[17] stores Jelly upgrade levels by canonical upgrade ID, not shop position.
        jellyOperator.upgrades.forEach(upgrade => {
            upgrade.level = Number(upgradeLevels[upgrade.index]) || 0;
            upgrade.unlocked = researchLevel >= upgrade.getRequiredLevel();
            upgrade.previousUpgradePurchased = false;
        });

        jellyOperator.obstructions.forEach(obstruction => {
            // An obstruction is cleared only when the current target index has moved past it.
            obstruction.completed = jellyOperator.successfulOperations > obstruction.index;
        });
    }

    getSuccessfulOperations = (): number => {
        return this.successfulOperations;
    }

    getUpgradeQuantity(index: number): number {
        return this.upgrades.find(upgrade => upgrade.index === index)?.getQuantity() ?? 0;
    }

    getUnlockedCellCount(): number {
        return Math.round(Math.min(8, this.cells.reduce((total, cell) =>
            total + (cell.data.passiveDescription != null ? this.getUpgradeQuantity(cell.index) : 0), 0)));
    }

    getTotalCellLevels(): number {
        return this.cells.reduce((total, cell) => total + cell.level, 0);
    }

    calculateUnlockedTileCount(): number {
        const board = this.operationMetadata.board;
        let count = board.initialSlots.length;
        for (const plot of board.plots) {
            count += plot.width * plot.height * this.plotPurchaseCounts[plot.index];
        }
        for (const grant of board.obstructionSlotGrants) {
            if (this.successfulOperations > grant.obstructionIndex) {
                count += grant.slots.length;
            }
        }
        return count;
    }

    // These two static fever bonuses are the save-backed inputs to currency and XP.
    // Cold damage depends on transient operation time and is intentionally not projected.
    getFeverBonus(index: 2 | 3): number {
        return this.selectedFeverIndex === index && this.getUpgradeQuantity(16) >= 1 ? 100 : 0;
    }

    getDPSBloodcellMultiplier(): number {
        return 1 + (Math.min(2, lavaLog2(this.bestDPS / 100) / 20)
            + ((lavaLog(this.bestDPS) / 50) * 15) / (lavaLog(this.bestDPS / 50) + 20));
    }

    getDailyTransfusionPercentage(): number {
        return this.getUpgradeQuantity(38);
    }

    getDailyBloodcells(): number {
        return this.bestOperationBloodcells * (this.getDailyTransfusionPercentage() / 100);
    }

    getCurrentObstruction(): JellyObstruction | undefined {
        return this.obstructions.find(obstruction => obstruction.index === this.successfulOperations);
    }

    getNextObstruction(): JellyObstruction | undefined {
        return this.obstructions.find(obstruction => obstruction.index === this.successfulOperations + 1);
    }

    getCurrentTargetHP(): number {
        const index = this.successfulOperations;
        return index < 12
            ? this.operationMetadata.initialObstructionHp[index]
            : 100000 * Math.pow(1.65, index - 11) * (1 + 0.9 * Math.floor((index - 11) / 12));
    }

    getCurrentTimeLimit(): number {
        return 30 + 5 * Math.floor(this.successfulOperations / 12);
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
        const previousUpgrade = jellyOperator.upgrades.find(candidate => candidate.data.displayIndex === upgrade.data.displayIndex - 1);
        upgrade.previousUpgradePurchased = upgrade.data.displayIndex === 0 || (previousUpgrade?.level ?? 0) >= 1;
    });

    return jellyOperator;
};

// Presentation consumes settled Arcade, Collider, and Research state in the late phase.
export const updateJellyOperatorPresentation = (data: Map<string, any>) => {
    const jellyOperator = data.get("jellyOperator") as JellyOperator;
    const researchGrid = data.get("research") as ResearchGrid;
    const arcade = data.get("arcade") as Arcade;
    const collider = data.get("collider") as AtomCollider;
    const arcadeBonus72 = arcade.bonuses.find(bonus => bonus.index === 72)!.getBonus();
    const atomBonus15 = collider.atoms.find(atom => atom.index === 15)!.getBonus();
    const totalCellLevels = jellyOperator.getTotalCellLevels();

    jellyOperator.dailyAllowance = Math.round(2 + researchGrid.getBonusForId(186, 1));
    jellyOperator.selectedFever = jellyOperator.getUpgradeQuantity(16) >= 1
        ? jellyOperator.fevers.find(fever => fever.index === jellyOperator.selectedFeverIndex) ?? null
        : null;

    jellyOperator.bloodcellGainPerDamage = (1 + (jellyOperator.getUpgradeQuantity(23)
        + (jellyOperator.getUpgradeQuantity(24)
            + (jellyOperator.getUpgradeQuantity(25) + jellyOperator.getUpgradeQuantity(33) * totalCellLevels))) / 100)
        * (1 + arcadeBonus72 / 100)
        * (1 + researchGrid.getBonusForId(187, 0) / 100)
        * (1 + jellyOperator.getFeverBonus(2) / 100)
        * (1 + Number(jellyOperator.jellyBundleOwned))
        * (1 + jellyOperator.obstructions[24].getBonus() / 100)
        * jellyOperator.getDPSBloodcellMultiplier()
        * (1 + jellyOperator.getUpgradeQuantity(26) / 100)
        * (1 + jellyOperator.getUpgradeQuantity(27) / 100)
        * (1 + atomBonus15 / 100);

    // EXPMulti has a base value before Biology is unlocked, but landed hits award no XP then.
    jellyOperator.xpPerHit = jellyOperator.getUpgradeQuantity(10) >= 1
        ? (1 + jellyOperator.getFeverBonus(3) / 100)
        * (1 + (jellyOperator.getUpgradeQuantity(30)
            + (jellyOperator.getUpgradeQuantity(31) + jellyOperator.getUpgradeQuantity(10))) / 100)
        * (1 + jellyOperator.getUpgradeQuantity(11) / 100)
        : 0;

    jellyOperator.plotPurchasesLeft = Math.round(jellyOperator.getUpgradeQuantity(9)
        + (jellyOperator.getUpgradeQuantity(8)
            + (jellyOperator.obstructions[44].getBonus() + Number(jellyOperator.jellyBundleOwned)))
        - jellyOperator.purchasedPlotCount);
    jellyOperator.unlockedTileCount = jellyOperator.calculateUnlockedTileCount();

    const unlockedCellCount = jellyOperator.getUnlockedCellCount();
    for (const cell of jellyOperator.cells) {
        cell.unlocked = cell.data.passiveDescription != null && cell.index < unlockedCellCount;
    }
    for (const upgrade of jellyOperator.upgrades) {
        upgrade.prepareDescription(jellyOperator);
    }

    return jellyOperator;
};


