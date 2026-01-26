# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IdleOn Efficiency (https://www.idleonefficiency.com) is a companion website for the idle MMO "Legends of Idleon". This Next.js app reverse-engineers game mechanics to provide efficiency calculators and optimization tools for players.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Grommet UI, styled-components, Zustand, Firebase (Firestore), Sentry

**Package Manager:** Use `yarn`

## Skills System

This project uses Claude Code skills for context-specific guidance. Use these skills when working on specific tasks:

- **/testing** - Live game extraction testing, domain test writing, validation patterns
- **/feature-implementation** - Step-by-step guide for implementing new game features
- **/architecture** - Data flow, domain patterns, cross-domain dependencies, architectural constraints

## Critical Architecture Constraints

### DO NOT MODIFY - Auto-Generated Directories

These are synced from the external IdleOn WikBot project:
- `data/domain/data/` - Game data repositories (items, enemies, NPCs)
- `data/domain/enum/` - Game enumerations
- `data/domain/model/` - TypeScript models

**Data Sync Command:** `cp -r ../IdleonWikiBot/exported/ts/* data/domain/`

### Data Flow Architecture

The application follows a strict three-phase pipeline:

1. **Init Phase** - One-time initialization of game data structures
2. **Parse Phase** - Process user's cloud save and extract raw game data
3. **Calculate Phase** - Execute domain calculations in strict dependency order

**Important:** The calculate phase requires careful ordering due to cross-domain dependencies. Use **/architecture** skill for details.

**Example domains:** `alchemy.tsx`, `cooking.tsx`, `breeding.tsx`, `anvil.tsx`

## Common Development Commands

```bash
# Development server (uses HTTPS)
yarn dev

# Build for production (includes static asset upload)
yarn build

# Linting
yarn lint

# Testing
yarn test
```

## Project Structure

```
/app                         # Next.js App Router pages (world-1 to world-7, account, profile, etc.)
/components                  # React UI components
/data
  /domain                    # Domain logic
    /*.tsx                   # Editable domain classes
    /data/**                 # [AUTO-GENERATED] DO NOT MODIFY
    /enum/**                 # [AUTO-GENERATED] DO NOT MODIFY
    /model/**                # [AUTO-GENERATED] DO NOT MODIFY
  ...                        # Additional data related functionality
/lib
  /efficiencyEngine          # Core calculation engine, used in several domains (e.g. Tesseract, Compass)
  /stores                    # Zustand state management
  /utils                     # Utility functions
/reference-repos             # Competitor codebases for implementation reference (domain/parser logic only)
/tests                       # Jest test suite
  /configs                   # Live game extraction configurations
  /domains                   # Domain calculation tests
  /fixtures                  # Test data and cloud save snapshots
  /helpers                   # Test utilities and data extraction tools
  /results                   # Extracted live game data
  /utils                     # Test helpers
```

## Testing Requirements

**When working on domain logic (`data/domain/*.tsx`), testing is mandatory.**

Use **/testing** skill for complete guide on:
- Creating extraction configurations
- Running live game data extraction
- Writing parameter and calculation tests
- Debugging test failures

## New Feature Implementation

Use **/feature-implementation** skill for step-by-step guide covering:
- Prerequisites verification
- Domain implementation patterns
- Data pipeline integration
- UI development with Grommet
- Navigation integration
- Testing requirements

## Key Technical Considerations

### Deployment
- **Platform:** Vercel with automatic GitHub integration
- **Process:** Fully automated CI/CD on push to main
- **Build:** Next.js static export with CDN asset upload

### External Dependencies
- **IdleOn WikBot:** Core dependency for game data (must be in `../IdleonWikiBot/`)
- **Game Client:** Required for visual validation during development
- **Game Assets:** Extracted from APK/client files

### Reference Repositories

The `reference-repos/` directory contains competitor codebases used for implementation validation:

**Purpose:**
- Validate reverse-engineering assumptions
- Cross-reference domain logic implementations
- Verify calculation formulas and game mechanics
- **Only domain/parser code is relevant** - ignore UI implementation details

**Usage Guidelines:**
- Periodically pull updates to keep current
- Consult when implementing features they've already built
- Use as reference, not direct copying (different architectures)
- Should be ignored in build/lint operations

## Important Reminders

- This codebase has mixed patterns from learning TypeScript/React over time
- Author acknowledges tech debt and design inconsistencies
- Data flow (init/parse/calculate) is fragile and order-dependent

## Reference Documentation

- `docs/CODEBASE_OVERVIEW.md` - Detailed technical architecture
- `docs/NEW_FEATURE_IMPLEMENTATION_GUIDE.md` - Feature implementation steps (also in `/feature-implementation` skill)
- `docs/TESTING_IMPLEMENTATION.md` - Testing strategy (also in `/testing` skill)
- `CONTRIBUTING.md` - Contributor guidelines and known issues
