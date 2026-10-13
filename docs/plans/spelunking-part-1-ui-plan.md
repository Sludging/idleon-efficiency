# Spelunking Part 1: benefit-first tunnel cards

## Outcomes and approval contract

Players compare intrinsic Lore benefits, inspect tunnel achievements, and distinguish ordinary discoveries from Grand Discoveries with their requirements.
Keep the approved self-contained card composition and read-only controls while refining hierarchy, density, and disclosure.
Retained-account values illustrate the view; they are not fixed constants or new game-parity evidence.
Preserve the accepted backend and authorization boundary recorded in the [handoff](spelunking-research-brief.md#current-handoff).
The UI caller owns presentation and browsing state. The accepted Spelunking domain owns progression, requirements, records, and summaries.

## Composition and hierarchy

Use the exact [Toolbox Lore / Bosses reference](https://idleontoolbox.com/account/world-7/spelunking?profile=liiiiiiiiiiiig&t=Lore&nt=Bosses) for self-contained cards, benefit/art pairing, compact records, and object-icon hover.
[Observed reference evidence](../../.ui-verification/approval/spelunking-part-1-r4-20261013/reference-observations.json) records those traits; competitor chrome, code, fields, and calculations are not authorities.
Preserve the real IE shell, inherited outer wrapper, Rubik/theme, and ordinary **Spelunking** heading.
Render one complete card per released tunnel in source order, in two columns at 1440px.
Compose dark-1 `ShadowBox` cards with `medium` padding, `small` inner gaps, and `medium` grid gaps, using approved [Sneaking traits](../../components/world-6/sneaking/sneakingUpgrades.tsx#L19-L37).
The caller composes `Box`/`Grid`, `IconImage`, `TextAndLabel`/`ComponentAndLabel`, and `TipDisplay`; do not add a generic card abstraction.
Each card keeps its benefit, Lore completion cue, records, access requirement, collection progress, and tunnel-specific context together.
Do not add a selected-detail panel, **Details** buttons, long collection lists, or unimplemented Part 2/3 tabs.

## Card fields and exact copy

Pair matched 72px natural-fit boss art with the intrinsic `data.loreBonus` text and a secondary source tunnel name.
Use small Rubik text at weight 500 for the benefit. Preserve line breaks and source wording; convert only spaced ` @ ` separators to newlines.
Remove the **Lore reward** kicker and separate Lore-status row. Keep the benefit more prominent than names and records.
Apply opacity to the whole `ShadowBox`: `0.4` when locked, `0.7` when available with incomplete Lore, and `1` when complete.
These are presentation values, not game rules. Do not apply a second boss-image fade; tooltip portals remain fully readable.
Boss hover identifies the boss. The card's accessible label states availability and Lore completion.
Show only **Locked** as a secondary header cue. An available card has no visible **Available** label.
For locked cards, visibly show **Locked · Complete [previous tunnel name] Lore** from `accessLoreTunnel`.
Keep `available` and `loreCompleted` distinct; an available tunnel can still have incomplete Lore.
Make **Best depth** the primary record: use `TextAndLabel` with the existing `textSize="xlarge"` role and a small label.
Keep **Biggest haul** secondary. Show **Boss depth** only when `!tunnel.loreCompleted`, including available tunnels with incomplete Lore.
Use two record columns for completed Lore and three for incomplete Lore. Leave no empty Boss depth placeholder.
Preserve accepted raw depths and haul records. Do not add record tooltips or shared explanations.
After a divider, show compact **Discoveries** and **Grand Discoveries** counts, each with **[found] / [capacity] found** only.
Keep **Requirements met / Requirements not met** from `grandEligible`, or **Collection complete** at zero remaining capacity, adjacent to Grand counts.
Gain density by consolidating rows, not by reducing approved 24px card padding/gaps or shrinking useful text.

## Collections, hover, and controls

Ordinary discoveries form a compact wrapping strip of actual object art, roughly 32px maximum per icon, in source order; exclude Lore bosses.
Reuse recognition-first [Stamps icon/TipDisplay composition](../../app/world-1/stamps/content.tsx#L195-L213), not its feature-specific controls or card fields.
Keep missing icons recognizable at opacity `0.55`. Found/capacity totals and the **Collection status** filter supply collection context.
Found discovery images are plain `IconImage` elements in wrapping `Box` containers, with no `TipDisplay`.
Only missing discovery images have a `TipDisplay`, with **Spawn depth** as its heading.
Its body contains only `commaNotation(discovery.data.x6)`, in a tooltip at most 360px wide.
Do not include an object-identity header, Found/Missing state, Base inputs, POW/HP/Amber factors, depth scaling, tunnel factors, or explanatory paragraphs.
The **Grand Discoveries** line remains plain text with its unfiltered found/capacity total and eligibility/completion marker.
Remove the Grand information icon and tooltip entirely. Add no hidden or relocated Grand-details fallback.
Place one compact row immediately after the heading, in this desktop order:
**Account discoveries**, **Account Grand Discoveries**, **Show locked**, then **Collection status**.
Keep both account totals inline, with stronger numbers and **[found] / [capacity] found**. Show no numeric missing totals.
Use one **Show locked** `CheckBox`, checked initially, and a Grommet `Select` for **All / Found / Missing**, initially **All**.
Use a 130px non-flexing dropdown wrapper and small Select, with an inline Collection status label.
The row uses medium gaps, centered alignment, and wrapping when needed. Preserve the inherited outer wrapper.
Add no separate summary or controls row.
Remove `ContentTabs`; preserve the existing selected-state callbacks.
Show locked filters cards by `available`. Collection status filters only ordinary icons, preserving source order.
Keep all counts, eligibility markers, access requirements, and records unfiltered. Filters remain local read-only state, with no save or URL state.
Empty ordinary copy remains **No found discoveries / No missing discoveries**.
Remove **Display notes** and **Shared drops**, including their now-unused components and imports.
Do not relocate their help or replace it with an unsolicited shared-reward overview. Preserve domain metadata.
Render every actual `tunnel.itemDrops` entry directly in a concise inline card row, only when nonempty.
Pair `IconImage(Item.getImageData(drop.itemId))` with `drop.displayName`. Use contextual names, not the generic item name **Strung Jewels**.
Do not hide these rows behind a **Tunnel drops** tooltip. Iterate the supplied array without assuming one drop per tunnel.
Keep generic destruction, drops, and exit disclosures absent. Add no tunnel-data disclosure solely for Tunnel POW factor.

## Data, artwork, and integration

Preserve the [accepted API](../../data/domain/world-7/spelunking.tsx): `tunnels`, `data.loreBonus`, `loreBoss`, `loreCompleted`, `available`, `accessLoreTunnel`, records, `discoveries`, and tunnel/account `ordinarySummary`/`grandSummary`.
The card reads `grandEligible` for its plain eligibility marker and `itemDrops` for inline tunnel rewards. Preserve unused shared-drop and Grand-detail metadata in the accepted domain.
Use `Tunnel.getLoreBossImageData()` and `Discovery.getImageData()` with `IconImage`. These methods provide verified asset basenames in logical square frames; contain-fit preserves the PNG's natural proportions at the approved 72px/32px display bounds.
[Artwork evidence](../../.ui-verification/approval/spelunking-part-1-r4-20261013/artwork-evidence.json) establishes the ten boss and 105 ordinary resource identities. Contextual item images use actual `Item.getImageData()` identities.
The existing `Item.getImageData()` `_x1` branch handles World 7 item identities, matching original drop source and verified CDN artwork.
Do not copy a tunnel-to-image alias table into the UI.
Read `spelunking.currentAmberDenomination` once for the displayed account tier.
Use its `getImageData()` for the 24px haul icon and `formatAmount(tunnel.biggestHaul)` for the quantity.
Use the denomination's actual `name` for the unit's accessible label. The UI owns no tier table or conversion formula.
Keep the existing logical 50px contain-fit image frame. Use only the current-denomination API; retain no base-only compatibility path.
Read `state.data.getData()` and `state.lastUpdated` together with `useAppDataStore(useShallow(...))`, then `theData.get("spelunking")`.
Retain `lastUpdated` as the mutable-domain refresh dependency, not a save timestamp. Snapshot the domain into initially undefined local state through `useEffect`, following the account Constellations pattern, so server and initial client hydration agree before reading browser account progress. Keep filters and formatting in client state; add no processing hook or presentation store.
Use [existing number helpers](../../data/utility.tsx), retaining zero records and parsed precision. Guard genuinely missing data with **Loading Spelunking data**. Initialized objects remain required.
Retain existing route metadata/Suspense, navigation, and store-backed Part 1 card surface.
The requested **Biggest haul** outcome now matches the current game's account-tier normalization and denomination color.
The saved record remains unscaled base Orange Amber; presentation must divide by the selected active tier before using that tier's artwork.
The earlier choice to keep base Orange artwork and raw notation is historical, not final renderer parity.
The human explicitly authorized five handwritten Amber denomination definitions and the needed original haul-format rules in the backend.
This narrow exception replaces the earlier WikiBot export prerequisite; it does not authorize unrelated static tables or generated-data edits.
Keep `AmberDenomination` in the existing Spelunking domain, owning immutable identity, `valueInBaseAmber`, optional upgrade gate, image data, and amount formatting.
Declare the five definitions once: Orange `1`, Blue `1e3`, Green `1e9`, Red `1e21`, and Pink `1e36`.
Non-base tiers activate through existing `getUpgradeBonus` for upgrades `20`, `41`, `51`, and `66`, respectively, when bonus is at least `1`.
`currentAmberDenomination` selects the highest active definition, falling back to Orange. Select by account progression, not each haul's magnitude.
Normalize every saved record by the selected base-unit divisor, including zero. Preserve raw save parsing, records, progression, and all existing summaries.
Use original-game integer/M-suffix formatting below the Big-notation threshold and canonical `notateNumber(..., "Big")` only above normalized `1e14`.
Keep original-game formatting rules local to `AmberDenomination`; change no shared formatter behavior.
Add no lifecycle hook, mutable tier cache, per-render instances, duplicate tier tables, compatibility alias, or WikiBot/export work.
Do not add current Amber balance, income, coin conversion, a new Amber tooltip, or Part 2/3 shop features.
Exclude current Amber balance, income, effective depth/haul/shop bonuses, characters/stamina, Journal, equipment, Manic/advanced modes, optimizers, personalized POW requirements, and chance forecasts.

## Production browser verification

Use [private Docker Playwright](../agents/ui-verification.md) on `/world-7/spelunking` at 1440×1000 with the unchanged retained account. Wait for the real store to load before inspecting the UI.
Use the approved r4 [primary full-shell view](../../.ui-verification/approval/spelunking-part-1-r4-20261013/01-boss-cards-primary-full-shell-top.png) and [full-page grid](../../.ui-verification/approval/spelunking-part-1-r4-20261013/02-all-boss-cards-full-page-top.png) for retained topology and artwork.
Use the final [observations](../../.ui-verification/verification/spelunking-current-amber-final-20261014/observations.json) for current proof. Earlier density measurements in the handoff are historical context only.
Confirm ten source-order cards and 129 loaded card images: ten bosses, 105 ordinary objects, ten current-tier Amber icons, and four tunnel drops.
Confirm contain-fit and natural aspect ratios.
Check eight completed cards have no Boss depth. Available/incomplete Scoutpost still shows **115**; locked Exiled Throne shows **130**.
Check completed records use two columns and incomplete records use three, with no empty placeholder.
Measure the existing xlarge Best depth value and confirm it clearly outranks the secondary 14px haul quantity without a new oversized stat card.
Confirm the single row follows the heading in order: account discoveries, account Grand Discoveries, Show locked, Collection status dropdown.
For the retained account, confirm Show locked yields nine/ten cards and ordinary All/Found/Missing yields 105/82/23 icons.
Account summaries remain **82 / 105 found** and **22 / 100 found**, with no numeric missing totals.
Hover found ordinary images and confirm no tooltip. Hover missing images and confirm heading Spawn depth with only the formatted depth value.
Confirm Grand totals and Requirements met/not met or Collection complete remain visible, with no information icon or Grand tooltip.
Confirm no Display notes, Shared drops, replacement global help, or collection tabs remain.
Confirm whole-card opacity is `1`/`0.7`/`0.4`; boss art has no additional fade.
Confirm no visible numeric missing counts, Available labels, or hidden Tunnel drops affordance.
Confirm all four contextual inline item names and `_x1` CDN images load.
Keep counts, eligibility markers, access requirements, summaries, and records unfiltered.
Confirm all raw haul records remain unchanged while their rendered quantities use the current account tier.
Prove all ten normalized records against independently extracted original-game expectations, including Red Glitter End **6,908M** and Red Exiled Throne **0**.
Confirm all ten haul icons use verified `CaveAmber3` for the retained Red-tier account, not the historical raw Orange presentation.
Verify the focused Amber domain tests and direct upgrade-bonus parameters before final browser proof; keep evidence and unavailable-tier coverage limits in the handoff.
Check Loading Spelunking data and mutable-domain refresh only when feasible without changing the retained save.
Use one focused production run and a bounded confirmation for material mismatches. Record current proof separately from historical passes.
Retain the minimal approved r4 reference and minimal current rendered proof with source provenance in the handoff.
Remove owned scenarios, obsolete/raw/failed-run captures, and disposable source-query scaffolds. Preserve unrelated evidence and saves.
Remove only owned temporary scenarios, previews, and harnesses after proof. Preserve the retained save and unknown or unrelated artifacts. Leave preexisting Docker running.
Report runtime warnings/errors separately from verification results. This is rendered production proof, not live-game parity or backend reapproval. Do not return another mockup for approval.

Sources: [Part 1 outcomes](spelunking-delivery-parts-draft.md#1-tunnel-lore-and-discovery-progression), [accepted backend plan](spelunking-part-1-backend-plan.md), [source findings](spelunking-research-brief.md#part-1-source-findings-and-prerequisites), [Wiki vocabulary](https://idleon.wiki/wiki/Spelunking), [UI guidance](../agents/ui-patterns.md), and [DESIGN.md](../../DESIGN.md).
