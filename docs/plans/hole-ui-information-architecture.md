# The Hole: selected information architecture

**Status:** HUMAN-SELECTED DIRECTION — documented 2026-10-12. This is the current repository reference for planning Hole pages and features.
The three-tab structure and information ownership below are selected. This reference does not itself authorize part-level layouts or execution. Separate part approvals and completed delivery are recorded in the [current handoff](hole-research-brief.md#current-handoff).

**Scope authority:** The [approved specification](hole-spec-draft.md), [seven delivery scopes](hole-delivery-parts-draft.md), and [published #440](https://github.com/Sludging/idleon-efficiency/issues/440) retain their accepted outcomes.
This reference maps those outcomes to navigation and owners; its coverage tables do not replace the full specification or add an exhaustive field contract.
Use its stable section anchors when planning an individual page. Keep existing [UI patterns](../agents/ui-patterns.md), [DESIGN.md](../../DESIGN.md), and [PRODUCT.md](../../PRODUCT.md) as presentation authority.
The [rejected rail preview](hole-ui-preview.html) and [earlier IA research](hole-ui-ia-research.md) are historical background, not current design authority.
Their browser observations do not verify this selected direction. This document is a reusable page-planning contract, not a mockup or production authorization.

## Navigation

Exactly three top-level tabs, in this order: **Villagers**, **Upgrades**, **Caverns**.

| Tab | Selected navigation and scope |
|---|---|
| [Villagers](#villagers) | Shared progression and Opal information across all five villagers; relevant individual details when useful. |
| [Upgrades](#upgrades) | Left-side selection: **Majik**, **Schematics**, **Studies**, **Measurements**, in that order. |
| [Caverns](#caverns) | Left-side selection: one entry for each of the 18 cavern identities, in game/release order. |

The simpler navigation does not impose a common workspace, content depth, or summary/detail template.
Keep cavern selection directly discoverable; do not pre-consolidate it into Combat, Production, Skilling, or Monuments navigation.
There is no standalone Overview, Opals, resources, or Lantern navigation destination, and delivery parts are not navigation categories.
All browsing and selection are read-only inspection of imported account state. Website controls do not change game targets, settings, investments, modes, or assignments.

## Villagers

Keep **Polonai, Kaipu, Cosmo, Minau, and Bolaia** identifiable together, including rescue/access state where known.
This tab owns shared growth information, Opal investment, the full source ledger, allocation-dependent benefits, and reset meaning.
It retains saved levels, invested Opals, stored EXP, next requirements, claim readiness, verified current EXP/hour and contributors, and next intrinsic unlocks.
Saved levels, accumulated EXP, and a claim-ready unlock remain different states.

The ledger reconciles cavern and external sources into earned, invested, and uninvested Opals; source links return to their named cavern or external feature.
Explain reset consequences beside investment context: earned Opals, saved levels, and stored EXP remain intact.
Incomplete source attribution must not produce a falsely complete ledger or invented uninvested balance.

Use optional per-villager detail when an individual task needs it. No mandatory per-villager navigation, fixed table, or fixed card composition is selected.
Villagers owns the compact Lantern inventory/location and shared-use explanation required by the growth scope; disclose detail locally when useful.
Relevant tasks may repeat concise Lantern context rather than sending players through a large shared header.
Studies belongs in **Upgrades → Studies**, even though growth and Studies share delivery issue #441.

## Upgrades

The left-side entries are **Majik → Schematics → Studies → Measurements**. These are Hole-wide systems, not a catalogue of every upgrade anywhere in The Hole.
Cavern-local upgrades remain in their cavern, with relevant global effects and named source links nearby.

| Subsystem | Information owned here |
|---|---|
| **Majik** | All three trees and their one shared point pool; prerequisites, base/enhanced levels and caps, effective effects, and saved Pocket Divinity gods with verified ordinary-link/Doot overlap. |
| **Schematics** | Released identities and order, availability versus built status, requirements, currencies, current discounted costs, spendable stock/shortfall, and built benefits. |
| **Studies** | All 18 Studies; saved target and eligible immediate neighbors; per-cavern saved levels/progress, requirements, current progress/hour and contributors, and owned effective effects. |
| **Measurements** | All 17 categories; measured account statistic and units, purchased level, multiplier/effective benefit, access, currency, next cost, and shortfall. |

A cavern shows its relevant owned Study effect and links to **Upgrades → Studies**; it does not duplicate the full Study catalogue.
Apply the same owner-link pattern to Majik, Schematics, and Measurements effects consumed elsewhere.
Owned versus potential benefits and base versus effective levels/caps stay explicit. Pocket Divinity overlap must not imply duplicate activation.
Subsystem-specific browsing, comparison, search, or filtering may help; this direction does not impose one control set or upgrade widget.

## Caverns

Initially expose all 18 individual entries below, named in this order. Mechanical similarities may support comparison without replacing individual access.
Each cavern owns its local progression, production, wallets, upgrades, rewards, character capability, and relevant source/modifier links.
Access/requirements, owned effective benefits, and relevant Study effects stay with the affected information. Keep the account-wide Opal summary; do not repeat local Earned Opals when completed progress communicates cavern progress.

For part 3, preserve all 18 cavern names in canonical order without displayed navigation indices. Follow the [part 3 UI plan](hole-part-3-ui-plan.md) for the selected four-cavern detail.

| Cavern | Distinct information retained from the approved scopes |
|---|---|
| **1. Well** | Bucket assignments/rates; obstruction versus stock/capacity; expansion settings/gates; gold effects; next Opal cost. |
| **2. Motherlode** | Mining/current ore, completed layers, separate lifetime ore, required ore, and owned Well benefits. |
| **3. Dawg Den** | Eight amplifiers/charges/caps/debuffs; account score/Opal threshold; four class-group kill records and bucket effects. |
| **4. Bravery** | Four monument concepts; starting swords/rethrows/retelling, baseline damage sources, best Last Stand, owned rewards. |
| **5. Bell** | Four modes/saved mode; separate banks/rates; six improvements/costs; Clean odds/failures; seven bonuses; Renew consequences. |
| **6. Harp** | Saved power/rate/layout/tune, slots, owned string EXP/levels/passives including unassigned types, ten notes/access/costs. |
| **7. Lamp** | Wish stock/expected daily gain; purchase/access/effects/costs; schematic discount stacks; category-specific reset consequences. |
| **8. Undying Hive** | Catching/Fractal Flies, completed layers, required flies, and owned Harp benefits. |
| **9. Gloomie Mushroom Grotto** | Colony clears, current credited kills/quota/readiness, Monarch HP, separate lifetime credited kills, Opals/synergies. |
| **10. Justice** | Four monument concepts; starting coins/health/popularity/dismissals, achievements, contextual case consequences/search. |
| **11. Jars** | Saved board/type/quality/producers/work/rates; ten types/access/costs; 12 holdings; pending gilded bonus; 40 discovery/enchantment collectibles and preferred target. |
| **12. Evertree** | Chopping/Everlogs, completed trunks, required Everlogs, and owned cross-skilling benefits. |
| **13. Wisdom** | Four monument concepts; normal-story starting attempts, per-clear gains, instamatches, and permanent rewards. |
| **14. Gambit** | Six challenges/access/survival records; verified points/contributors/thresholds; daily entry/preservation; earned doublers/saved assignments; future effects distinct. |
| **15. Temple** | Sanctum, torches/sources, Illuminate/Search/Amplify costs/effects/shortfalls, Search chance, awakening reset, active-only respawn/drop context. |
| **16. Fountain** | Nine wallets/pending stacks/royal state; desire/ignore; bars/rates/capacity; all 60 Regular/Yellow/Green slots; marble amount/levels/eligibility; luck/ducks/Opals. |
| **17. Bottomless Trench** | Fishing/Trench Fish, completed depths, required fish, and owned Fountain/cross-skilling benefits. |
| **18. Crystal Glunko Cove** | Twelve shapes/boosted targets/kills; 24 upgrades/access/costs/shortfalls; local/global effects and character outputs; Study-discount usage; earned rewards. |

**Fountain needs substantial local room.** Preserve all nine spendable wallets separately from pending production stacks, royal state, and snapshot balances.
Keep saved desire/ignore settings, bars/current rates, occupancy, overflow, and effective capacity inspectable; distinguish purchased capacity from the effective 16 positions × 50 height cap.
Retain all 20 Regular, 20 Yellow, and 20 Green upgrade slots with prerequisites, levels, effective caps/effects, currency, cost, and shortfall.
Marble amount, base upgrade level, per-upgrade marbleization level, and eligibility remain distinct, with links to affected upgrades.
Keep luck, ducks, earned/next-purchase Opals, Study inputs, and named Trench/other modifiers in relevant local context.
Local views are available when they serve these tasks; the old Production & wallets / Upgrades / Marbleization composition is not mandatory.
Fountain may need more depth than a simpler cavern. Shared left navigation is not a content-size limit.

**Comparisons remain reachable within Caverns.** Support the four skilling caverns together; show each matching-skill efficiency threshold and list qualifying imported character names in its tooltip. Do not show exact character outputs, saved assignments, locations, or redundant character counts.
Show current/required resource and completed layers/trunks/depths. Do not duplicate resource remaining quantities or separate readiness text; color current/required green when gathered quantity meets its requirement.
Show remaining shared claims as the source allowance of six minus recorded usage. Unknown usage stays unavailable. Explain that six claims per day are shared across all four resource caverns and manual claims happen in game; do not invent reset timing or claim availability.
Support comparison across Bravery, Justice, and Wisdom while separating lifetime credited respect hours, claimed/claimable milestones, stored story-charge seconds, and permanent reward levels/effects.
Comparison control placement and format remain page-design choices. Neither two extra left-navigation entries nor comparison blocks before the selected cavern are mandatory.

## Shared information and cross-links

Each shared need has an owner; other tasks may show concise relevant context and link to that owner.
Named destinations may resolve to a tab, subsystem, cavern, or exact local detail. These are read-only links, not invented route contracts.

| Shared need | Canonical owner and contextual use |
|---|---|
| Growth, allocation/reset, complete Opal ledger | [Villagers](#villagers); cavern-local earned/next-purchase Opals link back to the ledger, and ledger sources link to named owners. |
| Study catalogue, saved targeting, progress/rates | [Upgrades → Studies](#upgrades); affected cavern retains its relevant owned effect and a named Study link. |
| Global camp upgrades and effects | [Upgrades → Majik / Schematics / Measurements](#upgrades); consumers retain relevant effects and link to the specific source. |
| Local currencies, upgrades, production, rewards | [Caverns → named cavern](#caverns); costs pair exact resource, spendable stock, current cost, and shortfall with source/competing-use links. |
| Lantern stock, locations, shared usage out of 12 | [Villagers](#villagers); affected tasks repeat only relevant stock/use/constraints. Lanterns do not refill skilling claims or active challenges. |
| Skilling claims and all-character comparison | [Caverns → skilling context](#caverns), alongside Motherlode, Undying Hive, Evertree, and Bottomless Trench; independent of Lantern usage. |
| Monument concepts and comparison | [Caverns → monument context](#caverns), alongside Bravery, Justice, and Wisdom; retain each cavern's distinct starting capability. |
| Gambit entry/preservation; Cove discounts | [Caverns → Gambit / Crystal Glunko Cove](#caverns), respectively; preservation is probabilistic and discounts are not a purchase cap. |
| External modifiers and resource sources | Their named account/character feature owns the source; the affected Hole owner retains verified relevant input/effect and a destination link. |

Do not turn shared counters into a large always-visible dashboard. Keep useful context beside the task it explains.
A source or competing-use link must show the correct destination, including an honest unsupported-state explanation, never stale values from another cavern.
Each delivery scope still owns verification of required camp, character, cavern, and cross-account inputs when another website surface is undelivered.

## Partial delivery and missing information

- Preserve all five villager identities, four upgrade-subsystem identities, and all 18 individual cavern identities during partial support.
- Distinguish verified game lock, website support not delivered, missing/unverified inputs, verified zero/empty, and account loading/unavailable. States may coexist.
- Keep unknown access unknown, not locked or unlocked. Show released locked and maxed entries; unsupported entries retain an explanation and their identity.
- Missing inputs leave dependent values unavailable with a reason; preserve independent information. Never substitute zero or invent complete totals.
- Static purpose/rescue information does not establish personal rescue or ownership. Stored progress or a full progress bar does not prove a claim occurred.
- Preserve snapshot versus live state, stock versus work, owned versus potential effects, and account-wide versus character-specific values.
- Do not extrapolate production, balances, readiness, or progress to now, reconstruct live boards or challenges, or imply guaranteed random rewards.

## Future growth and consolidation

Future separately approved calculators, efficiency tools, or simulations belong within their owning feature and may need substantial local views or input/result space.
Allow that depth without changing ownership or forcing every cavern into Fountain's layout. Do not add tool placeholders or treat capacity as current authorization.
The [first-pass exclusions](hole-spec-draft.md#out-of-scope) remain unchanged.

Consider later consolidation only when fleshed-out, actual common behavior improves browsing or comparison.
Preserve all identities, direct links, owner relationships, and accepted scope when evaluating it.
Matching delivery parts or shortening the list alone is not a reason to consolidate. The initial selection remains 18 individually discoverable caverns.

## Delivery-part reference map

All seven approved scopes remain required. These paths map information ownership, not delivery order, approved blockers, technical independence, or part selection.

| Approved issue | Named tab paths and reusable reference |
|---|---|
| [#441](https://github.com/Sludging/idleon-efficiency/issues/441) — Growth, Opals, Studies | [Villagers](#villagers): five villagers, full Opal ledger/allocation/reset, minor Lantern context; [Upgrades → Studies](#upgrades): all 18 Studies; [shared context](#shared-information-and-cross-links). |
| [#442](https://github.com/Sludging/idleon-efficiency/issues/442) — Schematics, Majik, Measurements | [Upgrades → Majik / Schematics / Measurements](#upgrades): three systems, Pocket Divinity, costs and consumed camp effects; [owner links](#shared-information-and-cross-links). |
| [#443](https://github.com/Sludging/idleon-efficiency/issues/443) — Skilling | [Caverns → Motherlode / Undying Hive / Evertree / Bottomless Trench](#caverns): progression, claims, all-character comparison, owned synergies. |
| [#444](https://github.com/Sludging/idleon-efficiency/issues/444) — Well, Bell, Harp, Lamp | [Caverns → Well / Bell / Harp / Lamp](#caverns): stocks, settings, upgrades, discounts, resets, and modifier context. |
| [#445](https://github.com/Sludging/idleon-efficiency/issues/445) — Jars, Fountain, Cove | [Caverns → Jars / Fountain / Crystal Glunko Cove](#caverns): collections, wallets, local production/upgrades/marbleization, and Cove capability; [future depth](#future-growth-and-consolidation). |
| [#446](https://github.com/Sludging/idleon-efficiency/issues/446) — Monuments | [Caverns → Bravery / Justice / Wisdom](#caverns): four-concept comparison, starting capability, rewards, and Justice cases. |
| [#447](https://github.com/Sludging/idleon-efficiency/issues/447) — Den, Grotto, Gambit, Temple | [Caverns → Dawg Den / Gloomie Mushroom Grotto / Gambit / Temple](#caverns): records/readiness/benefits, Gambit entry/preservation, and Temple resource competition. |

## Decisions left to page design

The selected topology, ordering, individual identities, ownership, and complete information outcomes are fixed by this reference and its scope sources.
Default tab or cavern, route shape, selection persistence, exact fields and positions, widgets, local view count, comparison controls, colors, and density are not approved here.
Choose task-specific composition using existing visual patterns; simpler navigation does not approve a uniform panel or a new visual language.
A future page plan can cite the relevant owner section, [shared-link rules](#shared-information-and-cross-links), [partial-state rules](#partial-delivery-and-missing-information), and [growth rules](#future-growth-and-consolidation).
This reference adds no mandatory research ceremony, new approval gate, production authorization, or current browser proof.
