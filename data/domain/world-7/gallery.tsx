import { Domain } from '../base/domain';
import type { RawData } from '../base/domain';
import type { Card } from '../cards';
import { getCompanionActiveBonus, isCompanionLevelTwo } from '../companions';
import type { Companion } from '../companions';
import type { EventShop } from '../eventShop';
import type { GemStore } from '../gemPurchases';
import type { Item } from '../items';
import type { Player } from '../player';
import type { Alchemy } from '../world-2/alchemy/alchemy';
import type { KillRoy } from '../world-2/killroy';
import type { Sailing } from '../world-5/sailing/sailing';
import type { Sneaking } from '../world-6/sneaking';
import type { Clamworks } from './clamworks';
import type { CoralReef } from './coralReef';
import type { LegendTalents } from './legendTalents';
import type { Spelunking } from './spelunking';
import type { SushiStation } from './sushi';

type ItemEffect = { effect: string; value: number };

export class GalleryTrophy {
    count = 0;

    constructor(public index: number, public internalName: string, public name: string) {}

    get obtained(): boolean { return this.count > 0; }
}

export class GalleryPodium {
    available = false;
    tier: 1 | 2 | 3 | 4 = 1;

    constructor(public index: number, public trophy?: GalleryTrophy) {}

    get multiplier(): number { return podiumTierMultipliers[this.tier - 1]; }
}

export class GalleryNametag {
    count = 0;

    constructor(public index: number, public internalName: string, public name: string) {}

    get stackMultiplier(): number {
        // Keep every deposited copy; only the first five improve its effect.
        return this.count >= 1 ? nametagStackFactors[Math.min(4, Math.round(this.count - 1))] : 0;
    }
}

export class Gallery extends Domain {
    trophies: GalleryTrophy[] = [];
    shelves: (GalleryTrophy | undefined)[] = [];
    podiums: GalleryPodium[] = [];
    nametags: GalleryNametag[] = [];
    private unlockKillsLeft: (number | undefined)[] = [];
    private itemEffects = new Map<string, ItemEffect[]>();
    private trophyBonuses = new Map<number, Map<string, number>>();
    private nametagBonuses = new Map<number, Map<string, number>>();

    isUnlocked(player: Player): boolean {
        // Access to the Gallery follows this character's portal, not account deposits.
        const killsLeft = this.unlockKillsLeft[player.playerID];
        return killsLeft !== undefined && killsLeft <= 0;
    }

    getRawKeys(): RawData[] {
        return [
            { key: 'Spelunk', perPlayer: false, default: [] },
            { key: 'KLA_', perPlayer: true, default: [] },
        ];
    }

    init(allItems: Item[], _charCount: number) {
        this.trophies = [];
        this.nametags = [];
        this.itemEffects.clear();
        for (const item of allItems) {
            if (!item.internalName.startsWith('Trophy') && !item.internalName.startsWith('EquipmentNametag')) continue;
            const trophy = /^Trophy(\d+)$/.exec(item.internalName);
            const nametag = /^EquipmentNametag(\d+)$/.exec(item.internalName);
            if (trophy) {
                this.trophies.push(new GalleryTrophy(Number(trophy[1]), item.internalName, item.displayName));
            } else if (item.internalName === 'EquipmentNametag6b' || (nametag && Number(nametag[1]) !== 6)) {
                this.nametags.push(new GalleryNametag(nametag ? Number(nametag[1]) : 6, item.internalName, item.displayName));
            }
            const effects: ItemEffect[] = [];
            for (const stat of item.itemStats) {
                if (stat.stoneName !== 'UQ1val' && stat.stoneName !== 'UQ2val') continue;
                // Items supplies unupgraded definition effects; keep exact labels,
                // including trailing dungeon markers, rather than substring matches.
                if (stat.extra && stat.extra !== '0') effects.push({ effect: stat.extra.toUpperCase(), value: stat.getValue() });
            }
            this.itemEffects.set(item.internalName, effects);
        }
        this.trophies.sort((a, b) => a.index - b.index);
        this.nametags.sort((a, b) => a.index - b.index);
        return this;
    }

    parse(data: Map<string, any>): void {
        const gallery = data.get(this.getDataKey()) as Gallery;
        const spelunk = data.get('Spelunk') as number[][];
        const trophiesByIndex = new Map(gallery.trophies.map(trophy => {
            trophy.count = 0;
            return [trophy.index, trophy] as const;
        }));
        const placements = spelunk[16] ?? [];
        const depositedTrophy = (slot: number): GalleryTrophy | undefined => {
            const value = placements[slot];
            if (!(value >= 1)) return undefined;
            const trophy = trophiesByIndex.get(Math.round(value));
            if (!trophy) throw new Error(`Missing Gallery item definition Trophy${Math.round(value)}`);
            trophy.count++;
            return trophy;
        };
        gallery.shelves = Array.from({ length: 48 }, (_, index) => depositedTrophy(index));
        gallery.podiums = Array.from({ length: Math.max(0, placements.length - 48) },
            (_, index) => new GalleryPodium(index, depositedTrophy(48 + index)));
        const nametagsByIndex = new Map(gallery.nametags.map(nametag => {
            nametag.count = 0;
            return [nametag.index, nametag] as const;
        }));
        (spelunk[17] ?? []).forEach((count, index) => {
            const nametag = nametagsByIndex.get(index);
            // Collection index 6 uses the alternate, non-replica definition.
            if (!nametag && count >= 1) {
                throw new Error(`Missing Gallery item definition EquipmentNametag${index === 6 ? '6b' : index}`);
            }
            if (nametag) nametag.count = count;
        });
        gallery.unlockKillsLeft = Array.from({ length: data.get('charCount') as number }, (_, index) =>
            (data.get(`KLA_${index}`) as number[][] | undefined)?.[250]?.[0]);
    }

    getTrophyBonus(bonus: string, player: Player): number {
        const bonuses = this.trophyBonuses.get(player.playerID);
        if (!bonuses) throw new Error(`Gallery contributions have not been calculated for player ${player.playerID}`);
        return bonuses.get(bonus) ?? 0;
    }

    getNametagBonus(bonus: string, player: Player): number {
        const bonuses = this.nametagBonuses.get(player.playerID);
        if (!bonuses) throw new Error(`Gallery contributions have not been calculated for player ${player.playerID}`);
        return bonuses.get(bonus) ?? 0;
    }

    updateContributions(data: Map<string, any>): void {
        const players = data.get('players') as Player[];
        const companions = data.get('companions') as Companion[];
        const clamworks = data.get('clamworks') as Clamworks;
        const killroy = (data.get('killroy') as KillRoy).podiumsOwnedLv2;
        const gems = (data.get('gems') as GemStore).purchases.find(purchase => purchase.no === 40)?.pucrhased ?? 0;
        const artifact = (data.get('sailing') as Sailing).artifacts.find(artifact => artifact.index === 33)?.status ?? 0;
        const legend = data.get('legendTalents') as LegendTalents;
        const eventShop = data.get('eventShop') as EventShop;
        const coralLevel = (data.get('coralReef') as CoralReef).upgrades.find(upgrade => upgrade.index === 4)?.level ?? 0;
        const alchemy = (data.get('alchemy') as Alchemy).getBubbleBonusForKey('Y13');
        const card = (data.get('cards') as Card[]).find(card => card.id === 'w7a11');
        // Gallery consumes card level, which includes the owned zero-star level.
        const cardLevel = card && card.count > 0 ? card.getLevels() + 1 : 0;
        const sushi = (data.get('sushi') as SushiStation).getBonusFromIndex(54);
        const jadePodium = (data.get('sneaking') as Sneaking).jadeUpgrades.find(upgrade => upgrade.index === 42)?.purchased ?? false;
        const tunnelLore = (data.get('spelunking') as Spelunking).tunnels[5].loreCompleted;

        const grade4 = Math.round(
            Math.min(1, getCompanionActiveBonus(companions, 28)) + Math.min(1, isCompanionLevelTwo(companions, 28))
            + (Number(eventShop.isBonusOwned(29)) + Math.min(1, Math.floor(artifact / 6)))
        );
        const grade3 = Math.round(Math.floor(gems / 3) + Math.min(1, Math.floor(artifact / 5)) + grade4);
        const grade2 = Math.round(
            2 * Number(clamworks.isBonusUnlocked(0)) + (Math.min(2, killroy)
                + (getCompanionActiveBonus(companions, 42) + Math.floor(gems / 2)
                    + (grade3 + (legend.getBonusFromIndex(9)
                        + Math.max(0, Math.min(2, Math.round(artifact) - 2) - Math.min(1, Math.floor(artifact / 5)))))))
        );
        const sharedScaling = 3 * Number(clamworks.isBonusUnlocked(7))
            + (killroy + (Math.min(20, alchemy) + (Math.min(cardLevel, 10) + (getCompanionActiveBonus(companions, 49) + sushi))));

        // Coral levels add a slot every four levels; tunnel-five lore adds two.
        const podiumCapacity = Math.min(19, 1 + (Math.ceil(coralLevel / 4)
            + (Number(jadePodium) + (Math.floor(gems)
                + (2 * Number(tunnelLore) + (Math.min(2, Math.round(artifact)) + Number(eventShop.isBonusOwned(26))))))));
        // Keep saved overflow assignments: physical capacity never gates contributions.
        while (this.podiums.length < podiumCapacity) this.podiums.push(new GalleryPodium(this.podiums.length));
        for (const podium of this.podiums) {
            podium.available = podium.index < podiumCapacity;
            // Lower-grade thresholds include higher grades; select the highest first.
            podium.tier = grade4 > podium.index ? 4 : grade3 > podium.index ? 3 : grade2 > podium.index ? 2 : 1;
        }

        this.trophyBonuses.clear();
        this.nametagBonuses.clear();
        for (const player of players) {
            // Trophy chips are character-specific even though the deposits are shared.
            const multiplier = 1 + (3 * coralLevel + (10 * player.getChipBonus('troph') + sharedScaling)) / 100;
            const trophyBonuses = new Map<string, number>();
            const nametagBonuses = new Map<string, number>();
            // Preserve save order and repeated deposits when accumulating effects.
            for (const trophy of this.shelves) {
                if (trophy) this.addItemEffects(trophyBonuses, trophy.internalName, 0.3 * multiplier);
            }
            for (const podium of this.podiums) {
                if (podium.trophy) this.addItemEffects(trophyBonuses, podium.trophy.internalName, podium.multiplier * multiplier);
            }
            for (const nametag of this.nametags) {
                if (nametag.count >= 1) this.addItemEffects(nametagBonuses, nametag.internalName, nametag.stackMultiplier * multiplier);
            }
            this.trophyBonuses.set(player.playerID, trophyBonuses);
            this.nametagBonuses.set(player.playerID, nametagBonuses);
        }
    }

    private addItemEffects(bonuses: Map<string, number>, name: string, multiplier: number): void {
        const effects = this.itemEffects.get(name);
        if (!effects) throw new Error(`Missing Gallery item definition ${name}`);
        for (const { effect, value } of effects) {
            // Multiply each definition channel before summing to preserve source precision.
            bonuses.set(effect, (bonuses.get(effect) ?? 0) + multiplier * value);
        }
    }
}

const nametagStackFactors = [1, 1.6, 2, 2.3, 2.5];
const podiumTierMultipliers = [1, 1.5, 2, 2.5];

export const updateGallery = (data: Map<string, any>): void => {
    (data.get('gallery') as Gallery).updateContributions(data);
};
