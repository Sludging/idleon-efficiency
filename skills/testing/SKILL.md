---
name: testing
description: Guide for live game extraction testing, writing domain tests, and validating calculations
triggers:
  - path: "tests/**/*"
  - path: "**/*.test.ts"
  - path: "**/*.test.tsx"
---

# Testing Guide

Read the [testing implementation guide](../../docs/TESTING_IMPLEMENTATION.md) for the complete mechanics of extraction, fixtures, parameter tests, calculation tests, matchers, and test commands.

For day-to-day batch extraction, save fixtures, and coverage tracking, also read [tests/README.md](../../tests/README.md) and [tests/helpers/README.md](../../tests/helpers/README.md).

When a human has activated a calculation-correctness case, read the [calculation-correctness playbook](../../docs/calculation-correctness/PLAYBOOK.md) before deciding what to test or change. The playbook controls case scope, dependency decisions, checkpoints, and closure. This skill and the implementation guide explain how to produce the approved test evidence. Ordinary domain testing uses this skill without the correctness-case branch.

## Operational reminders

- Run `node tests/helpers/extract-all-game-data.js` to batch-extract every configuration.
- Use `sub-projects/game-debug-tool/idleon-debug-server.js` for the debug server.
- When refreshing a fixture for live extraction, run `node tests/helpers/extract-all-game-data.js`; it obtains `tests/fixtures/saves/latest.json` from `GET http://localhost:3100/cloud-save` before extracting values.
- Use `expect(domainValue).toMatchLiveGame(liveValue, 0)` for parameter tests.
- Use `expect(domainValue).toMatchLiveGameWithDetails(liveValue, { tolerance: 0, context: '...' })` for calculation tests.
- Existing `@testCovers` annotations and `yarn coverage:report` remain optional. Coverage is not a calculation-correctness deliverable.

## Mechanics that affect correctness evidence

- Base formulas and composition on current delivered game code. Base expected values on live extraction from the accepted coherent save and extraction pair.
- Extract only the smallest set of components needed by the approved test surface. Keep extraction serialized: append configurations, then run one batch extraction.
- If the game returns a raw value that the domain transforms with a fixed constant, normalize the extraction expression only when game-code evidence establishes the equivalent output.
- Keep confirmed missing implementations visible as explicit failing results. Do not hide them.
- Never use `it.skip()`, `it.todo()`, `xit()`, test removal, or a tolerance change to hide a failure. New or changed correctness comparisons use tolerance `0`.
- Do not write tests that only compare a parsed save field with a model field. Test calculations and formulas instead.
- Split parameter and calculation files when several meaningful cross-domain inputs need individual diagnosis. Use one calculation file when the formula is simple and there are no meaningful inputs to isolate.
