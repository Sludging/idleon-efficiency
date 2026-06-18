---
name: update-game-version
description: Update game data when a new Legends of Idleon version is released. Extracts game code from Steam, processes it through WikiBot, and syncs updated data back.
disable-model-invocation: true
user-invocable: true
---

# Update Game Version

For the full procedure, read [docs/runbooks/update-game-version.md](../../docs/runbooks/update-game-version.md).

## Key Reminders

- Requires `$WIKIBOT_ROOT` sibling repo (typically `../IdleonWikiBot/`) — see [local-paths.example.md](../../docs/runbooks/local-paths.example.md)
- Execute steps sequentially; verify each step before proceeding
- Human checkpoint at step 7b: user must review `git diff --stat data/domain/` before continuing
- Flag upstream WikiBot issues in `.claude/UPSTREAM_FIXES.md`
- After completion, prompt user to run [sync-game-assets](sync-game-assets/SKILL.md) for new/changed images
