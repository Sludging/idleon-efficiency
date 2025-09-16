# Live Game Testing Strategy

## Overview
Use the game debug tool to extract exact values from running game and validate our reverse-engineered domain code against real game behavior.

## Process

### 1. Choose Domain Function
Pick a domain function to test (e.g., `getMealSpeed`, `getTalentBonus`, etc.)

### 2. Get Game Code
Ask developer to share the relevant game function source code for comparison

### 3. Identify Extraction Points
Find game functions that return the exact values we need:
- Input parameters (stats, bonuses, levels)
- Intermediate calculations
- Final result

### 4. Create Data Extraction Script
Write a script using the debug tool HTTP API to:
- Call identified game functions
- Save raw values to JSON file
- Include timestamp and game state info

### 5. Capture Live Snapshot
Have developer provide current game data snapshot while extraction script runs

### 6. Test Dependencies First
For complex functions with many inputs:
- Test each dependency individually against game values
- Validate that our helper functions match game calculations
- Fix any mismatches before testing main function

### 7. Test Main Function
- Compare our domain function output to game function output
- Use exact same input values from live game
- Assert exact equality (or acceptable precision for floats)

## Example Workflow

```bash
# 1. Start debug server
cd sub-projects/game-debug-tool
node idleon-debug-server.js

# 2. Extract live values from game
curl -X POST http://localhost:3100/exec \
  -H "Content-Type: application/json" \
  -d '{"expression": "idleon.getAttr(\"CookingSPEED\")"}'

# 3. Extract input parameters from game
curl -X POST http://localhost:3100/exec \
  -H "Content-Type: application/json" \
  -d '{"expression": "idleon.getTalent(0, 289)"}'

# 4. Run test comparing our getMealSpeed() to game values
npm test -- cooking.test.js
```

## Implementation Notes
- Start with simple functions first
- One domain function per test file initially
- Store extraction scripts in `tests/data-extraction/`
- Keep snapshots in `tests/snapshots/`
- Iterate and refactor after each domain tested

## Benefits
- Tests against exact game behavior
- Catches calculation errors immediately
- Validates our reverse engineering accuracy
- Provides confidence in domain code correctness
