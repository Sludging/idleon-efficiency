# Calculation Correctness v0 Playbook

This is the repository's only active method for checking a backend calculation against the running game. GitHub decision [#335](https://github.com/Sludging/idleon-efficiency/issues/335) defines the semantic reset, and this playbook defines how a worker applies it.

## Purpose and the testing system

This playbook exists to make our backend calculations match the real game. It is an incremental and iterative approach to discover domain code that produces values that aren't aligned with the game, identify why the code isn't correct (for example: due to game updates changing the formula, or a parameter that feeds this calculation now being incorrect) and work through the problem towards making the test green.

This process both provides us with an approach to keep our domain code up to date with the game code, and a practical way to increase our test coverage so future game updates are easier to handle in a systematic way.

The repository's testing system is the mechanism that is the core of this process, and it has two layers:

- **Core tests** (`tests/domains/<domain>/<aspect>.test.ts`) compare the game's value to our domain calculation. This is the end-to-end layer and is the final math that is generally what end-users are exposed to in the site.
- **Parameter tests** (`tests/domains/<domain>/<aspect>-parameters.test.ts`) compare each parameter which makes up the total of the core calculation test. Every direct input of a calculation is checked, one by one, through a maintained, reviewed extractor.

For more information on the testing methodology, see [testing implementation](../TESTING_IMPLEMENTATION.md).

Both layers compare *our code* against *the running game*. Neither layer can tell you what the formula *should* be — that authority belongs to the delivered game code itself (see "Reading the game formula" under §4). A case is healthy when the game formula's parameter list, the parameter-test suite, and the calculation test all agree on what exists; mismatches between those three lists are the case's real work items.

## Scope

A correctness case covers one public backend calculation in one domain. We call that calculation the **root calculation**. The case begins when the root calculation has a red test result or when the repository confirms that the root calculation is missing. The case ends only after the evidence supports a documented outcome.

The case may use characters, fixtures, assertions, parameter results, and duplicate failure signals as evidence. These items do not create additional roots.

One canonical GitHub issue and its append-only checkpoint comments control the case lifecycle and the resume point. Markdown work items, local manifests, ignored caches, specialist-agent handoffs, and learning trackers do not control a v0 case.

## Required repository mechanics

Keep the repository's existing execution model and testing harness:

- Initialize the domains, finish parsing the save, and then calculate values in dependency order. Parsing must finish before cross-domain calculation begins.
- Never hand-edit generated files under `data/domain/data/`, `data/domain/enum/`, or `data/domain/model/`.
- Use the existing debug transport, declarative extraction configurations and results, same-save domain loading, extraction health checks, exact-capable matchers, main calculation tests, parameter tests, and serialized extraction process.
- Keep one extraction configuration and result artifact per root calculation. Add new targeted parameters to the existing root configuration and regenerate that result set; keep the root parameter tests on that same result file. Do not create a parallel config/result pair solely to preserve an accepted artifact hash. If regeneration changes the result hash or timestamp, record the new artifact, unchanged save hash, and same-session/coherence evidence in the next checkpoint.
- Work on one root calculation at a time. Never guess a formula, hide or skip a failure, or replace observable test output with a worker's description of what probably happened.
- idleon-efficiency owns formula research, save parsing, dependency wiring, extraction configurations, tests, and handwritten domain fixes. WikiBot owns game-code extraction and generated static representations: the generated data repos under `data/domain/data/` (meals, bubbles, cards, items, and similar static game facts). Formula logic is not WikiBot scope — reading formulas from the running game (see §4 "Reading the game formula"), formula research, and all correctness work belong to idleon-efficiency.

The [testing skill](../../skills/testing/SKILL.md), [tests README](../../tests/README.md), and [test helper README](../../tests/helpers/README.md) explain how to run the executable mechanics. They do not replace this lifecycle.

## Canonical case issue

The issue body must state which root calculation is approved, why the case exists, which save and live-extraction pair is accepted, and what conditions close the case. Use this structure:

```md
# Correctness: <backend domain> — <main calculation>

## Root
- Key: <backend domain> / <main calculation>
- Main test: <path, or `missing`>
- Parameter tests: <path, or `missing`>
- Signal: <red current-code run or confirmed missing root; evidence link>

## Accepted baseline
- Pair: <save artifact + extraction artifact identifiers; session/version if known>
- Acceptance: <developer decision or baseline-refresh checkpoint>
- Current-code run: <commit/ref, command, date, red-or-missing result>

## Exit
- <main calculation test exists and is green against this accepted pair>
- <targeted tests changed or added by this case are green>
```

GitHub open or closed state records the lifecycle, and the assignee records the claimant. A human must approve and claim exactly one pending root before work begins. The first work checkpoint must record `ACTIVE`. Do not rewrite the investigation history into the issue body.

## Case lifecycle

### 1. Establish the evidence

Accept one coherent pair consisting of a save and live-game extraction, or reuse the pair already accepted by the issue. Run the relevant current code against that pair. Reuse the existing pair unless at least one of these conditions applies:

- A known game update happened after the pair was captured.
- The root calculation does not have the live values it needs.
- The save and extraction came from different running-game sessions.
- The developer knows that the relevant game state or mechanic changed.

If the pair is more than one month old, ask whether a meaningful change occurred. Age alone does not require a refresh. If a refresh is needed, capture the extraction and save during the same game-ready session. A reported extraction failure stops the refresh. Version 0 does not add a provenance manifest.

### 2. Refresh failure signals only when required

Run the complete domain calculation suite only when you are first forming the intake queue or materially refreshing it. Record red main-test failures and confirmed-missing roots by their shallow root key. Merge duplicate signals into the existing open case. Close a pending case when a refresh shows that it is green.

A parameter-only failure does not create an intake item. A new game version requires a baseline review, not an automatic correctness case. Version 0 does not rank cases or automatically replace one active case with another.

While a case is active, run the selected main test and the targeted parameter tests. Do not refresh the entire queue unless a human requests it or the evidence shows that a material refresh is required.

### 3. Activate one approved root

A human must approve and claim one pending canonical case. The worker must not select or activate a root automatically. The issue or checkpoint must record the approved root, accepted pair, current-code reference, failing command and result, and the human approval.

### 4. Investigate and change the root

First reproduce the approved failure against the accepted pair and current code. Then inspect only the calculated inputs that the root calculation consumes directly. This immediate-input investigation is the default boundary. Do not recursively map every transitive dependency or expand the case based on speculation.

Immediate-input investigation is a defined procedure, not a free-form study:

1. **Locate the existing test surface first.** Find the main calculation test *and* the parameter test file under `tests/domains/<domain>/` before doing anything else. If a parameter test file exists, it is the harness for everything below.
2. **Read the game formula** (see "Reading the game formula") and enumerate its parameters from the game's source, never from our domain code.
3. **Run the parameter tests.** The ledger below is built from their results.
4. **Never recompute parameter values outside the parameter-test harness.** If a needed parameter has no test spec, that absence is the finding (`MISSING`).
- Keep parameter comparisons at the direct-input semantic boundary. Normalize a game representation only when the game source exposes a different representation than the domain parameter (for example, mapping a `0`/`1` completion status to the domain's `0`/`5` bonus). Do not fold root-formula arithmetic into a parameter extraction when the domain extractor already exposes the direct input; the main calculation test owns that composition.

#### Reading the game formula

The second authority in the evidence order — current delivered game code establishes the formula and its composition — is exercised through the debug server, which is part of this repository's testing system:

1. Check the current game version: `GET http://localhost:3100/game-version` (or `idleon.getGameVersion()` through `POST /exec`). Confirm the debug server `/status` reports `cdpConnected: true`, `injected: true`, and `gameReady: true` first.
2. **If `docs/game-snippets/<domain>/<FunctionName>.<version>.js` already exists for the current version, read the formula from the snippet.** The snippet is the reviewed, version-pinned record of what the running client computes; live retrieval is only for capturing a snippet that does not exist yet. The version check is the precondition that makes this safe — a stale snippet answers the wrong question.
3. Otherwise capture it: `POST /exec` with `idleon.findFunction("<FunctionName>")` to locate the ActorEvents script, then `window.frames[0].__idleon_cheats__["scripts.ActorEvents_<N>"]["_customBlock_<FunctionName>"].toString()` to retrieve the whole function.
4. Save the **entire** function (all branches, not just the one under investigation) under `docs/game-snippets/<domain>/<FunctionName>.<version>.js`, with a metadata header stating the function name, source script, game version and patch title, capture date, and case reference. The source body stays verbatim; never hand-edit it. If a snippet for that function and version already exists and the new capture differs, that is a finding — version drift — to report, not to overwrite silently.
5. Read the branch for the calculation under investigation (e.g. the `"CookingSPEED" == e` branch of `CookingR`) and enumerate its parameters from that source.

`docs/game-snippets/` is a formula-research record owned by idleon-efficiency. It is not WikiBot static data (see §7).

#### Human review gate

After reproduction and immediate-input inspection, stop and request human review. Do this before writing semantic tests, changing extraction configurations, changing implementation or extraction code, or taking any action that expands the approved scope.

The review request must state all of the following in complete terms:

- What failure was observed, including the command and result.
- Which inputs were directly observed and what each value was.
- The parameter ledger, derived from the parameter tests and the game-formula parameter list (see below), not from worker recomputation. State each directly observed input's value and status.
- What action the worker recommends and why.
- What happens if the work remains inside the current root.
- What happens if the dependency is selected as a separate root instead.
- One specific decision that the human must make.

After the human decides, use this action cycle: propose one bounded action, receive the decision, perform that action, report the observed result, and write a checkpoint containing one exact next command or source to open. The worker must not silently decide uncertain scope.

The root's main test owns the public calculated output. Targeted parameter tests may cover only the approved direct-calculation frontier that helps explain that output. A raw save or live-game field may provide fixture context or establish a coherent pair, but it is never a correctness-test target. Comparing one copy of a raw field with another copy tests data plumbing, not the formula.

The evidence has the following order of authority:

1. Live extraction establishes the expected value for the accepted snapshot.
2. Current delivered game code establishes the formula and its composition.
3. Repository code is the implementation under test.
4. A test is executable evidence, but it is not an infallible oracle.

For every parameter of the root calculation, cross-reference the game formula's parameter list against the parameter-test suite and record one status in the root checkpoint:

- `GREEN` — the parameter has a parameter test and it passes against the accepted extraction.
- `RED` — the parameter has a parameter test and it fails (narrowed mismatch: we know which input is wrong).
- `MISSING` — the game formula contains a parameter with no parameter test, no extraction expression, or no domain implementation. A `MISSING` parameter is a coverage gap and, if the parameter is an independently testable public calculation, a dependency boundary under §6.

A parameter whose extraction fails or whose evidence is unavailable is not a fourth status: it is an extraction failure handled by the §5 stop rules.

Use formula research, save parsing, dependency wiring, extraction configurations, tests, and handwritten domain fixes when the approved root requires them. Durable code, tests, and commits provide repository proof. The checkpoint records the facts established so far and the next exact action.

### 5. Stop safely when work cannot continue

Stop and write a `BLOCKED` checkpoint immediately when any of the following conditions occurs:

- Required evidence or decision authority is missing.
- The accepted baseline is not coherent.
- Primary sources conflict.
- The next action is irreversible or high impact and requires approval.
- The work would leave the approved root.
- The game reports an extraction failure.
- The instructions require an unsafe or contradictory action, cannot preserve a resumable state, cannot identify a safe next action, or require work outside the root.
- A required WikiBot delivery is not available.

An immediate stop takes precedence over another retry. Otherwise, if two materially different attempts at the same next action produce no new fact and do not reduce uncertainty, write a `BLOCKED` checkpoint and ask the human.

`BLOCKED` is a normal and resumable outcome. The checkpoint must preserve the exact next action, source or command, missing decision, and responsible owner. `ABORTED` is exceptional. Use it only when the supervised process is unsafe or unusable, and record the reason and the last safe resume point in the terminal checkpoint.

A blocker pauses the same case. Abort the case only when the methodology is unsafe or insufficient under the stated conditions, and record that reason in the terminal checkpoint.

### 6. Route newly discovered problems

Merge a signal for the active root into that case. A backend main calculation that is independently red or missing returns to pending intake as its own root; the worker must not activate it from diagnosis. A green dependency does not create new coverage work.

Raw save and live-game fields are context only, and they are never correctness-test targets. If a directly consumed input is itself an independently testable public calculation, it is a dependency boundary that requires human scope review. A `RED` or `MISSING` dependency may stay in the active case only when the human explicitly keeps it there. Otherwise, checkpoint the current root as `BLOCKED` and leave the dependency for separate human selection and activation.

Use the same human-gated decision for shared and independent dependencies. Do not silently absorb a dependency, create coverage for a green dependency, or route a red or missing dependency into the active root without an explicit decision.

A supporting child issue is allowed only when both conditions are true:

1. The work crosses an ownership or authority boundary and needs its own asynchronous history.
2. The child has an independently specified and verifiable artifact that the root can consume.

A child issue is not a second root and is not an authoritative ledger.

### 7. Respect the WikiBot boundary

When required static facts are missing or stale, take these actions:

1. Mark the canonical root `BLOCKED`.
2. Put the semantic request on that root. Include the canonical case link, exact accepted version, whether the request is to `supply` or `refresh`, the missing facts and their evidence, and the criterion that lets the consumer resume.
3. Notify the designated WikiBot owner through the existing channel. The notification is only a transport mechanism, not another tracker.

Do not prescribe WikiBot files, symbols, classes, types, keys, extraction methods, or representations. Do not edit generated output.

WikiBot must return either an accessible immutable producer revision tied to the accepted baseline, with the facts it covers and its limits, or an explanation of why it cannot deliver and which prerequisite or decision is needed. A delivery is only a candidate until idleon-efficiency consumes it. When work resumes, the root checkpoint must record the producer revision, consumer revision, and successful semantic and version validation. A partial, inaccessible, late, stale, or wrong-version delivery leaves the case blocked.

Formula research, save parsing, and backend correctness remain owned by idleon-efficiency. They never transfer to WikiBot. WikiBot's "generated static representations" are the generated data repos under `data/domain/data/` — static game facts, not formula logic. Reading formulas from the running game and keeping `docs/game-snippets/` are idleon-efficiency work (see §4).

### 8. Compare results and resolve the case

Every new or changed comparison must use tolerance `0`. Do not change existing comparisons throughout the repository during one case. If a non-zero tolerance affects the active root, close the case only when evidence shows that game behavior or floating-point evaluation order requires it. Otherwise, stop and ask the human.

Resolve the case only when the root main test and every targeted test changed or added by the case are green against the accepted pair and current-code reference. Append the final checkpoint, include the terminal learning block, and then close the canonical root issue. Observable test results are the completion evidence.

## Checkpoints

Write a checkpoint at session handoff, when evidence or authority stops the work, when the case resolves, or when the case aborts. Do not write one after every command.

Use this format:

```md
## Checkpoint — <date> — ACTIVE | BLOCKED | RESOLVED
- Baseline/current code: <pair and commit/ref, or `unchanged from issue body`>
- Last observed result: `<exact command>` → <red/green/missing summary>

### Established facts
- <Complete statement of a fact> — <game-code, live-extraction, or test evidence link/reference>

### Parameter ledger
- GREEN — <parameter, its parameter test, and the passing evidence>
- RED — <parameter, its failing parameter test, and the narrowed mismatch>
- MISSING — <game-formula parameter with no parameter test, extraction expression, or implementation>

### Work recorded
- <Commits, files, configurations, tests changed, or `none`>

### Resume
- Next: <one concrete action, including the first command or source to open>
- Stop/ask: <missing evidence or authority and its owner; otherwise `none`>
```

Append checkpoints instead of rewriting them. The newest checkpoint together with the stable issue body must let another worker resume without repeating the investigation.

## Terminal learning block

Every resolved or aborted case must end its final root checkpoint with this block:

```md
### Learning
- Outcome: resolved | aborted
- What held: <method that worked>
- What failed or caused friction: <observed failure or friction>
- Candidate learning: <possible methodology change>
- Evidence needed for promotion: <repeated or independent corroboration required>
- Promotion status: candidate
```

The canonical root issue is the only candidate-learning record. A later, separate, human-reviewed decision may change the methodology. That decision must name the corroborating cases and the exact instruction change.
