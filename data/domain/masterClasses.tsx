import { Domain } from "./base/domain";
import type { RawData } from "./base/domain";
import type { Item } from "./items";
import type { RoyalArmory } from "./world-6/royalArmory";
import type { LegendTalents } from "./world-7/legendTalents";

export class MasterClasses extends Domain {
    private dailyUpgradesUsed: number = 0;
    private hasSantaLittleHelperBundle: boolean = false;
    private upgradeCostMultiplier: number = 1;

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number): MasterClasses {
        this.upgradeCostMultiplier = 1;
        return this;
    }

    parse(data: Map<string, unknown>): void {
        const masterClasses = data.get(this.getDataKey()) as MasterClasses;
        masterClasses.dailyUpgradesUsed = 0;
        masterClasses.hasSantaLittleHelperBundle = false;
        masterClasses.upgradeCostMultiplier = 1;

        const optionList = data.get("OptLacc") as (string | number)[] | undefined;
        const rawData = data.get("rawData") as Record<string, string | undefined>;
        // Slot 480 counts successful daily Masterclass upgrade purchases; older saves start at zero.
        masterClasses.dailyUpgradesUsed = Number(optionList?.[480] ?? 0);

        let bundleInfo: Record<string, number> | undefined;
        if (rawData.BundlesReceived !== undefined) {
            bundleInfo = JSON.parse(rawData.BundlesReceived) as Record<string, number>;
        }
        masterClasses.hasSantaLittleHelperBundle = bundleInfo?.bon_p == 1;
    }

    updateUpgradeCostMultiplier(dailyCheapUpgradeLimit: number, bargainBonus: number): void {
        // Daily Shopping Spree stops applying as soon as the used count reaches its allowance.
        const prefix = this.dailyUpgradesUsed < dailyCheapUpgradeLimit
            ? (this.hasSantaLittleHelperBundle ? 0.05 : 0.2)
            : (this.hasSantaLittleHelperBundle ? 0.25 : 1);
        // Bargain further reduces the selected daily/bundle price through a reciprocal multiplier.
        this.upgradeCostMultiplier = prefix * (1 / (1 + bargainBonus / 100));
    }

    getUpgradeCostMultiplier(): number {
        return this.upgradeCostMultiplier;
    }
}

export const updateMasterClasses = (accountData: Map<string, unknown>): void => {
    const masterClasses = accountData.get("masterClasses") as MasterClasses;
    const legendTalents = accountData.get("legendTalents") as LegendTalents;
    const royalArmory = accountData.get("royalArmory") as RoyalArmory;

    masterClasses.updateUpgradeCostMultiplier(
        legendTalents.getBonusFromIndex(23),
        royalArmory.getOrbletMarketBonus(7),
    );
};
