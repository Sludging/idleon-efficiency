# Tests stage

## Goal

Write and run tests that show whether a difference from the game comes from the selected calculation or a calculation it uses. The result determines whether to correct the selected aspect, handle a dependency, address test setup, or review behavior that already passes.

This stage writes tests and extraction config, not domain code. Read the assignment and current case working note, then the [testing guide](../TESTING_IMPLEMENTATION.md) for definitions, examples, and commands. Use existing game source and findings. Follow [source capture guidance](../game-snippets/README.md) when a snippet is needed.

## Establish the selected calculation

1. Confirm the selected domain/aspect and human decisions. Locate its public calculation, website consumers, and each calculation it uses directly, including calculations in another aspect of the same domain. Direct means an immediate calculation used by the selected result; inputs used only inside that calculation belong to its own case. For a missing implementation, use comparable website features and the intended consumers to establish the expected public interface; ask the human when these leave a consequential choice unresolved.
2. Establish the selected behavior from delivered game code: its inputs, conditions, formula, and operation order. Use the findings already recorded and read the source needed to complete or verify them, following the [snippet version rules](../game-snippets/README.md#rules).
3. Map every direct calculation to its domain implementation or an explicit missing status. A missing selected implementation is a selected-core failure to expose. For a missing or failing dependency, report the full named calculation and include the failing call, index, or value as the observed problem. Keep its parameter comparison active; the separate case covers that calculation, not only the failing input.
4. Ask the human one precise question when player-facing meaning, internal mapping, aspect ownership, or scope remains unclear. Record a missing path as a location to find, not as a reason to stop the assignment.

## Coverage target

Use the [testing guide](../TESTING_IMPLEMENTATION.md) for definitions and examples. For this case:

- Parameter tests compare every calculation used directly across domains/aspects by the selected aspect, including another aspect in the same domain. Static data, trivial helpers, raw save plumbing, and inputs used only by dependencies are outside this selected coverage.
- Core tests check selected behaviors or branches, or representative values. Choose comparisons and test descriptions that express the mechanic's observable behavior. Use the testing guide's examples to choose useful comparisons. State what the real save exercises and ask the human if needed behavior cannot be observed.

Record the selected result, parameter calculations, chosen core tests, and any coverage question in the stage result.

## Build and run the comparisons

1. Locate existing extraction configuration, tests, save, and result files before adding anything. Reuse a usable real save with its matching extraction results. Refresh extraction only after a required configuration change or explicit human direction; never manufacture save state.
2. Ensure each expected core and parameter value has an extraction entry using the exact delivered-game expression or value. Add or correct required entries; a WikiBot static fact alone is not a calculation comparison. After a configuration change, return `EXTRACTION_NEEDED` with the changed path and the extraction command for the coordinator. An unchanged-configuration technical extraction/output failure is reported as that concrete failure.
3. Add or update active core and parameter tests with the testing guide's matchers and tolerance `0`. Preserve the delivered representation and any conversion established by game code. For a missing selected implementation, keep the core path active and make its failure name the missing calculation and game function signature. For a missing or wrong direct dependency, keep its parameter comparison failing and report the game call and domain location or missing status.
4. Run every targeted test file for this aspect. Record each exact command and observed result. Keep test changes within the selected aspect; generated directories `data/domain/data/`, `data/domain/enum/`, and `data/domain/model/` remain unchanged.

## Result classification and completion

Classify the observed test results as one of these:

- **Selected-core failure:** the selected result mismatches the game or its implementation is explicitly missing, while every direct parameter comparison passes.
- **Dependency failure:** a calculation used directly by the selected aspect fails; preserve that parameter failure and pause this case.
- **Setup/extraction failure:** configuration, matching save/results, game access, test mapping, or command setup prevented a meaningful comparison. State the concrete in-scope repair or external prerequisite.
- **Already green:** core and parameter comparisons pass at tolerance `0`; proceed to review.
- **No meaningful selected failure:** no selected mismatch or explicit missing implementation was established.

Return `TESTS_READY` after the coverage, exact commands and results, changed paths, and one classification are complete; this status does not imply green or authorize domain edits. Return `EXTRACTION_NEEDED` when a required configuration entry changed or the human directed extraction. Return `BLOCKED` for a concrete dependency, missing static WikiBot fact, or external prerequisite. Return `NEEDS_HUMAN` for an unresolved interpretation, scope, mapping, or ownership question. Return `REPORT` while bounded work remains. The coordinator uses the classification to choose implementation, review, dependency handling, repair, or human direction.
