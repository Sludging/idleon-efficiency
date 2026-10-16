# The Hole: approved product specification

**Status:** APPROVED PRODUCT/DELIVERY SCOPE / PUBLISHED / PARTS 1–3 COMPLETE — Original approval recorded on 2026-10-12. Part 1 [#441](https://github.com/Sludging/idleon-efficiency/issues/441) was accepted as complete on 2026-10-14; part 2 [#442](https://github.com/Sludging/idleon-efficiency/issues/442) was accepted as complete on 2026-10-15; part 3 [#443](https://github.com/Sludging/idleon-efficiency/issues/443) was accepted as complete on 2026-10-16. Parent [#440](https://github.com/Sludging/idleon-efficiency/issues/440) remains open. Parts 4–7 remain open and unselected. See the [current handoff](hole-research-brief.md#current-handoff) for accepted evidence, limits, and settlement.

**Scope source:** [Approved research brief](hole-research-brief.md). **Delivery detail:** [Seven approved delivery parts](hole-delivery-parts-draft.md). **Research issue:** [#438 — The Hole: approved research brief and visibility scope](https://github.com/Sludging/idleon-efficiency/issues/438).

Product approval settled the product scope and seven-part delivery split; it did not authorize IA or execution. Later human decisions selected the canonical three-tab IA and separately authorized parts 1–3 through completion. Parts 4–7 remain unselected and require separate human selection and authorization.

## Problem Statement

Players need one trustworthy view of The Hole's current progression, requirements, resources, and effective benefits across camp and all released caverns. Unlocks, purchases, stored progress, claim-ready rewards, and temporary game state have different meanings. Shared resources and daily constraints also compete across features, while character capability remains character-specific. Players cannot understand their position from unexplained totals or incomplete feature coverage.

## Solution

Provide read-only visibility and verified capability for camp, all five villagers, and all 18 released caverns. Players can browse, search, filter, compare relevant characters, and inspect progression where useful, alongside names, descriptions, requirements, costs, and effect sources.

Show imported state and verified current-state arithmetic: effective benefits, supported rates, next costs, affordability, and shortfalls. Explain what is owned, what is available, and what remains. Contextual explanations must help players interpret displayed values, requirements, effects, costs, and reset consequences; they are not an exhaustive rules reference or walkthrough. Do not turn this visibility into a forecast, allocation planner, or strategy tool.

## User Stories

Each story describes one complete player experience and maps to the same-numbered delivery part.

1. **Villager growth, Opals, and Studies**  
   As a player, I want to inspect all five villagers' rescue state, levels, EXP, and investment, the complete Opal ledger and allocation/reset context, Studies, and Lantern inventory/use, so I can understand growth, earned resources, and shared constraints.

2. **Schematics, Majik, and Measurements**  
   As a player, I want to inspect all camp upgrades, including Pocket Divinity, with their progression, requirements, costs, and effective benefits, so I can understand what I own, what is available, and which resources compete.

3. **Skilling layers and character capability**  
   As a player, I want to inspect Motherlode, Hive, Evertree, and Trench progression alongside each character's relevant capability, so I can distinguish layer readiness, resource and efficiency requirements, and the shared claim allowance.

4. **Well, Bell, Harp, and Lamp progression**  
   As a player, I want to inspect these caverns' production, saved settings, upgrades, resources, and effective benefits, so I can understand current progression, competing costs, and reset consequences.

5. **Jars, Fountain, and Cove progression**  
   As a player, I want to inspect these caverns' saved production and collection state, holdings, upgrades, and local or account-wide benefits, so I can understand my economies, earned progression, and remaining requirements.

6. **Bravery, Justice, and Wisdom progression**  
   As a player, I want to inspect monument respect, milestones, story charge, permanent rewards, and saved starting capability, so I can distinguish earned progression from normal-story capability and unclaimed benefits.

7. **Dawg Den, Grotto, Gambit, and Temple progression**  
   As a player, I want to inspect these caverns' persistent records, readiness, current capability, costs, and rewards, so I can understand remaining milestones and supported benefits without predicted outcomes.

## Product decisions

- **Complete released scope:** Camp, all five villagers, and all 18 released caverns remain required. Future placeholders and unavailable source-only entries must not appear as released useful effects.
- **Visibility:** Show released content, including locked entries, by default. Where useful, offer **Show unlocked** to restrict the view. Browsing, search, filtering, and read-only comparisons are capabilities to use where they help; no global control set or presentation layout is prescribed.
- **Ownership and meaning:** Preserve account-wide versus character-specific state, current versus lifetime totals, stock versus dedicated progress, saved level versus claim-ready progress, and owned versus potential benefits. Unknown inputs must not become zero. Saved settings do not establish transient actor selections.
- **Current calculations:** Show verified current-state rates, effects, costs, shortfalls, and capability comparisons with relevant contributors and effective caps. Probabilities and expected gains are not guaranteed outcomes. Pocket Divinity is not dismissed as useless with Doot; verify the effective character gate and overlap.
- **Snapshot boundary:** Do not advance production, balances, readiness, or progress from import time to now. Do not imply live freshness or reconstruct active challenge state from persistent totals.
- **Shared constraints:** Distinguish Lantern inventory and daily usage, shared skilling claims, Gambit entry, and Cove discount usage. The six-versus-five layer limit remains an explicit data question until verified, not an invented authoritative allowance.
- **Context, not a game guide:** Explain only what players need to interpret displayed state, requirements, benefits, costs, and reset consequences. Wisdom covers normal-story saved starting capability and permanent progression, not instructions for playing its memory game.

## Verification

Use the repository's existing backend testing and game-calculation validation process in the [testing skill](../../skills/testing/SKILL.md). Verify displayed current-state arithmetic against corresponding actual-game outputs with matched inputs; source inspection alone does not establish personalized calculation parity.

Use the existing [frontend verification process](../agents/ui-verification.md) to exercise and inspect the actual player-facing outcome. Each authorized part must demonstrate its verified information through a usable UI, preserving the field distinctions and snapshot boundary above. No new testing seam is proposed.

## Out of Scope

- Standalone efficiency/rate engines, hypothetical allocations, simulations, forecasts, countdowns, ETAs, recommendations, predicted survival, or guaranteed random reward timelines.
- Snapshot-to-now extrapolation, live transient boards/meters/wallets, pending story rewards, invented character contribution histories, or website-selected actors treated as game state.
- An exhaustive game-rules reference, walkthrough, standalone wiki, future-content commitments, or claims that all placeholder reward slots have released useful effects.

## Further Notes

### Seven-part mapping

| Part | Complete experience | Coverage |
|---|---|---|
| 1 | Villager growth, Opals, and Studies | All five villagers, complete Opal ledger/allocation/reset context, Studies, Lantern inventory/use |
| 2 | Schematics, Majik, and Measurements | All camp upgrades, Pocket Divinity, requirements, costs, and effective benefits |
| 3 | Skilling layers and character capability | Motherlode 2, Hive 8, Evertree 12, Trench 17 |
| 4 | Well, Bell, Harp, and Lamp progression | Well 1, Bell 5, Harp 6, Lamp 7 |
| 5 | Jars, Fountain, and Cove progression | Jars 11, Fountain 16, Cove 18 |
| 6 | Bravery, Justice, and Wisdom progression | Bravery 4, Justice 10, Wisdom 13 |
| 7 | Dawg Den, Grotto, Gambit, and Temple progression | Dawg Den 3, Grotto 9, Gambit 14, Temple 15 |

All seven parts are required. Splitting camp separates villager growth and shared resources from purchased account upgrades. The skilling part is coherent around layers, character efficiency, and shared claims; the monument part is coherent around respect, milestones, story charge, and permanent rewards. The other cavern groups provide substantial coverage boundaries without asserting that their distinct mechanics form one shared system.

Parts define delivery and ownership boundaries, not navigation, tabs, or pages. They impose no player-facing sequence. Each owns the persistent inputs and modifiers needed for its outcome; no part is specified as waiting for another part's UI. Technical dependencies have not been assessed. The [approved delivery parts](hole-delivery-parts-draft.md) hold detailed acceptance outcomes and information needs without duplicating them here.

### Evidence and approval stop

The [brief's research gaps](hole-research-brief.md#5-factual-gaps-and-current-coverage) describe source-time uncertainties. Parts 1 and 2 resolved inputs and accepted verification limits are recorded in the [current handoff](hole-research-brief.md#current-handoff). Remaining gaps belong to their owning parts. Missing evidence does not shrink the agreed feature to existing backend coverage. The hidden placeholder UI and incomplete research-time backend are not behavior or design authority. Research did not establish a connected live Hole surface or complete personalized output parity.

The human approved this specification and the seven delivery parts on 2026-10-12 and authorized publication. That approval alone granted no part selection or implementation authority. Later part 1, part 2, and part 3 approvals, execution records, and final completion acceptances remain in the handoff. This settlement adds no game evidence, calculation comparisons, runtime/UI checks, tests, builds, lint, or formatter results.

For planning any Hole page, use the [canonical information architecture — Navigation](hole-ui-information-architecture.md#navigation), including its page-design decisions and delivery-part reference map. The human selected this three-tab direction on 2026-10-12. Delivery parts remain ownership boundaries, not navigation. Parts 1–3 are complete; parts 4–7 remain unselected. The [current handoff](hole-research-brief.md#current-handoff) records accepted evidence and limits. This settlement does not authorize any other part.
