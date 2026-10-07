# UI verification runtime

Docker-hosted Next.js and Playwright for agents checking feature UI or planning mockups on
the already-configured developer machine. Dependencies are the working Docker daemon with
Compose v2 and the repository's configured Node/Yarn environment. Use the
[agent workflow](../../docs/agents/ui-verification.md) for focused scenarios and screenshots.

## Runtime and configuration

The root `yarn ui:up`, `yarn ui:run <repo-relative.cjs> [args...]`, and `yarn ui:down`
scripts invoke [the launcher](../../scripts/ui-verification.cjs), which prepares bindings
and configuration before calling [Compose](compose.yml). Start through these scripts rather
than invoking Compose directly.

- The owned project is `idleon-ui-verification`, with app container
  `idleon-ui-verification-app` and browser container `idleon-ui-verification`.
- Both services use a private Docker network and publish no host ports. The browser's fixed
  app URL is `https://app:3000`. The app retains Next's development HTTPS configuration;
  Playwright accepts its development certificate.
- Source is mounted read-only, so host edits reach Next's development watcher. Writable
  volumes hold app dependencies, Yarn install state, `.next`, and development certificates.
  Dependency/Yarn volumes are keyed by dependency manifests and app startup/image inputs,
  seeded from the app image rather than host-installed dependencies. Private writable copies
  of `next-env.d.ts` and `tsconfig.json` live under `.ui-verification/app-config/` and are
  refreshed on startup; source originals remain untouched.
- Browser dependencies are isolated in this sub-project. [Its package manifest](package.json)
  selects Playwright and the matching Chromium image; scenarios can `require('playwright')`
  without a root Playwright dependency.
- Startup builds/starts both services and waits up to 600 seconds for Compose readiness.
  `ui:run` requires the stack already running. `ui:down` removes the owned services/network
  while retaining caches and private artifacts.

## Local save selection and privacy

The startup environment's optional `LOCAL_SAVE_FILE` selects a repository-relative existing
JSON file under `tests/fixtures/saves/` or `profiles/`; otherwise startup uses
`tests/fixtures/saves/latest.json`. Environment files are not consulted for this selector.
Absolute paths, missing/non-files, invalid JSON, and paths or symlinks escaping the allowed
roots fail startup. Rerun `yarn ui:up` after changing the selection; no source save is
rewritten or replaced.

The Docker app explicitly opts into fixtures with `NODE_ENV=development` and
`NEXT_PUBLIC_UI_FIXTURE_MODE=1`. Both are required for local-save selection and the synthetic
local profile route; production ignores the fixture flag. `NEXT_PUBLIC_APP_STAGE=local`
remains an environment label, not a data-source switch. Normal host `yarn dev` uses live
authenticated cloudsave data even with that stage label unless fixture mode is explicitly
enabled.

`LOCAL_SAVE_FILE` is effective only in fixture mode and is startup configuration, not a
`NEXT_PUBLIC_*` setting. The selected save enters the local browser's client data path, so
screenshots and reports can contain account information: keep sessions and run output
private, inspect/redact before sharing, and never commit or upload private artifacts.

## Results and failure diagnosis

[The runner](runner.cjs) uses the
[scenario contract in the agent guide](../../docs/agents/ui-verification.md#workflow).

Private run output goes to `.ui-verification/runs/<timestamp>-<pid>/`: a best-effort
`final.png`, `errors.json`, and `result.json` are recorded on success or failure. Directories
use mode `0700` and JSON reports `0600`. A thrown scenario error produces exit status 1;
console/page errors from the provided `page` are recorded but do not automatically fail a scenario.

- **Startup failure:** inspect the launcher's recent app/browser logs before retrying. An
  HTTP 500 compile-error response is unhealthy. Check Docker/Compose availability and the
  selected save; runtime/configuration changes belong in the launcher and Compose files.
- **Scenario failure:** inspect the result and relevant console/page errors. Confirm the
  `.cjs` path is repository-relative and exports an async function. Wait for the feature's
  loaded data or visible state rather than assuming HTTP readiness proves page readiness.
- **Maintenance:** app image/startup details live in [app.Dockerfile](app.Dockerfile) and
  [app-entrypoint.sh](app-entrypoint.sh); browser image details live in [Dockerfile](Dockerfile).
  Keep the launcher, Compose bindings, and runner contract aligned when changing them.
