# Game Testing Infrastructure

Testing approach that validates domain calculations against extracted game values. Use the [canonical game-access policy](helpers/README.md#game-access) to select the default offline server or justify live access.

## Running tests

`yarn test` still runs Jest. Select original source files with the usual Jest
arguments, for example:

```bash
yarn test tests/domains/cooking/meal-speed.test.ts
yarn test --runTestsByPath tests/domains/cooking/meal-speed.test.ts
```

The package command starts the installed Jest binary with Node's
`--max-old-space-size=2048`. This limits V8 old-space heap, not total process
memory. `test:watch`, `test:coverage`, `test:domains`, and `test:integration`
delegate to this command. Direct `yarn jest` uses the same Jest configuration
but does not add this package-command heap limit. The account runner also does
not add this heap limit.

Jest selects source files before the sequencer groups domain suites into ten
natural website groups: `account`, `players`, `master-classes`, and `world-1`
through `world-7`. Each selected group runs through a short-lived require
wrapper. Each Jest process uses a unique operating-system temporary directory
for wrappers and removes that directory on exit. Non-domain suites remain
separate Jest entries with their usual runtime isolation.

New test files in an existing domain directory are discovered automatically.
They inherit the directory's group; do not register each file.
The directory mapping is in `tests/helpers/domain-test-groups.cjs` and uses the
first directory below `tests/domains/`. Add a mapping once when adding a new
domain directory. Use `perFileOverrides` only when a test's website group differs
from its directory's default, such as tests in mixed legacy directories.
An unmapped domain directory stops test execution with an error; its tests are
not silently skipped. `--listTests` only lists discovered source files and does
not validate group mappings.

Within each group's Jest runtime, `loadGameDataFromSave` shares one prepared
account per resolved save path after `updateIdleonData` completes.
Treat that prepared state as read-only; object and array writes and
`Map`, `Set`, and `Date` mutators are blocked. The cache
ends with that Jest runtime; it does not span groups or processes.

Normal and opt-in account runs default to one worker and a `1024MB`
`workerIdleMemoryLimit`. Jest can recycle a worker between scheduled entries
after it exceeds this idle threshold. The threshold does not impose a hard
heap or total-memory cap. Explicit Jest worker and memory options override
the defaults.
`--runInBand` runs in the main process instead of using worker recycling.

## Saved-account calculation tests

Domain suites compare website results with extracted game values. They do not
add domain-specific save-pairing, fixed-roster, or extraction-context guards.
Shared extraction-health, character-selection, and dataset-integrity checks
remain in `tests/utils/` and `tests/helpers/`.

Bubba progression tests compare the next bonus, purchase cost, and affordability.
They do not assert the continuously changing raw meat balance.

Summoning stone tests compare native win counts and upgrade effects without
pinning boss HP to the progression of a particular saved account snapshot.

Gaming prepares its account level from the highest parsed player Gaming skill
before applying Superbit effects, Palette calculations, and harvest multipliers.

Button queue tests compare only the dynamic current task and its requirement
with native APIs. Copper sample progress has a separate matching calculation
comparison; queue progress and readiness do not mix active-character game values
with the website's account-best projections.

Class EXP tests compare the final multiplier with native `ExpMulti(0)` and check
its direct inputs separately. Clamworks promotion reward text does not supply an
extra class EXP factor absent from the native calculation.

Lab Mainframe 11 uses Storage's saved `GreenStacks` credit count, not the number
of current chest entries holding at least 10 million items. Current storage
quantities and inventory-based stack indicators remain unchanged.

The full normal-world maximum-damage comparison uses the dedicated
`player-maximum-damage.json` extraction config. Its native capture requires a town
and records the active player index, map ID, and internal map name. The test
requires a town save matching the captured player and map. Unsuitable captures
fail explicitly; the test does not skip or compare restricted-map damage.
Class EXP and damage parameter extractions remain independent of this requirement.
Town eligibility is a location prerequisite, not proof that every temporary buff
is absent.

## Automatic Domain Class Reference Report

`scripts/domain-class-references.ts` inventories class declarations in editable
`data/domain/**` and their symbol references from `app/**`, `components/**`, and
test files. A class counts as referenced when its class symbol or one of its
declared member symbols is referenced from a root. This is a symbol-reference
inventory; it does not classify classes as core or parameter calculations.

The top-level `excludedDomainDirectories` set near the top of
`scripts/domain-class-references.ts` controls which top-level directories under
`data/domain` are excluded. It currently contains `data`, `enum`, `model`,
`base`, and `login`; maintainers add or remove directory names there when the
exclusion list changes.

All formats group classes into **both**, **UI-only**, **tests-only**, and
**neither**, and group entries by implementation path:

```bash
yarn coverage:report                         # Markdown: coverage-report.md
yarn coverage:report --format=markdown       # Markdown: coverage-report.md
yarn coverage:report --format=html           # HTML: coverage-report.html
yarn coverage:report --format=json           # JSON: coverage-report.json
```

The command also accepts the space-separated form, for example
`yarn coverage:report --format markdown`. HTML is a standalone, human-readable
report with collapsed references and search; JSON is machine-readable.

## Documentation

## Opt-in multi-account tests

Routine `yarn test` and extraction use the regular save and matching results.
Reuse the shared default offline server when ready. Public-account workflows
are opt-in only when the user explicitly requests multi-account or
public-profile validation; they are not routine prerequisites or fallbacks.
See the [canonical game-access policy](helpers/README.md#game-access) and
[helper documentation](helpers/README.md#integration-with-tests).
Cached account snapshots and extraction runs stay under the ignored
`.cache/test-accounts/` directory. Account calculation mismatches remain
visible failures.

See `docs/TESTING_IMPLEMENTATION.md` for comprehensive testing guide.
