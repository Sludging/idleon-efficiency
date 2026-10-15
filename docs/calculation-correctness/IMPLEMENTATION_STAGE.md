# Implementation stage

## Goal

Make the selected calculation match the game while preserving website behavior and integration.

Read the approved plan, phase prompt, Case working note, and accepted `Tests-stage result`. Apply the [numeric comparison policy](../TESTING_IMPLEMENTATION.md#numeric-comparison-policy). Test, config, or coverage corrections return through tests.

## Establish the implementation boundary

1. Check accepted tests against the [implementation prerequisites and next-step table](PLAYBOOK.md#4-use-the-test-results-to-choose-the-next-step). Return results that require another stage for routing.
2. Follow approved ownership, interface, character semantics, and integration. Reuse focused evidence and the [research pointers](PLAYBOOK.md#local-game-research). Return material design changes for [plan approval](PLAYBOOK.md#2-plan-and-obtain-approval); approval never waives coding standards.
3. Keep direct dependencies in separate cases. Return failing direct parameter comparisons or missing website results that prevent comparison. Passing comparisons end producer investigation.
4. Edit selected handwritten domain source and required registration/callers only. Test/config and coverage changes return to tests. Leave generated data unchanged under the playbook.

## Change the selected calculation

- Match the game's formula, conditions, constants, representation, composition, and operation order. Preserve registrations, callers, and `init → parse → calculate` integration.
- Implement missing selected behavior established by its failing core test. Return test changes needed to call the implemented typed API through tests.
- Match delivered multiplication and composition order when investigating differences. Route proposed tolerance exceptions through tests under the [exception procedure](PLAYBOOK.md#non-zero-tolerance-exceptions), not wider comparisons without approval.
- Apply [mechanic and website usage guidance](PLAYBOOK.md#understand-the-mechanic-and-its-website-usage), including comments for non-trivial rules and mappings.
- Stop domain editing when new tests, parameters, extraction values, or test/config repairs are needed. Return findings through tests and follow the [extraction procedure](PLAYBOOK.md#extraction-when-needed) when triggered.

## Verify the selected result

1. Reuse the tests-stage real save and matching results. Refresh only under documented extraction triggers.
2. Run every affected targeted core/direct-parameter test and every changed comparison. Record exact commands and observed results. Report unchanged-config technical failures as those failures.
3. Report core, direct-parameter, and changed-test results. Keep failing dependencies visible. Separate proposed exception-bound results, normal-policy results, and unmet normal gates.
4. Return `READY_FOR_REVIEW` under the [review transition](PLAYBOOK.md#5-implement-and-review), with final implementation and named results for fresh independent review.

Use the playbook's [shared result fields](PLAYBOOK.md#assignments-and-progress). Return `REPORT` for incomplete work; `BLOCKED` for dependencies, missing WikiBot facts, or external prerequisites; `NEEDS_HUMAN` for interpretation, scope, or ownership decisions. `EXTRACTION_NEEDED` requires a config change established in tests or explicit human direction.
