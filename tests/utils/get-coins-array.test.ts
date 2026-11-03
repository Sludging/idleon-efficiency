import { Coins, getCoinsArray } from '../../data/utility';

const denominationBoundaries: Array<[number, Coins]> = [
  [1, Coins.Copper],
  [1e2, Coins.Silver],
  [1e4, Coins.Gold],
  [1e6, Coins.Platinum],
  [1e8, Coins.Dementia],
  [1e10, Coins.Void],
  [1e12, Coins.Lustre],
  [1e14, Coins.Starfire],
  [1e16, Coins.Dreadlo],
  [1e18, Coins.Godshard],
  [1e20, Coins.Sunder],
  [1e22, Coins.Tydal],
  [1e24, Coins.Marbiglass],
  [1e26, Coins.Orberal],
  [1e28, Coins.Eclipse],
  [1e30, Coins.Neuro],
  [1e32, Coins.Isometric],
  [1e34, Coins.Cyber],
  [1e36, Coins.Synthesis],
  [1e38, Coins.Polarity],
  [1e40, Coins.Solaris],
  [1e42, Coins.Nebula],
  [1e44, Coins.Aurora],
  [1e46, Coins.Abyssal],
  [1e48, Coins.Twilight],
  [1e50, Coins.Cinder],
  [1e52, Coins.Frostshard],
  [1e54, Coins.Seraph],
  [1e56, Coins.Rubicon],
  [1e58, Coins.Verdigris],
];

describe('getCoinsArray', () => {
  it('converts 100 copper to one silver and retains zero copper', () => {
    expect([...getCoinsArray(100)]).toEqual([
      [Coins.Silver, 1],
      [Coins.Copper, 0],
    ]);
  });

  it('keeps 9999 copper below the gold boundary', () => {
    expect([...getCoinsArray(9999)]).toEqual([
      [Coins.Silver, 99],
      [Coins.Copper, 99],
    ]);
  });

  it.each<[number, Array<[Coins, number]>]>([
    [1.99, [[Coins.Copper, 1]]],
    [100.99, [[Coins.Silver, 1], [Coins.Copper, 0]]],
    [9999.99, [[Coins.Silver, 99], [Coins.Copper, 99]]],
  ])('discards fractional copper from %s', (amount, expected) => {
    expect([...getCoinsArray(amount)]).toEqual(expected);
  });

  it.each([0, 0.99, -1, -100, NaN, Infinity, -Infinity])(
    'returns zero copper for an unsupported or sub-copper amount: %s',
    (amount) => {
      expect([...getCoinsArray(amount)]).toEqual([[Coins.Copper, 0]]);
    },
  );

  it.each(denominationBoundaries)(
    'starts the correct tier at the exact boundary %s without spurious lower coins',
    (amount, tier) => {
      const result = [...getCoinsArray(amount)];

      expect(result[0]).toEqual([tier, 1]);
      expect(result.map(([, quantity]) => quantity)).toEqual([1, 0, 0, 0, 0].slice(0, tier));
    },
  );

  it.each(denominationBoundaries.filter(([, tier]) => tier >= Coins.Polarity))(
    'keeps the amount just below %s in the previous tier',
    (amount, tier) => {
      const result = [...getCoinsArray(amount * (1 - Number.EPSILON))];

      expect(result[0]).toEqual([tier - 1, 99]);
      expect(result).toHaveLength(5);
      expect(result.every(([, quantity]) => quantity >= 0 && quantity < 100)).toBe(true);
    },
  );

  it.each(denominationBoundaries.filter(([, tier]) => tier >= Coins.Polarity))(
    'keeps the amount just above %s in the new tier',
    (amount, tier) => {
      const result = [...getCoinsArray(amount * (1 + Number.EPSILON))];

      expect(result[0]).toEqual([tier, 1]);
      expect(result.map(([, quantity]) => quantity)).toEqual([1, 0, 0, 0, 0]);
    },
  );

  it('splits a mixed balance in descending order and keeps only the highest five tiers', () => {
    expect([...getCoinsArray(12_345_678_901_234)]).toEqual([
      [Coins.Lustre, 12],
      [Coins.Void, 34],
      [Coins.Dementia, 56],
      [Coins.Platinum, 78],
      [Coins.Gold, 90],
    ]);
  });

  it('keeps quantities above 99 in Verdigris instead of creating an unsupported tier', () => {
    expect([...getCoinsArray(1e60)]).toEqual([
      [Coins.Verdigris, 100],
      [Coins.Rubicon, 0],
      [Coins.Seraph, 0],
      [Coins.Frostshard, 0],
      [Coins.Cinder, 0],
    ]);
  });
});
