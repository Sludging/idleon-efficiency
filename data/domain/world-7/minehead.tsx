import { Domain, RawData } from "../base/domain";
import { getCompanionActiveBonus, isCompanionLevelTwo, type Companion } from "../companions";
import { MineheadMetadataBase, initMineheadMetadataRepo } from "../data/MineheadMetadataRepo";
import { MineheadOpponentBase, initMineheadOpponentRepo } from "../data/MineheadOpponentRepo";
import { MineheadUpgradeBase, initMineheadUpgradeRepo } from "../data/MineheadUpgradeRepo";
import { Item } from "../items";
import { SkillsIndex } from "../SkillsIndex";
import { MineheadMetadataModel } from "../model/mineheadMetadataModel";
import { MineheadOpponentModel } from "../model/mineheadOpponentModel";
import { MineheadUpgradeModel } from "../model/mineheadUpgradeModel";
import { TaskBoard } from "../tasks";
import { commaNotation, lavaLog, notateNumber } from "../../utility";
import type { ImageData } from "../imageData";
import { SushiStation } from "./sushi";
import type { ResearchGrid } from "./research";

// Native upgrades use these token rules; opponent rewards use them only for website previews, not native-render parity.
const formatMineheadDescription = (description: string, value: number): string => {
    const multiplier = notateNumber(1 + value / 100, "MultiplierInfo").replace("#", "");
    return description.replace(/{/g, commaNotation(value))
        .replace(/}/g, multiplier)
        .replace(/_/g, " ")
        .replace(/@/g, " ");
};

export class MineheadOpponent {
    defeated: boolean = false;
    maximumHp = 0;
    depthCharges = 0;

    constructor(public index: number, public data: MineheadOpponentModel) { }

    getImageData(): ImageData {
        return { location: `MineH${this.data.displayId}`, width: 40, height: 40 };
    }

    static fromBase(data: MineheadOpponentBase[]): MineheadOpponent[] {
        return data.map(opponent => new MineheadOpponent(opponent.index, opponent.data));
    }

    getBaseBonus(): number {
        return this.data.bonusValue;
    }

    getDescription(): string {
        // The approved preview omits only these appended unresolved current-context clauses.
        const contextualClause = this.index === 1 ? " Current Research AFK rate:"
            : this.index === 4 ? " Based on your current weapon,"
                : this.index === 18 ? ", which build things" : undefined;
        const description = contextualClause
            ? this.data.bonusDescription.split(contextualClause)[0]
            : this.data.bonusDescription;
        return formatMineheadDescription(description, this.getBaseBonus());
    }


    getBonus(): number {
        // Base bonus is the preview value; earned bonus additionally requires defeating this progression index.
        return this.defeated ? this.getBaseBonus() : 0;
    }
}

export class MineheadUpgrade {
    level: number = 0;
    unlocked: boolean = false;
    serverCostScaling: number = 1;
    mineheadCostReduction: number = 1;
    sushiCostReduction: number = 1;
    menagerieDoubled = false;

    constructor(public index: number, public data: MineheadUpgradeModel) { }

    getImageData(): ImageData {
        return { location: `MineUpg${this.index}`, width: 43, height: 43 };
    }

    static fromBase(data: MineheadUpgradeBase[]): MineheadUpgrade[] {
        return data.map(upgrade => new MineheadUpgrade(upgrade.index, upgrade.data));
    }

    getBonus(): number {
        return this.data.quantityPerLevel * this.level * (this.menagerieDoubled ? 2 : 1);
    }

    getDescriptionValue(minehead: Minehead): number | undefined {
        const quantity = this.getBonus();

        switch (this.index) {
            case 1:
                return Math.round(1 + (quantity + 1 + Math.min(1, Math.floor((quantity + 1) / 9))));
            case 12:
                return minehead.metadata.damageMultiplierByQuantity[quantity];
            case 17:
                return minehead.metadata.additivePercentByQuantity[quantity];
            case 14:
                return 1.5 + quantity / 100;
            case 23:
                return quantity === 0 ? undefined : Math.ceil(1 / (0.01 * (1 + quantity / 100)));
            case 24:
                return Math.ceil(minehead.getJackpotTiles());
            case 26:
                return Math.round(10000 * (1 - 1 / (1 + quantity / 100))) / 100;
            case 28:
                return minehead.getUpgrade28CurrencyBonus();
            default:
                return undefined;
        }
    }

    getDescription(minehead: Minehead): string {
        const description = formatMineheadDescription(this.data.description, this.getBonus());

        switch (this.index) {
            case 1:
                return this.level === 17
                    ? "Your max possible number is 19, that's the MAXIMUM max number there is!!!"
                    : description.replace("$", `${this.getDescriptionValue(minehead)}`);
            case 2: {
                const grid = minehead.metadata.gridSizesByLevel;
                if (this.level === 16) {
                    return "Your grid is 12x6, that's a full grid right there! Rock on!";
                }
                const current = grid[this.level];
                const next = grid[this.level + 1];
                return description.replace("$", `Expands your grid to ${next.width}x${next.height} tiles, that's ${next.width * next.height} total tiles! Way more than your current ${current.width}x${current.height} grid.`);
            }
            case 12:
                return this.getBonus() === 0
                    ? "Unlocks the chance to reveal Multiplier Tiles instead of boring Number Tiles!"
                    : description.replace("$", `${this.getDescriptionValue(minehead)}x`);
            case 14:
                return description.replace("$", `${notateNumber(this.getDescriptionValue(minehead)!, "MultiplierInfo").replace("#", "")}x`);
            case 17:
                return this.getBonus() === 0
                    ? "Unlocks the chance to reveal Additive Tiles!"
                    : description.replace("$", `${this.getDescriptionValue(minehead)}%`);
            case 23:
                return this.getBonus() === 0
                    ? "Unlocks the chance to reveal JACKPOT Tiles! These are awesome!"
                    : description.replace("$", `${this.getDescriptionValue(minehead)}`);
            case 24:
            case 26:
                return description.replace("$", `${this.getDescriptionValue(minehead)}`);
            case 28: {
                const currencyBonus = minehead.getUpgradeBonus(28);
                return `+${commaNotation(currencyBonus)}% Mine Currency per POW 10 of your best ever hit, so +${notateNumber(this.getDescriptionValue(minehead)!)}% total.`;
            }
            default:
                return description;
        }
    }


    getRequiredLevel(): number {
        const index = this.index;
        // Shop requirements gain an extra Research level every third and eleventh upgrade.
        return 1 + (3 * index + (Math.floor(index / 3) + Math.floor(index / 11)));
    }

    costAtLevel(level: number): number {
        const index = this.index;
        // Keep the server scaling and two independent discounts in game multiplication order.
        return (5 + index + Math.pow(Math.max(0, index - 2), 1.3))
            * Math.pow(2, Math.max(0, index - 4))
            * Math.pow(this.serverCostScaling, Math.max(0, index - 9))
            * this.mineheadCostReduction
            * this.sushiCostReduction
            * Math.pow(this.data.costExponent, level);
    }

    getCostToLevel(targetLevel: number): number {
        const finalLevel = this.data.maxLevel < 999
            ? Math.min(targetLevel, this.data.maxLevel)
            : targetLevel;
        let total = 0;
        for (let level = this.level; level < finalLevel; level++) {
            total += this.costAtLevel(level);
        }
        return total;
    }

    nextLevelCost(): number {
        return this.costAtLevel(this.level);
    }

    isUnlocked(): boolean {
        return this.unlocked;
    }

    isMaxed(): boolean {
        // Large listed maximums are unlimited; the max-zero shop entry is already capped.
        return this.data.maxLevel < 999 && this.level >= this.data.maxLevel;
    }
}

export class Minehead extends Domain {
    readonly metadata: MineheadMetadataModel = (initMineheadMetadataRepo()[0] as MineheadMetadataBase).data;
    opponents: MineheadOpponent[] = [];
    upgrades: MineheadUpgrade[] = [];
    opponentsDefeated: number = 0;
    currency: number = 0;
    remainingDailyAttempts = 0;
    dailyTries = 0;
    maxLives = 0;
    baseDamage = 0;
    currencyGain = 0;
    mineCurrencyLogScaling = 0;
    mineHpScaling = 1;
    serverCostScaling: number = 1;
    mineheadDoublersOwned = 0;
    mineheadDoublersRemaining = 0;
    private preparedTradeDropRateMultiplier = 1;
    prepareMenagerieDoublerSelections(menagerie: { isMineheadUpgradeDoubled(index: number): boolean }): void {
        this.upgrades.forEach(upgrade => {
            upgrade.menagerieDoubled = menagerie.isMineheadUpgradeDoubled(upgrade.index);
        });
    }

    getRawKeys(): RawData[] {
        return [
            { key: "Research", perPlayer: false, default: [] },
            // Minehead uses player 0's Research skill level for account-wide shop unlocks.
            { key: "Lv0_0", perPlayer: false, default: [] }
        ];
    }

    init(_allItems: Item[], _charCount: number) {
        if (this.opponents.length === 0) {
            this.opponents = MineheadOpponent.fromBase(initMineheadOpponentRepo());
        }
        if (this.upgrades.length === 0) {
            this.upgrades = MineheadUpgrade.fromBase(initMineheadUpgradeRepo());
        }
        return this;
    }

    parse(data: Map<string, any>): void {
        const minehead = data.get(this.getDataKey()) as Minehead;
        minehead.preparedTradeDropRateMultiplier = 1;
        const researchData = data.get("Research") as number[][];
        const upgradeLevels = researchData[8] || [];
        const player0Skills = data.get("Lv0_0") as number[];
        const researchLevel = Number(player0Skills[SkillsIndex.Research]) || 0;
        const serverVars = data.get("servervars") as Record<string, unknown> | undefined;
        minehead.serverCostScaling = Number(serverVars?.A_MineCost ?? 1);
        minehead.mineHpScaling = Number(serverVars?.A_MineHP ?? 1);

        // Account values must be reset on every parse when old-save rows are absent.
        minehead.remainingDailyAttempts = Number(researchData[7]?.[8] ?? 0);
        minehead.opponentsDefeated = Number(researchData[7]?.[4]) || 0;
        minehead.currency = Number(researchData[7]?.[5]) || 0;
        minehead.mineCurrencyLogScaling = Number(researchData[7]?.[6] ?? 0);
        minehead.upgrades.forEach(upgrade => {
            upgrade.level = Number(upgradeLevels[upgrade.index]) || 0;
            upgrade.unlocked = researchLevel >= upgrade.getRequiredLevel();
        });
    }

    prepareTradeDropRateMultiplier(researchBonus: number, tradeBonusPercent: number): void {
        // Insider Trading Secrets grants its trade bonus only when its primary Research bonus reaches one.
        this.preparedTradeDropRateMultiplier = researchBonus >= 1 ? 1 + tradeBonusPercent / 100 : 1;
    }

    getTradeDropRateMultiplier(): number {
        return this.preparedTradeDropRateMultiplier;
    }

    getOpponentsDefeated(): number {
        return this.opponentsDefeated;
    }

    setOpponentMaximumHp(): void {
        this.opponents.forEach(opponent => {
            const index = opponent.index;
            opponent.maximumHp = (5 + 2 * index + Math.pow(index, 2))
                * Math.pow(1.8, index)
                * Math.pow(1.85, Math.floor(Math.max(0, index - 4) / 3))
                * Math.pow(4, Math.floor(Math.max(0, index - 5) / 7))
                * Math.pow(Math.max(1, this.mineHpScaling), Math.max(0, index - 9));
        });
    }

    setOpponentDepthCharges(gaming: { isSuperbitPurchased(index: number): boolean }, dreamBonus: number,
        ninjaPurchased: boolean, spelunkingCellLevel: number): void {
        this.opponents.forEach(opponent => {
            const index = opponent.index;
            const charges = 1 - (Math.min(1, Number(gaming.isSuperbitPurchased(66)))
                + Math.min(1, dreamBonus) + Number(ninjaPurchased)
                + Math.min(3, Math.ceil(spelunkingCellLevel / 2)))
                + Math.floor(index / 3) + Math.floor(index / 7) + Math.floor(index / 13)
                + Math.min(1, Math.floor(index / 15)) + Math.floor(index / 17);
            opponent.depthCharges = Math.round(Math.min(40, Math.max(1, charges)));
        });
    }

    setDailyTries(research: ResearchGrid): void {
        this.dailyTries = Math.round(3 + research.getBonusForId(147, 1));
    }

    setBaseDamage(research: ResearchGrid, sailingBonus: number, dancingCoralBonus: number,
        legendTalentBonus: number, jellyBonus: number): void {
        this.baseDamage = (1 + this.getUpgradeBonus(0) + this.getUpgradeBonus(7)
            + this.getUpgradeBonus(25) + dancingCoralBonus)
            * (1 + (this.getUpgradeBonus(4) + this.getUpgradeBonus(21) + this.getUpgradeBonus(27)) / 100)
            * (1 + research.getBonusForId(167) / 100)
            * (1 + 50 * sailingBonus / 100) * (1 + legendTalentBonus / 100) * (1 + jellyBonus / 100);
    }

    setCurrencyGain(data: Map<string, any>): void {
        const research = data.get("research") as ResearchGrid;
        const sushi = data.get("sushi") as SushiStation;
        const companions = data.get("companions") as Companion[];
        const eventShop = data.get("eventShop") as { isBonusOwned(index: number): boolean };
        const armory = data.get("royalArmory") as { getMineheadCurrencyOutpostMultiplier(): number };
        const jelly = data.get("jellyOperator") as { getObstructionBonus(index: number): number };
        const dancingCoral = data.get("dancingCoral") as { getBonusFromIndex(index: number): number };
        const button = data.get("button") as { getBonusForIndex(index: number): number };
        const arcade = data.get("arcade") as { bonuses: { index: number; getBonus(): number }[] };
        const collider = data.get("collider") as { atoms: { index: number; getBonus(): number }[] };
        const cooking = data.get("cooking") as { getMealBonusForKey(key: string): number };
        const tasks = data.get("taskboard") as TaskBoard;
        const legend = data.get("legendTalents") as { getBonusFromIndex(index: number): number };
        const taskLevel = tasks.merits.find(merit => merit.index === 52)!.level;
        const companionBonus = Math.max(1, Math.min(2, getCompanionActiveBonus(companions, 143))
            + Number(isCompanionLevelTwo(companions, 143)));
        const upgradeBonus = this.getUpgradeBonus(5) + this.getUpgradeBonus(22)
            + this.getUpgrade28CurrencyBonus()
            + dancingCoral.getBonusFromIndex(5);
        const arcadeBonus = arcade.bonuses.find(bonus => bonus.index === 62)?.getBonus() ?? 0;
        const colliderBonus = collider.atoms.find(atom => atom.index === 13)?.getBonus() ?? 0;

        this.currencyGain = research.getBonusForId(129)
            * (1 + Number(eventShop.isBonusOwned(44)))
            * (1 + research.getBonusForId(148) / 100)
            * Math.max(1, armory.getMineheadCurrencyOutpostMultiplier())
            * (1 + sushi.getBonusFromIndex(12) / 100)
            * (1 + jelly.getObstructionBonus(8) / 100)
            * (1 + Number(sushi.bundleBanJ))
            * (1 + 10 * taskLevel / 100)
            * companionBonus
            * Math.min(3, 1 + this.getBonusFromIndex(6) / 100)
            * (1 + upgradeBonus / 100)
            * (1 + button.getBonusForIndex(1) / 100)
            * (1 + arcadeBonus / 100)
            * (1 + colliderBonus / 100)
            * (1 + legend.getBonusFromIndex(40) / 100)
            * (1 + (research.getBonusForId(147) + research.getBonusForId(166)
                + cooking.getMealBonusForKey("MineCurr")) / 100);
    }
    getCurrencyLogScalingFactor(): number {
        return lavaLog(this.mineCurrencyLogScaling);
    }
    getUpgrade28CurrencyBonus(): number {
        return this.getUpgradeBonus(28) * this.getCurrencyLogScalingFactor();
    }
    getJackpotTiles(): number {
        return Math.round(3 + this.getUpgradeBonus(24));
    }



    getBonusFromIndex(index: number): number {
        return this.opponents.find(opponent => opponent.index === index)?.getBonus() ?? 0;
    }

    getUpgradeBonus(index: number): number {
        return this.upgrades.find(upgrade => upgrade.index === index)?.getBonus() ?? 0;
    }

    canAffordUpgrade(index: number): boolean {
        const upgrade = this.upgrades.find(upgrade => upgrade.index === index);
        return upgrade !== undefined && this.currency >= upgrade.nextLevelCost() && !upgrade.isMaxed();
    }

    canBuyUpgrade(index: number): boolean {
        const upgrade = this.upgrades.find(upgrade => upgrade.index === index);
        // The shop adds the account Research unlock to the funds-and-cap check.
        return upgrade !== undefined && upgrade.isUnlocked()
            && this.currency >= upgrade.nextLevelCost() && !upgrade.isMaxed();
    }
}

export const updateMinehead = (data: Map<string, any>) => {
    const minehead = data.get("minehead") as Minehead;
    const sushi = data.get("sushi") as SushiStation;
    const menagerie = data.get("menagerie") as {
        getResourceBalances(): { mineheadDoublersOwned: number; mineheadDoublers: number };
    };
    const resources = menagerie.getResourceBalances();
    minehead.mineheadDoublersOwned = resources.mineheadDoublersOwned;
    minehead.mineheadDoublersRemaining = resources.mineheadDoublers;

    minehead.maxLives = Math.round(3 + minehead.getUpgradeBonus(6));
    // Progression indices gate earned rewards; display IDs are presentation-only.
    minehead.opponents.forEach(opponent => {
        opponent.defeated = minehead.opponentsDefeated > opponent.index;
    });
    minehead.setOpponentMaximumHp();

    const serverCostScaling = Math.max(1, minehead.serverCostScaling);
    const mineheadCostReduction = 1 / (1 + minehead.getUpgradeBonus(26) / 100);
    // Sushi discounts replace one another; they do not stack, and leave at least 10% of the cost.
    const sushiCostReduction = Math.max(0.1, 1 - Math.max(sushi.getBonusFromIndex(1), sushi.getBonusFromIndex(16)) / 100);
    minehead.upgrades.forEach(upgrade => {
        upgrade.serverCostScaling = serverCostScaling;
        upgrade.mineheadCostReduction = mineheadCostReduction;
        upgrade.sushiCostReduction = sushiCostReduction;
    });
    return minehead;
};

export const updateMineheadDropRate = (data: Map<string, any>): void => {
    const minehead = data.get("minehead") as Minehead;
    const research = data.get("research") as ResearchGrid;
    minehead.prepareTradeDropRateMultiplier(research.getBonusForId(168, 0), research.getBonusForId(168, 2));
};
export const updateMineheadDailyTries = (data: Map<string, any>): void => {
    const minehead = data.get("minehead") as Minehead;
    minehead.setDailyTries(data.get("research") as ResearchGrid);
};

export const updateMineheadBaseDamage = (data: Map<string, any>): void => {
    const minehead = data.get("minehead") as Minehead;
    minehead.setBaseDamage(
        data.get("research") as ResearchGrid,
        (data.get("sailing") as { getMineheadDamageSailingLevel(): number }).getMineheadDamageSailingLevel(),
        (data.get("dancingCoral") as { getBonusFromIndex(index: number): number }).getBonusFromIndex(5),
        (data.get("legendTalents") as { getBonusFromIndex(index: number): number }).getBonusFromIndex(40),
        (data.get("jellyOperator") as { getObstructionBonus(index: number): number }).getObstructionBonus(9),
    );
};

export const updateMineheadDepthCharges = (data: Map<string, any>): void => {
    const minehead = data.get("minehead") as Minehead;
    const equinox = data.get("equinox") as { getChallengeBonus(index: number): number };
    const sneaking = data.get("sneaking") as { jadeUpgrades: { index: number; purchased: boolean }[] };
    const spelunking = data.get("spelunking") as { getMineheadDepthChargeCellLevel(): number };
    minehead.setOpponentDepthCharges(
        data.get("gaming"),
        equinox.getChallengeBonus(41),
        sneaking.jadeUpgrades.find(upgrade => upgrade.index === 45)?.purchased ?? false,
        spelunking.getMineheadDepthChargeCellLevel(),
    );
};

export const updateMineheadCurrencyGain = (data: Map<string, any>): void => {
    (data.get("minehead") as Minehead).setCurrencyGain(data);
};
