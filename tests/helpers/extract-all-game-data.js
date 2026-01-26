#!/usr/bin/env node

/**
 * Batch Game Data Extractor
 *
 * Runs all extraction configs in tests/configs/ and saves results to tests/results/
 * Also saves the current cloud save as latest.json for test alignment
 */

const fs = require('fs');
const path = require('path');
const GameDataExtractor = require('./game-data-extractor');

const DEBUG_SERVER_URL = 'http://localhost:3100';
const CONFIGS_DIR = path.join(__dirname, '../configs');
const RESULTS_DIR = path.join(__dirname, '../results');

class BatchExtractor {
    constructor() {
        this.configFiles = [];
        this.results = {
            successful: [],
            failed: [],
            timestamp: new Date().toISOString()
        };
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
                resultPath: path.join(RESULTS_DIR, file.replace('.json', '-data.json'))
            }));

        console.log(`📁 Found ${this.configFiles.length} config files:\n`);
        this.configFiles.forEach(config => {
            console.log(`   - ${config.name}`);
        });
        console.log();
    }

    async checkServerStatus() {
        try {
            const response = await fetch(`${DEBUG_SERVER_URL}/status`);
            const status = await response.json();

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            console.log(`✅ Debug server: ${status.server}`);
            console.log(`✅ CDP connected: ${status.cdpConnected ? 'Yes' : 'No'}`);
            console.log(`✅ Game injection: ${status.injected ? 'Active' : 'Not detected'}`);

            if (!status.injected) {
                console.log(`\n⚠️  WARNING: Game not detected. Extractions will likely fail.`);
                console.log(`   Make sure:`);
                console.log(`   1. Game is running with --remote-debugging-port=9223`);
                console.log(`   2. Debug server auto-injection completed successfully\n`);
            }

            return status.injected;
        } catch (error) {
            throw new Error(`Failed to connect to debug server: ${error.message}`);
        }
    }

    async extractAll() {
        console.log(`\n🎯 Starting batch extraction...\n`);
        console.log(`${'='.repeat(80)}\n`);

        for (let i = 0; i < this.configFiles.length; i++) {
            const config = this.configFiles[i];
            const num = i + 1;

            console.log(`[${num}/${this.configFiles.length}] Processing: ${config.name}`);
            console.log(`${'─'.repeat(80)}`);

            try {
                const extractor = new GameDataExtractor(config.configPath, config.resultPath);
                await extractor.run();

                this.results.successful.push(config.name);
                console.log(`✅ Successfully extracted: ${config.name}\n`);

            } catch (error) {
                this.results.failed.push({
                    config: config.name,
                    error: error.message
                });
                console.error(`❌ Failed to extract: ${config.name}`);
                console.error(`   Error: ${error.message}\n`);
            }

            console.log(`${'='.repeat(80)}\n`);
        }
    }

    printSummary() {
        const total = this.configFiles.length;
        const successful = this.results.successful.length;
        const failed = this.results.failed.length;

        console.log(`\n${'='.repeat(80)}`);
        console.log(`📊 BATCH EXTRACTION SUMMARY`);
        console.log(`${'='.repeat(80)}\n`);

        console.log(`Total configs:     ${total}`);
        console.log(`Successful:        ${successful} ✅`);
        console.log(`Failed:            ${failed} ❌`);
        console.log(`Timestamp:         ${this.results.timestamp}\n`);

        if (successful > 0) {
            console.log(`✅ Successful extractions:`);
            this.results.successful.forEach(name => {
                console.log(`   - ${name}`);
            });
            console.log();
        }

        if (failed > 0) {
            console.log(`❌ Failed extractions:`);
            this.results.failed.forEach(({ config, error }) => {
                console.log(`   - ${config}`);
                console.log(`     Error: ${error}`);
            });
            console.log();
        }

        console.log(`${'='.repeat(80)}\n`);

        if (failed === 0) {
            console.log(`🎉 All extractions completed successfully!`);
            console.log(`📁 Results saved to: ${RESULTS_DIR}`);
            console.log(`\n✨ Run 'yarn test:domains' to verify calculations match live game!`);
        } else {
            console.log(`⚠️  Some extractions failed. Check the errors above.`);
        }
    }

    async run() {
        try {
            console.log('🚀 Batch Game Data Extractor Starting...\n');
            console.log(`${'='.repeat(80)}\n`);

            // Check server status first
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

            // Find all config files
            this.findConfigFiles();

            // Extract data for each config
            await this.extractAll();

            // Print summary
            this.printSummary();

            // Exit with error code if any failed
            if (this.results.failed.length > 0) {
                process.exit(1);
            }

        } catch (error) {
            console.error(`\n💥 Batch extraction failed: ${error.message}`);
            process.exit(1);
        }
    }
}

// CLI usage
if (require.main === module) {
    const batchExtractor = new BatchExtractor();
    batchExtractor.run();
}

module.exports = BatchExtractor;
