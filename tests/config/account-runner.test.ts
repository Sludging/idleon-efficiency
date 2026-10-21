const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {
  latestDatasetPath,
  parseArgs,
  prepareJestArgs,
  readSnapshotManifest,
  selectedAccounts
} = require('../helpers/test-accounts.cjs');

const excludedTest = {
  path: 'tests/domains/spelunking/part-3-pipeline.test.ts',
  absolutePath: `${process.cwd()}/tests/domains/spelunking/part-3-pipeline.test.ts`,
  reason: 'Saved-progression tests use developer state.'
};

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

  it('blocks explicit default-only suite selection', () => {
    const options = { jestArgs: [excludedTest.path] };

    expect(() => prepareJestArgs(options, [excludedTest])).toThrow('Cannot select default-only test for account run');
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
