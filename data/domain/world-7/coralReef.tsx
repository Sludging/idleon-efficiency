import { Alchemy } from "../alchemy";
import { Arcade } from "../arcade";
import { Domain, RawData } from "../base/domain";
import { Card } from "../cards";
import { Companion } from "../companions";
import { CoralReefUpgradeBase } from "../data/CoralReefUpgradeRepo";
import { EventShop } from "../eventShop";
import { GemStore } from "../gemPurchases";
import { Item } from "../items";
import { CoralReefUpgradeModel } from "../model/coralReefUpgradeModel";
import { PlayerStatues } from "../statues";
import { getStampBonusForKey, Stamp } from "../world-1/stamps";
import { KillRoy } from "../world-2/killroy";
import { Sneaking } from "../world-6/sneaking";
import { Clamworks } from "./clamworks";
import { CoralKid } from "./coralKid";
import { DancingCoral } from "./dancingCoral";
import { LegendTalents } from "./legendTalents";

export class CoralReefUpgrade {
    level: number = 0;
    unlocked: boolean = false;

    constructor(public index: number, public data: CoralReefUpgradeModel) {}
    
    static fromBase(data : CoralReefUpgradeBase[]) {
        return data.map(d => new CoralReefUpgrade(d.index, d.data));
    }

    getUpgradeCost(): number {
        return this.data.x1 * Math.pow(this.data.x2, this.level);
    }

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

export class CoralReef extends Domain {
    upgrades: CoralReefUpgrade[] = [];
    dailyCoralGains: number = 0;
    ownedCoral: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "Spelunk", perPlayer: false, default: [] }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
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

    getBonusTextFromIndex(index: number): string {
        return this.upgrades.find(upgrade => upgrade.index == index)?.getBonusText() || "";
    }

    getBonusNextlevelCost(index: number): number {
        return this.upgrades.find(upgrade => upgrade.index == index)?.getUpgradeCost() || 0; 
    }
}

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
    const companionBonus40 = 1 + (companions.find(companion => companion.id == 40)?.owned || false ? companions.find(companion => companion.id == 40)?.data.bonus || 0 : 0);
    const eventShopBonus25 = 1 + (eventShop.isBonusOwned(25) ? .3 : 0);
    const gemShopBonus41 = 1 + 20 * (gemStore.purchases.find(purchase => purchase.no == 41)?.pucrhased ?? 0) /100;

    // Additive bonuses
    const coralKidBonus5 = coralKid.getBonusFromIndex(5);
    const dancingCoralBonus0 = dancingCoral.getBonusFromIndex(0);
    const clamworksBonus5 = clamworks.isBonusUnlocked(5) ? 20 : 0;
    const killRoyBonus6 = killRoy.dailyCoralReefGains;
    const stampBonusCorale = getStampBonusForKey(stamps, "corale");
    const vialBonus7corale = alchemy.getVialBonusForKey("7corale");
    const legendTalentBonus0 = legendTalents.getBonusFromIndex(0);
    const arcadeBonus57 = arcade.bonuses.find(bonus => bonus.index == 57)?.getBonus() ?? 0;
    const sneakingEmporiumBonus43 = sneaking.jadeUpgrades.find(upgrade => upgrade.index == 43)?.purchased || false ? 20 : 0;
    const demonblubCardBonus = Math.min(15, cards.find(card => card.id == "w7a9")?.getBonus() ?? 0);
    const statuesBonus = statues[0].statues[31].getBonus();

    coralReef.dailyCoralGains = 10 * companionBonus40 * eventShopBonus25 * gemShopBonus41 
        * (1 + (coralKidBonus5 + dancingCoralBonus0 + clamworksBonus5 + killRoyBonus6 + stampBonusCorale + vialBonus7corale + legendTalentBonus0 + arcadeBonus57 + sneakingEmporiumBonus43 + demonblubCardBonus + statuesBonus) / 100);

    return coralReef;
}