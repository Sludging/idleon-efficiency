import bundleCatalog from './bundleCatalog.json';
import { TypeGenEnum } from './enum/typeGenEnum';
import { StaticRepositories } from './repositories';

export type BundleCategory = 'bundle' | 'petMart' | 'starterOffer';
export type BundleContentCategory = 'bonuses' | 'pets' | 'items';
export type BundleRewardCategory = BundleContentCategory | 'equipment' | 'gems' | 'petCrystals' | 'otherResources';

export interface BundleAmount {
    amount: number;
}

/** Nominal displayed dollar amount, not minor units or a current checkout quote. */
export interface BundlePrice {
    amount: number;
    symbol: string;
    crossedOutAmount?: number;
}

export interface BundleGems extends BundleAmount {
    delivery: 'unspecified' | 'daily-total';
    dailyAmount?: number;
    durationDays?: number;
}

export interface BundleOtherCurrency {
    amount: number | null;
    name: string | null;
    detail?: string;
}

export interface BundleContent {
    name: string;
    quantity: number | null;
    itemId?: string;
    imageAvailable?: boolean;
    detail?: string;
    rewardCategories?: readonly BundleContentCategory[];
    rewardUnknown?: boolean;
}

export interface BundlePet {
    name: string;
    companionIndex: number;
    imageLocation: string;
    imageAvailable?: boolean;
}

export interface BundleArtworkImage {
    location: string;
    width: number;
    height: number;
}

export interface BundleCatalogEntry {
    nativeId: string;
    category: BundleCategory;
    name: string | null;
    price: BundlePrice | null;
    gems: BundleGems | null;
    petCrystals: BundleAmount | null;
    otherCurrencies: BundleOtherCurrency[];
    contents: BundleContent[];
    pets: BundlePet[];
    artwork: BundleArtworkImage | null;
}

/**
 * Maintained metadata from reviewed artwork and native offer records.
 * Null means unknown, not zero. Artwork benefits are advertised claims, not calculated effects.
 * Item identities and quantities use native source 1.24. Local artwork uses APK 2.540.0.
 * These source versions do not establish the same release.
 * Artwork locations identify published offer banners or complete starter offer images.
 * Pet and item image availability is independent of offer artwork.
 */
export const BUNDLE_CATALOG: readonly BundleCatalogEntry[] = bundleCatalog as BundleCatalogEntry[];

const equipmentTypes = new Set<TypeGenEnum>([
    TypeGenEnum.aWeapon, TypeGenEnum.aHelmet, TypeGenEnum.aHelmetMTX,
    TypeGenEnum.aShirt, TypeGenEnum.aPants, TypeGenEnum.aShoes,
    TypeGenEnum.aPendant, TypeGenEnum.aRing, TypeGenEnum.aChatRingMTX,
    TypeGenEnum.aCape, TypeGenEnum.aTrophy, TypeGenEnum.aKeychain,
    TypeGenEnum.aPick, TypeGenEnum.aHatchet, TypeGenEnum.aFishingRod,
    TypeGenEnum.aBugNet, TypeGenEnum.aSkull, TypeGenEnum.aTrap, TypeGenEnum.aDNAgun,
    TypeGenEnum.aNametag, TypeGenEnum.aGown,
]);
const catalogRepositories = new StaticRepositories();
let itemTypes: ReadonlyMap<string, TypeGenEnum> | undefined;

export function getBundleRewardCategories(entry: BundleCatalogEntry): ReadonlySet<BundleRewardCategory> {
    const categories = new Set<BundleRewardCategory>();
    if (entry.gems !== null && entry.gems.amount > 0) categories.add('gems');
    if (entry.petCrystals !== null && entry.petCrystals.amount > 0) categories.add('petCrystals');
    if (entry.pets.length > 0) categories.add('pets');
    if (entry.otherCurrencies.some(currency => currency.name !== null && currency.amount !== null && currency.amount > 0)) {
        categories.add('otherResources');
    }

    for (const content of entry.contents) {
        for (const category of content.rewardCategories ?? []) categories.add(category);
        if (!content.itemId) continue;

        itemTypes ??= new Map(catalogRepositories.get('Item').map(item => [item.id, item.data.item.typeGen]));
        const type = itemTypes.get(content.itemId);
        if (type === undefined) continue;
        categories.add(equipmentTypes.has(type) ? 'equipment' : 'items');
    }
    return categories;
}

export interface BundleAmountTotals {
    total: number | null;
    minimum: number | null;
    maximum: number | null;
    knownCount: number;
    unknownCount: number;
}

export interface BundlePriceTotals extends BundleAmountTotals {
    symbol: string;
}

export interface BundleCurrencyTotals extends BundleAmountTotals {
    currency: string;
    scheduledSubtotal: BundleAmountTotals | null;
}

export interface BundleTableTotals {
    mode: 'sum' | 'alternatives';
    entryCount: number;
    prices: BundlePriceTotals[];
    unknownPriceCount: number;
    currencies: BundleCurrencyTotals[];
    unknownRewardCount: number;
}

function emptyBundleAmountTotals(): BundleAmountTotals {
    return { total: 0, minimum: null, maximum: null, knownCount: 0, unknownCount: 0 };
}

function addBundleAmount(
    totals: BundleAmountTotals,
    amount: number | null,
    unknownCount = amount === null ? 1 : 0,
): void {
    totals.unknownCount += unknownCount;
    if (amount === null) return;

    totals.total! += amount;
    totals.minimum = totals.minimum === null ? amount : Math.min(totals.minimum, amount);
    totals.maximum = totals.maximum === null ? amount : Math.max(totals.maximum, amount);
    totals.knownCount += 1;
}

function finishBundleAmountTotals(totals: BundleAmountTotals, alternatives: boolean): void {
    if (alternatives || (totals.knownCount === 0 && totals.unknownCount > 0)) totals.total = null;
}

function addOfferCurrencyAmount(amounts: Map<string, BundleAmountTotals>, currency: string, amount: number | null): void {
    let totals = amounts.get(currency);
    if (totals === undefined) {
        totals = emptyBundleAmountTotals();
        amounts.set(currency, totals);
    }
    addBundleAmount(totals, amount);
}

/** Summarize only the offers supplied by the view, without inferring purchases or spending. */
export function calculateBundleTableTotals(entries: readonly BundleCatalogEntry[]): BundleTableTotals {
    const alternatives = entries.length > 0 && entries.every(entry => entry.category === 'starterOffer');
    const prices = new Map<string, BundlePriceTotals>();
    const scheduledGems = emptyBundleAmountTotals();
    const gems: BundleCurrencyTotals = {
        currency: 'Gems', ...emptyBundleAmountTotals(), scheduledSubtotal: scheduledGems,
    };
    const currencies = new Map<string, BundleCurrencyTotals>([
        ['Gems', gems],
        ['Pet Crystals', { currency: 'Pet Crystals', ...emptyBundleAmountTotals(), scheduledSubtotal: null }],
    ]);
    let unknownPriceCount = 0;
    let unknownRewardCount = 0;

    for (const entry of entries) {
        if (entry.price === null) {
            unknownPriceCount += 1;
        } else {
            let price = prices.get(entry.price.symbol);
            if (price === undefined) {
                price = { symbol: entry.price.symbol, ...emptyBundleAmountTotals() };
                prices.set(entry.price.symbol, price);
            }
            addBundleAmount(price, entry.price.amount);
        }

        const offerCurrencies = new Map<string, BundleAmountTotals>();
        addOfferCurrencyAmount(offerCurrencies, 'Gems', entry.gems?.amount ?? null);
        addOfferCurrencyAmount(offerCurrencies, 'Pet Crystals', entry.petCrystals?.amount ?? null);
        addBundleAmount(scheduledGems, entry.gems === null ? null
            : entry.gems.delivery === 'daily-total' ? entry.gems.amount : 0);

        let unknownReward = entry.contents.some(content => content.rewardUnknown === true);
        for (const currency of entry.otherCurrencies) {
            if (currency.name === null) {
                unknownReward = true;
                continue;
            }
            addOfferCurrencyAmount(offerCurrencies, currency.name, currency.amount);
            unknownReward ||= currency.amount === null;
        }
        if (unknownReward) unknownRewardCount += 1;

        // Combine each unit within its offer before comparing mutually exclusive offers.
        for (const [currency, offerAmounts] of offerCurrencies) {
            let totals = currencies.get(currency);
            if (totals === undefined) {
                totals = { currency, ...emptyBundleAmountTotals(), scheduledSubtotal: null };
                currencies.set(currency, totals);
            }
            addBundleAmount(totals, offerAmounts.knownCount === 0 ? null : offerAmounts.total, offerAmounts.unknownCount);
        }
    }

    for (const price of prices.values()) finishBundleAmountTotals(price, alternatives);
    for (const currency of currencies.values()) finishBundleAmountTotals(currency, alternatives);
    finishBundleAmountTotals(scheduledGems, alternatives);
    if ((scheduledGems.maximum ?? 0) === 0) gems.scheduledSubtotal = null;

    return {
        mode: alternatives ? 'alternatives' : 'sum',
        entryCount: entries.length,
        prices: Array.from(prices.values()),
        unknownPriceCount,
        currencies: Array.from(currencies.values()),
        unknownRewardCount,
    };
}
