// This factory is serialized into the game browser by both HTTP tools. Keep all
// dependencies inside the function; registry is the original game's class registry.
function createIdleonHelpers(registry) {
    const allScripts = {};
    // Preserve the live tool's legacy search priority before newly discovered actors.
    const actorNames = new Set([
        'ActorEvents_12', 'ActorEvents_124', 'ActorEvents_148', 'ActorEvents_189',
        'ActorEvents_266', 'ActorEvents_345', 'ActorEvents_579'
    ]);
    for (const key of Object.keys(registry)) {
        if (key.startsWith('scripts.ActorEvents_')) {
            actorNames.add(key.slice('scripts.'.length));
        }
    }
    for (const name of actorNames) {
        Object.defineProperty(allScripts, name, {
            enumerable: true,
            configurable: true,
            get: function() { return registry['scripts.' + name]; }
        });
    }

    return {
        engine: registry["com.stencyl.Engine"].engine,
        scripts: registry["scripts.ActorEvents_124"], // Legacy access to main script
        allScripts,
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
        // Current game version, from the live RANDOlist patch entry.
        // The game keeps legacy patch entries elsewhere (e.g. PatchNotesInfo),
        // so max-sorting version numbers across the game yields stale results
        // after a version reset. RANDOlist holds exactly one current-patch
        // string of the form "<Title>_v<version>"; returning it verbatim keeps
        // detection deterministic, and ambiguity is surfaced instead of guessed.
        getGameVersion: function() {
            try {
                const rando = registry["scripts.CustomLists"].RANDOlist();
                const found = [];
                (function walk(x) {
                    if (typeof x === "string") {
                        const m = x.match(/^([A-Za-z0-9_,]+)_v([0-9]+\.[0-9]+[a-zA-Z]?)/);
                        if (m) found.push({ title: m[1], version: m[2] });
                    } else if (Array.isArray(x)) x.forEach(walk);
                })(rando);
                if (found.length === 0) return "No version entry found in RANDOlist";
                if (found.length > 1) return "Ambiguous version entries in RANDOlist: " + JSON.stringify(found);
                return found[0];
            } catch(e) { return "Game version error: " + e.message; }
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
                const rawGame = registry;
                const allCustomBlocks = [];
                const scriptSources = {};
                
                // Find all keys that start with "scripts.ActorEvents_"
                const actorEventKeys = Object.keys(rawGame).filter(k => k.startsWith("scripts.ActorEvents_"));
                
                for (const key of actorEventKeys) {
                    try {
                        const obj = rawGame[key];
                        if (obj && (typeof obj === "object" || typeof obj === "function")) {
                            const customBlocks = Object.getOwnPropertyNames(obj).filter(k => k.includes("_customBlock_"));
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
                    const keys = Object.keys(o)
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
                const rawGame = registry;
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
                
                // Game data
                getAttr: "Get any game attribute: getAttr('PlayerHP')",
                getDNSM: "Get DNSM data keys: getDNSM() or getDNSM('BoxRewards')",
                getGameVersion: "Current game version from the live RANDOlist patch entry: getGameVersion() -> { title, version }",
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
}

module.exports = createIdleonHelpers;
