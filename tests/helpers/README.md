# Game Data Extraction Helpers

Tools for extracting live game data to validate domain code calculations.

## Quick Start - Batch Extraction (Recommended)

The easiest way to extract all test data from the running game:

```bash
node tests/helpers/extract-all-game-data.js
```

This will:
1. Extract data for all configs in `tests/configs/`
2. Save results to `tests/results/`

**Note:** This script only extracts data from the game. The save file (`latest.json`) is managed separately - update it manually from idleonefficiency.com raw-data tab when needed.

## Individual Extraction (Advanced)

If you need to extract data for a single config file:

```bash
# Run with a config file
node tests/helpers/game-data-extractor.js <config-file> <output-file>

# Example
node tests/helpers/game-data-extractor.js \
  tests/configs/cooking-speed.json \
  tests/results/cooking-speed-data.json
```

### Prerequisites

1. **Game running** with debug port (usually port 9223)

2. **Debug server running**:
   ```bash
   cd sub-projects/game-debug-tool
   node idleon-debug-server.js
   ```

### Configuration Format

Create JSON config files in `tests/configs/`:

```json
{
  "description": "What this extraction is for",
  "target": "Specific function or calculation being tested", 
  "extractions": [
    {
      "label": "unique_identifier",
      "expression": "game.function.call.or.attribute.access",
      "description": "What this value represents"
    }
  ]
}
```

### Output Format

Results are saved as JSON with timestamps and metadata:

```json
{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "extractions": {
    "label": {
      "expression": "...",
      "result": "...",
      "description": "...",
      "extractedAt": "..."
    }
  },
  "errors": {
    "failed_label": {
      "expression": "...",
      "error": "Error message",
      "failedAt": "..."
    }
  },
  "metadata": {
    "serverStatus": {...}
  }
}
```

#### Special Result Handling

- **Large numbers**: Numbers exceeding JavaScript's safe integer range are stored as:
  ```json
  {
    "type": "large_number",
    "value": "2.033960867763364e+107",
    "original": 2.033960867763364e+107
  }
  ```
- **Empty objects**: Converted to `null` for cleaner output
- **Null/undefined**: Preserved as `null`

## Integration with Tests

All test files use the `latest.json` save file from `tests/fixtures/saves/`.

The test workflow:
1. Load extraction results from `tests/results/`
2. Load game data from `tests/fixtures/saves/latest.json`
3. Execute domain calculations
4. Compare domain output to live game values
5. Assert equality (with configurable tolerance)
