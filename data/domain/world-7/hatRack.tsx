import { getCompanionActiveBonus } from "../companions";
import { Domain, RawData } from "../base/domain";
import type { EventShop } from "../eventShop";
import type { Item } from "../items";
import type { Player } from "../player";
import type { Companion } from "../companions";
import type { Minehead } from "./minehead";
import type { SushiStation } from "./sushi";
import { TypeGenEnum } from "../enum/typeGenEnum";
import type { ArmourItemModel } from "../model/armourItemModel";
import type { ItemProperty } from "../equipment-effects";

type ItemEffect = { effect: string; value: number };

export class HatRackHat {
    stored: boolean = false;

    constructor(public internalName: string, public name: string, public item: Item) {}
}

export class HatRack extends Domain {
    hats: HatRackHat[] = [];
    private depositedHats: string[] = [];
    private unlockKillsLeft: (number | undefined)[] = [];
    private itemEffects = new Map<string, ItemEffect[]>();
    private calculatedBonuses: Map<string, number> | undefined;

    getRawKeys(): RawData[] {
        return [
            { key: "Spelunk", perPlayer: false, default: [] },
            { key: "KLA_", perPlayer: true, default: [] },
        ];
    }

    init(allItems: Item[], _charCount: number) {
        this.hats = [];
        this.itemEffects.clear();
        for (const item of allItems) {
            // Catalog eligibility uses the definition sentinel, not the recipe-derived Item level.
            if (item.type === "Premium Helmet" && item.typeGen === TypeGenEnum.aHelmetMTX
                && (item.data.item as ArmourItemModel).lvReqToCraft !== 69420) {
                this.hats.push(new HatRackHat(item.internalName, item.displayName, item));
            }
            const effects: ItemEffect[] = [];
            for (const stoneName of ["UQ1val", "UQ2val"]) {
                const stat = item.itemStats.find(stat => stat.stoneName === stoneName);
                if (stat?.extra && stat.extra !== "0") {
                    // Preserve the definition label exactly, apart from the game's uppercase convention.
                    effects.push({ effect: stat.extra.toUpperCase(), value: stat.getValue() });
                }
            }
            effects.push(
                { effect: "Weapon Power", value: item.weaponPower },
                { effect: "STR", value: item.str },
                { effect: "AGI", value: item.agi },
                { effect: "WIS", value: item.wis },
                { effect: "LUK", value: item.luk },
                { effect: "Defence", value: item.defence },
            );
            this.itemEffects.set(item.internalName, effects);
        }
        return this;
    }

    parse(data: Map<string, any>): void {
        const hatRack = data.get(this.getDataKey()) as HatRack;
        const spelunk = data.get("Spelunk") as unknown[][] | undefined;
        const depositedHats = spelunk?.[46];
        hatRack.depositedHats = Array.isArray(depositedHats) ? [...depositedHats] as string[] : [];
        const storedNames = new Set(hatRack.depositedHats);
        // Reset every catalog entry without sorting or deduplicating the bonus calculation's saved sequence.
        for (const hat of hatRack.hats) {
            hat.stored = storedNames.has(hat.internalName);
        }

        const charCount = Math.max(0, Math.trunc(Number(data.get("charCount")) || 0));
        hatRack.unlockKillsLeft = Array.from({ length: charCount }, (_, index) =>
            (data.get(`KLA_${index}`) as number[][] | undefined)?.[50]?.[0]
        );
        // Parsed saves invalidate totals from the previous account state.
        hatRack.calculatedBonuses = undefined;
    }

    getDepositedHatCount(): number {
        return this.depositedHats.length;
    }

    isUnlocked(player: Player): boolean {
        // This gate also controls replacement of the equipped premium hat.
        const killsLeft = this.unlockKillsLeft[player.playerID];
        return killsLeft !== undefined && killsLeft <= 0;
    }

    getBonus(effect: string, player: Player): number {
        if (!this.calculatedBonuses) {
            throw new Error(`Hat Rack bonuses have not been calculated for player ${player.playerID}`);
        }
        if (!this.isUnlocked(player)) return 0;
        return this.calculatedBonuses.get(effect) ?? 0;
    }
    getProperty(property: ItemProperty, player: Player): number {
        // Keep the existing display key for the prepared weapon-power channel.
        return this.getBonus(property === "Weapon_Power" ? "Weapon Power" : property, player);
    }


    updateContributions(data: Map<string, any>): void {
        const companions = data.get("companions") as Companion[];
        const eventShop = data.get("eventShop") as EventShop;
        const minehead = data.get("minehead") as Minehead;
        const sushi = data.get("sushi") as SushiStation;

        const multiplier = 1 + (
            this.depositedHats.length + (
                getCompanionActiveBonus(companions, 31) + 10 * Number(eventShop.isBonusOwned(30)) + (
                    minehead.getBonusFromIndex(21) + sushi.getBonusFromIndex(36)
                )
            )
        ) / 100;
        this.calculate(multiplier);
    }

    private calculate(multiplier: number): void {
        this.calculatedBonuses = undefined;
        const bonuses = new Map<string, number>();
        // Match the game's per-hat, per-channel multiplication order for precision.
        for (const name of this.depositedHats) {
            const effects = this.itemEffects.get(name);
            if (!effects) throw new Error(`Missing Hat Rack item definition ${name}`);
            for (const { effect, value } of effects) {
                bonuses.set(effect, (bonuses.get(effect) ?? 0) + multiplier * value);
            }
        }
        this.calculatedBonuses = bonuses;
    }
}

export const updateHatRack = (data: Map<string, any>): void => {
    const hatRack = data.get("hatRack") as HatRack;
    hatRack.updateContributions(data);
};
