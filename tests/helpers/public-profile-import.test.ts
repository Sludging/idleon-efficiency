const { ADAPTER_VERSION, getAdapterVersion, importPublicProfile } = require('./public-profile-import.cjs');

function profile(overrides: Record<string, unknown> = {}) {
  return {
    data: {
      AttackLoadout_3: [1, 2],
      EMm0_3: { 0: { power: 42 } },
      TimeAway: { GlobalTime: 123 },
      NativeUnknown: [1, { value: 'unchanged' }],
    },
    charNames: ['TestOne', 'TestTwo'],
    serverVars: { GameVERSION: 141 },
    companion: { l: ['7,0,0,5,0', '9,0,0,6,1'] },
    ...overrides,
  };
}

function ieProfile(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    playerNames: ['TestOne', 'TestTwo'],
    servervars: { GameVERSION: 141 },
    companions: [{ id: 7, level: 2 }],
    ...overrides,
  };
}

describe('public profile import', () => {
  test('selects the adapter version for each supported source', () => {
    expect(ADAPTER_VERSION).toBe('v1.23-public-profile-3');
    expect(getAdapterVersion()).toBe(ADAPTER_VERSION);
    expect(getAdapterVersion('toolbox')).toBe(ADAPTER_VERSION);
    expect(getAdapterVersion('idleon-efficiency')).toBe('ie-public-profile-1');
  });

  test('rejects unsupported sources through both public entry points', () => {
    expect(() => getAdapterVersion('unknown')).toThrow('Unsupported public profile source');
    expect(() => importPublicProfile(ieProfile(), 'unknown')).toThrow('Unsupported public profile source');
  });

  test.each([undefined, 'toolbox'])('restores Toolbox game JSON encodings with source %s', (source) => {
    const originalList = [1, 2];
    const originalSparse = { 0: { power: 42 } };
    const originalMap = { GlobalTime: 123 };
    const result = importPublicProfile(profile({ data: {
      AttackLoadout_3: originalList,
      EMm0_3: originalSparse,
      TimeAway: originalMap,
      NativeUnknown: ['native', { value: 'kept' }],
    } }), source);

    expect(JSON.parse(result.AttackLoadout_3)).toEqual(originalList);
    expect(JSON.parse(result.EMm0_3)).toEqual(originalSparse);
    expect(JSON.parse(result.TimeAway)).toEqual(originalMap);
    expect(result.NativeUnknown).toEqual(['native', { value: 'kept' }]);
    expect(result.playerNames).toEqual(['TestOne', 'TestTwo']);
    expect(result.servervars).toEqual({ GameVERSION: 141 });
  });

  test('omits numeric-zero private receipt history without changing the profile or gameplay fields', () => {
    const input = profile({ data: {
      GemsPacksPurchased: 0,
      GemsOwned: 123,
      GemItemsPurchased: [1, 2],
      BundlesReceived: { bun_u: 1 },
    } });
    const original = structuredClone(input);
    const result = importPublicProfile(input);

    expect(result).not.toHaveProperty('GemsPacksPurchased');
    expect(input).toEqual(original);
    expect(result.GemsOwned).toBe(123);
    expect(JSON.parse(result.GemItemsPurchased)).toEqual([1, 2]);
    expect(JSON.parse(result.BundlesReceived)).toEqual({ bun_u: 1 });
  });

  test.each([
    ['valid array', ['receipt']],
    ['nonzero number', 1],
    ['string zero', '0'],
  ])('preserves private receipt history: %s', (_name, history) => {
    const input = profile({ data: { GemsPacksPurchased: history } });
    const original = structuredClone(input);
    const result = importPublicProfile(input);

    expect(result.GemsPacksPurchased).toEqual(history);
    expect(input).toEqual(original);
  });

  test('reconstructs owned bundle summaries for save consumers', () => {
    const data = {
      bun_u: 1,
      bon_a: '1',
      ban_l: 0,
      bin_a: '0',
      bunWrong: 1,
      unrelated_u: 1,
    };
    const originalData = structuredClone(data);
    const result = importPublicProfile(profile({ data }));

    expect(JSON.parse(result.BundlesReceived)).toEqual({ bun_u: 1, bon_a: 1 });
    expect(data).toEqual(originalData);
  });

  test('merges paid bundle leaves into existing ownership', () => {
    const data = {
      BundlesReceived: '{"bun_u":1,"ban_m":1}',
      bun_u: 1,
      bin_a: '1',
    };
    const originalData = structuredClone(data);
    const result = importPublicProfile(profile({ data }));

    expect(JSON.parse(result.BundlesReceived)).toEqual({ bun_u: 1, ban_m: 1, bin_a: 1 });
    expect(data).toEqual(originalData);
  });

  test('returns an encoded empty bundle map when ownership is absent', () => {
    const result = importPublicProfile(profile());

    expect(JSON.parse(result.BundlesReceived)).toEqual({});
  });

  test('merges paid bundle leaves into a native ownership map', () => {
    const result = importPublicProfile(profile({ data: {
      BundlesReceived: { bun_u: 1, ban_m: 1 },
      bin_a: 1,
    } }));

    expect(JSON.parse(result.BundlesReceived)).toEqual({ bun_u: 1, ban_m: 1, bin_a: 1 });
  });

  test('matches only exact keys and numeric suffixes', () => {
    const result = importPublicProfile(profile({ data: {
      AttackLoadout_backup: [1],
      AttackLoadout_foo: [3],
      UnknownArray_4: [2],
    } }));
    expect(result.AttackLoadout_backup).toEqual([1]);
    expect(result.AttackLoadout_foo).toEqual([3]);
    expect(result.UnknownArray_4).toEqual([2]);

  });

  test('keeps the highest upgrade marker for duplicate companion IDs', () => {
    const result = importPublicProfile(profile({ companion: { l: [
      '7,0,0,5,0', '9,0,0,6,0', '7,0,0,99,1', '9,0,0,1,0',
    ] } }));
    expect(result.companions).toEqual([{ id: 7, level: 2 }, { id: 9, level: 1 }]);
  });

  test.each([
    ['non-object profile', null],
    ['missing save data', { ...profile(), data: undefined }],
    ['missing character names', { ...profile(), charNames: undefined }],
    ['invalid character names', { ...profile(), charNames: [''] }],
    ['missing server variables', { ...profile(), serverVars: undefined }],
    ['missing companion ownership', { ...profile(), companion: undefined }],
    ['non-array companion ownership', { ...profile(), companion: { l: {} } }],
  ])('rejects %s', (_name, input) => {
    expect(() => importPublicProfile(input)).toThrow();
  });

  test.each([
    ['missing fields', '7,0,0'],
    ['invalid ID', 'seven,0,0,5,0'],
    ['unsupported marker', '7,0,0,5,2'],
    ['non-text row', 7],
  ])('rejects malformed companion row: %s', (_name, row) => {
    expect(() => importPublicProfile(profile({ companion: { l: [row] } }))).toThrow(/companion row/);
  });

  test('rejects conflicting metadata and malformed known-field JSON', () => {
    expect(() => importPublicProfile(profile({ data: { playerNames: ['Other'] } }))).toThrow(/conflicts/);
    expect(() => importPublicProfile(profile({ data: { AttackLoadout_3: '{bad json' } }))).toThrow(/malformed JSON/);
    expect(() => importPublicProfile(profile({ data: { AttackLoadout_3: 17 } }))).toThrow(/AttackLoadout_3/);
    expect(() => importPublicProfile(profile({ data: { BundlesReceived: '{bad json' } }))).toThrow(/BundlesReceived.*malformed JSON/);
  });
});

describe('Idleon Efficiency public profile import', () => {
  test('shallowly preserves ordinary-save values and encoded fields without mutating the profile', () => {
    const input = ieProfile({
      AttackLoadout_3: '[1, 2]',
      EMm0_3: '{"0": {"power": 42}}',
      TimeAway: '{"GlobalTime": 123}',
      NativeUnknown: [1, { value: 'unchanged' }],
      NativeRecord: { enabled: false },
      GemsPacksPurchased: 0,
    });
    const original = structuredClone(input);
    const result = importPublicProfile(input, 'idleon-efficiency');

    expect(result.AttackLoadout_3).toBe('[1, 2]');
    expect(result.EMm0_3).toBe('{"0": {"power": 42}}');
    expect(result.TimeAway).toBe('{"GlobalTime": 123}');
    expect(result.NativeUnknown).toBe(input.NativeUnknown);
    expect(result.NativeRecord).toBe(input.NativeRecord);
    expect(result.playerNames).toBe(input.playerNames);
    expect(result.servervars).toBe(input.servervars);
    expect(result.companions).toBe(input.companions);
    expect(result.GemsPacksPurchased).toBe(0);
    expect(input).toEqual(original);
  });

  test('keeps omitted receipt history absent and does not reconstruct bundle ownership', () => {
    const result = importPublicProfile(ieProfile({ bun_u: 1 }), 'idleon-efficiency');

    expect(result.bun_u).toBe(1);
    expect(result).not.toHaveProperty('GemsPacksPurchased');
    expect(result).not.toHaveProperty('BundlesReceived');
  });

  test.each([
    ['encoded', '{"bun_u":1}'],
    ['native', { bun_u: 1 }],
  ])('does not merge bundle leaves into %s ownership', (_name, ownership) => {
    const result = importPublicProfile(ieProfile({
      BundlesReceived: ownership,
      bin_a: 1,
    }), 'idleon-efficiency');

    expect(result.BundlesReceived).toBe(ownership);
    expect(result.bin_a).toBe(1);
  });

  test.each([
    ['null root', null],
    ['array root', []],
    ['encoded root', '{}'],
    ['Toolbox envelope', profile()],
    ['missing player names', ieProfile({ playerNames: undefined })],
    ['non-array player names', ieProfile({ playerNames: 'TestOne' })],
    ['empty player names', ieProfile({ playerNames: [] })],
    ['empty player name', ieProfile({ playerNames: [''] })],
    ['non-string player name', ieProfile({ playerNames: ['TestOne', 7] })],
    ['missing server variables', ieProfile({ servervars: undefined })],
    ['null server variables', ieProfile({ servervars: null })],
    ['array server variables', ieProfile({ servervars: [] })],
    ['encoded server variables', ieProfile({ servervars: '{}' })],
    ['missing companions', ieProfile({ companions: undefined })],
    ['null companions', ieProfile({ companions: null })],
    ['non-array companions', ieProfile({ companions: {} })],
    ['encoded companions', ieProfile({ companions: '[]' })],
  ])('rejects %s', (_name, input) => {
    expect(() => importPublicProfile(input, 'idleon-efficiency')).toThrow();
  });
});
