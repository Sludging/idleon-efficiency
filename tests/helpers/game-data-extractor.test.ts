import GameDataExtractor from './game-data-extractor';

describe('GameDataExtractor active-player policy', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const createExtractor = (config: Record<string, unknown> = {}) => {
    const extractor = new GameDataExtractor('/tmp/test-config.json', '/tmp/test-results.json');
    extractor.config = { extractions: [], ...config };
    return extractor;
  };

  const mockActivePlayerIndex = (activePlayerIndex: number) => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ result: activePlayerIndex }),
    } as Response);
  };

  it('accepts the default active player index', async () => {
    const extractor = createExtractor();
    mockActivePlayerIndex(0);

    await expect(extractor.checkActivePlayer()).resolves.toBe(0);
  });

  it('rejects an unexpected default active player index', async () => {
    const extractor = createExtractor();
    mockActivePlayerIndex(1);

    await expect(extractor.checkActivePlayer()).rejects.toThrow(
      'expected player index 0, found 1'
    );
  });

  it('honors an explicitly required active player index', async () => {
    const extractor = createExtractor({ requiredActivePlayerIndex: 2 });
    mockActivePlayerIndex(2);

    await expect(extractor.checkActivePlayer()).resolves.toBe(2);
  });

  it('checks the active player before extracting data', async () => {
    const extractor = createExtractor();
    const calls: string[] = [];

    extractor.loadConfig = jest.fn(async () => calls.push('loadConfig'));
    extractor.checkServerStatus = jest.fn(async () => {
      calls.push('checkServerStatus');
      return true;
    });
    extractor.checkActivePlayer = jest.fn(async () => calls.push('checkActivePlayer'));
    extractor.extractData = jest.fn(async () => calls.push('extractData'));
    extractor.saveResults = jest.fn(() => calls.push('saveResults'));

    await extractor.run();

    expect(calls).toEqual([
      'loadConfig',
      'checkServerStatus',
      'checkActivePlayer',
      'extractData',
      'saveResults',
    ]);
  });
});
