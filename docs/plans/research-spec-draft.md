# Research: product specification

**Approved product specification.** [Scope source](research-research-brief.md) · [Approved delivery parts](research-delivery-parts-draft.md) · [Handoff and approval state](research-research-brief.md#current-handoff).

**Feature issue:** [#461 — Research product specification](https://github.com/Sludging/idleon-efficiency/issues/461).

## Problem Statement

Players cannot inspect their full Research account on the website. Existing Research Grid calculations lack a dedicated player surface.
Players need current progress, effects, requirements, and source contributions together.
## Solution

Provide a read-only Research surface for account growth, discoveries, lens production, Grid upgrades, Points, and Shapes.
Explain unfamiliar terms beside their entries. Show supported current contributors beside the stats they affect.

Use dense illustrated Observation cards within shared Part 1 tabs for Observations, Lenses, Posty Notes, and Papers. Keep complete catalogues available; empty Observation search shows all entries.
Use dense flat Part 2 Grid and Shape card catalogues with all entries visible by default. Retain name/effect search. Grid adds Show maxed and an exclusive State filter; Shapes adds an ownership State filter. Gameplay actions remain in the game.
Show current information, not a planner or recreated game boards.

Exactly two substantial parts deliver backend information through independently usable UI:

1. **Account growth, discoveries, and lens production:** account level and supported EXP context, Observations, attempts, lenses, Insight, current EXP, offline percentage, Papers, and Posty Notes.
2. **Grid upgrades, Points, and Shapes:** Point balance and sources, all real upgrades, Research-owned linked unlocks, and actual Shape effects.

Both parts are required for complete scope. Neither depends on the other's UI or delivered data work.
Each part must establish its required saved-state mappings, external inputs, and calculation dependencies.
Existing Grid calculations do not establish complete data readiness. Gameplay interactions do not create delivery blockers.

## User Stories

1. **Account progress — Part 1**
   As a player, I want current account Research progress so I can understand growth.

2. **Discoveries and attempts — Part 1**
   As a player, I want each Observation's discovery conditions so I can understand what prevents a discovery now.

3. **Lens production and Insight — Part 1**
   As a player, I want actual lens production and Insight so I can understand what my saved arrangement contributes.

4. **Research gains, offline percentage, and Papers — Part 1**
   As a player, I want current Research gains and Paper benefits so I can distinguish production, offline modifiers, and purchases.

5. **Milestones — Part 1**
   As a player, I want reached and upcoming Posty Notes so I can understand rewards.

6. **Point balance — Part 2**
   As a player, I want available Points relative to earned Points and their sources so I can understand my current balance.

7. **Grid upgrades and linked unlocks — Part 2**
   As a player, I want Grid upgrade effects and requirements so I can understand current bonuses and linked unlocks.

8. **Shapes and effective coverage — Part 2**
   As a player, I want actual Shape coverage and effects so I can understand what my saved placements change.

The [approved delivery parts](research-delivery-parts-draft.md) retain detailed backend data, UI information, and standalone acceptance outcomes for these stories.

## Product constraints

- **Account state:** Research level is account-wide. Preserve highest-level/lowest-ID reference selection internally.
  Part 1 shows plain Research level and supported EXP progress without save timestamps, character identity, or provenance exposition. Do not show separate character progression or project beyond current state.
- **Complete coverage:** Include all named Observations, Grid upgrades, Shape definitions, and Posty Notes.
  Placeholder Grid positions are not upgrades. Missing parsing or metadata does not reduce this scope.
- **Browsing:** Part 1 uses shared content tabs, name/map search, and Game order, Research EXP highest, and Insight highest sorts.
  Show actual discovery ownership once as `Observations (found/43)`. Do not add an Overview tab, Activity filter, page-jump links, or exact-number reveals. Part 2 defaults to all 60 upgrades and ten Shape definitions. Grid starts with **Show maxed** checked and **State: All**, with exclusive All/Leveled/Reachable/Unreachable choices. Reachable means not leveled but reachable. Shapes uses All/Owned/Not owned and no maxed control. Keep name/effect search and clear behavior. Grid opacity is 1/0.65/0.35 for purchased/reachable-unleveled/unreachable; purchase wins display classification without changing prepared reachability. Shapes uses ownership opacity 1/0.35. Do not add Grid access labels or tooltips. Do not require spatial boards or invent upgrade categories.
- **Discovery and study:** Separate revealed-prefix visibility, prior discovery, exhausted account attempts, and maximum roll below threshold. Keep study-level requirements independent.
  These conditions can coexist and do not establish map access. Only currently hidden, not-found cards show their source-backed reveal level. Keep the first-discovery prerequisite distinct. Use 1/0.65/0.35 opacity for found/revealed-missing/hidden cards without repeated visible state labels.
- **Current effects:** Describe actual lens placements, Insight, and Kaleidoscope support.
  Kaleidoscopes affect slots directly left, right, above, and below, not diagonals.
  Insight levels individual Observations; it is not Research skill EXP. Keep local effects distinct from total-Observation-level effects.
  Show actual Shape coverage and each square's active Shape. Grid cards use top-right active Shape artwork with a hover/focus name-and-factor tooltip. Show the shared Grid factor once above the catalogue. Shape cards retain complete static descriptions, actual saved placement/rotation, code-backed factors, and complete saved-owner coverage; secondary coverage and linked context may use focusable tooltips.
- **Papers and milestones:** Distinguish consumable Half Finished Research Papers from permanent Professional Papers.
  Posty Notes are level milestones. Their pictured Shapes do not guarantee the next Shape awarded.
- **Ownership:** Research owns its stats, upgrades, effects, and unlock descriptions.
  Related activities own their progression, resources, records, and actions. Consume required external values without transferring ownership.
- **Contributors:** Show supported current contributors beside EXP, offline percentage, Insight, Kaleidoscope effects, roll modifiers, Points, lenses, and Shapes.
  Preserve additive versus multiplicative meaning. Do not sum unlike description percentages. Part 1 attaches concise source tooltips to affected values, shows intrinsic inactive rewards through opacity, and omits inactive suffixes. Only positive Observation EXP rates have tooltips. Part 2 uses this value-attached tooltip pattern for Points and Shape ownership, without visible source catalogues. Show Points as available/earned only, without separate earned/spent fields. Label upgrade ratios **Level**; omit repeated Maxed and visible active Shape factors.

- **Independent delivery:** Keep shared route, account parsing, integration, targeted research, and static-export audits inside the relevant part.
  Do not create extra prerequisite, data, or verification tickets.

## Required information limits

- **Account EXP:** The highest-saved-level rule does not select an account EXP copy. Establish supported EXP presentation inside Part 1.
- **Part 1 evidence:** Establish required Observation, lens, and milestone metadata, current EXP and Insight outputs, contributors, and displayed units.
  Resolve caller and save-age questions where a required display depends on them. Do not assert unverified claim behavior or reset timing.
- **Part 2 evidence:** Establish complete upgrade metadata, Point calculations, current effects, requirements, and actual Shape ownership, coverage, and modifiers.
  Preserve linked-effect conditions and code-backed Shape behavior. Existing calculations do not prove complete dependency mapping or catalogue parity.
- **Source authority:** Use current game code when descriptions or Wiki prose conflict.
- **Evidence scope:** The [current handoff](research-research-brief.md#current-handoff) records accepted Part 1 evidence and limits; the [source record](research-research-brief.md#sources) retains references.
  Historical correctness closeouts do not certify the complete Grid. All-source Shape obtainability remains unverified.

Each delivery part must resolve its required evidence and mappings within its own scope.

## Testing Decisions

Use the repository's [testing skill](../../skills/testing/SKILL.md), [domain calculation guide](../TESTING_IMPLEMENTATION.md), and [extraction helper guide](../../tests/helpers/README.md).
The following testing seams are a delivery proposal.

- **Application seam:** Load the retained real save through the existing save loader.
  Test populated typed public domain results used by the application. Assert player-facing results, not object layout or isolated formula copies.
- **Core comparisons:** Compare selected progression, attempts, lens/Insight production, EXP, offline percentage, Points, upgrades, and Shape effects with original-game values.

- **Direct parameters:** Compare every calculation directly used by a selected result with its extracted game value. Static data and trivial helpers are not parameter targets.
  Dependencies used only inside another producer belong to that producer's tests.

- **Observed coverage:** Select distinct behaviors and representative inputs from the paired real save.
  Cover observed discovery conditions, lens kinds, adjacency, local and total Insight effects, upgrade gates, special scaling, and active Shape ownership.
  Record unobserved behavior as a coverage question. Do not synthesize saves, alter inputs, or derive expectations from website code.
  Configured tolerance `0` uses the repository's shared baseline. Do not widen tolerances to hide failures.
- **Existing patterns:** Reuse the Research [Grid core](../../tests/domains/research/grid-bonus.test.ts) and [parameter](../../tests/domains/research/grid-bonus-parameters.test.ts) patterns.
  Use Spelunking [progression core](../../tests/domains/spelunking/progression.test.ts) and [parameter](../../tests/domains/spelunking/progression-parameters.test.ts) tests for paired-save state and condition comparisons.
  These patterns do not prove that Research's full scope passes.
- **Rendered UI seam:** Verify each part with a real saved account.
  Compare rendered information with populated backend state and verified metadata.
  Check catalogue counts, current values, ownership, requirements, discovery conditions, contributors, search, and default visibility.
  For Part 1, check four tabs, three sorts, stable discovery counts, distinct discovery/study requirements, hidden-only reveal lines, illustrated rewards, and shared theme progress bars. Artwork tint uses approximate current-level palette-derived CSS hue, not exact in-game artwork parity. For Part 2, check full default catalogues, all State options, combined search/filters, Show maxed, clears, source and active-owner tooltips, linked conditions, actual placement/rotation, and complete saved-owner coverage.
## Out of Scope

- Separate character Research progression or an assumed maximum-EXP account policy.
- Unverified rate units, claim behavior, cache/save-age projections, reset timers, or UTC-midnight assumptions presented as facts.
- Simulations, optimizers, recommendations, hypothetical placements or comparisons, discovery probabilities, away-time forecasts, or ETA planning.
- Required spatial boards, invented upgrade families or categories, and layout changes beyond the selected Part 1 and Part 2 presentation.
- Related activity progression panels, resource tables, trade inventories, or activity actions.
  Cross-domain navigation and a standalone outside-contributor catalogue are also excluded.

