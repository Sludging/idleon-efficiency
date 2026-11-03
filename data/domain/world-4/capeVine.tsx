import { Domain } from '../base/domain';
import type { RawData } from '../base/domain';
import { getCompanionActiveBonus } from '../companions';
import type { Companion } from '../companions';
import type { ItemProperty } from '../equipment-effects';
import { TypeGenEnum } from '../enum/typeGenEnum';
import type { Item } from '../items';
import type { StatItemModel } from '../model/statItemModel';
import type { Player } from '../player';
import type { HatRack } from '../world-7/hatRack';

export type CapeVineItemBonus = Readonly<{ effect: string; value: number }>;
const emptyCapeBonuses: readonly CapeVineItemBonus[] = [];

export class CapeVineCape {
    stored = false;
    slot: number | undefined;
    golden = false;
    multiplier = 0;
    readonly effects: CapeVineItemBonus[] = [];
    readonly properties: CapeVineItemBonus[];

    constructor(public internalName: string, public name: string, public item: Item) {
        for (const stat of item.itemStats) {
            if ((stat.stoneName === 'UQ1val' || stat.stoneName === 'UQ2val') && stat.extra && stat.extra !== '0') {
                this.effects.push({ effect: stat.extra.toUpperCase(), value: stat.getValue() });
            }
        }
        this.properties = [
            { effect: 'Weapon Power', value: item.weaponPower },
            { effect: 'STR', value: item.str },
            { effect: 'AGI', value: item.agi },
            { effect: 'WIS', value: item.wis },
            { effect: 'LUK', value: item.luk },
            { effect: 'Defence', value: item.defence },
        ];
    }
}

export class CapeVine extends Domain {
    capes: CapeVineCape[] = [];
    claimedGoldenSlots = 0;
    premiumGoldenSlots = false;
    eligibleClaimants: { name: string; level: number }[] = [];
    unlockedPlayers: string[] = [];
    private depositedCapes: string[] = [];
    private unlockKillsLeft: (number | undefined)[] = [];
    private capeDefinitions = new Map<string, CapeVineCape>();
    private capeItemBonuses = new Map<string, CapeVineItemBonus[]>();
    private calculatedBonuses = new Map<string, number>();
    private bonusMultiplier = 1;

    getRawKeys(): RawData[] {
        return [
            { key: 'Spelunk', perPlayer: false, default: [] },
            { key: 'OptLacc', perPlayer: false, default: [] },
            { key: 'BundlesReceived', perPlayer: false, default: {} },
            { key: 'KLA_', perPlayer: true, default: [] },
        ];
    }

    init(allItems: Item[], _charCount: number): CapeVine {
        this.capes = [];
        this.capeDefinitions.clear();
        for (const item of allItems) {
            if (item.typeGen !== TypeGenEnum.aCape) continue;
            const cape = new CapeVineCape(item.internalName, item.displayName, item);
            this.capeDefinitions.set(item.internalName, cape);
            // Lava Wings can be deposited, but the in-game collection list omits them.
            if (item.internalName !== 'EquipmentCape1' && (item.data.item as StatItemModel).lvReqToCraft !== 69420) {
                this.capes.push(cape);
            }
        }
        this.resetContributions();
        return this;
    }

    parse(data: Map<string, unknown>): void {
        const capeVine = data.get(this.getDataKey()) as CapeVine;
        const spelunk = (data.get('Spelunk') ?? []) as unknown[][];
        const depositedCapes = spelunk[54];
        // Saved positions decide golden status. Never infer deposits from the obtained-item log.
        capeVine.depositedCapes = Array.isArray(depositedCapes) ? [...depositedCapes] as string[] : [];
        const options = (data.get('OptLacc') ?? []) as (number | string)[];
        const bundles = data.get('BundlesReceived') as Record<string, number> | undefined;
        capeVine.claimedGoldenSlots = Number(options[669] ?? 0);
        capeVine.premiumGoldenSlots = Number(bundles?.ban_o) === 1;
        const charCount = data.get('charCount') as number;
        capeVine.unlockKillsLeft = Array.from({ length: charCount }, (_, index) =>
            (data.get(`KLA_${index}`) as number[][] | undefined)?.[100]?.[0]);
        for (const cape of capeVine.capeDefinitions.values()) {
            const slot = capeVine.depositedCapes.indexOf(cape.internalName);
            cape.stored = slot !== -1;
            cape.slot = cape.stored ? slot : undefined;
            cape.golden = cape.stored && slot < capeVine.getGoldenSlotCount();
        }
        capeVine.resetContributions();
    }

    private resetContributions(): void {
        this.capeItemBonuses.clear();
        this.calculatedBonuses.clear();
        this.bonusMultiplier = 1;
        this.eligibleClaimants = [];
        this.unlockedPlayers = [];
        for (const cape of this.capeDefinitions.values()) {
            cape.multiplier = 0;
        }
    }

    getDepositedCapeNames(): readonly string[] {
        return this.depositedCapes;
    }

    getDepositedCapeCount(): number {
        return this.depositedCapes.length;
    }

    getGoldenSlotCount(): number {
        return Math.round(1 + this.claimedGoldenSlots + 3 * Number(this.premiumGoldenSlots));
    }

    getDepositedCapes(): readonly CapeVineCape[] {
        const capes: CapeVineCape[] = [];
        for (const name of this.depositedCapes) {
            const cape = this.capeDefinitions.get(name);
            if (cape) capes.push(cape);
        }
        return capes;
    }

    getNextClaimLevel(): number {
        return Math.round(1000 + 500 * this.claimedGoldenSlots);
    }

    isClaimReady(): boolean {
        return this.eligibleClaimants.length > 0;
    }

    getBonusMultiplier(): number {
        return this.bonusMultiplier;
    }

    getAccountBonuses(): ReadonlyMap<string, number> {
        return this.calculatedBonuses;
    }

    getCapeItemBonuses(cape: CapeVineCape): readonly CapeVineItemBonus[] {
        return this.capeItemBonuses.get(cape.internalName) ?? emptyCapeBonuses;
    }

    isUnlocked(player: Player): boolean {
        const killsLeft = this.unlockKillsLeft[player.playerID];
        return killsLeft !== undefined && killsLeft <= 0;
    }

    getBonus(effect: string, player: Player): number {
        return this.isUnlocked(player) ? this.calculatedBonuses.get(effect) ?? 0 : 0;
    }

    getProperty(property: ItemProperty, player: Player): number {
        return this.getBonus(property === 'Weapon_Power' ? 'Weapon Power' : property, player);
    }

    updateContributions(data: Map<string, unknown>): void {
        const companions = data.get('companions') as Companion[];
        const hatRack = data.get('hatRack') as HatRack;
        const players = data.get('players') as Player[];
        this.resetContributions();
        // Look up Catherine by her bonus ID, not her position in the companion list.
        this.bonusMultiplier = 1 + (this.depositedCapes.length + getCompanionActiveBonus(companions, 105)) / 100;
        this.eligibleClaimants = players.filter(player => player.level >= this.getNextClaimLevel())
            .map(player => ({ name: player.playerName, level: player.level }));
        this.unlockedPlayers = players.filter(player => this.isUnlocked(player)).map(player => player.playerName);
        const hatBonuses = hatRack.getAccountBonuses();
        let finalCape: CapeVineCape | undefined;
        for (const [slot, name] of this.depositedCapes.entries()) {
            const cape = this.capeDefinitions.get(name);
            if (!cape) {
                console.log('Missing Cape Vine item definition', name);
                continue;
            }
            cape.golden = slot < this.getGoldenSlotCount();
            // Ordinary slots grant 25% of item bonuses, despite the 20% in-game help text.
            const multiplier = (cape.golden ? 1 : 0.25) * this.bonusMultiplier;
            cape.multiplier = multiplier;
            const itemBonuses = this.capeItemBonuses.get(name) ?? [];
            for (const { effect, value } of cape.effects) {
                const contribution = multiplier * value;
                this.calculatedBonuses.set(effect, (this.calculatedBonuses.get(effect) ?? 0) + contribution);
                itemBonuses.push({ effect, value: contribution });
            }
            for (const { effect, value } of cape.properties) {
                const contribution = multiplier * value;
                // Each cape overwrites base properties with Hat Rack totals plus its own bonuses.
                // Only the final cape's base properties in slot order remain. Unique effects still accumulate.
                this.calculatedBonuses.set(effect, (hatBonuses.get(effect) ?? 0) + contribution);
            }
            this.capeItemBonuses.set(name, itemBonuses);
            finalCape = cape;
        }
        // Item details exclude overwritten properties and inherited Hat Rack totals.
        if (finalCape) {
            const itemBonuses = this.capeItemBonuses.get(finalCape.internalName)!;
            for (const { effect, value } of finalCape.properties) {
                itemBonuses.push({ effect, value: finalCape.multiplier * value });
            }
        }
    }
}

export const updateCapeVine = (data: Map<string, unknown>): void => {
    const capeVine = data.get('capeVine') as CapeVine;
    capeVine.updateContributions(data);
};
