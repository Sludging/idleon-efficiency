Tools for extracting data to validate domain calculations. Offline extraction
is available for input inspection and calculation research, but it is not a
source for `tests/fixtures/saves/latest.json`.

## Quick Start - Batch Extraction

The batch extractor defaults to offline port `3101` and leaves
`tests/fixtures/saves/latest.json` untouched. It extracts data for all configs
in `tests/configs/` serially and saves results to `tests/results/`.

`--refresh-save` is opt-in and is permitted only when the status endpoint
identifies the server as live. The helper checks status before requesting
`/cloud-save` or writing the fixture; offline or unknown-source servers fail
without touching `latest.json`. Use an updated live HTTP server: older live
server processes without source identification must be restarted after the
code update.

To refresh from the live server, with the real game and its debug server
running:

```bash
GAME_SERVER_URL=http://localhost:3100 \
  node tests/helpers/extract-all-game-data.js --refresh-save
```

The batch helper uses `GAME_SERVER_URL`, defaulting to
`http://127.0.0.1:3101`, as its primary extraction and save server. Each config
with `requiredActivePlayerIndex` uses a matching `--player-server` override
when provided; all other configs use the primary server. Each extractor checks
status and active-player policy on the same server it uses for expressions.
`--refresh-save` always checks and fetches from the primary server, never a
`--player-server` override.

### Offline Extraction (No Fixture Export)

With the offline tool running, result files can be written elsewhere:

```bash
GAME_SERVER_URL=http://127.0.0.1:3101 \
  node tests/helpers/extract-all-game-data.js \
  --output-dir /tmp/idleon-offline-results
```

Batch options:

- `--refresh-save`: request `/cloud-save` and overwrite
  `tests/fixtures/saves/latest.json`, only from the primary server whose status
  source is `live`. Offline and unknown sources fail before the cloud-save
  request and fixture write. Player-server overrides never affect save refresh.
- `--output-dir <directory>`: write result files to this directory instead of
  `tests/results/`. Relative paths resolve from the current working directory.
- `--player-server <player-index>=<http(s) URL>`: route configs whose
  `requiredActivePlayerIndex` matches this non-negative index to this server.
  Repeat the option for additional indexes. Without a matching override, a
  config uses the primary server and fails its normal active-player check if
  that server has the wrong character loaded.

For example, use the default primary server for ordinary configs and route
player-zero configs to a second server:

```bash
node tests/helpers/extract-all-game-data.js \
  --player-server 0=http://127.0.0.1:3102
```

Without `--output-dir`, extraction result files update their usual files only
when the serialized output differs from the existing bytes. Identical output
is not rewritten. Use `--output-dir` to write elsewhere. No extractor reloads,
resets, or switches characters on the server.

If another offline request holds the runtime lock, `/exec` returns HTTP `409`
with `Offline runtime is busy; send requests serially` before evaluating the
expression. The extractor retries only this exact rejection, waiting 250 ms
between attempts for at most 30 seconds. A busy timeout fails the extraction
explicitly; it does not supply a result. Other HTTP errors, native evaluation
errors, and network errors are not retried because an expression may have
already executed. Configs and labels still run serially.

Extraction runs require the server's game to be loaded on the required active
player. For the live server, open that character in the game; for the offline
tool, select it at startup. Set the shared index in
`tests/utils/target-player.json`; the extractor checks the selected server once
before evaluating each config and aborts if the active player does not match.

Configs with a real dependency on a different specific character may set
`requiredActivePlayerIndex` at the top level. Batch `--player-server` routing
uses that configured index. Do not add it for ordinary fixture alignment.

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

### Save Input Inspection (Standalone)

`GET /cloud-save` is useful for inspecting the server's save input. It is
read-only and does not update repository fixtures. Do not redirect offline
cloud-save output to `latest.json`. To update that fixture, use the guarded
batch command above against an explicitly selected live server.


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

Results are saved as compact JSON with only `extractions` and `errors` at the
root. Successful labels contain the resolved expression sent to the server
and its result; failed labels contain the resolved expression and error:

```json
{
  "extractions": {
    "label": {
      "expression": "...",
      "result": "..."
    }
  },
  "errors": {
    "failed_label": {
      "expression": "...",
      "error": "Error message"
    }
  }
}
```

Timestamps, server status/metadata, and config descriptions are not persisted.
Descriptions remain in the configs. Runtime status checks and extraction
diagnostics still run; removing persisted status does not bypass safeguards.

#### Special Result Handling

- **Large numbers**: Numbers exceeding JavaScript's safe integer range are stored as:
  ```json
  {
    "type": "large_number",
    "value": "2.033960867763364e+107"
  }
  ```
  The wrapper contains no duplicate `original` field.
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
