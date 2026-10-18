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
## Cross-cavern consistency workstream

**Status:** Implemented under the supervisor-approved plan; the human directly accepted this UI result and its stated check limits on 2026-10-19. This separate pass does not reopen accepted part 4 or select parts 5–7.

### Outcome and implementation seam

Make the 18 existing cavern panels read as one feature family without changing their mechanics, navigation, support claims, or approved feature content. Keep the accepted Well, Bell, Harp, and Lamp panels as references; align the other 14 views with one compact metric row and the same bottom Study summary.

Add `components/world-5/hole/cavernLayout.tsx` because `components/world-5/hole/` has no shared cavern-layout module. Export two focused components:

- `CavernMetricStrip({ metrics })`, where each metric is `{ label: string; value: ReactNode; image?: ImageData; tooltip?: ReactNode }`. Use one wrapping desktop row with native icons when available, existing formatted values, restrained inactive styling, and existing tooltips. Extract the current `MetricStrip` from `part4Caverns.tsx`, migrate its Lamp caller unchanged, and use the same component for the 14 target views. `ReactNode` preserves existing rich values and requirement coloring without adding a view-specific formatting API.
- `CavernStudySummary({ study, onOpenStudies })`, where `study` is the existing `hole.studies[index]` `Study` and `onOpenStudies` selects **Upgrades → Studies** in the current page state. The component owns the shared bottom layout and the existing Study effect renderer; callers pass no reconstructed save fields or guessed status.

Use the prepared `Study` contract directly (`data/domain/world-5/hole/hole.tsx:707-787,2110-2143`): `levelAvailable`, `getDescription()`, `progressAvailable`, `progress`, `getRequirement()`, `access`, `participation`, `progressPerHour`, and `rateUnavailableReason`. Use `getEffects()` and `dailyCoveUpgradesPurchased` for the full catalogue's owned-effect display, preserving null reasons; do not duplicate effect-category text beside the sourced cavern bonus. Show level and sourced description on the left, one applicable status on the right, and saved progress/requirement below with a bar only when both inputs support one. Put the small **All Studies** text link in the Study heading. `inactive` displays **Inactive**; `target`/`neighbor` displays **Study rate: x/hr** using prepared `progressPerHour`; `unavailable` keeps its reason. Preserve **Locked** for `access === false` and unavailable access separately. Do not show an owner.

The route owns `hole.studies[index]` and the existing selection setters; part-4 detail components receive `hole` and select their known Study index. Keep `Benefit` in the shared Hole UI module for the full Study catalogue's prepared-effect rendering. No provider, renderer schema, adapter, generic theme layer, or game calculation is needed.

For the 14 target views, the footer owns Study level/effect and status/progress. Remove duplicate inline Study or benefit content when the footer renders it; preserve meaningful prepared benefit information once. Do not add duplicated `getEffects()` or daily Cove information to references, or add exports only to preserve the old duplicate. Keep genuinely distinct existing information, with each item shown once.

### Coverage matrix

| Cavern index | Current route view | Planned treatment |
|---:|---|---|
| 0 Well | Accepted part-4 detail | Preserve panel and Study footer behavior; share the footer renderer only. |
| 1 Motherlode | Resource-cavern renderer | One row from current resource data, lifetime ore, efficiency threshold, claims, and existing owned schematics; common Study summary. |
| 2 Dawg Den | Unsupported fallback | Keep earned Opals as compact row; retain explicit unsupported body; move owned Study information to common summary. |
| 3 Bravery | Unsupported fallback | Same honest fallback and common Study summary. |
| 4 Bell | Accepted part-4 detail | Preserve panel and Study footer behavior; share the footer renderer only. |
| 5 Harp | Accepted part-4 detail | Preserve panel and Study footer behavior; share the footer renderer only. |
| 6 Lamp | Accepted part-4 detail | Preserve panel and Study footer behavior; migrate existing metric helper without changing its look. |
| 7 Undying Hive | Resource-cavern renderer | One row from current resource data, efficiency threshold, claims, and existing owned schematic; common Study summary. |
| 8 Gloomie Mushroom Grotto | Unsupported fallback | Keep earned Opals as compact row; retain explicit unsupported body; move owned Study information to common summary. |
| 9 Justice | Unsupported fallback | Same honest fallback and common Study summary. |
| 10 Jars | Unsupported fallback | Keep earned Opals as compact row; retain explicit unsupported body; move owned Study information to common summary. |
| 11 Evertree | Resource-cavern renderer | One row from current resource data, efficiency threshold, claims, and existing owned schematic; common Study summary. |
| 12 Wisdom | Unsupported fallback | Same honest fallback and common Study summary. |
| 13 Gambit | Unsupported fallback | Same honest fallback and common Study summary. |
| 14 Temple | Unsupported fallback | Same honest fallback and common Study summary. |
| 15 Fountain | Unsupported fallback | Keep earned Opals as compact row; retain explicit unsupported body; move owned Study information to common summary. |
| 16 Bottomless Trench | Resource-cavern renderer | One row from current resource data, efficiency threshold, claims, and existing owned schematic; common Study summary. |
| 17 Crystal Glunko Cove | Unsupported fallback | Keep earned Opals and the existing Saved upgrades today count once in the compact row; retain explicit unsupported body and common Study summary. |

These assignments describe the current renderer, not a game-mechanic classification. In `app/world-5/hole/content.tsx:55-58,217-235,332-385`, resource route indices `[1, 7, 11, 16]` currently display Ore, Flies, Everlogs, and Fish, respectively; thus current resource-renderer cavern names are Motherlode, Undying Hive, Evertree, and Bottomless Trench. Preserve that literal code mapping; do not rename or reclassify Jars/Evertree/Bottomless Trench from their cavern names. The other ten retain their already-rendered local earned Opals and unsupported notice; Cove also retains its pre-existing Saved upgrades today count once, while the other nine add no local metrics. Add no empty metrics, fabricated Study source data, or unsupported mechanic panels.

For the four accepted references, keep their existing local metrics, sections, shell, outer tabs, rail, and actions unchanged. Move only shared presentation helpers as needed. For all 18, preserve available zero, unknown, missing input, locked, unowned, and unsupported distinctions. Study indices match cavern indices 0–17.

### Delivery and verification

Expected code files: new `components/world-5/hole/cavernLayout.tsx`, `components/world-5/hole/part4Caverns.tsx`, and `app/world-5/hole/content.tsx`. Update both this plan and the current handoff. Keep `part4Caverns.tsx`'s four selected panels and interactions intact apart from calling the extracted summary/helper.

After approval and implementation, verify one configured desktop route load and select each of the 14 changed panels in one batch. Confirm metric row ordering/icons/formatting, preserved resource and unsupported states, Study at bottom, link destination, and no Hole-specific runtime error. Capture only representative resource, unsupported, locked/unavailable or active Study cases, plus one unchanged part-4 reference. Hover one Study tooltip and follow the Study link once. Do not create 18 screenshots or run a broad suite for this visual consistency pass. Unknown/null/zero combinations not present on the configured save remain unverified.

#### Earlier actual UI verification — blocked, fixed by fresh selector declaration — 2026-10-19

The first configured desktop run failed before selection with `ReferenceError: part4Cavern is not defined` at `app/world-5/hole/content.tsx:312-313`. It is historical: a fresh fix restored the selector declaration. Its original artifacts remain at `.ui-verification/runs/2026-10-18T23-22-09-275Z-35097/`.

#### Historical Study destination failure — fixed by the current check — 2026-10-19

`yarn ui:status` reported Docker app and browser ready. `yarn ui:run .ui-verification/hole-cavern-consistency-20261019-final.cjs` reached the configured `/world-5/hole` route at 1440×1000 and selected all 18 cavern views once. Every view rendered its Study footer and status. The 14 target views retained their real resource metrics or explicit unsupported notice; the four accepted references rendered. No duplicate inline Study benefit was found. The route produced no Hole runtime error during cavern selection.

| Index | Cavern | Observed |
|---:|---|---|
| 0 | Well | Rendered; Study footer/status present; no duplicate inline Study benefit. |
| 1 | Motherlode | Rendered resource metric row; Study footer/status present; no duplicate inline Study benefit. |
| 2 | Dawg Den | Rendered earned-Opal metric and unsupported notice; Study footer/status present. |
| 3 | Bravery | Rendered unsupported notice; Study footer/status present. |
| 4 | Bell | Rendered; Study footer/status present; no duplicate inline Study benefit. |
| 5 | Harp | Rendered; baseline `0.85%` remained; Study footer/status present. |
| 6 | Lamp | Rendered; Study footer/status present; no duplicate inline Study benefit. |
| 7 | Undying Hive | Rendered resource metric row; Study footer/status present. |
| 8 | Gloomie Mushroom Grotto | Rendered earned-Opal metric and unsupported notice; Study footer/status present. |
| 9 | Justice | Rendered unsupported notice; Study footer/status present. |
| 10 | Jars | Rendered earned-Opal metric and unsupported notice; Study footer/status present. |
| 11 | Evertree | Rendered resource metric row; Study footer/status present. |
| 12 | Wisdom | Rendered unsupported notice; Study footer/status present. |
| 13 | Gambit | Rendered unsupported notice; Study footer/status present. |
| 14 | Temple | Rendered unsupported notice; Study footer/status present. |
| 15 | Fountain | Rendered earned-Opal metric and unsupported notice; Study footer/status present. |
| 16 | Bottomless Trench | Rendered resource metric row; Study footer/status present. |
| 17 | Crystal Glunko Cove | Rendered unsupported notice; Study footer/status present. |

The completed 18-view run's final link attempt exposed `ReferenceError: Benefit is not defined` in `StudyCard` on the Upgrades → Studies destination, then timed out waiting for `upgrade-nav-Studies`. This was a current Hole-owned error, not shared navigation, advertising, or external CORS noise. The `Benefit` import has since been restored in `app/world-5/hole/content.tsx`; the current destination check below passed.

Captures: `.ui-verification/runs/2026-10-18T23-27-24-995Z-44516/well-reference.png`, `motherlode-resource.png`, and `dawg-den-unsupported.png`. Runner `result.json` and `errors.json` in the same directory record the failure and diagnostics; `final.png` is last browser state. The known shared navigation hydration mismatch, NitroPay `browsingTopics`, RL identity CORS, `ERR_FAILED`, and HTTP 403 remain external noise.

The configured save hash stayed `aab7f516047fc5b86096350e92864faeeccf303e9c72def20b51130507416555` before and after the 18-view batch. The UI stack remains running. Its temporary scenario was removed. No tests, build, lint, typecheck, game extraction, code/config changes, issue updates, review, or commit ran. That batch covered one configured desktop save only; unavailable/locked/null/zero branches and broad game parity remain unchecked.
#### Current Study footer and destination verification — READY_FOR_REVIEW — 2026-10-19

The earlier 18-cavern navigation evidence and captures above remain the cross-cavern coverage; that batch was not repeated. `yarn ui:status` reported the existing Docker app and browser ready. `yarn ui:run .ui-verification/hole-study-footer-followup-20261019.cjs` passed on the configured 1440×1000 `/world-5/hole` route. It selected Motherlode, confirmed level and sourced bonus on the left, `Inactive` on the right, and progress below through measured bounding boxes; it also confirmed only one bonus label. Clicking the heading's **All Studies** link loaded `upgrade-nav-Studies` and the full Study grid without the former `Benefit is not defined` error.

Captures: `.ui-verification/runs/2026-10-18T23-37-02-435Z-69153/study-footer.png` and `studies-destination.png`. The existing Motherlode Study tooltip trigger was present and hovered; its content was not asserted. Current runner errors contain the known shared navigation hydration mismatch, NitroPay `browsingTopics`, RL identity CORS, failed resource, and HTTP 403; no Hole-specific error appeared on the exercised paths. The runner-created temporary scenario was removed. One configured desktop save only; unavailable/locked/null/zero branches, alternate saves, broad game parity, and extended user smoke remain unchecked. No test, build, lint, typecheck, staging, or commit ran.
