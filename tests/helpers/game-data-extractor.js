#!/usr/bin/env node

/**
 * Game Data Extractor
 * 
 * Reads a configuration file with game function calls,
 * executes them against the running game via debug API,
 * and saves results to an output file for testing.
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_DEBUG_SERVER_URL = process.env.GAME_SERVER_URL || 'http://127.0.0.1:3101';
const TARGET_PLAYER_CONFIG_PATH = path.resolve(__dirname, '../utils/target-player.json');
const TARGET_PLAYER_PLACEHOLDER = '__TARGET_PLAYER__';

class GameDataExtractor {
 constructor(configPath, outputPath, options = {}) {
  this.configPath = configPath;
  this.outputPath = outputPath;
  this.verbose = options.verbose !== false;
  this.serverURL = options.serverURL || DEFAULT_DEBUG_SERVER_URL;
  this.config = null;
  this.results = {
   extractions: {},
   errors: {}
  };
 }

 log(...args) {
  if (this.verbose) {
   console.log(...args);
  }
 }

 async loadConfig() {
  try {
   const configContent = fs.readFileSync(this.configPath, 'utf8');
   this.config = JSON.parse(configContent);
   this.log(`✅ Loaded config with ${this.config.extractions?.length || 0} extractions`);
  } catch (error) {
   throw new Error(`Failed to load config from ${this.configPath}: ${error.message}`);
  }
 }

 async checkServerStatus() {
  try {
   const response = await fetch(`${this.serverURL}/status`);
   const status = await response.json();

   if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
   }

   this.log(`✅ Debug server status: ${status.status}`);
   this.log(`✅ Game injection: ${status.injected ? 'Active' : 'Not detected'}`);

   if (!status.injected) {
    console.warn(`⚠️  Game not detected. Make sure:
1. Game is running with --remote-debugging-port=9223
2. Debug server auto-injection completed successfully`);
   }

   return status.injected;
  } catch (error) {
   throw new Error(`Failed to connect to debug server: ${error.message}`);
  }
 }

 async checkActivePlayer() {
  const requiredIndex = this.getRequiredActivePlayerIndex();
  const activePlayerIndex = await this.executeExpression(
   'idleon.getAttr("GetPlayersUsernames").indexOf(idleon.getAttr("UserInfo")[0])'
  );

  if (activePlayerIndex !== requiredIndex) {
   throw new Error(
    `Active player policy failed for ${this.configPath}: expected player index ${requiredIndex}, found ${activePlayerIndex}`
   );
  }

  this.log(`✅ Active player index: ${activePlayerIndex}`);
  return activePlayerIndex;
 }

 async extractData() {
  if (!this.config?.extractions) {
   throw new Error('No extractions found in config');
  }

  this.log(`\n🎯 Extracting ${this.config.extractions.length} values from game...\n`);

  for (const extraction of this.config.extractions) {
   const { label, expression } = extraction;
   const executedExpression = this.resolveExpression(expression);

   try {
    this.log(`  Extracting: ${label}`);
    this.log(`    Expression: ${executedExpression}`);

    const result = await this.executeExpression(executedExpression);

    this.results.extractions[label] = {
     expression: executedExpression,
     result
    };

    this.log(`    Result: ${JSON.stringify(result)}`);
    this.log(`    ✅ Success\n`);

   } catch (error) {
    this.results.errors[label] = {
     expression: executedExpression,
     error: error.message
    };

    console.error(`    ❌ Error: ${error.message}\n`);
   }
  }
 }

 saveResults() {
  try {
   // Ensure output directory exists
   const outputDir = path.dirname(this.outputPath);
   if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
   }

   const serializedResults = Buffer.from(JSON.stringify(this.results, null, 2), 'utf8');
   const unchanged = fs.existsSync(this.outputPath) &&
    fs.readFileSync(this.outputPath).equals(serializedResults);
   if (!unchanged) {
    fs.writeFileSync(this.outputPath, serializedResults);
   }

   const extractionCount = Object.keys(this.results.extractions).length;
   const errorCount = Object.keys(this.results.errors).length;

   this.log(`\n📁 Results ${unchanged ? 'unchanged at' : 'saved to'}: ${this.outputPath}`);
   this.log(`✅ Successful extractions: ${extractionCount}`);
   this.log(`❌ Failed extractions: ${errorCount}`);

   if (errorCount > 0) {
    console.warn(`\n⚠️  Errors occurred during extraction. Check the output file for details.`);
   }
  } catch (error) {
   throw new Error(`Failed to save results: ${error.message}`);
  }
 }

 async run(options = {}) {
  const exitOnError = options.exitOnError !== false;

  try {
   this.log('🚀 Game Data Extractor Starting...\n');

   await this.loadConfig();
   const gameConnected = await this.checkServerStatus();

   if (!gameConnected) {
    console.warn(`\n⚠️  Proceeding without game connection (some extractions may fail)`);
   } else {
    await this.checkActivePlayer();
   }

   await this.extractData();
   this.saveResults();

   this.log('\n🎉 Extraction completed!');
   return this.results;

  } catch (error) {
   console.error(`\n💥 Extraction failed: ${error.message}`);
   if (exitOnError) {
    process.exit(1);
   }
   throw error;
  }
 }


 readTargetPlayerIndex() {
  let targetPlayerConfig;
  try {
   targetPlayerConfig = JSON.parse(fs.readFileSync(TARGET_PLAYER_CONFIG_PATH, 'utf8'));
  } catch (error) {
   throw new Error(
    `Failed to load target player config from ${TARGET_PLAYER_CONFIG_PATH}: ${error.message}`
   );
  }

  const targetPlayerIndex = targetPlayerConfig?.index;
  if (!Number.isInteger(targetPlayerIndex) || targetPlayerIndex < 0) {
   throw new Error(
    `Invalid target player index in ${TARGET_PLAYER_CONFIG_PATH}: expected a non-negative integer`
   );
  }

  return targetPlayerIndex;
 }

 getRequiredActivePlayerIndex() {
  const configuredIndex = this.config?.requiredActivePlayerIndex;

  if (configuredIndex === undefined) {
   return this.readTargetPlayerIndex();
  }

  if (!Number.isInteger(configuredIndex) || configuredIndex < 0) {
   throw new Error(`Invalid requiredActivePlayerIndex in ${this.configPath}: expected a non-negative integer`);
  }

  return configuredIndex;
 }


 resolveExpression(expression) {
  if (typeof expression !== 'string' || !expression.includes(TARGET_PLAYER_PLACEHOLDER)) {
   return expression;
  }

  return expression.replaceAll(TARGET_PLAYER_PLACEHOLDER, String(this.readTargetPlayerIndex()));
 }

 async executeExpression(expression) {
  const executedExpression = this.resolveExpression(expression);

  try {
   let busyDeadline;
   while (true) {
    if (busyDeadline !== undefined && Date.now() >= busyDeadline) {
     throw new Error('Offline runtime remained busy for 30000ms; expression was not executed');
    }

    const response = await fetch(`${this.serverURL}/exec`, {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json'
     },
     body: JSON.stringify({ expression: executedExpression })
    });
    const result = await response.json();

    // This response rejects the request before evaluation. Other failures may follow execution.
    if (response.status === 409 && result.error === 'Offline runtime is busy; send requests serially') {
     busyDeadline ??= Date.now() + 30000;
     await new Promise(resolve => setTimeout(resolve, Math.min(250, Math.max(0, busyDeadline - Date.now()))));
     continue;
    }

    if (!response.ok) {
     throw new Error(`Execution failed: ${result.error || 'Unknown error'}`);
    }

    return this.normalizeResult(result.result);
   }
  } catch (error) {
   throw new Error(`Failed to execute "${executedExpression}": ${error.message}`);
  }
 }

 normalizeResult(result) {
  // Handle null/undefined
  if (result === null || result === undefined) {
   return null;
  }

  // Handle empty objects - convert to null for cleaner output
  if (typeof result === 'object' && result !== null && Object.keys(result).length === 0) {
   return null;
  }

  // Handle very large numbers that might lose precision
  if (typeof result === 'number') {
   // If it's a very large number, preserve it as string to maintain precision
   if (Math.abs(result) > Number.MAX_SAFE_INTEGER ||
    (result !== 0 && Math.abs(result) < Number.MIN_VALUE)) {
    return {
     type: 'large_number',
     value: result.toString()
    };
   }
  }

  return result;
 }

}

// CLI usage
if (require.main === module) {
 const args = process.argv.slice(2);

 if (args.length < 2) {
  console.log(`
Usage: node game-data-extractor.js <config-file> <output-file>

Examples:
  node game-data-extractor.js configs/cooking-speed.json results/cooking-speed-data.json
  node game-data-extractor.js configs/talent-data.json results/talent-data.json
        `);
  process.exit(1);
 }

 const [configPath, outputPath] = args;
 const extractor = new GameDataExtractor(configPath, outputPath);
 extractor.run();
}

module.exports = GameDataExtractor;
