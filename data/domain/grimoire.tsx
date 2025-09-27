import { CheapestPathCalculator } from "../../lib/efficiencyEngine/calculators";
import { EfficiencyDomain, EfficiencyEngine, EfficiencyPathInfo, EfficiencyUpgrade, EfficiencyCalculator } from "../../lib/efficiencyEngine/efficiencyEngine";
import { nFormatter, lavaLog } from "../utility";
import { Domain, RawData } from "./base/domain";
import { GrimoireUpgradeBase, initGrimoireUpgradeRepo } from "./data/GrimoireUpgradeRepo";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { GrimoireUpgradeModel } from "./model/grimoireUpgradeModel";
import { Player } from "./player";
import { Sneaking } from "./world-6/sneaking";
import { Arcade } from "./arcade";
import { Lab } from "./lab";
import { Emperor } from "./emperor";
import { ClassIndex } from "./talents";

// Damage efficiency calculator implementation
class DamageEfficiencyCalculator implements EfficiencyCalculator<Grimoire> {
    name = "Wraith Damage";
    
    getRelevantUpgradeIds(domain: Grimoire): number[] {
        return [
            // Flat damage bonuses
            0, 6, 16, 33, 46,
            // Percentage damage bonuses
            8, 28, 43, 50,
            // Target-based bonuses
            13, // Knockout!
            21, // Elimination!
            31, // Annihilation!
            // Bone-based bonuses
            18, // Femur hoarding
            // Writhing Grimoire affects other upgrades
            36
        ];
    }
    
    calculateCurrentValue(domain: Grimoire): number {
        return domain.calculateWraithDamage();
    }
    
    calculateValueWithUpgrade(domain: Grimoire, simulatedUpgrades: EfficiencyUpgrade[], upgradeId: number, simulatedResources: Record<number, number>): number {
        // Create a working copy of the simulated upgrades with the specified upgrade at +1 level
        const tempUpgrades = simulatedUpgrades.map(u => domain.copyUpgrade(u)) as GrimoireUpgrade[];
        const targetUpgrade = tempUpgrades.find(u => u.id === upgradeId);
        
        if (!targetUpgrade) return this.calculateCurrentValue(domain);
        
        targetUpgrade.level += 1;
        domain.recalculateUpgrades(tempUpgrades);
        
        // Convert simulatedResources to BoneType format
        const simulatedAvailableBones = simulatedResources as Record<BoneType, number>;
        
        // Calculate damage with temporary upgrades
        return domain.calculateDamageWithUpgrades(tempUpgrades, simulatedAvailableBones);
    }
}

// Bone gain efficiency calculator implementation
class BoneGainEfficiencyCalculator implements EfficiencyCalculator<Grimoire> {
    name = "Bone Drop Rate";
    
    getRelevantUpgradeIds(domain: Grimoire): number[] {
        return [
            // Direct bone drop bonuses
            23, // Bones o' Plenty
            48, // Bovinae Hoarding
            // Writhing Grimoire affects other upgrades
            36
        ];
    }
    
    calculateCurrentValue(domain: Grimoire): number {
        return domain.calculateBoneDropRate();
    }
    
    calculateValueWithUpgrade(domain: Grimoire, simulatedUpgrades: EfficiencyUpgrade[], upgradeId: number, simulatedResources: Record<number, number>): number {
        // Create a working copy of the simulated upgrades with the specified upgrade at +1 level
        const tempUpgrades = simulatedUpgrades.map(u => domain.copyUpgrade(u)) as GrimoireUpgrade[];
        const targetUpgrade = tempUpgrades.find(u => u.id === upgradeId);
        
        if (!targetUpgrade) return this.calculateCurrentValue(domain);
        
        targetUpgrade.level += 1;
        domain.recalculateUpgrades(tempUpgrades);
        
        // Convert simulatedResources to BoneType format
        const simulatedAvailableBones = simulatedResources as Record<BoneType, number>;
        
        // Calculate bone drop rate with temporary upgrades
        return domain.calculateBoneDropWithUpgrades(tempUpgrades, simulatedAvailableBones);
    }
}

// Accuracy efficiency calculator implementation
class AccuracyEfficiencyCalculator implements EfficiencyCalculator<Grimoire> {
    name = "Wraith Accuracy";
    
    getRelevantUpgradeIds(domain: Grimoire): number[] {
        return [
            // Flat accuracy bonuses
            1, 12, 25, 37, 47,
            // Percentage accuracy bonuses
            7, 38,
            // Cranium-based bonus
            41,
            // Writhing Grimoire affects other upgrades
            36
        ];
    }
    
    calculateCurrentValue(domain: Grimoire): number {
        return domain.calculateWraithAccuracy();
    }
    
    calculateValueWithUpgrade(domain: Grimoire, simulatedUpgrades: EfficiencyUpgrade[], upgradeId: number, simulatedResources: Record<number, number>): number {
        // Create a working copy of the simulated upgrades with the specified upgrade at +1 level
        const tempUpgrades = simulatedUpgrades.map(u => domain.copyUpgrade(u)) as GrimoireUpgrade[];
        const targetUpgrade = tempUpgrades.find(u => u.id === upgradeId);
        
        if (!targetUpgrade) return this.calculateCurrentValue(domain);
        
        targetUpgrade.level += 1;
        domain.recalculateUpgrades(tempUpgrades);
        
        // Convert simulatedResources to BoneType format
        const simulatedAvailableBones = simulatedResources as Record<BoneType, number>;
        
        // Calculate accuracy with temporary upgrades
        return domain.calculateAccuracyWithUpgrades(tempUpgrades, simulatedAvailableBones);
    }
}

// Defense efficiency calculator implementation
class DefenseEfficiencyCalculator implements EfficiencyCalculator<Grimoire> {
    name = "Wraith Defense";
    
    getRelevantUpgradeIds(domain: Grimoire): number[] {
        return [
            // Flat defense bonuses
            2, 15, 30, 40, 49,
            // Percentage defense bonuses
            7, 38,
            // Ribcage-based bonus
            27,
            // Writhing Grimoire affects other upgrades
            36
        ];
    }
    
    calculateCurrentValue(domain: Grimoire): number {
        return domain.calculateWraithDefense();
    }
    
    calculateValueWithUpgrade(domain: Grimoire, simulatedUpgrades: EfficiencyUpgrade[], upgradeId: number, simulatedResources: Record<number, number>): number {
        // Create a working copy of the simulated upgrades with the specified upgrade at +1 level
        const tempUpgrades = simulatedUpgrades.map(u => domain.copyUpgrade(u)) as GrimoireUpgrade[];
        const targetUpgrade = tempUpgrades.find(u => u.id === upgradeId);
        
        if (!targetUpgrade) return this.calculateCurrentValue(domain);
        
        targetUpgrade.level += 1;
        domain.recalculateUpgrades(tempUpgrades);
        
        // Convert simulatedResources to BoneType format
        const simulatedAvailableBones = simulatedResources as Record<BoneType, number>;
        
        // Calculate defense with temporary upgrades
        return domain.calculateDefenseWithUpgrades(tempUpgrades, simulatedAvailableBones);
    }
}

export class GrimoireUpgrade implements EfficiencyUpgrade {
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

    getCost = (allUpgrades: EfficiencyUpgrade[]): number => {
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

    getCostType(): number {
        return this.data.x1;
    }

    getCostToMax = (allUpgrades: GrimoireUpgrade[]): number => {
        let totalCost = 0;
        const tempUpgrade = this.copyUpgrade() as GrimoireUpgrade; 

        for (let i = this.level; i < this.data.max_level; i++) {
            totalCost += tempUpgrade.getCost(allUpgrades);
            tempUpgrade.level++;
        }

        return totalCost;
    }

    getCostForNextNLevels = (allUpgrades: GrimoireUpgrade[], levels: number): number => {
        let totalCost = 0;
        const tempUpgrade = this.copyUpgrade() as GrimoireUpgrade;

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

    copyUpgrade = (): EfficiencyUpgrade => {
        const copy = new GrimoireUpgrade(this.id, this.data);
        copy.level = this.level;
        copy.unlocked = this.unlocked;
        copy.bonus = this.bonus;
        copy.cost = this.cost;
        copy.costToMax = this.costToMax;
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

export enum BoneType {
    Femur = 0,
    Ribcage = 1,
    Cranium = 2,
    Bovinae = 3,
}

export class Grimoire extends Domain implements EfficiencyDomain {
    upgrades: GrimoireUpgrade[] = [];
    totalGrimoireLevel: number = 0;

    // Bone counts
    resources: Record<BoneType, number> = {
        [BoneType.Femur]: 0,
        [BoneType.Ribcage]: 0,
        [BoneType.Cranium]: 0,
        [BoneType.Bovinae]: 0,
    }

    // Target counts for KO/Elimination/Annihilation bonuses
    targetCounts: Record<number, number> = {
        334: 0, // KO target count
        335: 0, // Elimination target count  
        336: 0, // Annihilation target count
    }

    // Unlock path information - using new generalized system
    unlockPathInfo: EfficiencyPathInfo = {
        goal: "Next Unlock Path",
        pathUpgrades: [],
        totalValue: 0,
        resourceCosts: {
            [BoneType.Femur]: 0,
            [BoneType.Ribcage]: 0,
            [BoneType.Cranium]: 0,
            [BoneType.Bovinae]: 0,
        },
    };

    // Efficiency calculation fields
    currentWraithDamage: number = 0;
    currentBoneDropRate: number = 0;
    currentWraithAccuracy: number = 0;
    currentWraithDefense: number = 0;
    efficiencyResults: Map<string, EfficiencyPathInfo> = new Map();

    // External bonuses for calculations
    bestDeathBringer: Player | null = null;
    pristineBonus18: number = 0;
    arcadeBonus40: number = 0;
    // PLACEHOLDERS - need to implement later
    gambitBonus12: number = 0; // From holes system
    emperorBonus1: number = 0; // From thingies system
    mainframeBonus121: number = 0; // From lab domain
    etcBonus76: number = 0; // Equipment bonus

    get totalLevel(): number {
        return this.totalGrimoireLevel;
    }

    getResources(): Record<number, number> {
        return this.resources;
    }

    getResourceTypes(): Record<string, number> {
        return {
            "Femur": BoneType.Femur,
            "Ribcage": BoneType.Ribcage,
            "Cranium": BoneType.Cranium,
            "Bovinae": BoneType.Bovinae,
        };
    }

    getResourceGeneralName(): string {
        return "Bone";
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

    // EfficiencyDomain interface methods
    copyUpgrade(upgrade: EfficiencyUpgrade): EfficiencyUpgrade {
        return upgrade.copyUpgrade();
    }

    recalculateUpgrades(upgrades: EfficiencyUpgrade[]): void {
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

    // Provide additional cost arguments for grimoire upgrades (none needed)
    getAdditionalCostArgs(): any[] {
        return [];
    }

    getLocalStorageKey(): string {
        return "idleon_efficiency_grimoire_resource_weights";
    }

    loadResourceWeights(): Record<number, number> {
        if (typeof window === 'undefined') {
            return { 0: 1.0, 1: 1.0, 2: 1.0, 3: 1.0 }; // Default weights
        }

        try {
            const stored = localStorage.getItem(this.getLocalStorageKey());
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Failed to load grimoire resource weights:', error);
        }

        return { 0: 1.0, 1: 1.0, 2: 1.0, 3: 1.0 }; // Default weights
    }

    saveResourceWeights(weights: Record<number, number>): void {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(weights));
        } catch (error) {
            console.warn('Failed to save grimoire resource weights:', error);
        }
    }

    getUpgradeResourceType(upgrade: EfficiencyUpgrade): number {
        return (upgrade as GrimoireUpgrade).data.x1; // Bone type
    }

    // ResourceTracker interface methods
    getResourceCount(resourceType: number): number {
        switch (resourceType) {
            case BoneType.Femur: return this.resources[BoneType.Femur];
            case BoneType.Ribcage: return this.resources[BoneType.Ribcage];
            case BoneType.Cranium: return this.resources[BoneType.Cranium];
            case BoneType.Bovinae: return this.resources[BoneType.Bovinae];
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

    canAffordUpgrade(upgrade: EfficiencyUpgrade, cost: number = upgrade.getCost([])): boolean {
        if (upgrade.getLevel() >= upgrade.getMaxLevel()) return false;

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

    getNextLockedUpgrade(): EfficiencyUpgrade | null {
        return this.upgrades
        .filter(u => !u.isUnlocked() && u.getUnlockRequirement?.() != null)
        .sort((a, b) => (a.getUnlockRequirement?.() || 0) - (b.getUnlockRequirement?.() || 0))[0] || null;
    }

    /**
     * Calculate current wraith damage based on the Grimoire_DMG formula
     * @returns Current wraith damage
     */
    calculateWraithDamage(): number {
        // Base damage: 5 + flat bonuses from upgrades 0, 6, 16, 33, 46
        const flatDamageBonus = this.getUpgradeBonus(0) + // Wraith Damage
                               this.getUpgradeBonus(6) + // Wraith Damage II
                               this.getUpgradeBonus(16) + // Wraith Damage III
                               this.getUpgradeBonus(33) + // Wraith Damage IV
                               this.getUpgradeBonus(46);  // Wraith Damage V

        let damage = 5 + flatDamageBonus;

        // Talent 195 multiplier
        const talent195Bonus = this.getTalentBonus(this.bestDeathBringer, 195);
        damage *= (1 + talent195Bonus / 100);

        // Percentage damage bonuses from upgrades 8, 28, 43, 50
        let percentageBonuses = 0;
        percentageBonuses += this.getUpgradeBonus(8);  // Wraith Destruction
        percentageBonuses += this.getUpgradeBonus(28); // Wraith Destruction II
        percentageBonuses += this.getUpgradeBonus(43); // Wraith Destruction III
        percentageBonuses += this.getUpgradeBonus(50); // Wraith Destruction IV
        damage *= (1 + percentageBonuses / 100);

        // Target-based bonuses (using OptLacc indices 334, 335, 336 for target counts)
        const knockoutBonus = this.getUpgradeBonus(13) * this.getTargetCount(334); // Knockout! bonus * KO target count
        const eliminationBonus = this.getUpgradeBonus(21) * this.getTargetCount(335); // Elimination! bonus * elimination target count
        const annihilationBonus = this.getUpgradeBonus(31) * this.getTargetCount(336); // Annihilation! bonus * annihilation target count
        damage *= (1 + (knockoutBonus + eliminationBonus + annihilationBonus) / 100);

        // Femur hoarding bonus (upgrade 18 * log(femur count))
        const femurHoardingBonus = this.getUpgradeBonus(18);
        const femurLogBonus = this.resources[BoneType.Femur] > 0 ? 
            femurHoardingBonus * this.getLogValue(this.resources[BoneType.Femur]) : 0;
        damage *= (1 + femurLogBonus / 100);

        // Talent 200 bonus with total grimoire level multiplier
        const talent200Bonus = this.getTalentBonus(this.bestDeathBringer, 200);
        const totalGrimoireMultiplier = this.totalGrimoireLevel / 100;
        damage *= (1 + (talent200Bonus * totalGrimoireMultiplier) / 100);

        return damage;
    }

    /**
     * Create a copy of this domain for simulation purposes
     */
    public copyDomain(upgrades: GrimoireUpgrade[], availableBones: Record<BoneType, number>): Grimoire {
        const tempGrimoire = new Grimoire("grimoire");
        tempGrimoire.upgrades = upgrades;
        tempGrimoire.resources = availableBones;
        tempGrimoire.targetCounts = { ...this.targetCounts };
        tempGrimoire.bestDeathBringer = this.bestDeathBringer;
        tempGrimoire.pristineBonus18 = this.pristineBonus18;
        tempGrimoire.arcadeBonus40 = this.arcadeBonus40;
        tempGrimoire.gambitBonus12 = this.gambitBonus12;
        tempGrimoire.emperorBonus1 = this.emperorBonus1;
        tempGrimoire.mainframeBonus121 = this.mainframeBonus121;
        tempGrimoire.etcBonus76 = this.etcBonus76;
        
        // Calculate total grimoire level for the temporary grimoire
        tempGrimoire.totalGrimoireLevel = upgrades.reduce((sum, upgrade) => sum + upgrade.level, 0);
        
        // Recalculate bonuses for the temporary grimoire's upgrades
        tempGrimoire.recalculateUpgrades(upgrades);
        
        return tempGrimoire;
    }

    /**
     * Helper function to calculate damage with a temporary grimoire state
     */
    public calculateDamageWithUpgrades(upgrades: GrimoireUpgrade[], availableBones: Record<BoneType, number>): number {
        const tempGrimoire = this.copyDomain(upgrades, availableBones);
        const damage = tempGrimoire.calculateWraithDamage();
        
        return damage;
    }

    /**
     * Calculate bone drop rate based on the GrimoireBonesDropDEC formula
     * @returns Current bone drop rate multiplier
     */
    calculateBoneDropRate(): number {
        // Base multiplier starts at 1
        let multiplier = 1;

        // Pristine bonus 18
        multiplier *= (1 + this.pristineBonus18 / 100);

        // Talent 196 bonus
        const talent196Bonus = this.getTalentBonus(this.bestDeathBringer, 196);
        multiplier *= (1 + talent196Bonus / 100);

        // Gambit bonus 12 (capped at 2x) - PLACEHOLDER
        multiplier *= Math.min(2, 1 + this.gambitBonus12);

        // ETC bonus 76 (capped at 1.5x)
        multiplier *= Math.min(1.5, 1 + this.etcBonus76 / 100);

        // Emperor bonus 1
        multiplier *= (1 + this.emperorBonus1 / 100);

        // Grimoire upgrades 23, 48 (with bovinae log bonus)
        const bonesPlentyBonus = this.getUpgradeBonus(23);
        const bovinaeHoardingBonus = this.getUpgradeBonus(48);
        const bovinaeLogBonus = this.resources[BoneType.Bovinae] > 0 ? 
            bovinaeHoardingBonus * this.getLogValue(this.resources[BoneType.Bovinae]) : 0;
        
        // Arcade bonus 40
        const arcadeBonus = this.arcadeBonus40;
        
        // Mainframe bonus 121
        const mainframeBonus = this.mainframeBonus121;
        
        multiplier *= (1 + (bonesPlentyBonus + bovinaeLogBonus + arcadeBonus + mainframeBonus) / 100);

        return multiplier;
    }

    /**
     * Helper function to calculate bone drop rate with a temporary grimoire state
     */
    public calculateBoneDropWithUpgrades(upgrades: GrimoireUpgrade[], availableBones: Record<BoneType, number>): number {
        const tempGrimoire = this.copyDomain(upgrades, availableBones);
        return tempGrimoire.calculateBoneDropRate();
    }

    /**
     * Calculate current wraith accuracy based on the Grimoire_ACC formula
     * @returns Current wraith accuracy
     */
    calculateWraithAccuracy(): number {
        // Base accuracy: 2 + flat bonuses from upgrades 1, 12, 25, 37, 47
        const flatAccuracyBonus = this.getUpgradeBonus(1) + // Wraith Accuracy
                                 this.getUpgradeBonus(12) + // Wraith Accuracy II
                                 this.getUpgradeBonus(25) + // Wraith Accuracy III
                                 this.getUpgradeBonus(37) + // Wraith Accuracy IV
                                 this.getUpgradeBonus(47);  // Wraith Accuracy V

        let accuracy = 2 + flatAccuracyBonus;

        // Percentage accuracy bonuses from upgrades 7, 38
        let percentageBonuses = 0;
        percentageBonuses += this.getUpgradeBonus(7);  // Wraith Precision
        percentageBonuses += this.getUpgradeBonus(38); // Wraith Precision II
        accuracy *= (1 + percentageBonuses / 100);

        // Cranium hoarding bonus (upgrade 41 * log(cranium count))
        const craniumHoardingBonus = this.getUpgradeBonus(41);
        const craniumLogBonus = this.resources[BoneType.Cranium] > 0 ? 
            craniumHoardingBonus * this.getLogValue(this.resources[BoneType.Cranium]) : 0;
        accuracy *= (1 + craniumLogBonus / 100);

        // Talent 200 bonus with total grimoire level multiplier
        const talent200Bonus = this.getTalentBonus(this.bestDeathBringer, 200);
        const totalGrimoireMultiplier = this.totalGrimoireLevel / 100;
        accuracy *= (1 + (talent200Bonus * totalGrimoireMultiplier) / 100);

        return accuracy;
    }

    /**
     * Helper function to calculate accuracy with a temporary grimoire state
     */
    public calculateAccuracyWithUpgrades(upgrades: GrimoireUpgrade[], availableBones: Record<BoneType, number>): number {
        const tempGrimoire = this.copyDomain(upgrades, availableBones);
        const accuracy = tempGrimoire.calculateWraithAccuracy();
        
        return accuracy;
    }

    /**
     * Calculate current wraith defense based on the Grimoire_DEF formula
     * @returns Current wraith defense
     */
    calculateWraithDefense(): number {
        // Base defense: flat bonuses from upgrades 2, 15, 30, 40, 49
        const flatDefenseBonus = this.getUpgradeBonus(2) + // Wraith Defense
                                this.getUpgradeBonus(15) + // Wraith Defense II
                                this.getUpgradeBonus(30) + // Wraith Defense III
                                this.getUpgradeBonus(40) + // Wraith Defense IV
                                this.getUpgradeBonus(49);  // Wraith Defense V

        let defense = flatDefenseBonus;

        // Percentage defense bonuses from upgrades 7, 38
        let percentageBonuses = 0;
        percentageBonuses += this.getUpgradeBonus(7);  // Wraith Precision (shared with accuracy)
        percentageBonuses += this.getUpgradeBonus(38); // Wraith Precision II (shared with accuracy)
        defense *= (1 + percentageBonuses / 100);

        // Ribcage hoarding bonus (upgrade 27 * log(ribcage count))
        const ribcageHoardingBonus = this.getUpgradeBonus(27);
        const ribcageLogBonus = this.resources[BoneType.Ribcage] > 0 ? 
            ribcageHoardingBonus * this.getLogValue(this.resources[BoneType.Ribcage]) : 0;
        defense *= (1 + ribcageLogBonus / 100);

        // Talent 201 bonus with total grimoire level multiplier
        const talent201Bonus = this.getTalentBonus(this.bestDeathBringer, 201);
        const totalGrimoireMultiplier = this.totalGrimoireLevel / 100;
        defense *= (1 + (talent201Bonus * totalGrimoireMultiplier) / 100);

        return defense;
    }

    /**
     * Helper function to calculate defense with a temporary grimoire state
     */
    public calculateDefenseWithUpgrades(upgrades: GrimoireUpgrade[], availableBones: Record<BoneType, number>): number {
        const tempGrimoire = this.copyDomain(upgrades, availableBones);
        const defense = tempGrimoire.calculateWraithDefense();
        
        return defense;
    }

    /**
     * Calculate efficiency for all supported attributes using the efficiency system
     */
    calculateAllEfficiencies(): void {
        const currentDamage = this.calculateWraithDamage();
        this.currentWraithDamage = currentDamage;
        
        const currentBoneDropRate = this.calculateBoneDropRate();
        this.currentBoneDropRate = currentBoneDropRate;
        
        const currentAccuracy = this.calculateWraithAccuracy();
        this.currentWraithAccuracy = currentAccuracy;
        
        const currentDefense = this.calculateWraithDefense();
        this.currentWraithDefense = currentDefense;
        
        const engine = new EfficiencyEngine<Grimoire>();
        const calculators = [
            new DamageEfficiencyCalculator(),
            new BoneGainEfficiencyCalculator(),
            new AccuracyEfficiencyCalculator(),
            new DefenseEfficiencyCalculator(),
            new CheapestPathCalculator<Grimoire>(),
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
                maxUpgrades = nextUnlock ? Math.max(0, (nextUnlock.getUnlockRequirement?.() || 0) - this.totalGrimoireLevel) : 100;
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

    /**
     * Get the bonus value for a specific grimoire upgrade ID
     */
    public getUpgradeBonus(upgradeId: number): number {
        const upgrade = this.upgrades.find(u => u.id === upgradeId);
        return upgrade?.bonus || 0;
    }

    /**
     * Calculate logarithm value (using lavaLog function from utility)
     */
    private getLogValue(value: number): number {
        // Using lavaLog for base-10 logarithm like in compass
        return lavaLog(value);
    }

    /**
     * Get talent bonus from a player's talent
     */
    private getTalentBonus(player: any, skillIndex: number): number {
        if (!player?.talents) return 0;
        
        const talent = player.talents.find((t: any) => t.skillIndex === skillIndex);
        if (!talent?.getBonus) return 0;

        return talent.getBonus(); // Use default parameters
    }

    /**
     * Get target count for KO/Elimination/Annihilation bonuses
     */
    private getTargetCount(index: number): number {
        return this.targetCounts[index] || 0;
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
                const unlockReq = upgrade.getUnlockRequirement();
                upgrade.unlocked = grimoire.totalGrimoireLevel >= (unlockReq || 0);
            }
        });

        // Parse bone counts and target counts from OptLacc data
        // Based on the game code, bone counts are at indices 330-333, target counts at 334-336
        if (optionList && optionList.length > 336) {
            grimoire.resources[BoneType.Femur] = optionList[330] || 0;
            grimoire.resources[BoneType.Ribcage] = optionList[331] || 0;
            grimoire.resources[BoneType.Cranium] = optionList[332] || 0;
            grimoire.resources[BoneType.Bovinae] = optionList[333] || 0;
            
            grimoire.targetCounts[334] = optionList[334] || 0; // KO target count
            grimoire.targetCounts[335] = optionList[335] || 0; // Elimination target count
            grimoire.targetCounts[336] = optionList[336] || 0; // Annihilation target count
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
            if (upgrade.getMaxLevel() >= 999999) {
                upgrade.costToMax = 0; // Set to 0 as we won't use this value
            } else {
                upgrade.costToMax = upgrade.getCostToMax(grimoire.upgrades);
            }
        });
    }
} 

/**
 * Update function for grimoire efficiency calculations
 * This should be called in post-processing after players data is available
 */
export const updateGrimoireEfficiency = (accountData: Map<string, any>) => {
    const grimoire = accountData.get("grimoire") as Grimoire;
    const players = accountData.get("players") as Player[];
    const sneaking = accountData.get("sneaking") as Sneaking;
    const arcade = accountData.get("arcade") as Arcade;
    const lab = accountData.get("lab") as Lab;
    const emperor = accountData.get("emperor") as Emperor;

    if (grimoire && players) {
        try {
            // Find Death Bringer player (classId 11)
            const deathBringer = players.slice().sort((player1, player2) => player1.level > player2.level ? -1 : 1).find((player: any) => player.classId === ClassIndex.Death_Bringer);
            if (deathBringer) {
                grimoire.bestDeathBringer = deathBringer;

                // Set ETC bonus 76 from Death Bringer equipment (EXTRA_BONES)
                const deathBringerEquipment = deathBringer.gear.equipment;
                grimoire.etcBonus76 = deathBringerEquipment.reduce((sum, item) => sum += item?.getMiscBonus("Extra Bones") ?? 0, 0);
            }

            // Set pristine bonus 18 from sneaking
            grimoire.pristineBonus18 = 0;
            if (sneaking?.pristineCharms) {
                const charm18 = sneaking.pristineCharms.find((charm: any) => charm.index === 18);
                if (charm18?.unlocked) {
                    grimoire.pristineBonus18 = charm18.getBonus();
                }
            }

            // Set arcade bonus 40
            grimoire.arcadeBonus40 = 0;
            if (arcade?.bonuses && arcade.bonuses.length > 40) {
                grimoire.arcadeBonus40 = arcade.bonuses[40]?.getBonus() || 0;
            }

            // Set mainframe bonus 121 from lab domain (Jewel 21 - Deadly Wrath Jewel)
            grimoire.mainframeBonus121 = 0;
            if (lab?.jewels && lab.jewels[21]) {
                grimoire.mainframeBonus121 = lab.jewels[21].getBonus();
            }

            // Set emperor bonus 1 from emperor domain (Death Bringer Extra Bones)
            grimoire.emperorBonus1 = 0;
            if (emperor) {
                const emperorDustBonus = emperor.emperorBonuses.find(bonus => bonus.index == 1)?.getBonus() ?? 0;
                grimoire.emperorBonus1 = emperorDustBonus;
            }

            // PLACEHOLDER - need to implement later
            grimoire.gambitBonus12 = 0; // From holes system

            grimoire.calculateAllEfficiencies();
        } catch (error) {
            console.error("Failed to calculate grimoire efficiency:", error);
        }
    } else {
        console.error("Failed to calculate grimoire efficiency: grimoire or players is undefined");
    }

    return grimoire;
} 
