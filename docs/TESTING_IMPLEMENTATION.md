# Domain Calculation Testing Guide

## Overview

Use this guide when adding or changing a test for any domain calculation. Tests compare editable domain code with values extracted from the delivered IdleOn game. The guide covers core-versus-parameter test choice, game-code-first extraction configuration, normalization, test-state limits, missing implementations, and targeted test execution.

`tests/helpers/README.md` owns debug-server prerequisites, extraction configuration and output formats, and save refresh details. `tests/README.md` owns coverage tracking.

## Reasoning and terminology

A **core test** compares the public result of a domain calculation. A **parameter test** compares one calculation consumed by that result. A calculation that has or should have its own core test owns that core test; it may also be tested as a parameter of a consuming calculation, including a consumer in the same domain, when the comparison can isolate the consumer's formula or branch. Trivial helpers do not need duplicate parameter tests.

Choose a parameter test only when its isolated game value can distinguish a producer, branch, or composition error in the core comparison. Do not mirror every transitive input. The delivered game code defines formulas, constants, branches, and branch-specific rules; extraction results provide expected values; domain code is the implementation under test.

## TDD sequence

For every domain calculation test, work in this order:

1. **Choose the calculation from delivered game code.** Read the entire delivered function from declaration through return and identify the public result for the core test plus any producer values whose isolated comparison can diagnose that result.
2. **Create or update the extraction config.** Add game expressions for the values compared by the core and useful parameter tests. Do not derive expected values from domain code.
3. **Run the full batch extraction.** Run `node tests/helpers/extract-all-game-data.js` so the save and results come from one fresh extraction.
4. **Write the tests.** Add the core test and only useful parameter tests, using the fresh extraction results.
5. **Run the targeted tests and observe red before changing domain code.** An unexplained failure is a reason to inspect the game expression, test mapping, and domain path—not to skip the test.
6. **Implement or change the domain calculation.** Preserve the delivered game's formula, branches, constants, and operation order.
7. **Run the targeted tests again and require green results at tolerance `0`.** Keep every test active; do not weaken a comparison to hide a failure.

## Paths and responsibilities

- `tests/configs/` — extraction JSON built from delivered game functions.
- `tests/domains/<domain>/` — core tests named `<aspect>.test.ts` and parameter tests named `<aspect>-parameters.test.ts`.
- `tests/utils/parameter-test-config.ts` — parameter-test specifications.
- `tests/utils/live-game-data-loader.ts` and `tests/utils/cloudsave-loader.ts` — extraction-result and save loading helpers used by tests.
- `tests/helpers/README.md` — debug server, extraction commands, configuration schema, output format, and save refresh mechanics.
- `tests/README.md` — coverage annotations and coverage reporting.

## Mechanics and rules

### Choosing core and parameter tests

Put the calculation's public result in a core test. Add a parameter test when comparing the producer separately can distinguish whether a failure comes from that producer or from the consuming formula. This includes a calculation that has or should have its own core test when it is consumed by another aspect in the same domain. Use one calculation file when there are no meaningful inputs to isolate; add a `-parameters.test.ts` file when separate producer comparisons provide that isolation.
WikiBot static values are game definitions, not calculated parameters; do not add parameter tests or extraction entries solely to compare them—test the calculation consuming static data, and block implementation when data is missing or wrong for the human’s WikiBot request.

### Building extraction configs

Read the entire delivered function from declaration through return before writing its config, including its signature, arguments, constants, branches, and composition. Use expressions that call the game functions or read the game values that the function itself uses. Add no extraction entry that is not compared by a core or parameter test. For WikiBot static values, extract only data consumed by a tested calculation, never an entry solely for static-value comparison.

If the game returns a raw representation and domain code applies a fixed conversion, normalize the extraction expression to the domain's output only when the delivered function establishes that conversion. Document the conversion in the extraction description; never infer it from a domain value or an observed match.

### State and comparisons

The full batch extraction refreshes the sole save at `tests/fixtures/saves/latest.json` and writes its results under `tests/results/`. Tests use that save and its matching results; this one-save setup is the available test state. Do not manufacture save state in test setup or add scenarios that do not come from a real game state.

Do not test raw save plumbing by asserting that a parsed save field equals a domain model field. Test formulas and calculations instead.

Use `toMatchLiveGame` for parameter comparisons and `toMatchLiveGameWithDetails` for core comparisons. New and changed comparisons use tolerance `0`. If multiplication order creates a last-bit difference, match the delivered game's operation order rather than adding tolerance.

### Missing implementations and failures

Identify the calculation from delivered game code first, then inspect domain code to locate the implementation under test. When the implementation is absent, keep an active test whose extractor throws an explicit error naming the missing calculation and the game function signature. The test must fail visibly until the domain implementation exists; do not substitute a guessed value.

Never use `it.skip()`, `it.todo()`, `xit()`, test removal, or a tolerance change to suppress a failure. A failing comparison is evidence of a formula, branch, input, or missing-implementation problem to investigate.

### Targeted test commands

Run only the files changed for the calculation while iterating:

```bash
yarn test tests/domains/<domain>/<aspect>.test.ts
yarn test tests/domains/<domain>/<aspect>-parameters.test.ts
```

Run the second command only when the parameter test file exists. Both commands are expected to pass at tolerance `0` after implementation.

## Troubleshooting

### Extraction errors or missing values

Check that each config expression matches the delivered game function's name, arguments, branches, and return representation. Confirm that every test key matches a config label and that the test loads the result produced with the same fresh save. For debug-server readiness, batch extraction, config schema, output shape, and save handling, follow `tests/helpers/README.md` rather than duplicating those procedures here.

### Calculation mismatches

Compare the failing value with the corresponding game expression, then inspect constants, branch conditions, composition order, and normalization. Check the isolated parameter comparison before changing the core formula. Do not resolve a mismatch with tolerance, skipped tests, manufactured state, or a guessed game behavior.

### Missing domain behavior

Read the game function again, including all branches used by the extracted value. Then locate the domain implementation. If it is absent, retain the explicit failing test and implement the missing calculation rather than hiding the failure.

## References and examples

These real files show the same mechanics for different domains and calculations:

| Calculation | Config | Core test | Parameter tests |
| --- | --- | --- | --- |
| Cooking meal bonus | [cooking-meal-bonus.json](../tests/configs/cooking-meal-bonus.json) | [meal-bonus.test.ts](../tests/domains/cooking/meal-bonus.test.ts) | [meal-bonus-parameters.test.ts](../tests/domains/cooking/meal-bonus-parameters.test.ts) |
| Cooking meal speed | [cooking-speed.json](../tests/configs/cooking-speed.json) | [meal-speed.test.ts](../tests/domains/cooking/meal-speed.test.ts) | [meal-speed-parameters.test.ts](../tests/domains/cooking/meal-speed-parameters.test.ts) |
| Sailing speed | [sailing-speed.json](../tests/configs/sailing-speed.json) | [speed.test.ts](../tests/domains/sailing/speed.test.ts) | [speed-parameters.test.ts](../tests/domains/sailing/speed-parameters.test.ts) |

For extraction mechanics, see [`tests/helpers/README.md`](../tests/helpers/README.md). For coverage annotations and reporting, see [`tests/README.md`](../tests/README.md).
