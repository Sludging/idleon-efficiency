# Calculation Correctness Playbook

This playbook is the lifecycle for one backend calculation case. The coordinator handles one selected case and never selects or works on another case.

## Purpose and terms

- A **domain** is a backend area, such as Cooking or Research.
- An **aspect** is one named calculation area inside a domain, such as Cooking speed, Cooking meal bonuses, Research Grid bonuses, or Research XP gains. A single bonus inside an aspect remains part of that aspect.
- A **correctness case** is one aspect with a wrong or missing result, tracked by one GitHub issue.
- A **human** is the person supervising the case and accepting or aborting it.
- A **dependency** is another calculation that has or should have its own core test. A dependency consumed by the selected aspect can pause this case; it does not start another case here.

Use these sources in this order:

1. Delivered game code for the game version under review defines the formula, composition, branches, and branch-specific rules.
2. A fresh extraction from the running game supplies expected values.
3. The Idleon Wiki may explain player-facing meaning.
4. Repository domain code is the implementation under test; inspect it after the game code for comparison.
5. Nearby code is used only to confirm the established `init → parse → calculate` mechanics.

## Case flow

Perform these five actions in order. The coordinator owns each handoff and stops when an action reports a blocker or a question.

### 1. Start one selected case

The human supplies one GitHub issue naming one domain and aspect. The coordinator confirms that issue as the selected case and does not select another issue.

Run `GET http://localhost:3100/status`:

```bash
curl -fsS http://localhost:3100/status
```

Proceed only when the response contains `cdpConnected: true`, `injected: true`, and `gameReady: true`. Otherwise, report `BLOCKED` to the human and do not extract data.

After status passes, run the unconditional fresh full extraction:

```bash
node tests/helpers/extract-all-game-data.js
```

Require a successful command. It refreshes `tests/fixtures/saves/latest.json` and writes batch results under `tests/results/`. Run it at every case start, even when those files already exist. If it fails, report `BLOCKED` to the human and do not diagnose.

### 2. Diagnose from delivered game code

The diagnoser runs `GET http://localhost:3100/game-version` and uses the returned version exactly:

```bash
curl -fsS http://localhost:3100/game-version
```

If `docs/game-snippets/<domain>/<FunctionName>.<version>.js` exists for that version, the diagnoser reads the entire snippet, not one branch. If it does not exist, the diagnoser follows [`docs/game-snippets/README.md`](../game-snippets/README.md) to capture the entire function from its declaration through its return and save the versioned snippet before analysis.

The diagnoser lists the aspect's formula used when no branch-specific condition applies, every branch that changes the named aspect, each calculation the aspect consumes, and each missing WikiBot static fact. Only after reading the game code, the diagnoser inspects tests and domain code to locate the implementation under test and confirm `init → parse → calculate`.

If game behavior, whether a branch belongs to this aspect, whether a called calculation needs its own core test, or a required static fact is unclear, the diagnoser asks the human one precise question or reports `BLOCKED` with the missing fact. It does not fill a gap with an assumption.

### 3. Implement through the testing guide

The implementer follows [`docs/TESTING_IMPLEMENTATION.md`](../TESTING_IMPLEMENTATION.md) for extraction configuration, core and parameter tests, matchers, and the red-green sequence. This playbook does not repeat those mechanics.

The implementer changes the selected aspect while preserving `init → parse → calculate`. If extraction keys change, the coordinator reruns the full extraction before tests use its result. No role edits `data/domain/data/`, `data/domain/enum/`, or `data/domain/model/`.

### 4. Review independently

The coordinator dispatches review after the implementer reports passing tests. A **fresh reviewer** is a new reviewer invocation with no prior conversation.

The fresh reviewer compares the implementation with the delivered game code and exact-version snippet, fresh extraction results, every branch named in diagnosis, existing registrations and behavior, and the established `init → parse → calculate` mechanics. The reviewer runs the targeted tests and returns `PASS`, `CHANGES_REQUIRED`, `BLOCKED`, or `NEEDS_HUMAN` with concrete findings.

`PASS` goes to the human for acceptance. `CHANGES_REQUIRED` goes back to the implementer with the findings, followed by another fresh review. If the same finding remains after one correction, or game meaning is unclear, stop and ask the human.

### 5. Resolve or block

When review passes and the human accepts, the coordinator follows the completion rule below. When the diagnoser, implementer, or reviewer reports a blocker, the coordinator pauses this case and applies the dependency or WikiBot rule below. The coordinator never starts the blocked calculation as a second case.

## Dependencies and WikiBot

The diagnoser, implementer, or reviewer may report a dependency. When the selected aspect consumes a dependency that is wrong or missing, the coordinator pauses the case and searches all issue states:

```bash
gh issue list --state all --search '<domain> <aspect> in:title' --json number,title,state
```

Compare titles exactly with `Correctness: <domain> — <aspect>`. The coordinator reuses exactly one open exact match. Multiple open exact matches or any closed exact match require `NEEDS_HUMAN`. With no exact match, the coordinator creates the blocker with the title and body required by the role contract, links it to the active issue with GitHub's native `blocked_by` dependency, and confirms the parent reports the link. Follow [`docs/agents/issue-tracker.md`](../agents/issue-tracker.md) for the link operation and its unsupported-endpoint fallback. Authentication, permission, or transient failures require `NEEDS_HUMAN`; do not claim an unconfirmed link. Record the resume condition, post a checkpoint, and stop without starting the blocker case.

When the diagnoser, implementer, or reviewer reports missing WikiBot static data, the coordinator records the exact fact and why it is needed. The human requests that fact in the WikiBot repository; no idleon-efficiency blocker issue is created. Resume after the human supplies the data and the tests can use it.

## Checkpoints

A checkpoint is a comment on the active GitHub issue. The coordinator posts one only after diagnosis, before a context reset, when blocked, when ready for review, or at completion. Render this exact Markdown template, replace every placeholder, and add no fields. Pass the rendered body to the Bash tool in the environment variable `CHECKPOINT`, then run:

```md
## Checkpoint — <date>
### Case
- Issue: #<number>
- Aspect: <domain> / <aspect>
- Phase: start | diagnose | implement | review | blocked | resolve

### Established facts
- <fact with its game-code, extraction, test, or issue reference>

### Work recorded
- <files, tests, configuration, results, or `none`>

### Blocker
- none | <specific missing prerequisite or decision>

### Resume
- <one exact next action or command>
```

```bash
gh issue comment <number> --body "$CHECKPOINT"
```

The newest checkpoint and the issue body must let a fresh session perform the listed resume action without reconstructing prior discussion.

## Completion

The coordinator may close a case only when the aspect's core test and every test changed or added by the case pass against the fresh full extraction at tolerance `0`, an independent fresh review returns `PASS`, and the human accepts the result. The coordinator posts the completion checkpoint and closes the issue through [`docs/agents/issue-tracker.md`](../agents/issue-tracker.md).

If the human aborts, the coordinator records `Outcome: aborted` in `Work recorded`, posts a checkpoint, and closes the issue through the same documented flow. It does not describe the case as reviewer-approved.
