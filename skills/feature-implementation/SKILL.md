---
name: feature-implementation
description: Step-by-step guide for implementing new game features and domain logic
triggers:
  - path: "data/domain/*.tsx"
    exclude: ["data/domain/data/**", "data/domain/enum/**", "data/domain/model/**"]
---

# Feature Implementation Guide

For comprehensive implementation documentation, read [docs/NEW_FEATURE_IMPLEMENTATION_GUIDE.md](../../docs/NEW_FEATURE_IMPLEMENTATION_GUIDE.md).

## Key Reminders

**Before implementation:** Use the [implementation patterns guide](../../docs/agents/implementation-patterns.md) to select applicable backend examples and aspects; use its UI route when planning or changing UI.
- Save file keys for the feature's data
- WikBot data availability (`../IdleonWikiBot/exported/ts/`)
- Navigation placement in UI
- Asset names from game files
- Check `reference-repos/IdleonToolbox/` for reference implementations

**Critical constraints:**
- DO NOT modify auto-generated directories: `data/domain/data/`, `data/domain/enum/`, `data/domain/model/`
- Calculate phase has strict dependency ordering - place your feature AFTER dependencies, BEFORE dependents
- Testing is MANDATORY for domain logic - read the [testing skill](../testing/SKILL.md)
- Always do visual validation against the actual game

**Pattern selection:**
- Follow only the named aspects of selected examples; the implementation patterns guide defines how to handle uncovered choices and conflicts.
