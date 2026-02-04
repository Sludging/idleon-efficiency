import { Domain, RawData } from "../base/domain";
import { Companion } from "../companions";
import { initOrionUpgradeRepo, OrionUpgradeBase } from "../data/OrionUpgradeRepo";
import { Item } from "../items";
import { ClickerUpgradeModel } from "../model/clickerUpgradeModel";
import { UpgradeVault } from "../upgradeVault";
import { Hole } from "../world-5/hole/hole";
import { LegendTalents } from "../world-7/legendTalents";
import { Meritocraty } from "../world-7/meritocraty";

export class OrionGlobalBonus {
    constructor(public index: number, public desc: string, public value: number) { }

    static fromBase() {
        return [
            new OrionGlobalBonus(0, "+{% Class XP", 5),
            new OrionGlobalBonus(1, "+{ Base DMG", 10),
            new OrionGlobalBonus(2, "+{% Total DMG", 2),
            new OrionGlobalBonus(3, "+{% Skill XP", 4),
            new OrionGlobalBonus(4, "+{% Drop Rate", 1),
            new OrionGlobalBonus(5, "+{ All Stat", 2),
        ];
    }
}

export class OrionUpgrade {
    unlocked: boolean = false;
    level: number = 0;

    constructor(public index: number, public data: ClickerUpgradeModel) { }

    static fromBase(data : OrionUpgradeBase[]) {
        return data.map(d => new OrionUpgrade(d.index, d.data));
    }
}

export class Orion extends Domain {
    upgrades: OrionUpgrade[] = [];
    bonuses: OrionGlobalBonus[] = OrionGlobalBonus.fromBase();
    
    ownedFeather: number = 0;
    ownedShinyFeather: number = 0;
    totalProducedFeather: number = 0;
    ownedMegafeathers: number = 0;

    // Global bonus boost
    companionBonus51: number = 0;
    legendTalent26: number = 0;

    // Feather rate boost
    vaultUpgrade21: number = 0;
    meritoBonus12: number = 0;
    gambitBonus8: number = 0;
    
    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[]) {
        this.upgrades = OrionUpgrade.fromBase(initOrionUpgradeRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const orion = data.get(this.getDataKey()) as Orion;
        const optionList = data.get("OptLacc") as number[];

        orion.ownedFeather = optionList[253] || 0;
        orion.ownedMegafeathers = optionList[262] || 0;
        orion.totalProducedFeather = optionList[263] || 0;
        orion.ownedShinyFeather = optionList[264] || 0;

        orion.upgrades.forEach(upgrade => {
            upgrade.level = optionList[254 + upgrade.index] || 0;
            upgrade.unlocked = orion.totalProducedFeather >= upgrade.data.unlock;
        });
    }

    // This rate is per second
    getFeatherRate(): number {
        return (1 + 9 * this.getMegafeatherQuantity(0)) 
            * (1 + this.vaultUpgrade21 / 100) * (1 + this.meritoBonus12 / 100) * (1 + this.gambitBonus8 / 100) 
            * (this.getUpgradeLevel(0) + 5 * this.getUpgradeLevel(5) + 2 * this.getMegafeatherQuantity(4) * this.getUpgradeLevel(3) + 4 * this.getMegafeatherQuantity(4) * this.getUpgradeLevel(7))
            * (1 + 5 * this.getUpgradeLevel(2) / 100) * Math.pow(3 + 2 * this.getMegafeatherQuantity(6), this.getUpgradeLevel(4)) 
            * (1 + this.ownedShinyFeather * this.getUpgradeLevel(6) / 100)
    }

    getUpgradeCost(index: number): number {
        const upgrade = this.upgrades.find(upgrade => upgrade.index == index);

        if (!upgrade) {
            return 0;
        }

        if (index == 0) {
            return 1 / (1 + 10 * this.getUpgradeLevel(3) / 100) * (1 / (1 + 20 * this.getUpgradeLevel(7) / 100)) * (1 / (1 + this.getMegafeatherQuantity(2) * this.getUpgradeLevel(0) / 100)) * upgrade.data.x0 * upgrade.level * Math.pow(Math.max(1.05, upgrade.data.x1 - .025 * this.getMegafeatherQuantity(8)), upgrade.level);
        } else {
            return 1 / (1 + 10 * this.getUpgradeLevel(3) / 100) * (1 / (1 + 20 * this.getUpgradeLevel(7) / 100)) * (1 / (1 + this.getMegafeatherQuantity(2) * this.getUpgradeLevel(0) / 100)) * upgrade.data.x0 * Math.pow(upgrade.data.x1, upgrade.level);
        }
    }

    getUpgradeLevel(index: number): number {
        return this.upgrades.find(upgrade => upgrade.index == index)?.level || 0;
    }

    getGlobalBonusMulti(): number {
        return 100 * this.getMegafeatherQuantity(1) + 100 * this.getMegafeatherQuantity(3) + 100 * this.getMegafeatherQuantity(5) 
            + 100 * this.getMegafeatherQuantity(7) + 100 * Math.min(1, this.getMegafeatherQuantity(9)) + 50 * Math.max(0, this.getMegafeatherQuantity(9) - 1);
    }

    getGlobalBonus(index: number): number {
        const bonus = this.bonuses.find(bonus => bonus.index == index);

        if (!bonus) return 0;

        return bonus.value * (1 + this.legendTalent26 / 100) * (1 + this.companionBonus51) * (1 + this.getGlobalBonusMulti() / 100) 
            * Math.max(0, Math.ceil((this.getUpgradeLevel(1) - 1) / 6));
    }

    getMegafeatherQuantity(index: number): number {
        return this.ownedMegafeathers > index ? 9 == index ? this.ownedMegafeathers - 9 : 1 : 0
    }
}

export const updateOrionGlobalBonus = (data: Map<string, any>) => {
    const orion = data.get("orion") as Orion;
    const companions = data.get("companions") as Companion[];
    const legendTalents = data.get("legendTalents") as LegendTalents;

    // Global bonus boost
    orion.companionBonus51 = companions.find(companion => companion.id == 51)?.owned || false ? companions.find(companion => companion.id == 51)?.data.bonus || 0 : 0;
    orion.legendTalent26 = legendTalents.getBonusFromIndex(26);

    return orion;
}

export const updateOrionFeatherRate = (data: Map<string, any>) => {
    const orion = data.get("orion") as Orion;
    const upgradeVault = data.get("upgradeVault") as UpgradeVault;
    const meritocraty = data.get("meritocraty") as Meritocraty;
    const hole = data.get("hole") as Hole;

    orion.vaultUpgrade21 = upgradeVault.getBonusForId(21);
    orion.meritoBonus12 = meritocraty.getCurrentBonus(12);
    orion.gambitBonus8 = hole.gambit.getBonus(8);

    return orion;
}