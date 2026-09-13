# Domain Calculation Testing Guide

## Goal

Use tests to determine whether a domain calculation matches the game and, when it does not, which calculation needs correction. Expected values come from the game; tests exercise the domain code used by the application.

For a supervised correctness case, the assigned stage defines which work may be done. The tests stage writes and runs tests before domain changes. The coordinator then uses those results to decide whether to assign implementation, handle a dependency, or request human input.

## Core tests and parameter tests

A **core test** compares the public result of the selected domain/aspect calculation with its extracted game value. Choose tests for distinct behaviors or branches, or a representative set of input values. Testing every value can be reasonable when the set is small, such as about ten values.

A **parameter test** compares a calculation directly used by the selected aspect with its extracted game value. Include every such calculation from another domain/aspect, including another aspect in the same domain. Keep the comparison even when that calculation has its own core test.

Static data and trivial helpers are not parameter-test targets. Calculations used only inside a dependency belong to that dependency's tests. For example, when the selected aspect uses `Rate`, test `Rate` as its parameter; the inputs used only to calculate `Rate` belong to the rate aspect.

A **branch** is a condition that changes the selected calculation's behavior, such as using a different formula or returning zero until an unlock. Changing an index is not by itself a new branch: check whether the game applies a different rule or the same rule to another value.

Core tests check the selected result; parameter tests help distinguish an error in that result from an error in a calculation it uses. Passing parameter tests are useful results, not failures that need to be created for test-first work.

The [real examples below](#examples-from-existing-tests) show these distinctions in Tome and Cooking tests.

## Prepare the comparisons

1. **Establish game behavior.** Read the relevant delivered game source for the version under review. Identify the selected result, its conditions, and the calculations it uses. Use existing findings and source links where available.
2. **Locate the domain code and tests.** Match each game calculation to the domain method and test that check it, or record that the implementation is missing. Ask the human if the meaning or owning domain/aspect is unclear.
3. **Choose extraction values.** Each core or parameter comparison needs an entry in `tests/configs/`. Use the game function and arguments, or game value, used by the selected calculation. Each entry should support a comparison.
4. **Obtain any new expected values.** Add or correct config entries for required values not yet configured, then request extraction. With unchanged config and usable results, continue with the existing save and results. Extraction also runs when the human requests it.
5. **Write and run the tests.** Use the matchers below and record the actual commands and results before changing domain code. Missing calculations should produce explicit failures.

The [extraction helper guide](../tests/helpers/README.md) explains runtime prerequisites, the active-player requirement, config/output formats, and the batch command:

```bash
node tests/helpers/extract-all-game-data.js
```

In a supervised correctness case, follow the [plan approval step](calculation-correctness/PLAYBOOK.md#2-plan-and-obtain-human-approval) before changing tests or extraction configs. Use the approved scope and interface. The coordinator runs extraction and returns the result to the worker. Use new results after the command succeeds. For a technical failure with unchanged valid config, report the concrete error and any human action needed.

## Compare the same game state

The batch command refreshes `tests/fixtures/saves/latest.json` and writes extracted values under `tests/results/`. Use that save and its corresponding results together. Existing files can be reused while the config is unchanged. Keep test state based on the real save; do not manufacture save values or derive expected results from domain code.

Use these existing matchers:

- Parameter comparisons: `toMatchLiveGame`, with tolerance `0`.
- Core comparisons: `toMatchLiveGameWithDetails`, with `{ tolerance: 0, ... }` and useful calculation details.

When a domain result uses a fixed conversion of the game value, convert the extraction value only when delivered game code establishes that conversion. Explain it in the config description. Match the game's formula and operation order when small numeric differences occur.

State which values and branches the real save exercises. If a needed behavior cannot be observed with the available data, ask the human about coverage rather than claiming it was tested.

## Read the test results

| Result | What it establishes and what follows |
| --- | --- |
| Core test fails; parameter tests pass | The selected calculation needs correction. An explicit error for a missing selected implementation also establishes this. |
| A parameter test fails or its calculation is missing | A calculation used by the selected aspect needs separate work. Keep its failing comparison and report the dependency. |
| Core and parameter tests pass | The existing behavior passes these comparisons. Proceed to review of the result and coverage. |
| Setup fails before the selected assertions run | No calculation result was checked. Address a clear test/config problem or report the external prerequisite. |

For a missing implementation, keep an active test whose extractor reports the missing calculation and game function signature. If it is the selected calculation, that failure can support implementation after the tests-stage approval. If it is another aspect's calculation, preserve the failing parameter test while that dependency is handled.

Keep required comparisons active. Skipping them, substituting guessed values, or changing tolerance to hide failures does not establish correctness. Missing or wrong WikiBot static data goes to the human for a WikiBot request; generated data is not edited by correctness agents.

After implementation, run the selected core and parameter tests and every test changed by the case. Require passing comparisons at tolerance `0`. New test/config needs return through the tests stage before further domain changes.

## Test files and commands

Use core files named `<aspect>.test.ts` and parameter files named `<aspect>-parameters.test.ts` under `tests/domains/<domain>/`. A calculation with no parameter calculations needs only its core test file. `tests/utils/parameter-test-config.ts` defines the table-driven parameter test fields; existing loader helpers read game results and the save.

Run the selected files while working:

```bash
yarn test tests/domains/<domain>/<aspect>.test.ts
yarn test tests/domains/<domain>/<aspect>-parameters.test.ts
```

Run the second command when the parameter file exists. [tests/README.md](../tests/README.md) describes optional coverage annotations and reports.

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

