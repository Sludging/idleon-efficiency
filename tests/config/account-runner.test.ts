import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import { spawn, ChildProcess } from 'node:child_process';
import { EventEmitter } from 'node:events';

jest.mock('node:child_process', () => ({
  ...jest.requireActual('node:child_process'),
  spawn: jest.fn()
}));

const {
  extractAccount,
  latestDatasetPath,
  parseArgs,
  readSnapshotManifest,
  selectedAccounts,
  writeProfileSnapshot
} = require('../helpers/test-accounts.cjs');
const { ADAPTER_VERSION } = require('../helpers/public-profile-import.cjs');
const { hashFile, hashConfigs, hashAssets } = require('../helpers/account-dataset.cjs');

describe('account runner CLI contract', () => {
  it('rejects unknown commands and flags', () => {
    expect(() => parseArgs(['unknown', '--accounts', 'suk69'])).toThrow('Expected fetch, extract, test, or list command');
    expect(() => parseArgs(['fetch', '--accounts', 'suk69', '--unknown'])).toThrow('Unknown option: --unknown');
  });

  it('rejects missing option values, malformed IDs, and the prohibited server port', () => {
    expect(() => parseArgs(['fetch', '--accounts'])).toThrow('--accounts requires a value');
    expect(() => parseArgs(['fetch', '--accounts', '../suk69'])).toThrow('Account IDs must be unique lowercase letters, numbers, or hyphens');
    expect(() => parseArgs(['extract', '--accounts', 'suk69', '--port', '3101'])).toThrow('must not reuse the default server port 3101');
  });

  it('rejects valid-looking account IDs absent from the selection config', () => {
    const options = parseArgs(['list', '--accounts', 'unknown-account']);

    expect(() => selectedAccounts(options)).toThrow('Unknown account ID: unknown-account');
  });

  it('keeps last successful dataset selected after a newer snapshot fetch', () => {
    const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'account-runner-'));
    const account = { id: 'suk69' };
    const accountDir = path.join(cacheDir, account.id);
    const completedDataset = path.join(accountDir, 'snapshots', 'older', 'runs', 'complete', 'dataset.json');
    const newerSnapshot = path.join(accountDir, 'snapshots', 'newer');
    fs.mkdirSync(path.dirname(completedDataset), { recursive: true });
    fs.mkdirSync(newerSnapshot, { recursive: true });
    fs.writeFileSync(completedDataset, JSON.stringify({ accountId: account.id }));
    fs.writeFileSync(path.join(accountDir, 'latest.json'), JSON.stringify({ snapshot: 'snapshots/newer' }));
    fs.writeFileSync(path.join(accountDir, 'latest-dataset.json'), JSON.stringify({ dataset: 'snapshots/older/runs/complete/dataset.json' }));

    try {
      expect(fs.readFileSync(latestDatasetPath({ cacheDir }, account), 'utf8')).toBe(JSON.stringify({ accountId: account.id }));
    } finally {
      fs.rmSync(cacheDir, { recursive: true, force: true });
    }
  });

  it('rejects snapshot saved with an obsolete importer', () => {
    const snapshot = fs.mkdtempSync(path.join(os.tmpdir(), 'account-snapshot-'));
    fs.writeFileSync(path.join(snapshot, 'manifest.json'), JSON.stringify({
      schemaVersion: 1,
      accountId: 'suk69',
      playerIndex: 3,
      adapterVersion: 'obsolete-adapter'
    }));

    try {
      expect(() => readSnapshotManifest(snapshot, { id: 'suk69', playerIndex: 3 })).toThrow('Snapshot importer version mismatch');
    } finally {
      fs.rmSync(snapshot, { recursive: true, force: true });
    }
  });
});

describe('public-profile snapshot source boundaries', () => {
  let cacheDir: string;
  const account = { id: 'synthetic-profile', profileName: 'Synthetic', playerIndex: 1, source: 'idleon-efficiency' };
  const ieAdapterVersion = 'ie-public-profile-1';

  beforeEach(() => {
    cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'profile-source-snapshot-'));
  });

  afterEach(() => {
    fs.rmSync(cacheDir, { recursive: true, force: true });
  });

  it.each([undefined, 'toolbox'])('accepts legacy source-omitted Toolbox snapshots with configured source %s', (source) => {
    fs.writeFileSync(path.join(cacheDir, 'manifest.json'), JSON.stringify({
      schemaVersion: 1, accountId: account.id, playerIndex: 1, adapterVersion: ADAPTER_VERSION
    }));

    expect(() => readSnapshotManifest(cacheDir, { ...account, source })).not.toThrow();
  });

  it.each([
    ['idleon-efficiency', 'toolbox', ieAdapterVersion, 'Snapshot source mismatch'],
    ['toolbox', 'idleon-efficiency', ADAPTER_VERSION, 'Snapshot source mismatch'],
    [undefined, 'idleon-efficiency', ADAPTER_VERSION, 'Snapshot source mismatch'],
    ['idleon-efficiency', 'idleon-efficiency', ADAPTER_VERSION, 'Snapshot importer version mismatch'],
    ['toolbox', 'toolbox', ieAdapterVersion, 'Snapshot importer version mismatch'],
    ['unknown-source', 'unknown-source', ieAdapterVersion, 'Unsupported public profile source']
  ])('rejects snapshot source %s with configured source %s and adapter %s', (source, configuredSource, adapterVersion, error) => {
    fs.writeFileSync(path.join(cacheDir, 'manifest.json'), JSON.stringify({
      schemaVersion: 1, accountId: account.id, playerIndex: 1, source, adapterVersion
    }));

    expect(() => readSnapshotManifest(cacheDir, { ...account, source: configuredSource })).toThrow(error);
  });

  it.each(['2026-10-19T12:00:00.000Z', undefined])(
    'preserves IE cached bytes and publication metadata %s without using gameplay timestamps',
    (sourceUpdatedAt) => {
      const options = { cacheDir };
      const fetchedAt = '2026-10-20T12:00:00.000Z';
      const importedAt = '2026-10-21T12:00:00.000Z';
      const rawBytes = Buffer.from(`${JSON.stringify({
        playerNames: ['First', 'Selected'],
        servervars: { GameVERSION: 141 },
        companions: [],
        AttackLoadout_0: '[1, 2]',
        NativeUnknown: [1, { kept: true }],
        TimeAway: '{"GlobalTime":123,"TimeAway":456}',
        lastUpdated: '2020-01-01T00:00:00.000Z',
        bun_u: 1
      }, null, 2)}\n`);
      const firstSnapshot = writeProfileSnapshot(options, account, rawBytes, { fetchedAt, sourceUpdatedAt });
      const firstManifestPath = path.join(firstSnapshot, 'manifest.json');
      const firstManifestBytes = fs.readFileSync(firstManifestPath);
      const firstManifest = readSnapshotManifest(firstSnapshot, account);
      const firstSaveBytes = fs.readFileSync(path.join(firstSnapshot, firstManifest.savePath));
      const retainedRawBytes = fs.readFileSync(path.join(firstSnapshot, firstManifest.rawProfilePath));
      const accountDir = path.join(cacheDir, account.id);
      const sourceSnapshot = path.relative(accountDir, firstSnapshot).split(path.sep).join('/');
      const secondSnapshot = writeProfileSnapshot(options, account, retainedRawBytes, {
        fetchedAt, importedAt, sourceSnapshot, sourceUpdatedAt: firstManifest.sourceUpdatedAt
      });
      const secondManifest = readSnapshotManifest(secondSnapshot, account);
      const secondSavePath = path.join(secondSnapshot, secondManifest.savePath);
      const secondRawPath = path.join(secondSnapshot, secondManifest.rawProfilePath);
      const secondSave = JSON.parse(fs.readFileSync(secondSavePath, 'utf8'));

      expect(secondSnapshot).not.toBe(firstSnapshot);
      expect(retainedRawBytes).toEqual(rawBytes);
      expect(fs.readFileSync(secondRawPath)).toEqual(rawBytes);
      expect(firstManifest).toMatchObject({
        schemaVersion: 1, source: 'idleon-efficiency', adapterVersion: ieAdapterVersion,
        fetchedAt, playerIndex: 1, playerName: 'Selected'
      });
      expect(secondManifest).toMatchObject({
        schemaVersion: 1, source: 'idleon-efficiency', adapterVersion: ieAdapterVersion,
        fetchedAt, importedAt, sourceSnapshot, playerIndex: 1, playerName: 'Selected',
        rawProfileSha256: hashFile(secondRawPath), saveSha256: hashFile(secondSavePath)
      });
      expect(firstManifest.sourceUpdatedAt).toBe(sourceUpdatedAt);
      expect(secondManifest.sourceUpdatedAt).toBe(sourceUpdatedAt);
      expect(secondManifest.rawProfileSha256).toBe(firstManifest.rawProfileSha256);
      expect(secondSave.AttackLoadout_0).toBe('[1, 2]');
      expect(secondSave.NativeUnknown).toEqual([1, { kept: true }]);
      expect(secondSave.TimeAway).toBe('{"GlobalTime":123,"TimeAway":456}');
      expect(secondSave).not.toHaveProperty('GemsPacksPurchased');
      expect(secondSave).not.toHaveProperty('BundlesReceived');
      expect(fs.readFileSync(firstManifestPath)).toEqual(firstManifestBytes);
      expect(fs.readFileSync(path.join(firstSnapshot, firstManifest.savePath))).toEqual(firstSaveBytes);
    }
  );
});

describe('serial public-account extraction', () => {
  const root = path.resolve(__dirname, '../..');
  const configsDir = path.join(root, 'tests/configs');
  const assetRoot = path.join(root, 'assets/distBuild/static/game');
  const retainedSavePath = path.join(root, 'tests/fixtures/saves/latest.json');
  const narrowConfigs = ['default-player.json', 'required-player-zero.json', 'required-player-three.json'];
  const activePlayerExpression = 'idleon.getAttr("GetPlayersUsernames").indexOf(idleon.getAttr("UserInfo")[0])';
  const spawnMock = jest.mocked(spawn);
  const retainedSave = JSON.parse(fs.readFileSync(retainedSavePath, 'utf8'));
  const gameVersion = { title: 'Boundary runtime', version: 'transport-fixture' };
  let cacheDir: string;
  let originalPlayerIndex: string | undefined;
  let originalDataset: string | undefined;

  beforeEach(() => {
    cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'serial-account-runner-'));
    originalPlayerIndex = process.env.TEST_ACCOUNT_PLAYER_INDEX;
    originalDataset = process.env.TEST_ACCOUNT_DATASET;
    delete process.env.TEST_ACCOUNT_DATASET;
    spawnMock.mockReset();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    if (originalPlayerIndex === undefined) delete process.env.TEST_ACCOUNT_PLAYER_INDEX;
    else process.env.TEST_ACCOUNT_PLAYER_INDEX = originalPlayerIndex;
    if (originalDataset === undefined) delete process.env.TEST_ACCOUNT_DATASET;
    else process.env.TEST_ACCOUNT_DATASET = originalDataset;
    fs.rmSync(cacheDir, { recursive: true, force: true });
  });

  function snapshotFixture(playerIndex = 1, source?: string) {
    const account = { id: 'retained-save', profileName: 'retained-save', playerIndex, source };
    const accountDir = path.join(cacheDir, account.id);
    const snapshot = path.join(accountDir, 'snapshots', 'retained');
    const savePath = path.join(snapshot, 'save.json');
    const manifestPath = path.join(snapshot, 'manifest.json');
    const pointerPath = path.join(accountDir, 'latest-dataset.json');
    const previousDatasetPath = path.join(accountDir, 'previous', 'dataset.json');
    const previousPointer = JSON.stringify({ dataset: 'previous/dataset.json' });
    fs.mkdirSync(snapshot, { recursive: true });
    fs.mkdirSync(path.dirname(previousDatasetPath), { recursive: true });
    fs.copyFileSync(retainedSavePath, savePath);
    const manifest = {
      schemaVersion: 1,
      accountId: account.id,
      profileName: account.profileName,
      source,
      adapterVersion: source === 'idleon-efficiency' ? 'ie-public-profile-1' : ADAPTER_VERSION,
      savePath: 'save.json',
      saveSha256: hashFile(savePath),
      playerIndex: 3,
      playerName: retainedSave.playerNames[3]
    };
    fs.writeFileSync(manifestPath, JSON.stringify(manifest));
    fs.writeFileSync(path.join(accountDir, 'latest.json'), JSON.stringify({ snapshot: 'snapshots/retained' }));
    fs.writeFileSync(previousDatasetPath, '{"previous":true}');
    fs.writeFileSync(pointerPath, previousPointer);
    return {
      account, snapshot, savePath, manifest, manifestPath, pointerPath, previousPointer, previousDatasetPath,
      options: { cacheDir, basePort: 3211 }
    };
  }

  it('preserves raw profile bytes and immutable snapshots during cached reimport', () => {
    const { account, options } = snapshotFixture();
    const fetchedAt = '2026-10-20T12:00:00.000Z';
    const importedAt = '2026-10-21T12:00:00.000Z';
    const sourceUpdatedAt = '2026-10-19T12:00:00.000Z';
    const profile = {
      data: { GemsPacksPurchased: 0, GemsOwned: 123, GemItemsPurchased: [1, 2] },
      charNames: retainedSave.playerNames,
      serverVars: retainedSave.servervars,
      companion: { l: [] },
      lastUpdated: sourceUpdatedAt
    };
    const rawBytes = Buffer.from(`${JSON.stringify(profile, null, 2)}\n`);
    const firstSnapshot = writeProfileSnapshot(options, account, rawBytes, { fetchedAt });
    const accountDir = path.join(cacheDir, account.id);
    const firstManifestPath = path.join(firstSnapshot, 'manifest.json');
    const firstManifestBytes = fs.readFileSync(firstManifestPath);
    const firstManifest = JSON.parse(firstManifestBytes.toString('utf8'));
    const firstRawPath = path.join(firstSnapshot, firstManifest.rawProfilePath);
    const firstSavePath = path.join(firstSnapshot, firstManifest.savePath);
    const firstRawBytes = fs.readFileSync(firstRawPath);
    const firstSaveBytes = fs.readFileSync(firstSavePath);
    const pointerPath = path.join(accountDir, 'latest.json');
    expect(path.resolve(accountDir, JSON.parse(fs.readFileSync(pointerPath, 'utf8')).snapshot)).toBe(firstSnapshot);

    const sourceSnapshot = path.relative(accountDir, firstSnapshot).split(path.sep).join('/');
    const secondSnapshot = writeProfileSnapshot(options, account, firstRawBytes, {
      fetchedAt, importedAt, sourceSnapshot
    });
    const secondManifest = JSON.parse(fs.readFileSync(path.join(secondSnapshot, 'manifest.json'), 'utf8'));
    const secondRawPath = path.join(secondSnapshot, secondManifest.rawProfilePath);
    const secondSavePath = path.join(secondSnapshot, secondManifest.savePath);
    const secondRawBytes = fs.readFileSync(secondRawPath);
    const secondSave = JSON.parse(fs.readFileSync(secondSavePath, 'utf8'));

    expect(path.isAbsolute(firstSnapshot)).toBe(true);
    expect(path.isAbsolute(secondSnapshot)).toBe(true);
    expect(secondSnapshot).not.toBe(firstSnapshot);
    expect(firstRawBytes).toEqual(rawBytes);
    expect(secondRawBytes).toEqual(firstRawBytes);
    expect(JSON.parse(secondRawBytes.toString('utf8')).data.GemsPacksPurchased).toBe(0);
    expect(secondSave).not.toHaveProperty('GemsPacksPurchased');
    expect(secondSave.GemsOwned).toBe(123);
    expect(secondSave.GemItemsPurchased).toBe(JSON.stringify([1, 2]));
    expect(firstManifest).toMatchObject({
      source: 'toolbox', adapterVersion: ADAPTER_VERSION,
      fetchedAt, sourceUpdatedAt, playerIndex: 1, playerName: retainedSave.playerNames[1],
      rawProfilePath: 'raw-profile.json', savePath: 'save.json',
      rawProfileSha256: hashFile(firstRawPath), saveSha256: hashFile(firstSavePath)
    });
    expect(firstManifest).not.toHaveProperty('importedAt');
    expect(firstManifest).not.toHaveProperty('sourceSnapshot');
    expect(secondManifest).toMatchObject({
      source: 'toolbox', adapterVersion: ADAPTER_VERSION,
      fetchedAt, sourceUpdatedAt, importedAt, sourceSnapshot,
      playerIndex: 1, playerName: retainedSave.playerNames[1],
      rawProfilePath: 'raw-profile.json', savePath: 'save.json',
      rawProfileSha256: hashFile(secondRawPath), saveSha256: hashFile(secondSavePath)
    });
    expect(secondManifest.rawProfileSha256).toBe(firstManifest.rawProfileSha256);
    expect(path.resolve(accountDir, JSON.parse(fs.readFileSync(pointerPath, 'utf8')).snapshot)).toBe(secondSnapshot);
    expect(fs.readFileSync(firstRawPath)).toEqual(firstRawBytes);
    expect(fs.readFileSync(firstSavePath)).toEqual(firstSaveBytes);
    expect(fs.readFileSync(firstManifestPath)).toEqual(firstManifestBytes);
  });

  function externalRuntime(options: {
    configs?: string[];
    holdFirstClose?: boolean;
    startupFailureIndex?: number;
    extractionFailureIndex?: number;
    cleanupFailureIndex?: number;
    preparationStatus?: { preparationCharacter?: unknown; preparationPlayerName?: unknown };
  } = {}) {
    const events: string[] = [];
    const requests: Array<{ actor: number; route: string; expression?: string; selectedIndex?: string }> = [];
    const children: Array<{
      actor: number;
      preparationActor: number;
      port: number;
      savePath: string;
      child: EventEmitter;
    }> = [];
    let active: typeof children[number] | undefined;
    let unclosed = 0;
    let maximumUnclosed = 0;
    let discoveries = 0;
    const { promise: firstExit, resolve: notifyFirstExit } = Promise.withResolvers<void>();
    const { promise: firstCloseReleased, resolve: releaseFirstClose } = Promise.withResolvers<void>();
    const readDirectory = fs.readdirSync;
    const readFile = fs.readFileSync;
    const fileExists = fs.existsSync;
    const fileStat = fs.statSync;
    const assetFixture = path.join(cacheDir, 'asset-boundary');
    const configFixture = path.join(cacheDir, 'config-boundary');
    if (options.configs) {
      fs.mkdirSync(configFixture);
      const configs = [
        { name: narrowConfigs[0], config: {} },
        { name: narrowConfigs[1], config: { requiredActivePlayerIndex: 0 } },
        { name: narrowConfigs[2], config: { requiredActivePlayerIndex: 3 } }
      ];
      for (const { name, config } of configs) {
        fs.writeFileSync(path.join(configFixture, name), JSON.stringify({
          ...config,
          extractions: [{ label: 'transport_value', expression: 'transport.value()' }]
        }));
      }
    }
    fs.mkdirSync(assetFixture);
    fs.writeFileSync(path.join(assetFixture, 'runtime.txt'), 'offline runtime asset transport fixture\n');
    jest.spyOn(fs, 'existsSync').mockImplementation(file => {
      const resolved = String(file) === assetRoot ? assetFixture
        : options.configs && String(file) === configsDir ? configFixture
        : options.configs && path.dirname(String(file)) === configsDir
          ? path.join(configFixture, path.basename(String(file))) : file;
      return fileExists(resolved);
    });
    jest.spyOn(fs, 'statSync').mockImplementation((file, statOptions) => {
      const resolved = String(file) === assetRoot ? assetFixture
        : options.configs && String(file) === configsDir ? configFixture
        : options.configs && path.dirname(String(file)) === configsDir
          ? path.join(configFixture, path.basename(String(file))) : file;
      return Reflect.apply(fileStat, fs, [resolved, statOptions]);
    });
    jest.spyOn(fs, 'readFileSync').mockImplementation((file, readOptions) => {
      const resolved = String(file) === path.join(assetRoot, 'runtime.txt')
        ? path.join(assetFixture, 'runtime.txt')
        : options.configs && path.dirname(String(file)) === configsDir
          ? path.join(configFixture, path.basename(String(file))) : file;
      return Reflect.apply(readFile, fs, [resolved, readOptions]);
    });

    jest.spyOn(fs, 'readdirSync').mockImplementation((directory, readOptions) => {
      const source = String(directory) === assetRoot ? assetFixture
        : options.configs && String(directory) === configsDir ? configFixture : directory;
      let entries = Reflect.apply(readDirectory, fs, [source, readOptions]);
      if (String(directory) === configsDir && !readOptions) {
        discoveries += 1;
        const selectedNames = options.configs;
        if (selectedNames) entries = selectedNames.filter(name => entries.includes(name));
      }
      return entries;
    });

    jest.spyOn(net, 'createServer').mockImplementation(() => {
      const server = new EventEmitter();
      Object.assign(server, {
        listen: jest.fn((_port: number, _host: string, ready: () => void) => {
          queueMicrotask(ready);
          return server;
        }),
        close: jest.fn((closed: () => void) => {
          queueMicrotask(closed);
          return server;
        })
      });
      return server as unknown as net.Server;
    });

    spawnMock.mockImplementation((_executable, args) => {
      const argv = args as readonly string[];
      if (argv[0] !== path.join(root, 'sub-projects/idleon-offline/start.cjs')) {
        throw new Error(`Unexpected child process: ${argv[0]}`);
      }
      const actor = Number(argv[argv.indexOf('--character') + 1]);
      if (!argv.includes('--prepare-character')) throw new Error('Missing preparation character option');
      const preparationActor = Number(argv[argv.indexOf('--prepare-character') + 1]);
      const port = Number(argv[argv.indexOf('--port') + 1]);
      const savePath = argv[argv.indexOf('--save') + 1];
      const child: EventEmitter & {
        stdout: EventEmitter;
        stderr: EventEmitter;
        exitCode: number | null;
        signalCode: NodeJS.Signals | null;
        killed: boolean;
        kill: (signal?: NodeJS.Signals | number) => boolean;
      } = Object.assign(new EventEmitter(), {
        stdout: new EventEmitter(),
        stderr: new EventEmitter(),
        exitCode: null,
        signalCode: null,
        killed: false,
        kill: jest.fn((_signal?: NodeJS.Signals | number) => {
          child.killed = true;
          events.push(`stop:${actor}`);
          queueMicrotask(async () => {
            const code = actor === options.cleanupFailureIndex ? 1 : 0;
            child.exitCode = code;
            child.emit('exit', code, null);
            events.push(`exit:${actor}`);
            if (children[0].child === child) {
              notifyFirstExit();
              if (options.holdFirstClose) await firstCloseReleased;
            }
            setImmediate(() => {
              unclosed -= 1;
              if (active?.child === child) active = undefined;
              events.push(`close:${actor}`);
              child.emit('close', code, null);
            });
          });
          return true;
        })
      });
      const runtime = { actor, preparationActor, port, savePath, child };
      children.push(runtime);
      active = runtime;
      unclosed += 1;
      maximumUnclosed = Math.max(maximumUnclosed, unclosed);
      events.push(`spawn:${actor}`);
      return child as unknown as ChildProcess;
    });

    function response(payload: unknown, status = 200) {
      return { ok: status >= 200 && status < 300, status, json: async () => payload } as Response;
    }

    jest.spyOn(global, 'fetch').mockImplementation(async (input, init) => {
      const url = new URL(String(input));
      if (!active || url.origin !== `http://127.0.0.1:${active.port}`) {
        throw new Error(`Request outside the owned runtime: ${url}`);
      }
      const actor = active.actor;
      const route = url.pathname;
      const expression = init?.body ? JSON.parse(String(init.body)).expression as string : undefined;
      requests.push({ actor, route, expression, selectedIndex: process.env.TEST_ACCOUNT_PLAYER_INDEX });
      if (route === '/status') {
        return response({
          source: 'offline', cdpConnected: true, injected: true, gameReady: true,
          character: actor,
          playerName: actor === options.startupFailureIndex ? 'wrong transport identity' : retainedSave.playerNames[actor],
          preparationCharacter: active.preparationActor,
          preparationPlayerName: retainedSave.playerNames[active.preparationActor],
          ...options.preparationStatus
        });
      }
      if (route === '/cloud-save') return response(retainedSave);
      if (route === '/game-version') return response(gameVersion);
      if (route !== '/exec') throw new Error(`Unexpected runtime route: ${route}`);
      if (expression === activePlayerExpression) return response({ result: actor });
      if (actor === options.extractionFailureIndex) {
        return response({ error: `transport extraction failure for player ${actor}` }, 500);
      }
      // These payloads exercise transport and persistence, not game calculations.
      if (expression?.includes('const mapInternalName=')) {
        return response({ result: { activePlayerIndex: actor, mapId: 0, mapInternalName: 'TransportTown' } });
      }
      return response({ result: null });
    });

    return {
      events, requests, children, firstExit, releaseFirstClose,
      get maximumUnclosed() { return maximumUnclosed; },
      get unclosed() { return unclosed; },
      get discoveries() { return discoveries; }
    };
  }

  function retainedOutputs(fixture: { snapshot: string }) {
    const runs = path.join(fixture.snapshot, 'runs');
    const runDirs = fs.readdirSync(runs);
    expect(runDirs).toHaveLength(1);
    const resultsDir = path.join(runs, runDirs[0], 'results');
    return { resultsDir, files: fs.readdirSync(resultsDir).sort() };
  }

  it('routes every discovered config once, then atomically promotes a complete hashed dataset', async () => {
    const fixture = snapshotFixture();
    const configNames = fs.readdirSync(configsDir).filter(name => name.endsWith('.json'));
    const runtime = externalRuntime();
    const rename = fs.renameSync;
    const promotions: string[] = [];
    jest.spyOn(fs, 'renameSync').mockImplementation((source, destination) => {
      if (String(destination) === fixture.pointerPath) {
        expect(fs.readFileSync(fixture.pointerPath, 'utf8')).toBe(fixture.previousPointer);
        expect(runtime.unclosed).toBe(0);
        const pointer = JSON.parse(fs.readFileSync(source, 'utf8'));
        const datasetPath = path.resolve(path.dirname(fixture.pointerPath), pointer.dataset);
        expect(fs.existsSync(datasetPath)).toBe(true);
        promotions.push(String(source));
      }
      rename(source, destination);
    });

    await extractAccount(fixture.options, fixture.account);

    const datasetPath = latestDatasetPath(fixture.options, fixture.account);
    const descriptor = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    const { resultsDir, files } = retainedOutputs(fixture);
    expect(files).toEqual(configNames.map(name => name.replace('.json', '-data.json')).sort());
    expect(Object.keys(descriptor.results).sort()).toEqual(files);
    expect(descriptor.schemaVersion).toBe(2);
    expect(descriptor.source).toBe('toolbox');
    expect(descriptor.adapterVersion).toBe(ADAPTER_VERSION);
    expect(descriptor.saveSha256).toBe(hashFile(fixture.savePath));
    expect(descriptor.configSha256).toBe(hashConfigs(configsDir));
    expect(descriptor.assetSha256).toBe(hashAssets(assetRoot));
    expect(descriptor.playerIndex).toBe(fixture.account.playerIndex);
    expect(descriptor.playerName).toBe(retainedSave.playerNames[fixture.account.playerIndex]);
    expect(descriptor.preparationPlayerIndex).toBe(fixture.account.playerIndex);
    expect(descriptor.preparationPlayerName).toBe(retainedSave.playerNames[fixture.account.playerIndex]);
    expect(Object.keys(descriptor).sort()).toEqual([
      'schemaVersion', 'accountId', 'profileName', 'source', 'adapterVersion', 'savePath', 'saveSha256',
      'resultsDir', 'playerIndex', 'playerName', 'gameVersion', 'preparationPlayerIndex',
      'preparationPlayerName', 'assetSha256', 'configSha256', 'results', 'extractedAt'
    ].sort());
    expect(descriptor.gameVersion).toEqual(gameVersion);
    expect(path.resolve(path.dirname(datasetPath), descriptor.savePath)).toBe(fixture.savePath);
    let expectedExecCalls = 0;
    for (const name of configNames) {
      const config = JSON.parse(fs.readFileSync(path.join(configsDir, name), 'utf8'));
      expectedExecCalls += config.extractions.length + 1;
      if (config.extractions.some((entry: { requiresTown?: boolean }) => entry.requiresTown === true)) {
        expectedExecCalls += 1;
      }
      const resultFile = name.replace('.json', '-data.json');
      const result = JSON.parse(fs.readFileSync(path.join(resultsDir, resultFile), 'utf8'));
      expect(descriptor.results[resultFile]).toBe(hashFile(path.join(resultsDir, resultFile)));
      expect(result.errors).toEqual({});
      expect(Object.keys(result.extractions)).toEqual(config.extractions.map((entry: { label: string }) => entry.label));
      for (const extraction of config.extractions) {
        const expression = extraction.expression.replaceAll('__TARGET_PLAYER__', String(fixture.account.playerIndex));
        const calls = runtime.requests.filter(request => request.expression === expression);
        expect(calls.some(request => request.actor === (config.requiredActivePlayerIndex ?? fixture.account.playerIndex))).toBe(true);
      }
    }
    expect(runtime.requests.filter(request => request.route === '/exec')).toHaveLength(expectedExecCalls);
    expect(runtime.discoveries).toBe(1);
    expect(runtime.maximumUnclosed).toBe(1);
    expect(runtime.unclosed).toBe(0);
    expect(promotions).toHaveLength(1);
    expect(promotions[0]).not.toBe(fixture.pointerPath);
    expect(fs.existsSync(promotions[0])).toBe(false);
    expect(fs.readFileSync(fixture.previousDatasetPath, 'utf8')).toBe('{"previous":true}');
    expect(hashFile(fixture.savePath)).toBe(fixture.manifest.saveSha256);
  });

  it.each([undefined, '7'])('awaits close before the next actor and restores player override %s', async (previousIndex) => {
    if (previousIndex === undefined) delete process.env.TEST_ACCOUNT_PLAYER_INDEX;
    else process.env.TEST_ACCOUNT_PLAYER_INDEX = previousIndex;
    const fixture = snapshotFixture();
    const runtime = externalRuntime({ configs: narrowConfigs, holdFirstClose: true });
    const extraction = extractAccount(fixture.options, fixture.account);
    // Attach rejection handling before waiting on controlled child events.
    const outcome = extraction.then(() => undefined, (error: Error) => error);
    try {
      await runtime.firstExit;
      const nextTurn = Promise.withResolvers<void>();
      setImmediate(nextTurn.resolve);
      await nextTurn.promise;
      expect(runtime.children).toHaveLength(1);
      expect(runtime.events).toEqual(['spawn:1', 'stop:1', 'exit:1']);
      expect(fs.readFileSync(fixture.pointerPath, 'utf8')).toBe(fixture.previousPointer);
    } finally {
      runtime.releaseFirstClose();
      await outcome;
    }
    expect(await outcome).toBeUndefined();

    expect(runtime.children.map(child => child.actor)).toEqual([1, 0, 3]);
    expect(runtime.children.every(child => child.port === fixture.options.basePort)).toBe(true);
    expect(runtime.children.every(child => child.savePath === fixture.savePath)).toBe(true);
    expect(runtime.children.map(child => child.preparationActor)).toEqual([1, 1, 1]);
    expect(runtime.maximumUnclosed).toBe(1);
    expect(runtime.unclosed).toBe(0);
    for (let index = 1; index < runtime.children.length; index += 1) {
      expect(runtime.events.indexOf(`close:${runtime.children[index - 1].actor}`))
        .toBeLessThan(runtime.events.indexOf(`spawn:${runtime.children[index].actor}`));
    }
    for (const actor of [1, 0, 3]) {
      expect(runtime.requests.filter(request => request.actor === actor).map(request => request.route))
        .toEqual(expect.arrayContaining(['/status', '/cloud-save', '/game-version', '/exec']));
    }
    expect(runtime.requests.filter(request => request.route === '/exec').every(request => request.selectedIndex === '1')).toBe(true);
    expect(process.env.TEST_ACCOUNT_PLAYER_INDEX).toBe(previousIndex);
    expect(runtime.discoveries).toBe(1);
  });

  it.each([
    { preparationPlayerIndex: 0, source: undefined, adapterVersion: ADAPTER_VERSION },
    { preparationPlayerIndex: 6, source: 'idleon-efficiency', adapterVersion: 'ie-public-profile-1' }
  ])('uses preparation actor $preparationPlayerIndex and records source $source', async ({ preparationPlayerIndex, source, adapterVersion }) => {
    const fixture = snapshotFixture(1, source);
    const account = { ...fixture.account, preparationPlayerIndex };
    const runtime = externalRuntime({ configs: narrowConfigs });

    await extractAccount(fixture.options, account);

    expect(runtime.children.map(child => child.actor)).toEqual([1, 0, 3]);
    expect(runtime.children.map(child => child.preparationActor))
      .toEqual([preparationPlayerIndex, preparationPlayerIndex, preparationPlayerIndex]);
    expect(runtime.maximumUnclosed).toBe(1);
    expect(runtime.unclosed).toBe(0);
    const descriptor = JSON.parse(fs.readFileSync(latestDatasetPath(fixture.options, account), 'utf8'));
    expect(descriptor.schemaVersion).toBe(2);
    expect(descriptor.source).toBe(source ?? 'toolbox');
    expect(descriptor.adapterVersion).toBe(adapterVersion);
    expect(descriptor.playerIndex).toBe(1);
    expect(descriptor.playerName).toBe(retainedSave.playerNames[1]);
    expect(descriptor.preparationPlayerIndex).toBe(preparationPlayerIndex);
    expect(descriptor.preparationPlayerName).toBe(retainedSave.playerNames[preparationPlayerIndex]);
  });

  it.each([null, -1, 0.5, '0', true, Number.MAX_SAFE_INTEGER + 1, NaN, Infinity])(
    'rejects malformed preparationPlayerIndex %p before starting a runtime', async (preparationPlayerIndex) => {
      const fixture = snapshotFixture();
      const account = { ...fixture.account, preparationPlayerIndex };
      const configPath = path.join(cacheDir, 'accounts.json');
      fs.writeFileSync(configPath, JSON.stringify({ accounts: [account] }));
      externalRuntime({ configs: narrowConfigs });

      expect(() => selectedAccounts({ configPath, ids: [account.id] })).toThrow(/preparationPlayerIndex/);
      await expect(extractAccount(fixture.options, account)).rejects.toThrow(/preparationPlayerIndex/);

      expect(spawnMock).not.toHaveBeenCalled();
      expect(fs.readFileSync(fixture.pointerPath, 'utf8')).toBe(fixture.previousPointer);
      expect(fs.existsSync(path.join(fixture.snapshot, 'runs'))).toBe(false);
    }
  );

  it('rejects a preparation actor absent from the saved snapshot before starting a runtime', async () => {
    const fixture = snapshotFixture();
    const account = { ...fixture.account, preparationPlayerIndex: retainedSave.playerNames.length };
    externalRuntime({ configs: narrowConfigs });

    await expect(extractAccount(fixture.options, account)).rejects.toThrow(/preparation player index.*absent/i);

    expect(spawnMock).not.toHaveBeenCalled();
    expect(fs.readFileSync(fixture.pointerPath, 'utf8')).toBe(fixture.previousPointer);
    expect(fs.existsSync(path.join(fixture.snapshot, 'runs'))).toBe(false);
  });

  it.each([
    { preparationCharacter: 0 },
    { preparationCharacter: '1' },
    { preparationPlayerName: 'wrong preparation identity' },
    { preparationCharacter: undefined },
    { preparationPlayerName: undefined }
  ])('rejects ready preparation identity mismatch %p without promoting a dataset', async (preparationStatus) => {
    const fixture = snapshotFixture();
    const runtime = externalRuntime({ configs: narrowConfigs, preparationStatus });

    await expect(extractAccount(fixture.options, fixture.account))
      .rejects.toThrow(/unexpected preparation player identity/);

    expect(runtime.children.map(child => child.actor)).toEqual([1, 0, 3]);
    expect(runtime.unclosed).toBe(0);
    expect(runtime.requests.some(request => request.route === '/exec')).toBe(false);
    expect(fs.readFileSync(fixture.pointerPath, 'utf8')).toBe(fixture.previousPointer);
    const { resultsDir, files } = retainedOutputs(fixture);
    expect(files).toEqual([]);
    expect(fs.existsSync(path.join(path.dirname(resultsDir), 'dataset.json'))).toBe(false);
  });

  it.each(['startup', 'extraction'] as const)('retains partial outputs and aggregates %s failure without pointer promotion', async (failure) => {
    process.env.TEST_ACCOUNT_PLAYER_INDEX = '7';
    const fixture = snapshotFixture();
    const runtime = externalRuntime({
      configs: narrowConfigs,
      startupFailureIndex: failure === 'startup' ? 0 : undefined,
      extractionFailureIndex: failure === 'extraction' ? 0 : undefined
    });

    await expect(extractAccount(fixture.options, fixture.account)).rejects.toThrow(
      failure === 'startup' ? /unexpected active player identity/ : /extraction/i);

    expect(runtime.children.map(child => child.actor)).toEqual([1, 0, 3]);
    expect(runtime.maximumUnclosed).toBe(1);
    expect(runtime.unclosed).toBe(0);
    expect(fs.readFileSync(fixture.pointerPath, 'utf8')).toBe(fixture.previousPointer);
    expect(latestDatasetPath(fixture.options, fixture.account)).toBe(fixture.previousDatasetPath);
    expect(process.env.TEST_ACCOUNT_PLAYER_INDEX).toBe('7');
    const { resultsDir, files } = retainedOutputs(fixture);
    expect(files).toContain('default-player-data.json');
    expect(files).toContain('required-player-three-data.json');
    if (failure === 'extraction') {
      const partial = JSON.parse(fs.readFileSync(path.join(resultsDir, 'required-player-zero-data.json'), 'utf8'));
      expect(Object.keys(partial.errors).length).toBeGreaterThan(0);
      expect(Object.values(partial.errors).every(entry =>
        entry !== null && typeof entry === 'object' && 'error' in entry &&
        typeof entry.error === 'string' && entry.error.includes('transport extraction failure'))).toBe(true);
    }
    expect(fs.existsSync(path.join(path.dirname(resultsDir), 'dataset.json'))).toBe(false);
  });

  it('reports startup and extraction failures together after closing every attempted actor', async () => {
    const fixture = snapshotFixture();
    const runtime = externalRuntime({
      configs: narrowConfigs, startupFailureIndex: 0, extractionFailureIndex: 3
    });

    const outcome = await extractAccount(fixture.options, fixture.account)
      .then(() => undefined, (error: Error) => error);

    expect(outcome).toBeInstanceOf(Error);
    expect(outcome?.message).toContain('player 0');
    expect(outcome?.message).toContain('unexpected active player identity');
    expect(outcome?.message).toContain('player 3');
    expect(outcome?.message).toContain('transport extraction failure');
    expect(outcome?.message).toContain('outputs retained at');
    expect(runtime.children.map(child => child.actor)).toEqual([1, 0, 3]);
    expect(runtime.unclosed).toBe(0);
    expect(fs.readFileSync(fixture.pointerPath, 'utf8')).toBe(fixture.previousPointer);
    expect(retainedOutputs(fixture).files).toEqual([
      'default-player-data.json', 'required-player-three-data.json'
    ]);
  });

  it('does not promote or start another runtime when child cleanup fails', async () => {
    const fixture = snapshotFixture();
    const runtime = externalRuntime({ configs: narrowConfigs, cleanupFailureIndex: 1 });

    await expect(extractAccount(fixture.options, fixture.account)).rejects.toThrow(/cleanup failed/i);

    expect(runtime.children.map(child => child.actor)).toEqual([1]);
    expect(runtime.unclosed).toBe(0);
    expect(fs.readFileSync(fixture.pointerPath, 'utf8')).toBe(fixture.previousPointer);
    expect(retainedOutputs(fixture).files).toEqual(['default-player-data.json']);
  });

  it('accepts cached fetch actor 3 when the selected default changes without changing snapshot identity', async () => {
    const fixture = snapshotFixture(1);
    const originalManifest = fs.readFileSync(fixture.manifestPath, 'utf8');
    externalRuntime({ configs: narrowConfigs });
    expect(readSnapshotManifest(fixture.snapshot, fixture.account)).toEqual(fixture.manifest);

    await extractAccount(fixture.options, fixture.account);

    const descriptor = JSON.parse(fs.readFileSync(latestDatasetPath(fixture.options, fixture.account), 'utf8'));
    expect(descriptor.schemaVersion).toBe(2);
    expect(descriptor.playerIndex).toBe(1);
    expect(descriptor.playerName).toBe(retainedSave.playerNames[1]);
    expect(fs.readFileSync(fixture.manifestPath, 'utf8')).toBe(originalManifest);
    expect(hashFile(fixture.savePath)).toBe(fixture.manifest.saveSha256);
  });

  it('checks the recorded fetch identity separately from the selected default identity', async () => {
    const fixture = snapshotFixture(1);
    fs.writeFileSync(fixture.manifestPath, JSON.stringify({
      ...fixture.manifest, playerName: retainedSave.playerNames[1]
    }));
    externalRuntime({ configs: narrowConfigs });

    await expect(extractAccount(fixture.options, fixture.account)).rejects.toThrow(/identity mismatch/i);

    expect(spawnMock).not.toHaveBeenCalled();
    expect(fs.readFileSync(fixture.pointerPath, 'utf8')).toBe(fixture.previousPointer);
  });

  it('rejects a selected default absent from the genuine save before starting a runtime', async () => {
    const fixture = snapshotFixture(retainedSave.playerNames.length);
    externalRuntime({ configs: narrowConfigs });

    await expect(extractAccount(fixture.options, fixture.account)).rejects.toThrow(/player.*(absent|identity mismatch)/i);

    expect(spawnMock).not.toHaveBeenCalled();
    expect(fs.readFileSync(fixture.pointerPath, 'utf8')).toBe(fixture.previousPointer);
  });

  it('rejects a snapshot save hash mismatch without changing the successful pointer', async () => {
    const fixture = snapshotFixture();
    fs.writeFileSync(fixture.manifestPath, JSON.stringify({ ...fixture.manifest, saveSha256: 'obsolete-hash' }));
    externalRuntime({ configs: narrowConfigs });

    await expect(extractAccount(fixture.options, fixture.account)).rejects.toThrow('Snapshot save hash mismatch');

    expect(spawnMock).not.toHaveBeenCalled();
    expect(fs.readFileSync(fixture.pointerPath, 'utf8')).toBe(fixture.previousPointer);
  });
});
