# UI verification runtime

Docker-hosted Next.js and Playwright for feature UI checks and mockup screenshots on the
configured developer machine. Requires Docker with Compose v2 and the repository's Node/Yarn
environment. Follow the [UI verification workflow](../../docs/agents/ui-verification.md).

## Commands and runtime

The root `yarn ui:status`, `yarn ui:up`, `yarn ui:run <repo-relative.cjs> [args...]`, and
`yarn ui:down` scripts use [the launcher](../../scripts/ui-verification.cjs) and
[Compose configuration](compose.yml).

- `ui:status` checks Docker availability, container state, and app health without changing
  configuration or services or creating artifacts. It exits 0 when ready and 1 otherwise.
- `ui:up` prepares configuration, builds/starts both services, and waits up to 600 seconds for
  Compose readiness. Startup commands serialize automatically.
- `ui:run` requires the containers to be running.
- `ui:down` is explicit manual shutdown. It removes services and the network while retaining
  caches and private artifacts. Leave the containers running after verification.

The Compose project is `idleon-ui-verification`; its containers are
`idleon-ui-verification-app` and `idleon-ui-verification`. The app and browser containers are
reused, while [the runner](runner.cjs) launches and closes Chromium for each scenario.
Both services use a private Docker network without published host ports. The browser uses
`https://app:3000` and accepts the app's development HTTPS certificate.

Source is mounted read-only; host edits reach Next's development watcher. Writable volumes
hold dependencies, Yarn install state, `.next`, and development certificates. Dependency
volumes are keyed by dependency manifests and app startup/image inputs and seeded from the
app image. Startup refreshes private writable copies of `next-env.d.ts` and `tsconfig.json`
under `.ui-verification/app-config/`, leaving source originals untouched.

Browser dependencies live in [this project's package manifest](package.json), which selects
Playwright and the matching Chromium image. App startup details live in
[app.Dockerfile](app.Dockerfile) and [app-entrypoint.sh](app-entrypoint.sh); the browser image
uses [Dockerfile](Dockerfile).

## Local save and privacy

Startup uses `tests/fixtures/saves/latest.json` by default. Optional `LOCAL_SAVE_FILE` selects
an existing repository-relative JSON file under `tests/fixtures/saves/` or `profiles/`.
Environment files are not consulted for this option. Absolute paths, missing/non-files,
invalid JSON, and paths or symlinks escaping those directories fail startup. The option
applies to app startup, not individual scenarios, and does not rewrite the source save.
The launcher's private `tsconfig.json` copy aligns `@profile-source` and `@local-save` with the validated selected fixture; the root `tsconfig.json` and normal host `yarn dev` behavior remain unchanged.

The Docker app enables fixtures with `NODE_ENV=development` and
`NEXT_PUBLIC_UI_FIXTURE_MODE=1`. Both are required for local-save selection and the synthetic
local profile route; production ignores the fixture flag. `NEXT_PUBLIC_APP_STAGE=local`
is an environment label, not a data-source switch. Normal host `yarn dev` uses authenticated
cloudsave data unless fixture mode is explicitly enabled. `LOCAL_SAVE_FILE` is effective
only in fixture mode and is not a `NEXT_PUBLIC_*` setting.

The selected save enters the browser's client data path. Screenshots and reports can contain
account information: keep run output private, inspect/redact before sharing, and never
commit or upload private artifacts.

## Scenario contract

Place a uniquely named temporary `.cjs` file inside the repository, such as
`.ui-verification/alchemy-preview-a1b2.cjs`, and export one async function with
`module.exports`. The runner passes `{ page, context, browser, baseURL, artifactsDir, args }`:

- `page`, `context`, and `browser` are Playwright objects from this scenario's Chromium instance.
- `baseURL` is the internal app URL; `artifactsDir` is this run's writable output directory.
- `args` contains arguments after the scenario path.

Use these objects for browser interactions. `require('playwright')` is available for additional
contexts or device settings. The default viewport is 1440×1000. Scenarios can visit application
or temporary preview routes and choose screenshot scope for the UI being checked.

## Run artifacts

Each run writes private output to `.ui-verification/runs/<timestamp>-<pid>/`: best-effort
`final.png`, `errors.json`, and `result.json` on success or failure. Directories use mode
`0700` and JSON reports `0600`. A thrown scenario error produces exit status 1.
Console/page errors from the supplied `page` are recorded but do not automatically fail
the scenario. HTTP readiness does not establish that a route's UI and data have loaded.
