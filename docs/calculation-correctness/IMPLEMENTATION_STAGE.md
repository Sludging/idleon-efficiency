# Implementation stage

## Goal

Make the selected calculation produce the correct game result while preserving its website behavior and integration.

Read the approved local plan, assignment, case working note, and accepted `Tests-stage result`. Apply the [numeric comparison policy](../TESTING_IMPLEMENTATION.md#numeric-comparison-policy) to every comparison in this stage. Test, config, or coverage corrections return through the tests stage.

## Establish the implementation boundary

1. Check the accepted tests-stage result against the [implementation prerequisites and next-step table](PLAYBOOK.md#4-use-the-test-results-to-choose-the-next-step). Return a result that belongs to another stage to the coordinator.
2. Follow the approved ownership, interface, character semantics, and integration approach. Reuse source findings and focused evidence. If additional game-source, caller, debug-server, or Wiki evidence is needed, delegate it to `correctness-researcher` rather than investigating directly. Material design changes return for [plan approval](PLAYBOOK.md#2-plan-and-obtain-approval).
3. Keep direct dependencies in their own cases. If a direct parameter comparison fails, or its website result is missing so comparison cannot be made, return that observed result to the coordinator; this stage changes only the selected calculation. A passing producer comparison needs no further investigation for this case.
4. Edit the selected handwritten domain source and the registration or caller needed to integrate that aspect. Test, extraction configuration, and coverage changes return to the tests stage. Generated directories `data/domain/data/`, `data/domain/enum/`, and `data/domain/model/` remain unchanged.

## Change the selected calculation

- Implement the approved design while matching the game's formula, conditions, constants, numeric representation, composition, and operation order. Preserve registrations, callers, and the `init → parse → calculate` flow.
- For a missing selected implementation, add the game behavior identified by its failing core test and connect the comparison to the implemented calculation through the tests stage where test changes are needed.
- Investigate comparison failures by matching delivered multiplication and composition order rather than widening the comparison. Return a proposed tolerance exception through tests under the [exception procedure](PLAYBOOK.md#non-zero-tolerance-exceptions).
- If the change requires a new test, parameter, extraction value, or test/configuration correction, stop domain editing and return the finding to the tests stage. When extraction is needed, the coordinator follows the [extraction procedure](PLAYBOOK.md#extraction-when-needed).

## Verify the selected result

1. Reuse the same real save and matching extraction results used by the tests-stage comparisons. A new extraction is conditional on its documented trigger.
2. Run every named targeted core and direct-parameter test affected by this case, including each changed comparison. Record the exact command and observed result. Report an unchanged-configuration technical failure as that failure.
3. Report selected core, direct parameter, and changed-test results. Separate any proposed exception-bound results from normal-policy results, and identify unmet normal gates under the exception procedure above. Keep a failing direct dependency visible.
4. Apply the [implementation-to-review transition](PLAYBOOK.md#5-implement-and-review) before returning `READY_FOR_REVIEW`. Include the final implementation and named verification results for the coordinator's fresh reviewer assignment.

Return `REPORT` for bounded incomplete work, `EXTRACTION_NEEDED` only after a required configuration change or explicit human direction, `BLOCKED` for a concrete dependency, missing static WikiBot fact, or external prerequisite, and `NEEDS_HUMAN` for an interpretation, scope, or ownership question. Include factual `Findings/note updates`, every `Changed paths` entry, exact `Tests` results, one `Question`, and one `Next` action in the worker return contract.
