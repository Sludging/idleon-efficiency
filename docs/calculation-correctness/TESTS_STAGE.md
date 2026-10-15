# Tests stage

## Goal

Determine whether a mismatch comes from the selected calculation or a directly used calculation.

Write tests and extraction config, not domain code. Read the approved plan, phase prompt, and Case working note. Use the [testing guide](../TESTING_IMPLEMENTATION.md) for test conventions and comparison mechanics. Follow the [shared research rule](../../AGENTS.md#research-specialists) before exploratory research; use focused evidence to verify the comparisons below.

## Establish the selected calculation

1. Use approved scope, interface, and ownership. Locate the selected calculation and every calculation it uses directly. Inputs used only inside a dependency belong to that dependency's case.
2. Establish inputs, conditions, representation, formula, and operation order from delivered game code under [snippet version rules](../game-snippets/README.md#rules).
3. Map direct calculations to domain implementations or explicit missing status. Expose a missing selected implementation as a core failure. Report dependencies only for failing direct parameter comparisons or missing website results that prevent comparison. A passing comparison ends investigation of that dependency; report incidental suspicions as non-blocking notes.
4. Return material plan changes under [plan approval](PLAYBOOK.md#2-plan-and-obtain-approval). Do not change the interface to make tests fit.

## Coverage target

Use the [core and parameter definitions](../TESTING_IMPLEMENTATION.md#core-tests-and-parameter-tests):

- Parameter tests compare every directly used cross-domain/aspect calculation, including other aspects in the same domain. Exclude static facts, trivial helpers, raw save plumbing, and dependency internals.
- Core tests compare the selected public result for the paired real save. Choose meaningful observed behaviors, branches, or representative inputs. Explain gameplay effect and website result checked. State actual save coverage and unobserved limits.

Use real-save evidence, not synthetic saves, altered branch inputs, or expected values derived from domain code. Raise unresolved coverage questions. Record selected result, direct parameters, core coverage, and questions.

## Build and run the comparisons

1. Locate and reuse existing configs, tests, saves, and results under the [pairing rule](../TESTING_IMPLEMENTATION.md#keep-tests-tied-to-the-real-save).
2. Give every expected core and parameter value an extraction entry with its exact delivered-game expression/value. A WikiBot fact alone is not a calculation comparison. After required config changes, return `EXTRACTION_NEEDED` with changed path and command from the [helper guide](../../tests/helpers/README.md#quick-start---batch-extraction). Follow the [extraction procedure](PLAYBOOK.md#extraction-when-needed); report unchanged-config failures as concrete technical errors.
3. Write active comparisons under the [numeric comparison policy](../TESTING_IMPLEMENTATION.md#numeric-comparison-policy). Preserve delivered representation and source-backed conversions. For missing selected implementations, keep active failure scaffolding naming the calculation and game function signature. After implementation, call the typed public API directly; remove guards, `unknown` casts, and `.call` wrappers through this stage. Keep failing direct parameters visible with game call and domain location or missing status.
4. Run every targeted test file. Record exact commands and observed results. Keep edits within selected tests/config; leave generated data unchanged under the playbook.

## Result classification and completion

Classify observed results:

- **Selected-core failure:** selected mismatch or explicit missing implementation; all direct parameters pass normally.
- **Dependency failure:** direct parameter fails or its missing website result prevents comparison. Return evidence under the [dependency procedure](PLAYBOOK.md#dependencies-and-wikibot).
- **Setup/extraction failure:** config, save/result pairing, game access, mapping, or command setup prevents meaningful comparison. Name the in-scope repair or external prerequisite.
- **Already green:** core and every direct parameter pass normally.
- **Proposed human exception:** report bound results separately from normal-policy failures under the [exception procedure](PLAYBOOK.md#non-zero-tolerance-exceptions).
- **No meaningful selected failure:** no mismatch or explicit missing selected implementation was established.

Return `TESTS_READY` with completed coverage, actual results, changed paths, and classification. Return `EXTRACTION_NEEDED` after required config changes or human extraction direction. Use `BLOCKED` for qualifying dependencies, missing WikiBot facts, or external prerequisites; `NEEDS_HUMAN` for unresolved interpretation, scope, mapping, or ownership; `REPORT` for incomplete work.

Use the playbook's [shared result fields](PLAYBOOK.md#assignments-and-progress) and [next-step table](PLAYBOOK.md#4-use-the-test-results-to-choose-the-next-step). `TESTS_READY` alone never authorizes domain edits.
