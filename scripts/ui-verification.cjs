#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { selectLocalSave } = require('./local-save-config.cjs');

const repoRoot = path.resolve(__dirname, '..');
const toolingDir = path.join(repoRoot, 'sub-projects', 'ui-verification');
const projectName = 'idleon-ui-verification';
const containerName = 'idleon-ui-verification';
const appContainerName = 'idleon-ui-verification-app';
const artifactRoot = path.join(repoRoot, '.ui-verification');
const runsRoot = path.join(artifactRoot, 'runs');
const appConfigDir = path.join(artifactRoot, 'app-config');
const manifest = JSON.parse(fs.readFileSync(path.join(toolingDir, 'package.json'), 'utf8'));
const playwrightVersion = manifest.dependencies?.playwright;

function fail(message, code = 1) {
  process.stderr.write(`${message}\n`);
  process.exit(code);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: repoRoot, stdio: 'inherit', ...options });
  if (result.error) fail(`${command} failed: ${result.error.message}`);
  return result.status ?? 1;
}

function ensureDocker() {
  if (run('docker', ['--version']) !== 0) fail('`docker --version` failed; make Docker available and retry.');
  const daemon = spawnSync('docker', ['info', '--format', '{{.ServerVersion}}'], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
  if (daemon.error) fail(`Docker daemon check failed: ${daemon.error.message}`);
  if (daemon.status !== 0) {
    if (daemon.stderr?.trim()) process.stderr.write(`${daemon.stderr.trim()}\n`);
    fail('`docker info` failed; start the Docker daemon and retry.');
  }
  if (run('docker', ['compose', 'version', '--short']) !== 0) fail('`docker compose version` failed; Docker Compose v2 is required.');
}

function ensurePrivateArtifacts() {
  fs.mkdirSync(runsRoot, { recursive: true, mode: 0o700 });
  fs.chmodSync(artifactRoot, 0o700);
  fs.chmodSync(runsRoot, 0o700);
}

function inspectContainer(name) {
  const result = spawnSync('docker', ['container', 'inspect', name], { cwd: repoRoot, encoding: 'utf8' });
  return result.status === 0 ? JSON.parse(result.stdout)[0] : undefined;
}

function isOwned(container, service) {
  return container?.Config?.Labels?.['com.docker.compose.project'] === projectName
    && container.Config.Labels['com.docker.compose.service'] === service;
}

function composeEnvironment() {
  const hash = createHash('sha256');
  for (const relative of ['package.json', 'yarn.lock', '.yarnrc.yml', 'sub-projects/ui-verification/app.Dockerfile', 'sub-projects/ui-verification/app-entrypoint.sh', 'sub-projects/ui-verification/app-healthcheck.cjs']) {
    hash.update(relative).update('\0').update(fs.readFileSync(path.join(repoRoot, relative))).update('\0');
  }
  return {
    ...process.env,
    UI_REPO_ROOT: repoRoot,
    UI_ARTIFACT_ROOT: artifactRoot,
    UI_APP_CONFIG_DIR: appConfigDir,
    UI_DEPS_KEY: hash.digest('hex').slice(0, 20),
    UI_HOST_USER: `${process.getuid?.() ?? 1000}:${process.getgid?.() ?? 1000}`,
    UI_PLAYWRIGHT_VERSION: playwrightVersion,
  };
}

function compose(args, env) {
  return run('docker', ['compose', '--project-name', projectName, '--file', path.join(toolingDir, 'compose.yml'), ...args], { env });
}

function selectedSave() {
  const selected = process.env.LOCAL_SAVE_FILE;
  if (selected && path.isAbsolute(selected)) fail('LOCAL_SAVE_FILE must be a repository-relative JSON path under tests/fixtures/saves or profiles.');
  const absolute = selectLocalSave({ projectRoot: repoRoot, nodeEnv: 'development', fixtureMode: '1', localSaveFile: selected });
  return path.relative(fs.realpathSync(repoRoot), absolute).split(path.sep).join('/');
}

function prepareAppConfig() {
  fs.mkdirSync(appConfigDir, { recursive: true, mode: 0o700 });
  fs.chmodSync(appConfigDir, 0o700);
  // Next may regenerate these files in development. Only private copies are writable.
  for (const filename of ['next-env.d.ts', 'tsconfig.json']) {
    fs.copyFileSync(path.join(repoRoot, filename), path.join(appConfigDir, filename));
  }
}

function usage() {
  process.stdout.write(`Isolated UI verification\n\n  yarn ui:up\n  yarn ui:run <repository-relative-scenario.cjs> [args...]\n  yarn ui:down\n\nui:up starts the HTTPS app and Playwright browser on a private Docker network.\nLOCAL_SAVE_FILE is an optional repository-relative JSON path under\ntests/fixtures/saves or profiles; default: tests/fixtures/saves/latest.json.\nRun ui:up again after changing the save selector. ui:down keeps caches.\nScenarios export an async function receiving\n{ page, context, browser, baseURL, artifactsDir, args }.\nbaseURL is always https://app:3000. Artifacts are private in .ui-verification/runs/.\nRequires Docker Compose v2.\n`);
}

async function main() {
  const [command, scenarioArg, ...scenarioArgs] = process.argv.slice(2);
  if (!command || command === '--help' || command === 'help') return usage();
  if (!['up', 'down', 'run'].includes(command)) {
    usage();
    fail(`Unknown command: ${command}`);
  }
  if (typeof playwrightVersion !== 'string' || !/^\d+\.\d+\.\d+$/.test(playwrightVersion)) fail('The isolated Playwright dependency must be pinned to an exact semver version.');
  if (command === 'run' && !scenarioArg) fail('Usage: yarn ui:run <repository-relative-scenario.cjs> [args...]');
  ensureDocker();
  if (command === 'up' || command === 'down') {
    const env = composeEnvironment();
    if (command === 'down') {
      const status = compose(['down'], env);
      if (status !== 0) process.exit(status);
      return;
    }
    for (const [name, service] of [[appContainerName, 'app'], [containerName, 'browser']]) {
      const container = inspectContainer(name);
      if (container && !isOwned(container, service)) fail(`Container name ${name} is already used by an unrelated container; free that name before running \`yarn ui:up\`.`);
    }
    env.UI_LOCAL_SAVE_FILE = selectedSave();
    ensurePrivateArtifacts();
    prepareAppConfig();
    const status = compose(['up', '--build', '--detach', '--wait', '--wait-timeout', '600'], env);
    if (status !== 0) {
      compose(['logs', '--no-color', '--tail', '100', 'app', 'browser'], env);
      fail('UI stack failed to become ready; fix the app/browser error above and rerun `yarn ui:up`.', status);
    }
    process.stdout.write('UI stack ready. Run a scenario with `yarn ui:run <repository-relative-scenario.cjs> [args...]`.\n');
    return;
  }
  const app = inspectContainer(appContainerName);
  const browser = inspectContainer(containerName);
  if (!isOwned(app, 'app') || !app.State?.Running || app.State.Health?.Status !== 'healthy' || !isOwned(browser, 'browser') || !browser.State?.Running) {
    fail('UI verification stack is not running and healthy; start it with `yarn ui:up`.');
  }
  if (path.isAbsolute(scenarioArg)) fail('Scenario must be a repository-relative .cjs file.');
  const input = path.resolve(repoRoot, scenarioArg);
  const relative = path.relative(repoRoot, input);
  if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) fail('Scenario must be a file inside the repository.');
  let scenarioIsFile = false;
  try { scenarioIsFile = fs.statSync(input).isFile(); } catch {}
  if (!scenarioIsFile) fail(`Scenario file not found: ${scenarioArg}`);
  if (path.extname(input) !== '.cjs') fail('Scenario must be a CommonJS .cjs file.');
  const scenarioRelative = relative.split(path.sep).join('/');
  ensurePrivateArtifacts();
  const runName = `${new Date().toISOString().replace(/[:.]/g, '-')}-${process.pid}`;
  const localRunDir = path.join(runsRoot, runName);
  fs.mkdirSync(localRunDir, { mode: 0o700 });
  fs.chmodSync(localRunDir, 0o700);
  const args = ['exec', containerName,
    'node', '/opt/ui-verification/runner.cjs', `/workspace/${scenarioRelative}`, `/artifacts/runs/${runName}`, ...scenarioArgs];
  const status = run('docker', args);
  process.stdout.write(`UI verification artifacts: ${path.relative(repoRoot, localRunDir)}\n`);
  process.exit(status);
}

main().catch(error => fail(error.stack || error));
