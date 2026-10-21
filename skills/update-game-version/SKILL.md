---
name: update-game-version
description: Update game-version assets or generated domain data. Read the runbook and select either offline asset refresh without WikiBot or full WikiBot generation.
disable-model-invocation: true
user-invocable: true
---

# Update Game Version

For either asset-only refresh or full WikiBot generation, follow [the canonical procedure](../../docs/runbooks/update-game-version.md).

## Key Reminders

- Choose scope first. Asset-only refresh requires no WikiBot checkout or access.
- Follow offline setup, readiness, version, and game-access rules in [the offline guide](../../sub-projects/idleon-offline/README.md#startup) and [canonical game-access policy](../../tests/helpers/README.md#game-access).
- Keep offline-required active assets available. Validate complete staged extraction and patch version, then cut over while preserving previous assets outside the repository.
- Full WikiBot generation alone requires `$WIKIBOT_ROOT`, generated-data review, and upstream issue reporting.
- Correctness-triggered work must preserve the accepted-pair, worktree, and provenance gates in the canonical correctness playbook.
- Treat `/game-version` as asset-release provenance, not a config or calculation-test gate. Preserve native input/context checks and substantive formula tests across releases.
- Never refresh save fixtures or stored extraction results by default. Use only the canonical human-requested live-only save-refresh path.
