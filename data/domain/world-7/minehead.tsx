import { Domain, RawData } from "../base/domain";
import { MineheadOpponentBase, initMineheadOpponentRepo } from "../data/MineheadOpponentRepo";
import { MineheadUpgradeBase, initMineheadUpgradeRepo } from "../data/MineheadUpgradeRepo";
import { Item } from "../items";
import { SkillsIndex } from "../SkillsIndex";
import { MineheadOpponentModel } from "../model/mineheadOpponentModel";
import { MineheadUpgradeModel } from "../model/mineheadUpgradeModel";
import { SushiStation } from "./sushi";
import type { ResearchGrid } from "./research";

export class MineheadOpponent {
    defeated: boolean = false;

    constructor(public index: number, public data: MineheadOpponentModel) { }

    static fromBase(data: MineheadOpponentBase[]): MineheadOpponent[] {
        return data.map(opponent => new MineheadOpponent(opponent.index, opponent.data));
    }

    getBaseBonus(): number {
        return this.data.bonusValue;
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

    static fromBase(data: MineheadUpgradeBase[]): MineheadUpgrade[] {
        return data.map(upgrade => new MineheadUpgrade(upgrade.index, upgrade.data));
    }

    getBonus(): number {
        return this.data.quantityPerLevel * this.level * (this.menagerieDoubled ? 2 : 1);
    }

    getRequiredLevel(): number {
        const index = this.index;
        // Shop requirements gain an extra Research level every third and eleventh upgrade.
        return 1 + (3 * index + (Math.floor(index / 3) + Math.floor(index / 11)));
    }

    nextLevelCost(): number {
        const index = this.index;
        // Keep the server scaling and two independent discounts in game multiplication order.
        return (5 + index + Math.pow(Math.max(0, index - 2), 1.3))
            * Math.pow(2, Math.max(0, index - 4))
            * Math.pow(this.serverCostScaling, Math.max(0, index - 9))
            * this.mineheadCostReduction
            * this.sushiCostReduction
            * Math.pow(this.data.costExponent, this.level);
    }

    isUnlocked(): boolean {
        return this.unlocked;
    }

    isMaxed(): boolean {
        // Large listed maximums are unlimited; the max-zero shop entry is already capped.
        return this.data.maxLevel <= 998 && this.level >= this.data.maxLevel;
    }
}

export class Minehead extends Domain {
    opponents: MineheadOpponent[] = [];
    upgrades: MineheadUpgrade[] = [];
    opponentsDefeated: number = 0;
    currency: number = 0;
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

        // Account values must be reset on every parse when old-save rows are absent.
        minehead.opponentsDefeated = Number(researchData[7]?.[4]) || 0;
        minehead.currency = Number(researchData[7]?.[5]) || 0;
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

    // Progression indices gate earned rewards; display IDs are presentation-only.
    minehead.opponents.forEach(opponent => {
        opponent.defeated = minehead.opponentsDefeated > opponent.index;
    });

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
