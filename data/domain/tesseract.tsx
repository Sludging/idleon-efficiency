import { nFormatter } from "../utility";
import { Domain, RawData } from "./base/domain";
import { TesseractUpgradeBase, initTesseractUpgradeRepo } from "./data/TesseractUpgradeRepo";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { TesseractUpgradeModel } from "./model/tesseractUpgradeModel";
import { Player } from "./player";
import { ClassIndex } from "./talents";
import { 
    EfficiencyUpgrade, 
    EfficiencyDomain, 
    EfficiencyEngine, 
    EfficiencyPathInfo
} from "../../lib/efficiencyEngine/efficiencyEngine";
import { CheapestPathCalculator } from "../../lib/efficiencyEngine/calculators";

export class TesseractUpgrade implements EfficiencyUpgrade {
    public level: number = 0;
    public unlocked: boolean = false;
    public bonus: number = 0;
    public cost: number = 0;
    public costToMax: number = 0;
    public costReductionFactor: number = 1;

    constructor(
        public id: number,
        public data: TesseractUpgradeModel,
    ) { }

    static fromBase = (data: TesseractUpgradeBase[]): TesseractUpgrade[] => {
        return data.map((upgrade, index) => {
            if (upgrade.index === 3) {
                return new PrismaBubbleTesseractUpgrade(index, upgrade.data);
            }
            return new TesseractUpgrade(index, upgrade.data);
        });
    }

    getImageData = (): ImageData => {
        return {
            location: `ArcaneUpg${this.id}`,
            height: 56,
            width: 51,
        }
    }

    getBonus = (allUpgrades: TesseractUpgrade[]): number => {
        if (this.level === 0) {
            return 0;
        }

        // Special upgrades that don't get the bonus from upgrade 39 (similar to Grimoire's Writhing Grimoire)
        const specialUpgrades = [3, 7, 8, 10, 13, 16, 20, 25, 26, 28, 33, 35, 39, 40, 43, 45, 48, 57, 58];
        const isSpecialUpgrade = specialUpgrades.includes(this.id);

        if (isSpecialUpgrade) {
            return this.level * this.data.value;
        }

        // Apply the bonus from upgrade 39 to other upgrades
        const upgrade39Bonus = allUpgrades[39]?.level > 0 ? 
            (allUpgrades[39].level * allUpgrades[39].data.value) : 0;

        // Apply the bonus based on level and value with upgrade 39 multiplier
        return this.level * this.data.value * (1 + upgrade39Bonus / 100);
    }

    getCost = (allUpgrades: EfficiencyUpgrade[]): number => {
        if (this.level >= this.data.max_level) {
            return 0;
        }

        // Base cost calculation from game formula with cost reduction factor
        const baseCost = this.costReductionFactor * 
            3 * 
            Math.pow(1.04, this.id) * 
            (this.level + (this.data.base_cost + this.level) * 
            Math.pow(this.data.scaling_factor + 0.01, this.level));

        return baseCost;
    }

    getCostType(): number {
        return this.data.x1;
    }

    getCostToMax = (allUpgrades: TesseractUpgrade[]): number => {
        let totalCost = 0;
        const tempUpgrade = new TesseractUpgrade(this.id, this.data);
        tempUpgrade.level = this.level;
        tempUpgrade.costReductionFactor = this.costReductionFactor;

        for (let i = this.level; i < this.data.max_level; i++) {
            totalCost += tempUpgrade.getCost(allUpgrades);
            tempUpgrade.level++;
        }

        return totalCost;
    }

    getCostForNextNLevels = (allUpgrades: TesseractUpgrade[], levels: number): number => {
        let totalCost = 0;
        const tempUpgrade = new TesseractUpgrade(this.id, this.data);
        tempUpgrade.level = this.level;
        tempUpgrade.costReductionFactor = this.costReductionFactor;

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
        if (description.includes('$')) {
            // For special upgrade descriptions
            description = description.replace('$', this.bonus.toFixed(0));
        }

        return description;
    }

    copyUpgrade = (): EfficiencyUpgrade => {
        const copy = new TesseractUpgrade(this.id, this.data);
        copy.level = this.level;
        copy.unlocked = this.unlocked;
        copy.bonus = this.bonus;
        copy.cost = this.cost;
        copy.costToMax = this.costToMax;
        copy.costReductionFactor = this.costReductionFactor;
        return copy;
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
        return this.data.max_level;
    }

    getUnlockRequirement(): number | undefined {
        return this.data.unlock_req;
    }
}

export class PrismaBubbleTesseractUpgrade extends TesseractUpgrade {
    prismaBubblesFound: number = 0;
    tesseractUpgrade51Bonus: number = 0;
    dropRarity: number = 1;
    currentMap: number = 1;
    talent594Value: number = 1;

    private getPrismaChance = (): number => {
        // First part: Base chance calculation
        const baseDenominator = 1e3 * Math.pow(1.27, this.prismaBubblesFound);
        const baseChance = 1 / baseDenominator;

        // Second part: Drop rarity multiplier with tesseract upgrade 51 bonus
        const dropRarityMultiplier = Math.max(1, 
            (this.dropRarity - 1) * (this.tesseractUpgrade51Bonus / 100)
        );

        // Third part: Talent and map multiplier
        const mapMultiplier = Math.pow(1.5, Math.floor(this.currentMap / 50));
        const talentMultiplier = Math.max(1, this.talent594Value * mapMultiplier);

        // Final chance calculation
        return baseChance * dropRarityMultiplier * talentMultiplier;
    }

    override getDescription = (): string => {
        let description = this.data.description;
        description = description.replace('$', (1 / this.getPrismaChance()).toFixed(0));
        return description;
    }

    override copyUpgrade = (): EfficiencyUpgrade => {
        const copy = new PrismaBubbleTesseractUpgrade(this.id, this.data);
        copy.prismaBubblesFound = this.prismaBubblesFound;
        copy.tesseractUpgrade51Bonus = this.tesseractUpgrade51Bonus;
        copy.dropRarity = this.dropRarity;
        copy.currentMap = this.currentMap;
        copy.talent594Value = this.talent594Value;
        copy.level = this.level;
        copy.unlocked = this.unlocked;
        copy.bonus = this.bonus;
        copy.cost = this.cost;
        copy.costToMax = this.costToMax;
        copy.costReductionFactor = this.costReductionFactor;
        return copy;
    }

    constructor(id: number, data: TesseractUpgradeModel) {
        super(id, data);
    }
}

export enum TesseractType {
    Purple = 0,
    Brown = 1,
    Green = 2,
    Red = 3,
    Silver = 4,
    Gold = 5,
}

export class Tesseract extends Domain implements EfficiencyDomain {
    upgrades: TesseractUpgrade[] = [];
    totalTesseractLevel: number = 0;
    
    // Tachyon counts - 6 types instead of 4 bones
    resources: Record<TesseractType, number> = {
        [TesseractType.Purple]: 0,
        [TesseractType.Brown]: 0,
        [TesseractType.Green]: 0,
        [TesseractType.Red]: 0,
        [TesseractType.Silver]: 0,
        [TesseractType.Gold]: 0,
    }

    // Default path information
    // TODO: Think if I need this as a placeholder or not.
    unlockPathInfo: EfficiencyPathInfo = {
        goal: "Next Unlock Path",
        pathUpgrades: [],
        totalValue: 0,
        resourceCosts: {
            [TesseractType.Purple]: 0,
            [TesseractType.Brown]: 0,
            [TesseractType.Green]: 0,
            [TesseractType.Red]: 0,
            [TesseractType.Silver]: 0,
            [TesseractType.Gold]: 0,
        },
    };

    // Unlock efficiency engine
    private unlockEngine = new EfficiencyEngine<Tesseract>();
    private unlockCalculator = new CheapestPathCalculator<Tesseract>();

    get totalLevel(): number {
        return this.totalTesseractLevel;
    }

    prismaBubblesFound: number = 0;

    getRawKeys(): RawData[] {   
        return [
            { key: "Arcane", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.upgrades = TesseractUpgrade.fromBase(initTesseractUpgradeRepo());
        return this;
    }

    // EfficiencyDomain interface methods
    copyUpgrade(upgrade: EfficiencyUpgrade): EfficiencyUpgrade {
        return upgrade.copyUpgrade();
    }

    recalculateUpgrades(upgrades: EfficiencyUpgrade[]): void {
        const tesseractUpgrades = upgrades as TesseractUpgrade[];
        
        // First calculate special bonuses that affect other upgrades (upgrade 39)
        const upgrade39 = tesseractUpgrades[39];
        if (upgrade39) {
            upgrade39.bonus = upgrade39.getBonus(tesseractUpgrades);
        }

        // Calculate cost reduction factor from upgrade 49 and Silver Tachyons 
        let costReductionFactor = 1;
        if (tesseractUpgrades[49]?.level > 0) {
            const upgrade49Bonus = tesseractUpgrades[49].level * tesseractUpgrades[49].data.value;
            const logValue = Math.log10(this.resources[TesseractType.Silver]);
            costReductionFactor = 1 / (1 + (upgrade49Bonus * logValue) / 100);
        }

        // Then calculate all bonuses and costs
        tesseractUpgrades.forEach(upgrade => {
            upgrade.costReductionFactor = costReductionFactor;
            upgrade.bonus = upgrade.getBonus(tesseractUpgrades);
            upgrade.cost = upgrade.getCost(tesseractUpgrades);
        });
    }

    // Provide additional cost arguments for tesseract upgrades (none needed)
    getAdditionalCostArgs(): any[] {
        return [];
    }

    getResources(): Record<number, number> {
        return this.resources;
    }

    // ResourceTracker interface methods
    getResourceCount(resourceType: number): number {
        switch (resourceType) {
            case TesseractType.Purple: return this.resources[TesseractType.Purple];
            case TesseractType.Brown: return this.resources[TesseractType.Brown];
            case TesseractType.Green: return this.resources[TesseractType.Green];
            case TesseractType.Red: return this.resources[TesseractType.Red];
            case TesseractType.Silver: return this.resources[TesseractType.Silver];
            case TesseractType.Gold: return this.resources[TesseractType.Gold];
            default: return 0;
        }
    }

    getResourceImageData(resourceType: number): ImageData {
        return {
            location: `Tach${resourceType}_x1`,
            height: 36,
            width: 36,
        }
    }

    canAffordUpgrade(upgrade: EfficiencyUpgrade, cost: number = upgrade.getCost([])): boolean {
        // TODO: Implement tachyon cost checking - need to understand which tachyon types are used for which upgrades
        // For now, returning true as placeholder
        return true;
    }

    // Legacy methods for backward compatibility
    getTachyonCount(tachyonType: number): number {
        return this.getResourceCount(tachyonType);
    }

    getTachyonImageData(tachyonType: number): ImageData {
        return this.getResourceImageData(tachyonType);
    }

    getPrismaBubbleImageData(): ImageData {
        return {
            location: `Quest99_x1`,
            height: 38,
            width: 38,
        }
    }

    getNextLockedUpgrade(): EfficiencyUpgrade | null {
        return this.upgrades
        .filter(u => !u.isUnlocked() && u.getUnlockRequirement?.() != null)
        .sort((a, b) => (a.getUnlockRequirement?.() || 0) - (b.getUnlockRequirement?.() || 0))[0] || null;
    }

    parse(data: Map<string, any>): void {
        const tesseract = data.get(this.getDataKey()) as Tesseract;
        const upgradesData = data.get("Arcane") as number[];
        const optionList = data.get("OptLacc") as number[];
        
        // Calculate total tesseract level first
        tesseract.totalTesseractLevel = upgradesData.reduce((sum, level) => sum + level, 0);
    
        upgradesData.forEach((level, index) => {
            if (index < tesseract.upgrades.length) {
                const upgrade = tesseract.upgrades[index];
                upgrade.level = level;
                
                // Set unlocked status based on total tesseract level
                const unlockReq = upgrade.getUnlockRequirement();
                upgrade.unlocked = tesseract.totalTesseractLevel >= (unlockReq || 0);
            }
        });

        // Parse tachyon counts from OptLacc data (indices 388-393)
        if (optionList && optionList.length > 393) {
            tesseract.resources[TesseractType.Purple] = optionList[388] || 0;
            tesseract.resources[TesseractType.Brown] = optionList[389] || 0;
            tesseract.resources[TesseractType.Green] = optionList[390] || 0;
            tesseract.resources[TesseractType.Red] = optionList[391] || 0;
            tesseract.resources[TesseractType.Silver] = optionList[392] || 0;
            tesseract.resources[TesseractType.Gold] = optionList[393] || 0;
        }

        // Calculate cost reduction factor from upgrade 49 and Silver Tachyons 
        let costReductionFactor = 1;
        if (tesseract.upgrades[49]?.level > 0) {
            const upgrade49Bonus = tesseract.upgrades[49].level * tesseract.upgrades[49].data.value;
            const logValue = Math.log10(tesseract.resources[TesseractType.Silver]);
            costReductionFactor = 1 / (1 + (upgrade49Bonus * logValue) / 100);
        }

        // Set cost reduction factor for all upgrades and pre-calculate bonus, cost and cost to max
        tesseract.upgrades.forEach((upgrade) => {
            upgrade.costReductionFactor = costReductionFactor;
            upgrade.bonus = upgrade.getBonus(tesseract.upgrades);
            upgrade.cost = upgrade.getCost(tesseract.upgrades);
            upgrade.costToMax = upgrade.getCostToMax(tesseract.upgrades);
        });

        // Find the next locked item with the lowest requirement
        const nextUnlock = this.getNextLockedUpgrade();

        const levelsNeeded = nextUnlock ? Math.max(0, (nextUnlock.getUnlockRequirement?.() || 0) - tesseract.totalTesseractLevel) : 0;
        
        if (levelsNeeded > 0) {
            tesseract.unlockPathInfo = tesseract.unlockEngine.calculateEfficiency(
                tesseract, 
                tesseract.unlockCalculator,
                levelsNeeded
            );
        }

        // Parse Prisma Bubble data
        tesseract.prismaBubblesFound = optionList[395] || 0;
        const prismaBubbleUpgrade = tesseract.upgrades[3] as PrismaBubbleTesseractUpgrade;
        prismaBubbleUpgrade.prismaBubblesFound = tesseract.prismaBubblesFound;
        prismaBubbleUpgrade.tesseractUpgrade51Bonus = tesseract.upgrades[51].getBonus(tesseract.upgrades);
        // TODO: Post parsing, since we need character data to calculate drop rarity and current map
        // prismaBubbleUpgrade.dropRarity = 0
        // prismaBubbleUpgrade.currentMap = 0;
        // prismaBubbleUpgrade.talent594Value = 0;
    }
} 

export const updateArcaneCultistImpact = (accountData: Map<string, any>) => {
    const tesseract = accountData.get("tesseract") as Tesseract;
    const players = accountData.get("players") as Player[];
    const prismaBubbleUpgrade = tesseract.upgrades[3] as PrismaBubbleTesseractUpgrade;

    const arcaneCultist = players.slice().sort((player1, player2) => player1.level > player2.level ? -1 : 1).find((player: any) => player.classId === ClassIndex.Arcane_Cultist);

    if (arcaneCultist) {
        prismaBubbleUpgrade.dropRarity = 1; // TODO: Get real DR at some point
        prismaBubbleUpgrade.currentMap = arcaneCultist.currentMapId;
        prismaBubbleUpgrade.talent594Value = arcaneCultist.talents.find((talent: any) => talent.skillIndex === 594)?.getBonus() || 0;
    }
}
