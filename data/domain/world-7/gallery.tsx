import { Domain } from '../base/domain';
import type { RawData } from '../base/domain';
import type { Card } from '../cards';
import { getCompanionActiveBonus, isCompanionLevelTwo } from '../companions';
import type { Companion } from '../companions';
import type { EventShop } from '../eventShop';
import type { GemStore } from '../gemPurchases';
import type { Item } from '../items';
import type { ItemProperty } from '../equipment-effects';
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

import type { Account } from '../account';
import type { Storage } from '../storage';

export type GallerySourceContribution = {
    source: string;
    amount: number;
    active: boolean;
    /** Total source contribution after its next useful progression; not a lifetime maximum. */
    potentialAmount?: number;
    /** Source-specific contribution cap, where the source formula defines one. */
    cap?: number;
    unit: 'podiums';
};
export type GalleryTierThreshold = {
    /** Cumulative podium threshold; exact-grade counts come from getPodiumCount. */
    threshold: number;
    unit: 'podiums';
    sources: GallerySourceContribution[];
};

export type GalleryItemBonus = Readonly<{ channel: 'effect' | 'property'; name: string; value: number }>;

type ItemEffect = GalleryItemBonus;
type MutableGalleryItemBonus = { channel: GalleryItemBonus['channel']; name: string; value: number };
const gallerySource = (
    source: string,
    amount: number,
    potentialAmount?: number,
    cap?: number,
): GallerySourceContribution => ({
    source,
    amount,
    active: amount > 0,
    ...(potentialAmount !== undefined ? { potentialAmount } : {}),
    ...(cap !== undefined ? { cap } : {}),
    unit: 'podiums',
});


export class GalleryTrophy {
    count = 0;
    hasPendingDeposit = false;

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
    hasPendingDeposit = false;
    constructor(public index: number, public internalName: string, public name: string) {}

    get stackMultiplier(): number {
        // Keep every deposited copy; only the first five improve its effect.
        return this.count >= 1 ? nametagStackFactors[Math.min(4, Math.round(this.count - 1))] : 0;
    }
}

export class Gallery extends Domain {
    readonly shelfMultiplier = 0.3;
    readonly podiumCapacityCap = 19;
    podiumCapacity = 0;
    capacitySources: GallerySourceContribution[] = [];
    podiumTierSources: Record<2 | 3 | 4, GalleryTierThreshold> = {
        2: { threshold: 0, unit: 'podiums', sources: [] },
        3: { threshold: 0, unit: 'podiums', sources: [] },
        4: { threshold: 0, unit: 'podiums', sources: [] },
    };
    podiumGradeSources: Record<2 | 3 | 4, GallerySourceContribution[]> = {
        2: [],
        3: [],
        4: [],
    };
    trophies: GalleryTrophy[] = [];
    shelves: (GalleryTrophy | undefined)[] = [];
    podiums: GalleryPodium[] = [];
    nametags: GalleryNametag[] = [];
    private unlockKillsLeft: (number | undefined)[] = [];
    private itemEffects = new Map<string, ItemEffect[]>();
    private trophyBonuses = new Map<string, number>();
    private nametagBonuses = new Map<string, number>();
    private trophyItemBonuses = new Map<string, MutableGalleryItemBonus[]>();
    private nametagItemBonuses = new Map<string, MutableGalleryItemBonus[]>();
    private galleryCoralLevel = 0;
    private sharedScaling = 0;
    isUnlocked(player: Player): boolean {
        // Access to the Gallery follows this character's portal, not account deposits.
        const killsLeft = this.unlockKillsLeft[player.playerID];
        return killsLeft !== undefined && killsLeft <= 0;
    }

    getPodiumCount(tier: GalleryPodium['tier']): number {
        return this.podiums.reduce(
            (count, podium) => count + Number(podium.available && podium.tier === tier),
            0,
        );
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
        this.shelves = Array.from({ length: 48 });
        const startingPodium = new GalleryPodium(0);
        startingPodium.available = true;
        this.podiums = [startingPodium];
        this.podiumCapacity = 1;
        this.capacitySources = [gallerySource('base', 1, undefined, 1)];
        this.podiumTierSources = {
            2: { threshold: 0, unit: 'podiums', sources: [] },
            3: { threshold: 0, unit: 'podiums', sources: [] },
            4: { threshold: 0, unit: 'podiums', sources: [] },
        };
        this.podiumGradeSources = { 2: [], 3: [], 4: [] };
        this.unlockKillsLeft = [];
        this.itemEffects.clear();
        this.trophyBonuses.clear();
        this.nametagBonuses.clear();
        this.trophyItemBonuses.clear();
        this.nametagItemBonuses.clear();
        this.galleryCoralLevel = 0;
        this.sharedScaling = 0;
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
                if (stat.extra && stat.extra !== '0') effects.push({ channel: 'effect', name: stat.extra.toUpperCase(), value: stat.getValue() });
            }
            this.itemEffects.set(item.internalName, effects);
            // Raw replacement properties use the same deposit scaling as unique effects.
            effects.push(
                { channel: 'property', name: 'Weapon_Power', value: item.weaponPower },
                { channel: 'property', name: 'STR', value: item.str },
                { channel: 'property', name: 'AGI', value: item.agi },
                { channel: 'property', name: 'WIS', value: item.wis },
                { channel: 'property', name: 'LUK', value: item.luk },
                { channel: 'property', name: 'Defence', value: item.defence },
            );
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
        return (this.trophyBonuses.get(bonus) ?? 0) * this.getBonusMultiplier(player);
    }

    getBonusMultiplier(player: Player): number {
        return 1 + (3 * this.galleryCoralLevel + (10 * player.getChipBonus('troph') + this.sharedScaling)) / 100;
    }

    getCombinedBonus(bonus: string, player: Player): number {
        const trophyBonus = this.getTrophyBonus(bonus, player);
        const nametagBonus = this.getNametagBonus(bonus, player);
        return this.isUnlocked(player) ? trophyBonus + nametagBonus : 0;
    }

    getCombinedBonusForChip(bonus: string, silkrodeMotherboard: boolean): number {
        const baseBonus = (this.trophyBonuses.get(bonus) ?? 0) + (this.nametagBonuses.get(bonus) ?? 0);
        return baseBonus * this.getBonusMultiplierForChip(silkrodeMotherboard);
    }

    getNametagBonus(bonus: string, player: Player): number {
        return (this.nametagBonuses.get(bonus) ?? 0) * this.getBonusMultiplier(player);
    }

    getTrophyItemBonuses(trophy: GalleryTrophy, player: Player): readonly GalleryItemBonus[] {
        const multiplier = this.getBonusMultiplier(player);
        return this.isUnlocked(player) ? this.scaleItemBonuses(this.trophyItemBonuses.get(trophy.internalName) ?? [], multiplier) : [];
    }

    getNametagItemBonuses(nametag: GalleryNametag, player: Player): readonly GalleryItemBonus[] {
        const multiplier = this.getBonusMultiplier(player);
        return this.isUnlocked(player) ? this.scaleItemBonuses(this.nametagItemBonuses.get(nametag.internalName) ?? [], multiplier) : [];
    }

    getTrophyItemBonusesForChip(trophy: GalleryTrophy, silkrodeMotherboard: boolean): readonly GalleryItemBonus[] {
        const multiplier = this.getBonusMultiplierForChip(silkrodeMotherboard);
        const deposited = this.trophyItemBonuses.get(trophy.internalName);
        return deposited
            ? this.scaleItemBonuses(deposited, multiplier)
            : this.scaleItemBonuses(this.itemEffects.get(trophy.internalName) ?? [], this.shelfMultiplier * multiplier);
    }

    getNametagItemBonusesForChip(nametag: GalleryNametag, silkrodeMotherboard: boolean): readonly GalleryItemBonus[] {
        const multiplier = this.getBonusMultiplierForChip(silkrodeMotherboard);
        const deposited = this.nametagItemBonuses.get(nametag.internalName);
        return deposited
            ? this.scaleItemBonuses(deposited, multiplier)
            : this.scaleItemBonuses(this.itemEffects.get(nametag.internalName) ?? [], multiplier);
    }

    getBonusMultiplierForChip(silkrodeMotherboard: boolean): number {
        return 1 + (3 * this.galleryCoralLevel + (10 * Number(silkrodeMotherboard) + this.sharedScaling)) / 100;
    }

    getTrophyProperty(property: ItemProperty, player: Player): number {
        const multiplier = this.getBonusMultiplier(player);
        return this.isUnlocked(player) ? (this.trophyBonuses.get(property) ?? 0) * multiplier : 0;
    }

    getNametagProperty(property: ItemProperty, player: Player): number {
        const multiplier = this.getBonusMultiplier(player);
        return this.isUnlocked(player) ? (this.nametagBonuses.get(property) ?? 0) * multiplier : 0;
    }

    private scaleItemBonuses(bonuses: readonly GalleryItemBonus[], multiplier: number): GalleryItemBonus[] {
        return bonuses.map(bonus => ({ ...bonus, value: bonus.value * multiplier }));
    }


    updateContributions(data: Map<string, any>): void {
        const companions = data.get('companions') as Companion[];
        const clamworks = data.get('clamworks') as Clamworks;
        const killroy = (data.get('killroy') as KillRoy).podiumsOwnedLv2;
        const gemsPurchase = (data.get('gems') as GemStore).purchases.find(purchase => purchase.no === 40);
        const gems = gemsPurchase?.pucrhased ?? 0;
        const sailingArtifact = (data.get('sailing') as Sailing).artifacts.find(artifact => artifact.index === 33);
        const artifact = sailingArtifact?.status ?? 0;
        const legend = data.get('legendTalents') as LegendTalents;
        const legendTalent9 = legend.talents.find(talent => talent.index === 9);
        const eventShop = data.get('eventShop') as EventShop;
        const eventBonus26 = eventShop.bonuses.find(bonus => bonus.index === 26);
        const eventBonus29 = eventShop.bonuses.find(bonus => bonus.index === 29);
        const coralReefUpgrade = (data.get('coralReef') as CoralReef).upgrades.find(upgrade => upgrade.index === 4);
        const coralLevel = coralReefUpgrade?.level ?? 0;
        const alchemy = (data.get('alchemy') as Alchemy).getBubbleBonusForKey('Y13');
        const card = (data.get('cards') as Card[]).find(card => card.id === 'w7a11');
        const sushi = (data.get('sushi') as SushiStation).getBonusFromIndex(54);
        // Gallery consumes card level, which includes the owned zero-star level.
        const cardLevel = card && card.count > 0 ? card.getLevels() : 0;
        const companion28 = companions.find(companion => companion.id === 28);
        const companion42 = companions.find(companion => companion.id === 42);
        const bundleM = (data.get('account') as Account).hasBundleM;
        const jadeUpgrade = (data.get('sneaking') as Sneaking).jadeUpgrades.find(upgrade => upgrade.index === 42);
        const jadePodium = jadeUpgrade?.purchased ?? false;
        const tunnelLore = (data.get('spelunking') as Spelunking).tunnels[5].loreCompleted;
        const nextGemContribution = (divisor: number): number | undefined => {
            if (!gemsPurchase) return undefined;
            const nextPurchaseCount = divisor * (Math.floor(gems / divisor) + 1);
            return nextPurchaseCount <= gemsPurchase.maxPurchases ? nextPurchaseCount / divisor : undefined;
        };
        const nextCoralContribution = (): number | undefined => {
            if (!coralReefUpgrade || coralReefUpgrade.isMaxed()) return undefined;
            const nextUsefulLevel = coralLevel === 0 ? 1 : 4 * Math.floor((coralLevel - 1) / 4) + 5;
            return nextUsefulLevel <= coralReefUpgrade.getMaxLevel() ? Math.ceil(nextUsefulLevel / 4) : undefined;
        };
        const nextArtifactTierContribution = (tier: number): number | undefined =>
            sailingArtifact && Number(artifact) < tier ? 1 : undefined;
        const artifactResidualAt = (status: number): number =>
            Math.max(0, Math.min(2, Math.round(status) - 2) - Math.min(1, Math.floor(status / 5)));
        const currentArtifactResidual = artifactResidualAt(Number(artifact));
        const artifactStatus = Math.round(Number(artifact));
        const nextArtifactResidual = !sailingArtifact
            ? undefined
            : artifactStatus <= 2
                ? artifactResidualAt(3)
                : artifactStatus === 3
                    ? artifactResidualAt(4)
                    : undefined;
        const nextLegendTalentBonus = legendTalent9 && legendTalent9.level < legendTalent9.data.maxLevel
            ? legendTalent9.getBonus(legendTalent9.level + 1)
            : undefined;

        const companion28Bonus = getCompanionActiveBonus(companions, 28);
        const grade4Sources = [
            gallerySource('companion28', Math.min(1, companion28Bonus),
                companion28Bonus > 0 ? undefined : Math.min(1, companion28?.data.bonus ?? 0) || undefined, 1),
            gallerySource('companionLevelTwo28', Math.min(1, Number(isCompanionLevelTwo(companions, 28))),
                companion28 && !isCompanionLevelTwo(companions, 28) ? 1 : undefined, 1),
            gallerySource('eventShopBonus29', Number(eventShop.isBonusOwned(29)),
                eventBonus29 && !eventBonus29.owned ? 1 : undefined, 1),
            gallerySource('artifact33Tier6', Math.min(1, Math.floor(Number(artifact) / 6)),
                nextArtifactTierContribution(6), 1),
            gallerySource('artifact33Tier7', Math.min(1, Math.floor(Number(artifact) / 7)),
                nextArtifactTierContribution(7), 1),
            gallerySource('bundleM', Number(bundleM), bundleM ? undefined : 1, 1),
        ];
        const grade4 = Math.round(grade4Sources.reduce((total, source) => total + source.amount, 0));
        const grade3Sources = [
            gallerySource('gemPurchase40Thirds', Math.floor(gems / 3), nextGemContribution(3)),
            gallerySource('artifact33Tier5', Math.min(1, Math.floor(Number(artifact) / 5)),
                nextArtifactTierContribution(5), 1),
            gallerySource('grade4Threshold', grade4),
        ];
        const grade3 = Math.round(grade3Sources.reduce((total, source) => total + source.amount, 0));
        const clamworksBonus0 = clamworks.isBonusUnlocked(0);
        const companion42Bonus = getCompanionActiveBonus(companions, 42);
        const companion42Potential = companion42?.bonusTokenActive
            ? undefined
            : companion42?.owned
                ? (companion42.level < 2 && (companion42.data.bonus2 ?? 0) > companion42Bonus
                    ? companion42.data.bonus2
                    : undefined)
                : companion42?.data.bonus;
        const grade2Sources = [
            gallerySource('clamworksBonus0', 2 * Number(clamworksBonus0), clamworksBonus0 ? undefined : 2, 2),
            gallerySource('killroyPodiumsLevel2', Math.min(2, killroy), undefined, 2),
            gallerySource('companion42', companion42Bonus, companion42Potential),
            gallerySource('gemPurchase40Halves', Math.floor(gems / 2), nextGemContribution(2)),
            gallerySource('grade3Threshold', grade3),
            gallerySource('legendTalent9', legend.getBonusFromIndex(9), nextLegendTalentBonus),
            gallerySource('artifact33Residual', currentArtifactResidual, nextArtifactResidual, 2),
        ];
        const grade2 = Math.round(grade2Sources.reduce((total, source) => total + source.amount, 0));
        this.podiumTierSources = {
            2: { threshold: grade2, unit: 'podiums', sources: grade2Sources },
            3: { threshold: grade3, unit: 'podiums', sources: grade3Sources },
            4: { threshold: grade4, unit: 'podiums', sources: grade4Sources },
        };
        this.podiumGradeSources = {
            2: grade2Sources.filter(source => source.source !== 'grade3Threshold'),
            3: grade3Sources.filter(source => source.source !== 'grade4Threshold'),
            4: grade4Sources,
        };
        const sharedScaling = 3 * Number(clamworks.isBonusUnlocked(7))
            + (killroy + (Math.min(20, alchemy) + (Math.min(cardLevel, 10) + (getCompanionActiveBonus(companions, 49) + sushi))));
        const coralPotential = nextCoralContribution();
        const gemCapacityPotential = nextGemContribution(1);
        const sailingCapacity = Math.min(2, Math.round(Number(artifact)));
        this.capacitySources = [
            gallerySource('base', 1, undefined, 1),
            gallerySource('coralReefUpgrade4', Math.ceil(coralLevel / 4), coralPotential),
            gallerySource('jadeUpgrade42', Number(jadePodium), jadeUpgrade && !jadePodium ? 1 : undefined, 1),
            gallerySource('gemPurchase40', Math.floor(gems), gemCapacityPotential),
            gallerySource('lunarheimLore5', 2 * Number(tunnelLore), tunnelLore ? undefined : 2, 2),
            gallerySource('sailingArtifact33', sailingCapacity,
                sailingArtifact && sailingCapacity < 2 ? sailingCapacity + 1 : undefined, 2),
            gallerySource('eventShopBonus26', Number(eventShop.isBonusOwned(26)),
                eventBonus26 && !eventBonus26.owned ? 1 : undefined, 1),
        ];
        const podiumCapacity = Math.min(this.podiumCapacityCap,
            this.capacitySources.reduce((total, source) => total + source.amount, 0));
        this.podiumCapacity = podiumCapacity;
        // Keep saved overflow assignments: physical capacity never gates contributions.
        while (this.podiums.length < podiumCapacity) this.podiums.push(new GalleryPodium(this.podiums.length));
        for (const podium of this.podiums) {
            podium.available = podium.index < podiumCapacity;
            // Lower-grade thresholds include higher grades; select the highest first.
            podium.tier = grade4 > podium.index ? 4 : grade3 > podium.index ? 3 : grade2 > podium.index ? 2 : 1;
        }
        const storage = data.get('storage') as Storage;
        const bagCounts = new Map<string, number>();
        const galleryItemNames = new Set([
            ...this.trophies.map(trophy => trophy.internalName),
            ...this.nametags.map(nametag => nametag.internalName),
        ]);
        for (const bag of storage.playerStorage) {
            for (const item of bag) {
                if (item.count <= 0 || !galleryItemNames.has(item.internalName)) continue;
                bagCounts.set(item.internalName, (bagCounts.get(item.internalName) ?? 0) + item.count);
            }
        }
        for (const trophy of this.trophies) {
            trophy.hasPendingDeposit = (bagCounts.get(trophy.internalName) ?? 0) > 0 && trophy.count === 0;
        }
        for (const nametag of this.nametags) {
            nametag.hasPendingDeposit = (bagCounts.get(nametag.internalName) ?? 0) > 0 && nametag.count < 5;
        }


        this.trophyBonuses.clear();
        this.nametagBonuses.clear();
        this.trophyItemBonuses.clear();
        this.nametagItemBonuses.clear();
        for (const trophy of this.shelves) {
            if (trophy) this.addItemEffects(this.trophyBonuses, this.trophyItemBonuses, trophy.internalName, this.shelfMultiplier);
        }
        for (const podium of this.podiums) {
            if (podium.trophy) this.addItemEffects(this.trophyBonuses, this.trophyItemBonuses, podium.trophy.internalName, podium.multiplier);
        }
        for (const nametag of this.nametags) {
            if (nametag.count >= 1) this.addItemEffects(this.nametagBonuses, this.nametagItemBonuses, nametag.internalName, nametag.stackMultiplier);
        }
        this.galleryCoralLevel = coralLevel;
        this.sharedScaling = sharedScaling;
    }

    private addItemEffects(
        bonuses: Map<string, number>,
        itemBonuses: Map<string, MutableGalleryItemBonus[]>,
        name: string,
        factor: number,
    ): void {
        const effects = this.itemEffects.get(name);
        if (!effects) throw new Error(`Missing Gallery item definition ${name}`);
        let itemContributions = itemBonuses.get(name);
        if (!itemContributions) {
            itemContributions = [];
            itemBonuses.set(name, itemContributions);
        }
        for (const { channel, name: bonusName, value } of effects) {
            // Apply placement or stack factors before later character scaling.
            const contribution = factor * value;
            bonuses.set(bonusName, (bonuses.get(bonusName) ?? 0) + contribution);
            const existing = itemContributions.find(bonus => bonus.channel === channel && bonus.name === bonusName);
            if (existing) {
                existing.value += contribution;
            } else {
                itemContributions.push({ channel, name: bonusName, value: contribution });
            }
        }
    }

}

const nametagStackFactors = [1, 1.6, 2, 2.3, 2.5];
const podiumTierMultipliers = [1, 1.5, 2, 2.5];

export const updateGallery = (data: Map<string, any>): void => {
    (data.get('gallery') as Gallery).updateContributions(data);
};
