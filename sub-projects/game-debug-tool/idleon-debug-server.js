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
        const targets = await CDP.List({ port: this.debugPort });
        if (targets.length === 0) {
            throw new Error(`No targets found on debug port ${this.debugPort}. Make sure game is running with --remote-debugging-port=${this.debugPort}`);
        }

        this.cdpClient = await CDP({ target: targets[0], port: this.debugPort });
        const { Network, Runtime, Page } = this.cdpClient;
        
        await Network.enable();
        await Runtime.enable();
        await Page.enable();
        await Page.setBypassCSP({ enabled: true });

        // Set up request interception
        await Network.setRequestInterception({
            patterns: [{
                urlPattern: '*N.js*',
                resourceType: 'Script',
                interceptionStage: 'HeadersReceived'
            }]
        });

        // Set up injection handler
        const injectionPromise = new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Injection timeout after 30 seconds'));
            }, 30000);

            Network.requestIntercepted(async ({ interceptionId, request }) => {
                try {
                    if (!this.injected && request.url.includes('N.js')) {
                        this.injected = true;
                        clearTimeout(timeout);
                        
                        const response = await Network.getResponseBodyForInterception({ interceptionId });
                        const originalBody = Buffer.from(response.body, 'base64').toString();
                        
                        const injectionRegex = /(\w+)\.ApplicationMain\s*?=/;
                        const match = injectionRegex.exec(originalBody);
                        
                        if (!match) {
                            await Network.continueInterceptedRequest({ interceptionId });
                            reject(new Error('ApplicationMain pattern not found'));
                            return;
                        }
                        
                        const varName = match[1];
                        
                        // Create convenience helpers for easy access
                        const convenienceHelpers = `
                            window.__idleon_cheats__=${varName};
                            window.idleon = {
                                engine: ${varName}["com.stencyl.Engine"].engine,
                                scripts: ${varName}["scripts.ActorEvents_124"],
                                getAttr: function(name) { return this.engine.getGameAttribute(name); },
                                getDNSM: function(path) { 
                                    const dnsm = this.getAttr("DNSM").h;
                                    return path ? path.split('.').reduce((obj, key) => obj && obj[key], dnsm) : dnsm;
                                },
                                getTalent: function(char, talentId) { return this.scripts._customBlock_GetTalentNumber(char, talentId); },
                                getPlayer: function() { return this.getAttr("Player"); },
                                getHP: function() { return this.getAttr("PlayerHP"); },
                                getClass: function() { return this.getAttr("CharacterClass"); },
                                getMap: function() { return this.getAttr("CurrentMap"); },
                                help: function() { 
                                    return {
                                        engine: "Main game engine object",
                                        scripts: "Script object with _customBlock_ functions",
                                        getAttr: "Get any game attribute: getAttr('PlayerHP')",
                                        getDNSM: "Get DNSM data: getDNSM() or getDNSM('BoxRewards.cooldown')",
                                        getTalent: "Get talent level: getTalent(characterIndex, talentId)",
                                        getPlayer: "Get player data",
                                        getHP: "Get player HP",
                                        getClass: "Get character class",
                                        getMap: "Get current map",
                                        raw: "Access raw game object: window.__idleon_cheats__"
                                    };
                                }
                            };
                        `;
                        
                        const injectedBody = originalBody.replace(match[0], `${convenienceHelpers}${match[0]}`);
                        
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
        await Page.reload({ ignoreCache: true });
        
        // Wait for injection
        await injectionPromise;
        
        // Wait for game context to be ready
        await this.waitForGameContext();
        
        this.gameReady = true;
    }

    async waitForGameContext(timeout = 30000) {
        const { Runtime } = this.cdpClient;
        const start = Date.now();
        
        while (Date.now() - start < timeout) {
            try {
                const result = await Runtime.evaluate({
                    expression: 'window.frames && window.frames[0] && typeof window.frames[0].__idleon_cheats__ === "object"',
                    returnByValue: true
                });
                
                if (result.result && result.result.value) {
                    return;
                }
                
                await new Promise(r => setTimeout(r, 1000));
            } catch (error) {
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
                scripts: window.frames[0].__idleon_cheats__["scripts.ActorEvents_124"],
                getAttr: function(name) { return this.engine.getGameAttribute(name); },
                getDNSM: function(path) { 
                    try {
                        const dnsm = this.getAttr("DNSM").h;
                        if (!path) return Object.keys(dnsm); // Return ALL keys for discovery
                        return path.split('.').reduce((obj, key) => obj && obj[key], dnsm);
                    } catch(e) { return "DNSM error: " + e.message; }
                },
                getTalent: function(char, talentId) { return this.scripts._customBlock_GetTalentNumber(char, talentId); },
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
                        engine: "Main game engine object",
                        scripts: "Script object with _customBlock_ functions",
                        getAttr: "Get any game attribute: getAttr('PlayerHP')",
                        getDNSM: "Get DNSM data keys: getDNSM() or getDNSM('BoxRewards')",
                        safeGetDNSM: "Safer DNSM access: safeGetDNSM('AlchBubbles')",
                        getTalent: "Get talent level: getTalent(characterIndex, talentId)",
                        getPlayer: "Get player data keys",
                        getPlayerData: "Safe player access: getPlayerData(0) or getPlayerData(0, 'StatueLevels')",
                        getHP: "Get player HP",
                        getClass: "Get character class",
                        getMap: "Get current map", 
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
