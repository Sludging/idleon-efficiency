'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const net = require('node:net');
const { spawn } = require('node:child_process');
const { importPublicProfile, getAdapterVersion } = require('./public-profile-import.cjs');
const { loadAccountDataset, hashFile, hashConfigs, hashAssets } = require('./account-dataset.cjs');

const root = path.resolve(__dirname, '../..');
const defaultConfig = path.join(root, 'tests/accounts/accounts.json');
const defaultCache = path.join(root, '.cache/test-accounts');
const offlineStart = path.join(root, 'sub-projects/idleon-offline/start.cjs');
const BatchExtractor = require('./extract-all-game-data.js');
const assetRoot = path.join(root, 'assets/distBuild/static/game');
const ownedProcesses = new Set();
let cleanupPromise;
function cleanEnv(overrides = {}) {
  const env = { ...process.env };
  delete env.TEST_ACCOUNT_DATASET;
  delete env.TEST_ACCOUNT_PLAYER_INDEX;
  return Object.assign(env, overrides);
}

function fail(message) { throw new Error(message); }
function prepareJestArgs(options) {
  const retainedArgs = options.jestArgs;
  const explicitRunInBand = retainedArgs.some(argument => argument === '--runInBand' || argument === '-i');
  if (explicitRunInBand) return retainedArgs;
  const workerArgs = [];
  const hasMaxWorkers = retainedArgs.some(argument => argument === '--maxWorkers' || argument.startsWith('--maxWorkers=') || argument === '-w' || argument.startsWith('-w='));
  const hasMemoryLimit = retainedArgs.some(argument => argument === '--workerIdleMemoryLimit' || argument.startsWith('--workerIdleMemoryLimit='));
  if (!hasMaxWorkers) workerArgs.push('--maxWorkers=1');
  if (!hasMemoryLimit) workerArgs.push('--workerIdleMemoryLimit=512MB');
  return [...workerArgs, ...retainedArgs];
}

function publicProfileMetrics(profile) {
  const parsedData = profile.parsedData;
  if (!parsedData || typeof parsedData !== 'object' || Array.isArray(parsedData)) return {};
  const keys = ['currentWorld', 'slab', 'totalTomePoints', 'totalOutposts', 'totalShinyLevels', 'totalBreedabilityLevels', 'totalBoats', 'highestSpelunkingPower'];
  return Object.fromEntries(keys.filter(key => parsedData[key] !== undefined).map(key => [key, parsedData[key]]));
}

function listMetrics(value) {
  if (!value || typeof value !== 'object') return 'not available';
  return Object.entries(value).map(([key, metric]) => `${key}=${metric}`).join(', ') || 'not available';
}
function selectionMetrics(progression) {
  if (!progression || typeof progression !== 'object') return 'not recorded';
  return Object.entries(progression).filter(([key]) => key !== 'sourceUpdatedAt')
    .map(([key, value]) => `${key}=${value}`).join(', ') || 'not recorded';
}
function formatSourceDate(value) {
  if (typeof value === 'number') {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  return value ?? 'not fetched';
}
function parseArgs(argv) {
  const [command, ...args] = argv;
  if (!['fetch', 'extract', 'test', 'list'].includes(command)) fail('Expected fetch, extract, test, or list command');
  const options = { command, jestArgs: [] };
  let forwarding = false;
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (forwarding) { options.jestArgs.push(arg); continue; }
    if (arg === '--') { forwarding = true; continue; }
    if (arg === '--accounts' || arg === '--config' || arg === '--cache-dir' || arg === '--port') {
      if (!args[index + 1] || args[index + 1].startsWith('--')) fail(`${arg} requires a value`);
      const key = { '--accounts': 'accounts', '--config': 'config', '--cache-dir': 'cacheDir', '--port': 'port' }[arg];
      options[key] = args[++index];
    } else fail(`Unknown option: ${arg}`);
  }
  if (forwarding && command !== 'test') fail('Jest arguments are only valid for the test command');
  if (!options.accounts) fail('--accounts is required');
  options.ids = options.accounts.split(',').map(id => id.trim());
  if (options.ids.some(id => !/^[a-z0-9-]+$/.test(id)) || new Set(options.ids).size !== options.ids.length) fail('Account IDs must be unique lowercase letters, numbers, or hyphens');
  options.configPath = path.resolve(options.config || defaultConfig);
  options.cacheDir = path.resolve(options.cacheDir || defaultCache);
  options.basePort = options.port === undefined ? 3211 : Number(options.port);
  if (options.basePort === 3101) fail('Account runner must not reuse the default server port 3101');
  if (!Number.isSafeInteger(options.basePort) || options.basePort < 1 || options.basePort > 65535) fail('--port must be an integer from 1 to 65535');
  return options;
}
function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function readConfig(file) {
  const config = readJson(file);
  if (!Array.isArray(config.accounts)) fail(`Invalid account config: ${file}`);
  const byId = new Map(config.accounts.map(account => [account.id, account]));
  return byId;
}
function preparationIndexFor(account) {
  const index = account.preparationPlayerIndex === undefined ? account.playerIndex : account.preparationPlayerIndex;
  if (!Number.isSafeInteger(index) || index < 0) {
    fail(`Invalid preparationPlayerIndex ${index} for ${account.id}: expected a nonnegative safe integer`);
  }
  return index;
}
function selectedAccounts(options) {
  const all = readConfig(options.configPath);
  return options.ids.map(id => {
    const account = all.get(id);
    if (!account) fail(`Unknown account ID: ${id}`);
    getAdapterVersion(account.source);
    preparationIndexFor(account);
    return account;
  });
}
function accountDirectory(options, account) { return path.join(options.cacheDir, account.id); }
function safePointer(base, relative) {
  if (typeof relative !== 'string' || path.isAbsolute(relative)) fail('Invalid relative pointer path');
  const resolved = path.resolve(base, relative);
  if (resolved !== base && !resolved.startsWith(`${base}${path.sep}`)) fail('Pointer path escapes its directory');
  return resolved;
}
function latestSnapshot(options, account) {
  const dir = accountDirectory(options, account);
  const pointer = readJson(path.join(dir, 'latest.json'));
  return safePointer(dir, pointer.snapshot);
}
function latestDatasetPath(options, account) {
  const base = accountDirectory(options, account);
  const pointer = readJson(path.join(base, 'latest-dataset.json'));
  return safePointer(base, pointer.dataset);
}

function validateSnapshotManifest(manifest, account) {
  if (!manifest || manifest.schemaVersion !== 1) fail('Unsupported snapshot manifest schema version');
  if (manifest.accountId !== account.id) {
    fail(`Latest snapshot does not match configured account ${account.id}`);
  }
  const source = manifest.source === undefined ? 'toolbox' : manifest.source;
  const configuredSource = account.source === undefined ? 'toolbox' : account.source;
  const adapterVersion = getAdapterVersion(source);
  getAdapterVersion(configuredSource);
  if (source !== configuredSource) {
    fail(`Snapshot source mismatch for ${account.id}: expected ${configuredSource}, found ${source}`);
  }
  if (manifest.adapterVersion !== adapterVersion) {
    fail(`Snapshot importer version mismatch for ${account.id}: expected ${adapterVersion}, found ${manifest.adapterVersion}`);
  }
  if (!Number.isSafeInteger(manifest.playerIndex) || manifest.playerIndex < 0) {
    fail(`Invalid snapshot player index for ${account.id}`);
  }
}
function readSnapshotManifest(snapshot, account) {
  const manifest = readJson(path.join(snapshot, 'manifest.json'));
  validateSnapshotManifest(manifest, account);
  return manifest;
}
function writeJson(file, value) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`); }
function writeJsonAtomically(file, value) {
  const temporaryFile = `${file}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`;
  try {
    writeJson(temporaryFile, value);
    fs.renameSync(temporaryFile, file);
  } catch (error) {
    fs.rmSync(temporaryFile, { force: true });
    throw error;
  }
}
function snapshotId() { return `${new Date().toISOString().replaceAll(/[:.]/g, '-')}-${crypto.randomBytes(4).toString('hex')}`; }

function writeProfileSnapshot(options, account, rawBytes, { fetchedAt, importedAt, sourceSnapshot, sourceUpdatedAt }) {
  const source = account.source === undefined ? 'toolbox' : account.source;
  const adapterVersion = getAdapterVersion(source);
  const profile = JSON.parse(rawBytes.toString('utf8'));
  const save = importPublicProfile(profile, source);
  const playerName = save.playerNames[account.playerIndex];
  if (!playerName) fail(`Configured player index ${account.playerIndex} is absent for ${account.id}`);
  const base = accountDirectory(options, account);
  const snapshots = path.resolve(base, 'snapshots');
  fs.mkdirSync(snapshots, { recursive: true });
  const snapshot = path.join(snapshots, snapshotId());
  fs.mkdirSync(snapshot);
  fs.writeFileSync(path.join(snapshot, 'raw-profile.json'), rawBytes);
  writeJson(path.join(snapshot, 'save.json'), save);
  const manifest = {
    schemaVersion: 1, accountId: account.id, profileName: account.profileName, source,
    adapterVersion, savePath: 'save.json', saveSha256: hashFile(path.join(snapshot, 'save.json')),
    rawProfilePath: 'raw-profile.json', rawProfileSha256: hashFile(path.join(snapshot, 'raw-profile.json')),
    playerIndex: account.playerIndex, playerName, fetchedAt,
    sourceUpdatedAt: source === 'toolbox' ? profile.lastUpdated : sourceUpdatedAt
  };
  if (source === 'toolbox') {
    manifest.progression = { source: 'latest profile parsedData', metrics: publicProfileMetrics(profile), accountSelection: account.progression };
  }
  if (importedAt !== undefined) manifest.importedAt = importedAt;
  if (sourceSnapshot !== undefined) manifest.sourceSnapshot = sourceSnapshot;
  writeJson(path.join(snapshot, 'manifest.json'), manifest);
  writeJsonAtomically(path.join(base, 'latest.json'), { snapshot: path.relative(base, snapshot).split(path.sep).join('/') });
  return snapshot;
}

async function fetchProfiles(options, accounts) {
  for (const account of accounts) {
    const source = account.source === undefined ? 'toolbox' : account.source;
    getAdapterVersion(source);
    const url = source === 'idleon-efficiency'
      ? `https://cdn.idleonefficiency.com/profiles/${encodeURIComponent(account.profileName.toLowerCase())}.json`
      : `https://profiles.idleontoolbox.workers.dev/api/profiles/?profile=${encodeURIComponent(account.profileName)}`;
    const response = await fetch(url);
    if (!response.ok) fail(`Profile fetch failed for ${account.id}: HTTP ${response.status}`);
    const rawBytes = Buffer.from(await response.arrayBuffer());
    const snapshot = writeProfileSnapshot(options, account, rawBytes, {
      fetchedAt: new Date().toISOString(),
      sourceUpdatedAt: source === 'idleon-efficiency' ? response.headers.get('last-modified') ?? undefined : undefined
    });
    const manifest = readSnapshotManifest(snapshot, account);
    const base = accountDirectory(options, account);
    console.log(`${account.id}: fetched ${formatSourceDate(manifest.sourceUpdatedAt)}; snapshot ${path.relative(base, snapshot)}`);
  }
}

function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
async function requestJson(url) {
  const response = await fetch(url);
  if (!response.ok) fail(`${url} returned HTTP ${response.status}`);
  return response.json();
}
function startOwned(savePath, index, port, preparationIndex) {
  const child = spawn(process.execPath, [offlineStart, '--save', savePath, '--character', String(index), '--prepare-character', String(preparationIndex), '--port', String(port)], {
    cwd: root, stdio: ['ignore', 'pipe', 'pipe'], env: cleanEnv({ GAME_SERVER_URL: `http://127.0.0.1:${port}` })
  });
  let output = '';
  child.stdout.on('data', data => { output += data.toString(); });
  child.stderr.on('data', data => { output += data.toString(); });
  child.once('error', error => {
    child.spawnError = error;
    output += `${error.message}\n`;
  });
  child.outputText = () => output;
  ownedProcesses.add(child);
  child.once('close', () => {
    child.closed = true;
    ownedProcesses.delete(child);
  });
  return child;
}
function waitForChild(child) {
  return new Promise(resolve => {
    let settled = false;
    const finish = result => {
      if (settled) return;
      settled = true;
      ownedProcesses.delete(child);
      resolve(result);
    };
    child.once('error', error => finish({ error }));
    child.once('exit', (code, signal) => finish({ code, signal }));
  });
}
async function assertPortAvailable(port) {
  await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', error => reject(new Error(`Offline port ${port} is unavailable: ${error.message}`)));
    server.listen(port, '127.0.0.1', () => server.close(error => error ? reject(error) : resolve()));
  });
}
async function startReady(savePath, index, port, expectedName, preparationIndex, preparationName) {
  await assertPortAvailable(port);
  const child = startOwned(savePath, index, port, preparationIndex);
  const url = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 120000;
  while (Date.now() < deadline) {
    if (child.spawnError) fail(`Could not start offline process for player ${index}: ${child.spawnError.message}`);
    if (child.exitCode !== null) fail(`Offline process exited for player ${index}: ${child.outputText()}`);
    try {
      const status = await requestJson(`${url}/status`);
      if (status.source !== 'offline') fail(`Offline server ${port} reported unexpected source: ${status.source}`);
      if (status.cdpConnected !== true || status.injected !== true || status.gameReady !== true) {
        await wait(500);
        continue;
      }
      if (status.character !== index || status.playerName !== expectedName) fail(`Offline server ${port} loaded unexpected active player identity`);
      if (status.preparationCharacter !== preparationIndex || status.preparationPlayerName !== preparationName) {
        fail(`Offline server ${port} loaded unexpected preparation player identity`);
      }
      const save = await requestJson(`${url}/cloud-save`);
      if (save.playerNames?.[index] !== expectedName) fail(`Offline server ${port} loaded unexpected save identity`);
      const gameVersion = await requestJson(`${url}/game-version`);
      return {
        child, url, gameVersion,
        preparationPlayerIndex: status.preparationCharacter,
        preparationPlayerName: status.preparationPlayerName
      };
    } catch (error) {
      if (error.message.includes('unexpected source') || error.message.includes('unexpected active player identity') || error.message.includes('unexpected preparation player identity') || error.message.includes('unexpected save identity')) throw error;
      await wait(500);
    }
  }
  fail(`Offline server ${port} did not become ready: ${child.outputText()}`);
}
async function cleanup() {
  if (cleanupPromise) return cleanupPromise;
  cleanupPromise = Promise.all([...ownedProcesses].map(child => new Promise((resolve, reject) => {
    if (child.spawnError || child.closed) {
      ownedProcesses.delete(child);
      resolve();
      return;
    }
    let settled = false;
    let forced = false;
    let timer;
    const finish = error => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      child.removeListener('close', onClose);
      child.removeListener('error', onError);
      if (error) reject(error);
      else resolve();
    };
    const onClose = (code, signal) => {
      if (forced) finish(new Error('Offline process required SIGKILL; browser cleanup was not confirmed'));
      else if (code !== 0) finish(new Error(`Offline process cleanup failed (exit ${code ?? signal})`));
      else finish();
    };
    const onError = error => finish(error);
    child.once('close', onClose);
    child.once('error', onError);
    timer = setTimeout(() => {
      forced = true;
      timer = setTimeout(() => finish(new Error('Offline process did not close after SIGKILL')), 5000);
      try { child.kill('SIGKILL'); } catch (error) { finish(error); }
    }, 5000);
    try { child.kill('SIGTERM'); } catch (error) { finish(error); }
  })));
  try {
    await cleanupPromise;
  } finally {
    cleanupPromise = undefined;
  }
}
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => cleanup().finally(() => process.exit(signal === 'SIGINT' ? 130 : 143)));

async function extractAccount(options, account) {
  const snapshot = latestSnapshot(options, account);
  const manifest = readSnapshotManifest(snapshot, account);
  const savePath = safePointer(snapshot, manifest.savePath);
  if (hashFile(savePath) !== manifest.saveSha256) fail(`Snapshot save hash mismatch for ${account.id}`);
  const save = readJson(savePath);
  if (save.playerNames?.[manifest.playerIndex] !== manifest.playerName || !manifest.playerName) {
    fail(`Snapshot player identity mismatch for ${account.id}`);
  }
  const name = save.playerNames?.[account.playerIndex];
  if (!Number.isSafeInteger(account.playerIndex) || account.playerIndex < 0 || !name) {
    fail(`Configured player index ${account.playerIndex} is absent for ${account.id}`);
  }
  const preparationIndex = preparationIndexFor(account);
  const preparationName = save.playerNames?.[preparationIndex];
  if (typeof preparationName !== 'string' || !preparationName) {
    fail(`Configured preparation player index ${preparationIndex} is absent for ${account.id}`);
  }
  const runsDir = path.join(snapshot, 'runs');
  const runDir = path.join(runsDir, snapshotId());
  const resultsDir = path.join(runDir, 'results');
  fs.mkdirSync(resultsDir, { recursive: true });
  const discovery = new BatchExtractor({ outputDir: resultsDir });
  discovery.findConfigFiles();
  if (!discovery.configFiles.length) fail(`No extraction configs found; outputs retained at ${resultsDir}`);
  const groups = new Map([[account.playerIndex, []]]);
  for (const configFile of discovery.configFiles) {
    const config = readJson(configFile.configPath);
    const index = config.requiredActivePlayerIndex ?? account.playerIndex;
    if (!Number.isSafeInteger(index) || index < 0) fail(`Invalid requiredActivePlayerIndex in ${configFile.name}`);
    if (!groups.has(index)) groups.set(index, []);
    groups.get(index).push(configFile);
  }
  let primaryVersion;
  let preparationIdentity;
  const failures = [];
  const previousPlayerIndex = process.env.TEST_ACCOUNT_PLAYER_INDEX;
  process.env.TEST_ACCOUNT_PLAYER_INDEX = String(account.playerIndex);
  try {
    for (const [index, configFiles] of groups) {
      if (!configFiles.length) continue;
      try {
        const playerName = save.playerNames?.[index];
        if (!playerName) fail(`Required player index ${index} is absent for ${account.id}`);
        const server = await startReady(savePath, index, options.basePort, playerName, preparationIndex, preparationName);
        preparationIdentity = {
          preparationPlayerIndex: server.preparationPlayerIndex,
          preparationPlayerName: server.preparationPlayerName
        };
        if (!primaryVersion) primaryVersion = server.gameVersion;
        else if (JSON.stringify(server.gameVersion) !== JSON.stringify(primaryVersion)) fail('Offline runtimes report different game versions');
        const batch = new BatchExtractor({
          outputDir: resultsDir,
          serverURL: server.url,
          playerServers: { [index]: server.url }
        });
        batch.configFiles = configFiles;
        await batch.extractAll();
        for (const failure of batch.results.failed) {
          const details = failure.error || failure.errors.map(entry => `${entry.label}: ${entry.error}`).join('; ');
          failures.push(`player ${index}, ${failure.config}: ${details}`);
        }
        if (batch.results.successful.length + batch.results.failed.length !== configFiles.length) {
          failures.push(`player ${index}: batch extractor did not complete all configs`);
        }
      } catch (error) {
        failures.push(`player ${index}: ${error.message}`);
      } finally {
        try {
          await cleanup();
        } catch (error) {
          failures.push(`player ${index} cleanup: ${error.message}`);
          fail(`Cleanup failed for ${account.id}: ${failures.join(' | ')}; outputs retained at ${resultsDir}`);
        }
      }
    }
    if (failures.length) fail(`Batch extraction failed for ${account.id}: ${failures.join(' | ')}; outputs retained at ${resultsDir}`);
    const files = fs.readdirSync(resultsDir).filter(file => file.endsWith('.json')).sort();
    if (!files.length) fail(`Batch extractor produced no results for ${account.id}; outputs retained at ${resultsDir}`);
    const hashes = Object.fromEntries(files.map(file => [file, hashFile(path.join(resultsDir, file))]));
    const descriptor = {
      schemaVersion: 2, accountId: account.id, profileName: account.profileName,
      source: manifest.source === undefined ? 'toolbox' : manifest.source, adapterVersion: manifest.adapterVersion,
      savePath: path.relative(runDir, savePath).split(path.sep).join('/'), saveSha256: manifest.saveSha256,
      resultsDir: 'results', playerIndex: account.playerIndex, playerName: name, gameVersion: primaryVersion,
      ...preparationIdentity,
      assetSha256: hashAssets(assetRoot), configSha256: hashConfigs(path.join(root, 'tests/configs')),
      results: hashes, extractedAt: new Date().toISOString()
    };
    const datasetPath = path.join(runDir, 'dataset.json');
    writeJson(datasetPath, descriptor);
    const accountDir = accountDirectory(options, account);
    writeJsonAtomically(path.join(accountDir, 'latest-dataset.json'), {
      dataset: path.relative(accountDir, datasetPath).split(path.sep).join('/')
    });
    console.log(`${account.id}: extraction complete; dataset ${datasetPath}`);
  } finally {
    if (previousPlayerIndex === undefined) delete process.env.TEST_ACCOUNT_PLAYER_INDEX;
    else process.env.TEST_ACCOUNT_PLAYER_INDEX = previousPlayerIndex;
  }
}
async function runTests(options, accounts) {
  const jestArgs = prepareJestArgs(options);
  let failures = 0;
  for (const account of accounts) {
    try {
      const datasetPath = latestDatasetPath(options, account);
      const { manifest } = loadAccountDataset(datasetPath);
      if (manifest.accountId !== account.id) fail(`Dataset account mismatch for ${account.id}`);
      const childEnv = cleanEnv({ TEST_ACCOUNT_DATASET: datasetPath });
      const child = spawn(process.execPath, [path.join(root, 'node_modules/jest/bin/jest.js'), ...jestArgs], { cwd: root, env: childEnv, stdio: 'inherit' });
      ownedProcesses.add(child);
      const result = await waitForChild(child);
      if (result.error) throw result.error;
      if (result.code !== 0) {
        failures += 1;
        console.error(`${account.id}: Jest failed (exit ${result.code ?? result.signal})`);
      } else console.log(`${account.id}: Jest passed`);
    } catch (error) {
      failures += 1;
      console.error(`${account.id}: test setup failed: ${error.message}`);
    }
  }
  if (failures) fail(`${failures} account test run(s) failed`);
}
function listAccounts(options, accounts) {
  for (const account of accounts) {
    let manifest;
    try { manifest = readJson(path.join(latestSnapshot(options, account), 'manifest.json')); } catch {}
    const observed = manifest?.progression?.metrics;
    console.log(`${account.id}\t${account.profileName}\tplayer ${account.playerIndex}\tlatest upload ${formatSourceDate(manifest?.sourceUpdatedAt)}\tfetched metrics: ${listMetrics(observed)}\tselection evidence (configured): ${selectionMetrics(account.progression)}\t${account.reason}`);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const accounts = selectedAccounts(options);
  if (options.command === 'fetch') await fetchProfiles(options, accounts);
  else if (options.command === 'extract') for (const account of accounts) await extractAccount(options, account);
  else if (options.command === 'test') await runTests(options, accounts);
  else listAccounts(options, accounts);
}

if (require.main === module) main().catch(async error => { console.error(error.stack || error.message); await cleanup(); process.exitCode = 1; });
module.exports = { extractAccount, latestDatasetPath, parseArgs, readSnapshotManifest, safePointer, selectedAccounts, writeProfileSnapshot };
