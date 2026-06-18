---
name: sync-game-assets
description: Sync new/changed game image assets from Android device to S3 CDN. Use after a game version update when new images may have been added.
disable-model-invocation: true
user-invocable: true
---

# Sync Game Assets

For the full procedure, read [docs/runbooks/sync-game-assets.md](../../docs/runbooks/sync-game-assets.md).

## Key Reminders

- Requires Android device with wireless debugging enabled
- Interactive steps: ADB pairing, AWS SSO login — ask user for input at each checkpoint
- Use `-s <ip>:<connect_port>` if `adb devices` shows duplicate entries
- Run `node image-manipulator.js` from `$REPO_ROOT/data` to detect new/changed images
- Skip S3 sync if no new/changed images found
- See [local-paths.example.md](../../docs/runbooks/local-paths.example.md) for path placeholders
