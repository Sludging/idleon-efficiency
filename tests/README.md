# Live Game Testing Infrastructure

New testing approach that validates domain calculations against live game data extracted from running game.

## Structure

```
tests/
├── configs/           # Extraction configurations 
├── helpers/           # Data extraction scripts
├── utils/             # Test utility functions
├── domains/           # Domain-specific validation tests
├── results/           # Extracted live game data
├── fixtures/          # Test save files (if needed)
└── setup.ts          # Jest configuration for live tests
```

## Testing Philosophy

1. **Load save data** to set up complete domain objects with all dependencies
2. **Extract live game values** from running game for comparison
3. **Compare domain calculations** (from save) vs live game results  
4. **Ensure save data matches** the game state when extraction was done
5. **Use live game as validation** of our domain calculation accuracy

## Workflow

### 1. Capture Game State
Developer provides:
- **Save file** placed in `tests/fixtures/saves/`
- **Live game extraction** at the exact same time

### 2. Extract Live Data
```bash
# Extract live game data
node tests/helpers/game-data-extractor.js \
  tests/configs/cooking-speed.json \
  tests/results/cooking-speed-data.json
```

### 3. Run Tests
```bash
# Run live validation tests
npx jest --config tests/jest.config.js tests/domains/cooking-live-validation.test.ts

# Run all live tests
npx jest --config tests/jest.config.js
```

### 4. Analyze Results
Tests validate:
- **Save data consistency** with live game state
- **Domain calculations** vs live game results
- **Parameter debugging** when calculations differ

## Key Components

### Data Loading (`utils/live-game-data-loader.ts`)
- Loads extraction results from JSON files
- Handles large numbers and special formats
- Validates extraction health

### Test Helpers (`utils/live-game-test-helpers.ts`) 
- Comparison functions with tight tolerances
- Parameter validation utilities
- Logging and debugging helpers

### Cloudsave Support (`utils/cloudsave-loader.ts`)
- Loads static save files when needed
- Sets up domain objects for testing
- Adapted from existing infrastructure

## Current Status

### ✅ Completed
- Extraction infrastructure
- Basic test framework
- Kitchen 0 meal speed validation (partial parameters)

### 🔄 In Progress  
- Expanding parameter extraction configs
- Testing individual parameter mappings

### 📋 Next Steps
1. Extract all 23 `getMealSpeed` parameters
2. Test exact equality with full parameter set
3. Add more domain functions (fire speed, luck, etc.)
4. Create templates for other domains

## Configuration Examples

See `tests/configs/` for extraction configuration examples. Each config specifies:
- Game expressions to execute
- Labels for test consumption  
- Descriptions for documentation

## Integration Notes

- **Separate from existing tests** - doesn't interfere with `__tests__/` infrastructure
- **Reuses domain objects** - leverages existing calculation methods
- **Independent execution** - can run without existing test suite
- **Focused scope** - validates specific calculations with live data
