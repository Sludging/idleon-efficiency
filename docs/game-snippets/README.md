# Game Snippets

Captured source code of game calculation functions, used as the formula authority for calculation-correctness work. See "Reading the game formula" in [the calculation-correctness playbook](../calculation-correctness/PLAYBOOK.md) for the procedure that creates and consumes these files.

## Rules

- Read the version first (`GET http://localhost:3100/game-version`). If a snippet exists for the current version, read it from here instead of retrieving from the game.
- These files are evidence, not implementation. They are never imported by application code.

## Structure

```
docs/game-snippets/
  <domain>/                       # e.g. cooking, farming, sailing
    <FunctionName>.<version>.js   # e.g. CookingR.1.19.js
```

- **Folder** = domain, matching `data/domain/` and `tests/domains/` naming.
- **File** = the **entire** game function (`_customBlock_CookingR` whole, all branches), not just the branch under investigation. Captured once, reused by any case.
- **Version** = the game version the capture came from (from `GET /game-version` on the debug server). New version → new file; diffs between versions are reviewable formula-change evidence.

## File format

A metadata header added by us, followed by the verbatim `toString()` output. The source body is never hand-edited.

```js
/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_CookingR (from scripts.ActorEvents_345)
 * Game version: 1.19 ("Summer_Event")
 * Captured: 2026-08-20 via game-debug-tool (findFunction + toString)
 * Case reference: <canonical issue number>
 */
```

