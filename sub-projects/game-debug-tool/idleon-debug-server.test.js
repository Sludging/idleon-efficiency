const assert = require('node:assert/strict');
const test = require('node:test');
const vm = require('node:vm');
const IdleonDebugServer = require('./idleon-debug-server');

test('waitForGameContext only asks CDP to return a primitive', async () => {
    const server = new IdleonDebugServer();
    const evaluations = [];
    server.cdpClient = {
        Runtime: {
            evaluate: async (request) => {
                evaluations.push(request);
                return {
                    result: {
                        value: request.expression.startsWith('Boolean(') ? true : 'object'
                    }
                };
            }
        }
    };

    await server.waitForGameContext(1000);

    const readinessCheck = evaluations.at(-1);
    assert.equal(readinessCheck.returnByValue, true);
    assert.match(readinessCheck.expression, /^Boolean\(/);
});

test('addConvenienceHelpers injects a deterministic getGameVersion from RANDOlist', async () => {
    const server = new IdleonDebugServer();
    const evaluations = [];
    server.cdpClient = {
        Runtime: {
            evaluate: async (request) => {
                evaluations.push(request);
                return { result: {} };
            }
        }
    };

    await server.addConvenienceHelpers();

    const helpers = evaluations[0].expression;
    assert.match(helpers, /getGameVersion: function\(\)/);
    // Execute the helper code in a mock game context to verify behavior
    const context = {
        window: {
            frames: [{
                __idleon_cheats__: {
                    'com.stencyl.Engine': { engine: {} },
                    'scripts.CustomLists': {
                        RANDOlist: () => [
                            ['mushG', 'frogG'],
                            ['Summer_Event_v1.19;Patch body text'],
                        ]
                    }
                }
            }]
        }
    };
    vm.createContext(context);
    vm.runInContext(helpers, context);
    const v = context.window.frames[0].idleon.getGameVersion();
    assert.equal(v.title, 'Summer_Event');
    assert.equal(v.version, '1.19');

    // Ambiguous entries surface as an error string instead of a guess
    context.window.frames[0].__idleon_cheats__['scripts.CustomLists'].RANDOlist = () => [
        ['A_Patch_v1.19;x'],
        ['B_Patch_v1.20;y'],
    ];
    assert.match(context.window.frames[0].idleon.getGameVersion(), /^Ambiguous version entries/);
});

test('GET /game-version returns the live RANDOlist version', async () => {
    const server = new IdleonDebugServer();
    server.gameReady = true;
    server.executeCommand = async (expression) => {
        assert.equal(expression, 'idleon.getGameVersion()');
        return { title: 'Summer_Event', version: '1.19' };
    };

    const listener = await new Promise((resolve) => {
        const httpServer = server.app.listen(0, () => resolve(httpServer));
    });

    try {
        const port = listener.address().port;
        const response = await fetch(`http://127.0.0.1:${port}/game-version`);
        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { title: 'Summer_Event', version: '1.19' });
    } finally {
        listener.close();
    }
});

test('getCloudSave uses the game companion list instead of the real Realtime DB companions', async () => {
    const server = new IdleonDebugServer();
    const save = { CloudsaveTimer: 123, BundlesReceived: '{"bun_q":1}', 'EquipQTY_-1': 'should-be-filtered' };
    const serverVars = { GameVERSION: 135, TestData: 'Hello There' };
    const playerNames = ['TestPlayer1', 'TestPlayer2'];
    const companions = [0, 1, 2, 3];
    let request;
    const requestedPaths = [];
    const requestedOptions = [];
    const gameFrame = {
        __idleon_cheats__: {
            FirebaseStorage: {
                getCompanionInfoMe: () => companions
            }
        },
        firebase: {
            auth: () => ({ currentUser: { uid: 'user' } }),
            firestore: () => ({
                doc: (path) => {
                    requestedPaths.push(path);
                    return {
                        get: async (options) => {
                            requestedOptions.push(options);
                            if (path === '_vars/_vars') {
                                return { exists: true, data: () => serverVars };
                            }
                            return { exists: true, data: () => save };
                        }
                    };
                }
            }),
            database: () => ({
                ref: (path) => {
                    requestedPaths.push(path);
                    if (path !== '_uid/user') {
                        throw new Error(`Unexpected Realtime DB path: ${path}`);
                    }
                    return {
                        once: async () => ({ exists: () => true, val: () => playerNames })
                    };
                }
            })
        }
    };
    server.cdpClient = {
        Runtime: {
            evaluate: async (runtimeRequest) => {
                request = runtimeRequest;
                const value = await vm.runInNewContext(
                    runtimeRequest.expression,
                    { window: { frames: [gameFrame] } }
                );
                return { result: { value } };
            }
        }
    };

    const result = await server.getCloudSave();

    assert.equal(result.CloudsaveTimer, 123);
    assert.equal(result.BundlesReceived, '{"bun_q":1}');
    assert.equal(result.playerNames, playerNames);
    assert.deepEqual(result.companions, companions);
    assert.deepEqual(result.servervars, serverVars);
    assert.equal('EquipQTY_-1' in result, false);
    assert.deepEqual(requestedPaths, ['_data/user', '_vars/_vars', '_uid/user']);
    assert.equal(request.returnByValue, true);
    assert.equal(request.awaitPromise, true);
    assert.equal(requestedOptions[0].source, 'server');
    assert.equal(requestedOptions[1].source, 'server');
});

test('GET /cloud-save returns the direct Firestore save object', async () => {
    const server = new IdleonDebugServer();
    server.gameReady = true;
    server.getCloudSave = async () => ({ CloudsaveTimer: 123 });

    const listener = await new Promise((resolve) => {
        const httpServer = server.app.listen(0, () => resolve(httpServer));
    });

    try {
        const baseUrl = `http://localhost:${listener.address().port}`;
        const response = await fetch(`${baseUrl}/cloud-save`);
        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { CloudsaveTimer: 123 });

        const removedResponse = await fetch(`${baseUrl}/cloud-save/v2`);
        assert.equal(removedResponse.status, 404);
    } finally {
        await new Promise((resolve, reject) => {
            listener.close((error) => error ? reject(error) : resolve());
        });
    }
});
