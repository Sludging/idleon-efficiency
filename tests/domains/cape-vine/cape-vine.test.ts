import { Player } from '../../../data/domain/player';
import { getCape, makeCapeAccount, makeCatherine } from './cape-vine-test-helpers';

describe('Cape Vine bonuses', () => {
  it('assigns golden slots from the saved deposit order, not catalog order', () => {
    const names = ['EquipmentCape7', 'EquipmentCape2', 'EquipmentCape5', 'EquipmentCape23'];
    const { capeVine } = makeCapeAccount({ deposits: names, claimedGoldenSlots: 1 });

    expect(capeVine.getDepositedCapeNames()).toEqual(names);
    expect(capeVine.getDepositedCapeCount()).toBe(4);
    expect(capeVine.getGoldenSlotCount()).toBe(2);
    expect(capeVine.getBonusMultiplier()).toBe(1.04);
    expect(names.map(name => {
      const cape = getCape(capeVine, name);
      return { slot: cape.slot, stored: cape.stored, golden: cape.golden };
    })).toEqual([
      { slot: 0, stored: true, golden: true },
      { slot: 1, stored: true, golden: true },
      { slot: 2, stored: true, golden: false },
      { slot: 3, stored: true, golden: false },
    ]);
    expect(getCape(capeVine, 'EquipmentCape3')).toMatchObject({ stored: false, slot: undefined, golden: false });
    expect(capeVine.getAccountBonuses().get('% TOTAL DAMAGE')).toBeCloseTo(12.48, 12);
    expect(capeVine.getAccountBonuses().get('% DROP RATE')).toBeCloseTo(96.2, 12);
  });

  it('includes Lovely Balloon in the collection list but excludes Lava Wings', () => {
    const { capeVine } = makeCapeAccount();

    expect(capeVine.capes.some(cape => cape.internalName === 'EquipmentCape23')).toBe(true);
    expect(capeVine.capes.some(cape => cape.internalName === 'EquipmentCape1')).toBe(false);
  });

  it('retains saved Lava Wings contributions even though Lava Wings are absent from the catalog', () => {
    const { capeVine, players } = makeCapeAccount({ deposits: ['EquipmentCape1', 'EquipmentCape2'] });
    const depositedCapes = capeVine.getDepositedCapes();

    expect(depositedCapes.map(cape => cape.internalName)).toEqual(['EquipmentCape1', 'EquipmentCape2']);
    expect(depositedCapes[0]).toMatchObject({ stored: true, slot: 0, golden: true });
    expect(capeVine.capes.some(cape => cape.internalName === 'EquipmentCape1')).toBe(false);
    expect(capeVine.getBonus('% AWESOME', players[0])).toBeCloseTo(102, 12);
    expect(capeVine.getCapeItemBonuses(depositedCapes[0])).toEqual([
      { effect: '% AWESOME', value: expect.closeTo(102, 12) },
      { effect: '% EPIC', value: expect.closeTo(102, 12) },
    ]);
    expect(capeVine.getProperty('STR', players[0])).toBeCloseTo(1.275, 12);
    expect(capeVine.getProperty('Weapon_Power', players[0])).toBe(0);
  });

  it('retains unknown saved entries in the count and slot order without inventing item definitions', () => {
    const { capeVine, players } = makeCapeAccount({ deposits: ['UnknownCape', 'EquipmentCape2'] });

    expect(capeVine.getDepositedCapeNames()).toEqual(['UnknownCape', 'EquipmentCape2']);
    expect(capeVine.getDepositedCapeCount()).toBe(2);
    expect(capeVine.getDepositedCapes().map(cape => cape.internalName)).toEqual(['EquipmentCape2']);
    expect(getCape(capeVine, 'EquipmentCape2')).toMatchObject({ stored: true, slot: 1, golden: false });
    expect(getCape(capeVine, 'EquipmentCape2').multiplier).toBeCloseTo(0.255, 12);
    expect(capeVine.getBonusMultiplier()).toBe(1.02);
    expect(capeVine.getBonus('% TOTAL DAMAGE', players[0])).toBeCloseTo(2.55, 12);
    expect(capeVine.getProperty('STR', players[0])).toBeCloseTo(1.275, 12);
  });

  it('keeps the final recognized cape as property owner when an unknown saved ID follows it', () => {
    const deposits = ['EquipmentCape7', 'EquipmentCape2', 'UnknownCape'];
    const { capeVine, players } = makeCapeAccount({ deposits });
    const earlierCape = getCape(capeVine, 'EquipmentCape7');
    const finalCape = getCape(capeVine, 'EquipmentCape2');

    expect(capeVine.getDepositedCapeNames()).toEqual(deposits);
    expect(capeVine.getDepositedCapeCount()).toBe(3);
    expect(capeVine.getDepositedCapes().map(cape => cape.internalName)).toEqual(deposits.slice(0, 2));
    expect(capeVine.getBonusMultiplier()).toBe(1.03);
    expect(earlierCape).toMatchObject({ stored: true, slot: 0, golden: true });
    expect(finalCape).toMatchObject({ stored: true, slot: 1, golden: false });
    expect(earlierCape.multiplier).toBeCloseTo(1.03, 12);
    expect(finalCape.multiplier).toBeCloseTo(0.2575, 12);
    expect(capeVine.getCapeItemBonuses(earlierCape)).toEqual([
      { effect: '% DROP RATE', value: expect.closeTo(30.9, 12) },
    ]);
    expect(capeVine.getCapeItemBonuses(finalCape)).toEqual([
      { effect: '% TOTAL DAMAGE', value: expect.closeTo(2.575, 12) },
      { effect: 'Weapon Power', value: 0 },
      { effect: 'STR', value: expect.closeTo(1.2875, 12) },
      { effect: 'AGI', value: expect.closeTo(1.2875, 12) },
      { effect: 'WIS', value: expect.closeTo(1.2875, 12) },
      { effect: 'LUK', value: 0 },
      { effect: 'Defence', value: expect.closeTo(2.575, 12) },
    ]);
    expect(capeVine.getProperty('STR', players[0])).toBeCloseTo(1.2875, 12);
    expect(capeVine.getProperty('Defence', players[0])).toBeCloseTo(2.575, 12);
  });

  it.each([
    { label: 'no active Catherine', companions: [], multiplier: 1.02, damage: 12.24 },
    { label: 'owned level-one Catherine', companions: [makeCatherine(1)], multiplier: 1.12, damage: 13.44 },
    { label: 'owned level-two Catherine', companions: [makeCatherine(2)], multiplier: 1.22, damage: 14.64 },
    { label: 'unowned Catherine without a token', companions: [makeCatherine(2, false)], multiplier: 1.02, damage: 12.24 },
    { label: 'unowned Catherine with a token', companions: [makeCatherine(2, false, true)], multiplier: 1.12, damage: 13.44 },
    { label: 'level-two Catherine with a token', companions: [makeCatherine(2, true, true)], multiplier: 1.12, damage: 13.44 },
  ])('uses $label for the account multiplier', ({ companions, multiplier, damage }) => {
    const { capeVine, players } = makeCapeAccount({
      deposits: ['EquipmentCape2', 'EquipmentCape5'], companions,
    });

    expect(capeVine.getBonusMultiplier()).toBeCloseTo(multiplier, 12);
    expect(capeVine.getBonus('% TOTAL DAMAGE', players[0])).toBeCloseTo(damage, 12);
  });

  it('reports only actual unique effects and final-cape properties at each slot multiplier', () => {
    const { capeVine } = makeCapeAccount({ deposits: ['EquipmentCape2', 'EquipmentCape5'] });
    const earlierCape = getCape(capeVine, 'EquipmentCape2');
    const finalCape = getCape(capeVine, 'EquipmentCape5');
    const undepositedCape = getCape(capeVine, 'EquipmentCape3');

    expect(earlierCape.multiplier).toBeCloseTo(1.02, 12);
    expect(finalCape.multiplier).toBeCloseTo(0.255, 12);
    expect(undepositedCape.multiplier).toBe(0);
    expect(capeVine.getCapeItemBonuses(earlierCape)).toEqual([
      { effect: '% TOTAL DAMAGE', value: expect.closeTo(10.2, 12) },
    ]);
    expect(capeVine.getCapeItemBonuses(finalCape)).toEqual([
      { effect: '% TOTAL DAMAGE', value: expect.closeTo(2.04, 12) },
      { effect: 'Weapon Power', value: expect.closeTo(0.765, 12) },
      { effect: 'STR', value: 0 },
      { effect: 'AGI', value: 0 },
      { effect: 'WIS', value: 0 },
      { effect: 'LUK', value: 0 },
      { effect: 'Defence', value: 0 },
    ]);
    expect(capeVine.getCapeItemBonuses(undepositedCape)).toEqual([]);
    expect(capeVine.getAccountBonuses().get('STR')).toBe(0);
    expect(capeVine.getAccountBonuses().get('% TOTAL DAMAGE')).toBeCloseTo(12.24, 12);
  });

  it.each([
    {
      deposits: ['EquipmentCape2', 'EquipmentCape7'],
      strength: 0, defence: 3.295, power: 1.53, damage: 10.2, dropRate: 7.65,
      earlierEffect: '% TOTAL DAMAGE', earlierValue: 10.2,
      finalEffect: '% DROP RATE', finalValue: 7.65, ownDefence: 1.275,
    },
    {
      deposits: ['EquipmentCape7', 'EquipmentCape2'],
      strength: 1.275, defence: 4.57, power: 0, damage: 2.55, dropRate: 30.6,
      earlierEffect: '% DROP RATE', earlierValue: 30.6,
      finalEffect: '% TOTAL DAMAGE', finalValue: 2.55, ownDefence: 2.55,
    },
  ])('overwrites properties with the last deposited cape over Hat Rack totals: $deposits', ({
    deposits, strength, defence, power, damage, dropRate,
    earlierEffect, earlierValue, finalEffect, finalValue, ownDefence,
  }) => {
    const { capeVine, hatRack, players } = makeCapeAccount({
      deposits, depositedHats: ['EquipmentHatsBeg1'],
    });
    const recipient = players[0];
    const earlierCape = getCape(capeVine, deposits[0]);
    const finalCape = getCape(capeVine, deposits[1]);

    expect(earlierCape.multiplier).toBeCloseTo(1.02, 12);
    expect(finalCape.multiplier).toBeCloseTo(0.255, 12);
    expect(capeVine.getCapeItemBonuses(earlierCape)).toEqual([
      { effect: earlierEffect, value: expect.closeTo(earlierValue, 12) },
    ]);
    expect(capeVine.getCapeItemBonuses(finalCape)).toEqual([
      { effect: finalEffect, value: expect.closeTo(finalValue, 12) },
      { effect: 'Weapon Power', value: expect.closeTo(power, 12) },
      { effect: 'STR', value: expect.closeTo(strength, 12) },
      { effect: 'AGI', value: expect.closeTo(strength, 12) },
      { effect: 'WIS', value: expect.closeTo(strength, 12) },
      { effect: 'LUK', value: 0 },
      { effect: 'Defence', value: expect.closeTo(ownDefence, 12) },
    ]);

    expect(hatRack.getAccountBonuses().get('Defence')).toBeCloseTo(2.02, 12);
    expect(hatRack.getAccountBonuses().get('LUK')).toBeCloseTo(10.1, 12);
    expect(capeVine.getProperty('STR', recipient)).toBeCloseTo(strength, 12);
    expect(capeVine.getProperty('Defence', recipient)).toBeCloseTo(defence, 12);
    expect(capeVine.getProperty('Weapon_Power', recipient)).toBeCloseTo(power, 12);
    expect(capeVine.getProperty('LUK', recipient)).toBeCloseTo(10.1, 12);
    expect(capeVine.getProperty('Accuracy', recipient)).toBe(0);
    // Hat Rack unique effects do not enter the Cape Vine unique-effect sum.
    expect(capeVine.getBonus('% MONEY', recipient)).toBe(0);
    expect(capeVine.getBonus('% TOTAL DAMAGE', recipient)).toBeCloseTo(damage, 12);
    expect(capeVine.getBonus('% DROP RATE', recipient)).toBeCloseTo(dropRate, 12);
  });

  it('returns no account contribution for an empty vine, even with stored hats', () => {
    const { capeVine, hatRack, players } = makeCapeAccount({ depositedHats: ['EquipmentHatsBeg1'] });

    expect(hatRack.getAccountBonuses().get('LUK')).toBeCloseTo(10.1, 12);
    expect(capeVine.getDepositedCapeNames()).toEqual([]);
    expect(capeVine.getDepositedCapeCount()).toBe(0);
    expect(capeVine.getAccountBonuses().size).toBe(0);
    expect(capeVine.getProperty('LUK', players[0])).toBe(0);
    expect(capeVine.getBonus('% TOTAL DAMAGE', players[0])).toBe(0);
    for (const cape of capeVine.capes) {
      expect(cape.multiplier).toBe(0);
      expect(capeVine.getCapeItemBonuses(cape)).toEqual([]);
    }
  });
});

describe('Cape Vine golden slots and character unlocks', () => {
  it.each([
    { claims: 0, premium: false, goldenSlots: 1, nextLevel: 1000 },
    { claims: 1, premium: false, goldenSlots: 2, nextLevel: 1500 },
    { claims: 2, premium: false, goldenSlots: 3, nextLevel: 2000 },
    { claims: 0, premium: true, goldenSlots: 4, nextLevel: 1000 },
    { claims: 2, premium: true, goldenSlots: 6, nextLevel: 2000 },
  ])('uses $claims claims and premium=$premium for slot count and the next level', ({ claims, premium, goldenSlots, nextLevel }) => {
    const { capeVine } = makeCapeAccount({ claimedGoldenSlots: claims, premiumGoldenSlots: premium });

    expect(capeVine.claimedGoldenSlots).toBe(claims);
    expect(capeVine.premiumGoldenSlots).toBe(premium);
    expect(capeVine.getGoldenSlotCount()).toBe(goldenSlots);
    expect(capeVine.getNextClaimLevel()).toBe(nextLevel);
  });

  it.each([
    { level: 1499, ready: false },
    { level: 1500, ready: true },
    { level: 1501, ready: true },
  ])('reports claim readiness at character level $level', ({ level, ready }) => {
    const player = new Player(0, 'Claimant');
    player.level = level;
    const { capeVine } = makeCapeAccount({ players: [player], claimedGoldenSlots: 1 });

    expect(capeVine.isClaimReady()).toBe(ready);
    expect(capeVine.eligibleClaimants).toEqual(ready ? [{ name: 'Claimant', level }] : []);
  });

  it('gates account bonuses for each recipient, including an absent unlock row', () => {
    const players = [new Player(0, 'Open'), new Player(1, 'Locked'), new Player(2, 'Missing')];
    const { capeVine } = makeCapeAccount({
      deposits: ['EquipmentCape2'], players, killsLeft: [0, 1, undefined],
    });

    expect(capeVine.unlockedPlayers).toEqual(['Open']);
    expect(players.map(player => capeVine.isUnlocked(player))).toEqual([true, false, false]);
    expect(capeVine.getBonus('% TOTAL DAMAGE', players[0])).toBeCloseTo(10.1, 12);
    expect(capeVine.getProperty('STR', players[0])).toBeCloseTo(5.05, 12);
    for (const player of players.slice(1)) {
      expect(capeVine.getBonus('% TOTAL DAMAGE', player)).toBe(0);
      expect(capeVine.getProperty('STR', player)).toBe(0);
    }
  });
});

describe('Cape Vine account reloads', () => {
  it('replaces prior deposits, golden status, totals, claimants and recipient gates on reparse', () => {
    const firstPlayer = new Player(0, 'First account');
    firstPlayer.level = 2500;
    const { capeVine, hatRack, data } = makeCapeAccount({
      deposits: ['EquipmentCape2', 'EquipmentCape5'], claimedGoldenSlots: 2, premiumGoldenSlots: true,
      companions: [makeCatherine(2)], players: [firstPlayer],
    });
    const oldCape = getCape(capeVine, 'EquipmentCape2');
    const oldFinalCape = getCape(capeVine, 'EquipmentCape5');
    const nextFinalCape = getCape(capeVine, 'EquipmentCape7');
    expect(oldCape.multiplier).toBeCloseTo(1.22, 12);
    expect(oldFinalCape.multiplier).toBeCloseTo(1.22, 12);
    expect(capeVine.getCapeItemBonuses(oldFinalCape)).toContainEqual({
      effect: 'Weapon Power', value: expect.closeTo(3.66, 12),
    });
    expect(capeVine.isClaimReady()).toBe(true);
    expect(capeVine.getCapeItemBonuses(oldCape).length).toBeGreaterThan(0);

    const secondPlayer = new Player(0, 'Second account');
    const spelunk: string[][] = [];
    spelunk[54] = ['EquipmentCape7'];
    const options: number[] = [];
    options[669] = 0;
    const kills: number[][] = [];
    kills[100] = [1];
    const secondData = new Map<string, unknown>([
      ['capeVine', capeVine], ['hatRack', hatRack], ['charCount', 1], ['players', [secondPlayer]],
      ['companions', []], ['Spelunk', spelunk], ['OptLacc', options], ['BundlesReceived', {}], ['KLA_0', kills],
    ]);
    capeVine.parse(secondData);

    expect(capeVine.getAccountBonuses().size).toBe(0);
    expect(capeVine.getCapeItemBonuses(oldCape)).toEqual([]);
    expect(capeVine.getCapeItemBonuses(oldFinalCape)).toEqual([]);
    expect(capeVine.getCapeItemBonuses(nextFinalCape)).toEqual([]);
    expect(oldCape.multiplier).toBe(0);
    expect(oldFinalCape.multiplier).toBe(0);
    expect(nextFinalCape.multiplier).toBe(0);
    expect(capeVine.getBonusMultiplier()).toBe(1);
    expect(capeVine.eligibleClaimants).toEqual([]);
    expect(capeVine.unlockedPlayers).toEqual([]);
    expect(oldCape).toMatchObject({ stored: false, slot: undefined, golden: false });

    capeVine.updateContributions(secondData);

    expect(capeVine.getDepositedCapeNames()).toEqual(['EquipmentCape7']);
    expect(capeVine.getDepositedCapeCount()).toBe(1);
    expect(capeVine.claimedGoldenSlots).toBe(0);
    expect(capeVine.premiumGoldenSlots).toBe(false);
    expect(capeVine.getGoldenSlotCount()).toBe(1);
    expect(capeVine.getBonusMultiplier()).toBe(1.01);
    expect(capeVine.getAccountBonuses().get('% TOTAL DAMAGE')).toBeUndefined();
    expect(capeVine.getAccountBonuses().get('% DROP RATE')).toBeCloseTo(30.3, 12);
    expect(capeVine.isClaimReady()).toBe(false);
    expect(capeVine.isUnlocked(secondPlayer)).toBe(false);
    expect(getCape(capeVine, 'EquipmentCape7')).toMatchObject({ stored: true, slot: 0, golden: true });
    expect(oldCape.multiplier).toBe(0);
    expect(oldFinalCape.multiplier).toBe(0);
    expect(capeVine.getCapeItemBonuses(oldFinalCape)).toEqual([]);
    expect(nextFinalCape.multiplier).toBeCloseTo(1.01, 12);
    expect(capeVine.getCapeItemBonuses(nextFinalCape)).toEqual([
      { effect: '% DROP RATE', value: expect.closeTo(30.3, 12) },
      { effect: 'Weapon Power', value: expect.closeTo(6.06, 12) },
      { effect: 'STR', value: 0 },
      { effect: 'AGI', value: 0 },
      { effect: 'WIS', value: 0 },
      { effect: 'LUK', value: 0 },
      { effect: 'Defence', value: expect.closeTo(5.05, 12) },
    ]);
    // The second parse does not change the first account's raw deposits.
    expect((data.get('Spelunk') as string[][])[54]).toEqual(['EquipmentCape2', 'EquipmentCape5']);
  });

  it('clears a populated account when optional save fields and player unlock rows are absent', () => {
    const { capeVine, hatRack, players } = makeCapeAccount({
      deposits: ['EquipmentCape23'], claimedGoldenSlots: 3, premiumGoldenSlots: true,
      companions: [makeCatherine(2)], depositedHats: ['EquipmentHatsBeg1'],
    });
    const absentFields = new Map<string, unknown>([
      ['capeVine', capeVine], ['hatRack', hatRack], ['charCount', 1], ['players', players], ['companions', []],
    ]);

    capeVine.parse(absentFields);
    for (const cape of capeVine.capes) {
      expect(cape.multiplier).toBe(0);
      expect(capeVine.getCapeItemBonuses(cape)).toEqual([]);
    }
    capeVine.updateContributions(absentFields);

    expect(capeVine.getDepositedCapeNames()).toEqual([]);
    expect(capeVine.getDepositedCapeCount()).toBe(0);
    expect(capeVine.claimedGoldenSlots).toBe(0);
    expect(capeVine.premiumGoldenSlots).toBe(false);
    expect(capeVine.getGoldenSlotCount()).toBe(1);
    expect(capeVine.getNextClaimLevel()).toBe(1000);
    expect(capeVine.getBonusMultiplier()).toBe(1);
    expect(capeVine.getAccountBonuses().size).toBe(0);
    expect(capeVine.unlockedPlayers).toEqual([]);
    expect(capeVine.isUnlocked(players[0])).toBe(false);
    for (const cape of capeVine.capes) {
      expect(cape).toMatchObject({ stored: false, slot: undefined, golden: false, multiplier: 0 });
      expect(capeVine.getCapeItemBonuses(cape)).toEqual([]);
    }
  });

  it('does not accumulate totals or item detail rows across repeated updates and parses', () => {
    const { capeVine, data } = makeCapeAccount({ deposits: ['EquipmentCape2', 'EquipmentCape5'] });
    const cape = getCape(capeVine, 'EquipmentCape2');
    const finalCape = getCape(capeVine, 'EquipmentCape5');
    const undepositedCape = getCape(capeVine, 'EquipmentCape3');
    const expectedBonuses = [...capeVine.getAccountBonuses()];
    const expectedDetails = [...capeVine.getCapeItemBonuses(cape)];
    const expectedFinalDetails = [...capeVine.getCapeItemBonuses(finalCape)];

    capeVine.updateContributions(data);
    expect([...capeVine.getAccountBonuses()]).toEqual(expectedBonuses);
    expect(capeVine.getCapeItemBonuses(cape)).toEqual(expectedDetails);
    expect(capeVine.getCapeItemBonuses(finalCape)).toEqual(expectedFinalDetails);
    expect(cape.multiplier).toBeCloseTo(1.02, 12);
    expect(finalCape.multiplier).toBeCloseTo(0.255, 12);
    expect(undepositedCape.multiplier).toBe(0);

    capeVine.parse(data);
    expect(cape.multiplier).toBe(0);
    expect(finalCape.multiplier).toBe(0);
    expect(capeVine.getCapeItemBonuses(cape)).toEqual([]);
    expect(capeVine.getCapeItemBonuses(finalCape)).toEqual([]);
    capeVine.updateContributions(data);
    expect(capeVine.getDepositedCapeCount()).toBe(2);
    expect([...capeVine.getAccountBonuses()]).toEqual(expectedBonuses);
    expect(capeVine.getCapeItemBonuses(cape)).toEqual(expectedDetails);
    expect(capeVine.getCapeItemBonuses(finalCape)).toEqual(expectedFinalDetails);
    expect(cape.multiplier).toBeCloseTo(1.02, 12);
    expect(finalCape.multiplier).toBeCloseTo(0.255, 12);
    expect(undepositedCape.multiplier).toBe(0);

    (data.get('Spelunk') as string[][])[54] = ['EquipmentCape5', 'EquipmentCape2'];
    capeVine.parse(data);
    expect(cape.multiplier).toBe(0);
    expect(finalCape.multiplier).toBe(0);
    capeVine.updateContributions(data);

    const reorderedEarlierDetails = [
      { effect: '% TOTAL DAMAGE', value: expect.closeTo(8.16, 12) },
    ];
    const reorderedFinalDetails = [
      { effect: '% TOTAL DAMAGE', value: expect.closeTo(2.55, 12) },
      { effect: 'Weapon Power', value: 0 },
      { effect: 'STR', value: expect.closeTo(1.275, 12) },
      { effect: 'AGI', value: expect.closeTo(1.275, 12) },
      { effect: 'WIS', value: expect.closeTo(1.275, 12) },
      { effect: 'LUK', value: 0 },
      { effect: 'Defence', value: expect.closeTo(2.55, 12) },
    ];
    expect(capeVine.getCapeItemBonuses(finalCape)).toEqual(reorderedEarlierDetails);
    expect(capeVine.getCapeItemBonuses(cape)).toEqual(reorderedFinalDetails);
    expect(finalCape.multiplier).toBeCloseTo(1.02, 12);
    expect(cape.multiplier).toBeCloseTo(0.255, 12);
    expect(undepositedCape.multiplier).toBe(0);

    capeVine.updateContributions(data);
    expect(capeVine.getCapeItemBonuses(finalCape)).toEqual(reorderedEarlierDetails);
    expect(capeVine.getCapeItemBonuses(cape)).toEqual(reorderedFinalDetails);
    expect(finalCape.multiplier).toBeCloseTo(1.02, 12);
    expect(cape.multiplier).toBeCloseTo(0.255, 12);
    expect(undepositedCape.multiplier).toBe(0);
  });
});
