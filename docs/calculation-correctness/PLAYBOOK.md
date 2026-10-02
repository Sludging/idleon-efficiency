# Calculation Correctness Playbook

## Goal

Ensure the selected domain/aspect produces correct game results through an interface and implementation that fit the website.

## Terms and sources

- A **domain** is a backend area, such as Cooking or Research.
- An **aspect** is one named calculation within a domain. It covers that calculation's supported inputs and behavior; a single bonus, index, or failing value remains part of the aspect.
- A **case** is one selected domain/aspect tracked by a GitHub issue. Its implementation may be correct, wrong, or missing.
- A **dependency** is another domain/aspect calculation used directly by the selected aspect.

Delivered game code defines the formula, conditions, and operation order. Extracted game values provide expected test results. Domain code is the implementation being tested; the Wiki can help explain player-facing meaning. The [testing guide](../TESTING_IMPLEMENTATION.md) defines core tests, parameter tests, and branches, with examples.

## Approval authority

The **approver** is the human by default. When a human explicitly asks
`correctness-supervisor` to run one selected issue, the supervisor is the
approver for that case. The supervisor approves the plan and material changes
within the approved scope, then accepts the normal result. The coordinator
records `Approver: human` or `Approver: supervisor` in the existing Case
working note.

The human selects the case and any scope extension. Ask the human about unclear
source, policy, or meaning. The human decides exceptions, waivers, aborts, and
the same finding after one correction. The coordinator manages stages, timers,
research, extraction, dependency recording, the working note, plan approval,
and closure. The supervisor reviews and sends decisions, then continues through
closure. A fresh correctness reviewer remains technically independent.
Supervisor acceptance is normal acceptance; it needs no additional human
acceptance.

Read the current plan before work. Send material plan changes to the approver.
Changes after review require verification and a fresh review before acceptance.

## Process

### 1. Establish the selected case

The coordinator reads the selected issue, its current Case working note, and recorded decisions. Identify the result to check and any known dependencies or questions. Begin with planning. On resume, read the current plan and its approver: continue planning if it is a draft, or resume the established stage if it is approved. After a dependency is fixed, run the selected tests to establish whether the case can continue.

Use existing snippets, test configs, saves, and results where available. A missing test or domain implementation is something the case can establish and address. Workers and reviewers obtain missing game-source evidence through `correctness-researcher` when source capture is needed. The coordinator runs extraction only when the next-step table requires it. Follow [snippet guidance](../game-snippets/README.md) through the researcher to capture missing source; ask the human if the game version or meaning under review is unclear or source/policy evidence conflicts.

### 2. Plan and obtain approval

Assign `Stage: planning` to the worker. The planning worker inspects game behavior, website consumers, and comparable domain implementations before proposing the design. If game-source or runtime evidence is missing, it delegates that work to `correctness-researcher`. Existing tests may be run, and focused source evidence may be gathered through the researcher; domain code, tests, and extraction configs remain unchanged until the coordinator records approval.

Keep one plan at `.omp/plans/correctness-<issue-number>.md`. Include:

- **Status:** `draft` or `approved`. Only the coordinator records approval after the approver approves the current proposal.
- **Scope:** behavior to deliver and what is excluded.
- **Website design:** owning domain, public interface and a caller example, including account-wide or per-character behavior where relevant.
- **Implementation approach:** existing pattern to follow, important dependencies, and any pipeline changes. If website pattern research applies, name and cite the existing code examples you used. Explain why each fits. State any deliberate differences.
- **Verification:** results to compare against the game and known coverage limits.

Keep simple cases short. An unchanged interface needs only its existing usage and the intended correction, not a redesign.

The worker returns `PLAN_READY` when the proposal is ready. The coordinator presents it to the approver and waits for approval or requested changes before assigning tests. The coordinator records the decision. Plan approval does not replace the tests-stage prerequisites for implementation.

Every worker and reviewer reads the plan directly. Keep progress and results in the issue's Case working note, with the plan path; do not duplicate the plan there. Keep the file while the case is active or blocked. If it is missing on resume, re-establish the plan and obtain approval before further changes.

If new evidence requires changing scope, ownership, public interface, character semantics, or materially weakening agreed verification, return `NEEDS_HUMAN` with the proposed change and reason. Keep the approved plan unchanged until the approver decides. The coordinator sends material in-scope changes to the approver and scope changes to the human, then updates the plan before work resumes. Internal implementation choices and additional tests within the approved scope do not need renewed approval.

### 3. Establish tests before changing domain code

The worker follows the [tests stage](TESTS_STAGE.md). Its result should show:

- Parameter tests for every calculation the selected aspect uses from another domain/aspect, including another aspect in the same domain.
- Core tests for selected behaviors, branches, or representative values.
- Actual test commands and results, identifying a selected calculation failure, dependency failure, setup problem, or passing result.
- Findings, relevant source and domain locations, and any question needing a human decision.

During this stage, write tests and extraction config, not domain code. The coordinator checks that the selected tests ran before domain changes and that the results support the next step. An explicit failure for a missing selected implementation is valid; a command that fails before reaching the selected tests has not established a calculation failure.

### 4. Use the test results to choose the next step

| Result | Next step |
| --- | --- |
| `EXTRACTION_NEEDED`: config changed or human requested extraction | Run the extraction procedure below, then resume tests. |
| `TESTS_READY`: core test fails or selected implementation is missing; all direct parameter comparisons pass | Accept the tests-stage result and assign implementation. |
| `TESTS_READY`: core and all direct parameter comparisons pass | Assign review of the selected behavior and test coverage. |
| `BLOCKED`: a direct parameter comparison fails, or a missing website result prevents that comparison; missing WikiBot fact or external prerequisite | Record the blocker and resume condition; follow the dependency procedure where applicable. |
| Setup or extraction error prevents the selected tests from running | Address a clear test/config problem in the tests stage; report an external prerequisite to the human. |
| `NEEDS_HUMAN`: game meaning, scope, or which aspect implements a calculation is unclear | Ask the question and pause. |
| Domain changes preceded the tests-stage approval, or the order cannot be established at review | Record what is known and ask the human how to proceed. |
| `REPORT`: stage is incomplete | Use the reported progress to continue the same stage, narrow the next task, or ask the human. |

Implementation requires an approved plan, a selected calculation failure, and passing direct parameter comparisons.

### 5. Implement and review

The worker follows the [implementation stage](IMPLEMENTATION_STAGE.md): correct the selected calculation, preserve its `init → parse → calculate` integration, and run the targeted tests. New test/config needs return through the tests stage before further domain changes.

A `READY_FOR_REVIEW` result goes to a fresh reviewer. The reviewer uses the case findings to locate the relevant game source, domain code, and tests, then independently checks the selected behavior and coverage. See the [reviewer instructions](../../.omp/agents/correctness-reviewer.md).

- `PASS` goes to the approver for acceptance.
- `CHANGES_REQUIRED` returns to the worker with the specific findings. Test/config or coverage changes go to tests first. An implementation correction can proceed when its failing test is already established. Review the corrected result again.
- A blocker or unanswered question pauses the case. If the same finding remains after one correction, ask the human for direction.

### 6. Complete the case

Normal completion requires implementation of the approved plan; the selected core and parameter tests, and all tests changed by the case, to pass at tolerance `0`; a fresh independent review covering the final changes to return `PASS`; and acceptance by the approver. Changes after review need verification and a fresh review of the changed behavior before normal completion.

The human may accept an exception or abort. The supervisor may not waive a gate, accept an exception, or abort. Record what was completed, what was verified, and any omitted step. Close the issue using [issue-tracker guidance](../agents/issue-tracker.md), then record the outcome using [pilot guidance](PILOT.md). Iteration two is reviewed after five distinct closed cases, including resolved and aborted outcomes.

After acceptance or abort, delete the local plan and local research file. No archive is required; reusable versioned game snippets remain.

## Extraction when needed

Reuse `tests/fixtures/saves/latest.json` and existing results under `tests/results/` while the extraction config is unchanged. For a required value not yet configured, add or correct its config entry and extract. Run extraction after a config change or human request.

Before extraction, require `GET http://localhost:3100/status` to report `cdpConnected: true`, `injected: true`, and `gameReady: true`. Follow the [runtime prerequisites and active-player policy](../../tests/helpers/README.md), then run:

```bash
node tests/helpers/extract-all-game-data.js
```

Use new results after the command succeeds. The batch refreshes the save and values together. Report a failed extraction's concrete error and any human action needed. If an unchanged valid config has missing output because files were lost or extraction failed, explain the condition and ask for refresh direction.

## Dependencies and WikiBot

Investigate a dependency when its direct parameter comparison fails or its website result is missing, preventing comparison. A passing comparison ends dependency work for this case. Record the named calculation, game call, domain location or missing status, and observed test result. The failing call explains why a separate case is needed; its particular index or value does not define that case's scope. Ask the human when the calculation boundary or owning domain/aspect is unclear.

For example, a failing `getEpilogueBonus(1)` comparison for game version `<version>` leads to **Correctness: Tome — epilogue bonus (<version>)**. Record index 1 as the observed failure, while the case addresses the epilogue bonus calculation across its supported bonus indices and conditions. Other Tome calculations, such as score, remain separate dependencies.

Case scope and test selection serve different purposes: the case covers the whole named calculation, while core tests still use selected behaviors or representative values and parameter tests cover its directly used calculations.

Search all issue states by domain/aspect and version. Use the title `Correctness: <domain> — <aspect> (<version>)`, where `<version>` is the game version under examination. When checking the running game, use `GET /game-version` as specified in [snippet guidance](../game-snippets/README.md#rules); if the version is unclear, ask the human. Inspect unversioned legacy issues for the same domain/aspect and establish their version from the Case working note or linked evidence. Reuse exactly one open issue for the same version. If it is an unversioned legacy issue with a clearly established version, update its title in place to the versioned format and reuse it. Issues for another version are not matches and must not be reopened for this case. Leave closed legacy issue titles unchanged; a closed issue for the same version requires human direction. Multiple open same-version matches, or an unversioned legacy issue with an unknown or conflicting version, also require human direction. With no same-version match, create an issue with the versioned title and include the domain/aspect, test paths or missing status, parent case, command/result, source reference, and the calculation needed for the parent to resume. Completion follows the same test, review, and acceptance requirements as the selected case.

Link the issue using the native `blocked_by` procedure in [issue-tracker guidance](../agents/issue-tracker.md) and verify the link. Use its body-link fallback only when native dependencies are unsupported; report other failures for human help. Pause the selected case until its dependency is ready rather than starting another case.

Missing or wrong WikiBot static data goes to the human for a request in the WikiBot repository. Record the needed fact and why the calculation needs it. Static data is not a parameter-test target or an idleon-efficiency dependency issue. Correctness agents must not edit generated directories `data/domain/data/`, `data/domain/enum/`, or `data/domain/model/`.

## Assignments and progress

Each assignment includes `Issue`, `Domain/aspect`, `Stage`, `Plan` (local path), `Case note`, and `Task`. Stages are `planning`, `tests`, `implementation`, and `review`. Implementation also receives the accepted `Tests-stage result`; corrections include `Findings`. Review adds `Work/result` and any `Prior findings`. The plan, not a handoff summary, defines the agreed design; report conflicting instructions to the coordinator before proceeding.

Each stage returns a result before the coordinator assigns the next stage. Keep a focused worker conversation when useful, or start a fresh worker from the case working note after a long investigation, blocker, or context reset. The coordinator follows its [ten-minute supervision procedure](../../.omp/agents/correctness-coordinator.md#ten-minute-supervision) for every worker/reviewer assignment.

## Local game research

Workers and reviewers delegate game-source discovery, in-game caller investigation, debug-server command exploration, and needed Wiki lookup to `correctness-researcher`, using its cheaper model. This helper can run within any current stage; it is not a new stage or approval gate. The assigning agent owns its helper's completion and stops it before returning a stage result or timed report.

Keep research in `.omp/research/correctness-<issue-number>.md`, separate from the Case working note and approved plan. Pass the issue, domain/aspect, this path, and concrete questions to the researcher. Reuse the file across workers and reviewers; delegate additional discovery when information is missing. Read focused evidence directly to interpret or verify it. Workers and reviewers do not perform broad game-file searches or exploratory debug-server or Wiki investigation themselves.

The file holds source-backed facts, game version, relevant function and in-game caller evidence, optional Wiki context, reproducible debug-server commands, and unresolved gaps. Link reusable captures under `docs/game-snippets/` rather than duplicating whole functions. Distinguish observed runtime values from source facts and Wiki descriptions. It supplies evidence, not website design decisions or a correctness verdict.

The coordinator links the research path in assignments and the Case working note without copying its contents. Keep it local and uncommitted while the case is active or blocked, then delete it with the plan at closure.

## Website pattern research

During planning, ask `correctness-pattern-researcher` to find existing code before adding or changing domains, classes, saved-data handling, or public methods. Give the helper the proposed change and the questions you need answered. A formula correction that keeps the same code structure and public methods does not need a helper call.

For backend implementation choices, use the [implementation patterns guide](../agents/implementation-patterns.md) to select named examples and aspects. For UI choices, use its UI route only when the correctness change includes UI planning or changes. Resolve uncovered choices and conflicts using the guide's selection policy.

## Shared case working note

Maintain one issue comment headed **Case working note** with the current information needed to continue:

- **Plan and approver:** local plan path and status; the approver and decision.
- **Findings:** relevant game source/version, established behavior, domain locations or missing calculations, and links between parameters and tests.
- **Tests and changes:** coverage choices, config/extraction status, commands/results, tests-stage approval, and changed paths.
- **Blockers and next step:** unanswered questions, missing prerequisites, and the next task.
- **Process observations:** useful events for the pilot, when any occurred.

Workers and reviewers return updates with their results. The coordinator updates the comment before another assignment, when blocked, and before a context reset. Preserve historical comments; this note supplies the current starting point. Include enough detail to continue without the previous conversation, with short explanations and links to supporting files or results. A simple calculation needs a short note.
