import { Domain, RawData } from "../base/domain";
import { Companion } from "../companions";
import { initPoppyTarpitUpgradeRepo, initPoppyUpgradeRepo, PoppyUpgradeBase } from "../data/PoppyUpgradeRepo";
import { Item } from "../items";
import { ClickerUpgradeModel } from "../model/clickerUpgradeModel";
import { UpgradeVault } from "../upgradeVault";
import { Hole } from "../world-5/hole/hole";
import { LegendTalents } from "../world-7/legendTalents";
import { Meritocraty } from "../world-7/meritocraty";

const FisherooBonuses = [
    "{x bluefin fish caught",
    "{x shiny fishing speed and luck",
    "All upgrades are {x cheaper",
    "Other Reset bonuses are {x higher",
    "{x Tartar fish caught"
];

export class PoppyFisherooBonus {
    level: number = 0;

    constructor(public index: number, public desc: string) { }

    static fromBase() {
        return FisherooBonuses.map((desc, index) => new PoppyFisherooBonus(index, desc));
    }
}

export class PoppyGlobalBonus {
    constructor(public index: number, public desc: string, public value: number) { }

    static fromBase() {
        return [
            new PoppyGlobalBonus(0, "+{% Fish Efficiency", 3),
            new PoppyGlobalBonus(1, "+{ Defence", 3),
            new PoppyGlobalBonus(2, "+{% Fishing XP", 5),
            new PoppyGlobalBonus(3, "+{% Accuracy", 2),
            new PoppyGlobalBonus(4, "+{% Total DMG", 2),
            new PoppyGlobalBonus(5, "+{% AFK Gains", .5),
            new PoppyGlobalBonus(6, "+{% Cash", 3),
        ];
    }
}

export class PoppyUpgrade {
    unlocked: boolean = false;
    level: number = 0;

    constructor(public index: number, public data: ClickerUpgradeModel) { }

    static fromBase(data : PoppyUpgradeBase[]) {
        return data.map(d => new PoppyUpgrade(d.index, d.data));
    }
}

export class TarpitUpgrade {
    unlocked: boolean = false;
    level: number = 0;

    constructor(public index: number, public data: ClickerUpgradeModel) { }

    static fromBase(data : PoppyUpgradeBase[]) {
        return data.map(d => new TarpitUpgrade(d.index, d.data));
    }
}

export class Poppy extends Domain {
    upgrades: PoppyUpgrade[] = [];
    tarpitUpgrades: TarpitUpgrade[] = [];
    bonuses: PoppyGlobalBonus[] = PoppyGlobalBonus.fromBase();
    fisherooBonuses: PoppyFisherooBonus[] = PoppyFisherooBonus.fromBase();
    
    ownedFishes: number = 0;
    ownedTartarFishes: number = 0;
    totalProducedFishes: number = 0;
    ownedMegafishes: number = 0;

    shinyFishes: number[] = [0, 0, 0, 0, 0, 0];

    // Global bonus boost
    companionBonus51: number = 0;
    legendTalent26: number = 0;

    // Fish rate boost
    vaultUpgrade21: number = 0;
    meritoBonus12: number = 0;
    gambitBonus8: number = 0;
    
    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[]) {
        this.upgrades = PoppyUpgrade.fromBase(initPoppyUpgradeRepo());
        this.tarpitUpgrades = TarpitUpgrade.fromBase(initPoppyTarpitUpgradeRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const poppy = data.get(this.getDataKey()) as Poppy;
        const optionList = data.get("OptLacc") as number[];

        poppy.ownedFishes = optionList[267] || 0;
        poppy.ownedTartarFishes = optionList[296] || 0;
        poppy.totalProducedFishes = 0;
        poppy.ownedMegafishes = optionList[279] || 0;

        poppy.upgrades.forEach(upgrade => {
            upgrade.level = optionList[268 + upgrade.index] || 0;
            upgrade.unlocked = poppy.totalProducedFishes >= upgrade.data.unlock;
        });

        poppy.fisherooBonuses.forEach(bonus => {
            bonus.level = optionList[291 + bonus.index] || 0;
        });

        const tarpitUpgradesOwned = poppy.getTarpitUpgradesOwned();
        poppy.tarpitUpgrades.forEach(upgrade => {
            upgrade.level = optionList[297 + upgrade.index] || 0;
            upgrade.unlocked = upgrade.index < tarpitUpgradesOwned;
        });

        poppy.shinyFishes[0] = optionList[281] || 0;
        poppy.shinyFishes[1] = optionList[282] || 0;
        poppy.shinyFishes[2] = optionList[283] || 0;
        poppy.shinyFishes[3] = optionList[284] || 0;
        poppy.shinyFishes[4] = optionList[285] || 0;
        poppy.shinyFishes[5] = optionList[286] || 0;
    }

    getTarpitUpgradesOwned(): number {
        return Math.min(8, Math.round(3 * this.getMegafishQuantity(0) + 3 * this.getMegafishQuantity(4) + 2 * this.getMegafishQuantity(7)));
    }

    getUpgradeCost(index: number): number {
        const upgrade = this.upgrades.find(upgrade => upgrade.index == index);

        if (!upgrade) {
            return 0;
        }

        const reductionBase = upgrade.index == 0 ? 1 + upgrade.level : 1;
        const reduction = reductionBase * (1 / (1 + 10 * this.getUpgradeLevel(4) / 100)) * (1 / (1 + 15 * this.getTarpitUpgradeLevel(3) / 100)) 
            * (1 / (1 + 5 * this.getMegafishQuantity(10) * this.getTarpitUpgradeLevel(7) / 100));

        return reduction * (1 / Math.max(1, this.getFisherooBonus(2))) * upgrade.data.x0 * Math.pow(upgrade.data.x1, upgrade.level);
    }

    getTarpitUpgradeCost(index: number): number {
        const upgrade = this.tarpitUpgrades.find(upgrade => upgrade.index == index);

        if (!upgrade) {
            return 0;
        }

        const reduction = 1 / (1 + 5 * this.getMegafishQuantity(10) * this.getTarpitUpgradeLevel(7) / 100);

        return upgrade.level + reduction * upgrade.data.x0 * Math.pow(upgrade.data.x1, upgrade.level);
    }

    getFisherooBonus(index: number): number {
        const bonus = this.fisherooBonuses.find(bonus => bonus.index == index);

        if (!bonus) {
            return 0;
        }

        switch (index) {
            case 0: return (1 + .4 * bonus.level) * this.getFisherooBonus(3);
            case 1: return (1 + .3 * bonus.level) * this.getFisherooBonus(3);
            case 2: return (1 + .15 * bonus.level) * this.getFisherooBonus(3);
            case 3: return 1 + .04 * bonus.level;
            case 4: return (1 + .2 * bonus.level) * this.getFisherooBonus(3);
        }

        return 0;
    }

    getUpgradeLevel(index: number): number {
        return this.upgrades.find(upgrade => upgrade.index == index)?.level || 0;
    }

    getTarpitUpgradeLevel(index: number): number {
        return this.tarpitUpgrades.find(upgrade => upgrade.index == index)?.level || 0;
    }

    getGlobalBonusMulti(): number {
        return 50 * this.getMegafishQuantity(1) + 50 * this.getMegafishQuantity(3) + 50 * this.getMegafishQuantity(6) + 50 * this.getMegafishQuantity(8) 
            + 50 * Math.min(1, this.getMegafishQuantity(11)) + 25 * Math.max(0, this.getMegafishQuantity(11) - 1);
    }

    getGlobalBonus(index: number): number {
        const bonus = this.bonuses.find(bonus => bonus.index == index);

        if (!bonus) return 0;

        return bonus.value * (1 + this.legendTalent26 / 100) * (1 + this.companionBonus51) * (1 + this.getGlobalBonusMulti() / 100) 
            * Math.max(0, Math.ceil((this.getUpgradeLevel(3) - bonus.index) / 7));
    }

    getMegafishQuantity(index: number): number {
        // If we don't own this megafish yet, return 0
        if (index > this.ownedMegafishes) {
            return 0;
        }

        // If this is the last megafish, we can have multiples
        if (index == 11) {
            return this.ownedMegafishes - 11;
        }

        // For everything else, quantity is simply 1.
        return 1;
    }
}

export const updatePoppyGlobalBonus = (data: Map<string, any>) => {
    const poppy = data.get("poppy") as Poppy;
    const companions = data.get("companions") as Companion[];
    const legendTalents = data.get("legendTalents") as LegendTalents;

    poppy.companionBonus51 = companions.find(companion => companion.id == 51)?.owned || false ? companions.find(companion => companion.id == 51)?.data.bonus || 0 : 0;
    poppy.legendTalent26 = legendTalents.getBonusFromIndex(26);

    return poppy;
}

export const updatePoppyFishRate = (data: Map<string, any>) => {
    const poppy = data.get("poppy") as Poppy;
    const upgradeVault = data.get("upgradeVault") as UpgradeVault;
    const meritocraty = data.get("meritocraty") as Meritocraty;
    const hole = data.get("hole") as Hole;

    poppy.vaultUpgrade21 = upgradeVault.getBonusForId(21);
    poppy.meritoBonus12 = meritocraty.getCurrentBonus(12);
    poppy.gambitBonus8 = hole.gambit.getBonus(8);

    return poppy;
}
