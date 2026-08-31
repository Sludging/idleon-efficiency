---
name: testing
description: Guide for live game extraction testing, writing domain tests, and validating calculations
triggers:
  - path: "tests/**/*"
  - path: "**/*.test.ts"
  - path: "**/*.test.tsx"
---

# Testing Guide

Read the [testing implementation guide](../../docs/TESTING_IMPLEMENTATION.md) for extraction, fixtures, parameter tests, calculation tests, matchers, and test commands.

For day-to-day batch extraction, save fixtures, and coverage tracking, also read [tests/README.md](../../tests/README.md) and [tests/helpers/README.md](../../tests/helpers/README.md).

## Operational reminders

- Run `node tests/helpers/extract-all-game-data.js` to batch-extract every configuration.
- Use `sub-projects/game-debug-tool/idleon-debug-server.js` for the debug server.
- When refreshing a fixture for live extraction, run `node tests/helpers/extract-all-game-data.js`; it obtains `tests/fixtures/saves/latest.json` from `GET http://localhost:3100/cloud-save` before extracting values.
- Use `expect(domainValue).toMatchLiveGame(liveValue, 0)` for parameter tests.
- Use `expect(domainValue).toMatchLiveGameWithDetails(liveValue, { tolerance: 0, context: '...' })` for calculation tests.
- Existing `@testCovers` annotations and `yarn coverage:report` remain optional. Coverage is not a calculation-correctness deliverable.

## Mechanics that affect correctness evidence

- Base formulas and composition on delivered game code for the version under test. Base expected values on the fresh save and results produced by `node tests/helpers/extract-all-game-data.js`.
- Extract only values actually compared by core or parameter tests. Keep extraction serialized: append configurations, then run one batch extraction.
- WikiBot static values are game definitions, not calculated parameters; test the calculation consuming static data rather than adding parameter tests or extraction entries solely to compare them, and block implementation when data is missing or wrong for the human’s WikiBot request.
- If the game returns a raw value that the domain transforms with a fixed constant, normalize the extraction expression only when game-code evidence establishes the equivalent output.
- Keep confirmed missing implementations visible as explicit failing results. Do not hide them.
- Never use `it.skip()`, `it.todo()`, `xit()`, test removal, or a tolerance change to hide a failure. New or changed correctness comparisons use tolerance `0`.
- Do not write tests that only compare a parsed save field with a model field. Test calculations and formulas instead.
- Split parameter and calculation files when several meaningful cross-domain inputs need individual diagnosis. Use one calculation file when the formula is simple and there are no meaningful inputs to isolate.
