# The Hole: approved delivery parts

**Status:** APPROVED PRODUCT/DELIVERY SCOPE / PUBLISHED / PARTS 1–2 COMPLETE — Original approval recorded on 2026-10-12. Part 1 [#441](https://github.com/Sludging/idleon-efficiency/issues/441) was accepted as complete on 2026-10-14; part 2 [#442](https://github.com/Sludging/idleon-efficiency/issues/442) was accepted as complete on 2026-10-15. Parent [#440](https://github.com/Sludging/idleon-efficiency/issues/440) remains open. Parts 3–7 remain open and unselected. Acceptance, execution evidence, and limits remain in the [current handoff](hole-research-brief.md#current-handoff).

**Scope sources:** [Approved research brief](hole-research-brief.md) and [approved product specification](hole-spec-draft.md).

**Research issue:** [#438 — The Hole: approved research brief and visibility scope](https://github.com/Sludging/idleon-efficiency/issues/438).

**Published delivery issues:**

| Part | Issue | Outcome |
|---|---|---|
| 1 | [#441](https://github.com/Sludging/idleon-efficiency/issues/441) | Villager growth, Opals, and Studies |
| 2 | [#442](https://github.com/Sludging/idleon-efficiency/issues/442) | Schematics, Majik, and Measurements |
| 3 | [#443](https://github.com/Sludging/idleon-efficiency/issues/443) | Skilling layers and character capability |
| 4 | [#444](https://github.com/Sludging/idleon-efficiency/issues/444) | Well, Bell, Harp, and Lamp progression |
| 5 | [#445](https://github.com/Sludging/idleon-efficiency/issues/445) | Jars, Fountain, and Cove progression |
| 6 | [#446](https://github.com/Sludging/idleon-efficiency/issues/446) | Bravery, Justice, and Wisdom progression |
| 7 | [#447](https://github.com/Sludging/idleon-efficiency/issues/447) | Dawg Den, Grotto, Gambit, and Temple progression |

## Delivery contract

All seven parts are required to cover camp, all five villagers, and all 18 released caverns. Each part delivers substantial verified backend information through a usable, read-only UI. Research, persistent-state mapping, relevant calculations, and integration belong inside each part, not separate internal-agent or infrastructure tickets.

**No approved delivery-part blockers exist.** The parts define delivery and ownership boundaries, not navigation, tabs, pages, or a required player-facing sequence. Technical dependencies have not been assessed; this scope does not claim full implementation independence. Each part owns verification of the camp, character, cavern, and cross-account inputs required for its outcomes. Consuming another part's information does not establish an approved blocking edge.

**Whole-feature information architecture is documented.** For planning any part's Hole pages, use the [canonical IA — Delivery-part reference map](hole-ui-information-architecture.md#delivery-part-reference-map) to reach the named tab paths and relevant owner sections. This human-selected direction is a page-planning reference, not an implementation ticket. Parts 1 and 2 received separate planning and execution authority and are complete. Parts 3–7 still require human selection and authorization.

Every part follows these boundaries:

- Show released content, including locked entries, by default. Where useful, support **Show unlocked** to restrict results. Keep future/unknown effects explicitly distinct from released useful benefits.
- Pair progression with names, effects, requirements, costs, currencies, balances, and shortfalls. Support browsing, searching, filtering, detail inspection, and read-only comparisons where useful. Include contextual explanations only where needed to interpret displayed values, requirements, effects, costs, or reset consequences; do not require exhaustive rules or walkthroughs.
- Show saved snapshot state and verified current-state rates, costs, and effective benefits. Do not advance state from snapshot time to now or add forecasts, countdowns, ETA, an efficiency/rate engine, allocation plans, simulations, or recommendations.
- Preserve owned versus potential benefits, unknown versus zero, current versus lifetime progress, and account-wide versus character-specific state. Saved assignments/settings are not website-selected actors or invented live activity.
- Do not reconstruct transient minigame state. The hidden placeholder UI and incomplete backend are not behavior or design authority. Evidence gaps stay with the responsible part; they do not shrink the approved research scope.

## 1. Villager growth, Opals, and Studies

**Outcome:** Players can understand all five villagers' progression, the complete Opal ledger and allocation-dependent benefits, Studies, and Lantern inventory and usage.

**Blocked by:** No approved delivery-part blockers. Shared planning gates and unassessed technical dependencies are stated in the delivery contract.

### Backend data and UI information needs

- **Backend:** Provide Polonai, Kaipu, Cosmo, Minau, and Bolaia identities, rescue/access state, saved levels, invested Opals, stored EXP, next requirements, verified current EXP/hour and contributors, and next intrinsic unlocks. Preserve saved levels separately from claim-ready progress. Provide Study target, eligible adjacent targets, per-cavern saved levels/progress, requirements, current progress/hour, and effective effects.
- **Backend:** Reconcile the full cavern/external Opal ledger into earned, invested, and uninvested totals. Provide allocation-dependent effects and exact reset consequences without treating an actor cache as a saved wallet. Provide Lantern quantities by storage/character inventory location and account-wide daily usage against the separate limit of 12.
- **Backend:** Include the camp and cross-account modifiers required for displayed villager and Study rates, requirements, and effective benefits.
- **UI:** Let players inspect all five villagers, targeted and adjacent Studies, the full Opal ledger, allocation/reset meaning, and Lantern locations and usage. Players can understand saved progression, available unlocks, current rate contributors, and shared-resource competition from correctly matched information and contextual explanations.

### Acceptance outcomes

- [x] Players can inspect all five villagers and targeted/adjacent Studies, distinguishing rescue/access, saved level, stored progress, claim readiness, current rate, next unlock, and effective Study effects.
- [x] Players can reconcile earned, invested, and uninvested Opals across cavern and external sources, inspect allocation-dependent benefits and category-specific reset consequences, and see Lantern inventory locations plus shared usage out of 12 without confusing Lanterns with layer claims.

**Data note:** Verify rescue flags, villager unlocks and requirements, external Opal attribution, allocation-dependent modifiers, effective rate inputs, and persistent Study/Lantern mappings within this part. Stored EXP/Study progress is not a claimed unlock; exact reset clocks do not authorize countdowns.

## 2. Schematics, Majik, and Measurements

**Outcome:** Players can understand all camp upgrades, their owned effective benefits, and competing requirements and costs, including Pocket Divinity.

**Completion:** Human accepted this part as complete on 2026-10-15. The [current handoff](hole-research-brief.md#current-handoff) records accepted implementation, evidence, and limits. The latest approved [part 2 UI plan](hole-part-2-ui-plan.md) narrows how backend information is presented; it does not remove accepted backend calculations.

### Backend data and UI information needs

- **Backend:** Provide Kaipu schematic identity/order, availability, built status, currency, current discounted cost, balance/shortfall, and intrinsic/effective benefit.
- **Backend:** Provide all three Majik trees, their single shared point pool, prerequisites, base/enhanced levels and caps, effective effects, and saved Pocket Divinity selections with ordinary-link/Doot overlap.
- **Backend:** Provide all 17 Measurements with access, purchased level, measured account statistic and units, multiplier, effective benefit, currency, next cost, and shortfall. Include the camp and cross-account modifiers required for displayed prices, caps, and benefits.
- **UI:** Let players inspect schematics, all Majik trees and Pocket Divinity, and Measurements alongside access requirements, ownership, costs, and effective benefits. Presentation follows the latest approved plan; detailed shortfall/competition disclosures, explicit shortfall labels, and per-bonus/resource tooltips are not required.

### Acceptance outcomes

- [x] Players can distinguish schematic availability from construction and inspect correctly matched costs, active next-construction discounts, shortfalls, built benefits, and released locked entries. The UI hides purchased costs and omits explicit shortfall/competition disclosures as approved; backend values remain available.
- [x] Players can inspect all Majik trees as one point pool, prerequisites, base/enhanced caps and effects, and saved Pocket gods with verified normal-link/Doot interactions, without implying duplicate activation. The approved UI hides saved selections only when active Doot replaces their ordinary benefit presentation; otherwise it preserves selected identities and art.
- [x] Players can inspect all 17 Measurements with meaningful measured values/units, multipliers and effective benefits alongside purchase requirements, rather than unexplained percentages or false zeroes for missing inputs.

**Accepted UI amendments:** Show only the prepared Pocket All Stat contribution and Divinity Lv. 2+ context under active Doot; hide all selected god names, art, slots, and ordinary bonus text in that branch. In inactive Doot, retain saved selections and their identities, art, and text. Purchased schematics have no currency or historical cost. Unknown cost operands stay unavailable and neutral. No per-bonus/resource tooltips, exact-count or competition disclosures, explicit shortfall labels, or non-Doot shortfall text are required. These presentation decisions do not delete backend calculation outcomes.

**Data note:** Verify source-backed schematic availability/order, effective modifier inputs, shared Majik pool and enhancement caps, Pocket/Doot aggregation, and Measurement statistic/currency mappings within this part.

## 3. Skilling layers and character capability: Motherlode, Undying Hive, Evertree, and Bottomless Trench

**Outcome:** Players can compare current character capability with the requirements and claim progress of Motherlode (2), Undying Hive (8), Evertree (12), and Bottomless Trench (17), while understanding their shared daily constraint and owned synergies.

**Blocked by:** No approved delivery-part blockers. Shared planning gates and unassessed technical dependencies are stated in the delivery contract.

### Backend data and UI information needs

- **Backend:** Provide access, completed layers/trunks/depths, dedicated gathered/required/remaining resources, displayed efficiency thresholds, readiness, earned Opals, and the single shared daily layer-claim counter. Keep Motherlode lifetime ore separate from current layer ore and completed layers.
- **Backend:** Provide character identity, saved cavern assignment, and relevant Mining, Catching, Choppin, or Fishing efficiency. Match each skill to the correct displayed threshold; shared account progress must not imply individual contribution history or current activity.
- **Backend:** Verify consumed camp/cross-account modifiers, including Studies, requirement reductions, schematics, and associated Well, Harp, cross-skilling, and Fountain synergies. Provide owned effective benefits with their actual progress basis.
- **UI:** Let players inspect all four skilling caverns' claim progress, requirements, shared usage, owned synergies, and character capability comparisons. Include manual-claim and rescue context only where needed to interpret recorded progress and requirements.

### Acceptance outcomes

- [ ] Players can inspect all four released skilling caverns and distinguish dedicated current progress, required/remaining resources, completed layers/depths, earned Opals, and claim readiness; full progress does not imply an automatic claim.
- [ ] Players can compare each character's correct skill efficiency with the cavern's displayed requirement, separately from required resource quantity and account-wide progress.
- [ ] Players see one shared layer-claim counter across all four caverns, separate from Lantern uses; the source-six/Wiki-five limit conflict remains explicit until verified, not silently converted into a definitive remaining allowance.
- [ ] Players can inspect Motherlode lifetime ore and owned layer/Study/schematic synergies, including Well, Harp, cross-skilling reductions, and Fountain effects, without substituting current resources for completed progression.

**Data note:** Resolve displayed threshold scaling, character efficiency inputs, shared-counter/reset semantics, and the six-versus-five daily limit within this part. A missing Wiki threshold table is not evidence of no requirement; unknowns must not become zero or scope omissions.

## 4. Well, Bell, Harp, and Lamp progression

**Outcome:** Players can understand current production, saved settings, purchased progression, and competing costs across Well (1), Bell (5), Harp (6), and Lamp (7).

**Blocked by:** No approved delivery-part blockers. Shared planning gates and unassessed technical dependencies are stated in the delivery contract.

### Backend data and UI information needs

- **Backend:** Provide Well buckets and saved sediment assignments, obstruction versus spendable stock, capacities, expansion counts/settings/gates, individual and grouped current rates, gold-bucket effects, and next Opal cost. Verify the relevant camp, character-record, and cross-account inputs without projecting offline expansion.
- **Backend:** Provide Bell saved mode, separate charge banks and current rates/requirements, all six improvement methods with currencies/costs, failures/current Clean odds, all seven current permanent bonus families and effective benefits, and what Renew clears and retains.
- **Backend:** Provide Harp saved power, power/hour, layout/tune, slots, owned string types and passive benefits, string EXP/levels, and all ten note balances/access/next costs. Provide Lamp wish stock, expected daily gain, available wish types, purchased/permanent benefits, currencies/costs, next-schematic discount stacks, and reset categories/consequences.
- **UI:** Let players understand production, saved Bell state and improvements, Harp strings/notes, and Lamp wishes through their recorded settings, effective benefits, costs, and resource competition. Include stochastic, order-sensitive, and reset context only where needed to interpret displayed values; do not require a play guide or promise rewards.

### Acceptance outcomes

- [ ] Players can inspect Well bucket assignments/rates, obstruction, stock/capacity, expansion progression/settings/gates, gold effects, and next Opal cost without reading negative obstruction as spendable stock or assuming elapsed production.
- [ ] Players can inspect Bell's four distinct modes, saved mode, persistent banks and current rates/requirements, all six improvement methods and costs, current Clean odds, and seven bonus families, including exactly what Renew clears and retains.
- [ ] Players can inspect Harp saved power/layout/tune, power/hour, slots, all ten notes and their access/costs, and owned string EXP/levels/passives, including unassigned passive types. Relevant power and order-sensitive/random reward context must not imply a fixed outcome.
- [ ] Players can inspect Lamp stock, expected daily wishes, unlock/purchase progression, effective benefits, prices, discount stacks, and category-specific reset consequences; one-Opal wording and future effects are not misrepresented.

**Data note:** Verify Well expansion semantics, Bell's seventh bonus and linear Clean pity, Harp saved settings and relevant reward inputs, and Lamp effect scaling within this part. Fractional daily wishes are expectations; unavailable string/future descriptions are not useful released effects.

## 5. Jars, Fountain, and Crystal Glunko Cove progression

**Outcome:** Players can understand the complete resource economies, upgrade progression, collections, and local capabilities of Jars (11), Fountain (16), and Crystal Glunko Cove (18).

**Blocked by:** No approved delivery-part blockers. Shared planning gates and unassessed technical dependencies are stated in the delivery contract.

### Backend data and UI information needs

- **Backend:** Provide all ten Jar types, saved board/type/quality, producers, production work/current rates, access/holding gates, next jar costs, all 12 currency holdings, pending gilded bonus, and all 40 collectible levels/effective effects with preferred enchantment target. Preserve discovery and repeat enchantment levels rather than a binary enchanted flag.
- **Backend:** Provide Fountain's nine spendable wallets separately from saved pending stacks/royal flags and their snapshot values; saved desire/ignore settings; bar progress/current rates; occupancy, overflow, and effective capacity. Provide all 60 upgrade slots across Regular, Yellow, and Green pages with prerequisites, levels, effective caps/effects, currencies/costs/shortfalls; marble amount, per-upgrade marbleization levels/eligibility; luck, ducks, and earned/next-purchase Opal information.
- **Backend:** Provide Cove's 12 account-held shapes, saved blue/purple boosted targets, kills, all 24 upgrade slots with access/levels/currencies/current costs/shortfalls/effects, daily Study-discount usage, and earned rewards. Verify local DR, AFK, multikill, respawn, and pickup outputs with their required character/camp/cross-account inputs, distinct from normal account stats and global upgrade benefits.
- **UI:** Let players inspect saved production/collection state, wallets, collectibles, all released upgrade groups, marble eligibility, shapes/boosted targets, and Cove-local stats. Browsing and useful filters for ownership, currency, affordability, local/global benefits, or eligibility can help players understand progression and resource competition.

### Acceptance outcomes

- [ ] Players can inspect Jar board quality, producer/access settings, current production, all ten types and 12 wallets, next costs/gates, and pending gilded bonus without treating production work as spendable stock or promising break-order rewards.
- [ ] Players can inspect all 40 collectibles with discovery/enchantment levels, owned effective benefits, and preferred-target meaning; repeated enchantments and probabilistic preference remain distinct from binary flags or guaranteed outcomes.
- [ ] Players can inspect Fountain wallets separately from pending stacks/royal state and snapshot value, desire/ignore settings, bar progress, occupancy/overflow, and effective capacity capped at 16 positions by 50 height, regardless of purchased capacity levels.
- [ ] Players can inspect all 60 Fountain slots across three released pages, their requirements/costs/effects, and distinct marble amount, base levels, marbleization levels/eligibility, luck, ducks, and Opals without claiming a red page, tenth generated currency, or guaranteed random reward.
- [ ] Players can inspect all 12 Cove shapes and 24 upgrade slots, saved boosted targets, costs/shortfalls, earned rewards, and verified local versus global benefits; the first-purchase discount counter is not a purchase cap, and future/unknown effects stay explicit.

**Data note:** Verify Jar board/wallet/enchantment semantics, Fountain wallet-versus-stack valuation and modifier/cap inputs, marble eligibility and later Opal-currency reachability, and Cove local-stat/collector/discount semantics within this part. No elapsed production bridge or roll simulation is required; consumed shared inputs belong to this part's verification.

## 6. Bravery, Justice, and Wisdom progression

**Outcome:** Players can understand persistent monument progression, owned rewards, and saved starting capability across Bravery (4), Justice (10), and Wisdom (13), with contextual explanations and useful Justice case browsing.

**Blocked by:** No approved delivery-part blockers. Shared planning gates and unassessed technical dependencies are stated in the delivery contract.

### Backend data and UI information needs

- **Backend:** Provide each monument's lifetime credited respect hours, manually claimed milestone count and claimable requirements, stored story-charge seconds, current story multiplier/window, permanent reward levels/effective benefits/caps, and earned Opals. Verify required camp, Lantern, Study, Fountain, and cross-account modifiers; crossing a milestone or gaining charge must not imply a claim or settled reward.
- **Backend:** Provide Bravery saved starting swords, rethrows/retelling, baseline damage sources, and best Last Stand; Justice starting coins/health/popularity/dismissals and supported permanent achievements; Wisdom's normal-story starting attempts, per-clear gains, and instamatches. These are saved starting capabilities, not reconstructed active runs.
- **Backend:** Match Justice case identities/NPCs and outcome metadata to relevant immediate costs/gates and continuing consequences, including conditional or random effects. Case metadata is not an imported current case or court wallet. Include only context needed to interpret displayed requirements and consequences, not an exhaustive court walkthrough.
- **UI:** Let players understand monument milestones, stored story charge, permanent reward levels/effective benefits, and saved starting capabilities. Support useful browsing/search of Justice cases by NPC, currency, or consequence. Explain banking, loss, or settlement only where needed to distinguish displayed progression and earned benefits.

### Acceptance outcomes

- [ ] Players can distinguish lifetime respect, claimed/claimable milestones, stored story charge, and permanent reward levels across all three monuments, with verified current multipliers/windows, effective caps/benefits, and earned Opals.
- [ ] Players can inspect Bravery's saved starting capability, baseline damage sources, best Last Stand, and permanent rewards with the context needed to distinguish earned rewards from pending story outcomes.
- [ ] Players can inspect Justice's saved starting capability, permanent progression and achievements, and browse/search cases with relevant immediate and continuing consequences; no current court currency, flags, selected case, or strategy recommendation is invented.
- [ ] Players can inspect Wisdom's normal-story saved starting attempts, per-clear gains, instamatches, and permanent progression without reconstructing boards, reveals, or remaining active attempts. This scope requires neither pure-memory rules nor a mode selector or default-mode commitment.
- [ ] Story start, milestone claim, Lantern respect, and permanent reward settlement retain their distinct meanings; growth beyond the normal linear window is not shown as a hard cap, and no snapshot-to-now charge or live pending reward is invented.

**Data note:** Verify saved monument mappings, multiplier/window/cap inputs, starting capabilities, Lantern respect-versus-charge semantics, and case consequence identities within this part. Ordinary saves do not establish active boards, court state, battle rolls, or unsettled rewards; their absence does not reduce persistent capability coverage.

## 7. Dawg Den, Gloomie Mushroom Grotto, Gambit, and Temple progression

**Outcome:** Players can understand saved records, current readiness and capability, challenge rewards, and competing costs across Dawg Den (3), Gloomie Mushroom Grotto (9), Gambit (14), and Temple (15).

**Blocked by:** No approved delivery-part blockers. Shared planning gates and unassessed technical dependencies are stated in the delivery contract.

### Backend data and UI information needs

- **Backend:** Provide Den's eight amplifier unlocks, saved charges/caps, debuffs, combined multiplier, account best score/next Opal threshold, earned Opals, and four class-group best kill records with their owned bucket effects. Verify schematic, Study, character, and cross-account inputs without predicting survival or live Fear.
- **Backend:** Provide Grotto colony clears, current credited kills/quota/readiness, Monarch HP, lifetime credited kills, earned Opals, and owned schematic synergies. Preserve current versus lifetime totals and weighted credit rather than presenting them as raw character kill history.
- **Backend:** Provide all six Gambit challenges with contextual requirements/access, saved best survival seconds, points from current verified multipliers, base/effective totals and contributors, next reward thresholds, shared daily entry flag, Study attempt-preservation chance, and earned Summoning doublers/saved assignments. Distinguish named current reward effects from future/unknown slots and verify applicable reward exclusions.
- **Backend:** Provide Temple Sanctum, torch stock/sources, earned Opals, and Illuminate/Search/Amplify current costs/effects/shortfalls, displayed Search chance, awakening reset consequence, active-only respawn, and intrinsic drop context. Verify shared torch-doubling and other consumed modifiers without inventing a separate bonfire currency/level.
- **UI:** Let players understand amplifiers, class records, colony readiness, challenge requirements/records/rewards, and Temple progression through their effective benefits, requirements, and costs. Support browsing locked released challenges and reward details, with contextual explanations limited to the displayed information.

### Acceptance outcomes

- [ ] Players can inspect all eight Den amplifiers and their caps/debuffs/multiplier, account best score and next Opal threshold, and Beginner/Warrior/Archer/Mage best kill counts with bucket benefits, without confusing kill records with class scores or adding a live Fear meter.
- [ ] Players can inspect Grotto colony progress/quota/readiness, Monarch HP, current versus lifetime credited kills, earned Opals, and owned colony-based synergies without equating weighted credit with raw kills or readiness with a completed Monarch defeat.
- [ ] Players can inspect all six Gambit challenges, unlocks, survival records, verified points and contributors, next reward, and owned doublers/assignments; changed multipliers can change points without rewriting saved records, and future/unknown reward slots are not claimed as released useful effects.
- [ ] Players can inspect Gambit's shared daily entry state and probabilistic Study preservation separately from other daily constraints, without guaranteeing another attempt or predicting survival.
- [ ] Players can inspect Temple torches, Sanctum, all three action costs/effects/shortfalls, current Search chance, awakening reset, active-only Amplify benefit, drop context, and earned Opals without inventing bonfire progression or promising an Opal timeline.

**Data note:** Verify amplifier persistence, score-versus-kill identity, Grotto credited-kill semantics, Gambit scoring/entry/reward exclusions, and Temple price/chance/torch modifiers within this part. Include every needed camp/cross-account input; absent transient combat state is not an outcome blocker.

## Verification approach

Use existing repository backend/domain testing and game-calculation validation guidance in [the testing skill](../../skills/testing/SKILL.md), and frontend verification in [Local UI verification](../agents/ui-verification.md). Separately authorized work must verify relevant account outputs against the running game and demonstrate each selected part's actual backend-to-UI outcomes. No new testing seam or test architecture is approved here.

The original product/delivery approval changed scope documents only. It ran no builds, lint, tests, formatters, game-output comparisons, runtime checks, or UI checks. Completed part 1 evidence and accepted limits remain authoritative in the [current handoff](hole-research-brief.md#current-handoff).

## Approval and stop gate

The human approved the [product specification](hole-spec-draft.md) and these seven delivery parts on 2026-10-12, and authorized publication. That approval settled product and delivery scope only. At publication, all seven parts were unselected and stopped; no ready-for-agent label or execution authorization followed from publication.

The human later selected the three-tab IA on 2026-10-12 and separately authorized parts 1 and 2 through completion. Part 1 was accepted on 2026-10-14; part 2 was accepted on 2026-10-15. The [handoff](hole-research-brief.md#current-handoff) retains their approvals, results, and check limits. Parts 3–7 remain open and unselected; no other part is authorized. The rejected historical rail preview remains historical, not selected-direction proof.
