# Game Snippets

Captured game calculation functions establish intended game behavior for feature research and calculation checks. The [calculation-correctness playbook](../calculation-correctness/PLAYBOOK.md) defines evidence needs for correctness cases; this file explains how to capture and store snippets.

## Rules

- Before reusing a selected function's snippet, confirm that its version matches the game version under examination. For a case checking the running game, obtain that version from `GET /game-version` on the debug server. An existing older snippet does not establish current behavior; capture the matching-version function when it is absent. If the version under review remains unclear, ask the human before choosing a snippet.
- These files are evidence, not implementation. They are never imported by application code.

## Understanding callers and finding additional source

Follow the shared [research specialists rule](../../AGENTS.md#research-specialists) before exploratory research. Prefer the debug server for locating functions and inspecting relevant callers. A calculation snippet may establish what a function returns without explaining how the game uses it.

When the debug server is insufficient, the local game source is available at `/home/sludge/Development/IdleonWikiBot/codefiles/idleon<version>.txt`. Select the file matching the version under examination.

This is a 40 MB+ obfuscated file: never load the entire file into memory or agent context. Start from an exact identifier already found in a snippet or debug-server result, such as a function name, dispatcher key, or ActorEvents identifier. Use targeted, streaming searches with bounded output, then inspect only the surrounding code needed to answer the question. Bound output by bytes or characters as well as matches or lines: a single obfuscated line can be enormous. Avoid broad mechanic-name searches and unbounded output.

Use this source to resolve specific questions about callers, conditions, and usage. If source attribution remains ambiguous, ask the human rather than guessing a script. Apply [RESEARCH-01](../../CODING_STANDARDS.md#research-01--understand-the-player-and-mechanic) to mechanic meaning. For website design, use the [implementation patterns guide](../agents/implementation-patterns.md).

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
 * Work reference: <feature or issue reference>
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

   The response must identify exactly one `scripts.ActorEvents_<number>` entry before capture. If the function is not found or the response is ambiguous, use the [targeted source exploration above](#understanding-callers-and-finding-additional-source) to locate the owning function and script, then confirm that target through the debug server. If attribution remains ambiguous or runtime capture is unavailable, stop and ask the human; never guess a script or label local-file text as a runtime capture.

3. Evaluate that script's entire function source:

   ```bash
   curl -fsS -X POST http://localhost:3100/exec \
     -H "Content-Type: application/json" \
     -d '{"expression":"window.frames[0].__idleon_cheats__[\"<ActorEventsScript>\"]._customBlock_<FunctionName>.toString()"}'
   ```

   Save the entire returned function, without truncation or hand edits, at `docs/game-snippets/<domain>/<FunctionName>.<version>.js`, using the metadata header above with the placeholders replaced. If that same-version path already exists and its content differs from the returned function or metadata, stop and ask the human; never guess or overwrite it. Identical existing content may be reused.

