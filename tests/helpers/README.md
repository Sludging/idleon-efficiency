# Game Data Extraction Helpers

Tools for extracting game data to validate domain code calculations. The local
offline endpoint is the default; the live endpoint remains available through
`GAME_SERVER_URL` for existing configs and expressions.

## Quick Start - Batch Extraction (Recommended)

The easiest way to extract all test data from the default offline endpoint:

```bash
node tests/helpers/extract-all-game-data.js
```

This will:
1. Leave `tests/fixtures/saves/latest.json` untouched by default.
2. Extract data for all configs in `tests/configs/`, serially
3. Save results to `tests/results/`

Pass `--refresh-save` only to request `/cloud-save` and overwrite
`tests/fixtures/saves/latest.json` with the server's response. Result files
are still saved normally unless `--output-dir` selects another directory.

Both extraction commands use `GAME_SERVER_URL`, defaulting to
`http://127.0.0.1:3101`. It selects the server for status checks, expression
execution, and the batch save refresh; configs do not need to change.

### Offline Extraction Without Overwriting Test Data

With the local offline tool already running on its default port:

```bash
GAME_SERVER_URL=http://127.0.0.1:3101 \
  node tests/helpers/extract-all-game-data.js \
  --output-dir /tmp/idleon-offline-results
```

Batch options:

- `--refresh-save`: request `/cloud-save` and overwrite
  `tests/fixtures/saves/latest.json`. Default: leave the fixture untouched.
- `--output-dir <directory>`: write result files to this directory instead of
  `tests/results/`. Relative paths resolve from the current working directory.

Without `--output-dir`, results still overwrite their usual files. Use
`--output-dir` to write elsewhere. No extractor reloads, resets, or switches
characters on the server.

### Active Player Policy

Extraction runs require the server's game to be loaded on the shared target player. For the live server, open that character in the game; for the offline tool, select it at startup. Set its index in `tests/utils/target-player.json`; the extractor checks it once before evaluating each config and aborts if the active player does not match.

Extraction expressions may use `__TARGET_PLAYER__` for arguments that are semantically player indexes. The extractor replaces that placeholder with the shared target index before sending the expression to the debug server. Do not use it for domain indexes or for configs that intentionally cover multiple players.

Configs with a real dependency on a different specific character may set `requiredActivePlayerIndex` at the top level. That override takes precedence over the shared target. Do not add it for ordinary fixture alignment.

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

To extract a single config from the offline endpoint without touching repository
results:

```bash
GAME_SERVER_URL=http://127.0.0.1:3101 \
  node tests/helpers/game-data-extractor.js \
  tests/configs/cooking-speed.json \
  /tmp/idleon-offline-results/cooking-speed-data.json
```

Individual extraction never refreshes the save fixture; only its explicitly
selected output file is written. The active-player policy applies equally
to live and offline extraction.

### Save Export (Standalone)

```bash
curl "${GAME_SERVER_URL:-http://127.0.0.1:3101}/cloud-save" \
  > tests/fixtures/saves/latest.json
```

The endpoint returns the complete enriched save matching the raw-data page
representation (see debug server docs). It does not trigger or commit a save.


### Live Server Prerequisites

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
