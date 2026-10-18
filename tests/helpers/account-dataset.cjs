const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { ADAPTER_VERSION } = require('./public-profile-import.cjs');

const REPO_ROOT = path.resolve(__dirname, '../..');
const DEFAULT_SAVE_PATH = path.join(REPO_ROOT, 'tests/fixtures/saves/latest.json');
const DEFAULT_RESULTS_DIR = path.join(REPO_ROOT, 'tests/results');
const CONFIGS_DIR = path.join(REPO_ROOT, 'tests/configs');
let selectedCache;

function selectedDataset() {
  const datasetPath = process.env.TEST_ACCOUNT_DATASET;
  if (!datasetPath) return undefined;
  const resolved = path.resolve(datasetPath);
  if (!selectedCache || selectedCache.path !== resolved) {
    selectedCache = { path: resolved, dataset: resolveAccountDataset(resolved) };
  }
  return selectedCache.dataset;
}
const ASSET_ROOT = path.join(REPO_ROOT, 'assets/distBuild/static/game');

function hashFile(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function hashDirectory(rootPath) {
  if (!fs.existsSync(rootPath) || !fs.statSync(rootPath).isDirectory()) {
    throw new Error(`Fingerprint directory not found: ${rootPath}`);
  }
  const hash = crypto.createHash('sha256');
  function addDirectory(directory, relativeDirectory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true })
      .sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0);
    for (const entry of entries) {
      const relativePath = path.posix.join(relativeDirectory, entry.name);
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        addDirectory(entryPath, relativePath);
      } else if (entry.isFile()) {
        hash.update(relativePath);
        hash.update('\0');
        hash.update(fs.readFileSync(entryPath));
        hash.update('\0');
      }
    }
  }
  addDirectory(rootPath, '');
  return hash.digest('hex');
}

function hashConfigs(configDir = CONFIGS_DIR) {
  return hashDirectory(configDir);
}

function hashAssets(assetRoot = ASSET_ROOT) {
  return hashDirectory(assetRoot);
}

function readJson(filePath, description) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      throw new Error(`${description} not found: ${filePath}`);
    }
    throw new Error(`Cannot read ${description} ${filePath}: ${error.message}`);
  }
}

function resolveAccountDataset(datasetPath, options = {}) {
  const resolved = path.resolve(datasetPath);
  const descriptor = readJson(resolved, 'Account dataset');
  if (!descriptor || descriptor.schemaVersion !== 1) {
    throw new Error(`Unsupported account dataset schemaVersion in ${resolved}`);
  }
  const required = ['accountId', 'profileName', 'adapterVersion', 'savePath', 'saveSha256', 'resultsDir', 'playerIndex', 'playerName', 'gameVersion', 'assetSha256', 'configSha256', 'results', 'extractedAt'];
  for (const key of required) {
    if (descriptor[key] === undefined || descriptor[key] === null) {
      throw new Error(`Account dataset missing ${key}: ${resolved}`);
    }
  }
  if (typeof descriptor.accountId !== 'string' || typeof descriptor.profileName !== 'string') {
    throw new Error(`Invalid account identity in ${resolved}`);
  }
  if (descriptor.adapterVersion !== ADAPTER_VERSION) {
    throw new Error(`Account dataset adapter version mismatch: ${descriptor.adapterVersion} (current ${ADAPTER_VERSION})`);
  }
  if (!Number.isInteger(descriptor.playerIndex) || descriptor.playerIndex < 0 || typeof descriptor.playerName !== 'string') {
    throw new Error(`Invalid selected player in account dataset: ${resolved}`);
  }
  if (!descriptor.gameVersion || typeof descriptor.gameVersion.title !== 'string' || typeof descriptor.gameVersion.version !== 'string') {
    throw new Error(`Invalid gameVersion in account dataset: ${resolved}`);
  }

  if (typeof descriptor.savePath !== 'string' || typeof descriptor.resultsDir !== 'string') {
    throw new Error(`Invalid save or results path in account dataset: ${resolved}`);
  }
  if (typeof descriptor.saveSha256 !== 'string' || typeof descriptor.configSha256 !== 'string' || typeof descriptor.assetSha256 !== 'string') {
    throw new Error(`Invalid account dataset fingerprint in ${resolved}`);
  }
  if (!descriptor.results || typeof descriptor.results !== 'object' || Array.isArray(descriptor.results) || Object.keys(descriptor.results).length === 0) {
    throw new Error(`Account dataset results must map filenames to SHA-256 hashes: ${resolved}`);
  }
  const savePath = path.resolve(path.dirname(resolved), descriptor.savePath);
  const resultsDir = path.resolve(path.dirname(resolved), descriptor.resultsDir);
  const save = readJson(savePath, 'Account save');
  const saveSha256 = hashFile(savePath);
  if (saveSha256 !== descriptor.saveSha256) {
    throw new Error(`Account dataset save hash mismatch: ${savePath}`);
  }
  if (!Array.isArray(save.playerNames) || save.playerNames[descriptor.playerIndex] !== descriptor.playerName) {
    throw new Error(`Account dataset selected character mismatch: index ${descriptor.playerIndex} is not ${descriptor.playerName}`);
  }
  if (hashConfigs(options.configsDir) !== descriptor.configSha256) {
    throw new Error(`Account dataset config fingerprint mismatch: ${resolved}`);
  }
  if (hashAssets(options.assetRoot) !== descriptor.assetSha256) {
    throw new Error(`Account dataset asset fingerprint mismatch: ${resolved}`);
  }
  for (const [filename, expectedHash] of Object.entries(descriptor.results)) {
    if (path.basename(filename) !== filename || typeof expectedHash !== 'string') {
      throw new Error(`Invalid result hash entry in account dataset: ${filename}`);
    }
    const resultPath = path.join(resultsDir, filename);
    const actualHash = hashFile(resultPath);
    if (actualHash !== expectedHash) {
      throw new Error(`Account dataset result hash mismatch: ${resultPath}`);
    }
  }
  return { savePath, resultsDir, playerIndex: descriptor.playerIndex, playerName: descriptor.playerName, manifest: descriptor };
}

function getSelectedAccountDataset() {
  return selectedDataset();
}

function resolveTestSavePath(saveName) {
  if (saveName !== 'latest') return path.join(REPO_ROOT, 'tests/fixtures/saves', `${saveName}.json`);
  const dataset = selectedDataset();
  return dataset ? dataset.savePath : DEFAULT_SAVE_PATH;
}

function resolveExtractionResultsPath(filename) {
  const dataset = selectedDataset();
  if (!dataset) return path.join(DEFAULT_RESULTS_DIR, filename);
  if (path.basename(filename) !== filename) throw new Error(`Invalid extraction result filename: ${filename}`);
  const expectedHash = dataset.manifest.results[filename];
  if (!expectedHash) throw new Error(`Account dataset does not declare required result: ${filename}`);
  return path.join(dataset.resultsDir, filename);
}

function resolveTargetPlayerIndex(defaultIndex) {
  const dataset = selectedDataset();
  return dataset ? dataset.playerIndex : defaultIndex;
}

module.exports = {
  hashFile,
  hashConfigs,
  hashAssets,
  loadAccountDataset: resolveAccountDataset,
  getSelectedAccountDataset,
  resolveTestSavePath,
  resolveExtractionResultsPath,
  resolveTargetPlayerIndex,
};
