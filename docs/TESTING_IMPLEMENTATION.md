# Domain Calculation Testing Guide

## Goal

Use tests to determine whether a domain calculation matches the game and, when it does not, which calculation needs correction. Expected values come from the game; tests exercise the domain code used by the application.

For a correctness case, the selected stage defines allowed work. The tests stage writes and runs tests before domain changes. Return results for the human's next-stage decision, or to a supervising session within explicit human delegation.

## Core tests and parameter tests

A **core test** compares the public result of the selected domain/aspect calculation with its extracted game value. Choose tests for distinct behaviors or branches, or a representative set of input values. Testing every value can be reasonable when the set is small, such as about ten values.

A **parameter test** compares a calculation directly used by the selected aspect with its extracted game value. Include every such calculation from another domain/aspect, including another aspect in the same domain. Keep the comparison even when that calculation has its own core test.

Static data and trivial helpers are not parameter-test targets. Calculations used only inside a dependency belong to that dependency's tests. For example, when the selected aspect uses `Rate`, test `Rate` as its parameter; the inputs used only to calculate `Rate` belong to the rate aspect.

A **branch** is a condition that changes the selected calculation's behavior, such as using a different formula or returning zero until an unlock. Changing an index is not by itself a new branch: check whether the game applies a different rule or the same rule to another value.

Core tests check the selected result; parameter tests help distinguish an error in that result from an error in a calculation it uses. Passing direct parameter tests are useful results, not failures to create for test-first work; under the [playbook dependency boundary](calculation-correctness/PLAYBOOK.md#dependencies-and-wikibot), they end investigation of that dependency for this case.

The [real examples below](#examples-from-existing-tests) show these distinctions in Tome and Cooking tests.

## Prepare the comparisons

1. **Establish game behavior.** Follow the [shared research rule](../AGENTS.md#research-specialists) before exploratory research. Verify the selected result, its conditions, and directly used calculations against focused delivered game source for the version under review.
2. **Locate the domain code and tests.** Match each game calculation to the domain method and test that check it, or record that the implementation is missing. Ask the human if the meaning or owning domain/aspect is unclear.
3. **Choose extraction values.** Each core or parameter comparison needs an entry in `tests/configs/`. Use the game function and arguments, or game value, used by the selected calculation. Each entry should support a comparison.
4. **Obtain any new expected values.** Follow the [playbook extraction triggers](calculation-correctness/PLAYBOOK.md#extraction-when-needed). With unchanged config and usable results, continue with the existing matching save and results.
5. **Write and run the tests.** Use the matchers below and record the actual commands and results before changing domain code.

For server selection, readiness, version lookup, and live-only save refresh, follow the [canonical game-access policy](../tests/helpers/README.md#game-access).

When extraction is needed, use the [extraction helper guide](../tests/helpers/README.md#quick-start---batch-extraction) for commands, server selection, save refresh, and active-player prerequisites.

For a correctness case, follow the [plan approval step](calculation-correctness/PLAYBOOK.md#2-plan-and-obtain-approval) before changing tests or extraction configs. Use the approved scope and interface. When extraction is needed, return the request to the human or explicitly delegated supervising session under the [playbook extraction procedure](calculation-correctness/PLAYBOOK.md#extraction-when-needed).

## Keep tests tied to genuine saves

Use a genuine real save and its matching extracted game values. Result-only extraction, whether offline or live, does not establish pairing with a retained save; offline and live snapshots are not presumed equivalent. A live save refresh precedes config extraction rather than taking an atomic snapshot, so establish that results match the saved state before using them. Tests must not construct synthetic saves, alter inputs to simulate a branch, or calculate expected values from the implementation. This deliberately leaves unobserved permutations uncovered. State which meaningful behavior the paired save exercises, and raise uncovered behavior as a coverage question rather than inventing test data.

Routine `yarn test` and extraction use `tests/fixtures/saves/latest.json` and its matching results; reuse the shared default offline server when ready. Public-account testing is opt-in only when the user explicitly requests multi-account or public-profile validation. DO NOT USE THIS IN NORMAL OPERATIONS. It is not a routine prerequisite or fallback for regular-save mismatches or missing results. The importer changes required save representation only; it does not add resources or simulate progress. Fetched data stays local under `.cache/test-accounts/` by default. Fetching, extraction, and tests are separate commands; tests use stored paired datasets and never fetch profiles.

All Toolbox-to-save conversion belongs in `tests/helpers/public-profile-import.cjs`.
Its output is an ordinary IE save for both extraction and domain loading.
Bundle ownership is restored from positive purchase flags before offline startup,
without granting resources or replaying purchase receipts. Raw downloads remain unchanged.

Extraction expressions must read account-dependent operands from the selected save.
Do not embed balances or levels from another account.
For actionable prices, apply the native purchase gate.
A raw quote can remain nonzero when purchases are blocked.

Run this sequence only when the user explicitly requests multi-account or public-profile validation. See [canonical game-access policy](../tests/helpers/README.md#game-access) for the regular-save default and gate.

Use `yarn test:accounts:list --accounts <ids>` to inspect configured accounts, source dates, and observed progression. Fetch explicitly with `yarn test:accounts:fetch --accounts <ids>`, extract with `yarn test:accounts:extract --accounts <ids>`, then run fresh Jest processes with `yarn test:accounts --accounts <ids>`. Pass Jest suite arguments after `--`. See [helper account testing](../tests/helpers/README.md#integration-with-tests) for options and cache behavior. Account-specific calculation failures remain failures. Do not suppress known mismatches or change comparison tolerances.

Account test processes default to one Jest worker with a `512MB`
`workerIdleMemoryLimit`. Jest can recycle workers between test files when a
worker exceeds the limit. Pass `--maxWorkers` or `--workerIdleMemoryLimit` after
`--` to override a default; pass `--runInBand` or `-i` to disable both worker
defaults. This does not change normal `yarn test`.
Each extraction entry used here should support a core result or a direct parameter comparison. A parameter is a calculation the selected result directly uses, including one in the same domain; keep its comparison even when it also has a core test. Static/supporting metadata is not a calculation target.

Write the completed test against the typed public API directly and assert the calculated result. For a missing implementation during the tests stage, keep an active test whose extractor reports the missing calculation and game function signature. This temporary failure scaffolding exposes the missing API; once implemented, remove `typeof`/`in` guards, `unknown` casts, and `.call` wrappers. A missing selected implementation can support implementation after tests-stage approval; a missing directly used result follows the [dependency procedure](calculation-correctness/PLAYBOOK.md#dependencies-and-wikibot).

Choose indices because they represent a game concept or scenario, and explain why they are selected. Descriptions should say what gameplay effect is compared and what website result would be wrong; keep obfuscated game identifiers and extraction mappings separately for traceability. Assert calculation results, not incidental save or object representation. Cover distinct behaviors and representative inputs rather than repeating aliases of the same path; a small exhaustive set is useful when the set itself is small and justified.

### Positive patterns

- **Core result:** compare the application's populated public result with the extracted game value for the same save. For example, the Cooking meal-speed test compares the kitchen's calculated `mealSpeed` with the matching `CookingR / CookingSPEED` extraction. Describe this as the kitchen's meal speed, not as a test of an obfuscated function name.
- **Direct parameter:** compare a directly used calculation via its public typed method or property with its own extracted game value. The Tome Grimoire-bonus and Cooking meal-bonus examples below show separate parameter comparisons, including a same-domain parameter.
- **Meaningful selection:** name the selected index by its gameplay role or observed state, and explain why it exercises a relevant behavior. The Tome example below checks locked and unlocked bonuses using one real saved state; it does not claim to cover every unlock transition.

Keep the extraction key, exact game call, and domain mapping in the config/test wiring for traceability. The test description should remain understandable as a statement about the player-facing mechanic and the result the website calculates.

Use these existing matchers:

- Parameter comparisons: `toMatchLiveGame`, with configured tolerance `0`.
- Core comparisons: `toMatchLiveGameWithDetails`, with `{ tolerance: 0, ... }` and useful calculation details.

When a domain result uses a fixed conversion of the game value, convert the extraction value only when delivered game code establishes that conversion. Explain it in the config description.

### Numeric comparison policy

Both matchers default the configured tolerance to `0` and use:

```text
baselineTolerance = 5e-7
effectiveTolerance = max(configuredTolerance, baselineTolerance)
difference = abs(actual - expected) / max(abs(expected), 1)
pass = difference <= effectiveTolerance
```

Configured tolerance `0` uses the shared baseline; it no longer means exact equality. For expected magnitudes at least `1`, the baseline permits `0.5` parts per million. Below `1`, it permits an absolute difference of `5e-7`. This is the ordinary product accuracy policy, including very large values. The baseline requires no engine-variation proof.

Failure diagnostics show full-precision expected and received values, signed delta (`actual - expected`), difference, and effective, configured, and baseline tolerances. Larger configured tolerances set the total allowance through `max`; they do not add to the baseline.

Keep configured tolerance `0` for normal comparisons. Every explicit non-zero override requires a nearby comment that justifies it. For larger overrides, apply the requirements below.

### Documented non-zero tolerances

A selected comparison may propose a larger override, above the shared baseline, only when delivered game source establishes an intentional semantic difference between the game value and the domain value. Keep that override:

- named at the aspect test site, not in the global matcher;
- narrow and tied to the observed discrepancy;
- explained in a nearby comment with the game source, the domain contract, and the reason the comparison remains useful.

Also document the proposed bound and discrepancy with configured tolerance `0`. When proposing or using a larger override in a correctness case, follow the [playbook exception procedure](calculation-correctness/PLAYBOOK.md#non-zero-tolerance-exceptions) for recording, review, and human approval.

Keep required comparisons active so differences outside the allowed bound still fail. Skipping them, substituting guessed values, or changing tolerance to hide failures does not establish correctness. An unexplained difference outside the shared baseline is a failure to investigate, not an exception; match the delivered formula and operation order rather than widening the bound. Missing or wrong WikiBot static data goes to the human for a WikiBot request; generated data is not edited by correctness agents.

## Verify after implementation

After implementation, run the selected core and parameter tests and every test changed by the case. Record the commands and results, and report larger overrides separately. For the next stage and any new test/config needs, follow the [implementation and review workflow](calculation-correctness/PLAYBOOK.md#5-implement-and-review). For acceptance, use the [completion prerequisites](calculation-correctness/PLAYBOOK.md#6-complete-the-case).

## Read the test results

| Result | What it establishes and what follows |
| --- | --- |
| Core test fails; all direct parameter tests pass at configured tolerance `0` | The selected calculation needs correction. An explicit error for a missing selected implementation also establishes this. |
| A direct parameter test fails, or the website result is missing so its comparison cannot be made | Only this observed result warrants dependency investigation; keep a failing comparison visible where available and follow the [playbook dependency procedure](calculation-correctness/PLAYBOOK.md#dependencies-and-wikibot). A passing direct parameter comparison ends investigation of that dependency for this case. |
| Core and all direct parameter tests pass at configured tolerance `0` | The existing behavior passes these comparisons. Proceed to review the selected calculation's source/behavior, website implementation and consumers, and direct-parameter mapping; do not investigate internal formulas or upstream dependencies of passing dependencies. |
| Setup fails before the selected assertions run | No calculation result was checked. Address a clear test/config problem or report the external prerequisite. |
| A comparison uses or proposes configured tolerance above the shared baseline | Check the [source-backed bound requirements](#documented-non-zero-tolerances), report larger overrides separately, and follow the [playbook exception procedure](calculation-correctness/PLAYBOOK.md#non-zero-tolerance-exceptions). |

## Test files and commands

Use core files named `<aspect>.test.ts` and parameter files named `<aspect>-parameters.test.ts` under `tests/domains/<domain>/`. A calculation with no parameter calculations needs only its core test file. `tests/utils/parameter-test-config.ts` defines the table-driven parameter test fields; existing loader helpers read game results and the save.

Run the selected files while working:

```bash
yarn test tests/domains/<domain>/<aspect>.test.ts
yarn test tests/domains/<domain>/<aspect>-parameters.test.ts
```

## Class reference inventory

The report generated by `scripts/domain-class-references.ts` inventories class
declarations in editable `data/domain/**` and symbol references from `app/**`,
`components/**`, and test files. A class counts when its class symbol or a
declared member symbol is referenced. It does not classify core or parameter
calculations.

The top-level `excludedDomainDirectories` set near the top of
`scripts/domain-class-references.ts` controls exclusions under `data/domain`.
It currently contains `data`, `enum`, `model`, `base`, and `login`; maintainers
add or remove top-level directory names there when exclusions change.

All formats group classes into **both**, **UI-only**, **tests-only**, and
**neither**, with entries grouped by implementation path:

```bash
yarn coverage:report                         # Markdown: coverage-report.md
yarn coverage:report --format=markdown       # Markdown: coverage-report.md
yarn coverage:report --format=html           # HTML: coverage-report.html
yarn coverage:report --format=json           # JSON: coverage-report.json
```

The space-separated form is also accepted, for example
`yarn coverage:report --format markdown`. HTML is standalone and human-readable,
with collapsed references and search; JSON is machine-readable. See
[tests/README.md](../tests/README.md) for the concise report reference.

## Examples from existing tests

These examples explain individual comparisons and coverage choices. Use the linked game source and tests to understand the example; choose coverage for the aspect being worked on.

### Parameter test: Grimoire bonus used by Tome

Tome's epilogue bonus uses Grimoire upgrade 17 in the captured [`LoreEpiBon` game code](game-snippets/tome/Thingies.1.21.js#L273-L309). Its parameter comparison is separate from the final epilogue result:

| Part | Existing example |
| --- | --- |
| Game value | `idleon.callFunction("Summoning", "GrimoireUpgBonus", 17, 0)` |
| Domain value | `grimoire.getUpgradeBonus(17)` |
| Extraction key | `grimoire_bonus_17` |

The [config](../tests/configs/tome-epilogue-bonus.json#L60-L64) supplies the expected value. The [parameter test](../tests/domains/tome/epilogue-bonus-parameters.test.ts#L12-L19) obtains the domain value, and the table-driven runner compares them with `toMatchLiveGame(liveValue, 0)`. If this comparison fails, the Grimoire calculation needs attention before changing the Tome formula.

**Same-domain example:** Cooking's meal-bonus [parameter test](../tests/domains/cooking/meal-bonus-parameters.test.ts#L69-L76) compares `cooking.meals[1].getBonusMultiCook()` with the [configured](../tests/configs/cooking-meal-bonus.json#L40-L44) `Summoning2 / BonusMultiCook` game call. In the [Cooking domain](../data/domain/world-4/cooking.tsx#L129-L149), `getBonus()` uses this Cooking Mastery multiplier. The multiplier remains a parameter even though both calculations are in Cooking. The captured [1.19 game function](game-snippets/cooking/Summoning2.1.19.js#L68) shows it is a calculated value, not static data.

### Core test: meal speed for kitchen 0

The [Cooking speed config](../tests/configs/cooking-speed.json#L5-L9) calls `CookingR / CookingSPEED` for kitchen 0. The [core test](../tests/domains/cooking/meal-speed.test.ts#L47-L71) compares that final result with `cooking.kitchens[0].mealSpeed`, which the application's calculation step has populated.

This checks the combined result, rather than checking each bonus as another core test. Kitchen 0 is a representative input. Its passing result would establish that comparison for the saved state, not every kitchen or branch. The captured [CookingSPEED source](game-snippets/cooking/CookingR.1.20c.js#L118-L146) helps identify other behavior that might need separate coverage.

### Branch: locked and unlocked Tome epilogue bonuses

In the captured [`LoreEpiBon` function](game-snippets/tome/Thingies.1.21.js#L273-L309), the condition `Spelunk[13][2] > r` selects between calculating the bonus and returning zero. Here `Spelunk[13][2]` is the unlocked count and `r` is the bonus index. That condition is a branch. Selecting a different coefficient or threshold from a list with the index is not, by itself, another branch.

The [core test](../tests/domains/tome/epilogue-bonus.test.ts#L13-L38) checks all 11 indices: a small set that is reasonable to cover in full. The [recorded extraction](../tests/results/tome-epilogue-bonus-data.json) provides a concrete example with 10 unlocked bonuses: index 0 takes the calculation path, while index 10 takes the zero path. Both paths are exercised in that saved state. This does not establish every unlock transition or score threshold; use the source and current extracted values to explain which behavior a test actually checks.

