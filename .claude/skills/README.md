# IdleOn Efficiency Skills

This directory contains Claude Code skills that provide context-specific guidance for working on this codebase.

## Available Skills

### `/testing`
**Auto-triggers:** When editing files in `tests/` or any `*.test.ts` files

**Manual use:** When you need to write tests for domain logic

**Covers:**
- Live game extraction testing workflow
- Creating extraction configurations
- Writing parameter and calculation tests
- Debugging test failures
- Test patterns and best practices

**Example usage:**
```
You: I need to write tests for the sailing speed calculation
Claude: [Automatically loads /testing skill]
```

### `/feature-implementation`
**Auto-triggers:** When editing `data/domain/*.tsx` files (except auto-generated ones)

**Manual use:** When implementing new game features

**Covers:**
- Step-by-step implementation guide
- Domain class patterns
- Data pipeline integration
- UI development with Grommet
- Navigation integration
- Visual validation requirements

**Example usage:**
```
You: I'm adding a new cooking feature
Claude: [Automatically loads /feature-implementation skill]
```

### `/architecture`
**Auto-triggers:** Never (use manually when needed)

**Manual use:** When you need to understand data flow or architectural patterns

**Covers:**
- Three-phase pipeline (Init → Parse → Calculate)
- Calculation order dependencies
- Cross-domain dependency management
- Domain-driven design pattern
- Auto-generated file constraints
- State management with Zustand

**Example usage:**
```
You: /architecture
Claude: [Loads architecture skill with data flow details]
```

## How Skills Work

### Auto-Activation (Triggers)
Skills can automatically activate when you edit certain files. This is defined in the skill's frontmatter:

```yaml
---
triggers:
  - path: "tests/**/*"
  - path: "**/*.test.ts"
---
```

When you edit a matching file, Claude will have access to that skill's content without you needing to invoke it manually.

### Manual Invocation
You can always invoke a skill manually by using its name with a slash:

```
/testing
/feature-implementation
/architecture
```

## Adding New Skills

To create a new skill:

1. **Create comprehensive documentation:** Add detailed content to `docs/[TOPIC].md`
2. **Create skill directory:** `.claude/skills/skill-name/`
3. **Create skill file:** `skill.md` as a lightweight pointer:
   ```yaml
   ---
   name: skill-name
   description: When and why to use this skill
   triggers:
     - path: "pattern/**/*"
   ---

   # Skill Title

   For comprehensive documentation, read [docs/TOPIC.md](docs/TOPIC.md).

   ## Key Reminders

   - Brief contextual reminders (3-5 bullet points)
   - Critical constraints or gotchas
   - Common commands or patterns
   - When to use this vs other approaches
   ```
4. **Reference in CLAUDE.md:** Add to skills quick reference table

## Maintaining Skills

### Skills as Documentation Pointers

Skills are **lightweight pointers** to the main documentation files:

- `/testing` → `docs/TESTING_IMPLEMENTATION.md`
- `/feature-implementation` → `docs/NEW_FEATURE_IMPLEMENTATION_GUIDE.md`
- `/architecture` → `docs/CODEBASE_OVERVIEW.md`

**Approach:** Skills contain minimal frontmatter (triggers, description) and brief reminders, then instruct Claude to read the full documentation. This ensures a single source of truth - you only need to maintain the main docs.

**When to update skills:**
- Only if triggers need to change
- Only if key reminders become outdated
- Content updates go in the main docs, not the skills

## Tips

1. **Let skills auto-load** - Don't manually invoke unless needed
2. **Keep CLAUDE.md lean** - Move large sections to main docs, add skill pointers
3. **Single source of truth** - Update main docs only; skills just point to them
4. **Use specific skills** - `/testing` not "load testing docs"
5. **Create skills for repeated questions** - If you're explaining the same thing multiple times, add it to docs and create a skill pointer

## Future Skill Ideas

Potential skills to add as the project grows:

- `/ui-patterns` - Grommet component patterns, styling conventions
