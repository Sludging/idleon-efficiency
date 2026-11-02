import type { EquipmentSources, EquipmentUniqueEffectModifiers } from '../../../data/domain/equipment';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import { ItemStat } from '../../../data/domain/items';
import { Player } from '../../../data/domain/player';
import { ObolStats } from '../../../data/domain/world-2/obols';
import { Gallery } from '../../../data/domain/world-7/gallery';
import { makeCapeAccount, makeItem } from './cape-vine-test-helpers';

const uniqueModifiers: EquipmentUniqueEffectModifiers = {
  pendantChip: 0,
  upperKeychainChip: 0,
  trophyChip: 0,
  finalSlotResearchPercent: 0,
};
const attributeModifiers = {
  STR: { talentPercent: 0, stampPercent: 0 },
  AGI: { talentPercent: 0, stampPercent: 0 },
  WIS: { talentPercent: 0, stampPercent: 0 },
  LUK: { talentPercent: 0, stampPercent: 0 },
};

const makeEquipmentAccount = (inputs: Parameters<typeof makeCapeAccount>[0] = {}) => {
  const account = makeCapeAccount(inputs);
  const sources: EquipmentSources = {
    gallery: new Gallery('gallery'),
    hatRack: account.hatRack,
    capeVine: account.capeVine,
    obols: new ObolStats(),
  };
  return { ...account, sources };
};

describe('Cape Vine equipment replacement', () => {
  it('replaces equipped cape effects and base properties while retaining its appearance', () => {
    const { players, sources } = makeEquipmentAccount({ deposits: ['EquipmentCape2'] });
    const player = players[0];
    const savedCape = makeItem('EquipmentCape23');
    player.gear.equipment[12] = savedCape;

    player.gear.updateUniqueEffects(player, sources, uniqueModifiers);
    player.gear.updateProperties(player, sources, attributeModifiers);

    expect(player.gear.getBonus(EquipmentBonus.TotalDamage)).toBeCloseTo(10.1, 12);
    expect(player.gear.getBonus(EquipmentBonus.DropRate)).toBe(0);
    expect(player.gear.getProperty('STR')).toBeCloseTo(5.05, 12);
    expect(player.gear.getProperty('Defence')).toBeCloseTo(10.1, 12);
    expect(player.gear.getProperty('Weapon_Power')).toBe(0);
    expect(player.gear.equipment[12]).toBe(savedCape);
    expect(player.gear.equipment[12]?.internalName).toBe('EquipmentCape23');
  });

  it('retains the locked recipient cape instead of applying another character unlock', () => {
    const players = [new Player(0, 'Unlocked'), new Player(1, 'Locked')];
    const { sources, capeVine } = makeEquipmentAccount({
      deposits: ['EquipmentCape2'], players, killsLeft: [0, 1],
    });
    const savedCape = makeItem('EquipmentCape23');
    const lockedPlayer = players[1];
    lockedPlayer.gear.equipment[12] = savedCape;

    lockedPlayer.gear.updateUniqueEffects(lockedPlayer, sources, uniqueModifiers);
    lockedPlayer.gear.updateProperties(lockedPlayer, sources, attributeModifiers);

    expect(capeVine.unlockedPlayers).toEqual(['Unlocked']);
    expect(lockedPlayer.gear.getBonus(EquipmentBonus.TotalDamage)).toBe(0);
    expect(lockedPlayer.gear.getBonus(EquipmentBonus.DropRate)).toBe(250);
    expect(lockedPlayer.gear.getProperty('STR')).toBe(0);
    expect(lockedPlayer.gear.getProperty('Weapon_Power')).toBe(20);
    expect(lockedPlayer.gear.equipment[12]).toBe(savedCape);
  });

  it('removes an unlocked equipped cape contribution even when no cape is deposited', () => {
    const { players, sources } = makeEquipmentAccount();
    const player = players[0];
    const savedCape = makeItem('EquipmentCape2');
    player.gear.equipment[12] = savedCape;

    player.gear.updateUniqueEffects(player, sources, uniqueModifiers);
    player.gear.updateProperties(player, sources, attributeModifiers);

    expect(player.gear.getBonus(EquipmentBonus.TotalDamage)).toBe(0);
    expect(player.gear.getProperty('STR')).toBe(0);
    expect(player.gear.getProperty('AGI')).toBe(0);
    expect(player.gear.getProperty('WIS')).toBe(0);
    expect(player.gear.getProperty('Defence')).toBe(0);
    expect(player.gear.equipment[12]).toBe(savedCape);
  });

  it('adds deposited bonuses without requiring a saved cape in slot 12', () => {
    const { players, sources } = makeEquipmentAccount({ deposits: ['EquipmentCape23'] });
    const player = players[0];

    player.gear.updateUniqueEffects(player, sources, uniqueModifiers);
    player.gear.updateProperties(player, sources, attributeModifiers);

    expect(player.gear.equipment[12]).toBeUndefined();
    expect(player.gear.getBonus(EquipmentBonus.DropRate)).toBeCloseTo(252.5, 12);
    expect(player.gear.getProperty('Weapon_Power')).toBeCloseTo(20.2, 12);
    expect(player.gear.getProperty('Mining_Power')).toBe(0);
    expect(player.gear.getProperty('Accuracy')).toBe(0);
  });

  it('scales ordinary cape properties before equipment attributes and adds Obols afterward', () => {
    const { players, sources } = makeEquipmentAccount({ deposits: ['EquipmentCape5', 'EquipmentCape2'] });
    const player = players[0];
    player.gear.equipment[12] = makeItem('EquipmentCape23');
    sources.obols.addStat(new ItemStat('STR', 'STR', 2));
    sources.obols.updateProperties({
      STR: { talentPercent: 0, superbitBonus: 0 },
      AGI: { talentPercent: 0, superbitBonus: 0 },
      WIS: { talentPercent: 0, superbitBonus: 0 },
      LUK: { talentPercent: 0, superbitBonus: 0 },
    }, 1);

    player.gear.updateProperties(player, sources, {
      ...attributeModifiers,
      STR: { talentPercent: 20, stampPercent: 30 },
    });

    // STR: final ordinary cape 5 * 0.25 * 1.02, then 50% equipment attributes, then 2 Obol STR.
    expect(player.gear.getProperty('STR')).toBeCloseTo(3.9125, 12);
    expect(player.gear.getProperty('AGI')).toBeCloseTo(1.275, 12);
    expect(player.gear.getProperty('WIS')).toBeCloseTo(1.275, 12);
    expect(player.gear.getProperty('Defence')).toBeCloseTo(2.55, 12);
    expect(player.gear.getProperty('Weapon_Power')).toBe(0);
  });

  it('adds the account unique-effect sum once, including when the equipped cape is also deposited', () => {
    const { players, sources, capeVine, data } = makeEquipmentAccount({
      deposits: ['EquipmentCape2', 'EquipmentCape5'],
    });
    const player = players[0];
    const savedCape = makeItem('EquipmentCape2');
    player.gear.equipment[12] = savedCape;
    sources.obols.addStat(new ItemStat('Misc', 'UQ1val', 3, '% Total Damage'));

    player.gear.updateUniqueEffects(player, sources, uniqueModifiers);
    player.gear.updateProperties(player, sources, attributeModifiers);

    // Total Damage: 10 * 1.02 + 8 * 0.25 * 1.02 + 3 from Obols; saved slot 12 adds nothing.
    expect(player.gear.getBonus(EquipmentBonus.TotalDamage)).toBeCloseTo(15.24, 12);
    expect(player.gear.getProperty('STR')).toBe(0);
    expect(player.gear.getProperty('Weapon_Power')).toBeCloseTo(0.765, 12);

    capeVine.updateContributions(data);
    player.gear.updateUniqueEffects(player, sources, uniqueModifiers);
    player.gear.updateProperties(player, sources, attributeModifiers);

    expect(player.gear.getBonus(EquipmentBonus.TotalDamage)).toBeCloseTo(15.24, 12);
    expect(player.gear.getProperty('STR')).toBe(0);
    expect(player.gear.getProperty('Weapon_Power')).toBeCloseTo(0.765, 12);
    expect(player.gear.equipment[12]).toBe(savedCape);
  });
});
