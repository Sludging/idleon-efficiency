import fs from 'fs';
import os from 'os';
import path from 'path';
const { ADAPTER_VERSION } = require('./public-profile-import.cjs') as { ADAPTER_VERSION: string };

const accountDataset = require('./account-dataset.cjs') as {
  hashFile(filePath: string): string;
  hashConfigs(configDir: string): string;
  hashAssets(assetRoot: string): string;
  loadAccountDataset(datasetPath: string, options?: { configsDir?: string; assetRoot?: string }): { savePath: string; resultsDir: string; playerIndex: number; playerName: string };
  resolveTestSavePath(saveName: string): string;
  resolveExtractionResultsPath(filename: string): string;
  resolveTargetPlayerIndex(defaultIndex: number): number;
};

let tempRoot: string;
let datasetPath: string;
let savePath: string;
let resultPath: string;
let configsDir: string;
let assetRoot: string;
let originalDataset: string | undefined;
function writeDataset(): void {
  fs.mkdirSync(path.dirname(savePath), { recursive: true });
  fs.mkdirSync(path.dirname(resultPath), { recursive: true });
  fs.mkdirSync(configsDir, { recursive: true });
  fs.mkdirSync(assetRoot, { recursive: true });
  fs.writeFileSync(path.join(configsDir, 'config.json'), '{}');
  fs.writeFileSync(path.join(assetRoot, 'asset.bin'), 'asset');
  fs.writeFileSync(savePath, JSON.stringify({ playerNames: ['First', 'Selected'] }));
  fs.writeFileSync(resultPath, JSON.stringify({ extractions: {}, errors: {} }));
  const descriptor = {
    schemaVersion: 1,
    accountId: 'sample',
    profileName: 'Sample',
    adapterVersion: ADAPTER_VERSION,
    savePath: 'save.json',
    saveSha256: accountDataset.hashFile(savePath),
    resultsDir: 'results',
    playerIndex: 1,
    playerName: 'Selected',
    gameVersion: { title: 'Test', version: '1' },
    assetSha256: accountDataset.hashAssets(assetRoot),
    configSha256: accountDataset.hashConfigs(configsDir),
    results: { 'sample-data.json': accountDataset.hashFile(resultPath) },
    extractedAt: '2026-01-01T00:00:00.000Z',
  };
  fs.writeFileSync(datasetPath, JSON.stringify(descriptor));
}

beforeEach(() => {
  originalDataset = process.env.TEST_ACCOUNT_DATASET;
  tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'account-dataset-'));
  datasetPath = path.join(tempRoot, 'runs', 'run-1', 'dataset.json');
  savePath = path.join(path.dirname(datasetPath), 'save.json');
  resultPath = path.join(path.dirname(datasetPath), 'results', 'sample-data.json');
  configsDir = path.join(tempRoot, 'configs');
  assetRoot = path.join(tempRoot, 'assets');
  delete process.env.TEST_ACCOUNT_DATASET;
  writeDataset();
});

afterEach(() => {
  if (originalDataset === undefined) delete process.env.TEST_ACCOUNT_DATASET;
  else process.env.TEST_ACCOUNT_DATASET = originalDataset;
  fs.rmSync(tempRoot, { recursive: true, force: true });
});

describe('account dataset selection', () => {
  it('rejects a save whose bytes do not match its descriptor', () => {
    fs.writeFileSync(savePath, JSON.stringify({ playerNames: ['Changed', 'Selected'] }));
    expect(() => accountDataset.loadAccountDataset(datasetPath, { configsDir, assetRoot })).toThrow('save hash mismatch');
  });

  it('rejects missing required result inputs', () => {
    fs.rmSync(resultPath);
    expect(() => accountDataset.loadAccountDataset(datasetPath, { configsDir, assetRoot })).toThrow();
  });

  it('rejects result bytes that do not match the descriptor', () => {
    fs.writeFileSync(resultPath, '{"changed":true}');
    expect(() => accountDataset.loadAccountDataset(datasetPath, { configsDir, assetRoot })).toThrow('result hash mismatch');
  });
  it('rejects a missing selected save', () => {
    fs.rmSync(savePath);
    expect(() => accountDataset.loadAccountDataset(datasetPath, { configsDir, assetRoot })).toThrow('Account save not found');
  });

  it('returns selected player from paired save metadata', () => {
    expect(accountDataset.loadAccountDataset(datasetPath, { configsDir, assetRoot })).toEqual(expect.objectContaining({
      savePath,
      resultsDir: path.dirname(resultPath),
      playerIndex: 1,
      playerName: 'Selected',
    }));
  });

  it('rejects config changes after extraction', () => {
    fs.writeFileSync(path.join(configsDir, 'config.json'), '{"changed":true}');
    expect(() => accountDataset.loadAccountDataset(datasetPath, { configsDir, assetRoot })).toThrow('config fingerprint mismatch');
  });

  it('rejects asset changes after extraction', () => {
    fs.writeFileSync(path.join(assetRoot, 'asset.bin'), 'changed');
    expect(() => accountDataset.loadAccountDataset(datasetPath, { configsDir, assetRoot })).toThrow('asset fingerprint mismatch');
  });

  it('rejects a stale import adapter version', () => {
    const descriptor = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    descriptor.adapterVersion = 'older-adapter';
    fs.writeFileSync(datasetPath, JSON.stringify(descriptor));
    expect(() => accountDataset.loadAccountDataset(datasetPath, { configsDir, assetRoot })).toThrow('adapter version mismatch');
  });

  it('rejects a descriptor with no result hashes', () => {
    const descriptor = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    descriptor.results = {};
    fs.writeFileSync(datasetPath, JSON.stringify(descriptor));
    expect(() => accountDataset.loadAccountDataset(datasetPath, { configsDir, assetRoot })).toThrow('results must map filenames');
  });

  it('rejects a selected character that does not match the save index', () => {
    const descriptor = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    descriptor.playerName = 'Wrong';
    fs.writeFileSync(datasetPath, JSON.stringify(descriptor));
    expect(() => accountDataset.loadAccountDataset(datasetPath, { configsDir, assetRoot })).toThrow('selected character mismatch');
  });
});
