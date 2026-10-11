import type { Gaming } from "../gaming";
import type { GamingImportBase } from "../../data/GamingImportRepo";
import type { GamingBoxBase } from "../../data/GamingBoxRepo";
import type { GamingImportModel } from "../../model/gamingImportModel";
import type { GamingBoxModel } from "../../model/gamingBoxModel";
import type { ImageData } from "../../imageData";
import type { Arcade } from "../../world-2/arcade";
import type { Votes } from "../../world-2/votes";
import type { IslandExpeditions } from "../../world-2/islandExpedition";
import type { Bribe } from "../../world-1/bribes";
import type { Equinox, MetalDetector } from "../../world-3/equinox";
import type { AtomCollider } from "../../world-3/construction/atomCollider";
import type { Hole } from "../hole/hole";
import type { ResearchGrid } from "../../world-7/research";
import type { SushiStation } from "../../world-7/sushi";
import type { JellyOperator } from "../../world-7/jellyOperator";
import { letterToNumber } from "../../../utility";

export abstract class ShopUpgrade {
    label?: string;
    level = 0;
    unlocked = false;
    cost = 0;
    affordable = false;
    bonusPercent: number | null = null;
    multiplier: number | null = null;

    constructor(
        public index: number,
        public currency: "acorns" | "tokens",
        public effect: "bits-multiplier" | "growth" | "palette-luck" | "token-rate" | "crown-chance",
    ) { }

    abstract parse(data: Map<string, any>): void;
    abstract update(data: Map<string, any>): void;
    abstract getCurrencyImageData(): ImageData;
}

export class AcornShopUpgrade extends ShopUpgrade {
    constructor(index: number, effect: ShopUpgrade["effect"]) {
        super(index, "acorns", effect);
    }

    override getCurrencyImageData(): ImageData {
        return { location: "GamingAcorn", width: 15, height: 17 };
    }

    override parse(data: Map<string, any>): void {
        const row = data.get("GamingSprout")?.[27] ?? [];
        const options = data.get("OptLacc") ?? [];
        this.level = Number(this.index === 2 ? options[415] ?? 0 : row[this.index + 2] ?? 0);
    }

    override update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const squirrel = gaming.getImport(2) as SquirrelImport;
        const level = this.level;

        this.unlocked = squirrel.purchased && (this.index !== 2 || gaming.isSuperbitPurchased(37));
        this.cost = this.index === 2 ? 4 + level + 3 * Math.max(0, level - 5) : 1 + level + 2 * Math.max(0, level - 5);
        this.affordable = this.unlocked && squirrel.acorns >= this.cost;
        this.multiplier = this.index === 0 ? 1 + 8 * level / (250 + level) : null;
        this.bonusPercent = this.index === 1 ? Math.pow(3 * level, 0.8) : this.index === 2 ? Math.pow(level, 0.8) : null;
    }
}

export class KingTokenShopUpgrade extends ShopUpgrade {
    constructor(index: number, effect: ShopUpgrade["effect"]) {
        super(index, "tokens", effect);
    }

    override getCurrencyImageData(): ImageData {
        return { location: "GamingKingToken", width: 17, height: 16 };
    }

    override parse(data: Map<string, any>): void {
        const row = data.get("GamingSprout")?.[33] ?? [];
        this.level = Number(row[this.index + 1] ?? 0);
    }

    override update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        const kingRat = gaming.getImport(8) as KingRatImport;

        this.label = gaming.metadata.ratShopUpgrades.find(label => label.upgradeId === this.index)!.label;
        this.unlocked = kingRat.purchased;
        this.cost = 2 * (Math.pow(1.15, this.level) + this.level);
        this.affordable = this.unlocked && kingRat.tokens >= this.cost;
        this.bonusPercent = (this.index === 0 ? 5 : this.index === 1 ? 3 : 2) * this.level;
        this.multiplier = 1 + this.bonusPercent / 100;
    }
}

export class Import {
    importId: number;
    boxId: number;
    name: string;
    description: string;
    upgradeBonusText: string;
    flavorText: string;
    costBase: number;
    costExponent: number;
    purchased = false;
    level = 0;
    accessible = false;
    purchaseCostBits = 0;
    upgradeCostBits: number | null = null;
    bonus = 0;

    constructor(data: GamingImportModel, box: GamingBoxModel) {
        this.importId = data.importId;
        this.boxId = data.boxId;
        this.name = data.name;
        this.description = data.effectText;
        this.upgradeBonusText = data.upgradeBonusText;
        this.flavorText = data.flavorText;
        this.costBase = box.costA;
        this.costExponent = box.costB;
    }

    static fromBase(records: GamingImportBase[], boxes: GamingBoxBase[]): Import[] {
        const boxesById = new Map(boxes.map(box => [box.data.boxId, box.data]));
        return records.map(({ data }) => {
            const box = boxesById.get(data.boxId);
            if (!box) throw new Error(`Missing Gaming box ${data.boxId} for import ${data.importId}`);
            switch (data.importId) {
                case 0: return new SprinklerImport(data, box);
                case 1: return new ShovelImport(data, box);
                case 2: return new SquirrelImport(data, box);
                case 3: return new ShellImport(data, box);
                case 4: return new KitsuneImport(data, box);
                case 5: return new BogLogImport(data, box);
                case 6: return new HighScoreImport(data, box);
                case 7: return new SnailImport(data, box);
                case 8: return new KingRatImport(data, box);
                default: return new Import(data, box);
            }
        });
    }

    parse(data: Map<string, any>): void {
        const saved = data.get("Gaming") ?? [];
        const row = data.get("GamingSprout")?.[25 + this.importId] ?? [];
        this.purchased = false;
        for (const letter of String(saved[6] ?? "")) {
            if (letterToNumber(letter) === this.importId) {
                this.purchased = true;
                break;
            }
        }
        this.level = Number(row[0] ?? 0);
    }

    update(data: Map<string, any>): void {
        const gaming = data.get("gaming") as Gaming;
        this.accessible = gaming.level >= 20;
        this.purchaseCostBits = this.costBase * Math.pow(10, this.costExponent);
        // The native UI permits POiNG upgrades as well, even though they grant no bonus.
        this.upgradeCostBits = this.purchaseCostBits / 4 * Math.pow(1.4, this.level);
        this.bonus = Math.round(this.level);
    }

    getDescription = (): string => this.description;
    getBonus = (): number => this.bonus;
    getBonusText = (): string => this.upgradeBonusText.replace("{", this.bonus.toString());
    getUpgradeCost = (): number | null => this.upgradeCostBits;
    getImageData = (): ImageData => ({ location: `GamingItem${this.importId}`, width: 84, height: 75 });
}

export class SprinklerImport extends Import {
    accumulatedSeconds = 0;
    waterCharges = 0;
    nextChargeSeconds = 0;
    rechargeBonusPercent = 0;
    preservationProbability = 0;
    goldenSprinklerPurchases = 0;

    override parse(data: Map<string, any>): void {
        super.parse(data);
        const row = data.get("GamingSprout")?.[25 + this.importId] ?? [];
        this.accumulatedSeconds = Number(row[1] ?? 0);
        this.goldenSprinklerPurchases = Number(data.get("GemItemsPurchased")?.[131] ?? 0);
    }

    override update(data: Map<string, any>): void {
        super.update(data);
        const gaming = data.get("gaming") as Gaming;
        this.rechargeBonusPercent = this.bonus;
        const rechargeMultiplier = 1 + this.rechargeBonusPercent / 100;

        // Charges use an integer draw count. The next charge starts at its next whole-number boundary.
        this.waterCharges = Math.floor(Math.pow(this.accumulatedSeconds * rechargeMultiplier / 3600, 0.75));
        this.nextChargeSeconds = Math.max(0, Math.pow(this.waterCharges + 1, 4 / 3) * 3600 / rechargeMultiplier - this.accumulatedSeconds);

        const purchases = this.goldenSprinklerPurchases;
        const preservation = purchases === 1 ? 0.3 : purchases === 2 ? 0.43 : purchases === 3 ? 0.53 : purchases === 4 ? 0.6 : 0;
        this.preservationProbability = Math.min(0.82, preservation + gaming.getPaletteBonus(16) / 100);
    }

    override getBonusText = (): string => this.upgradeBonusText.replace("{", this.rechargeBonusPercent.toString());
    override getImageData = (): ImageData => ({ location: `GamingItem0${this.goldenSprinklerPurchases > 0 ? "b" : ""}`, width: 84, height: 75 });
}

export class ShovelImport extends Import {
    accumulatedSeconds = 0;
    digs = 0;
    rawDigCount = 0;
    digMultiplier = 1;
    nextDigSeconds = 0;
    bestNugget = 0;
    bigNuggetLuck = 1;
    nuggetRange = { minimum: 1, maximum: 1 };

    override parse(data: Map<string, any>): void {
        super.parse(data);
        const row = data.get("GamingSprout")?.[25 + this.importId] ?? [];
        const saved = data.get("Gaming") ?? [];
        this.accumulatedSeconds = Number(row[1] ?? 0);
        this.bestNugget = Number(saved[8] ?? 0);
    }

    override update(data: Map<string, any>): void {
        super.update(data);
        const islands = data.get("islandExpeditions") as IslandExpeditions;
        const bribes = data.get("bribes") as Bribe[];
        const arcade = data.get("arcade") as Arcade;
        const votes = data.get("votes") as Votes;
        const equinox = data.get("equinox") as Equinox;
        const bribeBonus = bribes.find(bribe => bribe.bribeIndex === 37)!.value;
        const arcadeBonus = arcade.bonuses.find(bonus => bonus.index === 31)!.getBonus();

        this.bonus = Math.floor(10 * (1 + Math.pow(60 * this.level / (250 + this.level), 1.7))) / 10;
        this.bigNuggetLuck = this.bonus;
        this.digMultiplier = (1 + (islands.bonusToShovelSpeed + (bribeBonus + arcadeBonus)) / 100)
            * (1 + votes.getCurrentBonus(22) / 100);
        this.rawDigCount = Math.floor(Math.pow(this.accumulatedSeconds / 3600, 0.44));
        this.digs = Math.round(this.rawDigCount * this.digMultiplier);

        // Apply the multiplier after the integer draw count. Invert the next integer boundary.
        this.nextDigSeconds = Math.max(0, Math.pow(this.rawDigCount + 1, 1 / 0.44) * 3600 - this.accumulatedSeconds);
        const nuggetMultiplier = (equinox.upgrades[7] as MetalDetector).getTotalBonus();
        this.nuggetRange = {
            minimum: this.bigNuggetLuck * (1 / Math.pow(1, 0.64)) * nuggetMultiplier,
            maximum: this.bigNuggetLuck * (1 / Math.pow(1e-5, 0.64)) * nuggetMultiplier,
        };
    }

    override getBonusText = (): string => this.upgradeBonusText.replace("{", this.bigNuggetLuck.toString());
}

export class SquirrelImport extends Import {
    accumulatedSeconds = 0;
    acorns = 0;
    acornsReady = 0;
    // The collection rule is sublinear in elapsed time, not a constant hourly income.
    acornsPerHour = 0;
    acornBonusPercent = 0;
    shop: ShopUpgrade[] = [
        new AcornShopUpgrade(0, "bits-multiplier"),
        new AcornShopUpgrade(1, "growth"),
        new AcornShopUpgrade(2, "palette-luck"),
    ];

    override parse(data: Map<string, any>): void {
        super.parse(data);
        const row = data.get("GamingSprout")?.[25 + this.importId] ?? [];
        const saved = data.get("Gaming") ?? [];
        this.accumulatedSeconds = Number(row[1] ?? 0);
        this.acorns = Number(saved[9] ?? 0);
        this.shop.forEach(upgrade => upgrade.parse(data));
    }

    override update(data: Map<string, any>): void {
        super.update(data);
        this.bonus = Math.round(5 * this.level);
        this.acornBonusPercent = this.bonus;
        this.acornsReady = Math.floor(Math.pow(this.accumulatedSeconds * (1 + this.acornBonusPercent / 100) / 3600, 0.85));
        this.acornsPerHour = Math.pow(1 + this.acornBonusPercent / 100, 0.85);
        this.shop.forEach(upgrade => upgrade.update(data));
    }

    override getBonusText = (): string => this.upgradeBonusText.replace("{", this.acornBonusPercent.toString());

    getCurrencyImageData(): ImageData {
        return { location: "GamingAcorn", width: 15, height: 17 };
    }
}

export class ShellImport extends Import {
    rank = 1;
    completedRankUps = 0;
    evolutionProgress = 0;
    nextRankThreshold = 0;
    remainingEvolutions = 0;
    rankProgressFraction = 0;
    earnedBitsMultiplier = 1;
    nextRankBitsBonusPercent = 0;

    override parse(data: Map<string, any>): void {
        super.parse(data);
        const row = data.get("GamingSprout")?.[25 + this.importId] ?? [];
        this.evolutionProgress = Number(row[1] ?? 0);
        this.completedRankUps = Number(row[2] ?? 0);
    }

    getRankRequirement(rank: number): number {
        return rank <= 0 ? 0 : (15 * rank + Math.pow(5 * rank, 1.2)) * Math.pow(1.25, rank) - 17;
    }

    override update(data: Map<string, any>): void {
        super.update(data);
        this.rank = this.completedRankUps + 1;
        const previousThreshold = this.getRankRequirement(this.completedRankUps);
        this.nextRankThreshold = this.getRankRequirement(this.rank);
        this.remainingEvolutions = Math.max(0, Math.ceil(this.nextRankThreshold - this.evolutionProgress));
        this.rankProgressFraction = Math.max(0, Math.min(1, (this.evolutionProgress - previousThreshold) / (this.nextRankThreshold - previousThreshold)));

        // Completed rank-ups give the earned bonus. The displayed rank advertises the next bonus.
        this.earnedBitsMultiplier = 1 + this.completedRankUps * this.bonus / 100;
        this.nextRankBitsBonusPercent = this.rank * this.bonus;
    }

    override getImageData = (): ImageData => {
        const rank = this.completedRankUps;
        const frame = Math.min(15, Math.min(9, rank) + Math.floor(Math.max(0, (rank - 9) / 5)));
        return { location: `GamingItem3_${frame}`, width: 84, height: 75 };
    };
}

export class KitsuneImport extends Import {
    active = false;
    canToggle = false;
    growthMultiplier = 1;
    rewardMultiplier = 1;

    override parse(data: Map<string, any>): void {
        super.parse(data);
        const row = data.get("GamingSprout")?.[25 + this.importId] ?? [];
        this.active = Number(row[1] ?? 0) === 1;
    }

    override update(data: Map<string, any>): void {
        super.update(data);
        const gaming = data.get("gaming") as Gaming;
        this.canToggle = this.purchased && gaming.garden.slots.every(slot => slot.plant === null);
        this.growthMultiplier = 1 + (3 + this.bonus / 100) * Number(this.active);
        this.rewardMultiplier = 1 / (1 + 2 * Number(this.active));
    }

    override getImageData = (): ImageData => ({ location: `GamingItem4${this.active ? "" : "b"}`, width: 84, height: 75 });
}

export class HighScoreImport extends Import {
    highScore = 0;
    bitsMultiplier = 1;

    override parse(data: Map<string, any>): void {
        super.parse(data);
        const saved = data.get("Gaming") ?? [];
        this.highScore = Number(saved[10] ?? 0);
    }

    override update(data: Map<string, any>): void {
        super.update(data);
        this.bitsMultiplier = Math.max(1 + Math.pow(this.highScore, 0.5) / 100, 1);
    }
}

export class BogLogImport extends HighScoreImport {
    accumulatedSeconds = 0;
    nextGameSeconds = 0;
    freeGameProbability = 0;
    rank = 0;
    deathCardCount = 0;
    progressHours = 0;

    override parse(data: Map<string, any>): void {
        super.parse(data);
        const row = data.get("GamingSprout")?.[25 + this.importId] ?? [];
        const options = data.get("OptLacc") ?? [];
        this.accumulatedSeconds = Number(row[1] ?? 0);
        this.highScore = Number(options[497] ?? 0);
    }

    override update(data: Map<string, any>): void {
        super.update(data);
        const gaming = data.get("gaming") as Gaming;
        this.bonus = Math.floor(60 * this.level / (100 + this.level) * 10) / 10;
        this.bitsMultiplier = Math.max(1, Math.pow(1.2, this.highScore - 1));
        this.freeGameProbability = Math.min(0.8, (this.bonus + gaming.getPaletteBonus(9)) / 100);
        this.nextGameSeconds = Math.max(0, 80000 - this.accumulatedSeconds);
        this.rank = Math.min(12, this.highScore);
        const rank = gaming.metadata.logMinigameRanks.find(rank => rank.rank === this.rank);
        this.deathCardCount = rank?.deathCardCount ?? 0;
        this.progressHours = rank?.progressHours ?? 0;
    }
}

export class SnailImport extends Import {
    currentLevel = 0;
    highestLevel = 0;
    levelCap = 25;
    mail = 0;
    protectionLayers = 0;
    mailDoubleProbability = 0;
    levelUpMailCost = 0;
    protectionMailCost = 0;
    protectionAction: "encourage" | "consecrate" = "encourage";
    successProbability = 0;
    // Conditional on the level-up having failed, not the unconditional reset chance.
    resetOnFailureProbability = 0;
    resetOutcome: "consume-protection" | "checkpoint" | "zero" = "zero";
    resetDestinationLevel = 0;
    bitsMultiplier = 1;

    override parse(data: Map<string, any>): void {
        super.parse(data);
        const row = data.get("GamingSprout")?.[25 + this.importId] ?? [];
        const saved = data.get("Gaming") ?? [];
        const options = data.get("OptLacc") ?? [];
        this.currentLevel = Number(row[1] ?? 0);
        this.highestLevel = Math.max(this.currentLevel, Number(options[210] ?? 0));
        this.mail = Number(saved[13] ?? 0);
        this.protectionLayers = Number(row[2] ?? 0);
    }

    override update(data: Map<string, any>): void {
        super.update(data);
        const gaming = data.get("gaming") as Gaming;
        const hole = data.get("hole") as Hole;
        const collider = data.get("collider") as AtomCollider;
        const level = this.currentLevel;
        const encouragement = this.protectionLayers;
        this.levelCap = Math.round(25 + 10 * Number(gaming.isSuperbitPurchased(29))
            + (5 * Number(gaming.isSuperbitPurchased(30)) + 10 * Number(gaming.isSuperbitPurchased(40))));
        this.mailDoubleProbability = Math.min(1, this.bonus / 100);

        const extended = level >= 25 && this.levelCap >= 26;
        this.levelUpMailCost = extended ? 5 : 3;
        this.protectionMailCost = extended ? 30 : 1;
        this.protectionAction = extended ? "consecrate" : "encourage";
        const successBonus = hole.getSchematicBonus(53, 0);
        this.successProbability = level > 24
            ? Math.min(1, (1 - 0.6 * Math.pow(level - 24, 0.16)) * (1 + successBonus / 100) * (1 + 50 * encouragement / (3 + encouragement) / 100))
            : Math.min(1, (1 - 0.1 * Math.pow(level, 0.71)) * (1 + successBonus / 100) * (1 + 110 * encouragement / (25 + encouragement) / 100));

        // Roll for a reset only after a failed attempt.
        this.resetOnFailureProbability = level > 24
            ? Math.max(0, (Math.pow(level - 24, 0.19) - 0.9) / (1 + 60 * encouragement / (3 + encouragement) / 100))
            : Math.max(0, (Math.pow(level + 1, 0.07) - 1) / (1 + 300 * encouragement / (100 + encouragement) / 100));
        const checkpoint = collider.atoms.find(atom => atom.index === 10)!.getBonus();

        // Consecration consumes a layer instead of resetting. Otherwise, apply the atom checkpoint.
        this.resetOutcome = extended && encouragement > 0 ? "consume-protection" : checkpoint >= 1 ? "checkpoint" : "zero";
        this.resetDestinationLevel = this.resetOutcome === "consume-protection" ? level : this.resetOutcome === "checkpoint" ? Math.min(5 * Math.floor(level / 5), checkpoint) : 0;
        this.bitsMultiplier = Math.pow(2, Math.max(0, Math.min(25, level))) * Math.pow(1.5, Math.max(0, Math.min(25, level - 25)));
    }

    getMailImageData(): ImageData {
        return { location: "GamingMail", width: 22, height: 16 };
    }
}

export class KingRatImport extends Import {
    // Species zero-based index * 10 + zero-based evolution stage.
    crownIds: number[] = [];
    crownCount = 0;
    remainingCrowns = 100;
    tokens = 0;
    tokensPerHour = 0;
    bitsMultiplier = 1;
    // Probability of entering the crown draw; the selected crown may already be owned.
    crownChances: { stage: number; probability: number }[] = [];
    shop: ShopUpgrade[] = [
        new KingTokenShopUpgrade(0, "token-rate"),
        new KingTokenShopUpgrade(1, "palette-luck"),
        new KingTokenShopUpgrade(2, "crown-chance"),
    ];

    override parse(data: Map<string, any>): void {
        super.parse(data);
        const saved = data.get("Gaming") ?? [];
        const crowns = data.get("Research")?.[11] ?? [];
        this.tokens = Number(saved[14] ?? 0);
        this.crownIds = [...new Set<number>(crowns.map((id: string) => Number(id[0]) * 10 + letterToNumber(id[1])))];
        this.shop.forEach(upgrade => upgrade.parse(data));
    }

    override update(data: Map<string, any>): void {
        super.update(data);
        const gaming = data.get("gaming") as Gaming;
        const research = data.get("research") as ResearchGrid;
        const arcade = data.get("arcade") as Arcade;
        const sushi = data.get("sushi") as SushiStation;
        const jelly = data.get("jellyOperator") as JellyOperator;
        this.crownCount = this.crownIds.length;
        this.remainingCrowns = 100 - this.crownCount;
        this.shop.forEach(upgrade => upgrade.update(data));
        this.bitsMultiplier = Math.max(1, Math.pow(1.13, this.crownCount) + (100 * Math.min(10, this.crownCount) + 50 * Math.max(0, this.crownCount - 10)) / 100);

        const researchBonus = research.getBonusForId(108, 0);
        this.tokensPerHour = researchBonus >= 1
            ? (1 + 0.5 * Number(gaming.isSuperbitPurchased(50))) * (1 + (gaming.getPaletteBonus(34) + researchBonus) / 100)
            * (1 + this.crownCount / 100) * (1 + this.shop[0].bonusPercent! / 100)
            : 0;

        const arcadeBonus = arcade.bonuses.find(bonus => bonus.index === 65)!.getBonus();
        const crownBonus = this.shop[2].bonusPercent! + (this.bonus + arcadeBonus);
        const sushiBonus = sushi.getBonusFromIndex(31);
        const jellyBonus = jelly.obstructions.find(obstruction => obstruction.index === 42)!.getBonus();
        // Display stages start at 1. The probability uses the zero-based stage and includes duplicate draws.
        this.crownChances = Array.from({ length: 10 }, (_, stage) => ({
            stage: stage + 1,
            probability: Math.min(1, 0.05 * (1 + 0.5 * Number(gaming.isSuperbitPurchased(60))) * (1 + sushiBonus / 100)
                * (1 + jellyBonus / 100) * (1 + crownBonus / 100) * Math.pow(1.5, stage)),
        }));
    }

    getCurrencyImageData(): ImageData {
        return { location: "GamingKingToken", width: 17, height: 16 };
    }

    getCrownImageData(): ImageData {
        return { location: "GamingRatCrown", width: 26, height: 22 };
    }
}
