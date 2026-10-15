#!/usr/bin/env node

/**
 * Batch Game Data Extractor
 *
 * Runs all extraction configs in tests/configs/ and saves results to tests/results/ by default.
 * Cloud-save refresh is opt-in via --refresh-save; by default, the save fixture is untouched.
 * Extraction results are still saved normally unless --output-dir selects another directory.
 * The endpoint returns the complete enriched save matching the raw-data page representation.
 */

const fs = require('fs');
const path = require('path');
const GameDataExtractor = require('./game-data-extractor');

const DEFAULT_DEBUG_SERVER_URL = process.env.GAME_SERVER_URL || 'http://127.0.0.1:3101';
const CONFIGS_DIR = path.join(__dirname, '../configs');
const SAVE_PATH = path.join(__dirname, '../fixtures/saves/latest.json');
const RESULTS_DIR = path.join(__dirname, '../results');

class BatchExtractor {
 constructor({ verbose = false, skipSaveRefresh = true, outputDir = RESULTS_DIR, playerServers = {} } = {}) {
  this.verbose = verbose;
  this.skipSaveRefresh = skipSaveRefresh;
  this.outputDir = path.resolve(outputDir);
  this.playerServers = playerServers;
  this.configFiles = [];
  this.results = {
   successful: [],
   failed: [],
   extractionTotals: { attempted: 0, successful: 0, failed: 0 },
   timestamp: new Date().toISOString(),
   startedAt: null,
   finishedAt: null,
   durationMs: null
  };
 }

 log(...args) {
  if (this.verbose) {
   console.log(...args);
  }
 }

 findConfigFiles() {
  if (!fs.existsSync(CONFIGS_DIR)) {
   throw new Error(`Configs directory not found: ${CONFIGS_DIR}`);
  }

  this.configFiles = fs.readdirSync(CONFIGS_DIR)
   .filter(file => file.endsWith('.json'))
   .map(file => ({
    name: file,
    configPath: path.join(CONFIGS_DIR, file),
    resultPath: path.join(this.outputDir, file.replace('.json', '-data.json'))
   }));

  this.log(`📁 Found ${this.configFiles.length} config files:\n`);
  this.configFiles.forEach(config => this.log(`   - ${config.name}`));
  this.log();
 }

 async checkServerStatus() {
  try {
   const response = await fetch(`${DEFAULT_DEBUG_SERVER_URL}/status`);
   const status = await response.json();

   if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
   }

   this.log(`✅ Debug server: ${status.server}`);
   this.log(`✅ CDP connected: ${status.cdpConnected ? 'Yes' : 'No'}`);
   this.log(`✅ Game injection: ${status.injected ? 'Active' : 'Not detected'}`);

   if (!status.injected) {
    console.warn(`\n⚠️  WARNING: Game not detected. Start offline server and wait for IDLEON_OFFLINE_READY.`);
    console.warn(`   Use live mode only to refresh a save. See tests/helpers/README.md#game-access.\n`);
   }

   return status.injected;
  } catch (error) {
   throw new Error(`Failed to connect to debug server: ${error.message}`);
  }
 }

 async fetchCloudSave() {
  const statusResponse = await fetch(`${DEFAULT_DEBUG_SERVER_URL}/status`);
  if (!statusResponse.ok) {
   throw new Error(`Cannot update latest.json: live source verification failed (HTTP ${statusResponse.status}). Use an updated live debug server.`);
  }
  const status = await statusResponse.json();
  if (status?.source !== 'live') {
   throw new Error(`Cannot update latest.json from ${status?.source || 'unknown'} source; only source='live' is allowed. Set GAME_SERVER_URL to an updated live debug server and restart its HTTP process.`);
  }

  const response = await fetch(`${DEFAULT_DEBUG_SERVER_URL}/cloud-save`);
  const cloudSave = await response.json();

  if (!response.ok) {
   throw new Error(`Cloud save export failed: ${cloudSave.error || `HTTP ${response.status}`}`);
  }

  fs.writeFileSync(SAVE_PATH, JSON.stringify(cloudSave, null, 2) + '\n');
  this.log(`✅ Cloud save fixture updated: ${SAVE_PATH}`);
 }

 async extractAll() {
  this.log(`\n🎯 Starting batch extraction...\n`);
  this.log(`${'='.repeat(80)}\n`);

  for (let i = 0; i < this.configFiles.length; i++) {
   const config = this.configFiles[i];
   const num = i + 1;
   const startedAt = Date.now();

   this.log(`[${num}/${this.configFiles.length}] Processing: ${config.name}`);
   this.log(`${'─'.repeat(80)}`);
   try {
    const configContents = JSON.parse(fs.readFileSync(config.configPath, 'utf8'));
    const configuredIndex = configContents.requiredActivePlayerIndex;
    const serverURL = configuredIndex === undefined
     ? DEFAULT_DEBUG_SERVER_URL
     : this.playerServers[configuredIndex] || DEFAULT_DEBUG_SERVER_URL;
    if (configuredIndex !== undefined && this.playerServers[configuredIndex]) {
     console.log(`Using explicit player ${configuredIndex} server for ${config.name}: ${serverURL}`);
    }
    const extractor = new GameDataExtractor(config.configPath, config.resultPath, {
     verbose: this.verbose,
     serverURL
    });
    const extractionResults = await extractor.run({ exitOnError: false });
    const extractionCount = Object.keys(extractionResults.extractions).length;
    const errorEntries = Object.entries(extractionResults.errors);

    this.results.extractionTotals.attempted += extractionCount + errorEntries.length;
    this.results.extractionTotals.successful += extractionCount;
    this.results.extractionTotals.failed += errorEntries.length;

    const configResult = {
     config: config.name,
     successful: extractionCount,
     failed: errorEntries.length,
     durationMs: Date.now() - startedAt
    };

    if (errorEntries.length > 0) {
     this.results.failed.push({
      ...configResult,
      errors: errorEntries.map(([label, details]) => ({ label, error: details.error }))
     });
     console.error(`❌ Failed extractions in ${config.name}:`);
     errorEntries.forEach(([label, details]) => console.error(`   - ${label}: ${details.error}`));
    } else {
     this.results.successful.push(configResult);
     this.log(`✅ Successfully extracted: ${config.name}\n`);
    }

   } catch (error) {
    this.results.failed.push({
     config: config.name,
     successful: 0,
     failed: 0,
     durationMs: Date.now() - startedAt,
     error: error.message
    });
    console.error(`❌ Failed to extract: ${config.name}`);
    console.error(`   Error: ${error.message}\n`);
   }

   this.log(`${'='.repeat(80)}\n`);
  }
 }

 printSummary() {
  const totalConfigs = this.configFiles.length;
  const completedConfigs = this.results.successful.length + this.results.failed.length;
  const failedConfigs = this.results.failed.length;
  const { attempted, successful, failed } = this.results.extractionTotals;
  const durationSeconds = (this.results.durationMs / 1000).toFixed(1);

  console.log(`\n${'='.repeat(80)}`);
  console.log(`📊 BATCH EXTRACTION SUMMARY`);
  console.log(`${'='.repeat(80)}\n`);
  console.log(`Configs:             ${completedConfigs}/${totalConfigs} completed (${failedConfigs} failed)`);
  console.log(`Extractions:         ${attempted} attempted (${successful} successful, ${failed} failed)`);
  console.log(`Duration:            ${durationSeconds}s`);
  console.log(`Started:             ${this.results.startedAt}`);
  console.log(`Finished:            ${this.results.finishedAt}`);
  console.log(`Results directory:   ${this.outputDir}`);

  if (failedConfigs > 0) {
   console.log(`\n❌ Failed configs:`);
   this.results.failed.forEach(({ config, error, errors = [] }) => {
    console.log(`   - ${config}${error ? `: ${error}` : ''}`);
    errors.forEach(({ label, error: extractionError }) => {
     console.log(`     ${label}: ${extractionError}`);
    });
   });
  }

  console.log(`\n${'='.repeat(80)}\n`);

  if (failedConfigs === 0 && failed === 0) {
   console.log(`🎉 All extractions completed successfully!`);
   console.log(`\n✨ Run 'yarn test:domains' to verify calculations match live game!`);
  } else {
   console.log(`⚠️  Extraction completed with failures. Check the details above and result files.`);
  }
 }

 async run() {
  try {
   this.results.startedAt = new Date().toISOString();
   const startTime = Date.now();
   this.log('🚀 Batch Game Data Extractor Starting...\n');
   this.log(`${'='.repeat(80)}\n`);
   console.log(`Primary extraction and save server: ${DEFAULT_DEBUG_SERVER_URL}`);
   Object.entries(this.playerServers).forEach(([index, serverURL]) => {
    console.log(`Explicit player ${index} extraction server: ${serverURL}`);
   });

   const gameConnected = await this.checkServerStatus();

   if (!gameConnected) {
    const readline = require('readline').createInterface({
     input: process.stdin,
     output: process.stdout
    });

    const answer = await new Promise(resolve => {
     readline.question('\n❓ Game not detected. Continue anyway? (y/N): ', resolve);
    });
    readline.close();

    if (answer.toLowerCase() !== 'y') {
     console.log('\n❌ Extraction cancelled by user');
     process.exit(1);
    }
   }

   // Refreshing the fixture can overwrite the latest save, so only do it by explicit request.
   if (!this.skipSaveRefresh) {
    await this.fetchCloudSave();
   }
   this.findConfigFiles();
   await this.extractAll();

   this.results.finishedAt = new Date().toISOString();
   this.results.durationMs = Date.now() - startTime;
   this.printSummary();

   if (this.results.failed.length > 0) {
    process.exit(1);
   }

  } catch (error) {
   console.error(`\n💥 Batch extraction failed: ${error.message}`);
   process.exit(1);
  }
 }
}

function parsePlayerServer(value) {
 const separator = value.indexOf('=');
 if (separator < 1) {
  throw new Error(`Invalid --player-server "${value}": expected <player-index>=<http(s) URL>`);
 }

 const playerIndexText = value.slice(0, separator);
 if (!/^(0|[1-9]\d*)$/.test(playerIndexText) || !Number.isSafeInteger(Number(playerIndexText))) {
  throw new Error(`Invalid --player-server "${value}": player index must be a non-negative integer`);
 }

 let serverURL;
 try {
  const parsedURL = new URL(value.slice(separator + 1));
  if (!['http:', 'https:'].includes(parsedURL.protocol) || parsedURL.username || parsedURL.password ||
      parsedURL.search || parsedURL.hash) {
   throw new Error('expected an http(s) URL without credentials, query, or fragment');
  }
  serverURL = parsedURL.toString().replace(/\/$/, '');
 } catch (error) {
  throw new Error(`Invalid --player-server "${value}": ${error.message}`);
 }

 return [Number(playerIndexText), serverURL];
}

function parsePlayerServers(args) {
 const playerServers = {};
 for (let index = 0; index < args.length; index++) {
  if (args[index] !== '--player-server') continue;

  const value = args[index + 1];
  if (!value || value.startsWith('--')) {
   throw new Error('--player-server requires <player-index>=<http(s) URL>');
  }
  const [playerIndex, serverURL] = parsePlayerServer(value);
  playerServers[playerIndex] = serverURL;
  index++;
 }
 return playerServers;
}

// CLI usage
if (require.main === module) {
 const args = process.argv.slice(2);
 const outputDirIndex = args.indexOf('--output-dir');
 const outputDir = outputDirIndex === -1 ? RESULTS_DIR : args[outputDirIndex + 1];
 try {
  if (!outputDir || outputDir.startsWith('--')) {
   throw new Error('--output-dir requires a directory');
  }
  const playerServers = parsePlayerServers(args);
  const batchExtractor = new BatchExtractor({
   verbose: args.includes('--verbose'),
   skipSaveRefresh: !args.includes('--refresh-save'),
   outputDir,
   playerServers
  });
  batchExtractor.run();
 } catch (error) {
  console.error(`${error.message}\nUsage: node extract-all-game-data.js [--verbose] [--refresh-save] [--output-dir <directory>] [--player-server <player-index>=<http(s) URL>]`);
  process.exit(1);
 }
}

module.exports = BatchExtractor;
