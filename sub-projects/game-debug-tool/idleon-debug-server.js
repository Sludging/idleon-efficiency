const express = require('express');
const CDP = require('chrome-remote-interface');
const createIdleonHelpers = require('./convenience-helpers');

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

        // Current game version from the live RANDOlist patch entry
        this.app.get('/game-version', async (req, res) => {
            try {
                if (!this.gameReady) {
                    return res.status(400).json({ error: 'Game not ready. Call /inject first.' });
                }

                const version = await this.executeCommand('idleon.getGameVersion()');
                if (typeof version === 'string') {
                    // Helper returns an error string on failure
                    return res.status(500).json({ error: version });
                }
                res.json(version);
            } catch (error) {
                console.error('Game version error:', error);
                res.status(500).json({ error: error.message });
            }
        });
        // Export the authenticated Firestore save document without committing a save
        this.app.get('/cloud-save', async (req, res) => {
            try {
                if (!this.gameReady) {
                    return res.status(400).json({ error: 'Game not ready. Call /inject first.' });
                }

                const cloudSave = await this.getCloudSave();
                res.json(cloudSave);
            } catch (error) {
                console.error('Cloud save export error:', error);
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
                // Return a primitive so CDP does not try to serialize the engine object.
                const result = await Runtime.evaluate({
                    expression: 'Boolean((window.__idleon_cheats__ && window.__idleon_cheats__["com.stencyl.Engine"] && window.__idleon_cheats__["com.stencyl.Engine"].engine) || (window.frames[0] && window.frames[0].__idleon_cheats__ && window.frames[0].__idleon_cheats__["com.stencyl.Engine"] && window.frames[0].__idleon_cheats__["com.stencyl.Engine"].engine))',
                    returnByValue: true
                });

                console.log(`[DEBUG] Game context check result: ${result.result ? result.result.value : 'undefined'}`);

                if (result.result && result.result.value === true) {
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
            window.frames[0].idleon = (${createIdleonHelpers.toString()})(
                window.frames[0].__idleon_cheats__
            );
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
        } else if (expression.includes('idleon.') || expression.includes('idleon[')) {
            // Contains idleon reference - wrap in function context to handle nested calls properly
            // This allows expressions like: idleon.callFunction("Func", 0, idleon.getAttr("Boats")[0][0])
            fullExpression = `
                (function() {
                    const idleon = window.frames[0].idleon;
                    return ${expression};
                })()
            `;
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

    async getCloudSave() {
        const { Runtime } = this.cdpClient;
        const expression = `
            (async () => {
                const frame = window.frames[0];
                const firebase = frame && frame.firebase;
                if (!firebase) {
                    throw new Error('Game Firebase SDK is unavailable');
                }

                const user = firebase.auth().currentUser;
                if (!user || !user.uid) {
                    throw new Error('Game Firebase authentication is unavailable');
                }
                const uid = user.uid;

                const firestore = firebase.firestore();
                if (!firestore || typeof firestore.doc !== 'function') {
                    throw new Error('Game Firestore SDK is unavailable');
                }

                const database = firebase.database();
                if (!database || typeof database.ref !== 'function') {
                    throw new Error('Game Realtime Database SDK is unavailable');
                }

                // Fetch main save document
                const saveSnapshot = await firestore
                    .doc('_data/' + uid)
                    .get({ source: 'server' });
                if (!saveSnapshot.exists) {
                    throw new Error('Authenticated save document does not exist');
                }
                const saveData = saveSnapshot.data();

                // Filter out keys ending with _-1
                const filteredSave = {};
                for (const [key, value] of Object.entries(saveData)) {
                    if (!key.endsWith('_-1')) {
                        filteredSave[key] = value;
                    }
                }

                // Fetch servervars from _vars/_vars
                let serverVars = {};
                try {
                    const varsSnapshot = await firestore.doc('_vars/_vars').get({ source: 'server' });
                    if (varsSnapshot.exists) {
                        serverVars = varsSnapshot.data() || {};
                    }
                } catch (error) {
                    console.warn('Failed to fetch servervars:', error);
                }

                // Fetch playerNames from Realtime DB _uid/{uid}
                let playerNames = [];
                try {
                    const namesSnapshot = await database.ref('_uid/' + uid).once('value');
                    if (namesSnapshot.exists()) {
                        playerNames = namesSnapshot.val() || [];
                    }
                } catch (error) {
                    console.warn('Failed to fetch playerNames:', error);
                }

                // Use the game's client-side companion list. This is intentionally
                // separate from the authenticated Realtime DB record: the game
                // exposes a deterministic test list through getCompanionInfoMe().
                let companions;
                try {
                    const companionStorage = frame &&
                        frame.__idleon_cheats__ &&
                        frame.__idleon_cheats__.FirebaseStorage;
                    if (!companionStorage || typeof companionStorage.getCompanionInfoMe !== 'function') {
                        throw new Error('Game companion info function is unavailable');
                    }

                    const rawCompanions = companionStorage.getCompanionInfoMe();
                    if (!Array.isArray(rawCompanions)) {
                        throw new Error('Game companion info did not return an array');
                    }

                    companions = rawCompanions.map((record, index) => {
                        if (typeof record !== 'string') {
                            throw new Error('Game companion info record ' + index + ' is not a CSV string');
                        }

                        const fields = record.split(',');
                        const id = Number(fields[0]?.trim());
                        const levelMarker = Number(fields[4]?.trim());
                        if (!Number.isFinite(id) || !Number.isFinite(levelMarker)) {
                            throw new Error('Game companion info record ' + index + ' is malformed');
                        }

                        return {
                            id,
                            level: levelMarker >= 1 ? 2 : 1
                        };
                    });
                } catch (error) {
                    throw new Error('Failed to read game companion info: ' + error.message);
                }

                // Combine everything to match raw-data page output
                return {
                    ...filteredSave,
                    playerNames,
                    companions,
                    servervars: serverVars
                };
            })()
        `;

        const result = await Runtime.evaluate({
            expression,
            returnByValue: true,
            awaitPromise: true
        });

        if (result.exceptionDetails) {
            const exception = result.exceptionDetails.exception;
            const detail = exception && (exception.description || exception.value);
            throw new Error(`Cloud save export failed: ${detail || result.exceptionDetails.text || 'Unknown error'}`);
        }

        if (result.result.value === undefined) {
            throw new Error('Cloud save export returned no data');
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
                console.log(`  GET  /game-version - Current game version from the live RANDOlist patch entry`);
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
