# Tests stage

## Goal

Establish whether the selected calculation matches the game and whether an observed mismatch comes from that calculation or a directly used calculation whose parameter comparison fails or cannot be made because its website result is missing.

This stage writes tests and extraction config, not domain code. Read the approved local plan, assignment, and case working note, then the [testing guide](../TESTING_IMPLEMENTATION.md) for comparison mechanics. Use existing source findings and focused captured evidence; delegate missing game-source, caller, debug-server, or Wiki evidence to `correctness-researcher`. Follow [source capture guidance](../game-snippets/README.md) when more evidence is needed.

## Establish the selected calculation

1. Use the approved scope, public interface, and ownership. Locate the selected calculation and each calculation it uses directly. Direct means an immediate calculation used by the selected result; inputs used only inside that calculation belong to its own case.
2. Establish the selected behavior from delivered game code: its inputs, conditions, formula, and operation order. Use the findings already recorded and inspect focused source evidence captured by the researcher, following the [snippet version rules](../game-snippets/README.md#rules).
3. Map every direct calculation to its domain implementation or an explicit missing status. A missing selected implementation is a selected-core failure to expose. Report a dependency only for an observed failing direct parameter comparison, or a missing website result that prevents the comparison. A passing comparison ends investigation of that producer for this case; the playbook's dependency boundary prohibits tracing its internal formula or upstream dependencies. Record any incidental suspicion for the human as non-blocking.
4. If evidence calls for a material change to the plan, return the proposed change and reason under the [plan approval rule](PLAYBOOK.md#2-plan-and-obtain-approval). Do not choose a different interface to make the tests fit.

## Coverage target

Use the [testing guide](../TESTING_IMPLEMENTATION.md) for definitions and examples. For this case:

- Parameter tests compare every calculation used directly across domains/aspects by the selected aspect, including another aspect in the same domain. Static data, trivial helpers, raw save plumbing, and inputs used only by dependencies are outside this selected coverage.
- Core tests compare the selected result for the paired real save. Choose meaningful observed behaviors or representative inputs, and describe the gameplay effect and website result being checked. State what the save actually exercises; unobserved permutations remain uncovered. Do not synthesize saves, alter inputs to simulate branches, or derive expected values from domain code. Raise coverage questions rather than inventing data.

Record the selected result, parameter calculations, chosen core tests, and any coverage question in the stage result.

## Build and run the comparisons

1. Locate existing extraction configuration, tests, save, and result files before adding anything. Reuse a usable real save with its matching extraction results. Refresh extraction only after a required configuration change or explicit human direction; never manufacture save state.
2. Ensure each expected core and parameter value has an extraction entry using the exact delivered-game expression or value. Add or correct required entries; a WikiBot static fact alone is not a calculation comparison. After a configuration change, return `EXTRACTION_NEEDED` with the changed path and the extraction command for the coordinator. An unchanged-configuration technical extraction/output failure is reported as that concrete failure.
3. Add or update active core and parameter tests with the testing guide's matchers and tolerance `0`. Compare the paired real save with its matching extraction values, preserve the delivered representation and any conversion established by game code, and describe the mechanic rather than obfuscated identifiers. For a missing selected implementation, temporary failure scaffolding keeps the core path active and names the missing calculation and game function signature. Once implemented, call the typed public API directly and remove guards, `unknown` casts, and `.call` wrappers. Report a dependency only for an observed failing direct parameter comparison, or a missing website result that prevents comparison; keep any failing comparison visible and report the game call and domain location or missing status.
4. Run every targeted test file for this aspect. Record each exact command and observed result. Keep test changes within the selected aspect; generated directories `data/domain/data/`, `data/domain/enum/`, and `data/domain/model/` remain unchanged.

## Result classification and completion

Classify the observed test results as one of these:

- **Selected-core failure:** the selected result mismatches the game or its implementation is explicitly missing, while every direct parameter comparison passes.
- **Dependency failure:** an observed direct parameter comparison fails; preserve it and pause this case. The same dependency route applies when its website result is missing and the comparison cannot be made. A passing comparison does not trigger producer or upstream investigation; follow the [playbook dependency boundary](PLAYBOOK.md#dependencies-and-wikibot).
- **Setup/extraction failure:** configuration, matching save/results, game access, test mapping, or command setup prevented a meaningful comparison. State the concrete in-scope repair or external prerequisite.
- **Already green:** core and all direct parameter comparisons pass at tolerance `0`; proceed to review.
- **No meaningful selected failure:** no selected mismatch or explicit missing implementation was established.

Return `TESTS_READY` after the coverage, exact commands and results, changed paths, and one classification are complete; this status does not imply green or authorize domain edits. Return `EXTRACTION_NEEDED` when a required configuration entry changed or the human directed extraction. Return `BLOCKED` for a qualifying direct dependency issue, missing static WikiBot fact, or external prerequisite. Return `NEEDS_HUMAN` for an unresolved interpretation, scope, mapping, or ownership question. Return `REPORT` while bounded work remains. The coordinator uses the classification to choose implementation, review, dependency handling, repair, or human direction. A green result hands off to review of the selected calculation's source/behavior, website implementation and consumers, and direct-parameter mapping; it does not reopen investigation of a passing producer.
