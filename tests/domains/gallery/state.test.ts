/**
 * Gallery's account state is shared, while unlock and chip inputs remain
 * character-specific. These tests deliberately use the public init -> parse ->
 * updateContributions lifecycle with tiny item and dependency fixtures.
 *
 * Source boundaries (Game 1.21, Gallery.1.21.js): shelves occupy the first
 * 48 ordered save slots, podium assignments follow them, and nametag counts
 * select the capped [1, 1.6, 2, 2.3, 2.5] factors (lines 123-156).
 */

import '../../../data/domain/idleonData';
import { Player } from '../../../data/domain/player';
import { Gallery } from '../../../data/domain/world-7/gallery';
import { Item, ItemStat } from '../../../data/domain/items';
import type { Companion } from '../../../data/domain/companions';

type ItemEffect = { effect: string; value: number };
type GalleryOptions = {
  trophyPlacements?: number[];
  nametagCounts?: number[];
  companions?: Companion[];
  players?: Player[];
  overrides?: Record<string, unknown>;
  unlocks?: Record<number, number>;
};

const makeItem = (internalName: string, displayName: string, effects: ItemEffect[] = []): Item => {
  const item = Item.emptyItem(internalName, displayName);
  item.itemStats = effects.map(({ effect, value }, index) => (
    new ItemStat(effect, index === 0 ? 'UQ1val' : 'UQ2val', value, effect)
  ));
  return item;
};

const makePlayer = (playerID: number, trophyChip = 0): Player => {
  const player = new Player(playerID, `Player ${playerID}`);
  player.getChipBonus = (stat: string): number => stat === 'troph' ? trophyChip : 0;
  return player;
};
const makeGalleryCompanion = (): Companion => ({
  id: 28,
  name: 'Gallery Companion',
  data: {
    id: 'fixture-gallery-companion',
    desc: 'Fixture Gallery companion',
    bonus: 1,
    x1: 0,
    x2: 0,
    x3: 0,
    x4: 0,
    x5: 0,
    bonus2: 1,
  },
  imageData: { location: 'fixture-gallery-companion', width: 1, height: 1 },
  owned: true,
  real: false,
  level: 2,
  getBonus: () => 'Fixture Gallery companion',
});

const makeProgression = (killsLeft: number): number[][] => {
  const progression: number[][] = [];
  progression[250] = [killsLeft];
  return progression;
};

const makeData = (gallery: Gallery, options: GalleryOptions = {}): Map<string, unknown> => {
  const players = options.players ?? [makePlayer(0)];
  const spelunk: number[][] = [];
  spelunk[0] = [];
  spelunk[13] = [];
  spelunk[16] = options.trophyPlacements ?? [];
  spelunk[17] = options.nametagCounts ?? [];

  const data = new Map<string, unknown>([
    ['gallery', gallery],
    ['charCount', players.length],
    ['players', players],
    ['Spelunk', spelunk],
    ['companions', options.companions ?? []],
    ['clamworks', { isBonusUnlocked: (_index: number): boolean => false }],
    ['killroy', { podiumsOwnedLv2: 0 }],
    ['gems', { purchases: [] }],
    ['sailing', { artifacts: [] }],
    ['legendTalents', { getBonusFromIndex: (_index: number): number => 0 }],
    ['eventShop', { isBonusOwned: (_index: number): boolean => false }],
    ['coralReef', { upgrades: [] }],
    ['alchemy', { getBubbleBonusForKey: (_key: string): number => 0 }],
    ['cards', []],
    ['sushi', { getBonusFromIndex: (_index: number): number => 0 }],
    ['sneaking', { jadeUpgrades: [] }],
    ['spelunking', { tunnels: [] }],
  ]);

  for (const [playerID, killsLeft] of Object.entries(options.unlocks ?? {})) {
    data.set(`KLA_${playerID}`, makeProgression(killsLeft));
  }
  for (const [key, value] of Object.entries(options.overrides ?? {})) {
    data.set(key, value);
  }
  return data;
};

const prepareGallery = (
  items: Item[],
  options: GalleryOptions = {},
): { gallery: Gallery; data: Map<string, unknown> } => {
  const gallery = new Gallery('gallery');
  const players = options.players ?? [makePlayer(0)];
  gallery.init(items, 0);
  const data = makeData(gallery, { ...options, players });
  gallery.parse(data);
  gallery.updateContributions(data);
  return { gallery, data };
};

describe('Gallery state model', () => {
  it('keeps unowned catalogue definitions and preserves repeated trophy order across shelves and podiums', () => {
    const trophy = makeItem('Trophy1', 'Bronze Trophy', [
      { effect: '% Skill Efficiency', value: 10 },
    ]);
    const unownedTrophy = makeItem('Trophy2', 'Unowned Trophy');
    const trophyPlacements = Array(49).fill(0);
    trophyPlacements[0] = 1;
    trophyPlacements[1] = 1;
    trophyPlacements[48] = 1;

    const { gallery } = prepareGallery([trophy, unownedTrophy], { trophyPlacements });

    expect(gallery.trophies.map(trophy => trophy.index)).toEqual([1, 2]);
    expect(gallery.trophies[0]).toMatchObject({
      index: 1,
      internalName: 'Trophy1',
      name: 'Bronze Trophy',
      count: 3,
    });
    expect(gallery.trophies[0].obtained).toBe(true);
    expect(gallery.trophies[1]).toMatchObject({
      index: 2,
      internalName: 'Trophy2',
      name: 'Unowned Trophy',
      count: 0,
    });
    expect(gallery.trophies[1].obtained).toBe(false);
    expect(gallery.shelves).toHaveLength(48);
    expect(gallery.shelves.slice(0, 3).map(trophy => trophy?.index)).toEqual([1, 1, undefined]);
    expect(gallery.podiums).toHaveLength(1);
    expect(gallery.podiums[0]).toMatchObject({
      index: 0,
      available: true,
      tier: 1,
      multiplier: 1,
    });
    expect(gallery.podiums[0].trophy?.index).toBe(1);
  });

  it('sums repeated shelf and podium placements while retaining each player chip multiplier', () => {
    const player0 = makePlayer(0, 0);
    const player1 = makePlayer(1, 1);
    const trophyPlacements = Array(49).fill(0);
    trophyPlacements[0] = 1;
    trophyPlacements[1] = 1;
    trophyPlacements[48] = 1;

    const { gallery } = prepareGallery(
      [makeItem('Trophy1', 'Bronze Trophy', [{ effect: '% Skill Efficiency', value: 10 }])],
      { trophyPlacements, players: [player0, player1] },
    );

    // Game 1.21 Gallery lines 65-81: two shelves contribute .3 each and the
    // first ordinary podium contributes 1 when no higher tier is unlocked.
    expect(gallery.getTrophyBonus('% SKILL EFFICIENCY', player0)).toBe(16);
    expect(gallery.getTrophyBonus('% SKILL EFFICIENCY', player1)).toBe(17.6);
  });

  it('uses the alternate index-6 nametag and caps raw counts above five', () => {
    const plainSix = makeItem('EquipmentNametag6', 'Replica Six', [
      { effect: '% Drop Rate', value: 99 },
    ]);
    const alternateSix = makeItem('EquipmentNametag6b', 'Alternate Six', [
      { effect: '% Drop Rate', value: 4 },
    ]);
    const unowned = makeItem('EquipmentNametag1', 'Unowned Nametag');
    const nametagCounts = Array(7).fill(0);
    nametagCounts[6] = 6;

    const { gallery } = prepareGallery([plainSix, alternateSix, unowned], { nametagCounts });

    expect(gallery.nametags.map(nametag => nametag.index)).toEqual([1, 6]);
    expect(gallery.nametags[0]).toMatchObject({
      index: 1,
      internalName: 'EquipmentNametag1',
      name: 'Unowned Nametag',
      count: 0,
    });
    expect(gallery.nametags[0].stackMultiplier).toBe(0);
    expect(gallery.nametags[1]).toMatchObject({
      index: 6,
      internalName: 'EquipmentNametag6b',
      name: 'Alternate Six',
      count: 6,
    });
    expect(gallery.nametags[1].stackMultiplier).toBe(2.5);
    expect(gallery.nametags.map(nametag => nametag.internalName)).not.toContain('EquipmentNametag6');
    // Game 1.21 Gallery lines 129-136: count 6 selects the final capped
    // factor, and collection index 6 reads EquipmentNametag6b.
    expect(gallery.getNametagBonus('% DROP RATE', makePlayer(0))).toBe(10);
  });

  it('derives unlock state per character and treats missing progression as locked', () => {
    const player0 = makePlayer(0);
    const player1 = makePlayer(1);
    const player2 = makePlayer(2);
    const gallery = new Gallery('gallery');
    gallery.init([], 0);
    const data = makeData(gallery, {
      players: [player0, player1, player2],
      unlocks: { 0: 0, 1: 1 },
    });

    gallery.parse(data);

    // Game 1.21 Gallery line 44: the portal is open exactly when
    // KillsLeft2Advance[250][0] <= 0; KLA_N is its cloud-save key.
    expect(gallery.isUnlocked(player0)).toBe(true);
    expect(gallery.isUnlocked(player1)).toBe(false);
    expect(gallery.isUnlocked(player2)).toBe(false);
  });

  it('keeps physical podium capacity separate from higher cumulative tiers, including empty podiums', () => {
    const companion28 = makeGalleryCompanion();
    const trophyPlacements = Array(50).fill(0);

    const { gallery } = prepareGallery([], {
      trophyPlacements,
      companions: [companion28],
      overrides: {
        // No coral, Jade Emporium, lore, gems, artifact, or event capacity
        // inputs: source Gallery lines 9-18 therefore leaves one physical slot.
        sneaking: { jadeUpgrades: [] },
        spelunking: { tunnels: [] },
      },
    });

    // Companion 28 and its level-two state raise the highest-grade threshold
    // to two (Gallery lines 19-43), while physical capacity remains one.
    // Both saved podium assignments stay visible; only the first is available.
    expect(gallery.podiums).toHaveLength(2);
    expect(gallery.podiums.map(podium => ({
      available: podium.available,
      tier: podium.tier,
      multiplier: podium.multiplier,
    }))).toEqual([
      { available: true, tier: 4, multiplier: 2.5 },
      { available: false, tier: 4, multiplier: 2.5 },
    ]);
  });
  it('caps physical capacity at nineteen without clamping cumulative tier thresholds', () => {
    const trophyPlacements = Array(49).fill(0);
    const { gallery } = prepareGallery([makeItem('Trophy1', 'Capacity Trophy')], {
      trophyPlacements,
      overrides: {
        gems: { purchases: [{ no: 40, pucrhased: 25 }] },
        eventShop: { isBonusOwned: (index: number): boolean => index === 29 },
      },
    });

    // Gallery.1.21.js lines 9-18 cap physical capacity at 19, while
    // cumulative tier thresholds continue to assign grades across those slots.
    expect(gallery.podiums).toHaveLength(19);
    expect(gallery.podiums[0]).toMatchObject({ available: true, tier: 4, multiplier: 2.5 });
    expect(gallery.podiums.slice(1, 9).every(podium => podium.available && podium.tier === 3)).toBe(true);
    expect(gallery.podiums.slice(9).every(podium => podium.available && podium.tier === 2)).toBe(true);
  });

  it('assigns mixed podium tiers and still counts a trophy beyond physical capacity', () => {
    const player = makePlayer(0);
    const trophyPlacements = Array(53).fill(0);
    trophyPlacements.fill(1, 48);
    const { gallery } = prepareGallery([
      makeItem('Trophy1', 'Boundary Trophy', [{ effect: '% Drop Rate', value: 1 }]),
    ], {
      trophyPlacements,
      players: [player],
      overrides: {
        gems: { purchases: [{ no: 40, pucrhased: 3 }] },
        eventShop: { isBonusOwned: (index: number): boolean => index === 29 },
      },
    });
    expect(gallery.podiums).toHaveLength(5);
    // Five saved assignments remain ordered even though only four physical
    // podiums are available. The overflow assignment retains its tier and
    // contributes with the ordinary factor of one.
    expect(gallery.podiums.map(podium => ({
      available: podium.available,
      tier: podium.tier,
    }))).toEqual([
      { available: true, tier: 4 },
      { available: true, tier: 3 },
      { available: true, tier: 2 },
      { available: true, tier: 1 },
      { available: false, tier: 1 },
    ]);
    expect(gallery.podiums[4].trophy?.index).toBe(1);
    expect(gallery.getTrophyBonus('% DROP RATE', player)).toBe(8);
  });
});
