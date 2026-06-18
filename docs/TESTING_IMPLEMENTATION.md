# Live Game Extraction Testing - Implementation Guide

## Overview

This testing approach validates domain calculations against live game data extracted from the running IdleOn game client. By comparing our reverse-engineered code against actual game behavior, we ensure calculation accuracy and catch regressions when game mechanics change.

**Operational details:** See also `tests/README.md` (coverage tracking) and `tests/helpers/README.md` (extraction workflow).

## Core Principles

1. **Live Game Extraction**: Extract actual values from running game via debug server
2. **Config-Driven**: Define what to extract in JSON configuration files
3. **Parameter Validation**: Test individual parameters before final calculations
4. **Time-Synchronized Fixtures**: Cloud save fixtures must match extraction timestamp

## Architecture

### Components

#### 1. Debug Server
**Location:** `sub-projects/game-debug-tool/idleon-debug-server.js`

Start from that directory:
```bash
cd sub-projects/game-debug-tool
node idleon-debug-server.js
```

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

#### 3. Extraction Tools
**Location:** `tests/helpers/`

**Batch extraction (recommended):**
```bash
node tests/helpers/extract-all-game-data.js
```
Extracts all configs in `tests/configs/` and saves results to `tests/results/`.

**Single config extraction:**
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

**Location:** `tests/fixtures/saves/latest.json`

All tests load save data via `loadGameDataFromSave('latest')`. Update `latest.json` from the idleonefficiency.com raw-data tab when the game state changes. The save must correspond to the same game state used during live extraction.

#### 5. Parameter Tests
**Location:** `tests/domains/[feature]/[aspect]-parameters.test.ts`

Test individual parameters that influence calculations:
```typescript
const parameterSpecs: Record<string, ParameterTestSpec> = {
  divinity_minor_bonus_6: {
    description: 'Divinity minor bonus for Purrmep (god 6)',
    extractionKey: 'divinity_minor_bonus_6',
    domainExtractor: (gameData) => {
      const divinity = gameData.get("divinity") as Divinity;
      const purrmepPlayer = divinity.gods[6].linkedPlayers.at(0);
      return purrmepPlayer ? divinity.gods[6].getMinorLinkBonus(purrmepPlayer) : 0;
    }
  }
};

describe('Sailing Domain - Speed - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('sailing-speed-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  Object.entries(parameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
```

#### 6. Calculation Tests
**Location:** `tests/domains/[feature]/[aspect].test.ts`

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

  expect(calculatedSpeed).toMatchLiveGameWithDetails(extractedSpeed, {
    tolerance: 0,
    context: 'Boat 0 current speed'
  });
});
```

#### 7. Custom Matchers
**Location:** `tests/setup.ts`

- `toMatchLiveGame(received, expected, tolerance?)` — for parameter tests (use tolerance `0`)
- `toMatchLiveGameWithDetails(received, expected, { tolerance, context, debugInfo })` — for calculation tests with richer failure output

#### 8. Coverage Tracking
**Location:** `tests/README.md`, `coverage-config.json`

Annotate test files with `@testCovers Domain.methodName` in JSDoc, then run:
```bash
yarn coverage:report
```

## Testing Workflow

### For New Feature Implementation

#### Step 1: Identify What to Test

Choose a complex calculation with cross-domain dependencies:
- Sailing boat speed (influenced by divinity, cards, alchemy, artifacts, etc.)
- Cooking meal speed (influenced by stamps, prayers, lab bonuses, etc.)
- Character damage calculations

#### Step 2: Create Extraction Config

Create `tests/configs/[feature]-[aspect].json`:

1. **Ask developer for game code first** - Do NOT create configs based on existing domain code
2. **Identify all input parameters** that influence the calculation
3. **Break down composite calculations** into individual components
4. **Find game expressions** that extract each parameter value
5. **Add multiple final calculations** to test different scenarios
6. **Document each extraction** with clear descriptions

See existing configs for examples: `tests/configs/cooking-meal-bonus.json`, `tests/configs/sailing-speed.json`

#### Step 3: Run Live Extraction

**Prerequisites:**
1. Launch game with debug port (usually port 9223)
2. Start debug server: `cd sub-projects/game-debug-tool && node idleon-debug-server.js`
3. Update `tests/fixtures/saves/latest.json` from idleonefficiency.com raw-data tab
4. Verify `GET http://localhost:3100/status` reports `cdpConnected: true`, `injected: true`, and
   `gameReady: true` before extraction. If `/inject` times out or leaves `gameReady: false`, restart
   the debug server and check `/status` again before running extraction.

**Run extraction (recommended — all configs):**
```bash
node tests/helpers/extract-all-game-data.js
```

**Or single config:**
```bash
node tests/helpers/game-data-extractor.js \
  tests/configs/[feature]-[aspect].json \
  tests/results/[feature]-[aspect]-data.json
```

**Verify output:**
- Check `tests/results/[feature]-[aspect]-data.json` for results
- Ensure no errors in extraction
- Ensure result files have non-empty `extractions` and game-ready metadata
- Confirm values look reasonable

#### Step 4: Write Parameter Tests

Create `tests/domains/[feature]/[aspect]-parameters.test.ts`:

1. **Define parameter specs** for each extracted value (see `tests/utils/parameter-test-config.ts`)
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
    gameData = loadGameDataFromSave('latest');
  });

  Object.entries(parameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
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

After parameter tests pass, create `tests/domains/[feature]/[aspect].test.ts`:

```typescript
describe('Final Calculations', () => {
  it('validates final speed calculation', () => {
    const sailing = gameData.get("sailing") as Sailing;
    const boat = sailing.boats[0];

    const extractedSpeed = extractionResults.extractions.boat_0_speed.result;
    const calculatedSpeed = boat.getSpeedValue({...options});

    expect(calculatedSpeed).toMatchLiveGameWithDetails(extractedSpeed, {
      tolerance: 0,
      context: 'Boat speed'
    });
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

### Normalizing Extraction Expressions

Game functions may return raw values that the domain transforms with hardcoded constants. When this happens, add arithmetic to the extraction expression so it matches the domain's output format.

For example, if the game returns 0/1 for `EventShopOwned(19)` but the domain uses `isBonusOwned(19) ? 30 : 0`, write the extraction as:
```json
"expression": "0.3 * 100 * idleon.callFunction(\"Summoning\", \"EventShopOwned\", 19, 0)"
```

### What NOT to Test

Do not write tests that simply validate parsed save data matches model fields (e.g., "level from Spelunk[45][0] equals bonus.level in the domain"). Parsing correctness is assumed — if parsing is broken, every calculation test will fail anyway. Only test actual calculations and formulas.

### What Inputs to Test

Parameters = all calculation inputs, regardless of domain. Extract same-domain dependencies if they're inputs (e.g., ribbon bonus for cooking calculations).

### When to Split Parameter vs Calculation Files

Split into separate `-parameters.test.ts` and calculation test files when the calculation has multiple cross-domain inputs worth validating individually (e.g., statues depend on artifacts, event shop, meritocracy, vault, and talents — if the final bonus is wrong, parameter tests pinpoint which input is the culprit).

Use a single calculation test file when the formula is trivially simple (e.g., `bonus * level`) with no meaningful cross-domain inputs to isolate. Adding a parameters file in this case just duplicates the calculation test with extra noise.

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

Always use tolerance 0. If a test fails, investigate the root cause rather than adding tolerance.

```typescript
expect(domainValue).toMatchLiveGame(liveValue, 0);
```

The only exception is floating point ordering artifacts — where the domain and game compute the same formula in a different multiplication order, producing differences at the last 1-2 binary digits (~10⁻¹³ relative). In this case, fix the domain's multiplication order to match the game rather than adding tolerance.

### Never Skip or Suppress Failing Tests

**Failing tests are intentional signals, not problems to hide.**

- Do NOT use `it.skip()`, `it.todo()`, `xit()`, or any other suppression mechanism
- Do NOT add tolerances to make a failing test pass — tolerances mask real discrepancies
- Do NOT remove tests because they're inconvenient or hard to fix
- A failing test is the correct way to document a known gap (e.g., a missing domain feature like AllTalentLV support)

If a test fails because of an unimplemented feature, leave it failing. The failure is valuable: it tells you exactly what is broken and by how much.

## Troubleshooting

### Extraction Fails

**Problem:** `game-data-extractor.js` returns errors

**Solutions:**
- Check debug server is running: `cd sub-projects/game-debug-tool && node idleon-debug-server.js`
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
See: `tests/domains/sailing/speed-parameters.test.ts` and `tests/domains/sailing/speed.test.ts`

### Helper Documentation
See: `tests/helpers/README.md` and `tests/README.md`
