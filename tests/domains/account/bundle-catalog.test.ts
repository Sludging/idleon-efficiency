import { BundleOwnership } from '../../../data/domain/bundleOwnership';
import {
  calculateBundleTableTotals,
  getBundleRewardCategories,
  type BundleCatalogEntry,
} from '../../../data/domain/bundleCatalog';

function controlledOffer(values: Partial<BundleCatalogEntry> = {}): BundleCatalogEntry {
  return {
    nativeId: 'controlled-offer',
    category: 'bundle',
    name: 'Controlled offer',
    price: null,
    gems: null,
    petCrystals: null,
    otherCurrencies: [],
    contents: [],
    pets: [],
    artwork: null,
    ...values,
  };
}

describe('Bundle catalog ownership - CORE', () => {

  it('keeps unavailable ownership unknown instead of reporting missing offers', () => {
    // No save is synthesized or parsed. This is the aspect's pre-load state.
    const ownership = new BundleOwnership();
    const bundles = ownership.getCategorySummary('bundle');
    const starter = ownership.getCategorySummary('starterOffer');

    expect(ownership.getOwnership('bon_q')).toBe('unknown');
    expect(bundles).toEqual({ ownedCount: 0, unownedCount: 0, unknownCount: 61, totalCount: 61 });
    expect(starter).toEqual({ ownedCount: 0, unownedCount: 0, unknownCount: 1, totalCount: 1 });
  });

});

describe('Filtered bundle offer totals - CORE', () => {
  it('counts a daily Gem schedule once and excludes envelope maxima and pet power', () => {
    const totals = calculateBundleTableTotals([
      controlledOffer({
        gems: { amount: 4200, delivery: 'daily-total', dailyAmount: 350, durationDays: 12 },
        contents: [
          { name: 'Gem Envelopes', quantity: 100, detail: 'Up to 10,000 Gems.', rewardCategories: ['items'] },
          { name: 'Pet Tournament Power: 160', quantity: null, rewardCategories: ['bonuses'] },
        ],
      }),
      controlledOffer({ gems: { amount: 800, delivery: 'unspecified' } }),
    ]);

    expect(totals.currencies.find(currency => currency.currency === 'Gems')).toMatchObject({
      total: 5000,
      scheduledSubtotal: { total: 4200 },
    });
  });

  it('keeps mixed price symbols separate and reports unknown parts beside known amounts', () => {
    const totals = calculateBundleTableTotals([
      controlledOffer({
        price: { symbol: '$', amount: 4.99, crossedOutAmount: 99.99 },
        gems: { amount: 600, delivery: 'unspecified' },
        petCrystals: { amount: 120 },
      }),
      controlledOffer({ price: { symbol: '€', amount: 8.99 } }),
      controlledOffer({
        contents: [{ name: 'Unknown reward', quantity: null, rewardCategories: [], rewardUnknown: true }],
        otherCurrencies: [{ name: null, amount: 160 }],
      }),
    ]);

    expect(totals.prices).toEqual([
      { symbol: '$', total: 4.99, minimum: 4.99, maximum: 4.99, knownCount: 1, unknownCount: 0 },
      { symbol: '€', total: 8.99, minimum: 8.99, maximum: 8.99, knownCount: 1, unknownCount: 0 },
    ]);
    expect(totals.unknownPriceCount).toBe(1);
    expect(totals.unknownRewardCount).toBe(1);
    expect(totals.currencies.find(currency => currency.currency === 'Pet Crystals')).toMatchObject({
      total: 120, knownCount: 1, unknownCount: 2,
    });
    expect(totals.currencies.find(currency => currency.currency === 'Gems')).toMatchObject({
      total: 600, knownCount: 1, unknownCount: 2,
    });
    expect(totals.currencies).toHaveLength(2);
  });

  it('compares visible Starter Pack alternatives without adding their prices or rewards', () => {
    const totals = calculateBundleTableTotals([
      controlledOffer({
        category: 'starterOffer', price: { symbol: '$', amount: 3 },
        gems: { amount: 200, delivery: 'unspecified' }, petCrystals: { amount: 40 },
      }),
      controlledOffer({
        category: 'starterOffer', price: { symbol: '$', amount: 7 },
        gems: { amount: 600, delivery: 'unspecified' }, petCrystals: { amount: 90 },
      }),
    ]);

    expect(totals.mode).toBe('alternatives');
    expect(totals.entryCount).toBe(2);
    expect(totals.prices[0]).toMatchObject({ total: null, minimum: 3, maximum: 7 });
    expect(totals.currencies.find(currency => currency.currency === 'Gems')).toMatchObject({
      total: null, minimum: 200, maximum: 600,
    });
    expect(totals.currencies.find(currency => currency.currency === 'Pet Crystals')).toMatchObject({
      total: null, minimum: 40, maximum: 90,
    });
  });

  it('compares equal Gem offers across delivery schedules without adding independent ranges', () => {
    const totals = calculateBundleTableTotals([
      controlledOffer({ category: 'starterOffer', gems: { amount: 600, delivery: 'unspecified' } }),
      controlledOffer({
        category: 'starterOffer',
        gems: { amount: 600, delivery: 'daily-total', dailyAmount: 100, durationDays: 6 },
      }),
    ]);

    expect(totals.currencies.find(currency => currency.currency === 'Gems')).toMatchObject({
      total: null, minimum: 600, maximum: 600, knownCount: 2, unknownCount: 0,
      scheduledSubtotal: { total: null, minimum: 0, maximum: 600 },
    });
  });

  it('combines resource amounts within each alternative before finding its range', () => {
    const totals = calculateBundleTableTotals([
      controlledOffer({
        category: 'starterOffer',
        otherCurrencies: [
          { name: 'Prisma Bubble fragments', amount: 20 },
          { name: 'Prisma Bubble fragments', amount: 10 },
        ],
      }),
      controlledOffer({
        category: 'starterOffer',
        otherCurrencies: [{ name: 'Prisma Bubble fragments', amount: 30 }],
      }),
    ]);

    expect(totals.currencies.find(currency => currency.currency === 'Prisma Bubble fragments')).toMatchObject({
      total: null, minimum: 30, maximum: 30, knownCount: 2, unknownCount: 0,
    });
  });

  it('sums Prisma fragments separately from Gems and reports partial totals for unknown amounts', () => {
    const totals = calculateBundleTableTotals([
      controlledOffer({ otherCurrencies: [{ name: 'Prisma Bubble fragments', amount: 20 }] }),
      controlledOffer({ otherCurrencies: [{ name: 'Prisma Bubble fragments', amount: 10 }] }),
      controlledOffer({ otherCurrencies: [{ name: 'Prisma Bubble fragments', amount: null }] }),
    ]);

    expect(totals.currencies.find(currency => currency.currency === 'Prisma Bubble fragments')).toMatchObject({
      total: 30, knownCount: 2, unknownCount: 1,
    });
    expect(totals.currencies.find(currency => currency.currency === 'Gems')).toMatchObject({
      total: null, knownCount: 0, unknownCount: 3,
    });
    expect(totals.unknownRewardCount).toBe(1);
  });

  it('keeps the exact amount when only one Starter Pack variant remains visible', () => {
    const totals = calculateBundleTableTotals([
      controlledOffer({
        category: 'starterOffer', price: { symbol: '$', amount: 3 },
        gems: { amount: 600, delivery: 'unspecified' },
      }),
    ]);

    expect(totals.prices[0]).toMatchObject({ total: null, minimum: 3, maximum: 3 });
    expect(totals.currencies.find(currency => currency.currency === 'Gems')).toMatchObject({
      total: null, minimum: 600, maximum: 600, scheduledSubtotal: null,
    });
  });

  it('distinguishes no visible offers from offers whose values are unknown', () => {
    const empty = calculateBundleTableTotals([]);
    const unknown = calculateBundleTableTotals([
      controlledOffer({ otherCurrencies: [{ name: 'Prisma Bubble fragments', amount: null }] }),
    ]);

    expect(empty.entryCount).toBe(0);
    expect(empty.mode).toBe('sum');
    expect(empty.unknownPriceCount).toBe(0);
    expect(empty.currencies[0]).toMatchObject({ total: 0, knownCount: 0, unknownCount: 0 });
    expect(unknown.entryCount).toBe(1);
    expect(unknown.prices).toEqual([]);
    expect(unknown.unknownPriceCount).toBe(1);
    expect(unknown.currencies[0]).toMatchObject({
      total: null, minimum: null, maximum: null, knownCount: 0, unknownCount: 1,
    });
    expect(unknown.currencies.find(currency => currency.currency === 'Prisma Bubble fragments')).toMatchObject({
      total: null, minimum: null, maximum: null, knownCount: 0, unknownCount: 1,
    });
  });
});

describe('Bundle reward categories - CORE', () => {
  it('distinguishes native equipment from consumables and stamps', () => {
    const equipment = getBundleRewardCategories(controlledOffer({
      contents: [{ name: 'Cape', quantity: 1, itemId: 'EquipmentCape0' }],
    }));
    const items = getBundleRewardCategories(controlledOffer({
      contents: [
        { name: 'Candy', quantity: 1, itemId: 'Timecandy3' },
        { name: 'Stamp', quantity: 1, itemId: 'StampA1' },
      ],
    }));

    expect(equipment.has('equipment')).toBe(true);
    expect(equipment.has('items')).toBe(false);
    expect(items.has('items')).toBe(true);
    expect(items.has('equipment')).toBe(false);
  });

  it('allows several confirmed categories without treating pet power as currency', () => {
    const categories = getBundleRewardCategories(controlledOffer({
      petCrystals: { amount: 25 },
      gems: { amount: 100, delivery: 'unspecified' },
      contents: [
        { name: 'Pet reward', quantity: null, rewardCategories: ['pets', 'bonuses'] },
        { name: 'Pet Tournament Power: 160', quantity: null, rewardCategories: ['bonuses'] },
      ],
    }));
    const powerOnly = getBundleRewardCategories(controlledOffer({
      contents: [{ name: 'Pet Tournament Power: 160', quantity: null, rewardCategories: ['bonuses'] }],
    }));

    expect(categories.has('petCrystals')).toBe(true);
    expect(categories.has('gems')).toBe(true);
    expect(categories.has('pets')).toBe(true);
    expect(categories.has('bonuses')).toBe(true);
    expect(powerOnly.has('petCrystals')).toBe(false);
  });

  it('does not match missing, zero, or unknown currency amounts', () => {
    const unknown = getBundleRewardCategories(controlledOffer({
      contents: [{ name: 'Unknown reward', quantity: null, rewardCategories: [], rewardUnknown: true }],
    }));
    const zero = getBundleRewardCategories(controlledOffer({
      petCrystals: { amount: 0 }, gems: { amount: 0, delivery: 'unspecified' },
    }));

    expect(unknown.size).toBe(0);
    expect(zero.has('petCrystals')).toBe(false);
    expect(zero.has('gems')).toBe(false);
  });
});
