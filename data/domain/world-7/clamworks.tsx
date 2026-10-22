import { Domain, RawData } from "../base/domain"
import { ClamworksBonusBase, initClamworksBonusRepo } from "../data/ClamworksBonusRepo";
import { ClamworksRewardBase, initClamworksRewardRepo } from "../data/ClamworksRewardRepo";
import { Item } from "../items";
import { ClamworksBonusModel } from "../model/clamworksBonusModel";
import { Menagerie } from "../menagerie";
import { ClamworksRewardModel } from "../model/clamworksRewardModel";


export class ClamworksBonus {
    level: number = 0;

    constructor(public index: number, public data: ClamworksBonusModel) { }

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
export class ClamworksReward {
    earned: boolean = false;

    constructor(public index: number, public data: ClamworksRewardModel) { }

    static fromBase(data: ClamworksRewardBase[]): ClamworksReward[] {
        return data.map(reward => new ClamworksReward(reward.index, reward.data));
    }
}


export class Clamworks extends Domain {
    promoLevel: number = 0;
    pearlsOwned: number = 0;
    workBonuses: ClamworksBonus[] = [];
    compensationRewards: ClamworksReward[] = [];
    basePearlValue: number = 0;
    blackPearlValue: number = 0;
    clamCount: number = 0;
    clamHP: number = 0;
    clamRespawnSeconds: number = 0;
    scurgePointsRemaining: number = 0;
    scurgeExpPerKill: number = 0;
    private scurgeGlobalPearlCostDiscount: number = 0;
    private scurgePearlCostDiscountByUpgrade: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number) {
        this.compensationRewards = ClamworksReward.fromBase(initClamworksRewardRepo());
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

        clamWork.compensationRewards.forEach(reward => {
            reward.earned = reward.data.requiredWorkerClassLevel <= clamWork.promoLevel;
        });
    }

    getFirstPendingCompensationReward(): ClamworksReward | undefined {
        return this.compensationRewards.find(reward => !reward.earned);
    }

    getScurgeBonus(index: number, spentLevels: number[]): number {
        const bonus = this.workBonuses.find(workBonus => workBonus.index === index + 9);
        return bonus ? spentLevels[index] * bonus.data.value : 0;
    }

    updateClamWorkOutputs(scurgeLevel: number, scurgeSpentLevels: number[], _scurgeUnlocked: boolean): void {
        // Scurge upgrades apply one global pearl discount and one per-upgrade discount.
        this.scurgeGlobalPearlCostDiscount = this.getScurgeBonus(3, scurgeSpentLevels);
        const scurgeDiscountPerUpgradeLevel = this.getScurgeBonus(5, scurgeSpentLevels);
        for (let index = 0; index < this.scurgePearlCostDiscountByUpgrade.length; index += 1) {
            this.scurgePearlCostDiscountByUpgrade[index] =
                scurgeSpentLevels[index] * scurgeDiscountPerUpgradeLevel;
        }
        const scurgeBonuses = {
            pearlMultiplier: this.getScurgeBonus(1, scurgeSpentLevels),
            pearlValueMultiplier: this.getScurgeBonus(8, scurgeSpentLevels),
            experienceBase: this.getScurgeBonus(0, scurgeSpentLevels),
            experiencePercent: this.getScurgeBonus(4, scurgeSpentLevels),
            experienceChance: this.getScurgeBonus(2, scurgeSpentLevels),
        };
        this.basePearlValue = (1 + this.getClamBonus(0))
            * (1 + this.getClamBonus(7) / 100)
            * (1 + scurgeBonuses.pearlMultiplier / 100)
            * (1 + scurgeBonuses.pearlValueMultiplier * scurgeLevel / 100);
        this.blackPearlValue = this.getClamBonus(5);
        this.clamCount = Math.min(25, 2 + this.getClamBonus(1));
        this.clamHP = 1e16 * Math.pow(30, this.promoLevel);
        this.clamRespawnSeconds = 60;
        // Native Clam_Cost(index, 1) is 1 for all nine Scurge upgrades.
        this.scurgePointsRemaining = scurgeLevel - scurgeSpentLevels.reduce((total, spent) => total + spent, 0);
        this.scurgeExpPerKill = (1 + scurgeBonuses.experienceBase)
            * (1 + scurgeBonuses.experiencePercent / 100)
            * (1 + scurgeBonuses.experienceChance / 100);
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
            return 20 * Math.pow(10 + 3 * this.promoLevel, index - 1);
        }

        return 0;
    }

    getClamCost = (index: number): number => {
        const bonus = this.workBonuses.find(bonus => bonus.index === index);

        if (!bonus || bonus.data.cost === undefined) {
            return 0;
        }

        const level = bonus.level;
        const upgradeBaseCost = Math.pow(bonus.data.cost, level);
        const upgradeLevelCost = index === 0
            ? 3 * level + Math.pow(level, 2.5)
            : 2 * level + Math.pow(level, 1.5);
        const priceBeforeDiscounts = index === 0
            ? upgradeBaseCost + upgradeLevelCost
            : this.getPearlRequirement(index) / 5 * upgradeBaseCost + upgradeLevelCost;

        return 1 / (1 + this.getClamBonus(4) / 100)
            * (1 / (1 + this.scurgeGlobalPearlCostDiscount / 100))
            * (1 / (1 + this.scurgePearlCostDiscountByUpgrade[index] / 100))
            * (1 / (1 + this.getClamBonus(8) / 100))
            * priceBeforeDiscounts;
    }

    getPromoTryCost = (): number => {
        return 1E5 * Math.pow(10, this.promoLevel);
    }

    isBonusUnlocked = (index: number): boolean => {
        return this.compensationRewards.find(reward => reward.index === index)?.earned || false;
    }

    getPromoBonusText = (index: number): string => {
        return this.compensationRewards.find(reward => reward.index === index)?.data.description || "";
    }
}

export const updateClamWorkOutputs = (accountData: Map<string, unknown>): void => {
    const clamworks = accountData.get("clamworks") as Clamworks;
    const menagerie = accountData.get("menagerie") as Pick<Menagerie, 'scurgeLevel' | 'scurgeSpentLevels' | 'scurgeUnlocked'>;

    clamworks.updateClamWorkOutputs(menagerie.scurgeLevel, menagerie.scurgeSpentLevels, menagerie.scurgeUnlocked);
};