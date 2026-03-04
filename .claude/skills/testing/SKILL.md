---
name: testing
description: Guide for live game extraction testing, writing domain tests, and validating calculations
triggers:
  - path: "tests/**/*"
  - path: "**/*.test.ts"
  - path: "**/*.test.tsx"
---

# Testing Guide

For comprehensive testing documentation, read [docs/TESTING_IMPLEMENTATION.md](docs/TESTING_IMPLEMENTATION.md).

## Key Reminders

**When creating extraction configs:**
- Ask developer for game code to base configs on
- Extract individual components rather than composite calculations
- Parameters are all calculation inputs (functions or state, any domain)
- Test multiple output scenarios to validate formulas work generally
- Game functions may return raw values (0/1 booleans, raw multipliers) that the domain transforms with hardcoded constants. Normalize the extraction expression with arithmetic so it matches the domain's output format (e.g., `0.3 * 100 * EventShopOwned(19)` to yield 0 or 30)

**When writing parameter tests:**
- Look for corresponding domain code
- Ask developer if unsure about implementation status
- Throw explicit errors for confirmed missing implementations

**Failing tests are intentional signals — never suppress them:**
- Do NOT use `it.skip()`, `it.todo()`, `xit()`, or any other mechanism to hide a failing test
- Do NOT add tolerances to make a failing test pass — tolerances mask real discrepancies
- Do NOT remove tests because they fail — a failing test documents a known gap in the domain
- Failing tests are the correct way to track what still needs to be implemented or fixed (e.g., AllTalentLV support, missing domain features)

**What NOT to test:**
- Do not write tests that simply validate parsed save data matches model fields (e.g., "level in Spelunk[45][0] == bonus.level"). Parsing correctness is assumed — if parsing breaks, every calculation test will fail anyway. Only test actual calculations and formulas.

**When to split parameter vs calculation files:**
- Split into separate parameter and calculation files when the calculation has multiple cross-domain inputs worth validating individually (e.g., statues depend on artifacts, event shop, meritocracy, vault, talents)
- Use a single calculation file when the formula is trivially simple (e.g., `bonus * level`) with no meaningful cross-domain inputs to isolate

**Testing workflow:**
1. Get game code from developer
2. Create extraction config with individual components
3. Run live extraction and capture cloud save at same time
4. Write parameter tests for all calculation inputs
5. Write calculation tests for multiple scenarios

**Common test commands:**
```bash
yarn test tests/domains/[feature]/[aspect]-parameters.test.ts
yarn test:domains
yarn test:watch
```
