import { Cloudsave, safeJsonParse } from '../../../data/domain/cloudsave';
import type { Player } from '../../../data/domain/player';
import type { CapeVine } from '../../../data/domain/world-4/capeVine';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';

// Compare parsed state with the same save. These assertions do not validate game calculations.
describe('Cape Vine save parsing', () => {
  let save: Cloudsave;
  let capeVine: CapeVine;
  let players: Player[];
  let savedDeposits: string[];
  let savedClaims: number;
  let savedPremiumSlots: boolean;

  beforeAll(() => {
    save = loadTestSave('latest');
    const data = loadGameDataFromSave('latest');
    capeVine = data.get('capeVine') as CapeVine;
    players = data.get('players') as Player[];
    const spelunk = safeJsonParse<unknown[][]>(save, 'Spelunk', []) ?? [];
    savedDeposits = Array.isArray(spelunk[54]) ? spelunk[54] as string[] : [];
    const options = safeJsonParse<(number | string)[]>(save, 'OptLacc', []) ?? [];
    savedClaims = Number(options[669] ?? 0);
    const bundles = safeJsonParse<Record<string, number>>(save, 'BundlesReceived', {}) ?? {};
    savedPremiumSlots = bundles.ban_o === 1;
  });

  it('retains the saved deposit names, count and golden-slot positions', () => {
    expect(capeVine.getDepositedCapeNames()).toEqual(savedDeposits);
    expect(capeVine.getDepositedCapeCount()).toBe(savedDeposits.length);
    const savedGoldenSlots = Math.round(1 + savedClaims + 3 * Number(savedPremiumSlots));

    for (const cape of capeVine.capes) {
      const savedSlot = savedDeposits.indexOf(cape.internalName);
      expect(cape.stored).toBe(savedSlot !== -1);
      expect(cape.slot).toBe(savedSlot === -1 ? undefined : savedSlot);
      expect(cape.golden).toBe(savedSlot !== -1 && savedSlot < savedGoldenSlots);
    }
  });

  it('reads claimed golden slots and the premium entitlement from the same retained save', () => {
    expect(capeVine.claimedGoldenSlots).toBe(savedClaims);
    expect(capeVine.premiumGoldenSlots).toBe(savedPremiumSlots);
    expect(capeVine.getGoldenSlotCount()).toBe(Math.round(1 + savedClaims + 3 * Number(savedPremiumSlots)));
  });

  it('uses each saved character unlock row rather than an account-wide unlock', () => {
    const expectedUnlockedNames: string[] = [];
    for (const player of players) {
      const kills = safeJsonParse<number[][]>(save, `KLA_${player.playerID}`, []) ?? [];
      const remaining = kills[100]?.[0];
      const unlocked = remaining !== undefined && remaining <= 0;
      expect(capeVine.isUnlocked(player)).toBe(unlocked);
      if (unlocked) expectedUnlockedNames.push(player.playerName);
    }
    expect(capeVine.unlockedPlayers).toEqual(expectedUnlockedNames);
  });
});
