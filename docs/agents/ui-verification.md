# Local UI verification

Use the Docker app and Playwright runner to check changed UI or capture screenshots for
mockup planning on the configured developer machine.

## Workflow

1. **Check readiness** from the repository root:

   ```sh
   yarn ui:status
   ```

   If it is not ready, start it:

   ```sh
   yarn ui:up
   ```

   Startup commands serialize automatically. If startup fails, inspect the reported error
   and app/browser logs before continuing.

2. **Write a focused scenario** at a unique temporary path, such as
   `.ui-verification/alchemy-preview-a1b2.cjs`. Export one async function with
   `module.exports` and use the supplied `page`, `context`, and `browser` objects. See the
   [scenario contract](../../sub-projects/ui-verification/README.md#scenario-contract).

   Exercise the changed interaction and assert its user-visible outcome. Wait for the
   route's UI and relevant data rather than using arbitrary sleeps. For mockup planning,
   capture the composition being evaluated; a component or interaction is enough. Give
   temporary preview routes unique names and use existing components, theme, and data/store
   where useful. Representative display data is suitable for layout exploration, not
   game-calculation evidence.

3. **Run and inspect**:

   ```sh
   yarn ui:run .ui-verification/alchemy-preview-a1b2.cjs [args...]
   ```

   Inspect the screenshot, result, and console/page errors under
   `.ui-verification/runs/<timestamp>-<pid>/`. Revise and rerun until the changed behavior
   or preview is verified. A passing scenario proves only its exercised assertions;
   report relevant observed errors.

4. **Report and clean up.** Report the exact command and exercised behavior or screenshot.
   Remove only your own temporary scenarios and preview routes. Leave the containers running.

   Run artifacts may contain account/save data. Keep them private, inspect and redact before
   sharing, and never commit or upload private output.

The [runtime README](../../sub-projects/ui-verification/README.md) documents startup options,
fixture mode, and run artifacts.
