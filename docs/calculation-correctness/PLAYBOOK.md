# Calculation Correctness Playbook

## Goal

Make the selected domain/aspect match the game through an interface and implementation that fit the website.

## Terms and sources

- A **domain** is a backend area, such as Cooking or Research.
- An **aspect** is one named calculation across its supported inputs and behavior. One bonus, index, or failing value remains part of that aspect.
- A **case** is one selected domain/aspect tracked by a GitHub issue. Its implementation may be correct, wrong, or missing.
- A **dependency** is another domain/aspect calculation used directly by the selected aspect.

Delivered game code defines formulas, conditions, representation, and operation order. Extracted game values supply expected results. Domain code is the implementation under test. The Wiki helps explain player-facing meaning; it does not override game evidence. The [testing guide](../TESTING_IMPLEMENTATION.md) defines core tests, parameter tests, and branches.

## Approval authority

The human is the **approver** by default and directs progression, decisions, and recording. A human may explicitly delegate one selected case to a supervising session. Record the delegation and its bounds in the Case working note. Within those bounds, that session may approve plans and material in-scope changes, manage execution sessions and records, and accept normal completion. A session name grants no authority. Delegated normal acceptance needs no additional human acceptance.

The human selects cases and scope extensions. The human decides unclear source, meaning, policy, tolerance exceptions, waivers, aborts, and findings that remain after one correction. Pause for those decisions. Ordinary sessions execute assigned stages; they do not acquire approval authority by executing them.

Read the current plan before work. Plan approval never waives [coding standards](../../CODING_STANDARDS.md). Send material plan changes to the approver. Changes after review require verification and fresh independent review before acceptance.

## Process

### 1. Establish the selected case

Read the selected issue, its Case working note, and recorded decisions. Identify the result, direct dependencies, and open questions. Begin with planning. On resume, read the plan and its approval: continue a draft or resume the established approved stage. After a dependency is fixed, run the selected tests to determine whether the case can continue.

Reuse existing snippets, configs, real saves, and matching results. Missing tests or a missing selected implementation are valid case findings. Follow the [shared research rule](../../AGENTS.md#research-specialists) before exploratory research. Run extraction only under the [next-step table](#4-use-the-test-results-to-choose-the-next-step).

### 2. Plan and obtain approval

Assign `Stage: planning`. Follow [mechanic and website usage](#understand-the-mechanic-and-its-website-usage) for focused verification of the mechanic, website consumers, and selected examples. Existing tests may run, and specialists may gather further evidence. Leave domain code, tests, and extraction configs unchanged until approval is recorded.

Keep one plan at `.omp/plans/correctness-<issue-number>.md` with:

- **Status:** `draft` or `approved`; record approval only after the approver accepts the current proposal.
- **Scope:** behavior to deliver and exclusions.
- **Website design:** owning domain, public interface, caller example, and account-wide or per-character behavior.
- **Implementation approach:** applicable existing examples, why they fit, deliberate differences, direct dependencies, and pipeline changes.
- **Verification:** game results to compare and known coverage limits.

Keep simple cases short. An unchanged interface needs its existing usage and intended correction, not a redesign. Check that required static data exists and evidence supports the design.

Return `PLAN_READY` for approval. Record the decision before assigning tests. Approval does not replace the [implementation prerequisites](#4-use-the-test-results-to-choose-the-next-step).

Every execution and review session reads the plan directly. Keep design in the plan and progress in the Case working note. Retain the plan while active or blocked. If it is missing on resume, re-establish it and obtain approval before changes.

Return `NEEDS_HUMAN` when evidence requires changing scope, ownership, public interface, character semantics, or materially weakening agreed verification. Include the proposed change and reason. Keep the approved plan unchanged until the decision. Send in-scope material revisions to the approver and scope extensions to the human; record approval before updating the plan. Internal choices and added tests within approved scope need no renewed approval.

### 3. Establish tests before changing domain code

Follow the [tests stage](TESTS_STAGE.md). Establish core comparisons and every directly used cross-domain/aspect parameter comparison. Record exact commands and observed results, source/domain locations, coverage, and open questions.

Write tests and extraction config, not domain code. Before implementation, accept and record the tests-stage result under the table below. A missing selected implementation may produce an explicit core failure. A command that fails before reaching selected tests does not establish a calculation failure.

### 4. Use the test results to choose the next step

Use the [numeric comparison policy](../TESTING_IMPLEMENTATION.md#numeric-comparison-policy) to interpret comparisons. Normal comparisons need no exception procedure or special human acceptance.

| Result | Next step |
| --- | --- |
| `EXTRACTION_NEEDED`: required config changed or human requested extraction | Follow the extraction procedure, then resume tests. |
| `TESTS_READY`: core fails or selected implementation is missing; all direct parameter comparisons pass normally | Confirm plan approval and accept the tests-stage result before implementation. |
| `TESTS_READY`: core and all direct parameter comparisons pass normally | Review selected behavior and coverage. |
| `BLOCKED`: direct parameter comparison fails or its website result is missing; missing WikiBot fact or external prerequisite | Record blocker and resume condition; follow the dependency procedure where applicable. |
| Setup/extraction error prevents selected tests from running | Repair a clear test/config problem in tests; send external prerequisites to the human. |
| `NEEDS_HUMAN`: meaning, scope, mapping, or owning aspect is unclear | Ask the question and pause. |
| A larger-bound override is proposed or used | Follow the exception procedure. |
| Domain edits preceded tests-stage acceptance, or order cannot be established | Record known facts and ask the human how to proceed. |
| `REPORT`: stage incomplete or no meaningful selected failure established | Continue that stage from reported progress, narrow its task, or ask the human. |

### 5. Implement and review

Follow the [implementation stage](IMPLEMENTATION_STAGE.md). Preserve the selected calculation's `init → parse → calculate` integration and run targeted tests. New test/config or coverage needs return through tests before further domain edits.

Send `READY_FOR_REVIEW` to a fresh independent read-only session under [independent review](#independent-review). A case with passing core and parameter tests also needs that review.

- `PASS` goes to the approver for acceptance.
- Proposed larger-bound overrides follow the exception procedure.
- `CHANGES_REQUIRED` returns specific findings for correction. Test/config or coverage changes go to tests first. Implementation corrections may proceed when their failing test is already established. Review the corrected final result again.
- A blocker or unanswered question pauses the case. Ask the human if the same finding remains after one correction.

### 6. Complete the case

Normal completion requires the approved plan, passing selected core and parameter tests, and passing every test changed by the case. All comparisons must use the normal configuration in the [numeric comparison policy](../TESTING_IMPLEMENTATION.md#numeric-comparison-policy). Fresh independent review must cover final changes and return `PASS`. The approver must accept the result after reading the plan, final code, tests, reviewer findings, and website consumer fit.

Only the human may direct an exception, waiver, or abort. Record the decision, actual verification, omitted gates, remaining limits, and outcome in the case issue. Distinguish **normal completion**, **human-directed exception**, and **human abort**. State whether review passed, ran but remained incomplete, or did not run. Close under [issue-tracker guidance](../agents/issue-tracker.md).

After acceptance or abort, delete the local plan and research file. No archive is required. Keep reusable versioned game snippets and historical issue records.

### Non-zero tolerance exceptions

A larger-bound override needs the [testing guide's technical justification](../TESTING_IMPLEMENTATION.md#documented-non-zero-tolerances). Record the proposed bound and evidence in the Case working note. Keep plan approval and tests-stage prerequisites in force. A pass with that override follows exception completion, not normal completion.

Obtain fresh independent review of the final implementation and proposed bound. After completing independent checks, return `NEEDS_HUMAN`, not `PASS`, with findings, defects, and unmet normal gates. Unexplained differences, unsupported bounds, and out-of-bound comparisons remain failures with their defect or dependency status.

Present the reviewed exception to the actual human, including when a supervising session is the approver. Only the human may accept it. Record the decision, retained bound, and review outcome as **human-directed exception**.

## Understand the mechanic and its website usage

Follow the [shared research rule](../../AGENTS.md#research-specialists) and reuse the existing handoff. Specialists own broad discovery. Read focused sources and code to verify findings and guide implementation. Game source defines the calculation, not website class structure or raw-save design.

Inspect selected consumers and researched examples to verify ownership, public interface, and character semantics. The game evaluates its active character; the website represents all characters. Use explicit-player or per-player patterns when results depend on a character. Resolve unclear meaning or material design choices with the human rather than copying game structure.

Apply [coding standards](../../CODING_STANDARDS.md) to plans, recommendations, implementation, and review. Keep comments near non-trivial calculations, conditions, or mappings. Explain the mechanic and relevant interaction, not obfuscated identifiers. Existing examples illustrate patterns, not blanket approval of their code.

## Independent review

Use a fresh session that did not implement the case. Review is read-only and does not close the issue. Read the approved plan, Case working note, work/result, and any prior findings. Use findings to locate evidence, not as proof. Follow the [shared research rule](../../AGENTS.md#research-specialists) before further exploratory research; perform the focused independent checks below yourself.

Perform these checks in order:

1. **Game behavior:** Check versioned [source](../game-snippets/README.md#rules), implementation, and callers. Verify conditions, representation, formula, composition, and operation order independently.
2. **Named results:** Run targeted tests named in work/result with paired real save/results. Apply the linked numeric policy. Independently check any proposed bound's source-backed justification; separate exception results from normal-policy failures.
3. **Core coverage:** Check distinct behaviors, branches, or representative values through the public result. State what the real save exercises. Unobserved branches are coverage limits, not defects when agreed coverage is met.
4. **Direct parameters:** For every directly used cross-domain/aspect calculation, check game call, website result, and paired parameter test. Request missing required tests. A passing comparison ends investigation of that dependency. A failure or missing result follows the dependency procedure.
5. **Website fit and standards:** Check approved scope, ownership, interface, character semantics, and actual consumers. Verify registrations, callers, and pipeline order. Compare relevant named aspects of selected examples and apply coding standards independently of plan approval. Check mechanic explanations and required handling against supported inputs, interfaces, and behavior. State integration behavior actually covered.
6. **Test-first evidence:** Check the recorded tests-stage result and acceptance before domain edits. Mark `satisfied`, `violated`, or `not established`. Later green tests do not repair missing or violated history.

Return `PASS` only when all normal technical checks pass. Return `CHANGES_REQUIRED` for concrete implementation/test defects, missing required coverage, unapproved departures, integration regressions, or missing mechanic explanations. Identify affected code and requirement. Return `BLOCKED` for unavailable prerequisites or failing/missing direct parameter results. Return `NEEDS_HUMAN` for missing approval, changes to approved design, broken design/integration requiring an approver decision, unresolved meaning/scope/ownership, or a qualifying reviewed exception. Return `REPORT` for incomplete review or missing test-first history requiring routing. Separate defects, unmet gates, and saved-data limits.

## Extraction when needed

Reuse `tests/fixtures/saves/latest.json` and matching `tests/results/` while required config is unchanged and the pair remains usable. Add or correct a missing required entry, then extract. Extraction requires a necessary config change or human request.

Use the [helper guide](../../tests/helpers/README.md#quick-start---batch-extraction) for commands, server selection, save refresh, and active-player prerequisites. Record command, server mode, effective `GAME_SERVER_URL`, result paths, and whether the save refreshed. Establish [save/result pairing](../TESTING_IMPLEMENTATION.md#keep-tests-tied-to-the-real-save) before using new results.

Report extraction errors, artifacts already changed, and required human actions. If unchanged valid config has missing output from loss or failure, explain the condition and ask for refresh direction.

## Dependencies and WikiBot

Investigate a dependency only when its direct parameter comparison fails or its website result is missing, preventing comparison. Record the calculation, game call, domain location or missing status, and observed result. A passing comparison ends investigation: do not trace that dependency's internals or upstream dependencies. Report incidental suspicions as non-blocking human notes.

A failing call identifies a separate named-calculation case, not a case limited to that index/value. For example, failing `getEpilogueBonus(1)` leads to **Correctness: Tome — epilogue bonus (<version>)** across supported indices and conditions. Record index 1 as observed failure. Tome score remains a different aspect. Core tests select representative behaviors; parameter tests cover directly used calculations.

Search all issue states by domain/aspect and version. Use `Correctness: <domain> — <aspect> (<version>)`. Establish running version with `GET /game-version` under [snippet rules](../game-snippets/README.md#rules); ask the human if unclear. Inspect unversioned legacy matches and establish their version from notes/evidence.

- Reuse exactly one open same-version issue. Rename an unversioned open issue only when its version is established.
- Leave closed legacy titles unchanged. Ask the human about closed same-version matches, multiple open matches, or unknown/conflicting legacy versions.
- Another version is not a match; do not reopen its issue for this case.
- With no same-version match, create an issue containing domain/aspect, test paths or missing status, parent case, command/result, source, and the calculation needed to resume. Apply this playbook's completion gates to that case.

Link and verify native `blocked_by` under [issue-tracker guidance](../agents/issue-tracker.md). Use body-link fallback only when native dependencies are unsupported; report other failures to the human. Pause the selected case until its dependency is ready rather than starting another case.

Send missing/wrong static facts to the human for a WikiBot repository request. Record the fact and why it is required. Static data is not a parameter target or website dependency issue. Leave generated `data/domain/data/`, `data/domain/enum/`, and `data/domain/model/` unchanged.

## Assignments and progress

Use existing phase prompts with `Issue`, `Domain/aspect`, `Stage`, `Plan`, `Case note`, and `Task`. Stages are `planning`, `tests`, `implementation`, and `review`. Include the research path. Implementation receives accepted `Tests-stage result`; corrections receive `Findings`; review receives `Work/result` and `Prior findings` when present. Report conflicts with the plan before proceeding.

Keep one execution/review assignment active per case. Research runs within that stage, not as another approval gate. Return a result before assigning the next stage. Continue a useful execution context or resume from the working note in a fresh context. Keep final technical review independent. Record decisions and route results under the next-step table; do not repeat execution research or tests except required extraction, independent review, or human direction.

Use these result fields once for every stage:

- **Status:** `PLAN_READY`, `REPORT`, `EXTRACTION_NEEDED`, `TESTS_READY`, `READY_FOR_REVIEW`, `PASS`, `CHANGES_REQUIRED`, `BLOCKED`, or `NEEDS_HUMAN`, as applicable above.
- **Stage:** assigned stage.
- **Findings/note updates:** source checks, coverage, defects, limits, approval/test-first evidence, and concrete updates.
- **Changed paths:** every changed path; review lists paths actually reviewed from work/result, or `none`.
- **Tests:** exact commands and observed results, or `not run — <reason>`.
- **Question:** `none`, or one precise decision needed.
- **Next:** one exact next action.

## Local game research

Follow the [shared research rule](../../AGENTS.md#research-specialists) within the selected stage. Keep case research at `.omp/research/correctness-<issue-number>.md`, separate from plan and Case working note. Reuse that local uncommitted file across execution and review sessions. Link it from phase prompts and the note without copying its contents. Delete it with the plan at closure; retain reusable versioned snippets.

## Website pattern research

Follow the [shared research rule](../../AGENTS.md#research-specialists) and [implementation patterns guide](../agents/implementation-patterns.md) for backend design choices. Follow the guide's UI route only for UI planning or changes.

## Shared case working note

Maintain one issue comment headed **Case working note**:

- **Plan and approver:** plan path/status, approver, explicit delegation bounds when present, and decisions.
- **Findings:** versioned source, behavior, domain locations or missing calculations, and parameter/test links.
- **Tests and changes:** coverage, config/extraction status, commands/results, tests-stage acceptance, test-first evidence, changed paths, and review outcome.
- **Blockers and next step:** questions, prerequisites, and exact next task.

Return factual updates through the shared result fields. Update the comment before another assignment, when blocked, and before a context reset. Preserve historical comments. Keep enough context to resume without the previous conversation; link evidence rather than copying plans or research. Simple cases need short notes.
