import { Domain, RawData } from "../base/domain";
import { EmperorBonusBase, initEmperorBonusRepo } from "../data/EmperorBonusRepo";
import { Item } from "../items";
import { EmperorBonusModel } from "../model/emperorBonusModel";
import { Sneaking } from "./sneaking";
import { Tesseract } from "../tesseract";
import { Arcade } from "../world-2/arcade";
import { JellyOperator } from "../world-7/jellyOperator";
import { commaNotation } from "../../utility";

export class EmperorBonus {
    level: number = 0;

    constructor(public index: number, public data: EmperorBonusModel) { }

    getBonus(totalBonusPercent: number): number {
        const baseBonus = this.data.bonusValue * this.level;
        return Math.floor(baseBonus * (1 + totalBonusPercent / 100));
    }

    getNextAwardValue(totalBonusPercent: number): number {
        return Math.floor(this.data.bonusValue * (1 + totalBonusPercent / 100));
    }

    getDisplayName(): string {
        return this.data.bonusName.replace(/^(?:\}x|\$%|\+\{%|\+\{)\s*/, '');
    }

    getFormattedValue(effectiveAmount: number): string {
        const bonusName = this.data.bonusName;
        const formattedAmount = commaNotation(effectiveAmount);
        const percentReduction = Math.floor(100 * effectiveAmount / (100 + effectiveAmount));

        if (bonusName.startsWith('}x')) {
            return `${(1 + effectiveAmount / 100).toFixed(2)}x`;
        }
        if (bonusName.startsWith('$%')) {
            return `${percentReduction}%`;
        }
        if (bonusName.startsWith('+{%')) {
            return `+${formattedAmount}%`;
        }
        if (bonusName.startsWith('+{')) {
            return `+${formattedAmount}`;
        }

        return formattedAmount;
    }

    getDescription(effectiveBonus: number): string {
        return `${this.getFormattedValue(effectiveBonus)} ${this.getDisplayName()}`;
    }


    static fromBase(data: EmperorBonusBase[]): EmperorBonus[] {
        return data.map((base, index) => new EmperorBonus(index, base.data));
    }
}

export class Emperor extends Domain {
    public emperorKills: number = 0;
    public attemptsOffset: number = 0;
    public attemptsContribution: number = 0;
    public maxEmperorAttempts: number = 0;
    public dailyEmperorTries: number = 0;
    public bossHP: number = 0;
    public arcaneBonus48: number = 0;
    public arcadeBonus51: number = 0;
    public jellyBonus28: number = 0;
    public emperorBonuses: EmperorBonus[] = [];

    constructor(name: string) {
        super(name);
    }

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number) {
        this.emperorBonuses = EmperorBonus.fromBase(initEmperorBonusRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const optionList = (data.get("OptLacc") as number[] | undefined) ?? [];
        const emperor = data.get("emperor") as Emperor;

        emperor.emperorKills = optionList[369] ?? 0;
        emperor.attemptsOffset = optionList[370] ?? 0;
        emperor.attemptsContribution = optionList[382] ?? 0;
        emperor.maxEmperorAttempts = emperor.attemptsContribution;
        emperor.bossHP = emperor.calculateBossHP();
        emperor.dailyEmperorTries = emperor.calculateDailyTries();
        emperor.calculateEmperorBonuses();
    }

    getCurrentShowdown(): number {
        return this.emperorKills + 1;
    }

    getAttemptsLeft(): number {
        return Math.round(1 - this.attemptsOffset);
    }

    getDisplayedMaxAttempts(): number {
        return this.maxEmperorAttempts + 1;
    }

    getScheduledAward(showdown: number): EmperorBonus {
        const scheduleIndex = showdown % 48;
        return this.emperorBonuses.find(bonus => bonus.data.levelMappings.includes(scheduleIndex)) as EmperorBonus;
    }

    getCombinedBonusPercent(): number {
        return this.arcaneBonus48 + this.arcadeBonus51 + this.jellyBonus28;
    }

    getEffectiveBonus(index: number): number {
        return this.emperorBonuses[index].getBonus(this.getCombinedBonusPercent());
    }
    getNextAwardShowdown(index: number): number {
        const bonus = this.emperorBonuses[index];
        for (let offset = 0; offset < 48; offset++) {
            const showdown = this.emperorKills + offset;
            if (bonus.data.levelMappings.includes(showdown % 48)) {
                return showdown + 1;
            }
        }

        throw new Error(`Emperor bonus ${index} has no scheduled award in the 48-showdown cycle.`);
    }

    getNextEffectiveBonus(index: number): number {
        const bonus = this.emperorBonuses[index];
        const cumulativeBase = bonus.data.bonusValue * (bonus.level + 1);
        return Math.floor(cumulativeBase * this.getCombinedBonusMultiplier());
    }


    getCombinedBonusMultiplier(): number {
        return 1 + this.getCombinedBonusPercent() / 100;
    }

    getNextAwardBonus(): EmperorBonus {
        return this.getScheduledAward(this.emperorKills);
    }

    /**
     * Calculate boss HP using the account's Emperor progress.
     */
    public calculateBossHP(): number {
        return 135e12 * Math.pow(1.52, this.emperorKills);
    }

    /**
     * Calculate daily Emperor attempts from the saved contribution.
     */
    public calculateDailyTries(): number {
        return Math.round(1 + this.attemptsContribution);
    }

    /**
     * Update the stored attempt stack from Ninja Emporium and the saved contribution.
     */
    public updateMaxAttempts(ninjaBonus: number, savedContribution: number): void {
        this.maxEmperorAttempts = Math.round(5 * ninjaBonus + 6 * savedContribution + 5);
    }

    public calculateEmperorBonuses(): void {
        const emperorBonusRepo = initEmperorBonusRepo();
        this.emperorBonuses = EmperorBonus.fromBase(emperorBonusRepo);

        for (let showdown = 0; showdown < this.emperorKills; showdown++) {
            const scheduleIndex = showdown % 48;
            for (const bonus of this.emperorBonuses) {
                if (bonus.data.levelMappings.includes(scheduleIndex)) {
                    bonus.level += 1;
                    break;
                }
            }
        }
    }
}

/**
 * Update Emperor max attempts with the Ninja Emporium bonus.
 */
export const updateEmperorMaxAttempts = (accountData: Map<string, any>) => {
    const emperor = accountData.get("emperor") as Emperor;
    const sneaking = accountData.get("sneaking") as Sneaking;
    const ninjaBonus = Number(sneaking.jadeUpgrades.some(upgrade => upgrade.index === 39 && upgrade.purchased));

    emperor.updateMaxAttempts(ninjaBonus, emperor.attemptsContribution);
    emperor.dailyEmperorTries = emperor.calculateDailyTries();
};

/**
 * Update Emperor bonuses with Arcane, Arcade, and Jelly multipliers.
 */
export const updateEmperorBonuses = (accountData: Map<string, any>) => {
    const emperor = accountData.get("emperor") as Emperor;
    const tesseract = accountData.get("tesseract") as Tesseract;
    const arcade = accountData.get("arcade") as Arcade;
    const jellyOperator = accountData.get("jellyOperator") as JellyOperator;


    emperor.arcaneBonus48 = tesseract.upgrades[48].getBonus(tesseract.upgrades);
    emperor.arcadeBonus51 = arcade.bonuses[51].getBonus();
    emperor.jellyBonus28 = jellyOperator.getObstructionBonus(28);
};
