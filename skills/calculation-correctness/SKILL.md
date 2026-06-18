---
name: calculation-correctness
description: Methodology for diagnosing and fixing wrong domain calculations and expanding test coverage by recursively validating against live game data
---

# Calculation Correctness Playbook

For the full methodology, read [docs/calculation-correctness/PLAYBOOK.md](docs/calculation-correctness/PLAYBOOK.md).

## When to use

- A domain calculation is wrong or a domain test is failing.
- You want to expand test coverage of an existing calculation.

(For *new* features use [feature-implementation](../feature-implementation/SKILL.md); for the
mechanics of writing one test use [testing](../testing/SKILL.md). This playbook sits above both.)

## Key Reminders

- **Preflight first — run runbooks, do not audit.** Before picking a target, complete the preflight
  gate in `docs/calculation-correctness/PLAYBOOK.md`
- **The test is the oracle.** The only question: does our domain value match the live-extracted
  value? Yes → done. Game code is consulted only to (a) enumerate a calc's real inputs and (b) fix
  a wrong value.
- **Source of truth:** decompiled game code (`$WIKIBOT_ROOT/codefiles/idleon<ver>.txt` for the
  current version) > live extracted values > our domain code (**never**). The repo is out of date —
  never derive inputs or formulas from our own domain code.
- **The loop:** start from `tests/.cache/suite-summary.json`, pick a target → read its real game
  function → enumerate inputs from game code → for each input: no coverage → write a test; green →
  stop; red → recurse. All inputs green but parent red → composition formula is stale → fix it.
- **No deferred fixes.** Every red node (parent or leaf) is chased to root cause.
- **Slow, sequential recovery.** Work one target at a time; the agent split is for context hygiene,
  not parallel throughput. Do not broaden scope unless the developer explicitly chooses that.
- **Two failure classes only:** test/harness defect (fix the test) or domain-correctness gap (read
  game code, make the domain match). Validatability is a flag, not a class.
- **Diagnosis ≠ fix.** Red/green triage needs only committed data; enumerating true inputs and
  fixing need game code.
- **Game-code handoff:** never read the 45 MB file whole — targeted grep only; `_customBlock_` names
  are stable across versions. If the current version isn't extracted, STOP and ask the developer.
- **Specialized agents** carry the work: `coverage-investigator` (discovery → work item),
  `test-writer`, `domain-writer`, plus the existing `test-runner`. The work item is the handoff
  contract and must be self-contained with game-code evidence. Live extraction is a serialization
  point — append configs, run one batch extraction, then write tests/fixes.
- **Tolerance is `0`** (float-ordering exception only). Never suppress a failing test.
- **Learning loop:** every completed target gets a short learning review. Promote durable lessons into
  this playbook or agent instructions; track tentative lessons in
  `docs/calculation-correctness/LEARNINGS.md`.
