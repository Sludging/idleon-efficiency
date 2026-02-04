import { Domain, RawData } from "../base/domain"
import { ClamworksBonusBase, initClamworksBonusRepo } from "../data/ClamworksBonusRepo";
import { Item } from "../items";
import { ClamworksBonusModel } from "../model/clamworksBonusModel";

export const promoBonuses = [
    "+1 Grade for 2 Gallery Slots",
    "+1 Legend Talent PTS",
    "+10 LV/day for Kattlekruk bubbles",
    "+5% Meritocracy Multi bonus",
    "+1 Legend Talent PTS",
    "+20% extra Daily Coral",
    "+15 LV/day from Brain Coral",
    "+3% Gallery Bonus Multi",
    "}x Class EXP multi"
]

export class ClamworksBonus {
    level: number = 0;

    constructor(public index: number, public data: ClamworksBonusModel) {}

    static fromBase(data: ClamworksBonusBase[]) {
        return data.map(bonus => new ClamworksBonus(bonus.index, bonus.data));
    }

    getBonus = (): number => {
        switch (this.index) {
            case 5:
                return 50 + (this.level * this.data.value);
            // index 3 is supposed to be special too as it relies on multikill value, but we don't have it here
            default:
                return this.level * this.data.value;
        }
    }

    getBonusText = (): string => {
        return this.data.description;
    }
}

export class ClamPromoBonus {
    active: boolean = false;

    constructor(public index: number, public bonus: string) {}

    static fromBase() {
        return promoBonuses.map((bonus, index) => new ClamPromoBonus(index, bonus));
    }
}

export class Clamworks extends Domain {
    promoLevel: number = 0;
    pearlsOwned: number = 0;
    workBonuses: ClamworksBonus[] = [];
    promoBonuses: ClamPromoBonus[] = [];

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number) {
        this.promoBonuses = ClamPromoBonus.fromBase();
        this.workBonuses = ClamworksBonus.fromBase(initClamworksBonusRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const clamWork = data.get(this.getDataKey()) as Clamworks;
        const optionList = data.get("OptLacc") as number[];

        clamWork.promoLevel = optionList[464] || 0;

        clamWork.pearlsOwned = optionList[454] || 0;

        clamWork.workBonuses.forEach(bonus => {
            bonus.level = optionList[455 + bonus.index] || 0;
        });

        clamWork.promoBonuses.forEach(bonus => {
            bonus.active = bonus.index < clamWork.promoLevel;
        });
    }

    getPromoChance = (): number => {
        return .5 / (2 + this.promoLevel);
    }

    getClamBonus = (index: number): number => {
        return this.workBonuses.find(bonus => bonus.index == index)?.getBonus() || 0;
    }

    getClamBonusText = (index: number): string => {
        const bonus = this.workBonuses.find(bonus => bonus.index == index);

        if (!bonus) {
            return "";
        }

        const bonusValue = bonus.getBonus();

        return bonus.data.description.replace("$", bonusValue.toString()).replace("}", bonusValue.toString());
    }

    getPearlRequirement = (index: number): number => {
        const bonus = this.workBonuses.find(bonus => bonus.index == index);

        if (bonus) {
            return 20 * Math.pow(10 + 3 * bonus.level, index - 1);
        }

        return 0;
    }

    getClamCost = (index: number): number => {
        const bonus = this.workBonuses.find(bonus => bonus.index == index);

        if (!bonus) {
            return 0;
        }

        switch (index) {
            case 0:
                return 1 / (1 + this.getClamBonus(4) / 100) * (1 / (1 + this.getClamBonus(8) / 100)) * (Math.pow(bonus.data.cost, bonus.level) + (3 * bonus.level + Math.pow(bonus.level, 2.5))) ;
            default:
                return 1 / (1 + this.getClamBonus(4) / 100) * (1 / (1 + this.getClamBonus(8) / 100)) * (this.getPearlRequirement(index) / 5 * Math.pow(bonus.data.cost, bonus.level) + (2 * bonus.level + Math.pow(bonus.level, 1.5)));
        }
    }

    getPromoTryCost = (): number => {
        return 1E5 * Math.pow(10, this.promoLevel);
    }

    isBonusUnlocked = (index: number): boolean => {
        return this.promoBonuses.find(bonus => bonus.index == index)?.active || false;
    }

    getPromoBonusText = (index: number): string => {
        return this.promoBonuses.find(bonus => bonus.index == index)?.bonus || "";
    }
}