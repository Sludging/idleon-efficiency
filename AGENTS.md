# AGENTS.md

Guidance for AI coding assistants working in this repository.

Before implementing or reviewing code, you MUST read [CODING_STANDARDS.md](CODING_STANDARDS.md). When delegating implementation or review, pass its path and the relevant existing vocabulary-document paths (discovered through [domain docs](docs/agents/domain.md)); do not duplicate their rules in task prompts.

For every game interaction, use the [canonical game-access policy](tests/helpers/README.md#game-access) for offline defaults, readiness and version checks, and justified live access.

## Project Overview

IdleOn Efficiency (https://www.idleonefficiency.com) is a companion website for the idle MMO "Legends of Idleon". This Next.js app reverse-engineers game mechanics to provide efficiency calculators and optimization tools for players.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Grommet UI, styled-components, Zustand, Firebase (Firestore), Sentry

**Package Manager:** Use `yarn`

## Skills

Context-specific guidance lives in [`skills/`](skills/). Read the relevant skill when working on matching tasks:

| Skill | When to use |
|-------|-------------|
| [architecture](skills/architecture/SKILL.md) | Data flow, domain patterns, cross-domain dependencies |
| [calculation-correctness](skills/calculation-correctness/SKILL.md) | A backend main calculation is wrong or missing — canonical-case workflow with demand-driven live/game-code evidence |
| [testing](skills/testing/SKILL.md) | Offline-first game extraction, domain test writing, validation |
| [feature-implementation](skills/feature-implementation/SKILL.md) | Implementing new game features and domain logic |
| [update-game-version](skills/update-game-version/SKILL.md) | New Idleon version released — extract from Steam, process via WikiBot, sync data |
| [sync-game-assets](skills/sync-game-assets/SKILL.md) | Sync new/changed game images from Android APK to S3 CDN |

Skills are lightweight pointers to detailed docs. See [`skills/README.md`](skills/README.md) for maintenance guidelines.

**Agent discovery paths:** `skills/` (canonical), `.claude/skills/` and `.cursor/skills/` (symlinked).

## Agent skills

### Issue tracker

Issues and specs live in GitHub Issues for `Sludging/idleon-efficiency`, using `gh`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the canonical labels `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Domain documentation is optional: read root `CONTEXT.md` and relevant `docs/adr/` records when present. See `docs/agents/domain.md` for discovery guidance.

## Do not

- Do not use or add images in `public`. Use CDN images only.
- Do not treat mockup approval as production-code approval.
- Do not copy static values from game code. If required values are missing, stop and follow the static value extraction process.
- Do not update `CODEBASE_OVERVIEW.md`, `changelog.ts`, or common repository documentation during single-feature work.

## Critical Architecture Constraints

### DO NOT MODIFY — Auto-Generated Directories

These are synced from the external IdleOn WikBot project:

- `data/domain/data/` — Game data repositories (items, enemies, NPCs)
- `data/domain/enum/` — Game enumerations
- `data/domain/model/` — TypeScript models

**Data sync command:** `cp -r ../IdleonWikiBot/exported/ts/* data/domain/`

### Data Flow Architecture

The application follows a strict three-phase pipeline:

1. **Init Phase** — Set up domain instances and static game data
2. **Parse Phase** — Process user's cloud save and extract raw game data
3. **Calculate Phase** — Execute domain calculations in strict dependency order

**Important:** The calculate phase requires careful ordering due to cross-domain dependencies. Read the [architecture skill](skills/architecture/SKILL.md) for details.

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
  /configs                   # Game extraction configurations
  /domains                   # Domain calculation tests
  /fixtures                  # Test data and cloud save snapshots
  /helpers                   # Test utilities and data extraction tools
  /results                   # Extracted game values
  /utils                     # Test helpers
```

## Testing Requirements

**When working on domain logic (`data/domain/*.tsx`), testing is mandatory.**

Read the [testing skill](skills/testing/SKILL.md) for:

- Creating extraction configurations
- Running game data extraction (offline by default; see [game-access policy](tests/helpers/README.md#game-access))
- Writing parameter and calculation tests
- Debugging test failures

## New Feature Implementation

For any UI planning, implementation, changes, or scoped review, start with the
[UI work guide](docs/agents/ui-patterns.md); it supplies the practical project context and
links. For new pages or visual composition changes, use `impeccable` as directed by the guide.
Before backend implementation or architecture decisions, use the
[implementation patterns guide](docs/agents/implementation-patterns.md) to select applicable
examples.

Read the [feature-implementation skill](skills/feature-implementation/SKILL.md) for:
- Prerequisites verification
- Domain implementation
- Data pipeline integration
- Navigation integration
- Testing requirements

### Research specialists

- Read the existing handoff and findings first. Reuse sufficient research; request specialists only when further research is needed.
- You MUST delegate exploratory game-source, caller, runtime, player-meaning, and WikiBot static-data research directly to [game-researcher](.omp/agents/game-researcher.md).
- You MUST delegate repository backend/UI pattern discovery and comparison directly to [pattern-researcher](.omp/agents/pattern-researcher.md) before choosing patterns.

Delegate before broad searches of your own. Routine code inspection and formula-only changes with unchanged structure need no new pattern research.
Give specialists the scope, open questions, and existing findings from the current handoff.
The selected workflow controls research scope, phase boundaries, session freshness, concurrency, and decision authority.
Specialists provide findings; they do not approve decisions or advance phases.
Consumers MUST inspect focused sources and code for implementation and independent verification of relevant interfaces and behavior.
Distinguish mandatory rules, observed patterns, recommendations, and unresolved choices. Applicable standards constrain approved plans and specialist recommendations; approval is not an exemption.
Support departures from observed patterns with evidence. Get approval before changing the affected scope or approved decisions.

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
- **Only domain/parser code is relevant** — ignore UI implementation details

**Usage guidelines:**

- Periodically pull updates to keep current
- Consult when implementing features they've already built
- Use as reference, not direct copying (different architectures)
- Should be ignored in build/lint operations

## Important Reminders

- This codebase has mixed patterns from learning TypeScript/React over time
- Author acknowledges tech debt and design inconsistencies
- Data flow (init/parse/calculate) is fragile and order-dependent
- Never guess or assume game calculations — always verify against the actual game

## Reference Documentation

| Document | Description |
|----------|-------------|
| [`docs/CODEBASE_OVERVIEW.md`](docs/CODEBASE_OVERVIEW.md) | Detailed technical architecture |
| [`docs/NEW_FEATURE_IMPLEMENTATION_GUIDE.md`](docs/NEW_FEATURE_IMPLEMENTATION_GUIDE.md) | Feature implementation steps |
| [`docs/TESTING_IMPLEMENTATION.md`](docs/TESTING_IMPLEMENTATION.md) | Testing strategy |
| [`docs/GAME_CODE_PROCESSOR_PLAN.md`](docs/GAME_CODE_PROCESSOR_PLAN.md) | Game code processor plan |
| [`docs/runbooks/update-game-version.md`](docs/runbooks/update-game-version.md) | Game version update procedure |
| [`docs/runbooks/sync-game-assets.md`](docs/runbooks/sync-game-assets.md) | Asset sync procedure |
| [`docs/runbooks/local-paths.example.md`](docs/runbooks/local-paths.example.md) | Local path configuration for runbooks |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Contributor guidelines and known issues |
