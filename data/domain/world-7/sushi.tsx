import { lavaLog, lavaLog2, nFormatter, notateNumber } from "../../utility";
import { initSushiRepo } from "../data/SushiRepo";
import type { SushiBase } from "../data/SushiRepo";
import { initSushiStationUpgradeRepo } from "../data/SushiStationUpgradeRepo";
import type { ImageData } from "../imageData";
import { Item } from "../items";
import type { SushiModel } from "../model/sushiModel";
import { Domain } from "../base/domain";
import type { RawData } from "../base/domain";
import type { Sailing } from "../world-5/sailing/sailing";
import { SushiUpgrade } from "./sushiUpgrade";

const KNOWLEDGE_CATEGORY_IDS: Record<string, number> = {
    "+{% more Bucks generated": 0,
    "+{% bonus Knowledge XP": 1,
    "+^% chance for +1 Tier for cooked sushi": 2,
    "}x higher Fuel Capacity": 3,
    "+{% faster Fuel generation": 4,
    "+^% chance for free shaker usage": 5,
    "+{% cheaper upgrades": 6,
    "+^% bigger effects from Slots": 8,
    "+^% bigger effects from Fireplaces": 9,
    "}x higher chance to Perfecto all sushi": 10,
};

const KNOWLEDGE_CATEGORY_PRESENTATION: Record<string, { label: string; format: "percent" | "multiplier" }> = {
    "+{% more Bucks generated": { label: "Bucks", format: "percent" },
    "+{% bonus Knowledge XP": { label: "Knowledge XP", format: "percent" },
    "+^% chance for +1 Tier for cooked sushi": { label: "Tier chance", format: "percent" },
    "}x higher Fuel Capacity": { label: "Fuel capacity", format: "multiplier" },
    "+{% faster Fuel generation": { label: "Fuel generation", format: "percent" },
    "+^% chance for free shaker usage": { label: "Free shaker chance", format: "percent" },
    "+{% cheaper upgrades": { label: "Cheaper upgrades", format: "percent" },
    "+^% bigger effects from Slots": { label: "Slot effect", format: "percent" },
    "+^% bigger effects from Fireplaces": { label: "Fireplace effect", format: "percent" },
    "}x higher chance to Perfecto all sushi": { label: "Perfecto chance", format: "multiplier" },
};

export class Sushi {
    unlocked: boolean = false;
    level: number = 0;
    experience: number = 0;
    perfected: number = 0;
    passiveKnowledgeExperiencePerDay: number = 0;
    nextDailyResetSeconds: number = 0;

    constructor(public index: number, public data: SushiModel) { }

    static fromBase = (data: SushiBase[]): Sushi[] => data.map(sushi => new Sushi(sushi.index, sushi.data));

    getBaseBonus(): number {
        return this.data.unlockBonus;
    }

    getBonus(): number {
        return this.unlocked ? this.getBaseBonus() : 0;
    }

    getKnowledgeLevel(): number {
        return this.level;
    }

    getKnowledgeExperience(): number {
        return this.experience;
    }

    getKnowledgeExperienceRequired(): number {
        return (3 + (this.level + Math.pow(this.level, 1.5))) * Math.pow(1.5, Math.max(0, this.level - 2));
    }

    hasKnowledgeBonus(): boolean {
        return this.data.knowledgeBonusCategory !== undefined && this.data.knowledgeBonusBase !== undefined;
    }

    getKnowledgeBonus(level: number = this.level): number {
        const base = this.data.knowledgeBonusBase;
        if (base === undefined || this.data.knowledgeBonusCategory === undefined) return 0;
        return Math.max(0, base * level * Math.min(2, 1 + this.perfected) * (1 + this.index / 30));
    }

    getPassiveKnowledgeExperiencePerDay(): number {
        return this.passiveKnowledgeExperiencePerDay;
    }

    getTimeToNextKnowledgeLevel(): number | null {
        const dailyGain = this.passiveKnowledgeExperiencePerDay;
        if (dailyGain <= 0) return null;
        const remainingExperience = this.getKnowledgeExperienceRequired() - this.experience;
        if (remainingExperience <= 0) return 0;
        return this.nextDailyResetSeconds + (Math.ceil(remainingExperience / dailyGain) - 1) * 86400;
    }

    getImageData(): ImageData {
        return { location: `Sushi${this.index}`, width: 47, height: 47 };
    }

    getUnlockBonusText(): string {
        const bonus = this.getBaseBonus();
        return this.data.unlockDescription
            .replace("{", nFormatter(bonus, "CommaNotation"))
            .replace("^", nFormatter(bonus, "Small"))
            .replace("}", nFormatter(1 + bonus / 100, "MultiplierInfo"));
    }

    getKnowledgeBonusPresentation(level?: number): { label: string; value: string } | undefined {
        const category = this.data.knowledgeBonusCategory;
        if (category === undefined || this.data.knowledgeBonusBase === undefined) return undefined;

        const bonus = this.getKnowledgeBonus(level);
        const presentation = KNOWLEDGE_CATEGORY_PRESENTATION[category];
        const value = presentation?.format === "multiplier"
            ? `${notateNumber(1 + bonus / 100, "Smaller")}x`
            : presentation?.format === "percent"
                ? `${notateNumber(bonus, "Small")}%`
                : notateNumber(bonus, "Small");

        return {
            label: presentation?.label ?? "Bonus",
            value,
        };
    }
}

export interface SushiBoardSlot {
    index: number;
    sushi: Sushi | undefined;
    plateKind: number;
}

export interface SushiFireplace {
    index: number;
    kind: number;
}

export interface SushiShaker {
    kind: "salt" | "pepper" | "saffron";
    unlocked: boolean;
    remainingUses: number;
}

export class SushiStation extends Domain {
    sushi: Sushi[] = [];
    upgrades: SushiUpgrade[] = [];
    board: SushiBoardSlot[] = [];
    fireplaces: SushiFireplace[] = [];
    shakers: SushiShaker[] = [];
    uniqueSushi: number = 0;
    bucks: number = 0;
    fuel: number = 0;
    fuelOverflow: number = 0;
    fireplaceSparks: number = 0;
    bestComboScore: number = 0;
    nextDailyResetSeconds: number = 0;
    dailyKnowledgeEnabled: boolean = false;
    private bundleBonus: number = 0;
    private bundleBanJ: number = 0;
    private research188: number = 0;
    private research189: number = 0;
    private jellyObstruction18: number = 0;
    private arcade67: number = 0;
    private button2: number = 0;
    private minehead11: number = 0;
    private gaming67: number = 0;
    private atom14: number = 0;
    private sailingArtifact39: number = 0;
    private upgradeLevels: number[] = [];
    private eventShop45: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "Sushi", perPlayer: false, default: [] },
            { key: "TimeAway", perPlayer: false, default: {} },
            { key: "BundlesReceived", perPlayer: false, default: {} },
        ];
    }

    init(_allItems: Item[], _charCount: number) {
        this.sushi = Sushi.fromBase(initSushiRepo());
        this.upgrades = SushiUpgrade.fromBase(initSushiStationUpgradeRepo());
        this.board = Array.from({ length: 120 }, (_, index) => ({ index, sushi: undefined, plateKind: 0 }));
        this.fireplaces = Array.from({ length: 15 }, (_, index) => ({ index, kind: 0 }));
        this.shakers = [
            { kind: "salt", unlocked: false, remainingUses: 0 },
            { kind: "pepper", unlocked: false, remainingUses: 0 },
            { kind: "saffron", unlocked: false, remainingUses: 0 },
        ];
        this.uniqueSushi = 0;
        this.bucks = this.fuel = this.fuelOverflow = this.fireplaceSparks = this.bestComboScore = 0;
        this.nextDailyResetSeconds = 0;
        this.dailyKnowledgeEnabled = false;
        this.upgradeLevels = [];
        this.bundleBonus = this.bundleBanJ = this.research188 = this.research189 = 0;
        this.jellyObstruction18 = this.arcade67 = this.eventShop45 = this.button2 = this.minehead11 = 0;
        this.gaming67 = this.atom14 = this.sailingArtifact39 = 0;
        return this;
    }

    parse(data: Map<string, any>): void {
        const station = data.get(this.getDataKey()) as SushiStation;
        const sushiData = data.get("Sushi") as number[][] || [];
        const sushiLevels = sushiData[7] || [];
        const sushiExperience = sushiData[6] || [];
        const perfectFlags = sushiData[5] || [];
        station.upgradeLevels = sushiData[2] || [];
        station.prepareUpgradeLevels();
        const unlockedSushi = sushiData[5] || [];
        station.uniqueSushi = station.sushi.reduce((count, sushi) => {
            sushi.unlocked = Number(unlockedSushi[sushi.index]) >= 0;
            sushi.level = Number(sushiLevels[sushi.index] ?? 0);
            sushi.experience = Number(sushiExperience[sushi.index] ?? 0);
            sushi.perfected = Number(perfectFlags[sushi.index] ?? 0);
            sushi.passiveKnowledgeExperiencePerDay = 0;
            return count + (sushi.unlocked ? 1 : 0);
        }, 0);

        const tiers = sushiData[0] || [];
        const plates = sushiData[1] || [];
        station.board = station.board.map(({ index }) => ({
            index,
            sushi: tiers[index] >= 0 ? station.sushi[tiers[index]] : undefined,
            plateKind: Number(plates[index] ?? 0),
        }));
        const fireplaceKinds = sushiData[3] || [];
        station.fireplaces = station.fireplaces.map(({ index }) => ({ index, kind: Number(fireplaceKinds[index] ?? 0) }));

        const rawState = sushiData[4] || [];
        station.fuel = Number(rawState[0] ?? 0);
        station.fuelOverflow = Number(rawState[1] ?? 0);
        station.fireplaceSparks = Number(rawState[2] ?? 0);
        station.bucks = Number(rawState[3] ?? 0);
        station.bestComboScore = Number(rawState[8] ?? 0);
        station.shakers = [
            { kind: "salt", unlocked: station.getUpgradeBonus(17) > 0, remainingUses: Number(rawState[5] ?? 0) },
            { kind: "pepper", unlocked: station.getUpgradeBonus(18) > 0, remainingUses: Number(rawState[6] ?? 0) },
            { kind: "saffron", unlocked: station.getUpgradeBonus(19) > 0, remainingUses: Number(rawState[7] ?? 0) },
        ];

        station.nextDailyResetSeconds = Number(data.get("TimeAway")?.ShopRestock ?? 0);
        station.bundleBonus = Number(data.get("BundlesReceived")?.bon_v ?? 0);
        station.bundleBanJ = Number(data.get("BundlesReceived")?.ban_j ?? 0);
    }

    private prepareUpgradeLevels(): void {
        for (const upgrade of this.upgrades) {
            upgrade.level = Number(this.upgradeLevels[upgrade.index] ?? 0);
            const previous = this.upgrades.find(candidate => candidate.data.displayOrder === upgrade.data.displayOrder - 1);
            upgrade.unlocked = upgrade.data.displayOrder === 0 || (previous?.level ?? 0) >= 1;
        }
    }

    private prepareUpgradeState(): void {
        this.prepareUpgradeLevels();
        for (const upgrade of this.upgrades) {
            upgrade.costModifiers = {
                wholesaleQuantity: this.getUpgradeBonus(36),
                unlockDiscountPercent: Math.max(this.getBonusFromIndex(26), this.getBonusFromIndex(44)),
                knowledgeDiscountPercent: this.getKnowledgeBonusTotal(6),
                jellyDiscountPercent: this.jellyObstruction18,
            };
            upgrade.slotEffects = { 1: this.getSlotEffect(1), 2: this.getSlotEffect(2), 3: this.getSlotEffect(3) };
            upgrade.fireplaceEffects = {
                0: this.getFireplaceEffect(0),
                1: this.getFireplaceEffect(1),
                2: this.getFireplaceEffect(2),
                3: this.getFireplaceEffect(3),
            };
            upgrade.fuelPerHour = this.getFuelPerHour();
            upgrade.fuelCapacity = this.getFuelCapacity();
            upgrade.fireplaceSparks = this.fireplaceSparks;
            upgrade.fuelOverflow = this.fuelOverflow;
            upgrade.uniqueSushi = this.uniqueSushi;
            upgrade.fireplaceSparkMultiplier = 1 + this.getFireplaceSparkMultiplier() / 100;
            upgrade.overtunedMultiplier = 1 + this.getOvertunedMultiplier() / 100;
            upgrade.knowledgeExperienceBase = this.getKnowledgeExperienceBase();
            upgrade.saffronHours = Math.round(1 + this.getUpgradeBonus(22));
        }
    }

    prepareCalculationInputs(data: Map<string, any>): void {
        const research = data.get("research");
        const jelly = data.get("jellyOperator");
        const arcade = data.get("arcade");
        const button = data.get("button");
        const minehead = data.get("minehead");
        const gaming = data.get("gaming");
        const collider = data.get("collider");
        const sailing = data.get("sailing") as Sailing;
        const eventShop = data.get("eventShop");
        this.research188 = research.getBonusForId(188);
        this.research189 = research.getBonusForId(189);
        this.jellyObstruction18 = jelly.obstructions[18].getBonus();
        this.arcade67 = arcade.bonuses[67].getBonus();
        this.eventShop45 = Number(eventShop.isBonusOwned(45));
        this.button2 = button.getBonusForIndex(2);
        this.minehead11 = minehead.getBonusFromIndex(11);
        this.gaming67 = Number(gaming.superbits[67]?.unlocked ?? 0);
        this.atom14 = collider.atoms[14].getBonus();
        this.sailingArtifact39 = Number(sailing.artifacts.find(artifact => artifact.index === 39)?.status ?? 0);
        this.dailyKnowledgeEnabled = research.getBonusForId(189, 1) >= 1;
        this.calculatePassiveKnowledge();
        this.prepareUpgradeState();
    }

    getUniqueSushi(): number {
        return this.uniqueSushi;
    }

    getBonusFromIndex(index: number): number {
        return this.sushi.find(sushi => sushi.index === index)?.getBonus() ?? 0;
    }

    getUpgradeBonus(index: number): number {
        return this.upgrades.find(upgrade => upgrade.index === index)?.getBonus() ?? 0;
    }

    getKnowledgeBonusTotal(category: number): number {
        return this.sushi.reduce((total, sushi) => {
            return KNOWLEDGE_CATEGORY_IDS[sushi.data.knowledgeBonusCategory ?? ""] === category
                ? total + sushi.getKnowledgeBonus()
                : total;
        }, 0);
    }

    getSlotEffect(kind: number): number {
        if (kind === 99) return 1 + this.getKnowledgeBonusTotal(8) / 100;
        if (kind === 1) return 50 * this.getSlotEffect(99);
        if (kind === 2) return 0.2 * this.getSlotEffect(99);
        if (kind === 3) return this.getSlotEffect(99);
        return 0;
    }

    getFireplaceEffect(kind: number): number {
        if (kind === 99) return (1 + this.getKnowledgeBonusTotal(9) / 100) * (1 + this.getFireplaceSparkMultiplier() / 100);
        if (kind === 0) return this.getFireplaceEffect(99);
        if (kind === 1) return 150 * this.getFireplaceEffect(99);
        if (kind === 2) return 20 * this.getFireplaceEffect(99);
        if (kind === 3) return 100 * this.getFireplaceEffect(99);
        return 0;
    }

    private getFireplaceSparkMultiplier(): number {
        return 0.2 * lavaLog2(this.fireplaceSparks) + lavaLog(this.fireplaceSparks);
    }

    getKnowledgeExperienceMultiplier(slot: number): number {
        const fireplaceKind = this.fireplaces[slot % 15]?.kind ?? 0;
        const fireplaceBonus = fireplaceKind === 3 ? this.getFireplaceEffect(3) : 0;
        return (1 + this.getUpgradeBonus(38) / 100)
            * (1 + fireplaceBonus / 100)
            * (1 + this.getKnowledgeBonusTotal(1) / 100);
    }

    getKnowledgeExperienceBase(): number {
        return 1 + this.getUpgradeBonus(37) / 10;
    }

    getComboMultiplier(): number {
        return 1 + (Math.min(10, Math.pow(this.bestComboScore, 0.3))
            + (Math.max(0, this.bestComboScore - 1500) / (20000 + Math.max(0, this.bestComboScore - 1500))) * 90);
    }

    getOrangeFireSum(): number {
        return this.board.reduce((sum, slot) => {
            if (slot.sushi && this.fireplaces[slot.index % 15]?.kind === 0) {
                return sum + (slot.sushi.index + 1) * this.getFireplaceEffect(0);
            }
            return sum;
        }, 0);
    }

    getFuelPerHour(): number {
        return 50
            * (1 + Math.min(1, this.bundleBonus))
            * (1 + (this.getUpgradeBonus(8) + (this.getUpgradeBonus(9) + (this.getUpgradeBonus(10) + (this.getUpgradeBonus(11) + this.getUpgradeBonus(12))))) / 100)
            * (1 + this.getOrangeFireSum() / 100)
            * (1 + this.getKnowledgeBonusTotal(4) / 100)
            * (1 + this.sushi[27].getKnowledgeBonus() / 100)
            * (1 + this.sushi[36].getKnowledgeBonus() / 100)
            * (1 + this.sushi[45].getKnowledgeBonus() / 100)
            * (1 + Number(this.upgradeLevels[9] ?? 0) / 100)
            * (1 + Number(this.upgradeLevels[10] ?? 0) / 100)
            * (1 + Number(this.upgradeLevels[11] ?? 0) / 100)
            * (1 + Number(this.upgradeLevels[12] ?? 0) / 100);
    }

    getFuelCapacity(): number {
        return (200 + this.getKnowledgeBonusTotal(3))
            * (1 + Math.min(1, this.bundleBonus))
            * (1 + (this.getUpgradeBonus(1) + (this.getUpgradeBonus(2) + (this.getUpgradeBonus(3) + (this.getUpgradeBonus(4) + this.getUpgradeBonus(5))))) / 100)
            * (1 + Number(this.upgradeLevels[2] ?? 0) / 100)
            * (1 + Number(this.upgradeLevels[3] ?? 0) / 100)
            * (1 + Number(this.upgradeLevels[4] ?? 0) / 100)
            * (1 + Number(this.upgradeLevels[5] ?? 0) / 100);
    }

    getBucksPerHour(): number {
        return this.board.reduce((total, slot) => total + (slot.sushi ? this.getBucksForSlot(slot) : 0), 0);
    }

    private getBucksForSlot(slot: SushiBoardSlot): number {
        const sushiTier = slot.sushi!.index;
        let slotMultiplier = 1;
        if (slot.plateKind === 1) slotMultiplier *= 1 + this.getSlotEffect(1) / 100;
        if (this.fireplaces[slot.index % 15]?.kind === 1) slotMultiplier *= 1 + this.getFireplaceEffect(1) / 100;
        return slotMultiplier * this.getBucksMultiplier()
            * (sushiTier < 10 ? [1, 3, 8, 20, 50, 115, 250, 560, 1220, 2650, 2650][sushiTier]
                : sushiTier < 16 ? Math.pow(2.46 - sushiTier / 100, sushiTier) + (5 * sushiTier + Math.pow(sushiTier, 2))
                    : Math.pow(2.31, sushiTier));
    }

    private getBucksMultiplier(): number {
        return (1 + this.arcade67 / 100)
            * (1 + (100 * this.eventShop45) / 100)
            * this.getComboMultiplier()
            * Math.pow(1.1, this.getUniqueSushi())
            * (1 + Math.min(1, this.bundleBonus))
            * (1 + (this.getUpgradeBonus(30) + (this.getUpgradeBonus(31) + (this.getUpgradeBonus(32) + (this.getUpgradeBonus(33) + (this.getUpgradeBonus(34) + 100 * this.gaming67))))) / 100)
            * (1 + this.getKnowledgeBonusTotal(0) / 100)
            * (1 + this.button2 / 100)
            * (1 + this.bundleBanJ)
            * (1 + this.research189 / 100)
            * (1 + this.getUpgradeBonus(40) / 100)
            * Math.max(1, Math.min(1.25, 1 + this.minehead11 / 100))
            * (1 + (this.getUpgradeBonus(41) + this.getUpgradeBonus(43)) / 100)
            * (1 + this.getOvertunedMultiplier() / 100)
            * (1 + this.atom14 / 100)
            * (1 + this.sailingArtifact39);
    }

    private getOvertunedMultiplier(): number {
        return 5 * lavaLog2(this.fuelOverflow / 1e6) + 10 * lavaLog(this.fuelOverflow / 1e6);
    }

    getFreeShakerChance(): number {
        return Math.min(0.6, (this.getUpgradeBonus(21) + (this.getKnowledgeBonusTotal(5) + this.research188)) / 100);
    }

    getPerfectoChance(tier: number): number {
        return ((0.6 * Math.pow(0.81, tier)) / (1 + tier / 8)) * (1 + this.getKnowledgeBonusTotal(10) / 100);
    }

    getSaltTierUpChance(tier: number): number {
        return Math.pow(0.5, Math.max(0, tier - (Math.min(this.getUniqueSushi(), 53) - 8)));
    }

    getSaffronBucksPerUse(): number {
        return Math.round(1 + this.getUpgradeBonus(22)) * this.getBucksPerHour();
    }

    getShakerFuelPerUse(): number {
        return this.getUpgradeBonus(20) > 0 ? this.getFuelPerHour() : 0;
    }

    getShakerBonusFuelChance(): number {
        return this.getUpgradeBonus(20) > 0 ? this.getUpgradeBonus(20) / 100 : 0;
    }

    // TODO: Integrate the user-provided font-embedded Bucks and Fuel icons.

    getShakerImageData(kind: SushiShaker["kind"]): ImageData {
        const index = kind === "salt" ? 7 : kind === "pepper" ? 8 : 9;
        return { location: `SushiButton${index}`, width: 52, height: 56 };
    }


    private calculatePassiveKnowledge(): void {
        this.sushi.forEach(sushi => { sushi.passiveKnowledgeExperiencePerDay = 0; });
        if (!this.dailyKnowledgeEnabled) return;
        this.board.forEach(slot => {
            if (!slot.sushi || (slot.plateKind !== 2 && slot.plateKind !== 3)) return;
            const gain = this.getSlotEffect(slot.plateKind) * this.getKnowledgeExperienceMultiplier(slot.index);
            if (slot.plateKind === 2) {
                this.sushi.forEach(target => {
                    if (target.index < slot.sushi!.index) target.passiveKnowledgeExperiencePerDay += gain;
                });
            } else {
                slot.sushi.passiveKnowledgeExperiencePerDay += gain;
            }
        });
        this.sushi.forEach(sushi => { sushi.nextDailyResetSeconds = this.nextDailyResetSeconds; });
    }
}

export const updateSushiStation = (data: Map<string, any>): SushiStation => {
    const station = data.get("sushi") as SushiStation;
    station.prepareCalculationInputs(data);
    return station;
};

