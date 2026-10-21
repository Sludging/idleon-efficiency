import { range } from "../../utility";
import { Domain, RawData } from "../base/domain";
import { initPrayerRepo, PrayerBase } from "../data/PrayerRepo";
import { ImageData } from "../imageData";
import { Item } from "../items";
import { PrayerModel } from "../model/prayerModel";
import type { Player } from "../player";
import type { Gaming } from "../world-5/gaming";

export class Prayer {
    level: number = 0;
    totalPrayersOwned: number = 0; // PrayOwned
    private passiveBonusFraction: number | undefined;
    constructor(public index: number, public data: PrayerModel) { }

    getLevelCosts = (level: number = this.level): number => {
        if (level == 0) {
            return 0;
        }

        if (level < 6) {
            return Math.round(this.data.costMult * (1 + (4 + (this.index / 25)) * level));
        }

        if (this.index == 9) {
            return Math.round(Math.min(2e9, this.data.costMult * (1 + (2 + (this.index / 20)) * level) * Math.pow(1.3, level - 5)));
        }

        return Math.round(Math.min(2e9, this.data.costMult * (1 + (1 + this.index / 20) * level) * Math.pow(1.12, level - 5)));
    }

    getCostToMax = () => {
        let totalCost = 0;
        range((this.level ?? 0), this.data.maxLevel).forEach((level, _) => {
            totalCost += this.getLevelCosts(level);
        });

        return totalCost;
    }

    getBonus = (): number => {
        return Math.round(this.data.x1 * Math.max(1, 1 + (this.level - 1) / 10));
    }

    resetPlayerBonusInputs(): void {
        this.passiveBonusFraction = undefined;
    }

    preparePassiveBonusFraction(fraction: number): void {
        this.passiveBonusFraction = fraction;
    }

    getBonusForPlayer(player: Player): number {
        if (this.passiveBonusFraction === undefined) {
            throw new Error("Character Prayer bonus inputs have not been prepared");
        }
        if (player.activePrayers.includes(this.index)) {
            return this.getBonus();
        }
        // Passive prayers require saved empty slots, not an absent list or another equipped prayer.
        if (player.savedPrayerSlotCount === 0 || player.activePrayers.length > 0
            || this.passiveBonusFraction === 0 || !(this.level > 0.5) || this.index === 5) {
            return 0;
        }
        // Superbits scale the raw bonus before its single final round. Tachion never gains a passive bonus.
        return Math.round(this.passiveBonusFraction * this.data.x1 * Math.max(1, 1 + (this.level - 1) / 10));
    }

    getCurse = (): number => {
        return Math.round(this.data.x2 * Math.max(1, 1 + (this.level - 1) / 10));
    }

    getCurseForPlayer(player: Player): number {
        return player.activePrayers.includes(this.index) ? this.getCurse() : 0;
    }

    getBonusText = (): string => {
        return this.data.bonus.replace("{", this.getBonus().toString());
    }

    getCurseText = (): string => {
        return this.data.curse.replace("{", this.getCurse().toString());
    }

    getImageData = (): ImageData => {
        return {
            location: `Prayer${this.index}`,
            width: 50,
            height: 50
        }
    }

    static fromBase = (data: PrayerBase[]) => {
        return data.map(prayer => new Prayer(prayer.index, prayer.data))
    }
}

export class Prayers extends Domain {
    getRawKeys(): RawData[] {
        return [
            { key: "PrayOwned", default: [], perPlayer: false },
        ]
    }
    init(_allItems: Item[], _charCount: number) {
        return Prayer.fromBase(initPrayerRepo());
    }
    parse(data: Map<string, any>): void {
        const prayerData = data.get(this.getDataKey()) as Prayer[];
        prayerData.forEach(prayer => prayer.resetPlayerBonusInputs());
        const rawData = data.get("PrayOwned") as number[];
        rawData.forEach((prayer, index) => { // for each prayer
            if (index < prayerData.length) { // ignore unknown prayers.
                prayerData[index].level = prayer;
            }
        });
    }

}

export const updatePrayerPlayerBonuses = (data: Map<string, any>): void => {
    const prayers = data.get("prayers") as Prayer[];
    const gaming = data.get("gaming") as Gaming;
    const noMorePraying = Number(gaming.isSuperbitPurchased(9));
    const prayersBegone = Number(gaming.isSuperbitPurchased(39));
    const prayersAintMeta = Number(gaming.isSuperbitPurchased(53));
    // The last Superbit adds scale but cannot activate passive prayers on its own.
    const passiveFraction = noMorePraying === 1 || prayersBegone === 1
        ? 0.2 * noMorePraying + (0.2 * prayersBegone + 0.2 * prayersAintMeta) : 0;
    prayers.forEach(prayer => prayer.preparePassiveBonusFraction(passiveFraction));
};
