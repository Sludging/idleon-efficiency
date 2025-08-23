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

const DEBUG_SERVER_URL = 'http://localhost:3100';

class GameDataExtractor {
    constructor(configPath, outputPath) {
        this.configPath = configPath;
        this.outputPath = outputPath;
        this.config = null;
        this.results = {
            timestamp: new Date().toISOString(),
            extractions: {},
            errors: {},
            metadata: {}
        };
    }

    async loadConfig() {
        try {
            const configContent = fs.readFileSync(this.configPath, 'utf8');
            this.config = JSON.parse(configContent);
            console.log(`✅ Loaded config with ${this.config.extractions?.length || 0} extractions`);
        } catch (error) {
            throw new Error(`Failed to load config from ${this.configPath}: ${error.message}`);
        }
    }

    async checkServerStatus() {
        try {
            const response = await fetch(`${DEBUG_SERVER_URL}/status`);
            const status = await response.json();
            
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            console.log(`✅ Debug server status: ${status.status}`);
            console.log(`✅ Game injection: ${status.injected ? 'Active' : 'Not detected'}`);
            
            if (!status.injected) {
                console.log(`⚠️  Game not detected. Make sure:
1. Game is running with --remote-debugging-port=9223
2. Debug server auto-injection completed successfully`);
            }

            this.results.metadata.serverStatus = status;
            return status.injected;
        } catch (error) {
            throw new Error(`Failed to connect to debug server: ${error.message}`);
        }
    }

    async executeExpression(expression) {
        try {
            const response = await fetch(`${DEBUG_SERVER_URL}/exec`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ expression })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(`Execution failed: ${result.error || 'Unknown error'}`);
            }

            return this.normalizeResult(result.result);
        } catch (error) {
            throw new Error(`Failed to execute "${expression}": ${error.message}`);
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
                    value: result.toString(),
                    original: result
                };
            }
        }

        return result;
    }

    async extractData() {
        if (!this.config?.extractions) {
            throw new Error('No extractions found in config');
        }

        console.log(`\n🎯 Extracting ${this.config.extractions.length} values from game...\n`);

        for (const extraction of this.config.extractions) {
            const { label, expression, description } = extraction;
            
            try {
                console.log(`  Extracting: ${label}`);
                console.log(`    Expression: ${expression}`);
                
                const result = await this.executeExpression(expression);
                
                this.results.extractions[label] = {
                    expression,
                    result,
                    description: description || '',
                    extractedAt: new Date().toISOString()
                };
                
                console.log(`    Result: ${JSON.stringify(result)}`);
                console.log(`    ✅ Success\n`);
                
            } catch (error) {
                this.results.errors[label] = {
                    expression,
                    error: error.message,
                    description: description || '',
                    failedAt: new Date().toISOString()
                };
                
                console.log(`    ❌ Error: ${error.message}\n`);
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

            fs.writeFileSync(this.outputPath, JSON.stringify(this.results, null, 2));
            
            const extractionCount = Object.keys(this.results.extractions).length;
            const errorCount = Object.keys(this.results.errors).length;
            
            console.log(`\n📁 Results saved to: ${this.outputPath}`);
            console.log(`✅ Successful extractions: ${extractionCount}`);
            console.log(`❌ Failed extractions: ${errorCount}`);
            
            if (errorCount > 0) {
                console.log(`\n⚠️  Errors occurred during extraction. Check the output file for details.`);
            }
        } catch (error) {
            throw new Error(`Failed to save results: ${error.message}`);
        }
    }

    async run() {
        try {
            console.log('🚀 Game Data Extractor Starting...\n');
            
            await this.loadConfig();
            const gameConnected = await this.checkServerStatus();
            
            if (!gameConnected) {
                console.log(`\n⚠️  Proceeding without game connection (some extractions may fail)`);
            }
            
            await this.extractData();
            this.saveResults();
            
            console.log('\n🎉 Extraction completed!');
            
        } catch (error) {
            console.error(`\n💥 Extraction failed: ${error.message}`);
            process.exit(1);
        }
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
