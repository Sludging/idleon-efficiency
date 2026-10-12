# Implementation stage

## Goal

Make the selected calculation produce the correct game result while preserving its website behavior and integration.

Read the approved local plan, assignment, case working note, and accepted `Tests-stage result`. Use the [testing guide](../TESTING_IMPLEMENTATION.md) for comparison details. Test, config, or coverage corrections return through the tests stage.

## Establish the implementation boundary

1. Confirm the accepted tests-stage result establishes a selected failure with passing direct parameters and coverage of the planned behavior. An already-green result proceeds to review without implementation.
2. Follow the approved ownership, interface, character semantics, and integration approach. Reuse source findings and focused evidence. If additional game-source, caller, debug-server, or Wiki evidence is needed, delegate it to `correctness-researcher` rather than investigating directly. Material design changes return for [plan approval](PLAYBOOK.md#2-plan-and-obtain-approval).
3. Keep direct dependencies in their own cases. If a direct parameter comparison fails, or its website result is missing so comparison cannot be made, return that observed result to the coordinator; this stage changes only the selected calculation. A passing producer comparison needs no further investigation for this case.
4. Edit the selected handwritten domain source and the registration or caller needed to integrate that aspect. Test, extraction configuration, and coverage changes return to the tests stage. Generated directories `data/domain/data/`, `data/domain/enum/`, and `data/domain/model/` remain unchanged.

## Change the selected calculation

- Implement the approved design while matching the game's formula, conditions, constants, numeric representation, composition, and operation order. Preserve registrations, callers, and the `init → parse → calculate` flow.
- For a missing selected implementation, add the game behavior identified by its failing core test and connect the comparison to the implemented calculation through the tests stage where test changes are needed.
- Keep tolerance at `0` for the normal path. Resolve last-bit differences by matching delivered multiplication and composition order rather than changing the comparison. A source-backed semantic difference returns through tests under the [exception procedure](PLAYBOOK.md#non-zero-tolerance-exceptions).
- If the change requires a new test, parameter, extraction value, or test/configuration correction, stop domain editing and return the finding to the tests stage. When extraction is needed, the coordinator follows the [extraction procedure](PLAYBOOK.md#extraction-when-needed).

## Verify the selected result

1. Reuse the same real save and matching extraction results used by the tests-stage comparisons. A new extraction is conditional on its documented trigger.
2. Run every named targeted core and direct-parameter test affected by this case, including each changed comparison. Record the exact command and observed result. Report an unchanged-configuration technical failure as that failure.
3. For the normal path, confirm that the selected result, all direct parameter comparisons, and every test changed by the case pass at tolerance `0`. Report a source-backed bounded comparison separately and identify the unmet zero-tolerance gate. Keep a failing direct dependency visible; a failure outside the documented bound prevents a ready result.
4. Return `READY_FOR_REVIEW` when the selected implementation and targeted tests are complete and green at tolerance `0`, or a [documented source-backed bound](../TESTING_IMPLEMENTATION.md#documented-non-zero-tolerances) is ready for independent review under the [exception procedure](PLAYBOOK.md#non-zero-tolerance-exceptions). Identify bounded results and unmet normal gates; `READY_FOR_REVIEW` does not make them green. The coordinator assigns a fresh reviewer.

Return `REPORT` for bounded incomplete work, `EXTRACTION_NEEDED` only after a required configuration change or explicit human direction, `BLOCKED` for a concrete dependency, missing static WikiBot fact, or external prerequisite, and `NEEDS_HUMAN` for an interpretation, scope, or ownership question. Include factual `Findings/note updates`, every `Changed paths` entry, exact `Tests` results, one `Question`, and one `Next` action in the worker return contract.
