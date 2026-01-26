# Live Game Extraction Testing - Implementation Guide

## Overview

This testing approach validates domain calculations against live game data extracted from the running IdleOn game client. By comparing our reverse-engineered code against actual game behavior, we ensure calculation accuracy and catch regressions when game mechanics change.

## Core Principles

1. **Live Game Extraction**: Extract actual values from running game via debug server
2. **Config-Driven**: Define what to extract in JSON configuration files
3. **Parameter Validation**: Test individual parameters before final calculations
4. **Time-Synchronized Fixtures**: Cloud save fixtures must match extraction timestamp

## Architecture

### Components

#### 1. Debug Server
**Location:** `sub-project/game-debug-tool/idleon-debug-server.js`

Injects code into the running game to enable remote code execution:
- Receives HTTP requests with JavaScript expressions
- Executes expressions in game context
- Returns results for validation

#### 2. Extraction Configurations
**Location:** `tests/configs/`

JSON files defining what data to extract from the game:
```json
{
  "description": "Extract data for sailing speed calculations",
  "target": "Sailing speed",
  "extractions": [
    {
      "label": "divinity_minor_bonus_6",
      "expression": "idleon.callFunction(\"Divinity\", \"Bonus_Minor\", -1, 6)",
      "description": "Divinity minor bonus for Purrmep (god 6)"
    }
  ]
}
```

#### 3. Extraction Tool
**Location:** `tests/helpers/game-data-extractor.js`

Generic script that reads configs and extracts live game data:
```bash
node tests/helpers/game-data-extractor.js \
  tests/configs/sailing-speed.json \
  tests/results/sailing-speed-data.json
```

**Output format:**
```json
{
  "timestamp": "2026-01-11T12:00:00.000Z",
  "extractions": {
    "label": {
      "expression": "...",
      "result": 42.5,
      "description": "...",
      "extractedAt": "..."
    }
  },
  "errors": {},
  "metadata": {
    "serverStatus": {...}
  }
}
```

#### 4. Test Fixtures

Currently only supports one file. (`latest.json`)

In the future, can explore adding support for multiple files to allow for testing of different game states / older data.

#### 5. Parameter Tests
**Location:** `tests/domains/[feature]/[aspect]-parameters.test.ts`

Test individual parameters that influence calculations:
```typescript
export const sailingSpeedParameterSpecs: Record<string, ParameterTestSpec> = {
  divinity_minor_bonus_6: {
    id: 'divinity_minor_bonus_6',
    description: 'Divinity minor bonus for Purrmep (god 6)',
    extractionKey: 'divinity_minor_bonus_6',
    domainExtractor: (gameData) => {
      const divinity = gameData.get("divinity") as Divinity;
      const purrmepPlayer = divinity.gods[6].linkedPlayers.at(0);
      return purrmepPlayer ? divinity.gods[6].getMinorLinkBonus(purrmepPlayer) : 0;
    }
  }
};
```

#### 6. Calculation Tests
**Location:** `tests/domains/[feature]/[aspect]-calculations.test.ts`

Test final calculations using validated parameters:
```typescript
it('validates boat 0 current speed calculation', () => {
  const sailing = gameData.get("sailing") as Sailing;
  const boat = sailing.boats[0];

  const extractedSpeed = extractionResults.extractions.boat_0_current_speed.result;
  const calculatedSpeed = boat.getSpeedValue({
    starSignEquipped: true,
    includeCaptain: true,
    islandBound: false
  });

  expect(calculatedSpeed).toBeCloseTo(extractedSpeed, 2);
});
```

## Testing Workflow

### For New Feature Implementation

#### Step 1: Identify What to Test

Choose a complex calculation with cross-domain dependencies:
- Sailing boat speed (influenced by divinity, cards, alchemy, artifacts, etc.)
- Cooking meal speed (influenced by stamps, prayers, lab bonuses, etc.)
- Character damage calculations

#### Step 2: Create Extraction Config

Create `tests/configs/[optional-grouping]/[feature]-[aspect].json`:

1. **Ask developer for game code first** - Do NOT create configs based on existing domain code
2. **Identify all input parameters** that influence the calculation
3. **Break down composite calculations** into individual components
4. **Find game expressions** that extract each parameter value
5. **Add multiple final calculations** to test different scenarios
6. **Document each extraction** with clear descriptions

See existing configs for examples: `tests/configs/cooking-meal-bonus.json`, `tests/configs/sailing-speed.json`

#### Step 3: Run Live Extraction

**Prerequisites:**
1. Launch game with debug port (require peer developer to do this)
2. Start debug server (require peer developer to do this)
3. Update cloud save fixture (require peer developer to do this)

**Run extraction:**
```bash
node tests/helpers/game-data-extractor.js \
  tests/configs/[feature]-[aspect].json \
  tests/results/[feature]-[aspect]-data.json
```

**Verify output:**
- Check `tests/results/[feature]-[aspect]-data.json` for results
- Ensure no errors in extraction
- Confirm values look reasonable

#### Step 4: Write Parameter Tests

Create `tests/domains/[optional-grouping]/[feature]/[aspect]-parameters.test.ts`:

1. **Define parameter specs** for each extracted value
2. **Map extraction keys** to domain extractors
3. **Handle missing implementations explicitly**

**Pattern:**
```typescript
describe('Feature - Aspect - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('feature-aspect-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('live-game-2026-01-11');
  });

  describe('Parameter Validation', () => {
    it('validates all parameters against extracted results', () => {
      const parameterResults = runParameterValidationSuite(
        parameterSpecs,
        extractionResults,
        gameData
      );

      // Assert all parameters match
      // Provides detailed error messages for mismatches
    });
  });
});
```

**Handling missing implementations:**

When implementing a parameter extractor:

1. Look for the corresponding domain code
2. If unsure whether domain exists, ask the developer
3. If developer confirms it's not implemented, throw an explicit error with context
4. Include the game function signature in the error for future reference

```typescript
export const parameterSpecs: Record<string, ParameterTestSpec> = {
  some_bonus: {
    id: 'some_bonus',
    description: 'Some bonus calculation (MISSING IMPLEMENTATION)',
    extractionKey: 'some_bonus',
    domainExtractor: (_gameData) => {
      // MISSING: Confirmed with developer - domain not yet implemented
      // Game function: SomeFunction(arg1, arg2)
      throw new Error("some_bonus: NOT IMPLEMENTED - domain missing");
    }
  }
};
```

This approach:
- Documents what's missing for future implementation
- Keeps the test running (fails explicitly rather than silently)
- Preserves the dependency relationship in the test suite

#### Step 5: Write Calculation Tests

After parameter tests pass, add final calculation tests:

```typescript
describe('Final Calculations', () => {
  it('validates final speed calculation', () => {
    const sailing = gameData.get("sailing") as Sailing;
    const boat = sailing.boats[0];

    const extractedSpeed = extractionResults.extractions.boat_0_speed.result;
    const calculatedSpeed = boat.getSpeedValue({...options});

    expect(calculatedSpeed).toBeCloseTo(extractedSpeed, 2);
  });
});
```

#### Step 6: Run Tests

```bash
# Run specific test file
yarn test tests/domains/[feature]/[aspect]-parameters.test.ts

# Run all domain tests
yarn test:domains
```

## Common Mistakes to Avoid

### What to Extract

Base configs on game code (ask developer), not our domain code. Our domain code may be incorrect - that's what we're testing.

Extract individual components, not composites. When `CookingMealBonusMultioo = (1 + (MainframeBonus(116) + ShinyBonus(20)) / 100) * (1 + WinBonus(26) / 100)`, extract MainframeBonus(116), ShinyBonus(20), WinBonus(26) separately. Testing components individually helps pinpoint failures.

### What Inputs to Test

Parameters = all calculation inputs, regardless of domain. Extract same-domain dependencies if they're inputs (e.g., ribbon bonus for cooking calculations).

### How Many Scenarios to Test

Test 3-5 different scenarios when there are many similar calculations (e.g., test meal bonuses for "Sailing", "Mcook", "KitchenEff" rather than just one).

### Handling Missing Implementations

Look for domain code first. If unsure about implementation status, ask developer. Only throw errors after confirming it's missing:

```typescript
domainExtractor: (_gameData) => {
  // Confirmed with developer - domain not yet implemented
  throw new Error("some_bonus: NOT IMPLEMENTED - domain missing");
}
```

## Test Patterns & Best Practices

### Parameter-First Testing

**Always test parameters before final calculations:**
```
✅ GOOD: Test 15 parameters → Test final calculation
❌ BAD: Test only final calculation
```

**Why:** When final calculation fails, parameter tests show exactly which dependency is wrong.

### Comprehensive Coverage

**Test multiple scenarios:**
```typescript
// Test current value
boat.getSpeedValue({currentLevel: true})

// Test next level
boat.getSpeedValue({currentLevel: false, nextLevel: true})

// Test with/without bonuses
boat.getSpeedValue({withCaptain: true})
boat.getSpeedValue({withCaptain: false})
```

### Precision Handling

Use appropriate precision for floating-point comparisons:
```typescript
// For percentages and most calculations
expect(calculated).toBeCloseTo(extracted, 2);  // 2 decimal places

// For very precise calculations
expect(calculated).toBeCloseTo(extracted, 5);  // 5 decimal places
```

## Troubleshooting

### Extraction Fails

**Problem:** `game-data-extractor.js` returns errors

**Solutions:**
- Check debug server is running (`node idleon-debug-server.js`)
- Verify game launched with debug port
- Test expression in browser console first
- Check game function names haven't changed (obfuscation)

## Integration with Development Workflow

### Test-Driven Development

For new features, can use TDD approach:

1. **Write config** based on game code inspection
2. **Extract live data** from working game feature
3. **Write failing tests** that expect extracted values
4. **Implement domain logic** to make tests pass
5. **Refactor** with confidence tests will catch breakage

### Continuous Validation

After game updates:

1. **Re-run all extractions** with new game version
2. **Capture new fixtures**
3. **Run full test suite**
4. **Fix any new failures** from mechanic changes
5. **Update documentation** with changes found

## Benefits of This Approach

### Accuracy
- Tests against real game behavior, not assumptions
- Catches calculation errors immediately
- Validates reverse-engineering accuracy

### Maintainability
- Config-driven extraction is easy to update
- Parameter tests pinpoint exact failures
- Fixtures enable reproducible testing

### Confidence
- Refactor domain code safely
- Detect game updates that break calculations
- Ensure cross-domain dependencies work correctly

### Documentation
- Configs document what influences each calculation
- Tests serve as examples of domain usage
- Extraction results show expected value ranges

## Templates and Examples

### Config Template
See: `tests/configs/sailing-speed.json`

### Test Template
See: `tests/domains/sailing/speed-parameters.test.ts`

### Helper Documentation
See: `tests/helpers/README.md`
