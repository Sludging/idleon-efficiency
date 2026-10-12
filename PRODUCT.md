# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Players of *Legends of Idleon* across progression stages who want to understand their account state.

## Product Purpose

IdleOn Efficiency helps players understand their account state by presenting game information differently and exposing information the game does not always show. Better data visibility is the core: players can use that information to make their own decisions.

## Capabilities and Constraints

The site parses and synchronizes game-save data for character/account views, calculators, progress tracking, and recommendations; it also supports public profile sharing. ([Core functionality](docs/CODEBASE_OVERVIEW.md#core-functionality)) Recommendations are a useful direction for the product, not a requirement for every page.

Game information and calculations must be grounded in trustworthy evidence from the actual game. The site is a companion, not game automation: it analyzes game-save data without editing saves or performing game actions.

The UI workflow and composition guidance live in the [UI work guide](docs/agents/ui-patterns.md), not here.
