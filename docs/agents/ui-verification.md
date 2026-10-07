# Local UI verification

Use this workflow to check a feature's changed UI or inspect screenshots while planning a
mockup on the configured developer machine. The app and Playwright browser run in Docker;
scenarios can use full Playwright APIs and visit any application or temporary preview route.

## Workflow

1. **Start the stack** from the repository root:

   ```sh
   yarn ui:up
   ```

   Optional: `LOCAL_SAVE_FILE=profiles/sludger.json yarn ui:up` selects an existing
   repository-relative JSON save under `profiles/` or `tests/fixtures/saves/`; the default is
   `tests/fixtures/saves/latest.json`. Docker explicitly enables development-only fixture
   mode; `LOCAL_SAVE_FILE` applies only in that mode. Normal host `yarn dev` uses live data
   even with `NEXT_PUBLIC_APP_STAGE=local`. See the
   [fixture-mode configuration](../../sub-projects/ui-verification/README.md#local-save-selection-and-privacy)
   for the opt-in conditions. Rerun `ui:up` after changing the selection and preserve the
   original save.

2. **Write a focused scenario.** Place a temporary `.cjs` file inside the repository, for
   example `.ui-verification/preview.cjs`. Export one async function with `module.exports`.
   The function receives `{ page, context, browser, baseURL, artifactsDir, args }`.

   `page`, `context`, and `browser` are ordinary Playwright objects; `baseURL` is the
   internal app URL, `artifactsDir` is this run's writable output directory, and `args`
   contains arguments after the scenario path. `require('playwright')` is available in the
   browser image for additional contexts or device settings. The default viewport is
   1440×1000; choose screenshot scope for the actual question.

   For mockup planning, render a temporary preview using existing components, theme, and
   data/store where useful. A component or interaction is enough. Representative display
   data is suitable for layout exploration, not game-calculation evidence. For feature
   checks, use the selected real save and wait for route-specific UI and relevant data
   before asserting user-visible outcomes; avoid arbitrary sleeps.

3. **Run and inspect** the scenario:

   ```sh
   yarn ui:run .ui-verification/preview.cjs [args...]
   ```

   Inspect the screenshot and the run's result and console/page errors under
   `.ui-verification/runs/<timestamp-pid>/`. Exercise the changed interaction or capture the
   composition being evaluated, then revise and rerun until the scoped behavior or preview
   is satisfactory. Review and report relevant errors; a passing scenario establishes only
   its exercised assertions, not an error-free app.

4. **Stop and clean up** with `yarn ui:down`. Remove temporary scenarios and preview routes.
   Report the exact command, exercised behavior or screenshot, and relevant observed errors.
   Keep run artifacts private: they may contain account/save data. Inspect and redact before
   sharing; never commit or upload private run output.

For startup/scenario failures or runner maintenance, read the
[UI verification project README](../../sub-projects/ui-verification/README.md) for runtime,
configuration, and save-selection details.
