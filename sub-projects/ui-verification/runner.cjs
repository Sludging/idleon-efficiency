const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

async function main() {
  const [scenarioPath, artifactsDir, ...args] = process.argv.slice(2);
  if (!scenarioPath || !artifactsDir) throw new Error('Runner requires scenario path and artifacts directory');
  await fs.mkdir(artifactsDir, { recursive: true, mode: 0o700 });
  const baseURL = 'https://app:3000';
  const errors = [];
  const startedAt = new Date().toISOString();
  let browser;
  let context;
  let page;
  let scenarioError;
  try {
    const scenario = require(scenarioPath);
    if (typeof scenario !== 'function') throw new TypeError('Scenario module must export an async function');
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ignoreHTTPSErrors: true });
    page = await context.newPage();
    page.on('console', message => {
      if (message.type() === 'error') errors.push({ type: 'console', text: message.text() });
    });
    page.on('pageerror', error => errors.push({ type: 'pageerror', text: error.stack || error.message }));
    await scenario({ page, context, browser, baseURL, artifactsDir, args });
  } catch (error) {
    scenarioError = error;
  } finally {
    if (page) {
      try { await page.screenshot({ path: path.join(artifactsDir, 'final.png'), fullPage: true }); }
      catch (error) { errors.push({ type: 'screenshot', text: error.message }); }
    }
    if (context) await context.close().catch(error => errors.push({ type: 'context-close', text: error.message }));
    if (browser) await browser.close().catch(error => errors.push({ type: 'browser-close', text: error.message }));
    await fs.writeFile(path.join(artifactsDir, 'errors.json'), `${JSON.stringify(errors, null, 2)}\n`, { mode: 0o600 });
    await fs.writeFile(path.join(artifactsDir, 'result.json'), `${JSON.stringify({
      scenario: scenarioPath,
      baseURL,
      startedAt,
      finishedAt: new Date().toISOString(),
      passed: !scenarioError,
      error: scenarioError ? { name: scenarioError.name, message: scenarioError.message, stack: scenarioError.stack } : null,
      browserErrors: errors,
    }, null, 2)}\n`, { mode: 0o600 });
  }
  if (scenarioError) {
    process.stderr.write(`${scenarioError.stack || scenarioError}\n`);
    process.exitCode = 1;
  }
}

main().catch(error => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exitCode = 1;
});
