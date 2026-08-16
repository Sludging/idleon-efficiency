---
name: testing
description: Guide for live game extraction testing, writing domain tests, and validating calculations
triggers:
  - path: "tests/**/*"
  - path: "**/*.test.ts"
  - path: "**/*.test.tsx"
---

# Testing Guide

For comprehensive testing documentation, read [docs/TESTING_IMPLEMENTATION.md](../../docs/TESTING_IMPLEMENTATION.md).

For day-to-day workflow (batch extraction, save fixtures, coverage), see [tests/README.md](../../tests/README.md) and [tests/helpers/README.md](../../tests/helpers/README.md).

## Key Reminders

**Extraction workflow:**
- Batch extract all configs: `node tests/helpers/extract-all-game-data.js`
- Debug server: `sub-projects/game-debug-tool/idleon-debug-server.js`
- Save fixture: update `tests/fixtures/saves/latest.json` from idleonefficiency.com raw-data tab

**Custom matchers** (defined in `tests/setup.ts`):
- `expect(domainValue).toMatchLiveGame(liveValue, 0)` — parameter tests
- `expect(domainValue).toMatchLiveGameWithDetails(liveValue, { tolerance: 0, context: '...' })` — calculation tests

**Coverage tools (optional):**
- Existing `@testCovers` annotations and `yarn coverage:report` remain available, but coverage is not a calculation-correctness deliverable.


**When creating extraction configs:**
- Base formulas and composition on current delivered game code; base expected values on live extraction from the accepted coherent save/extraction pair.
- Extract only the smallest set of components needed by the active root's demand-driven parameter frontier.
- Keep extraction serialized: append configs, then run one batch extraction.
- Game functions may return raw values that the domain transforms with hardcoded constants. Normalize the extraction expression only when game-code evidence establishes the equivalent output.

**When writing parameter tests:**
- Parameter tests are targeted diagnostic evidence inside the approved main-calculation root; they never create separate correctness cases.
- Record examined parameters as `GREEN`, `RED`, or `UNKNOWN` in the canonical root checkpoint.
- A confirmed missing implementation remains visible as a failing result; do not hide it.

**Failing tests are visible evidence:**
- Never use `it.skip()`, `it.todo()`, `xit()`, removal, or tolerance changes to hide a failure.
- New or changed correctness comparisons use tolerance `0`.
- An existing non-zero tolerance affecting the active root requires game-behavior or floating-point evaluation-order evidence; otherwise stop and ask.

**What NOT to test:**
- Do not write tests that simply validate parsed save data matches model fields (e.g., "level in Spelunk[45][0] == bonus.level"). Parsing correctness is assumed — if parsing breaks, every calculation test will fail anyway. Only test actual calculations and formulas.

**When to split parameter vs calculation files:**
- Split into separate parameter and calculation files when the calculation has multiple cross-domain inputs worth validating individually (e.g., statues depend on artifacts, event shop, meritocracy, vault, talents)
- Use a single calculation file when the formula is trivially simple (e.g., `bonus * level`) with no meaningful cross-domain inputs to isolate

**Calculation-correctness workflow:**
1. Start only from the human-approved canonical GitHub root case and accepted coherent pair.
2. Read current delivered game code for formula/composition and use live extraction for expected values.
3. Extend extraction configs and parameter tests only along the smallest frontier needed to resolve the root.
4. Capture extraction and save together only when a refresh trigger in the calculation-correctness playbook applies.
5. Run the selected main test and targeted parameter tests; completion requires the main test and every test changed or added by the case to be green.

**Common test commands:**
```bash
yarn test tests/domains/[feature]/[aspect]-parameters.test.ts
yarn test:domains
yarn test:watch
```
