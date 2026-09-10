---
name: calculation-correctness
description: Check and correct a selected game calculation using the correctness playbook and role instructions
---

# Calculation Correctness

Use the instructions for your role to check whether the selected calculation matches the game.

- **Coordinator (`correctness-coordinator`)**: Read the full [calculation-correctness playbook](../../docs/calculation-correctness/PLAYBOOK.md) and follow the coordinator role.
- **Worker (`correctness-worker`)**: Read your role instructions, the assigned stage, and the case working note. The stage links to the testing guide when needed.
- **Reviewer (`correctness-reviewer`)**: Read your role instructions and case findings, then independently check the relevant game source, domain code, and tests.
- **Ordinary non-role correctness work**: Read the full [calculation-correctness playbook](../../docs/calculation-correctness/PLAYBOOK.md).

The files under `.omp/agents/` define each role's responsibilities and result fields.

## Generated data

Never modify generated content under `data/domain/data/`, `data/domain/enum/`, or `data/domain/model/`. WikiBot owns that content and its game-code extraction. Generated static data is not a parameter-test target.
