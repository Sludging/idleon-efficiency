# Game Snippets

Captured source code of game calculation functions, used as the formula authority for calculation-correctness work. The [calculation-correctness playbook](../calculation-correctness/PLAYBOOK.md) defines when a case needs a snippet; this file defines how to capture and store one.

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
 * Function: _customBlock_<FunctionName> (from <ActorEventsScript>)
 * Game version: <version> ("<patch title>")
 * Captured: <date> via game-debug-tool (findFunction + toString)
 * Case reference: <correctness case issue number>
 */
```

## Capture Procedure

Use this procedure only when the versioned snippet for the selected function does not already exist. Replace every `<...>` placeholder in the commands and metadata before running them.

1. Require a ready game and record the exact version. Proceed only when the status response contains `cdpConnected: true`, `injected: true`, and `gameReady: true`; otherwise stop and ask the human:

   ```bash
   curl -fsS http://localhost:3100/status
   curl -fsS http://localhost:3100/game-version
   ```

   Use the returned `version` and patch `title` exactly in the path and metadata.

2. Ask the game which script contains the function:

   ```bash
   curl -fsS -X POST http://localhost:3100/exec \
     -H "Content-Type: application/json" \
     -d '{"expression":"idleon.findFunction(\"<FunctionName>\")"}'
   ```

   The response must identify exactly one `scripts.ActorEvents_<number>` entry. If the function is not found, the response identifies multiple scripts, or the response is otherwise ambiguous, stop and ask the human. Never guess a script.

3. Evaluate that script's entire function source:

   ```bash
   curl -fsS -X POST http://localhost:3100/exec \
     -H "Content-Type: application/json" \
     -d '{"expression":"window.frames[0].__idleon_cheats__[\"<ActorEventsScript>\"]._customBlock_<FunctionName>.toString()"}'
   ```

   Save the entire returned function, without truncation or hand edits, at `docs/game-snippets/<domain>/<FunctionName>.<version>.js`, using the metadata header above with the placeholders replaced. If that same-version path already exists and its content differs from the returned function or metadata, stop and ask the human; never guess or overwrite it. Identical existing content may be reused.

