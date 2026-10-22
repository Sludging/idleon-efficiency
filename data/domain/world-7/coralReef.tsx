import { Alchemy } from "../world-2/alchemy/alchemy";
import { Arcade } from "../world-2/arcade";
import { Domain, RawData } from "../base/domain";
import type { ImageData } from "../imageData";
import { Card } from "../cards";
import { Companion, getCompanionActiveBonus } from "../companions";
import { CoralReefUpgradeBase, initCoralReefUpgradeRepo } from "../data/CoralReefUpgradeRepo";
import { EventShop } from "../eventShop";
import { GemStore } from "../gemPurchases";
import { Item } from "../items";
import { CoralReefUpgradeModel } from "../model/coralReefUpgradeModel";
import { number2letter } from "../../utility";
import { PlayerStatues } from "../world-1/statues";
import { getStampBonusForKey, Stamp } from "../world-1/stamps";
import { KillRoy } from "../world-2/killroy";
import { Sneaking } from "../world-6/sneaking";
import { Clamworks } from "./clamworks";
import { CoralKid } from "./coralKid";
import { DancingCoral } from "./dancingCoral";
import { Menagerie } from "../menagerie";
import { LegendTalents } from "./legendTalents";

export class CoralReefUpgrade {
    level: number = 0;
    unlocked: boolean = false;
    private maximumLevelBonus: number = 0;

    constructor(public index: number, public data: CoralReefUpgradeModel) { }

    static fromBase(data: CoralReefUpgradeBase[]) {
        return data.map(d => new CoralReefUpgrade(d.index, d.data));
    }

    getUpgradeCost(): number {
        return this.data.x1 * Math.pow(this.data.x2, this.level);
    }

    updateMaximumLevelBonus(pillarCoralUnlockOwned: boolean): void {
        // The Pillar Coral Reef gains three maximum levels from its Menagerie unlock.
        // The game applies this increase only when its base maximum is 12.
        this.maximumLevelBonus = this.index === 3 && this.data.x0 === 12 && pillarCoralUnlockOwned ? 3 : 0;
    }

    getMaxLevel(): number {
        return this.data.x0 + this.maximumLevelBonus;
    }

    isMaxed(): boolean {
        const maxLevel = this.getMaxLevel();
        return maxLevel !== undefined && this.level >= maxLevel;
    }

    getNextLevelCost(): number {
        if (this.level >= this.getMaxLevel()) {
            return 0;
        }

        return Math.ceil(this.getUpgradeCost());
    }

    getImageData = (): ImageData => ({
        location: `Reef${number2letter(this.index + 26)}${this.level > 0 ? '1' : '0'}`,
        width: 37,
        height: 65,
    })

    getBonusText(): string {
        switch (this.index) {
            case 0:
                return this.data.desc.replace("{", (this.level * 10).toString());
            case 4:
                return this.data.desc.replace("{", (this.level * 3).toString()).replace("}", (this.level * 10).toString());
            default:
                return this.data.desc;
        }
    }
}

export interface DailyCoralGainBreakdown {
    base: number;
    multipliers: { label: string; factor: number }[];
    additiveBonuses: { label: string; percent: number }[];
}

export class CoralReef extends Domain {
    upgrades: CoralReefUpgrade[] = [];
    dailyCoralGains: number = 0;
    dailyCoralGainBreakdown: DailyCoralGainBreakdown = {
        additiveBonuses: [],
        multipliers: [],
        base: 0,
    }
    ownedCoral: number = 0;
    static getCoralImageData = (): ImageData => ({
        location: "Coral0_x1",
        width: 36,
        height: 36,
    })

    getRawKeys(): RawData[] {
        return [
            { key: "Spelunk", perPlayer: false, default: [] }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        this.upgrades = CoralReefUpgrade.fromBase(initCoralReefUpgradeRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const coralReef = data.get(this.getDataKey()) as CoralReef;
        const spelunkingData = data.get("Spelunk") as any[][];

        const coralReefUnlocked = (spelunkingData[12] || []) as number[];
        const coralReefLevels = (spelunkingData[13] || []) as number[];

        coralReef.upgrades.forEach(upgrade => {
            upgrade.level = coralReefLevels[upgrade.index] || 0;
            upgrade.unlocked = (coralReefUnlocked[upgrade.index] || 0) == 1;
        });

        const spelunkCurrencies = spelunkingData[4] as number[];

        coralReef.ownedCoral = spelunkCurrencies[5];
    }
    updateMaximumLevels(pillarCoralUnlockOwned: boolean): void {
        this.upgrades.forEach(upgrade => upgrade.updateMaximumLevelBonus(pillarCoralUnlockOwned));
    }

    getTotalUpgradeLevels(): number {
        return this.upgrades.reduce((total, upgrade) => total + upgrade.level, 0);
    }

    canAffordUpgrade(index: number): boolean {
        const upgrade = this.upgrades.find(upgrade => upgrade.index === index);

        if (!upgrade || !upgrade.unlocked || upgrade.isMaxed()) {
            return false;
        }

        const nextLevelCost = upgrade.getNextLevelCost();

        return (nextLevelCost == 0 || this.ownedCoral >= nextLevelCost)
    }

    getDaysUntilNextLevel(index: number): number | undefined {
        const upgrade = this.upgrades.find(upgrade => upgrade.index === index);
        if (!upgrade || !upgrade.unlocked || upgrade.isMaxed() || this.dailyCoralGains <= 0) {
            return undefined;
        }

        const nextLevelCost = upgrade.getNextLevelCost();
        return Math.ceil(Math.max(0, nextLevelCost - this.ownedCoral) / this.dailyCoralGains);
    }

    getBonusTextFromIndex(index: number): string {
        return this.upgrades.find(upgrade => upgrade.index == index)?.getBonusText() || "";
    }

    getBonusNextlevelCost(index: number): number {
        return this.upgrades.find(upgrade => upgrade.index == index)?.getUpgradeCost() || 0;
    }
}

export const updateCoralReefMaximumLevels = (data: Map<string, any>): void => {
    const coralReef = data.get("coralReef") as CoralReef;
    const menagerie = data.get("menagerie") as Menagerie;

    coralReef.updateMaximumLevels(menagerie.getUnlocks()[9].owned);
};

export const updateCoralReefDailyGain = (data: Map<string, any>) => {
    const coralReef = data.get("coralReef") as CoralReef;
    const companions = data.get("companions") as Companion[];
    const eventShop = data.get("eventShop") as EventShop;
    const gemStore = data.get("gems") as GemStore;
    const coralKid = data.get("coralKid") as CoralKid;
    const dancingCoral = data.get("dancingCoral") as DancingCoral;
    const clamworks = data.get("clamworks") as Clamworks;
    const killRoy = data.get("killroy") as KillRoy;
    const stamps = data.get("stamps") as Stamp[][];
    const alchemy = data.get("alchemy") as Alchemy;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const arcade = data.get("arcade") as Arcade;
    const sneaking = data.get("sneaking") as Sneaking;
    const cards = data.get("cards") as Card[];
    const statues = data.get("statues") as PlayerStatues[];

    // Multiplicative bonuses
    const companionBonus40 = 1 + getCompanionActiveBonus(companions, 40);
    const eventShopBonus25 = 1 + (eventShop.isBonusOwned(25) ? .3 : 0);
    const gemShopBonus41 = 1 + 20 * (gemStore.purchases.find(purchase => purchase.no == 41)?.pucrhased ?? 0) / 100;

    // Additive bonuses
    const additiveBonuses = [
        { label: "Coral Kid upgrade 5", percent: coralKid.getBonusFromIndex(5) },
        { label: "Dancing Coral upgrade 0", percent: dancingCoral.getBonusFromIndex(0) },
        { label: "Clamworks bonus 5", percent: clamworks.isBonusUnlocked(5) ? 20 : 0 },
        { label: "Killroy daily coral reef gains", percent: killRoy.dailyCoralReefGains },
        { label: "Corale stamp", percent: getStampBonusForKey(stamps, "corale") },
        { label: "Alchemy vial 7corale", percent: alchemy.getVialBonusForKey("7corale") },
        { label: "Legend talent 0", percent: legendTalents.getBonusFromIndex(0) },
        { label: "Arcade bonus 57", percent: arcade.bonuses.find(bonus => bonus.index == 57)?.getBonus() ?? 0 },
        { label: "Sneaking emporium upgrade 43", percent: sneaking.jadeUpgrades.find(upgrade => upgrade.index == 43)?.purchased || false ? 20 : 0 },
        { label: "Demonblub card", percent: Math.min(15, cards.find(card => card.id == "w7a9")?.getBonus() ?? 0) },
        { label: "Statue 31", percent: statues[0].statues[31].getBonus() },
    ];
    const multipliers = [
        { label: "Companion 40", factor: companionBonus40 },
        { label: "Event shop bonus 25", factor: eventShopBonus25 },
        { label: "Gem purchase 41", factor: gemShopBonus41 },
    ];

    const breakdown: DailyCoralGainBreakdown = {
        base: 10,
        multipliers,
        additiveBonuses,
    };
    coralReef.dailyCoralGainBreakdown = breakdown;

    const additiveTotal = additiveBonuses.reduceRight((total, bonus) => bonus.percent + total, 0);
    coralReef.dailyCoralGains = breakdown.base * multipliers[0].factor * multipliers[1].factor * multipliers[2].factor
        * (1 + additiveTotal / 100);

    return coralReef;
}