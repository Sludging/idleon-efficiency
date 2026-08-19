---
name: calculation-correctness
description: Supervised methodology for one wrong or missing backend main calculation, using a canonical GitHub correctness case and demand-driven live/game-code evidence
---

# Calculation Correctness

Use this skill when a backend main calculation is red or confirmed missing. Before doing any work, read the authoritative [calculation-correctness playbook](../../docs/calculation-correctness/PLAYBOOK.md). The playbook is the only source for case scope, lifecycle, evidence decisions, dependency boundaries, checkpoints, and closure.

Use the [testing skill](../testing/SKILL.md) and [testing implementation guide](../../docs/TESTING_IMPLEMENTATION.md) for extraction and test mechanics. Use the [feature-implementation skill](../feature-implementation/SKILL.md) for a new feature that is not an approved correctness case.

This skill only routes the worker to the correct guidance. It does not define a second correctness workflow.

## Generated data guardrail

Never modify generated content under `data/domain/data/`, `data/domain/enum/`, or `data/domain/model/`. WikiBot owns that content and its game-code extraction.
