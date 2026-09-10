---
name: testing
description: Guide for live game extraction testing, writing domain tests, and validating calculations
triggers:
  - path: "tests/**/*"
  - path: "**/*.test.ts"
  - path: "**/*.test.tsx"
---

# Testing Guide

Read the [testing implementation guide](../../docs/TESTING_IMPLEMENTATION.md) to choose core and parameter tests, obtain expected game values, test missing calculations, and check results before changing domain code.

When extraction is needed, [tests/helpers/README.md](../../tests/helpers/README.md) explains the game setup, active-player requirement, config format, and batch command. For optional coverage annotations and reports, read [tests/README.md](../../tests/README.md).

For a supervised correctness case, follow your [role instructions](../calculation-correctness/SKILL.md) and assigned stage. The testing guide explains how to write and run tests; the stage defines which work you may do.
