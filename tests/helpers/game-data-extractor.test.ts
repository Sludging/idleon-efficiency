import GameDataExtractor from './game-data-extractor';
import targetPlayerConfig from '../utils/target-player.json';

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

  it('accepts the shared target player index by default', async () => {
    const extractor = createExtractor();
    mockActivePlayerIndex(targetPlayerConfig.index);

    await expect(extractor.checkActivePlayer()).resolves.toBe(targetPlayerConfig.index);
  });

  it('rejects an unexpected shared target player index', async () => {
    const extractor = createExtractor();
    const unexpectedIndex = targetPlayerConfig.index === 0 ? 1 : 0;
    mockActivePlayerIndex(unexpectedIndex);

    await expect(extractor.checkActivePlayer()).rejects.toThrow(
      `expected player index ${targetPlayerConfig.index}, found ${unexpectedIndex}`
    );
  });

  it('honors an explicitly required active player index', async () => {
    const extractor = createExtractor({ requiredActivePlayerIndex: 2 });
    mockActivePlayerIndex(2);

    await expect(extractor.checkActivePlayer()).resolves.toBe(2);
  });

  it('substitutes the shared target player index in extraction expressions', async () => {
    const extractor = createExtractor({
      extractions: [
        {
          label: 'target_player_expression',
          expression: 'game.callFunction(__TARGET_PLAYER__)'
        }
      ]
    });
    mockActivePlayerIndex(targetPlayerConfig.index);

    await extractor.extractData();

    const request = (global.fetch as jest.Mock).mock.calls[0];
    expect(JSON.parse(request[1].body)).toEqual({
      expression: `game.callFunction(${targetPlayerConfig.index})`
    });
    expect(extractor.results.extractions.target_player_expression).toMatchObject({
      expression: `game.callFunction(${targetPlayerConfig.index})`,
      result: targetPlayerConfig.index
    });
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
