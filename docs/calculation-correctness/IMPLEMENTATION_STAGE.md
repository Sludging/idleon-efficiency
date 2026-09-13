# Implementation stage

## Goal

Make the selected calculation produce the correct game result while preserving its website behavior and integration.

Read the approved local plan, assignment, case working note, and accepted `Tests-stage result`. Use the [testing guide](../TESTING_IMPLEMENTATION.md) for comparison details. Test, config, or coverage corrections return through the tests stage.

## Establish the implementation boundary

1. Confirm the accepted tests-stage result establishes a selected failure with passing direct parameters and coverage of the planned behavior. An already-green result proceeds to review without implementation.
2. Follow the approved ownership, interface, character semantics, and integration approach. Reuse source findings; investigate further when needed for the implementation. Material design changes return for [human approval](PLAYBOOK.md#2-plan-and-obtain-human-approval).
3. Keep direct dependencies in their own cases. A missing or failing calculation used by the selected aspect remains visible in its parameter comparison and returns to the coordinator; this stage changes only the selected calculation.
4. Edit the selected handwritten domain source and the registration or caller needed to integrate that aspect. Test, extraction configuration, and coverage changes return to the tests stage. Generated directories `data/domain/data/`, `data/domain/enum/`, and `data/domain/model/` remain unchanged.

## Change the selected calculation

- Implement the approved design while matching the game's formula, conditions, constants, numeric representation, composition, and operation order. Preserve registrations, callers, and the `init → parse → calculate` flow.
- For a missing selected implementation, add the game behavior identified by its failing core test and connect the comparison to the implemented calculation through the tests stage where test changes are needed.
- Keep tolerance at `0`. Resolve last-bit differences by matching delivered multiplication and composition order rather than changing the comparison.
- If the change requires a new test, parameter, extraction value, or test/configuration correction, stop domain editing and return the finding to the tests stage. A changed extraction configuration or explicit human direction triggers the coordinator's extraction procedure before new results are used.

## Verify the selected result

1. Reuse the same real save and matching extraction results used by the tests-stage comparisons. A new extraction is conditional on its documented trigger.
2. Run every named targeted core and direct-parameter test affected by this case, including each changed comparison. Record the exact command and observed result. Report an unchanged-configuration technical failure as that failure.
3. Confirm that the selected result, all direct parameter comparisons, and every test changed by the case pass at tolerance `0`. Keep a failing direct dependency visible; it prevents a green implementation result.
4. Return `READY_FOR_REVIEW` only when the selected implementation and targeted tests are complete and green. The coordinator then assigns a fresh reviewer; this stage does not approve its own work.

Return `REPORT` for bounded incomplete work, `EXTRACTION_NEEDED` only after a required configuration change or explicit human direction, `BLOCKED` for a concrete dependency, missing static WikiBot fact, or external prerequisite, and `NEEDS_HUMAN` for an interpretation, scope, or ownership question. Include factual `Findings/note updates`, every `Changed paths` entry, exact `Tests` results, one `Question`, and one `Next` action in the worker return contract.
