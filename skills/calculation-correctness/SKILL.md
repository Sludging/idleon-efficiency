---
name: calculation-correctness
description: Supervised methodology for one wrong or missing backend main calculation, using a canonical GitHub correctness case and demand-driven live/game-code evidence
---

# Calculation Correctness

Use this skill for a red main calculation test or a confirmed-missing backend main calculation. Read the authoritative [v0 playbook](../../docs/calculation-correctness/PLAYBOOK.md) before acting.

Use [testing](../testing/SKILL.md) for extraction and test mechanics. Use [feature-implementation](../feature-implementation/SKILL.md) for a new feature that is not an approved correctness case.

## Entry gate

The canonical GitHub issue for `backend domain + main calculation` and its append-only checkpoint comments are the sole lifecycle and resume authority. The issue must identify the accepted coherent save/live-extraction pair, current-code run, root signal, main test, and exit checks. A human must approve and claim exactly one pending root before root work starts.

Do not form or refresh the queue, select a pilot, or activate a root unless the user explicitly asks. Parameter-only failures are evidence within a root, never cases.

## State machine

1. Accept or reuse one coherent save/live-extraction pair and reproduce against current code.
2. When intake is explicitly requested, run the full domain calculation suite and normalize only red main calculations or confirmed-missing roots by `backend domain + main calculation`.
3. Activate exactly one human-approved root and record `ACTIVE` in its first checkpoint.
4. Follow the smallest demand-driven parameter frontier needed to explain and correct that root. Record each checked input as `GREEN`, `RED`, or `UNKNOWN` in checkpoints.
5. Checkpoint `BLOCKED` and stop immediately for any playbook stop condition. Two materially different attempts at the same next action with no new fact and no reduced uncertainty also block the case.
6. Merge same-root signals into the active case. Return independently red or missing main calculations to pending intake; never activate them from diagnosis.
7. Resolve only when the root main test and every targeted test changed or added by the case are green against the accepted pair and current-code ref. Append the final checkpoint and terminal learning block, then close the root issue.

## Evidence and ownership

- Live extraction establishes expected values for the accepted snapshot.
- Current delivered game code establishes formula and composition.
- Repository domain code is the implementation under test. Tests are executable evidence, not infallible oracles.
- Formula discovery, save parsing, dependency wiring, extraction configs, tests, and handwritten domain fixes belong to idleon-efficiency.
- WikiBot owns game-code extraction and generated static representation. Never hand-edit or regenerate WikiBot-owned output during correctness work.
- New or changed comparisons use tolerance `0`. An existing non-zero tolerance affecting the active root requires game-behavior or floating-point evaluation-order evidence; otherwise stop and ask before closure.

## Hard boundaries

One root at a time. No guessed formulas, hidden failures, automatic orchestration, role choreography, work-item handoffs, coverage expansion, or methodology promotion from one case. Parsing completes before cross-domain calculation; calculations follow dependency order. Never edit generated `data/domain/data/`, `data/domain/enum/`, or `data/domain/model/` content.
