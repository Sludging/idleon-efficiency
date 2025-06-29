import { nFormatter } from "../utility";
import { Domain, RawData } from "./base/domain";
import { TesseractUpgradeBase, initTesseractUpgradeRepo } from "./data/TesseractUpgradeRepo";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { TesseractUpgradeModel } from "./model/tesseractUpgradeModel";
import { Player } from "./player";
import { ClassIndex } from "./talents";
import { 
    UnlockableUpgrade, 
    UnlockableDomain, 
    UnlockEfficiencyEngine, 
    StandardUnlockEfficiencyCalculator,
    UnlockPathInfo
} from "./base/unlockEfficiencyEngine";

export class TesseractUpgrade implements UnlockableUpgrade {
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

    getCost = (allUpgrades: UnlockableUpgrade[]): number => {
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

    copyUpgrade = (): UnlockableUpgrade => {
        const copy = new TesseractUpgrade(this.id, this.data);
        copy.level = this.level;
        copy.unlocked = this.unlocked;
        copy.bonus = this.bonus;
        copy.cost = this.cost;
        copy.costToMax = this.costToMax;
        copy.costReductionFactor = this.costReductionFactor;
        return copy;
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

    override copyUpgrade = (): UnlockableUpgrade => {
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

export class Tesseract extends Domain implements UnlockableDomain {
    upgrades: TesseractUpgrade[] = [];
    totalTesseractLevel: number = 0;
    
    // Tachyon counts - 6 types instead of 4 bones
    purpleTachyons: number = 0;
    brownTachyons: number = 0;
    greenTachyons: number = 0;
    redTachyons: number = 0;
    silverTachyons: number = 0;
    goldTachyons: number = 0;

    // Unlock path information - using new generalized system
    unlockPathInfo: UnlockPathInfo = {
        nextUnlock: null,
        pathUpgrades: [],
        levelsNeeded: 0,
        totalCost: 0,
        resourceCosts: [0, 0, 0, 0, 0, 0],
        remainingLevels: 0
    };

    // Unlock efficiency engine
    private unlockEngine = new UnlockEfficiencyEngine<Tesseract>();
    private unlockCalculator = new StandardUnlockEfficiencyCalculator<Tesseract>();

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

    // UnlockableDomain interface methods
    copyUpgrade(upgrade: UnlockableUpgrade): UnlockableUpgrade {
        return upgrade.copyUpgrade();
    }

    recalculateUpgrades(upgrades: UnlockableUpgrade[]): void {
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
            const logValue = Math.log10(this.silverTachyons);
            costReductionFactor = 1 / (1 + (upgrade49Bonus * logValue) / 100);
        }

        // Then calculate all bonuses and costs
        tesseractUpgrades.forEach(upgrade => {
            upgrade.costReductionFactor = costReductionFactor;
            upgrade.bonus = upgrade.getBonus(tesseractUpgrades);
            upgrade.cost = upgrade.getCost(tesseractUpgrades);
        });
    }

    getUpgradeResourceType(upgrade: UnlockableUpgrade): number {
        return (upgrade as TesseractUpgrade).data.x1; // Tachyon type
    }

    // ResourceTracker interface methods
    getResourceCount(resourceType: number): number {
        switch (resourceType) {
            case 0: return this.purpleTachyons;
            case 1: return this.brownTachyons;
            case 2: return this.greenTachyons;
            case 3: return this.redTachyons;
            case 4: return this.silverTachyons;
            case 5: return this.goldTachyons;
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

    canAffordUpgrade(upgrade: UnlockableUpgrade, cost: number = upgrade.cost): boolean {
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
                upgrade.unlocked = tesseract.totalTesseractLevel >= upgrade.data.unlock_req;
            }
        });

        // Parse tachyon counts from OptLacc data (indices 388-393)
        if (optionList && optionList.length > 393) {
            tesseract.purpleTachyons = optionList[388] || 0;
            tesseract.brownTachyons = optionList[389] || 0;
            tesseract.greenTachyons = optionList[390] || 0;
            tesseract.redTachyons = optionList[391] || 0;
            tesseract.silverTachyons = optionList[392] || 0;
            tesseract.goldTachyons = optionList[393] || 0;
        }

        // Calculate cost reduction factor from upgrade 49 and Silver Tachyons 
        let costReductionFactor = 1;
        if (tesseract.upgrades[49]?.level > 0) {
            const upgrade49Bonus = tesseract.upgrades[49].level * tesseract.upgrades[49].data.value;
            const logValue = Math.log10(tesseract.silverTachyons);
            costReductionFactor = 1 / (1 + (upgrade49Bonus * logValue) / 100);
        }

        // Set cost reduction factor for all upgrades and pre-calculate bonus, cost and cost to max
        tesseract.upgrades.forEach((upgrade) => {
            upgrade.costReductionFactor = costReductionFactor;
            upgrade.bonus = upgrade.getBonus(tesseract.upgrades);
            upgrade.cost = upgrade.getCost(tesseract.upgrades);
            upgrade.costToMax = upgrade.getCostToMax(tesseract.upgrades);
        });

        // Calculate unlock path using the new generalized system
        // Pass the exact levels needed to ensure we calculate the complete path
        const nextUnlock = tesseract.unlockCalculator.findNextUnlock(tesseract);
        const levelsNeeded = nextUnlock ? Math.max(0, nextUnlock.data.unlock_req - tesseract.totalTesseractLevel) : 0;
        
        tesseract.unlockPathInfo = tesseract.unlockEngine.calculateUnlockPath(
            tesseract, 
            tesseract.unlockCalculator,
            levelsNeeded || 1 // Use at least 1 to avoid issues if no unlock needed
        );

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

    console.log("Updated Arcane Cultist Impact", prismaBubbleUpgrade);
}
