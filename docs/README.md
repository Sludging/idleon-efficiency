## Documentation

This is all written after the fact and in haste in preparation for open-sourcing. If you find any glaring mistakes please reach out over Discord so I can amend them — or better yet, make a PR and amend them yourself.

A lot of comments have been added to various parts of the code as well, hopefully that will be helpful when this information is lacking.

**AI assistants:** Start with [AGENTS.md](../AGENTS.md) at the repo root.

## Technology Stack

The project is powered by [Next.js](https://nextjs.org/) (App Router), using TypeScript as the core language, and hosted using [Vercel](https://vercel.com/).

I've used React very poorly and the website re-renders a whole lot more times than it should, especially on load. This has caused me to put a whole bunch of hacks in various places to avoid messing up data.

## Documentation Index

| Document | Description |
|----------|-------------|
| [AGENTS.md](../AGENTS.md) | Agent bootstrap — project overview, skills, constraints |
| [CODEBASE_OVERVIEW.md](CODEBASE_OVERVIEW.md) | Detailed technical architecture |
| [NEW_FEATURE_IMPLEMENTATION_GUIDE.md](NEW_FEATURE_IMPLEMENTATION_GUIDE.md) | Step-by-step feature implementation |
| [TESTING_IMPLEMENTATION.md](TESTING_IMPLEMENTATION.md) | Testing strategy and patterns |
| [GAME_CODE_PROCESSOR_PLAN.md](GAME_CODE_PROCESSOR_PLAN.md) | Game code processor plan |
| [runbooks/update-game-version.md](runbooks/update-game-version.md) | Game version update procedure |
| [runbooks/sync-game-assets.md](runbooks/sync-game-assets.md) | Asset sync to S3 procedure |
| [runbooks/local-paths.example.md](runbooks/local-paths.example.md) | Local path placeholders for runbooks |
| [../skills/README.md](../skills/README.md) | Skills index and maintenance guide |
| [../CONTRIBUTING.md](../CONTRIBUTING.md) | Contributor guidelines |

## Folder Structure

Pretty much a mess but in general:

* `app/` — Next.js App Router pages (world-1 to world-7, account, profile, etc.)
* `components/` — Shared React components between UI pages
* `data/` — The meat and potatoes of this project. Worthy of its own section.
* `lib/` — Efficiency engine, Zustand stores, utilities
* `tests/` — Jest test suite with live game extraction configs
* `reference-repos/` — Competitor codebases for domain/parser reference only

## Data Flow

The flow of data (should) go as follows:

* Website loads, we initialize all data models with information from the wiki. This essentially should allow us to render the full website without a user; all UI elements should be functional at this stage.
* We check for existence of a user; if there isn't one we redirect to the login/main page.
* If there is a user, we fetch information from Firebase (the hosting location for all game data)
 * We fetch character names, companions and server variables.
 * We subscribe to updates to the main game data
* When new updates to the game data come in, we trigger a function that parses all incoming information and populates it into the models we initialized earlier.
* We then run a series of (order-sensitive) functions to do post-parse calculations. This is essentially calculating cross-impact of various game features on other game features.

There is an added complication for public profiles that is generally handled by the app context layer. It's not pretty but it boils down to:

* Figure out if we aren't on the normal domain, i.e. this is a public profile.
* If we are, fetch that profile info and instead of using live data from the cloud save, use the fetched information to render the site.

## Key Components

* [AppContext](../data/appContext.tsx) and [AuthContext](../data/firebase/authContext.tsx) are two React Contexts that essentially help drive the information throughout the website.
* [idleonData.tsx](../data/domain/idleonData.tsx) is the main workflow engine for initializing, parsing, and updating information. If you ever need to add more game systems or need a starting point, that will be the go-to.
* Every file under `data/domain` folder should represent a game feature / concept / data that can be manipulated. Majority of the work for bug fixes and adding support for new features will start here.
