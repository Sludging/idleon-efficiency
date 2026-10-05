import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const { selectLocalSave } = require('../../scripts/local-save-config.cjs');

let projectRoot: string;

const writeFixture = (relativePath: string, value: unknown) => {
  const fullPath = path.join(projectRoot, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, JSON.stringify(value));
  return fullPath;
};

const select = (localSaveFile?: string) => selectLocalSave({
  projectRoot,
  nodeEnv: 'development',
  appStage: 'local',
  localSaveFile,
});

beforeEach(() => {
  projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'idleon-local-save-'));
  fs.mkdirSync(path.join(projectRoot, 'tests/fixtures/saves'), { recursive: true });
  fs.mkdirSync(path.join(projectRoot, 'profiles'), { recursive: true });
});

afterEach(() => {
  fs.rmSync(projectRoot, { recursive: true, force: true });
});

describe('development local save selection', () => {
  it('selects the latest fixture by default', () => {
    const defaultPath = 'tests/fixtures/saves/latest.json';
    writeFixture(defaultPath, { playerNames: ['Latest Fixture'] });
    writeFixture('tests/fixtures/saves/other.json', { playerNames: ['Other Fixture'] });

    const selected = select();
    expect(path.relative(projectRoot, selected)).toBe(defaultPath);
    expect(JSON.parse(fs.readFileSync(selected, 'utf8')).playerNames).toEqual(['Latest Fixture']);
  });

  it('selects an explicit relative save under the supported fixture roots', () => {
    writeFixture('profiles/custom/profile.json', { playerNames: ['Selected Profile'] });

    const selected = select('profiles/custom/profile.json');
    expect(JSON.parse(fs.readFileSync(selected, 'utf8')).playerNames).toEqual(['Selected Profile']);
  });

  it('accepts absolute paths under supported fixture roots', () => {
    const file = writeFixture('tests/fixtures/saves/custom.json', { marker: 'absolute path' });

    expect(select(file)).toBe(fs.realpathSync(file));
  });

  it.each([
    ['production build', 'production', 'local'],
    ['test runtime', 'test', 'local'],
    ['nonlocal development stage', 'development', 'preview'],
  ])('ignores a private selector during %s without reading it', (_label, nodeEnv, appStage) => {
    const selected = selectLocalSave({
      projectRoot,
      nodeEnv,
      appStage,
      getLocalSaveFile: () => { throw new Error('must not read LOCAL_SAVE_FILE'); },
    });

    expect(selected).toBeUndefined();
  });

  it('rejects missing files', () => {
    expect(() => select('tests/fixtures/saves/missing.json')).toThrow(/file does not exist/);
  });

  it('rejects paths outside the allowed roots', () => {
    writeFixture('private/save.json', { playerNames: ['private'] });

    expect(() => select('private/save.json')).toThrow(/must be under tests\/fixtures\/saves or profiles/);
  });

  it('rejects directories, non-JSON files, and malformed JSON', () => {
    fs.mkdirSync(path.join(projectRoot, 'tests/fixtures/saves/folder'));
    fs.writeFileSync(path.join(projectRoot, 'tests/fixtures/saves/plain.txt'), '{}');
    fs.writeFileSync(path.join(projectRoot, 'tests/fixtures/saves/broken.json'), '{');

    expect(() => select('tests/fixtures/saves/folder')).toThrow(/path is not a file/);
    expect(() => select('tests/fixtures/saves/plain.txt')).toThrow(/\.json extension/);
    expect(() => select('tests/fixtures/saves/broken.json')).toThrow(/valid JSON/);
  });

  it('rejects symlinks that resolve outside the allowed roots', () => {
    const outside = path.join(os.tmpdir(), `idleon-outside-${process.pid}.json`);
    fs.writeFileSync(outside, '{}');
    const link = path.join(projectRoot, 'tests/fixtures/saves/escape.json');
    try {
      fs.symlinkSync(outside, link);
      expect(() => select('tests/fixtures/saves/escape.json')).toThrow(/must be under tests\/fixtures\/saves or profiles/);
    } finally {
      fs.rmSync(outside, { force: true });
    }
  });
  it('rejects an allowed-root symlink that points outside the project', () => {
    const outsideRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'idleon-outside-root-'));
    const selectedFile = path.join(outsideRoot, 'profile.json');
    const profileRoot = path.join(projectRoot, 'profiles');
    fs.writeFileSync(selectedFile, JSON.stringify({ playerNames: ['outside root'] }));
    fs.rmSync(profileRoot, { recursive: true, force: true });
    try {
      fs.symlinkSync(outsideRoot, profileRoot, 'dir');
      expect(() => select('profiles/profile.json')).toThrow(/must be under tests\/fixtures\/saves or profiles/);
    } finally {
      fs.rmSync(outsideRoot, { recursive: true, force: true });
    }
  });
});
