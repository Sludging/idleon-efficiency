# Idleon Game Debug Tool - Complete Solution

## 🎯 **Mission Accomplished**
Successfully created a Node.js tool to attach to running Electron game process, execute functions, and extract exact values for testing reverse-engineered game code.

## 📁 **Files Created**
- **`idleon-debug-server.js`** - Main production HTTP server
- **`package.json`** - Node.js dependencies
- **`exploration-log.md`** - Development journey and findings
- **`network-interceptor.js`** - Standalone network injection tool (backup)

## 🔧 **Technical Solution**

### **Injection Method**
- **Target**: N.js script during game loading
- **Pattern**: Find `/(\w+)\.ApplicationMain\s*?=/` 
- **Injection**: Replace with `window.__idleon_cheats__=${varName},${originalMatch}`
- **Critical**: Use comma syntax, not semicolon (avoids JavaScript syntax errors)

### **Game Object Access**
```javascript
// Main game object
window.frames[0].__idleon_cheats__

// Stencyl Engine (from old examples)
window.frames[0].__idleon_cheats__["com.stencyl.Engine"]

// Engine object with game functions
window.frames[0].__idleon_cheats__["com.stencyl.Engine"].engine

// Script objects with custom blocks
window.frames[0].__idleon_cheats__["scripts.ActorEvents_124"]
```

## 🌐 **HTTP API**

### **Server Setup**
```bash
cd sub-projects/game-debug-tool
node idleon-debug-server.js
# Server runs on http://localhost:3100
```

### **Endpoints**
- `GET /status` - Check server and injection status
- `POST /inject` - Inject into running game (auto-skipped if already injected)
- `POST /exec` - Execute JavaScript expressions in game context
- `GET /game-info` - Get game object information

### **Usage Examples**

#### **Easy API (Recommended)**
```bash
# Check status
curl http://localhost:3100/status

# Get help with available functions
curl -X POST http://localhost:3100/exec \
  -H "Content-Type: application/json" \
  -d '{"expression": "idleon.help()"}'

# Simple game data access
curl -X POST http://localhost:3100/exec \
  -H "Content-Type: application/json" \
  -d '{"expression": "idleon.getHP()"}'

curl -X POST http://localhost:3100/exec \
  -H "Content-Type: application/json" \
  -d '{"expression": "idleon.getClass()"}'

curl -X POST http://localhost:3100/exec \
  -H "Content-Type: application/json" \
  -d '{"expression": "idleon.getTalent(1, 289)"}'

# DNSM data access
curl -X POST http://localhost:3100/exec \
  -H "Content-Type: application/json" \
  -d '{"expression": "idleon.getDNSM(\"BoxRewards.cooldown\")"}'

curl -X POST http://localhost:3100/exec \
  -H "Content-Type: application/json" \
  -d '{"expression": "idleon.getDNSM(\"DungeonStats.abilityCD\")"}'

# Any game attribute
curl -X POST http://localhost:3100/exec \
  -H "Content-Type: application/json" \
  -d '{"expression": "idleon.getAttr(\"CurrentMap\")"}'
```

#### **Advanced API (Raw Access)**
```bash
# Direct engine access
curl -X POST http://localhost:3100/exec \
  -H "Content-Type: application/json" \
  -d '{"expression": "window.frames[0].__idleon_cheats__[\"com.stencyl.Engine\"].engine.getGameAttribute(\"PlayerHP\")"}'

# Direct script access
curl -X POST http://localhost:3100/exec \
  -H "Content-Type: application/json" \
  -d '{"expression": "window.frames[0].__idleon_cheats__[\"scripts.ActorEvents_124\"]._customBlock_GetTalentNumber(1, 289)"}'
```

## 🎯 **Convenience API**

The injection creates a simple `idleon` object for easy access:

### **Core Methods**
```javascript
// Get help
idleon.help()                           // Shows all available methods

// Game attributes  
idleon.getAttr(name)                    // Get any game attribute
idleon.getHP()                          // Get player HP
idleon.getClass()                       // Get character class  
idleon.getMap()                         // Get current map

// DNSM data (main game state) - Returns keys for discovery
idleon.getDNSM()                        // Get all DNSM categories
idleon.safeGetDNSM("AlchBubbles")       // Get AlchBubbles data safely
idleon.safeGetDNSM("BoxRewards")        // Get BoxRewards data safely

// Player data - Returns keys for discovery  
idleon.getPlayer()                      // Get player object keys
idleon.getPlayerData(0)                 // Get character 0 properties
idleon.getPlayerData(0, "StatueLevels") // Get specific property

// Complete function library
idleon.listScripts()                    // Get ALL 220 _customBlock_ functions

// Utility functions
idleon.exploreObject("Player", 2)       // Explore object structure
idleon.findScriptObjects()              // Find script-related objects

// Direct access
idleon.engine                           // Main game engine
idleon.scripts                          // Script object with _customBlock_ functions
idleon.raw                              // Raw game object: window.__idleon_cheats__
```

### **Function Discovery**
The tool dynamically discovers **220 unique _customBlock_ functions** across 7 ActorEvents objects:

```javascript
// Get complete function library
idleon.listScripts()
// Returns: {
//   totalActorEvents: 62,
//   actorEventsWithFunctions: 7, 
//   totalFunctions: 220,
//   functions: ["_customBlock_GetTalentNumber", "_customBlock_GiveItem", ...],
//   sources: {
//     "scripts.ActorEvents_12": 33,
//     "scripts.ActorEvents_124": 42,
//     "scripts.ActorEvents_148": 2,
//     "scripts.ActorEvents_189": 33,
//     "scripts.ActorEvents_266": 44,
//     "scripts.ActorEvents_345": 40,
//     "scripts.ActorEvents_579": 27
//   }
// }
```

### **Examples**
```javascript
// Simple calls
idleon.getHP()                          // Returns: 15.525
idleon.getClass()                       // Returns: 9  
idleon.getTalent(1, 289)               // Returns: 0

// Discovery - get available data categories
idleon.safeGetDNSM()                   // Returns: ["AlchBubbles", "BoxRewards", "CardBonusS", ...]
idleon.safeGetDNSM("AlchBubbles")      // Returns: ["TotalSTR", "MinEff", "FishingACTIVE", ...]

// Player data discovery
idleon.getPlayerData(0)                // Returns: available character properties
idleon.getPlayerData(0, "StatueLevels") // Returns: statue level data

// Function discovery
idleon.listScripts().totalFunctions    // Returns: 220
```

## 📊 **Raw API (Advanced)**

For direct access to the original objects:

### **Game Attributes**
```javascript
// Main game data object (massive nested structure)
engine.getGameAttribute("DNSM")

// Player stats  
engine.getGameAttribute("PlayerHP")        // Returns: 15.525
engine.getGameAttribute("CharacterClass")  // Returns: 9

// DNSM nested data examples
engine.getGameAttribute("DNSM").h.BoxRewards.h.cooldown
engine.getGameAttribute("DNSM").h.DungeonStats.h.abilityCD
```

### **Custom Block Functions**
The tool provides access to **220 unique _customBlock_ functions** from 7 different ActorEvents objects:

```javascript
// Access via the scripts object (ActorEvents_124 has 42 functions)
scripts._customBlock_GetTalentNumber(characterIndex, talentID)
// Example: _customBlock_GetTalentNumber(1, 289) returns talent level

// Or access other ActorEvents objects directly
window.frames[0].__idleon_cheats__["scripts.ActorEvents_266"]._customBlock_Breeding(...)
window.frames[0].__idleon_cheats__["scripts.ActorEvents_345"]._customBlock_Sailing(...)

// Complete function list available via: idleon.listScripts()
```

### **Discovered Function Categories**
Key function groups from the 220 total functions:
- **Core Game**: `_customBlock_Player`, `_customBlock_LevelUp`, `_customBlock_SaveGamee`
- **Combat**: `_customBlock_DamageMultipliers`, `_customBlock_MonsterKill`, `_customBlock_CritDamage`
- **Skills**: `_customBlock_SkillStats`, `_customBlock_ResourceGather`, `_customBlock_MiningChance`
- **Talents**: `_customBlock_GetTalentNumber`, `_customBlock_TalentCalc`, `_customBlock_TotalTalentPoints`
- **Items**: `_customBlock_GiveItem`, `_customBlock_DropOdds`, `_customBlock_MaxCapacity`
- **Stats**: `_customBlock_TotalStats`, `_customBlock_StampBonusOfTypeX`, `_customBlock_CardBonusREAL`
- **World Features**: `_customBlock_Sailing`, `_customBlock_Breeding`, `_customBlock_Divinity`
- **Advanced**: `_customBlock_AtomCollider`, `_customBlock_Summoning`, `_customBlock_WorkbenchStuff`

### **DNSM Data Categories**
The `DNSM` object contains 200+ game data categories. Key discovered categories include:

**Core Systems:**
- `AlchBubbles`, `AlchVials` - Alchemy system data  
- `StampBonuses_Map_Of_Val` - Stamp bonus calculations
- `CardBonusS`, `CardBonusS_old` - Card set bonuses
- `CalcTalentMAP`, `TalentDL`, `TalentDL2` - Talent calculations

**Player Stats:**
- `TotStatMAP`, `TotalStatsETCmap` - Total stat calculations
- `skillLvTotals`, `skillLvRanks` - Skill levels and rankings
- `PlayerSpeedAGI`, `CritChanceAGI`, `CritDmgSTR` - Derived stats

**Game Features:**
- `BoxRewards`, `FamBonusQTYs` - Lootbox and family bonuses
- `MealBonusesS`, `GfoodBonus` - Food effect calculations  
- `VaultKillzTOT`, `DungeonStats` - Combat statistics
- `SailzArtiBonusL`, `CompanionBon` - World 5+ features

**Complete list available via:** `idleon.safeGetDNSM()`

## 🎮 **Complete Workflow**

### **Setup (One-time)**
1. Install dependencies: `cd sub-projects/game-debug-tool && npm install`
2. Start the debug server: `node idleon-debug-server.js`

### **Game Session**
1. **Launch Game** (PowerShell):
   ```powershell
   Start-Process -FilePath "D:\Program Files\Steam\steamapps\common\Legends of Idleon\LegendsOfIdleon.exe" -ArgumentList "--remote-debugging-port=9223"
   ```

2. **Auto-Connect**: Server automatically detects running game and existing injection

3. **Extract Data**: Use HTTP API to call game functions and get live values

### **Integration with Testing**
- Use the HTTP API from your test scripts
- Compare live game values with reverse-engineered calculations
- Validate that your formulas match the actual game behavior

## ✅ **Success Criteria Met**
- ✅ Attach to running Electron game process
- ✅ Execute game functions and check variable values
- ✅ Fetch exact values for testing reverse-engineered code
- ✅ Simple HTTP API for easy integration
- ✅ Auto-detection to avoid re-injection
- ✅ Production-ready server for ongoing use
- ✅ **Complete function library**: 220 _customBlock_ functions discovered
- ✅ **Comprehensive data access**: 200+ DNSM categories available
- ✅ **Dynamic discovery**: Future-proof function detection

## 🎯 **Key Achievements**

### **Function Discovery Breakthrough**
- **220 unique functions** across 7 ActorEvents objects
- **Dynamic detection** automatically finds all available functions
- **Categorized access** to core game, combat, skills, talents, items, stats, and advanced features

### **Data Structure Mapping**
- **DNSM object** with 200+ game data categories fully mapped
- **Safe access patterns** to prevent "Object reference chain too long" errors
- **Discovery helpers** to explore available data without prior knowledge

### **Production-Ready Architecture**
- **Auto-injection** with existing game detection
- **Error-resistant** helper functions with graceful fallbacks  
- **Clean API** with streamlined, intuitive function names
- **Refresh capability** to update injected code without restarting

## 🚀 **Ready for Production Use**
The tool provides **complete access to the game's internal state and functions**, enabling comprehensive validation of reverse-engineered calculations against live game data. With 220 discovered functions and 200+ data categories, this tool can extract virtually any game value needed for testing!
