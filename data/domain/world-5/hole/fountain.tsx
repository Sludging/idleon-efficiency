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
    royal: boolean | null;
    value: number | null;
}

export interface FountainModifiers {
    arcadeBonus68: number;
    bUpgrade94Level1: number | null;
    bUpgrade95Level10: number | null;
    bUpgrade97Level3: number | null;
    coveUpgrade14: number | null;
    cosmoBonusQuantity4: number;
    lampBonus99: number | null;
    measurementBonus16: number | null;
    bellBonus6: number | null;
    studyBonus15: number;
    ownedCaverns: number | null;
    currencyValueExponent: number | null;
    duckCount: number | null;
}

export interface FountainOpalCost {
    amount: number;
    currencyId: number;
    available: boolean;
}

export class FountainCurrency {
    wallet: number | null = null;
    luckyCoins: number | null = null;

    constructor(public index: number, public data: FountainCurrencyModel) { }
}

export class FountainUpgrade {
    level: number | null = null;
    marbleizationLevel: number | null = null;

    constructor(public index: number, public data: FountainUpgradeModel) { }

    static fromBase(data: FountainUpgradeBase[]) {
        return data.map(d => new FountainUpgrade(d.index, d.data));
    }

    getMarbleBonus(): number | null {
        if (this.marbleizationLevel === null) {
            return null;
        }
        return this.marbleizationLevel === 0 ? 1 : 1.5 + 0.5 * this.marbleizationLevel;
    }

    getDescription(fountain: Fountain): string | null {
        let description = this.data.description;
        const bonus = this.getBonus();
        if (/[{}]/.test(description) && bonus === null) {
            return null;
        }
        if (bonus !== null) {
            description = description
                .replace(/\{/g, commaNotation(bonus))
                .replace(/\}/g, notateNumber(1 + bonus / 100, "MultiplierInfo").replace(/#/g, ""));
        }

        const currencyId = this.data.index - 2 + this.data.waterIndex * 3;
        const replaceValue = (token: "$" | "^" | "#", value: number | null, format: (value: number) => string): boolean => {
            if (value === null || !description.includes(token)) {
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
        const replaceBarTimer = (token: "$" | "^" | "#", seconds: number | null): boolean => replaceValue(
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
                    if (speed === null || activeSpeed === null ||
                        !replaceBarTimer("#", Math.max(0, fountain.getBarRequirement(0)) / speed)) {
                        return null;
                    }
                    const remaining = fountain.barTimerProgress;
                    if (remaining === null ||
                        !replaceBarTimer("$", Math.max(0, fountain.getBarRequirement(0) - remaining) /
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
                    if (activeSpeed === null || !replaceValue("$", activeSpeed, value => String(Math.round(100 * value) / 100))) {
                        return null;
                    }
                    if (activeSpeed > 1) {
                        const speed = fountain.getBarSpeed(0);
                        if (speed === null) {
                            return null;
                        }
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
                    if (luckyCoinCount === null || luckyChance === null ||
                        !replaceValue("$", luckyChance, value =>
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

    getBonus(level = this.level): number | null {
        const marbleBonus = this.getMarbleBonus();
        return level === null || marbleBonus === null
            ? null : Math.round(marbleBonus * level * this.data.bonusPerLevel);
    }

    getCost(level = this.level): number | null {
        if (level === null) {
            return null;
        }
        const levelCost = this.data.baseCost === 1 ? level + this.data.baseCost : this.data.baseCost;
        return levelCost * Math.pow(this.data.costMultiplier, level);
    }

    isUnlocked(upgrades: FountainUpgrade[]): boolean | null {
        const prerequisite = this.data.prerequisiteIndex;
        if (prerequisite < 0) {
            return true;
        }

        const prerequisiteUpgrade = upgrades.find(upgrade =>
            upgrade.data.waterIndex === this.data.waterIndex && upgrade.data.index === prerequisite)!;
        if (prerequisiteUpgrade.level === null) {
            return null;
        }
        const minimumLevel = this.data.waterIndex === 0 && (this.data.index === 2 || this.data.index === 14) ? 1 : 10;
        return prerequisiteUpgrade.level >= minimumLevel;
    }

    getMarbleizeCost(): number | null {
        const marbleizationLevel = this.marbleizationLevel;
        if (marbleizationLevel === null) {
            return null;
        }
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
    upgrades: FountainUpgrade[] = [];
    wallets: (number | null)[] = Array(9).fill(null);
    stacks: FountainStack[] = [];
    stacksAvailable: boolean = false;
    upgradeLevelsAvailable: boolean = false;
    marbleizationLevelsAvailable: boolean = false;
    valueWallets: (number | null)[] = [null, null, null];
    desireCurrencyId: number | null = null;
    excludedGenerationCurrencyIds: number[] | null = null;
    barProgress: (number | null)[] = [null, null, null];
    barTimerProgress: number | null = null;
    opalProgress: number | null = null;
    marbleCount: number | null = null;
    duckCount: number | null = null;
    currencyValueExponent: number | null = null;
    modifiers: FountainModifiers | null = null;
    constructor() {
        this.currencies = initFountainCurrencyRepo().map(currency =>
            new FountainCurrency(currency.index, currency.data));
        this.upgrades = FountainUpgrade.fromBase(initFountainUpgradeRepo());
    }

    parse(holeData: (number[] | undefined)[], accountOptions: number[]): void {
        const upgradeLevels = holeData[31] as number[][] | undefined;
        const marbleizationLevels = holeData[32] as number[][] | undefined;
        const royalFlags = holeData[34];
        const savedStacks = holeData[29] as number[][] | undefined;
        this.upgradeLevelsAvailable = upgradeLevels !== undefined;
        this.marbleizationLevelsAvailable = marbleizationLevels !== undefined;

        this.wallets = Array.from({ length: 9 }, (_, index) => {
            const wallet = holeData[9]?.[30 + index];
            return wallet == null ? null : Number(wallet);
        });
        this.valueWallets = [3, 16, 20].map(index => {
            const wallet = holeData[9]?.[index];
            return wallet == null ? null : Number(wallet);
        });
        this.currencies.forEach(currency => {
            currency.wallet = this.wallets[currency.index];
            const luckyCoins = holeData[30]?.[currency.index];
            currency.luckyCoins = luckyCoins == null ? null : Number(luckyCoins);
        });
        this.stacksAvailable = savedStacks !== undefined && royalFlags !== undefined;
        this.stacks = (savedStacks ?? []).map((currencyIds, space) => ({
            space,
            items: (currencyIds ?? []).map(currencyId => ({ currencyId: Number(currencyId), value: null })),
            royal: royalFlags?.[space] == null ? null : Number(royalFlags[space]) !== 0,
            value: null,
        }));
        const desireCurrencyId = holeData[11]?.[82];
        this.desireCurrencyId = desireCurrencyId == null ? null : Number(desireCurrencyId);
        const excludedCurrencyEncoding = holeData[11]?.[83];
        this.excludedGenerationCurrencyIds = excludedCurrencyEncoding == null
            ? null
            : this.currencies
                .filter(currency => String(excludedCurrencyEncoding).includes(number2letter(currency.index)))
                .map(currency => currency.index);
        this.barProgress = Array.from({ length: 3 }, (_, index) => {
            const progress = holeData[28]?.[index];
            return progress == null ? null : Number(progress);
        });
        const barTimerProgress = holeData[33]?.[0];
        this.barTimerProgress = barTimerProgress == null ? null : Number(barTimerProgress);
        const opalProgress = holeData[7]?.[15];
        this.opalProgress = opalProgress == null ? null : Number(opalProgress);
        const marbleCount = holeData[11]?.[81];
        this.marbleCount = marbleCount == null ? null : Number(marbleCount);
        const duckCount = accountOptions[601];
        this.duckCount = duckCount == null ? null : Number(duckCount);

        this.currencyValueExponent = holeData[11]?.[7] == null ? null : Number(holeData[11][7]);
        this.upgrades.forEach(upgrade => {
            const waterIndex = upgrade.data.waterIndex;
            const upgradeIndex = upgrade.data.index;
            upgrade.level = upgradeLevels?.[waterIndex]?.[upgradeIndex] ?? null;
            upgrade.marbleizationLevel = marbleizationLevels?.[waterIndex]?.[upgradeIndex] ?? null;
        });
    }

    prepare(modifiers: FountainModifiers): void {
        this.modifiers = modifiers;
        this.duckCount = modifiers.duckCount;
        this.stacks.forEach(stack => {
            let stackValue: number | null = 0;
            stack.items.forEach(item => {
                item.value = this.getStackItemValue(item.currencyId, stack.royal, stack.items.length);
                if (item.value === null) {
                    stackValue = null;
                } else if (stackValue !== null) {
                    stackValue += item.value;
                }
            });
            stack.value = stackValue;
        });
    }

    getBonus(waterIndex: number, upgradeIndex: number): number | null {
        return this.getUpgrade(waterIndex, upgradeIndex).getBonus();
    }

    getUpgrade(waterIndex: number, upgradeIndex: number): FountainUpgrade {
        return this.upgrades.find(upgrade =>
            upgrade.data.waterIndex === waterIndex && upgrade.data.index === upgradeIndex)!;
    }

    getUpgradeCost(waterIndex: number, upgradeIndex: number, level?: number): number | null {
        return this.getUpgrade(waterIndex, upgradeIndex).getCost(level);
    }

    canAffordUpgrade(waterIndex: number, upgradeIndex: number): boolean | null {
        const upgrade = this.getUpgrade(waterIndex, upgradeIndex);
        const wallet = this.wallets[upgrade.data.costCurrencyIndex];
        const cost = upgrade.getCost();
        return wallet === null || cost === null ? null : wallet >= cost;
    }

    getMarbleizeCost(waterIndex: number, upgradeIndex: number): number | null {
        return this.getUpgrade(waterIndex, upgradeIndex).getMarbleizeCost();
    }

    canMarbleize(waterIndex: number, upgradeIndex: number): boolean {
        return this.getUpgrade(waterIndex, upgradeIndex).data.marbleizeEligible;
    }

    canAffordMarbleize(waterIndex: number, upgradeIndex: number): boolean | null {
        if (!this.canMarbleize(waterIndex, upgradeIndex)) {
            return false;
        }
        const cost = this.getMarbleizeCost(waterIndex, upgradeIndex);
        if (cost === null) {
            return null;
        }
        return this.marbleCount === null ? null : this.marbleCount >= cost;
    }

    getMarbleYield(): number | null {
        const modifiers = this.requireModifiers();
        const bonus = this.getBonus(1, 10);
        if (bonus === null) {
            return null;
        }
        return 100 * (1 + bonus / 100) *
            (1 + modifiers.studyBonus15 / 100) *
            (1 + 10 * modifiers.cosmoBonusQuantity4 / 100);
    }


    getBarRequirement(barIndex: number): number {
        return [7_200, 36_000, 90_000][barIndex] ?? 0;
    }

    getBarUnlocked(barIndex: number): boolean | null {
        if (barIndex === 0) {
            const ownedCaverns = this.requireModifiers().ownedCaverns;
            return ownedCaverns === null ? null : ownedCaverns >= 15;
        }
        const bonus = barIndex === 1 ? this.getBonus(1, 10)
            : barIndex === 2 ? this.getBonus(2, 12) : null;
        return bonus === null ? null : bonus >= 1;
    }

    getBarSpeed(barIndex: number): number | null {
        const modifiers = this.requireModifiers();
        if (barIndex !== 0) {
            return 1;
        }
        const bonus = this.getBonus(0, 9);
        return bonus === null ? null : (1 + bonus / 100) * (1 + modifiers.arcadeBonus68 / 100);
    }

    getEffectiveBarSpeed(barIndex: number): number | null {
        const barSpeed = this.getBarSpeed(barIndex);
        const activeMultiplier = this.getActiveBarSpeedMultiplier();
        return barSpeed === null || activeMultiplier === null ? null : barSpeed * activeMultiplier;
    }

    getActiveBarSpeedMultiplier(): number | null {
        const speedBonus = this.getBonus(0, 12);
        return speedBonus === null ? null : 1 + Math.min(4, 4 * speedBonus) + speedBonus / 100;
    }

    getCapacity(): number | null {
        const bonus = this.getBonus(0, 10);
        return bonus === null ? null : Math.min(16, 1 + bonus);
    }

    getMaximumStackSize(): number | null {
        const modifiers = this.requireModifiers();
        const bonus = this.getBonus(0, 11);
        return bonus === null || modifiers.bUpgrade97Level3 === null
            ? null : Math.min(50, 3 + modifiers.bUpgrade97Level3 + bonus + modifiers.cosmoBonusQuantity4);
    }

    getMaximumCoins(): number | null {
        const capacity = this.getCapacity();
        const maximumStackSize = this.getMaximumStackSize();
        return capacity === null || maximumStackSize === null ? null : Math.round(capacity * maximumStackSize);
    }

    getWalletValueMultiplier(waterIndex: number): number | null {
        const wallet = this.valueWallets[waterIndex];
        const bonus = this.getBonus(waterIndex, 19);
        return wallet === null || bonus === null
            ? null : 1 + lavaLog(wallet) * bonus / 100;
    }

    getRoyalMultiplier(): number | null {
        const bonus = this.getBonus(1, 9);
        return bonus === null ? null : 5 + bonus / 100;
    }

    getLuckyCoinValuePer(): number | null {
        const bonus = this.getBonus(2, 9);
        return bonus === null ? null : 25 + bonus;
    }

    getDuckMultiplier(): number | null {
        const duckCount = this.duckCount;
        const bonus = this.getBonus(2, 11);
        return duckCount === null || bonus === null
            ? null : Math.pow(1 + bonus / 100, duckCount);
    }

    getCurrencyBaseValue(currencyId: number): number | null {
        const currencyPage = currencyPages[currencyId];
        const baseBonuses = currencyBonusIndexes[currencyId];
        const wallet = this.valueWallets[currencyPage];
        const valueBonus = this.getBonus(baseBonuses[0][0], baseBonuses[0][1]);
        const modifierBonus = this.getBonus(baseBonuses[1][0], baseBonuses[1][1]);
        const walletBonus = this.getBonus(currencyPage, 19);
        if (wallet === null || valueBonus === null || modifierBonus === null || walletBonus === null) {
            return null;
        }
        return 1 + valueBonus * (1 + modifierBonus / 100) *
            (1 + lavaLog(wallet) * walletBonus / 100);
    }

    getCurrencyValue(currencyId: number): number | null {
        const currencyPage = currencyPages[currencyId];
        const luckyCoins = this.currencies[currencyId].luckyCoins;
        if (this.desireCurrencyId === null || this.duckCount === null || luckyCoins === null ||
            this.valueWallets[currencyPage] === null) {
            return null;
        }

        const allMultiplier = this.getAllCurrencyMultiplier();
        const desireBonus = this.getBonus(1, 11);
        const luckyBonus = this.getBonus(2, 9);
        const duckBonus = this.getBonus(2, 11);
        const baseValue = this.getCurrencyBaseValue(currencyId);
        if (allMultiplier === null || desireBonus === null || luckyBonus === null ||
            duckBonus === null || baseValue === null) {
            return null;
        }

        const desireMultiplier = currencyId >= 6 || currencyId === this.desireCurrencyId
            ? 1 + desireBonus / 100 : 1;
        const luckyMultiplier = 1 + luckyCoins * (25 + luckyBonus) / 100;
        const duckMultiplier = Math.pow(1 + duckBonus / 100, this.duckCount);
        const baseAndAll = currencyId >= 6
            ? Math.sqrt(desireMultiplier * baseValue * allMultiplier)
            : desireMultiplier * baseValue * allMultiplier;
        return baseAndAll * luckyMultiplier * duckMultiplier;
    }

    getStackItemCount(): number | null {
        return this.stacksAvailable
            ? this.stacks.reduce((count, stack) => count + stack.items.length, 0)
            : null;
    }

    getOccupiedSpaceCount(): number | null {
        return this.stacksAvailable
            ? this.stacks.filter(stack => stack.items.length > 0).length
            : null;
    }

    getAvailableSpaceCount(): number | null {
        const capacity = this.getCapacity();
        const occupiedSpaceCount = this.getOccupiedSpaceCount();
        return capacity === null || occupiedSpaceCount === null
            ? null
            : Math.max(0, capacity - occupiedSpaceCount);
    }

    getOverflowValue(currencyId: number): number | null {
        const currencyValue = this.getCurrencyValue(currencyId);
        const keepMultiplier = this.getKeepMultiplier();
        return currencyValue === null || keepMultiplier === null ? null : currencyValue * keepMultiplier;
    }

    getStackItemValue(currencyId: number, royal: boolean | null, stackLength: number): number | null {
        if (royal === null) {
            return null;
        }
        const coinValue = this.getCurrencyValue(currencyId);
        const bUpgrade95Level10 = this.requireModifiers().bUpgrade95Level10;
        if (coinValue === null || bUpgrade95Level10 === null) {
            return null;
        }
        const royalBonus = this.getBonus(1, 9);
        if (royal && royalBonus === null) {
            return null;
        }
        const stackFactor = 1 + stackLength * bUpgrade95Level10 / 100;
        const standardValue = coinValue * stackFactor;
        const royalValue = royal
            ? Math.max(1, 5 + royalBonus! / 100 - 1) * coinValue * stackFactor
            : 0;
        return standardValue + royalValue;
    }


    getPendingStackValue(): number | null {
        if (!this.stacksAvailable) {
            return null;
        }
        let total = 0;
        for (const stack of this.stacks) {
            if (stack.value === null) {
                return null;
            }
            total += stack.value;
        }
        return total;
    }

    getRoyalChance(): number | null {
        const bonus = this.getBonus(1, 8);
        return bonus === null ? null : 0.0033333333333333335 * (1 + bonus / 100);
    }

    getLuckyCoinChance(currencyId: number): number | null {
        const luckyCoins = this.currencies[currencyId].luckyCoins;
        if (luckyCoins === null) {
            return null;
        }
        const bonus = this.getBonus(2, 8);
        const additionalBonus = this.getBonus(2, 10);
        if (bonus === null || additionalBonus === null) {
            return null;
        }
        if (bonus === 0) {
            return 0;
        }
        return 0.001 * (1 + (bonus + additionalBonus) / 100) * Math.pow(0.25, luckyCoins);
    }

    getDuckChance(): number | null {
        const modifiers = this.requireModifiers();
        if (modifiers.duckCount === null) {
            return null;
        }
        const bonus = this.getBonus(2, 12);
        const additionalBonus = this.getBonus(2, 10);
        if (bonus === null || additionalBonus === null) {
            return null;
        }
        return (1 / 3) * (1 + (bonus + additionalBonus) / 100) * Math.pow(0.2, modifiers.duckCount);
    }

    getKeepMultiplier(): number | null {
        const fountainBonus = this.getBonus(0, 8);
        return fountainBonus === null ? null : 0.1 + fountainBonus / (100 + fountainBonus) * 0.5;
    }

    getOpalCost(): FountainOpalCost | null {
        if (this.opalProgress === null) {
            return null;
        }
        const currencyId = Math.min(9, Math.floor(this.opalProgress / 5));
        return {
            amount: 100 * Math.pow(1 + this.opalProgress, 1.5) * Math.pow(4.8, this.opalProgress),
            currencyId,
            available: currencyId < this.wallets.length,
        };
    }

    canAffordOpal(): boolean | null {
        const cost = this.getOpalCost();
        if (cost === null) {
            return null;
        }
        if (!cost.available) {
            return false;
        }
        const wallet = this.wallets[cost.currencyId];
        return wallet === null ? null : wallet >= cost.amount;

    }

    getAllCurrencyMultiplier(): number | null {
        const modifiers = this.requireModifiers();
        if (modifiers.currencyValueExponent === null || modifiers.bUpgrade94Level1 === null ||
            modifiers.lampBonus99 === null || modifiers.measurementBonus16 === null ||
            modifiers.bellBonus6 === null || modifiers.coveUpgrade14 === null) {
            return null;
        }
        const bonus00 = this.getBonus(0, 0);
        const bonus01 = this.getBonus(0, 1);
        const bonus11 = this.getBonus(1, 1);
        const bonus21 = this.getBonus(2, 1);
        const bonus112 = this.getBonus(1, 12);
        const bonus10 = this.getBonus(1, 0);
        const bonus20 = this.getBonus(2, 0);
        if (bonus00 === null || bonus01 === null || bonus11 === null || bonus21 === null ||
            bonus112 === null || bonus10 === null || bonus20 === null) {
            return null;
        }
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


    private requireModifiers(): FountainModifiers {
        if (this.modifiers === null) {
            throw new Error("Fountain modifiers are not prepared.");
        }
        return this.modifiers;
    }
}
