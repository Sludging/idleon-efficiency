## Documentation

This is all written after the fact and in haste in preperation for open-sourcing, if you find any glaring mistakes please reach out to me over discord so I can amend them or better yet, make a PR and amend them yourself!

A lot of comments have been added to various parts of the code as well, hopefully that will be helpful when this information is lacking.

## Technology stack

The project is powered by [NextJS](https://nextjs.org/), using TypeScript as the core language, and hosted using [Vercel](https://vercel.com/).

I've used React very poorly and the website re-renders a whole lot more times then it should, especially on load. This has caused me to put a whole bunch of hacks in various places to avoid messing up data.

## Folder Structure

Pretty much a mess but in general:
* `public` - Hosts public static assets and files
* `pages` - Using the pre App Router approach of NextJS folder structure for the front-end pages. The structure here mimics the URL structure of the pages on the website.
* `components` - Some common shared components between various UI pages or logic. Don't consider this well mantained or actually inclusive of all common components. I wasn't very good at maintaining this.
* `data` - The meat and the potatos of this project. Worthy of it's own section.

## Data flow

The flow of data (should) go as follows:
* Website loads, we initialize all data models with informations from the wiki. This essentially should allow us to render the full website without a user, all UI elements should be functional at this stage.
* We check for existence of a user, if there isn't one we redirect to the login/main page.
* If there is a user, we fetch information from Firebase (the hosting location for all game data)
 * We fetch character names, companions and server variables.
 * We subscribe to updates to the main game data
* When new updates to the game data come in, we trigger a function that parses all incoming information and populates it into the models we initialized earlier.
* We then run a series of (order-sensitive) functions to do post parse calculations. This is essentially calculating cross-impact of various game features on other game features.

There is an added complication for public profiles that is generally handled by the `AppContext` and `_app.tsx`. It's not pretty but it boils down to:
* Figure out if we aren't on the normal domain, i.e. this is a public profile.
* If we are, fetch that profile info and instead of using live data from the cloud save, use the fetch information to render the site.

## Key components

* [AppContext](../data/appContext.tsx) and [AuthContext](../data/firebase/authContext.tsx) are two React Contexts that essnetially help drive the information throughout the website. 
* [idleonData.tsx](../data/domain/idleonData.tsx) is the main workflow engine for initializing, parsing, and updating information. If you ever need to add more game systems or need a starting point, that will be the go to.
* Every file under `data/domain` folder should represent a game feature / concept / data that can be manipulated. Majority of the work for bug fixes and adding support for new features will start here.