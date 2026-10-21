'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const net = require('node:net');
const { spawn } = require('node:child_process');
const { importPublicProfile, ADAPTER_VERSION } = require('./public-profile-import.cjs');
const { loadAccountDataset, hashFile, hashConfigs, hashAssets } = require('./account-dataset.cjs');

const root = path.resolve(__dirname, '../..');
const defaultConfig = path.join(root, 'tests/accounts/accounts.json');
const defaultCache = path.join(root, '.cache/test-accounts');
const offlineStart = path.join(root, 'sub-projects/idleon-offline/start.cjs');
const batchExtractor = path.join(root, 'tests/helpers/extract-all-game-data.js');
const assetRoot = path.join(root, 'assets/distBuild/static/game');
const ownedProcesses = new Set();
let shuttingDown = false;
function cleanEnv(overrides = {}) {
  const env = { ...process.env };
  delete env.TEST_ACCOUNT_DATASET;
  delete env.TEST_ACCOUNT_PLAYER_INDEX;
  return Object.assign(env, overrides);
}

function fail(message) { throw new Error(message); }
function escapedRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function accountOnlyTestPaths(configPath) {
  const config = readJson(configPath);
  return (config.defaultOnlyTests || []).map(entry => {
    if (!entry || typeof entry.path !== 'string' || typeof entry.reason !== 'string') {
      fail('Invalid defaultOnlyTests entry in account configuration');
    }
    const absolutePath = path.resolve(root, entry.path);
    const relativePath = path.relative(root, absolutePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      fail(`Default-only test path escapes repository: ${entry.path}`);
    }
    return { path: entry.path, absolutePath, reason: entry.reason };
  });
}

function prepareJestArgs(options, exclusions) {
  const selectors = new Set();
  for (let index = 0; index < options.jestArgs.length; index += 1) {
    const argument = options.jestArgs[index];
    if (!argument.startsWith('-')) selectors.add(path.resolve(root, argument));
    if (argument.startsWith('--runTestsByPath=')) {
      selectors.add(path.resolve(root, argument.slice('--runTestsByPath='.length)));
    }
    for (const option of ['--testPathPattern', '--testPathPatterns']) {
      let pattern;
      if (argument === option) pattern = options.jestArgs[index + 1];
      else if (argument.startsWith(`${option}=`)) pattern = argument.slice(option.length + 1);
      if (pattern) {
        for (const exclusion of exclusions) {
          try {
            if (new RegExp(pattern).test(exclusion.absolutePath) || new RegExp(pattern).test(exclusion.path)) {
              fail(`Cannot select default-only test for account run: ${exclusion.path}. ${exclusion.reason}`);
            }
          } catch (error) {
            if (error.message.startsWith('Cannot select default-only test')) throw error;
          }
        }
      }
    }
  }
  for (const exclusion of exclusions) {
    if (selectors.has(exclusion.absolutePath)) {
      fail(`Cannot select default-only test for account run: ${exclusion.path}. ${exclusion.reason}`);
    }
  }
  const retainedArgs = [];
  const ignorePatterns = [];
  for (let index = 0; index < options.jestArgs.length; index += 1) {
    const argument = options.jestArgs[index];
    if (argument === '--testPathIgnorePatterns') {
      if (options.jestArgs[index + 1]) ignorePatterns.push(options.jestArgs[++index]);
    } else if (argument.startsWith('--testPathIgnorePatterns=')) {
      ignorePatterns.push(argument.slice('--testPathIgnorePatterns='.length));
    } else retainedArgs.push(argument);
  }
  ignorePatterns.push(...exclusions.map(({ absolutePath }) => `^${escapedRegExp(absolutePath)}$`));
  if (ignorePatterns.length) retainedArgs.push(`--testPathIgnorePatterns=${ignorePatterns.join('|')}`);

  const explicitRunInBand = options.jestArgs.some(argument => argument === '--runInBand' || argument === '-i');
  if (explicitRunInBand) return retainedArgs;
  const workerArgs = [];
  const hasMaxWorkers = options.jestArgs.some(argument => argument === '--maxWorkers' || argument.startsWith('--maxWorkers=') || argument === '-w' || argument.startsWith('-w='));
  const hasMemoryLimit = options.jestArgs.some(argument => argument === '--workerIdleMemoryLimit' || argument.startsWith('--workerIdleMemoryLimit='));
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
function selectedAccounts(options) {
  const all = readConfig(options.configPath);
  return options.ids.map(id => {
    const account = all.get(id);
    if (!account) fail(`Unknown account ID: ${id}`);
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
  if (manifest.accountId !== account.id || manifest.playerIndex !== account.playerIndex) {
    fail(`Latest snapshot does not match configured account ${account.id}`);
  }
  if (manifest.adapterVersion !== ADAPTER_VERSION) {
    fail(`Snapshot importer version mismatch for ${account.id}: expected ${ADAPTER_VERSION}, found ${manifest.adapterVersion}`);
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

async function fetchProfiles(options, accounts) {
  for (const account of accounts) {
    const url = `https://profiles.idleontoolbox.workers.dev/api/profiles/?profile=${encodeURIComponent(account.profileName)}`;
    const response = await fetch(url);
    if (!response.ok) fail(`Profile fetch failed for ${account.id}: HTTP ${response.status}`);
    const rawBytes = Buffer.from(await response.arrayBuffer());
    const profile = JSON.parse(rawBytes.toString('utf8'));
    const save = importPublicProfile(profile);
    const playerName = save.playerNames[account.playerIndex];
    if (!playerName) fail(`Configured player index ${account.playerIndex} is absent for ${account.id}`);
    const base = accountDirectory(options, account);
    const snapshot = path.join(base, 'snapshots', snapshotId());
    fs.mkdirSync(snapshot, { recursive: true });
    fs.writeFileSync(path.join(snapshot, 'raw-profile.json'), rawBytes);
    writeJson(path.join(snapshot, 'save.json'), save);
    const metrics = publicProfileMetrics(profile);
    const manifest = {
      schemaVersion: 1, accountId: account.id, profileName: account.profileName,
      adapterVersion: ADAPTER_VERSION, savePath: 'save.json', saveSha256: hashFile(path.join(snapshot, 'save.json')),
      rawProfilePath: 'raw-profile.json', rawProfileSha256: hashFile(path.join(snapshot, 'raw-profile.json')),
      playerIndex: account.playerIndex, playerName, fetchedAt: new Date().toISOString(),
      sourceUpdatedAt: profile.lastUpdated,
      progression: { source: 'latest profile parsedData', metrics, accountSelection: account.progression }
    };
    writeJson(path.join(snapshot, 'manifest.json'), manifest);
    writeJson(path.join(base, 'latest.json'), { snapshot: path.relative(base, snapshot).split(path.sep).join('/') });
    console.log(`${account.id}: fetched ${formatSourceDate(profile.lastUpdated)}; snapshot ${path.relative(base, snapshot)}`);
  }
}

function configPlayerIndexes() {
  const configsPath = path.join(root, 'tests/configs');
  const indexes = new Set();
  for (const filename of fs.readdirSync(configsPath).filter(name => name.endsWith('.json'))) {
    const config = readJson(path.join(configsPath, filename));
    if (config.requiredActivePlayerIndex !== undefined) {
      const value = config.requiredActivePlayerIndex;
      if (!Number.isSafeInteger(value) || value < 0) fail(`Invalid requiredActivePlayerIndex in ${filename}`);
      indexes.add(value);
    }
  }
  return [...indexes].sort((left, right) => left - right);
}
function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
async function requestJson(url) {
  const response = await fetch(url);
  if (!response.ok) fail(`${url} returned HTTP ${response.status}`);
  return response.json();
}
function startOwned(savePath, index, port) {
  const child = spawn(process.execPath, [offlineStart, '--save', savePath, '--character', String(index), '--port', String(port)], {
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
  child.once('exit', () => ownedProcesses.delete(child));
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
async function startReady(savePath, index, port, expectedName) {
  await assertPortAvailable(port);
  const child = startOwned(savePath, index, port);
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
      const save = await requestJson(`${url}/cloud-save`);
      if (save.playerNames?.[index] !== expectedName) fail(`Offline server ${port} loaded unexpected save identity`);
      const gameVersion = await requestJson(`${url}/game-version`);
      return { child, url, gameVersion };
    } catch (error) {
      if (error.message.includes('unexpected source') || error.message.includes('unexpected active player identity') || error.message.includes('unexpected save identity')) throw error;
      await wait(500);
    }
  }
  fail(`Offline server ${port} did not become ready: ${child.outputText()}`);
}
async function cleanup() {
  if (shuttingDown) return;
  shuttingDown = true;
  const children = [...ownedProcesses];
  for (const child of children) child.kill('SIGTERM');
  await Promise.all(children.map(child => new Promise(resolve => {
    if (child.spawnError || child.exitCode !== null || child.signalCode !== null) return resolve();
    const timer = setTimeout(() => { child.kill('SIGKILL'); resolve(); }, 5000);
    child.once('exit', () => { clearTimeout(timer); resolve(); });
    child.once('error', () => { clearTimeout(timer); resolve(); });
  })));
  shuttingDown = false;
}
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => cleanup().finally(() => process.exit(signal === 'SIGINT' ? 130 : 143)));

async function extractAccount(options, account) {
  const snapshot = latestSnapshot(options, account);
  const manifest = readSnapshotManifest(snapshot, account);
  const savePath = safePointer(snapshot, manifest.savePath);
  if (hashFile(savePath) !== manifest.saveSha256) fail(`Snapshot save hash mismatch for ${account.id}`);
  const save = readJson(savePath);
  const name = save.playerNames?.[account.playerIndex];
  if (!name || manifest.playerName !== name) fail(`Snapshot player identity mismatch for ${account.id}`);
  const indexes = [...new Set([account.playerIndex, ...configPlayerIndexes()])];
  const runsDir = path.join(snapshot, 'runs');
  const runDir = path.join(runsDir, snapshotId());
  const resultsDir = path.join(runDir, 'results');
  fs.mkdirSync(resultsDir, { recursive: true });
  let primaryVersion;
  const routes = new Map();
  try {
    for (let offset = 0; offset < indexes.length; offset += 1) {
      const index = indexes[offset];
      const playerName = save.playerNames?.[index];
      const port = options.basePort + offset;
      if (port > 65535) fail('Offline port range exceeds 65535');
      if (port === 3101) fail('Account runner must not reuse the default server port 3101');
      const server = await startReady(savePath, index, port, playerName);
      if (!primaryVersion) primaryVersion = server.gameVersion;
      else if (JSON.stringify(server.gameVersion) !== JSON.stringify(primaryVersion)) fail('Offline runtimes report different game versions');
      routes.set(index, server.url);
    }
    const primaryIndex = account.playerIndex;
    const args = [batchExtractor, '--output-dir', resultsDir];
    for (const [index, url] of routes) args.push('--player-server', `${index}=${url}`);
    const env = cleanEnv({ GAME_SERVER_URL: routes.get(primaryIndex), TEST_ACCOUNT_PLAYER_INDEX: String(account.playerIndex) });
    const child = spawn(process.execPath, args, { cwd: root, env, stdio: 'inherit' });
    ownedProcesses.add(child);
    const result = await waitForChild(child);
    if (result.error) fail(`Could not run batch extractor for ${account.id}: ${result.error.message}; outputs retained at ${resultsDir}`);
    if (result.code !== 0) fail(`Batch extraction failed for ${account.id} (exit ${result.code ?? result.signal}); outputs retained at ${resultsDir}`);
    const files = fs.readdirSync(resultsDir).filter(file => file.endsWith('.json')).sort();
    if (!files.length) fail(`Batch extractor produced no results for ${account.id}; outputs retained at ${resultsDir}`);
    const hashes = Object.fromEntries(files.map(file => [file, hashFile(path.join(resultsDir, file))]));
    const descriptor = {
      schemaVersion: 1, accountId: account.id, profileName: account.profileName, adapterVersion: ADAPTER_VERSION,
      savePath: path.relative(runDir, savePath).split(path.sep).join('/'), saveSha256: manifest.saveSha256,
      resultsDir: 'results', playerIndex: account.playerIndex, playerName: name, gameVersion: primaryVersion,
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
    await cleanup();
  }
}
async function runTests(options, accounts) {
  const exclusions = accountOnlyTestPaths(options.configPath);
  for (const exclusion of exclusions) console.log(`Default-only test excluded: ${exclusion.path} — ${exclusion.reason}`);
  const jestArgs = prepareJestArgs(options, exclusions);
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
module.exports = { latestDatasetPath, parseArgs, prepareJestArgs, readSnapshotManifest, safePointer, selectedAccounts };
