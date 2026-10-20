import { commaNotation, lavaLog, notateNumber, number2letter } from "../../../utility";
import { initFountainCurrencyRepo } from "../../data/FountainCurrencyRepo";
import { initFountainUpgradeRepo, FountainUpgradeBase } from "../../data/FountainUpgradeRepo";
import { FountainCurrencyModel } from "../../model/fountainCurrencyModel";
import { FountainUpgradeModel } from "../../model/fountainUpgradeModel";

const currencyPages = [0, 0, 0, 1, 1, 1, 2, 2, 2] as const;
const currencyBonusIndexes = [
    [[0, 2], [0, 2]], [[0, 3], [0, 5]], [[0, 4], [0, 6]],
    [[1, 2], [0, 7]], [[1, 3], [1, 5]], [[1, 4], [1, 6]],
    [[2, 2], [1, 7]], [[2, 3], [2, 5]], [[2, 4], [2, 6]],
] as const;
type FountainBarIndex = 0 | 1 | 2;

function formatTimerDisplay(seconds: number): string {
    if (!(seconds >= 0)) {
        return "0hr_0min_0sec";
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) - 60 * hours;
    const remainingSeconds = Math.round(seconds) - 60 * Math.floor(seconds / 60);
    return `${hours}hr_${minutes}min_${remainingSeconds}sec`;
}



export interface FountainStackItem {
    currencyId: number;
    value: number | null;
}

export interface FountainStack {
    space: number;
    items: FountainStackItem[];
    royal: boolean;
}

export interface FountainModifiers {
    arcadeBonus68: number;
    bUpgrade94Level1: number;
    bUpgrade95Level10: number;
    bUpgrade97Level3: number;
    coveUpgrade14: number;
    cosmoBonusQuantity4: number;
    lampBonus99: number;
    measurementBonus16: number;
    bellBonus6: number;
    studyBonus15: number;
    ownedCaverns: number;
    currencyValueExponent: number;
    duckCount: number;
}

export interface FountainOpalCost {
    amount: number;
    currencyId: number;
}

export class FountainCurrency {
    wallet: number = 0;
    luckyCoins: number = 0;

    constructor(public index: number, public data: FountainCurrencyModel) { }
}

export class FountainUpgrade {
    level: number = 0;
    marbleizationLevel: number = 0;

    constructor(public index: number, public data: FountainUpgradeModel) { }

    static fromBase(data: FountainUpgradeBase[]) {
        return data.map(d => new FountainUpgrade(d.index, d.data));
    }

    getMarbleBonus(): number {
        return this.marbleizationLevel === 0 ? 1 : 1.5 + 0.5 * this.marbleizationLevel;
    }

    getDescription(fountain: Fountain): string | null {
        let description = this.data.description;
        const bonus = this.getBonus();
        description = description
            .replace(/\{/g, commaNotation(bonus))
            .replace(/\}/g, notateNumber(1 + bonus / 100, "MultiplierInfo").replace(/#/g, ""));

        const currencyId = this.data.index - 2 + this.data.waterIndex * 3;
        const replaceValue = (token: "$" | "^" | "#", value: number, format: (value: number) => string): boolean => {
            if (!description.includes(token)) {
                return false;
            }
            description = description.replace(token, format(value));
            return true;
        };
        const replaceCurrencyBaseValue = (token: "$" | "^" | "#"): boolean => replaceValue(
            token,
            fountain.getCurrencyBaseValue(currencyId),
            value => value < 1_000_000 ? commaNotation(value) : notateNumber(value, "Big")
        );
        const replaceBarTimer = (token: "$" | "^" | "#", seconds: number): boolean => replaceValue(
            token,
            seconds,
            formatTimerDisplay
        );

        if (description.includes("$") || description.includes("^") || description.includes("#")) {
            if (this.data.waterIndex === 0) {
                if ([2, 3, 4].includes(this.data.index) && !replaceCurrencyBaseValue("$")) {
                    return null;
                }
                if (this.data.index === 2 && !replaceValue("^", fountain.getAllCurrencyMultiplier(), value =>
                    value > 1_000 ? `${notateNumber(value, "Big")}x` : `${Math.round(value * 100) / 100}x`)) {
                    return null;
                }
                if (this.data.index === 8 && !replaceValue("$", fountain.getKeepMultiplier(), value =>
                    String(Math.round(100 * value) / 100))) {
                    return null;
                }
                if (this.data.index === 9) {
                    const speed = fountain.getBarSpeed(0);
                    const activeSpeed = fountain.getActiveBarSpeedMultiplier();
                    if (!replaceBarTimer("#", Math.max(0, fountain.getBarRequirement(0)) / speed)) {
                        return null;
                    }
                    const remaining = fountain.barTimerProgress;
                    if (!replaceBarTimer("$", Math.max(0, fountain.getBarRequirement(0) - remaining) /
                        (speed * Math.max(1, activeSpeed)))) {
                        return null;
                    }
                }
                if (this.data.index === 10 && !replaceValue("$", fountain.getCapacity(), value => String(Math.round(value)))) {
                    return null;
                }
                if (this.data.index === 11 && !replaceValue("$", fountain.getMaximumStackSize(), value => String(Math.round(value)))) {
                    return null;
                }
                if ([10, 11].includes(this.data.index) &&
                    !replaceValue("#", fountain.getMaximumCoins(), value => String(Math.round(value)))) {
                    return null;
                }
                if (this.data.index === 12) {
                    const activeSpeed = fountain.getActiveBarSpeedMultiplier();
                    if (!replaceValue("$", activeSpeed, value => String(Math.round(100 * value) / 100))) {
                        return null;
                    }
                    if (activeSpeed > 1) {
                        const speed = fountain.getBarSpeed(0);
                        description += `_@_While_you're_active_here,_@_the_fountain_fills_every_@_` +
                            formatTimerDisplay(fountain.getBarRequirement(0) / (speed * Math.max(1, activeSpeed)));
                    }
                }
                if (this.data.index === 19 && !replaceValue("$", fountain.getWalletValueMultiplier(0), value =>
                    String(Math.round(100 * value) / 100))) {
                    return null;
                }
            } else if (this.data.waterIndex === 1) {
                if ([2, 3, 4].includes(this.data.index) && !replaceCurrencyBaseValue("$")) {
                    return null;
                }
                if (this.data.index === 8 && !replaceValue("$", fountain.getRoyalChance(), value =>
                    commaNotation(1 / value))) {
                    return null;
                }
                if (this.data.index === 9 && !replaceValue("$", fountain.getRoyalMultiplier(), value =>
                    String(Math.round(100 * value) / 100))) {
                    return null;
                }
                if (this.data.index === 10 && !replaceValue("$", fountain.getMarbleYield(), commaNotation)) {
                    return null;
                }
                if (this.data.index === 19 && !replaceValue("$", fountain.getWalletValueMultiplier(1), value =>
                    String(Math.round(100 * value) / 100))) {
                    return null;
                }
            } else if (this.data.waterIndex === 2) {
                if ([2, 3, 4].includes(this.data.index) && !replaceCurrencyBaseValue("$")) {
                    return null;
                }
                if ([2, 3, 4].includes(this.data.index) && !replaceValue("^", fountain.getAllCurrencyMultiplier(), value =>
                    `${notateNumber(Math.pow(value, 0.5), "Big")}x`)) {
                    return null;
                }
                if (this.data.index === 8) {
                    const luckyCoinCount = fountain.currencies[0].luckyCoins;
                    const luckyChance = fountain.getLuckyCoinChance(0);
                    if (!replaceValue("$", luckyChance, value =>
                        commaNotation(1 / (Math.max(0.001, value) / Math.pow(0.25, luckyCoinCount))))) {
                        return null;
                    }
                }
                if (this.data.index === 9 && !replaceValue("$", fountain.getLuckyCoinValuePer(), commaNotation)) {
                    return null;
                }
                if (this.data.index === 11 && !replaceValue("$", fountain.getDuckMultiplier(), value =>
                    value < 1_000 ? notateNumber(value, "MultiplierInfo").replace(/#/g, "") : commaNotation(value))) {
                    return null;
                }
                if (this.data.index === 12 && !replaceValue("$", fountain.getDuckChance(), value =>
                    commaNotation(1 / value))) {
                    return null;
                }
            }
        }
        return description
            .replace(/_/g, " ")
            .replace(/(?:\s*@\s*)+/g, "\n")
            .replace(/[ \t]+/g, " ")
            .replace(/ *\n */g, "\n")
            .replace(/\n{2,}/g, "\n")
            .trim();
    }

    getBonus(level = this.level): number {
        const marbleBonus = this.getMarbleBonus();
        return Math.round(marbleBonus * level * this.data.bonusPerLevel);
    }

    getCost(level = this.level): number {
        const levelCost = this.data.baseCost === 1 ? level + this.data.baseCost : this.data.baseCost;
        return levelCost * Math.pow(this.data.costMultiplier, level);
    }

    isUnlocked(upgrades: FountainUpgrade[]): boolean {
        const prerequisite = this.data.prerequisiteIndex;
        if (prerequisite < 0) {
            return true;
        }

        const prerequisiteUpgrade = upgrades.find(upgrade =>
            upgrade.data.waterIndex === this.data.waterIndex && upgrade.data.index === prerequisite)!;
        const minimumLevel = this.data.waterIndex === 0 && (this.data.index === 2 || this.data.index === 14) ? 1 : 10;
        return prerequisiteUpgrade.level >= minimumLevel;
    }

    getMarbleizeCost(): number {
        const marbleizationLevel = this.marbleizationLevel;
        if (this.data.waterIndex >= 2) {
            return 250_000 * Math.pow(2 * (5 + marbleizationLevel), marbleizationLevel);
        }
        if (this.data.index === 13) {
            return 1_500 * Math.pow(10 + 5 * marbleizationLevel, marbleizationLevel);
        }
        return 500 * Math.pow(5 + marbleizationLevel, marbleizationLevel);
    }
}

export class Fountain {
    currencies: FountainCurrency[] = [];
    upgradesInUnlockOrder: FountainUpgrade[] = [];
    upgrades: FountainUpgrade[] = [];
    wallets: number[] = Array(9).fill(0);

    stacks: FountainStack[] = [];
    valueWallets: number[] = [0, 0, 0];
    desireCurrencyId: number | null = null;
    excludedGenerationCurrencyIds: number[] | null = null;
    barProgress: number[] = [0, 0, 0];
    barTimerProgress: number = 0;
    opalProgress: number = 0;
    marbleCount: number = 0;
    duckCount: number = 0;
    currencyValueExponent: number = 0;
    modifiers!: FountainModifiers;
    constructor() {
        this.currencies = initFountainCurrencyRepo().map(currency =>
            new FountainCurrency(currency.index, currency.data));
        this.upgrades = FountainUpgrade.fromBase(initFountainUpgradeRepo());

        const upgradesByWater = [0, 1, 2].map(waterIndex =>
            this.upgrades.filter(upgrade => upgrade.data.waterIndex === waterIndex));
        const unlockDepths = new Map<FountainUpgrade, number>();
        const getUnlockDepth = (upgrade: FountainUpgrade): number => {
            const knownDepth = unlockDepths.get(upgrade);
            if (knownDepth !== undefined) {
                return knownDepth;
            }

            const prerequisiteIndex = upgrade.data.prerequisiteIndex;
            const depth = prerequisiteIndex < 0
                ? 0
                : getUnlockDepth(upgradesByWater[upgrade.data.waterIndex]!.find(
                    prerequisite => prerequisite.data.index === prerequisiteIndex,
                )!) + 1;
            unlockDepths.set(upgrade, depth);
            return depth;
        };

        this.upgradesInUnlockOrder = upgradesByWater.flatMap(waterUpgrades =>
            waterUpgrades
                .sort((left, right) =>
                    getUnlockDepth(left) - getUnlockDepth(right)
                    || left.data.index - right.data.index)
        );
    }

    parse(
        holeData: number[][],
        accountOptions: number[],
        upgradeLevels: number[][] | undefined,
        marbleizationLevels: number[][] | undefined,
        savedStacks: number[][] | undefined,
    ): void {
        const royalFlags = holeData[34] ?? [];

        this.wallets = Array.from({ length: 9 }, (_, index) =>
            Number(holeData[9]?.[30 + index] ?? 0));
        this.valueWallets = [3, 16, 20].map(index => Number(holeData[9]?.[index] ?? 0));
        this.currencies.forEach(currency => {
            currency.wallet = this.wallets[currency.index];
            currency.luckyCoins = Number(holeData[30]?.[currency.index] ?? 0);
        });
        this.stacks = (savedStacks ?? []).map((currencyIds, space) => ({
            space,
            items: (currencyIds ?? []).map(currencyId => ({ currencyId: Number(currencyId), value: null })),
            royal: Number(royalFlags[space] ?? 0) !== 0,
        }));
        const desireCurrencyId = holeData[11]?.[82];
        this.desireCurrencyId = desireCurrencyId == null ? null : Number(desireCurrencyId);
        const excludedCurrencyEncoding = holeData[11]?.[83];
        this.excludedGenerationCurrencyIds = excludedCurrencyEncoding == null
            ? null
            : this.currencies
                .filter(currency => String(excludedCurrencyEncoding).includes(number2letter(currency.index)))
                .map(currency => currency.index);
        this.barProgress = Array.from({ length: 3 }, (_, index) => Number(holeData[28]?.[index] ?? 0));
        this.barTimerProgress = Number(holeData[33]?.[0] ?? 0);
        this.opalProgress = Number(holeData[7]?.[15] ?? 0);
        this.marbleCount = Number(holeData[11]?.[81] ?? 0);
        this.duckCount = Number(accountOptions[601] ?? 0);
        this.currencyValueExponent = Number(holeData[11]?.[7] ?? 0);
        this.upgrades.forEach(upgrade => {
            const waterIndex = upgrade.data.waterIndex;
            const upgradeIndex = upgrade.data.index;
            upgrade.level = Number(upgradeLevels?.[waterIndex]?.[upgradeIndex] ?? 0);
            upgrade.marbleizationLevel = Number(marbleizationLevels?.[waterIndex]?.[upgradeIndex] ?? 0);
        });
    }

    prepare(modifiers: FountainModifiers): void {
        this.modifiers = modifiers;
        this.duckCount = modifiers.duckCount;
        this.stacks.forEach(stack => {
            stack.items.forEach(item => {
                item.value = this.getStackItemValue(item.currencyId, stack.royal, stack.items.length);
            });
        });
    }

    getBonus(waterIndex: number, upgradeIndex: number): number {
        return this.getUpgrade(waterIndex, upgradeIndex).getBonus();
    }

    getUpgrade(waterIndex: number, upgradeIndex: number): FountainUpgrade {
        return this.upgrades.find(upgrade =>
            upgrade.data.waterIndex === waterIndex && upgrade.data.index === upgradeIndex)!;
    }

    findCurrency(currencyId: number): FountainCurrency | undefined {
        return this.currencies.find(currency => currency.index === currencyId);
    }

    getUpgradeCost(waterIndex: number, upgradeIndex: number, level?: number): number {
        return this.getUpgrade(waterIndex, upgradeIndex).getCost(level);
    }

    canAffordUpgrade(waterIndex: number, upgradeIndex: number): boolean {
        const upgrade = this.getUpgrade(waterIndex, upgradeIndex);
        return this.wallets[upgrade.data.costCurrencyIndex] >= upgrade.getCost();
    }

    getMarbleizeCost(waterIndex: number, upgradeIndex: number): number {
        return this.getUpgrade(waterIndex, upgradeIndex).getMarbleizeCost();
    }

    canMarbleize(waterIndex: number, upgradeIndex: number): boolean {
        return this.getUpgrade(waterIndex, upgradeIndex).data.marbleizeEligible;
    }

    canAffordMarbleize(waterIndex: number, upgradeIndex: number): boolean {
        return !this.canMarbleize(waterIndex, upgradeIndex)
            ? false
            : this.marbleCount >= this.getMarbleizeCost(waterIndex, upgradeIndex);
    }

    getMarbleYield(): number {
        const modifiers = this.modifiers;
        const bonus = this.getBonus(1, 10);
        return 100 * (1 + bonus / 100) *
            (1 + modifiers.studyBonus15 / 100) *
            (1 + 10 * modifiers.cosmoBonusQuantity4 / 100);
    }



    getBarRequirement(barIndex: FountainBarIndex): number {
        return [7_200, 36_000, 90_000][barIndex];
    }

    getBarUnlocked(barIndex: FountainBarIndex): boolean {
        if (barIndex === 0) {
            return this.modifiers.ownedCaverns >= 15;
        }
        const bonus = barIndex === 1 ? this.getBonus(1, 10) : this.getBonus(2, 12);
        return bonus >= 1;
    }

    getBarSpeed(barIndex: FountainBarIndex): number {
        const modifiers = this.modifiers;
        if (barIndex !== 0) {
            return 1;
        }
        const bonus = this.getBonus(0, 9);
        return (1 + bonus / 100) * (1 + modifiers.arcadeBonus68 / 100);
    }

    getEffectiveBarSpeed(barIndex: FountainBarIndex): number {
        return this.getBarSpeed(barIndex) * this.getActiveBarSpeedMultiplier();
    }

    getActiveBarSpeedMultiplier(): number {
        const speedBonus = this.getBonus(0, 12);
        return 1 + Math.min(4, 4 * speedBonus) + speedBonus / 100;
    }

    getCapacity(): number {
        const bonus = this.getBonus(0, 10);
        return Math.min(16, 1 + bonus);
    }

    getMaximumStackSize(): number {
        const modifiers = this.modifiers;
        const bonus = this.getBonus(0, 11);
        return Math.min(50, 3 + modifiers.bUpgrade97Level3 + bonus + modifiers.cosmoBonusQuantity4);
    }

    getMaximumCoins(): number {
        return Math.round(this.getCapacity() * this.getMaximumStackSize());
    }

    getWalletValueMultiplier(waterIndex: number): number {
        const wallet = this.valueWallets[waterIndex];
        const bonus = this.getBonus(waterIndex, 19);
        return 1 + lavaLog(wallet) * bonus / 100;
    }

    getRoyalMultiplier(): number {
        const bonus = this.getBonus(1, 9);
        return 5 + bonus / 100;
    }

    getLuckyCoinValuePer(): number {
        const bonus = this.getBonus(2, 9);
        return 25 + bonus;
    }

    getDuckMultiplier(): number {
        const bonus = this.getBonus(2, 11);
        return Math.pow(1 + bonus / 100, this.duckCount);
    }


    getCurrencyBaseValue(currencyId: number): number {
        const currencyPage = currencyPages[currencyId];
        const baseBonuses = currencyBonusIndexes[currencyId];
        const wallet = this.valueWallets[currencyPage];
        const valueBonus = this.getBonus(baseBonuses[0][0], baseBonuses[0][1]);
        const modifierBonus = this.getBonus(baseBonuses[1][0], baseBonuses[1][1]);
        const walletBonus = this.getBonus(currencyPage, 19);
        return 1 + valueBonus * (1 + modifierBonus / 100) *
            (1 + lavaLog(wallet) * walletBonus / 100);
    }

    getCurrencyValue(currencyId: number): number | null {
        const currencyPage = currencyPages[currencyId];
        const luckyCoins = this.currencies[currencyId].luckyCoins;
        if (this.desireCurrencyId === null) {
            return null;
        }

        const allMultiplier = this.getAllCurrencyMultiplier();
        const desireBonus = this.getBonus(1, 11);
        const luckyBonus = this.getBonus(2, 9);
        const duckBonus = this.getBonus(2, 11);
        const baseValue = this.getCurrencyBaseValue(currencyId);
        const desireMultiplier = currencyId >= 6 || currencyId === this.desireCurrencyId
            ? 1 + desireBonus / 100 : 1;
        const luckyMultiplier = 1 + luckyCoins * (25 + luckyBonus) / 100;
        const duckMultiplier = Math.pow(1 + duckBonus / 100, this.duckCount);
        const baseAndAll = currencyId >= 6
            ? Math.sqrt(desireMultiplier * baseValue * allMultiplier)
            : desireMultiplier * baseValue * allMultiplier;
        return baseAndAll * luckyMultiplier * duckMultiplier;
    }

    getStackItemCount(): number {
        return this.stacks.reduce((count, stack) => count + stack.items.length, 0);
    }

    getOccupiedSpaceCount(): number {
        return this.stacks.filter(stack => stack.items.length > 0).length;
    }

    getAvailableSpaceCount(): number {
        return Math.max(0, this.getCapacity() - this.getOccupiedSpaceCount());
    }

    getOverflowValue(currencyId: number): number | null {
        const currencyValue = this.getCurrencyValue(currencyId);
        return currencyValue === null ? null : currencyValue * this.getKeepMultiplier();
    }

    getStackItemValue(currencyId: number, royal: boolean, stackLength: number): number | null {
        const coinValue = this.getCurrencyValue(currencyId);
        if (coinValue === null) {
            return null;
        }
        const bUpgrade95Level10 = this.modifiers.bUpgrade95Level10;
        const royalBonus = this.getBonus(1, 9);
        const stackFactor = 1 + stackLength * bUpgrade95Level10 / 100;
        const standardValue = coinValue * stackFactor;
        const royalValue = royal
            ? Math.max(1, 5 + royalBonus / 100 - 1) * coinValue * stackFactor
            : 0;
        return standardValue + royalValue;
    }

    getCollectionValue(currencyId: number): number | null {
        let total = 0;
        for (const stack of this.stacks) {
            for (const item of stack.items) {
                if (item.currencyId !== currencyId) {
                    continue;
                }
                if (item.value === null) {
                    return null;
                }
                total += item.value;
            }
        }
        return total;
    }


    getRoyalChance(): number {
        return 0.0033333333333333335 * (1 + this.getBonus(1, 8) / 100);
    }

    getLuckyCoinChance(currencyId: number): number {
        const luckyCoins = this.currencies[currencyId].luckyCoins;
        const bonus = this.getBonus(2, 8);
        const additionalBonus = this.getBonus(2, 10);
        if (bonus === 0) {
            return 0;
        }
        return 0.001 * (1 + (bonus + additionalBonus) / 100) * Math.pow(0.25, luckyCoins);
    }

    getDuckChance(): number {
        const modifiers = this.modifiers;
        const bonus = this.getBonus(2, 12);
        const additionalBonus = this.getBonus(2, 10);
        return (1 / 3) * (1 + (bonus + additionalBonus) / 100) * Math.pow(0.2, modifiers.duckCount);
    }

    getKeepMultiplier(): number {
        const fountainBonus = this.getBonus(0, 8);
        return 0.1 + fountainBonus / (100 + fountainBonus) * 0.5;
    }

    getOpalCost(): FountainOpalCost {
        const currencyId = Math.min(9, Math.floor(this.opalProgress / 5));
        return {
            amount: 100 * Math.pow(1 + this.opalProgress, 1.5) * Math.pow(4.8, this.opalProgress),
            currencyId,
        };
    }

    canAffordOpal(): boolean {
        const cost = this.getOpalCost();
        const currency = this.findCurrency(cost.currencyId);
        return currency !== undefined && this.wallets[currency.index] >= cost.amount;
    }

    getAllCurrencyMultiplier(): number {
        const modifiers = this.modifiers;
        const bonus00 = this.getBonus(0, 0);
        const bonus01 = this.getBonus(0, 1);
        const bonus11 = this.getBonus(1, 1);
        const bonus21 = this.getBonus(2, 1);
        const bonus112 = this.getBonus(1, 12);
        const bonus10 = this.getBonus(1, 0);
        const bonus20 = this.getBonus(2, 0);
        return (1 + bonus00 / 100) *
            (1 + modifiers.coveUpgrade14 / 100) *
            (1 + (bonus01 + bonus11 + bonus21 + bonus112) / 100) *
            Math.max(1, modifiers.bUpgrade94Level1 * Math.pow(1.1, modifiers.currencyValueExponent)) *
            (1 + bonus10 / 100) *
            (1 + bonus20 / 100) *
            (1 + 25 * modifiers.cosmoBonusQuantity4 / 100) *
            (1 + modifiers.lampBonus99 / 400) *
            (1 + modifiers.measurementBonus16 / 100) *
            (1 + modifiers.bellBonus6 / 100);
    }



}
