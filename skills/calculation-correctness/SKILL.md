---
name: calculation-correctness
description: Route calculation-correctness work to the appropriate OMP role and authoritative guidance
---

# Calculation Correctness

This skill is a role-aware router, not a second correctness workflow.

- **Coordinator (`correctness-coordinator`)**: Read the full [calculation-correctness playbook](../../docs/calculation-correctness/PLAYBOOK.md) and follow the coordinator role.
- **Diagnoser (`correctness-diagnoser`) and reviewer (`correctness-reviewer`)**: Follow the matching role and coordinator packet. Do not load the full playbook.
- **Implementer (`correctness-implementer`)**: Follow the matching role and coordinator packet, and read [the testing implementation guide](../../docs/TESTING_IMPLEMENTATION.md) for mechanics. Do not load the full playbook.
- **Ordinary non-role correctness work**: Read the full [calculation-correctness playbook](../../docs/calculation-correctness/PLAYBOOK.md).

The role files under `.omp/agents/` define role responsibilities and return contracts; this router does not repeat them.

## Generated data guardrail

Never modify generated content under `data/domain/data/`, `data/domain/enum/`, or `data/domain/model/`. WikiBot owns that content and its game-code extraction.
