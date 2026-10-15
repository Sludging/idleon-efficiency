import { createServer } from 'http';
import fs from 'fs';
import os from 'os';
import path from 'path';
import BatchExtractor from './extract-all-game-data';
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
});

describe('GameDataExtractor offline busy handling', () => {
  const busyError = 'Offline runtime is busy; send requests serially';
  const response = (status: number, body: Record<string, unknown>) => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('waits for pre-execution busy responses, then sends the same expression serially', async () => {
    const extractor = new GameDataExtractor('/tmp/config.json', '/tmp/results.json');
    const fetchMock = jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce(response(409, { error: busyError }))
      .mockResolvedValueOnce(response(409, { error: busyError }))
      .mockResolvedValueOnce(response(200, { result: 42 }));
    const result = expect(extractor.executeExpression('game.value()')).resolves.toBe(42);

    await jest.advanceTimersByTimeAsync(0);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(250);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await jest.advanceTimersByTimeAsync(250);
    await result;
    expect(fetchMock).toHaveBeenCalledTimes(3);
    for (const [, options] of fetchMock.mock.calls) {
      expect(JSON.parse(String(options?.body))).toEqual({ expression: 'game.value()' });
    }
    expect(jest.getTimerCount()).toBe(0);
  });

  it.each([
    [409, 'Another conflict'],
    [500, 'Native evaluation failed'],
    [500, busyError],
  ])('does not retry terminal HTTP %s errors: %s', async (status, error) => {
    const extractor = new GameDataExtractor('/tmp/config.json', '/tmp/results.json');
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(response(status, { error }));

    await expect(extractor.executeExpression('game.value()')).rejects.toThrow(
      `Execution failed: ${error}`
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('does not retry network errors after a possibly executed expression', async () => {
    const extractor = new GameDataExtractor('/tmp/config.json', '/tmp/results.json');
    const fetchMock = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Connection lost'));

    await expect(extractor.executeExpression('game.value()')).rejects.toThrow('Connection lost');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('fails after thirty seconds of pre-execution busy responses without another request', async () => {
    const extractor = new GameDataExtractor('/tmp/config.json', '/tmp/results.json');
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(response(409, { error: busyError }));
    const result = expect(extractor.executeExpression('game.value()')).rejects.toThrow(
      'Offline runtime remained busy for 30000ms; expression was not executed'
    );

    await jest.advanceTimersByTimeAsync(30000);
    await result;
    expect(fetchMock).toHaveBeenCalledTimes(120);
    await jest.advanceTimersByTimeAsync(1000);
    expect(fetchMock).toHaveBeenCalledTimes(120);
    expect(jest.getTimerCount()).toBe(0);
  });
});

describe('GameDataExtractor persisted results', () => {
  let tempDir: string;
  let configPath: string;
  let outputPath: string;
  let value: unknown;
  let failure: string;
  let serverStatus: Record<string, unknown>;
  const valueExpression = `game.value(${targetPlayerConfig.index})`;
  const baselineExtractions = [
    {
      label: 'value',
      expression: 'game.value(__TARGET_PLAYER__)',
      description: 'A description used only by the config',
    },
    { label: 'large', expression: 'game.large()' },
    { label: 'failed', expression: 'game.failed()', description: 'Failure context' },
  ];
  const expectedResults = (result: unknown, error: string, expression = valueExpression) => ({
    extractions: {
      value: { expression, result },
      large: {
        expression: 'game.large()',
        result: { type: 'large_number', value: '100000000000000000000' },
      },
    },
    errors: {
      failed: {
        expression: 'game.failed()',
        error: `Failed to execute "game.failed()": Execution failed: ${error}`,
      },
    },
  });
  const extract = async (extractions = baselineExtractions) => {
    fs.writeFileSync(configPath, JSON.stringify({ extractions }));
    const extractor = new GameDataExtractor(configPath, outputPath, { verbose: false });
    await extractor.run({ exitOnError: false });
    return fs.readFileSync(outputPath);
  };

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'game-data-extractor-'));
    configPath = path.join(tempDir, 'config.json');
    outputPath = path.join(tempDir, 'results', 'game-data.json');
    value = { number: 12, text: '12', enabled: false, values: [0, '2', null] };
    failure = 'Unavailable game value';
    serverStatus = { status: 'ready', injected: true, uptime: 1 };
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(global, 'fetch').mockImplementation(async (url, options) => {
      if (String(url).endsWith('/status')) {
        return { ok: true, json: async () => serverStatus } as Response;
      }
      const { expression } = JSON.parse(String(options?.body));
      if (expression === 'game.failed()') {
        return { ok: false, json: async () => ({ error: failure }) } as Response;
      }
      const result = expression.startsWith('game.value(')
        ? value
        : expression === 'game.large()' ? 1e20 : targetPlayerConfig.index;
      return { ok: true, json: async () => ({ result }) } as Response;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('persists only resolved expressions, normalized results and errors without rewriting identical bytes', async () => {
    const originalBytes = await extract();
    expect(JSON.parse(originalBytes.toString('utf8'))).toEqual(expectedResults(value, failure));
    const oldTime = new Date('2000-01-01T00:00:00.000Z');
    fs.utimesSync(outputPath, oldTime, oldTime);
    const originalMtime = fs.statSync(outputPath).mtimeMs;

    serverStatus = { status: 'ready', injected: true, uptime: 1000 };
    const unchangedBytes = await extract(baselineExtractions.map(extraction => ({
      ...extraction,
      description: 'Changed config-only description',
    })));

    expect(unchangedBytes.equals(originalBytes)).toBe(true);
    expect(fs.statSync(outputPath).mtimeMs).toBe(originalMtime);
  });

  it.each(['value', 'expression', 'error'] as const)(
    'updates the persisted output when an executed %s changes',
    async change => {
      const originalBytes = await extract();
      const oldTime = new Date('2000-01-01T00:00:00.000Z');
      fs.utimesSync(outputPath, oldTime, oldTime);
      const originalMtime = fs.statSync(outputPath).mtimeMs;
      let extractions = baselineExtractions;
      let expression = valueExpression;
      if (change === 'value') {
        value = '12';
      } else if (change === 'expression') {
        expression = `game.value(${targetPlayerConfig.index}, 1)`;
        extractions = baselineExtractions.map(extraction =>
          extraction.label === 'value' ? { ...extraction, expression } : extraction
        );
      } else {
        failure = 'Different game failure';
      }

      const updatedBytes = await extract(extractions);

      expect(updatedBytes.equals(originalBytes)).toBe(false);
      expect(JSON.parse(updatedBytes.toString('utf8'))).toEqual(
        expectedResults(value, failure, expression)
      );
      expect(fs.statSync(outputPath).mtimeMs).not.toBe(originalMtime);
    }
  );
});
describe('BatchExtractor player server routing', () => {
  it('routes a config requiring player zero to its explicitly selected server', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'batch-player-server-'));
    const configPath = path.join(tempDir, 'player-zero.json');
    const resultPath = path.join(tempDir, 'player-zero-data.json');
    fs.writeFileSync(configPath, JSON.stringify({
      requiredActivePlayerIndex: 0,
      extractions: [{ label: 'value', expression: 'game.value()' }],
    }));

    const requests: Array<{ path: string; expression?: string }> = [];
    const server = createServer(async (request, response) => {
      if (request.url === '/status') {
        requests.push({ path: request.url });
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ status: 'ready', injected: true }));
        return;
      }

      const chunks: Buffer[] = [];
      for await (const chunk of request) chunks.push(Buffer.from(chunk));
      const { expression } = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      requests.push({ path: request.url || '', expression });
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({
        result: expression.includes('GetPlayersUsernames') ? 0 : 'player-zero-value',
      }));
    });

    try {
      await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
      const address = server.address();
      if (!address || typeof address === 'string') throw new Error('Test server did not bind');

      const batch = new BatchExtractor({
        outputDir: tempDir,
        playerServers: { 0: `http://127.0.0.1:${address.port}` },
      });
      batch.configFiles = [{ name: 'player-zero.json', configPath, resultPath }];
      await batch.extractAll();

      expect(requests.map(request => request.path)).toEqual(['/status', '/exec', '/exec']);
      expect(requests[1].expression).toContain('GetPlayersUsernames');
      expect(requests[2]).toMatchObject({ path: '/exec', expression: 'game.value()' });
      expect(JSON.parse(fs.readFileSync(resultPath, 'utf8')).extractions.value.result)
        .toBe('player-zero-value');
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close(error => error ? reject(error) : resolve())
      );
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
