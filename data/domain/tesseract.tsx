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
import { EfficiencyCalculator } from "../../lib/efficiencyEngine/efficiencyEngine";
import { Sneaking } from "./world-6/sneaking";
import { Arcade } from "./world-2/arcade";
import { Lab } from "./world-4/lab";
import { Emperor } from "./world-6/emperor";

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

    getCost = (_allUpgrades: EfficiencyUpgrade[]): number => {
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
        const tempUpgrade = this.copyUpgrade() as TesseractUpgrade;

        for (let i = this.level; i < this.data.max_level; i++) {
            totalCost += tempUpgrade.getCost(allUpgrades);
            tempUpgrade.level++;
        }

        return totalCost;
    }

    getCostForNextNLevels = (allUpgrades: TesseractUpgrade[], levels: number): number => {
        let totalCost = 0;
        const tempUpgrade = this.copyUpgrade() as TesseractUpgrade;

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

// Damage efficiency calculator implementation
class DamageEfficiencyCalculator implements EfficiencyCalculator<Tesseract> {
    name = "Arcane Damage";

    getRelevantUpgradeIds(_: Tesseract): number[] {
        return [
            // Flat damage bonuses
            0,  // Arcanist Damage
            6,  // Arcanist Damage II
            15, // Arcanist Damage III
            36, // Arcanist Damage IV
            50, // Arcanist Damage V
            // Percentage damage bonuses
            4,  // Arcanist Cataclysm
            24, // Arcanist Cataclysm II
            31, // Arcanist Cataclysm III
            42, // Arcanist Cataclysm IV
            53, // Arcanist Cataclysm V
            // Log-based bonuses
            12  // Singulon Hoarding
        ];
    }

    calculateCurrentValue(domain: Tesseract): number {
        return domain.calculateArcaneDamage();
    }

    calculateValueWithUpgrade(domain: Tesseract, simulatedUpgrades: EfficiencyUpgrade[], upgradeId: number, simulatedResources: Record<number, number>): number {
        // Create a working copy of the simulated upgrades with the specified upgrade at +1 level
        const tempUpgrades = simulatedUpgrades.map(u => domain.copyUpgrade(u)) as TesseractUpgrade[];
        const targetUpgrade = tempUpgrades.find(u => u.id === upgradeId);

        if (!targetUpgrade) return this.calculateCurrentValue(domain);

        targetUpgrade.level += 1;
        domain.recalculateUpgrades(tempUpgrades);

        // Convert simulatedResources to TesseractType format
        const simulatedTachyons = simulatedResources as Record<TesseractType, number>;

        // Calculate damage with temporary upgrades
        return domain.calculateDamageWithUpgrades(tempUpgrades, simulatedTachyons);
    }
}

// Tachyon gain efficiency calculator implementation
class TachyonGainEfficiencyCalculator implements EfficiencyCalculator<Tesseract> {
    name = "Tachyon Drop Rate";

    getRelevantUpgradeIds(_: Tesseract): number[] {
        return [
            // Direct tachyon bonuses
            17, // Ripple in Spacetime
            // Log-based bonuses
            34, // Verdon Hoarding
            56  // Aurion Hoarding
        ];
    }

    calculateCurrentValue(domain: Tesseract): number {
        return domain.calculateTachyonDropRate();
    }

    calculateValueWithUpgrade(domain: Tesseract, simulatedUpgrades: EfficiencyUpgrade[], upgradeId: number, simulatedResources: Record<number, number>): number {
        // Create a working copy of the simulated upgrades with the specified upgrade at +1 level
        const tempUpgrades = simulatedUpgrades.map(u => domain.copyUpgrade(u)) as TesseractUpgrade[];
        const targetUpgrade = tempUpgrades.find(u => u.id === upgradeId);

        if (!targetUpgrade) return this.calculateCurrentValue(domain);

        targetUpgrade.level += 1;
        domain.recalculateUpgrades(tempUpgrades);

        // Convert simulatedResources to TesseractType format
        const simulatedTachyons = simulatedResources as Record<TesseractType, number>;

        // Calculate tachyon drop rate with temporary upgrades
        return domain.calculateTachyonDropWithUpgrades(tempUpgrades, simulatedTachyons);
    }
}

// Accuracy efficiency calculator implementation
class AccuracyEfficiencyCalculator implements EfficiencyCalculator<Tesseract> {
    name = "Arcane Accuracy";

    getRelevantUpgradeIds(_: Tesseract): number[] {
        return [
            // Flat accuracy bonuses
            1, 9, 19, 38, 52,
            // Percentage accuracy bonuses
            22, 44, 55,
            // Brown-based bonus
            27,
            // Upgrade 39 affects other upgrades
            39
        ];
    }

    calculateCurrentValue(domain: Tesseract): number {
        return domain.calculateArcaneAccuracy();
    }

    calculateValueWithUpgrade(domain: Tesseract, simulatedUpgrades: EfficiencyUpgrade[], upgradeId: number, simulatedResources: Record<number, number>): number {
        // Create a working copy of the simulated upgrades with the specified upgrade at +1 level
        const tempUpgrades = simulatedUpgrades.map(u => domain.copyUpgrade(u)) as TesseractUpgrade[];
        const targetUpgrade = tempUpgrades.find(u => u.id === upgradeId);

        if (!targetUpgrade) return this.calculateCurrentValue(domain);

        targetUpgrade.level += 1;
        domain.recalculateUpgrades(tempUpgrades);

        // Convert simulatedResources to TesseractType format
        const simulatedTachyons = simulatedResources as Record<TesseractType, number>;

        // Calculate accuracy with temporary upgrades
        return domain.calculateAccuracyWithUpgrades(tempUpgrades, simulatedTachyons);
    }
}

// Defense efficiency calculator implementation
class DefenseEfficiencyCalculator implements EfficiencyCalculator<Tesseract> {
    name = "Arcane Defense";

    getRelevantUpgradeIds(_: Tesseract): number[] {
        return [
            // Flat defense bonuses
            2, 11, 29, 46,
            // Percentage defense bonuses (shared with accuracy)
            22, 44, 55,
            // Red-based bonus
            41,
            // Upgrade 39 affects other upgrades
            39
        ];
    }

    calculateCurrentValue(domain: Tesseract): number {
        return domain.calculateArcaneDefense();
    }

    calculateValueWithUpgrade(domain: Tesseract, simulatedUpgrades: EfficiencyUpgrade[], upgradeId: number, simulatedResources: Record<number, number>): number {
        // Create a working copy of the simulated upgrades with the specified upgrade at +1 level
        const tempUpgrades = simulatedUpgrades.map(u => domain.copyUpgrade(u)) as TesseractUpgrade[];
        const targetUpgrade = tempUpgrades.find(u => u.id === upgradeId);

        if (!targetUpgrade) return this.calculateCurrentValue(domain);

        targetUpgrade.level += 1;
        domain.recalculateUpgrades(tempUpgrades);

        // Convert simulatedResources to TesseractType format
        const simulatedTachyons = simulatedResources as Record<TesseractType, number>;

        // Calculate defense with temporary upgrades
        return domain.calculateDefenseWithUpgrades(tempUpgrades, simulatedTachyons);
    }
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

    /** Current arcane damage value */
    currentArcaneDamage: number = 0;
    currentTachyonDropRate: number = 1;
    currentArcaneAccuracy: number = 0;
    currentArcaneDefense: number = 0;
    efficiencyResults: Map<string, EfficiencyPathInfo> = new Map();
    bestArcaneCultist: Player | null = null;
    pristineBonus22: number = 0;
    arcadeBonus50: number = 0;
    labBonus123: number = 0;
    hasTachyonBundle: boolean = false;
    // Add missing bonuses
    etcBonus93: number = 0; // Total Damage equipment bonus
    etcBonus94: number = 0; // Accuracy equipment bonus
    etcBonus95: number = 0; // Drop Chance equipment bonus
    emperorBonus6: number = 0; // Arcane Cultist Extra Tachyons

    public copyDomain(upgrades: TesseractUpgrade[], resources: Record<TesseractType, number>): Tesseract {
        const temp = new Tesseract("temp");
        temp.upgrades = upgrades;
        temp.resources = resources;
        temp.totalTesseractLevel = upgrades.reduce((sum, u) => sum + u.level, 0);
        temp.bestArcaneCultist = this.bestArcaneCultist;
        temp.pristineBonus22 = this.pristineBonus22;
        temp.arcadeBonus50 = this.arcadeBonus50;
        temp.labBonus123 = this.labBonus123;
        temp.hasTachyonBundle = this.hasTachyonBundle;
        temp.etcBonus93 = this.etcBonus93;
        temp.etcBonus94 = this.etcBonus94;
        temp.etcBonus95 = this.etcBonus95;
        temp.emperorBonus6 = this.emperorBonus6;
        
        // Recalculate bonuses for the temporary tesseract's upgrades
        temp.recalculateUpgrades(upgrades);
        
        return temp;
    }

    get totalLevel(): number {
        return this.totalTesseractLevel;
    }

    prismaBubblesFound: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "Arcane", perPlayer: false, default: [] }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
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

    getResourceTypes(): Record<string, number> {
        return {
            "Purple": TesseractType.Purple,
            "Brown": TesseractType.Brown,
            "Green": TesseractType.Green,
            "Red": TesseractType.Red,
            "Silver": TesseractType.Silver,
            "Gold": TesseractType.Gold,
        };
    }

    getResourceGeneralName(): string {
        return "Tachyon";
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
        return this.resources[upgrade.getCostType() as TesseractType] >= cost;
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

    getUpgradeResourceType(upgrade: EfficiencyUpgrade): number {
        return (upgrade as TesseractUpgrade).data.x1; // Tachyon type
    }

    getLocalStorageKey(): string {
        return "idleon_efficiency_tesseract_resource_weights";
    }

    loadResourceWeights(): Record<number, number> {
        if (typeof window === 'undefined') {
            return { 0: 1.0, 1: 1.0, 2: 1.0, 3: 1.0, 4: 1.0, 5: 1.0 }; // Default weights
        }

        try {
            const stored = localStorage.getItem(this.getLocalStorageKey());
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Failed to load tesseract resource weights:', error);
        }

        return { 0: 1.0, 1: 1.0, 2: 1.0, 3: 1.0, 4: 1.0, 5: 1.0 }; // Default weights
    }

    saveResourceWeights(weights: Record<number, number>): void {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(weights));
        } catch (error) {
            console.warn('Failed to save tesseract resource weights:', error);
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
        const rawData = data.get("rawData") as Record<string, any>;

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

        // Parse bundle info for tachyon multiplier
        let bundleInfo = undefined;
        // Make sure we have bundle info, this usually is missing for public profiles.
        if (rawData["BundlesReceived"] !== undefined) {
            bundleInfo = JSON.parse(rawData["BundlesReceived"]) as Record<string, number>;
        }
        tesseract.hasTachyonBundle = bundleInfo == undefined ? false : bundleInfo.bun_x == 1;

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

    /** Calculate current arcane damage based on the Arcane_DMG formula */
    calculateArcaneDamage(): number {
        if (!this.bestArcaneCultist) return 0;

        // Equipment bonus calculation
        let weaponPower = 0;
        const equipment = this.bestArcaneCultist.gear.equipment;
        const weapon = equipment[1];
        if (weapon && weapon.internalName.includes("EquipmentWandsArc")) {
            const weaponPowerStat = weapon.itemStats.find((stat: any) => stat.displayName === "Weapon Power");
            if (weaponPowerStat) {
                weaponPower += weaponPowerStat.getValue();
            }
        }

        // Step 1: Base + flat bonuses
        const flatBonus = this.getUpgradeBonus(0) + this.getUpgradeBonus(6) + this.getUpgradeBonus(15) + this.getUpgradeBonus(36) + this.getUpgradeBonus(50);
        let damage = 5 + flatBonus;

        // Step 2: Talent 590 multiplier
        damage *= (1 + (this.getTalentBonus(this.bestArcaneCultist, 590) * (this.totalTesseractLevel / 100)) / 100);

        // Step 3: Weapon power exponent
        damage *= Math.pow(1.04, Math.max(0, weaponPower));
        damage *= (1 + this.getTalentBonus(this.bestArcaneCultist, 585) / 100);
        const percentBonus = this.getUpgradeBonus(4) + this.getUpgradeBonus(24) + this.getUpgradeBonus(31) + this.getUpgradeBonus(42) + this.getUpgradeBonus(53) +
            (this.getUpgradeBonus(12) * Math.log10(this.resources[TesseractType.Purple] || 1));
        damage *= (1 + percentBonus / 100);
        
        // Step 4: ETC bonus 93 (Total Damage)
        damage *= (1 + this.etcBonus93 / 100);
        
        return damage;
    }

    /** Helper function to calculate damage with temporary tesseract state */
    calculateDamageWithUpgrades(upgrades: TesseractUpgrade[], simulatedResources: Record<TesseractType, number>): number {
        const temp = this.copyDomain(upgrades, simulatedResources);
        return temp.calculateArcaneDamage();
    }

    calculateTachyonDropRate(): number {
        let dropRate = 1 + (this.getUpgradeBonus(17) + this.getTalentBonus(this.bestArcaneCultist, 586) +
            (this.getUpgradeBonus(34) * Math.log10(this.resources[TesseractType.Green] || 1)) / 100 +
            (this.getUpgradeBonus(56) * Math.log10(this.resources[TesseractType.Gold] || 1)) / 100 +
            this.labBonus123 + this.arcadeBonus50 + this.etcBonus95) / 100;

        // Pristine bonus 22
        dropRate *= (1 + this.pristineBonus22 / 100);

        // Emperor bonus 6 (Arcane Cultist Extra Tachyons)
        dropRate *= (1 + this.emperorBonus6 / 100);

        // Talent 599 multiplier
        dropRate *= Math.max(1, this.getTalentBonus(this.bestArcaneCultist, 599));

        // Bundle multiplier for extra tachyon drops
        dropRate *= this.hasTachyonBundle ? 1.2 : 1;
        return dropRate;
    }

    calculateTachyonDropWithUpgrades(upgrades: TesseractUpgrade[], simulatedResources: Record<TesseractType, number>): number {
        const temp = this.copyDomain(upgrades, simulatedResources);
        return temp.calculateTachyonDropRate();
    }

    /**
     * Calculate current arcane accuracy based on the Arcane_ACC formula
     * @returns Current arcane accuracy
     */
    calculateArcaneAccuracy(): number {
        if (!this.bestArcaneCultist) return 0;

        // Base accuracy: 2 + flat bonuses from upgrades 1, 9, 19, 38, 52
        const flatAccuracyBonus = this.getUpgradeBonus(1) + // Arcanist Accuracy
                                 this.getUpgradeBonus(9) + // Arcanist Accuracy II
                                 this.getUpgradeBonus(19) + // Arcanist Accuracy III
                                 this.getUpgradeBonus(38) + // Arcanist Accuracy IV
                                 this.getUpgradeBonus(52);  // Arcanist Accuracy V

        let accuracy = 2 + flatAccuracyBonus;

        // Talent 591 bonus with total tesseract level multiplier
        const talent591Bonus = this.getTalentBonus(this.bestArcaneCultist, 591);
        const totalTesseractMultiplier = this.totalTesseractLevel / 100;
        accuracy *= (1 + (talent591Bonus * totalTesseractMultiplier) / 100);

        // Percentage accuracy bonuses from upgrades 22, 44, 55
        let percentageBonuses = 0;
        percentageBonuses += this.getUpgradeBonus(22); // Arcanist Precision
        percentageBonuses += this.getUpgradeBonus(44); // Arcanist Precision II
        percentageBonuses += this.getUpgradeBonus(55); // Arcanist Precision III
        accuracy *= (1 + percentageBonuses / 100);

        // Brown hoarding bonus (upgrade 27 * log(brown count))
        const brownHoardingBonus = this.getUpgradeBonus(27);
        const brownLogBonus = this.resources[TesseractType.Brown] > 0 ? 
            brownHoardingBonus * Math.log10(this.resources[TesseractType.Brown]) : 0;
        accuracy *= (1 + brownLogBonus / 100);

        // ETC bonus 94 (Accuracy equipment bonus)
        accuracy *= (1 + this.etcBonus94 / 100);

        return accuracy;
    }

    /**
     * Helper function to calculate accuracy with a temporary tesseract state
     */
    calculateAccuracyWithUpgrades(upgrades: TesseractUpgrade[], simulatedResources: Record<TesseractType, number>): number {
        const temp = this.copyDomain(upgrades, simulatedResources);
        const accuracy = temp.calculateArcaneAccuracy();
        
        return accuracy;
    }

    /**
     * Calculate current arcane defense based on the Arcane_DEF formula
     * @returns Current arcane defense
     */
    calculateArcaneDefense(): number {
        if (!this.bestArcaneCultist) return 0;

        // Base defense: flat bonuses from upgrades 2, 11, 29, 46
        const flatDefenseBonus = this.getUpgradeBonus(2) + // Arcanist Defense
                                this.getUpgradeBonus(11) + // Arcanist Defense II
                                this.getUpgradeBonus(29) + // Arcanist Defense III
                                this.getUpgradeBonus(46);  // Arcanist Defense IV

        let defense = flatDefenseBonus;

        // Talent 591 bonus with total tesseract level multiplier (shared with accuracy)
        const talent591Bonus = this.getTalentBonus(this.bestArcaneCultist, 591);
        const totalTesseractMultiplier = this.totalTesseractLevel / 100;
        defense *= (1 + (talent591Bonus * totalTesseractMultiplier) / 100);

        // Percentage defense bonuses from upgrades 22, 44, 55 (shared with accuracy)
        let percentageBonuses = 0;
        percentageBonuses += this.getUpgradeBonus(22); // Arcanist Precision (shared with accuracy)
        percentageBonuses += this.getUpgradeBonus(44); // Arcanist Precision II (shared with accuracy)
        percentageBonuses += this.getUpgradeBonus(55); // Arcanist Precision III (shared with accuracy)
        defense *= (1 + percentageBonuses / 100);

        // Red hoarding bonus (upgrade 41 * log(red count))
        const redHoardingBonus = this.getUpgradeBonus(41);
        const redLogBonus = this.resources[TesseractType.Red] > 0 ? 
            redHoardingBonus * Math.log10(this.resources[TesseractType.Red]) : 0;
        defense *= (1 + redLogBonus / 100);

        return defense;
    }

    /**
     * Helper function to calculate defense with a temporary tesseract state
     */
    calculateDefenseWithUpgrades(upgrades: TesseractUpgrade[], simulatedResources: Record<TesseractType, number>): number {
        const temp = this.copyDomain(upgrades, simulatedResources);
        const defense = temp.calculateArcaneDefense();
        
        return defense;
    }

    calculateAllEfficiencies(): void {
        this.currentArcaneDamage = this.calculateArcaneDamage();
        this.currentTachyonDropRate = this.calculateTachyonDropRate();
        this.currentArcaneAccuracy = this.calculateArcaneAccuracy();
        this.currentArcaneDefense = this.calculateArcaneDefense();

        const engine = new EfficiencyEngine<Tesseract>();
        const calculators = [
            new DamageEfficiencyCalculator(),
            new TachyonGainEfficiencyCalculator(),
            new AccuracyEfficiencyCalculator(),
            new DefenseEfficiencyCalculator(),
            new CheapestPathCalculator<Tesseract>(),
        ];
        
        // Load resource weights
        const resourceWeights = this.loadResourceWeights();
        
        calculators.forEach(calculator => {
            let maxUpgrades = 100;
            // If we're using the cheapest path calculator, we need to calculate the number of levels needed to reach the next unlock
            if (calculator instanceof CheapestPathCalculator) {
                // Find the next locked item with the lowest requirement
                const nextUnlock = this.getNextLockedUpgrade();

                // Calculate the number of levels needed to reach the next unlock
                maxUpgrades = nextUnlock ? Math.max(0, (nextUnlock.getUnlockRequirement?.() || 0) - this.totalTesseractLevel) : 100;
            }

            const pathInfo = engine.calculateEfficiency(
                this, 
                calculator, 
                maxUpgrades,
                resourceWeights
            );
            this.efficiencyResults.set(calculator.name, pathInfo);
        });
    }

    public getUpgradeBonus(upgradeId: number): number {
        const upgrade = this.upgrades.find(u => u.id === upgradeId);
        return upgrade ? upgrade.bonus : 0;
    }

    private getTalentBonus(player: Player | null, skillIndex: number): number {
        if (!player) return 0;
        return player.getTalentBonus(skillIndex);
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

/** Update function for tesseract efficiency calculations */
export const updateTesseractEfficiency = (accountData: Map<string, any>) => {
    const tesseract = accountData.get("tesseract") as Tesseract;
    const players = accountData.get("players") as Player[];
    const sneaking = accountData.get("sneaking") as Sneaking;
    const arcade = accountData.get("arcade") as Arcade;
    const lab = accountData.get("lab") as Lab;
    const emperor = accountData.get("emperor") as Emperor;

    if (tesseract && players) {
        try {
            // Find best Arcane Cultist
            const arcaneCultist = players.slice().sort((a, b) => b.level - a.level).find(p => p.classId === 40);
            if (arcaneCultist) {
                tesseract.bestArcaneCultist = arcaneCultist;
                
                // Set ETC bonuses from Arcane Cultist equipment
                tesseract.etcBonus93 = arcaneCultist.gear.equipment.reduce((sum, item) => sum + (item?.getMiscBonus("Arcanist Dmg") ?? 0), 0);
                tesseract.etcBonus94 = arcaneCultist.gear.equipment.reduce((sum, item) => sum + (item?.getMiscBonus("Arcanist Acc") ?? 0), 0);
                tesseract.etcBonus95 = arcaneCultist.gear.equipment.reduce((sum, item) => sum + (item?.getMiscBonus("Extra Tachyons") ?? 0), 0);
            }

            // Set pristine bonus 22 from sneaking
            tesseract.pristineBonus22 = sneaking.pristineCharms?.find(c => c.index === 22)?.unlocked ? sneaking.pristineCharms.find(c => c.index === 22)?.getBonus() ?? 0 : 0;
            // Set arcade bonus 50
            tesseract.arcadeBonus50 = arcade.bonuses[50]?.getBonus() ?? 0;
            // Set lab bonus 123
            tesseract.labBonus123 = lab.bonuses?.find(b => b.index === 123)?.getBonus() ?? 0;
            
            // Set emperor bonus 6 (Arcane Cultist Extra Tachyons)
            tesseract.emperorBonus6 = emperor?.emperorBonuses?.find((b: any) => b.index === 6)?.getBonus() ?? 0;

            tesseract.calculateAllEfficiencies();
        } catch (error) {
            console.error("Failed to calculate tesseract efficiency:", error);
        }
    } else {
        console.error("Failed to calculate tesseract efficiency: tesseract or players is undefined");
    }
    return tesseract;
}
