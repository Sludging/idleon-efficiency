const express = require('express');
const CDP = require('chrome-remote-interface');

class IdleonDebugServer {
    constructor(port = 3100, debugPort = 9223) {
        this.port = port;
        this.debugPort = debugPort;
        this.app = express();
        this.cdpClient = null;
        this.injected = false;
        this.gameReady = false;
        
        this.setupRoutes();
    }

    setupRoutes() {
        this.app.use(express.json());

        // Status endpoint
        this.app.get('/status', async (req, res) => {
            // Auto-check injection status if CDP is connected
            if (this.cdpClient && !this.injected) {
                try {
                    await this.checkExistingInjection();
                } catch (error) {
                    // Ignore errors during auto-check
                }
            }
            
            res.json({
                server: 'running',
                cdpConnected: !!this.cdpClient,
                injected: this.injected,
                gameReady: this.gameReady
            });
        });

        // Inject into running game
        this.app.post('/inject', async (req, res) => {
            try {
                if (this.injected) {
                    return res.json({ status: 'Already injected', gameReady: this.gameReady });
                }

                await this.performInjection();
                res.json({ status: 'Injection successful', gameReady: this.gameReady });
            } catch (error) {
                console.error('Injection error:', error);
                res.status(500).json({ error: error.message });
            }
        });

        // Execute game commands
        this.app.post('/exec', async (req, res) => {
            const { expression } = req.body;
            
            if (!expression) {
                return res.status(400).json({ error: 'expression is required' });
            }

            try {
                if (!this.gameReady) {
                    return res.status(400).json({ error: 'Game not ready. Call /inject first.' });
                }

                const result = await this.executeCommand(expression);
                res.json({ result });
            } catch (error) {
                console.error('Execution error:', error);
                res.status(500).json({ error: error.message });
            }
        });

        // Refresh injected helpers with latest code
        this.app.post('/refresh-helpers', async (req, res) => {
            try {
                if (!this.injected || !this.gameReady) {
                    return res.status(400).json({ error: 'Game not injected. Call /inject first.' });
                }

                await this.addConvenienceHelpers();
                res.json({ success: true, message: 'Helpers refreshed with latest code' });
            } catch (error) {
                console.error('Error refreshing helpers:', error);
                res.status(500).json({ error: 'Failed to refresh helpers: ' + error.message });
            }
        });

        // Get game object info
        this.app.get('/game-info', async (req, res) => {
            try {
                if (!this.gameReady) {
                    return res.status(400).json({ error: 'Game not ready. Call /inject first.' });
                }

                const info = await this.getGameInfo();
                res.json(info);
            } catch (error) {
                console.error('Game info error:', error);
                res.status(500).json({ error: error.message });
            }
        });
    }

    async performInjection() {
        console.log('[Server] Starting injection process...');
        
        // Connect to CDP
        console.log(`[DEBUG] Connecting to CDP on port ${this.debugPort}...`);
        const targets = await CDP.List({ port: this.debugPort });
        console.log(`[DEBUG] Found ${targets.length} CDP targets`);
        if (targets.length === 0) {
            throw new Error(`No targets found on debug port ${this.debugPort}. Make sure game is running with --remote-debugging-port=${this.debugPort}`);
        }

        console.log(`[DEBUG] Connecting to target: ${targets[0].title || targets[0].url}`);
        this.cdpClient = await CDP({ target: targets[0], port: this.debugPort });
        const { Network, Runtime, Page } = this.cdpClient;
        
        console.log('[DEBUG] Enabling CDP domains...');
        await Network.enable();
        await Runtime.enable();
        await Page.enable();
        await Page.setBypassCSP({ enabled: true });
        
        // Enable console API to catch JavaScript errors
        await Runtime.enable();
        
        // Listen for JavaScript console messages
        Runtime.consoleAPICalled((params) => {
            const message = params.args.map(arg => arg.value || arg.description || '[object]').join(' ');
            if (params.type === 'error') {
                console.log(`[DEBUG] JavaScript Console Error: ${message}`);
            } else if (message.includes('[INJECTION]')) {
                console.log(`[DEBUG] ${message}`);
            }
        });
        
        // Listen for JavaScript exceptions
        Runtime.exceptionThrown((params) => {
            console.log(`[DEBUG] JavaScript Exception: ${params.exceptionDetails.text}`);
            if (params.exceptionDetails.exception) {
                console.log(`[DEBUG] Exception details: ${JSON.stringify(params.exceptionDetails, null, 2)}`);
            }
        });
        
        console.log('[DEBUG] CDP domains enabled successfully with error monitoring');

        // Set up request interception
        console.log('[DEBUG] Setting up request interception for *N.js*...');
        await Network.setRequestInterception({
            patterns: [{
                urlPattern: '*N.js*',
                resourceType: 'Script',
                interceptionStage: 'HeadersReceived'
            }]
        });
        console.log('[DEBUG] Request interception configured');

        // Set up injection handler
        console.log('[DEBUG] Setting up injection promise with 30s timeout...');
        const injectionPromise = new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                console.log('[DEBUG] Injection timeout reached!');
                reject(new Error('Injection timeout after 30 seconds'));
            }, 30000);

            Network.requestIntercepted(async ({ interceptionId, request }) => {
                console.log(`[DEBUG] Intercepted request: ${request.url}`);
                try {
                    if (!this.injected && request.url.includes('N.js')) {
                        console.log('[DEBUG] Found N.js request, starting injection...');
                        this.injected = true;
                        clearTimeout(timeout);
                        
                        console.log('[DEBUG] Getting response body...');
                        const response = await Network.getResponseBodyForInterception({ interceptionId });
                        console.log(`[DEBUG] Response body base64 encoded: ${response.base64Encoded}`);
                        const originalBody = Buffer.from(response.body, 'base64').toString();
                        console.log(`[DEBUG] Original body length: ${originalBody.length} characters`);
                        
                        console.log('[DEBUG] Searching for ApplicationMain pattern...');
                        const injectionRegex = /(\w+)\.ApplicationMain\s*?=/;
                        const match = injectionRegex.exec(originalBody);
                        console.log(`[DEBUG] ApplicationMain pattern found: ${match ? 'YES' : 'NO'}`);
                        
                        if (!match) {
                            console.log('[DEBUG] ApplicationMain pattern not found, aborting injection');
                            await Network.continueInterceptedRequest({ interceptionId });
                            reject(new Error('ApplicationMain pattern not found'));
                            return;
                        }
                        
                        const varName = match[1];
                        console.log(`[DEBUG] Found ApplicationMain variable: ${varName}`);
                        
                        // Just inject the basic object exposure - helpers come later
                        console.log('[DEBUG] Creating basic object exposure...');
                        console.log('[DEBUG] Match: ', match[0]);
                        const basicInjection = `window.__idleon_cheats__=${varName},`;
                        
                        console.log('[DEBUG] Performing basic code injection...');
                        const injectedBody = originalBody.replace(match[0], `${basicInjection}${match[0]}`);
                        console.log(`[DEBUG] Injected body length: ${injectedBody.length} characters`);
                        console.log(`[DEBUG] Length difference: ${injectedBody.length - originalBody.length} characters`);
                        
                        const contentLength = Buffer.byteLength(injectedBody, 'utf-8');
                        const headers = [
                            `Date: ${(new Date()).toUTCString()}`,
                            'Connection: close',
                            `Content-Length: ${contentLength}`,
                            'Content-Type: application/javascript; charset=utf-8'
                        ];
                        
                        const rawResponse = Buffer.from(
                            'HTTP/1.1 200 OK\r\n' +
                            headers.join('\r\n') +
                            '\r\n\r\n' +
                            injectedBody
                        ).toString('base64');
                        
                        await Network.continueInterceptedRequest({
                            interceptionId,
                            rawResponse
                        });
                        
                        resolve(varName);
                        
                    } else {
                        await Network.continueInterceptedRequest({ interceptionId });
                    }
                } catch (error) {
                    clearTimeout(timeout);
                    await Network.continueInterceptedRequest({ interceptionId });
                    reject(error);
                }
            });
        });

        // Trigger page reload to catch N.js
        console.log('[DEBUG] Reloading page to trigger N.js interception...');
        await Page.reload({ ignoreCache: true });
        console.log('[DEBUG] Page reload completed');
        
        // Wait for injection
        console.log('[DEBUG] Waiting for injection promise to resolve...');
        await injectionPromise;
        console.log('[DEBUG] Injection promise resolved');
        
        // Wait for game context to be ready
        console.log('[DEBUG] Waiting for game context to be ready...');
        await this.waitForGameContext();
        console.log('[DEBUG] Game context ready');
        
        // Now add convenience helpers after the game is loaded
        console.log('[DEBUG] Adding convenience helpers after game load...');
        await this.addConvenienceHelpers();
        console.log('[DEBUG] Convenience helpers added');
        
        this.gameReady = true;
    }

    async waitForGameContext(timeout = 30000) {
        const { Runtime } = this.cdpClient;
        const start = Date.now();
        console.log(`[DEBUG] Waiting for game context (${timeout}ms timeout)...`);
        
        let attempts = 0;
        while (Date.now() - start < timeout) {
            attempts++;
            try {
                console.log(`[DEBUG] Checking game context (attempt ${attempts})...`);
                
                // Test basic window object first
                const windowTest = await Runtime.evaluate({
                    expression: 'typeof window',
                    returnByValue: true
                });
                console.log(`[DEBUG] typeof window: ${windowTest.result ? windowTest.result.value : 'undefined'}`);
                
                // Test frames
                const framesTest = await Runtime.evaluate({
                    expression: 'typeof window.frames',
                    returnByValue: true
                });
                console.log(`[DEBUG] typeof window.frames: ${framesTest.result ? framesTest.result.value : 'undefined'}`);
                
                // Test frames[0]
                const frames0Test = await Runtime.evaluate({
                    expression: 'typeof window.frames[0]',
                    returnByValue: true
                });
                console.log(`[DEBUG] typeof window.frames[0]: ${frames0Test.result ? frames0Test.result.value : 'undefined'}`);
                
                // Test our injected object in both contexts
                const cheatsMainTest = await Runtime.evaluate({
                    expression: 'typeof window.__idleon_cheats__',
                    returnByValue: true
                });
                console.log(`[DEBUG] typeof window.__idleon_cheats__ (main): ${cheatsMainTest.result ? cheatsMainTest.result.value : 'undefined'}`);
                
                const cheatsFrameTest = await Runtime.evaluate({
                    expression: 'window.frames[0] ? typeof window.frames[0].__idleon_cheats__ : "no-frame"',
                    returnByValue: true
                });
                console.log(`[DEBUG] typeof window.frames[0].__idleon_cheats__ (frame): ${cheatsFrameTest.result ? cheatsFrameTest.result.value : 'undefined'}`);
                
                // Test if game engine exists in either context
                const engineMainTest = await Runtime.evaluate({
                    expression: 'window.__idleon_cheats__ && window.__idleon_cheats__["com.stencyl.Engine"] ? "main-exists" : "main-missing"',
                    returnByValue: true
                });
                console.log(`[DEBUG] Stencyl Engine (main): ${engineMainTest.result ? engineMainTest.result.value : 'undefined'}`);
                
                const engineFrameTest = await Runtime.evaluate({
                    expression: 'window.frames[0] && window.frames[0].__idleon_cheats__ && window.frames[0].__idleon_cheats__["com.stencyl.Engine"] ? "frame-exists" : "frame-missing"',
                    returnByValue: true
                });
                console.log(`[DEBUG] Stencyl Engine (frame): ${engineFrameTest.result ? engineFrameTest.result.value : 'undefined'}`);
                
                // Check both contexts for readiness
                const result = await Runtime.evaluate({
                    expression: '(window.__idleon_cheats__ && window.__idleon_cheats__["com.stencyl.Engine"] && window.__idleon_cheats__["com.stencyl.Engine"].engine) || (window.frames[0] && window.frames[0].__idleon_cheats__ && window.frames[0].__idleon_cheats__["com.stencyl.Engine"] && window.frames[0].__idleon_cheats__["com.stencyl.Engine"].engine)',
                    returnByValue: true
                });
                
                console.log(`[DEBUG] Game context check result: ${result.result ? result.result.value : 'undefined'}`);
                
                if (result.result && result.result.value) {
                    console.log('[DEBUG] Game context is ready!');
                    return;
                }
                
                console.log('[DEBUG] Game context not ready, waiting 1s...');
                await new Promise(r => setTimeout(r, 1000));
            } catch (error) {
                console.log(`[DEBUG] Error checking game context: ${error.message}`);
                await new Promise(r => setTimeout(r, 1000));
            }
        }
        
        throw new Error('Game context not available after timeout');
    }

    async checkExistingInjection() {
        try {
            // Try to connect to CDP if not already connected
            if (!this.cdpClient) {
                const targets = await CDP.List({ port: this.debugPort });
                if (targets.length === 0) {
                    return false;
                }
                
                this.cdpClient = await CDP({ target: targets[0], port: this.debugPort });
                const { Runtime } = this.cdpClient;
                await Runtime.enable();
            }
            
            // Check if injection already exists
            const { Runtime } = this.cdpClient;
            const result = await Runtime.evaluate({
                expression: 'window.frames && window.frames[0] && typeof window.frames[0].__idleon_cheats__ === "object"',
                returnByValue: true
            });
            
            if (result.result && result.result.value) {
                // Base injection exists, now check/add convenience helpers
                const helpersResult = await Runtime.evaluate({
                    expression: 'window.frames && window.frames[0] && typeof window.frames[0].idleon === "object"',
                    returnByValue: true
                });
                
                if (!helpersResult.result || !helpersResult.result.value) {
                    // Add convenience helpers to existing injection
                    await this.addConvenienceHelpers();
                }
                
                this.injected = true;
                this.gameReady = true;
                return true;
            }
            
            return false;
            
        } catch (error) {
            return false;
        }
    }

    async addConvenienceHelpers() {
        const { Runtime } = this.cdpClient;
        
        const helpersCode = `
            window.frames[0].idleon = {
                engine: window.frames[0].__idleon_cheats__["com.stencyl.Engine"].engine,
                scripts: window.frames[0].__idleon_cheats__["scripts.ActorEvents_124"], // Legacy access to main script
                allScripts: {
                    // Direct access to all ActorEvents objects
                    get ActorEvents_12() { return window.frames[0].__idleon_cheats__["scripts.ActorEvents_12"]; },
                    get ActorEvents_124() { return window.frames[0].__idleon_cheats__["scripts.ActorEvents_124"]; },
                    get ActorEvents_148() { return window.frames[0].__idleon_cheats__["scripts.ActorEvents_148"]; },
                    get ActorEvents_189() { return window.frames[0].__idleon_cheats__["scripts.ActorEvents_189"]; },
                    get ActorEvents_266() { return window.frames[0].__idleon_cheats__["scripts.ActorEvents_266"]; },
                    get ActorEvents_345() { return window.frames[0].__idleon_cheats__["scripts.ActorEvents_345"]; },
                    get ActorEvents_579() { return window.frames[0].__idleon_cheats__["scripts.ActorEvents_579"]; }
                },
                getAttr: function(name) { return this.engine.getGameAttribute(name); },
                getDNSM: function(path) { 
                    try {
                        const dnsm = this.getAttr("DNSM").h;
                        if (!path) return Object.keys(dnsm); // Return ALL keys for discovery
                        return path.split('.').reduce((obj, key) => obj && obj[key], dnsm);
                    } catch(e) { return "DNSM error: " + e.message; }
                },
                getTalent: function(char, talentId) { return this.scripts._customBlock_GetTalentNumber(char, talentId); },
                // Smart function caller - automatically finds the right ActorEvents object
                callFunction: function(functionName, ...args) {
                    try {
                        // Remove _customBlock_ prefix if provided
                        const cleanName = functionName.startsWith('_customBlock_') ? functionName : '_customBlock_' + functionName;
                        
                        // Search through all ActorEvents objects
                        for (const actorKey of Object.keys(this.allScripts)) {
                            const actor = this.allScripts[actorKey];
                            if (actor && typeof actor[cleanName] === 'function') {
                                return actor[cleanName](...args);
                            }
                        }
                        
                        return "Function not found: " + cleanName;
                    } catch(e) { 
                        return "Function call error: " + e.message; 
                    }
                },
                // Get function location info
                findFunction: function(functionName) {
                    try {
                        const cleanName = functionName.startsWith('_customBlock_') ? functionName : '_customBlock_' + functionName;
                        const locations = [];
                        
                        for (const actorKey of Object.keys(this.allScripts)) {
                            const actor = this.allScripts[actorKey];
                            if (actor && typeof actor[cleanName] === 'function') {
                                locations.push(actorKey);
                            }
                        }
                        
                        return locations.length > 0 ? locations : "Function not found: " + cleanName;
                    } catch(e) { 
                        return "Search error: " + e.message; 
                    }
                },
                getPlayer: function() { 
                    try {
                        const player = this.getAttr("Player");
                        if (typeof player === "object" && player !== null) {
                            return Object.keys(player).slice(0, 20); // Show available keys
                        }
                        return player;
                    } catch(e) { return "Player data unavailable: " + e.message; }
                },
                getHP: function() { return this.getAttr("PlayerHP"); },
                getClass: function() { return this.getAttr("CharacterClass"); },
                getMap: function() { return this.getAttr("CurrentMap"); },
                // Additional safe helper functions
                listScripts: function() {
                    try {
                        const rawGame = window.frames[0].__idleon_cheats__;
                        const allCustomBlocks = [];
                        const scriptSources = {};
                        
                        // Find all keys that start with "scripts.ActorEvents_"
                        const actorEventKeys = Object.keys(rawGame).filter(k => k.startsWith("scripts.ActorEvents_"));
                        
                        for (const key of actorEventKeys) {
                            try {
                                const obj = rawGame[key];
                                if (obj && (typeof obj === "object" || typeof obj === "function")) {
                                    const customBlocks = Object.keys(obj).filter(k => k.includes("_customBlock_"));
                                    if (customBlocks.length > 0) {
                                        scriptSources[key] = customBlocks.length;
                                        allCustomBlocks.push(...customBlocks);
                                    }
                                }
                            } catch(e) {
                                continue;
                            }
                        }
                        
                        // Remove duplicates and sort
                        const uniqueBlocks = [...new Set(allCustomBlocks)].sort();
                        
                        return {
                            totalActorEvents: actorEventKeys.length,
                            actorEventsWithFunctions: Object.keys(scriptSources).length,
                            totalFunctions: uniqueBlocks.length,
                            functions: uniqueBlocks,
                            sources: scriptSources
                        };
                    } catch(e) { return "Scripts error: " + e.message; }
                },
                safeGetDNSM: function(path) {
                    try {
                        const dnsm = this.getAttr("DNSM");
                        if (!dnsm || !dnsm.h) return "DNSM not available";
                        
                        if (!path) return Object.keys(dnsm.h); // Return ALL keys for discovery
                        
                        const result = path.split('.').reduce((obj, key) => obj && obj[key], dnsm.h);
                        if (result === undefined || result === null) return "Path not found: " + path;
                        
                        // If result is complex object, return ALL keys for discovery
                        if (typeof result === "object" && result !== null) {
                            return Object.keys(result);
                        }
                        return result;
                    } catch(e) { return "DNSM error: " + e.message; }
                },
                // Utility functions for exploring complex objects
                exploreObject: function(objPath, maxDepth = 2) {
                    try {
                        // Handle string paths like "Player" or direct objects
                        let obj;
                        if (typeof objPath === "string") {
                            obj = this.getAttr(objPath);
                        } else {
                            obj = objPath;
                        }
                        
                        if (!obj || typeof obj !== "object") return typeof obj;
                        
                        const explore = (o, depth) => {
                            if (depth >= maxDepth || !o || typeof o !== "object") return typeof o;
                            
                            const result = {};
                            const keys = Object.keys(o).slice(0, 8); // Limit to first 8 keys
                            for (const key of keys) {
                                try {
                                    result[key] = explore(o[key], depth + 1);
                                } catch(e) {
                                    result[key] = "error";
                                }
                            }
                            return result;
                        };
                        
                        return explore(obj, 0);
                    } catch(e) { return "Explore error: " + e.message; }
                },


                // Find all script objects in the game
                findScriptObjects: function() {
                    try {
                        const rawGame = window.frames[0].__idleon_cheats__;
                        const scriptObjects = {};
                        
                        for (const key of Object.keys(rawGame)) {
                            if (key.toLowerCase().includes("script") || key.toLowerCase().includes("actor") || key.toLowerCase().includes("event")) {
                                try {
                                    const obj = rawGame[key];
                                    if (typeof obj === "object" && obj) {
                                        const objKeys = Object.keys(obj);
                                        const customBlocks = objKeys.filter(k => k.includes("_customBlock_")).length;
                                        const totalKeys = objKeys.length;
                                        
                                        scriptObjects[key] = {
                                            totalKeys: totalKeys,
                                            customBlocks: customBlocks,
                                            hasCustomBlocks: customBlocks > 0
                                        };
                                    }
                                } catch(e) {
                                    scriptObjects[key] = "Error accessing";
                                }
                            }
                        }
                        
                        return scriptObjects;
                    } catch(e) { return "Error finding script objects: " + e.message; }
                },
                // Get specific player data safely
                getPlayerData: function(charIndex = 0, property = null) {
                    try {
                        const player = this.getAttr("Player");
                        if (!player || !player[charIndex]) return "Character " + charIndex + " not found";
                        
                        if (!property) {
                            // Return ALL available properties for this character
                            return Object.keys(player[charIndex]);
                        }
                        
                        const value = player[charIndex][property];
                        if (typeof value === "object" && value !== null) {
                            return Object.keys(value); // Return ALL keys for discovery
                        }
                        return value;
                    } catch(e) { return "Player data error: " + e.message; }
                },
                help: function() { 
                    return {
                        // Core access
                        engine: "Main game engine object",
                        scripts: "Legacy script object (ActorEvents_124 only - 42 functions)",
                        allScripts: "All ActorEvents objects: allScripts.ActorEvents_266._customBlock_Breeding(...)",
                        
                        // Smart function access
                        callFunction: "Call any function by name: callFunction('GetTalentNumber', char, id)",
                        findFunction: "Find which ActorEvents contains a function: findFunction('Breeding')",
                        
                        // Game data
                        getAttr: "Get any game attribute: getAttr('PlayerHP')",
                        getDNSM: "Get DNSM data keys: getDNSM() or getDNSM('BoxRewards')",
                        safeGetDNSM: "Safer DNSM access: safeGetDNSM('AlchBubbles')",
                        getTalent: "Get talent level: getTalent(characterIndex, talentId)",
                        getPlayer: "Get player data keys",
                        getPlayerData: "Safe player access: getPlayerData(0) or getPlayerData(0, 'StatueLevels')",
                        getHP: "Get player HP",
                        getClass: "Get character class",
                        getMap: "Get current map",
                        
                        // Discovery tools
                        listScripts: "List ALL _customBlock_ functions (220 total) from all ActorEvents",
                        findScriptObjects: "Find all script-related objects in the game",
                        exploreObject: "Explore object: exploreObject('Player', 1)",
                        raw: "Access raw game object: window.__idleon_cheats__"
                    };
                }
            };
        `;
        
        await Runtime.evaluate({
            expression: helpersCode,
            returnByValue: false
        });
    }

    async executeCommand(expression) {
        const { Runtime } = this.cdpClient;
        
        // Handle different expression formats
        let fullExpression;
        if (expression.startsWith('window.') || expression.includes('window.frames[0].__idleon_cheats__')) {
            // Direct expressions that already reference window - use as-is
            fullExpression = expression;
        } else if (expression.startsWith('idleon.') || expression.startsWith('idleon[')) {
            // Convenience shortcuts - execute in iframe context
            fullExpression = `window.frames[0].${expression}`;
        } else if (expression.startsWith('this.')) {
            // Replace 'this' with the game object
            fullExpression = expression.replace(/^this\./, 'window.frames[0].__idleon_cheats__.');
        } else {
            // Assume it's a property/method of the game object
            fullExpression = `window.frames[0].__idleon_cheats__.${expression}`;
        }
        
        const result = await Runtime.evaluate({
            expression: fullExpression,
            returnByValue: true
        });
        
        if (result.exceptionDetails) {
            throw new Error(`Execution error: ${result.exceptionDetails.text || 'Unknown error'}`);
        }
        
        return result.result.value;
    }

    async getGameInfo() {
        const keys = await this.executeCommand('Object.keys(this).slice(0, 20)');
        const hasApplicationMain = await this.executeCommand('typeof this.ApplicationMain');
        
        return {
            availableKeys: keys,
            hasApplicationMain: hasApplicationMain,
            context: 'window.frames[0].__idleon_cheats__'
        };
    }

    async start() {
        return new Promise(async (resolve) => {
            this.app.listen(this.port, async () => {
                console.log(`[Server] Idleon Debug Server running on http://localhost:${this.port}`);
                console.log(`[Server] Endpoints:`);
                console.log(`  GET  /status     - Server status`);
                console.log(`  POST /inject     - Inject into game`);
                console.log(`  POST /exec       - Execute game commands`);
                console.log(`  GET  /game-info  - Get game object info`);
                console.log(`  POST /refresh-helpers  - Refresh injected helpers with latest code`);
                
                // Auto-check for existing injection
                const hasExisting = await this.checkExistingInjection();
                
                if (hasExisting) {
                    console.log(`[Server] Game detected and ready`);
                } else {
                    console.log(`[Server] Waiting for game connection on port ${this.debugPort}`);
                }
                
                resolve();
            });
        });
    }

    async stop() {
        if (this.cdpClient) {
            await this.cdpClient.close();
        }
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n[Server] Shutting down...');
    if (global.debugServer) {
        await global.debugServer.stop();
    }
    process.exit(0);
});

// Start server if run directly
if (require.main === module) {
    const server = new IdleonDebugServer();
    global.debugServer = server;
    server.start();
}

module.exports = IdleonDebugServer;
