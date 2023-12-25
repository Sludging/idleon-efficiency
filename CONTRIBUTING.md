## Getting started

I haven't done this fresh in a while so please let me know if this doesn't work properly smoothly.

It should be as simple as running `npm install` or `yarn install` (depending on your tool of choice) followed by `yarn dev` or `npm run dev`.

## How can you help

In no particular order:
* Fixing bugs based on your own findings or requests from users on the Discord.
* Adding new features based on your own needs or requests from users on the Discord.
* Improving the usage of React/TypeScript/NextJS or generally any improvements to the mess that I've created.
* Improving the way the init/parse/calculate phases work. They are very fragile at the moment, more on that below.

## What limitations do you have

I'm the only one with powers to deploy or merge pull requests, so you are bottle-necked by my ability to review and test your work. 

Every PR should fail saying it wasn't able to deploy to Vercel. This is expected and I'll remediate that in the future if I see an opportunity.

## What's wrong with the data flow

* `init` - My recent refactor broke this down to it's own phase and I think it works semi-well. The issue comes with how I try to do the init phase only once and it means the `parse` function often ends up double adding information and it needs to reset certain information to avoid double handling.
* `calculate phase` - This currently has to happen in a very strict order, or you end up with wrong results. This is very manual and likely to cause mistakes in the future. Any improvements to how order is determined or potentially switching this to some event based approach would go a long way.