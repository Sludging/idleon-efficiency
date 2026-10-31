const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const TestSequencer = require('@jest/test-sequencer').default;
const { rootDirectoryToGroup, perFileOverrides } = require('./domain-test-groups.cjs');

let wrapperDirectory;

function getWrapperDirectory() {
  if (!wrapperDirectory) {
    wrapperDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'idleon-domain-tests-'));
    const directory = wrapperDirectory;
    process.once('exit', () => fs.rmSync(directory, { recursive: true, force: true }));
  }
  return wrapperDirectory;
}

class DomainTestSequencer extends TestSequencer {
  constructor(options) {
    super(options);
    this.listTests = options.globalConfig.listTests;
    this.sourcesByWrapper = new Map();
  }

  sort(tests) {
    // Jest selects and shards original paths before calling this method.
    if (this.listTests) return super.sort(tests);

    const groupsByContext = new Map();
    const scheduledTests = [];

    for (const test of tests) {
      const relativePath = path.relative(test.context.config.rootDir, test.path).split(path.sep).join('/');
      if (!relativePath.startsWith('tests/domains/')) {
        scheduledTests.push(test);
        continue;
      }

      const rootDirectory = relativePath.split('/')[2];
      const groupName = perFileOverrides[relativePath]
        ?? (Object.hasOwn(rootDirectoryToGroup, rootDirectory) ? rootDirectoryToGroup[rootDirectory] : undefined);
      if (!groupName) {
        throw new Error(`No domain test group for ${relativePath}. Add its root to tests/helpers/domain-test-groups.cjs.`);
      }

      let groups = groupsByContext.get(test.context);
      if (!groups) {
        groups = new Map();
        groupsByContext.set(test.context, groups);
      }
      let group = groups.get(groupName);
      if (!group) {
        group = { test, files: [] };
        groups.set(groupName, group);
      }
      group.files.push({ relativePath, absolutePath: test.path, test });
    }

    for (const [context, groups] of groupsByContext) {
      const projectDirectory = path.join(getWrapperDirectory(), context.config.id);
      fs.mkdirSync(projectDirectory, { recursive: true });

      for (const [groupName, group] of groups) {
        const wrapperPath = path.join(projectDirectory, `${groupName}.test.cjs`);
        group.files.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
        // Each describe keeps source-file hooks separate inside the shared Jest runtime.
        const source = group.files.map(file => (
          `describe(${JSON.stringify(file.relativePath)}, () => { require(${JSON.stringify(file.absolutePath)}); });`
        )).join('\n');
        fs.writeFileSync(wrapperPath, `${source}\n`);
        this.sourcesByWrapper.set(wrapperPath, group.files);
        scheduledTests.push({ ...group.test, context, path: wrapperPath });
      }
    }

    return super.sort(scheduledTests);
  }

  allFailedTests(tests) {
    const originalTests = tests.flatMap(test => (
      this.sourcesByWrapper.get(test.path)?.map(source => source.test) ?? [test]
    ));
    return super.allFailedTests(originalTests);
  }

  cacheResults(tests, results) {
    const originalTests = [];
    const originalResults = [];

    for (const test of tests) {
      const sources = this.sourcesByWrapper.get(test.path);
      originalTests.push(...(sources ? sources.map(source => source.test) : [test]));
    }

    for (const result of results.testResults) {
      const sources = this.sourcesByWrapper.get(result.testFilePath);
      if (!sources) {
        originalResults.push(result);
        continue;
      }

      const executionFailed = Boolean(result.testExecError)
        || (result.numFailingTests > 0 && result.testResults.length === 0);
      for (const source of sources) {
        const cases = result.testResults.filter(testCase => testCase.ancestorTitles[0] === source.relativePath);
        const numFailingTests = cases.filter(testCase => testCase.status === 'failed').length
          || (executionFailed ? 1 : 0);
        const skipped = !numFailingTests && !cases.some(testCase => testCase.status === 'passed');
        originalResults.push({
          ...result,
          testFilePath: source.test.path,
          testResults: cases,
          numFailingTests,
          skipped,
        });
      }
    }

    super.cacheResults(originalTests, { ...results, testResults: originalResults });
  }
}

module.exports = DomainTestSequencer;
