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

test('getCloudSave reads the authenticated Firestore save document from the server', async () => {
    const server = new IdleonDebugServer();
    const save = { CloudsaveTimer: 123, BundlesReceived: '{"bun_q":1}', 'EquipQTY_-1': 'should-be-filtered' };
    const serverVars = { GameVERSION: 135, TestData: 'Hello There' };
    const playerNames = ['TestPlayer1', 'TestPlayer2'];
    const companions = [0, 1, 2, 3];
    let request;
    let requestedPaths = [];
    let requestedOptions = [];
    let databaseRefCalls = [];
    const gameFrame = {
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
                    databaseRefCalls.push(path);
                    return {
                        once: async (event) => {
                            if (path === '_uid/user') {
                                return { exists: () => true, val: () => playerNames };
                            }
                            if (path === '_comp/user') {
                                return { exists: () => true, val: () => ({ l: companions.map(c => c + ',0') }) };
                            }
                            return { exists: () => false };
                        }
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
