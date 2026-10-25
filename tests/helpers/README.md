Tools for extracting game values to validate domain calculations.

## Game access

Use offline game server by default for snippets, extraction-config testing, and value extraction. It runs original local game assets without connecting to the real game.

Routine development, extraction, and tests use `tests/fixtures/saves/latest.json`, matching `tests/results/`, and `tests/utils/target-player.json`. Reuse the shared default offline server at `http://127.0.0.1:3101` when it is ready; do not start another server for ordinary work.

Public Toolbox account listing, fetching, extraction, and testing are opt-in ONLY when the user explicitly requests multi-account or public-profile validation. DO NOT USE PUBLIC-ACCOUNT WORKFLOWS IN NORMAL OPERATIONS. Do not use public accounts as a routine prerequisite or fallback. A necessary specific-character override for an extraction config remains valid; it does not make that work multi-account testing.

For setup and start instructions, see the [offline tool guide](../../sub-projects/idleon-offline/README.md#startup).

Select a server through `GAME_SERVER_URL`; default is `http://127.0.0.1:3101`. Before evaluating expressions, check `GET /status` on that same URL. Require `source: "offline"` and `cdpConnected`, `injected`, and `gameReady` to be `true`. The live server requires the same readiness fields and reports `source: "live"`; restart older live processes that do not report their source.

Use `GET /game-version` to read the selected server's `{ "title": "...", "version": "..." }`. The offline version identifies its local game assets; it does not identify the latest online release. For older server processes without this route, use `POST /exec` with `{"expression":"idleon.getGameVersion()"}`.

Use a live server only when the task requires current real-game state, behavior unavailable offline, or an explicit live observation. State why live access is needed and verify `source: "live"` before use. Offline extraction is the default and never refreshes the save fixture.

`--refresh-save` is the only extraction-helper path that updates `tests/fixtures/saves/latest.json`. Use it only when a human requests a save refresh, against a ready server verified as live:

```bash
GAME_SERVER_URL=http://localhost:3100 \
  node tests/helpers/extract-all-game-data.js --refresh-save
```

Refresh from the real game only. The command captures the live save before extracting configured values; it does not create an atomic save/results snapshot. Confirm that extracted results match the refreshed save before using the pair. Result-only extraction, including offline extraction, does not establish fixture provenance or replace the real save.

## Quick Start - Batch Extraction

The batch helper extracts all configs in `tests/configs/` serially and saves
results to `tests/results/`. Follow [Game access](#game-access) for server
selection and the only fixture-refresh workflow.

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

- `--refresh-save`: refresh the save fixture through the guarded live-only
  workflow in [Game access](#game-access). Player-server overrides do not
  select the refresh server.
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
uses that configured index. This supports a necessary specific-character
extraction, not multi-account testing. Do not add it for ordinary fixture alignment.


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

### Save Input Inspection

`GET /cloud-save` is useful for inspecting the selected server's save input. It is read-only and does not update repository fixtures. Follow [Game access](#game-access) before selecting a server or refreshing a fixture.

### Live Server

Live setup is only needed for an explicitly justified live observation or requested save refresh. Follow the [game-debug-tool guide](../../sub-projects/game-debug-tool/SOLUTION_SUMMARY.md) and [Game access](#game-access); do not treat live startup as the routine extraction setup.

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

Set `"requiresTown": true` on an extraction whose comparison requires a town.
The extractor uses the native internal map name to identify towns, rather than
a fixed map ID list. It captures the active player index, map ID, and internal
map name in the results' `context` field. Outside town, the label receives an
error without invoking its expression or retaining an older result.

Full maximum damage uses its own `player-maximum-damage.json` config, so its town
prerequisite does not block Class EXP or other damage parameter captures. The
comparison also checks that the selected save and captured context describe the
same player and town map. Use a genuine matching town save and extraction;
changing only the expected value or adding a guard to an old capture is invalid.

### Output Format

Results store `extractions` and `errors` at the root. Town-required captures also
store `context`. Successful labels contain the resolved expression sent to the
server and its result; failed labels contain the resolved expression and error:

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

Timestamps, server readiness status, and config descriptions are not persisted.
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

Routine `yarn test` and extraction use `tests/fixtures/saves/latest.json`,
matching `tests/results/`, and `tests/utils/target-player.json`. Use the shared
default offline server when ready; follow [Game access](#game-access). The
public-account commands below are for multi-account or public-profile
validation only, and run only when the user explicitly requests that work.
DO NOT USE THIS IN NORMAL OPERATIONS. Do not start public-account processes
for ordinary development, extraction, or testing, and do not use them as a
fallback for a mismatch or unavailable regular-save result.

Opt-in public-account runs use the account runner:
```bash
yarn test:accounts:list --accounts suk69,lunaonline
yarn test:accounts:fetch --accounts suk69,lunaonline
yarn test:accounts:extract --accounts suk69,lunaonline
yarn test:accounts --accounts suk69,lunaonline
yarn test:accounts --accounts suk69 -- tests/domains/cooking/meal-speed.test.ts
```

The committed `tests/accounts/accounts.json` selects genuine public profiles.
The current candidates are `suk69` and `lunaonline`, both at player index 3.
Their selection evidence records observed Menagerie unlocks and other
progression differences. `list` reports latest fetched upload dates and
available Toolbox-derived profile metrics separately from historical selection
evidence. Toolbox metrics are candidate-selection data, not expected game
calculation values.

Fetch contacts only selected public profiles. It writes immutable local
snapshots under `.cache/test-accounts/`; each fetch advances that account's
`latest.json` pointer without deleting older snapshots.

`public-profile-import.cjs` owns all Toolbox-to-save conversion. Downstream
tools consume its ordinary IE save, without Toolbox-specific rules. The
importer restores the bundle ownership map from positive purchase flags before
offline startup. This prevents the game from replaying bundle rewards.
The downloaded `raw-profile.json` remains unchanged.

After importer changes, fetch again and extract again. After extraction-config
changes, extract again. Stored datasets reject mismatched importer versions,
configs, and game assets rather than mixing old and new results.

Extraction uses the latest fetched snapshot and starts owned offline processes
on loopback ports beginning at 3211. It routes every configured
`requiredActivePlayerIndex` to the same account save. It writes separate runs
and advances account-level `latest-dataset.json` only after extraction and
provenance hashes complete. A fetch or failed extraction never replaces the
last successful dataset. Failed outputs remain available but do not become the
selected dataset. Extraction does not refresh the developer save or forward
`--refresh-save`.

Testing loads stored datasets only; it does not fetch profiles or start game
servers. It starts a fresh Jest process for each selected account and reports
all account failures. Arguments after `--` select Jest suites. Existing
calculation failures remain visible; this workflow does not skip mismatches,
change tolerances, or synthesize account values. Public saves are consented
player uploads; the importer restores required representation without adding
resources or simulating progress.
Account Jest runs default to one worker and a `512MB` worker idle-memory limit.
Jest can recycle workers between test files after a worker exceeds this limit.
Pass `--maxWorkers` or `--workerIdleMemoryLimit` after `--` to override each
default. Pass `--runInBand` or `-i` to disable both worker defaults. Ordinary
`yarn test` does not use these account-runner options.

The runner accepts `--config PATH`, `--cache-dir PATH`, and `--port NUMBER`.
Configuration uses `{ "accounts": [...] }`. All selected suites run against
each account; there are no developer-account-only exclusions.

Keep profile downloads and extracted results out of source control. Use only
player-published public profiles; do not write synthetic account changes.
The legacy five-step workflow below describes ordinary `yarn test` behavior.

The test workflow:
1. Load extraction results from `tests/results/`
2. Load game data from `tests/fixtures/saves/latest.json`
3. Execute domain calculations
4. Compare domain output to live game values
5. Assert equality (with configurable tolerance)
