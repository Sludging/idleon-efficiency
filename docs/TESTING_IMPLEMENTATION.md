# Domain Calculation Testing Guide

## Goal

Use tests to determine whether a domain calculation matches the game and, when it does not, which calculation needs correction. Expected values come from the game; tests exercise the domain code used by the application.

For a supervised correctness case, the assigned stage defines which work may be done. The tests stage writes and runs tests before domain changes. The coordinator then uses those results to decide whether to assign implementation, handle a dependency, or request human input.

## Core tests and parameter tests

A **core test** compares the public result of the selected domain/aspect calculation with its extracted game value. Choose tests for distinct behaviors or branches, or a representative set of input values. Testing every value can be reasonable when the set is small, such as about ten values.

A **parameter test** compares a calculation directly used by the selected aspect with its extracted game value. Include every such calculation from another domain/aspect, including another aspect in the same domain. Keep the comparison even when that calculation has its own core test.

Static data and trivial helpers are not parameter-test targets. Calculations used only inside a dependency belong to that dependency's tests. For example, when the selected aspect uses `Rate`, test `Rate` as its parameter; the inputs used only to calculate `Rate` belong to the rate aspect.

A **branch** is a condition that changes the selected calculation's behavior, such as using a different formula or returning zero until an unlock. Changing an index is not by itself a new branch: check whether the game applies a different rule or the same rule to another value.

Core tests check the selected result; parameter tests help distinguish an error in that result from an error in a calculation it uses. Passing direct parameter tests are useful results, not failures to create for test-first work; under the [playbook dependency boundary](calculation-correctness/PLAYBOOK.md#dependencies-and-wikibot), they end producer investigation for this case.

The [real examples below](#examples-from-existing-tests) show these distinctions in Tome and Cooking tests.

## Prepare the comparisons

1. **Establish game behavior.** Read the relevant delivered game source for the version under review. Identify the selected result, its conditions, and the calculations it uses. Use existing findings and source links where available.
2. **Locate the domain code and tests.** Match each game calculation to the domain method and test that check it, or record that the implementation is missing. Ask the human if the meaning or owning domain/aspect is unclear.
3. **Choose extraction values.** Each core or parameter comparison needs an entry in `tests/configs/`. Use the game function and arguments, or game value, used by the selected calculation. Each entry should support a comparison.
4. **Obtain any new expected values.** Add or correct config entries for required values not yet configured, then request extraction. With unchanged config and usable results, continue with the existing save and results. Extraction also runs when the human requests it.
5. **Write and run the tests.** Use the matchers below and record the actual commands and results before changing domain code. A missing calculation should produce an explicit failure while it is unimplemented; after implementation, tests call its typed public API directly.

The [extraction helper guide](../tests/helpers/README.md) explains runtime prerequisites, the active-player requirement, config/output formats, and the batch command:

```bash
node tests/helpers/extract-all-game-data.js
```

In a supervised correctness case, follow the [plan approval step](calculation-correctness/PLAYBOOK.md#2-plan-and-obtain-human-approval) before changing tests or extraction configs. Use the approved scope and interface. The coordinator runs extraction and returns the result to the worker. Use new results after the command succeeds. For a technical failure with unchanged valid config, report the concrete error and any human action needed.

## Keep tests tied to the real save

Use only the current real save and its matching extracted game values. Tests exercise that saved state; do not construct synthetic saves, alter inputs to simulate a branch, or calculate expected values from the implementation. This deliberately leaves unobserved permutations uncovered. State which meaningful behavior the paired save actually exercises, and raise an uncovered behavior as a coverage question rather than inventing test data.

Each extraction entry used here should support a core result or a direct parameter comparison. A parameter is a calculation the selected result directly uses, including one in the same domain; keep its comparison even when it also has a core test. Static/supporting metadata is not a calculation target.

Write the completed test against the typed public API directly and assert the calculated result. If an implementation is missing during the tests stage, temporary failure scaffolding may identify the missing calculation and game signature. Remove that scaffolding once the implementation exists: do not retain `typeof`/`in` guards, `unknown` casts, or `.call` wrappers around an implemented API.

Choose indices because they represent a game concept or scenario, and explain why they are selected. Descriptions should say what gameplay effect is compared and what website result would be wrong; keep obfuscated game identifiers and extraction mappings separately for traceability. Assert calculation results, not incidental save or object representation. Cover distinct behaviors and representative inputs rather than repeating aliases of the same path; a small exhaustive set is useful when the set itself is small and justified.

### Positive patterns

- **Core result:** compare the application's populated public result with the extracted game value for the same save. For example, the Cooking meal-speed test compares the kitchen's calculated `mealSpeed` with the matching `CookingR / CookingSPEED` extraction. Describe this as the kitchen's meal speed, not as a test of an obfuscated function name.
- **Direct parameter:** compare a directly used calculation via its public typed method or property with its own extracted game value. The Tome Grimoire-bonus and Cooking meal-bonus examples below show separate parameter comparisons, including a same-domain parameter.
- **Meaningful selection:** name the selected index by its gameplay role or observed state, and explain why it exercises a relevant behavior. The Tome example below checks locked and unlocked bonuses using one real saved state; it does not claim to cover every unlock transition.

Keep the extraction key, exact game call, and domain mapping in the config/test wiring for traceability. The test description should remain understandable as a statement about the player-facing mechanic and the result the website calculates.

Use these existing matchers:

- Parameter comparisons: `toMatchLiveGame`, with tolerance `0`.
- Core comparisons: `toMatchLiveGameWithDetails`, with `{ tolerance: 0, ... }` and useful calculation details.

When a domain result uses a fixed conversion of the game value, convert the extraction value only when delivered game code establishes that conversion. Explain it in the config description. Match the game's formula and operation order when small numeric differences occur.

### Documented non-zero tolerances

The default tolerance is zero. A selected comparison may use a non-zero tolerance only when the delivered game source establishes an intentional semantic difference between the game value and the domain value. Keep that tolerance:

- named at the aspect test site, not in the global matcher;
- narrow and tied to the observed discrepancy;
- explained with the game source, the domain contract, and the reason the comparison remains useful;
- active, so differences outside the documented bound still fail.

For a missing implementation, keep an active test whose extractor reports the missing calculation and game function signature. This is temporary failure scaffolding for an unimplemented API; once implemented, call the typed public API directly and remove the missing-method guards and wrappers. If the selected calculation is missing, that failure can support implementation after the tests-stage approval. If a directly used calculation is missing, treat it as a dependency only when its website result is missing and the parameter comparison therefore cannot be made; a passing comparison does not invite upstream investigation.

Keep required comparisons active. Skipping them, substituting guessed values, or changing tolerance to hide failures does not establish correctness. A documented non-zero tolerance is an exception only when the preceding rule is satisfied; it must describe the known semantic mismatch rather than conceal an unexplained failure. Missing or wrong WikiBot static data goes to the human for a WikiBot request; generated data is not edited by correctness agents.

After implementation, run the selected core and parameter tests and every test changed by the case. Require passing comparisons at tolerance `0`, except for a named, source-backed non-zero tolerance documented under the preceding rule. New test/config needs return through the tests stage before further domain changes.

## Read the test results

| Result | What it establishes and what follows |
| --- | --- |
| Core test fails; all direct parameter tests pass | The selected calculation needs correction. An explicit error for a missing selected implementation also establishes this. |
| A direct parameter test fails, or the website result is missing so its comparison cannot be made | Only this observed result warrants dependency investigation; keep a failing comparison visible where available and follow the [playbook dependency procedure](calculation-correctness/PLAYBOOK.md#dependencies-and-wikibot). A passing producer comparison ends its investigation for this case. |
| Core and all direct parameter tests pass | The existing behavior passes these comparisons. Proceed to review the selected calculation's source/behavior, website implementation and consumers, and direct-parameter mapping; do not investigate internal formulas or upstream dependencies of passing producers. |
| Setup fails before the selected assertions run | No calculation result was checked. Address a clear test/config problem or report the external prerequisite. |

For a missing implementation, keep an active test whose extractor reports the missing calculation and game function signature. If it is the selected calculation, that failure can support implementation after the tests-stage approval. If it is a directly used calculation, treat it as a dependency only when its website result is missing and the parameter comparison therefore cannot be made; a passing comparison does not invite upstream investigation.

Keep required comparisons active. Skipping them, substituting guessed values, or changing tolerance to hide failures does not establish correctness. A documented non-zero tolerance is an exception only when the preceding rule is satisfied; it must describe the known semantic mismatch rather than conceal an unexplained failure. Missing or wrong WikiBot static data goes to the human for a WikiBot request; generated data is not edited by correctness agents.

After implementation, run the selected core and parameter tests and every test changed by the case. Require passing comparisons at tolerance `0`, except for a named, source-backed non-zero tolerance documented under the preceding rule. New test/config needs return through the tests stage before further domain changes.

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

