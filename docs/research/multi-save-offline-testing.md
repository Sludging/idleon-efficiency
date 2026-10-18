# Opt-in multi-save offline testing

Research date: 2026-10-18. The investigation below preceded implementation. The account importer, dataset selection, and command workflow are now implemented. Initial scope remains advanced genuine accounts, not early-game compatibility or synthetic save edits.

## Implemented workflow

The current operational instructions are in [tests/helpers/README.md](../../tests/helpers/README.md). Account selection and historical selection evidence live in [tests/accounts/accounts.json](../../tests/accounts/accounts.json).

```bash
yarn test:accounts:list --accounts suk69,lunaonline
yarn test:accounts:fetch --accounts suk69,lunaonline
yarn test:accounts:extract --accounts suk69,lunaonline
yarn test:accounts --accounts suk69,lunaonline
```

Both selected public profiles reached offline readiness and completed all 157 extraction configs: 3,291 successful expressions per account, with no extraction errors. The CLI routed player-zero configs to a second owned runtime using the same account snapshot. All owned runtime listeners closed afterward.

The selected accounts differ in Menagerie progress, breeding progress, outposts, and Spelunking power. The stored selection evidence records 13 owned Menagerie unlocks and 82 bonus levels for `suk69`, versus 14 and 107 for `lunaonline`. The developer snapshot had 0 and 1. These are observed feature differences, not a claim that either account exceeds every developer-account statistic.

Fetching a newer snapshot does not replace the last completed dataset. Account tests select the account-level `latest-dataset.json`, published only after successful extraction. The refresh workflow was exercised by fetching `suk69` again after extraction, before starting the account test matrix.

One explicitly classified default-only suite remains: `tests/domains/spelunking/part-3-pipeline.test.ts`. Its saved-progression and synthetic-transition cases depend on the developer snapshot rather than extracted account-parity values. Account runs print this path and reason. Ordinary `yarn test` still runs it.

Hole character-skill comparisons now use extracted values instead of developer-account constants. A new `hole-character-skill-efficiencies-data.json` default result file contains 28 successful extractions from an owned v1.23 offline runtime. Its `/cloud-save` input exactly matched the 800-field developer fixture. Existing default save/result files retained their original aggregate SHA-256 fingerprint.

### Verification results

The full default command was exercised with no account selector:

```bash
yarn test --runInBand --json --outputFile /tmp/idleon-default-account-tests.json
```

All 48 infrastructure checks passed across the importer, dataset validator, account runner, and extraction helper. The full default run reported 4,074 passing and 531 failing tests across 295 suites. Failures include retained pairing guards expecting an older developer-save hash and domain calculation mismatches. One introduced roster-test reference error was fixed afterward; its focused re-import regression passed. The full default suite was not rerun after that single-test correction.

The real filtered account command was also exercised:

```bash
yarn test:accounts --accounts suk69,lunaonline -- \
  --runTestsByPath tests/domains/cooking/meal-speed.test.ts
```

Both Cooking comparisons failed. The runner continued to `lunaonline` after the `suk69` failure and returned a nonzero aggregate result. The `suk69` run successfully used its retained completed dataset after a newer, unextracted snapshot was fetched. These failures demonstrate comparison execution; they do not diagnose whether the domain or the imported runtime state causes the differences.

Four migrated suites also ran for each selected account: Right Hand of Action core and parameter tests, plus Royal Armory outpost-construction core and parameter tests. All four suites passed for each account, with 25 passing comparisons per account. This exercised shared save/results selection, selected-player behavior, direct-fixture-read migration, and removal of the named talent-source dependency.

An initial full account run with `--runInBand` reached Node's approximately 4 GB heap limit. Account runs now default to one Jest worker with `--workerIdleMemoryLimit=512MB`, using [Jest's built-in worker recycling](https://jestjs.io/docs/configuration#workeridlememorylimit-numberstring) between test files. Explicit Jest execution options remain supported. This does not change ordinary `yarn test` settings or calculation assertions.

With worker recycling enabled, the complete account matrix finished for both accounts without another heap abort:

| Account | Passing tests | Failing tests | Total suites |
| --- | ---: | ---: | ---: |
| `suk69` | 4,037 | 560 | 294 |
| `lunaonline` | 4,132 | 465 | 294 |

The runner returned a nonzero aggregate result after both accounts completed. Failures include calculation differences, remaining account-specific test assumptions, and unavailable source data. They are not all diagnosed domain bugs. No tolerance was widened and no account state was invented.

The fetched `suk69` profile omits `BundlesReceived`; `lunaonline` provides it. Some Hole comparisons therefore report unavailable saved bundle ownership for `suk69`. Missing public account data is not filled from the developer account and must not be treated as a diagnosed arithmetic bug.

Explicit selection of the default-only Spelunking transition suite was rejected with its configured reason. No test was silently treated as passing.

## Decision

Reuse the existing offline runtime, extraction configs, batch extractor, domain pipeline, and comparison matchers. Add a public-profile import boundary and one opt-in test-dataset selector. Keep ordinary `yarn test`, the developer save, and its extracted results unchanged.

A dataset means one immutable normalized save, its matching offline extraction results, and the selected player. It does not mean a separate implementation of the tests for each account.

The path works, but the two sampled accounts do not currently pass the focused Cooking comparison. Those differences need investigation before calling either account a passing regression baseline.

## Public source and available fields

The [requested leaderboard](https://idleontoolbox.com/leaderboards?t=Overview) links public profiles. Its publication flow requires players to upload profiles with leaderboard consent. The [patch notes](https://idleontoolbox.com/patch-notes) also describe that consent. Public availability does not establish permission for bulk redistribution. No explicit API stability or bulk-access contract was established. Fetch a small explicit account list; keep downloads local by default.

Observed unauthenticated, read-only endpoints:

```text
GET https://profiles.idleontoolbox.workers.dev/api/profiles/?profile=Dragami
GET https://profiles.idleontoolbox.workers.dev/api/profiles/?profile=Yosh6400
```

The response is a JSON profile envelope, not an original-game-ready save:

| Profile field | Import use |
| --- | --- |
| `data` | Flat account-save fields. Preserve every field and value. |
| `charNames` | Map to root `playerNames`. |
| `serverVars` | Map to root `servervars`. Both samples provide their own values. |
| `companion.l` | Raw companion records. Normalize ownership and upgrade levels through verified game semantics. |
| `lastUpdated`, `accountCreateTime` | Keep as source metadata outside the normalized save. |
| `parsedData` | Toolbox-derived metrics. Useful for candidate selection, not expected calculation values. |
| `guildData`, `tournament` | Preserve in the raw envelope. Do not assume these auxiliary structures are consumed by the offline adapter. |

Dragami supplied 845 save fields and 92 companion rows. Yosh6400 supplied 853 save fields and 115 companion rows. Each had 11 characters and Toolbox `currentWorld: 7`. Both had 87 unique owned companion IDs after duplicate normalization. These observations do not establish that either account exceeds the developer in every feature.

Source timestamps were `1791960659009` for Dragami and `1791736340982` for Yosh6400. Downloading now obtains their latest public uploads, not necessarily their current live state. Both responses exposed `serverVars.GameVERSION: 141`; no mapping from that raw number to executable version was established. Read the executable version from the offline server.

Relevant consumer source:

- [Toolbox AppProvider](../../reference-repos/IdleonToolbox/components/common/context/AppProvider.jsx), lines 230–235: passes the profile fields separately to its parser.
- [Toolbox parser](../../reference-repos/IdleonToolbox/parsers/index.ts), lines 93–100 and 121–136: accepts that envelope contract.
- [Toolbox companion parser](../../reference-repos/IdleonToolbox/parsers/misc.ts), lines 1199–1232: counts ownership and tradability. It does not establish IE's upgraded-companion mapping.

## Import conversion required

### Flatten and retain provenance

Build the runtime save from the fields inside `profile.data`, not from a root `data` wrapper. Add `playerNames`, `servervars`, and normalized `companions`. Retain the original response separately, with its URL, fetch time, upload time, and hash.

Do not borrow missing companions, server variables, or other account bonuses from the developer save. Missing required metadata makes an input unsupported. An explicit empty companion list is different from missing ownership data.

### Restore JSON encoding without changing account state

The sampled public saves contain native arrays/maps where the original game sometimes requires JSON text. Flattening and renaming alone failed startup with `this.json.charAt is not a function`.

The v1.23 original loader provides the conversion contract:

- `getLoadJsonList(key)` obtains a string and parses JSON.
- `getLoadSparseList(key, length)` obtains a string, parses JSON, and reads sparse numeric map keys.
- `getLoadMap(key)` accepts either JSON text or a native map.
- Other getters consume native lists or scalar values. Do not stringify every array/object.

Source: installed `assets/distBuild/static/game/N.js`; matching inspected local source `../IdleonWikiBot/N.js`. Minified helper locations are approximately byte offsets 15737 (`getLoadJsonList`), 15913 (`getLoadSparseList`), and 16103 (`getLoadMap`). The observed first failing call at byte 18274749 loads `AttackLoadout_<playerID>`. Subsequent sparse failures identified `EMm0_<playerID>` and other sparse fields.

IE also requires JSON text for some maps accepted natively by the game. In particular, [idleonData.tsx](../../data/domain/idleonData.tsx), lines 458–462, parses `TimeAway` directly.

The successful temporary adapter serialized only source-established JSON-list, sparse-list, and map fields. It left existing strings and unmatched fields unchanged. Each sample required 329 representation changes. Every encoded field parsed back to the exact original value; key counts stayed unchanged. The initial flat normalization changed none of the raw save-body fields.

Encoding changes are not invented upgrades or resource edits. They restore the representation required by the two consumers. This does not independently prove the public provider preserves all original save semantics.

### Normalize companion metadata

Original v1.23 companion initialization reads comma-delimited row field 0 as ID and field 4 as upgrade marker. Duplicate IDs retain the maximum marker. The initializer builds ownership bonuses once per owned ID. Source: original `N.js`, companion initialization near byte 10595000; see also the existing [companion encoder](../../sub-projects/idleon-offline/companion-input.cjs), lines 3–9 and 25–60.

Both samples contained only markers 0 and 1. Deduplicate by ID, retaining the maximum marker; map marker 0 to `{id, level: 1}` and marker 1 to `{id, level: 2}`. Reject unsupported markers rather than guessing. Preserve raw rows in the downloaded response.

The offline tool then uses its existing seven-column TEST provider encoding. This is not an authenticated account reconstruction. Its captured auxiliary UID/tournament prerequisites are another fidelity boundary; changing the save does not make every captured auxiliary field account-specific. See [MAINTENANCE.md](../../sub-projects/idleon-offline/MAINTENANCE.md) and [bootstrap.js](../../sub-projects/idleon-offline/bootstrap.js), lines 5–12.

## Existing extraction support is sufficient

The [batch extractor](../../tests/helpers/extract-all-game-data.js) already supports `--output-dir`. It writes the developer fixture only through the explicit guarded `--refresh-save` path. No extractor rewrite is needed just to keep alternate-account results separate.

After importing a profile, start an isolated process from `sub-projects/idleon-offline`:

```bash
yarn start --save /absolute/path/to/account/save.json --character 3 --port 3102
```

Require the selected server's `/status` to report `source: "offline"`, `cdpConnected`, `injected`, and `gameReady`. Check `/game-version` on that same server. Then run from the repository root:

```bash
GAME_SERVER_URL=http://127.0.0.1:3102 \
  node tests/helpers/extract-all-game-data.js \
  --output-dir /absolute/path/to/account/results
```

Do not use `--refresh-save`. Do not rely on an ambient `GAME_SERVER_URL`: explicitly set the alternate server URL.

Some configs require a particular player index. Keep their existing `requiredActivePlayerIndex` checks. The batch helper already supports `--player-server 0=http://127.0.0.1:3103`. Such a server must load the same account snapshot on player 0. Do not assume player index alone establishes account identity.

The tool reads a save once at startup. Restart to select another save; `/reset` returns to the same frozen input. Run extraction serially within each runtime. Original getters have side effects; use a cold runtime and the established config order for each dataset. See the [game-access and extraction policy](../../tests/helpers/README.md), lines 3–20, 24–86, and the [offline README](../../sub-projects/idleon-offline/README.md), lines 26–35 and 66–86.

## Small framework changes proposed

### One selected dataset

Introduce an opt-in descriptor containing:

- Normalized save path and hash.
- Result directory.
- Selected player index and name.
- Offline executable version and asset fingerprint.
- Source profile name, URL, upload timestamp, and raw-response hash.
- Config fingerprint and import-adapter revision.

Store results and descriptor together. This prevents accidental comparisons against another account or stale extraction configs. The current result JSON format can stay unchanged; add provenance beside it.

Resolve this descriptor once per Jest process. No selector means the existing developer save/results/target-player behavior. An explicit alternate selector must not silently fall back to developer data when a file is missing.

Route the existing shared loaders through this selection:

- [cloudsave-loader.ts](../../tests/utils/cloudsave-loader.ts), lines 26–57: currently reads a named fixture and runs the production account pipeline.
- [live-game-data-loader.ts](../../tests/utils/live-game-data-loader.ts), lines 21–30: currently reads only `tests/results/`.
- [target-player.ts](../../tests/utils/target-player.ts), lines 1–10: currently uses one repository player index.

Migrate calculation helpers that read the default fixture directly, including Royal Armory character-count helpers, Research fixture hashing, and Spelunking helpers. Do not change tests explicitly checking the local-save configuration's default behavior.

Run one account per fresh Jest process. Existing domain registrations retain instances; several Hole/Spelunking helpers already use `jest.isolateModules`. Process isolation avoids introducing an account-reset mechanism solely for this feature.

### Reuse tests, remove incidental account assumptions

Start with advanced accounts and existing game-parity core/parameter suites. Keep shared tolerances and calculation assertions unchanged. Replace embedded developer-account numbers with extracted values where they represent the same calculation.

For example, [Cooking meal-speed tests](../../tests/domains/cooking/meal-speed.test.ts), lines 10–12, explicitly name `latest` and contain a multi-save TODO. Their calculation comparison already fits alternate datasets. In contrast, some pipeline tests assert specific player-3 values or populated account state. Those tests need classification, not automatic execution against arbitrary accounts.

The first delivery should inventory the chosen game-parity suites, run each against the selected advanced accounts, and report all failures. A known account-specific check must either become reusable or remain explicitly default-only with a reason. Do not hide a mismatch as an unsupported scenario.

### Separate refresh, extraction, and test runs

Proposed commands, not implemented:

```bash
yarn test:accounts:fetch --accounts dragami,yosh6400
yarn test:accounts:extract --accounts dragami,yosh6400
yarn test:accounts --accounts dragami,yosh6400
```

`fetch` downloads only explicitly selected public profiles into new snapshot directories. `extract` imports each pinned snapshot, starts its isolated runtime, and calls the existing extractor with a separate output directory. `test` selects the pinned descriptor and starts Jest once per account. Test runs must not fetch live public data implicitly.

Prefer a local ignored cache containing `raw-profile.json`, `save.json`, `manifest.json`, and `results/` per account/snapshot. Commit the small account-selection configuration and runner, not downloaded account data by default. Keep older snapshots until a refreshed snapshot has complete extraction results; do not overwrite an active dataset in place.

Refresh the public upload explicitly when desired. Re-extract when the imported save, config, adapter, or executable assets change. Normal developer testing remains `yarn test`.

### Policy updates

The current [testing guide](../TESTING_IMPLEMENTATION.md), lines 37–39, restricts comparisons to the current real save. Narrowly extend this to genuine pinned account snapshots and matching offline results. Keep the ban on synthetic account mutations for this work. Keep the live-only developer-fixture refresh guard unchanged. Update test/helper documentation with the optional dataset selector and cache commands when those interfaces exist.

## Exercised evidence

Both imported accounts reached ready state on a separate port, using the original local v1.23 `Luminous_Menagerie` assets. Selected characters were `Dragamiyo` and `Yosh6403`, both index 3. Original clocks came from each save's `TimeAway.GlobalTime`.

For each account, the existing individual extractor ran `tests/configs/cooking-speed.json` against its alternate runtime. All 26 labels extracted successfully, with no extraction errors. Output went under `/tmp`, not `tests/results/`.

A throwaway `yarn tsx` script loaded each exact normalized input through `Cloudsave.fromJSON`, `initAllItems`, `initAccountDataKeys`, companion normalization, and production `updateIdleonData(..., true)`. It compared kitchen 0 `mealSpeed` with `final_cooking_speed`, using the existing relative baseline formula and tolerance `5e-7`.

| Account | Original-game kitchen speed | IE kitchen speed | Relative difference | Outcome |
| --- | ---: | ---: | ---: | --- |
| Dragami | 5.789895415238891e+183 | 1.9085823720607938e+183 | 0.6703597845588986 | Fails |
| Yosh6400 | 1.1735269731293743e+185 | 3.880481219731131e+184 | 0.6693317402510756 | Fails |

These are observed mismatches, not a diagnosed Cooking bug. Account import fidelity, captured auxiliary state, original-game initialization, and domain calculation differences remain possible causes. Fixing or explaining them is separate from this framework investigation. Do not widen tolerance or edit account values to make them pass.

The full batch and full Jest suite were not run against these accounts. No claim of complete account parity is made. The temporary runtimes were stopped after observation. The developer save and sampled default cooking-result hashes were unchanged.

## v1.23 representation adapter inventory

This inventory records the fields used in the successful experiment. It is version-specific research, not a runtime source-code parser to add to the framework. Validate it when game assets change. A trailing-underscore family matches only a numeric character suffix; other entries match exact keys.

`getLoadJsonList` arguments:

```text
AchieveReg, AnvilCraftStatus, ArcadeUpg, AttackLoadout_, AttackLoadoutpre_, Boats, Breeding, Bubba, BugInfo, Captains, CardPreset_, Cards1, CauldronBubbles, CauldronJobs0, CauldronJobs1, CauldronP2W, CogO, Compass, CookMaster, Cooking, DungUpg, FarmPlot, FarmRank, FlagP, FlagU, GamingSprout, GemItemsPurchased, Guild, HintStatus, Holes, Jars, KLA_, Lab, MapBon, Meals, Menagerie, Ninja, POu_, Pets, PetsStored, PlayerStuff_, PldTraps_, PrayOwned, Prayers_, Print, Refinery, Research, RoyalG, RoyalMaps, SSprog, SailChests, Sailing, SaltLick, Shrine, Spelunk, StatueLevels_, SteamAchieve, StuG, Summon, Sushi, TaskZZ0, TaskZZ1, TaskZZ2, TaskZZ3, TaskZZ4, TaskZZ5, Territory, Tess, TotemInfo, Tower
```

`getLoadSparseList` arguments:

```text
CMm, CogM, EMm0_, EMm1_, IMm_, ObolEqMAP_, ObolEqMAPz1, ObolEqMAPz2, ObolInvMAP_0, ObolInvMAP_1, ObolInvMAP_2, ObolInvMAP_3
```

`getLoadMap` arguments:

```text
ArcUnclaim, AtkCD_, BundlesReceived, CSetEq_, Cards0, FarmCrop, InvBagsUsed_, InvStorageUsed, KRbest, MaxCarryCap_, NPCdialogue_, QuestComplete_, QuestStatus_, SL_, SLpre_, SM_, StarSg, TimeAway, WeeklyBoss
```
