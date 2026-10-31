Tools for extracting game values to validate domain calculations.

## Game access

Use offline game server by default for snippets, extraction-config testing, and value extraction. It runs original local game assets without connecting to the real game.

Routine development, extraction, and tests use `tests/fixtures/saves/latest.json`, matching `tests/results/`, and `tests/utils/target-player.json`. Reuse the shared default offline server at `http://127.0.0.1:3101` when it is ready; do not start another server for ordinary work.

Public-account listing, fetching, extraction, and testing are opt-in ONLY when the user explicitly requests multi-account or public-profile validation. DO NOT USE PUBLIC-ACCOUNT WORKFLOWS IN NORMAL OPERATIONS. Do not use public accounts as a routine prerequisite or fallback. A necessary specific-character override for an extraction config remains valid; it does not make that work multi-account testing.

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

Player-dependent comparisons must use the resolved target player, including any explicit `requiredActivePlayerIndex` for that config. Do not hardcode the regular fixture's player index in a test.

Configs with a real dependency on a different specific character may set
`requiredActivePlayerIndex` at the top level. Batch `--player-server` routing
uses that configured index. This supports a necessary specific-character
extraction, not multi-account testing. Do not add it for ordinary fixture alignment.

A native Family capture records the active recipient's bonus. Compare it with `FamilyBonus.getBonus(player)`, not the default `getBonus()` projection. The default keeps ordinary bonuses unamplified and selects account-best Family Guy inputs only for Divine Knight and Siege Breaker. An active-recipient capture does not independently validate that best-selection aggregate. Validate a best projection against a separate genuine capture of a recipient that reaches it; do not mix that result into another recipient's dataset.
Family evaluates recipients in original candidate order. A winning raw Elemental Sorcerer bonus becomes visible to Family Guy before amplification. Do not replace this local projection with final settled talent levels.


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

### Public-profile maintenance

Use this workflow only for explicitly requested public-profile or multi-account validation.
Routine development still uses the regular save and matching results described above.
Run these commands from the repository root.

#### Add a profile

1. Choose a player-published Toolbox or IdleOn Efficiency profile that adds a missing coverage condition.
   Add an entry to `tests/accounts/accounts.json`.
   This is the minimum configuration:

   ```json
   {
     "accounts": [
       {
         "id": "example-profile",
         "profileName": "published-toolbox-profile",
         "playerIndex": 0
       }
     ]
   }
   ```

   Replace the example profile name with the real public profile name.
   Use a unique lowercase ID containing only letters, numbers, or hyphens.
   `playerIndex` is a zero-based slot in the imported save's `playerNames` array.
   Index `0` is a provisional choice, not a claim about the best character.
   Keep existing entries when adding another profile.

   `source` defaults to `"toolbox"` when omitted, so existing Toolbox entries need no change.
   Use `"source": "idleon-efficiency"` for an IE-published profile:

   ```json
   {
     "id": "ie-example",
     "profileName": "published-ie-profile",
     "source": "idleon-efficiency",
     "playerIndex": 0
   }
   ```

   Set `profileName` to the profile handle, not a URL.
   The IE landing page is `https://<handle>.idleonefficiency.com`.
   The runner downloads JSON from `https://cdn.idleonefficiency.com/profiles/<handle>.json`, not the landing page.
   It lowercases and URL-encodes the handle for the CDN path.
   The [publisher and downloader](../../data/storage/profiles.tsx) define the IE publication format.
   Unknown `source` values fail instead of falling back to another format.

   An entry can also contain these optional fields:

   ```json
   {
     "preparationPlayerIndex": 0,
     "reason": "Covers a missing unlock or loadout condition."
   }
   ```

   `reason` explains coverage; it does not control extraction.
   Optional `progression` fields describe historical account selection.
   `list` displays them separately from the latest fetched metrics.
   They are not expected calculation values and need no mandatory numerical refresh.

2. Fetch and inspect the selected profile:

   ```bash
   export ACCOUNT_IDS=example-profile
   yarn test:accounts:fetch --accounts "$ACCOUNT_IDS"
   yarn test:accounts:list --accounts "$ACCOUNT_IDS"
   ```

   `list` shows configured defaults, source timestamps, available fetched metrics, and optional selection notes.
   It does not list character candidates or select the best character.
   Fetch writes immutable snapshots under `.cache/test-accounts/<id>/snapshots/`.
   The account's `latest.json` points to the selected snapshot.
   Older snapshots remain available.

   Use this inspection example to resolve the retained save and its actual roster:

   ```bash
   node - <<'NODE'
   const fs = require('node:fs');
   const path = require('node:path');
   const { parseArgs, selectedAccounts, safePointer } = require('./tests/helpers/test-accounts.cjs');
   const options = parseArgs(['list', '--accounts', process.env.ACCOUNT_IDS]);
   for (const account of selectedAccounts(options)) {
     const base = path.join(options.cacheDir, account.id);
     const pointer = JSON.parse(fs.readFileSync(path.join(base, 'latest.json'), 'utf8'));
     const snapshot = safePointer(base, pointer.snapshot);
     const manifest = JSON.parse(fs.readFileSync(path.join(snapshot, 'manifest.json'), 'utf8'));
     const savePath = safePointer(snapshot, manifest.savePath);
     const save = JSON.parse(fs.readFileSync(savePath, 'utf8'));
     console.log({ accountId: account.id, snapshot, savePath, playerNames: save.playerNames });
   }
   NODE
   ```

   Inspect `raw-profile.json` and `save.json` in that snapshot when metrics omit a required condition.
   Toolbox summary metrics help select candidates; original game outputs establish expected values.
   IE saves have no Toolbox `parsedData` summary; unavailable metrics do not imply zero progress.
   For IE, `sourceUpdatedAt` comes from HTTP `Last-Modified` when available.
   This timestamp identifies publication time, not gameplay activity; `fetchedAt` records the separate download time.

3. Select both character roles using [manual candidate comparison](#manual-candidate-comparison).
   Set `preparationPlayerIndex` to a character with the highest measured native Tome total.
   Set `playerIndex` to the default extraction character that exercises the relevant outputs.
   These characters can differ.
   A config's `requiredActivePlayerIndex` always overrides the default extraction character.
   Confirm that every required slot exists and meets the config's scene prerequisites.

4. Start the selected preparation/extraction pair against the same retained save.
   Confirm native character identity, saved scene, Tome cache, and relevant outputs together.
   A high result from one character does not prove another character receives that result.
   Use original game actions to establish state; do not edit saves or assign derived cache values.
   Startup behavior and cache ownership are documented in the
   [initialization order](../../sub-projects/idleon-offline/MAINTENANCE.md#initialization-order).

5. Stop the inspection runtime, then extract and test:

   ```bash
   yarn test:accounts:extract --accounts "$ACCOUNT_IDS"
   yarn test:accounts --accounts "$ACCOUNT_IDS" -- tests/domains/cooking/meal-speed.test.ts
   yarn test:accounts --accounts "$ACCOUNT_IDS"
   ```

   Replace the focused suite with the suite for the coverage condition under review.
   Extraction captures all configured values; it has no focused-config CLI option.
   Add the profile to the maintained cohort only after matching context and failures are understood.
   Keep genuine calculation failures visible; a failing profile is not a reason to exclude it.

#### Manual candidate comparison

Character selection is manual today.
There is no automatic candidate scan or find-best command in the account runner.
Do not choose only from class, level, allocated talent points, or Toolbox summary scores.
Compare original outputs affected by the selected character's effective talents, loadout, and account bonuses.
Use the expressions in the relevant `tests/configs/` files.

For each candidate, start a fresh runtime from the same unchanged `save.json`.
Use the candidate as both preparation and extraction character when comparing cached Tome totals.
Otherwise, a previous preparation character can retain a higher account-wide cache and hide the candidate's contribution.
Set `SAVE_PATH` to the inspected absolute save path:

```bash
export SAVE_PATH=/absolute/path/to/snapshot/save.json
export CANDIDATE=0
node sub-projects/idleon-offline/start.cjs \
  --save "$SAVE_PATH" \
  --character "$CANDIDATE" \
  --prepare-character "$CANDIDATE" \
  --port 3211
```

In another terminal, check readiness and the asset version:

```bash
curl -s http://127.0.0.1:3211/status
curl -s http://127.0.0.1:3211/game-version
```

Require `source: "offline"` and all readiness fields from [Game access](#game-access).
Check `character`, `playerName`, `preparationCharacter`, and `preparationPlayerName` against the retained roster.
Then inspect original game state and the cached Tome total:

```bash
curl -s http://127.0.0.1:3211/exec \
  -H 'Content-Type: application/json' \
  -d '{"expression":"({selectedName:idleon.getAttr(\"UserInfo\")[0],map:idleon.getAttr(\"CurrentMap\"),tomeScore:idleon.getAttr(\"PixelHelperActor\")[4].behaviors.getBehavior(\"ActorEvents_229\")._GenInfo[84]})"}'
```

The Tome expression comes from `tests/configs/tome-bonus.json`.
For example, this existing config expression reads the native Dank Ranks talent bonus:

```bash
curl -s http://127.0.0.1:3211/exec \
  -H 'Content-Type: application/json' \
  -d '{"expression":"idleon.callFunction(\"getbonus2\",1,207,-1)"}'
```

This is an example output, not a universal character-selection score.
Use current expressions and arguments for each relevant calculation.
An explicit player-index talent call can read saved allocations without active-character modifiers.
Such a call is not a substitute for loading that character and checking the actual consumer's output.
Use a consistent query order because original getters can update caches.
Stop the process before starting the next candidate on the same port.
Keep candidates, game assets, save input, and startup conditions identical except for the chosen character.
Compare ties explicitly; no single character must maximize every output.

Check every character-sensitive output covered by the selected tests, not only the example talent.
Gaming's Bits talent and Breeding's Arena Spirit can change with the recipient.
Confirm that a genuine character reaches each complete account-best result.
If different results need different characters, record which comparisons need another character context.
Do not combine different characters' inputs into one claimed in-game result.

After choosing the preparation character, repeat the relevant checks with that preparation character and the chosen extraction character.
Also check any config-required extraction character.
Startup preserves the native Tome cache while original UI navigation selects the final character.
Without `preparationPlayerIndex`, the runner uses the account's `playerIndex` for every extraction group.
Do not assume the config-required character becomes its own preparation character.

Recheck selection after profile refreshes, roster changes, new skills or talents, loadout changes, or game updates.
Recheck when a new extraction targets outputs that the previous selection did not compare.
Keep detailed research evidence outside operating instructions; retain a link when that evidence needs review.
Manual evidence tables and current numerical scores are not configuration requirements.

#### Run selected public profiles

Every action requires `--accounts`; there is no `--all` option or implicit all-account selection.
Use a comma-separated subset as above.
For all configured accounts, derive the IDs from the actual config:

```bash
export ACCOUNT_IDS="$(node -p "require('./tests/accounts/accounts.json').accounts.map(account => account.id).join(',')")"
yarn test:accounts:list --accounts "$ACCOUNT_IDS"
# Fetch only when source refresh is intended:
yarn test:accounts:fetch --accounts "$ACCOUNT_IDS"
yarn test:accounts:extract --accounts "$ACCOUNT_IDS"
yarn test:accounts --accounts "$ACCOUNT_IDS"
```

The runner accepts `--config PATH`, `--cache-dir PATH`, and `--port NUMBER`.
Use the same config and cache directory for each action when overriding defaults.
The example inspection and cached-reimport scripts use the default config and cache directory.
Adapt their `parseArgs` arguments when using overrides.

Extraction runs selected accounts and character groups serially.
It owns one offline runtime at a time, using loopback port `3211` by default.
It closes each runtime before starting another and never reuses ordinary development port `3101`.
Each group uses the same retained save and preparation character.
Testing starts a fresh Jest process per account and uses stored datasets only.
Testing does not fetch profiles or start game servers.
Test runs use the same Jest suite selection for each requested account.

Account tests default to one Jest worker and a `1024MB` `workerIdleMemoryLimit`.
The idle threshold permits recycling between scheduled entries; it is not a hard memory cap.
Pass Jest options after `--` to override those defaults.
`--runInBand` disables worker recycling.
Unlike normal `yarn test`, the runner does not add Node's `--max-old-space-size=2048` heap limit.
Neither setting limits total process memory.
Both commands use the [same grouped execution](../README.md#running-tests).
Keep cohort work serial unless resource capacity has been established for an explicitly requested run.

#### Versions and refresh rules

`ADAPTER_VERSION` in `public-profile-import.cjs` identifies the existing Toolbox-to-save conversion semantics.
IE import has a separate adapter version.
`getAdapterVersion(source)` selects the current version; an omitted source means Toolbox.
Snapshot extraction and dataset loading reject a version mismatch for the recorded source.
Bump only the affected source's version when its import semantics change.
Adding or changing IE import does not invalidate unchanged Toolbox datasets.
Fetching profiles or choosing characters does not require an adapter bump.
Routine test, documentation, extraction-config, and SDK initialization changes do not require an adapter bump.
Adapter versions are independent of the game version and dataset schema version.

| Change | Required action |
| --- | --- |
| Public upload changed, or configured `profileName` changed | Fetch the intended profile, review character selection, then extract again. |
| Default or preparation character changed | Extract again from the retained snapshot; a new fetch is not required. |
| Import semantics changed for one source | Bump that source's adapter version, reimport its retained raw bytes or fetch again, then extract again. |
| Extraction configs or local game assets changed | Extract again; review selection when the change affects compared outputs. |
| Offline SDK initialization or cache refresh changed | Restart inspection runtimes and extract fresh datasets, even if current hash checks pass. |
| Only domain code or test assertions changed | Use the existing matching dataset unless new captures or changed context are required. |

SDK/runtime source is not included in dataset fingerprints.
An SDK initialization change can leave an old dataset technically loadable but no longer representative.
Do not use an adapter bump to stand in for this required restart and extraction.
For changes to original-game cache preparation, follow
[Adding a cache refresh](../../sub-projects/idleon-offline/MAINTENANCE.md#adding-a-cache-refresh).

Snapshot manifests use schema version `1`.
Generated dataset descriptors use schema version `2`.
New snapshots and datasets record the resolved `source`; legacy manifests without it mean Toolbox.
The runner records character indices and names, preparation identity, asset version, and save/config/asset/result hashes.
Dataset loading validates both character identities against the retained save and checks the fingerprints.
An unsupported dataset schema requires fresh extraction, not a new profile fetch.
These generated provenance fields are functional; do not replace them with manual selection notes.
An older snapshot's recorded character does not pin a later extraction default.
Changing the config does not update an already selected dataset; extract to publish the new selection.

A successful extraction advances `latest-dataset.json` only after all configs succeed and hashes complete.
Fetching or failed extraction does not replace the last successful dataset.
Failed outputs remain available for diagnosis.
Do not mistake a previously selected dataset for the output of a failed refresh.
Account extraction never refreshes the regular save or forwards `--refresh-save`.

#### Reimport retained raw data

The supported recovery path is fetch, extract, then test.
There is no cached-reimport CLI command.
To retain the exact downloaded input, use the exported
[`writeProfileSnapshot`](test-accounts.cjs) API in a local maintenance script:

```javascript
const { writeProfileSnapshot } = require('./tests/helpers/test-accounts.cjs');
const sourceAccount = { ...account, source: sourceManifest.source ?? 'toolbox' };
const snapshot = writeProfileSnapshot(options, sourceAccount, rawBytes, {
  fetchedAt: sourceManifest.fetchedAt,
  sourceUpdatedAt: sourceManifest.sourceUpdatedAt,
  importedAt: new Date().toISOString(),
  sourceSnapshot: sourcePointer.snapshot
});
```

Supply runner options from `parseArgs` and the account entry from `selectedAccounts`.
Read `sourcePointer` from the account's `latest.json` and `sourceManifest` from that snapshot.
Use the snapshot's unchanged `raw-profile.json` bytes after checking its recorded raw hash.
`sourceSnapshot` is the account-relative snapshot path, not an absolute path.
Read the old manifest directly when its adapter version no longer passes extraction validation.
The writer runs the current importer for the retained source.
Pass `sourceUpdatedAt` from the old manifest to preserve IE publication time during a body-only reimport.
The retained body has no HTTP headers; do not replace this timestamp with the reimport time.
Toolbox imports continue to use the profile's `lastUpdated`.
It completes the snapshot before atomically advancing `latest.json`.
Then extract and test with the normal commands.
Reimport alone does not replace the selected dataset.

#### Public input and import policy

Keep profile downloads, imported snapshots, and extracted results out of source control.
Use only player-published public profiles.
Treat retained inputs as immutable; original startup actions may still advance local runtime state.
Compare rates and balances only when their inputs describe the same state.
A saved balance and a later runtime affordability result do not establish a matching comparison.

`public-profile-import.cjs` owns the source-specific import boundary.
Downstream tools consume its ordinary IE save without source-specific conversion rules.

The Toolbox branch restores bundle ownership from positive purchase flags before startup, so original loading does not replay bundle rewards.
Its existing approved omission removes optional private receipt field `GemsPacksPurchased` only when its native value is numeric `0`.
This lets the game apply its missing-field default.
It preserves valid purchase-history arrays and leaves downloaded raw bytes unchanged.
It does not invent receipts, resources, purchases, or bundle ownership.
Do not generalize that omission to other values or missing public fields without establishing their real representation and game behavior.

The IE branch validates required root metadata and preserves ordinary save values and genuine omissions.
It does not apply Toolbox field encoding, bundle reconstruction, or the numeric-zero receipt omission.
The IE [publisher](../../data/storage/profiles.tsx) removes `GemsOwned`, `ServerGemsReceived`, `BundlesReceived`, `GemsPacksPurchased`, `ServerGems`, and `CYGems`.
It also removes purchase fields named by `BundlesReceived`.
Preserve these redactions; do not fill missing fields from another save or fabricate defaults.

