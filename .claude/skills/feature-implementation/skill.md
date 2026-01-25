---
name: feature-implementation
description: Step-by-step guide for implementing new game features and domain logic
triggers:
  - path: "data/domain/*.tsx"
    exclude: ["data/domain/data/**", "data/domain/enum/**", "data/domain/model/**"]
---

# Feature Implementation Guide

For comprehensive implementation documentation, read [docs/NEW_FEATURE_IMPLEMENTATION_GUIDE.md](docs/NEW_FEATURE_IMPLEMENTATION_GUIDE.md).

## Key Reminders

**Prerequisites to gather before starting:**
- Save file keys for the feature's data
- WikBot data availability (`../IdleonWikiBot/exported/ts/`)
- Similar existing features to model after
- Navigation placement in UI
- Asset names from game files
- Check `reference-repos/IdleonToolbox/` for reference implementations

**Critical constraints:**
- DO NOT modify auto-generated directories: `data/domain/data/`, `data/domain/enum/`, `data/domain/model/`
- Calculate phase has strict dependency ordering - place your feature AFTER dependencies, BEFORE dependents
- Testing is MANDATORY for domain logic - use `/testing` skill
- Always do visual validation against the actual game

**Common patterns to follow:**
- Study similar features: `stamps.tsx` (simple), `alchemy.tsx` (medium), `sailing.tsx` (complex)
- Use Grommet UI components for consistency
