# IdleOn Efficiency Skills

Agent-agnostic context-specific guidance for working on this codebase. Canonical location: `skills/`. Symlinked from `.claude/skills/` (Claude Code) and `.cursor/skills/` (Cursor).

See [AGENTS.md](../AGENTS.md) for the full project bootstrap.

## Available Skills

### testing

**Auto-triggers (Claude Code):** Files in `tests/` or `*.test.ts` / `*.test.tsx`

**When to use:** Writing tests for domain logic, live game extraction, validation

**Covers:** Extraction configs, parameter/calculation tests, debugging failures, test patterns

**Points to:** [docs/TESTING_IMPLEMENTATION.md](../docs/TESTING_IMPLEMENTATION.md)

### feature-implementation

**Auto-triggers (Claude Code):** `data/domain/*.tsx` (excluding auto-generated subdirs)

**When to use:** Implementing new game features or domain logic

**Covers:** Implementation guide, domain patterns, data pipeline, UI, navigation, visual validation

**Points to:** [docs/NEW_FEATURE_IMPLEMENTATION_GUIDE.md](../docs/NEW_FEATURE_IMPLEMENTATION_GUIDE.md)

### architecture

**Auto-triggers:** None (load manually when needed)

**When to use:** Understanding data flow, calculation order, cross-domain dependencies

**Covers:** Init → Parse → Calculate pipeline, dependency ordering, auto-generated constraints

**Points to:** [docs/CODEBASE_OVERVIEW.md](../docs/CODEBASE_OVERVIEW.md)

### calculation-correctness

**Auto-triggers:** None (load manually when needed)

**When to use:** A domain calculation is wrong / a test is failing, or you want to expand test coverage of an existing calculation

**Covers:** Coverage-driven recursive validation against live game data, the game-code handoff, failure classification, specialized agent roster (coverage-investigator / test-writer / domain-writer), work-item template

**Points to:** [docs/calculation-correctness/PLAYBOOK.md](../docs/calculation-correctness/PLAYBOOK.md)

### update-game-version

**Auto-triggers:** None (manual invocation only)

**When to use:** New Idleon game version released — extract from Steam, process via WikiBot, sync data

**Points to:** [docs/runbooks/update-game-version.md](../docs/runbooks/update-game-version.md)

### sync-game-assets

**Auto-triggers:** None (manual invocation only)

**When to use:** After a game version update — sync new/changed images from Android APK to S3 CDN

**Points to:** [docs/runbooks/sync-game-assets.md](../docs/runbooks/sync-game-assets.md)

## How Skills Work

Skills are **lightweight pointers** to detailed documentation in `docs/` and `docs/runbooks/`. Update the main docs for content changes; update skills only when triggers or key reminders change.

### Auto-Activation

Claude Code reads path triggers from skill frontmatter:

```yaml
triggers:
  - path: "tests/**/*"
  - path: "**/*.test.ts"
```

Cursor uses `.cursor/rules/*.mdc` with `globs` for equivalent file-scoped context.

### Symlinks

Both agent tools discover skills via symlinked paths:

```
skills/                    # SSOT (this directory)
.claude/skills → ../skills
.cursor/skills → ../skills
```

On Windows, enable git symlinks: `git config core.symlinks true`. WSL users should clone and work within WSL for symlink support.

## Adding New Skills

1. Add detailed content to `docs/[TOPIC].md` or `docs/runbooks/[name].md`
2. Create `skills/skill-name/SKILL.md` as a lightweight pointer with frontmatter
3. Add to the skills table in [AGENTS.md](../AGENTS.md)
4. Add a Cursor rule with matching `globs` if file-scoped auto-activation is needed

## Maintaining Skills

| Skill | Documentation SSOT |
|-------|-------------------|
| testing | `docs/TESTING_IMPLEMENTATION.md` |
| feature-implementation | `docs/NEW_FEATURE_IMPLEMENTATION_GUIDE.md` |
| architecture | `docs/CODEBASE_OVERVIEW.md` |
| calculation-correctness | `docs/calculation-correctness/PLAYBOOK.md` |
| update-game-version | `docs/runbooks/update-game-version.md` |
| sync-game-assets | `docs/runbooks/sync-game-assets.md` |

**When to update skills:** triggers change, key reminders become outdated. Content updates go in docs, not skills.
