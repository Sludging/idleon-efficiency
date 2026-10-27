import { Account } from '../../../data/domain/account';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const representativeEntries = [
  { name: 'Explorer bundle', nativeEntryId: 'bun_p' },
  { name: 'another supported bundle', nativeEntryId: 'bun_t' },
  { name: 'Jelly Joy Pet Mart pack', nativeEntryId: 'bin_a' },
  { name: 'Baby Troll Starter Pack', nativeEntryId: 'bon_w' },
  { name: 'Balloonfish Starter Pack', nativeEntryId: 'bon_x' },
  { name: 'Bubba the Seal Starter Pack', nativeEntryId: 'bon_y' },
];

const effectFlags = [
  { name: 'Death Bringer', property: 'hasDeathBringerBundle', nativeEntryId: 'bun_v' },
  { name: 'Explorer', property: 'hasExplorerBundle', nativeEntryId: 'bun_p' },
  { name: 'No Meal Left Behind', property: 'hasNoMealLeftBehindBundle', nativeEntryId: 'bun_s' },
  { name: 'Equinox', property: 'hasEquinoxBundle', nativeEntryId: 'bun_q' },
  { name: 'damage multiplier', property: 'hasDamageMultiplierBundle', nativeEntryId: 'bon_a' },
  { name: 'Bank', property: 'hasBankBundle', nativeEntryId: 'ban_k' },
  { name: 'Bundle L', property: 'hasBundleL', nativeEntryId: 'ban_l' },
  { name: 'Bundle M', property: 'hasBundleM', nativeEntryId: 'ban_m' },
] as const;

// The paired save does not exercise unavailable/private receipts or an owned Starter Pack.
describe('Account bundle ownership - CORE', () => {
  let account: Account;
  let nativeLedger: Record<string, number> | null;

  // Unknown ownership must not match a known native receipt indicator.
  const receiptByOwnership = { owned: 1, unowned: 0, unknown: Number.NaN };

  beforeAll(() => {
    const extractionResults = loadExtractionResults('bundle-ownership-data.json');
    validateExtractionHealth(extractionResults);
    nativeLedger = extractionResults.extractions.bundles_received.result as Record<string, number> | null;
    account = loadGameDataFromSave('latest').get('account') as Account;
  });

  it('matches ownership availability to native receipt-ledger presence', () => {
    expect(account.bundles.available).toBe(nativeLedger !== null && nativeLedger !== undefined);
  });

  it('matches every received entitlement in the native ledger', () => {
    for (const [nativeEntryId, nativeReceipt] of Object.entries(nativeLedger ?? {})) {
      if (nativeReceipt !== 1) continue;

      const ownership = account.bundles.getOwnership(nativeEntryId);
      expect(receiptByOwnership[ownership]).toMatchLiveGameWithDetails(nativeReceipt, {
        tolerance: 0,
        context: 'Received bundle entitlement',
        debugInfo: { nativeEntryId, ownership },
      });
    }
  });

  it.each(representativeEntries)('matches the $name receipt state', ({ name, nativeEntryId }) => {
    const ownership = account.bundles.getOwnership(nativeEntryId);
    if (nativeLedger === null || nativeLedger === undefined) {
      expect(ownership).toBe('unknown');
      return;
    }

    expect(receiptByOwnership[ownership]).toMatchLiveGameWithDetails(nativeLedger[nativeEntryId] ?? 0, {
      tolerance: 0,
      context: `${name} received entitlement`,
      debugInfo: { nativeEntryId, ownership },
    });
  });

  it.each(effectFlags)('preserves the $name bundle effect flag', ({ name, property, nativeEntryId }) => {
    expect(Number(account[property])).toMatchLiveGameWithDetails(nativeLedger?.[nativeEntryId] ?? 0, {
      tolerance: 0,
      context: `${name} bundle effect flag`,
      debugInfo: { nativeEntryId },
    });
  });
});
