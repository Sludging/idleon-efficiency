# Menagerie: research brief

**Status:** Research and Part 1 presentation accepted — 2026-10-17. Part 1 is selected and approved. Supervisor accepts its reviewed backend and UI layers under recorded check limits; human live-content review remains pending. Part 1 remains open; Part 2 remains unselected. **Tracking:** [Menagerie feature issue #466](https://github.com/Sludging/idleon-efficiency/issues/466); [Part 1 delivery issue #467](https://github.com/Sludging/idleon-efficiency/issues/467).

**Source handoff:** [v1.23 work summary](../research/v1.23-work-summary.md). **Evidence:** [core mechanic](../research/menagerie-core-evidence.md), [side jellyfish](../research/menagerie-jelly-evidence.md), [site/workflow research](../research/menagerie-site-research.md). **Proposed scope:** [specification](menagerie-spec-draft.md), [delivery parts](menagerie-delivery-parts-draft.md).

## Player problem and intended outcome

Players need to understand their new Menagerie progression from their imported account: what missions they can complete, what Shells and Lumi mean, what they have unlocked or upgraded, and what the six side jellyfish currently provide. Initial coverage should explain accurate current information, not recommend purchases or simulate progression.

## Established game behavior

The specialists inspected matching v1.23 `Luminous_Menagerie` source in `../IdleonWikiBot/codefiles/idleon1.23.txt` and generated catalogs. Evidence notes retain precise source ranges and uncertainty boundaries.

- **Missions:** The catalog and native progress function implement 33 mission IDs. Progress comes from current account/game statistics, such as total account level, crops discovered, and Spelunking depths. A mission claim increments that mission's saved completion count and grants one Shell; the requirement increases with prior completions. Available mission count depends on account bonuses. Seven visible rows are a scrolling display capacity, not an active-mission cap. Sources: core note; `MenagerieMissionRepo.ts`; native 118691–118700, 118743–118748, 118907–118980, 297110–297187, 297327–297336.
- **Shells and rank:** Shell count, mission completion counts, and Lumi rank are distinct saved state. The displayed `ShellEXPreq` threshold triggers a delayed transition: the game subtracts the threshold and increments rank. IE reports imported Shells, threshold, and rank without simulating or consuming anything. Sources: core note; native 118706–118716, 297040–297064, 297401–297430.
- **Access:** `LilTownJellyUnlocked` always returns one in the inspected source, and both inspected menu-open paths show no rank or Research gate. Do not fabricate a locked state. Sources: core note; native 118742, 435637–435639, 457343–457344.
- **Lumi:** Lumi has saved balance and calculated hourly generation. Rank zero gives zero rate; positive rank applies rank and account factors. Menagerie bonus 1 times rank is its own multiplicative factor, not part of the final additive percentage pool. Preserve source operation order and model all required saved inputs, including factors from systems whose full structural features remain out of scope. Offline accrual is unverified. Sources: core note; native 118717–118741, 297432–297451.
- Lumi purchases unlock once, only while unowned; bonus purchases increment repeatable levels. Rank controls availability for both catalogs. Owned unlocks, available entries, affordable purchases, and bought levels remain distinct states. Sources: core note; native 118702–118805, 297193–297300, 297342–297360.
- **Bonuses:** The generated catalog contains 25 bonus definitions. Their effects include ordinary account bonuses and spendable upgrade-doubler resources. Show actual purchased levels/effects, not merely catalog potential effects. Owned, consumed, and remaining doubler resources are distinct internal states; show usable resources now by default, not history. Sources: `MenagerieBonusRepo.ts`; native 118771–118805; jellyfish note.
- **Location:** Generated unlock tooltips place Menagerie in Molten Edge. Location is not a menu access condition. Source: `MenagerieUnlockRepo.ts:24–28`.

### Six side jellyfish

| Panel | Player action and useful account information | Accuracy boundary |
|---|---|---|
| Purple | Coin-funded Shell purchases and a Lumi-generation upgrade; show purchase progression, costs, and effects. | Native `PinkJelly*` branches correspond to the Purple unlock, not another panel. |
| Blue | Donate Ladles into a persistent total that contributes to cooking at daily reset. | Not a Shell exchange; do not invent a daily claim-ready state. |
| Red | Bank reading opportunities and chapter progress for bulk Spelunking reading. | Positive stored opportunity permits reading; reading resets that stored opportunity. |
| Silver | Spend Obol Fragments on Obol MISC and automatic fragment-conversion upgrades. | Two separate levels have caps 100 and 190. |
| Yellow | Construction's eighth slot generates progress spent on four upgrades, including Lumi generation. | Keep saved progress, purchased levels, and effects separate. |
| Green | Meet the Gallery deposit requirement of 12 Tome Legend Nametags for a Tome Immortal Nametag reward. | Meeting the deposit threshold does not establish unclaimed or already-owned reward state. |

Sources: [side-jelly evidence](../research/menagerie-jelly-evidence.md), native 118838–118875, 193229–193236, 271421–271550, 322245–322249; generated unlock IDs 3, 5, 7, 10, 12, 23. Yellow's complete target labels and the Green requirement item's player-facing identity retain prior-investigation evidence limits noted there.

## Proposed website experience

A read-only Menagerie view should answer these questions without requiring players to interpret raw save data:

1. **Where am I?** Access state where verified, Lumi rank, Shell progress toward the next rank, saved Lumi balance, and current calculated Lumi/hour.
2. **What can I complete?** The persistent summary shows available mission count, with a tooltip explaining verified contributors and where additional missions come from. In Missions, distinguish available from locked missions, the first unclaimed task determined by saved claim count, and current account-stat progress. Keep later thresholds already met separate; progress alone never claims a mission or grants Shells.
3. **What do I own or have available?** Unlocks and all 25 bonuses with verified in-game identity/descriptions, availability, ownership or level, current effect, and context-appropriate next cost. Show currently usable resources, not historical owned/used totals by default. Keep unowned potential benefits distinct from active ones.
4. **What do the side jellyfish provide?** Each panel's lock state, saved progression, relevant balance/level/cap/cost, and current effect or verified readiness. The page presents source-backed game text without adding purchase, donation, reading, or claim controls.
5. **What does this affect?** Show only verified in-game descriptions and current effect values for Menagerie bonuses and side panels. Apply verified effects to existing IE calculations once where the recipient is already modeled. Do not assume new recipient models or structural extensions.
6. **What can I spend now?** Show available/remaining usable Black Stars, Labels, and doubler resources where applicable. Preserve internal distinctions between owned, consumed, and remaining state; do not foreground history of spent resources.

Browsing, filtering, and inspecting details are website interactions. Required information must work without hover. Use existing game imagery and account-loading/profile behavior. Never present imported state as live game state. Exact layout, navigation placement, and visual preview belong to later authorized UI planning.
 
## Scope boundary

Include the Menagerie progression loop, catalog unlocks and bonus levels, incoming inputs needed for accurate Menagerie outputs, all six side panels, and verified effects applied once to existing IE calculations. Group these into substantial player outcomes, not parser/UI/calculation tickets.

Exclude optimization rankings, buy-order advice, time-to-goal simulation, gameplay controls, a Liquid Shop rebuild, and unrelated v1.23 fixes. Showing an unlock's ownership and verified in-game description does not include rebuilding its recipient system: Verisimilitude artifacts, Coral Kid Singularity, Crucible, Nightmariners, and similar structural extensions remain separate patch work.

## Evidence gaps and prerequisites

- **Mission count:** The 33 implemented mission IDs and account-dependent availability rule are established. The release-note reference to 25 remains unexplained.
- **State and calculations:** Save mapping, requirements, costs, effects, and Lumi generation still need implementation checks against matching game outputs. Source research is not personalized parity. Do not extrapolate Lumi balance from import time; offline accrual remains unverified.
- **Side-jelly static data:** `MenagerieJellyfishRepo.ts` and its models are present. The bounded catalog comparison found no confirmed upstream static blocker. See the [side-jelly evidence note](../research/menagerie-jelly-evidence.md). Catalog labels are not verified in-game copy. Lumi and other dynamic formulas remain IE-owned; request fixed data only if source proves a definition absent.
- **Readiness:** Red's source predicate is known. Green's requirement threshold is known, but claimed/owned detection is not. Do not label Green as an unclaimed reward from the threshold alone.
- **Effects:** Verify recipient units, resource use, and native calculation order. Preserve approved existing recipient outputs; do not invent a class-experience recipient or rebuild structural systems to supply Lumi inputs.

These are implementation evidence gates, not permission to omit an approved outcome silently. Resolve a gate or return affected scope for a human decision.

## Verification approach and research limits

Use existing account processing and domain public outputs for save/calculation verification, paired with matching-version native expected values. Cover meaningful state boundaries and resource ownership/use; do not test copies of static catalogs or implementation wiring. Later UI work must exercise the actual Menagerie route with imported account state and inspect visible outcomes and interactions. Preview data proves layout only.

Fresh game specialists and a site-pattern specialist supplied the linked notes. A fresh follow-up game specialist traced the main UI action loop to resolve currency identity. The offline server reported ready v1.23 `Luminous_Menagerie`; discovery found `ActorEvents_189`. Native function/state queries returned HTTP 500, so no successful Menagerie runtime output or personalized parity is claimed. Mechanics above use local matching-version source instead. No live access, fixture refresh, tests, production code changes, or browser verification occurred. Read-only tracker search for Menagerie returned no matching issues; differently named issues may exist.

## Current handoff

- **Status and scope:** Supervisor accepts reviewed Part 1 backend and production UI layers — 2026-10-17 — under their stated checks. Human live-content review remains pending; Part 1 stays open and incomplete. Part 2 remains unselected. [#467 UI acceptance handoff](https://github.com/Sludging/idleon-efficiency/issues/467#issuecomment-6232388743).
- **Accepted backend commit:** `837fada25baec91b640cfb6820941d6b88e0ea88` (`feat(menagerie): add progression and receivers`).
- **Backend evidence:** All 17 modeled external receivers are accepted. Six effects remain display-only because no existing output exists; IDs 0/1 are internal. Backend checks: 15 suites/209 tests before type correction; 2 suites/17 tests after. Normal account smoke remained stable. Limits: nonzero effects and positive ID 5 were not runtime-exercised; some source branches and native comparisons remain unresolved; no full-repo TypeScript or full-suite success is claimed. See the [receiver audit](../research/menagerie-part1-remaining-audit.md#recipient-integration-status).
- **UI outcome:** Production route `https://localhost:3000/world-7/menagerie` presents imported-account progression, Missions, Unlocks, and Bonuses, with World 7 navigation. Current Sushi/Spelunking styles; no mockup or private screenshot included.
- **UI proof and limits:** Existing minimal imported-account checks exercised route load, availability tooltip, tabs, Available filter, Research next effect `1.1x`, locked bonus rank 10, and Zenith Market/Menagerie navigation. Focused account-state tests passed 1 suite/8 tests. The final type-only Select correction preserved All/Available/Ready; no browser run followed the import/type corrections. Existing hydration/ad-script errors remain unrelated. The existing host server returned HTTP 200 and was not restarted.
- **Human review:** Human still owns extended smoke and live-content review. No screenshot or account data was uploaded. Keep #467 open for human review; no issue closure, push, PR, or deployment.
- **Resolved presentation details:** Available mission count and tooltip remain persistent; mission current task follows saved claims, separately from progress and later thresholds. Locked unlocks/bonuses show required rank; bonus `}` effects use source-defined `1 + effect / 100`; current/next fields follow available/locked state. Zenith Market remains in World 7 navigation.
- **Part 1 backend limits:** IDs 2, 3–12 except 13, and 16–18, 20, 22, 24 have accepted existing outputs; IDs 13, 14, 15, 19, 21, 23 remain display-only. Nonzero receiver effects are not runtime-verified. Do not claim full native parity or full repository checks.
- **Part 2:** Six side jellyfish stay out of scope and unselected. Existing [side-jelly evidence](../research/menagerie-jelly-evidence.md) and [delivery parts](menagerie-delivery-parts-draft.md) remain the references.
