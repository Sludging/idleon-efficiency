import {
  ExtractionContext,
  ExtractionResults,
  validateTownExtractionContext,
} from './live-game-data-loader';

describe('validateTownExtractionContext', () => {
  const selectedContext: ExtractionContext = {
    activePlayerIndex: 2,
    mapId: 0,
    mapInternalName: 'W1Town',
  };

  const results: ExtractionResults = {
    extractions: {},
    errors: {},
    context: { ...selectedContext },
  };

  it('accepts matching Town capture and selected save contexts', () => {
    expect(() => validateTownExtractionContext(results, selectedContext)).not.toThrow();
  });

  it('requires a new Town capture when capture context is missing', () => {
    const withoutContext: ExtractionResults = { extractions: {}, errors: {} };

    expect(() => validateTownExtractionContext(withoutContext, selectedContext))
      .toThrow('Extraction context is missing. Capture new results while the active player is in Town.');
  });

  it.each(['W1Field', 'W1town'])('rejects non-Town capture map %s', (mapInternalName) => {
    const capture = { ...results, context: { ...selectedContext, mapInternalName } };

    expect(() => validateTownExtractionContext(capture, selectedContext))
      .toThrow('Extraction was not captured in Town. Move the active player to Town and capture new results.');
  });

  it.each(['W1Field', 'W1town'])('rejects non-Town selected save map %s', (mapInternalName) => {
    const selected = { ...selectedContext, mapInternalName };

    expect(() => validateTownExtractionContext(results, selected))
      .toThrow('The selected save is not in Town. Save with the active player in Town before comparing results.');
  });

  it('rejects different Town map IDs and identifies both maps', () => {
    const selected = { ...selectedContext, mapId: 70, mapInternalName: 'W2Town' };

    expect(() => validateTownExtractionContext(results, selected))
      .toThrow("Town map mismatch: capture mapId 0, selected save mapId 70. Capture results in the selected save's Town.");
  });

  it('rejects different active players and identifies both indices', () => {
    const selected = { ...selectedContext, activePlayerIndex: 3 };

    expect(() => validateTownExtractionContext(results, selected))
      .toThrow("Active player mismatch: capture activePlayerIndex 2, selected save activePlayerIndex 3. Capture results with the selected save's active player.");
  });

  it('accepts unrelated result fields without applying extraction health checks', () => {
    const capture = {
      ...results,
      extractions: { damage: { expression: 'damage', result: 123 } },
      errors: { unrelated: { expression: 'other', error: 'unrelated failure' } },
      saveHash: 'different-save-content',
      metadata: { changed: true },
    };

    expect(() => validateTownExtractionContext(capture, selectedContext)).not.toThrow();
  });

  it('uses Town classification rather than requiring identical internal map names', () => {
    const selected = { ...selectedContext, mapInternalName: 'AnotherTownName' };

    expect(() => validateTownExtractionContext(results, selected)).not.toThrow();
  });
});
