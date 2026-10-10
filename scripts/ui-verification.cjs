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

function inspectContainer(name, strict = false) {
  const result = spawnSync('docker', ['container', 'inspect', name], { cwd: repoRoot, encoding: 'utf8' });
  if (strict && result.status !== 0 && !/No such (object|container):/.test(result.stderr || '')) {
    throw new Error(result.error?.message || result.stderr?.trim() || 'Docker container inspection failed.');
  }
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

function prepareAppConfig(localSaveFile) {
  fs.mkdirSync(appConfigDir, { recursive: true, mode: 0o700 });
  fs.chmodSync(appConfigDir, 0o700);
  // Next may regenerate these files in development. Only private copies are writable.
  for (const filename of ['next-env.d.ts', 'tsconfig.json']) {
    fs.copyFileSync(path.join(repoRoot, filename), path.join(appConfigDir, filename));
  }
  const tsconfigPath = path.join(appConfigDir, 'tsconfig.json');
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
  tsconfig.compilerOptions.paths['@profile-source'] = ['data/fetchers/getProfile.local.tsx'];
  tsconfig.compilerOptions.paths['@local-save'] = [localSaveFile];
  fs.writeFileSync(tsconfigPath, `${JSON.stringify(tsconfig, null, 2)}\n`);
}

function reportStatus() {
  const daemon = spawnSync('docker', ['info', '--format', '{{.ServerVersion}}'], { cwd: repoRoot, encoding: 'utf8' });
  if (daemon.error || daemon.status !== 0) {
    process.stdout.write(`Docker: unavailable (${daemon.error?.message || daemon.stderr?.trim() || 'daemon check failed'})\napp: unknown\nbrowser: unknown\nUI stack: not ready (exit 1).\n`);
    process.exitCode = 1;
    return;
  }
  process.stdout.write('Docker: available\n');
  let ready = true;
  for (const [name, service] of [[appContainerName, 'app'], [containerName, 'browser']]) {
    let state;
    let serviceReady = false;
    try {
      const container = inspectContainer(name, true);
      if (!container) state = 'absent';
      else if (!isOwned(container, service)) state = `conflict (${name} is not owned by this stack)`;
      else if (container.State?.Restarting) state = 'starting (restarting)';
      else if (container.State?.Paused) state = 'paused';
      else if (!container.State?.Running) state = `stopped (${container.State?.Status || 'unknown'})`;
      else if (service === 'app') {
        const health = container.State.Health?.Status;
        serviceReady = health === 'healthy';
        state = health === 'starting' || health === 'unhealthy' ? health : `running (health: ${health || 'missing'})`;
      } else {
        state = 'running';
        serviceReady = true;
      }
    } catch (error) {
      state = `unknown (${error.message})`;
    }
    process.stdout.write(`${service}: ${state}\n`);
    ready = ready && serviceReady;
  }
  process.exitCode = ready ? 0 : 1;
  process.stdout.write(`UI stack: ${ready ? 'ready' : 'not ready'} (exit ${process.exitCode}).\n`);
}

function usage() {
  process.stdout.write(`UI verification

  yarn ui:status
  yarn ui:up
  yarn ui:run <repository-relative-scenario.cjs> [args...]
  yarn ui:down  (manual shutdown; keeps caches)

Check ui:status first: exit 0 means ready, exit 1 means not ready.
If not ready, run ui:up. Startup commands wait for each other automatically.
The HTTPS app and browser containers are reused on a private Docker network.
Write .ui-verification/<feature>-<unique-suffix>.cjs, then run it with ui:run.
Scenarios export an async function receiving
{ page, context, browser, baseURL, artifactsDir, args }.
Use the supplied page, context, and browser; Chromium is launched per scenario.
baseURL is https://app:3000. Inspect private output in .ui-verification/runs/.
Remove your temporary scenarios and artifacts when finished; leave containers running.

LOCAL_SAVE_FILE optionally selects a repository-relative JSON path under
tests/fixtures/saves or profiles when starting the app.
Default: tests/fixtures/saves/latest.json.
Startup requires Docker Compose v2 and util-linux flock.
`);
}

async function main() {
  const [command, scenarioArg, ...scenarioArgs] = process.argv.slice(2);
  if (!command || command === '--help' || command === 'help') return usage();
  if (!['status', 'up', 'down', 'run'].includes(command)) {
    usage();
    fail(`Unknown command: ${command}`);
  }
  if (command === 'status') return reportStatus();
  if (command === 'up') {
    if (process.env.UI_VERIFICATION_STARTUP_LOCK !== '1') {
      const lockFile = `/tmp/${projectName}-${process.getuid()}.lock`;
      process.exitCode = run('flock', [
        '--exclusive', '--no-fork', lockFile,
        process.execPath, __filename, ...process.argv.slice(2),
      ], { env: { ...process.env, UI_VERIFICATION_STARTUP_LOCK: '1' } });
      return;
    }
    delete process.env.UI_VERIFICATION_STARTUP_LOCK;
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
    prepareAppConfig(env.UI_LOCAL_SAVE_FILE);
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
