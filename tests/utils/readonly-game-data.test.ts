import { guardAndFreeze } from './readonly-game-data';

describe('guardAndFreeze', () => {
  it('blocks Map and Set mutations while preserving reads and freezing entries', () => {
    const key = { nested: { value: 1 } };
    const value = { nested: { value: 2 } };
    const member = { nested: { value: 3 } };
    const map = new Map([[key, value]]);
    const set = new Set([member]);
    const root = { map, set };

    expect(guardAndFreeze(root)).toBe(root);

    const mutations = [
      () => map.set(key, { nested: { value: 4 } }),
      () => map.delete(key),
      () => map.clear(),
      () => set.add({ nested: { value: 4 } }),
      () => set.delete(member),
      () => set.clear(),
    ];
    for (const mutate of mutations) {
      expect(mutate).toThrow(TypeError);
    }

    expect(map.get(key)).toBe(value);
    expect([...map]).toEqual([[key, value]]);
    expect(map.size).toBe(1);
    expect(set.has(member)).toBe(true);
    expect([...set]).toEqual([member]);
    expect(set.size).toBe(1);
    for (const entry of [key, value, member]) {
      expect(() => { entry.nested.value = 4; }).toThrow(TypeError);
    }
    expect(key.nested.value).toBe(1);
    expect(value.nested.value).toBe(2);
    expect(member.nested.value).toBe(3);
  });

  it('blocks Date mutations while preserving date reads', () => {
    const date = new Date('2024-01-02T03:04:05.000Z');
    const timestamp = date.getTime();

    expect(guardAndFreeze(date)).toBe(date);
    expect(() => date.setTime(0)).toThrow(TypeError);
    expect(date.getTime()).toBe(timestamp);
    expect(() => date.setUTCFullYear(2030)).toThrow(TypeError);
    expect(date.getTime()).toBe(timestamp);
    expect(date.toISOString()).toBe('2024-01-02T03:04:05.000Z');
  });

  it('freezes cyclic graphs, arrays, symbol properties, and state used by arrow functions', () => {
    const symbol = Symbol('member');
    class Probe {
      values = [{ value: 1 }];
      [symbol] = { value: 2 };
      self = this;
      mutate = () => { this.values[0].value = 3; };
    }
    const root = new Probe();

    expect(guardAndFreeze(root)).toBe(root);
    expect(root).toBeInstanceOf(Probe);
    expect(root.self).toBe(root);
    expect(root.values[0].value).toBe(1);
    expect(root[symbol].value).toBe(2);
    expect(() => root.values.push({ value: 4 })).toThrow(TypeError);
    expect(() => { root[symbol].value = 4; }).toThrow(TypeError);
    expect(root.mutate).toThrow(TypeError);
    expect(root.values[0].value).toBe(1);
    expect(root.values).toEqual([{ value: 1 }]);
    expect(root[symbol].value).toBe(2);
  });
});
