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

**When writing parameter tests:**
- Look for corresponding domain code
- Ask developer if unsure about implementation status
- Throw explicit errors for confirmed missing implementations

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
