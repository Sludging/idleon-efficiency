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

**Testing workflow:**
1. Create extraction config in `tests/configs/`
2. Run live game extraction with debug server
3. Capture cloud save at same timestamp (prevent drift)
4. Write parameter tests first (identify which dependencies fail)
5. Write calculation tests after parameters pass

**Critical rules:**
- Cloud save fixtures MUST match extraction timestamp
- Always test parameters before final calculations
- Testing is MANDATORY for domain logic changes
- Use existing configs as templates (`tests/configs/sailing-speed.json`)

**Common test commands:**
```bash
yarn test tests/domains/[feature]/[aspect]-parameters.test.ts
yarn test:domains
yarn test:watch
```
