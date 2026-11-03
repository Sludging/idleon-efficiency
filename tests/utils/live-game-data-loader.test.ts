import {
  ExtractionContext,
  ExtractionResults,
  getExtractedValue,
  normalizeExtractedValue,
  validateExtractionContext,
} from './live-game-data-loader';
import damageConfig from '../configs/player-maximum-damage.json';

const excludedMaps = damageConfig.extractions[0].excludedMapInternalNames;

describe('validateExtractionContext', () => {
  const selectedContext: ExtractionContext = {
    activePlayerIndex: 2,
    mapId: 1,
    mapInternalName: 'W1Field',
  };
  const results: ExtractionResults = {
    extractions: {},
    errors: {},
    context: { ...selectedContext },
  };

  it.each(['W1Field', 'Town', 'W1town'])(
    'accepts matching actor and map context on allowed map %s',
    mapInternalName => {
      const selected = { ...selectedContext, mapInternalName };
      const captured = { ...results, context: { ...selected } };
      expect(() => validateExtractionContext(captured, selected, excludedMaps)).not.toThrow();
    },
  );

  it('rejects missing capture context', () => {
    expect(() => validateExtractionContext({ extractions: {}, errors: {} }, selectedContext, excludedMaps))
      .toThrow();
  });

  it.each([
    { activePlayerIndex: -1 },
    { activePlayerIndex: NaN },
    { mapId: -1 },
    { mapId: 1.5 },
    { mapInternalName: '' },
    { mapInternalName: undefined },
  ])('rejects malformed capture and selected contexts %j', change => {
    const invalid = { ...selectedContext, ...change } as ExtractionContext;
    expect(() => validateExtractionContext({ ...results, context: invalid }, selectedContext, excludedMaps)).toThrow();
    expect(() => validateExtractionContext(results, invalid, excludedMaps)).toThrow();
  });

  it('rejects Clamworks in either capture or selected save', () => {
    const clamworks = { ...selectedContext, mapId: 306, mapInternalName: 'uAquaA6' };
    expect(() => validateExtractionContext({ ...results, context: clamworks }, selectedContext, excludedMaps)).toThrow();
    expect(() => validateExtractionContext(results, clamworks, excludedMaps)).toThrow();
    expect(() => validateExtractionContext({ ...results, context: clamworks }, clamworks, excludedMaps)).toThrow();
  });

  it.each([
    { mapId: 2 },
    { mapInternalName: 'W1Field2' },
    { activePlayerIndex: 3 },
  ])('rejects mismatched actor or map %j', change => {
    expect(() => validateExtractionContext(results, { ...selectedContext, ...change }, excludedMaps)).toThrow();
  });

  it('does not confuse context validation with extraction health', () => {
    const capture = {
      ...results,
      extractions: { damage: { expression: 'damage', result: 123 } },
      errors: { unrelated: { expression: 'other', error: 'unrelated failure' } },
    };
    expect(() => validateExtractionContext(capture, selectedContext, excludedMaps)).not.toThrow();
  });
});

describe('numeric extraction boundary', () => {
  it.each([
    [0, 0],
    [-12.5, -12.5],
    ['12.5', 12.5],
    ['-2.5e-8', -2.5e-8],
    [{ type: 'large_number', value: '1e+100' }, 1e100],
  ])('decodes finite numeric capture %j', (captured, expected) => {
    expect(normalizeExtractedValue(captured)).toBe(expected);
  });

  it.each([
    null, undefined, NaN, Infinity, -Infinity, '', ' ', '12 damage', 'NaN', 'Infinity',
    [], {}, true, '0x10', { type: 'large_number', value: '12bad' },
    { type: 'large_number', value: '1e999' }, { type: 'large_number' },
    { type: 'large_number', value: null }, { type: 'large_number', value: 12 },
  ].map(captured => ({ captured })))('rejects unavailable or invalid numeric capture %j', ({ captured }) => {
    expect(() => normalizeExtractedValue(captured)).toThrow();
  });

  it('decodes the capture wrapper at the consumer boundary', () => {
    const results: ExtractionResults = {
      extractions: { speed: { expression: 'speed()', result: { type: 'large_number', value: '1e+100' } } },
      errors: {},
    };
    expect(getExtractedValue(results, 'speed')).toBe(1e100);
    results.extractions.speed.result = null;
    expect(() => getExtractedValue(results, 'speed')).toThrow();
    delete results.extractions.speed;
    expect(() => getExtractedValue(results, 'speed')).toThrow();
  });
});
